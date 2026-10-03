"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Globe2, Search, ShoppingCart, Smartphone } from "lucide-react";

const packages = [
  {
    name: "Website Launch",
    icon: Globe2,
    tagline: "For a modern online presence",
    desc: "A polished, responsive website built to make your brand credible and easy to contact.",
    accent: "text-neon",
    features: [
      "Custom homepage and service pages",
      "Mobile-first responsive design",
      "Contact, WhatsApp, and enquiry flows",
      "Core technical SEO setup",
      "Launch support and handover",
    ],
  },
  {
    name: "SEO Growth",
    icon: Search,
    tagline: "For visibility and organic leads",
    desc: "A focused SEO setup and improvement plan for businesses that want more search traffic.",
    accent: "text-[#F8D66D]",
    features: [
      "Technical SEO audit",
      "Keyword and competitor research",
      "On-page optimization",
      "Content structure recommendations",
      "Monthly reporting option",
    ],
  },
  {
    name: "POS System",
    icon: ShoppingCart,
    tagline: "For sales and inventory control",
    desc: "A tailored POS workflow for retail, restaurants, service counters, and stock-heavy businesses.",
    accent: "text-[#FF6B4A]",
    features: [
      "Billing and receipt workflow",
      "Product and stock management",
      "Cashier, admin, and branch roles",
      "Daily sales and inventory reports",
      "Training and support option",
    ],
  },
  {
    name: "Mobile App",
    icon: Smartphone,
    tagline: "For customer or staff experiences",
    desc: "A mobile application plan for businesses that need access beyond the website.",
    accent: "text-[#49D3FF]",
    features: [
      "App flow and UX planning",
      "Customer or staff app interface",
      "Backend and API integration",
      "Admin dashboard option",
      "Testing and release guidance",
    ],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-neon">
            Project Paths
          </span>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
            Start with the service your business needs most.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-dark-muted">
            Pricing depends on scope, integrations, content, and timeline. These paths make it easy to choose the right conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg, idx) => (
            <motion.article
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className="flex min-h-[520px] flex-col justify-between rounded-[1.75rem] border border-white/10 bg-[#121318]/86 p-6 transition-all duration-300 hover:border-neon/35"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className={`rounded-2xl border border-white/10 bg-black/35 p-3 ${pkg.accent}`}>
                    <pkg.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-dark-border">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-black text-white">{pkg.name}</h3>
                <p className={`mt-2 text-xs font-bold uppercase tracking-[0.18em] ${pkg.accent}`}>
                  {pkg.tagline}
                </p>
                <p className="mt-4 text-sm leading-7 text-dark-muted">{pkg.desc}</p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-silver-light">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.accent}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition-all hover:border-neon/50 hover:text-neon"
              >
                <span>Request quote</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
