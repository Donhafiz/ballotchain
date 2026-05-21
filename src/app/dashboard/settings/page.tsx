"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    twoFactor: true, emailNotif: true, darkMode: true, publicProfile: false,
    maintenanceMode: false, debugMode: false, rateLimit: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: string) => setSettings({ ...settings, [key]: !(settings as any)[key] });
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
        <div><h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>Settings</h1><p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Configure platform preferences</p></div>
        <button onClick={save} className="btn-purple">{saved ? "✓ Saved!" : "Save Changes"}</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="glass" style={{ padding: 24 }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Preferences</h3>
          {[{ key: "twoFactor", label: "Two-Factor Authentication", desc: "Add extra security layer" },{ key: "emailNotif", label: "Email Notifications", desc: "Receive email alerts" },{ key: "darkMode", label: "Dark Mode", desc: "Toggle appearance" },{ key: "publicProfile", label: "Public Profile", desc: "Visible to others" }].map(item => (
            <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div><div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{item.label}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{item.desc}</div></div>
              <button onClick={() => toggle(item.key)} style={{ width: 48, height: 28, borderRadius: 100, border: "none", cursor: "pointer", background: (settings as any)[item.key] ? "#6366F1" : "rgba(255,255,255,0.08)", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: (settings as any)[item.key] ? 23 : 3, transition: "left 0.2s" }} />
              </button>
            </div>
          ))}
        </div>
        <div className="glass" style={{ padding: 24 }}>
          <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20 }}>System</h3>
          {[{ key: "maintenanceMode", label: "Maintenance Mode", desc: "Disable platform temporarily" },{ key: "debugMode", label: "Debug Mode", desc: "Show debug information" },{ key: "rateLimit", label: "API Rate Limiting", desc: "Protect API endpoints" }].map(item => (
            <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div><div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{item.label}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{item.desc}</div></div>
              <button onClick={() => toggle(item.key)} style={{ width: 48, height: 28, borderRadius: 100, border: "none", cursor: "pointer", background: (settings as any)[item.key] ? "#6366F1" : "rgba(255,255,255,0.08)", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: (settings as any)[item.key] ? 23 : 3, transition: "left 0.2s" }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
