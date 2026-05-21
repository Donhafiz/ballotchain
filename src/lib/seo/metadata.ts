// SEO metadata configuration
export const siteConfig = {
  name: "BallotChain",
  title: "BallotChain — The Future of Democratic Voting",
  description: "Enterprise-grade blockchain voting trusted by governments, Fortune 500 companies, and universities across 127 countries. Secure, transparent, and verifiable by design.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://ballotchain.io",
  ogImage: "/og-image.png",
  twitterHandle: "@ballotchain",
  keywords: [
    "blockchain voting",
    "secure elections",
    "online voting platform",
    "democratic voting",
    "election security",
    "zero-knowledge proofs",
    "vote verification",
    "enterprise voting",
  ],
};

export function generateMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      site: siteConfig.twitterHandle,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
