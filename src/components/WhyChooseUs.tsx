"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Users2,
  DollarSign,
  Clock,
  HeadphonesIcon,
  MapPin,
  UtensilsCrossed,
  ShoppingBag,
  Sparkles,
  Hotel,
  Stethoscope,
  GraduationCap,
  Building2,
  Rocket,
} from "lucide-react";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Custom solutions built for your business, not templates",
    desc: "Every system, web app, and creative asset is handcrafted around your exact workflow and brand personality.",
  },
  {
    icon: Users2,
    title: "One team for your website, systems and social media",
    desc: "No juggling multiple freelancers or agencies. We handle your public presence, operational tech, and marketing together.",
  },
  {
    icon: DollarSign,
    title: "Affordable and transparent pricing",
    desc: "Clear upfront quotes with zero hidden charges or unexpected surprise bills.",
  },
  {
    icon: Clock,
    title: "Fast turnaround and clear communication",
    desc: "Quick sprint delivery, responsive WhatsApp & phone updates, and milestones met on time.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing support after launch",
    desc: "We stay with you long after deployment to provide technical maintenance, updates, and feature enhancements.",
  },
  {
    icon: MapPin,
    title: "Local understanding of the market",
    desc: "Deep awareness of local customer behavior, buying patterns, and communication styles.",
  },
];

const industries = [
  { name: "Restaurants & Cafés", icon: UtensilsCrossed },
  { name: "Retail Shops", icon: ShoppingBag },
  { name: "Salons & Spas", icon: Sparkles },
  { name: "Hotels & Tourism", icon: Hotel },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Education", icon: GraduationCap },
  { name: "Real Estate", icon: Building2 },
  { name: "Startups & Small Businesses", icon: Rocket },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            The Agency Difference
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Why Choose Us
          </h2>
          <p className="text-base text-dark-muted max-w-xl font-normal">
            Reliable digital execution built for real business growth.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-panel glass-panel-hover p-7 rounded-2xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center text-neon mb-4">
                  <r.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs text-dark-muted leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 7: Industries We Serve */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-2 inline-block px-3 py-1 rounded-full bg-neon/10 border border-neon/25">
              Specialized Expertise
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
              Industries We Serve
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((ind, idx) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex items-center gap-3.5 group cursor-default"
              >
                <div className="p-2.5 rounded-xl bg-[#0B0B0D] text-neon border border-white/10 group-hover:border-neon/40 transition-colors">
                  <ind.icon className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-sm text-white group-hover:text-neon transition-colors">
                  {ind.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
