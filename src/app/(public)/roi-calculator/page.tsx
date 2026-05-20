"use client";

import { useState } from "react";
import Link from "next/link";

export default function ROICalculator() {
  const [voters, setVoters] = useState(1000);
  const [elections, setElections] = useState(5);
  const [staffCost, setStaffCost] = useState(25);

  const traditionalCost = voters * elections * 2.50;
  const ballotChainCost = voters * elections * 0.15;
  const savings = traditionalCost - ballotChainCost;
  const hoursSaved = voters * elections * 0.05;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
        <h1 className="syne" style={{ fontSize: 36, fontWeight: 800, color: "#fff", textAlign: "center" }}>
          ROI <span className="glow-text">Calculator</span>
        </h1>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>See how much you can save with BallotChain</p>

        <div className="glass rounded-2xl p-8" style={{ marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8 }}>Voters per Election</label>
              <input type="range" min="100" max="50000" value={voters} onChange={(e) => setVoters(Number(e.target.value))} style={{ width: "100%" }} />
              <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{voters.toLocaleString()}</span>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8 }}>Elections per Year</label>
              <input type="range" min="1" max="50" value={elections} onChange={(e) => setElections(Number(e.target.value))} style={{ width: "100%" }} />
              <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{elections}</span>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8 }}>Staff Hourly Rate ($)</label>
              <input type="range" min="15" max="150" value={staffCost} onChange={(e) => setStaffCost(Number(e.target.value))} style={{ width: "100%" }} />
              <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>${staffCost}/hr</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <div className="glass rounded-xl p-5 text-center" style={{ background: "rgba(239,68,68,0.05)" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Traditional Cost</div>
              <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#EF4444" }}>${traditionalCost.toLocaleString()}</div>
            </div>
            <div className="glass rounded-xl p-5 text-center" style={{ background: "rgba(99,102,241,0.05)" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>BallotChain Cost</div>
              <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#818CF8" }}>${ballotChainCost.toLocaleString()}</div>
            </div>
            <div className="glass rounded-xl p-5 text-center" style={{ background: "rgba(34,197,94,0.05)" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Annual Savings</div>
              <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#22C55E" }}>${savings.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
            Save {Math.round(savings/traditionalCost*100)}% on election costs. {Math.round(hoursSaved)} staff hours saved annually.
          </p>
          <Link href="/register" className="btn-purple inline-flex px-10 py-4 rounded-2xl font-semibold text-white" style={{ textDecoration: "none" }}>
            Start Saving Today →
          </Link>
        </div>
      </div>
    </div>
  );
}