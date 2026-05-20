"use client";

import { useState } from "react";

export default function SecurityPage() {
  const [security, setSecurity] = useState({
    twoFactor: true,
    ipWhitelisting: false,
    sessionTimeout: true,
    auditLogging: true,
    passwordPolicy: false,
    biometricAuth: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: string) => setSecurity({ ...security, [key]: !(security as any)[key] });

  const saveSecurity = () => {
    localStorage.setItem("ballotchain-security", JSON.stringify(security));
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 20, fontWeight: 700 }}>Security</h1>
          <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 3 }}>Configure security policies</p>
        </div>
        <button onClick={saveSecurity} className="btn-accent">{saved ? "✓ Saved!" : "Save Security Settings"}</button>
      </div>

      <div className="card-dark" style={{ maxWidth: 600 }}>
        {[
          { key: "twoFactor", label: "Two-Factor Authentication", desc: "Require 2FA for all admin users" },
          { key: "ipWhitelisting", label: "IP Whitelisting", desc: "Restrict access to specific IP ranges" },
          { key: "sessionTimeout", label: "Session Timeout", desc: "Auto-logout after 60 minutes" },
          { key: "auditLogging", label: "Audit Logging", desc: "Log all admin actions for compliance" },
          { key: "passwordPolicy", label: "Strict Password Policy", desc: "Min 12 chars, special characters" },
          { key: "biometricAuth", label: "Biometric Authentication", desc: "Enable fingerprint/Face ID" },
        ].map((item) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
            <div style={{ flex: 1, marginRight: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "rgba(248,250,252,0.25)", marginTop: 2 }}>{item.desc}</div>
            </div>
            <button
              onClick={() => toggle(item.key)}
              style={{
                width: 48, height: 28, borderRadius: 100,
                background: (security as any)[item.key] ? "#6366F1" : "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer", position: "relative",
                transition: "background 0.2s", flexShrink: 0,
              }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 3,
                left: (security as any)[item.key] ? 23 : 3,
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