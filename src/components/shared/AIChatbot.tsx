"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your BallotChain AI assistant. Ask me anything about elections, security, voting, or pricing." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble. Try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className="fixed bottom-8 right-8 z-[100] group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300 shadow-[0_10px_40px_rgba(16,185,129,0.4)] hover:scale-110 transition-all duration-300">
            <Bot className="h-6 w-6 text-black" />
          </div>
          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
            <Sparkles className="h-2.5 w-2.5 text-emerald-500" />
          </div>
        </div>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={isMinimized ? { opacity: 1, scale: 1, y: 0, height: "auto" } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed z-[150] right-8 transition-all duration-300 ${isMinimized ? "bottom-28 w-72" : "bottom-28 w-[380px]"}`}
          >
            <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_120px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-3xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-gradient-to-r from-emerald-400/5 to-cyan-400/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-300">
                    <Bot className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">AI Assistant</h3>
                    <p className="text-[10px] text-emerald-300">Online · Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-emerald-300 to-cyan-300 text-black" : "bg-white/10 text-white"}`}>
                          {msg.role === "assistant" ? <Bot className="h-3.5 w-3.5" /> : <span className="text-[10px] font-black">U</span>}
                        </div>
                        <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${msg.role === "assistant" ? "bg-white/[0.04] border border-white/5 text-white/70" : "bg-emerald-400/10 border border-emerald-400/15 text-white"}`}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {loading && (
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-300 text-black"><Bot className="h-3.5 w-3.5" /></div>
                        <div className="bg-white/[0.04] border border-white/5 rounded-2xl px-3 py-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-bounce" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.15s" }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.3s" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestions */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {["Create election?", "How does USSD work?", "Tell me about security", "Pricing plans"].map((s, i) => (
                          <button key={i} onClick={() => sendMessage(s)} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-white/35 hover:text-white hover:border-white/10 transition-all">{s}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="border-t border-white/5 p-3">
                    <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white text-xs outline-none focus:border-emerald-400/20 transition-all placeholder:text-white/15"
                        autoFocus
                      />
                      <button type="submit" disabled={loading || !input.trim()} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-xs font-black hover:opacity-90 transition-all disabled:opacity-30">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
