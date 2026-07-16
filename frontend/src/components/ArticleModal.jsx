import { X } from "lucide-react";
import { useEffect } from "react";

export default function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-paper rounded-2xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-navy-900/40 hover:text-navy-900 focus-ring rounded"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-[11px] font-mono uppercase tracking-wide text-moss bg-moss/10 rounded-full px-2.5 py-1">
          {article.category}
        </span>
        <h2 className="font-display text-2xl text-navy-900 mt-4 mb-4 leading-snug">
          {article.title}
        </h2>
        <p className="text-ink/80 leading-relaxed whitespace-pre-line">{article.content}</p>
      </div>
    </div>
  );
}
