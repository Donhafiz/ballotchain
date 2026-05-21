"use client";
import { useState } from "react";

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications] = useState([
    { id: "1", title: "New Vote Cast", message: "Alice Johnson voted", time: "2 min ago", type: "vote", read: false },
    { id: "2", title: "Election Created", message: "Faculty Senate 2026 created", time: "18 min ago", type: "election", read: false },
    { id: "3", title: "Import Complete", message: "142 voters imported", time: "1 hr ago", type: "success", read: false },
  ]);
  const unread = notifications.filter(n => !n.read).length;
  const colors: Record<string, string> = { vote: "#6366F1", election: "#8B5CF6", success: "#22C55E" };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ width: 34, height: 34, borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        🔔{unread > 0 && <span style={{ position: "absolute", top: -4, right: -4, minWidth: 16, height: 16, borderRadius: "50%", background: "#EF4444", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</span>}
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 8, width: 360, borderRadius: 16, background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", zIndex: 100, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}><h3 className="syne" style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Notifications</h3><span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{unread} unread</span></div>
          {notifications.map(n => (
            <div key={n.id} style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.03)", display: "flex", gap: 10, background: n.read ? "transparent" : "rgba(255,255,255,0.02)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: colors[n.type], marginTop: 5, flexShrink: 0 }} />
              <div><div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{n.title}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{n.message}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>{n.time}</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
