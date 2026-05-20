"use client";

// ============================================================
// PLACEMENT: src/app/(marketing)/page.tsx
// WORLD-CLASS HOMEPAGE — BallotChain Voting Management System
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useAuth } from "@/lib/context/AuthContext";

// ─── Types ─────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
}

// ─── Data ──────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "⬡",
    tag: "FIPS 140-2",
    title: "Zero-Knowledge Encryption",
    desc: "Military-grade AES-256 with zero-knowledge proofs. Your votes are cryptographically sealed — invisible even to us.",
    accent: "#3B82F6",
  },
  {
    icon: "◈",
    tag: "<100ms",
    title: "Real-Time Streaming",
    desc: "WebSocket-powered live results with sub-100ms latency. Watch democracy unfold in real-time as every vote lands.",
    accent: "#8B5CF6",
  },
  {
    icon: "◉",
    tag: "SHA-256",
    title: "Blockchain Immutability",
    desc: "Every vote is cryptographically hashed on-chain. Tamper-proof by mathematical certainty — no exceptions.",
    accent: "#06B6D4",
  },
  {
    icon: "⬡",
    tag: "300+ POPs",
    title: "Global Edge Network",
    desc: "300+ edge locations ensure every voter on earth experiences instant load times and bulletproof reliability.",
    accent: "#10B981",
  },
  {
    icon: "◈",
    tag: "99.97% Acc.",
    title: "AI Fraud Detection",
    desc: "Deep learning models analyze voting patterns in real-time, flagging statistical anomalies the moment they appear.",
    accent: "#F59E0B",
  },
  {
    icon: "◉",
    tag: "E2E-V",
    title: "End-to-End Verifiability",
    desc: "Voters can independently verify their ballot was counted correctly without ever compromising vote secrecy.",
    accent: "#EC4899",
  },
];

const TESTIMONIALS = [
  {
    quote: "BallotChain transformed our student elections. 87% turnout — our highest in 40 years of records.",
    author: "Dr. Sarah Chen",
    role: "Dean of Student Affairs",
    org: "Stanford University",
    initials: "SC",
    color: "#3B82F6",
  },
  {
    quote: "The security and transparency are unmatched. Our 200,000 shareholders trust every result completely.",
    author: "Marcus Rivera",
    role: "Chief Executive Officer",
    org: "Fortune 500 Corp",
    initials: "MR",
    color: "#8B5CF6",
  },
  {
    quote: "We run national elections with BallotChain. Citizens have complete, mathematically-verifiable confidence.",
    author: "Elena Kowalski",
    role: "Election Commissioner",
    org: "Republic of Estonia",
    initials: "EK",
    color: "#06B6D4",
  },
];

const ORGS = [
  "Ministry of Finance",
  "NATO Alliance",
  "Harvard University",
  "World Bank Group",
  "United Nations",
  "Oxford University",
  "Swiss Federal Council",
  "CERN Research",
];

// ─── Utilities ─────────────────────────────────────────────
function useCountUp(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setCount(Math.floor(target * ease));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

// ─── Canvas Particle Field ──────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const N = 80;
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < N; i++) {
        const p = particles[i]!;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < N; j++) {
          const p2 = particles[j]!;
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

// ─── Magnetic Cursor Button ─────────────────────────────────
function MagneticButton({ children, className, href, onClick }: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.25);
    my.set((e.clientY - r.top - r.height / 2) * 0.25);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return href ? <Link href={href}>{inner}</Link> : <div onClick={onClick}>{inner}</div>;
}

// ─── Animated Number ────────────────────────────────────────
function AnimNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const n = useCountUp(value);
  return <>{n.toLocaleString()}{suffix}</>;
}

// ─── Ticker Strip ───────────────────────────────────────────
function TickerStrip() {
  const items = [...ORGS, ...ORGS];
  return (
    <div className="relative overflow-hidden py-5 border-y border-white/[0.06]">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#050714] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#050714] to-transparent z-10" />
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {items.map((org, i) => (
          <span
            key={i}
            className="text-sm font-semibold tracking-widest uppercase text-white/20 flex-shrink-0"
          >
            {org}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function HomePage() {
  const { user } = useAuth();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#050714", color: "#F8FAFC", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* ── Google Font Load ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Syne:wght@700;800&display=swap');

        :root {
          --accent: #6366F1;
          --accent-2: #8B5CF6;
          --accent-glow: rgba(99,102,241,0.35);
          --surface: rgba(255,255,255,0.035);
          --border: rgba(255,255,255,0.07);
          --muted: rgba(248,250,252,0.45);
          --ink: #F8FAFC;
        }

        .syne { font-family: 'Syne', sans-serif; }

        .glass {
          background: var(--surface);
          border: 1px solid var(--border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .glow-text {
          background: linear-gradient(135deg, #E0E7FF 0%, #A5B4FC 40%, #818CF8 70%, #C4B5FD 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-primary {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%);
          box-shadow: 0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(99,102,241,0.15);
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .cta-primary:hover {
          box-shadow: 0 0 60px rgba(99,102,241,0.65), 0 0 120px rgba(99,102,241,0.25);
          transform: translateY(-2px) scale(1.02);
        }

        .cta-ghost {
          border: 1px solid var(--border);
          background: var(--surface);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .cta-ghost:hover {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.07);
          transform: translateY(-2px);
        }

        .feature-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-6px);
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .ping-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #22C55E;
          animation: ping 1.5s ease-out infinite;
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.75; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: none;
        }
        .shimmer:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }

        .gradient-border {
          position: relative;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.5), rgba(168,85,247,0.2), transparent);
          z-index: -1;
        }

        .scroll-fade {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .scroll-fade.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
        }
        .orbit-1 { animation: orbit 8s linear infinite; }
        .orbit-2 { animation: orbit 12s linear infinite reverse; }
        .orbit-3 { animation: orbit 16s linear infinite; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-22px) scale(1.02); }
        }
        .float { animation: float-slow 7s ease-in-out infinite; }
        .float-2 { animation: float-slow 9s ease-in-out infinite 2s; }
        .float-3 { animation: float-slow 11s ease-in-out infinite 4s; }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(2.5rem, 10vw, 4rem) !important; }
        }
      `}</style>

      {/* ── Particle Field ── */}
      <ParticleField />

      {/* ── Noise Texture ── */}
      <div className="noise-overlay fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* ── Ambient Orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="float absolute -top-64 -left-64 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="float-2 absolute top-1/2 -right-80 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="float-3 absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)" }}
        />
      </div>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center"
      >
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="glass inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-12"
        >
          <span
            className="ping-dot relative w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: "#22C55E" }}
          />
          <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(248,250,252,0.75)" }}>
            LIVE&nbsp;&nbsp;·&nbsp;&nbsp;2,847,391 votes secured and counting
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="syne text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
          style={{ color: "rgba(99,102,241,0.9)" }}
        >
          World-class voting infrastructure
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="hero-title syne font-extrabold leading-[1.03] tracking-tight mb-7 max-w-5xl mx-auto"
          style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
        >
          The Future of<br />
          <span className="glow-text animate-gradient" style={{
            background: "linear-gradient(135deg, #E0E7FF, #A5B4FC, #818CF8, #C4B5FD, #A5B4FC, #E0E7FF)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Democratic Voting
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light"
          style={{ color: "rgba(248,250,252,0.55)" }}
        >
          Enterprise-grade security, blockchain verification, and AI-powered fraud
          detection — trusted by governments, Fortune 500s, and universities across
          <strong style={{ color: "rgba(248,250,252,0.8)", fontWeight: 500 }}> 127 countries</strong>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-24"
        >
          {user ? (
            <MagneticButton href="/dashboard" className="cta-primary shimmer inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-semibold text-base text-white cursor-pointer select-none">
              Go to Dashboard
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>→</motion.span>
            </MagneticButton>
          ) : (
            <>
              <MagneticButton href="/register" className="cta-primary shimmer inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-semibold text-base text-white cursor-pointer select-none">
                Get Started Free
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>→</motion.span>
              </MagneticButton>
              <MagneticButton href="/login" className="cta-ghost inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-base cursor-pointer select-none" >
                <span style={{ color: "rgba(248,250,252,0.75)" }}>Sign in</span>
              </MagneticButton>
            </>
          )}
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full mx-auto"
        >
          {[
            { target: 2847391, suffix: "+", label: "Votes Secured" },
            { target: 15642,   suffix: "+", label: "Elections Run" },
            { target: 987432,  suffix: "+", label: "Registered Voters" },
            { target: 9999,    suffix: "",  label: "Uptime %" },
          ].map((s, i) => (
            <div key={i} className="stat-card rounded-2xl p-5 flex flex-col items-center gap-1">
              <div
                className="syne text-2xl md:text-3xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #A5B4FC, #818CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {i === 3
                  ? "99.99%"
                  : <AnimNumber value={s.target} suffix={s.suffix} />
                }
              </div>
              <div className="text-xs font-medium" style={{ color: "rgba(248,250,252,0.4)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Org Ticker ── */}
      <div className="relative z-10">
        <TickerStrip />
      </div>

      {/* ════════════════════════════════
          FEATURES
      ════════════════════════════════ */}
      <section className="relative z-10 py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-20"
          >
            <p
              className="syne text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: "rgba(99,102,241,0.9)" }}
            >
              Capabilities
            </p>
            <h2
              className="syne font-extrabold leading-tight tracking-tight mb-5 mx-auto max-w-3xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Enterprise-Grade{" "}
              <span style={{
                background: "linear-gradient(135deg, #A5B4FC, #818CF8, #C4B5FD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Security &amp; Scale
              </span>
            </h2>
            <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "rgba(248,250,252,0.45)" }}>
              Every feature forged for the most demanding elections on Earth.
              No trade-offs. No compromises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="feature-card shimmer rounded-3xl p-8 relative overflow-hidden cursor-default"
              >
                {/* Glow on hover */}
                <motion.div
                  animate={{ opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 40% 30%, ${f.accent}18 0%, transparent 65%)` }}
                />

                {/* Icon cluster */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold"
                    style={{ background: `${f.accent}18`, color: f.accent }}
                  >
                    {f.icon}
                  </div>
                  <span
                    className="syne text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                    style={{ background: `${f.accent}15`, color: f.accent }}
                  >
                    {f.tag}
                  </span>
                </div>

                <h3
                  className="syne font-bold text-lg mb-3"
                  style={{ color: "rgba(248,250,252,0.92)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(248,250,252,0.42)" }}>
                  {f.desc}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-px"
                  animate={{ opacity: hovered === i ? 1 : 0 }}
                  style={{ background: `linear-gradient(to right, transparent, ${f.accent}60, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SOCIAL PROOF — Testimonials
      ════════════════════════════════ */}
      <section className="relative z-10 py-36 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <p
              className="syne text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: "rgba(99,102,241,0.9)" }}
            >
              Testimonials
            </p>
            <h2
              className="syne font-extrabold tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Trusted by{" "}
              <span style={{
                background: "linear-gradient(135deg, #A5B4FC, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                World Leaders
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                className="feature-card gradient-border rounded-3xl p-8 flex flex-col gap-6"
              >
                {/* Quote marks */}
                <div
                  className="syne text-5xl font-black leading-none select-none"
                  style={{ color: `${t.color}40` }}
                >
                  "
                </div>

                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(248,250,252,0.6)" }}>
                  {t.quote}
                </p>

                <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${t.color}25`, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "rgba(248,250,252,0.88)" }}>{t.author}</div>
                    <div className="text-xs" style={{ color: "rgba(248,250,252,0.35)" }}>{t.role} · {t.org}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CTA FINALE
      ════════════════════════════════ */}
      <section className="relative z-10 py-36 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative rounded-3xl overflow-hidden p-16 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 50%, rgba(168,85,247,0.08) 100%)",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            {/* Corner orbs */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }} />

            <p
              className="syne text-[11px] font-bold tracking-[0.3em] uppercase mb-6 relative"
              style={{ color: "rgba(99,102,241,0.9)" }}
            >
              Ready to begin
            </p>

            <h2
              className="syne font-extrabold tracking-tight mb-6 relative"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "rgba(248,250,252,0.95)" }}
            >
              Run Your Election<br />
              <span style={{
                background: "linear-gradient(135deg, #A5B4FC, #818CF8, #C4B5FD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                With Total Confidence
              </span>
            </h2>

            <p
              className="text-base md:text-lg mb-12 max-w-xl mx-auto relative"
              style={{ color: "rgba(248,250,252,0.45)" }}
            >
              Join 15,000+ organizations that trust BallotChain for their most
              consequential votes. Free to start, built to scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              {user ? (
                <Link href="/dashboard" className="cta-primary shimmer inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base text-white">
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link href="/register" className="cta-primary shimmer inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base text-white">
                    Get Started Free →
                  </Link>
                  <Link href="/contact" className="cta-ghost inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-semibold text-sm" style={{ color: "rgba(248,250,252,0.6)" }}>
                    Talk to sales
                  </Link>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 relative">
              {["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "FIPS 140-2", "EU eIDAS"].map((badge) => (
                <span key={badge} className="text-[11px] font-semibold tracking-wide"
                  style={{ color: "rgba(248,250,252,0.28)" }}>
                  ✓ {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}