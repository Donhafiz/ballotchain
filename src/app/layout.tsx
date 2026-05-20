import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store/AppContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "BallotChain - The Future of Democratic Voting",
  description: "The world's most advanced voting platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 font-sans antialiased">
        <AppProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}