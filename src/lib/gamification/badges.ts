export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  condition: (stats: VoterStats) => boolean;
}

export interface VoterStats {
  totalVotes: number;
  consecutiveVotes: number;
  firstVoteDate?: string;
  verifiedCount: number;
  earlyVoter: boolean;
  crossElectionVoter: boolean;
}

export const badges: Badge[] = [
  {
    id: "first_vote",
    name: "First Vote",
    description: "Cast your first vote on BallotChain",
    icon: "🗳️",
    rarity: "common",
    condition: (stats) => stats.totalVotes >= 1,
  },
  {
    id: "five_votes",
    name: "Civic Champion",
    description: "Participated in 5 elections",
    icon: "🏆",
    rarity: "rare",
    condition: (stats) => stats.totalVotes >= 5,
  },
  {
    id: "consecutive_3",
    name: "Triple Streak",
    description: "Voted in 3 consecutive elections",
    icon: "🔥",
    rarity: "epic",
    condition: (stats) => stats.consecutiveVotes >= 3,
  },
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Voted within the first hour of an election opening",
    icon: "🐦",
    rarity: "rare",
    condition: (stats) => stats.earlyVoter,
  },
  {
    id: "verified_voter",
    name: "Verified Identity",
    description: "Completed identity verification",
    icon: "✅",
    rarity: "common",
    condition: (stats) => stats.verifiedCount >= 1,
  },
  {
    id: "cross_election",
    name: "Global Citizen",
    description: "Voted in elections across different organizations",
    icon: "🌍",
    rarity: "epic",
    condition: (stats) => stats.crossElectionVoter,
  },
  {
    id: "ten_votes",
    name: "Democracy Defender",
    description: "Participated in 10+ elections",
    icon: "🛡️",
    rarity: "legendary",
    condition: (stats) => stats.totalVotes >= 10,
  },
];

export function getEarnedBadges(stats: VoterStats): Badge[] {
  return badges.filter(badge => badge.condition(stats));
}

export function getBadgeColor(rarity: string): string {
  switch (rarity) {
    case "legendary": return "from-amber-300 to-orange-400";
    case "epic": return "from-violet-300 to-purple-400";
    case "rare": return "from-blue-300 to-cyan-400";
    default: return "from-emerald-300 to-teal-400";
  }
}
