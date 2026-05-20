"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Shield, Brain, Zap } from "lucide-react";

export default function AIInsights({ election }: { election: any }) {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const generateInsights = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/predict", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "insights", data: election }),
    });
    const data = await res.json();
    if (data.success) setInsights(data.result);
    setLoading(false);
  };

  const predictTurnout = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/predict", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "turnout",
        data: {
          totalVoters: election.totalVoters || 1000,
          historicalTurnout: [0.62, 0.58, 0.71, 0.65, 0.68],
          timeOfDay: "14",
          dayOfWeek: "Wednesday",
          electionType: "student_council",
        },
      }),
    });
    const data = await res.json();
    if (data.success) setPrediction(data.result);
    setLoading(false);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div className="btn-purple" style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AI Insights</h3>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Powered by machine learning</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={generateInsights} disabled={loading} className="btn-blue" style={{ flex: 1, padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>
          <Sparkles className="w-4 h-4 inline mr-1" /> Generate Insights
        </button>
        <button onClick={predictTurnout} disabled={loading} className="btn-purple" style={{ flex: 1, padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>
          <TrendingUp className="w-4 h-4 inline mr-1" /> Predict Turnout
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 20 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#6366F1", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>Analyzing data...</p>
        </div>
      )}

      {prediction && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Predicted Turnout</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#818CF8" }}>{prediction.confidence}% confidence</span>
          </div>
          <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>{prediction.predictedTurnout}%</div>
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>💡 {prediction.recommendation}</p>
          </div>
        </motion.div>
      )}

      {insights.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {insights.map((insight, i) => (
            <div key={i} style={{ display: "flex", alignItems: "start", gap: 8, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>{insight}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}