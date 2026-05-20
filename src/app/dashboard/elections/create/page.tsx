"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store/AppContext";

export default function CreateElectionPage() {
  const router = useRouter();
  const { createElection } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [createdId, setCreatedId] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", organization: "Tech University",
    type: "single_choice", startDate: "", endDate: "",
    candidates: [{ name: "", position: "", description: "" }],
  });

  const update = (field: string, value: any) => setForm({ ...form, [field]: value });
  const addCandidate = () => setForm({ ...form, candidates: [...form.candidates, { name: "", position: "", description: "" }] });
  const removeCandidate = (i: number) => setForm({ ...form, candidates: form.candidates.filter((_, idx) => idx !== i) });
  const updateCandidate = (i: number, field: string, value: string) => { const c = [...form.candidates]; (c[i] as any)[field] = value; setForm({ ...form, candidates: c }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/elections", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setCreatedId(data.election?._id || data._id);
        setSuccess(true);
      } else {
        setError(data.error || "Failed to create election");
        setLoading(false);
      }
    } catch (err: any) { setError(err.message); setLoading(false); }
  };

  const inp = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 14, outline: "none" };
  const lab = { display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 8 };

  if (success) {
    return (
      <div style={{ padding: "60px 32px", textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Election Created!</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Your election has been created successfully.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => router.push("/dashboard/elections/" + createdId)} className="btn-purple" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>
            View Election →
          </button>
          <button onClick={() => router.push("/dashboard/elections")} className="btn-outline" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>
            View All Elections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 32px", maxWidth: 800 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Create New Election</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Set up a secure, transparent election</p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {["Details","Candidates","Review"].map((s, i) => (
          <button key={i} onClick={() => setStep(i + 1)}
            style={{ padding: "8px 18px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
              background: step === i + 1 ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "rgba(255,255,255,0.04)",
              color: step === i + 1 ? "#fff" : "rgba(255,255,255,0.4)" }}>
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {error && <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "0.5px solid rgba(239,68,68,0.2)", color: "rgba(239,68,68,0.9)", fontSize: 13, marginBottom: 20 }}>{error}</div>}

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
        {step === 1 && (
          <div className="glass rounded-2xl p-8" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div><label style={lab}>Election Title *</label><input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g., Student Council 2026" style={inp} /></div>
            <div><label style={lab}>Description</label><textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Election purpose..." rows={3} style={{ ...inp, resize: "vertical" }} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <div><label style={lab}>Type</label><select value={form.type} onChange={(e) => update("type", e.target.value)} style={inp}><option value="single_choice">Single Choice</option><option value="multiple_choice">Multiple Choice</option><option value="ranked_choice">Ranked Choice</option></select></div>
              <div><label style={lab}>Start Date *</label><input type="datetime-local" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} style={inp} /></div>
              <div><label style={lab}>End Date *</label><input type="datetime-local" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} style={inp} /></div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn-blue" style={{ padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>Next: Candidates →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {form.candidates.map((c, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Candidate #{i + 1}</h4>
                  {form.candidates.length > 1 && <button type="button" onClick={() => removeCandidate(i)} style={{ background: "none", border: "none", color: "rgba(239,68,68,0.6)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Remove</button>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  <input value={c.name} onChange={(e) => updateCandidate(i, "name", e.target.value)} placeholder="Name *" style={inp} />
                  <input value={c.position} onChange={(e) => updateCandidate(i, "position", e.target.value)} placeholder="Position *" style={inp} />
                </div>
                <input value={c.description} onChange={(e) => updateCandidate(i, "description", e.target.value)} placeholder="Bio" style={inp} />
              </div>
            ))}
            <button type="button" onClick={addCandidate} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "2px dashed rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Candidate</button>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>← Back</button>
              <button type="submit" className="btn-blue" style={{ padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>Next: Review →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="glass rounded-2xl p-8">
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Review Your Election</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13, marginBottom: 24 }}>
              <div><span style={{ color: "rgba(255,255,255,0.35)" }}>Title:</span> <span style={{ color: "#fff", fontWeight: 500 }}>{form.title || "—"}</span></div>
              <div><span style={{ color: "rgba(255,255,255,0.35)" }}>Type:</span> <span style={{ color: "#fff", fontWeight: 500 }}>{form.type.replace("_", " ")}</span></div>
              <div><span style={{ color: "rgba(255,255,255,0.35)" }}>Start:</span> <span style={{ color: "#fff", fontWeight: 500 }}>{form.startDate || "—"}</span></div>
              <div><span style={{ color: "rgba(255,255,255,0.35)" }}>End:</span> <span style={{ color: "#fff", fontWeight: 500 }}>{form.endDate || "—"}</span></div>
              <div><span style={{ color: "rgba(255,255,255,0.35)" }}>Candidates:</span> <span style={{ color: "#fff", fontWeight: 500 }}>{form.candidates.length}</span></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" onClick={() => setStep(2)} className="btn-outline" style={{ padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>← Back</button>
              <button type="submit" disabled={loading} className="btn-purple" style={{ padding: "12px 32px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
                {loading ? "Creating..." : "🚀 Create Election"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}