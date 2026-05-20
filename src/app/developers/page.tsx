"use client";

import { useState } from "react";

const endpoints = [
  { method: "POST", path: "/api/auth/register", desc: "Register new user", auth: false },
  { method: "POST", path: "/api/auth/login", desc: "Login & get JWT", auth: false },
  { method: "GET", path: "/api/elections", desc: "List elections", auth: true },
  { method: "POST", path: "/api/elections", desc: "Create election", auth: true },
  { method: "GET", path: "/api/elections/:id", desc: "Get election", auth: true },
  { method: "PUT", path: "/api/elections/:id", desc: "Update election", auth: true },
  { method: "DELETE", path: "/api/elections/:id", desc: "Delete election", auth: true },
  { method: "POST", path: "/api/elections/:id/candidates", desc: "Add candidate", auth: true },
  { method: "POST", path: "/api/elections/:id/votes", desc: "Cast vote", auth: true },
  { method: "GET", path: "/api/elections/:id/results", desc: "Get results", auth: true },
  { method: "GET", path: "/api/health", desc: "Health check", auth: false },
];

const sdks = [
  { name: "JavaScript", icon: "📦", install: "npm install ballotchain-sdk", color: "#F7DF1E" },
  { name: "Python", icon: "🐍", install: "pip install ballotchain", color: "#3776AB" },
  { name: "PHP", icon: "🐘", install: "composer require ballotchain/sdk", color: "#777BB4" },
  { name: "cURL", icon: "🔧", install: "No installation needed", color: "#6B7280" },
];

export default function DeveloperPortal() {
  const [activeTab, setActiveTab] = useState("reference");
  const [testResult, setTestResult] = useState<any>(null);

  const testAPI = async () => {
    const res = await fetch("/api/health");
    const data = await res.json();
    setTestResult(data);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <h1 className="syne" style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>
          <span className="glow-text">Developer</span> Portal
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 8, marginBottom: 32 }}>
          Build on the world's most advanced voting infrastructure
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {["reference","sdks","webhooks","test"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "btn-purple" : "btn-outline"}
              style={{ padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", textTransform: "capitalize" }}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "reference" && (
          <div className="glass rounded-2xl overflow-hidden">
            {endpoints.map((ep, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
                <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, background: ep.method === "GET" ? "rgba(34,197,94,0.15)" : ep.method === "POST" ? "rgba(99,102,241,0.15)" : ep.method === "PUT" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)", color: ep.method === "GET" ? "#22C55E" : ep.method === "POST" ? "#818CF8" : ep.method === "PUT" ? "#F59E0B" : "#EF4444" }}>{ep.method}</span>
                <code style={{ fontSize: 13, color: "#fff", fontFamily: "monospace" }}>{ep.path}</code>
                <span style={{ flex: 1, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{ep.desc}</span>
                {ep.auth && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>🔐 JWT</span>}
              </div>
            ))}
          </div>
        )}

        {activeTab === "sdks" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {sdks.map((sdk, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{sdk.icon}</span>
                  <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{sdk.name} SDK</h3>
                </div>
                <code style={{ display: "block", padding: "10px 14px", borderRadius: 8, background: "rgba(0,0,0,0.3)", fontSize: 12, color: sdk.color, fontFamily: "monospace", marginBottom: 12 }}>{sdk.install}</code>
                <button className="btn-outline" style={{ width: "100%", padding: "8px", borderRadius: 8, fontSize: 12 }}>View Docs →</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "test" && (
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>API Test Console</h3>
            <button onClick={testAPI} className="btn-blue" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>
              Test GET /api/health
            </button>
            {testResult && (
              <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: "rgba(0,0,0,0.3)", textAlign: "left" }}>
                <pre style={{ fontSize: 12, color: "#22C55E", fontFamily: "monospace", margin: 0 }}>{JSON.stringify(testResult, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}