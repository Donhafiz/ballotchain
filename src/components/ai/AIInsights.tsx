"use client";

import { useState } from "react";

export default function AIInsights({ election }: { election: any }) {
  const [insights, setInsights] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/predict", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "insights", data: election }),
    });
    const data = await res.json();
    if (data.success) setInsights(data.result);
    setLoading(false);
  };

  const predict = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/predict", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "turnout", data: { totalVoters: election.totalVoters || 1000, type: election.type || "single_choice" } }),
    });
    const data = await res.json();
    if (data.success) setPrediction(data.result);
    setLoading(false);
  };

  return (
    <div className="glass" style={{ padding: 20 }}>
      <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>🤖 AI Insights</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={generate} disabled={loading} className="btn-blue" style={{ flex: 1, justifyContent: "center" }}>Generate Insights</button>
        <button onClick={predict} disabled={loading} className="btn-purple" style={{ flex: 1, justifyContent: "center" }}>Predict Turnout</button>
      </div>
      {loading && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Analyzing...</p>}
      {prediction && (
        <div style={{ padding: 12, borderRadius: 10, background: "rgba(99,102,241,0.08)", marginBottom: 8 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#818CF8" }}>{prediction.predictedTurnout}% turnout</div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{prediction.recommendation}</p>
        </div>
      )}
      {insights.map((insight, i) => (
        <div key={i} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", marginBottom: 4, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>💡 {insight}</div>
      ))}
    </div>
  );
}
