"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Sparkles, LockKeyhole } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030307] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.15),transparent_35%)]" />
        <div className="absolute top-[-200px] left-[-120px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="grid w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:grid-cols-2">
          
          <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-[0_10px_40px_rgba(59,130,246,0.45)]">
                <ShieldCheck className="h-8 w-8 text-white" />
              </motion.div>
              <div className="mt-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Secure Next-Gen Voting Infrastructure
                </div>
                <h1 className="max-w-lg text-5xl font-black leading-tight tracking-tight">Access the future of digital elections.</h1>
                <p className="mt-6 max-w-md text-base leading-7 text-gray-400">BallotChain combines enterprise-grade security, blockchain transparency, and premium user experience.</p>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-4">
              {[{ title: "End-to-End Security", desc: "Military-grade encrypted voting." },{ title: "Real-time Analytics", desc: "Monitor elections with live dashboards." },{ title: "Blockchain Verification", desc: "Immutable vote validation." },{ title: "Global Accessibility", desc: "Secure participation from anywhere." }].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3><p className="mt-2 text-xs leading-6 text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
              <div className="rounded-[30px] border border-white/10 bg-[#0d111c]/80 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_12px_35px_rgba(99,102,241,0.45)]">
                    <LockKeyhole className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
                  <p className="mt-2 text-sm text-gray-400">Sign in to continue to your dashboard</p>
                </div>
                <LoginForm />
                <div className="mt-7 flex items-center justify-between text-sm">
                  <Link href="/forgot-password" className="text-gray-400 transition hover:text-white">Forgot Password?</Link>
                  <Link href="/register" className="group inline-flex items-center gap-2 font-medium text-blue-400 transition hover:text-blue-300">Create Account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/home" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">🏠 Back to Home</Link>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4 text-center">
                  <p className="text-xs leading-6 text-gray-500">Protected by enterprise-grade encryption.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}