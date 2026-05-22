"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, ArrowRight, Zap, Shield, Vote, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "How do I create an election?",
  "Tell me about security",
  "How does USSD voting work?",
  "What are the pricing plans?",
  "How can voters verify their vote?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your BallotChain AI assistant. I can help with election setup, security questions, voter management, and more. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 text-emerald-300 mx-auto mb-5">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black tracking-[-0.03em] mb-2">AI Election Assistant</h1>
          <p className="text-white/40">Ask me anything about running elections on BallotChain.</p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-emerald-300 to-cyan-300 text-black" : "bg-white/10 text-white"}`}>
                    {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "assistant" ? "bg-white/[0.04] border border-white/5 text-white/80" : "bg-emerald-400/10 border border-emerald-400/15 text-white"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-300 text-black"><Bot className="h-4 w-4" /></div>
                <div className="bg-white/[0.04] border border-white/5 rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-[11px] font-black text-white/15 uppercase tracking-[0.1em] mb-3">Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s)} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[12px] text-white/40 hover:text-white hover:border-white/10 transition-all">{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/5 p-4">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about elections, security, voting..." className="flex-1 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:border-emerald-400/20 transition-all placeholder:text-white/15" />
              <button type="submit" disabled={loading || !input.trim()} className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-sm font-black hover:opacity-90 transition-all disabled:opacity-30 flex items-center gap-2">
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
