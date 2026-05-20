import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon = "📋", title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-[13px] text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[13px] font-semibold rounded-2xl hover:scale-105 transition-all">
          + {actionLabel}
        </Link>
      )}
    </div>
  );
}