"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";
import Header, { HeaderButton } from "@/components/layouts/Header";

export default function AdminDashboard() {
  const { elections, fetchElections, token } = useApp();
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingElection, setEditingElection] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null);

  useEffect(() => { fetchElections(); fetchUsers(); }, []);

  const fetchUsers = async () => {
    const t = token || localStorage.getItem("token");
    const res = await fetch("/api/admin/users", { headers: { Authorization: "Bearer " + t } });
    if (res.ok) { const data = await res.json(); setUsers(data.users || []); }
  };

  const deleteUser = async (userId: string) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ userId }) });
    setMessage("User deleted"); fetchUsers(); setShowDeleteConfirm(null); setTimeout(() => setMessage(""), 3000);
  };

  const updateUser = async (userId: string, updates: any) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/users", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ userId, ...updates }) });
    setMessage("User updated"); setEditingUser(null); fetchUsers(); setTimeout(() => setMessage(""), 3000);
  };

  const deleteElection = async (electionId: string) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/elections", { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ electionId }) });
    setMessage("Election deleted"); fetchElections(); setShowDeleteConfirm(null); setTimeout(() => setMessage(""), 3000);
  };

  const updateElection = async (electionId: string, updates: any) => {
    const t = token || localStorage.getItem("token");
    await fetch("/api/admin/elections", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + t }, body: JSON.stringify({ electionId, ...updates }) });
    setMessage("Election updated"); setEditingElection(null); fetchElections(); setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: 24 }}>
      <Header
        title="Admin Control Panel"
        subtitle="Full system administration — manage users, elections, and organizations"
        status={{ label: "Super Admin", tone: "success" }}
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Admin" }]}
        actions={
          <div style={{ display: "flex", gap: 6 }}>
            {["overview","users","elections"].map(tab => (
              <HeaderButton key={tab} variant={activeTab === tab ? "primary" : "ghost"} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </HeaderButton>
            ))}
          </div>
        }
      />

      {message && <div style={{ padding: "12px 18px", borderRadius: 8, background: "rgba(34,197,94,0.1)", color: "rgba(34,197,94,0.9)", fontSize: 13, margin: "16px 0" }}>{message}</div>}

      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 24 }}>
          {[{ label: "Total Users", value: users.length, color: "blue" },{ label: "Total Elections", value: elections.length, color: "green" },{ label: "Active Elections", value: elections.filter(e => e.status === "active").length, color: "amber" },{ label: "Organizations", value: "3", color: "violet" }].map((s, i) => (
            <div key={i} className={"kpi-card " + s.color} style={{ textAlign: "center", padding: "24px 18px" }}>
              <div className="syne" style={{ fontSize: 36, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "users" && (
        <div className="card-dark" style={{ overflow: "hidden", marginTop: 24 }}>
          <div style={{ padding: "14px 18px", borderBottom: "0.5px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
            <h3 className="syne" style={{ fontSize: 14, fontWeight: 700 }}>Users ({users.length})</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>{["Name","Email","Role","Status","Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "12px 18px", fontSize: 10, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(248,250,252,0.22)" }}>{h}</th>)}</tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                  <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 500 }}>{u.firstName} {u.lastName}</td>
                  <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)" }}>{u.email}</td>
                  <td style={{ padding: "12px 18px" }}><span className="pill-active">{u.role}</span></td>
                  <td style={{ padding: "12px 18px" }}><span className="pill-active">{u.emailVerified ? "Verified" : "Pending"}</span></td>
                  <td style={{ padding: "12px 18px", display: "flex", gap: 8 }}>
                    <button onClick={() => setEditingUser(u)} style={{ color: "#818CF8", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setShowDeleteConfirm({ type: "user", id: u._id, name: u.firstName })} style={{ color: "rgba(239,68,68,0.75)", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "elections" && (
        <div className="card-dark" style={{ overflow: "hidden", marginTop: 24 }}>
          <div style={{ padding: "14px 18px", borderBottom: "0.5px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
            <h3 className="syne" style={{ fontSize: 14, fontWeight: 700 }}>Elections ({elections.length})</h3>
            <Link href="/dashboard/elections/create" className="btn-accent">+ New Election</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Title","Status","Voters","Votes","Actions"].map(h => <th key={h} style={{ textAlign: "left", padding: "12px 18px", fontSize: 10, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(248,250,252,0.22)" }}>{h}</th>)}</tr></thead>
            <tbody>
              {elections.map(e => (
                <tr key={e._id} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                  <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 500 }}>{e.title}</td>
                  <td style={{ padding: "12px 18px" }}><span className={e.status === "active" ? "pill-active" : "pill-draft"}>{e.status}</span></td>
                  <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)" }}>{e.totalVoters || 0}</td>
                  <td style={{ padding: "12px 18px", fontSize: 12, color: "rgba(248,250,252,0.45)" }}>{e.totalVotes || 0}</td>
                  <td style={{ padding: "12px 18px", display: "flex", gap: 8 }}>
                    <button onClick={() => setEditingElection(e)} style={{ color: "#818CF8", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setShowDeleteConfirm({ type: "election", id: e._id, name: e.title })} style={{ color: "rgba(239,68,68,0.75)", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals remain the same */}
      {editingUser && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 500, padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Edit User</h3>
            <form onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); const data = Object.fromEntries(form); updateUser(editingUser._id, data); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input name="firstName" defaultValue={editingUser.firstName} placeholder="First Name" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <input name="lastName" defaultValue={editingUser.lastName} placeholder="Last Name" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <input name="email" defaultValue={editingUser.email} placeholder="Email" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <select name="role" defaultValue={editingUser.role} style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }}>
                <option value="voter">Voter</option><option value="admin">Admin</option><option value="observer">Observer</option>
              </select>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button type="submit" className="btn-accent" style={{ flex: 1 }}>Save</button>
                <button type="button" onClick={() => setEditingUser(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingElection && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 500, padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Edit Election</h3>
            <form onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); const data = Object.fromEntries(form); updateElection(editingElection._id, data); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input name="title" defaultValue={editingElection.title} placeholder="Title" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
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

      {showDeleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 400, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Confirm Delete</h3>
            <p style={{ fontSize: 13, color: "rgba(248,250,252,0.45)", marginBottom: 20 }}>Delete "{showDeleteConfirm.name}"? This cannot be undone.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => showDeleteConfirm.type === "user" ? deleteUser(showDeleteConfirm.id) : deleteElection(showDeleteConfirm.id)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#EF4444", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Delete</button>
              <button onClick={() => setShowDeleteConfirm(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}