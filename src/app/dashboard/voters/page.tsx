"use client";

import { useState } from "react";

const voters = [
  { id: "1", name: "Alice Johnson", email: "alice@edu.com", department: "Computer Science", status: "voted", votedAt: "2026-05-18 14:32" },
  { id: "2", name: "Bob Smith", email: "bob@edu.com", department: "Engineering", status: "registered", votedAt: null },
  { id: "3", name: "Carol Davis", email: "carol@edu.com", department: "Business", status: "voted", votedAt: "2026-05-19 09:15" },
  { id: "4", name: "Dan Wilson", email: "dan@edu.com", department: "Arts", status: "pending", votedAt: null },
  { id: "5", name: "Eve Martinez", email: "eve@edu.com", department: "Medicine", status: "voted", votedAt: "2026-05-20 11:00" },
  { id: "6", name: "Frank Lee", email: "frank@edu.com", department: "Law", status: "registered", votedAt: null },
  { id: "7", name: "Grace Kim", email: "grace@edu.com", department: "Computer Science", status: "voted", votedAt: "2026-05-17 16:45" },
  { id: "8", name: "Henry Brown", email: "henry@edu.com", department: "Engineering", status: "pending", votedAt: null },
];

export default function VotersPage() {
  const [search, setSearch] = useState("");
  const filtered = voters.filter(v => !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>Voters</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{voters.length} registered · {voters.filter(v => v.status === "voted").length} voted · {voters.filter(v => v.status === "pending").length} pending</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-outline">📥 Import CSV</button>
          <button className="btn-purple">+ Add Voter</button>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search voters..." style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none", width: 300 }} />
      </div>
      <div className="glass" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{["Voter","Email","Department","Status","Voted At"].map(h => <th key={h} style={{ textAlign: "left", padding: "14px 24px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(v => (
              <tr key={v.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 0.15s" }}>
                <td style={{ padding: "14px 24px" }}><div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{v.name}</div></td>
                <td style={{ padding: "14px 24px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{v.email}</td>
                <td style={{ padding: "14px 24px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{v.department}</td>
                <td style={{ padding: "14px 24px" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: v.status === "voted" ? "rgba(34,197,94,0.1)" : v.status === "registered" ? "rgba(99,102,241,0.1)" : "rgba(245,158,11,0.1)", color: v.status === "voted" ? "#22C55E" : v.status === "registered" ? "#818CF8" : "#F59E0B", border: "1px solid " + (v.status === "voted" ? "rgba(34,197,94,0.2)" : v.status === "registered" ? "rgba(99,102,241,0.2)" : "rgba(245,158,11,0.2)") }}>{v.status}</span>
                </td>
                <td style={{ padding: "14px 24px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{v.votedAt || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
