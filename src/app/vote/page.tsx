"use client";

import { useState, useEffect } from "react";
import { Key, ArrowRight, Shield, Smartphone , CreditCard} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function VoterLoginPage() {
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [method, setMethod] = useState<"code" | "ussd">("code");
  const [electionId, setElectionId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("election") || params.get("id") || "";
      if (id) setElectionId(id);
    }
  }, []);

  const handleAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;
    
    // Any code works for demo - redirect to the actual election
    const targetId = electionId || "6a1068f1579f5f61ee079dec";
    window.location.href = `/voter/elections/vote?id=${targetId}`;
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-6 pt-20">
        <div className="w-full max-w-[480px]">
          <div className="flex gap-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-1.5 mb-6">
            <button onClick={() => setMethod("code")} className={"flex-1 flex items-center justify-center gap-2 py-[10px] rounded-xl text-[13px] font-semibold transition-all " + (method === "code" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)]")}><Key className="w-4 h-4" /> Access Code</button>
            <button onClick={() => setMethod("ussd")} className={"flex-1 flex items-center justify-center gap-2 py-[10px] rounded-xl text-[13px] font-semibold transition-all " + (method === "ussd" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)]")}><Smartphone className="w-4 h-4" /> USSD</button>
          </div>

          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-5"><Key className="w-7 h-7 text-[#4fffb0]" /></div>
              <h1 className="text-2xl font-extrabold tracking-[-0.02em] mb-2">Enter Access Code</h1>
              <p className="text-sm text-[rgba(255,255,255,0.35)]">Enter any code to access your ballot</p>
            </div>

            {error && <div className="mb-6 p-4 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.15)] text-[#EF4444] text-sm text-center">{error}</div>}

            <form onSubmit={handleAccessCode} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Access Code</label>
                <input value={accessCode} onChange={(e) => setAccessCode(e.target.value.toUpperCase())} placeholder="Type DEMO or any code" className="w-full px-5 py-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-lg font-mono tracking-[0.1em] text-center outline-none placeholder:text-[rgba(255,255,255,0.1)] focus:border-[rgba(79,255,176,0.3)] transition-all" required />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                Access Ballot <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-[rgba(79,255,176,0.03)] border border-[rgba(79,255,176,0.06)]">
              <p className="text-xs text-[rgba(255,255,255,0.3)] text-center"><Shield className="w-3 h-3 inline mr-1 text-[#4fffb0]" /> Your vote is encrypted and recorded on the blockchain</p>
            </div>
          </div>
        </div>
      </div>
      
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-center text-sm text-white/40 mb-4">or</p>
            <Link href={`/vote/pay?election=${electionId}&title=Active Election`} className="w-full py-3 rounded-xl border border-emerald-400/15 bg-emerald-400/5 text-emerald-300 text-sm font-bold hover:bg-emerald-400/10 transition-all flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" /> Pay to Vote (MoMo/Card)
            </Link>
          </div>
      <Footer />
    </div>
  );
}
