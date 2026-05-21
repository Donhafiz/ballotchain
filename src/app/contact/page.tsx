"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Building2, Shield, Send, CheckCircle2, Clock, MessageSquare } from "lucide-react";

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[{ icon: Mail, label: "Email", value: "hello@ballotchain.io" },{ icon: Phone, label: "Phone", value: "+1 (888) 976-2426" },{ icon: MessageSquare, label: "Live Chat", value: "Available 24/7" }].map((item, i) => (
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
