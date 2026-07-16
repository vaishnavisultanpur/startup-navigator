"""
Lightweight RAG (Retrieval-Augmented Generation) engine.

Retrieval: TF-IDF cosine similarity over the article knowledge base
(no external embedding API needed -> zero cost, zero extra dependency risk).

Generation: if ANTHROPIC_API_KEY is set, calls Claude to write a grounded
answer using only the retrieved articles as context. If no key is set,
falls back to an extractive summary built from the top matching articles,
so the feature works out of the box even without any API key.
"""
import os
from google import genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

client = genai.Client(api_key=GEMINI_API_KEY)
MODEL = "gemini-2.5-flash"


def retrieve_top_articles(query: str, articles: list, top_k: int = 3):
    """Return top_k articles most relevant to the query using TF-IDF cosine similarity."""
    if not articles:
        return []

    corpus = [f"{a.title}. {a.category}. {a.summary or ''} {a.content}" for a in articles]
    corpus.append(query)

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(corpus)

    query_vec = tfidf_matrix[-1]
    doc_vecs = tfidf_matrix[:-1]

    scores = cosine_similarity(query_vec, doc_vecs).flatten()
    ranked = sorted(zip(articles, scores), key=lambda x: x[1], reverse=True)

    # Only keep articles with a non-trivial similarity score
    top = [a for a, score in ranked[:top_k] if score > 0.03]
    return top if top else [ranked[0][0]]  # always return at least one result


def generate_with_gemini(query: str, context_articles: list) -> str:
    context_text = "\n\n".join(
        f"Article: {a.title}\nCategory: {a.category}\nContent: {a.content}"
        for a in context_articles
    )

    prompt = f"""
You are the AI assistant for Startup Navigator.

Answer ONLY using the knowledge base below.
Do not make up facts.

Knowledge Base:
{context_text}

User Question:
{query}
"""

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
        )

        return response.text

    except Exception as exc:
        return generate_extractive(query, context_articles, error_note=str(exc))


def generate_extractive(query: str, context_articles: list, error_note: str = "") -> str:
    """Fallback answer generator: no external LLM call, just structured extraction."""
    if not context_articles:
        return (
            "I couldn't find anything in the knowledge base related to your question yet. "
            "Try rephrasing, or browse the Explore Topics page."
        )

    lines = [f"Here's what I found related to \u201c{query}\u201d:\n"]
    for a in context_articles:
        snippet = (a.summary or a.content)[:280].rstrip()
        lines.append(f"\u2022 **{a.title}** ({a.category}): {snippet}{'...' if len(snippet) == 280 else ''}")
    lines.append(
        "Set a GEMINI_API_KEY in the backend .env to enable AI-generated answers."
    )
    return "\n".join(lines)


def answer_query(query: str, articles: list):
    """Main entry point used by the /api/search endpoint."""
    top_articles = retrieve_top_articles(query, articles, top_k=3)

    if GEMINI_API_KEY:
        answer = generate_with_gemini(query, top_articles)
        ai_generated = True

    else:
        answer = generate_extractive(query, top_articles)
        ai_generated = False

    return answer, top_articles, ai_generated
