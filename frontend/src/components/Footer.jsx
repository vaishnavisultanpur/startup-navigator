import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-paper/70 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-500" strokeWidth={1.75} />
          <span className="font-display text-paper">Startup Navigator</span>
        </div>
        <p className="text-xs text-paper/50 font-mono">
          Built as a technical assignment — full-stack RAG demo, not legal or financial advice.
        </p>
        <div className="flex gap-4 text-sm">
          <Link to="/about" className="hover:text-amber-400 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
