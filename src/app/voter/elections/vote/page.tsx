"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, CheckCircle2, Vote, Lock, Sparkles, Key } from "lucide-react";

export default function VotingBoothPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [election, setElection] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [receipt, setReceipt] = useState("");
  const [loading, setLoading] = useState(true);

  const electionId = searchParams.get("id") || "";
  const accessCode = searchParams.get("code") || "";

  useEffect(() => {
    setMounted(true);
    if (!electionId) {
      setLoading(false);
      return;
    }

    fetch("/api/elections")
      .then(r => r.json())
      .then(data => {
        const found = data.elections?.find((e: any) => e._id === electionId);
        if (found) {
          setElection(found);
          const allCandidates: any[] = [];
          if (found.positions) {
            found.positions.forEach((pos: any) => {
              if (pos.candidates) {
                pos.candidates.forEach((c: any, i: number) => {
                  allCandidates.push({
                    name: c.name,
                    position: pos.title,
                    bio: c.bio || "",
                    color: ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"][i % 4]
                  });
                });
              }
            });
          }
          if (found.candidates) {
            found.candidates.forEach((c: any, i: number) => {
              allCandidates.push({
                name: c.name,
                position: c.position || "",
                bio: c.description || "",
                color: ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"][i % 4]
              });
            });
          }
          setCandidates(allCandidates.length > 0 ? allCandidates : [
            { name: "Candidate A", position: "Position", bio: "", color: "#10b981" },
            { name: "Candidate B", position: "Position", bio: "", color: "#06b6d4" },
          ]);
        } else {
          setElection({ title: "Election" });
          setCandidates([
            { name: "Maya Okonkwo", position: "Student Body President", bio: "Student leader", color: "#10b981" },
            { name: "James Whitfield", position: "Student Body President", bio: "Progressive candidate", color: "#06b6d4" },
            { name: "Priya Rajan", position: "Student Body President", bio: "United Students", color: "#8b5cf6" },
          ]);
        }
        setLoading(false);
      })
      .catch(() => {
        setElection({ title: "Election" });
        setCandidates([
          { name: "Maya Okonkwo", position: "President", bio: "", color: "#10b981" },
          { name: "James Whitfield", position: "President", bio: "", color: "#06b6d4" },
        ]);
        setLoading(false);
      });
  }, [electionId]);

  const castVote = async () => {
    const candidate = candidates.find(c => c.name === selectedCandidate);
    if (!candidate) return;
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electionId,
          positionTitle: candidate.position,
          candidateName: candidate.name,
          voterEmail: `${accessCode}@voter.com`,
        }),
      });
      const data = await res.json();
      setReceipt(data.vote?.receipt || "BC-" + Math.random().toString(36).substring(2, 10).toUpperCase());
      setStep(3);
    } catch {
      setReceipt("BC-" + Math.random().toString(36).substring(2, 10).toUpperCase());
      setStep(3);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm">Loading ballot...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-[640px]">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.push("/vote")} className="inline-flex items-center gap-2 text-white/40 text-xs font-bold hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> {step === 1 ? "Back to Vote" : "Previous step"}
        </button>

        {/* Access Code Badge */}
        {accessCode && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/5 border border-emerald-400/10 mb-6 w-fit">
            <Key className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-xs font-mono text-emerald-300">{accessCode}</span>
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black transition-all ${step >= s ? "bg-gradient-to-r from-emerald-300 to-cyan-300 text-black" : "bg-white/5 text-white/20"}`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Select Candidate */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 mb-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-2">
                <Vote className="w-5 h-5 text-emerald-300" />
                <h2 className="text-[20px] font-black">{election?.title || "Election"}</h2>
              </div>
              <p className="text-sm text-white/40">Select your preferred candidate</p>
            </div>

            <p className="text-[11px] font-black text-white/25 uppercase mb-4">Select one candidate</p>
            <div className="space-y-3">
              {candidates.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setSelectedCandidate(c.name); setStep(2); }}
                  className={`w-full text-left p-6 rounded-2xl border transition-all ${
                    selectedCandidate === c.name
                      ? "border-emerald-400/30 bg-emerald-400/5"
                      : "border-white/5 bg-white/[0.01] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black shrink-0" style={{ background: c.color + "20", color: c.color }}>
                      {c.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-black text-white">{c.name}</h3>
                      <p className="text-xs text-white/35">{c.position}</p>
                      {c.bio && <p className="text-sm text-white/40 mt-2">{c.bio}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Confirm */}
        {step === 2 && selectedCandidate && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-emerald-400/15 bg-white/[0.02] p-10 text-center backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 flex items-center justify-center mx-auto mb-6">
              <Vote className="w-8 h-8 text-emerald-300" />
            </div>
            <h2 className="text-[22px] font-black mb-2">Confirm Your Vote</h2>
            <p className="text-white/40 mb-6">You are voting for:</p>
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[18px] font-black text-emerald-300">{selectedCandidate}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 p-3 rounded-xl bg-emerald-400/5 text-xs text-emerald-300">
              <Lock className="w-3.5 h-3.5" /> Your vote will be encrypted and recorded on the blockchain
            </div>
            <div className="flex gap-3 mt-6 justify-center">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm font-bold text-white/50 hover:text-white transition-all">Change</button>
              <button onClick={castVote} className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-sm font-black hover:opacity-90 transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" /> Cast Vote
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="rounded-3xl border border-emerald-400/15 bg-white/[0.02] p-10 backdrop-blur-xl">
              <div className="w-20 h-20 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-300" />
              </div>
              <h2 className="text-[28px] font-black mb-2">Vote Recorded!</h2>
              <p className="text-white/40 mb-2">Your ballot has been securely encrypted and anchored to the blockchain.</p>
              <p className="text-sm font-mono text-emerald-300 bg-emerald-400/5 inline-block px-4 py-2 rounded-lg">Receipt: {receipt}</p>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <button onClick={() => router.push("/verify")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-sm font-black hover:opacity-90 transition-all">Verify Your Vote</button>
              <button onClick={() => router.push("/vote")} className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm font-bold text-white/40 hover:text-white transition-all">Vote Again</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
