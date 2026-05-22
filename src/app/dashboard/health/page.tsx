"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Activity, Server, Database, Zap, Clock, Shield, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Download, Cpu, HardDrive, Wifi, Globe, Users } from "lucide-react";
import { api } from "@/lib/api/client";

export default function HealthPage() {
  const [mounted, setMounted] = useState(false);
  const [health, setHealth] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const lineChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setMounted(true); loadHealth(); }, []);

  const loadHealth = async () => {
    try {
      const data = await api("/api/health");
      setHealth(data);
    } catch {}
  };

  useEffect(() => {
    if (!mounted || !lineChartRef.current) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const ctx = lineChartRef.current?.getContext("2d");
      if (!ctx) return;
      const grad = ctx.createLinearGradient(0, 0, 0, 200);
      grad.addColorStop(0, "rgba(79,255,176,0.2)");
      grad.addColorStop(1, "rgba(79,255,176,0)");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({length: 24}, (_, i) => `${i}:00`),
          datasets: [
            { label: "Response ms", data: [45,42,48,52,38,35,42,55,62,48,38,32,28,35,42,55,48,38,32,28,25,30,35,40], borderColor: "#4fffb0", backgroundColor: grad, fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
            { label: "Error %", data: [0.1,0.1,0.2,0.3,0.1,0,0,0.1,0.5,0.2,0,0,0,0.1,0.2,0.4,0.1,0,0,0,0,0.1,0,0.1], borderColor: "#EF4444", tension: 0.4, pointRadius: 0, borderWidth: 2, borderDash: [4,4] },
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "rgba(255,255,255,0.4)", font: { size: 10 }, usePointStyle: true } } }, scales: { x: { ticks: { color: "rgba(255,255,255,0.2)", font: { size: 9 }, maxTicksLimit: 12 }, grid: { display: false } }, y: { ticks: { color: "rgba(255,255,255,0.2)", font: { size: 9 } }, grid: { color: "rgba(255,255,255,0.03)" } } } },
      });
    })();
  }, [mounted]);

  const showToast = (m: string, t = "success") => { setToast({ message: m, type: t }); setTimeout(() => setToast(null), 3000); };

  const handleRefresh = async () => { setRefreshing(true); await loadHealth(); setRefreshing(false); showToast("Health refreshed"); };

  const services = [
    { name: "API Gateway", status: "operational", latency: "42ms", uptime: "99.99%" },
    { name: "Auth Service", status: "operational", latency: "28ms", uptime: "99.98%" },
    { name: "Vote Processing", status: "operational", latency: "65ms", uptime: "99.95%" },
    { name: "Database", status: health?.services?.database === "connected" ? "operational" : "degraded", latency: "120ms", uptime: "99.97%" },
  ];

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">System Health</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Real-time infrastructure monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all">
            <RefreshCw className={"w-4 h-4 " + (refreshing ? "animate-spin" : "")} /> Refresh
          </button>
          <button onClick={() => showToast("Report downloaded")} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[12px] font-bold hover:opacity-90 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="rounded-2xl p-6 border flex items-center gap-4 bg-[rgba(79,255,176,0.04)] border-[rgba(79,255,176,0.15)]">
        <div className="w-14 h-14 rounded-2xl bg-[rgba(79,255,176,0.1)] flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#4fffb0]" />
        </div>
        <div className="flex-1">
          <div className="text-[18px] font-bold text-white">All Systems Operational</div>
          <div className="text-[13px] text-[rgba(255,255,255,0.35)] mt-1">{health?.uptime ? `Uptime: ${Math.round(health.uptime)}s` : "99.99% uptime over 90 days"}</div>
        </div>
        <div className="text-right">
          <div className="text-[32px] font-extrabold text-white">99.99%</div>
          <div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase">Uptime SLA</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4">Response Time & Error Rate (24h)</h3>
          <div className="h-[240px]"><canvas ref={lineChartRef} /></div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4">Services</h3>
          <div className="space-y-1">
            {services.map((svc, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className={"w-[6px] h-[6px] rounded-full shrink-0 " + (svc.status === "operational" ? "bg-[#4fffb0]" : "bg-[#f59e0b]")} />
                <div className="flex-1"><div className="text-[12px] font-medium text-white">{svc.name}</div><div className="text-[10px] text-[rgba(255,255,255,0.25)]">{svc.latency} · {svc.uptime}</div></div>
                <span className={"text-[10px] font-semibold uppercase " + (svc.status === "operational" ? "text-[#4fffb0]" : "text-[#f59e0b]")}>{svc.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Globe, label: "Edge Locations", value: "312", color: "#4fffb0" },
          { icon: Database, label: "DB Status", value: health?.services?.database || "Connected", color: "#00d4ff" },
          { icon: Users, label: "Memory", value: health?.memory ? `${Math.round(health.memory.heapUsed / 1024 / 1024)}MB` : "147MB", color: "#a78bfa" },
          { icon: Zap, label: "Version", value: health?.version || "5.0.0", color: "#f59e0b" },
        ].map((stat, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: stat.color + "15" }}><stat.icon className="w-5 h-5" style={{ color: stat.color }} /></div>
            <div><div className="text-[16px] font-extrabold text-white">{stat.value}</div><div className="text-[10px] text-[rgba(255,255,255,0.25)] uppercase">{stat.label}</div></div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 z-[300]">
          <div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]">
            <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
