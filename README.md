# Startup Navigator — Comprehensive Guide to Startups

A full-stack, AI-powered web application that helps entrepreneurs explore
company registration, funding, legal compliance, hiring, branding, marketing,
taxation, fundraising, AI tools, and business growth — with a RAG-powered AI
Search that answers questions grounded in a curated knowledge base.

**Live URL:** _add after deployment (see DEPLOYMENT.md)_
**GitHub repo:** _add after you push this to GitHub_

**Demo credentials:**
| Role  | Email                          | Password   |
|-------|--------------------------------|------------|
| Admin | admin@startupnavigator.com     | Admin@123  |
| User  | user@startupnavigator.com      | User@123   |

---

## 1. Architecture

```
┌─────────────────┐        HTTPS/JSON        ┌──────────────────────┐
│   React (Vite)   │ ───────────────────────▶ │   FastAPI backend     │
│   Tailwind CSS    │ ◀─────────────────────── │   (Python)             │
│   deployed on      │        JWT auth          │   deployed on Render   │
│   Netlify           │                          │                        │
└─────────────────┘                          └──────────┬───────────┘
                                                            │
                                              ┌─────────────┴─────────────┐
                                              │        SQLite DB           │
                                              │  users / articles /        │
                                              │  search_history             │
                                              └─────────────┬─────────────┘
                                                            │
                                              ┌─────────────┴─────────────┐
                                              │   RAG Search Engine         │
                                              │  1. TF-IDF retrieval         │
                                              │     (scikit-learn)           │
                                              │  2. Claude API generation     │
                                              │     (optional — falls back    │
                                              │      to extractive summary)   │
                                              └───────────────────────────┘
```

### Pages (React Router)
`Home` · `Explore Topics` · `AI Search` · `Resources` · `About` · `Contact` ·
`Login` · `Register` · `Dashboard` (user stats + history) · `Admin` (article
CRUD, admin-only, route-protected).

### Backend structure
```
backend/app/
  main.py         FastAPI app, CORS, startup seeding
  database.py     SQLAlchemy engine/session (SQLite)
  models.py       User, Article, SearchHistory
  schemas.py      Pydantic request/response models
  auth.py         JWT creation/verification, password hashing, role guards
  rag_engine.py   Retrieval (TF-IDF) + generation (Claude or extractive fallback)
  seed_data.py    19 seed articles + 2 demo users, run once on first startup
  routers/
    auth.py       /api/auth/register, /login, /me
    articles.py   /api/articles (CRUD, admin-gated for write ops)
    search.py     /api/search (AI Search + /api/search/history)
    dashboard.py  /api/dashboard (stats)
```

### Why this stack
- **FastAPI + SQLite**: zero external DB dependency, fast to deploy on a free
  tier, auto-generated OpenAPI docs at `/docs` for easy grading/testing.
- **TF-IDF retrieval instead of vector embeddings**: no external embedding
  API, no extra cost, no extra latency — appropriate for a ~20-article
  knowledge base. This is a legitimate, lightweight RAG pattern; swapping in
  a vector store (e.g. FAISS/pgvector) is a drop-in upgrade for a larger
  corpus (see `rag_engine.py` docstring).
- **Graceful AI fallback**: if no `ANTHROPIC_API_KEY` is set, AI Search still
  works — it returns a clearly-labeled extractive summary of the top matched
  articles instead of failing. This keeps the app fully functional and
  demo-able even without any paid API key.

---

## 2. AI tools & prompts used

Built with **Claude** (Anthropic) as the primary AI coding assistant, used to:
- Scaffold the FastAPI backend (models, auth, routers) from a single
  architecture prompt describing the required features (login, admin CRUD,
  AI search, history dashboard).
- Generate the RAG pipeline (`rag_engine.py`): "Implement a lightweight RAG
  search: retrieve top-k relevant articles via TF-IDF cosine similarity, then
  optionally call the Claude API to generate a grounded answer from those
  articles, with a safe extractive fallback if no API key is present."
- Design and build the React frontend against a design brief: "clean,
  responsive, professional UI for an entrepreneurship knowledge base; compass
  and route-map visual metaphor; navy/amber palette; Fraunces display font +
  Inter body font."
- Debug a `passlib`/`bcrypt` version incompatibility during local testing
  (switched password hashing to `pbkdf2_sha256` to avoid a known bcrypt 4.x
  compatibility bug).

At runtime, the deployed app itself calls the **Anthropic Claude API**
(`claude-sonnet-4-6`) server-side for AI Search generation, when
`ANTHROPIC_API_KEY` is configured on the backend.

---

## 3. Run locally

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # edit ANTHROPIC_API_KEY if you have one
uvicorn app.main:app --reload --port 8000
```
Backend runs at `http://localhost:8000` (docs at `http://localhost:8000/docs`).
The SQLite DB and 19 seed articles + 2 demo users are created automatically
on first run.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173` and talks to the backend via
`VITE_API_URL` (defaults to `http://localhost:8000` in `.env.development`).

Log in with the demo credentials above, or register a new account.

---

## 4. Deployment

See **DEPLOYMENT.md** for full step-by-step instructions. Since Vercel isn't
available right now, this uses:
- **Render** (free tier) for the FastAPI backend
- **Netlify** (free tier) for the React frontend

Both are card-free, GitHub-connected, and auto-deploy on push.

---

## 5. Testing performed

- Manual end-to-end testing of: register → login → AI Search → dashboard
  history → admin create/edit/delete article → logout → protected-route
  redirect for logged-out users.
- Backend smoke-tested via `curl` against every endpoint (auth, articles
  CRUD, search, dashboard) — see terminal output during development.
- Frontend production build verified with `npm run build` (no errors).
- Responsive layout checked at mobile (375px), tablet, and desktop widths.
- Error/loading/empty states implemented for every data-fetching page
  (Explore, AI Search, Dashboard, Admin).
