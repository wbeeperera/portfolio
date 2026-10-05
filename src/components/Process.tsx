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
    <section id="process" className="section section-alt">
      <div className="container-x">

        <div className="section-header">
          <span className="eyebrow">Process</span>
          <h2 className="section-title">How we work</h2>
          <p className="section-lead">Five clear steps from first call to steady growth.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 120px 0px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/10"
            >
              <span className="font-display font-bold text-3xl text-white/40 block mb-5">
                {item.step}
              </span>
              <h3 className="font-display font-bold text-h3 text-white mb-2">
                {item.name}
              </h3>
              <p className="text-[15px] leading-relaxed text-dark-muted">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
