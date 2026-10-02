"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, HeartHandshake, Sparkles, Shield, Compass } from "lucide-react";

const values = [
  { name: "Quality", desc: "Engineered to perfection with speed, security, and responsive precision." },
  { name: "Reliability", desc: "Dependable business systems and consistent social media execution you can trust." },
  { name: "Creativity", desc: "Original visuals and modern interactive designs that stand out in crowded markets." },
  { name: "Transparency", desc: "Honest communication, clear timelines, and straightforward pricing with zero hidden fees." },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Pill & Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            About Our Agency
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 max-w-3xl">
            Helping Businesses Look Sharper, Work Smarter &amp; Grow Faster.
          </h2>
          <p className="text-base sm:text-lg text-dark-muted max-w-3xl leading-relaxed font-normal">
            We are a creative web design and social media agency that helps businesses look sharper, work smarter and grow faster. From customer-facing websites to the systems that run your daily operations, and the social media presence that brings customers to your door, we handle it all.
          </p>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-dark-surface to-dark-card flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon/[0.05] rounded-full blur-[100px] pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/30 text-xs font-mono font-bold text-neon mb-6">
                <Target className="w-4 h-4" />
                <span>OUR MISSION</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-4 leading-snug">
                Empowering Businesses With Modern Digital Power.
              </h3>

              <p className="text-sm sm:text-base text-dark-muted leading-relaxed mb-6">
                To give every business, big or small, the digital tools and online presence it needs to succeed.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-xs font-mono text-neon">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span>Tailored Solutions • Direct Communication</span>
            </div>
          </motion.div>

          {/* Values Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-neon font-bold">
                      VALUE 0{i + 1}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-neon" />
                  </div>
                  <h4 className="font-display font-black text-xl text-white mb-2">
                    {v.name}
                  </h4>
                  <p className="text-xs text-dark-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
