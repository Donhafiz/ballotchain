"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch { setError("Network error"); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-6 pt-20">
        <div className="w-full max-w-[440px]">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-sm text-[#0b0c0f] mx-auto mb-4">BC</div>
              <h1 className="text-2xl font-extrabold tracking-[-0.02em]">Welcome back</h1>
              <p className="text-sm text-[rgba(255,255,255,0.35)] mt-2">Sign in to your dashboard</p>
            </div>
            {error && <div className="mb-6 p-4 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.15)] text-[#EF4444] text-sm text-center">{error}</div>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.2)]" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@ballotchain.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.2)]" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="password123" className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.2)] hover:text-white"><EyeOff className="w-4 h-4" /></button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">{loading ? "Signing in..." : <>Sign In <ArrowRight className="w-4 h-4" /></>}</button>
            </form>
            <p className="text-center mt-6 text-sm text-[rgba(255,255,255,0.3)]">Don&apos;t have an account? <Link href="/register" className="text-[#4fffb0] font-semibold hover:underline">Create account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
