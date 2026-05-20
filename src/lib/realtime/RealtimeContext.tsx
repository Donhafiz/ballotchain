"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface RealtimeContextType {
  connected: boolean;
  lastUpdate: Date | null;
  subscribe: (channel: string, callback: (data: any) => void) => () => void;
  emit: (channel: string, data: any) => void;
}

const RealtimeContext = createContext<RealtimeContextType>({
  connected: false,
  lastUpdate: null,
  subscribe: () => () => {},
  emit: () => {},
});

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const listeners = new Map<string, Set<(data: any) => void>>();

  useEffect(() => {
    // In production, connect to WebSocket server
    // const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8001");
    
    // Simulate connection for demo
    setConnected(true);
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Broadcast mock updates
      listeners.forEach((cbs, channel) => {
        cbs.forEach(cb => cb({ channel, timestamp: new Date().toISOString(), data: { type: "ping" } }));
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const subscribe = (channel: string, callback: (data: any) => void) => {
    if (!listeners.has(channel)) listeners.set(channel, new Set());
    listeners.get(channel)!.add(callback);
    return () => { listeners.get(channel)?.delete(callback); };
  };

  const emit = (channel: string, data: any) => {
    listeners.get(channel)?.forEach(cb => cb({ channel, data }));
    setLastUpdate(new Date());
  };

  return (
    <RealtimeContext.Provider value={{ connected, lastUpdate, subscribe, emit }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export const useRealtime = () => useContext(RealtimeContext);