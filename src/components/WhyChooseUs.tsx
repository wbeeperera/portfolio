"use client";

import { motion } from "framer-motion";

const reasons = [
  { title: "Built for you", desc: "Custom solutions, never templates." },
  { title: "One team", desc: "Website, systems and social media handled together." },
  { title: "Honest pricing", desc: "Clear quotes with no hidden fees." },
  { title: "Fast delivery", desc: "Quick turnaround and regular updates." },
  { title: "Support after launch", desc: "We stay with you long after go-live." },
  { title: "Local know-how", desc: "We understand your market and customers." },
];

const industries = [
  "Restaurants & Cafés",
  "Retail",
  "Salons & Spas",
  "Hotels & Tourism",
  "Healthcare",
  "Education",
  "Real Estate",
  "Startups",
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mb-20">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="border-l-2 border-neon/60 pl-5"
            >
              <h3 className="font-display font-bold text-lg text-white mb-1">
                {r.title}
              </h3>
              <p className="text-sm text-dark-muted leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="font-display text-xl sm:text-2xl font-black text-white mb-6">
            Industries We Serve
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full border border-white/10 text-sm text-silver-light"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
