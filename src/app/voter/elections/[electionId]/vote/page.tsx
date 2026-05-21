"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, CheckCircle2, Clock, Vote, Lock, Eye, EyeOff } from "lucide-react";

export default function VotingBoothPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const election = {
    title: "Student Council 2026",
    position: "Student Body President",
    deadline: "May 22, 2026, 11:59 PM EST",
  };

  const candidates = [
    { id: "maya", name: "Maya Okonkwo", party: "Student Action", bio: "Junior, Political Science major. Current Student Senate member. Platform: affordable housing, mental health services, sustainable campus initiatives.", color: "#4fffb0" },
    { id: "james", name: "James Whitfield", party: "Progressive Union", bio: "Senior, Computer Science major. Founded campus tech club. Platform: tech innovation, industry partnerships, entrepreneurship hub.", color: "#8b5cf6" },
    { id: "priya", name: "Priya Rajan", party: "United Students", bio: "Sophomore, International Relations major. Platform: cultural diversity, international student support, arts funding.", color: "#f59e0b" },
  ];

  const castVote = () => {
    setStep(3);
    setTimeout(() => router.push("/voter/my-votes/v1"), 3000);
  };

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center p-4">
      <div className="w-full max-w-[640px]">
        {/* Back */}
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.4)] text-xs font-medium hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> {step === 1 ? "Back to elections" : "Previous step"}
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={"w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold transition-all " + (step >= s ? "bg-[#4fffb0] text-[#0b0c0f]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.2)]")}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className={"text-[12px] font-medium hidden sm:block " + (step >= s ? "text-white" : "text-[rgba(255,255,255,0.2)]")}>
                {s === 1 ? "Select" : s === 2 ? "Confirm" : "Done"}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Ballot */}
        {step === 1 && (
          <div className="animate-[fadeSlideUp_0.3s_ease]">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Vote className="w-5 h-5 text-[#4fffb0]" />
                <h2 className="text-[20px] font-bold text-white">{election.title}</h2>
              </div>
              <p className="text-[14px] text-[#4fffb0] font-semibold">{election.position}</p>
              <p className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {election.deadline}</p>
            </div>

            <p className="text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-4">Select one candidate</p>
            <div className="space-y-3">
              {candidates.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCandidate(c.id); setStep(2); }}
                  className={"w-full text-left p-6 rounded-2xl border transition-all " + (selectedCandidate === c.id ? "border-[#4fffb0] bg-[rgba(79,255,176,0.04)]" : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(255,255,255,0.12)]")}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0" style={{ background: c.color + "20", color: c.color }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <h3 className="text-[16px] font-bold text-white">{c.name}</h3>
                      <p className="text-[12px] text-[rgba(255,255,255,0.35)]">{c.party}</p>
                      <p className="text-[13px] text-[rgba(255,255,255,0.4)] leading-relaxed mt-2">{c.bio}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Confirm */}
        {step === 2 && selectedCandidate && (
          <div className="animate-[fadeSlideUp_0.3s_ease]">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(79,255,176,0.15)] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-6">
                <Vote className="w-8 h-8 text-[#4fffb0]" />
              </div>
              <h2 className="text-[22px] font-bold text-white mb-2">Confirm Your Vote</h2>
              <p className="text-[14px] text-[rgba(255,255,255,0.35)] mb-6">You are voting for:</p>
              {(() => {
                const c = candidates.find(c => c.id === selectedCandidate)!;
                return (
                  <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: c.color + "20", color: c.color }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <div className="text-[15px] font-bold text-white">{c.name}</div>
                      <div className="text-[12px] text-[rgba(255,255,255,0.35)]">{c.party}</div>
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center justify-center gap-2 mt-6 p-3 rounded-xl bg-[rgba(79,255,176,0.03)] text-[12px] text-[#4fffb0]">
                <Lock className="w-3.5 h-3.5" /> Your vote will be encrypted and recorded on the blockchain
              </div>
              <div className="flex gap-3 mt-6 justify-center">
                <button onClick={() => setStep(1)} className="px-6 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all">Change</button>
                <button onClick={castVote} className="px-8 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Cast Vote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="animate-[fadeSlideUp_0.3s_ease] text-center">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(79,255,176,0.15)] rounded-2xl p-10">
              <div className="w-20 h-20 rounded-full bg-[rgba(79,255,176,0.1)] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#4fffb0]" />
              </div>
              <h2 className="text-[28px] font-bold text-white mb-2">Vote Recorded! 🎉</h2>
              <p className="text-[15px] text-[rgba(255,255,255,0.4)] mb-2">Your ballot has been securely encrypted and anchored to the blockchain.</p>
              <p className="text-[13px] font-mono text-[#4fffb0] bg-[rgba(79,255,176,0.05)] inline-block px-4 py-2 rounded-lg">Receipt: 0xf1e2d3c4b5a6...</p>
              <div className="flex items-center justify-center gap-3 mt-6 text-[12px] text-[rgba(255,255,255,0.3)]">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#4fffb0] animate-pulse" /> Encrypting</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#4fffb0]" /> Anchoring</div>
                <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#4fffb0]" /> Complete</div>
              </div>
            </div>
            <p className="text-[12px] text-[rgba(255,255,255,0.2)] mt-4">Redirecting to your receipt...</p>
          </div>
        )}
      </div>
    </div>
  );
}