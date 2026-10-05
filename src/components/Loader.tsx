"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MARK_H, MARK_LEFT, MARK_RIGHT, MARK_W, MarkGradients } from "@/components/brand/SerenodMark";

/**
 * Serenod loader, ported from the "Serenode Loader" composition.
 * One time axis T (seconds) drives everything:
 *   Portal  0.0  glow arc rises; the two emblem panels slide in and lock
 *   Lockup  1.3  emblem shrinks into place as SERE and OD reveal outward
 *   Load    2.6  emblem breathes and a light sweep crosses it
 *   Reveal  3.5  curtain wipes up while the emblem flies into the navbar logo
 */
const CUES = { Portal: 0, Lockup: 1.3, Load: 2.6, Reveal: 3.5 };
const FLIGHT = 0.9;
const END = CUES.Reveal + FLIGHT;

type Ease = (t: number) => number;
const easeOutExpo: Ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutCubic: Ease = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
const easeOutCubic: Ease = (t) => (t - 1) ** 3 + 1;

function tween(from: number, to: number, start: number, end: number, ease: Ease) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}
const enter = (from: number, to: number, start: number, end: number) => tween(from, to, start, end, easeOutExpo);
const glide = (from: number, to: number, start: number, end: number) => tween(from, to, start, end, easeInOutCubic);

const FINAL_H = 220;
const BIG = 2.4;
const GAP = 30;
const EWF = (FINAL_H * MARK_W) / MARK_H;
const FONT = "var(--font-clash), 'Clash Display', sans-serif";
const PHRASES = ["SKETCHING WIREFRAMES", "KERNING HEADLINES", "POLISHING PIXELS", "WRITING CAPTIONS", "BUILDING BUZZ", "READY TO GO LIVE"];

const ARC = (r: number) => {
  const cx = -1400, cy = 2400;
  const a0 = -Math.asin((cy - 1160) / r), a1 = -Math.acos((cx + 60) / -r);
  const pt = (a: number): [number, number] => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
  return { d: `M ${x0} ${y0} A ${r} ${r} 0 0 0 ${x1} ${y1}`, at: (t: number) => pt(a0 + (a1 - a0) * t) };
};
const ARC_MAIN = ARC(2570), ARC_IN = ARC(2490), ARC_OUT = ARC(2650);

// Loading progress: quick to ~64%, a pause, then a confident finish
const progressAt = tween(0, 1, 0.2, CUES.Reveal - 0.05, (x) => {
  const a = easeOutCubic(Math.min(x / 0.5, 1)) * 0.64;
  const b = x > 0.6 ? easeInOutCubic((x - 0.6) / 0.4) * 0.36 : 0;
  return a + b;
});

function Emblem({ T, prog, calm }: { T: number; prog: number; calm: number }) {
  const lY = enter(-1100, 0, 0.1, 0.9)(T);
  const rY = enter(1100, 0, 0.25, 1.05)(T);
  const pulse = T > CUES.Load ? 0.5 + 0.5 * Math.sin(((T - CUES.Load) * Math.PI * 2) / 0.9 - Math.PI / 2) : 0;
  const glow = (glide(0, 1, 0.55, 1.0)(T) - glide(0, 0.55, CUES.Lockup, CUES.Lockup + 0.7)(T) + 0.3 * pulse) * (1 - calm);
  const shine = glide(-500, 900, CUES.Load + 0.2, CUES.Load + 0.9)(T);
  const filter = `drop-shadow(0 0 ${8 + 40 * glow}px rgba(110,255,40,${(0.25 + 0.5 * glow) * (1 - calm)}))`;
  const fillY = MARK_H + 20 - (MARK_H + 40) * prog;
  return (
    <svg viewBox={`0 0 ${MARK_W} ${MARK_H}`} width="100%" height="100%" overflow="visible">
      <defs>
        <MarkGradients idL="ldrL" idR="ldrR" />
        <linearGradient id="ldrS" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ldrC"><polygon points={MARK_LEFT} /><polygon points={MARK_RIGHT} /></clipPath>
        <clipPath id="ldrF"><rect x="-50" y={fillY} width={MARK_W + 100} height={MARK_H + 40} /></clipPath>
      </defs>
      {prog < 1 && (
        <g>
          <polygon points={MARK_LEFT} fill="#0a1a0b" stroke="#2f6b1f" strokeWidth="6" strokeLinejoin="round" transform={`translate(0 ${lY})`} />
          <polygon points={MARK_RIGHT} fill="#0a1a0b" stroke="#2f6b1f" strokeWidth="6" strokeLinejoin="round" transform={`translate(0 ${rY})`} />
        </g>
      )}
      <g style={{ filter }}>
        <g clipPath="url(#ldrF)">
          <polygon points={MARK_LEFT} fill="url(#ldrL)" stroke="url(#ldrL)" strokeWidth="10" strokeLinejoin="round" transform={`translate(0 ${lY})`} />
          <polygon points={MARK_RIGHT} fill="url(#ldrR)" stroke="url(#ldrR)" strokeWidth="10" strokeLinejoin="round" transform={`translate(0 ${rY})`} />
        </g>
        {prog > 0.005 && prog < 0.995 && (
          <rect x="-20" y={fillY - 3} width={MARK_W + 40} height="6" fill="#ecff80" clipPath="url(#ldrC)" />
        )}
      </g>
      <g clipPath="url(#ldrC)">
        <rect x={shine} y="-100" width="160" height="900" fill="url(#ldrS)" transform="skewX(-20)" />
      </g>
    </svg>
  );
}

function Letters({ text, T, start, dir, refEl }: { text: string; T: number; start: number; dir: 1 | -1; refEl: React.Ref<HTMLDivElement> }) {
  const chars = text.split("");
  return (
    <div ref={refEl} style={{ display: "flex", fontFamily: FONT, fontWeight: 700, fontSize: 168, color: "#f4f6f2", letterSpacing: "0.08em", lineHeight: 1 }}>
      {chars.map((ch, i) => {
        const order = dir < 0 ? chars.length - 1 - i : i;
        const t0 = start + order * 0.06;
        const p = enter(0, 1, t0, t0 + 0.55)(T);
        return (
          <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateX(${-dir * 70 * (1 - p)}px)`, filter: `blur(${(1 - p) * 8}px)` }}>
            {ch}
          </span>
        );
      })}
    </div>
  );
}

type Rect = { x: number; y: number; w: number; h: number }; // centre + size, in screen px

export default function Loader() {
  const [T, setT] = useState(0);
  const [done, setDone] = useState(false);
  const [vp, setVp] = useState({ w: 1920, h: 1080 });
  const [target, setTarget] = useState<Rect | null>(null);
  const sere = useRef<HTMLDivElement>(null);
  const od = useRef<HTMLDivElement>(null);
  const [lw, setLw] = useState({ s: 620, o: 340 });

  useLayoutEffect(() => {
    const measure = () => {
      if (sere.current && od.current) setLw({ s: sere.current.offsetWidth, o: od.current.offsetWidth });
    };
    measure();
    document.fonts?.ready.then(measure);
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now() - (reduced ? CUES.Load * 1000 : 0);
    let raf = 0;
    let siteRevealed = false;
    const w = window as Window & { __exocialLoaded?: boolean; __serenodLogoLanded?: boolean };

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      if (t >= CUES.Reveal && !siteRevealed) {
        siteRevealed = true;
        // the hero starts its own intro as the curtain lifts
        w.__exocialLoaded = true;
        window.dispatchEvent(new Event("exocial:loaded"));
      }
      if (t >= CUES.Reveal - 0.1) {
        const r = document.querySelector("[data-nav-logo]")?.getBoundingClientRect();
        setTarget(r && r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height } : null);
      }
      if (t >= END) {
        root.style.overflow = prevOverflow;
        w.__serenodLogoLanded = true;
        window.dispatchEvent(new Event("serenod:logo-landed"));
        setDone(true);
        return;
      }
      setT(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  // Stage: the composition is authored at 1920×1080; fit the lockup on any screen
  const s = Math.min(vp.w / 1300, vp.h / 1080);
  const ox = (vp.w - 1920 * s) / 2;
  const oy = (vp.h - 1080 * s) / 2;

  const total = lw.s + GAP + EWF + GAP + lw.o;
  const ex = 960 - total / 2 + lw.s + GAP + EWF / 2;
  const ey = 500;

  const move = glide(0, 1, CUES.Lockup - 0.15, CUES.Lockup + 0.7)(T);
  const sc = BIG + (1 - BIG) * move;
  const cx = 960 + (ex - 960) * move;
  const cy = 540 + (ey - 540) * move;
  const push = 1 + 0.03 * glide(0, 1, 0, CUES.Reveal)(T);

  const arcIn = enter(0, 1, 0, 1.2)(T);
  const arcDrift = glide(0, 1, 1.2, CUES.Reveal)(T);
  const arcX = -700 * (1 - arcIn) - 40 * arcDrift;
  const arcY = 700 * (1 - arcIn) + 30 * arcDrift;

  const prog = progressAt(T);
  const pct = Math.round(prog * 100);
  const fp = Math.min(prog, 0.999) * PHRASES.length;
  const pi = Math.floor(fp);
  const phraseIn = pi === 0 ? Math.min(1, Math.max(0, (T - 0.4) / 0.4)) : easeOutCubic(Math.min(1, (fp - pi) / 0.35));
  const uiIn = enter(0, 1, 0.3, 1.0)(T);
  const out = glide(0, 1, CUES.Reveal - 0.05, CUES.Reveal + 0.3)(T);
  const exit = glide(0, 1, CUES.Reveal + 0.1, CUES.Reveal + 0.75)(T);
  const arcPoint = ARC_MAIN.at(prog);

  // Emblem position on screen: follows the stage, then flies into the navbar logo
  const from: Rect = {
    x: ox + (ex + (cx - ex) * push) * s,
    y: oy + (ey + (cy - ey) * push) * s,
    w: EWF * sc * push * s,
    h: FINAL_H * sc * push * s,
  };
  const f = glide(0, 1, CUES.Reveal, END)(T);
  const lerp = (a: number, b: number) => a + (b - a) * f;
  const em: Rect = target ? { x: lerp(from.x, target.x), y: lerp(from.y, target.y), w: lerp(from.w, target.w), h: lerp(from.h, target.h) } : from;
  const emOpacity = target ? 1 : 1 - out;

  return (
    <div
      className="fixed inset-0 z-[100] select-none"
      style={{ pointerEvents: T < CUES.Reveal + 0.3 ? "auto" : "none" }}
      aria-hidden="true"
    >
      {/* Curtain: background, arc, wordmark and progress; wipes up to reveal the site */}
      <div className="absolute inset-0 overflow-hidden bg-[#030503]" style={{ transform: `translateY(${-100 * exit}%)` }}>
        <div style={{ position: "absolute", left: ox, top: oy, width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: "0 0" }}>
          <svg
            width="1920"
            height="1080"
            viewBox="0 0 1920 1080"
            overflow="visible"
            style={{ position: "absolute", inset: 0, opacity: arcIn * (1 - out), transform: `translate(${arcX}px, ${arcY}px)` }}
          >
            <path d={ARC_MAIN.d} fill="none" stroke="#8aff45" strokeOpacity="0.14" strokeWidth="1.5" />
            <path d={ARC_MAIN.d} fill="none" stroke="#8aff45" strokeWidth="2" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog} />
            <path d={ARC_IN.d} fill="none" stroke="#f4f6f2" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 14" />
            <path d={ARC_OUT.d} fill="none" stroke="#f4f6f2" strokeOpacity="0.1" strokeWidth="1" />
            <g transform={`translate(${arcPoint[0]} ${arcPoint[1]})`}>
              <circle r="7" fill="#030503" stroke="#8aff45" strokeWidth="2" />
              <circle r="2.5" fill="#8aff45" />
            </g>
          </svg>

          <div style={{ position: "absolute", inset: 0, opacity: 1 - out, transform: `translateY(${-40 * out}px) scale(${push})`, transformOrigin: `${ex}px ${ey}px` }}>
            <div style={{ position: "absolute", right: 1920 - (ex - EWF / 2 - GAP), top: ey + 6, transform: "translateY(-50%)" }}>
              <Letters text="SERE" T={T} start={CUES.Lockup + 0.3} dir={-1} refEl={sere} />
            </div>
            <div style={{ position: "absolute", left: ex + EWF / 2 + GAP, top: ey + 6, transform: "translateY(-50%)" }}>
              <Letters text="OD" T={T} start={CUES.Lockup + 0.3} dir={1} refEl={od} />
            </div>
          </div>
        </div>

        {/* Status phrase and counter, sized to the screen rather than the stage */}
        <div
          className="absolute flex items-baseline gap-4 whitespace-nowrap"
          style={{ left: "clamp(20px, 3.75vw, 72px)", bottom: "clamp(24px, 6vh, 64px)", opacity: uiIn * (1 - out), fontFamily: FONT, fontWeight: 600, fontSize: "clamp(11px, 1.05vw, 20px)", letterSpacing: "0.32em", color: "rgba(244,246,242,.8)" }}
        >
          <span className="text-[#8aff45]">/</span>
          <span className="inline-block overflow-hidden align-bottom" style={{ height: "1.2em" }}>
            <span className="inline-block" style={{ transform: `translateY(${(1 - phraseIn) * 100}%)`, opacity: phraseIn }}>
              {PHRASES[pi]}
            </span>
          </span>
        </div>
        <div
          className="absolute flex items-baseline gap-2"
          style={{ right: "clamp(20px, 3.75vw, 72px)", bottom: "clamp(18px, 5vh, 52px)", opacity: uiIn * (1 - out), fontFamily: FONT, fontWeight: 700, color: "#f4f6f2", fontVariantNumeric: "tabular-nums" }}
        >
          <span style={{ fontSize: "clamp(40px, 4.6vw, 88px)", letterSpacing: "-0.02em", lineHeight: 1 }}>{String(pct).padStart(3, "0")}</span>
          <span style={{ fontSize: "clamp(16px, 1.5vw, 28px)", color: "#8aff45" }}>%</span>
        </div>
      </div>

      {/* The emblem lives above the curtain so it can travel into the navbar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: em.w,
          height: em.h,
          opacity: emOpacity,
          transform: `translate(${em.x - em.w / 2}px, ${em.y - em.h / 2}px)`,
          willChange: "transform",
        }}
      >
        <Emblem T={T} prog={prog} calm={f} />
      </div>
    </div>
  );
}
