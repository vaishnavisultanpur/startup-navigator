import { ArrowUpRight } from "lucide-react";

export default function ArticleCard({ article, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-navy-900/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-amber-500/60 hover:shadow-md transition-all focus-ring group h-full"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wide text-moss bg-moss/10 rounded-full px-2.5 py-1">
          {article.category}
        </span>
        <ArrowUpRight className="w-4 h-4 text-navy-900/30 group-hover:text-amber-500 transition-colors flex-shrink-0" />
      </div>
      <h3 className="font-display text-lg text-navy-900 leading-snug">{article.title}</h3>
      <p className="text-sm text-ink/60 leading-relaxed line-clamp-3">
        {article.summary || article.content}
      </p>
    </button>
  );
}
