// BallotChain Smart Contract Interface
// Deploy to Polygon Mumbai for testing

export const BALLOTCHAIN_CONTRACT = {
  address: "0x74247736434db2193dcc1d6047c03a43e630beb0", // Replace with deployed address
  abi: [
    // Create Election
    {
      inputs: [
        { name: "title", type: "string" },
        { name: "candidates", type: "string[]" },
        { name: "startTime", type: "uint256" },
        { name: "endTime", type: "uint256" },
      ],
      name: "createElection",
      outputs: [{ name: "electionId", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    // Cast Vote
    {
      inputs: [
        { name: "electionId", type: "uint256" },
        { name: "candidateId", type: "uint256" },
      ],
      name: "castVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    // Get Results
    {
      inputs: [{ name: "electionId", type: "uint256" }],
      name: "getResults",
      outputs: [
        { name: "candidateNames", type: "string[]" },
        { name: "voteCounts", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    // Get Voter Status
    {
      inputs: [
        { name: "electionId", type: "uint256" },
        { name: "voter", type: "address" },
      ],
      name: "hasVoted",
      outputs: [{ name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    // Events
    { name: "ElectionCreated", type: "event", inputs: [
      { indexed: true, name: "electionId", type: "uint256" },
      { indexed: false, name: "title", type: "string" },
      { indexed: false, name: "creator", type: "address" },
    ]},
    { name: "VoteCast", type: "event", inputs: [
      { indexed: true, name: "electionId", type: "uint256" },
      { indexed: true, name: "voter", type: "address" },
      { indexed: false, name: "candidateId", type: "uint256" },
    ]},
  ],
};

// NFT Voter Credential Contract
export const VOTER_NFT_CONTRACT = {
  address: "0x9fed3b5bac5b0f84616a2206fc2d35508deaa6e0",
  abi: [
    {
      inputs: [{ name: "voter", type: "address" }],
      name: "mintVoterCredential",
      outputs: [{ name: "tokenId", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ name: "tokenId", type: "uint256" }],
      name: "getVoterReputation",
      outputs: [{ name: "score", type: "uint256" }, { name: "electionsParticipated", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};