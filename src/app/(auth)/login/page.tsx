"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true); setError("");
    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err: any) { setError(err.message); setLoading(false); }
  };

  // Don't show login if already logged in
  if (user && !success) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-7xl -translate-x-1/2 -translate-y-1/2 animate-float" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-7xl translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: "3s" }} />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={success ? { opacity: 0, scale: 0.95 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }} 
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-10">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          
          {success ? (
            <div className="text-center py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl mb-4">✅</motion.div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Login Successful!</h2>
              <p className="text-gray-500">Redirecting to dashboard...</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-1">Welcome back</h1>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Sign in to BallotChain</p>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl text-sm text-red-700 dark:text-red-300">{error}</motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 outline-none text-gray-900 dark:text-white placeholder-gray-400 font-medium" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 outline-none text-gray-900 dark:text-white placeholder-gray-400 font-medium" placeholder="Enter your password" required />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" /><span className="text-gray-500">Remember me</span></label>
                  <Link href="/forgot-password" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Forgot?</Link>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-60">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
                Don&apos;t have an account? <Link href="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Create one</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}