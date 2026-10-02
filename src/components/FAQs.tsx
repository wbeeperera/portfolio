"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Most websites take 2 to 4 weeks, depending on complexity. Custom systems and POS solutions may take longer.",
  },
  {
    q: "Can you build a system customized to my business?",
    a: "Yes. We design every in-house and POS system around how your business actually works.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We offer maintenance and support packages.",
  },
  {
    q: "Do you manage all my social media platforms?",
    a: "Yes. We manage Facebook, Instagram, TikTok and other platforms based on your needs.",
  },
  {
    q: "How do I get started?",
    a: "Call us or fill in the contact form, and we'll arrange a free consultation.",
  },
];

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-dark-muted max-w-xl font-normal">
            Clear answers about timelines, custom systems, and ongoing support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 transition-colors hover:text-neon"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-dark-card border border-white/10 text-neon transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-neon/20 border-neon/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-dark-muted leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Callout */}
        <div className="glass-panel p-6 rounded-2xl border border-neon/30 bg-neon/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-neon/15 border border-neon/40 flex items-center justify-center text-neon shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white">
                Have a specific question about your project?
              </h4>
              <p className="text-xs text-dark-muted font-mono">
                Call or WhatsApp us directly at <span className="text-neon font-bold">070 225 1601</span>
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/94702251601"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-neon text-[#0B0B0D] font-mono font-bold text-xs uppercase tracking-wider hover:bg-neon-hover shrink-0 shadow-md"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
