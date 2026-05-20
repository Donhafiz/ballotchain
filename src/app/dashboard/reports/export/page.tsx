"use client";

export default function ExportPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1 className="syne" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Exports</h1>
      <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginBottom: 24 }}>Download election data in various formats</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[{ format: "PDF Report", desc: "Certified results document", icon: "📄" },{ format: "CSV Spreadsheet", desc: "Raw data for analysis", icon: "📊" },{ format: "JSON Data", desc: "Machine-readable format", icon: "💻" },{ format: "Blockchain Receipt", desc: "Verification file", icon: "🔗" }].map((f, i) => (
          <div key={i} className="card-dark" style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <button className="btn-accent" style={{ fontSize: 11 }}>Download</button>
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 12 }}>{f.format}</h3>
            <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 4 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}