"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", paddingTop: 80 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
        <h1 className="syne" style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8, textTransform: "capitalize" }}>partners</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 24 }}>Coming soon.</p>
        <Link href="/home" className="btn-blue inline-flex px-8 py-3 rounded-xl font-semibold text-white">Back to Home</Link>
      </div>
    </div>
  );
}