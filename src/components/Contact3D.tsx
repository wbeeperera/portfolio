"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ─── Interactive 3D Holographic Communication Sphere ─────────────────────────
function CommunicationCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const outerWireframeRef = useRef<THREE.Mesh>(null!);
  const innerIcosaRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth responsive mouse tracking
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.35 + Math.sin(t * 0.4) * 0.08,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.45 + t * 0.1,
        0.05
      );
    }

    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.y = -t * 0.15;
    }

    if (innerIcosaRef.current) {
      innerIcosaRef.current.rotation.x = t * 0.2;
      innerIcosaRef.current.rotation.z = -t * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.25;
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2;
      ring2Ref.current.rotation.y = Math.cos(t * 0.3) * 0.2;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Outer Hexagonal Tech Sphere */}
      <mesh ref={outerWireframeRef} scale={2.2}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#79FC32"
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* 2. Inner Glowing Core Polyhedron */}
      <mesh ref={innerIcosaRef} scale={1.3}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#141418"
          emissive="#79FC32"
          emissiveIntensity={0.5}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* 3. Orbital Data Rings */}
      <mesh ref={ring1Ref} scale={2.7}>
        <torusGeometry args={[1, 0.012, 16, 100]} />
        <meshBasicMaterial
          color="#79FC32"
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={3.1}>
        <torusGeometry args={[1, 0.008, 16, 100]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 3, 0, Math.PI / 6]} scale={3.4}>
        <torusGeometry args={[1, 0.006, 16, 100]} />
        <meshBasicMaterial
          color="#79FC32"
          transparent={true}
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

// ─── Surrounding Cyber Particles ─────────────────────────────────────────────
function SwarmParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 70;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const r = 2.4 + Math.random() * 2.2;
      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(theta);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.05;
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
        size={0.06}
        color="#79FC32"
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Contact3D() {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[540px] relative select-none">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={45} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#79FC32" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#FFFFFF" />

        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <CommunicationCore />
          <SwarmParticles />
        </Float>
      </Canvas>
    </div>
  );
}
