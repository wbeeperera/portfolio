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
    <section id="about" className="section">
      <div className="container-x">

        {/* Split intro: stacked statement left, supporting copy right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <span className="eyebrow">About us</span>
            <h2 className="font-display text-display font-bold text-white">
              <span className="block font-semibold text-silver">Look Sharper,</span>
              <span className="block">Work Smarter,</span>
              <span className="block text-neon">Grow Faster.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-lead text-dark-muted max-w-xl lg:pb-3">
            We build the websites, business systems and social media presence that help businesses of every size succeed online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 120px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-7 rounded-2xl border border-white/10"
            >
              <h3 className="font-display font-bold text-h3 text-white mb-2">
                {v.name}
              </h3>
              <p className="text-base text-dark-muted">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
