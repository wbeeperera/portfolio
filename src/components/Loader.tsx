"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onFinish?: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            if (onFinish) onFinish();
          }, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#0B0B0D] p-8 md:p-16 select-none"
        >
          {/* Top Brand Tag */}
          <div className="w-full flex justify-between items-center text-xs tracking-widest uppercase text-dark-muted font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
              NEXUS DIGITAL STUDIO
            </span>
            <span>PORTFOLIO © 2026</span>
          </div>

          {/* Center Graphic & Progress */}
          <div className="flex flex-col items-center justify-center my-auto relative">
            <div className="relative w-36 h-36 flex items-center justify-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-neon/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-neon/60 border-t-neon border-b-transparent"
              />
              <span className="text-4xl font-extrabold font-display text-neon neon-text-glow">
                {progress}%
              </span>
            </div>

            <h2 className="text-xs md:text-sm tracking-[0.3em] font-mono font-medium text-white/90 uppercase text-center">
              Web Engineering &amp; Social Growth
            </h2>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-md">
            <div className="h-[2px] w-full bg-dark-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neon shadow-[0_0_12px_#79FC32]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-dark-muted mt-2 font-mono tracking-wider">
              <span>LOADING SYSTEMS</span>
              <span>READY TO DEPLOY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
