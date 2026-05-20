"use client";

import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
          <span className="text-white text-3xl">✉️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Verify Your Email</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">We sent a verification link to your email. Please check your inbox and click the link to verify your account.</p>
        <div className="space-y-3">
          <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">Resend Verification Email</button>
          <Link href="/login" className="block text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}