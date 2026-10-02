"use client";

import { motion } from "framer-motion";
import {
  Code,
  Share2,
  CheckCircle2,
  Laptop,
  Database,
  Store,
  Settings,
  ShieldCheck,
  Video,
  Globe2,
  CalendarCheck,
  MessageCircle,
  Megaphone,
  Palette,
  BarChart3,
} from "lucide-react";

const webServices = [
  {
    icon: Laptop,
    title: "Customer Front-Ends",
    desc: "Modern, fast and mobile-friendly websites and web apps that turn visitors into customers.",
  },
  {
    icon: Database,
    title: "In-House Systems",
    desc: "Custom internal systems for managing staff, inventory, orders, reports and daily operations.",
  },
  {
    icon: Store,
    title: "POS Systems",
    desc: "Reliable point-of-sale systems for restaurants, cafés, retail shops and service businesses, with billing, stock tracking and sales reports.",
  },
  {
    icon: Settings,
    title: "Custom Web Applications",
    desc: "Tailor-made software built around your business needs.",
  },
  {
    icon: ShieldCheck,
    title: "Website Maintenance & Support",
    desc: "Updates, security, hosting and ongoing technical support.",
  },
];

const socialServices = [
  {
    icon: Video,
    title: "Content Creation",
    desc: "Posts, graphics, short videos, reels and stories designed around your brand.",
  },
  {
    icon: Globe2,
    title: "Page Management",
    desc: "Daily management of Facebook, Instagram, TikTok and more.",
  },
  {
    icon: CalendarCheck,
    title: "Content Calendar & Scheduling",
    desc: "Planned, consistent posting so your brand is always visible.",
  },
  {
    icon: MessageCircle,
    title: "Community Management",
    desc: "Replying to comments and messages and engaging with your audience.",
  },
  {
    icon: Megaphone,
    title: "Paid Ads & Promotions",
    desc: "Targeted ad campaigns that reach the right people.",
  },
  {
    icon: Palette,
    title: "Branding & Visual Identity",
    desc: "Logos, color palettes and brand guidelines.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Monthly performance reports with clear insights.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            What We Do
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Our Full-Spectrum Services
          </h2>
          <p className="text-base text-dark-muted max-w-2xl font-normal">
            Websites, business systems and social media management, all under one roof.
          </p>
        </div>

        {/* 2-Column Full Showcase (Identical Card Sizes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Pillar 1: Web Design & Development */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-neon/30 transition-all flex flex-col justify-between shadow-2xl"
          >
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-neon/10 text-neon border border-neon/30">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-white">
                      Web Design &amp; Development
                    </h3>
                    <p className="text-xs text-dark-muted font-mono">
                      Websites, Business Systems &amp; POS Solutions
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between gap-3">
                {webServices.map((srv, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-dark-card/60 border border-white/5 hover:border-neon/30 transition-colors flex items-start gap-3.5 group flex-1"
                  >
                    <div className="p-2 rounded-xl bg-[#0B0B0D] text-neon border border-white/10 group-hover:border-neon/40 shrink-0 mt-0.5">
                      <srv.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-neon transition-colors">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-dark-muted leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neon font-bold">
                ✓ Full-Stack Engineering &amp; Lifetime Support
              </span>
              <a
                href="#contact"
                className="text-xs font-mono font-bold text-white hover:text-neon underline tracking-wider uppercase"
              >
                Inquire Now
              </a>
            </div>
          </motion.div>

          {/* Pillar 2: Social Media Management */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-neon/30 transition-all flex flex-col justify-between shadow-2xl"
          >
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-neon/10 text-neon border border-neon/30">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-white">
                      Social Media Management
                    </h3>
                    <p className="text-xs text-dark-muted font-mono">
                      Content, Growth, Paid Ads &amp; Community
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between gap-2.5">
                {socialServices.map((srv, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-dark-card/60 border border-white/5 hover:border-neon/30 transition-colors flex items-start gap-3.5 group flex-1"
                  >
                    <div className="p-2 rounded-xl bg-[#0B0B0D] text-neon border border-white/10 group-hover:border-neon/40 shrink-0 mt-0.5">
                      <srv.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-neon transition-colors">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-dark-muted leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neon font-bold">
                ✓ Facebook • Instagram • TikTok • Multi-Platform
              </span>
              <a
                href="#contact"
                className="text-xs font-mono font-bold text-white hover:text-neon underline tracking-wider uppercase"
              >
                Inquire Now
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
