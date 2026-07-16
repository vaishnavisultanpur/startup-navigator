import { useState } from "react";
import { Send, Sparkles, FileText } from "lucide-react";
import { searchApi } from "../api/client";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const SUGGESTIONS = [
  "How do I register a private limited company?",
  "What funding stages exist for startups?",
  "Do I need to register for GST?",
  "How much equity should I set aside for ESOPs?",
];

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");

  const runSearch = async (q) => {
    const question = (q ?? query).trim();
    if (!question) return;
    setStatus("loading");
    setResult(null);
    try {
      const res = await searchApi.ask(question);
      setResult(res.data);
      setStatus("ready");
    } catch (err) {
      setErrorMsg(
        err.response?.status === 401
          ? "Please log in to use AI Search."
          : "Something went wrong while searching. Please try again."
      );
      setStatus("error");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
        RAG-powered
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-navy-900 mb-3 flex items-center gap-2">
        <Sparkles className="w-7 h-7 text-amber-500" /> AI Search
      </h1>
      <p className="text-ink/60 mb-8 max-w-xl">
        Ask a question in plain language. We retrieve the most relevant articles
        from our knowledge base, then generate a grounded answer.
      </p>

      <form onSubmit={onSubmit} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. How do I pitch to angel investors?"
          className="flex-1 bg-white border border-navy-900/15 rounded-full px-5 py-3 text-sm focus-ring"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-navy-900 text-paper rounded-full px-5 flex items-center gap-2 text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 focus-ring"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>

      {status === "idle" && (
        <div className="flex flex-wrap gap-2 mt-6">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                runSearch(s);
              }}
              className="text-xs font-mono border border-navy-900/15 rounded-full px-3 py-1.5 text-ink/70 hover:border-amber-500 hover:text-amber-600 transition-colors focus-ring"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {status === "loading" && <Loader label="Retrieving and generating your answer..." />}

      {status === "error" && <ErrorState message={errorMsg} onRetry={() => runSearch()} />}

      {status === "ready" && result && (
        <div className="mt-8 bg-white border border-navy-900/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-[11px] font-mono uppercase tracking-wide rounded-full px-2.5 py-1 ${
                result.ai_generated
                  ? "text-amber-700 bg-amber-100"
                  : "text-moss bg-moss/10"
              }`}
            >
              {result.ai_generated ? "AI generated" : "Extractive summary"}
            </span>
          </div>
          <p className="text-ink/90 leading-relaxed whitespace-pre-line mb-6">{result.answer}</p>

          {result.sources?.length > 0 && (
            <div className="border-t border-navy-900/10 pt-5">
              <p className="text-xs font-mono uppercase tracking-wide text-ink/50 mb-3">
                Sources
              </p>
              <div className="flex flex-col gap-2">
                {result.sources.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 text-sm text-ink/70">
                    <FileText className="w-3.5 h-3.5 text-navy-700/50 flex-shrink-0" />
                    {s.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
