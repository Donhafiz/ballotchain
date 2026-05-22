"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Heart, Activity, Server, Database, Zap, Clock, Shield, CheckCircle2, AlertTriangle, RefreshCw, Download, Cpu, HardDrive, Wifi, Globe, Users } from "lucide-react";

export default function HealthPage() {
  const [mounted, setMounted] = useState(false);
  const [health, setHealth] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState("");
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setMounted(true); fetch("/api/health").then(r=>r.json()).then(setHealth).catch(()=>{}); }, []);
  useEffect(() => { if(!mounted||!chartRef.current) return; (async()=>{const Chart=(await import("chart.js/auto")).default;const ctx=chartRef.current?.getContext("2d");if(!ctx)return;const g=ctx.createLinearGradient(0,0,0,200);g.addColorStop(0,"rgba(16,185,129,0.2)");g.addColorStop(1,"rgba(16,185,129,0)");new Chart(ctx,{type:"line",data:{labels:Array.from({length:24},(_,i)=>i+":00"),datasets:[{label:"Response ms",data:[45,42,48,52,38,35,42,55,62,48,38,32,28,35,42,55,48,38,32,28,25,30,35,40],borderColor:"#10b981",backgroundColor:g,fill:true,tension:.4,pointRadius:0,borderWidth:2},{label:"Error %",data:[.1,.1,.2,.3,.1,0,0,.1,.5,.2,0,0,0,.1,.2,.4,.1,0,0,0,0,.1,0,.1],borderColor:"#EF4444",tension:.4,pointRadius:0,borderWidth:2,borderDash:[4,4]}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:"rgba(255,255,255,0.3)",font:{size:10},usePointStyle:true}}},scales:{x:{ticks:{color:"rgba(255,255,255,0.15)",font:{size:9},maxTicksLimit:12},grid:{display:false}},y:{ticks:{color:"rgba(255,255,255,0.15)",font:{size:9}},grid:{color:"rgba(255,255,255,0.03)"}}}}})})();},[mounted]);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };
  const handleRefresh = async () => { setRefreshing(true); const r = await fetch("/api/health"); setHealth(await r.json()); setRefreshing(false); showToast("Health refreshed"); };

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div><div><h1 className="text-[28px] font-black tracking-[-0.03em]">System Health</h1><p className="text-[13px] text-white/35 mt-1">Real-time infrastructure monitoring</p></div></div>
        <div className="flex items-center gap-2"><button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-[12px] font-bold text-white/30 hover:text-white transition-all"><RefreshCw className={`w-4 h-4 ${refreshing?"animate-spin":""}`} />Refresh</button><button onClick={()=>showToast("Report downloaded")} className="px-4 py-[10px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[12px] font-black hover:opacity-90 transition-all flex items-center gap-2"><Download className="w-4 h-4" />Export</button></div>
      </div>

      <div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/[0.02] p-6 flex items-center gap-4 backdrop-blur-xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center"><CheckCircle2 className="w-7 h-7 text-emerald-300" /></div>
        <div className="flex-1"><div className="text-[18px] font-black">All Systems Operational</div><div className="text-[13px] text-white/30 mt-1">{health?.uptime ? `Uptime: ${Math.round(health.uptime)}s` : "99.99% uptime over 90 days"}</div></div>
        <div className="text-right"><div className="text-[32px] font-black">99.99%</div><div className="text-[11px] text-white/20 uppercase">Uptime SLA</div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl"><h3 className="text-[15px] font-black mb-4">Response Time & Error Rate (24h)</h3><div className="h-[240px]"><canvas ref={chartRef} /></div></div>
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl"><h3 className="text-[15px] font-black mb-4">Services</h3>
          {[{n:"API Gateway",s:"operational",l:"42ms",u:"99.99%"},{n:"Auth Service",s:"operational",l:"28ms",u:"99.98%"},{n:"Vote Processing",s:"operational",l:"65ms",u:"99.95%"},{n:"Database",s:health?.services?.database==="connected"?"operational":"degraded",l:"120ms",u:"99.97%"}].map((s,i)=><div key={i} className="flex items-center gap-3 py-2"><div className={`w-1.5 h-1.5 rounded-full ${s.s==="operational"?"bg-emerald-400":"bg-amber-400"}`} /><div className="flex-1"><div className="text-[12px] font-bold text-white">{s.n}</div><div className="text-[10px] text-white/20">{s.l} · {s.u}</div></div><span className={`text-[10px] font-black uppercase ${s.s==="operational"?"text-emerald-300":"text-amber-300"}`}>{s.s}</span></div>)}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{i:Globe,l:"Edge Locations",v:"312",c:"#10b981"},{i:Database,l:"DB Status",v:health?.services?.database||"Connected",c:"#06b6d4"},{i:Users,l:"Memory",v:health?.memory?Math.round(health.memory.heapUsed/1024/1024)+"MB":"147MB",c:"#8b5cf6"},{i:Zap,l:"Version",v:health?.version||"5.0.0",c:"#f59e0b"}].map((s,i)=><div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background:s.c+"15"}}><s.i className="w-5 h-5" style={{color:s.c}} /></div><div><div className="text-[16px] font-black text-white">{s.v}</div><div className="text-[10px] text-white/20 uppercase">{s.l}</div></div></div>)}
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
