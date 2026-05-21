"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Shield, Download, Copy, Eye, ExternalLink, Clock, Vote, BadgeCheck, Lock, BarChart3, Printer } from "lucide-react";

export default function VoteReceiptPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => { setMounted(true); }, []);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const vote = {
    id: "v1",
    election: "Faculty Senate",
    position: "Faculty Senator",
    candidate: "Dr. Sarah Mitchell",
    date: "May 19, 2026 at 14:32:17 EST",
    receipt: "0xf1e2d3c4b5a67890abcdef1234567890a1b2c3d4e5f67890abcdef1234567890",
    blockNumber: "847,291",
    blockHash: "0x7a3b8c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
    transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1",
    verified: true,
    timestamp: new Date().toISOString(),
  };

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f]">
      <div className="max-w-[720px] mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/voter/my-votes" className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-[24px] font-bold text-white">Vote Receipt</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => showToast("Receipt copied")} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Copy className="w-4 h-4" /></button>
            <button onClick={() => showToast("Printing...")} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Printer className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="bg-[rgba(79,255,176,0.04)] border border-[rgba(79,255,176,0.15)] rounded-2xl p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[rgba(79,255,176,0.1)] flex items-center justify-center">
            <BadgeCheck className="w-7 h-7 text-[#4fffb0]" />
          </div>
          <div>
            <div className="text-[18px] font-bold text-white">Cryptographically Verified</div>
            <div className="text-[13px] text-[rgba(255,255,255,0.4)]">This receipt is independently verifiable on the BallotChain blockchain</div>
          </div>
        </div>

        {/* Vote Details */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[13px] text-[rgba(255,255,255,0.3)]">Election</span>
              <span className="text-[14px] font-semibold text-white">{vote.election}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[13px] text-[rgba(255,255,255,0.3)]">Position</span>
              <span className="text-[14px] font-semibold text-white">{vote.position}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[13px] text-[rgba(255,255,255,0.3)]">Candidate</span>
              <span className="text-[14px] font-bold text-[#4fffb0]">{vote.candidate}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-[13px] text-[rgba(255,255,255,0.3)]">Date</span>
              <span className="text-[14px] font-semibold text-white">{vote.date}</span>
            </div>
          </div>

          {/* Blockchain Data */}
          <div className="mt-8 p-6 rounded-xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)]">
            <h3 className="text-[13px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.08em] mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#4fffb0]" /> Blockchain Data
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.2)] uppercase mb-1">Receipt Hash</div>
                <code className="block text-[12px] text-[rgba(255,255,255,0.5)] font-mono break-all bg-[rgba(255,255,255,0.02)] px-3 py-2 rounded-lg">{vote.receipt}</code>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.2)] uppercase mb-1">Block Number</div>
                  <code className="block text-[12px] text-white font-mono">{vote.blockNumber}</code>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.2)] uppercase mb-1">Timestamp</div>
                  <code className="block text-[12px] text-white font-mono">{new Date(vote.timestamp).toLocaleString()}</code>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.2)] uppercase mb-1">Transaction Hash</div>
                <code className="block text-[11px] text-[rgba(255,255,255,0.4)] font-mono break-all bg-[rgba(255,255,255,0.02)] px-3 py-2 rounded-lg">{vote.transactionHash}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Security Guarantees */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Lock, text: "Zero-Knowledge Encrypted" },
            { icon: Shield, text: "Immutable on Blockchain" },
            { icon: Eye, text: "Independently Verifiable" },
          ].map((item, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 text-center">
              <item.icon className="w-5 h-5 text-[#4fffb0] mx-auto mb-2" />
              <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.3)]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className="flex items-center gap-2 px-5 py-[12px] rounded-xl bg-[#14151a] border border-[rgba(255,255,255,0.1)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-[13px] font-medium text-white"><CheckCircle2 className="w-4 h-4 text-[#4fffb0]" />{toast}</div></div>}
    </div>
  );
}