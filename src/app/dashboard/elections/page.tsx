"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Vote, Plus, Search, Play, Pause, Eye } from "lucide-react";

export default function ElectionsPage() {
  const [elections, setElections] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/elections", { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        if (data.elections) setElections(data.elections);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const publishElection = async (id: string) => {
    await fetch("/api/elections/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "live" }),
    });
    window.location.reload();
  };

  const endElection = async (id: string) => {
    await fetch("/api/elections/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "ended" }),
    });
    window.location.reload();
  };

  const filtered = elections.filter(e => {
    const m = e.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const s = filterStatus === "all" || e.status === filterStatus;
    return m && s;
  });

  if (loading) return <div className="p-8 text-white text-sm">Loading elections...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Elections ({elections.length})</h1>
        <Link href="/dashboard/elections/create" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-black text-sm font-bold no-underline">+ New Election</Link>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." className="px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm w-64" />
        {["all","live","draft","ended"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize ${filterStatus === s ? "bg-[rgba(79,255,176,0.15)] text-[#4fffb0]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.4)]"}`}>{s}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(election => (
          <div key={election._id} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white">{election.title}</h3>
                <p className="text-xs text-[rgba(255,255,255,0.3)] mt-1">{election.type}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                election.status === "live" ? "bg-[rgba(79,255,176,0.15)] text-[#4fffb0]" :
                election.status === "ended" ? "bg-[rgba(139,92,246,0.15)] text-[#a78bfa]" :
                "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]"
              }`}>{election.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/dashboard/elections/${election._id}`} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white transition-colors"><Eye className="w-4 h-4" /></Link>
              <div className="flex-1" />
              {election.status === "draft" && (
                <button onClick={() => publishElection(election._id)} className="px-3 py-1.5 rounded-lg bg-[rgba(79,255,176,0.1)] text-[#4fffb0] text-xs font-semibold hover:bg-[rgba(79,255,176,0.2)] transition-colors flex items-center gap-1">
                  <Play className="w-3 h-3" /> Publish
                </button>
              )}
              {election.status === "live" && (
                <button onClick={() => endElection(election._id)} className="px-3 py-1.5 rounded-lg bg-[rgba(245,158,11,0.1)] text-[#f59e0b] text-xs font-semibold hover:bg-[rgba(245,158,11,0.2)] transition-colors flex items-center gap-1">
                  <Pause className="w-3 h-3" /> End
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
