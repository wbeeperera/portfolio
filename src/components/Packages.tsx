"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Starter",
    desc: "For new businesses getting online.",
    features: [
      "Responsive website or social setup",
      "Basic SEO & mobile optimization",
      "Contact form & WhatsApp link",
      "Launch support",
    ],
    highlight: false,
  },
  {
    name: "Business",
    desc: "For growing brands that want steady leads.",
    features: [
      "Multi-page website or business system",
      "Monthly social media management",
      "Monthly performance reports",
      "Ongoing maintenance & backups",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    desc: "For established businesses scaling fast.",
    features: [
      "Custom web app & POS integration",
      "Full social media & paid ads",
      "Branding & visual identity",
      "Priority support",
    ],
    highlight: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Packages
          </h2>
          <p className="text-base text-dark-muted max-w-xl font-normal">
            Pick a starting point. Every package can grow with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`rounded-3xl p-8 flex flex-col justify-between relative ${
                pkg.highlight
                  ? "bg-dark-card border-2 border-neon"
                  : "glass-panel border border-white/10"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon text-[#0B0B0D] text-[11px] font-extrabold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-display font-black text-2xl text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed mb-6">
                  {pkg.desc}
                </p>

                <ul className="space-y-3 pt-6 border-t border-white/10 mb-8">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-silver-light">
                      <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all text-center ${
                  pkg.highlight
                    ? "bg-neon text-[#0B0B0D] hover:bg-neon-hover"
                    : "border border-white/15 text-white hover:border-neon hover:text-neon"
                }`}
              >
                Request a Quote
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
