"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-10 sm:p-16 border border-neon/40 bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface text-center overflow-hidden shadow-[0_0_50px_rgba(121,252,50,0.12)]"
        >
          {/* Subtle Glow Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-neon/[0.08] rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neon/10 border border-neon/30 text-xs font-mono font-bold text-neon mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START YOUR JOURNEY</span>
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to take your business online?
            </h2>

            <p className="text-base sm:text-xl text-dark-muted mb-8 font-normal">
              Let&apos;s build something great together.
            </p>

            <a
              href="#contact"
              className="px-9 py-4 bg-neon text-[#0B0B0D] font-mono font-extrabold text-sm tracking-widest uppercase rounded-full shadow-[0_0_30px_rgba(121,252,50,0.4)] hover:bg-neon-hover hover:scale-105 transition-all duration-300 flex items-center gap-2"
              data-cursor-text="Connect"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
