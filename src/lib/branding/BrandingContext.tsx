"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface BrandingConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  organizationName: string;
  favicon: string;
}

const defaultBranding: BrandingConfig = {
  logo: "BC",
  primaryColor: "#6366F1",
  secondaryColor: "#8B5CF6",
  organizationName: "BallotChain",
  favicon: "🗳️",
};

const BrandingContext = createContext<{
  branding: BrandingConfig;
  updateBranding: (config: Partial<BrandingConfig>) => void;
}>({ branding: defaultBranding, updateBranding: () => {} });

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<BrandingConfig>(defaultBranding);

  useEffect(() => {
    const saved = localStorage.getItem("ballotchain-branding");
    if (saved) setBranding({ ...defaultBranding, ...JSON.parse(saved) });
  }, []);

  const updateBranding = (config: Partial<BrandingConfig>) => {
    const updated = { ...branding, ...config };
    setBranding(updated);
    localStorage.setItem("ballotchain-branding", JSON.stringify(updated));
    document.documentElement.style.setProperty("--brand-primary", updated.primaryColor);
    document.documentElement.style.setProperty("--brand-secondary", updated.secondaryColor);
  };

  return (
    <BrandingContext.Provider value={{ branding, updateBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export const useBranding = () => useContext(BrandingContext);