"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("button, a, input, textarea, [data-cursor]");
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor-text");
        setCursorText(customText || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden hidden md:block">
      {/* Outer Ring Spotlight */}
      <motion.div
        className="absolute rounded-full border border-neon/40 flex items-center justify-center transition-colors duration-200"
        animate={{
          x: mousePosition.x - (isHovered ? 36 : 16),
          y: mousePosition.y - (isHovered ? 36 : 16),
          width: isHovered ? 72 : 32,
          height: isHovered ? 72 : 32,
          backgroundColor: isHovered ? "rgba(121, 252, 50, 0.15)" : "rgba(0, 0, 0, 0)",
          borderColor: isHovered ? "rgba(121, 252, 50, 0.9)" : "rgba(121, 252, 50, 0.4)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.5 }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-wider text-neon uppercase px-1 text-center font-mono">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Solid Dot */}
      <motion.div
        className="absolute w-2 h-2 bg-neon rounded-full shadow-[0_0_8px_#79FC32]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 400, mass: 0.1 }}
      />
    </div>
  );
}
