"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f]" />;

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 px-6">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_0%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(79,255,176,0.07)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(79,255,176,0.2)] bg-[rgba(79,255,176,0.05)] text-xs font-semibold text-[#4fffb0] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4fffb0] animate-pulse" />Live · 2.8M+ votes secured
          </span>
        </div>
        <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-[-0.03em] leading-tight mb-6">
          Democracy deserves <span className="font-['Instrument_Serif',Georgia,serif] italic bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] bg-clip-text text-transparent font-normal">better</span> infrastructure.
        </h1>
        <p className="relative z-10 text-lg text-[rgba(255,255,255,0.45)] max-w-xl mb-10">
          Enterprise-grade blockchain voting trusted by governments, Fortune 500 companies, and universities across 127 countries.
        </p>
        <div className="relative z-10 flex gap-4 flex-wrap justify-center mb-20">
          <Link href="/register" className="px-8 py-4 rounded-xl bg-[#4fffb0] text-[#0b0c0f] font-bold hover:opacity-90 transition-all flex items-center gap-2">Start for free <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/login" className="px-8 py-4 rounded-xl border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.7)] font-medium hover:text-white transition-all">Sign In</Link>
        </div>
        <div className="relative z-10 flex border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden max-w-lg w-full">
          {["2.8M+","15K+","127","99.99%"].map((v,i) => (
            <div key={i} className="flex-1 py-5 text-center border-r border-[rgba(255,255,255,0.07)] last:border-r-0">
              <div className="text-2xl font-extrabold tracking-[-0.03em]">{v}</div>
              <div className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase mt-1">{["Votes","Elections","Countries","Uptime"][i]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-24">
        <div className="max-w-xl mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4fffb0] mb-3">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-tight">Security that <span className="font-['Instrument_Serif',Georgia,serif] italic text-[rgba(255,255,255,0.5)] font-normal">scales</span> with democracy.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Zero-Knowledge Encryption", desc: "Military-grade AES-256 with zero-knowledge proofs. Votes are cryptographically sealed." },
            { title: "Blockchain Immutable", desc: "Every vote cryptographically hashed on-chain. Tamper-proof by mathematical certainty." },
            { title: "Real-Time Streaming", desc: "WebSocket-powered live results with sub-100ms latency." },
            { title: "AI Fraud Detection", desc: "Deep learning models analyze patterns in real-time, flagging anomalies instantly." },
            { title: "End-to-End Verifiable", desc: "Voters independently verify their ballot was counted correctly." },
            { title: "Global Edge Network", desc: "300+ edge locations ensure instant load times worldwide." },
          ].map((f,i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.13)] hover:-translate-y-[2px] transition-all">
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ffb347] mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em]">Simple, <span className="font-['Instrument_Serif',Georgia,serif] italic text-[rgba(255,255,255,0.5)] font-normal">honest</span> pricing.</h2>
          <p className="text-sm text-[rgba(255,255,255,0.35)] mt-3">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {[
            { plan: "Starter", price: "Free", desc: "For student councils and small organizations.", features: ["500 voters","5 elections/mo","Basic analytics","Email support","Blockchain verification"], btn: "Start free", featured: false },
            { plan: "Professional", price: "$299", period: "/mo", desc: "For universities and mid-size companies.", features: ["10,000 voters","Unlimited elections","Advanced analytics","Priority support","Full API access","Custom branding","AI fraud detection"], btn: "Get started", featured: true },
            { plan: "Enterprise", price: "Custom", desc: "For governments and Fortune 500s.", features: ["Unlimited voters","Dedicated infrastructure","99.99% SLA","24/7 support","On-premise","Full security audit","Legal compliance"], btn: "Contact sales", featured: false },
          ].map((p,i) => (
            <div key={i} className={"bg-[rgba(255,255,255,0.03)] border rounded-2xl p-8 relative hover:-translate-y-[2px] transition-all " + (p.featured ? "border-[rgba(79,255,176,0.2)] bg-[rgba(79,255,176,0.04)] md:scale-105" : "border-[rgba(255,255,255,0.07)]")}>
              {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold bg-[#4fffb0] text-[#0b0c0f] uppercase whitespace-nowrap">Most Popular</div>}
              <p className="text-xs font-bold uppercase text-[rgba(255,255,255,0.45)] mb-2">{p.plan}</p>
              <div className="text-4xl font-extrabold tracking-[-0.03em] mb-1">{p.price}{p.period && <span className="text-sm font-normal text-[rgba(255,255,255,0.45)]">{p.period}</span>}</div>
              <p className="text-sm text-[rgba(255,255,255,0.4)] mb-6">{p.desc}</p>
              <div className="h-px bg-[rgba(255,255,255,0.06)] mb-6" />
              <ul className="space-y-3 mb-8">{p.features.map((f,j) => <li key={j} className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.6)]"><span className="text-[#4fffb0] font-bold">✓</span> {f}</li>)}</ul>
              <Link href="/register" className={"block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all " + (p.featured ? "bg-[#4fffb0] text-[#0b0c0f] hover:opacity-90" : "border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.6)] hover:text-white hover:border-[rgba(255,255,255,0.2)]")}>{p.btn}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <div className="border-t border-[rgba(255,255,255,0.07)] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4fffb0] mb-3">Trusted</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em]">What our <span className="font-['Instrument_Serif',Georgia,serif] italic text-[rgba(255,255,255,0.5)] font-normal">customers say.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { quote: "We ran our national student union election with 87,000 voters. Zero issues.", name: "Kofi Asante", role: "National Student Union, Ghana" },
              { quote: "Board election participation went from 34% to 91%.", name: "Sofia Reyes", role: "CPO, TechScale Inc." },
              { quote: "The AI fraud detection flagged patterns we never would have caught.", name: "Dr. Danielle Moreau", role: "Electoral Commissioner, Lyon" },
            ].map((t,i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-8 hover:border-[rgba(255,255,255,0.12)] transition-all">
                <div className="text-[#ffb347] text-sm mb-4">★★★★★</div>
                <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed mb-6 italic font-['Instrument_Serif',Georgia,serif]">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center text-xs font-bold text-[#0b0c0f]">{t.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-[rgba(255,255,255,0.3)]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4fffb0] mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em]">Common <span className="font-['Instrument_Serif',Georgia,serif] italic text-[rgba(255,255,255,0.5)] font-normal">questions.</span></h2>
        </div>
        <div className="space-y-1">
          {[
            { q: "How does blockchain verification work?", a: "Each vote is encrypted and assigned a unique cryptographic hash, anchored to our immutable blockchain. Voters receive a receipt and can independently verify their vote." },
            { q: "Can I export results?", a: "Yes. Results export to PDF, CSV, and JSON with full cryptographic signatures." },
            { q: "Is this suitable for legally binding elections?", a: "Yes for most use cases. Enterprise plan includes legal compliance for 40+ jurisdictions." },
            { q: "How does AI detect fraud?", a: "Our models analyze voting patterns, timing, device fingerprints, and behavioral signals in real-time." },
          ].map((item, i) => (
            <details key={i} className="group border-b border-[rgba(255,255,255,0.07)] py-5 cursor-pointer">
              <summary className="flex justify-between items-center text-sm font-semibold list-none">{item.q}<span className="text-lg transition-transform group-open:rotate-45 text-[rgba(255,255,255,0.3)]">+</span></summary>
              <p className="mt-3 text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="bg-[rgba(79,255,176,0.03)] border border-[rgba(79,255,176,0.1)] rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-40 bg-[radial-gradient(ellipse,rgba(79,255,176,0.08)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="relative text-3xl font-extrabold tracking-[-0.03em] mb-4">Ready to run your most important vote?</h2>
          <p className="relative text-[rgba(255,255,255,0.4)] mb-8">Join 15,000+ organizations that trust BallotChain.</p>
          <Link href="/register" className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#4fffb0] text-[#0b0c0f] font-bold hover:opacity-90 transition-all">Start for free <ArrowRight className="w-4 h-4" /></Link>
          <p className="relative mt-4 text-xs text-[rgba(255,255,255,0.2)]">No credit card required · Setup in under 5 minutes</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
