export default function AdminPage() {
  return (
    <div>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Admin Panel</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Full system administration</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[{ label: "Total Users", value: "1,247", icon: "👥", color: "blue" },{ label: "Total Elections", value: "24", icon: "🗳️", color: "emerald" },{ label: "Organizations", value: "5", icon: "🏢", color: "purple" },{ label: "System Health", value: "100%", icon: "❤️", color: "gold" }].map((s, i) => (
          <div key={i} className={`glass card-${s.color}`} style={{ padding: "20px 24px", textAlign: "center" }}>
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding: 24 }}>
        <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Quick System Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {["Clear Cache","Run Diagnostics","Backup Data","System Logs"].map(a => <button key={a} className="btn-outline" style={{ justifyContent: "center" }}>{a}</button>)}
        </div>
      </div>
    </div>
  );
}
