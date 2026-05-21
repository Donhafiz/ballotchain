"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandPalette from "@/components/shared/CommandPalette";
import NotificationCenter from "@/components/shared/NotificationCenter";

const menuSections = [
  {
    title: "MAIN",
    items: [
      { icon: "📊", label: "Overview", href: "/dashboard" },
      { icon: "🗳️", label: "Elections", href: "/dashboard/elections" },
      { icon: "👥", label: "Voters", href: "/dashboard/voters" },
      { icon: "👑", label: "Admin Panel", href: "/dashboard/admin" },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { icon: "📈", label: "Live Results", href: "/dashboard/results" },
      { icon: "📋", label: "Reports", href: "/dashboard/reports" },
      { icon: "📊", label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { icon: "🏢", label: "Organizations", href: "/dashboard/organizations" },
      { icon: "🔒", label: "Security", href: "/dashboard/security" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { icon: "⚙️", label: "Settings", href: "/dashboard/settings" },
      { icon: "💳", label: "Billing", href: "/dashboard/billing" },
      { icon: "🔗", label: "Webhooks", href: "/dashboard/webhooks" },
      { icon: "🎨", label: "Branding", href: "/dashboard/branding" },
      { icon: "❤️", label: "Health", href: "/dashboard/health" },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", minHeight: "100vh", background: "#0a0a14" }}>
      <CommandPalette />
      <aside style={{ background: "rgba(255,255,255,0.012)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16, boxShadow: "0 8px 28px rgba(99,102,241,0.4)" }}>BC</div>
            <div>
              <div className="syne" style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>BallotChain</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.22)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Enterprise v4</div>
            </div>
          </Link>
        </div>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
          <Link href="/home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 500, padding: "6px 10px", borderRadius: 6 }}>← Back to Home</Link>
        </div>
        <nav style={{ flex: 1, padding: "14px 12px", overflowY: "auto" }}>
          {menuSections.map((section, si) => (
            <div key={si} style={{ marginBottom: 6 }}>
              <div style={{ padding: "10px 14px 4px", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.14)" }}>{section.title}</div>
              {section.items.map((item, ii) => (
                <Link key={ii} href={item.href} className={"sb-link" + (isActive(item.href) ? " active" : "")}>
                  <span style={{ fontSize: 17, width: 24, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              {si < menuSections.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.025)", margin: "8px 14px" }} />}
            </div>
          ))}
        </nav>
        <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>AD</div>
          <div style={{ flex: 1, overflow: "hidden" }}><div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Admin User</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)" }}>Administrator</div></div>
        </div>
      </aside>
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ height: 56, borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", background: "rgba(10,10,20,0.6)", backdropFilter: "blur(20px)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>🏠</span><span style={{ color: "rgba(255,255,255,0.1)" }}>/</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>{pathname === "/dashboard" ? "Overview" : pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", fontSize: 11, fontWeight: 600, color: "#22C55E" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }} />3 live
            </span>
            <kbd style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.06)", fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>⌘K</kbd>
            <NotificationCenter />
          </div>
        </header>
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>{children}</div>
      </div>
    </div>
  );
}
