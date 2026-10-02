"use client";

import { useEffect, useRef } from "react";

interface ParticlesProps {
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
  className?: string;
}

export default function Particles({
  quantity = 40,
  staticity = 40,
  ease = 45,
  color = "#79FC32",
  className = "",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const circles = useRef<
    Array<{
      x: number;
      y: number;
      translateX: number;
      translateY: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      dx: number;
      dy: number;
      magnetism: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const initCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasSize.current.w = rect.width;
      canvasSize.current.h = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        const x = Math.random() * canvasSize.current.w;
        const y = Math.random() * canvasSize.current.h;
        const size = Math.random() * 2 + 1;
        const alpha = Math.random() * 0.45 + 0.15;
        const dx = (Math.random() - 0.5) * 0.35;
        const dy = (Math.random() - 0.5) * 0.35;
        const magnetism = 0.1 + Math.random() * 3.5;
        circles.current.push({
          x,
          y,
          translateX: 0,
          translateY: 0,
          size,
          alpha,
          targetAlpha: alpha,
          dx,
          dy,
          magnetism,
        });
      }
    };

    initCanvas();
    window.addEventListener("resize", initCanvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const { clientX, clientY } = e;
      const x = clientX - rect.left - canvasSize.current.w / 2;
      const y = clientY - rect.top - canvasSize.current.h / 2;
      mouse.current.x = x;
      mouse.current.y = y;
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

      for (let i = 0; i < circles.current.length; i++) {
        const p1 = circles.current[i];
        const p1X = p1.x + p1.translateX;
        const p1Y = p1.y + p1.translateY;

        for (let j = i + 1; j < circles.current.length; j++) {
          const p2 = circles.current[j];
          const p2X = p2.x + p2.translateX;
          const p2Y = p2.y + p2.translateY;
          const dist = Math.hypot(p1X - p2X, p1Y - p2Y);

          if (dist < 105) {
            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(p2X, p2Y);
            ctx.strokeStyle = `rgba(121, 252, 50, ${(1 - dist / 105) * 0.14})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      circles.current.forEach((circle) => {
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x < 0) circle.x = canvasSize.current.w;
        if (circle.x > canvasSize.current.w) circle.x = 0;
        if (circle.y < 0) circle.y = canvasSize.current.h;
        if (circle.y > canvasSize.current.h) circle.y = 0;

        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        const posX = circle.x + circle.translateX;
        const posY = circle.y + circle.translateY;

        ctx.beginPath();
        ctx.arc(posX, posY, circle.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(121, 252, 50, ${circle.alpha})`;
        ctx.shadowColor = "#79FC32";
        ctx.shadowBlur = circle.size > 2 ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [quantity, staticity, ease, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    />
  );
}
