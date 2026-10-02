"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Clean, Minimalist Interactive 3D Digital Core
function MinimalTechCore() {
  const coreRef = useRef<THREE.Group>(null!);
  const innerSphereRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (coreRef.current) {
      // Smooth subtle mouse tilt easing
      coreRef.current.rotation.x = THREE.MathUtils.lerp(
        coreRef.current.rotation.x,
        pointer.y * 0.25 + Math.sin(t * 0.3) * 0.05,
        0.05
      );
      coreRef.current.rotation.y = THREE.MathUtils.lerp(
        coreRef.current.rotation.y,
        pointer.x * 0.35 + t * 0.08,
        0.05
      );
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = t * 0.12;
      innerSphereRef.current.rotation.x = t * 0.06;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.12;
    }
  });

  return (
    <group ref={coreRef} position={[0, 0, -0.8]}>
      {/* 1. Subtle, Clean Wireframe Tech Sphere */}
      <mesh ref={innerSphereRef} scale={2.1}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial
          color="#79FC32"
          wireframe={true}
          transparent={true}
          opacity={0.16}
        />
      </mesh>

      {/* 2. Inner Soft Dark Glow Core */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color="#0B0B0D"
          emissive="#79FC32"
          emissiveIntensity={0.06}
          roughness={0.8}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* 3. Outer Sleek Orbital Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]} scale={2.7}>
        <torusGeometry args={[1, 0.008, 16, 120]} />
        <meshBasicMaterial
          color="#79FC32"
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]} scale={3.1}>
        <torusGeometry args={[1, 0.006, 16, 120]} />
        <meshBasicMaterial
          color="#79FC32"
          transparent={true}
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

// Subtle Deep Space Dust Points (Tiny & Non-Intrusive)
function SubtleSpaceDust() {
  const pointsRef = useRef<THREE.Points>(null!);

  const particleCount = 45;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
  }

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#79FC32"
        transparent={true}
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={45} />

        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#79FC32" intensity={1.5} />
        <pointLight position={[-5, -5, -3]} color="#22232A" intensity={1} />

        {/* Minimalist Tech Core */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
          <MinimalTechCore />
        </Float>

        {/* Subtle Dust */}
        <SubtleSpaceDust />
      </Canvas>
    </div>
  );
}
