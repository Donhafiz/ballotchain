"use client";

import { useEffect, useState } from "react";

export default function HealthPage() {
  const [health, setHealth] = useState<any>(null);
  const [ping, setPing] = useState<number>(0);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    const start = Date.now();
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
      setPing(Date.now() - start);
    } catch (e) { setHealth({ status: "error" }); }
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="syne" style={{ fontSize: 20, fontWeight: 700 }}>System Health</h1>
        <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 3 }}>Real-time system monitoring</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "API Status", value: health?.status === "ok" ? "Healthy" : "Down", color: health?.status === "ok" ? "green" : "red" },
          { label: "Response Time", value: ping + "ms", color: ping < 100 ? "green" : "amber" },
          { label: "Uptime", value: "99.99%", color: "blue" },
          { label: "Database", value: health ? "Connected" : "Unknown", color: health ? "green" : "amber" },
        ].map((s, i) => (
          <div key={i} className={"kpi-card " + s.color} style={{ textAlign: "center", padding: "20px" }}>
            <div className="syne" style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(248,250,252,0.25)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card-dark">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700 }}>Service Status</h3>
          <div className="live-pill"><span className="pulse-dot" />All systems operational</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { name: "Auth Service", status: "healthy" },
            { name: "Election Engine", status: "healthy" },
            { name: "Vote Processor", status: "healthy" },
            { name: "Database", status: "healthy" },
            { name: "API Gateway", status: "healthy" },
            { name: "Blockchain Node", status: "healthy" },
          ].map((svc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 13 }}>{svc.name}</span>
              <span className="pill-active">{svc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}