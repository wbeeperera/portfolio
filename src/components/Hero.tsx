"use client";

import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ShinyText from "@/components/reactbits/ShinyText";
import SignalTransmission from "@/components/reactbits/SignalTransmission";
import IntroScene, { INTRO_CUES, INTRO_DURATION, STAGE_H, STAGE_W } from "@/components/intro/IntroScene";

// Serif used inside the animated mock screens
const cormorant = localFont({
  src: [
    { path: "../../public/fonts/CormorantGaramond-Variable.woff2", weight: "300 700", style: "normal" },
    { path: "../../public/fonts/CormorantGaramond-Italic-Variable.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const ACCENT = "#79FC32";
const INTRO_END = INTRO_CUES.Burst; // the opening float plays on load; scroll drives the rest

// Bounding box of the scene's settled frame, in stage pixels
const CONTENT = { top: 84, bottom: 729, left: 96, right: 1777 };

/**
 * Timeline: the opening float auto-plays once the preloader leaves, then scroll
 * progress through the pinned hero scrubs Burst → Stack → Return, eased so it glides.
 */
function useScrollTimeline(sectionRef: React.RefObject<HTMLElement>) {
  const [T, setT] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let started = false;
    let introStart = 0;
    let current = 0;
    let raf = 0;

    const begin = () => {
      if (!started) {
        started = true;
        setRevealed(true);
        introStart = performance.now();
      }
    };
    if ((window as Window & { __exocialLoaded?: boolean }).__exocialLoaded) begin();
    window.addEventListener("exocial:loaded", begin);
    const fallback = window.setTimeout(begin, 6000); // safety net; the loader normally fires this at ~3.5s

    const tick = (now: number) => {
      const el = sectionRef.current;
      let p = 0;
      if (el) {
        const scrollable = el.offsetHeight - window.innerHeight;
        p = scrollable > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / scrollable)) : 0;
      }
      const intro = started ? Math.min(INTRO_END, (now - introStart) / 1000) : 0;
      const target = p > 0 ? Math.max(intro, INTRO_END + p * (INTRO_DURATION - INTRO_END)) : intro;
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      setT((prev) => (Math.abs(prev - current) > 0.0001 ? current : prev));
      setProgress((prev) => (Math.abs(prev - p) > 0.001 ? p : prev));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("exocial:loaded", begin);
      window.clearTimeout(fallback);
    };
  }, [sectionRef]);

  return { T, progress, revealed };
}

/** Fit the 1920×1080 stage between the heading and the copy below it. */
function useStageFit() {
  const boxRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ s: 0.5, top: 0 });

  useEffect(() => {
    const box = boxRef.current, a = topRef.current, b = bottomRef.current;
    if (!box || !a || !b) return;
    const update = () => {
      const W = box.clientWidth;
      const headingBottom = a.offsetTop + a.offsetHeight;
      const regionBottom = b.offsetTop - Math.max(28, box.clientHeight * 0.05); // breathing room above the sub heading
      // let the devices overlap the bottom of the heading, like a magazine cover
      const overlap = Math.min(70, (regionBottom - headingBottom) * 0.12);
      const regionTop = headingBottom - overlap;
      const availH = Math.max(120, regionBottom - regionTop);
      const ch = CONTENT.bottom - CONTENT.top;
      const s = W >= 1024
        ? Math.min(availH / ch, (W * 0.98) / (CONTENT.right - CONTENT.left))
        : Math.min(availH / ch, W / 1150);
      const mid = (regionTop + regionBottom) / 2;
      setFit({ s, top: mid - ((CONTENT.top + CONTENT.bottom) / 2) * s });
    };
    update();
    const ro = new ResizeObserver(update);
    [box, a, b].forEach((n) => ro.observe(n));
    return () => ro.disconnect();
  }, []);

  return { boxRef, topRef, bottomRef, ...fit };
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { T, progress, revealed } = useScrollTimeline(sectionRef);
  const { boxRef, topRef, bottomRef, s, top } = useStageFit();

  // Step the copy aside while the site layers stack (they dip into its space), bring it back once they settle
  const { Stack, Return } = INTRO_CUES;
  const ease = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c); };
  const copyHidden = ease((T - (Stack + 0.05)) / 0.45) * (1 - ease((T - (Return + 0.9)) / 0.5));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`${cormorant.variable} relative h-[100svh] min-h-[600px] w-full bg-[#0B0B0D] md:h-[320vh]`}
    >
      <div ref={boxRef} className="sticky top-0 h-[100svh] min-h-[600px] w-full overflow-hidden">
        {/* Studio backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B0B0D_0%,#111114_50%,#0B0B0D_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_45%,rgba(220,224,232,0.06),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_70%,rgba(121,252,50,0.08),transparent_70%)]" />

        {/* Signal network — same as the Contact section, reacts to the pointer */}
        <SignalTransmission className="opacity-75" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(11,11,13,0.25)_0%,rgba(11,11,13,0.7)_80%,#0B0B0D_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />

        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col items-center px-6 pb-8 pt-24 text-center sm:pb-10 md:px-10">
          {/* Heading — sits behind the devices */}
          <motion.div
            ref={topRef}
            initial={{ opacity: 0, y: 30 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0 pt-2 sm:pt-4"
          >
            <h1 className="font-display text-[min(8.5vw,5.5vh)] font-black uppercase leading-[0.95] tracking-tight text-white [text-wrap:balance] sm:text-[min(6.5vw,6.5vh)] lg:text-[min(5.2vw,9vh,88px)]">
              <span className="block">We Build Digital Experiences</span>
              <span className="block">
                That <span className="text-neon"><ShinyText text="Grow Your Business" speed={3.2} /></span>
              </span>
            </h1>
          </motion.div>

          <div className="flex-1" />

          {/* Sub heading + actions */}
          <motion.div
            ref={bottomRef}
            initial={{ opacity: 0, y: 24 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative z-20"
          >
          <div
            className="flex flex-col items-center"
            style={{
              opacity: 1 - copyHidden,
              transform: `translateY(${copyHidden * 18}px)`,
              pointerEvents: copyHidden > 0.5 ? "none" : undefined,
            }}
          >
            <div className="pointer-events-none absolute -top-10 bottom-[-48px] left-1/2 -z-10 w-[100vw] -translate-x-1/2 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/85 to-transparent" />
            <p className="max-w-2xl text-base leading-7 text-silver-light sm:text-xl sm:leading-8">
              Websites, business systems and social media management, all under one roof.
            </p>
            <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:w-auto sm:flex-row sm:gap-3">
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-neon px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0B0B0D] shadow-[0_0_24px_rgba(121,252,50,0.18)] transition-all duration-300 hover:scale-[1.02] hover:bg-neon-hover sm:px-7 sm:py-4 sm:text-sm"
                data-cursor-text="Work"
              >
                <span>View Our Work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-black/40 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-neon/60 hover:bg-neon/10 sm:px-7 sm:py-4 sm:text-sm"
              >
                Get a Free Consultation
              </a>
            </div>
          </div>
          </motion.div>
        </div>

        {/* Animated stage — in front of the heading, behind the copy */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-10"
          style={{
            top,
            width: STAGE_W,
            height: STAGE_H,
            marginLeft: -STAGE_W / 2,
            transform: `scale(${s})`,
            transformOrigin: "50% 0",
          }}
        >
          <IntroScene T={T} accent={ACCENT} />
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_100%_at_50%_45%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />

        {/* Scroll cue */}
        <div
          className="pointer-events-none absolute bottom-6 right-5 z-20 hidden items-center gap-3 sm:flex text-[11px] font-bold uppercase tracking-[0.35em] text-silver-light/80 transition-opacity duration-500 sm:bottom-8 sm:right-8"
          style={{ opacity: progress < 0.97 ? 1 : 0 }}
        >
          <span>Scroll</span>
          <span className="relative h-8 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_1.6s_ease-in-out_infinite] bg-neon" />
          </span>
        </div>
      </div>
    </section>
  );
}
