"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Globe2,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
} from "lucide-react";

const showcases = [
  {
    id: "biolife",
    title: "Biolife Pharmaceuticals",
    category: "Healthcare Website",
    url: "https://biolifepharmalk.com/",
    src: "/videos/Biolife Showcase.mp4",
    headline: "A clean healthcare presence designed for credibility and quick contact.",
    focus: ["Website Development", "Responsive UI", "Product Navigation", "Trust-led Copy"],
    notes: [
      "Clear hero message for pharmaceutical credibility",
      "Product, careers, and contact paths kept simple",
      "Professional visual system for a regulated industry",
    ],
  },
  {
    id: "lakro",
    title: "Lakro Packaging",
    category: "Industrial Website",
    url: "https://lakropack.com/",
    src: "/videos/Rasa Showcase.mp4",
    headline: "A product-rich manufacturer site with direct navigation and quality proof.",
    focus: ["Website Development", "Technical Content", "SEO Structure", "Catalog UX"],
    notes: [
      "ISO certification and factory details visible early",
      "Product sections organized for industrial buyers",
      "Contact and map paths built for quick supplier enquiries",
    ],
  },
  {
    id: "fortis",
    title: "Fortis Sports Tours",
    category: "Travel Experience Platform",
    url: "https://fortis-sports.vercel.app/",
    src: "/videos/Fortis Showcase.mp4",
    headline: "A rich sports-tourism website with itinerary logic and immersive storytelling.",
    focus: ["Website Development", "UX Strategy", "Lead Flow", "Content Architecture"],
    notes: [
      "Sport-specific tour paths for faster discovery",
      "Strong visual storytelling for international audiences",
      "Enquiry journey built around team travel planning",
    ],
  },
];

const capabilityProof = [
  { icon: Globe2, label: "Performance websites" },
  { icon: Smartphone, label: "Mobile-ready journeys" },
  { icon: Search, label: "SEO architecture" },
  { icon: ShoppingCart, label: "POS and commerce logic" },
  { icon: ShieldCheck, label: "Support after launch" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-dark px-4 py-24 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <span className="mb-4 inline-flex rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-neon">
              Selected Work
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Real websites built for real business use.
            </h2>
          </div>
          <div className="lg:ml-auto">
            <p className="max-w-2xl text-base leading-8 text-dark-muted">
              Your portfolio should work like evidence. These builds show the range we want to emphasize: healthcare credibility, industrial product clarity, and premium tourism storytelling.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {capabilityProof.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-silver-light"
                >
                  <item.icon className="h-3.5 w-3.5 text-neon" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {showcases.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="grid grid-cols-1 gap-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#111217] shadow-2xl lg:grid-cols-12"
            >
              <div className="lg:col-span-7">
                <div className="border-b border-white/10 bg-black/70 px-4 py-3 lg:border-r">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B4A]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F8D66D]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neon" />
                    </div>
                    <span className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-dark-muted">
                      {item.url.replace("https://", "")}
                    </span>
                  </div>
                </div>
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="aspect-video w-full bg-black object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-neon/25 bg-neon/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neon">
                      {item.category}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-dark-border">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-black text-white">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-silver-light">{item.headline}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.focus.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-dark-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                    {item.notes.map((note) => (
                      <div key={note} className="flex items-start gap-3 text-sm text-dark-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition-all hover:border-neon/50 hover:text-neon"
                >
                  <span>View live site</span>
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[1.75rem] border border-[#49D3FF]/20 bg-[#49D3FF]/10 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#49D3FF]">
              Next build
            </p>
            <h3 className="mt-2 font-display text-2xl font-black text-white">
              Your site can become the strongest sales proof in this section.
            </h3>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-neon px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0B0B0D] transition-all hover:bg-neon-hover"
          >
            <span>Plan my project</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
