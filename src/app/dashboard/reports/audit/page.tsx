export default function AuditLogPage() {
  const logs = [
    { event: "User Login", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-21 14:32", status: "success" },
    { event: "Election Modified", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-21 14:28", status: "success" },
    { event: "Failed Login", user: "unknown@test.com", ip: "10.0.0.45", time: "2026-05-21 13:15", status: "failed" },
    { event: "Candidate Added", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-21 12:00", status: "success" },
    { event: "Voter Imported", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-21 11:30", status: "success" },
    { event: "Settings Changed", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-21 10:00", status: "success" },
  ];

  return (
    <div>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Audit Trail</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Security and compliance audit logs</p>
      <div className="glass" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{["Event","User","IP Address","Timestamp","Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "14px 24px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>{h}</th>)}</tr></thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 500, color: "#fff" }}>{log.event}</td>
                <td style={{ padding: "14px 24px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{log.user}</td>
                <td style={{ padding: "14px 24px", fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{log.ip}</td>
                <td style={{ padding: "14px 24px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{log.time}</td>
                <td style={{ padding: "14px 24px" }}><span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: log.status === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: log.status === "success" ? "#22C55E" : "#EF4444" }}>{log.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
