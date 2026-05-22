"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Globe2,
  Orbit,
} from "lucide-react";

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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="grid w-full max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Side */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="hidden lg:block"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-5 py-3 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-emerald-300" />

              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300">
                Trusted Election Infrastructure
              </span>
            </div>

            <h1 className="mt-8 max-w-2xl text-6xl font-black leading-[0.92] tracking-[-0.06em]">
              Welcome back to
              <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text font-serif italic text-transparent">
                BallotChain
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/45">
              The world’s most advanced digital voting infrastructure trusted
              by institutions, governments, and organizations globally.
            </p>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Blockchain Security",
                },
                {
                  icon: Globe2,
                  title: "127 Countries",
                },
                {
                  icon: Orbit,
                  title: "99.99% Uptime",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl border border-white/6 bg-white/[0.03] p-6 backdrop-blur-2xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                    <item.icon className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-sm font-bold text-white/80">
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-emerald-300/20 via-cyan-300/10 to-violet-300/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:p-10">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/[0.08] via-transparent to-cyan-300/[0.08]" />

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center">
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.05,
                    }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300 shadow-[0_20px_60px_rgba(16,185,129,0.35)]"
                  >
                    <Orbit className="h-9 w-9 text-black" />
                  </motion.div>

                  <h2 className="mt-8 text-4xl font-black tracking-[-0.04em]">
                    Sign In
                  </h2>

                  <p className="mt-3 text-base text-white/40">
                    Access your secure election dashboard.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-center text-sm font-medium text-red-400"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Form */}
                <form
                  onSubmit={handleLogin}
                  className="mt-8 flex flex-col gap-5"
                >
                  {/* Email */}
                  <div>
                    <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.2em] text-white/35">
                      Email Address
                    </label>

                    <div className="group relative">
                      <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/20 transition-colors duration-300 group-focus-within:text-emerald-300" />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@ballotchain.com"
                        required
                        className="h-16 w-full rounded-2xl border border-white/8 bg-white/[0.03] pl-14 pr-5 text-sm font-medium text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-emerald-300/25 focus:bg-white/[0.05]"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35">
                        Password
                      </label>

                      <Link
                        href="/forgot-password"
                        className="text-xs font-bold text-emerald-300 transition-colors duration-300 hover:text-white"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="group relative">
                      <Lock className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/20 transition-colors duration-300 group-focus-within:text-emerald-300" />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="h-16 w-full rounded-2xl border border-white/8 bg-white/[0.03] pl-14 pr-14 text-sm font-medium text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-emerald-300/25 focus:bg-white/[0.05]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/25 transition-colors duration-300 hover:text-white"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="submit"
                    disabled={loading}
                    className="group mt-3 flex h-16 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-sm font-black text-black shadow-[0_20px_60px_rgba(16,185,129,0.35)] transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      "Signing In..."
                    ) : (
                      <>
                        Continue to Dashboard

                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-white/6 pt-6 text-center">
                  <p className="text-sm text-white/35">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-bold text-emerald-300 transition-colors duration-300 hover:text-white"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}