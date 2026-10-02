"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Share2,
  Lock,
  ExternalLink,
  Search,
  Zap,
  ArrowDown,
} from "lucide-react";

// ─── Real Client Video Showcases (Web Development) ───────────────────────────
const webShowcases = [
  {
    id: "biolife",
    title: "Biolife Storefront",
    client: "Biolife Nutrition",
    category: "Health & Wellness Platform",
    url: "biolife-nutrition.com/store",
    headline: "Ultra-Fast Headless Digital Storefront",
    challenge: "High cart abandonment and slow mobile loading speeds across their extensive wellness catalog.",
    solution: "Engineered an ultra-fast headless Next.js web application with sub-second page loads and seamless checkout.",
    description:
      "Designed and engineered for fluid product exploration with high-fidelity micro-interactions, sub-second global page loads, and frictionless conversion architecture.",
    metric: "+140% Increase in Online Orders",
    stat1: { label: "Page Load", val: "0.6s" },
    stat2: { label: "Lighthouse", val: "100/100" },
    stat3: { label: "Framerate", val: "60 FPS" },
    src: "/videos/Biolife Showcase.mp4",
    tags: ["Next.js 14", "Tailwind CSS", "Headless CMS", "Micro-Interactions"],
  },
  {
    id: "fortis",
    title: "Fortis Digital",
    client: "Fortis Group",
    category: "Corporate & SaaS Application",
    url: "fortis-agency.com/platform",
    headline: "High-Authority Corporate Experience",
    challenge: "Outdated legacy website lacking brand authority, speed, and mobile responsiveness.",
    solution: "Designed and developed a sleek corporate portal with 60fps micro-interactions and high-trust lead funnels.",
    description:
      "High-performance corporate web interface featuring sleek typography, engaging interactions, and high-trust client onboarding.",
    metric: "99/100 Performance & 3x Inquiries",
    stat1: { label: "Uptime", val: "99.9%" },
    stat2: { label: "Layout Shift", val: "0.00" },
    stat3: { label: "Security", val: "A+" },
    src: "/videos/Fortis Showcase.mp4",
    tags: ["React", "TypeScript", "Conversion Flow", "Speed Opt"],
  },
  {
    id: "rasa",
    title: "Rasa Experience",
    client: "Rasa Experience",
    category: "Hospitality & Lifestyle Experience",
    url: "rasa-experience.io/reserve",
    headline: "Immersive Visual Storytelling",
    challenge: "Heavy reliance on third-party aggregators leading to high commission fees on table bookings.",
    solution: "Created an immersive visual storefront allowing guests to reserve tables and browse menus directly.",
    description:
      "Immersive digital storefront built to showcase culinary elegance and drive direct client reservations through fluid, cinematic transitions.",
    metric: "+85% Direct Bookings",
    stat1: { label: "Visual Motion", val: "WebGL" },
    stat2: { label: "Mobile First", val: "100%" },
    stat3: { label: "Conversion", val: "+85%" },
    src: "/videos/Rasa Showcase.mp4",
    tags: ["WebGL 3D", "Brand Motion", "Mobile-First", "High Conversion"],
  },
];

// ─── Social Media Campaigns by Niche (Hostinger Reference Design) ────────────
const campaignCategories = [
  {
    id: "home-furniture",
    name: "Home & Furniture",
    title: "Home Furniture",
    paragraph1:
      "Transforming spaces into stunning visuals is our expertise. From sleek modern kitchens to elegant wall panels, we've created captivating designs that reflect style and functionality.",
    paragraph2:
      "Whether it's a bold furniture campaign or refined interior design showcases, our creative touch brings out the best in every piece for your audience.",
    pills: ["Content Creation", "Social Media Management"],
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
    title: "Energy & Solutions",
    paragraph1:
      "Powering brands in renewable energy and electrical engineering with high-impact visuals and high-converting lead generation creatives.",
    paragraph2:
      "From residential solar adoption campaigns to technical industrial hardware showcases, we translate complex engineering into clean, customer-ready social assets.",
    pills: ["Content Creation", "Social Media Management"],
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
    title: "Food & Beverages",
    paragraph1:
      "Crafting mouthwatering visual identities and viral campaigns that turn casual scrollers into loyal customers and repeat store visits.",
    paragraph2:
      "From artisan rolled ice creams and seasonal holiday specials to signature creamy boba drinks, our dynamic social media creatives capture flavor, sweetness, and fun in every frame.",
    pills: ["Content Creation", "Social Media Management"],
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

  const flagship = webShowcases[0];
  const secondaryWeb = webShowcases.slice(1);
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

      <section id="portfolio" className="py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-neon/[0.03] rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-3 px-4 py-1.5 rounded-full glass-panel border border-neon/25">
              Case Studies &amp; Client Work
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Featured Projects
            </h2>
            <p className="text-base text-dark-muted max-w-2xl font-normal">
              Explore our live web development showcases and client creative campaigns. No placeholders — real production work delivered to clients.
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              PART 1: WEBSITE SHOWCASES (EXACTLY THE 3 AUTOPLAY VIDEOS)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neon/10 border border-neon/30 text-neon">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                    Featured Web Development Showcases
                  </h3>
                  <p className="text-xs text-dark-muted font-mono">
                    High-performance websites captured in continuous 60fps autoplay motion.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neon bg-neon/10 px-3 py-1 rounded-full border border-neon/20">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_8px_#79FC32]" />
                <span>SEAMLESS AUTOPLAY</span>
              </div>
            </div>

            {/* Flagship Widescreen Showcase (Biolife) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-neon/40 transition-all duration-500 mb-8 relative overflow-hidden group shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Sleek Browser Frame with Continuous Autoplay Video */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:border-neon/50 transition-colors">
                    <div className="px-4 py-2.5 bg-[#121316] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                        <div className="ml-3 hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1C1D22] border border-white/5 text-[10px] font-mono text-dark-muted">
                          <Lock className="w-2.5 h-2.5 text-neon" />
                          <span>{flagship.url}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                        <span className="text-[10px] font-mono text-neon font-semibold tracking-wider">
                          LIVE PREVIEW
                        </span>
                      </div>
                    </div>

                    <div className="relative aspect-video bg-black overflow-hidden">
                      <video
                        src={flagship.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Project Dossier & Impact Metrics */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-neon uppercase tracking-wider">
                        {flagship.category}
                      </span>
                      <span className="text-xs font-mono text-dark-muted px-2.5 py-0.5 rounded-full bg-dark-card border border-white/10">
                        FLAGSHIP 01
                      </span>
                    </div>

                    <h4 className="font-display text-2xl sm:text-3xl font-black text-white mb-2">
                      {flagship.title}
                    </h4>

                    <div className="inline-block px-3 py-1 rounded-full bg-neon/10 border border-neon/30 text-neon font-mono text-xs font-bold mb-3 shadow-[0_0_15px_rgba(121,252,50,0.15)]">
                      ⚡ {flagship.metric}
                    </div>

                    <p className="text-xs sm:text-sm text-dark-muted leading-relaxed mb-5">
                      {flagship.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2.5 mb-5 p-3 rounded-2xl bg-dark-card/60 border border-white/5">
                      <div className="text-center">
                        <span className="font-display font-black text-base text-white block">
                          {flagship.stat1.val}
                        </span>
                        <span className="text-[10px] font-mono text-dark-muted uppercase">
                          {flagship.stat1.label}
                        </span>
                      </div>
                      <div className="text-center border-x border-white/10">
                        <span className="font-display font-black text-base text-neon block">
                          {flagship.stat2.val}
                        </span>
                        <span className="text-[10px] font-mono text-dark-muted uppercase">
                          {flagship.stat2.label}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-display font-black text-base text-white block">
                          {flagship.stat3.val}
                        </span>
                        <span className="text-[10px] font-mono text-dark-muted uppercase">
                          {flagship.stat3.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {flagship.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-dark-card text-neon border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Dual Panoramic Stage (Fortis & Rasa) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {secondaryWeb.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-neon/40 transition-all duration-500 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                >
                  <div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl mb-4 group-hover:border-neon/50 transition-colors">
                      <div className="px-3.5 py-2 bg-[#121316] border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <div className="ml-2 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1C1D22] border border-white/5 text-[9px] font-mono text-dark-muted">
                            <Lock className="w-2 h-2 text-neon" />
                            <span>{item.url}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                          <span className="text-[9px] font-mono text-neon font-semibold">
                            AUTOPLAY
                          </span>
                        </div>
                      </div>

                      <div className="relative aspect-video bg-black overflow-hidden">
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-neon uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-neon bg-neon/10 px-2 py-0.5 rounded-full border border-neon/20 font-semibold">
                        {item.metric}
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-black text-white mb-1.5 group-hover:text-neon transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-dark-muted leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-dark-card text-silver-light border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              BRIDGE SECTION: THE UNIFIED DIGITAL GROWTH ENGINE (CONNECTING WEB & SOCIAL)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="my-20 py-14 px-6 sm:px-10 rounded-3xl glass-panel border border-neon/30 relative overflow-hidden shadow-2xl">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon/[0.04] rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10">
              {/* Bridge Header */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon/10 border border-neon/30 text-neon font-mono text-xs font-bold uppercase tracking-wider mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  <span>The Connected Digital Engine</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                  From Social Attention to Web Conversion
                </h3>
                <p className="text-sm sm:text-base text-dark-muted leading-relaxed">
                  A high-performance website needs qualified traffic. Viral social media needs a frictionless platform to close sales. We build both together so your brand never loses a customer in the transition.
                </p>
              </div>

              {/* 3 Interconnected Flow Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-10">
                {/* Stage 1: Social Media Reach */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-2xl bg-dark-card/80 border border-white/10 hover:border-neon/40 transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center text-neon group-hover:scale-110 transition-transform">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-neon bg-neon/10 px-2.5 py-1 rounded-full border border-neon/20 font-bold">
                        STEP 01 • REACH
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-neon transition-colors">
                      Social Media Engine
                    </h4>
                    <p className="text-xs text-dark-muted leading-relaxed mb-4">
                      We craft high-retention reels, brand graphics, and targeted ads that stop the scroll and build genuine audience engagement across Instagram, TikTok &amp; Facebook.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-silver-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                    <span>Drives Qualified Organic &amp; Paid Traffic</span>
                  </div>
                </motion.div>

                {/* Stage 2: The Frictionless Bridge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="p-6 rounded-2xl bg-[#121316] border border-neon/40 shadow-[0_0_25px_rgba(121,252,50,0.1)] transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-neon text-[#0B0B0D] flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-[0_0_15px_#79FC32]">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-[#0B0B0D] bg-neon px-2.5 py-1 rounded-full font-bold">
                        STEP 02 • CONNECT
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      Frictionless Transit
                    </h4>
                    <p className="text-xs text-dark-muted leading-relaxed mb-4">
                      Direct campaign funnels, optimized bio links, and QR codes route interested social followers straight to your custom web pages without drop-off or confusion.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-neon font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                    <span>Zero Drop-Off Conversion Funnel</span>
                  </div>
                </motion.div>

                {/* Stage 3: Web & Systems Conversion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-6 rounded-2xl bg-dark-card/80 border border-white/10 hover:border-neon/40 transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center text-neon group-hover:scale-110 transition-transform">
                        <Monitor className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-neon bg-neon/10 px-2.5 py-1 rounded-full border border-neon/20 font-bold">
                        STEP 03 • CONVERT
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-neon transition-colors">
                      Web &amp; Business Systems
                    </h4>
                    <p className="text-xs text-dark-muted leading-relaxed mb-4">
                      Ultra-fast storefronts, intuitive reservation flows, and synced POS systems transform intrigued visitors into paid orders, booked tables, and repeat customers.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-silver-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                    <span>Orders, Revenue &amp; Operational Sync</span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Synergy Callout Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-dark-card/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-neon/10 border border-neon/30 text-neon shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-silver-light">
                    <strong className="text-white">Why it matters:</strong> Businesses that synchronize their social media creatives with custom websites see up to <span className="text-neon font-bold">3.4x higher conversion rates</span>.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-neon uppercase tracking-wider font-bold">
                  <span>Explore Social Creatives Below</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              PART 2: SOCIAL MEDIA SHOWCASE (HOSTINGER REFERENCE SPLIT VIEW)
              ══════════════════════════════════════════════════════════════════ */}
          <div className="pt-4">
            <div className="mb-10 text-center md:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neon mb-2 inline-block px-3 py-1 rounded-full bg-neon/10 border border-neon/25">
                Social Media Campaign Gallery
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                Client Creatives by Industry
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Stacked Categories */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                {campaignCategories.map((cat, idx) => {
                  const isActive = idx === activeSocialCategoryIndex;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveSocialCategoryIndex(idx)}
                      className={`w-full text-left px-6 py-4 rounded-xl font-display font-bold text-sm tracking-wide transition-all duration-300 ${
                        isActive
                          ? "bg-neon text-[#0B0B0D] shadow-[0_0_20px_rgba(121,252,50,0.35)] scale-[1.02]"
                          : "glass-panel text-white/80 hover:text-white hover:bg-dark-card border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Middle Column: Details & Service Pills */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full pr-0 lg:pr-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSocialCategory.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-display text-2xl sm:text-3xl font-black text-white mb-5 tracking-tight">
                      {activeSocialCategory.title}
                    </h4>

                    <p className="text-sm text-dark-muted leading-relaxed mb-4">
                      {activeSocialCategory.paragraph1}
                    </p>

                    <p className="text-sm text-dark-muted leading-relaxed mb-6">
                      {activeSocialCategory.paragraph2}
                    </p>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-neon tracking-wider uppercase transition-colors mb-8 group"
                    >
                      <span>More</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <div className="flex flex-col sm:flex-row gap-2.5">
                      {activeSocialCategory.pills.map((pill, pIdx) => (
                        <div
                          key={pIdx}
                          className={`px-4 py-2 rounded-full text-xs font-mono font-semibold text-center ${
                            pIdx === 0
                              ? "border border-cyan-400/40 text-cyan-300 bg-cyan-950/20"
                              : "border border-neon/50 text-neon bg-neon/10"
                          }`}
                        >
                          {pill}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: 2x2 Image Grid */}
              <div className="lg:col-span-5">
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
                        className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-neon/60 cursor-pointer bg-dark-card shadow-xl"
                      >
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:text-neon shadow-lg">
                            <Search className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-dark-muted opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.caption}
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
