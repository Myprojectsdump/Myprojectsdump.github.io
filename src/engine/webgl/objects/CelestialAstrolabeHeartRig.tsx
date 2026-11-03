// src/engine/webgl/objects/CelestialAstrolabeHeartRig.tsx

import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { proceduralAudio } from '../../audio/ProceduralAudio';

// =============================================================================
// PARAMETRIC 3D FACETED CRYSTAL HEART GEOMETRY
// =============================================================================

function createFacetedCrystalHeart(N: number = 18): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const indices: number[] = [];

  const hx = (t: number) => 0.88 * Math.pow(Math.sin(t), 3);
  const hy = (t: number) =>
    0.72 * Math.cos(t) -
    0.26 * Math.cos(2 * t) -
    0.10 * Math.cos(3 * t) -
    0.04 * Math.cos(4 * t) +
    0.10;

  // 0: Front Table center
  vertices.push(0, 0.12, 0.28);

  // 1 to N: Table ring
  for (let k = 0; k < N; k++) {
    const t = (k / N) * Math.PI * 2;
    vertices.push(0.42 * hx(t), 0.42 * hy(t), 0.25);
  }

  // N+1 to 2N: Upper Crown ring
  for (let k = 0; k < N; k++) {
    const t = (k / N) * Math.PI * 2;
    vertices.push(0.72 * hx(t), 0.72 * hy(t), 0.15);
  }

  // 2N+1 to 3N: Girdle (outermost perimeter)
  for (let k = 0; k < N; k++) {
    const t = (k / N) * Math.PI * 2;
    vertices.push(hx(t), hy(t), 0.0);
  }

  // 3N+1 to 4N: Pavilion intermediate ring
  for (let k = 0; k < N; k++) {
    const t = (k / N) * Math.PI * 2;
    vertices.push(0.55 * hx(t), 0.55 * hy(t), -0.22);
  }

  // 4N+1: Back Culet tip
  const culetIdx = 4 * N + 1;
  vertices.push(0, 0.06, -0.42);

  for (let k = 0; k < N; k++) {
    const next = (k + 1) % N;
    const tK = 1 + k;
    const tNext = 1 + next;
    const cK = N + 1 + k;
    const cNext = N + 1 + next;
    const gK = 2 * N + 1 + k;
    const gNext = 2 * N + 1 + next;
    const pK = 3 * N + 1 + k;
    const pNext = 3 * N + 1 + next;

    // Table triangles
    indices.push(0, tK, tNext);

    // Crown quads
    indices.push(tK, cK, cNext);
    indices.push(tK, cNext, tNext);

    // Girdle quads
    indices.push(cK, gK, gNext);
    indices.push(cK, gNext, cNext);

    // Pavilion quads
    indices.push(gK, pK, pNext);
    indices.push(gK, pNext, gNext);

    // Culet triangles
    indices.push(pK, culetIdx, pNext);
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

// =============================================================================
// SCULPTED GOLDEN ROSE / FLOWER GEOMETRY
// =============================================================================

const SculptedGoldenFlower: React.FC = () => {
  const petals = useMemo(() => {
    const items = [];
    const countOuter = 6;
    const countInner = 5;

    for (let i = 0; i < countOuter; i++) {
      const angle = (i / countOuter) * Math.PI * 2;
      items.push({
        angle,
        radius: 0.16,
        scale: [0.12, 0.18, 0.04] as [number, number, number],
        tiltX: 0.35,
        tiltZ: angle,
      });
    }

    for (let i = 0; i < countInner; i++) {
      const angle = (i / countInner) * Math.PI * 2 + Math.PI / countInner;
      items.push({
        angle,
        radius: 0.09,
        scale: [0.09, 0.14, 0.03] as [number, number, number],
        tiltX: 0.55,
        tiltZ: angle,
      });
    }
    return items;
  }, []);

  return (
    <group position={[0, -0.05, 0.05]}>
      {petals.map((p, idx) => (
        <mesh
          key={idx}
          position={[Math.cos(p.angle) * p.radius, Math.sin(p.angle) * p.radius, 0.02]}
          rotation={[p.tiltX, 0, p.tiltZ]}
          scale={p.scale}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#E6C387"
            metalness={0.92}
            roughness={0.22}
            emissive="#B8860B"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
      {/* Central Golden Stamen Bead */}
      <mesh position={[0, 0, 0.08]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#FFE082"
          metalness={0.95}
          roughness={0.15}
          emissive="#FFA000"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};

// =============================================================================
// MASTER CELESTIAL ASTROLABE HEART RIG COMPONENT
// =============================================================================

export const CelestialAstrolabeHeartRig: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const isLoveLetter = currentChapter === 'FINAL_LOVE_LETTER';

  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const middleRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const heartGroupRef = useRef<THREE.Group>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [pulseTime, setPulseTime] = useState(0);

  const crystalHeartGeom = useMemo(() => createFacetedCrystalHeart(20), []);

  // Frame animation loop
  useFrame((_, delta) => {
    if (!isLoveLetter || !groupRef.current) return;

    const dt = Math.min(delta, 0.1);

    // Continuous celestial ring rotation at varied harmonic speeds
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += 0.28 * dt;
      outerRingRef.current.rotation.z += 0.08 * dt;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.x += 0.42 * dt;
      middleRingRef.current.rotation.y += 0.22 * dt;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += 0.55 * dt;
      innerRingRef.current.rotation.x -= 0.18 * dt;
    }

    // Gentle heart pulse breathing
    const time = performance.now() * 0.001;
    const baseBreath = Math.sin(time * 2.2) * 0.035;

    // Pulse decay on click
    let currentPulseScale = 1.0;
    if (pulseTime > 0) {
      currentPulseScale = 1.0 + Math.sin(pulseTime * Math.PI) * 0.25;
      setPulseTime((prev) => Math.max(0, prev - dt * 2.0));
    }

    if (heartGroupRef.current) {
      const hoverBoost = isHovered ? 1.08 : 1.0;
      const s = (0.75 + baseBreath) * currentPulseScale * hoverBoost;
      heartGroupRef.current.scale.set(s, s, s);
      heartGroupRef.current.rotation.y = Math.sin(time * 0.8) * 0.18;
    }

    // Dynamic point light intensity
    if (pointLightRef.current) {
      const pulseIntensity = pulseTime > 0 ? 3.5 : 1.2;
      const hoverIntensity = isHovered ? 2.0 : 1.0;
      pointLightRef.current.intensity = (1.4 + Math.sin(time * 3.0) * 0.3) * hoverIntensity * pulseIntensity;
    }
  });

  if (!isLoveLetter) return null;

  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setPulseTime(1.0);
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
  };

  return (
    <group
      ref={groupRef}
      position={[-0.1, -0.28, 0]}
      scale={[1.15, 1.15, 1.15]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Dynamic Central Heart Core Light */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0.4]}
        color="#FFA3B1"
        intensity={1.8}
        distance={7.0}
        decay={2}
      />

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 1. CENTRAL FACETED CRYSTAL HEART & GOLDEN SCULPTED FLOWER        */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <group ref={heartGroupRef} position={[0, 0.05, 0]}>
        {/* Faceted Crystal Heart */}
        <mesh geometry={crystalHeartGeom}>
          <meshPhysicalMaterial
            color="#FF1E56"
            emissive="#B8002E"
            emissiveIntensity={isHovered ? 0.75 : 0.45}
            roughness={0.12}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            transmission={0.45}
            thickness={0.5}
            flatShading={true}
          />
        </mesh>

        {/* Sculpted Golden Flower Embedded Within */}
        <SculptedGoldenFlower />
      </group>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 2. INTRICATE CELESTIAL ORBITAL ASTROLABE RINGS                   */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Outer Meridian Arch Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[1.52, 0.024, 16, 64]} />
          <meshStandardMaterial
            color="#F0D095"
            metalness={0.92}
            roughness={0.2}
            emissive="#D4AF37"
            emissiveIntensity={isHovered ? 0.35 : 0.15}
          />
        </mesh>

        {/* Orbiting Starlight Jewel on Meridian Ring */}
        <mesh position={[1.52, 0, 0]}>
          <octahedronGeometry args={[0.055, 0]} />
          <meshStandardMaterial
            color="#FFF5CC"
            emissive="#FFE082"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Middle Tilted Gimbal Ring */}
      <group ref={middleRingRef} rotation={[0.65, 0.4, 0.2]}>
        <mesh>
          <torusGeometry args={[1.34, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#E5C178"
            metalness={0.94}
            roughness={0.18}
            emissive="#C59B27"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Orbiting Ruby Star Bead */}
        <mesh position={[0, 1.34, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color="#FF3366"
            emissive="#FF0044"
            emissiveIntensity={0.9}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Inner Tilted Elliptical Ring */}
      <group ref={innerRingRef} rotation={[-0.55, 0.75, -0.3]}>
        <mesh>
          <torusGeometry args={[1.12, 0.018, 16, 48]} />
          <meshStandardMaterial
            color="#F7DDA4"
            metalness={0.95}
            roughness={0.15}
            emissive="#D4AF37"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Orbiting Amber Star */}
        <mesh position={[-1.12, 0, 0]}>
          <octahedronGeometry args={[0.04, 0]} />
          <meshStandardMaterial
            color="#FFD54F"
            emissive="#FF8F00"
            emissiveIntensity={1.0}
          />
        </mesh>
      </group>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 3. TRANSPARENT CELESTIAL GLASS SPHERE SHELL                       */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <mesh>
        <sphereGeometry args={[1.62, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFF9F0"
          roughness={0.08}
          transmission={0.88}
          thickness={0.3}
          ior={1.48}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          transparent={true}
          opacity={0.3}
          reflectivity={0.6}
        />
      </mesh>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* 4. STEPPED GOLDEN PEDESTAL BASE (Anchors to background stage)     */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <group position={[0, -1.25, 0]}>
        {/* Tier 1 upper collar */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.42, 0.48, 0.08, 32]} />
          <meshStandardMaterial color="#E5C178" metalness={0.92} roughness={0.22} />
        </mesh>

        {/* Tier 2 central stepped ring */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.55, 0.62, 0.08, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.94} roughness={0.18} />
        </mesh>

        {/* Tier 3 foundational beveled plinth */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.72, 0.82, 0.08, 32]} />
          <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* 4 Sculpted Lion/Floral Gold Feet */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <mesh
            key={idx}
            position={[Math.cos(angle) * 0.72, -0.09, Math.sin(angle) * 0.72]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.12, 0.08, 0.16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
