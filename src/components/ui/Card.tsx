interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

export default function Card({ children, className = "", hover = false, padding = true }: CardProps) {
  return (
    <div className={"bg-white dark:bg-[#0a0a10] border border-gray-100/80 dark:border-gray-800/30 rounded-3xl shadow-sm " + 
      (hover ? "hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer" : "") + " " +
      (padding ? "p-7" : "") + " " + className}>
      {children}
    </div>
  );
}