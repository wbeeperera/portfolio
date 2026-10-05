"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark border-t border-white/5 py-14 px-6 md:px-10 text-dark-muted">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        <span className="font-display font-bold text-xl text-white tracking-wider">
          SERENOD<span className="text-neon">.</span>
        </span>

        <div className="flex flex-wrap items-center justify-center gap-8 text-[15px]">
          <a href="#about" className="hover:text-neon transition-colors">About</a>
          <a href="#services" className="hover:text-neon transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-neon transition-colors">Work</a>
          <a href="#contact" className="hover:text-neon transition-colors">Contact</a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full border border-white/10 text-white hover:border-neon hover:text-neon transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <p className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-center md:text-left text-sm text-dark-muted/70">
        © 2026 Serenod
      </p>
    </footer>
  );
}
