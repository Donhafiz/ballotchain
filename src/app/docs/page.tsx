"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, Code, Shield, Globe, Zap, Search, ChevronRight } from "lucide-react";

export default function DocsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f]" />;

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-[-0.03em] mb-4"><em className="font-['Instrument_Serif',Georgia,serif] italic bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] bg-clip-text text-transparent font-normal">Documentation</em></h1>
        <p className="text-lg text-[rgba(255,255,255,0.4)] mb-12">Everything you need to integrate, secure, and scale your elections.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{ icon: Zap, title: "Getting Started", desc: "Quick start guide and first election setup" },{ icon: Code, title: "API Reference", desc: "REST API endpoints and SDKs" },{ icon: Shield, title: "Security", desc: "Encryption, blockchain, compliance" },{ icon: Globe, title: "Integrations", desc: "SSO, Slack, Zapier, Webhooks" }].map((item, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.13)] transition-all group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-[#4fffb0]" /></div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.4)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
