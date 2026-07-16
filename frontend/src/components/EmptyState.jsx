export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-2 text-center px-4">
      {Icon && <Icon className="w-8 h-8 text-navy-700/40 mb-1" />}
      <p className="font-display text-lg text-navy-900">{title}</p>
      {description && <p className="text-sm text-ink/60 max-w-sm">{description}</p>}
    </div>
  );
}
