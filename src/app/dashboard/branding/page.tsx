"use client";

import { useState, useEffect } from "react";
import { Palette, Upload, Image, Globe, Type, CheckCircle2, Sun, Moon } from "lucide-react";

export default function BrandingPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast({ message: m, type: "success" }); setTimeout(() => setToast(null), 3000); };

  const [brand, setBrand] = useState({
    logo: "",
    favicon: "",
    primaryColor: "#4fffb0",
    secondaryColor: "#00d4ff",
    font: "Inter",
    darkMode: true,
    customDomain: "vote.riverdale.edu",
    emailFrom: "elections@riverdale.edu",
  });

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Branding</h1>
        <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Customize your white-label appearance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[rgba(79,255,176,0.06)] border-2 border-dashed border-[rgba(79,255,176,0.15)] flex items-center justify-center mx-auto mb-4 hover:border-[rgba(79,255,176,0.4)] transition-all cursor-pointer" onClick={() => showToast("Logo upload dialog opening...")}>
            <Upload className="w-8 h-8 text-[rgba(79,255,176,0.3)]" />
          </div>
          <h3 className="text-[15px] font-bold text-white mb-1">Organization Logo</h3>
          <p className="text-[12px] text-[rgba(255,255,255,0.25)]">Recommended: 512x512px PNG/SVG</p>
        </div>

        {/* Colors */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Palette className="w-4 h-4 text-[#4fffb0]" /> Color Scheme</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={brand.primaryColor} onChange={e => setBrand({...brand, primaryColor: e.target.value})} className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent" />
                <code className="flex-1 px-4 py-[9px] rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[13px] text-white font-mono">{brand.primaryColor}</code>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Secondary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={brand.secondaryColor} onChange={e => setBrand({...brand, secondaryColor: e.target.value})} className="w-10 h-10 rounded-lg border-0 cursor-pointer bg-transparent" />
                <code className="flex-1 px-4 py-[9px] rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[13px] text-white font-mono">{brand.secondaryColor}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Domain */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-[#4fffb0]" /> Custom Domain</h3>
          <div>
            <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Voting URL</label>
            <input value={brand.customDomain} onChange={e => setBrand({...brand, customDomain: e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all font-mono" />
          </div>
          <div className="mt-3 text-[11px] text-[rgba(255,255,255,0.25)] flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#4fffb0]" /> DNS verified</div>
        </div>

        {/* Email */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Type className="w-4 h-4 text-[#4fffb0]" /> Email Settings</h3>
          <div>
            <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">From Address</label>
            <input value={brand.emailFrom} onChange={e => setBrand({...brand, emailFrom: e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => showToast("Branding settings saved!")} className="px-6 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">Save Branding</button>
      </div>

      {toast && <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]"><CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span></div></div>}
    </div>
  );
}