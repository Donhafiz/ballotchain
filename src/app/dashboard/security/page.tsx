"use client";

import { useState, useEffect } from "react";
import { Shield, Lock, AlertTriangle, Key, Fingerprint, Ban, CheckCircle2, RefreshCw, Eye } from "lucide-react";
import { api } from "@/lib/api/client";

export default function SecurityPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => { setMounted(true); loadHealth(); }, []);

  const loadHealth = async () => {
    try {
      const data = await api("/api/health");
      setHealthData(data);
    } catch {}
  };

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const securityScore = 94;
  const alerts = [
    { title: "Multiple failed login attempts", detail: "IP 203.0.113.42 — 12 attempts", severity: "high", time: "5 min ago" },
    { title: "API key generated", detail: "Admin created key for integration", severity: "info", time: "1 hour ago" },
    { title: "Unusual vote pattern", detail: "Spike of 47 votes from single precinct", severity: "medium", time: "2 hours ago" },
  ];

  const blockedIPs = [
    { ip: "198.51.100.23", reason: "Brute force attack", blockedAt: "3 hours ago", attempts: 47 },
    { ip: "203.0.113.99", reason: "Suspicious pattern", blockedAt: "1 day ago", attempts: 23 },
  ];

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Security</h1>
        <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Monitor and manage system security</p>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(79,255,176,0.15)] to-[rgba(0,212,255,0.1)] flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#4fffb0]" />
            </div>
            <div>
              <div className="text-[36px] font-extrabold text-white">{securityScore}<span className="text-[16px] text-[rgba(255,255,255,0.3)]">/100</span></div>
              <div className="text-[14px] text-[#4fffb0] font-semibold">Security Score — Excellent</div>
            </div>
          </div>
          <button onClick={() => showToast("Security scan initiated")} className="px-5 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Run Scan
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["2FA Enforcement","IP Allowlisting","Rate Limiting","Audit Logging","DDoS Protection","Data Encryption"].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              <CheckCircle2 className="w-4 h-4 text-[#4fffb0]" />
              <span className="text-[13px] text-[rgba(255,255,255,0.6)]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-[#f59e0b]" /> Security Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.01)]">
                <div className={"w-2 h-2 rounded-full mt-[6px] shrink-0 " + (alert.severity === "high" ? "bg-[#EF4444]" : alert.severity === "medium" ? "bg-[#f59e0b]" : "bg-[#4fffb0]")} />
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-white">{alert.title}</div>
                  <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">{alert.detail}</div>
                </div>
                <span className="text-[10px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Ban className="w-4 h-4 text-[#EF4444]" /> Blocked IPs</h3>
          <div className="space-y-3">
            {blockedIPs.map((ip, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[rgba(239,68,68,0.03)] border border-[rgba(239,68,68,0.06)]">
                <div>
                  <div className="text-[13px] font-semibold text-white font-mono">{ip.ip}</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{ip.reason} · {ip.attempts} attempts</div>
                </div>
                <button onClick={() => showToast("IP unblocked")} className="px-3 py-[6px] rounded-lg bg-[rgba(79,255,176,0.08)] text-[#4fffb0] text-[11px] font-semibold hover:bg-[rgba(79,255,176,0.12)] transition-all">Unblock</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {healthData && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4">System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {Object.entries(healthData.services || {}).map(([key, val]: [string, any]) => (
              <div key={key} className="p-3">
                <div className="text-lg font-bold text-[#4fffb0] capitalize">{key}</div>
                <div className="text-xs text-[rgba(255,255,255,0.3)]">{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 z-[300]">
          <div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]">
            <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" />
            <span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
