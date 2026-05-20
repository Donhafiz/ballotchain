"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: string;
  trendUp?: boolean;
  color?: "blue" | "emerald" | "violet" | "amber";
  delay?: number;
}

export default function StatCard({ label, value, icon, trend, trendUp = true, color = "blue", delay = 0 }: StatCardProps) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 shadow-blue-200/50",
    emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-200/50",
    violet: "bg-violet-50 text-violet-600 shadow-violet-200/50",
    amber: "bg-amber-50 text-amber-600 shadow-amber-200/50",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }} className="group relative bg-white dark:bg-[#0a0a10] border border-gray-100/80 dark:border-gray-800/30 rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-current opacity-[0.02] rounded-bl-[60px] -mr-8 -mt-8" />
      <div className="flex items-center justify-between mb-5">
        {icon && <div className={"w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-lg " + colors[color]}>{icon}</div>}
        {trend && <span className={"text-[11px] font-bold px-2.5 py-1 rounded-full " + (trendUp ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>{trend}</span>}
      </div>
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</div>
      <div className="text-[30px] font-bold text-gray-900 dark:text-white tracking-tight">{value}</div>
    </motion.div>
  );
}