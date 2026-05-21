export default function ReportsPage() {
  return (
    <div>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Reports</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Analytics and exportable reports</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {[{ title: "Voter Turnout Report", desc: "Detailed turnout statistics", icon: "📊", stat: "78.4%" },{ title: "Election Results Summary", desc: "All completed elections", icon: "🗳️", stat: "24 elections" },{ title: "Security Audit Log", desc: "Authentication & access logs", icon: "🔒", stat: "1,247 events" },{ title: "Voter Demographics", desc: "Age, department, location", icon: "👥", stat: "12,847 voters" },{ title: "Blockchain Verification", desc: "On-chain audit trail", icon: "🔗", stat: "100% verified" },{ title: "System Performance", desc: "Uptime & response times", icon: "⚡", stat: "99.99%" }].map((r, i) => (
          <div key={i} className="glass card-hover" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontSize: 28 }}>{r.icon}</span><span className="badge-blue" style={{ fontSize: 10 }}>{r.stat}</span></div>
            <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{r.title}</h3>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{r.desc}</p>
            <button className="btn-outline" style={{ marginTop: 12, width: "100%", justifyContent: "center" }}>View Report →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
