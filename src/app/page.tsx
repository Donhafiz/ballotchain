"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Vote, Globe2, Sparkles, Activity,
  Lock, Eye, Users, Check, ChevronRight, Radar, BarChart3, Cpu,
  Layers3, Orbit, Zap, Play, Monitor,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChatbot from "@/components/shared/AIChatbot";

interface Election {
  _id: string;
  title: string;
  endDate: string;
  eligibleVoters?: number;
  totalVotes?: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const features = [
  { title: "Quantum-Grade Security", description: "Advanced encryption architecture protecting every ballot through immutable blockchain validation.", icon: Lock },
  { title: "Live Intelligence Engine", description: "Real-time monitoring, AI fraud detection, and predictive anomaly analysis across elections.", icon: Radar },
  { title: "Transparent Verification", description: "Every voter independently verifies ballot integrity without compromising privacy.", icon: Eye },
  { title: "Global Edge Network", description: "Ultra-fast distributed infrastructure engineered for global-scale democratic systems.", icon: Globe2 },
  { title: "Advanced Analytics", description: "Powerful insights dashboards, turnout tracking, and live election intelligence.", icon: BarChart3 },
  { title: "AI Infrastructure", description: "Modern machine-learning systems continuously monitor voting environments and risks.", icon: Cpu },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [liveElections, setLiveElections] = useState<Election[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/elections?status=live", { cache: "no-store" });
        const data = await response.json();
        if (data?.elections) setLiveElections(data.elections);
      } catch (error) { console.error(error); }
    };
    load();
  }, []);

  const totalVotes = useMemo(() => {
    return liveElections.reduce((acc, item) => acc + (item.totalVotes || 0), 0);
  }, [liveElections]);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen overflow-hidden bg-[#030303] text-white selection:bg-emerald-300 selection:text-black">
      <Navbar />
      <main className="relative">
        <div className="absolute inset-0 -z-50 overflow-hidden">
          <div className="absolute left-[-10%] top-[-10%] h-[700px] w-[700px] animate-pulse rounded-full bg-emerald-500/10 blur-[140px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[700px] w-[700px] animate-pulse rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />
        </div>

        <section className="relative isolate min-h-screen overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
          <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-20 px-6 py-32 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10">
              <motion.div custom={1} variants={fadeUp} className="inline-flex items-center gap-3 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-5 py-3 backdrop-blur-2xl">
                <div className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" /></div>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300">{liveElections.length} live elections running globally</span>
              </motion.div>
              <motion.h1 custom={2} variants={fadeUp} className="mt-10 max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.07em] sm:text-7xl xl:text-[110px]">The Future<span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text font-serif italic text-transparent">of Digital Democracy</span>Starts Here.</motion.h1>
              <motion.p custom={3} variants={fadeUp} className="mt-8 max-w-2xl text-lg leading-9 text-white/50">BallotChain is a next-generation election infrastructure platform combining blockchain verification, AI-powered fraud prevention, enterprise security, and real-time transparency at global scale.</motion.p>
              <motion.div custom={4} variants={fadeUp} className="mt-12 flex flex-col gap-5 sm:flex-row">
                <Link href="/register" className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 p-[1px]"><div className="flex items-center gap-2 rounded-2xl bg-black px-8 py-4 text-sm font-black text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-black">Launch Election <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></div></Link>
                <Link href="/ussd-demo" className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><Play className="h-4 w-4 fill-white" /></div>Watch Platform Demo</Link>
              </motion.div>
              <motion.div custom={5} variants={fadeUp} className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
                {[{ value: "2.8M+", label: "Votes Secured", icon: ShieldCheck },{ value: "15K+", label: "Elections", icon: Vote },{ value: "127", label: "Countries", icon: Globe2 },{ value: "99.99%", label: "Uptime", icon: Zap }].map((stat, index) => (
                  <motion.div whileHover={{ y: -6 }} key={index} className="group relative overflow-hidden rounded-3xl border border-white/6 bg-white/[0.03] p-5 backdrop-blur-2xl"><div className="absolute inset-0 bg-gradient-to-br from-emerald-400/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" /><div className="relative z-10"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300"><stat.icon className="h-5 w-5" /></div><div className="text-3xl font-black tracking-tight">{stat.value}</div><p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/35">{stat.label}</p></div></motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative">
              <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_35%)]" />
                <div className="relative z-10 border-b border-white/6 p-7">
                  <div className="flex items-center justify-between">
                    <div><p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Election Command Center</p><h3 className="mt-3 text-3xl font-black tracking-tight">Live Governance Analytics</h3></div>
                    <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 px-5 py-3 text-center"><div className="text-2xl font-black text-emerald-300">{totalVotes.toLocaleString()}</div><div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Total Votes</div></div>
                  </div>
                  <Link href="/tv" className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-bold text-white/50 hover:text-white hover:border-emerald-300/20 hover:bg-emerald-400/5 transition-all"><Monitor className="h-4 w-4" />Open TV Dashboard</Link>
                </div>
                <div className="space-y-5 p-7">
                  {liveElections.slice(0, 4).map((election, index) => (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.12 }} key={election._id}>
                      <Link href={`/voter/elections/vote?id=${election._id}`} className="group flex items-center justify-between rounded-3xl border border-white/6 bg-black/20 p-5 transition-all duration-300 hover:border-emerald-300/20 hover:bg-white/[0.04]">
                        <div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300"><Layers3 className="h-6 w-6" /></div><div><h4 className="font-bold tracking-tight text-white">{election.title}</h4><div className="mt-2 flex flex-wrap gap-4 text-xs text-white/40"><span className="flex items-center gap-1"><Users className="h-3 w-3" />{election.eligibleVoters || 0} voters</span><span className="flex items-center gap-1"><Activity className="h-3 w-3" />{election.totalVotes || 0} live votes</span></div></div></div>
                        <ChevronRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-300" />
                      </Link>
                    </motion.div>
                  ))}
                  <div className="grid grid-cols-2 gap-5 pt-2">
                    <div className="rounded-3xl border border-white/6 bg-white/[0.03] p-5"><div className="flex items-center gap-3"><Orbit className="h-5 w-5 text-cyan-300" /><span className="text-sm font-bold">Global Sync</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full w-[94%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" /></div><p className="mt-3 text-xs text-white/40">94% edge synchronization efficiency</p></div>
                    <div className="rounded-3xl border border-white/6 bg-white/[0.03] p-5"><div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-violet-300" /><span className="text-sm font-bold">AI Monitoring</span></div><div className="mt-5 flex items-end gap-2"><span className="text-4xl font-black">99.2%</span><span className="pb-1 text-sm text-white/35">Accuracy</span></div><p className="mt-2 text-xs text-white/40">Threat prediction confidence</p></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="relative px-6 py-32 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center"><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-2xl"><Sparkles className="h-4 w-4 text-emerald-300" /><span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/60">Enterprise Infrastructure</span></div><h2 className="mx-auto mt-8 max-w-5xl text-5xl font-black leading-[1] tracking-[-0.06em] md:text-7xl">Built Like a<span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text font-serif italic text-transparent">Modern Technology Company</span></h2></div>
            <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div key={index} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-[32px] border border-white/6 bg-white/[0.03] p-8 backdrop-blur-2xl"><div className="absolute inset-0 bg-gradient-to-br from-emerald-400/[0.08] via-transparent to-cyan-400/[0.05] opacity-0 transition-opacity duration-500 group-hover:opacity-100" /><div className="relative z-10"><div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 text-emerald-300"><feature.icon className="h-7 w-7" /></div><h3 className="mt-8 text-2xl font-black tracking-tight">{feature.title}</h3><p className="mt-5 text-sm leading-8 text-white/50">{feature.description}</p></div></motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16"><h2 className="text-4xl font-black tracking-tight">Trust & <span className="font-serif italic text-white/50">Verify</span></h2></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/verify" className="group relative overflow-hidden rounded-3xl border border-white/6 bg-white/[0.03] p-8 backdrop-blur-2xl hover:border-emerald-300/20 transition-all no-underline"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 mb-6"><ShieldCheck className="h-7 w-7" /></div><h3 className="text-xl font-black mb-2 text-white">Verify Your Vote</h3><p className="text-sm text-white/40 mb-4">Enter your receipt to independently verify your ballot on the blockchain.</p><span className="text-emerald-300 text-sm font-bold flex items-center gap-1">Verify Now <ArrowRight className="h-4 w-4" /></span></Link>
              <Link href="/audit" className="group relative overflow-hidden rounded-3xl border border-white/6 bg-white/[0.03] p-8 backdrop-blur-2xl hover:border-cyan-300/20 transition-all no-underline"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 mb-6"><Eye className="h-7 w-7" /></div><h3 className="text-xl font-black mb-2 text-white">Public Audit</h3><p className="text-sm text-white/40 mb-4">Watch every vote appear in real-time on the transparent public dashboard.</p><span className="text-cyan-300 text-sm font-bold flex items-center gap-1">View Live Feed <ArrowRight className="h-4 w-4" /></span></Link>
              <Link href="/tv" className="group relative overflow-hidden rounded-3xl border border-white/6 bg-white/[0.03] p-8 backdrop-blur-2xl hover:border-violet-300/20 transition-all no-underline"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300 mb-6"><Monitor className="h-7 w-7" /></div><h3 className="text-xl font-black mb-2 text-white">TV Dashboard</h3><p className="text-sm text-white/40 mb-4">Full-screen election command center for public displays and election centers.</p><span className="text-violet-300 text-sm font-bold flex items-center gap-1">Open TV Mode <ArrowRight className="h-4 w-4" /></span></Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-32 lg:px-10">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[42px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-10 shadow-[0_30px_140px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:p-16">
            <div className="mx-auto max-w-4xl text-center"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 text-emerald-300"><Sparkles className="h-12 w-12" /></div><h2 className="mt-10 text-5xl font-black leading-[1] tracking-[-0.06em] md:text-7xl">Redefining Trust<span className="block font-serif italic text-white/55">Through Technology.</span></h2><p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/50">Launch elections with the same level of sophistication, security, and scalability used by world-class technology platforms.</p>
              <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row"><Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 px-9 py-5 text-sm font-black text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_80px_rgba(16,185,129,0.35)]">Start Building <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link><Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-9 py-5 text-sm font-bold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">Contact Enterprise Team</Link></div>
            </div>
          </div>
        </section>
      </main>
      <AIChatbot />
      <Footer />
    </div>
  );
}
