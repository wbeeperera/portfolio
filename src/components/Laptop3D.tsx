"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ─── Generate Dynamic Screen Canvas Texture ──────────────────────────────────
function createScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background
  ctx.fillStyle = "#0A0B0E";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle background grid
  ctx.strokeStyle = "rgba(121, 252, 50, 0.08)";
  ctx.lineWidth = 1;
  const gridSize = 32;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Top Navigation Bar
  ctx.fillStyle = "#121318";
  ctx.fillRect(0, 0, canvas.width, 48);

  // Window Dots
  ctx.fillStyle = "#FF5F56";
  ctx.beginPath();
  ctx.arc(28, 24, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFBD2E";
  ctx.beginPath();
  ctx.arc(48, 24, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#79FC32";
  ctx.beginPath();
  ctx.arc(68, 24, 6, 0, Math.PI * 2);
  ctx.fill();

  // Search / URL Bar
  ctx.fillStyle = "#1A1B22";
  ctx.roundRect(160, 10, canvas.width - 320, 28, 8);
  ctx.fill();
  ctx.fillStyle = "#79FC32";
  ctx.font = "bold 12px monospace";
  ctx.fillText("https://serenod.agency", 180, 28);

  // Brand Header
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px sans-serif";
  ctx.fillText("SERENOD", 70, 140);

  ctx.fillStyle = "#79FC32";
  ctx.font = "bold 18px monospace";
  ctx.fillText("DIGITAL EXPERIENCES • BUSINESS SYSTEMS", 70, 175);

  // Main Hero Box inside Screen
  ctx.fillStyle = "rgba(20, 22, 28, 0.85)";
  ctx.strokeStyle = "rgba(121, 252, 50, 0.4)";
  ctx.lineWidth = 2;
  ctx.roundRect(70, 210, 520, 260, 16);
  ctx.fill();
  ctx.stroke();

  // Neon Chart Waveform
  ctx.beginPath();
  ctx.strokeStyle = "#79FC32";
  ctx.lineWidth = 4;
  ctx.shadowColor = "#79FC32";
  ctx.shadowBlur = 12;

  const points = [
    [90, 420],
    [160, 380],
    [230, 400],
    [300, 320],
    [370, 350],
    [440, 280],
    [510, 270],
    [560, 250],
  ];

  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();
  ctx.shadowBlur = 0; // reset

  // Chart Fill Gradient
  const grad = ctx.createLinearGradient(0, 250, 0, 450);
  grad.addColorStop(0, "rgba(121, 252, 50, 0.25)");
  grad.addColorStop(1, "rgba(121, 252, 50, 0.0)");
  ctx.fillStyle = grad;
  ctx.lineTo(560, 440);
  ctx.lineTo(90, 440);
  ctx.closePath();
  ctx.fill();

  // Stat Numbers
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText("+142% ROI", 100, 270);
  ctx.fillStyle = "#888899";
  ctx.font = "14px monospace";
  ctx.fillText("OPTIMIZED CONVERSION ENGINE", 100, 295);

  // Right Side Cards
  ctx.fillStyle = "rgba(25, 27, 35, 0.9)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;
  ctx.roundRect(620, 210, 330, 120, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#79FC32";
  ctx.font = "bold 14px monospace";
  ctx.fillText("✦ HIGH-CONVERTING WEBSITES", 645, 245);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "13px sans-serif";
  ctx.fillText("Tailored architecture engineered for speed.", 645, 275);
  ctx.fillText("0.2s load time • 100/100 Core Web Vitals", 645, 298);

  ctx.fillStyle = "rgba(25, 27, 35, 0.9)";
  ctx.strokeStyle = "rgba(121, 252, 50, 0.3)";
  ctx.lineWidth = 1;
  ctx.roundRect(620, 350, 330, 120, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#79FC32";
  ctx.font = "bold 14px monospace";
  ctx.fillText("✦ BESPOKE POS & SYSTEMS", 645, 385);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "13px sans-serif";
  ctx.fillText("Automated workflows & custom business portals.", 645, 415);
  ctx.fillText("Real-time cloud database synchronization.", 645, 438);

  // Bottom Status Bar
  ctx.fillStyle = "#121318";
  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
  ctx.fillStyle = "#79FC32";
  ctx.beginPath();
  ctx.arc(30, canvas.height - 20, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#AAAAAA";
  ctx.font = "12px monospace";
  ctx.fillText("ALL SYSTEMS OPERATIONAL • 99.98% UPTIME", 45, canvas.height - 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ─── Generate Holographic Floating Panel Texture ─────────────────────────────
function createHologramTexture(title: string, sub: string, code: string[]): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Semi-transparent dark background
  ctx.fillStyle = "rgba(11, 13, 18, 0.88)";
  ctx.roundRect(0, 0, canvas.width, canvas.height, 20);
  ctx.fill();

  // Glowing neon border
  ctx.strokeStyle = "#79FC32";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#79FC32";
  ctx.shadowBlur = 10;
  ctx.roundRect(2, 2, canvas.width - 4, canvas.height - 4, 18);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Header Bar
  ctx.fillStyle = "rgba(121, 252, 50, 0.12)";
  ctx.fillRect(4, 4, canvas.width - 8, 44);

  // Title
  ctx.fillStyle = "#79FC32";
  ctx.font = "bold 16px monospace";
  ctx.fillText(title, 24, 32);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 13px monospace";
  ctx.fillText(sub, 24, 80);

  // Code / detail lines
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.font = "12px monospace";
  code.forEach((line, i) => {
    if (line.includes("true") || line.includes("100%")) {
      ctx.fillStyle = "#79FC32";
    } else {
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    }
    ctx.fillText(line, 24, 115 + i * 26);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ─── 3D Laptop Model with Floating Holographic Panels ────────────────────────
function LaptopScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const screenTexture = useMemo(() => (typeof window !== "undefined" ? createScreenTexture() : null), []);

  const holo1Texture = useMemo(
    () =>
      typeof window !== "undefined"
        ? createHologramTexture("⚡ SYSTEM CORE", "ARCHITECTURE: REACT/NEXT", [
            "const app = buildAgency({",
            "  speed: '0.2s',",
            "  seo: '100%',",
            "  conversion: 'maximized'",
            "});",
          ])
        : null,
    []
  );

  const holo2Texture = useMemo(
    () =>
      typeof window !== "undefined"
        ? createHologramTexture("📊 GROWTH MATRIX", "LIVE REVENUE ANALYTICS", [
            "ROI: +142% Average",
            "Traffic: +280% organic",
            "Retention: 98.4%",
            "Status: SCALING",
          ])
        : null,
    []
  );

  // Mouse tilt tracking
  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth 3D tilt tracking with organic idle levitation
      const targetRotX = pointer.y * 0.28 + Math.sin(t * 0.5) * 0.04 - 0.15;
      const targetRotY = pointer.x * 0.38 + Math.cos(t * 0.4) * 0.05 + 0.35; // angled toward viewer

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    }
  });

  // Materials
  const chassisMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#16171D",
        metalness: 0.88,
        roughness: 0.25,
      }),
    []
  );

  const screenBezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#08080A",
        roughness: 0.6,
      }),
    []
  );

  const keyboardWellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0D0E12",
        metalness: 0.5,
        roughness: 0.6,
      }),
    []
  );

  const trackpadMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#181920",
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  const neonGlowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#79FC32",
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.22}>
      
      {/* ─── 1. LAPTOP BASE (Bottom Chassis) ────────────────────────── */}
      <group position={[0, 0, 0]}>
        {/* Main Aluminum Body */}
        <mesh material={chassisMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[3.8, 0.09, 2.5]} />
        </mesh>

        {/* Keyboard Recessed Well */}
        <mesh material={keyboardWellMaterial} position={[0, 0.048, -0.28]}>
          <boxGeometry args={[3.4, 0.01, 1.25]} />
        </mesh>

        {/* Individual Key Grid Deck (Textured dark keys) */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => {
            const width = col === 6 && row === 4 ? 1.0 : 0.2;
            const xOffset = -1.45 + col * 0.23;
            const zOffset = -0.75 + row * 0.23;
            if (col > 6 && row === 4) return null; // spacebar spacing
            return (
              <mesh
                key={`${row}-${col}`}
                position={[xOffset, 0.055, zOffset]}
                material={chassisMaterial}
              >
                <boxGeometry args={[width, 0.012, 0.18]} />
              </mesh>
            );
          })
        )}

        {/* Keyboard Neon Backlight Line */}
        <mesh position={[0, 0.049, -0.28]} material={neonGlowMaterial}>
          <planeGeometry args={[3.36, 1.2]} />
        </mesh>

        {/* Trackpad */}
        <mesh material={trackpadMaterial} position={[0, 0.048, 0.65]}>
          <boxGeometry args={[1.25, 0.005, 0.82]} />
        </mesh>

        {/* Trackpad Thin Border Outline */}
        <lineSegments position={[0, 0.052, 0.65]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.25, 0.005, 0.82)]} />
          <lineBasicMaterial color="#79FC32" transparent opacity={0.3} />
        </lineSegments>

        {/* Front Opening Notch */}
        <mesh material={chassisMaterial} position={[0, 0.035, 1.25]}>
          <boxGeometry args={[0.5, 0.03, 0.03]} />
        </mesh>
      </group>

      {/* ─── 2. HINGE ──────────────────────────────────────────────── */}
      <mesh material={chassisMaterial} position={[0, 0.045, -1.25]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 3.4, 16]} />
      </mesh>

      {/* ─── 3. SCREEN LID (Rotated Open ~110°) ─────────────────────── */}
      <group position={[0, 0.045, -1.25]} rotation={[-1.9, 0, 0]}>
        {/* Outer Aluminum Lid Back */}
        <mesh material={chassisMaterial} position={[0, 1.25, -0.03]}>
          <boxGeometry args={[3.8, 2.5, 0.06]} />
        </mesh>

        {/* Display Glass Bezel */}
        <mesh material={screenBezelMaterial} position={[0, 1.25, 0.002]}>
          <boxGeometry args={[3.72, 2.42, 0.01]} />
        </mesh>

        {/* Screen Display Active Area with Texture */}
        {screenTexture && (
          <mesh position={[0, 1.25, 0.01]}>
            <planeGeometry args={[3.55, 2.25]} />
            <meshStandardMaterial
              map={screenTexture}
              emissive="#79FC32"
              emissiveIntensity={0.35}
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>
        )}

        {/* Top Camera Notch */}
        <mesh material={screenBezelMaterial} position={[0, 2.34, 0.015]}>
          <boxGeometry args={[0.26, 0.06, 0.01]} />
        </mesh>

        {/* Neon Light Cast onto Keyboard from Screen */}
        <pointLight position={[0, 1.0, 0.5]} color="#79FC32" intensity={2.8} distance={3.5} />
      </group>

      {/* ─── 4. FLOATING 3D HOLOGRAPHIC PANELS ──────────────────────── */}
      {/* Panel 1: Top-Left Floating HUD */}
      {holo1Texture && (
        <group position={[-2.4, 1.4, -0.4]} rotation={[0.1, 0.45, -0.08]}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
            <mesh>
              <planeGeometry args={[1.8, 1.15]} />
              <meshBasicMaterial map={holo1Texture} transparent opacity={0.92} side={THREE.DoubleSide} />
            </mesh>
          </Float>
        </group>
      )}

      {/* Panel 2: Right Floating HUD */}
      {holo2Texture && (
        <group position={[2.5, 1.0, 0.3]} rotation={[-0.1, -0.45, 0.06]}>
          <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.45}>
            <mesh>
              <planeGeometry args={[1.8, 1.15]} />
              <meshBasicMaterial map={holo2Texture} transparent opacity={0.92} side={THREE.DoubleSide} />
            </mesh>
          </Float>
        </group>
      )}

      {/* ─── 5. GROUND ELLIPTICAL NEON GLOW / SHADOW ───────────────── */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 2.4, 32]} />
        <meshBasicMaterial color="#79FC32" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─── Exported Hero3D Laptop Canvas ───────────────────────────────────────────
export default function Laptop3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-neon/20 border-t-neon animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[540px] sm:h-[620px] lg:h-[680px] relative pointer-events-auto">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.6, 5.8], fov: 42 }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.6, 5.8]} fov={42} />

        {/* Studio Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 6]} intensity={1.6} color="#FFFFFF" />
        <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#22232A" />
        <pointLight position={[0, 2, 3]} color="#79FC32" intensity={1.8} distance={8} />

        {/* Floating 3D Laptop Object */}
        <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.45}>
          <LaptopScene />
        </Float>
      </Canvas>
    </div>
  );
}
