"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MessageCircle, Globe, ChevronRight, ArrowLeft, Shield, Building2, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f]" />;

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-[-0.03em] mb-4">Let&apos;s <em className="font-['Instrument_Serif',Georgia,serif] italic bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] bg-clip-text text-transparent font-normal">talk.</em></h1>
        <p className="text-lg text-[rgba(255,255,255,0.4)] mb-12">Get in touch with our team for demos, enterprise inquiries, or support.</p>
        
        
        {/* Personal Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center hover:border-emerald-400/20 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-white mb-1">Call Us</h3>
            <a href="tel:+2330559137611" className="text-emerald-300 hover:underline font-mono">+233 (0) 55 913 7611</a>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center hover:border-emerald-400/20 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 mx-auto mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-white mb-1">WhatsApp</h3>
            <a href="https://wa.me/233505957381" target="_blank" className="text-cyan-300 hover:underline font-mono">+233 (0) 50 595 7381</a>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center hover:border-emerald-400/20 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-white mb-1">Email</h3>
            <a href="mailto:iddrisuhafiz568@gmail.com" className="text-violet-300 hover:underline text-sm">iddrisuhafiz568@gmail.com</a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[{ icon: Mail, label: "Email", value: "hello@ballotchain.io" },{ icon: Phone, label: "Phone", value: "+1 (888) 976-2426" },{ icon: MessageCircle, label: "Live Chat", value: "Available 24/7" }].map((item, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 text-center">
              <item.icon className="w-8 h-8 text-[#4fffb0] mx-auto mb-3" />
              <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase">{item.label}</p>
              <p className="font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
