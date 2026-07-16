import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { articlesApi } from "../api/client";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const CATEGORIES = [
  "Company Registration", "Funding", "Legal Compliance", "Hiring", "Branding",
  "Marketing", "Taxation", "Fundraising", "AI Tools", "Business Growth",
];

const EMPTY_FORM = { title: "", category: CATEGORIES[0], summary: "", content: "" };

export default function Admin() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  const [editingId, setEditingId] = useState(null); // null = not editing, "new" = creating
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = async () => {
    setStatus("loading");
    try {
      const res = await articlesApi.list();
      setArticles(res.data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId("new");
    setFormError("");
  };

  const startEdit = (article) => {
    setForm({
      title: article.title,
      category: article.category,
      summary: article.summary || "",
      content: article.content,
    });
    setEditingId(article.id);
    setFormError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  const onSave = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.title.trim() || !form.content.trim()) {
      setFormError("Title and content are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId === "new") {
        await articlesApi.create(form);
      } else {
        await articlesApi.update(editingId, form);
      }
      await load();
      cancelEdit();
    } catch (err) {
      setFormError(err.response?.data?.detail || "Failed to save article.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this article? This can't be undone.")) return;
    try {
      await articlesApi.remove(id);
      await load();
    } catch (err) {
      alert("Failed to delete article.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
            Admin panel
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-navy-900">Manage Articles</h1>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 bg-amber-500 text-navy-950 font-semibold px-5 py-2.5 rounded-full hover:bg-amber-400 transition-colors focus-ring"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {editingId !== null && (
        <form onSubmit={onSave} className="bg-white border border-navy-900/10 rounded-2xl p-6 mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-navy-900">
              {editingId === "new" ? "New Article" : "Edit Article"}
            </h2>
            <button type="button" onClick={cancelEdit} className="text-ink/40 hover:text-ink focus-ring rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {formError && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {formError}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-ink/60 mb-1 block">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-ink/60 mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Summary (optional, shown on cards)</label>
            <input
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Content</label>
            <textarea
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="self-start flex items-center gap-2 bg-navy-900 text-paper font-semibold px-5 py-2.5 rounded-full hover:bg-navy-800 transition-colors disabled:opacity-50 focus-ring"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Article"}
          </button>
        </form>
      )}

      {status === "loading" && <Loader label="Loading articles..." />}
      {status === "error" && <ErrorState message="Couldn't load articles." onRetry={load} />}

      {status === "ready" && (
        <div className="bg-white border border-navy-900/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_auto] gap-4 px-5 py-3 bg-navy-900/5 text-xs font-mono uppercase tracking-wide text-ink/50">
            <span>Title</span>
            <span className="hidden sm:block">Category</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-navy-900/5">
            {articles.map((a) => (
              <div key={a.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_auto] gap-4 px-5 py-4 items-center">
                <span className="text-sm text-navy-900 font-medium truncate">{a.title}</span>
                <span className="hidden sm:block text-xs font-mono text-moss">{a.category}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => startEdit(a)} className="text-navy-700 hover:text-amber-600 focus-ring rounded">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(a.id)} className="text-navy-700 hover:text-red-600 focus-ring rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
