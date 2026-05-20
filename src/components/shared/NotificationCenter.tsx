"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "vote" | "election" | "security" | "system" | "success";
  read: boolean;
}

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "New Vote Cast", message: "Alice Johnson voted in Student Council Election", time: "2 min ago", type: "vote", read: false },
    { id: "2", title: "Election Created", message: "Faculty Senate 2026 has been created", time: "18 min ago", type: "election", read: false },
    { id: "3", title: "Voter Import Complete", message: "142 voters imported from CSV", time: "1 hour ago", type: "success", read: false },
    { id: "4", title: "Security Alert", message: "3 failed login attempts from IP 192.168.1.45", time: "2 hours ago", type: "security", read: true },
    { id: "5", title: "System Update", message: "BallotChain v4.0 is now available", time: "1 day ago", type: "system", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => {
    setNotifications([]);
    setOpen(false);
  };

  const typeStyles: Record<string, { bg: string; dot: string; icon: string }> = {
    vote: { bg: "rgba(99,102,241,0.1)", dot: "#6366F1", icon: "🗳️" },
    election: { bg: "rgba(139,92,246,0.1)", dot: "#8B5CF6", icon: "📋" },
    security: { bg: "rgba(239,68,68,0.1)", dot: "#EF4444", icon: "🛡️" },
    system: { bg: "rgba(107,114,128,0.1)", dot: "#6B7280", icon: "⚙️" },
    success: { bg: "rgba(34,197,94,0.1)", dot: "#22C55E", icon: "✅" },
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)",
          fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", transition: "all 0.2s",
        }}>
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: -4, right: -4,
            minWidth: 18, height: 18, borderRadius: "50%",
            background: "#EF4444", color: "#fff",
            fontSize: 10, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #0a0a14",
          }}>{unreadCount}</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              width: 400, maxHeight: 480, borderRadius: 18, overflow: "hidden",
              background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)", zIndex: 100,
            }}>
            
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>Notifications</h3>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{unreadCount} unread</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={markAllRead} style={{ fontSize: 10, fontWeight: 600, color: "#818CF8", background: "none", border: "none", cursor: "pointer" }}>Mark all read</button>
                <button onClick={clearAll} style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}>Clear</button>
              </div>
            </div>

            {/* List */}
            <div style={{ overflowY: "auto", maxHeight: 380 }}>
              {notifications.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13 }}>No notifications</div>
              ) : (
                notifications.map(n => {
                  const style = typeStyles[n.type];
                  return (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      style={{
                        padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.03)",
                        display: "flex", gap: 12, cursor: "pointer",
                        background: n.read ? "transparent" : "rgba(255,255,255,0.02)",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = n.read ? "transparent" : "rgba(255,255,255,0.02)"; }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{style.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{n.title}</span>
                          {!n.read && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366F1", flexShrink: 0 }} />}
                        </div>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: "2px 0 0", lineHeight: 1.4 }}>{n.message}</p>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 4, display: "block" }}>{n.time}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}