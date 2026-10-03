"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  HeadphonesIcon,
  Hotel,
  MapPin,
  ReceiptText,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Target,
  UtensilsCrossed,
} from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Strategy before screens",
    desc: "We connect every design choice to a business action: enquiry, booking, purchase, ranking, or report.",
  },
  {
    icon: CheckCircle2,
    title: "Custom builds, not recycled templates",
    desc: "Your site, app, or POS system is shaped around your brand, offers, customers, and workflow.",
  },
  {
    icon: ShieldCheck,
    title: "Professional execution",
    desc: "Clean UI, responsive behavior, secure setup, analytics, and launch checks are part of the delivery.",
  },
  {
    icon: Clock,
    title: "Fast, transparent delivery",
    desc: "You get clear phases, visible progress, and direct communication without confusing agency drama.",
  },
  {
    icon: ReceiptText,
    title: "Operations-aware systems",
    desc: "For POS and custom tools, we think through billing, inventory, user roles, reports, and daily usage.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support after launch",
    desc: "We stay available for updates, improvements, SEO changes, and system maintenance.",
  },
];

const industries = [
  { name: "Restaurants & Cafes", icon: UtensilsCrossed },
  { name: "Retail Shops", icon: ShoppingBag },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Hotels & Tourism", icon: Hotel },
  { name: "Education", icon: GraduationCap },
  { name: "Real Estate", icon: Building2 },
  { name: "Local Services", icon: MapPin },
  { name: "Startups & SMEs", icon: Rocket },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="mb-4 inline-flex rounded-full border border-[#FF6B4A]/30 bg-[#FF6B4A]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#FF6B4A]">
              Why Exocial
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Built for businesses that cannot afford digital confusion.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-dark-muted lg:ml-auto">
            Modern customers judge fast. We help you earn trust quickly, guide them cleanly, and run the backend without unnecessary complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-[1.5rem] border border-white/10 bg-[#121318]/86 p-6 transition-all duration-300 hover:border-neon/35"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-neon">
                <reason.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-black text-white">{reason.title}</h3>
              <p className="mt-3 text-sm leading-7 text-dark-muted">{reason.desc}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-14">
          <div className="mb-9 text-center">
            <span className="mb-4 inline-flex rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-neon">
              Industries
            </span>
            <h3 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Strong fit for service, retail, tourism, and growth-stage teams.
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {industries.map((industry, idx) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="flex min-h-[92px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <div className="rounded-xl border border-white/10 bg-black/35 p-2.5 text-neon">
                  <industry.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold leading-5 text-white">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
