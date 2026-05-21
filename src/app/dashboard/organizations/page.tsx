export default function OrganizationsPage() {
  const orgs = [
    { name: "Tech University", members: 4500, elections: 24, status: "active", type: "Education" },
    { name: "Global Corp Inc", members: 12000, elections: 56, status: "active", type: "Enterprise" },
    { name: "City Government", members: 85000, elections: 12, status: "active", type: "Government" },
    { name: "Healthcare Alliance", members: 3200, elections: 8, status: "inactive", type: "Healthcare" },
    { name: "NGO Federation", members: 15000, elections: 32, status: "active", type: "Nonprofit" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
        <div><h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>Organizations</h1><p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{orgs.length} organizations · {orgs.filter(o => o.status === "active").length} active</p></div>
        <button className="btn-purple">+ Add Organization</button>
      </div>
      <div className="glass" style={{ overflow: "hidden" }}>
        {orgs.map((org, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: i < orgs.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", transition: "background 0.15s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(139,92,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#A78BFA" }}>🏢</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{org.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: "rgba(139,92,246,0.1)", color: "#A78BFA" }}>{org.type}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{org.members.toLocaleString()} members</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>·</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{org.elections} elections</span>
                </div>
              </div>
            </div>
            <span className={org.status === "active" ? "badge-emerald" : "badge-gold"}>{org.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
