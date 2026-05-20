"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store/AppContext";

const sidebarItems = [
  { section: "MAIN", items: [
    { icon: "📊", label: "Dashboard", href: "/dashboard/admin", badge: null },
    { icon: "🗳️", label: "Elections", href: "/dashboard/admin/elections", badge: null },
    { icon: "👤", label: "Candidates", href: "/dashboard/admin/elections", badge: null },
    { icon: "👥", label: "Voters", href: "/dashboard/admin/elections", badge: null },
  ]},
  { section: "MANAGEMENT", items: [
    { icon: "🏢", label: "Organizations", href: "/dashboard/admin/organizations", badge: null },
    { icon: "👥", label: "Users", href: "/dashboard/admin/users", badge: null },
    { icon: "🔑", label: "Access Codes", href: "/dashboard/admin/elections", badge: null },
  ]},
  { section: "ANALYTICS", items: [
    { icon: "📈", label: "Reports", href: "/dashboard/admin/reports", badge: null },
    { icon: "📋", label: "Activity Log", href: "/dashboard/admin/reports/activity", badge: null },
    { icon: "🛡️", label: "Audit Trail", href: "/dashboard/admin/reports/audit-log", badge: null },
    { icon: "📥", label: "Exports", href: "/dashboard/admin/reports", badge: null },
  ]},
  { section: "SYSTEM", items: [
    { icon: "⚙️", label: "Settings", href: "/dashboard/admin/settings", badge: null },
    { icon: "🔒", label: "Security", href: "/dashboard/admin/settings/security", badge: null },
    { icon: "💻", label: "System", href: "/dashboard/admin/settings/system", badge: null },
  ]},
];

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, elections, fetchElections, token } = useApp();
  const [activeElections, setActiveElections] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalElections: 0, activeNow: 0, totalVoters: 0, totalVotes: 0, turnout: 0 });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const donutChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchElections();
    loadChartJS();
  }, []);

  useEffect(() => {
    if (elections.length > 0) {
      const active = elections.filter((e) => e.status === "active");
      setActiveElections(active);
      setStats({
        totalElections: elections.length,
        activeNow: active.length,
        totalVoters: elections.reduce((s, e) => s + (e.totalVoters || 0), 0),
        totalVotes: elections.reduce((s, e) => s + (e.totalVotes || 0), 0),
        turnout: elections.length > 0 ? Math.round((elections.reduce((s, e) => s + (e.totalVotes || 0), 0) / Math.max(elections.reduce((s, e) => s + (e.totalVoters || 0), 0), 1)) * 100) : 0,
      });
    }

    setRecentActivity([
      { text: "New election created: Student Council 2026", time: "2 min ago", type: "create" },
      { text: "Alice Johnson cast a vote", time: "5 min ago", type: "vote" },
      { text: "5 new voters imported via CSV", time: "18 min ago", type: "import" },
      { text: "Security alert: Failed login attempt", time: "1 hour ago", type: "alert" },
      { text: "Election results exported", time: "2 hours ago", type: "export" },
    ]);
  }, [elections]);

  const loadChartJS = async () => {
    const Chart = (await import("chart.js/auto")).default;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            datasets: [{
              label: "Votes", data: [320,480,710,590,830,420,610],
              borderColor: "#378ADD", backgroundColor: "rgba(55,138,221,0.1)", fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#378ADD", borderWidth: 2,
            }],
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: gridColor } }, y: { grid: { color: gridColor }, beginAtZero: true } } },
        });
      }
    }

    if (donutChartRef.current) {
      const ctx = donutChartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "doughnut",
          data: { labels: ["Single","Multiple","Ranked"], datasets: [{ data: [50,30,20], backgroundColor: ["#378ADD","#639922","#EF9F27"], borderWidth: 0 }] },
          options: { responsive: true, maintainAspectRatio: false, cutout: "70%", plugins: { legend: { display: false } } },
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* SIDEBAR */}
      <aside className="w-[240px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col flex-shrink-0 overflow-y-auto">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <div className="text-sm font-extrabold text-gray-900 dark:text-white">BallotChain</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 space-y-4">
          {sidebarItems.map((section, si) => (
            <div key={si}>
              <div className="px-5 mb-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{section.section}</div>
              {section.items.map((item, ii) => {
                const isActive = pathname === item.href;
                const activeCount = item.label === "Elections" ? stats.activeNow : null;
                return (
                  <Link key={ii} href={item.href}
                    className={"flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all " + (isActive ? "bg-[#E6F1FB] dark:bg-blue-900/30 text-[#0C447C] dark:text-blue-300" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800")}>
                    <span className="text-base w-5 text-center">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {activeCount !== null && activeCount > 0 && (
                      <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-[10px] font-bold">{activeCount}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">{user?.firstName} {user?.lastName}</div>
              <div className="text-[11px] text-gray-500 capitalize">{user?.role?.replace("_", " ") || "Admin"}</div>
            </div>
            <button onClick={() => { localStorage.clear(); router.push("/login"); }} className="text-gray-400 hover:text-red-500 transition-colors" title="Sign Out">⏻</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3 text-[13px] text-gray-500">
            <button onClick={() => setShowSearch(!showSearch)} className="hover:text-gray-700 dark:hover:text-white">🔍</button>
            {showSearch && <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm outline-none" placeholder="Search elections, voters, candidates..." autoFocus />}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              🔔
              {notifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{notifications}</span>}
            </button>
            <Link href="/dashboard/admin/settings" className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">⚙️</Link>
          </div>

          <AnimatePresence>
            {showNotifications && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-14 right-6 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-4 z-50">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Notifications</h3>
                {["New election created","Voter import complete","Security alert: 3 failed logins"].map((n, i) => (
                  <div key={i} className="py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 text-[13px] text-gray-600 dark:text-gray-400">{n}</div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-[13px] text-gray-500 mt-1">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} · {stats.activeNow} active elections</p>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard/admin/elections/create" className="flex items-center gap-2 px-4 h-10 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all">+ New Election</Link>
              <button className="flex items-center gap-2 px-4 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">📥 Export</button>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Elections", value: stats.totalElections, icon: "🗳️", color: "blue", sub: stats.activeNow + " active" },
              { label: "Registered Voters", value: stats.totalVoters.toLocaleString(), icon: "👥", color: "green", sub: "Across all elections" },
              { label: "Votes Cast", value: stats.totalVotes.toLocaleString(), icon: "✅", color: "amber", sub: stats.turnout + "% turnout" },
              { label: "Organizations", value: "3", icon: "🏢", color: "purple", sub: "2 active" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className={"w-10 h-10 rounded-xl flex items-center justify-center text-lg " + (s.color === "blue" ? "bg-[#E6F1FB] text-[#185FA5]" : s.color === "green" ? "bg-[#EAF3DE] text-[#3B6D11]" : s.color === "amber" ? "bg-[#FAEEDA] text-[#854F0B]" : "bg-[#EEEDFE] text-[#534AB7]")}>{s.icon}</div>
                </div>
                <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{s.value}</div>
                <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* CHARTS + QUICK ACTIONS */}
          <div className="grid grid-cols-[1fr_300px] gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Voting Activity (7 Days)</h3>
                <select className="text-xs bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-2 py-1">
                  <option>This Week</option><option>This Month</option><option>This Year</option>
                </select>
              </div>
              <div className="h-[220px]"><canvas ref={lineChartRef} /></div>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Election Types</h3>
                <div className="h-[120px]"><canvas ref={donutChartRef} /></div>
                <div className="flex justify-center gap-3 mt-2 text-[10px] text-gray-500">
                  <span>● Single 50%</span><span>● Multiple 30%</span><span>● Ranked 20%</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: "Create Election", icon: "🗳️", href: "/dashboard/admin/elections/create" },
                    { label: "Import Voters", icon: "📥", href: "/dashboard/admin/elections" },
                    { label: "View Reports", icon: "📊", href: "/dashboard/admin/reports" },
                    { label: "System Settings", icon: "⚙️", href: "/dashboard/admin/settings" },
                  ].map((a, i) => (
                    <Link key={i} href={a.href} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-[13px] font-medium text-gray-700 dark:text-gray-300">
                      <span className="text-base">{a.icon}</span> {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ELECTIONS + ACTIVITY */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Elections</h3>
                <Link href="/dashboard/admin/elections" className="text-xs text-blue-600 font-semibold">View All →</Link>
              </div>
              {activeElections.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-3xl block mb-2">🗳️</span>
                  <p className="text-sm">No active elections</p>
                  <Link href="/dashboard/admin/elections/create" className="text-blue-600 text-sm font-semibold mt-2 block">Create one →</Link>
                </div>
              ) : (
                activeElections.slice(0, 4).map((e) => (
                  <Link key={e._id} href={"/dashboard/admin/elections/" + e._id} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors -mx-2 px-2 rounded-lg">
                    <div className="w-9 h-9 bg-[#E6F1FB] rounded-lg flex items-center justify-center text-sm">🗳️</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">{e.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">Active</span>
                        <span className="text-[11px] text-gray-400">{e.totalVotes || 0} votes</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-gray-400">
                      {e.totalVoters ? Math.round((e.totalVotes || 0) / Math.max(e.totalVoters, 1) * 100) : 0}%
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                <Link href="/dashboard/admin/reports/activity" className="text-xs text-blue-600 font-semibold">See All →</Link>
              </div>
              <div className="space-y-1">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className={"w-2 h-2 rounded-full flex-shrink-0 " + (act.type === "create" ? "bg-blue-500" : act.type === "vote" ? "bg-green-500" : act.type === "import" ? "bg-purple-500" : "bg-red-500")} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-gray-700 dark:text-gray-300">{act.text}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}