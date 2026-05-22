"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Vote, Shield, Zap, Globe, Users, Star, Check, Clock, Eye, Sparkles, Award, TrendingUp } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [liveElections, setLiveElections] = useState<any[]>([]);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    fetch("/api/elections?status=live")
      .then(r => r.json())
      .then(d => { if (d.elections) setLiveElections(d.elections); })
      .catch(() => {});
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#050508]" />;

  const stats = [
    { value: "2.8M+", label: "Votes Secured", icon: Shield },
    { value: "15K+", label: "Elections", icon: Vote },
    { value: "127", label: "Countries", icon: Globe },
    { value: "99.99%", label: "Uptime", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(79,255,176,0.06)_0%,transparent_70%)] blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,212,255,0.05)_0%,transparent_70%)] blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(79,255,176,0.2)] bg-[rgba(79,255,176,0.05)] mb-8">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fffb0] opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4fffb0]" /></span>
            <span className="text-xs font-bold text-[#4fffb0] uppercase tracking-[0.15em]">{liveElections.length} Live Elections</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-[-0.05em] leading-[0.9] mb-6">Democracy<br /><span className="bg-gradient-to-r from-[#4fffb0] via-[#00d4ff] to-[#a78bfa] bg-clip-text text-transparent font-['Instrument_Serif',Georgia,serif] italic font-normal">deserves better</span><br />infrastructure.</h1>
          <p className="text-lg text-[rgba(255,255,255,0.45)] max-w-2xl mx-auto mb-10">Enterprise-grade blockchain voting trusted by governments and universities across 127 countries.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#050508] text-base font-bold hover:shadow-[0_20px_60px_rgba(79,255,176,0.3)] transition-all flex items-center justify-center gap-2">Start for free <ArrowRight className="w-5 h-5" /></Link>
            <Link href="/vote" className="px-8 py-4 rounded-2xl border-2 border-[rgba(255,255,255,0.1)] text-white text-base font-semibold hover:border-[rgba(255,255,255,0.25)] transition-all flex items-center justify-center gap-2"><Vote className="w-5 h-5 text-[#4fffb0]" /> Vote Now</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {stats.map((stat, i) => (<div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5"><stat.icon className="w-5 h-5 text-[#4fffb0] mb-3" /><div className="text-2xl font-black">{stat.value}</div><div className="text-[11px] text-[rgba(255,255,255,0.25)] uppercase mt-1">{stat.label}</div></div>))}
          </div>
        </div>
      </section>

      {liveElections.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-[#4fffb0] uppercase tracking-[0.2em] mb-3">Live Now</p>
            <h2 className="text-3xl font-black mb-8">Active Elections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveElections.map((election: any) => (
                <Link key={election._id} href={"/voter/elections/vote?id=" + election._id} className="group bg-[rgba(255,255,255,0.02)] border border-[rgba(79,255,176,0.1)] rounded-2xl p-6 hover:border-[rgba(79,255,176,0.3)] transition-all no-underline">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center"><Vote className="w-6 h-6 text-[#4fffb0]" /></div><div><h3 className="font-bold text-white">{election.title}</h3><p className="text-xs text-[rgba(255,255,255,0.3)] mt-1"><Clock className="w-3 h-3 inline mr-1" />Ends {new Date(election.endDate).toLocaleDateString()}</p></div></div>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(79,255,176,0.1)] text-[10px] font-bold text-[#4fffb0] uppercase"><span className="w-1.5 h-1.5 rounded-full bg-[#4fffb0] animate-ping" /> Live</span>
                  </div>
                  <div className="flex items-center justify-between"><div className="flex items-center gap-4 text-xs text-[rgba(255,255,255,0.25)]"><span><Users className="w-3 h-3 inline mr-1" />{election.eligibleVoters || 0} voters</span><span><Vote className="w-3 h-3 inline mr-1" />{election.totalVotes || 0} votes</span></div><span className="text-xs font-bold text-[#4fffb0]">Vote Now <ArrowRight className="w-3 h-3 inline" /></span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold text-[#4fffb0] uppercase tracking-[0.2em] mb-4">Why BallotChain</p>
          <h2 className="text-4xl font-black mb-12">Security that <span className="font-['Instrument_Serif',Georgia,serif] italic text-[rgba(255,255,255,0.5)]">scales</span> with democracy.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{i:Shield,t:"Zero-Knowledge Encryption",d:"Military-grade AES-256. Votes are cryptographically sealed."},{i:Eye,t:"End-to-End Verifiable",d:"Voters verify their ballot was counted."},{i:Zap,t:"Real-Time Results",d:"WebSocket-powered live updates."},{i:TrendingUp,t:"AI Fraud Detection",d:"Deep learning models flag anomalies."},{i:Globe,t:"Global Edge Network",d:"300+ edge locations worldwide."},{i:Award,t:"Enterprise Security",d:"ISO 27001, SOC 2, FIPS 140-2 certified."}].map((f,i)=><div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 hover:-translate-y-1 transition-all"><f.i className="w-6 h-6 text-[#4fffb0] mb-4" /><h3 className="font-bold mb-2">{f.t}</h3><p className="text-sm text-[rgba(255,255,255,0.4)]">{f.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-[rgba(255,255,255,0.04)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4">Pricing</p>
          <h2 className="text-4xl font-black mb-12">Simple, <span className="font-['Instrument_Serif',Georgia,serif] italic text-[rgba(255,255,255,0.5)]">honest</span> pricing.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{n:"Starter",p:"Free",f:["500 voters","5 elections/mo","Basic analytics","Email support"],b:"Start Free",h:"/register",x:false},{n:"Professional",p:"$299",r:"/mo",f:["10,000 voters","Unlimited elections","Advanced analytics","Priority support","API access","AI detection"],b:"Get Started",h:"/register",x:true},{n:"Enterprise",p:"Custom",f:["Unlimited voters","Dedicated infra","99.99% SLA","24/7 support","On-premise","Security audit"],b:"Contact Sales",h:"/contact",x:false}].map((p,i)=><div key={i} className={"relative rounded-2xl p-8 "+(p.x?"bg-[rgba(79,255,176,0.04)] border-2 border-[rgba(79,255,176,0.3)]":"bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]")}>{p.x&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#050508] text-[11px] font-black uppercase">Most Popular</div>}<p className="text-sm font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">{p.n}</p><div className="mb-4"><span className="text-5xl font-black">{p.p}</span>{p.r&&<span className="text-lg text-[rgba(255,255,255,0.3)]">{p.r}</span>}</div><div className="h-px bg-[rgba(255,255,255,0.06)] mb-6"/><ul className="space-y-3 mb-8">{p.f.map((f,j)=><li key={j} className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.6)]"><Check className="w-4 h-4 text-[#4fffb0] shrink-0 mt-0.5"/>{f}</li>)}</ul><Link href={p.h} className={"block w-full py-3.5 rounded-xl text-center text-sm font-bold "+(p.x?"bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#050508]":"bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white")}>{p.b}</Link></div>)}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold text-[#4fffb0] uppercase tracking-[0.2em] mb-4">Trust & Verify</p>
          <h2 className="text-4xl font-black mb-12">Built for <span className="font-['Instrument_Serif',Georgia,serif] italic text-[rgba(255,255,255,0.5)]">verifiable</span> democracy.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/verify" className="group bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 text-center hover:-translate-y-1 transition-all no-underline"><Shield className="w-7 h-7 text-[#4fffb0] mx-auto mb-4" /><h3 className="font-bold mb-2 text-white">Verify Your Vote</h3><p className="text-sm text-[rgba(255,255,255,0.4)] mb-4">Verify your ballot on the blockchain.</p><span className="text-[#4fffb0] text-sm font-bold">Verify Now <ArrowRight className="w-4 h-4 inline" /></span></Link>
            <Link href="/audit" className="group bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 text-center hover:-translate-y-1 transition-all no-underline"><Eye className="w-7 h-7 text-[#4fffb0] mx-auto mb-4" /><h3 className="font-bold mb-2 text-white">Public Audit</h3><p className="text-sm text-[rgba(255,255,255,0.4)] mb-4">Watch votes in real-time.</p><span className="text-[#4fffb0] text-sm font-bold">View Live Feed <ArrowRight className="w-4 h-4 inline" /></span></Link>
            <Link href="/docs" className="group bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 text-center hover:-translate-y-1 transition-all no-underline"><Award className="w-7 h-7 text-[#4fffb0] mx-auto mb-4" /><h3 className="font-bold mb-2 text-white">Enterprise Security</h3><p className="text-sm text-[rgba(255,255,255,0.4)] mb-4">ISO 27001, SOC 2 certified.</p><span className="text-[#4fffb0] text-sm font-bold">Learn More <ArrowRight className="w-4 h-4 inline" /></span></Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(79,255,176,0.1)] rounded-3xl p-12">
            <Sparkles className="w-10 h-10 text-[#4fffb0] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to run your most important vote?</h2>
            <p className="text-[rgba(255,255,255,0.4)] mb-8">Join 15,000+ organizations that trust BallotChain.</p>
            <Link href="/register" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#050508] text-base font-bold hover:shadow-[0_20px_60px_rgba(79,255,176,0.3)] transition-all inline-block">Start for free</Link>
            <p className="text-xs text-[rgba(255,255,255,0.2)] mt-6">No credit card required · Setup in under 5 minutes</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
