"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError("Passwords don't match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else { setError(data.error || "Registration failed"); setLoading(false); }
    } catch { setError("Network error"); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-6 pt-20">
        <div className="w-full max-w-[480px]">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-sm text-[#0b0c0f] mx-auto mb-4">BC</div>
              <h1 className="text-2xl font-extrabold tracking-[-0.02em]">Create Account</h1>
              <p className="text-sm text-[rgba(255,255,255,0.35)] mt-2">Join BallotChain today</p>
            </div>
            {error && <div className="mb-6 p-4 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.15)] text-[#EF4444] text-sm text-center">{error}</div>}
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">First Name</label><input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="John" className="w-full px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" required /></div>
                <div><label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Last Name</label><input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Doe" className="w-full px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" required /></div>
              </div>
              <div><label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" className="w-full px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" required /></div>
              <div><label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Password</label><input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Min. 8 characters" className="w-full px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" required /></div>
              <div><label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Confirm Password</label><input type="password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} placeholder="Repeat password" className="w-full px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" required /></div>
              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">{loading ? "Creating..." : <>Create Account <ArrowRight className="w-4 h-4" /></>}</button>
            </form>
            <p className="text-center mt-6 text-sm text-[rgba(255,255,255,0.3)]">Already have an account? <Link href="/login" className="text-[#4fffb0] font-semibold hover:underline">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
