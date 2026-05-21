"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const lineChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!lineChartRef.current) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const ctx = lineChartRef.current?.getContext("2d");
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, 0, 280);
      gradient.addColorStop(0, "rgba(99,102,241,0.3)");
      gradient.addColorStop(1, "rgba(99,102,241,0)");
      new Chart(ctx, {
        type: "line",
        data: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], datasets: [{ data: [320,480,710,590,830,420,610], borderColor: "#6366F1", backgroundColor: gradient, fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#6366F1", borderWidth: 2.5 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10 } } }, y: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10 } }, beginAtZero: true } } },
      });
    })();
  }, []);

  const stats = [
    { label: "Total Elections", value: "24", icon: "🗳️", change: "+12%", color: "blue" },
    { label: "Active Now", value: "3", icon: "🟢", change: "Live", color: "emerald" },
    { label: "Registered Voters", value: "12,847", icon: "👥", change: "+8.4%", color: "purple" },
    { label: "Votes Cast", value: "8,391", icon: "📊", change: "+23%", color: "gold" },
  ];

  const elections = [
    { title: "Student Council 2026", status: "active", votes: 3847, voters: 450, turnout: 78 },
    { title: "Faculty Senate", status: "active", votes: 2190, voters: 280, turnout: 54 },
    { title: "Sports Committee", status: "scheduled", votes: 0, voters: 120, turnout: 0 },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Good evening, Admin 👋</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Here is your election overview for today.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-outline">📥 Export</button>
          <Link href="/dashboard/elections/create" className="btn-purple" style={{ textDecoration: "none" }}>+ New Election</Link>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map((stat, i) => (
          <div key={i} className={`glass card-${stat.color}`} style={{ padding: "20px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", opacity: 0.06, background: stat.color === "blue" ? "#6366F1" : stat.color === "emerald" ? "#22C55E" : stat.color === "purple" ? "#8B5CF6" : "#F59E0B" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><span style={{ fontSize: 26 }}>{stat.icon}</span><span className="badge-emerald" style={{ fontSize: 10 }}>{stat.change}</span></div>
            <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{stat.label}</div>
            <div className="syne" style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>{stat.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 24 }}>
        <div className="glass" style={{ padding: "20px 24px" }}><h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Voting Trends</h3><div style={{ height: 260 }}><canvas ref={lineChartRef} /></div></div>
        <div className="glass" style={{ padding: "20px 24px" }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[{ label: "New Election", icon: "➕", href: "/dashboard/elections/create" },{ label: "Import Voters", icon: "📥", href: "/dashboard/voters" },{ label: "View Results", icon: "📊", href: "/dashboard/results" },{ label: "Settings", icon: "⚙️", href: "/dashboard/settings" }].map((a, i) => (
              <Link key={i} href={a.href} className="btn-outline" style={{ textDecoration: "none" }}><span>{a.icon}</span> {a.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="glass" style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Active Elections</h3><Link href="/dashboard/elections" style={{ fontSize: 12, color: "#818CF8", textDecoration: "none" }}>View all →</Link></div>
          {elections.map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < elections.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
              <span>🗳️</span><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{e.title}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{e.voters} voters · {e.votes} votes</div>{e.turnout > 0 && <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}><div style={{ height: "100%", width: e.turnout + "%", background: "linear-gradient(90deg, #6366F1, #8B5CF6)", borderRadius: 2 }} /></div>}</div>
              <span className="badge-emerald">{e.status}</span>
            </div>
          ))}
        </div>
        <div className="glass" style={{ padding: "20px 24px" }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Recent Activity</h3>
          {[{ text: "Alice Johnson voted in Student Council", time: "2 min ago", type: "vote" },{ text: "Admin imported 142 voters via CSV", time: "18 min ago", type: "import" },{ text: "Sports Committee Vote scheduled", time: "1 hour ago", type: "create" },{ text: "Security alert: 3 failed logins", time: "2 hours ago", type: "alert" }].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.type === "vote" ? "#6366F1" : a.type === "import" ? "#22C55E" : a.type === "create" ? "#F59E0B" : "#EF4444", marginTop: 5, flexShrink: 0 }} />
              <div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{a.text}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{a.time}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
