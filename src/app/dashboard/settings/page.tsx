"use client";

import { useState, useEffect } from "react";
import { Settings, Globe, Bell, Lock, Palette, Mail, Shield, Users, CreditCard, Save, CheckCircle2, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const showToast = (m: string) => {
    setToast({ message: m, type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

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
    darkMode: true,
  });

  const tabs = [
    { id: "general", icon: Settings, label: "General" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "security", icon: Lock, label: "Security" },
    { id: "api", icon: Globe, label: "API & Integration" },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Settings</h1>
        <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Configure your organization preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-56 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={"w-full flex items-center gap-3 px-4 py-[11px] rounded-xl text-[13px] font-medium transition-all " + (activeTab === tab.id ? "bg-[rgba(79,255,176,0.08)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.35)] hover:text-white hover:bg-[rgba(255,255,255,0.02)]")}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          {activeTab === "general" && (
            <div className="space-y-6 animate-[fadeSlideUp_0.3s_ease]">
              <h3 className="text-[16px] font-bold text-white mb-2">General Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Organization Name</label>
                  <input value={settings.organizationName} onChange={e => setSettings({...settings, organizationName: e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Timezone</label>
                  <select value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all cursor-pointer">
                    <option value="America/New_York" className="bg-[#14151a]">Eastern Time (US)</option>
                    <option value="America/Chicago" className="bg-[#14151a]">Central Time (US)</option>
                    <option value="Europe/London" className="bg-[#14151a]">London (GMT)</option>
                    <option value="Europe/Paris" className="bg-[#14151a]">Paris (CET)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-[fadeSlideUp_0.3s_ease]">
              <h3 className="text-[16px] font-bold text-white mb-2">Notification Preferences</h3>
              {[
                { label: "Email Notifications", desc: "Receive election updates via email", key: "emailNotifications" as const },
                { label: "Push Notifications", desc: "Browser push alerts for live events", key: "pushNotifications" as const },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.03)]">
                  <div>
                    <div className="text-[14px] font-semibold text-white">{item.label}</div>
                    <div className="text-[12px] text-[rgba(255,255,255,0.3)]">{item.desc}</div>
                  </div>
                  <button onClick={() => setSettings({...settings, [item.key]: !settings[item.key]})} className={"w-12 h-7 rounded-full transition-all relative " + (settings[item.key] ? "bg-[#4fffb0]" : "bg-[rgba(255,255,255,0.08)]")}>
                    <div className={"absolute top-1 w-5 h-5 rounded-full bg-white transition-all " + (settings[item.key] ? "right-1" : "left-1")} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-[fadeSlideUp_0.3s_ease]">
              <h3 className="text-[16px] font-bold text-white mb-2 flex items-center gap-2"><Shield className="w-5 h-5 text-[#4fffb0]" /> Security Settings</h3>
              {[
                { label: "Two-Factor Authentication", desc: "Require 2FA for all admin accounts", key: "twoFactorAuth" as const },
                { label: "Auto Logout", desc: "Automatically log out inactive sessions", key: "autoLogout" as const },
                { label: "Public Registration", desc: "Allow anyone to create an account", key: "publicRegistration" as const },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.03)]">
                  <div>
                    <div className="text-[14px] font-semibold text-white">{item.label}</div>
                    <div className="text-[12px] text-[rgba(255,255,255,0.3)]">{item.desc}</div>
                  </div>
                  <button onClick={() => setSettings({...settings, [item.key]: !settings[item.key]})} className={"w-12 h-7 rounded-full transition-all relative " + (settings[item.key] ? "bg-[#4fffb0]" : "bg-[rgba(255,255,255,0.08)]")}>
                    <div className={"absolute top-1 w-5 h-5 rounded-full bg-white transition-all " + (settings[item.key] ? "right-1" : "left-1")} />
                  </button>
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Session Timeout (minutes)</label>
                <input type="number" value={settings.sessionTimeout} onChange={e => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})} className="w-32 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6 animate-[fadeSlideUp_0.3s_ease]">
              <h3 className="text-[16px] font-bold text-white mb-2">API & Integration</h3>
              <div>
                <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">API Rate Limit (requests/min)</label>
                <input type="number" value={settings.apiRateLimit} onChange={e => setSettings({...settings, apiRateLimit: parseInt(e.target.value)})} className="w-40 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
              </div>
              <div className="p-4 rounded-xl bg-[rgba(79,255,176,0.03)] border border-[rgba(79,255,176,0.08)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-white">API Key</div>
                    <div className="text-[12px] text-[rgba(255,255,255,0.3)]">bc_live_sk_a1b2c3d4e5f6g7h8i9j0</div>
                  </div>
                  <button onClick={() => showToast("API key regenerated")} className="px-3 py-[7px] rounded-lg bg-[rgba(255,255,255,0.03)] text-[11px] font-semibold text-[rgba(255,255,255,0.5)] hover:text-white transition-all">Regenerate</button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)] flex justify-end">
            <button onClick={() => showToast("Settings saved successfully!")} className="px-6 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]">
          <div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]">
            <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" />
            <span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}