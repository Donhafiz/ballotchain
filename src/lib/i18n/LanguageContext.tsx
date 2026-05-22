"use client";
import { useState, useEffect, createContext, useContext } from "react";

type Language = "en" | "tw" | "ga" | "ee" | "ha";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: { vote: "Vote", verify: "Verify", audit: "Audit", login: "Sign In", register: "Get Started", welcome: "Welcome", startFree: "Start for free", voteNow: "Vote Now" },
  tw: { vote: "To aba", verify: "Hwehwɛ mu", audit: "Akontaabu", login: "Kɔ mu", register: "Fa wo din kɔ", welcome: "Akwaaba", startFree: "Fi ase kwasi", voteNow: "To aba seesei" },
  ga: { vote: "Vootu", verify: "Tao", audit: "Sɛɛ", login: "Bɔɔ", register: "Ŋmaa", welcome: "Akwaba", startFree: "Jɛ shishi yaka", voteNow: "Vootu amrɔ" },
  ee: { vote: "Da akɔ", verify: "Kpɔe", audit: "Xlẽ", login: "Ge ɖe eme", register: "Ŋlɔ ŋkɔ", welcome: "Woezɔ", startFree: "Dze egɔme faa", voteNow: "Da akɔ fifia" },
  ha: { vote: "Zaɓe", verify: "Tabbatar", audit: "Dubawa", login: "Shiga", register: "Yi rijista", welcome: "Barka", startFree: "Fara kyauta", voteNow: "Yi zaɓe yanzu" },
};

const LanguageContext = createContext<LanguageContextType>({ language: "en", setLanguage: () => {}, t: (key) => key });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => translations[language]?.[key] || translations.en[key] || key;

  return <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
