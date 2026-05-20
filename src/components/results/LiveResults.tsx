"use client";

import { useEffect, useState, useRef } from "react";
import { useRealtime } from "@/lib/realtime/RealtimeContext";

interface LiveResultsProps {
  electionId: string;
  candidates: { _id: string; name: string; votes: number }[];
}

export default function LiveResults({ electionId, candidates: initialCandidates }: LiveResultsProps) {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [viewers, setViewers] = useState(0);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const { connected, subscribe } = useRealtime();
  const barChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Subscribe to live updates
    const unsub1 = subscribe("election:" + electionId, (data) => {
      if (data.type === "vote") {
        setCandidates(prev => prev.map(c => 
          c._id === data.candidateId ? { ...c, votes: c.votes + 1 } : c
        ));
        setAnimatingId(data.candidateId);
        setTimeout(() => setAnimatingId(null), 600);
      }
    });

    const unsub2 = subscribe("viewer-count", (data) => {
      setViewers(data.count || 0);
    });

    return () => { unsub1(); unsub2(); };
  }, [electionId, subscribe]);

  const total = candidates.reduce((s, c) => s + c.votes, 0);

  return (
    <div className="glass rounded-2xl p-6">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Live Results</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {connected ? (
            <span style={{ fontSize: 11, color: "#22C55E", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 1.5s infinite" }} />
              Live
            </span>
          ) : (
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Reconnecting...</span>
          )}
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>👁 {viewers} watching</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {candidates.sort((a, b) => b.votes - a.votes).map((c, i) => (
          <div key={c._id} style={{
            transition: "all 0.3s",
            transform: animatingId === c._id ? "scale(1.02)" : "scale(1)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                {i + 1}. {c.name}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                {c.votes.toLocaleString()}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginLeft: 6 }}>
                  ({total > 0 ? Math.round((c.votes / total) * 100) : 0}%)
                </span>
              </span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3,
                width: total > 0 ? (c.votes / total * 100) + "%" : "0%",
                background: ["#6366F1","#22C55E","#F59E0B","#EC4899","#06B6D4","#8B5CF6"][i % 6],
                transition: "width 0.5s ease-out",
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          Total votes: <strong style={{ color: "#fff" }}>{total.toLocaleString()}</strong>
        </span>
      </div>
    </div>
  );
}