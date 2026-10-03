"use client";

import { motion } from "framer-motion";
import { Gauge, HeartHandshake, Layers3, ShieldCheck } from "lucide-react";

const principles = [
  {
    icon: Gauge,
    name: "Performance first",
    desc: "Fast pages, clean interactions, and responsive layouts built for impatient mobile users.",
  },
  {
    icon: Layers3,
    name: "Designed around journeys",
    desc: "Every page, app screen, and POS workflow is mapped to a real user action.",
  },
  {
    icon: ShieldCheck,
    name: "Built for long-term use",
    desc: "Reliable architecture, secure defaults, and support after launch keep the product useful.",
  },
  {
    icon: HeartHandshake,
    name: "Clear collaboration",
    desc: "Simple milestones, direct updates, and transparent recommendations from day one.",
  },
];

const outcomes = ["More enquiries", "Better search presence", "Cleaner operations", "Stronger brand trust"];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <span className="mb-4 inline-flex rounded-full border border-[#49D3FF]/30 bg-[#49D3FF]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#49D3FF]">
            About Exocial
          </span>
          <h2 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
            A product-minded digital team for ambitious local brands.
          </h2>
          <p className="mt-6 text-base leading-8 text-dark-muted">
            We help businesses turn scattered digital needs into one connected system: a strong website, a smooth mobile experience, search visibility, and tools that make daily operations easier.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {outcomes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-bold text-silver-light"
              >
                <span className="mb-2 block h-1 w-8 rounded-full bg-neon" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {principles.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-[1.5rem] border border-white/10 bg-[#121318]/86 p-6 transition-all duration-300 hover:border-neon/35"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-3 text-neon">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-dark-border">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-black text-white">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-dark-muted">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
