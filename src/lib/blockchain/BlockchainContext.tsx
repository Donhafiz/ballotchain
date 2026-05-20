"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { ethers } from "ethers";
import { BALLOTCHAIN_CONTRACT, VOTER_NFT_CONTRACT } from "./contracts";

interface BlockchainContextType {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  ballotContract: ethers.Contract | null;
  voterNFT: ethers.Contract | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToPolygon: () => Promise<void>;
}

const BlockchainContext = createContext<BlockchainContextType>({} as BlockchainContextType);

// Polygon Mumbai Testnet
const POLYGON_MUMBAI = {
  chainId: "0x13881",
  chainName: "Polygon Mumbai",
  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  blockExplorerUrls: ["https://mumbai.polygonscan.com"],
};

export function BlockchainProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [ballotContract, setBallotContract] = useState<ethers.Contract | null>(null);
  const [voterNFT, setVoterNFT] = useState<ethers.Contract | null>(null);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use blockchain features!");
      return;
    }

    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      const accounts = await prov.send("eth_requestAccounts", []);
      const sign = await prov.getSigner();
      const network = await prov.getNetwork();

      setProvider(prov);
      setSigner(sign);
      setAddress(accounts[0]);
      setChainId(Number(network.chainId));

      const ballot = new ethers.Contract(BALLOTCHAIN_CONTRACT.address, BALLOTCHAIN_CONTRACT.abi, sign);
      const nft = new ethers.Contract(VOTER_NFT_CONTRACT.address, VOTER_NFT_CONTRACT.abi, sign);
      setBallotContract(ballot);
      setVoterNFT(nft);

      localStorage.setItem("wallet-connected", "true");
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  }, []);

  const disconnect = useCallback(() => {
    setProvider(null); setSigner(null); setAddress(null);
    setChainId(null); setBallotContract(null); setVoterNFT(null);
    localStorage.removeItem("wallet-connected");
  }, []);

  const switchToPolygon = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: POLYGON_MUMBAI.chainId }] });
    } catch (err: any) {
      if (err.code === 4902) {
        await window.ethereum.request({ method: "wallet_addEthereumChain", params: [POLYGON_MUMBAI] });
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("wallet-connected") === "true") connect();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => connect());
      window.ethereum.on("chainChanged", () => connect());
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, [connect]);

  return (
    <BlockchainContext.Provider value={{
      connected: !!address, address, chainId, provider, signer,
      ballotContract, voterNFT, connect, disconnect, switchToPolygon,
    }}>
      {children}
    </BlockchainContext.Provider>
  );
}

export const useBlockchain = () => useContext(BlockchainContext);

declare global {
  interface Window {
    ethereum?: any;
  }
}