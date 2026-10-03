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
    <section id="faqs" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            FAQs
          </h2>
        </div>

        <div className="space-y-4">
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
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-neon transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                      <div className="px-6 pb-6 pt-1 text-sm text-dark-muted leading-relaxed">
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
