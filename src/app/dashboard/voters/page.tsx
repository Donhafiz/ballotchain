"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/lib/store/AppContext";

export default function VotersPage() {
  const { token } = useApp();
  const [users, setUsers] = useState<any[]>([]);
  const [editingVoter, setEditingVoter] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => { fetchVoters(); }, []);

  const fetchVoters = async () => {
    const t = token || localStorage.getItem("token");
    const res = await fetch("/api/admin/users", { headers: { Authorization: "Bearer " + t } });
    if (res.ok) { const data = await res.json(); setUsers(data.users?.filter((u: any) => u.role === "voter") || []); }
  };

  const deleteVoter = async (userId: string) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ userId }) });
    setMessage("Voter deleted"); fetchVoters(); setShowDeleteConfirm(null);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateVoter = async (userId: string, updates: any) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/users", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ userId, ...updates }) });
    setMessage("Voter updated"); setEditingVoter(null); fetchVoters();
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: 24 }}>
      {message && <div style={{ padding: "12px 18px", borderRadius: 8, background: "rgba(34,197,94,0.1)", color: "rgba(34,197,94,0.9)", fontSize: 13, marginBottom: 16 }}>{message}</div>}
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 20, fontWeight: 700 }}>Voters</h1>
          <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 3 }}>{users.length} registered voters</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-outline">📥 Import CSV</button>
          <button className="btn-accent">+ Add Voter</button>
        </div>
      </div>

      <div className="card-dark" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>{["Name","Email","Status","Voted","Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "12px 18px", fontSize: 10, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(248,250,252,0.22)" }}>{h}</th>)}</tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 500 }}>{u.firstName} {u.lastName}</td>
                <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)" }}>{u.email}</td>
                <td style={{ padding: "12px 18px" }}><span className="pill-active">{u.emailVerified ? "Verified" : "Pending"}</span></td>
                <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.25)" }}>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "Never"}</td>
                <td style={{ padding: "12px 18px", display: "flex", gap: 8 }}>
                  <button onClick={() => setEditingVoter(u)} style={{ color: "#818CF8", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                  <button onClick={() => setShowDeleteConfirm({ id: u._id, name: u.firstName })} style={{ color: "rgba(239,68,68,0.75)", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingVoter && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 500, padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Edit Voter</h3>
            <form onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); const data = Object.fromEntries(form); updateVoter(editingVoter._id, data); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input name="firstName" defaultValue={editingVoter.firstName} placeholder="First Name" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <input name="lastName" defaultValue={editingVoter.lastName} placeholder="Last Name" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <input name="email" defaultValue={editingVoter.email} placeholder="Email" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button type="submit" className="btn-accent" style={{ flex: 1 }}>Save</button>
                <button type="button" onClick={() => setEditingVoter(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete */}
      {showDeleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 400, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Delete Voter?</h3>
            <p style={{ fontSize: 13, color: "rgba(248,250,252,0.45)", marginBottom: 20 }}>"{showDeleteConfirm.name}" will be permanently removed.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => deleteVoter(showDeleteConfirm.id)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#EF4444", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Delete</button>
              <button onClick={() => setShowDeleteConfirm(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}