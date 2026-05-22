"use client";

import { useState, useEffect } from "react";
import { Sparkles, Palette, Upload, CheckCircle2, Globe, Type } from "lucide-react";

export default function BrandingPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  const [brand, setBrand] = useState({ primaryColor: "#10b981", secondaryColor: "#06b6d4", customDomain: "vote.riverdale.edu", emailFrom: "elections@riverdale.edu" });

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
        <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Branding</h1><p className="text-[13px] text-white/35 mt-1">Customize your white-label appearance</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-emerald-400/5 border-2 border-dashed border-emerald-400/15 flex items-center justify-center mx-auto mb-4 hover:border-emerald-400/30 transition-all cursor-pointer" onClick={()=>showToast("Upload dialog opening...")}><Upload className="w-8 h-8 text-emerald-300/30" /></div>
          <h3 className="text-[15px] font-black mb-1">Organization Logo</h3><p className="text-[12px] text-white/20">Recommended: 512x512px PNG/SVG</p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <h3 className="text-[15px] font-black mb-4 flex items-center gap-2"><Palette className="w-4 h-4 text-emerald-300" />Color Scheme</h3>
          <div className="space-y-4">
            <div><label className="block text-[11px] font-black text-white/25 uppercase mb-2">Primary</label><div className="flex items-center gap-3"><input type="color" value={brand.primaryColor} onChange={e=>setBrand({...brand,primaryColor:e.target.value})} className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent" /><code className="flex-1 px-4 py-[9px] rounded-lg bg-white/[0.03] border border-white/5 text-[13px] text-white font-mono">{brand.primaryColor}</code></div></div>
            <div><label className="block text-[11px] font-black text-white/25 uppercase mb-2">Secondary</label><div className="flex items-center gap-3"><input type="color" value={brand.secondaryColor} onChange={e=>setBrand({...brand,secondaryColor:e.target.value})} className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent" /><code className="flex-1 px-4 py-[9px] rounded-lg bg-white/[0.03] border border-white/5 text-[13px] text-white font-mono">{brand.secondaryColor}</code></div></div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <h3 className="text-[15px] font-black mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-300" />Custom Domain</h3>
          <div><label className="block text-[11px] font-black text-white/25 uppercase mb-2">Voting URL</label><input value={brand.customDomain} onChange={e=>setBrand({...brand,customDomain:e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all font-mono" /></div>
          <div className="mt-3 text-[11px] text-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />DNS verified</div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <h3 className="text-[15px] font-black mb-4 flex items-center gap-2"><Type className="w-4 h-4 text-emerald-300" />Email Settings</h3>
          <div><label className="block text-[11px] font-black text-white/25 uppercase mb-2">From Address</label><input value={brand.emailFrom} onChange={e=>setBrand({...brand,emailFrom:e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all" /></div>
        </div>
      </div>

      <div className="flex justify-end"><button onClick={()=>showToast("Branding saved!")} className="px-6 py-[11px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[13px] font-black hover:opacity-90 transition-all">Save Branding</button></div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
