"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Lock, Unlock, Activity } from "lucide-react";

export default function AISecurityPanel() {
  const [stats, setStats] = useState<any>(null);
  const [blockedIPs, setBlockedIPs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    const res = await fetch("/api/ai/security");
    const data = await res.json();
    setStats(data.stats);
    setBlockedIPs(data.blockedIPs || []);
  };

  const runSecurityScan = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/security", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "analyze",
        data: {
          type: "login",
          userId: "test-user",
          ip: "192.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255),
          timestamp: new Date().toISOString(),
          action: "login",
          metadata: { location: "Unknown" },
        },
      }),
    });
    const data = await res.json();
    if (data.success) setResult(data.assessment);
    setLoading(false);
  };

  const threatColors: any = {
    low: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)", text: "#22C55E" },
    medium: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", text: "#F59E0B" },
    high: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", text: "#EF4444" },
    critical: { bg: "rgba(220,38,38,0.15)", border: "rgba(220,38,38,0.3)", text: "#DC2626" },
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AI Security Guardian</h3>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Real-time threat detection</p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 10, color: "#22C55E", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 1.5s infinite" }} />
            Active
          </span>
        </div>
      </div>

      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
          <div className="glass rounded-xl p-3 text-center" style={{ background: "rgba(239,68,68,0.05)" }}>
            <div className="syne" style={{ fontSize: 20, fontWeight: 700, color: "#EF4444" }}>{stats.totalIPsFlagged}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>IPs Flagged</div>
          </div>
          <div className="glass rounded-xl p-3 text-center" style={{ background: "rgba(245,158,11,0.05)" }}>
            <div className="syne" style={{ fontSize: 20, fontWeight: 700, color: "#F59E0B" }}>{stats.activeMonitors}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Active Monitors</div>
          </div>
          <div className="glass rounded-xl p-3 text-center" style={{ background: "rgba(34,197,94,0.05)" }}>
            <div className="syne" style={{ fontSize: 20, fontWeight: 700, color: "#22C55E" }}>{stats.geoAnomalies}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Geo Anomalies</div>
          </div>
        </div>
      )}

      <button onClick={runSecurityScan} disabled={loading}
        className="btn-outline" style={{ width: "100%", padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", cursor: "pointer", marginBottom: 12 }}>
        <Activity className="w-4 h-4 inline mr-1" /> {loading ? "Scanning..." : "Run Security Scan"}
      </button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: 14, borderRadius: 12, background: threatColors[result.threatLevel].bg, border: "1px solid " + threatColors[result.threatLevel].border }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: threatColors[result.threatLevel].text, textTransform: "uppercase" }}>
              {result.threatLevel} Threat
            </span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Score: {result.score}/100</span>
          </div>
          {result.flags.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
              {result.flags.map((flag: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                  <AlertTriangle className="w-3 h-3" style={{ color: threatColors[result.threatLevel].text }} /> {flag}
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500, margin: 0 }}>{result.action}</p>
        </motion.div>
      )}

      {blockedIPs.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Blocked IPs ({blockedIPs.length})</div>
          {blockedIPs.slice(0, 5).map((ip, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", borderRadius: 6, background: "rgba(255,255,255,0.02)", marginBottom: 4, fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>
              <span>{ip}</span>
              <button onClick={async () => { await fetch("/api/ai/security", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "unblock", data: { ip } }) }); fetchStats(); }}
                style={{ background: "none", border: "none", color: "#22C55E", cursor: "pointer", fontSize: 14 }}>🔓</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}