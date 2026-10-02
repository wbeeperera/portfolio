"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Our new website and online ordering setup made an immediate impact. Online inquiries jumped by 40% in the first two months, and the team made the entire process completely stress-free.",
    author: "Elena Rostova",
    business: "Biolife Nutrition",
    service: "Website Design & Front-End",
    rating: 5,
  },
  {
    quote: "Their social media management has been game-changing. Our Reels and posts consistently hit high reach, bringing new customers directly through our doors every week.",
    author: "Malik Fernando",
    business: "Frosties Creamery",
    service: "Social Media Management & Paid Ads",
    rating: 5,
  },
  {
    quote: "The custom POS and stock management system they built eliminated our daily billing headaches and inventory losses. Fast support and zero downtime since day one.",
    author: "David Perera",
    business: "Urban Dining & Café Network",
    service: "Custom Cloud POS System",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            Client Feedback
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-dark-muted max-w-xl font-normal">
            Real feedback from business owners and managers we&apos;ve helped succeed online.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative group shadow-xl"
            >
              <div>
                <Quote className="w-8 h-8 text-neon/30 mb-5 group-hover:text-neon/70 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-neon text-neon" />
                  ))}
                </div>
                <p className="text-sm text-silver-light leading-relaxed italic mb-8">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="font-display font-bold text-base text-white">
                  {t.author}
                </h4>
                <p className="text-xs font-mono text-neon">
                  {t.business}
                </p>
                <span className="text-[10px] font-mono text-dark-muted uppercase block mt-1">
                  // {t.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
