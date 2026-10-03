"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Search } from "lucide-react";

const webShowcases = [
  {
    id: "biolife",
    title: "Biolife Storefront",
    category: "Health & Wellness",
    description: "A fast online store with smooth browsing and an easy checkout.",
    src: "/videos/Biolife Showcase.mp4",
  },
  {
    id: "fortis",
    title: "Fortis Digital",
    category: "Corporate",
    description: "A sleek corporate site built to earn trust and bring in inquiries.",
    src: "/videos/Fortis Showcase.mp4",
  },
  {
    id: "rasa",
    title: "Rasa Experience",
    category: "Hospitality",
    description: "An immersive site that lets guests browse menus and book tables directly.",
    src: "/videos/Rasa Showcase.mp4",
  },
];

const campaignCategories = [
  {
    id: "home-furniture",
    name: "Home & Furniture",
    desc: "Kitchens, wardrobes and wall panels shown at their best.",
    images: [
      { src: "/images/11-1.webp", caption: "Luxury Kitchen Interior", client: "HOK Home of Kitchens" },
      { src: "/images/16-1.webp", caption: "Wardrobe Furniture", client: "HOK Home of Kitchens" },
      { src: "/images/Decorative-Wall-Panels-1.webp", caption: "Decorative Wall Panels", client: "HOK Home of Kitchens" },
      { src: "/images/Plain-MDF-boards-1.webp", caption: "Plain MDF Boards", client: "HOK Home of Kitchens" },
    ],
  },
  {
    id: "energy-solutions",
    name: "Energy & Solutions",
    desc: "Clear, lead-driving visuals for solar and electrical brands.",
    images: [
      { src: "/images/SELTechSocials-1.webp", caption: "Make Your Roof Work For You!", client: "SELTech Solar" },
      { src: "/images/SELTechSocials_Square-6-1.webp", caption: "Harness the Power of the Sun", client: "SELTech Solar" },
      { src: "/images/boxy3-1.webp", caption: "Advanced Lightning Protection", client: "Boxy Electrical" },
      { src: "/images/SELTechSocials-1.webp", caption: "Solar Rooftop Systems", client: "SELTech Solar" },
    ],
  },
  {
    id: "food-beverages",
    name: "Food & Beverages",
    desc: "Colorful campaigns that turn scrollers into customers.",
    images: [
      { src: "/images/VHJFDX-1.webp", caption: "Swing Into Sweetness!", client: "Frosties Creamery" },
      { src: "/images/fdsjsdj.webp", caption: "The Ultimate Halloween Treat!", client: "Frosties Creamery" },
      { src: "/images/WhatsApp-Image-2024-10-16-at-3.20.21-PM.webp", caption: "Cookie and Cream Katty", client: "Frosties Creamery" },
      { src: "/images/SiteImages001.webp", caption: "Signature Creamy Boba", client: "Bubble Tea & Boba" },
    ],
  },
];

export default function Portfolio() {
  const [activeSocialCategoryIndex, setActiveSocialCategoryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string; client: string }>({
    src: "",
    caption: "",
    client: "",
  });

  const activeSocialCategory = campaignCategories[activeSocialCategoryIndex];

  const openLightbox = (img: { src: string; caption: string; client: string }) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md px-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-11 right-0 text-dark-muted hover:text-neon transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-7 h-7" />
              </button>

              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/20 bg-dark-card shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <Image src={lightboxImg.src} alt={lightboxImg.caption} fill className="object-contain" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-neon uppercase tracking-wider font-bold block">
                    {lightboxImg.client}
                  </span>
                  <span className="text-white text-base font-semibold block mt-0.5">
                    {lightboxImg.caption}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="portfolio" className="py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Our Work
            </h2>
            <p className="text-base text-dark-muted max-w-xl font-normal">
              Real projects delivered for real clients.
            </p>
          </div>

          {/* Websites */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-28">
            {webShowcases.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`group ${idx === 0 ? "lg:col-span-2" : ""}`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black mb-5 group-hover:border-neon/40 transition-colors">
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <span className="text-xs font-semibold text-neon uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Social media */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-10 text-center md:text-left">
              Social Media Work
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {campaignCategories.map((cat, idx) => {
                    const isActive = idx === activeSocialCategoryIndex;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveSocialCategoryIndex(idx)}
                        className={`text-left px-5 py-3 rounded-xl font-display font-bold text-sm transition-all duration-300 ${
                          isActive
                            ? "bg-neon text-[#0B0B0D]"
                            : "text-white/70 hover:text-white border border-white/10 hover:border-white/20"
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeSocialCategory.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm text-dark-muted leading-relaxed"
                  >
                    {activeSocialCategory.desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSocialCategory.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-2 gap-3 sm:gap-4"
                  >
                    {activeSocialCategory.images.map((img, imgIdx) => (
                      <motion.div
                        key={imgIdx}
                        onClick={() => openLightbox(img)}
                        whileHover={{ scale: 1.02 }}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-neon/60 cursor-pointer bg-dark-card"
                      >
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Search className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
