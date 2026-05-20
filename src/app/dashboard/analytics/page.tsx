"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/store/AppContext";
import { motion } from "framer-motion";

export default function AdvancedAnalytics() {
  const { elections } = useApp();
  const [selectedMetric, setSelectedMetric] = useState("turnout");
  const [chartType, setChartType] = useState("bar");
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const radarChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!lineChartRef.current || !pieChartRef.current || !radarChartRef.current) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const grid = "rgba(255,255,255,0.04)";
      const lbl = "rgba(255,255,255,0.3)";

      // Trend Line
      const lCtx = lineChartRef.current?.getContext("2d");
      if (lCtx) new Chart(lCtx, {
        type: "line",
        data: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], datasets: [
          { label: "Turnout %", data: [62,58,71,65,78,82], borderColor: "#6366F1", backgroundColor: "rgba(99,102,241,0.1)", fill: true, tension: 0.4 },
          { label: "Votes", data: [1200,2100,3400,2800,4500,5200], borderColor: "#22C55E", backgroundColor: "transparent", tension: 0.4, yAxisID: "y1" },
        ]},
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: lbl } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: grid }, ticks: { color: lbl }, beginAtZero: true }, y1: { position: "right", grid: { display: false }, ticks: { color: lbl } } } },
      });

      // Distribution Pie
      const pCtx = pieChartRef.current?.getContext("2d");
      if (pCtx) new Chart(pCtx, {
        type: "doughnut",
        data: { labels: ["Active","Completed","Draft","Archived"], datasets: [{ data: elections.filter(e => e.status === "active").length || 3, backgroundColor: ["#6366F1","#22C55E","#F59E0B","#6B7280"], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: "65%", plugins: { legend: { position: "bottom", labels: { color: lbl } } } },
      });

      // Radar
      const rCtx = radarChartRef.current?.getContext("2d");
      if (rCtx) new Chart(rCtx, {
        type: "radar",
        data: { labels: ["Security","Turnout","Engagement","Speed","Accuracy","Satisfaction"], datasets: [{ data: [95,78,82,90,97,88], borderColor: "#8B5CF6", backgroundColor: "rgba(139,92,246,0.15)", pointBackgroundColor: "#8B5CF6" }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { grid: { color: grid }, ticks: { display: false }, beginAtZero: true, max: 100 } } },
      });
    })();
  }, [elections]);

  return (
    <div style={{ padding: "24px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Advanced Analytics</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Deep insights and predictive modeling</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["bar","line","radar","pie"].map(t => (
            <button key={t} onClick={() => setChartType(t)} className={chartType === t ? "btn-purple" : "btn-outline"}
              style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Avg Turnout", value: "73.4%", change: "+5.2%", color: "card-blue" },
          { label: "Voter Satisfaction", value: "4.8/5", change: "+0.3", color: "card-purple" },
          { label: "Response Time", value: "1.2s", change: "-0.4s", color: "card-emerald" },
        ].map((kpi, i) => (
          <div key={i} className={"glass rounded-2xl p-5 text-center " + kpi.color}>
            <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{kpi.label}</div>
            <span className="badge-emerald" style={{ fontSize: 10, marginTop: 4, display: "inline-block" }}>{kpi.change}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div className="glass rounded-2xl p-6">
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Performance Trends</h3>
          <div style={{ height: 280 }}><canvas ref={lineChartRef} /></div>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Platform Health Score</h3>
          <div style={{ height: 280 }}><canvas ref={radarChartRef} /></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <div className="glass rounded-2xl p-6">
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Distribution</h3>
          <div style={{ height: 240 }}><canvas ref={pieChartRef} /></div>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>AI Predictions</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { title: "Next Month Turnout", value: "76%", confidence: "92%" },
              { title: "Peak Voting Hour", value: "14:00", confidence: "87%" },
              { title: "Voter Retention", value: "84%", confidence: "89%" },
              { title: "Engagement Score", value: "8.2/10", confidence: "91%" },
            ].map((p, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{p.title}</div>
                <div className="syne" style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{p.value}</div>
                <div style={{ fontSize: 10, color: "#818CF8", marginTop: 2 }}>{p.confidence} confidence</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}