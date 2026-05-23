export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#030303",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
      padding: "2rem",
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 900, margin: 0, color: "#10b981" }}>404</h1>
        <p style={{ fontSize: "1.5rem", margin: "1rem 0", color: "#94a3b8" }}>Page Not Found</p>
        <a href="/" style={{ color: "#10b981", textDecoration: "none", fontWeight: 600 }}>
          Go back to Home
        </a>
      </div>
    </div>
  );
}
