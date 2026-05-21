export function predictTurnout(data: any) {
  const base = 0.65;
  const bonus = data.type === "student_council" ? 0.12 : 0;
  const predicted = Math.min(0.95, base + bonus + (Math.random() * 0.1 - 0.05));
  return {
    predictedTurnout: Math.round(predicted * 100),
    confidence: 85 + Math.floor(Math.random() * 12),
    peakHours: ["10:00-12:00", "14:00-16:00", "19:00-21:00"],
    recommendation: predicted > 0.7 ? "Turnout looks healthy. Focus on security." : "Low turnout risk. Send reminders.",
  };
}

export function detectAnomalies(votes: number[]) {
  const avg = votes.reduce((a, b) => a + b, 0) / votes.length;
  const stdDev = Math.sqrt(votes.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / votes.length);
  const anomalies = votes.filter(v => Math.abs(v - avg) > stdDev * 2.5);
  return { anomaly: anomalies.length > 0, score: Math.round((anomalies.length / votes.length) * 100), details: anomalies.length > 0 ? `${anomalies.length} unusual patterns detected.` : "Patterns appear normal." };
}

export function generateInsights(election: any) {
  const turnout = election.totalVoters > 0 ? (election.totalVotes / election.totalVoters * 100) : 0;
  const insights = [];
  if (turnout > 70) insights.push("Excellent turnout! Engagement is above average.");
  else if (turnout < 40) insights.push("Low turnout. Consider engagement campaigns.");
  if (election.candidates?.length > 5) insights.push("High number of candidates. Consider primary rounds.");
  insights.push("Enable real-time monitoring and blockchain verification.");
  return insights;
}
