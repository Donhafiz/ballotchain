"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-10 shadow-2xl">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-2">Reset Password</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">{sent ? "Check your email" : "Enter your email to receive a reset link"}</p>

          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">We sent a reset link to <strong>{email}</strong></p>
              <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none text-gray-900 dark:text-white font-medium" placeholder="you@example.com" required />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-60">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <Link href="/login" className="block text-center text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">← Back to Login</Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}