import type { Metadata } from "next";
import "./globals.css";
import { BlockchainProvider } from "@/lib/blockchain/BlockchainContext";
import { RealtimeProvider } from "@/lib/realtime/RealtimeContext";
import { I18nProvider } from "@/lib/i18n/I18nContext";
import { BrandingProvider } from "@/lib/branding/BrandingContext";
import { ToastProvider } from "@/components/shared/Toast";
import { AppProvider } from "@/lib/store/AppContext";

export const metadata: Metadata = {
  title: "BallotChain - The Future of Democratic Voting",
  description: "Enterprise-grade voting platform with military-grade security, blockchain verification, and AI-powered fraud detection.",
  manifest: "/manifest.json",
  themeColor: "#6366F1",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366F1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script dangerouslySetInnerHTML={{ __html: `if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js"); }` }} />
      </head>
      <body className="min-h-screen bg-[#0a0a14] text-white antialiased">
        <BlockchainProvider><RealtimeProvider>
          <I18nProvider>
            <BrandingProvider>
              <ToastProvider>
                <AppProvider>
                  {children}
                </AppProvider>
              </ToastProvider>
            </BrandingProvider>
          </I18nProvider>
        </RealtimeProvider></BlockchainProvider>
      </body>
    </html>
  );
}