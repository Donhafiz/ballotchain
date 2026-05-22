"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Vote, Plus, Search, Play, Pause, Eye, Sparkles, Layers3, Users, Activity, ChevronRight } from "lucide-react";`nimport { PageSkeleton } from "@/components/shared/Skeletons";;

export default function ElectionsPage() {
  const [elections, setElections] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/elections", { cache: "no-store" })
      .then(r => r.json())
      .then(data => { if (data.elections) setElections(data.elections); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const publishElection = async (id: string) => {
    await fetch("/api/elections/" + id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "live" }) });
    window.location.reload();
  };

  const endElection = async (id: string) => {
    await fetch("/api/elections/" + id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "ended" }) });
    window.location.reload();
  };

  const filtered = elections.filter(e => {
    const m = e.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const s = filterStatus === "all" || e.status === filterStatus;
    return m && s;
  });

  if (loading) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10">
            <Sparkles className="h-6 w-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-[28px] font-black tracking-[-0.03em]">Elections</h1>
            <p className="text-[13px] text-white/35 mt-1">{elections.length} total · {elections.filter(e => e.status === "live").length} live</p>
          </div>
        </div>
        <Link href="/dashboard/elections/create" className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 p-[1px]">
          <div className="flex items-center gap-2 rounded-2xl bg-[#030303] px-5 py-[10px] text-[13px] font-black text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-black">
            <Plus className="w-4 h-4" /> New Election
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search elections..." className="w-full pl-11 pr-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all placeholder:text-white/10" />
        </div>
        {["all","live","draft","ended"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-[9px] rounded-xl text-[12px] font-bold capitalize transition-all ${filterStatus === s ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/15" : "text-white/30 hover:text-white hover:bg-white/[0.03]"}`}>{s}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((election, i) => (
          <motion.div
            key={election._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">
                    <Vote className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{election.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-white/25">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{election.eligibleVoters || 0} voters</span>
                      <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{election.totalVotes || 0} votes</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${election.status === "live" ? "bg-emerald-400/10 text-emerald-300" : election.status === "ended" ? "bg-violet-400/10 text-violet-300" : "bg-white/5 text-white/25"}`}>
                  {election.status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block mr-1 animate-pulse" />}{election.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Link href={"/dashboard/elections/" + election._id} className="p-2 rounded-lg text-white/15 hover:text-white hover:bg-white/[0.04] transition-all"><Eye className="w-4 h-4" /></Link>
                <div className="flex-1" />
                {election.status === "draft" && (
                  <button onClick={() => publishElection(election._id)} className="px-3 py-1.5 rounded-lg bg-emerald-400/10 text-emerald-300 text-[11px] font-bold hover:bg-emerald-400/20 transition-all flex items-center gap-1"><Play className="w-3 h-3" /> Publish</button>
                )}
                {election.status === "live" && (
                  <button onClick={() => endElection(election._id)} className="px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-300 text-[11px] font-bold hover:bg-amber-400/20 transition-all flex items-center gap-1"><Pause className="w-3 h-3" /> End</button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 py-20 text-center">
            <Vote className="w-16 h-16 text-white/5 mx-auto mb-4" />
            <p className="text-white/20">No elections found</p>
          </div>
        )}
      </div>
    </div>
  );
}
