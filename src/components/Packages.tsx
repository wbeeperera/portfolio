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
    <section id="packages" className="section section-alt">
      <div className="container-x">

        <div className="section-header">
          <span className="eyebrow">Packages</span>
          <h2 className="section-title">Pick a starting point</h2>
          <p className="section-lead">
            Every package can grow with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 120px 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`rounded-3xl p-8 lg:p-10 flex flex-col justify-between relative ${
                pkg.highlight
                  ? "bg-dark-card border-2 border-neon"
                  : "glass-panel border border-white/10"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon text-[#0B0B0D] text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-h3 text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-base text-dark-muted mb-6">
                  {pkg.desc}
                </p>

                <ul className="space-y-3.5 pt-6 border-t border-white/10 mb-8">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[15px] text-silver-light">
                      <Check className="w-4 h-4 text-silver shrink-0 mt-1" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className={`w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all text-center ${
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
