"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const quickActions = [
  { label: "New Election", desc: "Create in 2 min", icon: "🗳️", href: "/dashboard/elections/create", color: "#6366F1" },
  { label: "Import Voters", desc: "CSV upload", icon: "📥", href: "/dashboard/voters", color: "#22C55E" },
  { label: "View Results", desc: "Live analytics", icon: "📊", href: "/dashboard/results", color: "#F59E0B" },
  { label: "Security Scan", desc: "Run audit", icon: "🛡️", href: "/dashboard/security", color: "#EF4444" },
  { label: "AI Insights", desc: "Get predictions", icon: "🤖", href: "/dashboard/analytics", color: "#8B5CF6" },
  { label: "Export Data", desc: "PDF / CSV", icon: "📄", href: "/dashboard/reports/export", color: "#06B6D4" },
];

export default function QuickActions() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
      {quickActions.map((action, i) => (
        <motion.div key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href={action.href} style={{ textDecoration: "none" }}>
            <div style={{
              padding: "16px", borderRadius: 14, textAlign: "center",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.2s", cursor: "pointer",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = action.color; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{action.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{action.label}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{action.desc}</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}