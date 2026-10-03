"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, PhoneCall } from "lucide-react";

const faqs = [
  {
    q: "How long does a website project take?",
    a: "A focused business website usually takes 2 to 4 weeks. Larger websites, custom dashboards, and integrations take longer depending on content, approvals, and feature complexity.",
  },
  {
    q: "Can you build mobile apps for my business?",
    a: "Yes. We can plan and build mobile app experiences for customers, staff, bookings, loyalty, reporting, and operational workflows. The first step is mapping the exact app journey.",
  },
  {
    q: "Do you handle SEO or only website design?",
    a: "We handle technical SEO, on-page structure, search-focused content planning, schema basics, analytics setup, and monthly improvement plans when needed.",
  },
  {
    q: "Can the POS system match how my shop or restaurant works?",
    a: "Yes. POS projects are scoped around your real workflow: products, stock, staff roles, receipts, branches, discounts, payments, and reports.",
  },
  {
    q: "Do you support the project after launch?",
    a: "Yes. We offer maintenance, updates, feature improvements, SEO support, and troubleshooting after launch.",
  },
  {
    q: "How do we get started?",
    a: "Send an enquiry or WhatsApp us. We will review your current digital setup and recommend the best first step for your website, app, SEO, or POS project.",
  },
];

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-neon">
            FAQs
          </span>
          <h2 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
            Questions before we build.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-dark-muted">
            Clear answers about timelines, mobile apps, SEO, POS systems, and support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#121318]/86"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:text-neon"
                >
                  <span className="font-display text-base font-black text-white sm:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className={`rounded-full border border-white/10 bg-black/35 p-1.5 text-neon transition-transform duration-300 ${
                      isOpen ? "rotate-180 border-neon/40 bg-neon/15" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-white/5 px-6 pb-6 pt-1 text-sm leading-7 text-dark-muted">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-neon/25 bg-neon/10 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neon/40 bg-neon/15 text-neon">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-lg font-black text-white">
                Want to discuss your exact build?
              </h4>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-dark-muted">
                WhatsApp us at <span className="text-neon">070 225 1601</span>
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/94702251601"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neon px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] transition-colors hover:bg-neon-hover"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
