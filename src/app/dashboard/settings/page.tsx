"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    twoFactor: true,
    emailNotif: true,
    publicProfile: false,
    darkMode: true,
    maintenanceMode: false,
    debugMode: false,
    rateLimit: true,
  });

  const toggle = (key: string) => {
    setSettings({ ...settings, [key]: !(settings as any)[key] });
  };

  const saveSettings = () => {
    localStorage.setItem("ballotchain-settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 20, fontWeight: 700 }}>Settings</h1>
          <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 3 }}>Configure platform preferences</p>
        </div>
        <button onClick={saveSettings} className="btn-accent">{saved ? "✓ Saved!" : "Save Changes"}</button>
      </div>

      <div className="card-dark" style={{ marginBottom: 16 }}>
        <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Preferences</h3>
        {[
          { key: "twoFactor", label: "Two-Factor Authentication", desc: "Add extra security layer" },
          { key: "emailNotif", label: "Email Notifications", desc: "Receive email alerts" },
          { key: "publicProfile", label: "Public Profile", desc: "Visible to others" },
          { key: "darkMode", label: "Dark Mode", desc: "Toggle appearance" },
        ].map((item) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "rgba(248,250,252,0.25)" }}>{item.desc}</div>
            </div>
            <button
              onClick={() => toggle(item.key)}
              style={{
                width: 48, height: 28, borderRadius: 100,
                background: (settings as any)[item.key] ? "#6366F1" : "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer", position: "relative",
                transition: "background 0.2s",
              }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 3,
                left: (settings as any)[item.key] ? 23 : 3,
                transition: "left 0.2s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }} />
            </button>
          </div>
        ))}
      </div>

      <div className="card-dark">
        <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>System</h3>
        {[
          { key: "maintenanceMode", label: "Maintenance Mode", desc: "Disable platform temporarily" },
          { key: "debugMode", label: "Debug Mode", desc: "Show debug information" },
          { key: "rateLimit", label: "API Rate Limiting", desc: "Protect API endpoints" },
        ].map((item) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "rgba(248,250,252,0.25)" }}>{item.desc}</div>
            </div>
            <button
              onClick={() => toggle(item.key)}
              style={{
                width: 48, height: 28, borderRadius: 100,
                background: (settings as any)[item.key] ? "#6366F1" : "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer", position: "relative",
                transition: "background 0.2s",
              }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 3,
                left: (settings as any)[item.key] ? 23 : 3,
                transition: "left 0.2s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}