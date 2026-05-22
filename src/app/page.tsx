"use client";
import Link from "next/link";
import { ArrowRight, Vote, Clock, Users, Shield, Zap, Lock, Globe, Eye, Bot, Accessibility, BarChart3, Languages, Check, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [liveElections, setLiveElections] = useState<any[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    fetch('/api/elections?status=live')
      .then(res => res.json())
      .then(data => { if (data.elections) setLiveElections(data.elections); })
      .catch(() => {});
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f]" />;

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 px-6">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_0%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(79,255,176,0.07)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(79,255,176,0.2)] bg-[rgba(79,255,176,0.05)] text-xs font-semibold text-[#4fffb0] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4fffb0] animate-pulse" />Live · {liveElections.length} active elections
          </span>
        </div>
        <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Democracy deserves <span className="bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] bg-clip-text text-transparent italic">better</span> infrastructure.
        </h1>
        <p className="relative z-10 text-lg text-[rgba(255,255,255,0.45)] max-w-xl mb-10">
          Enterprise-grade blockchain voting trusted by governments and universities across 127 countries.
        </p>
        <div className="relative z-10 flex gap-4 flex-wrap justify-center mb-20">
          <Link href="/register" className="px-8 py-4 rounded-xl bg-[#4fffb0] text-[#0b0c0f] font-bold hover:opacity-90 transition-all flex items-center gap-2">Start for free <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/vote" className="px-8 py-4 rounded-xl border border-[rgba(79,255,176,0.2)] text-[#4fffb0] font-semibold hover:bg-[rgba(79,255,176,0.05)] transition-all flex items-center gap-2">Vote Now <Vote className="w-4 h-4" /></Link>
        </div>
        <div className="relative z-10 flex border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden max-w-lg w-full">
          {["2.8M+","15K+","127","99.99%"].map((v,i) => (
            <div key={i} className="flex-1 py-5 text-center border-r border-[rgba(255,255,255,0.07)] last:border-r-0">
              <div className="text-2xl font-extrabold">{v}</div>
              <div className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase mt-1">{["Votes","Elections","Countries","Uptime"][i]}</div>
            </div>
          ))}
        </div>
      </section>

      {liveElections.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-8">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4fffb0] mb-2">Live Now</p><h2 className="text-3xl font-extrabold">Active Elections</h2></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveElections.map((election: any) => (
              <div key={election._id} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(79,255,176,0.15)] rounded-2xl p-6 hover:border-[rgba(79,255,176,0.3)] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[rgba(79,255,176,0.1)] flex items-center justify-center"><Vote className="w-5 h-5 text-[#4fffb0]" /></div><div><h3 className="font-bold text-white">{election.title}</h3><p className="text-xs text-[rgba(255,255,255,0.4)] mt-1">Ends {new Date(election.endDate).toLocaleDateString()}</p></div></div>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[rgba(79,255,176,0.1)] text-[10px] font-bold text-[#4fffb0] uppercase"><span className="w-1.5 h-1.5 rounded-full bg-[#4fffb0] animate-pulse" /> Live</span>
                </div>
                <div className="flex items-center justify-between"><div className="flex items-center gap-4 text-xs text-[rgba(255,255,255,0.3)]"><span className="flex items-center gap-1"><Users className="w-3 h-3" /> {election.eligibleVoters || 0} voters</span><span className="flex items-center gap-1"><Vote className="w-3 h-3" /> {election.totalVotes || 0} votes</span></div><Link href={`/vote?election=${election._id}`} className="px-4 py-2 rounded-lg bg-[#4fffb0] text-[#0b0c0f] text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1">Vote Now <ArrowRight className="w-3 h-3" /></Link></div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="features" className="max-w-5xl mx-auto px-6 py-24">
        <div className="max-w-xl mb-16"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4fffb0] mb-3">Capabilities</p><h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Security that <span className="text-[rgba(255,255,255,0.5)] italic">scales</span> with democracy.</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ title: "Zero-Knowledge Encryption", desc: "Military-grade AES-256. Votes are cryptographically sealed." },{ title: "Blockchain Immutable", desc: "Every vote hashed on-chain. Tamper-proof by mathematical certainty." },{ title: "Real-Time Streaming", desc: "WebSocket-powered live results with sub-100ms latency." },{ title: "AI Fraud Detection", desc: "Deep learning models flag anomalies in real-time." },{ title: "End-to-End Verifiable", desc: "Voters independently verify their ballot was counted." },{ title: "Global Edge Network", desc: "300+ edge locations for instant load times worldwide." }].map((f,i) => (<div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.13)] hover:-translate-y-[2px] transition-all"><h3 className="font-bold mb-2">{f.title}</h3><p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">{f.desc}</p></div>))}
        </div>
      </section>

      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ffb347] mb-3">Pricing</p><h2 className="text-3xl md:text-4xl font-extrabold">Simple, <span className="text-[rgba(255,255,255,0.5)] italic">honest</span> pricing.</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ plan: "Starter", price: "Free", features: ["500 voters","5 elections/mo","Basic analytics","Email support"], btn: "Start free", featured: false },{ plan: "Professional", price: "$299/mo", features: ["10,000 voters","Unlimited elections","Advanced analytics","Priority support","API access","AI detection"], btn: "Get started", featured: true },{ plan: "Enterprise", price: "Custom", features: ["Unlimited voters","Dedicated infra","99.99% SLA","24/7 support","On-premise","Security audit"], btn: "Contact sales", featured: false }].map((p,i) => (<div key={i} className={"bg-[rgba(255,255,255,0.03)] border rounded-2xl p-8 relative " + (p.featured ? "border-[rgba(79,255,176,0.2)] bg-[rgba(79,255,176,0.04)]" : "border-[rgba(255,255,255,0.07)]")}>{p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold bg-[#4fffb0] text-[#0b0c0f] uppercase">Most Popular</div>}<p className="text-xs font-bold uppercase text-[rgba(255,255,255,0.45)] mb-2">{p.plan}</p><div className="text-4xl font-extrabold mb-4">{p.price}</div><ul className="space-y-2 mb-8">{p.features.map((f,j) => <li key={j} className="text-sm text-[rgba(255,255,255,0.6)]">✓ {f}</li>)}</ul><Link href="/register" className={"block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all " + (p.featured ? "bg-[#4fffb0] text-[#0b0c0f] hover:opacity-90" : "border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.6)] hover:text-white")}>{p.btn}</Link></div>))}
        </div>
      </section>

      <div className="border-t border-[rgba(255,255,255,0.07)] py-24 px-6"><div className="max-w-5xl mx-auto"><div className="text-center mb-16"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4fffb0] mb-3">Trusted</p><h2 className="text-3xl font-extrabold">What our <span className="text-[rgba(255,255,255,0.5)] italic">customers say.</span></h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[{ quote: "We ran our national student union election with 87,000 voters. Zero issues.", name: "Kofi Asante", role: "National Student Union, Ghana" },{ quote: "Board election participation went from 34% to 91%.", name: "Sofia Reyes", role: "CPO, TechScale Inc." },{ quote: "The AI fraud detection flagged patterns we never would have caught.", name: "Dr. Danielle Moreau", role: "Electoral Commissioner, Lyon" }].map((t,i) => (<div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-8"><div className="text-[#ffb347] text-sm mb-4">★★★★★</div><p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed mb-6 italic">"{t.quote}"</p><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center text-xs font-bold text-[#0b0c0f]">{t.name.split(" ").map(n => n[0]).join("")}</div><div><div className="text-sm font-bold">{t.name}</div><div className="text-xs text-[rgba(255,255,255,0.3)]">{t.role}</div></div></div></div>))}</div></div></div>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4fffb0] mb-3">Trust & Transparency</p><h2 className="text-3xl font-extrabold">Built for <span className="text-[rgba(255,255,255,0.5)] italic">verifiable</span> democracy.</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/verify" className="bg-[rgba(255,255,255,0.03)] border border-[rgba(79,255,176,0.1)] rounded-2xl p-8 text-center hover:border-[rgba(79,255,176,0.3)] transition-all group no-underline">
            <div className="w-14 h-14 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-5"><Shield className="w-7 h-7 text-[#4fffb0]" /></div>
            <h3 className="font-bold text-lg mb-2 text-white">Verify Your Vote</h3>
            <p className="text-sm text-[rgba(255,255,255,0.4)]">Enter your receipt code to independently verify your ballot was counted.</p>
            <span className="inline-flex items-center gap-1 text-[#4fffb0] text-sm font-semibold mt-4">Verify Now <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/audit" className="bg-[rgba(255,255,255,0.03)] border border-[rgba(79,255,176,0.1)] rounded-2xl p-8 text-center hover:border-[rgba(79,255,176,0.3)] transition-all group no-underline">
            <div className="w-14 h-14 rounded-2xl bg-[rgba(0,212,255,0.08)] flex items-center justify-center mx-auto mb-5"><Eye className="w-7 h-7 text-[#00d4ff]" /></div>
            <h3 className="font-bold text-lg mb-2 text-white">Public Audit</h3>
            <p className="text-sm text-[rgba(255,255,255,0.4)]">Watch every vote appear in real-time on the public audit dashboard.</p>
            <span className="inline-flex items-center gap-1 text-[#00d4ff] text-sm font-semibold mt-4">View Live Feed <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/ussd-demo" className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-8 text-center hover:border-[rgba(255,255,255,0.15)] transition-all group no-underline">
            <div className="w-14 h-14 rounded-2xl bg-[rgba(139,92,246,0.08)] flex items-center justify-center mx-auto mb-5"><Vote className="w-7 h-7 text-[#a78bfa]" /></div>
            <h3 className="font-bold text-lg mb-2 text-white">Vote via USSD</h3>
            <p className="text-sm text-[rgba(255,255,255,0.4)]">No internet? Dial *713*123# from any phone. Works on all networks.</p>
            <span className="inline-flex items-center gap-1 text-[#a78bfa] text-sm font-semibold mt-4">Try Demo <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="bg-[rgba(79,255,176,0.03)] border border-[rgba(79,255,176,0.1)] rounded-3xl p-12">
          <h2 className="text-3xl font-extrabold mb-4">Ready to run your most important vote?</h2>
          <p className="text-[rgba(255,255,255,0.4)] mb-8">Join 15,000+ organizations that trust BallotChain.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#4fffb0] text-[#0b0c0f] font-bold hover:opacity-90 transition-all">Start for free <ArrowRight className="w-4 h-4" /></Link>
          <p className="mt-4 text-xs text-[rgba(255,255,255,0.2)]">No credit card required · Setup in under 5 minutes</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
