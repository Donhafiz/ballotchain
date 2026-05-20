"use client";

import { useState } from "react";

export default function VoterImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImport = async () => {
    if (!file) return;
    setImporting(true);
    await new Promise(r => setTimeout(r, 2000));
    setResult({ imported: 142, skipped: 3, errors: 0 });
    setImporting(false);
  };

  return (
    <div style={{ padding: "24px 32px", maxWidth: 600 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Import Voters</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Bulk import voters from a CSV file</p>
      </div>
      {!result ? (
        <div className="glass rounded-2xl p-10" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📥</div>
          <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Upload CSV File</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Format: name, email, department</p>
          <div style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: 16, padding: 40, marginBottom: 20, cursor: "pointer" }}
            onClick={() => document.getElementById("fileInput")?.click()}>
            <input id="fileInput" type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
            {file ? <div><span style={{ fontSize: 24 }}>📄</span><p style={{ fontSize: 14, color: "#fff", marginTop: 8 }}>{file.name}</p></div> : <div><span style={{ fontSize: 24 }}>📁</span><p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Click to browse</p></div>}
          </div>
          <button onClick={handleImport} disabled={!file || importing} className="btn-blue" style={{ padding: "12px 32px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: file ? "pointer" : "not-allowed", opacity: file ? 1 : 0.4 }}>{importing ? "Importing..." : "Import Voters"}</button>
        </div>
      ) : (
        <div className="glass rounded-2xl p-10" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Import Complete!</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 24 }}>
            {[{ label: "Imported", value: result.imported, color: "#22C55E" },{ label: "Skipped", value: result.skipped, color: "#F59E0B" },{ label: "Errors", value: result.errors, color: "#EF4444" }].map((s, i) => (
              <div key={i} className="glass rounded-xl p-4"><div className="syne" style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div></div>
            ))}
          </div>
          <button onClick={() => setResult(null)} className="btn-outline" style={{ marginTop: 20, padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>Import Another File</button>
        </div>
      )}
    </div>
  );
}