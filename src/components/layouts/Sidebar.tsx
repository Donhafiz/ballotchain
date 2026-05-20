"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
  badge?: number | null;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface SidebarProps {
  sections: SidebarSection[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Sidebar({ sections, logo, footer }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-white/80 dark:bg-[#0a0a10]/90 backdrop-blur-2xl border-r border-gray-100/50 dark:border-gray-800/30 flex flex-col h-full">
      {logo && <div className="px-6 py-6">{logo}</div>}
      <nav className="flex-1 px-4 py-2 space-y-4 overflow-y-auto">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && <div className="px-4 pt-2 pb-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{section.title}</div>}
            <div className="space-y-0.5">
              {section.items.map((item, ii) => (
                <Link key={ii} href={item.href}
                  className={"flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-medium transition-all " + 
                    (pathname === item.href ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-white/5 hover:text-gray-900")}>
                  <span className="w-5 text-center">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">{item.badge}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      {footer && <div className="p-4">{footer}</div>}
    </aside>
  );
}