"use client";

import { useEffect, useRef } from "react";
import SignalTransmission from "@/components/reactbits/SignalTransmission";

const SOFT = 0.3; // strength behind the middle sections
const FULL = 0.75; // strength once Contact is on screen

/** Site-wide signal network: kept soft behind the content, full strength at Contact. */
export default function SiteBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const layer = layerRef.current;
      const contact = document.getElementById("contact");
      if (!layer || !contact) return;
      // 0 while Contact is below the fold, 1 once its top reaches the middle of the screen
      const top = contact.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const t = Math.min(1, Math.max(0, (vh - top) / (vh * 0.5)));
      layer.style.opacity = String(SOFT + (FULL - SOFT) * t);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div ref={layerRef} className="absolute inset-0" style={{ opacity: SOFT }}>
        <SignalTransmission />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(11,11,13,0.3)_0%,rgba(11,11,13,0.85)_75%,#0B0B0D_100%)]" />
    </div>
  );
}
