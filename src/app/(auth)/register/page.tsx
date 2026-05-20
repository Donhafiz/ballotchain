"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, ArrowRight, Globe, Lock, BadgeCheck } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030308] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-150px] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-250px] right-[-120px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="grid w-full max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.65)] lg:grid-cols-2">
          
          <div className="relative hidden flex-col justify-between overflow-hidden p-14 lg:flex">
            <div>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-[0_15px_40px_rgba(59,130,246,0.45)]">
                <ShieldCheck className="h-8 w-8 text-white" />
              </motion.div>
              <div className="mt-10">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> Trusted Digital Election Ecosystem
                </div>
                <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight">Create your secure identity on BallotChain.</h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-gray-400">Join a next-generation blockchain-powered voting platform.</p>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-5">
                {[{ number: "99.99%", label: "Secure" },{ number: "256-bit", label: "Encryption" },{ number: "24/7", label: "Availability" }].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                    <h3 className="text-2xl font-bold">{item.number}</h3><p className="mt-1 text-xs text-gray-400">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ icon: Lock, title: "Protection", desc: "Enterprise security." },{ icon: Globe, title: "Global", desc: "Access anywhere." },{ icon: BadgeCheck, title: "Integrity", desc: "Blockchain backed." },{ icon: Sparkles, title: "Premium", desc: "Modern interface." }].map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + index * 0.1 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <feature.icon className="mb-4 h-5 w-5 text-blue-400" /><h3 className="text-sm font-semibold text-white">{feature.title}</h3><p className="mt-2 text-xs text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-xl">
              <div className="rounded-[32px] border border-white/10 bg-[#0b1020]/85 p-8 shadow-2xl backdrop-blur-3xl sm:p-10">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_12px_35px_rgba(99,102,241,0.45)]">
                    <ShieldCheck className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
                  <p className="mt-2 text-sm text-gray-400">Register to access digital voting</p>
                </div>
                <RegisterForm />
                <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                  <p className="text-sm text-gray-400">Already have an account?</p>
                  <Link href="/login" className="group inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20 hover:text-blue-300">Sign In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/home" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">🏠 Back to Home</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}