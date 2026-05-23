"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Vote, Users, Play, Pause, CheckCircle2, Sparkles, Send } from "lucide-react";

export default function ElectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [election, setElection] = useState<any>(null);
  const [toast, setToast] = useState("");

  const id = params.id as string;

  useEffect(() => {
    setMounted(true);
    fetch("/api/elections").then(r => r.json()).then(data => {
      const found = data.elections?.find((e: any) => e._id === id || e.id === id);
      if (found) setElection(found);
    }).catch(() => {});
  }, [id]);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  const handlePublish = async () => {
    await fetch(`/api/elections/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "live" }) });
    setElection({ ...election, status: "live" });
    showToast("Election published!");
  };

  const handleEnd = async () => {
    await fetch(`/api/elections/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "ended" }) });
    setElection({ ...election, status: "ended" });
    showToast("Election ended.");
  };

  if (!mounted || !election) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/dashboard/elections")} className="p-2 rounded-xl text-white/20 hover:text-white hover:bg-white/[0.04] transition-all"><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <div className="flex items-center gap-3"><h1 className="text-[28px] font-black text-white">{election.title}</h1>
              <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${election.status === "live" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>{election.status}</span>
            </div>
            <p className="text-[13px] text-white/35 mt-1">{election.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {election.status === "draft" && <button onClick={handlePublish} className="px-4 py-[9px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[12px] font-black hover:opacity-90 transition-all flex items-center gap-2"><Play className="w-3.5 h-3.5" /> Publish</button>}
          {election.status === "live" && <button onClick={handleEnd} className="px-4 py-[9px] rounded-xl bg-amber-400/10 text-amber-300 text-[12px] font-black hover:bg-amber-400/20 transition-all flex items-center gap-2"><Pause className="w-3.5 h-3.5" /> End Election</button>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><Vote className="w-5 h-5 text-emerald-300 mb-2" /><div className="text-2xl font-black">{election.totalVotes || 0}</div><div className="text-xs text-white/25 mt-1">Total Votes</div></div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><Users className="w-5 h-5 text-cyan-300 mb-2" /><div className="text-2xl font-black">{election.eligibleVoters || 0}</div><div className="text-xs text-white/25 mt-1">Eligible Voters</div></div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><Sparkles className="w-5 h-5 text-violet-300 mb-2" /><div className="text-2xl font-black">{election.positions?.reduce((s: number, p: any) => s + (p.candidates?.length || 0), 0) || election.candidates?.length || 0}</div><div className="text-xs text-white/25 mt-1">Candidates</div></div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
        <h3 className="font-black mb-4">Voter Access</h3>
        <div className="p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/10">
          <p className="text-sm font-bold text-emerald-300 mb-2">Access Link</p>
          <code className="text-xs text-white/40">ballotchain.io/vote?election={id}</code>
          <button onClick={() => showToast("Access links sent!")} className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400/10 text-emerald-300 text-xs font-bold hover:bg-emerald-400/20 transition-all"><Send className="w-3.5 h-3.5" /> Send Access Links</button>
        </div>
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}