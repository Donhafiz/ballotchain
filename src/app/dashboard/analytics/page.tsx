"use client";

import { useState, useEffect, useRef } from "react";
import { BarChart3, TrendingUp, Users, Clock, Globe, Download, Calendar, Filter, Eye, Zap, Target, MousePointerClick } from "lucide-react";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const donutChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;

      // Line chart - Turnout over time
      if (lineChartRef.current) {
        const ctx = lineChartRef.current.getContext("2d");
        if (ctx) {
          const grad = ctx.createLinearGradient(0, 0, 0, 300);
          grad.addColorStop(0, "rgba(79,255,176,0.2)");
          grad.addColorStop(1, "rgba(79,255,176,0)");
          new Chart(ctx, {
            type: "line",
            data: {
              labels: ["Jan","Feb","Mar","Apr","May","Jun"],
              datasets: [
                { label: "Turnout %", data: [62,68,71,65,78,82], borderColor: "#4fffb0", backgroundColor: grad, fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: "#4fffb0", borderWidth: 2.5 },
                { label: "Engagement", data: [45,52,58,48,65,72], borderColor: "#00d4ff", tension: 0.4, pointRadius: 5, pointBackgroundColor: "#00d4ff", borderWidth: 2, borderDash: [5,5] },
              ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "rgba(255,255,255,0.4)", font: { size: 11 } } } }, scales: { x: { ticks: { color: "rgba(255,255,255,0.3)" }, grid: { display: false } }, y: { ticks: { color: "rgba(255,255,255,0.3)" }, grid: { color: "rgba(255,255,255,0.04)" }, beginAtZero: true } } },
          });
        }
      }

      // Donut chart
      if (donutChartRef.current) {
        const ctx = donutChartRef.current.getContext("2d");
        if (ctx) {
          new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: ["Desktop","Mobile","Tablet","API"],
              datasets: [{ data: [45,38,12,5], backgroundColor: ["#4fffb0","#00d4ff","#8b5cf6","#f59e0b"], borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "rgba(255,255,255,0.4)", padding: 16, font: { size: 11 } } } } },
          });
        }
      }

      // Bar chart
      if (barChartRef.current) {
        const ctx = barChartRef.current.getContext("2d");
        if (ctx) {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
              datasets: [{ data: [450,680,920,780,1100,650,320], backgroundColor: "#4fffb0", borderRadius: 8, borderSkipped: false }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "rgba(255,255,255,0.3)" }, grid: { display: false } }, y: { ticks: { color: "rgba(255,255,255,0.3)" }, grid: { color: "rgba(255,255,255,0.04)" }, beginAtZero: true } } },
          });
        }
      }
    })();
  }, [mounted]);

  const metrics = [
    { label: "Avg. Turnout", value: "74.2%", change: "+6.3%", icon: TrendingUp, color: "#4fffb0" },
    { label: "Session Duration", value: "4m 32s", change: "+18s", icon: Clock, color: "#00d4ff" },
    { label: "Bounce Rate", value: "12.4%", change: "-3.1%", icon: Target, color: "#8b5cf6" },
    { label: "Geographic Reach", value: "127 countries", change: "+12", icon: Globe, color: "#f59e0b" },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Analytics</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Deep insights into your voting ecosystem</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Last 30 days</button>
          <button className="px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Export</button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: m.color + "15" }}>
              <m.icon className="w-[18px] h-[18px]" style={{ color: m.color }} />
            </div>
            <div className="text-[28px] font-extrabold text-white">{m.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-[rgba(255,255,255,0.3)]">{m.label}</span>
              <span className="text-[10px] font-bold text-[#4fffb0]">{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4">Turnout & Engagement Trends</h3>
          <div className="h-[300px]"><canvas ref={lineChartRef} /></div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4">Device Distribution</h3>
          <div className="h-[300px]"><canvas ref={donutChartRef} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4">Daily Vote Volume</h3>
          <div className="h-[250px]"><canvas ref={barChartRef} /></div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4">Top Performing Elections</h3>
          <div className="space-y-4">
            {[
              { name: "Student Council 2026", turnout: 78, votes: 3847 },
              { name: "Faculty Senate", turnout: 54, votes: 2190 },
              { name: "Homecoming Court 2025", turnout: 92, votes: 7850 },
            ].map((e, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-[12px] font-medium text-white">{e.name}</span>
                  <span className="text-[12px] text-[rgba(255,255,255,0.4)]">{e.turnout}% · {e.votes.toLocaleString()} votes</span>
                </div>
                <div className="h-[6px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] rounded-full" style={{ width: e.turnout + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}