"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Key, ArrowRight, Shield, Smartphone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function VoterLoginPage() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [method, setMethod] = useState<"code" | "ussd">("code");

  const handleAccessCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/voter/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("voterToken", data.token);
        localStorage.setItem("voterInfo", JSON.stringify(data.election));
        window.location.href = `/vote/${data.election.electionId}`;
      } else {
        setError(data.error || "Invalid access code");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[80vh] px-6 pt-20">
        <div className="w-full max-w-[480px]">
          {/* Method Toggle */}
          <div className="flex gap-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-1.5 mb-6">
            <button
              onClick={() => setMethod("code")}
              className={"flex-1 flex items-center justify-center gap-2 py-[10px] rounded-xl text-[13px] font-semibold transition-all " + (method === "code" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white")}
            >
              <Key className="w-4 h-4" /> Access Code
            </button>
            <button
              onClick={() => setMethod("ussd")}
              className={"flex-1 flex items-center justify-center gap-2 py-[10px] rounded-xl text-[13px] font-semibold transition-all " + (method === "ussd" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white")}
            >
              <Smartphone className="w-4 h-4" /> USSD
            </button>
          </div>

          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 backdrop-blur-xl">
            {method === "code" ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-5">
                    <Key className="w-7 h-7 text-[#4fffb0]" />
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-[-0.02em] mb-2">Enter Access Code</h1>
                  <p className="text-sm text-[rgba(255,255,255,0.35)]">Enter the code sent to your email or phone</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.15)] text-[#EF4444] text-sm text-center">{error}</div>
                )}

                <form onSubmit={handleAccessCode} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Access Code</label>
                    <input
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      placeholder="e.g., BC-X7K2-M9P4"
                      className="w-full px-5 py-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-lg font-mono tracking-[0.1em] text-center outline-none placeholder:text-[rgba(255,255,255,0.1)] focus:border-[rgba(79,255,176,0.3)] transition-all"
                      maxLength={14}
                      required
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? "Verifying..." : <>Access Ballot <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>

                <div className="mt-6 p-4 rounded-xl bg-[rgba(79,255,176,0.03)] border border-[rgba(79,255,176,0.06)]">
                  <p className="text-xs text-[rgba(255,255,255,0.3)] text-center">
                    <Shield className="w-3 h-3 inline mr-1 text-[#4fffb0]" />
                    Your vote is encrypted and recorded on the blockchain
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-5">
                    <Smartphone className="w-7 h-7 text-[#4fffb0]" />
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-[-0.02em] mb-2">Vote via USSD</h1>
                  <p className="text-sm text-[rgba(255,255,255,0.35)]">Dial the short code from any phone</p>
                </div>

                <div className="text-center space-y-6">
                  <div className="bg-[rgba(79,255,176,0.04)] border border-[rgba(79,255,176,0.1)] rounded-2xl p-8">
                    <p className="text-xs text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3">Dial</p>
                    <p className="text-5xl font-extrabold text-[#4fffb0] tracking-[0.05em] font-mono">*713*123#</p>
                    <p className="text-sm text-[rgba(255,255,255,0.35)] mt-4">Available on all networks</p>
                  </div>

                  <div className="space-y-3 text-left">
                    <p className="text-sm font-semibold text-white">How it works:</p>
                    {[
                      "Dial *713*123# from any phone",
                      "Enter your Voter ID number",
                      "Select your candidate from the menu",
                      "Confirm your vote",
                      "Receive confirmation with receipt code"
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.4)]">
                        <span className="w-6 h-6 rounded-full bg-[rgba(79,255,176,0.08)] flex items-center justify-center text-xs font-bold text-[#4fffb0] shrink-0 mt-0.5">{i + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                    <p className="text-xs text-[rgba(255,255,255,0.25)]">
                      Standard network rates apply. Available in Ghana, Nigeria, Kenya, and South Africa.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
