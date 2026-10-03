"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Code2, Compass, LineChart, Rocket, Wand2 } from "lucide-react";

const steps = [
  {
    step: "01",
    name: "Audit",
    icon: ClipboardCheck,
    desc: "We review your current site, search visibility, user journey, and operational gaps.",
  },
  {
    step: "02",
    name: "Map",
    icon: Compass,
    desc: "We define pages, app flows, POS modules, SEO targets, and launch priorities.",
  },
  {
    step: "03",
    name: "Design",
    icon: Wand2,
    desc: "We create polished interfaces that feel premium, readable, and mobile-native.",
  },
  {
    step: "04",
    name: "Build",
    icon: Code2,
    desc: "We develop the website, app, or system with performance and maintainability in mind.",
  },
  {
    step: "05",
    name: "Launch",
    icon: Rocket,
    desc: "We test responsiveness, SEO basics, forms, analytics, and deployment before go-live.",
  },
  {
    step: "06",
    name: "Optimize",
    icon: LineChart,
    desc: "We keep improving based on search performance, customer behavior, and business feedback.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 text-center">
          <span className="mx-auto inline-flex rounded-full border border-[#F8D66D]/30 bg-[#F8D66D]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#F8D66D]">
            How We Work
          </span>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
            A clear sprint path from idea to launch.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-dark-muted">
            Every engagement is planned around what your business needs first, whether that is a conversion website, mobile app, SEO campaign, or POS workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((item, idx) => (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className="group rounded-[1.5rem] border border-white/10 bg-[#121318]/86 p-6 transition-all duration-300 hover:border-neon/35"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-4xl font-black text-dark-border transition-colors group-hover:text-neon">
                  {item.step}
                </span>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-3 text-neon">
                  <item.icon className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-display text-2xl font-black text-white">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-dark-muted">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
