"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: "📊", category: "Pages" },
  { label: "Elections", href: "/dashboard/elections", icon: "🗳️", category: "Pages" },
  { label: "Create Election", href: "/dashboard/elections/create", icon: "➕", category: "Actions" },
  { label: "Voters", href: "/dashboard/voters", icon: "👥", category: "Pages" },
  { label: "Results", href: "/dashboard/results", icon: "📈", category: "Pages" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️", category: "System" },
  { label: "Admin Panel", href: "/dashboard/admin", icon: "👑", category: "Admin" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const filtered = query ? items.filter(i => i.label.toLowerCase().includes(query.toLowerCase())) : items.slice(0, 6);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(!open); setQuery(""); }
      if (e.key === "Escape") setOpen(false);
      if (open) {
        if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
        if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
        if (e.key === "Enter" && filtered[selected]) { router.push(filtered[selected].href); setOpen(false); }
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, query, selected, filtered, router]);

  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "15vh" }} onClick={() => setOpen(false)}>
      <div style={{ width: 500, borderRadius: 16, background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span>🔍</span><input autoFocus value={query} onChange={e => { setQuery(e.target.value); setSelected(0); }} placeholder="Search..." style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 14, outline: "none" }} />
          <kbd style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.06)", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: 300, overflowY: "auto", padding: 8 }}>
          {filtered.map((item, i) => (
            <div key={i} onClick={() => { router.push(item.href); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, cursor: "pointer", background: i === selected ? "rgba(99,102,241,0.15)" : "transparent" }}>
              <span>{item.icon}</span><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{item.label}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{item.category}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
