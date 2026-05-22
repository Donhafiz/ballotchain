"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  User,
  Sparkles,
  ShieldCheck,
  Orbit,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Registration failed");
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

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-5 py-3">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300">
                Join Secure Democracy Network
              </span>
            </div>

            <h1 className="mt-8 text-6xl font-black leading-[0.92] tracking-[-0.06em]">
              Create your
              <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text font-serif italic text-transparent">
                BallotChain Account
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg text-white/45">
              Join thousands of organizations using secure, verifiable,
              blockchain-based election infrastructure.
            </p>

            <div className="mt-12 space-y-4">
              {[
                "Zero-knowledge encrypted voting",
                "Real-time verifiable results",
                "Enterprise-grade security",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <p className="text-sm text-white/60">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-emerald-300/20 via-cyan-300/10 to-violet-300/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl md:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/[0.08] via-transparent to-cyan-300/[0.08]" />

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300">
                    <Orbit className="h-9 w-9 text-black" />
                  </div>

                  <h2 className="mt-8 text-4xl font-black tracking-[-0.04em]">
                    Create Account
                  </h2>

                  <p className="mt-3 text-white/40">
                    Start your secure voting journey
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-center text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleRegister} className="mt-8 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none focus:border-emerald-300/30"
                      required
                    />

                    <input
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      className="h-14 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none focus:border-emerald-300/30"
                      required
                    />
                  </div>

                  <input
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none focus:border-emerald-300/30"
                    required
                  />

                  <div className="relative">
                    <input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm outline-none focus:border-emerald-300/30"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      placeholder="Confirm Password"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm outline-none focus:border-emerald-300/30"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
                    >
                      {showConfirm ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="h-14 w-full rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-sm font-black text-black shadow-[0_20px_60px_rgba(16,185,129,0.35)]"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </motion.button>
                </form>

                <div className="mt-8 text-center text-sm text-white/40">
                  Already have an account?{" "}
                  <Link href="/login" className="text-emerald-300 font-bold">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
