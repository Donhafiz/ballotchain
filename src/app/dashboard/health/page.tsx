"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Heart, Activity, Server, Database, Zap, Clock, Shield, 
  CheckCircle2, AlertTriangle, XCircle, RefreshCw, TrendingUp,
  Cpu, HardDrive, Wifi, Globe, Users, BarChart3, Eye, Download
} from "lucide-react";

export default function HealthPage() {
  const [mounted, setMounted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const lineChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setMounted(true); }, []);

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
            { label: "Error Rate %", data: [0.1,0.1,0.2,0.3,0.1,0,0,0.1,0.5,0.2,0,0,0,0.1,0.2,0.4,0.1,0,0,0,0,0.1,0,0.1], borderColor: "#EF4444", tension: 0.4, pointRadius: 0, borderWidth: 2, borderDash: [4,4] },
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: "rgba(255,255,255,0.4)", font: { size: 10 }, usePointStyle: true, padding: 16 } } }, scales: { x: { ticks: { color: "rgba(255,255,255,0.2)", font: { size: 9 }, maxTicksLimit: 12 }, grid: { display: false } }, y: { ticks: { color: "rgba(255,255,255,0.2)", font: { size: 9 } }, grid: { color: "rgba(255,255,255,0.03)" } } } },
      });
    })();
  }, [mounted]);

  const showToast = (m: string, t: string = "success") => {
    setToast({ message: m, type: t });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast("System health refreshed", "success");
    }, 1500);
  };

  const systemStatus = "healthy"; // healthy | degraded | down

  const resources = [
    { label: "CPU Usage", value: 34, icon: Cpu, color: "#4fffb0", unit: "%", max: 100 },
    { label: "Memory", value: 62, icon: HardDrive, color: "#f59e0b", unit: "%", max: 100 },
    { label: "Disk I/O", value: 18, icon: Database, color: "#00d4ff", unit: "MB/s", max: 100 },
    { label: "Network", value: 2.4, icon: Wifi, color: "#a78bfa", unit: "Gbps", max: 10 },
  ];

  const services = [
    { name: "API Gateway", status: "operational", latency: "42ms", uptime: "99.99%" },
    { name: "Auth Service", status: "operational", latency: "28ms", uptime: "99.98%" },
    { name: "Vote Processing", status: "operational", latency: "65ms", uptime: "99.95%" },
    { name: "Blockchain Node", status: "operational", latency: "120ms", uptime: "99.97%" },
    { name: "Database Cluster", status: "degraded", latency: "340ms", uptime: "99.82%" },
    { name: "Email Service", status: "operational", latency: "180ms", uptime: "99.90%" },
    { name: "WebSocket Server", status: "operational", latency: "15ms", uptime: "99.99%" },
    { name: "CDN", status: "operational", latency: "8ms", uptime: "99.99%" },
  ];

  const incidents = [
    { title: "Database replication lag detected", severity: "medium", time: "2 hours ago", resolved: false, detail: "Replica lag of 340ms on secondary node. Failover ready if needed." },
    { title: "CDN cache purge completed", severity: "info", time: "6 hours ago", resolved: true, detail: "Successfully purged 2.3TB of stale assets across 300+ edge locations." },
    { title: "DDoS mitigation activated", severity: "high", time: "3 days ago", resolved: true, detail: "Layer 7 attack of 8.2M requests/min neutralized. Zero downtime." },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">System Health</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Real-time infrastructure monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all">
            <RefreshCw className={"w-4 h-4 " + (refreshing ? "animate-spin" : "")} /> {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button onClick={() => showToast("Report downloaded")} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[12px] font-bold hover:opacity-90 transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Overall Status Banner */}
      <div className={"rounded-2xl p-6 border flex items-center gap-4 " + (systemStatus === "healthy" ? "bg-[rgba(79,255,176,0.04)] border-[rgba(79,255,176,0.15)]" : systemStatus === "degraded" ? "bg-[rgba(245,158,11,0.04)] border-[rgba(245,158,11,0.15)]" : "bg-[rgba(239,68,68,0.04)] border-[rgba(239,68,68,0.15)]")}>
        <div className={"w-14 h-14 rounded-2xl flex items-center justify-center " + (systemStatus === "healthy" ? "bg-[rgba(79,255,176,0.1)]" : systemStatus === "degraded" ? "bg-[rgba(245,158,11,0.1)]" : "bg-[rgba(239,68,68,0.1)]")}>
          {systemStatus === "healthy" ? <CheckCircle2 className="w-7 h-7 text-[#4fffb0]" /> : systemStatus === "degraded" ? <AlertTriangle className="w-7 h-7 text-[#f59e0b]" /> : <XCircle className="w-7 h-7 text-[#EF4444]" />}
        </div>
        <div className="flex-1">
          <div className="text-[18px] font-bold text-white capitalize">All Systems {systemStatus === "healthy" ? "Operational" : systemStatus}</div>
          <div className="text-[13px] text-[rgba(255,255,255,0.35)] mt-1">
            {systemStatus === "healthy" ? "99.99% uptime over the last 90 days. All services running within normal parameters." : "Some services experiencing issues. Our team is investigating."}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[32px] font-extrabold text-white">99.99%</div>
          <div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[0.06em]">Uptime SLA</div>
        </div>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((res, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: res.color + "15" }}>
                <res.icon className="w-[18px] h-[18px]" style={{ color: res.color }} />
              </div>
              <span className="text-[20px] font-extrabold text-white">{res.value}{res.unit}</span>
            </div>
            <div className="text-[11px] font-medium text-[rgba(255,255,255,0.3)] uppercase tracking-[0.06em] mb-3">{res.label}</div>
            <div className="h-[4px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: (res.value / res.max * 100) + "%", background: res.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Service Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-[#4fffb0]" /> Response Time & Error Rate (24h)</h3>
          <div className="h-[240px]"><canvas ref={lineChartRef} /></div>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Server className="w-4 h-4 text-[#4fffb0]" /> Services</h3>
          <div className="space-y-1">
            {services.map((svc, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className={"w-[6px] h-[6px] rounded-full shrink-0 " + (svc.status === "operational" ? "bg-[#4fffb0]" : "bg-[#f59e0b]")} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-white truncate">{svc.name}</div>
                  <div className="text-[10px] text-[rgba(255,255,255,0.25)]">{svc.latency} · {svc.uptime}</div>
                </div>
                <span className={"text-[10px] font-semibold uppercase " + (svc.status === "operational" ? "text-[#4fffb0]" : "text-[#f59e0b]")}>{svc.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-[#f59e0b]" /> Recent Incidents</h3>
          <span className="text-[11px] text-[rgba(255,255,255,0.2)]">{incidents.filter(i => !i.resolved).length} active</span>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.03)]">
          {incidents.map((incident, i) => (
            <div key={i} className="p-5 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
              <div className="flex items-start gap-3">
                <div className={"w-2 h-2 rounded-full mt-[6px] shrink-0 " + (incident.severity === "high" ? "bg-[#EF4444]" : incident.severity === "medium" ? "bg-[#f59e0b]" : "bg-[#4fffb0]")} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-[14px] font-semibold text-white">{incident.title}</div>
                    <span className="text-[10px] text-[rgba(255,255,255,0.2)] whitespace-nowrap ml-4">{incident.time}</span>
                  </div>
                  <div className="text-[12px] text-[rgba(255,255,255,0.35)] mt-1">{incident.detail}</div>
                  <div className="mt-2">
                    {incident.resolved ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4fffb0]"><CheckCircle2 className="w-3 h-3" /> Resolved</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#f59e0b]"><Clock className="w-3 h-3" /> Investigating</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Globe, label: "Edge Locations", value: "312", color: "#4fffb0" },
          { icon: Database, label: "DB Queries/sec", value: "8,421", color: "#00d4ff" },
          { icon: Users, label: "Active Connections", value: "1,847", color: "#a78bfa" },
          { icon: Zap, label: "Avg Response", value: "42ms", color: "#f59e0b" },
        ].map((stat, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: stat.color + "15" }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-[16px] font-extrabold text-white">{stat.value}</div>
              <div className="text-[10px] text-[rgba(255,255,255,0.25)] uppercase tracking-[0.04em]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]">
          <div className={"flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border " + (toast.type === "success" ? "bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]" : "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)]")}>
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /> : <AlertTriangle className="w-5 h-5 text-[#EF4444]" />}
            <span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}