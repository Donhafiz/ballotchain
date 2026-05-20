"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [counts, setCounts] = useState({ votes: 0, elections: 0, users: 0, uptime: 0 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  // Particle Network Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; connections: number[] }[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1, opacity: Math.random() * 0.5 + 0.2,
        connections: [],
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, " + p.opacity + ")";
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i < j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = "rgba(37, 99, 235, " + (0.15 * (1 - dist / 120)) + ")";
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", handleResize); };
  }, []);

  // Counter Animation
  useEffect(() => {
    const targets = { votes: 2847391, elections: 15642, users: 987432, uptime: 9999 };
    const duration = 2000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounts({
        votes: Math.floor(targets.votes * progress),
        elections: Math.floor(targets.elections * progress),
        users: Math.floor(targets.users * progress),
        uptime: Math.floor(targets.uptime * progress),
      });
      if (progress === 1) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: "🔐", title: "Zero-Knowledge Encryption", desc: "Military-grade AES-256 with zero-knowledge proofs. Your votes are encrypted end-to-end, invisible even to us.", stat: "FIPS 140-2" },
    { icon: "⚡", title: "Real-Time Streaming", desc: "WebSocket-powered live results with sub-100ms latency. Watch democracy unfold in real-time.", stat: "<100ms" },
    { icon: "🔗", title: "Blockchain Immutability", desc: "Every vote is cryptographically hashed and stored on-chain. Tamper-proof by mathematical certainty.", stat: "SHA-256" },
    { icon: "🌍", title: "Global Edge Network", desc: "300+ edge locations ensure voters anywhere experience instant load times and zero lag.", stat: "300+ POPs" },
    { icon: "🤖", title: "AI Fraud Detection", desc: "Deep learning models analyze voting patterns in real-time, flagging anomalies instantly.", stat: "99.97% Accuracy" },
    { icon: "👁️", title: "End-to-End Verifiability", desc: "Voters can verify their vote was counted correctly without compromising ballot secrecy.", stat: "E2E-V" },
  ];

  const pricingPlans = [
    { name: "Starter", price: "Free", desc: "For small organizations", features: ["Up to 500 voters", "5 elections/year", "Basic analytics", "Email support"], color: "from-gray-600 to-gray-700" },
    { name: "Professional", price: "", desc: "For growing institutions", features: ["Up to 10,000 voters", "Unlimited elections", "Advanced analytics", "Priority support", "API access", "Custom branding"], color: "from-blue-600 to-purple-600", popular: true },
    { name: "Enterprise", price: "Custom", desc: "For governments & large orgs", features: ["Unlimited voters", "Dedicated infrastructure", "SLA guarantee", "24/7 phone support", "On-premise option", "Custom integrations", "Security audit"], color: "from-gray-800 to-gray-900" },
  ];

  const testimonials = [
    { quote: "BallotChain transformed our student elections. 87% turnout - our highest ever.", author: "Dr. Sarah Chen", role: "Dean, Stanford University", avatar: "👩‍🎓" },
    { quote: "The security and transparency are unmatched. Our shareholders trust the results completely.", author: "Marcus Rivera", role: "CEO, Fortune 500 Corp", avatar: "👨‍💼" },
    { quote: "We run national elections with BallotChain. The blockchain verification gives citizens complete confidence.", author: "Elena Kowalski", role: "Election Commissioner, Estonia", avatar: "👩‍⚖️" },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-950">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-9xl animate-float" />
        <div className="absolute top-1/3 -right-60 w-[600px] h-[600px] bg-gradient-to-bl from-purple-500/20 to-pink-500/10 rounded-full blur-9xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/15 to-cyan-400/10 rounded-full blur-9xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Hero Section */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl mb-10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">🟢 Live: 2,847,391 votes secured and counting</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-[1.05] tracking-tighter">
            The Future of<br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Democratic Voting</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none"><path d="M0 6 Q100 0 200 6 Q300 12 400 6" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" fill="none" /><defs><linearGradient id="grad"><stop stopColor="#2563eb" /><stop offset="0.5" stopColor="#d946ef" /><stop offset="1" stopColor="#ec4899" /></linearGradient></defs></svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-xl lg:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            The world&apos;s most advanced voting platform. Enterprise-grade security, blockchain verification, and AI-powered fraud detection trusted by governments, Fortune 500s, and universities worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            {user ? (
              <Link href="/dashboard" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-45 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative z-10 flex items-center gap-2">Go to Dashboard <span className="group-hover:translate-x-1 transition-transform">→</span></span>
              </Link>
            ) : (
              <>
                <Link href="/register" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-45 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center gap-2">Get Started Free <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 px-10 py-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Sign In
                </Link>
              </>
            )}
          </motion.div>

          {/* Live Stats Counter */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: counts.votes.toLocaleString() + "+", label: "Votes Secured", icon: "🗳️" },
              { value: counts.elections.toLocaleString() + "+", label: "Elections Run", icon: "📊" },
              { value: counts.users.toLocaleString() + "+", label: "Registered Voters", icon: "👥" },
              { value: counts.uptime / 100 + "%", label: "Uptime Guarantee", icon: "🟢" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Trusted By Section */}
      <section className="relative z-10 py-16 border-y border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">Trusted by world-class organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["🏛️ Government", "🏢 Fortune 500", "🎓 Universities", "🏥 Healthcare", "🏦 Finance", "🌐 NGOs"].map((org, i) => (
              <span key={i} className="text-2xl font-bold text-gray-300 dark:text-gray-600">{org}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Enterprise-Grade <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Security & Scale</span></h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Every feature built for the most demanding elections on Earth. No compromises.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="group relative p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-4xl mb-5">{f.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{f.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">{f.stat}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-32 px-6 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-16">Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leaders Worldwide</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">{t.avatar}</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{t.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center p-16 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/30">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Ready to Run Your Election?</h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">Join 15,000+ organizations that trust BallotChain for their most critical votes.</p>
          {user ? (
            <Link href="/dashboard" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-700 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">Go to Dashboard →</Link>
          ) : (
            <Link href="/register" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-700 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">Get Started Free →</Link>
          )}
        </motion.div>
      </section>
    </div>
  );
}