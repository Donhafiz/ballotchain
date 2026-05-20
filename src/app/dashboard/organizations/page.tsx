"use client";

import { useState } from "react";

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState([
    { id: "1", name: "Tech University", members: 4500, elections: 24, status: "active" },
    { id: "2", name: "Global Corp", members: 12000, elections: 56, status: "active" },
    { id: "3", name: "City Government", members: 85000, elections: 12, status: "active" },
  ]);
  const [editingOrg, setEditingOrg] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null);
  const [message, setMessage] = useState("");

  const deleteOrg = (id: string) => {
    setOrgs(orgs.filter(o => o.id !== id));
    setMessage("Organization deleted"); setShowDeleteConfirm(null);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateOrg = (id: string, updates: any) => {
    setOrgs(orgs.map(o => o.id === id ? { ...o, ...updates } : o));
    setMessage("Organization updated"); setEditingOrg(null);
    setTimeout(() => setMessage(""), 3000);
  };

  const addOrg = (data: any) => {
    setOrgs([...orgs, { id: Date.now().toString(), members: 0, elections: 0, status: "active", ...data }]);
    setMessage("Organization added"); setEditingOrg(null);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: 24 }}>
      {message && <div style={{ padding: "12px 18px", borderRadius: 8, background: "rgba(34,197,94,0.1)", color: "rgba(34,197,94,0.9)", fontSize: 13, marginBottom: 16 }}>{message}</div>}
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 20, fontWeight: 700 }}>Organizations</h1>
          <p style={{ fontSize: 12, color: "rgba(248,250,252,0.25)", marginTop: 3 }}>{orgs.length} organizations</p>
        </div>
        <button className="btn-accent" onClick={() => setEditingOrg({ new: true })}>+ Add Organization</button>
      </div>

      <div className="card-dark" style={{ overflow: "hidden" }}>
        {orgs.map((org) => (
          <div key={org.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(139,92,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#A78BFA", fontSize: 16 }}>🏢</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{org.name}</div>
                <div style={{ fontSize: 11, color: "rgba(248,250,252,0.25)" }}>{org.members.toLocaleString()} members · {org.elections} elections</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="pill-active">{org.status}</span>
              <button onClick={() => setEditingOrg(org)} style={{ color: "#818CF8", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
              <button onClick={() => setShowDeleteConfirm({ id: org.id, name: org.name })} style={{ color: "rgba(239,68,68,0.75)", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {editingOrg && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 500, padding: 24 }}>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{editingOrg.new ? "Add Organization" : "Edit Organization"}</h3>
            <form onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); const data = Object.fromEntries(form); editingOrg.new ? addOrg(data) : updateOrg(editingOrg.id, data); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input name="name" defaultValue={editingOrg.name} placeholder="Organization Name" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <input name="members" defaultValue={editingOrg.members} type="number" placeholder="Members" style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }} />
              <select name="status" defaultValue={editingOrg.status} style={{ padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.032)", color: "#fff", fontSize: 13 }}>
                <option value="active">Active</option><option value="inactive">Inactive</option>
              </select>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button type="submit" className="btn-accent" style={{ flex: 1 }}>{editingOrg.new ? "Create" : "Save"}</button>
                <button type="button" onClick={() => setEditingOrg(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="card-dark" style={{ width: 400, padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Delete Organization?</h3>
            <p style={{ fontSize: 13, color: "rgba(248,250,252,0.45)", marginBottom: 20 }}>"{showDeleteConfirm.name}" will be permanently removed.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => deleteOrg(showDeleteConfirm.id)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#EF4444", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Delete</button>
              <button onClick={() => setShowDeleteConfirm(null)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}