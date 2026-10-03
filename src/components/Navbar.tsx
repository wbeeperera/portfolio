"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "Plans", href: "#packages" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

const coreServices = ["Web", "Apps", "SEO", "POS"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-300 md:px-8 ${
        scrolled
          ? "border-b border-white/10 bg-[#0B0B0D]/88 py-3 shadow-2xl backdrop-blur-xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-neon/35 bg-[#15161B] font-display text-lg font-black text-neon shadow-[0_0_18px_rgba(121,252,50,0.16)] transition-transform group-hover:scale-105">
            E<span className="text-xs text-white">X</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-black tracking-[0.08em] text-white">
              EXOCIAL<span className="text-neon">.</span>AGENCY
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-muted">
              Web • Apps • SEO • POS
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#111217]/92 px-3 py-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-dark-muted transition-colors hover:bg-white/[0.06] hover:text-neon"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group hidden items-center gap-2 rounded-full bg-neon px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] shadow-[0_0_22px_rgba(121,252,50,0.35)] transition-all duration-300 hover:bg-neon-hover sm:inline-flex"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <button
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white lg:hidden"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-neon" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#111217]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="mb-4 grid grid-cols-4 gap-2">
              {coreServices.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em] text-neon"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-[0.15em] text-silver-light transition-colors hover:bg-white/[0.05] hover:text-neon"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              <a
                href="https://wa.me/94702251601"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-3 text-xs font-bold uppercase tracking-[0.14em] text-white"
              >
                <Phone className="h-3.5 w-3.5 text-neon" />
                <span>WhatsApp 070 225 1601</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-neon py-3 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] shadow-[0_0_18px_rgba(121,252,50,0.35)]"
              >
                Book a Strategy Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
