"use client";

import { useState, useEffect } from "react";
import { Sparkles, Save, Globe, Bell, Lock, Shield, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState("");
  const [settings, setSettings] = useState({
    organizationName: "BallotChain",
    timezone: "America/New_York",
    language: "en",
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: true,
    sessionTimeout: 30,
    autoLogout: true,
    apiRateLimit: 1000,
    publicRegistration: false,
  });

  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
        <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Settings</h1><p className="text-[13px] text-white/35 mt-1">Configure your organization preferences</p></div>
      </div>

      <div className="flex gap-6">
        <div className="w-56 shrink-0 space-y-1">
          {[{id:"general",label:"General",icon:Globe},{id:"notifications",label:"Notifications",icon:Bell},{id:"security",label:"Security",icon:Lock},{id:"api",label:"API & Integration",icon:Shield}].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-[11px] rounded-xl text-[13px] font-bold transition-all ${activeTab===tab.id?"bg-emerald-400/10 text-emerald-300":"text-white/30 hover:text-white hover:bg-white/[0.02]"}`}><tab.icon className="w-4 h-4" />{tab.label}</button>
          ))}
        </div>

        <div className="flex-1 rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-[16px] font-black">General Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Organization Name</label><input value={settings.organizationName} onChange={e=>setSettings({...settings,organizationName:e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all" /></div>
                <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Timezone</label><select value={settings.timezone} onChange={e=>setSettings({...settings,timezone:e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none cursor-pointer"><option value="America/New_York">Eastern Time (US)</option><option value="Europe/London">London (GMT)</option><option value="Africa/Accra">Accra (GMT)</option></select></div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-[16px] font-black">Notification Preferences</h3>
              {[{label:"Email Notifications",desc:"Receive election updates via email",key:"emailNotifications"},{label:"Push Notifications",desc:"Browser push alerts for live events",key:"pushNotifications"}].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/[0.02]">
                  <div><div className="text-[14px] font-bold text-white">{item.label}</div><div className="text-[12px] text-white/25">{item.desc}</div></div>
                  <button onClick={()=>setSettings({...settings,[item.key]:!(settings as any)[item.key]})} className={`w-12 h-7 rounded-full transition-all relative ${(settings as any)[item.key]?"bg-emerald-400":"bg-white/10"}`}><div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${(settings as any)[item.key]?"right-1":"left-1"}`} /></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-[16px] font-black flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-300" />Security Settings</h3>
              {[{label:"Two-Factor Authentication",desc:"Require 2FA for all admin accounts",key:"twoFactorAuth"},{label:"Auto Logout",desc:"Automatically log out inactive sessions",key:"autoLogout"},{label:"Public Registration",desc:"Allow anyone to create an account",key:"publicRegistration"}].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/[0.02]">
                  <div><div className="text-[14px] font-bold text-white">{item.label}</div><div className="text-[12px] text-white/25">{item.desc}</div></div>
                  <button onClick={()=>setSettings({...settings,[item.key]:!(settings as any)[item.key]})} className={`w-12 h-7 rounded-full transition-all relative ${(settings as any)[item.key]?"bg-emerald-400":"bg-white/10"}`}><div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${(settings as any)[item.key]?"right-1":"left-1"}`} /></button>
                </div>
              ))}
              <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Session Timeout (minutes)</label><input type="number" value={settings.sessionTimeout} onChange={e=>setSettings({...settings,sessionTimeout:parseInt(e.target.value)})} className="w-32 px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all" /></div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <h3 className="text-[16px] font-black">API & Integration</h3>
              <div><label className="block text-[11px] font-black text-white/25 uppercase mb-3">Rate Limit (requests/min)</label><input type="number" value={settings.apiRateLimit} onChange={e=>setSettings({...settings,apiRateLimit:parseInt(e.target.value)})} className="w-40 px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all" /></div>
              <div className="p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/10">
                <div className="flex items-center justify-between"><div><div className="text-[13px] font-bold text-white">API Key</div><div className="text-[12px] text-white/25 font-mono">bc_live_sk_a1b2c3d4e5f6g7h8i9j0</div></div><button onClick={()=>showToast("API key regenerated")} className="px-3 py-[7px] rounded-lg bg-white/[0.03] text-[11px] font-bold text-white/40 hover:text-white transition-all">Regenerate</button></div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
            <button onClick={()=>showToast("Settings saved!")} className="px-6 py-[11px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[13px] font-black hover:opacity-90 transition-all flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
          </div>
        </div>
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
