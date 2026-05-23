"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Smartphone, Globe, Shield, ArrowRight, ArrowLeft,
  Sparkles, CheckCircle2, Vote, Users, Clock, Search, ChevronRight,
  Layers3, Activity, Minus, Plus, Wallet, Receipt
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PremiumPayToVotePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [elections, setElections] = useState<any[]>([]);
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [voteCount, setVoteCount] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("mobile_money");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const VOTE_PRICE = 1; // GHS per vote

  useEffect(() => {
    fetch("/api/elections?status=live")
      .then(r => r.json())
      .then(data => setElections(data.elections || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setAmount(voteCount * VOTE_PRICE);
  }, [voteCount]);

  const selectElection = (election: any) => {
    setSelectedElection(election);
    setSelectedCategory(null);
    setSelectedCandidate(null);
  };

  const selectCategory = (category: any) => {
    setSelectedCategory(category);
    setSelectedCandidate(null);
  };

  const handlePay = async () => {
    if (!email && !phone) return;
    if (!selectedCandidate) return;
    setLoading(true);
    try {
      // Step 1: Save payment intent
      const intentRes = await fetch("/api/payments/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electionId: selectedElection._id,
          electionTitle: selectedElection.title,
          category: selectedCategory?.title,
          candidateName: selectedCandidate.name,
          votes: voteCount,
          amount: amount,
          email: email || `${phone}@voter.com`,
          phone: phone,
        }),
      });
      const intentData = await intentRes.json();
      
      // Step 2: Initialize Paystack payment
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || `${phone}@voter.com`,
          amount: amount,
          electionId: selectedElection._id,
          currency: "GHS",
          channel: method,
          metadata: { intentId: intentData.intentId },
          callback_url: window.location.origin + "/vote/success?intentId=" + intentData.intentId,
        }),
      });
      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 text-emerald-300 mx-auto mb-5">
            <Wallet className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black tracking-[-0.03em] mb-2">Premium Voting</h1>
          <p className="text-white/40">Secure your votes with blockchain verification</p>
        </motion.div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {["Select Election", "Choose Category", "Pick Candidate", "Pay & Vote"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black transition-all ${
                step > i + 1 ? "bg-emerald-400/10 text-emerald-300" :
                step === i + 1 ? "bg-emerald-400 text-black" :
                "bg-white/5 text-white/25"
              }`}>
                {step > i + 1 ? <CheckCircle2 className="w-3 h-3" /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < 3 && <div className="w-4 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Election */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <Vote className="w-5 h-5 text-emerald-300" /> Active Elections
                </h3>
                <div className="space-y-3">
                  {elections.map((election) => (
                    <button
                      key={election._id}
                      onClick={() => { selectElection(election); setStep(2); }}
                      className={`w-full text-left p-5 rounded-2xl border transition-all ${
                        selectedElection?._id === election._id
                          ? "border-emerald-400/30 bg-emerald-400/5"
                          : "border-white/5 bg-white/[0.01] hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                            <Layers3 className="w-6 h-6 text-emerald-300" />
                          </div>
                          <div>
                            <h4 className="font-bold">{election.title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-xs text-white/30">
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{election.eligibleVoters || 0} voters</span>
                              <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{election.totalVotes || 0} votes</span>
                              <span className="flex items-center gap-1 text-emerald-300"><Clock className="w-3 h-3" />Live</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/20" />
                      </div>
                    </button>
                  ))}
                  {elections.length === 0 && (
                    <p className="text-center text-white/30 py-8">No active elections available.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Category */}
          {step === 2 && selectedElection && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-white/40 text-xs font-bold hover:text-white mb-4">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to elections
              </button>
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                    <Vote className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-black">{selectedElection.title}</h3>
                    <p className="text-xs text-white/30">Select voting category</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {(selectedElection.positions || []).map((pos: any) => (
                    <button
                      key={pos._id || pos.title}
                      onClick={() => { selectCategory(pos); setStep(3); }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedCategory?.title === pos.title
                          ? "border-cyan-400/30 bg-cyan-400/5"
                          : "border-white/5 bg-white/[0.01] hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold">{pos.title}</h4>
                          <p className="text-xs text-white/30 mt-1">{pos.candidates?.length || 0} candidate(s)</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/20" />
                      </div>
                    </button>
                  ))}
                  {(!selectedElection.positions || selectedElection.positions.length === 0) && (
                    <p className="text-center text-white/30 py-4">No categories available.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pick Candidate + Vote Count */}
          {step === 3 && selectedCategory && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-white/40 text-xs font-bold hover:text-white mb-4">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to categories
              </button>
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-300" /> Select Candidate
                </h3>

                {/* Vote Counter */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 border border-emerald-400/10">
                  <p className="text-xs text-white/40 mb-3">Number of votes to cast</p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setVoteCount(Math.max(1, voteCount - 1))}
                      className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-3xl font-black text-emerald-300 min-w-[60px] text-center">{voteCount}</span>
                    <button
                      onClick={() => setVoteCount(Math.min(100, voteCount + 1))}
                      className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-center text-xs text-white/30 mt-3">
                    GHS {VOTE_PRICE} per vote Â· Total: <span className="text-emerald-300 font-bold">GHS {amount}</span>
                  </p>
                </div>

                {/* Candidates */}
                <div className="space-y-3">
                  {(selectedCategory.candidates || []).map((c: any, i: number) => (
                    <button
                      key={c._id || c.name}
                      onClick={() => { setSelectedCandidate(c); setStep(4); }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedCandidate?.name === c.name
                          ? "border-violet-400/30 bg-violet-400/5"
                          : "border-white/5 bg-white/[0.01] hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black" style={{ background: ["#10b981","#06b6d4","#8b5cf6","#f59e0b"][i % 4] + "20", color: ["#10b981","#06b6d4","#8b5cf6","#f59e0b"][i % 4] }}>
                          {c.name?.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold">{c.name}</h4>
                          <p className="text-xs text-white/30">{selectedCategory.title}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && selectedCandidate && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep(3)} className="flex items-center gap-2 text-white/40 text-xs font-bold hover:text-white mb-4">
                <ArrowLeft className="w-3.5 h-3.5" /> Change candidate
              </button>
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl space-y-6">
                {/* Order Summary */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <h3 className="font-black text-sm flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-300" /> Order Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/40">Election</span><span className="font-bold">{selectedElection?.title}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Category</span><span className="font-bold">{selectedCategory?.title}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Candidate</span><span className="font-bold text-emerald-300">{selectedCandidate?.name}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Votes</span><span className="font-bold">{voteCount}x</span></div>
                    <div className="border-t border-white/5 pt-2 flex justify-between text-lg">
                      <span className="text-white/60">Total</span>
                      <span className="font-black text-emerald-300">GHS {amount}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-[11px] font-black text-white/25 uppercase mb-3">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "mobile_money", label: "Mobile Money", icon: Smartphone },
                      { id: "card", label: "Bank Card", icon: CreditCard },
                      { id: "ussd", label: "USSD", icon: Globe },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                          method === m.id
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : "border-white/5 bg-white/[0.02] text-white/40 hover:border-white/10"
                        }`}
                      >
                        <m.icon className="h-6 w-6" />
                        <span className="text-[11px] font-bold">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                {method === "mobile_money" || method === "ussd" ? (
                  <div>
                    <label className="block text-[11px] font-black text-white/25 uppercase mb-3">Phone Number</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g., 0244123456" className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:border-emerald-400/20 transition-all" />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-black text-white/25 uppercase mb-3">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:border-emerald-400/20 transition-all" />
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePay}
                  disabled={loading || (!email && !phone)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-sm font-black hover:opacity-90 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                >
                  {loading ? "Processing..." : <>Pay GHS {amount} & Vote <ArrowRight className="h-4 w-4" /></>}
                </button>

                <div className="grid grid-cols-3 gap-3 text-center text-[10px] text-white/25">
                  <div className="flex flex-col items-center gap-1"><Shield className="h-4 w-4 text-emerald-300" /><span>Secure</span></div>
                  <div className="flex flex-col items-center gap-1"><Smartphone className="h-4 w-4 text-cyan-300" /><span>All Networks</span></div>
                  <div className="flex flex-col items-center gap-1"><Globe className="h-4 w-4 text-violet-300" /><span>Instant Access</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
