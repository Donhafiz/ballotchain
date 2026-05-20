"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";

export default function ElectionsListPage() {
  const { elections, fetchElections, token } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null);
  const [editingElection, setEditingElection] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => { fetchElections(); }, []);

  const deleteElection = async (electionId: string) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/elections", {
      method: "DELETE", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t },
      body: JSON.stringify({ electionId }),
    });
    setMessage("Election deleted"); fetchElections(); setShowDeleteConfirm(null);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateElection = async (electionId: string, updates: any) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/elections", {
      method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t },
      body: JSON.stringify({ electionId, ...updates }),
    });
    setMessage("Election updated"); setEditingElection(null); fetchElections();
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: 24 }}>
      {message && <div style={{ padding: "12px 18px", borderRadius: 8, background: "rgba(34,197,94,0.1)", color: "rgba(34,197,94,0.9)", fontSize: 13, marginBottom: 16 }}>{message}</div>}
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 20, fontWeight: 700 }}>Elections</h1>
          <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 3 }}>{elections.length} total elections</p>
        </div>
        <Link href="/dashboard/elections/create" className="btn-accent">+ New Election</Link>
      </div>

      <div className="card-dark" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>{["Title","Status","Candidates","Voters","Votes","Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "12px 18px", fontSize: 10, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(248,250,252,0.22)" }}>{h}</th>)}</tr></thead>
          <tbody>
            {elections.map(e => (
              <tr key={e._id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 500 }}>{e.title}</td>
                <td style={{ padding: "12px 18px" }}><span className={e.status === "active" ? "pill-active" : e.status === "draft" ? "pill-draft" : "pill-closed"}>{e.status}</span></td>
                <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)" }}>{e.candidates?.length || 0}</td>
                <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)" }}>{e.totalVoters || 0}</td>
                <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)" }}>{e.totalVotes || 0}</td>
                <td style={{ padding: "12px 18px", display: "flex", gap: 8 }}>
                  <Link href={"/dashboard/elections/" + e._id} style={{ color: "#22C55E", textDecoration: "none", fontSize: 12, fontWeight: 600 }}>View</Link>
                  <button onClick={() => setEditingElection(e)} style={{ color: "#818CF8", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                  <button onClick={() => setShowDeleteConfirm({ id: e._id, name: e.title })} style={{ color: "rgba(239,68,68,0.75)", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingElection && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 500, padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Edit Election</h3>
            <form onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); const data = Object.fromEntries(form); updateElection(editingElection._id, data); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input name="title" defaultValue={editingElection.title} placeholder="Title" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <textarea name="description" defaultValue={editingElection.description} placeholder="Description" rows={3} style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13, resize: "vertical" }} />
              <select name="status" defaultValue={editingElection.status} style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }}>
                <option value="draft">Draft</option><option value="active">Active</option><option value="completed">Completed</option><option value="archived">Archived</option>
              </select>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button type="submit" className="btn-accent" style={{ flex: 1 }}>Save</button>
                <button type="button" onClick={() => setEditingElection(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 400, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Delete Election?</h3>
            <p style={{ fontSize: 13, color: "rgba(248,250,252,0.45)", marginBottom: 20 }}>"{showDeleteConfirm.name}" will be permanently deleted.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => deleteElection(showDeleteConfirm.id)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#EF4444", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Delete</button>
              <button onClick={() => setShowDeleteConfirm(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}