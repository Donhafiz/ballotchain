"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Shield, Globe, Users, Zap, Award, Building2, Lock, Eye } from "lucide-react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f]" />;

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-[-0.03em] mb-4">Building the <em className="font-['Instrument_Serif',Georgia,serif] italic bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] bg-clip-text text-transparent font-normal">infrastructure</em> of democracy.</h1>
        <p className="text-lg text-[rgba(255,255,255,0.4)] max-w-2xl mx-auto">BallotChain is the world&apos;s most advanced voting platform — trusted by governments, universities, and Fortune 500 companies across 127 countries.</p>
      </section>
      <Footer />
    </div>
  );
}
