"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "tw" | "ga" | "ee" | "ha";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: { vote: "Vote Now", signin: "Sign In", started: "Get Started", features: "Features", trust: "Trust", verify: "Verify", audit: "Audit" },
  tw: { vote: "To aba", signin: "Kɔ mu", started: "Fa wo din kɔ", features: "Nneɛma", trust: "Gyedie", verify: "Hwehwɛ mu", audit: "Akontaabu" },
  ga: { vote: "Vootu", signin: "Bɔɔ", started: "Ŋmaa", features: "Nibii", trust: "Hemɔkɛ", verify: "Tao", audit: "Sɛɛ" },
  ee: { vote: "Da akɔ", signin: "Ge ɖe eme", started: "Ŋlɔ ŋkɔ", features: "Nuɖuɖu", trust: "Dziɖuɖu", verify: "Kpɔe", audit: "Xlẽ" },
  ha: { vote: "Zaɓe", signin: "Shiga", started: "Yi rijista", features: "Fasali", trust: "Amana", verify: "Tabbatar", audit: "Dubawa" },
};

const LanguageContext = createContext<LanguageContextType>({ language: "en", setLanguage: () => {}, t: (key) => key });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("language") as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => translations[language]?.[key] || translations.en[key] || key;

  if (!mounted) return <>{children}</>;

  return <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
