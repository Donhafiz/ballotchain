"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";
import AIInsights from "@/components/ai/AIInsights";
import AISecurityPanel from "@/components/ai/AISecurityPanel";
import AIReportGenerator from "@/components/ai/AIReportGenerator";
import BlockchainVote from "@/components/blockchain/BlockchainVote";

export default function ElectionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useApp();
  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);

  useEffect(() => { fetchElection(); }, [id]);

  const fetchElection = async () => {
    const t = token || localStorage.getItem("token");
    const res = await fetch("/api/elections/" + id, { headers: { Authorization: "Bearer " + t } });
    if (res.ok) { const data = await res.json(); setElection(data.election || data); }
    setLoading(false);
  };

  const updateStatus = async (status: string) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/elections", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ electionId: id, status }) });
    setMessage("Status updated"); fetchElection(); setEditingStatus(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteElection = async () => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/elections", { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ electionId: id }) });
    router.push("/dashboard/elections");
  };

  const removeCandidate = async (candidateId: string) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/candidates", { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ electionId: id, candidateId }) });
    setMessage("Candidate removed"); fetchElection();
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <div style={{ padding: 60, textAlign: "center" }}><div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#6366F1", animation: "spin 0.8s linear infinite", margin: "0 auto" }} /></div>;
  if (!election) return <div style={{ padding: 60, textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Election not found</div>;

  return (
    <div style={{ padding: "24px 32px" }}>
      {message && <div style={{ padding: "12px 18px", borderRadius: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.9)", fontSize: 13, marginBottom: 16 }}>{message}</div>}

      <div style={{ marginBottom: 20 }}>
        <Link href="/dashboard/elections" style={{ fontSize: 12, color: "#818CF8", textDecoration: "none" }}>Back to Elections</Link>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{election.title}</h1>
            <span className={"badge-" + (election.status === "active" ? "emerald" : "gold")} style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100 }}>{election.status}</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{election.description}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setEditingStatus(!editingStatus)} className="btn-outline" style={{ padding: "0 14px", height: 34, borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>Change Status</button>
          <button onClick={() => setShowDelete(true)} className="btn-outline" style={{ padding: "0 14px", height: 34, borderRadius: 8, border: "0.5px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)", fontSize: 12, fontWeight: 500, color: "rgba(239,68,68,0.8)", cursor: "pointer" }}>Delete</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Type", value: election.type?.replace("_"," ") || "Single", icon: "📋" },
          { label: "Candidates", value: election.candidates?.length || 0, icon: "👤" },
          { label: "Voters", value: election.totalVoters || 0, icon: "👥" },
          { label: "Votes", value: election.totalVotes || 0, icon: "🗳️" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-5 text-center">
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Candidates ({election.candidates?.length || 0})</h3>
          <Link href={"/dashboard/elections/" + id + "/candidates/add"} className="btn-blue" style={{ padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#fff", textDecoration: "none" }}>+ Add</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
          {election.candidates?.map((c: any) => (
            <div key={c._id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
              <div className="btn-purple" style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>{c.name?.[0]}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{c.name}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{c.position}</div></div>
              <div style={{ textAlign: "right" }}><div className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{c.votes || 0}</div></div>
              <button onClick={() => removeCandidate(c._id)} style={{ background: "none", border: "none", color: "rgba(239,68,68,0.6)", cursor: "pointer", fontSize: 18 }}>x</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AIInsights election={election} />
          <BlockchainVote election={election} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AISecurityPanel />
          <AIReportGenerator election={election} />
        </div>
      </div>

      {showDelete && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="glass rounded-2xl p-8" style={{ width: 400, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>!</div>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Delete Election?</h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>This cannot be undone.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={deleteElection} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#EF4444", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Delete</button>
              <button onClick={() => setShowDelete(false)} className="btn-outline" style={{ flex: 1, padding: "10px", borderRadius: 8 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}