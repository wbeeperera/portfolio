"use client";

import { motion } from "framer-motion";
import { BarChart3, MessageSquareText, MonitorSmartphone, ReceiptText } from "lucide-react";

const proofPoints = [
  {
    icon: MonitorSmartphone,
    title: "Responsive by default",
    desc: "Every page is checked for mobile, tablet, and desktop layouts so the brand feels consistent everywhere.",
  },
  {
    icon: BarChart3,
    title: "Measurable traffic paths",
    desc: "SEO structure, analytics, and conversion sections are planned before launch, not added as an afterthought.",
  },
  {
    icon: ReceiptText,
    title: "Operations thinking",
    desc: "When we build POS and systems, we consider staff roles, stock movement, reporting, and daily usage.",
  },
  {
    icon: MessageSquareText,
    title: "Direct support",
    desc: "You work with a team that can explain technical choices in plain language and respond quickly.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full border border-[#49D3FF]/30 bg-[#49D3FF]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#49D3FF]">
            Delivery Standards
          </span>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
            The small details that make a build feel premium.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-dark-muted">
            Gen Z and millennial customers move fast. Your digital presence needs to load quickly, make sense instantly, and guide action without friction.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point, i) => (
            <motion.article
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-[1.5rem] border border-white/10 bg-[#121318]/86 p-6 transition-all duration-300 hover:border-[#49D3FF]/40"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-[#49D3FF]">
                <point.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-black text-white">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-dark-muted">{point.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
