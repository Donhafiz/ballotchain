"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const searchItems = [
  { label: "Dashboard", href: "/dashboard", icon: "📊", category: "Pages" },
  { label: "Elections", href: "/dashboard/elections", icon: "🗳️", category: "Pages" },
  { label: "Create Election", href: "/dashboard/elections/create", icon: "➕", category: "Actions" },
  { label: "Voters", href: "/dashboard/voters", icon: "👥", category: "Pages" },
  { label: "Results", href: "/dashboard/results", icon: "📈", category: "Pages" },
  { label: "Reports", href: "/dashboard/reports", icon: "📋", category: "Pages" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️", category: "Pages" },
  { label: "Security", href: "/dashboard/security", icon: "🔒", category: "System" },
  { label: "Organizations", href: "/dashboard/organizations", icon: "🏢", category: "System" },
  { label: "Webhooks", href: "/dashboard/webhooks", icon: "🔗", category: "System" },
  { label: "Branding", href: "/dashboard/branding", icon: "🎨", category: "System" },
  { label: "Health", href: "/dashboard/health", icon: "❤️", category: "System" },
  { label: "Admin Panel", href: "/dashboard/admin", icon: "👑", category: "Admin" },
  { label: "Audit Log", href: "/dashboard/reports/audit", icon: "📜", category: "Admin" },
  { label: "Export Results", href: "/dashboard/reports/export", icon: "📥", category: "Actions" },
  { label: "Import Voters", href: "/dashboard/elections", icon: "📤", category: "Actions" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = query
    ? searchItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") setOpen(false);
      if (open) {
        if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
        if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
        if (e.key === "Enter" && filtered[selectedIndex]) {
          router.push(filtered[selectedIndex].href);
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, query, selectedIndex, filtered, router]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={() => setOpen(false)}>
        <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.08)" }}
          onClick={(e) => e.stopPropagation()}>
          
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 16 }}>🔍</span>
            <input
              autoFocus
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              placeholder="Search pages, actions, settings..."
              style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 15, outline: "none", fontFamily: "inherit" }}
            />
            <kbd style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.06)", fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>ESC</kbd>
          </div>

          <div style={{ maxHeight: 320, overflowY: "auto", padding: 8 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No results found</div>
            ) : (
              filtered.map((item, i) => (
                <div key={i}
                  onClick={() => { router.push(item.href); setOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                    background: i === selectedIndex ? "rgba(99,102,241,0.15)" : "transparent",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={() => setSelectedIndex(i)}>
                  <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{item.category}</div>
                  </div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>↵</span>
                </div>
              ))
            )}
          </div>

          <div style={{ padding: "8px 18px", borderTop: "0.5px solid rgba(255,255,255,0.06)", display: "flex", gap: 12, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
            <span>↑↓ Navigate</span><span>↵ Select</span><span>ESC Close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}