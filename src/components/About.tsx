"use client";

import { motion } from "framer-motion";

const values = [
  { name: "Quality", desc: "Fast, secure and built to last." },
  { name: "Reliability", desc: "Systems and support you can count on." },
  { name: "Creativity", desc: "Original design that stands out." },
  { name: "Transparency", desc: "Clear timelines and honest pricing." },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 max-w-3xl">
            Look Sharper, Work Smarter, Grow Faster.
          </h2>
          <p className="text-base sm:text-lg text-dark-muted max-w-2xl leading-relaxed font-normal">
            We build the websites, business systems and social media presence that help businesses of every size succeed online.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/10"
            >
              <h3 className="font-display font-black text-xl text-white mb-2">
                {v.name}
              </h3>
              <p className="text-sm text-dark-muted leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
