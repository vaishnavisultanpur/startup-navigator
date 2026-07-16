import { Compass } from "lucide-react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-navy-700">
      <Compass className="w-8 h-8 animate-spin text-amber-500" style={{ animationDuration: "2s" }} />
      <p className="text-sm font-mono">{label}</p>
    </div>
  );
}
