"use client";

import { useRef, useEffect } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export default function Squares({
  direction = "diagonal",
  speed = 0.4,
  borderColor = "rgba(255, 255, 255, 0.05)",
  squareSize = 46,
  hoverFillColor = "rgba(121, 252, 50, 0.18)",
  className = "",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);
  const activeSquaresRef = useRef<Map<string, { x: number; y: number; opacity: number }>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor((mouseX - (gridOffset.current.x % squareSize)) / squareSize);
      const startY = Math.floor((mouseY - (gridOffset.current.y % squareSize)) / squareSize);

      hoveredSquareRef.current = { x: startX, y: startY };

      const key = `${startX}_${startY}`;
      activeSquaresRef.current.set(key, { x: startX, y: startY, opacity: 1 });

      [
        { dx: 1, dy: 0, op: 0.35 },
        { dx: -1, dy: 0, op: 0.35 },
        { dx: 0, dy: 1, op: 0.35 },
        { dx: 0, dy: -1, op: 0.35 },
      ].forEach(({ dx, dy, op }) => {
        const nKey = `${startX + dx}_${startY + dy}`;
        if (!activeSquaresRef.current.has(nKey)) {
          activeSquaresRef.current.set(nKey, { x: startX + dx, y: startY + dy, opacity: op });
        }
      });
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize;
      gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize;

      const numCols = Math.ceil(width / squareSize) + 2;
      const numRows = Math.ceil(height / squareSize) + 2;

      // Draw highlighted active squares in Neon Green
      activeSquaresRef.current.forEach((sq, key) => {
        const sqX = sq.x * squareSize + (gridOffset.current.x % squareSize);
        const sqY = sq.y * squareSize + (gridOffset.current.y % squareSize);

        ctx.fillStyle = `rgba(121, 252, 50, ${sq.opacity * 0.22})`;
        ctx.fillRect(sqX, sqY, squareSize, squareSize);

        ctx.strokeStyle = `rgba(121, 252, 50, ${sq.opacity * 0.7})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(sqX + 0.5, sqY + 0.5, squareSize - 1, squareSize - 1);

        sq.opacity -= 0.02;
        if (sq.opacity <= 0.01) {
          activeSquaresRef.current.delete(key);
        }
      });

      // Grid lines
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let col = -1; col < numCols; col++) {
        const x = col * squareSize + (gridOffset.current.x % squareSize);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let row = -1; row < numRows; row++) {
        const y = row * squareSize + (gridOffset.current.y % squareSize);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Tech intersection points
      ctx.fillStyle = "rgba(121, 252, 50, 0.25)";
      for (let col = 0; col < numCols; col += 2) {
        for (let row = 0; row < numRows; row += 2) {
          const x = col * squareSize + (gridOffset.current.x % squareSize);
          const y = row * squareSize + (gridOffset.current.y % squareSize);
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
