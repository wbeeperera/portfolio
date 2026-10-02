"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  className?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  className = "",
  parentClassName = "",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimating = useRef(false);

  const startAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (sequential) {
              if (index < iteration / (maxIterations / text.length)) {
                return text[index];
              }
            } else {
              if (iteration >= maxIterations) {
                return text[index];
              }
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration > (sequential ? text.length * 3 : maxIterations)) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimating.current = false;
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view") {
      startAnimation();
    }
  }, [text, animateOn]);

  return (
    <span
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (animateOn === "hover" || animateOn === "view") {
          startAnimation();
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
