"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store/AppContext";

export default function DashboardPage() {
  const { user, elections, fetchElections } = useApp();
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const lineChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    fetchElections();
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
    setTimeStr(new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  }, []);

  useEffect(() => {
    if (!lineChartRef.current || !donutChartRef.current || !barChartRef.current) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const gridColor = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
      const textColor = isDark ? "#6b7280" : "#9ca3af";

      // Master Line Chart
      const lCtx = lineChartRef.current.getContext("2d");
      if (lCtx) {
        const gradient = lCtx.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, "rgba(37, 99, 235, 0.25)");
        gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
        new Chart(lCtx, {
          type: "line",
          data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [{
              data: [2100,3400,2900,4800,3900,6200,5400,7100,6800,8900,7600,9500],
              borderColor: "#3b82f6",
              backgroundColor: gradient,
              fill: true,
              tension: 0.3,
              pointRadius: 0,
              pointHoverRadius: 8,
              pointHoverBackgroundColor: "#3b82f6",
              pointHoverBorderColor: "#fff",
              pointHoverBorderWidth: 3,
              borderWidth: 2.5,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                titleFont: { family: "Inter, system-ui", size: 13, weight: "600" },
                bodyFont: { family: "Inter, system-ui", size: 12 },
                padding: 14,
                cornerRadius: 12,
                displayColors: false,
                callbacks: { label: (ctx) => ctx.parsed.y.toLocaleString() + " votes" },
              },
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11, weight: "500" }, maxTicksLimit: 6, padding: 8 } },
              y: { 
                grid: { color: gridColor, drawBorder: false },
                ticks: { color: textColor, font: { size: 11, weight: "500" }, callback: (v) => v >= 1000 ? (v/1000).toFixed(1) + "k" : v, padding: 8 },
                beginAtZero: true,
                border: { display: false },
              },
            },
          },
        });
      }

      // Donut Chart
      const dCtx = donutChartRef.current.getContext("2d");
      if (dCtx) new Chart(dCtx, {
        type: "doughnut",
        data: {
          labels: ["Active", "Completed", "Draft", "Archived"],
          datasets: [{
            data: [3, 14, 6, 2],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#6b7280"],
            borderWidth: 3,
            borderColor: isDark ? "#0f0f15" : "#ffffff",
            hoverOffset: 10,
            borderRadius: 6,
            spacing: 6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "82%",
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
        },
      });

      // Bar Chart
      const bCtx = barChartRef.current.getContext("2d");
      if (bCtx) new Chart(bCtx, {
        type: "bar",
        data: {
          labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
          datasets: [{
            data: [450, 620, 780, 550, 920, 680, 740],
            backgroundColor: ["#3b82f6","#60a5fa","#93c5fd","#3b82f6","#60a5fa","#93c5fd","#3b82f6"],
            borderRadius: 10,
            borderSkipped: false,
            barPercentage: 0.5,
            categoryPercentage: 0.6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: textColor, font: { size: 10, weight: "600" } }, border: { display: false } },
            y: { grid: { color: gridColor, drawBorder: false }, ticks: { display: false }, border: { display: false }, beginAtZero: true },
          },
        },
      });
    })();
  }, [elections]);

  const stats = [
    { label: "Total Elections", value: elections.length, trend: "+12%", up: true, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "blue" },
    { label: "Active Now", value: elections.filter(e => e.status === "active").length, trend: "Live", up: true, icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "emerald" },
    { label: "Total Voters", value: elections.reduce((s,e) => s + (e.totalVoters||0), 0).toLocaleString(), trend: "+8.4%", up: true, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "violet" },
    { label: "Votes Cast", value: elections.reduce((s,e) => s + (e.totalVotes||0), 0).toLocaleString(), trend: "+23%", up: true, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "amber" },
  ];

  const menuItems = [
    { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Overview", href: "/dashboard", active: true, badge: null },
    { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", label: "Elections", href: "/dashboard/elections", active: false, badge: elections.length },
    { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Voters", href: "/dashboard/voters", active: false, badge: null },
    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Results", href: "/dashboard/results", active: false, badge: null },
    { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Reports", href: "/dashboard/reports", active: false, badge: null },
    { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Settings", href: "/dashboard/settings", active: false, badge: null },
  ];

  const recentElections = elections.length > 0 ? elections.slice(0, 5) : [];

  return (
    <div className="flex h-screen bg-[#fafafa] dark:bg-[#050508] overflow-hidden selection:bg-blue-100 dark:selection:bg-blue-900/40">
      {/* SIDEBAR - Inspired by Apple Design */}
      <aside className="w-[280px] bg-white/80 dark:bg-[#0a0a10]/90 backdrop-blur-2xl border-r border-gray-100/50 dark:border-gray-800/30 flex flex-col flex-shrink-0">
        {/* Logo Area */}
        <div className="px-6 py-7">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:shadow-blue-500/30 group-hover:scale-105 transition-all duration-500">
              <span className="text-white font-bold text-base tracking-tight">B</span>
            </div>
            <div className="leading-none">
              <div className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">BallotChain</div>
              <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Enterprise</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href}
              className={"group flex items-center gap-3 px-4 py-3 rounded-2xl text-[13.5px] font-medium transition-all duration-200 relative " + 
                (item.active 
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-900/10 dark:shadow-white/5" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white")}>
              <svg className="w-[19px] h-[19px] flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span className="flex-1">{item.label}</span>
              {item.badge !== null && item.badge !== undefined && (
                <span className={"text-[11px] font-semibold px-2 py-0.5 rounded-full " + (item.active ? "bg-white/20 text-white" : "bg-gray-200/70 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 mx-3 mb-3 mt-2">
          <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-100/70 dark:hover:bg-white/5 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 dark:from-white dark:to-gray-200 flex items-center justify-center text-white dark:text-gray-900 font-bold text-sm shadow-lg">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0 leading-tight">
              <div className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">{user?.firstName} {user?.lastName}</div>
              <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium capitalize">{user?.role?.replace(/_/g, " ") || "Admin"}</div>
            </div>
            <button onClick={() => { localStorage.clear(); router.push("/login"); }} 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 -mr-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="h-[72px] bg-white/80 dark:bg-[#0a0a10]/90 backdrop-blur-2xl border-b border-gray-100/50 dark:border-gray-800/30 flex items-center justify-between px-10 flex-shrink-0">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search...
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-400 border border-gray-200 dark:border-gray-700 ml-1">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0a0a10] animate-pulse" />
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-3" />
            <Link href="/dashboard/elections/create" 
              className="flex items-center gap-2 px-5 h-11 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[13px] font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-gray-900/10 dark:shadow-white/5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              New Election
            </Link>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1500px] mx-auto p-10 space-y-8">
            
            {/* GREETING */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-[32px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                {greeting}, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.firstName}</span>
              </h1>
              <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-1.5 font-medium">{timeStr} · {elections.filter(e => e.status === "active").length} elections active</p>
            </motion.div>

            {/* STATS - Premium Cards */}
            <div className="grid grid-cols-4 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative bg-white dark:bg-[#0a0a10] border border-gray-100/80 dark:border-gray-800/30 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-current opacity-[0.02] rounded-bl-[60px] -mr-8 -mt-8 transition-opacity group-hover:opacity-[0.05]" />
                  <div className="flex items-center justify-between mb-5">
                    <div className={"w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg " + 
                      (stat.color === "blue" ? "bg-blue-50 text-blue-600 shadow-blue-200/50" : 
                       stat.color === "emerald" ? "bg-emerald-50 text-emerald-600 shadow-emerald-200/50" : 
                       stat.color === "violet" ? "bg-violet-50 text-violet-600 shadow-violet-200/50" : 
                       "bg-amber-50 text-amber-600 shadow-amber-200/50")}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d={stat.icon} /></svg>
                    </div>
                    <span className={"text-[11px] font-bold px-2.5 py-1 rounded-full " + (stat.up ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-gray-100 text-gray-600")}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">{stat.label}</div>
                  <div className="text-[30px] font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-3 gap-5">
              {/* Main Chart */}
              <div className="col-span-2 bg-white dark:bg-[#0a0a10] border border-gray-100/80 dark:border-gray-800/30 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">Voting Activity</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5 font-medium">Monthly vote distribution across all elections</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500"><span className="w-2 h-2 rounded-full bg-blue-500" /> Votes</span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400"><span className="w-2 h-2 rounded-full bg-purple-400" /> Elections</span>
                  </div>
                </div>
                <div className="h-[280px]"><canvas ref={lineChartRef} /></div>
              </div>

              {/* Donut + Weekly */}
              <div className="space-y-5">
                <div className="bg-white dark:bg-[#0a0a10] border border-gray-100/80 dark:border-gray-800/30 rounded-3xl p-7 shadow-sm h-[200px] relative">
                  <h3 className="text-[13px] font-bold text-gray-900 dark:text-white mb-3">Status Breakdown</h3>
                  <div className="h-[140px]"><canvas ref={donutChartRef} /></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center mt-2">
                      <div className="text-[26px] font-bold text-gray-900 dark:text-white">25</div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">Total</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0a0a10] border border-gray-100/80 dark:border-gray-800/30 rounded-3xl p-7 shadow-sm">
                  <h3 className="text-[13px] font-bold text-gray-900 dark:text-white mb-4">This Week</h3>
                  <div className="h-[100px]"><canvas ref={barChartRef} /></div>
                </div>
              </div>
            </div>

            {/* BOTTOM - Elections Table */}
            <div className="bg-white dark:bg-[#0a0a10] border border-gray-100/80 dark:border-gray-800/30 rounded-3xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50 dark:border-gray-800/30">
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">Recent Elections</h3>
                  <p className="text-[12px] text-gray-400 mt-0.5 font-medium">Manage and monitor your elections</p>
                </div>
                <Link href="/dashboard/elections" className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">View all →</Link>
              </div>
              
              {recentElections.length === 0 ? (
                <div className="px-8 py-20 text-center">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2">No elections yet</h3>
                  <p className="text-[13px] text-gray-500 mb-6">Create your first election to get started</p>
                  <Link href="/dashboard/elections/create" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[13px] font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Create Election
                  </Link>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800/30">
                      <th className="text-left px-8 py-4 font-medium">Election</th>
                      <th className="text-left px-8 py-4 font-medium">Status</th>
                      <th className="text-left px-8 py-4 font-medium">Voters</th>
                      <th className="text-left px-8 py-4 font-medium">Progress</th>
                      <th className="text-right px-8 py-4 font-medium">Turnout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/20">
                    {recentElections.map((e, i) => (
                      <motion.tr 
                        key={e._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => router.push("/dashboard/elections/" + e._id)}>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/20 flex items-center justify-center text-lg">🗳️</div>
                            <div>
                              <div className="text-[13.5px] font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{e.title}</div>
                              <div className="text-[11px] text-gray-400 mt-0.5">{e.type?.replace(/_/g, " ") || "Single Choice"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold " + 
                            (e.status === "active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : 
                             e.status === "draft" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" : 
                             "bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400")}>
                            <span className={"w-1.5 h-1.5 rounded-full " + (e.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-current")} />
                            {e.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-[13px] text-gray-600 dark:text-gray-400 font-medium">{e.totalVoters || 0}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden max-w-[120px]">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700" 
                                style={{ width: (e.totalVoters ? Math.round((e.totalVotes||0)/Math.max(e.totalVoters,1)*100) : 0) + "%" }} />
                            </div>
                            <span className="text-[11px] text-gray-400 font-medium w-8">{e.totalVoters ? Math.round((e.totalVotes||0)/Math.max(e.totalVoters,1)*100) : 0}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="text-[13px] font-bold text-gray-900 dark:text-white">{e.totalVotes || 0}</span>
                          <span className="text-[11px] text-gray-400 ml-1">votes</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}