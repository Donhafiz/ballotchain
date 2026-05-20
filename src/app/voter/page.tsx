"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VoterDashboard() {
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/elections", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(r => r.json()).then(d => setElections(d.elections || [])).finally(() => setLoading(false));
  }, []);

  const active = elections.filter(e => e.status === "active");
  const voted = elections.filter(e => e.status === "completed");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14" }}>
      {/* Header */}
      <header style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,20,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 40 }}>
        <Link href="/home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div className="btn-purple" style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>BC</div>
          <span className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>BallotChain</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/voter/my-votes" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>My History</Link>
          <Link href="/login" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Sign Out</Link>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>My Voting Dashboard</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>Cast your vote in active elections and track your history.</p>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60 }}><div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#6366F1", animation: "spin 0.8s linear infinite", margin: "0 auto" }} /></div>
        ) : (
          <>
            {/* Active Elections */}
            <div style={{ marginBottom: 32 }}>
              <h2 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>🟢 Active Elections ({active.length})</h2>
              {active.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No active elections at the moment.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {active.map(e => (
                    <Link key={e._id} href={"/voter/elections/" + e._id + "/vote"} style={{ textDecoration: "none" }}>
                      <div className="glass rounded-2xl p-6 card-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div className="btn-blue" style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🗳️</div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{e.title}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{e.candidates?.length || 0} candidates · Ends {new Date(e.endDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <span className="btn-purple" style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>Vote Now →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Voting History */}
            <div>
              <h2 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>📋 Voting History</h2>
              <div className="glass rounded-2xl overflow-hidden">
                {voted.length === 0 ? (
                  <div style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No voting history yet.</div>
                ) : (
                  voted.map(e => (
                    <div key={e._id} style={{ padding: "14px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{e.title}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Completed · {new Date(e.endDate).toLocaleDateString()}</div>
                      </div>
                      <span className="badge-emerald" style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100 }}>Voted ✓</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}