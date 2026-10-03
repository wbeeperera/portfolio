"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  TrendingUp,
  Database,
  Smartphone,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default function HeroDeviceMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse-tracking springs for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Parallax offsets for floating holographic cards
  const card1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const card1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  const card2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig);
  const card2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);

  const card3X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const card3Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);

  const card4X = useSpring(useTransform(mouseX, [-0.5, 0.5], [16, -16]), springConfig);
  const card4Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto my-8 select-none [perspective:1400px]"
    >
      {/* Ambient Neon Back-Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-neon/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Main 3D Tilting Stage */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-3xl overflow-visible transition-shadow duration-500"
      >
        {/* The 3D Laptop & Smartphone Master Image Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#141418] via-[#0B0B0D] to-[#0B0B0D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(121,252,50,0.12)]">
          {/* Top Window Chrome Bar */}
          <div className="px-5 py-3 bg-[#121316]/90 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-3 text-[11px] font-mono text-dark-muted hidden sm:inline">
                exocial.agency/showcase
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-neon bg-neon/10 px-2.5 py-0.5 rounded-full border border-neon/20 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
              <span>LIVE ECOSYSTEM</span>
            </div>
          </div>

          {/* Master 3D Device Scene Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            <Image
              src="/images/hero-device-mockup.jpg"
              alt="High-performance responsive website and systems on laptop and smartphone"
              fill
              priority
              className="object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
            />

            {/* Subtle Animated Neon Scanning Beam */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-neon/15 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Bottom Inner Shadow & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ─── 4 Interactive Floating 3D Holographic Panels ─────────────── */}

        {/* 1. Top-Left Holographic Card: Live Web Storefront */}
        <motion.div
          style={{ x: card1X, y: card1Y }}
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-6 -left-3 sm:-left-8 z-20 glass-panel p-3.5 sm:p-4 rounded-2xl border border-neon/40 bg-[#141418]/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(121,252,50,0.2)] max-w-[210px] sm:max-w-[240px] pointer-events-none sm:pointer-events-auto"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-neon/15 border border-neon/30 flex items-center justify-center text-neon">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-neon uppercase tracking-wider">
              High Conversion
            </span>
          </div>
          <h5 className="font-display font-bold text-xs sm:text-sm text-white mb-0.5">
            Headless Storefront
          </h5>
          <p className="text-[10px] text-dark-muted font-mono">
            0.6s Sub-second page load • 100/100 Lighthouse
          </p>
        </motion.div>

        {/* 2. Top-Right Holographic Card: Growth Metrics */}
        <motion.div
          style={{ x: card2X, y: card2Y }}
          animate={{
            y: [6, -6, 6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-6 -right-3 sm:-right-8 z-20 glass-panel p-3.5 sm:p-4 rounded-2xl border border-neon/40 bg-[#141418]/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(121,252,50,0.2)] max-w-[210px] sm:max-w-[240px] pointer-events-none sm:pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-bold text-neon uppercase tracking-wider">
              Social Engine
            </span>
            <span className="text-[10px] font-mono text-[#0B0B0D] bg-neon px-1.5 py-0.2 rounded font-bold">
              +140%
            </span>
          </div>
          <h5 className="font-display font-bold text-xs sm:text-sm text-white mb-0.5">
            Full-Funnel Reach
          </h5>
          <p className="text-[10px] text-dark-muted font-mono">
            Targeted reels, ads &amp; high-retention creatives
          </p>
        </motion.div>

        {/* 3. Bottom-Left Holographic Card: POS & Systems */}
        <motion.div
          style={{ x: card3X, y: card3Y }}
          animate={{
            y: [5, -5, 5],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-6 -left-3 sm:-left-6 z-20 glass-panel p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-[#121316]/95 backdrop-blur-xl shadow-2xl max-w-[210px] sm:max-w-[240px] pointer-events-none sm:pointer-events-auto"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Database className="w-3.5 h-3.5 text-neon" />
            </div>
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
              In-House Systems
            </span>
          </div>
          <h5 className="font-display font-bold text-xs sm:text-sm text-white mb-0.5">
            POS &amp; Operations
          </h5>
          <p className="text-[10px] text-dark-muted font-mono">
            Orders, staff &amp; billing in seamless real-time sync
          </p>
        </motion.div>

        {/* 4. Bottom-Right Holographic Card: Mobile Responsive & Direct Inquiries */}
        <motion.div
          style={{ x: card4X, y: card4Y }}
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-6 -right-3 sm:-right-6 z-20 glass-panel p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-[#121316]/95 backdrop-blur-xl shadow-2xl max-w-[210px] sm:max-w-[240px] pointer-events-none sm:pointer-events-auto"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-neon/15 flex items-center justify-center text-neon">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-neon uppercase tracking-wider">
              Mobile-First
            </span>
          </div>
          <h5 className="font-display font-bold text-xs sm:text-sm text-white mb-0.5">
            Frictionless UX
          </h5>
          <p className="text-[10px] text-dark-muted font-mono">
            Zero drop-off from social swipe to checkout
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
