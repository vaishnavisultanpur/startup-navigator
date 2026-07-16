import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { articlesApi } from "../api/client";
import ArticleCard from "../components/ArticleCard";
import ArticleModal from "../components/ArticleModal";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const [artRes, catRes] = await Promise.all([
        articlesApi.list(),
        articlesApi.categories(),
      ]);
      setArticles(artRes.data);
      setCategories(catRes.data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory = activeCategory ? a.category === activeCategory : true;
      const matchesQuery = query
        ? (a.title + a.content + a.summary).toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [articles, activeCategory, query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
        Knowledge base
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-navy-900 mb-3">Explore Topics</h1>
      <p className="text-ink/60 max-w-xl mb-8">
        Browse every article in the Startup Navigator knowledge base, or filter by
        the stage of your journey.
      </p>

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full sm:w-96 bg-white border border-navy-900/15 rounded-full pl-11 pr-4 py-2.5 text-sm focus-ring"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSearchParams({})}
          className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors focus-ring ${
            !activeCategory
              ? "bg-navy-900 text-paper border-navy-900"
              : "border-navy-900/20 text-ink/70 hover:border-navy-900/50"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSearchParams({ category: c })}
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors focus-ring ${
              activeCategory === c
                ? "bg-navy-900 text-paper border-navy-900"
                : "border-navy-900/20 text-ink/70 hover:border-navy-900/50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {status === "loading" && <Loader label="Fetching articles..." />}
      {status === "error" && <ErrorState message="Couldn't load articles. Is the backend running?" onRetry={load} />}
      {status === "ready" && filtered.length === 0 && (
        <EmptyState icon={BookOpen} title="No articles match" description="Try a different search term or category." />
      )}
      {status === "ready" && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <ArticleCard key={a.id} article={a} onClick={() => setSelected(a)} />
          ))}
        </div>
      )}

      <ArticleModal article={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
