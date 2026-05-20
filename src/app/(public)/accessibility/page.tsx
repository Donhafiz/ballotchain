"use client";

import { A11Y_CONFIG, COMPLIANCE_CERTIFICATIONS } from "@/lib/a11y/compliance";

export default function AccessibilityPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
        <h1 className="syne" style={{ fontSize: 36, fontWeight: 800, color: "#fff", textAlign: "center" }}>
          Accessibility & <span className="glow-text">Compliance</span>
        </h1>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>
          WCAG 2.2 AAA Certified · Inclusive by Design
        </p>

        <div className="glass rounded-2xl p-8" style={{ marginBottom: 24 }}>
          <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Keyboard Shortcuts</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {Object.entries(A11Y_CONFIG.keyboardShortcuts).map(([key, value]) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.02)" }}>
                <span style={{ fontSize: 13, color: "#fff", textTransform: "capitalize" }}>{key}</span>
                <kbd style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.06)", fontSize: 11, color: "#818CF8", fontFamily: "monospace" }}>{value}</kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-8" style={{ marginBottom: 24 }}>
          <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Certifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {COMPLIANCE_CERTIFICATIONS.map((cert, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.02)" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{cert.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{cert.description}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={cert.status === "active" ? "badge-emerald" : "badge-gold"} style={{ fontSize: 10 }}>{cert.status}</span>
                  {cert.lastAudit && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>Audited: {cert.lastAudit}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-8" style={{ textAlign: "center" }}>
          <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Download VPAT</h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Voluntary Product Accessibility Template</p>
          <button className="btn-blue" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>Download VPAT (PDF)</button>
        </div>
      </div>
    </div>
  );
}