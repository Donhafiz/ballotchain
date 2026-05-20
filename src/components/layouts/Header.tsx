interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Header({ title, subtitle, actions, breadcrumbs }: HeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-2">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {crumb.href ? <a href={crumb.href} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{crumb.label}</a> : <span className="text-gray-600 dark:text-gray-300 font-medium">{crumb.label}</span>}
                {i < breadcrumbs.length - 1 && <span>›</span>}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5 font-medium">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}