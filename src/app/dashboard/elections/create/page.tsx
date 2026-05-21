"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateElectionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: "", description: "", type: "single_choice", startDate: "", endDate: "", candidates: [{ name: "", position: "", description: "" }] });

  const inp = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none" };

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Create Election</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Set up a new election</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["Details","Candidates","Review"].map((s, i) => (
          <button key={i} onClick={() => setStep(i + 1)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: step === i + 1 ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "rgba(255,255,255,0.04)", color: step === i + 1 ? "#fff" : "rgba(255,255,255,0.4)" }}>{i + 1}. {s}</button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (step < 3) setStep(step + 1); else { alert("Election created!"); router.push("/dashboard/elections"); } }}>
        {step === 1 && (
          <div className="glass" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Election Title" style={inp} />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} style={{ ...inp, resize: "vertical" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={inp}><option value="single_choice">Single Choice</option><option value="multiple_choice">Multiple Choice</option><option value="ranked_choice">Ranked Choice</option></select>
              <input type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} style={inp} />
              <input type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} style={inp} />
            </div>
            <button type="submit" className="btn-blue" style={{ alignSelf: "flex-end" }}>Next →</button>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {form.candidates.map((c, i) => (
              <div key={i} className="glass" style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Candidate #{i + 1}</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input value={c.name} onChange={(e) => { const nc = [...form.candidates]; nc[i].name = e.target.value; setForm({ ...form, candidates: nc }); }} placeholder="Name" style={inp} />
                  <input value={c.position} onChange={(e) => { const nc = [...form.candidates]; nc[i].position = e.target.value; setForm({ ...form, candidates: nc }); }} placeholder="Position" style={inp} />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, candidates: [...form.candidates, { name: "", position: "", description: "" }] })} style={{ padding: "12px", borderRadius: 8, border: "2px dashed rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13 }}>+ Add Candidate</button>
            <div style={{ display: "flex", justifyContent: "space-between" }}><button type="button" onClick={() => setStep(1)} className="btn-outline">← Back</button><button type="submit" className="btn-blue">Next →</button></div>
          </div>
        )}
        {step === 3 && (
          <div className="glass" style={{ padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Review</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13, marginBottom: 20 }}><div><span style={{ color: "rgba(255,255,255,0.4)" }}>Title:</span> <span style={{ color: "#fff" }}>{form.title || "—"}</span></div><div><span style={{ color: "rgba(255,255,255,0.4)" }}>Type:</span> <span style={{ color: "#fff" }}>{form.type}</span></div><div><span style={{ color: "rgba(255,255,255,0.4)" }}>Candidates:</span> <span style={{ color: "#fff" }}>{form.candidates.length}</span></div></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><button type="button" onClick={() => setStep(2)} className="btn-outline">← Back</button><button type="submit" className="btn-purple">Create Election</button></div>
          </div>
        )}
      </form>
    </div>
  );
}
