import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-4">
      <AlertTriangle className="w-8 h-8 text-amber-600" />
      <p className="text-sm text-ink/70 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm font-semibold text-navy-900 border border-navy-900 rounded-full px-4 py-1.5 hover:bg-navy-900 hover:text-paper transition-colors focus-ring"
        >
          Try again
        </button>
      )}
    </div>
  );
}
