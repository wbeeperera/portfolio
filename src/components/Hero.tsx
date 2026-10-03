"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
} from "lucide-react";
import ShinyText from "@/components/reactbits/ShinyText";

const serviceSignals = [
  { icon: Globe2, label: "Websites" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Search, label: "SEO" },
  { icon: ShoppingCart, label: "POS Systems" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-dark px-4 pt-28 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-neon/[0.06] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-silver-light"
        >
          <Sparkles className="h-3.5 w-3.5 text-neon" />
          <span>Built in Sri Lanka for modern brands</span>
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[76px]"
          >
            Websites,{" "}
            <span className="text-neon neon-text-glow">
              <ShinyText text="Apps, SEO" speed={3.2} />
            </span>
            <span className="block">&amp; POS Systems</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <p className="max-w-xl text-base leading-7 text-silver-light">
              We design and develop fast websites, mobile applications, SEO-ready growth engines, and POS systems for businesses that need to look sharp, sell smarter, and operate with less friction.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-neon px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] shadow-[0_0_28px_rgba(121,252,50,0.35)] transition-all duration-300 hover:bg-neon-hover hover:scale-[1.02]"
                data-cursor-text="Work"
              >
                <span>See Live Work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-neon/60 hover:bg-neon/10"
              >
                Book a Strategy Call
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Showcase video — plays once and holds on the final exploded-layers frame */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="relative mx-auto -mt-4 max-w-[1600px] sm:-mt-10 lg:-mt-24"
      >
        <video
          src="/videos/hero-showcase.mp4"
          poster="/images/hero-showcase-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="aspect-square w-full object-cover sm:aspect-video [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent),linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
        />

        <div className="relative z-10 -mt-6 flex flex-wrap justify-center gap-2 pb-10 sm:absolute sm:inset-x-0 sm:bottom-8 sm:mt-0 sm:gap-3 sm:px-4 sm:pb-0">
          {serviceSignals.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-silver-light backdrop-blur-md"
            >
              <item.icon className="h-4 w-4 text-neon" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
