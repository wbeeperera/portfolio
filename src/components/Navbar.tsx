"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "Packages", href: "#packages" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0B0D]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-dark-card border border-neon/30 flex items-center justify-center font-display font-black text-neon group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(121,252,50,0.15)]">
            E<span className="text-white text-xs">X</span>
          </div>
          <span className="font-display font-extrabold text-base tracking-wider text-white">
            EXOCIAL<span className="text-neon">.</span>AGENCY
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel rounded-full px-5 py-2 border border-white/10 shadow-2xl">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-3 py-1 text-xs tracking-wider uppercase text-dark-muted hover:text-neon transition-colors rounded-full hover:bg-neon/10 font-mono"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 bg-neon text-[#0B0B0D] font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(121,252,50,0.35)] hover:bg-neon-hover transition-all duration-300 font-mono"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl glass-panel text-white border border-white/10"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-neon" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-3 glass-panel rounded-2xl p-6 border border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-dark-muted hover:text-neon tracking-wider uppercase font-mono py-1"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="https://wa.me/94702251601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs text-white glass-panel py-2.5 rounded-full border border-white/10 font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-neon" />
                  <span>Call / WhatsApp: 070 225 1601</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-neon text-[#0B0B0D] font-bold text-xs tracking-wider uppercase py-3 rounded-full shadow-[0_0_15px_#79FC32] font-mono"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
