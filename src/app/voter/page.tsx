import Link from "next/link";

export default function VoterDashboard() {
  const elections = [
    { id: "1", title: "Student Council 2026", status: "active", deadline: "May 30, 2026", candidates: 4 },
    { id: "2", title: "Faculty Senate", status: "upcoming", deadline: "June 15, 2026", candidates: 3 },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>BC</div>
          <span className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>BallotChain</span>
        </Link>
        <Link href="/login" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Sign Out</Link>
      </header>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px" }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>My Voting Dashboard</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {elections.map(e => (
            <Link key={e.id} href={"/voter/elections/" + e.id + "/vote"} style={{ textDecoration: "none" }}>
              <div className="glass" style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{e.candidates} candidates · Deadline: {e.deadline}</div>
                </div>
                <span className={e.status === "active" ? "btn-purple" : "btn-outline"} style={{ padding: "8px 16px", borderRadius: 8, fontSize: 12 }}>
                  {e.status === "active" ? "Vote Now" : "Upcoming"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
