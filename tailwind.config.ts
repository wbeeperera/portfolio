import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0B0B0D",
          bg: "#0B0B0D",
          surface: "#131317",
          card: "#1A1B20",
          cardHover: "#22232A",
          border: "#282932",
          muted: "#A3A7AF",
          subtle: "#80858F",
        },
        neon: {
          DEFAULT: "#79FC32",
          hover: "#8CFF4C",
          dim: "#5EC825",
          glow: "rgba(121, 252, 50, 0.28)",
          subtle: "rgba(121, 252, 50, 0.12)",
        },
        silver: {
          DEFAULT: "#B3B3B3",
          light: "#E5E7EB",
          dark: "#4C4D4F",
        },
      },
      // Type scale: fluid sizes so headings shrink smoothly on small screens
      fontSize: {
        display: ["clamp(2.75rem, 6.5vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        h2: ["clamp(2.25rem, 4.2vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        h3: ["clamp(1.25rem, 1.6vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        lead: ["clamp(1.0625rem, 1.3vw, 1.25rem)", { lineHeight: "1.6" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      fontFamily: {
        sans: ["var(--font-nuvica)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "Clash Display", "var(--font-cabinet)", "Cabinet Grotesk", "sans-serif"],
        samthon: ["var(--font-clash)", "Clash Display", "sans-serif"],
        nuvica: ["var(--font-nuvica)", "Plus Jakarta Sans", "sans-serif"],
        clash: ["var(--font-clash)", "Clash Display", "sans-serif"],
        cabinet: ["var(--font-cabinet)", "Cabinet Grotesk", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
        "shine": "shine 4s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "0%": { "background-position": "200% 0" },
          "100%": { "background-position": "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
