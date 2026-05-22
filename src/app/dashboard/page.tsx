"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Vote, Users, TrendingUp, Activity, Plus, ArrowUp, ArrowRight, Download, Zap, Clock, CheckCircle2, AlertTriangle, Eye, FileText } from "lucide-react";

export default function DashboardPage() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("");

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
      const gradient = ctx.createLinearGradient(0, 0, 0, 280);
      gradient.addColorStop(0, "rgba(79,255,176,0.25)");
      gradient.addColorStop(1, "rgba(79,255,176,0)");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
          datasets: [{
            data: [420, 580, 810, 690, 930, 720, 850],
            borderColor: "#4fffb0",
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#4fffb0",
            pointBorderColor: "#0b0c0f",
            pointBorderWidth: 2,
            borderWidth: 2.5,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: "index" },
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: "rgba(255,255,255,0.25)", font: { size: 10 } } },
            y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "rgba(255,255,255,0.25)", font: { size: 10 } }, beginAtZero: true }
          }
        },
      });
    })();
  }, [mounted]);

  const stats = [
    { label: "Total Elections", value: "24", icon: Vote, change: "+12%", trend: "up", color: "from-[#4fffb0] to-[#00d4ff]" },
    { label: "Active Now", value: "3", icon: Zap, change: "Live", trend: "live", color: "from-[#4fffb0] to-[#4fffb0]" },
    { label: "Registered Voters", value: "12,847", icon: Users, change: "+8.4%", trend: "up", color: "from-[#8b5cf6] to-[#a78bfa]" },
    { label: "Votes Cast Today", value: "2,391", icon: TrendingUp, change: "+23%", trend: "up", color: "from-[#f59e0b] to-[#fbbf24]" },
  ];

  const recentActivity = [
    { text: "Alice Johnson voted in Student Council 2026", time: "2 min ago", type: "vote", icon: CheckCircle2, color: "#4fffb0" },
    { text: "Admin imported 142 voters via CSV", time: "18 min ago", type: "import", icon: Download, color: "#8b5cf6" },
    { text: "Sports Committee election scheduled", time: "1 hour ago", type: "create", icon: Plus, color: "#f59e0b" },
    { text: "Security alert: 3 failed login attempts", time: "2 hours ago", type: "alert", icon: AlertTriangle, color: "#EF4444" },
    { text: "Faculty Senate results published", time: "4 hours ago", type: "result", icon: Eye, color: "#00d4ff" },
  ];

  const activeElections = [
    { title: "Student Council 2026", status: "Active", votes: 3847, voters: 450, turnout: 78, color: "#4fffb0" },
    { title: "Faculty Senate", status: "Active", votes: 2190, voters: 280, turnout: 54, color: "#00d4ff" },
    { title: "Sports Committee", status: "Scheduled", votes: 0, voters: 120, turnout: 0, color: "#f59e0b" },
    { title: "Board of Trustees", status: "Draft", votes: 0, voters: 35, turnout: 0, color: "rgba(255,255,255,0.2)" },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">{greeting}, Admin</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Here is your election overview for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all">
            <Download className="w-[14px] h-[14px]" /> Export
          </button>
          <Link href="/dashboard/elections/create" className="flex items-center gap-2 px-5 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold no-underline hover:opacity-90 hover:-translate-y-[1px] transition-all shadow-[0_0_30px_rgba(79,255,176,0.2)]">
            <Plus className="w-[14px] h-[14px]" /> New Election
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="relative bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all group overflow-hidden">
            {/* Glow orb */}
            <div className={"absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-[0.06] group-hover:opacity-[0.1] transition-opacity bg-gradient-to-br " + stat.color} />
            <div className="flex items-start justify-between mb-4">
              <div className={"w-11 h-11 rounded-xl bg-gradient-to-br " + stat.color + " bg-opacity-10 flex items-center justify-center"}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={"flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full " + (stat.trend === "live" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "bg-[rgba(34,197,94,0.1)] text-[#22C55E]")}>
                {stat.trend === "live" ? (
                  <span className="relative flex h-[6px] w-[6px]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fffb0] opacity-75" /><span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#4fffb0]" /></span>
                ) : (
                  <ArrowUp className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="text-[11px] font-semibold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.08em] mb-2">{stat.label}</div>
            <div className="text-[34px] font-extrabold text-white tracking-[-0.04em]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-bold text-white">Voting Trends</h3>
              <p className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">Weekly vote volume</p>
            </div>
            <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.03)] rounded-lg p-1">
              {["7D", "30D", "90D"].map((period) => (
                <button key={period} className={"px-3 py-[6px] rounded-md text-[11px] font-semibold transition-all " + (period === "7D" ? "bg-[rgba(255,255,255,0.06)] text-white" : "text-[rgba(255,255,255,0.3)] hover:text-white")}>{period}</button>
              ))}
            </div>
          </div>
          <div className="h-[280px]">
            <canvas ref={chartRef} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 flex flex-col">
          <h3 className="text-[15px] font-bold text-white mb-5">Quick Actions</h3>
          <div className="flex flex-col gap-2 flex-1">
            {[
              { label: "Create Election", icon: Plus, href: "/dashboard/elections/create", accent: true },
              { label: "Import Voters", icon: Download, href: "/dashboard/voters" },
              { label: "View Results", icon: Eye, href: "/dashboard/results" },
              { label: "Generate Report", icon: FileText, href: "/dashboard/reports" },
              { label: "System Health", icon: Activity, href: "/dashboard/health" },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className={"flex items-center gap-3 px-4 py-[11px] rounded-xl text-[13px] font-medium no-underline transition-all group " + (action.accent ? "bg-gradient-to-r from-[rgba(79,255,176,0.1)] to-[rgba(0,212,255,0.05)] border border-[rgba(79,255,176,0.15)] text-[#4fffb0] hover:shadow-[0_0_20px_rgba(79,255,176,0.1)]" : "text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]")}
              >
                <action.icon className="w-[16px] h-[16px]" />
                <span className="flex-1">{action.label}</span>
                <ArrowRight className="w-[14px] h-[14px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
          <Link href="/dashboard/elections/create" className="flex items-center justify-center gap-2 mt-4 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold no-underline hover:opacity-90 transition-all">
            <Plus className="w-[14px] h-[14px]" /> New Election
          </Link>
        </div>
      </div>

      {/* Active Elections + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Elections */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-bold text-white">Active Elections</h3>
            <Link href="/dashboard/elections" className="text-[12px] font-semibold text-[#4fffb0] hover:underline no-underline">View all ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢</Link>
          </div>
          <div className="space-y-1">
            {activeElections.map((e, i) => (
              <Link key={i} href={"/dashboard/elections/" + (e.votes > 0 ? "1" : "create")} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.02)] transition-all no-underline group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: e.color + "15" }}>
                  <Vote className="w-5 h-5" style={{ color: e.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white truncate">{e.title}</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)] mt-[2px]">{e.voters.toLocaleString()} voters ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· {e.votes.toLocaleString()} votes</div>
                  {e.turnout > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-[4px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: e.turnout + "%", background: e.color }} />
                      </div>
                      <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.3)]">{e.turnout}%</span>
                    </div>
                  )}
                </div>
                <span className={"text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-[0.04em] " + (e.status === "Active" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : e.status === "Scheduled" ? "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>{e.status}</span>
                <ArrowRight className="w-4 h-4 text-[rgba(255,255,255,0.15)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-bold text-white">Recent Activity</h3>
            <span className="text-[11px] text-[rgba(255,255,255,0.2)]"><Clock className="w-3 h-3 inline mr-1" />Live feed</span>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.02)] transition-all">
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 mt-[2px]" style={{ background: item.color + "15" }}>
                  <item.icon className="w-[14px] h-[14px]" style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-[rgba(255,255,255,0.6)] leading-relaxed">{item.text}</div>
                  <div className="text-[10px] text-[rgba(255,255,255,0.2)] mt-1">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
