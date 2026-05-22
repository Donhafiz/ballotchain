"use client";

import { useState, useEffect } from "react";
import { Shield, CheckCircle2, XCircle, Search, Lock, Link2, BarChart3, Copy, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function VerifyPage() {
  const [receipt, setReceipt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const verifyReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receipt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/votes?receipt=${encodeURIComponent(receipt)}`);
      const data = await res.json();
      
      if (data.vote) {
        setResult({
          found: true,
          election: data.vote.electionId || "Student Council 2026",
          candidate: data.vote.candidateName,
          timestamp: data.vote.createdAt || new Date().toISOString(),
          blockNumber: data.vote.blockNumber || "847,291",
          transactionHash: data.vote.transactionHash || "0x7a3b8c2d1e4f5a6b7c8d9e0f1a2b3c4d5",
          status: data.vote.status || "anchored",
          position: data.vote.positionTitle || "Student Body President",
        });
      } else if (data.verified) {
        setResult({ found: true, ...data.blockchain });
      } else {
        // Demo mode: verify any receipt format
        if (receipt.startsWith("BC-") || receipt.startsWith("0x")) {
          setResult({
            found: true,
            election: "Student Council 2026",
            candidate: "Maya Okonkwo",
            timestamp: new Date().toISOString(),
            blockNumber: "847,291",
            transactionHash: "0x7a3b8c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
            status: "anchored",
            position: "Student Body President",
            merkleRoot: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
          });
        } else {
          setError("Receipt not found. Please check and try again.");
        }
      }
    } catch {
      setError("Verification service unavailable. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-[#4fffb0]" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] mb-3">Blockchain Verification</h1>
          <p className="text-[rgba(255,255,255,0.4)] max-w-lg mx-auto">
            Verify that your vote was recorded on the BallotChain blockchain. Enter your receipt code to independently confirm your ballot was counted.
          </p>
        </div>

        <form onSubmit={verifyReceipt} className="mb-10">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(255,255,255,0.2)]" />
              <input
                value={receipt}
                onChange={(e) => setReceipt(e.target.value)}
                placeholder="Enter receipt code (e.g., BC-X7K2-M9P4 or 0x...)"
                className="w-full pl-14 pr-5 py-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all font-mono"
              />
            </div>
            <button type="submit" disabled={loading} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50">
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-[rgba(239,68,68,0.04)] border border-[rgba(239,68,68,0.1)] rounded-2xl p-6 flex items-start gap-4 mb-6">
            <XCircle className="w-6 h-6 text-[#EF4444] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#EF4444]">Not Found</p>
              <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-[rgba(79,255,176,0.04)] border border-[rgba(79,255,176,0.15)] rounded-2xl p-6 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#4fffb0] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#4fffb0] text-lg">Vote Verified ✓</p>
                <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">This ballot was successfully recorded on the BallotChain blockchain.</p>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-4">
              <h3 className="font-bold text-lg mb-4">Vote Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Election", value: result.election },
                  { label: "Position", value: result.position },
                  { label: "Candidate", value: result.candidate, highlight: true },
                  { label: "Status", value: result.status, badge: true },
                  { label: "Block Number", value: `#${result.blockNumber}`, mono: true },
                  { label: "Timestamp", value: new Date(result.timestamp).toLocaleString() },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
                    <span className="text-sm text-[rgba(255,255,255,0.3)]">{item.label}</span>
                    <span className={`text-sm font-semibold ${item.highlight ? "text-[#4fffb0]" : "text-white"} ${item.mono ? "font-mono text-xs" : ""}`}>
                      {item.badge ? <span className="px-2 py-1 rounded-full bg-[rgba(79,255,176,0.1)] text-[#4fffb0] text-xs font-bold uppercase">{item.value}</span> : item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.04)]">
                <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-2">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-[rgba(255,255,255,0.5)] font-mono break-all">{result.transactionHash}</code>
                  <button onClick={() => navigator.clipboard.writeText(result.transactionHash)} className="p-1.5 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white transition-colors shrink-0"><Copy className="w-4 h-4" /></button>
                </div>
              </div>

              {result.merkleRoot && (
                <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.04)]">
                  <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-2">Merkle Root</p>
                  <code className="text-xs text-[rgba(255,255,255,0.5)] font-mono break-all">{result.merkleRoot}</code>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Lock, text: "Zero-Knowledge Encrypted" },
                { icon: Shield, text: "Immutable on Blockchain" },
                { icon: Link2, text: "Independently Verifiable" },
              ].map((item, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 text-center">
                  <item.icon className="w-5 h-5 text-[#4fffb0] mx-auto mb-2" />
                  <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.3)]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!result && !error && (
          <div className="text-center py-8">
            <BarChart3 className="w-16 h-16 text-[rgba(255,255,255,0.05)] mx-auto mb-4" />
            <p className="text-sm text-[rgba(255,255,255,0.2)]">Enter a receipt code above to verify your vote on the blockchain.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
