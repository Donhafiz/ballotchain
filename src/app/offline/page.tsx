export default function OfflinePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
      <div>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📡</div>
        <h1 className="syne" style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>You are Offline</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 400, margin: "0 auto" }}>Please check your internet connection. Some features may be limited until you reconnect.</p>
        <button onClick={() => window.location.reload()} className="btn-blue" style={{ marginTop: 24, padding: "12px 28px", borderRadius: 12, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Try Again</button>
      </div>
    </div>
  );
}