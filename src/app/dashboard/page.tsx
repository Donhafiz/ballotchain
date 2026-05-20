"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";
import TiltCard from "@/components/magic/TiltCard";

export default function DashboardOverview() {
  const { user, elections, fetchElections } = useApp();
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const donutChartRef = useRef<HTMLCanvasElement>(null);
  const lineInst = useRef<any>(null);
  const donutInst = useRef<any>(null);

  useEffect(() => { fetchElections(); }, []);

  useEffect(() => {
    if (!lineChartRef.current || !donutChartRef.current) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      if (lineInst.current) lineInst.current.destroy();
      if (donutInst.current) donutInst.current.destroy();
      const grid = "rgba(255,255,255,0.06)";
      const lCtx = lineChartRef.current?.getContext("2d");
      if (lCtx) {
        const g = lCtx.createLinearGradient(0, 0, 0, 280);
        g.addColorStop(0, "rgba(99,102,241,0.3)"); g.addColorStop(1, "rgba(99,102,241,0)");
        lineInst.current = new Chart(lCtx, { type: "line", data: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], datasets: [{ data: [320,480,710,590,830,420,610], borderColor: "#6366F1", backgroundColor: g, fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2.5 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: grid }, beginAtZero: true } } } });
      }
      const dCtx = donutChartRef.current?.getContext("2d");
      if (dCtx) { donutInst.current = new Chart(dCtx, { type: "doughnut", data: { labels: ["Active","Completed","Draft"], datasets: [{ data: [3,14,5], backgroundColor: ["#6366F1","#22C55E","#F59E0B"], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "75%", plugins: { legend: { display: false } } } }); }
    })();
    return () => { if (lineInst.current) lineInst.current.destroy(); if (donutInst.current) donutInst.current.destroy(); };
  }, [elections]);

  const active = elections.filter(e => e.status === "active").length;
  const voters = elections.reduce((s, e) => s + (e.totalVoters || 0), 0);
  const votes = elections.reduce((s, e) => s + (e.totalVotes || 0), 0);
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ padding: "24px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>{greeting}, {user?.firstName}</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Here is your election overview for today.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", height: 34, borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>Export</button>
          <Link href="/dashboard/elections/create" className="btn-purple" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 16px", height: 34, borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#fff", textDecoration: "none" }}>+ New Election</Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Total Elections", value: elections.length, icon: "🗳️", gradient: "card-blue" },
          { label: "Active Now", value: active, icon: "🟢", gradient: "card-emerald" },
          { label: "Total Voters", value: voters.toLocaleString(), icon: "👥", gradient: "card-purple" },
          { label: "Votes Cast", value: votes.toLocaleString(), icon: "📊", gradient: "card-gold" },
        ].map((kpi, i) => (
          <TiltCard key={i} className="glass rounded-2xl p-5" style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}><span style={{ fontSize: 22 }}>{kpi.icon}</span></div>
            <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{kpi.label}</div>
            <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>{kpi.value}</div>
          </TiltCard>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 12, marginBottom: 16 }}>
        <div className="glass rounded-2xl p-6"><h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Voting Activity</h3><div style={{ height: 240 }}><canvas ref={lineChartRef} /></div></div>
        <div className="glass rounded-2xl p-6"><h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Status</h3><div style={{ height: 180, position: "relative" }}><canvas ref={donutChartRef} /><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}><div style={{ textAlign: "center" }}><div className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{elections.length}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Total</div></div></div></div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="glass rounded-2xl p-6">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}><h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Recent Elections</h3><Link href="/dashboard/elections" style={{ fontSize: 11, color: "#818CF8", textDecoration: "none" }}>View all</Link></div>
          {elections.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.4)" }}><span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>🗳️</span><p style={{ marginBottom: 16 }}>No elections yet</p><Link href="/dashboard/elections/create" className="btn-blue" style={{ padding: "8px 20px", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#fff", textDecoration: "none" }}>Create First Election</Link></div>
          ) : elections.slice(0, 4).map(e => (
            <Link key={e._id} href={"/dashboard/elections/" + e._id} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#818CF8", fontSize: 16 }}>🗳️</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{e.title}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{e.totalVotes || 0} votes</div></div>
                <span className="badge-emerald" style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100 }}>{e.status}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Quick Actions</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[{ label: "New Election", icon: "+", href: "/dashboard/elections/create", color: "btn-blue" },{ label: "Import Voters", icon: "up", href: "/dashboard/voters", color: "btn-purple" },{ label: "View Results", icon: "📊", href: "/dashboard/results", color: "btn-cyan" },{ label: "Settings", icon: "⚙️", href: "/dashboard/settings", color: "btn-gold" }].map((a, i) => (
              <Link key={i} href={a.href} className={a.color} style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, borderRadius: 8, textDecoration: "none", fontSize: 12, fontWeight: 600, color: "#fff" }}><span>{a.icon}</span> {a.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}