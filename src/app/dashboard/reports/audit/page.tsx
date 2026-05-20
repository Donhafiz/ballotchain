"use client";

export default function AuditLogPage() {
  const audits = [
    { event: "User Login", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-21 14:32", status: "success" },
    { event: "Election Modified", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-21 14:28", status: "success" },
    { event: "Failed Login", user: "unknown@test.com", ip: "10.0.0.45", time: "2026-05-21 13:15", status: "failed" },
  ];
  return (
    <div className="syne" style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Audit Trail</h1>
      <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginBottom: 24 }}>Security & compliance audit logs</p>
      <div className="card-dark" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>{["Event","User","IP","Time","Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "14px 18px", fontSize: 10, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(248,250,252,0.22)" }}>{h}</th>)}</tr></thead>
          <tbody>
            {audits.map((a, i) => (
              <tr key={i} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                <td style={{ padding: "14px 18px", fontSize: 13, fontWeight: 500, color: "rgba(248,250,252,0.92)" }}>{a.event}</td>
                <td style={{ padding: "14px 18px", fontSize: 13, color: "rgba(248,250,252,0.45)" }}>{a.user}</td>
                <td style={{ padding: "14px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)", fontFamily: "monospace" }}>{a.ip}</td>
                <td style={{ padding: "14px 18px", fontSize: 12, color: "rgba(248,250,252,0.25)" }}>{a.time}</td>
                <td style={{ padding: "14px 18px" }}><span className={a.status === "success" ? "pill-active" : "bg-red-500/10 text-red-400"} style={{ display: "inline-block", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: a.status === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: a.status === "success" ? "rgba(34,197,94,0.85)" : "rgba(239,68,68,0.85)" }}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}