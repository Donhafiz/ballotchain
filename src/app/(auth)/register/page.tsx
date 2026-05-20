"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store/AppContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) { setError("All fields required"); return; }
    if (form.password.length < 8) { setError("Password must be 8+ characters"); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords don't match"); return; }
    setLoading(true); setError("");
    try {
      await register(form);
      router.push("/login?registered=true");
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-7xl translate-x-1/4 -translate-y-1/4 animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-7xl -translate-x-1/4 translate-y-1/4 animate-float" style={{ animationDelay: "3s" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg relative z-10">
        <div className="rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-10">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-1">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Join BallotChain today</p>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl text-sm text-red-700 dark:text-red-300">{error}</motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white font-medium" placeholder="John" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-4 py-3 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white font-medium" placeholder="Doe" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white font-medium" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white font-medium" placeholder="Min. 8 characters" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 transition-all outline-none text-gray-900 dark:text-white font-medium" placeholder="Repeat password" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-60">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account? <Link href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}