"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const globalSearchItems = [
  // Pages
  { label: "Dashboard Overview", href: "/dashboard", icon: "📊", category: "Pages" },
  { label: "Elections List", href: "/dashboard/elections", icon: "🗳️", category: "Pages" },
  { label: "Create Election", href: "/dashboard/elections/create", icon: "➕", category: "Actions" },
  { label: "Voter Management", href: "/dashboard/voters", icon: "👥", category: "Pages" },
  { label: "Results & Analytics", href: "/dashboard/results", icon: "📈", category: "Pages" },
  { label: "Advanced Analytics", href: "/dashboard/analytics", icon: "📊", category: "Analytics" },
  { label: "Reports", href: "/dashboard/reports", icon: "📋", category: "Pages" },
  { label: "Audit Log", href: "/dashboard/reports/audit", icon: "📜", category: "Security" },
  { label: "Admin Panel", href: "/dashboard/admin", icon: "👑", category: "Admin" },
  { label: "Organizations", href: "/dashboard/organizations", icon: "🏢", category: "System" },
  { label: "Security Settings", href: "/dashboard/security", icon: "🔒", category: "System" },
  { label: "Platform Settings", href: "/dashboard/settings", icon: "⚙️", category: "System" },
  { label: "Webhooks", href: "/dashboard/webhooks", icon: "🔗", category: "Developer" },
  { label: "Branding", href: "/dashboard/branding", icon: "🎨", category: "System" },
  { label: "Billing & Plans", href: "/dashboard/billing", icon: "💳", category: "System" },
  { label: "System Health", href: "/dashboard/health", icon: "❤️", category: "System" },
  // Quick Actions
  { label: "Import Voters", href: "/dashboard/voters", icon: "📥", category: "Actions" },
  { label: "Export Results", href: "/dashboard/reports/export", icon: "📤", category: "Actions" },
  { label: "Generate Report", href: "/dashboard/reports", icon: "📄", category: "Actions" },
  { label: "Add Candidate", href: "/dashboard/elections", icon: "👤", category: "Actions" },
  // Settings
  { label: "Change Password", href: "/dashboard/settings", icon: "🔑", category: "Settings" },
  { label: "Notification Preferences", href: "/dashboard/settings", icon: "🔔", category: "Settings" },
  { label: "API Keys", href: "/dashboard/webhooks", icon: "🔐", category: "Developer" },
  { label: "Documentation", href: "/developers", icon: "📚", category: "Developer" },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = query.trim()
    ? globalSearchItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : globalSearchItems.slice(0, 8);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") setOpen(false);
      if (open && filtered.length > 0) {
        if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
        if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
        if (e.key === "Enter") { router.push(filtered[selectedIndex].href); setOpen(false); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, query, selectedIndex, filtered, router]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          paddingTop: "15vh",
        }}
        onClick={() => setOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "100%", maxWidth: 560, borderRadius: 20, overflow: "hidden",
            background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
          }}
          onClick={(e) => e.stopPropagation()}>
          
          {/* Search Input */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input
              autoFocus
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              placeholder="Search pages, actions, settings..."
              style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 15, outline: "none", fontFamily: "inherit" }}
            />
            <kbd style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.06)", fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontWeight: 600 }}>ESC</kbd>
          </div>

          {/* Results */}
          <div style={{ maxHeight: 360, overflowY: "auto", padding: 8 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
                No results for "{query}"
              </div>
            ) : (
              filtered.map((item, i) => (
                <div
                  key={i}
                  onClick={() => { router.push(item.href); setOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "11px 16px", borderRadius: 12, cursor: "pointer",
                    background: i === selectedIndex ? "rgba(99,102,241,0.15)" : "transparent",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={() => setSelectedIndex(i)}>
                  <span style={{ fontSize: 20, width: 28, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{item.category}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>↵</span>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16, fontSize: 10, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>ESC Close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}