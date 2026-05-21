export default function ResultsPage() {
  const results = [
    { name: "Alex Thompson", party: "Student Unity", votes: 2847, pct: 42.3, color: "#6366F1" },
    { name: "Maria Garcia", party: "Progressive Alliance", votes: 2190, pct: 32.5, color: "#22C55E" },
    { name: "James Wilson", party: "Independent", votes: 1103, pct: 16.4, color: "#F59E0B" },
    { name: "Sarah Kim", party: "Campus First", votes: 591, pct: 8.8, color: "#EC4899" },
  ];
  const total = results.reduce((s, r) => s + r.votes, 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>Live Results</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Student Council President Election 2026</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", fontSize: 11, fontWeight: 600, color: "#22C55E" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }} /> Live Updates
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Votes", value: total.toLocaleString(), icon: "🗳️" },
          { label: "Turnout", value: "78.4%", icon: "📊" },
          { label: "Registered", value: "8,576", icon: "👥" },
          { label: "Remaining", value: (8576 - total).toLocaleString(), icon: "⏳" },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ padding: "18px 22px", textAlign: "center" }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginTop: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
        <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Candidate Rankings</h3>
        {results.map((r, i) => (
          <div key={i} style={{ marginBottom: i < results.length - 1 ? 20 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{i + 1}. {r.name}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginLeft: 8, padding: "2px 8px", borderRadius: 100, background: "rgba(255,255,255,0.04)" }}>{r.party}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{r.votes.toLocaleString()}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 6 }}>({r.pct}%)</span>
              </div>
            </div>
            <div style={{ height: 10, background: "rgba(255,255,255,0.04)", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: r.pct + "%", background: r.color, borderRadius: 5, transition: "width 1s ease-out" }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn-outline">📄 Export PDF</button>
        <button className="btn-outline">📊 Export CSV</button>
        <button className="btn-blue">📋 Certified Report</button>
      </div>
    </div>
  );
}
