"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Squares from "@/components/reactbits/Squares";
import ShinyText from "@/components/reactbits/ShinyText";

const serviceSignals = [
  { icon: Globe2, label: "Websites" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Search, label: "SEO" },
  { icon: ShoppingCart, label: "POS Systems" },
];

const proofStats = [
  { value: "3", label: "Live builds featured" },
  { value: "4", label: "Core growth services" },
  { value: "24h", label: "Fast consultation response" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-dark px-4 pb-14 pt-28 sm:px-6 lg:px-8"
    >
      <Squares
        direction="diagonal"
        speed={0.18}
        squareSize={62}
        borderColor="rgba(255, 255, 255, 0.035)"
        hoverFillColor="rgba(73, 211, 255, 0.08)"
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#49D3FF]/45 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-silver-light">
            <Sparkles className="h-3.5 w-3.5 text-neon" />
            <span>Built in Sri Lanka for modern brands</span>
          </div>

          <h1 className="font-display text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-[88px]">
            Websites,
            <span className="block text-neon neon-text-glow">
              <ShinyText text="Apps, SEO" speed={3.2} />
            </span>
            <span className="block text-white">&amp; POS Systems</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-silver-light sm:text-lg">
            We design and develop fast websites, mobile applications, SEO-ready growth engines, and POS systems for businesses that need to look sharp, sell smarter, and operate with less friction.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#portfolio"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-neon px-7 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] shadow-[0_0_28px_rgba(121,252,50,0.35)] transition-all duration-300 hover:bg-neon-hover hover:scale-[1.02]"
              data-cursor-text="Work"
            >
              <span>See Live Work</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-[#49D3FF]/70 hover:bg-[#49D3FF]/10"
            >
              Book a Strategy Call
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {serviceSignals.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#121318]/80 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-silver-light"
              >
                <item.icon className="h-4 w-4 text-neon" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-white/10 bg-[#101116]/95 p-3 shadow-2xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-black">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B4A]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F8D66D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neon">
                  Real Client Builds
                </span>
              </div>

              <div className="grid gap-3 p-3">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-dark">
                  <video
                    src="/videos/Biolife Showcase.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="aspect-video w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#49D3FF]">
                      Website Development
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-black text-white">
                      Biolife Storefront
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-dark">
                    <video
                      src="/videos/Rasa Showcase.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="aspect-video w-full object-cover"
                    />
                    <div className="border-t border-white/10 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F8D66D]">
                        Industrial Web
                      </p>
                      <h3 className="mt-1 font-display text-lg font-black text-white">
                        Lakro Packaging
                      </h3>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-dark">
                    <video
                      src="/videos/Fortis Showcase.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="aspect-video w-full object-cover"
                    />
                    <div className="border-t border-white/10 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon">
                        Tourism Platform
                      </p>
                      <h3 className="mt-1 font-display text-lg font-black text-white">
                        Fortis Sports
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center"
              >
                <div className="font-display text-2xl font-black text-white">{stat.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-dark-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#49D3FF]/20 bg-[#49D3FF]/10 p-4">
            <BarChart3 className="h-5 w-5 shrink-0 text-[#49D3FF]" />
            <p className="text-xs leading-5 text-silver-light">
              Strategy starts with the customer journey, then moves into design, performance, SEO, payments, reports, and operations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
