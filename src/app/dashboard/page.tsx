"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Vote, Users, TrendingUp, Activity, Plus, ArrowUp, ArrowRight,
  Zap, Clock, Eye, Sparkles, ShieldCheck, BarChart3, Layers3
, FileText } from "lucide-react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("");
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    if (!mounted || !chartRef.current) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, 0, 240);
      gradient.addColorStop(0, "rgba(16,185,129,0.3)");
      gradient.addColorStop(1, "rgba(16,185,129,0)");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data: [420, 580, 810, 690, 930, 720, 850], borderColor: "#10b981", backgroundColor: gradient, fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: "#10b981", pointBorderColor: "#030303", pointBorderWidth: 2, borderWidth: 2.5 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: "rgba(255,255,255,0.2)", font: { size: 10 } } },
            y: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "rgba(255,255,255,0.2)", font: { size: 10 } }, beginAtZero: true }
          }
        },
      });
    })();
  }, [mounted]);

  const stats = [
    { label: "Total Elections", value: "24", icon: Vote, change: "+12%", gradient: "from-emerald-400 to-cyan-400" },
    { label: "Active Now", value: "3", icon: Zap, change: "Live", gradient: "from-emerald-400 to-emerald-300", live: true },
    { label: "Voters", value: "12,847", icon: Users, change: "+8.4%", gradient: "from-violet-400 to-purple-400" },
    { label: "Votes Today", value: "2,391", icon: TrendingUp, change: "+23%", gradient: "from-amber-400 to-orange-400" },
  ];

  const quickActions = [
    { label: "Create Election", icon: Plus, href: "/dashboard/elections/create", accent: true },
    { label: "View Results", icon: Eye, href: "/dashboard/results" },
    { label: "Manage Voters", icon: Users, href: "/dashboard/voters" },
    { label: "Generate Report", icon: FileText, href: "/dashboard/reports" },
    { label: "System Health", icon: Activity, href: "/dashboard/health" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#030303] flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10">
              <Sparkles className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-[28px] font-black tracking-[-0.03em]">{greeting}, Admin</h1>
              <p className="text-[13px] text-white/35 mt-1">Here is your election command center.</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <Link href="/dashboard/elections/create" className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 p-[1px]">
            <div className="flex items-center gap-2 rounded-2xl bg-[#030303] px-5 py-[10px] text-[13px] font-black text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-black">
              <Plus className="w-[14px] h-[14px]" /> New Election
            </div>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-full ${stat.live ? "bg-emerald-400/10 text-emerald-300" : "bg-emerald-400/10 text-emerald-300"}`}>
                  {stat.live && <span className="relative flex h-[6px] w-[6px]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-300" /></span>}
                  {stat.change}
                </span>
              </div>
              <div className="text-[11px] font-black text-white/25 uppercase tracking-[0.08em] mb-2">{stat.label}</div>
              <div className="text-[34px] font-black tracking-[-0.04em]">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div><h3 className="text-[15px] font-black">Voting Trends</h3><p className="text-[12px] text-white/25 mt-1">Weekly vote volume</p></div>
            <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl p-1">
              {["7D", "30D", "90D"].map(p => <button key={p} className={"px-3 py-[6px] rounded-lg text-[11px] font-bold transition-all " + (p === "7D" ? "bg-white/[0.06] text-white" : "text-white/25 hover:text-white")}>{p}</button>)}
            </div>
          </div>
          <div className="h-[260px]"><canvas ref={chartRef} /></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl flex flex-col">
          <h3 className="text-[15px] font-black mb-5">Quick Actions</h3>
          <div className="flex flex-col gap-2 flex-1">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href} className={`flex items-center gap-3 px-4 py-[11px] rounded-xl text-[13px] font-bold no-underline transition-all group ${action.accent ? "bg-gradient-to-r from-emerald-400/10 to-cyan-400/5 border border-emerald-400/15 text-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "text-white/40 hover:text-white hover:bg-white/[0.03]"}`}>
                <action.icon className="w-[16px] h-[16px]" />
                <span className="flex-1">{action.label}</span>
                <ArrowRight className="w-[14px] h-[14px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
          <Link href="/dashboard/elections/create" className="flex items-center justify-center gap-2 mt-4 py-[11px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[13px] font-black no-underline hover:opacity-90 transition-all"><Plus className="w-[14px] h-[14px]" /> New Election</Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5"><h3 className="text-[15px] font-black">Active Elections</h3><Link href="/dashboard/elections" className="text-[12px] font-bold text-emerald-300 hover:underline no-underline">View all</Link></div>
          <div className="space-y-1">
            {[{ title: "Student Council 2026", voters: 450, votes: 3847, turnout: 78, status: "Live" }, { title: "Faculty Senate", voters: 280, votes: 2190, turnout: 54, status: "Live" }, { title: "Sports Committee", voters: 120, votes: 0, turnout: 0, status: "Scheduled" }].map((e, i) => (
              <Link key={i} href={"/dashboard/elections/" + (i + 1)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-all no-underline group">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0"><Vote className="w-5 h-5 text-emerald-300" /></div>
                <div className="flex-1 min-w-0"><div className="text-[13px] font-bold text-white truncate">{e.title}</div><div className="text-[11px] text-white/25 mt-[2px]">{e.voters} voters ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· {e.votes} votes</div>
                  {e.turnout > 0 && <div className="mt-2 flex items-center gap-2"><div className="flex-1 h-[4px] bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full" style={{ width: e.turnout + "%" }} /></div><span className="text-[10px] font-bold text-white/25">{e.turnout}%</span></div>}
                </div>
                <span className={"text-[10px] font-black px-2 py-1 rounded-full uppercase " + (e.status === "Live" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300")}>{e.status}</span>
                <ArrowRight className="w-4 h-4 text-white/10 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5"><h3 className="text-[15px] font-black">Recent Activity</h3><span className="text-[11px] text-white/20"><Clock className="w-3 h-3 inline mr-1" />Live feed</span></div>
          <div className="space-y-1">
            {[{ text: "Alice Johnson voted in Student Council", time: "2 min ago", color: "bg-emerald-400" }, { text: "Admin imported 142 voters via CSV", time: "18 min ago", color: "bg-violet-400" }, { text: "Sports Committee election scheduled", time: "1 hour ago", color: "bg-amber-400" }, { text: "Security alert: 3 failed logins", time: "2 hours ago", color: "bg-red-400" }].map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-all">
                <div className={"w-2 h-2 rounded-full mt-[6px] shrink-0 " + a.color} />
                <div className="flex-1"><div className="text-[12px] text-white/50 leading-relaxed">{a.text}</div><div className="text-[10px] text-white/15 mt-1">{a.time}</div></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}