"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import FloatingOrbs from "@/components/magic/FloatingOrbs";
import AnimatedCounter from "@/components/magic/AnimatedCounter";
import { useApp } from "@/lib/store/AppContext";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number; canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles = Array.from({ length: 50 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, size: Math.random() * 1.2 + 0.4, opacity: Math.random() * 0.2 + 0.04 }));
    const draw = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > canvas.width) p.vx *= -1; if (p.y < 0 || p.y > canvas.height) p.vy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = "rgba(99,102,241," + p.opacity + ")"; ctx.fill(); }); raf = requestAnimationFrame(draw); };
    draw(); return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

const FEATURES = [
  { title: "Zero-Knowledge Encryption", desc: "Military-grade AES-256 with zero-knowledge proofs.", tag: "FIPS 140-2" },
  { title: "Real-Time Streaming", desc: "WebSocket-powered live results with sub-100ms latency.", tag: "<100ms" },
  { title: "Blockchain Immutability", desc: "Every vote cryptographically hashed on-chain.", tag: "SHA-256" },
  { title: "Global Edge Network", desc: "300+ edge locations for instant load times worldwide.", tag: "300+ POPs" },
  { title: "AI Fraud Detection", desc: "Deep learning models flag anomalies in real-time.", tag: "99.97%" },
  { title: "End-to-End Verifiability", desc: "Voters verify their ballot independently.", tag: "E2E-V" },
];

const HOW = [
  { step: "01", title: "Create Your Election", desc: "Add positions, candidates, and schedule in minutes." },
  { step: "02", title: "Invite Your Voters", desc: "Import via CSV. Each voter gets a secure access link." },
  { step: "03", title: "Get Live Results", desc: "Monitor turnout in real time. Transparent results." },
];

const FAQ = [
  { q: "Is my election data secure?", a: "Absolutely. AES-256 encryption at rest and in transit." },
  { q: "How fast can I set up an election?", a: "Most organizations are up in under 10 minutes." },
  { q: "Can voters verify their own votes?", a: "Yes. Each voter receives a unique cryptographic receipt." },
];

export default function HomePage() {
  const { user } = useApp();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroO = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#0a0a14", color: "#f8fafc", fontFamily: "DM Sans, system-ui, sans-serif" }}>
      <FloatingOrbs count={6} />
      <ParticleField />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="animate-float absolute -top-80 -left-80 w-[1000px] h-[1000px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />
        <div className="animate-float-delay absolute top-1/3 -right-60 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
      </div>

      {/* HERO */}
      <motion.section style={{ y: heroY, opacity: heroO }} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="glass inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10">
          <span className="ping-dot relative w-2.5 h-2.5 rounded-full flex-shrink-0" />
          <span className="text-xs font-semibold text-white/70">LIVE · 2,847,391 votes secured</span>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="syne text-[11px] font-bold tracking-[0.3em] uppercase mb-6 text-indigo-400">World-class voting infrastructure</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="syne font-extrabold leading-[1.03] tracking-tight mb-7" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
          The Future of<br /><span className="glow-text">Democratic Voting</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-lg max-w-2xl mx-auto mb-14 text-white/50">
          Enterprise-grade security, blockchain verification, and AI-powered fraud detection.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex flex-col sm:flex-row items-center gap-4 mb-24">
          {user ? (
            <Link href="/dashboard" className="btn-purple inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base text-white">Go to Dashboard</Link>
          ) : (
            <>
              <Link href="/register" className="btn-blue inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base text-white">Get Started Free</Link>
              <Link href="/login" className="glass inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-semibold text-base text-white/70">Sign In</Link>
            </>
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
          {[{ v: 2847391, l: "Votes Secured" },{ v: 15642, l: "Elections Run" },{ v: 987432, l: "Registered Voters" },{ v: 9999, l: "Uptime %", uptime: true }].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="syne text-2xl md:text-3xl font-bold glow-text">{s.uptime ? "99.99%" : <AnimatedCounter target={s.v} suffix="+" />}</div>
              <div className="text-xs font-medium text-white/40 mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="syne text-[11px] font-bold tracking-[0.3em] uppercase mb-5 text-indigo-400">How it works</p>
            <h2 className="syne font-extrabold text-4xl md:text-5xl mb-4 text-white">Live in <span className="glow-text">three steps</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8 text-center card-hover">
                <div className="syne text-6xl font-black mb-4 text-indigo-500/30">{s.step}</div>
                <h3 className="syne text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-sm text-white/40">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="syne text-[11px] font-bold tracking-[0.3em] uppercase mb-5 text-indigo-400">Capabilities</p>
            <h2 className="syne font-extrabold text-4xl md:text-5xl mb-5 text-white">Enterprise-Grade <span className="glow-text">Security & Scale</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8 card-hover">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-2xl">{["🔐","⚡","🔗","🌍","🤖","👁️"][i]}</span>
                  <span className="syne text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-white/70" style={{ background: "rgba(255,255,255,0.06)" }}>{f.tag}</span>
                </div>
                <h3 className="syne font-bold text-lg mb-3 text-white">{f.title}</h3>
                <p className="text-sm text-white/40">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16"><h2 className="syne font-extrabold text-4xl md:text-5xl text-white">Common <span className="glow-text">Questions</span></h2></div>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="glass rounded-2xl p-6 cursor-pointer card-hover">
                <div className="flex items-center justify-between"><h3 className="syne font-bold text-lg text-white">{f.q}</h3><span className="text-xl text-white/40">{activeFaq === i ? "-" : "+"}</span></div>
                {activeFaq === i && <p className="text-sm mt-4 text-white/45">{f.a}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-16 relative overflow-hidden card-purple">
            <h2 className="syne font-extrabold text-4xl md:text-5xl mb-6 text-white">Ready to Run Your Election?</h2>
            <p className="text-base mb-10 text-white/45">Join 15,000+ organizations that trust BallotChain.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link href="/dashboard" className="btn-purple inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base text-white">Go to Dashboard</Link>
              ) : (
                <>
                  <Link href="/register" className="btn-blue inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base text-white">Get Started Free</Link>
                  <Link href="/contact" className="glass inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-semibold text-sm text-white/60">Talk to Sales</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}