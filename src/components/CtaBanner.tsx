"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-dark px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-neon/35 bg-[#121318] p-8 shadow-[0_0_50px_rgba(121,252,50,0.1)] sm:p-12 lg:p-14"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-neon">
                <Sparkles className="h-3.5 w-3.5" />
                Build the next version
              </span>
              <h2 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                Ready to turn your website, app, SEO, or POS idea into a real build?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-dark-muted">
                Share what you want to improve. We will map the fastest path from current state to launch-ready digital product.
              </p>
            </div>

            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon px-8 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] shadow-[0_0_28px_rgba(121,252,50,0.35)] transition-all hover:bg-neon-hover sm:w-auto"
              data-cursor-text="Start"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
