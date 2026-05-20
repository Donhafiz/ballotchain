"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "@/lib/store/AppContext";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import GlobalSearch from "@/components/shared/GlobalSearch";
import NotificationCenter from "@/components/shared/NotificationCenter";
import AIAssistant from "@/components/ai/AIAssistant";
import CommandPalette from "@/components/shared/CommandPalette";
import MagicBackground from "@/components/magic/MagicBackground";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, elections, fetchElections } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const activeCount = elections.filter(e => e.status === "active").length;

  useEffect(() => { fetchElections(); setMounted(true); }, []);

  if (!mounted) {
    return <div style={{ minHeight: "100vh", background: "#0a0a14" }} />;
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const menuSections = [
    {
      title: "MAIN",
      items: [
        { icon: "Ã°Å¸â€œÅ ", label: "Overview", href: "/dashboard" },
        { icon: "Ã°Å¸â€”Â³Ã¯Â¸Â", label: "Elections", href: "/dashboard/elections" },
        { icon: "Ã°Å¸â€˜Â¥", label: "Voters", href: "/dashboard/voters" },
        { icon: "Ã°Å¸â€˜â€˜", label: "Admin Panel", href: "/dashboard/admin" },
      ],
    },
    {
      title: "ANALYTICS",
      items: [
        { icon: "Ã°Å¸â€œË†", label: "Results", href: "/dashboard/results" },
        { icon: "Ã°Å¸â€œÅ ", label: "Analytics", href: "/dashboard/analytics" },
        { icon: "Ã°Å¸â€œâ€¹", label: "Reports", href: "/dashboard/reports" },
        { icon: "Ã°Å¸â€œÅ“", label: "Audit Log", href: "/dashboard/reports/audit" },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { icon: "Ã°Å¸ÂÂ¢", label: "Organizations", href: "/dashboard/organizations" },
        { icon: "Ã°Å¸â€â€™", label: "Security", href: "/dashboard/security" },
        { icon: "Ã¢Å¡â„¢Ã¯Â¸Â", label: "Settings", href: "/dashboard/settings" },
        { icon: "Ã°Å¸â€â€”", label: "Webhooks", href: "/dashboard/webhooks" },
        { icon: "Ã°Å¸Å½Â¨", label: "Branding", href: "/dashboard/branding" },
        { icon: "Ã°Å¸â€™Â³", label: "Billing", href: "/dashboard/billing" },
        { icon: "Ã¢ÂÂ¤Ã¯Â¸Â", label: "Health", href: "/dashboard/health" },
      ],
    },
  ];

  const breadcrumbLabel = pathname === "/dashboard" ? "Overview" : 
    pathname.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Dashboard";

  return (
    <div suppressHydrationWarning>
      <GlobalSearch />
      <MagicBackground />
      
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh", background: "transparent", position: "relative", zIndex: 10 }}>
        
        <aside style={{ background: "rgba(10,10,20,0.95)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", backdropFilter: "blur(30px)" }}>
          
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <Link href="/home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 500, padding: "8px 10px", borderRadius: 8, transition: "all 0.2s" }}>
              <span style={{ fontSize: 16 }}>Ã¢â€ Â</span> Back to Home
            </Link>
          </div>

          <div style={{ padding: "20px 18px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0, boxShadow: "0 8px 25px rgba(99,102,241,0.35)" }}>BC</div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>BallotChain</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Enterprise v4</div>
            </div>
          </div>

          <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
            {menuSections.map((section, si) => (
              <div key={si} style={{ marginBottom: 4 }}>
                <div style={{ padding: "12px 14px 6px", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>{section.title}</div>
                {section.items.map((item, ii) => (
                  <Link key={ii} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, marginBottom: 1, textDecoration: "none", fontSize: 13, fontWeight: 500, color: isActive(item.href) ? "#A5B4FC" : "rgba(255,255,255,0.45)", background: isActive(item.href) ? "rgba(99,102,241,0.12)" : "transparent", transition: "all 0.2s ease", borderLeft: isActive(item.href) ? "3px solid #818CF8" : "3px solid transparent" }}>
                    <span style={{ fontSize: 16, width: 22, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.label === "Overview" && activeCount > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "rgba(34,197,94,0.15)", color: "#22C55E" }}>{activeCount}</span>}
                  </Link>
                ))}
                {si < menuSections.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "8px 14px" }} />}
              </div>
            ))}
          </nav>

          <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 12, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.firstName} {user?.lastName}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{user?.role || "Administrator"}</div>
            </div>
            <button onClick={() => { localStorage.clear(); router.push("/login"); }} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.35)", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>Ã¢ÂÂ»</button>
          </div>
        </aside>

        <div style={{ display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
          <header style={{ height: 56, borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0, background: "rgba(10,10,20,0.8)", backdropFilter: "blur(20px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>Ã°Å¸ÂÂ </span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
              <span style={{ color: "#fff", fontWeight: 600 }}>{breadcrumbLabel}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LanguageSwitcher />
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", fontSize: 11, fontWeight: 600, color: "rgba(34,197,94,0.9)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }} />{activeCount} live
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 100, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Ã¢Å’ËœK</div>
              <NotificationCenter />
            </div>
          </header>
          <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
}