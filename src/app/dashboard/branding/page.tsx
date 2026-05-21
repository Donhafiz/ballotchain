"use client";

import { useState } from "react";

export default function BrandingPage() {
  const [branding, setBranding] = useState({ orgName: "Tech University", logo: "BC", primary: "#6366F1", secondary: "#8B5CF6" });
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const inp = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none" };

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
        <div><h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>Branding</h1><p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Customize your organization's appearance</p></div>
        <button onClick={save} className="btn-purple">{saved ? "✓ Saved!" : "Save Changes"}</button>
      </div>
      <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase" }}>Organization Name</label><input value={branding.orgName} onChange={e => setBranding({ ...branding, orgName: e.target.value })} style={inp} /></div>
          <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase" }}>Logo Text (2 chars)</label><input value={branding.logo} onChange={e => setBranding({ ...branding, logo: e.target.value })} maxLength={2} style={inp} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase" }}>Primary Color</label><div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="color" value={branding.primary} onChange={e => setBranding({ ...branding, primary: e.target.value })} style={{ width: 40, height: 40, borderRadius: 8, border: "none", cursor: "pointer" }} /><input value={branding.primary} onChange={e => setBranding({ ...branding, primary: e.target.value })} style={inp} /></div></div>
            <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase" }}>Secondary Color</label><div style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="color" value={branding.secondary} onChange={e => setBranding({ ...branding, secondary: e.target.value })} style={{ width: 40, height: 40, borderRadius: 8, border: "none", cursor: "pointer" }} /><input value={branding.secondary} onChange={e => setBranding({ ...branding, secondary: e.target.value })} style={inp} /></div></div>
          </div>
        </div>
      </div>
      <div className="glass" style={{ padding: 24, textAlign: "center" }}>
        <h3 className="syne" style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Preview</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${branding.primary}, ${branding.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>{branding.logo}</div>
          <span className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{branding.orgName}</span>
        </div>
      </div>
    </div>
  );
}
