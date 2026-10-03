"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Online inquiries jumped by 40% in the first two months, and the whole process was stress-free.",
    author: "Elena Rostova",
    business: "Biolife Nutrition",
  },
  {
    quote: "Our reels and posts consistently reach new people, and those people walk through our doors every week.",
    author: "Malik Fernando",
    business: "Frosties Creamery",
  },
  {
    quote: "The POS system ended our daily billing headaches. Fast support and zero downtime since day one.",
    author: "David Perera",
    business: "Urban Dining & Café Network",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
            >
              <blockquote className="text-base text-silver-light leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption>
                <span className="font-display font-bold text-base text-white block">
                  {t.author}
                </span>
                <span className="text-sm text-dark-muted">
                  {t.business}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>
    </section>
  );
}
