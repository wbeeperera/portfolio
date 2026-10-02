"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Squares from "@/components/reactbits/Squares";
import Particles from "@/components/reactbits/Particles";
import ShinyText from "@/components/reactbits/ShinyText";

export default function Hero() {
  // Smooth 3D mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D device tilt & translation
  const deviceRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const deviceRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const deviceTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const deviceTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);

  // Subtle counter-movement for background heading parallax
  const headingTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen min-h-[660px] max-h-[1080px] w-full flex flex-col items-center justify-between pt-20 pb-4 px-2 sm:px-4 md:px-8 overflow-hidden bg-dark"
    >
      {/* 1. Subtle High-Tech Background Grid */}
      <Squares
        direction="diagonal"
        speed={0.25}
        squareSize={56}
        borderColor="rgba(255, 255, 255, 0.025)"
        hoverFillColor="rgba(121, 252, 50, 0.08)"
      />

      {/* 2. Interactive Constellation Particles */}
      <Particles
        quantity={24}
        staticity={45}
        ease={50}
        color="#79FC32"
      />

      {/* 3. Deep Volumetric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-neon/[0.1] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-neon/[0.07] rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* 4. Top Heading (Directly behind top edge of laptop mockup, 100% centered horizontally) */}
      <motion.div
        style={{ y: headingTranslateY }}
        className="relative z-0 w-full max-w-5xl px-4 text-center pointer-events-none select-none pt-1 sm:pt-3"
      >
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          WE BUILD <span className="text-neon neon-text-glow italic"><ShinyText text="DIGITAL EXPERIENCES" speed={3.5} /></span>
        </h1>
      </motion.div>

      {/* 5. Centerpiece: Big 3D Laptop with Fanned Screens (Centered horizontally, prominent) */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center -mt-5 sm:-mt-8 md:-mt-11 [perspective:1400px]">
        <motion.div
          style={{
            rotateX: deviceRotateX,
            rotateY: deviceRotateY,
            x: deviceTranslateX,
            y: deviceTranslateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full max-w-[980px] lg:max-w-[1120px] xl:max-w-[1220px] 2xl:max-w-[1320px] h-[48vh] sm:h-[52vh] md:h-[55vh] max-h-[530px] flex items-center justify-center"
        >
          {/* Luminous Neon Floating Back-Bloom */}
          <div className="absolute inset-4 bg-neon/[0.2] rounded-full blur-[90px] pointer-events-none -z-10" />
          
          {/* Floor Shadow & Green Underglow */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[76%] h-[28px] bg-neon/35 rounded-full blur-[35px] pointer-events-none -z-10" />

          {/* 3D Mockup Image (Transparent PNG - Tightly cropped for maximum width & presence) */}
          <div className="relative w-full h-full">
            <Image
              src="/images/hero-centered-devices-tight.png"
              alt="Exocial 3D Laptop with Fanned Website Panels"
              fill
              priority
              className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(121,252,50,0.2)]"
            />
          </div>
        </motion.div>
      </div>

      {/* 6. Sub heading paragraph & Buttons (Positioned directly beneath the laptop keyboard deck) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center shrink-0 -mt-2 sm:-mt-4 pb-2"
      >
        {/* Sub heading paragraph */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-gray-300 font-normal leading-relaxed text-center max-w-lg mb-3 sm:mb-4">
          That grow your business. Websites, business systems and social media management, all under one roof — engineered to turn traffic into measurable revenue.
        </p>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#portfolio"
            className="px-6 sm:px-8 py-3 bg-neon text-[#0B0B0D] font-extrabold text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(121,252,50,0.35)] hover:bg-neon-hover hover:scale-105 transition-all duration-300 text-center font-mono flex items-center justify-center gap-2 group"
            data-cursor-text="Explore"
          >
            <span>View Our Work</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="px-6 sm:px-8 py-3 glass-panel text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full border border-white/15 hover:border-neon/60 hover:bg-dark-card transition-all duration-300 text-center font-mono"
          >
            Get a Free Consultation
          </a>
        </div>
      </motion.div>

    </section>
  );
}
