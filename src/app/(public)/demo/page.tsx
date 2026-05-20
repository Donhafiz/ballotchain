"use client";

import { useState } from "react";
import Link from "next/link";

const demoSteps = [
  { title: "Create Election", desc: "Set up your election in under 2 minutes with our intuitive wizard.", icon: "🗳️" },
  { title: "Add Candidates", desc: "Add candidates with photos, bios, and positions in a few clicks.", icon: "👤" },
  { title: "Invite Voters", desc: "Import voters via CSV or generate secure access links.", icon: "👥" },
  { title: "Monitor Live", desc: "Watch real-time results with AI-powered analytics.", icon: "📊" },
  { title: "Certify Results", desc: "Generate blockchain-verified, auditable result certificates.", icon: "✅" },
];

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
        <h1 className="syne" style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>
          Interactive <span className="glow-text">Demo</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>See how BallotChain works in 5 simple steps</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }}>
          {demoSteps.map((step, i) => (
            <button key={i} onClick={() => setCurrentStep(i)}
              style={{ width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer",
                background: i <= currentStep ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "rgba(255,255,255,0.06)",
                color: i <= currentStep ? "#fff" : "rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 700 }}>
              {i < currentStep ? "✓" : i + 1}
            </button>
          ))}
        </div>

        <div className="glass rounded-3xl p-12" style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>{demoSteps[currentStep].icon}</div>
          <h2 className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{demoSteps[currentStep].title}</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>{demoSteps[currentStep].desc}</p>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="btn-outline" style={{ padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600 }}>← Previous</button>
          {currentStep < 4 ? (
            <button onClick={() => setCurrentStep(currentStep + 1)} className="btn-purple" style={{ padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>Next →</button>
          ) : (
            <Link href="/register" className="btn-blue" style={{ padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none" }}>Get Started Free</Link>
          )}
        </div>
      </div>
    </div>
  );
}