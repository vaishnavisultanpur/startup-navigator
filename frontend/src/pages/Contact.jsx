import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // No backend endpoint wired for contact — this is a UI-complete demo form.
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
        Get in touch
      </p>
      <h1 className="font-display text-3xl sm:text-4xl text-navy-900 mb-3">Contact</h1>
      <p className="text-ink/60 mb-10">
        Questions, feedback, or found a bug? Send a message below.
      </p>

      {sent ? (
        <div className="bg-moss/10 border border-moss/30 rounded-2xl p-6 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-moss flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-display text-lg text-navy-900 mb-1">Message received</p>
            <p className="text-sm text-ink/60">Thanks for reaching out — we'll get back to you soon.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="bg-white border border-navy-900/10 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-ink/60 mb-1 block">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-navy-900/15 rounded-lg px-3 py-2.5 text-sm focus-ring resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-navy-900 text-paper rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-navy-800 transition-colors focus-ring"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}

      <div className="flex items-center gap-2 mt-8 text-sm text-ink/60">
        <Mail className="w-4 h-4" /> hello@startupnavigator.demo
      </div>
    </div>
  );
}
