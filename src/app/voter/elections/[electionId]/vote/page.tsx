"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "@/components/magic/Confetti";

export default function VotePage() {
  const { electionId } = useParams();
  const router = useRouter();
  const [election, setElection] = useState<any>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [receipt, setReceipt] = useState("");

  useEffect(() => {
    fetch("/api/elections/" + electionId, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then(r => r.json()).then(d => setElection(d.election || d)).finally(() => setLoading(false));
  }, [electionId]);

  const handleVote = async () => {
    if (!selected) return;
    setSubmitting(true);
    const res = await fetch("/api/elections/" + electionId + "/votes", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ candidateId: selected }),
    });
    if (res.ok) { 
      setReceipt("0x" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)); 
      setStep(3); 
      setShowConfetti(true); 
    }
    setSubmitting(false);
  };

  if (loading) return <div style={{ minHeight: "100vh", background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#6366F1", animation: "spin 0.8s linear infinite" }} /></div>;
  if (!election) return <div style={{ minHeight: "100vh", background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)" }}>Election not found</div>;

  const selectedCandidate = election.candidates?.find((c: any) => c._id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", padding: "40px 20px" }}>
      <Confetti active={showConfetti} />
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="btn-purple" style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24 }}>🗳️</div>
          <h1 className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{election.title}</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{election.description}</p>
          <span className="badge-emerald" style={{ display: "inline-block", marginTop: 10, fontSize: 11 }}>Active</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {["Select","Confirm","Done"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: step > i+1 ? "#22C55E" : step === i+1 ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "rgba(255,255,255,0.06)", color: step >= i+1 ? "#fff" : "rgba(255,255,255,0.3)" }}>{step > i+1 ? "OK" : i+1}</div>
              <span style={{ fontSize: 11, color: step >= i+1 ? "#fff" : "rgba(255,255,255,0.3)", fontWeight: 500 }}>{s}</span>
              {i < 2 && <div style={{ width: 40, height: 1, background: step > i+1 ? "#22C55E" : "rgba(255,255,255,0.06)" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 16, textAlign: "center" }}>Select Your Candidate</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {election.candidates?.map((c: any) => (
                <motion.div key={c._id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setSelected(c._id)}
                  style={{ padding: 18, borderRadius: 14, border: "1px solid", borderColor: selected === c._id ? "#6366F1" : "rgba(255,255,255,0.07)", background: selected === c._id ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                  <div className="btn-purple" style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{c.name?.[0]}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{c.name}</div><div style={{ fontSize: 12, color: "#818CF8" }}>{c.position}</div></div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid", borderColor: selected === c._id ? "#6366F1" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", background: selected === c._id ? "#6366F1" : "transparent" }}>
                    {selected === c._id && <span style={{ color: "#fff", fontSize: 11 }}>OK</span>}
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button onClick={() => setStep(2)} disabled={!selected} className="btn-blue" style={{ padding: "12px 32px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: selected ? "pointer" : "not-allowed", opacity: selected ? 1 : 0.4 }}>Continue</button>
            </div>
          </motion.div>
        )}

        {step === 2 && selectedCandidate && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 20 }}>Confirm Your Vote</h3>
            <div className="glass rounded-2xl p-8" style={{ maxWidth: 350, margin: "0 auto 24px" }}>
              <div className="btn-purple" style={{ width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, margin: "0 auto 12px" }}>{selectedCandidate.name?.[0]}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{selectedCandidate.name}</div>
              <div style={{ fontSize: 13, color: "#818CF8", marginTop: 4 }}>{selectedCandidate.position}</div>
              <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(245,158,11,0.08)", border: "0.5px solid rgba(245,158,11,0.2)", fontSize: 12, color: "rgba(245,158,11,0.9)" }}>Your vote is final and cannot be changed.</div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={() => setStep(1)} className="btn-outline" style={{ padding: "10px 20px", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.6)", fontWeight: 600, cursor: "pointer" }}>Change</button>
              <button onClick={handleVote} disabled={submitting} className="btn-emerald" style={{ padding: "10px 24px", borderRadius: 10, background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", fontWeight: 600, cursor: "pointer" }}>{submitting ? "Submitting..." : "Confirm Vote"}</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
            <h2 className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Vote Submitted!</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>Your vote has been securely recorded.</p>
            <div className="glass rounded-xl p-4" style={{ maxWidth: 350, margin: "0 auto 24px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Receipt</div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.5)", wordBreak: "break-all" }}>{receipt}</div>
            </div>
            <button onClick={() => router.push("/voter")} className="btn-blue" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>Back to Dashboard</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}