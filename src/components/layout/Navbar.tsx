"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Vote, ChevronRight, Sparkles, Orbit, ShieldCheck, Eye, BookOpen,
} from "lucide-react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#trust", label: "Trust" },
  { href: "/verify", label: "Verify" },
  { href: "/audit", label: "Audit" },
];

const mobileVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 10);
      setHidden(current > lastScrollY.current && current > 100);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-x-0 top-0 z-[120] px-4 pt-4 md:px-8"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-500 lg:px-7 ${
            scrolled
              ? "border-white/10 bg-black/45 shadow-[0_10px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
              : "border-white/5 bg-white/[0.03] backdrop-blur-2xl"
          }`}
        >
          <Link href="/" className="group relative z-[140] flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.06 }}
              className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300 shadow-[0_10px_40px_rgba(16,185,129,0.35)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_60%)]" />
              <Orbit className="relative z-10 h-6 w-6 text-black" />
            </motion.div>
            <div>
              <h1 className="text-xl font-black tracking-[-0.04em] text-white">
                Ballot<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Chain</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">Digital Democracy Infrastructure</p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2 backdrop-blur-2xl lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group relative overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white/50 transition-all duration-300 hover:text-white">
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label === "Verify" && <ShieldCheck className="h-3.5 w-3.5" />}
                  {link.label === "Audit" && <Eye className="h-3.5 w-3.5" />}
                  {link.label}
                </span>
                <div className="absolute inset-0 scale-90 rounded-xl bg-gradient-to-r from-emerald-300/10 to-cyan-300/10 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/vote" className="group flex items-center gap-2 rounded-2xl border border-emerald-300/15 bg-emerald-300/5 px-5 py-3 text-sm font-bold text-emerald-300 transition-all duration-300 hover:border-emerald-300/25 hover:bg-emerald-300/10">
              <Vote className="h-4 w-4" /> Vote Now
            </Link>
            <Link href="/login" className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/65 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white">Sign In</Link>
            <Link href="/register" className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 p-[1px]">
              <div className="flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-black text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-black">Get Started <ChevronRight className="h-4 w-4" /></div>
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="relative z-[140] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white backdrop-blur-2xl transition-all duration-300 hover:border-white/20 lg:hidden" aria-label="Toggle Menu">
            <AnimatePresence mode="wait">
              {mobileOpen ? <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}><X className="h-5 w-5" /></motion.div>
               : <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}><Menu className="h-5 w-5" /></motion.div>}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={mobileVariants} className="fixed inset-0 z-[110] overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute left-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
              <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
            </div>
            <motion.div variants={mobileVariants} className="relative z-10 flex min-h-screen flex-col px-6 pb-10 pt-32">
              <motion.div variants={itemVariants} className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_100px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
                <div className="flex items-center gap-4 border-b border-white/6 pb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300"><ShieldCheck className="h-7 w-7 text-black" /></div>
                  <div><h2 className="text-2xl font-black tracking-tight text-white">BallotChain</h2><p className="text-sm text-white/40">Secure voting infrastructure.</p></div>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <motion.div variants={itemVariants} key={index}>
                      <Link href={link.href} onClick={() => setMobileOpen(false)} className="group flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-5 py-5 text-lg font-bold text-white/75 transition-all duration-300 hover:border-emerald-300/20 hover:bg-white/[0.06] hover:text-white">
                        <span className="flex items-center gap-2">{link.label === "Verify" && <ShieldCheck className="h-5 w-5 text-emerald-300" />}{link.label === "Audit" && <Eye className="h-5 w-5 text-cyan-300" />}{link.label}</span>
                        <ChevronRight className="h-5 w-5 text-emerald-300" />
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants}>
                    <Link href="/docs" onClick={() => setMobileOpen(false)} className="group flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-5 py-5 text-lg font-bold text-white/75 transition-all duration-300 hover:border-violet-300/20 hover:bg-white/[0.06] hover:text-white">
                      <span className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-violet-300" />Documentation</span><ChevronRight className="h-5 w-5 text-violet-300" />
                    </Link>
                  </motion.div>
                </div>
                <div className="mt-8 grid gap-4">
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 px-6 py-5 text-base font-black text-black transition-all duration-300 hover:scale-[1.02]">Get Started <ChevronRight className="h-5 w-5" /></Link>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm font-bold text-white/70 transition-all duration-300 hover:bg-white/[0.05] hover:text-white">Sign In</Link>
                    <Link href="/vote" onClick={() => setMobileOpen(false)} className="rounded-2xl border border-emerald-300/15 bg-emerald-300/5 px-5 py-4 text-center text-sm font-black text-emerald-300 transition-all duration-300 hover:bg-emerald-300/10">Vote</Link>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-auto flex items-center justify-between border-t border-white/6 pt-6">
                <div><p className="text-xs uppercase tracking-[0.24em] text-white/25">BallotChain</p><p className="mt-2 text-sm text-white/35">The operating system for digital democracy.</p></div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-4 py-2"><Sparkles className="h-4 w-4 text-emerald-300" /><span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-300">Secure</span></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
