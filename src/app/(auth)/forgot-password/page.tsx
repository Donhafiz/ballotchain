"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const inp = { width: "100%", padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, outline: "none" };

  return (
    <div style={{ width: "100%", maxWidth: 440, padding: 24 }}>
      <div className="glass" style={{ padding: "40px 36px", textAlign: "center" }}>
        <div className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Reset Password</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>{sent ? "Check your email for a reset link." : "Enter your email to receive a reset link."}</p>
        {sent ? <Link href="/login" className="btn-purple" style={{ textDecoration: "none", display: "inline-flex", padding: "14px 28px" }}>Back to Login</Link> : <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inp} required /><button type="submit" className="btn-purple" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 14, borderRadius: 14, marginTop: 16 }}>Send Reset Link</button></form>}
      </div>
    </div>
  );
}
