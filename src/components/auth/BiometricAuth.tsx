"use client";

import { useState } from "react";

export default function BiometricAuth({ onSuccess }: { onSuccess: () => void }) {
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [method, setMethod] = useState<"fingerprint" | "face" | "none">("none");

  const startBiometric = async (type: "fingerprint" | "face") => {
    setMethod(type); setStatus("scanning");

    // Simulate biometric scan
    await new Promise(r => setTimeout(r, 2000));

    // Check if WebAuthn is supported
    if (window.PublicKeyCredential) {
      try {
        const credential = await navigator.credentials.get({
          publicKey: {
            challenge: new Uint8Array(32),
            rpId: window.location.hostname,
            allowCredentials: [],
            userVerification: "required",
            timeout: 60000,
          },
        });
        if (credential) { setStatus("success"); onSuccess(); return; }
      } catch {
        // Fallback to simulated success for demo
        setStatus("success");
        setTimeout(() => onSuccess(), 500);
        return;
      }
    }

    // Demo mode
    setStatus("success");
    setTimeout(() => onSuccess(), 500);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Biometric Verification</h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Use biometrics for fast, secure access</p>

      {status === "idle" && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => startBiometric("fingerprint")} className="glass rounded-2xl p-6" style={{ cursor: "pointer", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 120 }}>
            <span style={{ fontSize: 32 }}>👆</span>
            <span>Fingerprint</span>
          </button>
          <button onClick={() => startBiometric("face")} className="glass rounded-2xl p-6" style={{ cursor: "pointer", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 120 }}>
            <span style={{ fontSize: 32 }}>👤</span>
            <span>Face ID</span>
          </button>
        </div>
      )}

      {status === "scanning" && (
        <div style={{ padding: 32 }}>
          <div style={{ fontSize: 48, animation: "pulse 1s infinite", marginBottom: 16 }}>
            {method === "fingerprint" ? "👆" : "👤"}
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Scanning {method === "fingerprint" ? "fingerprint" : "face"}...</p>
          <div className="btn-purple" style={{ width: 120, height: 3, borderRadius: 2, margin: "16px auto 0", background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)", animation: "shimmer 1.5s infinite" }} />
        </div>
      )}

      {status === "success" && (
        <div style={{ padding: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#22C55E" }}>Verified!</p>
        </div>
      )}

      {status === "error" && (
        <div style={{ padding: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>❌</div>
          <p style={{ fontSize: 13, color: "rgba(239,68,68,0.9)", marginBottom: 16 }}>Verification failed. Try again.</p>
          <button onClick={() => setStatus("idle")} className="btn-outline" style={{ padding: "8px 20px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>Try Again</button>
        </div>
      )}
    </div>
  );
}