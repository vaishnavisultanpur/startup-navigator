# Deployment Guide — Netlify (frontend) + Render (backend)

You don't need Vercel for this. Netlify + Render are both free, need no
credit card, and deploy straight from GitHub. Total time: ~15 minutes.

## Step 0 — Push this project to GitHub

```bash
cd startup-navigator
git init
git add .
git commit -m "Startup Navigator - full stack RAG app"
```
Create a new **public** repo on GitHub (e.g. `startup-navigator`), then:
```bash
git remote add origin https://github.com/<your-username>/startup-navigator.git
git branch -M main
git push -u origin main
```

---

## Step 1 — Deploy the backend on Render

1. Go to https://render.com → sign up / log in with GitHub (no card needed).
2. Click **New +** → **Web Service** → connect your `startup-navigator` repo.
3. Configure:
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** Free
4. Under **Environment Variables**, add:
   - `SECRET_KEY` → any random string (e.g. generate with `openssl rand -hex 32`)
   - `ANTHROPIC_API_KEY` → optional; leave blank if you don't have one, AI
     Search still works via the extractive fallback
   - `FRONTEND_ORIGIN` → you'll fill this in after Step 2 (Netlify URL);
     for now you can set it to `*` temporarily, then tighten it later
5. Click **Create Web Service**. First deploy takes 2-5 minutes.
6. Once live, note your backend URL, e.g. `https://startup-navigator-api.onrender.com`
7. Test it: open `https://<your-backend>.onrender.com/api/health` in a
   browser — you should see `{"status":"healthy"}`.

**Note:** Render's free tier spins down after 15 minutes of inactivity and
takes ~30-50 seconds to wake up on the next request. This is normal for a
free-tier demo — mention it in your submission if relevant.

---

## Step 2 — Deploy the frontend on Netlify

1. Go to https://netlify.com → sign up / log in with GitHub.
2. Click **Add new site** → **Import an existing project** → choose your repo.
3. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Under **Site settings → Environment variables**, add:
   - `VITE_API_URL` → your Render backend URL from Step 1, e.g.
     `https://startup-navigator-api.onrender.com` (no trailing slash)
5. Click **Deploy site**. Takes 1-2 minutes.
6. Once live, note your frontend URL, e.g. `https://startup-navigator.netlify.app`

### Fix CORS: point the backend back at your Netlify URL
1. Go back to Render → your backend service → **Environment**.
2. Update `FRONTEND_ORIGIN` to your exact Netlify URL, e.g.
   `https://startup-navigator.netlify.app` (no trailing slash). You can list
   multiple origins comma-separated if needed.
3. Save — Render will redeploy automatically.

---

## Step 3 — Verify the live app

1. Open your Netlify URL.
2. Log in with `admin@startupnavigator.com` / `Admin@123`.
3. Try AI Search, check the Dashboard, and create/edit an article in Admin.
4. If the first request feels slow, that's Render's free tier waking up —
   refresh after ~30 seconds.

---

## Alternative: Railway (single-service option)

If you'd rather deploy both frontend and backend from one platform:
1. https://railway.app → New Project → Deploy from GitHub repo.
2. Add two services from the same repo, one with root `backend` (Python,
   same build/start commands as above), one with root `frontend` (Node,
   `npm run build`, serve `dist/` — Railway can serve static sites via its
   static-site template, or use a small `serve` package as the start command:
   `npx serve -s dist -l $PORT`).
3. Set the same environment variables as in the Render/Netlify steps above.

---

## What to submit

- **Live URL:** your Netlify frontend URL
- **GitHub repo:** your repo URL
- **Login credentials:** the demo admin/user pair above (or your own)
- **README:** this repo's `README.md` + `DEPLOYMENT.md`
