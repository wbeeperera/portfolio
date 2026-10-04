"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    <section id="faqs" className="section section-alt">
      <div className="container-x">

        <div className="section-header">
          <span className="eyebrow">FAQs</span>
          <h2 className="section-title">Questions, answered</h2>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 transition-colors hover:text-neon"
                >
                  <span className="font-display font-semibold text-lg sm:text-xl text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-dark-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-7 pt-0 text-base text-dark-muted max-w-[65ch]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
