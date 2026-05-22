"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Eye,
  Lock,
  Sparkles,
  ChevronRight,
  Orbit,
} from "lucide-react";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Elections", href: "/dashboard/elections" },
      { label: "Results", href: "/results/1" },
      { label: "Voters", href: "/dashboard/voters" },
      { label: "Analytics", href: "/dashboard/analytics" },
      { label: "API", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Press Kit", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Developers", href: "/docs" },
      { label: "Documentation", href: "/docs" },
      { label: "Security", href: "/security" },
      { label: "Status", href: "/status" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "GDPR", href: "/gdpr" },
      { label: "Cookies", href: "/cookies" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
];

const badges = ["ISO 27001", "SOC 2", "GDPR", "FIPS 140-2"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-[#030303] px-6 pb-10 pt-28 lg:px-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/[0.08] via-transparent to-cyan-400/[0.08]" />
          <div className="relative z-10 grid gap-14 px-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-14">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-5 py-3 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-emerald-300" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300">Trusted Election Infrastructure</span>
              </div>
              <h2 className="mt-8 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">Secure Elections.<span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text font-serif italic text-transparent">Transparent Democracy.</span></h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/50 md:text-lg">BallotChain powers secure, verifiable, and globally scalable digital elections for governments, universities, institutions, and enterprises worldwide.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 px-8 py-4 text-sm font-black text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_80px_rgba(16,185,129,0.35)]">Launch Your Election <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
                <Link href="/docs" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">Explore Documentation</Link>
              </div>
              <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[{ icon: ShieldCheck, label: "Blockchain Verified", href: "/verify" },{ icon: Eye, label: "Public Auditability", href: "/audit" },{ icon: Lock, label: "Zero-Knowledge Security", href: "/security" }].map((item, index) => (
                  <motion.div key={index} whileHover={{ y: -5 }} className="group rounded-3xl border border-white/6 bg-black/20 p-5 backdrop-blur-xl">
                    <Link href={item.href} className="no-underline">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300 transition-all duration-300 group-hover:scale-110"><item.icon className="h-5 w-5" /></div>
                      <p className="mt-5 text-sm font-bold tracking-tight text-white/85">{item.label}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-2">
              {footerColumns.map((column, index) => (
                <motion.div key={index} custom={index + 1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <p className="mb-6 text-[11px] font-black uppercase tracking-[0.24em] text-white/30">{column.title}</p>
                  <ul className="space-y-4">
                    {column.links.map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.href} className="group inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-all duration-300 hover:text-white">
                          <ChevronRight className="h-4 w-4 text-emerald-300 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-t border-white/6 px-8 py-8 lg:px-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Link href="/" className="group inline-flex items-center gap-4">
                  <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300 shadow-[0_10px_40px_rgba(16,185,129,0.35)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_60%)]" />
                    <Orbit className="relative z-10 h-7 w-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white">Ballot<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Chain</span></h3>
                    <p className="mt-1 text-sm text-white/35">The operating system for digital democracy.</p>
                  </div>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {badges.map((badge, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-white/45 backdrop-blur-xl transition-all duration-300 hover:border-emerald-300/20 hover:text-emerald-300">{badge}</motion.div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/6 pt-6 text-sm text-white/30 md:flex-row md:items-center md:justify-between">
              <p>&copy; 2026 BallotChain. Built for secure and transparent elections worldwide.</p>
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/privacy" className="transition-colors duration-300 hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="transition-colors duration-300 hover:text-white">Terms of Service</Link>
                <Link href="/security" className="transition-colors duration-300 hover:text-emerald-300">Security Center</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
