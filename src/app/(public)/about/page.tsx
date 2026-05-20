"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
        <h1 className="syne" style={{ fontSize: 40, fontWeight: 800, color: "#fff", marginBottom: 8 }}>About <span className="glow-text">BallotChain</span></h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", marginBottom: 40 }}>The world&apos;s most advanced voting infrastructure.</p>
        
        <div className="glass rounded-3xl p-10 mb-8" style={{ textAlign: "left" }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 20 }}>
            BallotChain was founded in 2023 with a singular mission: make democratic voting secure, transparent, and accessible to every organization on Earth. Today, we power elections for governments, Fortune 500 companies, and universities across 127 countries.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            Our platform combines military-grade encryption, blockchain verification, and AI-powered fraud detection to deliver the most trusted voting experience ever built.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { value: "15,000+", label: "Organizations" },
            { value: "127", label: "Countries" },
            { value: "2.8M+", label: "Votes Secured" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <div className="syne glow-text" style={{ fontSize: 28, fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <Link href="/register" className="btn-blue inline-flex px-10 py-4 rounded-2xl font-semibold text-white">Get Started Today →</Link>
      </div>
    </div>
  );
}