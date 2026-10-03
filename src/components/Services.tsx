"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Search,
  ShoppingCart,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Globe2,
    accent: "text-neon",
    border: "hover:border-neon/45",
    title: "Website Development",
    kicker: "Launch fast, convert better",
    desc: "High-performance websites and web apps designed for trust, speed, mobile behavior, and lead generation.",
    deliverables: [
      "Corporate websites and landing pages",
      "E-commerce and product catalogs",
      "Booking, enquiry, and payment flows",
      "CMS-ready content structure",
    ],
  },
  {
    icon: Smartphone,
    accent: "text-[#49D3FF]",
    border: "hover:border-[#49D3FF]/45",
    title: "Mobile Application Development",
    kicker: "iOS, Android, and customer portals",
    desc: "Clean mobile experiences for customers, staff, and operations, built around the workflows people actually use.",
    deliverables: [
      "Customer apps and dashboards",
      "Admin panels and staff workflows",
      "Push-ready product experiences",
      "API and backend integration",
    ],
  },
  {
    icon: Search,
    accent: "text-[#F8D66D]",
    border: "hover:border-[#F8D66D]/45",
    title: "SEO Growth",
    kicker: "Rank, measure, improve",
    desc: "Technical SEO, content structure, analytics, and search-focused pages that help the right customers find you.",
    deliverables: [
      "Technical SEO audits",
      "Keyword and competitor mapping",
      "On-page SEO and schema setup",
      "Monthly growth reports",
    ],
  },
  {
    icon: ShoppingCart,
    accent: "text-[#FF6B4A]",
    border: "hover:border-[#FF6B4A]/45",
    title: "POS System Development",
    kicker: "Sales, stock, billing, reports",
    desc: "Reliable POS and business systems for retail, restaurants, services, and inventory-heavy teams.",
    deliverables: [
      "Billing and cashier workflows",
      "Inventory and stock alerts",
      "Sales, branch, and staff reports",
      "Receipt, barcode, and payment support",
    ],
  },
];

const auditItems = [
  "Speed and mobile UX",
  "Search visibility",
  "Conversion paths",
  "Operations bottlenecks",
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="mb-4 inline-flex rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-neon">
              Core Services
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Digital products that sell and systems that run.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-dark-muted lg:ml-auto">
            We focus on the work that moves modern businesses forward: polished websites, mobile apps, SEO foundations, and POS systems that connect sales with day-to-day operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, idx) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`group rounded-[1.75rem] border border-white/10 bg-[#121318]/86 p-6 shadow-xl transition-all duration-300 ${service.border}`}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className={`rounded-2xl border border-white/10 bg-black/35 p-3 ${service.accent}`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-dark-muted">
                  0{idx + 1}
                </span>
              </div>

              <p className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${service.accent}`}>
                {service.kicker}
              </p>
              <h3 className="font-display text-2xl font-black text-white transition-colors group-hover:text-neon">
                {service.title}
              </h3>
              <p className="mt-3 min-h-[4rem] text-sm leading-7 text-dark-muted">
                {service.desc}
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-silver-light">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${service.accent}`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#49D3FF]">
              Free strategy audit
            </p>
            <h3 className="mt-2 font-display text-2xl font-black text-white">
              Not sure which service comes first?
            </h3>
            <p className="mt-3 text-sm leading-7 text-dark-muted">
              We review your current website, visibility, customer journey, and internal workflow before recommending the right build path.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {auditItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B0B0D]/65 px-4 py-3 text-sm font-semibold text-silver-light"
              >
                <span className="h-2 w-2 rounded-full bg-neon" />
                {item}
              </div>
            ))}
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 rounded-2xl bg-neon px-4 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-[#0B0B0D] transition-all hover:bg-neon-hover sm:col-span-2"
            >
              <span>Request the audit</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
