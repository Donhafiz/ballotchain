"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
  "Create a student council election",
  "Best voting method for board elections",
  "How to import voters via CSV",
  "Set up ranked choice voting",
  "Security best practices",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "👋 Hi! I'm your BallotChain AI assistant. I can help you create elections, manage voters, analyze results, and more. What would you like to do?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput(""); setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply || "I can help with election management, voter imports, security settings, and results analysis." }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "I can help you: create elections with our wizard, import voters via CSV, configure security settings, analyze results in real-time, and set up access codes. What specific task do you need help with?" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setOpen(!open)}
        className="btn-purple"
        style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "none", cursor: "pointer", zIndex: 50, boxShadow: "0 8px 32px rgba(124,58,237,0.4)" }}>
        {open ? "✕" : "🤖"}
        <span style={{ position: "absolute", top: -4, right: -4, width: 12, height: 12, borderRadius: "50%", background: "#22C55E", border: "2px solid #0a0a14" }} />
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ position: "fixed", bottom: 96, right: 24, width: 420, height: 560, borderRadius: 20, background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", zIndex: 50, overflow: "hidden" }}>
            
            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
              <div className="btn-purple" style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
              <div>
                <div className="syne" style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>AI Assistant</div>
                <div style={{ fontSize: 10, color: "#22C55E" }}>🟢 Online</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "10px 16px", borderRadius: 14, fontSize: 13, lineHeight: 1.6,
                    background: msg.role === "user" ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "rgba(255,255,255,0.05)",
                    color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.8)",
                    borderBottomRightRadius: msg.role === "user" ? 4 : 14, borderBottomLeftRadius: msg.role === "assistant" ? 4 : 14 }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366F1", animation: "bounce 0.6s infinite" }} /><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6", animation: "bounce 0.6s infinite 0.1s" }} /><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A855F7", animation: "bounce 0.6s infinite 0.2s" }} /></div>}
            </div>

            {/* Suggestions */}
            <div style={{ padding: "8px 20px", display: "flex", gap: 6, flexWrap: "wrap", borderTop: "0.5px solid rgba(255,255,255,0.04)" }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} style={{ padding: "6px 12px", borderRadius: 100, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>{s}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "12px 20px", borderTop: "0.5px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask me anything..."
                style={{ flex: 1, padding: "10px 16px", borderRadius: 12, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none" }} />
              <button onClick={() => sendMessage(input)} disabled={loading} className="btn-blue" style={{ width: 40, height: 40, borderRadius: 12, border: "none", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}