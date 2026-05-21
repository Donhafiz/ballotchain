"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (res.ok) { localStorage.setItem("token", data.token); localStorage.setItem("user", JSON.stringify(data.user)); router.push("/dashboard"); }
      else { setError(data.error || "Login failed"); }
    } catch { setError("Network error"); }
    setLoading(false);
  };

  const inp = { width: "100%", padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, outline: "none" };

  return (
    <div style={{ width: "100%", maxWidth: 440, padding: 24 }}>
      <div className="glass" style={{ padding: "40px 36px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}>
            <span style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>BC</span>
          </div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Welcome back</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Sign in to BallotChain</p>
        </div>
        {error && <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", fontSize: 13, marginBottom: 16, textAlign: "center" }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase" }}>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inp} required /></div>
          <div><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase" }}>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={inp} required /></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}><input type="checkbox" style={{ accentColor: "#6366F1" }} /> Remember me</label>
            <Link href="/forgot-password" style={{ color: "#818CF8", textDecoration: "none" }}>Forgot password?</Link>
          </div>
          <button type="submit" disabled={loading} className="btn-purple" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 14, borderRadius: 14 }}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Don&apos;t have an account? <Link href="/register" style={{ color: "#818CF8", textDecoration: "none", fontWeight: 600 }}>Sign up</Link></p>
      </div>
    </div>
  );
}
