"use client";

import Link from "next/link";

export default function SolutionPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6" style={{ background: "#0a0a14" }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-6">🤝</div>
        <h1 className="syne font-extrabold text-4xl md:text-5xl text-white mb-4">Nonprofits <span className="glow-text">Solutions</span></h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12">NGO board elections, community voting, and association management with full transparency.</p>
        <div className="glass rounded-3xl p-10 mb-8">
          <h2 className="syne text-2xl font-bold text-white mb-4">Why BallotChain for Nonprofits?</h2>
          <div className="grid grid-cols-2 gap-4 text-left mt-8">
            {["End-to-end encryption","Blockchain audit trail","Real-time analytics","Custom branding","API integration","Dedicated support"].map((f, j) => (
              <div key={j} className="flex items-center gap-3 p-3"><span className="text-emerald-400">✓</span><span className="text-white/70 text-sm">{f}</span></div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/register" className="btn-blue px-8 py-3 rounded-xl font-semibold text-white">Get Started</Link>
          <Link href="/contact" className="btn-outline px-8 py-3 rounded-xl font-semibold text-white/70">Talk to Sales</Link>
        </div>
      </div>
    </div>
  );
}