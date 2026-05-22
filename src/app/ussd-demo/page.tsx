"use client";

import { useState } from "react";
import { Smartphone, CheckCircle2, Phone, Globe, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function USSDDemoPage() {
  const [step, setStep] = useState(0);
  const [voterId, setVoterId] = useState("");
  const [candidate, setCandidate] = useState("");
  const [receipt, setReceipt] = useState("");
  const [input, setInput] = useState("");

  const handleInput = () => {
    if (step === 0) {
      if (input === "1") { setStep(1); setInput(""); }
      else if (input === "2") { setStep(99); }
      else { setStep(100); }
    } else if (step === 1) {
      if (input === "1") { setStep(2); setInput(""); }
      else if (input.length > 2) { setVoterId(input); setStep(10); setInput(""); }
      else { setStep(100); }
    } else if (step === 2) {
      setStep(100);
    } else if (step === 10) {
      const candidates: Record<string, string> = { "1": "Maya Okonkwo", "2": "James Whitfield", "3": "Priya Rajan" };
      if (candidates[input]) { setCandidate(candidates[input]); setStep(11); setInput(""); }
      else { setStep(100); }
    } else if (step === 11) {
      if (input === "1") { 
        const code = "BC-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        setReceipt(code); 
        setStep(20); 
        setInput(""); 
      }
      else { setStep(100); }
    }
  };

  const reset = () => { setStep(0); setInput(""); setVoterId(""); setCandidate(""); setReceipt(""); };

  const providers = [
    { name: "Africa's Talking", countries: "Ghana, Nigeria, Kenya, Uganda +15", url: "https://africastalking.com", icon: "📡" },
    { name: "HUBTEL", countries: "Ghana", url: "https://hubtel.com", icon: "🇬🇭" },
    { name: "Twilio", countries: "Global (SMS-based)", url: "https://twilio.com", icon: "🌍" },
    { name: "Infobip", countries: "Global", url: "https://infobip.com", icon: "🔗" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[80vh] px-6 pt-24 pb-12">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-[#4fffb0]" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-[-0.02em] mb-2">USSD Voting Demo</h1>
            <p className="text-sm text-[rgba(255,255,255,0.35)]">Simulator · Short code rental required for production</p>
          </div>

          {/* Phone Simulator */}
          <div className="bg-[#111318] border-2 border-[#222] rounded-[32px] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="bg-[#0a0a0f] rounded-[20px] p-6 min-h-[380px] font-mono text-sm">
              <div className="flex justify-between items-center mb-6 text-[10px] text-[rgba(255,255,255,0.2)]">
                <span>MTN GH</span>
                <span>87%</span>
              </div>

              {step === 0 && (
                <div className="space-y-2">
                  <p className="text-[#4fffb0] mb-2">*713*123#</p>
                  <p className="text-[rgba(255,255,255,0.8)] font-bold mb-4">BallotChain Voting</p>
                  <p className="text-[rgba(255,255,255,0.6)]">1. Vote Now</p>
                  <p className="text-[rgba(255,255,255,0.6)]">2. Check Registration</p>
                  <p className="text-[rgba(255,255,255,0.6)]">3. Help</p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-2">
                  <p className="text-[rgba(255,255,255,0.8)] font-bold mb-3">Enter Voter ID</p>
                  <p className="text-[rgba(255,255,255,0.4)] text-xs">Type your 8-digit Voter ID</p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  <p className="text-[rgba(255,255,255,0.8)] font-bold mb-2">Registration</p>
                  <p className="text-[#4fffb0]">Active</p>
                  <p className="text-[rgba(255,255,255,0.5)]">Election: Student Council 2026</p>
                  <p className="text-[rgba(255,255,255,0.5)]">Status: Eligible</p>
                </div>
              )}

              {step === 10 && (
                <div className="space-y-2">
                  <p className="text-[rgba(255,255,255,0.8)] font-bold mb-4">Select Candidate:</p>
                  <p className="text-[rgba(255,255,255,0.6)]">1. Maya Okonkwo</p>
                  <p className="text-[rgba(255,255,255,0.6)]">2. James Whitfield</p>
                  <p className="text-[rgba(255,255,255,0.6)]">3. Priya Rajan</p>
                </div>
              )}

              {step === 11 && (
                <div className="space-y-2">
                  <p className="text-[rgba(255,255,255,0.8)] font-bold mb-3">Confirm Vote</p>
                  <p className="text-[rgba(255,255,255,0.5)] mb-4">Candidate: <span className="text-white font-bold">{candidate}</span></p>
                  <p className="text-[rgba(255,255,255,0.6)]">1. Yes, confirm</p>
                  <p className="text-[rgba(255,255,255,0.6)]">2. Cancel</p>
                </div>
              )}

              {step === 20 && (
                <div className="space-y-2 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#4fffb0] mx-auto mb-3" />
                  <p className="text-[#4fffb0] font-bold text-lg">Vote Recorded!</p>
                  <p className="text-[rgba(255,255,255,0.6)]">Candidate: {candidate}</p>
                  <p className="text-[rgba(255,255,255,0.4)] text-xs mt-2">Receipt:</p>
                  <p className="text-[#4fffb0] font-mono text-xs">{receipt}</p>
                  <button onClick={reset} className="mt-4 px-4 py-2 rounded-lg bg-[rgba(79,255,176,0.1)] text-[#4fffb0] text-xs font-semibold hover:bg-[rgba(79,255,176,0.15)] transition-all">Vote Again</button>
                </div>
              )}

              {step === 99 && (
                <div className="space-y-2">
                  <p className="text-[rgba(255,255,255,0.8)] font-bold mb-2">Help</p>
                  <p className="text-[rgba(255,255,255,0.5)]">support@ballotchain.io</p>
                  <p className="text-[rgba(255,255,255,0.5)]">+233 50 123 4567</p>
                </div>
              )}

              {step === 100 && (
                <div className="space-y-2">
                  <p className="text-[rgba(255,255,255,0.8)] font-bold mb-2">Session Ended</p>
                  <p className="text-[rgba(255,255,255,0.5)]">Dial *713*123# to start again.</p>
                  <button onClick={reset} className="mt-4 px-4 py-2 rounded-lg bg-[rgba(79,255,176,0.1)] text-[#4fffb0] text-xs font-semibold hover:bg-[rgba(79,255,176,0.15)] transition-all">Restart</button>
                </div>
              )}

              {input && step < 20 && step !== 100 && step !== 99 && (
                <p className="text-[#4fffb0] mt-4">Reply: {input}</p>
              )}
            </div>

            {step !== 20 && (
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleInput()}
                    placeholder="Type response..."
                    className="flex-1 px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-white text-sm outline-none focus:border-[rgba(79,255,176,0.3)] transition-all placeholder:text-[rgba(255,255,255,0.15)]"
                    autoFocus
                  />
                  <button onClick={handleInput} className="px-5 py-3 rounded-xl bg-[#4fffb0] text-[#0b0c0f] text-sm font-bold hover:opacity-90 transition-all">Send</button>
                </div>
              </div>
            )}
          </div>

          {/* Provider Cards */}
          <div className="mt-8 space-y-3">
            <h3 className="text-sm font-bold text-[rgba(255,255,255,0.5)] uppercase tracking-[0.1em] mb-3">Short Code Providers</h3>
            {providers.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(79,255,176,0.2)] transition-all no-underline group">
                <span className="text-xl">{p.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold group-hover:text-[#4fffb0] transition-colors">{p.name}</p>
                  <p className="text-xs text-[rgba(255,255,255,0.3)]">{p.countries}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[rgba(255,255,255,0.2)] group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[rgba(79,255,176,0.02)] border border-[rgba(79,255,176,0.06)]">
            <p className="text-xs text-[rgba(255,255,255,0.3)] text-center">
              <Phone className="w-3 h-3 inline mr-1 text-[#4fffb0]" />
              To go live, rent a short code from one of the providers above. The API endpoint at <code className="text-[#4fffb0]">/api/ussd</code> is ready to receive USSD requests.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
