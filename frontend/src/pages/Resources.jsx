import { ExternalLink } from "lucide-react";

const RESOURCES = [
  {
    title: "Startup India Portal",
    description: "Official government portal for DPIIT recognition and startup benefits.",
    url: "https://www.startupindia.gov.in",
  },
  {
    title: "MCA — Ministry of Corporate Affairs",
    description: "Company incorporation, ROC filings, and compliance forms (SPICe+).",
    url: "https://www.mca.gov.in",
  },
  {
    title: "GST Portal",
    description: "GST registration, return filing, and Input Tax Credit management.",
    url: "https://www.gst.gov.in",
  },
  {
    title: "IP India — Trademark & Patent Office",
    description: "Trademark search, filing, and startup patent fast-track scheme.",
    url: "https://ipindia.gov.in",
  },
  {
    title: "SIDBI — Startup Funding Schemes",
    description: "Government-backed funds and credit guarantee schemes for startups.",
    url: "https://www.sidbi.in",
  },
  {
    title: "Y Combinator Startup Library",
    description: "Free essays and guides on fundraising, growth, and hiring.",
    url: "https://www.ycombinator.com/library",
  },
];

export default function Resources() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
        External links
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-navy-900 mb-3">Resources</h1>
      <p className="text-ink/60 max-w-xl mb-10">
        Official portals and trusted external resources worth bookmarking alongside
        our knowledge base.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {RESOURCES.map((r) => (
          <a
            key={r.title}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-navy-900/10 rounded-2xl p-5 flex items-start justify-between gap-3 hover:border-amber-500/60 hover:shadow-md transition-all focus-ring group"
          >
            <div>
              <h3 className="font-display text-lg text-navy-900 mb-1.5">{r.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{r.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-navy-900/30 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1" />
          </a>
        ))}
      </div>
    </div>
  );
}
