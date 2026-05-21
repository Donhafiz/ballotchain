export default function ExportPage() {
  const formats = [
    { format: "PDF Report", desc: "Official certified results document", icon: "📄" },
    { format: "CSV Spreadsheet", desc: "Raw data for analysis", icon: "📊" },
    { format: "JSON Data", desc: "Machine-readable format", icon: "💻" },
    { format: "Blockchain Receipt", desc: "Cryptographic verification file", icon: "🔗" },
  ];

  return (
    <div>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Export Data</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Download election data in various formats</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {formats.map((f, i) => (
          <div key={i} className="glass card-hover" style={{ padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 32 }}>{f.icon}</span>
              <div><h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{f.format}</h3><p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{f.desc}</p></div>
            </div>
            <button className="btn-purple" style={{ padding: "8px 20px", borderRadius: 8, fontSize: 12 }}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
