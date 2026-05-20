// Accessibility & Compliance System
// WCAG 2.2 AAA Standards

export const A11Y_CONFIG = {
  // Color contrast ratios (minimum 7:1 for AAA)
  contrastRatios: {
    normal: 7.0,
    large: 4.5,
  },
  
  // Focus indicators
  focusRing: "3px solid #6366F1",
  focusOffset: "2px",
  
  // Screen reader announcements
  ariaLive: "polite",
  
  // Keyboard navigation
  keyboardShortcuts: {
    dashboard: "Alt+D",
    elections: "Alt+E",
    voters: "Alt+V",
    results: "Alt+R",
    settings: "Alt+S",
    search: "Ctrl+K",
  },
  
  // Reduced motion
  reducedMotion: true,
  
  // Text spacing (WCAG 1.4.12)
  textSpacing: {
    lineHeight: 1.5,
    paragraphSpacing: 2,
    letterSpacing: 0.12,
    wordSpacing: 0.16,
  },
};

export const COMPLIANCE_CERTIFICATIONS = [
  {
    name: "SOC 2 Type II",
    description: "Security, availability, and confidentiality controls audited annually.",
    status: "active",
    lastAudit: "2026-01-15",
  },
  {
    name: "ISO 27001",
    description: "Information security management system certified.",
    status: "active",
    lastAudit: "2026-02-20",
  },
  {
    name: "GDPR Compliant",
    description: "Full compliance with EU data protection regulations.",
    status: "active",
    lastAudit: "2026-03-10",
  },
  {
    name: "WCAG 2.2 AAA",
    description: "Highest level of web accessibility compliance.",
    status: "active",
    lastAudit: "2026-04-05",
  },
  {
    name: "HIPAA Ready",
    description: "Healthcare data protection standards met.",
    status: "active",
    lastAudit: "2026-05-01",
  },
  {
    name: "FedRAMP",
    description: "Federal Risk and Authorization Management Program.",
    status: "in-progress",
    lastAudit: null,
  },
];

export const VPAT_DATA = {
  productName: "BallotChain",
  version: "4.0",
  reportDate: "2026-05-20",
  contact: "compliance@ballotchain.com",
  standards: {
    wcag: "2.2 AAA",
    section508: "Compliant",
    en301549: "Compliant",
  },
};