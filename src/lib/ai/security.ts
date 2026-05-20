// AI Security Guardian
// Real-time fraud detection and behavioral analysis

interface SecurityEvent {
  type: string;
  userId: string;
  ip: string;
  timestamp: string;
  action: string;
  metadata?: any;
}

interface ThreatAssessment {
  threatLevel: "low" | "medium" | "high" | "critical";
  score: number;
  flags: string[];
  action: string;
}

const suspiciousIPs = new Set<string>();
const voteVelocity = new Map<string, number[]>();
const geoAnomalies = new Map<string, string[]>();

export function analyzeThreat(event: SecurityEvent): ThreatAssessment {
  const flags: string[] = [];
  let score = 0;

  // Check vote velocity (multiple votes in short time)
  if (event.type === "vote") {
    const userVotes = voteVelocity.get(event.userId) || [];
    userVotes.push(Date.now());
    const recentVotes = userVotes.filter(t => Date.now() - t < 60000);
    voteVelocity.set(event.userId, recentVotes);

    if (recentVotes.length > 5) {
      flags.push("High vote velocity detected");
      score += 30;
    }
    if (recentVotes.length > 10) {
      flags.push("Possible automated voting");
      score += 50;
    }
  }

  // Check IP reputation
  if (suspiciousIPs.has(event.ip)) {
    flags.push("Suspicious IP address");
    score += 40;
  }

  // Check for login anomalies
  if (event.type === "login") {
    const userLocations = geoAnomalies.get(event.userId) || [];
    if (event.metadata?.location && !userLocations.includes(event.metadata.location)) {
      userLocations.push(event.metadata.location);
      geoAnomalies.set(event.userId, userLocations);
      if (userLocations.length > 2) {
        flags.push("Login from multiple locations");
        score += 25;
      }
    }
  }

  // Check for unusual hours
  const hour = new Date(event.timestamp).getHours();
  if (hour >= 1 && hour <= 5) {
    flags.push("Activity during unusual hours");
    score += 15;
  }

  // Determine threat level
  let threatLevel: ThreatAssessment["threatLevel"] = "low";
  let action = "No action required. Continue monitoring.";

  if (score >= 80) {
    threatLevel = "critical";
    action = "BLOCK: Immediately suspend account and notify security team. Initiate full audit.";
    suspiciousIPs.add(event.ip);
  } else if (score >= 50) {
    threatLevel = "high";
    action = "WARN: Require additional verification. Flag account for review. Enable enhanced logging.";
  } else if (score >= 25) {
    threatLevel = "medium";
    action = "MONITOR: Increase monitoring frequency. Log all subsequent actions for 24 hours.";
  }

  return { threatLevel, score, flags, action };
}

export function getThreatStats() {
  return {
    totalIPsFlagged: suspiciousIPs.size,
    activeMonitors: voteVelocity.size,
    geoAnomalies: geoAnomalies.size,
  };
}

export function blockIP(ip: string) {
  suspiciousIPs.add(ip);
}

export function unblockIP(ip: string) {
  suspiciousIPs.delete(ip);
}

export function getBlockedIPs(): string[] {
  return Array.from(suspiciousIPs);
}