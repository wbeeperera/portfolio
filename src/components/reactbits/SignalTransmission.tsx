"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

interface SignalTransmissionProps {
  className?: string;
  nodeCount?: number;
}

export default function SignalTransmission({
  className = "",
  nodeCount = 38,
}: SignalTransmissionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const mouse = { x: -9999, y: -9999, active: false };
    let ripples: { x: number; y: number; r: number; maxR: number; alpha: number }[] = [];

    // Initialize nodes
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.8,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Active data packets travelling between nodes
    const packets: Packet[] = [];
    const maxPackets = 14;

    const resize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 0,
        maxR: 260,
        alpha: 0.8,
      });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("click", handleClick);

    let animId: number;
    let time = 0;

    // Heartbeat radar pulses originating from left-center
    let radarPulseRadius = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Concentric Communication Radar Beacons (Left Anchor)
      const beaconX = width * 0.25;
      const beaconY = height * 0.5;

      radarPulseRadius += 0.6;
      if (radarPulseRadius > 380) radarPulseRadius = 0;

      for (let i = 0; i < 3; i++) {
        const r = (radarPulseRadius + i * 120) % 380;
        const alpha = Math.max(0, (1 - r / 380) * 0.14);
        ctx.beginPath();
        ctx.arc(beaconX, beaconY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(121, 252, 50, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Click Shockwave Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += 3.5;
        rip.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(121, 252, 50, ${rip.alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (rip.alpha < 0.02 || rip.r > rip.maxR) {
          ripples.splice(i, 1);
        }
      }

      // 3. Update & Draw Connection Lines between nodes
      const maxDistance = 150;
      const connectedPairs: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        const na = nodes[i];

        // Motion update
        na.x += na.vx;
        na.y += na.vy;

        // Bounce at boundaries
        if (na.x < 0 || na.x > width) na.vx *= -1;
        if (na.y < 0 || na.y > height) na.vy *= -1;

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - na.x;
          const dy = mouse.y - na.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const force = (1 - dist / 180) * 0.25;
            na.x += (dx / dist) * force;
            na.y += (dy / dist) * force;
          }
        }

        // Draw node links
        for (let j = i + 1; j < nodes.length; j++) {
          const nb = nodes[j];
          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.strokeStyle = `rgba(121, 252, 50, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            connectedPairs.push([i, j]);
          }
        }

        // Link to mouse cursor
        if (mouse.active) {
          const mdx = mouse.x - na.x;
          const mdy = mouse.y - na.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140) {
            const alpha = (1 - mDist / 140) * 0.35;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(121, 252, 50, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 4. Data Packets (Inquiry Signals) Travelling between connected nodes
      if (connectedPairs.length > 0 && packets.length < maxPackets && Math.random() < 0.08) {
        const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        packets.push({
          fromNode: pair[0],
          toNode: pair[1],
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
        });
      }

      for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
        const pkt = packets[pIdx];
        pkt.progress += pkt.speed;

        const na = nodes[pkt.fromNode];
        const nb = nodes[pkt.toNode];

        if (!na || !nb) {
          packets.splice(pIdx, 1);
          continue;
        }

        const px = na.x + (nb.x - na.x) * pkt.progress;
        const py = na.y + (nb.y - na.y) * pkt.progress;

        // Glowing packet dot
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#79FC32";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        if (pkt.progress >= 1) {
          packets.splice(pIdx, 1);
        }
      }

      // 5. Draw Glowing Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + n.pulsePhase);
        const glowRadius = n.radius + pulse * 1.5;

        // Outer glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(121, 252, 50, ${0.12 * pulse})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#79FC32";
        ctx.shadowColor = "#79FC32";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [nodeCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
