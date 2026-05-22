"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2, Calendar, Clock, ArrowLeft, Zap, CheckCircle2, Sparkles } from "lucide-react";

export default function CreateElectionPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", type: "single_choice",
    startDate: "", endDate: "", visibility: "private",
    positions: [{ title: "President", candidates: [{ name: "" }] }],
    voterEmails: [] as string[],
  });
  const [bulkEmailInput, setBulkEmailInput] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const addBulkEmails = () => {
    const emails = bulkEmailInput.split(/[\n,]+/).map(e => e.trim()).filter(e => e.includes("@"));
    setForm({ ...form, voterEmails: [...form.voterEmails, ...emails] });
    setBulkEmailInput("");
    setToast(`${emails.length} emails added`);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/elections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eligibleVoters: form.voterEmails.length, totalVotes: 0, timezone: "UTC", organizationId: "default", settings: { requireVerification: true, allowWriteIn: false, showLiveResults: true, anonymousVoting: true, twoFactorRequired: false, ipRestriction: false, sessionTimeout: 30 } }),
      });
      if (res.ok) { setToast("Election created!"); setTimeout(() => router.push("/dashboard/elections"), 1500); }
      else { const data = await res.json(); setToast(data.error || "Failed"); setLoading(false); }
    } catch { setToast("Network error"); setLoading(false); }
  };

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-xl text-white/20 hover:text-white hover:bg-white/[0.04] transition-all"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
          <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Create Election</h1><p className="text-[13px] text-white/35 mt-1">Step {step} of 3</p></div>
        </div>
      </div>

      <div className="flex gap-2">
        {[1,2,3].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${step >= s ? "bg-gradient-to-r from-emerald-300 to-cyan-300" : "bg-white/5"}`} />
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 space-y-5">
          <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g., Student Council President 2026" className="w-full px-5 py-[14px] rounded-2xl bg-white/[0.03] border border-white/5 text-white text-[14px] outline-none focus:border-emerald-400/20 transition-all" /></div>
          <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-5 py-[14px] rounded-2xl bg-white/[0.03] border border-white/5 text-white text-[14px] outline-none focus:border-emerald-400/20 transition-all resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3"><Calendar className="w-3.5 h-3.5 inline mr-1" /> Start</label><input type="datetime-local" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full px-5 py-[14px] rounded-2xl bg-white/[0.03] border border-white/5 text-white text-[14px] outline-none focus:border-emerald-400/20 transition-all [color-scheme:dark]" /></div>
            <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3"><Clock className="w-3.5 h-3.5 inline mr-1" /> End</label><input type="datetime-local" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="w-full px-5 py-[14px] rounded-2xl bg-white/[0.03] border border-white/5 text-white text-[14px] outline-none focus:border-emerald-400/20 transition-all [color-scheme:dark]" /></div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {form.positions.map((pos, pi) => (
            <div key={pi} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 space-y-3">
              <input value={pos.title} onChange={e => { const p = [...form.positions]; p[pi].title = e.target.value; setForm({...form, positions: p}); }} placeholder="Position title" className="text-[16px] font-bold text-white bg-transparent border-none outline-none w-full" />
              {pos.candidates.map((cand, ci) => (
                <div key={ci} className="flex items-center gap-3 pl-4">
                  <input value={cand.name} onChange={e => { const p = [...form.positions]; p[pi].candidates[ci].name = e.target.value; setForm({...form, positions: p}); }} placeholder="Candidate name" className="flex-1 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all" />
                  <button onClick={() => { const p = [...form.positions]; p[pi].candidates = p[pi].candidates.filter((_, j) => j !== ci); setForm({...form, positions: p}); }} className="text-white/15 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => { const p = [...form.positions]; p[pi].candidates.push({ name: "" }); setForm({...form, positions: p}); }} className="text-[12px] text-emerald-300 hover:underline font-bold">+ Add Candidate</button>
            </div>
          ))}
          <button onClick={() => setForm({...form, positions: [...form.positions, { title: "", candidates: [{ name: "" }] }]})} className="w-full py-4 rounded-2xl border-2 border-dashed border-white/5 text-[14px] text-white/20 hover:border-emerald-400/20 hover:text-emerald-300 transition-all flex items-center justify-center gap-2 font-bold"><Plus className="w-4 h-4" /> Add Position</button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 space-y-5">
          <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Bulk Add Voter Emails</label><textarea value={bulkEmailInput} onChange={e => setBulkEmailInput(e.target.value)} placeholder="alice@edu.com&#10;bob@edu.com" rows={5} className="w-full px-5 py-[14px] rounded-2xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all resize-none font-mono" /><button onClick={addBulkEmails} className="mt-3 flex items-center gap-2 px-4 py-[9px] rounded-xl bg-emerald-400/10 text-emerald-300 text-[12px] font-bold hover:bg-emerald-400/20 transition-all"><Plus className="w-3.5 h-3.5" /> Add Emails</button></div>
          {form.voterEmails.length > 0 && (
            <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Added Voters ({form.voterEmails.length})</label><div className="max-h-[200px] overflow-y-auto space-y-1">{form.voterEmails.map((email, i) => (<div key={i} className="flex items-center justify-between px-4 py-2 rounded-xl bg-white/[0.02]"><span className="text-[13px] text-white/50">{email}</span><button onClick={() => setForm({...form, voterEmails: form.voterEmails.filter((_, j) => j !== i)})} className="text-white/10 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button></div>))}</div></div>
          )}
        </motion.div>
      )}

      <div className="flex items-center justify-between pt-4">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="flex items-center gap-2 px-5 py-[12px] rounded-xl bg-white/[0.03] border border-white/5 text-[14px] font-bold text-white/40 hover:text-white transition-all"><ArrowLeft className="w-4 h-4" /> {step === 1 ? "Cancel" : "Previous"}</button>
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="px-6 py-[12px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[14px] font-black hover:opacity-90 transition-all">Continue</button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="px-8 py-[12px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[14px] font-black hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50">
            {loading ? "Creating..." : <><Zap className="w-4 h-4" /> Launch Election</>}
          </button>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]">
          <div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div>
        </div>
      )}
    </div>
  );
}
