"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Starter",
    tagline: "Ideal for new businesses",
    desc: "Basic website or social media setup, designed to establish a sharp, credible online presence quickly.",
    features: [
      "Modern responsive website OR basic social setup",
      "Essential SEO & mobile optimization",
      "Core contact form & WhatsApp link integration",
      "Initial brand profile & visual setup",
      "Standard launch support",
    ],
    highlight: false,
  },
  {
    name: "Business",
    tagline: "Most popular for growing brands",
    desc: "Full website or system with monthly social media management to steadily generate leads and attract customers.",
    features: [
      "Custom multi-page website OR operational system",
      "Monthly active social media management",
      "Weekly planned posts, stories & content calendar",
      "Basic community response & audience engagement",
      "Monthly performance reports & insights",
      "Ongoing technical maintenance & backups",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    tagline: "For established businesses scaling fast",
    desc: "Custom system, POS integration, full social media management and ad campaigns for complete digital leadership.",
    features: [
      "Custom web application & tailored POS system integration",
      "Comprehensive multi-platform social media strategy",
      "High-retention Reels, TikToks & viral video editing",
      "Targeted paid ad campaign setup & management",
      "Full branding & visual identity guidelines",
      "Priority 24/7 technical support & fast turnaround",
    ],
    highlight: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            Clear Service Tiers
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Service Packages
          </h2>
          <p className="text-base text-dark-muted max-w-xl font-normal">
            Transparent packages designed to fit your current stage and scale as your business grows.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.highlight
                  ? "bg-gradient-to-b from-dark-card to-dark-surface border-2 border-neon shadow-[0_0_35px_rgba(121,252,50,0.2)] md:-translate-y-2"
                  : "glass-panel border border-white/10 hover:border-white/25"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon text-[#0B0B0D] font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  ★ RECOMMENDED
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-black text-2xl text-white">
                    {pkg.name}
                  </h3>
                  <Sparkles className={`w-5 h-5 ${pkg.highlight ? "text-neon" : "text-dark-muted"}`} />
                </div>

                <p className="text-xs font-mono text-neon font-semibold mb-4">
                  {pkg.tagline}
                </p>

                <p className="text-xs text-dark-muted leading-relaxed mb-6">
                  {pkg.desc}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-silver-light">
                      <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    pkg.highlight
                      ? "bg-neon text-[#0B0B0D] shadow-[0_0_20px_rgba(121,252,50,0.35)] hover:bg-neon-hover hover:scale-[1.02]"
                      : "glass-panel text-white hover:border-neon hover:text-neon"
                  }`}
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
