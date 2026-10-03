"use client";

import { motion } from "framer-motion";

const steps = [
  { step: "01", name: "Discover", desc: "We learn about your business and goals." },
  { step: "02", name: "Plan", desc: "We map out the design and features." },
  { step: "03", name: "Build", desc: "We design and develop your solution." },
  { step: "04", name: "Launch", desc: "We test thoroughly, then go live." },
  { step: "05", name: "Grow", desc: "We keep supporting and improving it." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/10"
            >
              <span className="font-display font-black text-2xl text-neon block mb-4">
                {item.step}
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-dark-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
