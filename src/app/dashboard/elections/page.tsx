"use client";

import Link from "next/link";
import { useState } from "react";

const elections = [
  { id: "1", title: "Student Council 2026", status: "active", voters: 450, votes: 392, candidates: 4, startDate: "May 1", endDate: "May 30", turnout: 78, type: "single_choice" },
  { id: "2", title: "Faculty Senate Nominations", status: "active", voters: 280, votes: 142, candidates: 3, startDate: "May 10", endDate: "May 25", turnout: 54, type: "multiple_choice" },
  { id: "3", title: "Sports Committee Vote", status: "scheduled", voters: 120, votes: 0, candidates: 2, startDate: "Jun 1", endDate: "Jun 5", turnout: 0, type: "single_choice" },
  { id: "4", title: "Dept. Budget Allocation", status: "draft", voters: 85, votes: 0, candidates: 5, startDate: "TBD", endDate: "TBD", turnout: 0, type: "ranked_choice" },
  { id: "5", title: "Club President Election", status: "completed", voters: 200, votes: 178, candidates: 3, startDate: "Apr 15", endDate: "Apr 20", turnout: 89, type: "single_choice" },
  { id: "6", title: "Graduate Representative", status: "active", voters: 320, votes: 256, candidates: 4, startDate: "May 5", endDate: "May 28", turnout: 80, type: "single_choice" },
  { id: "7", title: "Research Committee", status: "draft", voters: 45, votes: 0, candidates: 2, startDate: "Jun 10", endDate: "Jun 15", turnout: 0, type: "multiple_choice" },
  { id: "8", title: "Alumni Board Election", status: "completed", voters: 1500, votes: 1342, candidates: 6, startDate: "Mar 1", endDate: "Mar 15", turnout: 89, type: "ranked_choice" },
];

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "rgba(34,197,94,0.08)", text: "#22C55E", dot: "#22C55E" },
  scheduled: { bg: "rgba(99,102,241,0.08)", text: "#818CF8", dot: "#6366F1" },
  draft: { bg: "rgba(245,158,11,0.08)", text: "#F59E0B", dot: "#F59E0B" },
  completed: { bg: "rgba(107,114,128,0.08)", text: "#9CA3AF", dot: "#6B7280" },
};

export default function ElectionsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const filtered = elections.filter(e => {
    if (filter !== "all" && e.status !== filter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 28 }}>
        <div>
          <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Elections</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{elections.length} total · {elections.filter(e => e.status === "active").length} active · {elections.filter(e => e.status === "scheduled").length} scheduled</p>
        </div>
        <Link href="/dashboard/elections/create" className="btn-purple" style={{ textDecoration: "none" }}>+ New Election</Link>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search elections..." style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none", width: 250 }} />
        <div style={{ display: "flex", gap: 4 }}>
          {["all","active","scheduled","draft","completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.1)", background: filter === f ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.02)", color: filter === f ? "#818CF8" : "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
          ))}
        </div>
      </div>

      <div className="glass" style={{ overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No elections found.</div>
        ) : (
          filtered.map((e, i) => {
            const s = statusConfig[e.status];
            return (
              <Link key={e.id} href={"/dashboard/elections/" + e.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", textDecoration: "none", color: "inherit", transition: "background 0.15s" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🗳️</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{e.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: s.bg, color: s.text }}>{e.status}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{e.type.replace("_", " ")}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>·</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{e.candidates} candidates</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>·</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{e.startDate} → {e.endDate}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
                  <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{e.voters.toLocaleString()}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Voters</div></div>
                  <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{e.votes.toLocaleString()}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Votes</div></div>
                  <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 700, color: e.turnout > 50 ? "#22C55E" : e.turnout > 0 ? "#F59E0B" : "rgba(255,255,255,0.3)" }}>{e.turnout}%</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Turnout</div></div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
