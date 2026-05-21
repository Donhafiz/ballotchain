import crypto from "crypto";

// Simulated blockchain anchoring service
// In production, integrate with Ethereum, Polygon, or a private chain

interface BlockchainReceipt {
  receipt: string;
  blockNumber: string;
  blockHash: string;
  transactionHash: string;
  timestamp: string;
  merkleRoot: string;
}

class BlockchainService {
  private chain: BlockchainReceipt[] = [];

  anchorVote(voterEmail: string, electionId: string, candidateName: string): BlockchainReceipt {
    // Create a deterministic but unique hash
    const data = `${voterEmail}:${electionId}:${candidateName}:${Date.now()}:${Math.random()}`;
    const receipt = "0x" + crypto.createHash("sha256").update(data).digest("hex");
    
    const blockNumber = (800000 + this.chain.length + 1).toString();
    const blockHash = "0x" + crypto.createHash("sha256").update(blockNumber + receipt).digest("hex");
    const transactionHash = "0x" + crypto.createHash("sha256").update(receipt + blockNumber + Date.now().toString()).digest("hex");
    
    // Generate merkle root from all receipts
    const merkleInput = [...this.chain.map(b => b.receipt), receipt].join("");
    const merkleRoot = "0x" + crypto.createHash("sha256").update(merkleInput).digest("hex");

    const anchor: BlockchainReceipt = {
      receipt,
      blockNumber,
      blockHash,
      transactionHash,
      timestamp: new Date().toISOString(),
      merkleRoot,
    };

    this.chain.push(anchor);
    
    return anchor;
  }

  verifyReceipt(receipt: string): BlockchainReceipt | null {
    return this.chain.find(b => b.receipt === receipt) || null;
  }

  getChainLength(): number {
    return this.chain.length;
  }

  getLatestBlock(): BlockchainReceipt | null {
    return this.chain.length > 0 ? this.chain[this.chain.length - 1] : null;
  }
}

export const blockchain = new BlockchainService();
