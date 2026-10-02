"use client";

import { motion } from "framer-motion";
import { Compass, FileSpreadsheet, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    name: "Discover",
    icon: Compass,
    desc: "We learn about your business, goals and customers.",
  },
  {
    step: "02",
    name: "Plan",
    icon: FileSpreadsheet,
    desc: "We map out the strategy, design and features.",
  },
  {
    step: "03",
    name: "Design & Build",
    icon: Code2,
    desc: "We create and develop your solution.",
  },
  {
    step: "04",
    name: "Test & Launch",
    icon: Rocket,
    desc: "We test thoroughly, then go live.",
  },
  {
    step: "05",
    name: "Support & Grow",
    icon: TrendingUp,
    desc: "We provide ongoing support and improvements.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            How We Work
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Our 5-Step Process
          </h2>
          <p className="text-base text-dark-muted max-w-xl font-normal">
            A straightforward, collaborative framework designed to turn your business goals into reliable digital realities.
          </p>
        </div>

        {/* 5-Step Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-2xl text-dark-border group-hover:text-neon transition-colors">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-dark-card text-neon border border-neon/20 group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-dark-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-dark-muted">
                <span>STEP {item.step}</span>
                <span className="text-neon font-semibold">✓</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
