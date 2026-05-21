"use client";
import { useState } from "react";

export default function SecurityPage() {
  const [security, setSecurity] = useState({ twoFactor: true, ipWhitelisting: false, sessionTimeout: true, auditLogging: true, passwordPolicy: false });
  const toggle = (key: string) => setSecurity({ ...security, [key]: !(security as any)[key] });

  return (
    <div>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Security</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Configure security policies</p>
      <div className="glass" style={{ padding: 24, maxWidth: 600 }}>
        {[
          { key: "twoFactor", label: "Two-Factor Authentication", desc: "Require 2FA for all admin users" },
          { key: "ipWhitelisting", label: "IP Whitelisting", desc: "Restrict access to specific IP ranges" },
          { key: "sessionTimeout", label: "Session Timeout", desc: "Auto-logout after 60 minutes" },
          { key: "auditLogging", label: "Audit Logging", desc: "Log all admin actions for compliance" },
          { key: "passwordPolicy", label: "Strict Password Policy", desc: "Min 12 characters, special characters" },
        ].map(item => (
          <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ flex: 1, marginRight: 16 }}><div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{item.label}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{item.desc}</div></div>
            <button onClick={() => toggle(item.key)} style={{ width: 48, height: 28, borderRadius: 100, border: "none", cursor: "pointer", background: (security as any)[item.key] ? "#6366F1" : "rgba(255,255,255,0.08)", position: "relative", flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: (security as any)[item.key] ? 23 : 3, transition: "left 0.2s" }} />
            </button>
          </div>
        ))}
        <button className="btn-purple" style={{ marginTop: 20 }}>Save Security Settings</button>
      </div>
    </div>
  );
}
