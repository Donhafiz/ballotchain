"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/store/AppContext";
import { motion } from "framer-motion";
import LiveResults from "@/components/results/LiveResults";
import { generateElectionPDF, generateCSV, downloadPDF, downloadCSV } from "@/lib/pdf/generator";

export default function ResultsPage() {
  const { elections } = useApp();
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (elections.length > 0 && !selectedElection) setSelectedElection(elections[0]);
  }, [elections]);

  useEffect(() => {
    if (!barChartRef.current || !selectedElection) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const ctx = barChartRef.current?.getContext("2d");
      if (!ctx) return;
      const candidates = selectedElection.candidates || [];
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: candidates.map((c: any) => c.name),
          datasets: [{ data: candidates.map((c: any) => c.votes || 0), backgroundColor: ["#6366F1","#8B5CF6","#A855F7","#EC4899","#F59E0B","#22C55E"], borderRadius: 8, barPercentage: 0.6 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10 } } }, y: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "rgba(255,255,255,0.3)" }, beginAtZero: true } } },
      });
    })();
  }, [selectedElection]);

  const handleExportPDF = () => {
    if (!selectedElection) return;
    const html = generateElectionPDF(selectedElection);
    downloadPDF(html, selectedElection.title + "-results");
  };

  const handleExportCSV = () => {
    if (!selectedElection) return;
    const csv = generateCSV(selectedElection);
    downloadCSV(csv, selectedElection.title + "-results");
  };

  return (
    <div style={{ padding: "24px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Results & Analytics</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Live election performance</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleExportPDF} className="btn-outline" style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>📄 Export PDF</button>
          <button onClick={handleExportCSV} className="btn-outline" style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>📊 Export CSV</button>
        </div>
      </div>

      {selectedElection && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div className="glass rounded-2xl p-6">
            <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Vote Distribution - {selectedElection.title}</h3>
            <div style={{ height: 300 }}><canvas ref={barChartRef} /></div>
          </div>
          {selectedElection.candidates && (
            <LiveResults electionId={selectedElection._id} candidates={selectedElection.candidates} />
          )}
        </div>
      )}
    </div>
  );
}