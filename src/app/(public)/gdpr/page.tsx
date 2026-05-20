"use client";

export default function LegalPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", paddingTop: 80 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
        <h1 className="syne" style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>GDPR</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>Last updated: May 2026</p>
        <div className="glass rounded-3xl p-10" style={{ lineHeight: 1.8, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
          <p>This page outlines the gdpr for BallotChain. For specific questions, please contact our legal team.</p>
        </div>
      </div>
    </div>
  );
}