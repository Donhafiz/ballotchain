"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Share2, Download, Twitter, CheckCircle2, Copy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ShareContent() {
  const searchParams = useSearchParams();
  const candidate = searchParams.get("candidate") || "";
  const election = searchParams.get("election") || "";
  const receipt = searchParams.get("receipt") || "";
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const shareText = `I just voted for ${candidate} in ${election} on BallotChain! 🗳️\n\nReceipt: ${receipt}\nVerify: ballotchain.io/verify\n\n#BallotChain #BlockchainVoting #Democracy`;
  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  const copyText = () => { navigator.clipboard.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mb-8"><div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400/10 border border-emerald-400/20"><CheckCircle2 className="h-5 w-5 text-emerald-300" /><span className="font-black text-emerald-300">VOTE CAST SUCCESSFULLY</span></div></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/5 bg-gradient-to-br from-emerald-400/5 to-violet-400/5 p-8 mb-8 backdrop-blur-xl"><h1 className="text-3xl font-black mb-2">I Voted! 🗳️</h1><div className="text-lg font-bold text-emerald-300 mt-4">{candidate}</div><div className="text-white/40">{election}</div><div className="mt-4 p-3 rounded-xl bg-black/20 text-xs font-mono text-emerald-300">{receipt}</div></motion.div>
        <div className="grid grid-cols-2 gap-3"><button onClick={shareTwitter} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] font-bold hover:bg-[#1DA1F2]/20 transition-all"><Twitter className="h-5 w-5" /> Twitter</button><button onClick={shareWhatsApp} className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-bold hover:bg-[#25D366]/20 transition-all"><Share2 className="h-5 w-5" /> WhatsApp</button><button onClick={copyText} className="col-span-2 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white/60 font-bold hover:text-white hover:bg-white/[0.05] transition-all"><Copy className="h-5 w-5" /> {copied ? "Copied!" : "Copy to Share"}</button></div>
      </div>
      <Footer />
    </div>
  );
}
