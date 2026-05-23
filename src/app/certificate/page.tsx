"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Award, Shield, Download, Sparkles, CheckCircle2, Vote } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const candidate = searchParams.get("candidate") || "";
  const election = searchParams.get("election") || "";
  const receipt = searchParams.get("receipt") || "";
  const date = searchParams.get("date") || new Date().toLocaleDateString();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border-2 border-emerald-400/30 bg-gradient-to-br from-emerald-400/5 via-cyan-400/5 to-violet-400/5 p-10 text-center backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-violet-300 rounded-full blur-xl opacity-30" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300 flex items-center justify-center">
                <Award className="h-10 w-10 text-black" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-black mb-2">Certificate of Vote</h1>
          <p className="text-white/40 mb-8">Blockchain-Verified Voting Certificate</p>

          <div className="space-y-4 text-left bg-black/20 rounded-2xl p-6 mb-8">
            <div className="flex justify-between"><span className="text-white/40">Election</span><span className="font-bold">{election}</span></div>
            <div className="flex justify-between"><span className="text-white/40">Candidate</span><span className="font-bold text-emerald-300">{candidate}</span></div>
            <div className="flex justify-between"><span className="text-white/40">Date</span><span className="font-bold">{date}</span></div>
            <div className="flex justify-between"><span className="text-white/40">Receipt</span><span className="font-mono text-xs text-emerald-300">{receipt}</span></div>
            <div className="flex justify-between"><span className="text-white/40">Status</span><span className="font-bold text-emerald-300"><CheckCircle2 className="h-4 w-4 inline mr-1" />Verified on Blockchain</span></div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-white/30 mb-6">
            <Shield className="h-4 w-4 text-emerald-300" />
            <span>This certificate is cryptographically verifiable on the BallotChain blockchain</span>
          </div>

          <button onClick={() => window.print()} className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black font-black hover:opacity-90 transition-all flex items-center justify-center gap-2 print:hidden">
            <Download className="h-4 w-4" /> Download Certificate
          </button>

          <div className="mt-4 text-[10px] text-white/20">Token ID: {receipt.slice(0, 16)}... | BallotChain © 2026</div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
