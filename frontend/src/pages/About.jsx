import { Compass, Layers, Search, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
        About the project
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-navy-900 mb-6">
        Why Startup Navigator exists
      </h1>
      <p className="text-ink/70 leading-relaxed mb-4">
        Most first-time founders don't fail because their idea is bad — they get
        stuck untangling company registration paperwork, funding jargon, and
        compliance checklists scattered across a dozen government websites.
        Startup Navigator brings that knowledge into one place, written in plain
        language, with an AI assistant that can answer specific questions on demand.
      </p>
      <p className="text-ink/70 leading-relaxed mb-10">
        This build was created as a technical assignment demonstrating a
        full-stack AI application: a React frontend, a FastAPI backend, JWT
        authentication, an admin content-management system, and a
        Retrieval-Augmented Generation (RAG) search pipeline.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex gap-3">
          <Layers className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-lg text-navy-900 mb-1">Curated knowledge base</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              Articles across 9 categories, manageable through an admin dashboard.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Search className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-lg text-navy-900 mb-1">Grounded AI search</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              TF-IDF retrieval finds relevant articles before any answer is generated.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-lg text-navy-900 mb-1">Secure by default</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              JWT-based auth, hashed passwords, and role-gated admin routes.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Compass className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-lg text-navy-900 mb-1">Built for founders</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              Every article is written to be actionable, not academic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
