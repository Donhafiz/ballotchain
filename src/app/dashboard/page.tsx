"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user, elections, fetchElections, loading } = useApp();
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const donutChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { fetchElections(); }, []);

  useEffect(() => {
    if (!lineChartRef.current || !donutChartRef.current) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

      const lineCtx = lineChartRef.current?.getContext("2d");
      if (lineCtx) {
        new Chart(lineCtx, {
          type: "line",
          data: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], datasets: [
            { label: "Online", data: [320,480,710,590,830,420,610], borderColor: "#378ADD", backgroundColor: "rgba(55,138,221,0.08)", fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2 },
            { label: "In-person", data: [80,120,160,200,140,60,90], borderColor: "#639922", backgroundColor: "rgba(99,153,34,0.06)", fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2, borderDash: [5,4] },
          ]},
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: gridColor }, ticks: { font: { size: 11 } } }, y: { grid: { color: gridColor }, ticks: { font: { size: 11 } }, beginAtZero: true } } },
        });
      }

      const donutCtx = donutChartRef.current?.getContext("2d");
      if (donutCtx) {
        new Chart(donutCtx, {
          type: "doughnut",
          data: { labels: ["Single","Multiple","Ranked","Cumulative"], datasets: [{ data: [50,25,17,8], backgroundColor: ["#378ADD","#639922","#EF9F27","#7F77DD"], borderWidth: 0, hoverOffset: 4 }] },
          options: { responsive: true, maintainAspectRatio: false, cutout: "65%", plugins: { legend: { display: false } } },
        });
      }
    })();
  }, [elections]);

  const activeElections = elections.filter((e) => e.status === "active").length;
  const totalVoters = elections.reduce((s, e) => s + e.totalVoters, 0);
  const totalVotes = elections.reduce((s, e) => s + e.totalVotes, 0);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="w-[220px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#185FA5] rounded-lg flex items-center justify-center text-white font-bold text-sm">B</div>
          <div><div className="text-sm font-semibold text-gray-900 dark:text-white">BallotChain</div><div className="text-[11px] text-gray-500">{user?.role || "Admin"}</div></div>
        </div>
        <nav className="flex-1 py-3 space-y-1 px-2">
          {[{ icon: "📊", label: "Dashboard", href: "/dashboard", active: true, badge: activeElections > 0 ? activeElections.toString() : null },
            { icon: "🗳️", label: "Elections", href: "/dashboard/elections" },
            { icon: "👥", label: "Voters", href: "/dashboard/voters" },
            { icon: "📈", label: "Results", href: "/dashboard/results" },
            { icon: "⚙️", label: "Settings", href: "/dashboard/settings" },
          ].map((item, i) => (
            <Link key={i} href={item.href} className={"flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all " + (item.active ? "bg-[#E6F1FB] dark:bg-blue-900/30 text-[#0C447C] dark:text-blue-300" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800")}>
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
              {item.badge && <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E6F1FB] dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-[#0C447C] dark:text-blue-300">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
          <div className="text-[13px] font-medium text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
          <div className="text-[13px] text-gray-500">🏠 › <span className="text-gray-900 dark:text-white font-medium">Dashboard</span></div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500">🔍</button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 relative">🔔<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.firstName} 👋</h1>
              <p className="text-[13px] text-gray-500 mt-1">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · {activeElections} active elections</p>
            </div>
            <Link href="/dashboard/elections/create" className="flex items-center gap-1.5 px-4 h-9 rounded-lg bg-[#185FA5] text-white text-[13px] font-medium hover:opacity-90 transition-opacity">+ New election</Link>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Total Elections", value: elections.length.toString(), icon: "🗳️", color: "blue" },
              { label: "Active Now", value: activeElections.toString(), icon: "🟢", color: "green" },
              { label: "Total Voters", value: totalVoters.toLocaleString(), icon: "👥", color: "amber" },
              { label: "Votes Cast", value: totalVotes.toLocaleString(), icon: "✅", color: "purple" },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={"w-9 h-9 rounded-lg flex items-center justify-center text-lg " + (stat.color === "blue" ? "bg-[#E6F1FB] text-[#185FA5]" : stat.color === "green" ? "bg-[#EAF3DE] text-[#3B6D11]" : stat.color === "amber" ? "bg-[#FAEEDA] text-[#854F0B]" : "bg-[#EEEDFE] text-[#534AB7]")}>{stat.icon}</div>
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1fr_320px] gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Votes over time</h3>
              <div className="h-[200px]"><canvas ref={lineChartRef} /></div>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Election types</h3>
              <div className="h-[160px]"><canvas ref={donutChartRef} /></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Elections</h3>
                <Link href="/dashboard/elections" className="text-xs text-[#185FA5] font-medium">View all →</Link>
              </div>
              {elections.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl mb-3 block">🗳️</span>
                  <p className="text-gray-500 mb-4">No elections yet</p>
                  <Link href="/dashboard/elections/create" className="text-sm text-white bg-[#185FA5] px-4 py-2 rounded-lg font-medium">Create First Election</Link>
                </div>
              ) : (
                elections.slice(0, 4).map((e) => (
                  <div key={e._id} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-[#E6F1FB] flex items-center justify-center text-sm">🗳️</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-gray-900 dark:text-white truncate">{e.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={"text-[10px] px-1.5 py-0.5 rounded-full font-medium " + (e.status === "active" ? "bg-[#EAF3DE] text-[#3B6D11]" : e.status === "draft" ? "bg-[#FAEEDA] text-[#854F0B]" : "bg-gray-100 text-gray-600")}>{e.status}</span>
                        <span className="text-[11px] text-gray-400">{e.totalVotes} votes</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "New election", icon: "+", color: "#E6F1FB", tc: "#185FA5", href: "/dashboard/elections/create" },
                  { label: "Import voters", icon: "↑", color: "#EAF3DE", tc: "#3B6D11", href: "/dashboard/voters" },
                  { label: "View results", icon: "📊", color: "#FAEEDA", tc: "#854F0B", href: "/dashboard/results" },
                  { label: "Settings", icon: "⚙️", color: "#EEEDFE", tc: "#534AB7", href: "/dashboard/settings" },
                ].map((a, i) => (
                  <Link key={i} href={a.href} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: a.color, color: a.tc }}>{a.icon}</div>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}