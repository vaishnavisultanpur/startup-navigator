import { Link } from "react-router-dom";
import {
  Building2, Banknote, Scale, Users, Sparkles, Megaphone,
  Receipt, Bot, TrendingUp, ArrowRight, MessageSquareText,
} from "lucide-react";

const TOPICS = [
  { icon: Building2, label: "Company Registration", color: "text-navy-700" },
  { icon: Banknote, label: "Funding", color: "text-moss" },
  { icon: Scale, label: "Legal Compliance", color: "text-navy-700" },
  { icon: Users, label: "Hiring", color: "text-moss" },
  { icon: Sparkles, label: "Branding", color: "text-navy-700" },
  { icon: Megaphone, label: "Marketing", color: "text-moss" },
  { icon: Receipt, label: "Taxation", color: "text-navy-700" },
  { icon: Bot, label: "AI Tools", color: "text-moss" },
  { icon: TrendingUp, label: "Business Growth", color: "text-navy-700" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 opacity-[0.07] bg-route-dots"
          style={{ backgroundSize: "18px 18px" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 mb-5">
            A map for first-time founders
          </p>
          <h1 className="font-display text-4xl sm:text-6xl text-paper leading-[1.05] max-w-3xl">
            Every startup journey needs a navigator.
          </h1>
          <p className="text-paper/70 text-lg mt-6 max-w-xl leading-relaxed">
            From registering your company to closing your first funding round —
            explore a curated knowledge base built for entrepreneurs, and ask our
            AI anything when you need a straight answer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-navy-950 font-semibold px-6 py-3 rounded-full hover:bg-amber-400 transition-colors focus-ring"
            >
              <MessageSquareText className="w-4 h-4" /> Ask the AI Navigator
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 border border-paper/25 text-paper px-6 py-3 rounded-full hover:border-amber-500 hover:text-amber-400 transition-colors focus-ring"
            >
              Explore Topics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Route map of topics — signature element */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-navy-900">
              Your route, plotted out
            </h2>
            <p className="text-ink/60 mt-2 max-w-md">
              Nine waypoints every founder eventually passes through — pick one to start.
            </p>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-navy-900 hover:text-amber-600 flex items-center gap-1">
            View all topics <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          {/* connecting route line, desktop only */}
          <svg
            className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 -z-0"
            height="2"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="1" x2="100%" y2="1" stroke="#E8A33D" strokeWidth="2" strokeDasharray="1 10" strokeLinecap="round" />
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-4 relative z-10">
            {TOPICS.map((t, i) => (
              <Link
                key={t.label}
                to={`/explore?category=${encodeURIComponent(t.label)}`}
                className="flex flex-col items-center gap-2 group focus-ring rounded-xl p-2"
              >
                <span className="w-12 h-12 rounded-full bg-white border-2 border-navy-900/10 flex items-center justify-center group-hover:border-amber-500 group-hover:scale-105 transition-all shadow-sm">
                  <t.icon className={`w-5 h-5 ${t.color}`} strokeWidth={1.75} />
                </span>
                <span className="text-[11px] font-mono text-center text-ink/70 leading-tight">
                  {t.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-navy-900/5 border-y border-navy-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-3 gap-8">
          <div>
            <span className="font-mono text-xs text-amber-600">01</span>
            <h3 className="font-display text-xl text-navy-900 mt-2 mb-2">Curated, not crawled</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              Every article is written for founders, not lawyers or accountants —
              plain language, practical steps.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-amber-600">02</span>
            <h3 className="font-display text-xl text-navy-900 mt-2 mb-2">AI, grounded in fact</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              Our AI Search retrieves relevant articles first, then answers —
              so you get sourced guidance, not hallucination.
            </p>
          </div>
          <div>
            <span className="font-mono text-xs text-amber-600">03</span>
            <h3 className="font-display text-xl text-navy-900 mt-2 mb-2">Your history, saved</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              Every question you ask is saved to your dashboard, so you can
              retrace your steps anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
