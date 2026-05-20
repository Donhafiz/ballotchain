"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Password Reset!</h1>
          <p className="text-gray-500 mb-6">Your password has been successfully reset.</p>
          <button onClick={() => router.push("/login")} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-10 shadow-2xl">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-2">Set New Password</h1>
          <p className="text-gray-500 text-center mb-8">Enter your new password</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none text-gray-900 dark:text-white font-medium" placeholder="Min. 8 characters" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirm Password</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-5 py-4 bg-gray-100/80 dark:bg-gray-800/80 border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none text-gray-900 dark:text-white font-medium" placeholder="Repeat password" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 transition-all disabled:opacity-60">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}