"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Platform: [
    { name: "Elections", href: "/dashboard/elections" },
    { name: "Real-Time Results", href: "/dashboard/results" },
    { name: "Voter Management", href: "/dashboard/voters" },
    { name: "Analytics", href: "/dashboard/reports" },
    { name: "API Documentation", href: "/docs" },
  ],
  Solutions: [
    { name: "Government", href: "/solutions/government" },
    { name: "Enterprise", href: "/solutions/enterprise" },
    { name: "Education", href: "/solutions/education" },
    { name: "Nonprofits", href: "/solutions/nonprofits" },
    { name: "Healthcare", href: "/solutions/healthcare" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "Compliance", href: "/compliance" },
    { name: "GDPR", href: "/gdpr" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                <span className="text-white font-black text-lg">B</span>
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                Ballot<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Chain</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              The world&apos;s most advanced voting platform. Enterprise-grade security, blockchain verification, and AI-powered fraud detection.
            </p>
            <div className="flex items-center gap-3">
              {["🐦", "💻", "💼", "📧"].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-110">{icon}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} BallotChain. All rights reserved. Built for free and fair elections worldwide.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> SOC 2 Type II Certified</span>
            <span className="mx-2">·</span>
            <span>99.99% Uptime SLA</span>
            <span className="mx-2">·</span>
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}