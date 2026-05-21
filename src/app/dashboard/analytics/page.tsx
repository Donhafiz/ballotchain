export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Advanced Analytics</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Deep insights and predictive modeling</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[{ label: "Avg Turnout", value: "73.4%", change: "+5.2%" },{ label: "Voter Satisfaction", value: "4.8/5", change: "+0.3" },{ label: "Response Time", value: "1.2s", change: "-0.4s" }].map((kpi, i) => (
          <div key={i} className="glass card-blue" style={{ padding: "20px 24px", textAlign: "center" }}>
            <div className="syne" style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{kpi.label}</div>
            <span className="badge-emerald" style={{ fontSize: 10, marginTop: 4, display: "inline-block" }}>{kpi.change}</span>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding: 24 }}>
        <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>AI Predictions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[{ title: "Next Month Turnout", value: "76%", conf: "92%" },{ title: "Peak Voting Hour", value: "14:00", conf: "87%" },{ title: "Voter Retention", value: "84%", conf: "89%" },{ title: "Engagement Score", value: "8.2/10", conf: "91%" }].map((p, i) => (
            <div key={i} className="glass" style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{p.title}</div>
              <div className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{p.value}</div>
              <div style={{ fontSize: 10, color: "#818CF8", marginTop: 2 }}>{p.conf} confidence</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
