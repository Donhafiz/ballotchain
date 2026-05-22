// Multi-language translations
export const translations: Record<string, Record<string, string>> = {
  en: {
    vote: "Vote",
    verify: "Verify",
    audit: "Audit",
    login: "Sign In",
    register: "Get Started",
    welcome: "Welcome",
    democracy: "Democracy deserves better infrastructure",
    startFree: "Start for free",
    voteNow: "Vote Now",
  },
  tw: {
    vote: "To aba",
    verify: "Hwehwɛ mu",
    audit: "Akontaabu",
    login: "Kɔ mu",
    register: "Fa wo din kɔ",
    welcome: "Akwaaba",
    democracy: "Demokrasi hia nneɛma papa",
    startFree: "Fi ase kwasi",
    voteNow: "To aba seesei",
  },
  ga: {
    vote: "Vootu",
    verify: "Tao",
    audit: "Sɛɛ",
    login: "Bɔɔ",
    register: "Ŋmaa",
    welcome: "Akwaba",
    democracy: "Demokrasi miita nɔ ni sa",
    startFree: "Jɛ shishi yaka",
    voteNow: "Vootu amrɔ",
  },
  ee: {
    vote: "Da akɔ",
    verify: "Kpɔe",
    audit: "Xlẽ",
    login: "Ge ɖe eme",
    register: "Ŋlɔ ŋkɔ",
    welcome: "Woezɔ",
    democracy: "Demokrasi hiã nyuie wu",
    startFree: "Dze egɔme faa",
    voteNow: "Da akɔ fifia",
  },
  ha: {
    vote: "Zaɓe",
    verify: "Tabbatar",
    audit: "Dubawa",
    login: "Shiga",
    register: "Yi rijista",
    welcome: "Barka",
    democracy: "Dimokuraɗiyya na buƙatar ingantattun ababen more rayuwa",
    startFree: "Fara kyauta",
    voteNow: "Yi zaɓe yanzu",
  },
};

// Usage: import { translations } from "@/lib/i18n/translations";
// const lang = "tw"; // from user preference
// const t = translations[lang] || translations.en;
// <h1>{t.democracy}</h1>
