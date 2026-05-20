"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/store/AppContext";

export default function AddCandidatePage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", position: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position) { setError("Name and position are required"); return; }
    setLoading(true); setError("");
    try {
      const t = token || localStorage.getItem("token");
      const res = await fetch("/api/elections/" + id + "/candidates", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/dashboard/elections/" + id);
      else { const d = await res.json(); setError(d.error); }
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  const inp = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 14, outline: "none" };
  const lab = { display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 8 };

  return (
    <div style={{ padding: "24px 32px", maxWidth: 600 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Add Candidate</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Add a new candidate to this election</p>
      </div>
      {error && <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "0.5px solid rgba(239,68,68,0.2)", color: "rgba(239,68,68,0.9)", fontSize: 13, marginBottom: 20 }}>{error}</div>}
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div><label style={lab}>Full Name *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., John Smith" style={inp} /></div>
        <div><label style={lab}>Position *</label><input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="e.g., President" style={inp} /></div>
        <div><label style={lab}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief background..." rows={3} style={{ ...inp, resize: "vertical" }} /></div>
        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" disabled={loading} className="btn-blue" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", opacity: loading ? 0.6 : 1 }}>{loading ? "Adding..." : "Add Candidate"}</button>
          <button type="button" onClick={() => router.back()} className="btn-outline" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}