"use client";

import { useState } from "react";
import { useBranding } from "@/lib/branding/BrandingContext";

export default function BrandingPage() {
  const { branding, updateBranding } = useBranding();
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const inp = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none" };
  const lab = { display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 8 };

  return (
    <div style={{ padding: "24px 32px", maxWidth: 600 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Branding</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Customize your organization&apos;s appearance</p>
      </div>

      <div className="glass rounded-2xl p-8" style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={lab}>Organization Name</label>
          <input value={branding.organizationName} onChange={(e) => updateBranding({ organizationName: e.target.value })} style={inp} />
        </div>
        <div>
          <label style={lab}>Logo Text</label>
          <input value={branding.logo} onChange={(e) => updateBranding({ logo: e.target.value })} placeholder="e.g., BC" maxLength={4} style={inp} />
        </div>
        <div>
          <label style={lab}>Favicon</label>
          <input value={branding.favicon} onChange={(e) => updateBranding({ favicon: e.target.value })} placeholder="e.g., 🗳️" maxLength={2} style={inp} />
        </div>
        <div>
          <label style={lab}>Primary Color</label>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input type="color" value={branding.primaryColor} onChange={(e) => updateBranding({ primaryColor: e.target.value })} style={{ width: 48, height: 48, borderRadius: 10, border: "none", cursor: "pointer" }} />
            <input value={branding.primaryColor} onChange={(e) => updateBranding({ primaryColor: e.target.value })} style={inp} />
          </div>
        </div>
        <div>
          <label style={lab}>Secondary Color</label>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input type="color" value={branding.secondaryColor} onChange={(e) => updateBranding({ secondaryColor: e.target.value })} style={{ width: 48, height: 48, borderRadius: 10, border: "none", cursor: "pointer" }} />
            <input value={branding.secondaryColor} onChange={(e) => updateBranding({ secondaryColor: e.target.value })} style={inp} />
          </div>
        </div>
        <button onClick={handleSave} className="btn-purple" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>{saved ? "✓ Saved!" : "Save Branding"}</button>
      </div>

      {/* Preview */}
      <div className="glass rounded-2xl p-6" style={{ textAlign: "center" }}>
        <h3 className="syne" style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>Preview</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff", background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})` }}>{branding.logo}</div>
          <span className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{branding.organizationName}</span>
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          <div style={{ padding: "8px 16px", borderRadius: 8, fontSize: 11, fontWeight: 600, color: "#fff", background: branding.primaryColor }}>Primary</div>
          <div style={{ padding: "8px 16px", borderRadius: 8, fontSize: 11, fontWeight: 600, color: "#fff", background: branding.secondaryColor }}>Secondary</div>
        </div>
      </div>
    </div>
  );
}