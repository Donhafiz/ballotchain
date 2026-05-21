// WebSocket service for real-time vote updates
// In production, use a proper WebSocket server like Pusher, Ably, or Socket.io

type Listener = (data: any) => void;

class RealtimeService {
  private listeners: Map<string, Listener[]> = new Map();
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.startPolling();
    }
  }

  private startPolling() {
    this.interval = setInterval(async () => {
      try {
        const res = await fetch("/api/realtime/votes");
        if (res.ok) {
          const data = await res.json();
          this.emit("voteUpdate", data);
        }
      } catch {}
    }, 5000);
  }

  subscribe(event: string, callback: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event: string, callback: Listener) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      this.listeners.set(event, listeners.filter((l) => l !== callback));
    }
  }

  emit(event: string, data: any) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.listeners.clear();
  }
}

export const realtime = new RealtimeService();
