// ============================================
// PREMIUM LANDING PAGE COMPONENT
// PLACEMENT: src/components/pages/LandingPage.tsx
// ============================================

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('online');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    viewport: { once: true },
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="bg-white dark:bg-neutral-950 overflow-hidden">
      {/* ============ NAVIGATION ============ */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">VMS</span>
            </div>
            <span className="font-bold text-xl text-neutral-900 dark:text-white hidden sm:inline">
              Voting System
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="px-6 py-2 rounded-lg font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:inline-block"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-primary hover:shadow-lg hover:shadow-glow-primary transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-20 animate-pulse-subtle" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900 rounded-full blur-3xl opacity-20 animate-pulse-subtle" />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            animate="whileInView"
          >
            {/* Left Content */}
            <motion.div variants={staggerItem}>
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight"
                variants={fadeInUp}
              >
                Democratic Voting,{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Reimagined
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed"
                variants={staggerItem}
              >
                Enterprise-grade voting platform for universities, organizations, and
                governments. Secure, transparent, and built for millions of voters
                worldwide.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={staggerItem}
              >
                <Link
                  href="/register"
                  className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-glow-primary transition-all text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 border-2 border-neutral-300 dark:border-neutral-700 rounded-xl font-semibold text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all text-center"
                >
                  Learn More
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="mt-12 flex gap-8"
                variants={staggerItem}
              >
                {[
                  { label: 'Universities', value: '500+' },
                  { label: 'Voters', value: '5M+' },
                  { label: 'Uptime', value: '99.99%' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold text-primary-500">
                      {stat.value}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              className="relative h-96 md:h-full min-h-96"
              variants={staggerItem}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl blur-3xl" />
              <motion.div
                className="relative h-full flex items-center justify-center"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-full max-w-sm bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    Live Voting
                  </h3>
                  <div className="space-y-3">
                    {[
                      { candidate: 'Alice Johnson', votes: 1245, percent: 45 },
                      { candidate: 'Bob Smith', votes: 980, percent: 35 },
                      { candidate: 'Carol Davis', votes: 515, percent: 20 },
                    ].map((item) => (
                      <div key={item.candidate}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.candidate}</span>
                          <span className="text-sm font-semibold text-primary-500">
                            {item.percent}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              Enterprise Features
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Everything you need to run secure, transparent elections
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              {
                icon: '🔒',
                title: 'Military-Grade Security',
                description:
                  'End-to-end encryption, SSL/TLS, multi-factor authentication',
              },
              {
                icon: '📊',
                title: 'Real-Time Analytics',
                description:
                  'Live results, turnout tracking, detailed reporting and exports',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description:
                  'Handle millions of concurrent voters with 99.99% uptime',
              },
              {
                icon: '🌍',
                title: 'Global Scale',
                description:
                  'Multi-language support, timezone handling, international compliance',
              },
              {
                icon: '👥',
                title: 'Role-Based Access',
                description:
                  'Granular permissions for admins, officers, and voters',
              },
              {
                icon: '📱',
                title: 'Mobile Optimized',
                description:
                  'Responsive design for phones, tablets, and desktops',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-neutral-800 rounded-xl p-8 hover:shadow-lg transition-shadow"
                variants={staggerItem}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ VOTING METHODS SECTION ============ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              Flexible Voting Methods
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Choose the voting method that works best for your organization
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex gap-4 justify-center mb-12 flex-wrap"
            variants={staggerItem}
          >
            {['online', 'inperson', 'hybrid'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {tab === 'online' && '🌐 Online Voting'}
                {tab === 'inperson' && '🏢 In-Person Voting'}
                {tab === 'hybrid' && '🔄 Hybrid Voting'}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {activeTab === 'online' && (
                <>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    Online Voting
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Securely vote from anywhere with our web and mobile platform.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Vote from any device',
                      'Secure two-factor authentication',
                      'Real-time vote confirmation',
                      'Anonymous voting option',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="text-primary-500 font-bold">✓</span>
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'inperson' && (
                <>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    In-Person Voting
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Traditional voting with modern technology and transparency.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Digital ballot terminals',
                      'Voter verification system',
                      'Biometric authentication',
                      'Audit trail logging',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="text-primary-500 font-bold">✓</span>
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'hybrid' && (
                <>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    Hybrid Voting
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Combine online and in-person voting for maximum accessibility.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Unified voter registration',
                      'Cross-platform synchronization',
                      'Prevent double voting',
                      'Flexible scheduling',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="text-primary-500 font-bold">✓</span>
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <motion.div
              className="bg-gradient-primary/10 dark:bg-primary-900/20 rounded-2xl p-12 flex items-center justify-center min-h-96"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-6xl">
                {activeTab === 'online' && '💻'}
                {activeTab === 'inperson' && '🏛️'}
                {activeTab === 'hybrid' && '🔀'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={fadeInUp}
          >
            Ready to Transform Your Elections?
          </motion.h2>
          <motion.p
            className="text-xl opacity-90 mb-8"
            variants={fadeInUp}
          >
            Join 500+ organizations running secure, transparent, and inclusive elections
            with Voting Management System.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={staggerItem}
          >
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-primary-500 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Get Started Now
            </Link>
            <Link
              href="#"
              className="px-8 py-4 border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Schedule Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'Security', 'API'],
            },
            {
              title: 'Company',
              links: ['About', 'Blog', 'Careers', 'Contact'],
            },
            {
              title: 'Resources',
              links: ['Documentation', 'Guides', 'Support', 'Community'],
            },
            {
              title: 'Legal',
              links: ['Privacy', 'Terms', 'GDPR', 'Compliance'],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-400 hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 pt-8 flex justify-between items-center">
          <p className="text-neutral-400">
            © 2024 Voting Management System. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <a key={social} href="#" className="text-neutral-400 hover:text-white transition">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}