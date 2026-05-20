interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    danger: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    info: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    neutral: "bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400",
  };
  return <span className={"inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold " + variants[variant] + " " + className}>{children}</span>;
}