"use client";

import { motion } from "framer-motion";

interface Tab { id: string; label: string; icon?: string; badge?: number; }

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-2xl">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => onChange(tab.id)}
          className={"relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all " + 
            (active === tab.id ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300")}>
          {active === tab.id && <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white dark:bg-gray-700 rounded-xl shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
          <span className="relative z-10 flex items-center gap-1.5">{tab.icon}{tab.label}{tab.badge ? <span className="text-[10px] bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full">{tab.badge}</span> : null}</span>
        </button>
      ))}
    </div>
  );
}