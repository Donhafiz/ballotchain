"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(r => setTimeout(r, 1500)); setSent(true); setLoading(false); };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#fafafa] dark:bg-[#050508]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-[#0a0a10]/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/30 rounded-3xl p-10 shadow-2xl">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><span className="text-white font-bold text-lg">B</span></div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Reset Password</h1>
          <p className="text-gray-500 text-center mb-8 text-sm">{sent ? "Check your email" : "Enter your email for a reset link"}</p>
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Sent to <strong>{email}</strong></p>
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              <Button type="submit" variant="primary" className="w-full" size="lg" loading={loading}>Send Reset Link</Button>
              <Link href="/login" className="block text-center text-sm text-blue-600 font-semibold hover:underline">← Back</Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}