"use client";

import { SSO_PROVIDERS } from "@/lib/sso/providers";

export default function SSOLogin() {
  const handleSSO = (provider: string) => {
    window.location.href = "/api/auth/sso?provider=" + provider;
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Or continue with</span>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {Object.entries(SSO_PROVIDERS).map(([key, provider]) => (
          <button key={key} onClick={() => handleSSO(key)}
            className="glass rounded-xl p-4" style={{ cursor: "pointer", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 90 }}>
            <span style={{ fontSize: 24 }}>{provider.icon}</span>
            <span style={{ fontSize: 10 }}>{provider.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}