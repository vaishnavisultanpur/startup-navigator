import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Compass className="w-10 h-10 text-amber-500 mb-4" />
      <h1 className="font-display text-3xl text-navy-900 mb-2">Off the map</h1>
      <p className="text-ink/60 mb-6">This page doesn't exist. Let's get you back on route.</p>
      <Link to="/" className="bg-navy-900 text-paper rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-navy-800 transition-colors focus-ring">
        Back to Home
      </Link>
    </div>
  );
}
