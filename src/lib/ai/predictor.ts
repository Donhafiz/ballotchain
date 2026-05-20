// AI/ML Prediction Engine
// In production, connect to TensorFlow.js or Python ML backend

interface ElectionData {
  totalVoters: number;
  historicalTurnout: number[];
  timeOfDay: string;
  dayOfWeek: string;
  electionType: string;
  weather?: string;
  holidays?: boolean;
}

interface PredictionResult {
  predictedTurnout: number;
  confidence: number;
  peakHours: string[];
  riskFactors: string[];
  recommendation: string;
}

export function predictTurnout(data: ElectionData): PredictionResult {
  // Simulated ML prediction (replace with real model)
  const baseTurnout = data.historicalTurnout.reduce((a, b) => a + b, 0) / data.historicalTurnout.length;
  
  // Time-based adjustments
  const hourBonus = parseInt(data.timeOfDay) >= 8 && parseInt(data.timeOfDay) <= 20 ? 0.05 : -0.1;
  const weekendPenalty = ["Saturday", "Sunday"].includes(data.dayOfWeek) ? -0.08 : 0;
  const typeBonus = data.electionType === "student_council" ? 0.12 : data.electionType === "board" ? 0.08 : 0;
  const holidayPenalty = data.holidays ? -0.15 : 0;

  const predictedTurnout = Math.min(0.95, Math.max(0.1, baseTurnout + hourBonus + weekendPenalty + typeBonus + holidayPenalty));
  
  return {
    predictedTurnout: Math.round(predictedTurnout * 100),
    confidence: 85 + Math.floor(Math.random() * 12),
    peakHours: ["10:00-12:00", "14:00-16:00", "19:00-21:00"],
    riskFactors: predictedTurnout < 0.4 ? ["Low engagement risk", "Consider extended voting period"] : [],
    recommendation: predictedTurnout < 0.4 
      ? "Send reminder emails and extend voting hours to increase participation."
      : "Turnout looks healthy. Focus on security monitoring.",
  };
}

export function detectAnomalies(votingPattern: number[]): { anomaly: boolean; score: number; details: string } {
  const avg = votingPattern.reduce((a, b) => a + b, 0) / votingPattern.length;
  const stdDev = Math.sqrt(votingPattern.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / votingPattern.length);
  
  const anomalies = votingPattern.filter(v => Math.abs(v - avg) > stdDev * 2.5);
  const anomalyScore = anomalies.length / votingPattern.length;

  return {
    anomaly: anomalyScore > 0.1,
    score: Math.round(anomalyScore * 100),
    details: anomalyScore > 0.1 
      ? `${anomalies.length} unusual voting patterns detected. Recommend manual review.`
      : "Voting patterns appear normal.",
  };
}

export function generateInsights(election: any): string[] {
  const insights = [];
  const turnout = election.totalVoters > 0 ? (election.totalVotes / election.totalVoters * 100) : 0;

  if (turnout > 70) insights.push("Excellent voter turnout! Engagement is significantly above average.");
  else if (turnout < 40) insights.push("Low turnout detected. Consider voter engagement campaigns.");
  
  if (election.candidates?.length > 5) insights.push("High number of candidates may dilute votes. Consider primary rounds.");
  
  const closeRace = election.candidates?.some((c: any, i: number) => {
    const next = election.candidates[i + 1];
    return next && Math.abs((c.votes || 0) - (next.votes || 0)) < (election.totalVotes * 0.02);
  });
  if (closeRace) insights.push("Close race detected between top candidates. Ensure audit trail is active.");

  insights.push("AI recommends: Enable real-time monitoring and blockchain verification for this election.");
  
  return insights;
}