"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-[#08080A] px-4 pb-12 pt-16 text-dark-muted md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="font-display text-xl font-black tracking-[0.08em] text-white">
            EXOCIAL<span className="text-neon">.</span>AGENCY
          </span>
          <p className="mt-2 max-w-sm text-sm leading-6 text-dark-muted">
            Website development, mobile applications, SEO, and POS system development for modern businesses.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-bold uppercase tracking-[0.14em]">
          <a href="#" className="hover:text-neon">Home</a>
          <a href="#services" className="hover:text-neon">Services</a>
          <a href="#portfolio" className="hover:text-neon">Work</a>
          <a href="#process" className="hover:text-neon">Process</a>
          <a href="#contact" className="hover:text-neon">Contact</a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-3 text-xs font-extrabold uppercase tracking-[0.16em] text-neon transition-all hover:border-neon hover:bg-white/[0.07]"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center text-[11px] uppercase tracking-[0.14em] text-dark-muted/65 sm:flex-row sm:text-left">
        <span>Copyright 2026 EXOCIAL AGENCY. All rights reserved.</span>
        <span>Web • Apps • SEO • POS</span>
      </div>
    </footer>
  );
}
