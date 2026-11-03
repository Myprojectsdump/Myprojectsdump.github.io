// src/engine/webgl/objects/LuxuryGiftBoxRig.tsx

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { proceduralAudio } from '../../audio/ProceduralAudio';

// =============================================================================
// 3D FACETED RUBY HEART GEMSTONE GEOMETRY
// =============================================================================

function createFacetedRubyHeart(N: number = 18): THREE.BufferGeometry {
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

  // 0: Center front facet
  vertices.push(0, 0.1, 0.18);

  // 1 to N: Table facet ring
  for (let k = 0; k < N; k++) {
    const t = (k / N) * Math.PI * 2;
    vertices.push(0.45 * hx(t), 0.45 * hy(t), 0.15);
  }

  // N+1 to 2N: Outer Girdle perimeter
  for (let k = 0; k < N; k++) {
    const t = (k / N) * Math.PI * 2;
    vertices.push(hx(t), hy(t), 0.0);
  }

  // 2N+1: Back culet tip
  const culetIdx = 2 * N + 1;
  vertices.push(0, 0.05, -0.22);

  for (let k = 0; k < N; k++) {
    const next = (k + 1) % N;
    const tK = 1 + k;
    const tNext = 1 + next;
    const gK = N + 1 + k;
    const gNext = N + 1 + next;

    // Table triangles
    indices.push(0, tNext, tK);

    // Crown facets
    indices.push(tK, tNext, gNext);
    indices.push(tK, gNext, gK);

    // Pavilion facets to back culet
    indices.push(gK, gNext, culetIdx);
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setIndex(indices);
  const nonIndexed = geom.toNonIndexed();
  nonIndexed.computeVertexNormals();
  return nonIndexed;
}

// =============================================================================
// MAIN COMPONENT: ROYAL 3D GIFT BOX WITH PIECE-BY-PIECE ASSEMBLY
// =============================================================================

export const LuxuryGiftBoxRig: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const isRibbonUntied = useExperienceStore((state) => state.isGiftRibbonUntied);
  const isBoxOpened = useExperienceStore((state) => state.isGiftBoxOpened);
  const isAssembledInStore = useExperienceStore((state) => state.isGiftAssembled);
  const giftAssemblyNonce = useExperienceStore((state) => state.giftAssemblyNonce);
  const setGiftAssembled = useExperienceStore((state) => state.setGiftAssembled);
  const untieRibbon = useExperienceStore((state) => state.untieGiftRibbon);
  const openBox = useExperienceStore((state) => state.openGiftBox);
  const reducedMotion = useExperienceStore((state) => state.reducedMotionChoice);

  // Group references
  const rootGroupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  // Piece-by-piece assembly transforms
  const stardustPointsRef = useRef<THREE.Points>(null);
  const foundationGroupRef = useRef<THREE.Group>(null);
  const frontWallRef = useRef<THREE.Group>(null);
  const backWallRef = useRef<THREE.Group>(null);
  const leftWallRef = useRef<THREE.Group>(null);
  const rightWallRef = useRef<THREE.Group>(null);
  const cornerColumnsRef = useRef<THREE.Group>(null);
  const upperRailsRef = useRef<THREE.Group>(null);
  const lidHingeGroupRef = useRef<THREE.Group>(null);
  const lidContentGroupRef = useRef<THREE.Group>(null);
  const crownCrestGroupRef = useRef<THREE.Group>(null);
  const rubyHeartRef = useRef<THREE.Mesh>(null);
  const ribbonBowGroupRef = useRef<THREE.Group>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);
  const riserRef = useRef<THREE.Group>(null);
  const claspLeftRef = useRef<THREE.Mesh>(null);
  const claspRightRef = useRef<THREE.Mesh>(null);

  // Assembly State & Timer
  const assemblyTimeRef = useRef(0);
  const hasFinishedRef = useRef(false);
  const chimeTriggeredRef = useRef<{ [key: string]: boolean }>({});

  // 360° Drag State
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.14, y: 0.32 });
  const currentRotationRef = useRef({ x: 0.14, y: 0.32 });

  // Reset assembly whenever assembly nonce changes
  useEffect(() => {
    assemblyTimeRef.current = 0;
    hasFinishedRef.current = false;
    chimeTriggeredRef.current = {};
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.giftAssemblyProgress = 0;
    }
  }, [giftAssemblyNonce]);

  // Luxury Materials
  const materials = useMemo(() => {
    return {
      burgundyEnamel: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#4A0A1A'),
        roughness: 0.22,
        metalness: 0.28,
      }),
      wineLacquer: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#380715'),
        roughness: 0.16,
        metalness: 0.35,
      }),
      champagneGold: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FDE68A'),
        roughness: 0.18,
        metalness: 0.92,
      }),
      antiqueGold: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D9AE50'),
        roughness: 0.25,
        metalness: 0.85,
      }),
      crimsonSatin: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#9E1A33'),
        roughness: 0.38,
        metalness: 0.12,
      }),
      rubyGem: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E11D48'),
        emissive: new THREE.Color('#88001B'),
        emissiveIntensity: 0.75,
        roughness: 0.08,
        metalness: 0.15,
        flatShading: true,
      }),
      burgundyVelvet: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1F030C'),
        roughness: 0.92,
        metalness: 0.0,
      }),
      roseGoldCore: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F472B6'),
        emissive: new THREE.Color('#E11D48'),
        emissiveIntensity: 0.5,
        metalness: 0.88,
        roughness: 0.2,
      }),
    };
  }, []);

  // Ruby Gem Geometry
  const rubyHeartGeometry = useMemo(() => createFacetedRubyHeart(16), []);

  // Swirling Golden Stardust Geometry (300 points)
  const stardustGeometry = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 0.5 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  // 8 Constellation Diamond Stars around lid perimeter
  const starInlayPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const r = 0.68;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      positions.push([Math.cos(angle) * r, 0.05, Math.sin(angle) * r]);
    }
    return positions;
  }, []);

  // 360° Pointer Drag Handlers
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    previousPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: any) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousPointerRef.current.x;
    const deltaY = e.clientY - previousPointerRef.current.y;
    previousPointerRef.current = { x: e.clientX, y: e.clientY };

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(
      -0.45,
      Math.min(0.75, targetRotationRef.current.x + deltaY * 0.008)
    );
  };

  const handleTriggerOpen = (e: any) => {
    e.stopPropagation();
    if (!isRibbonUntied) untieRibbon();
    if (!isBoxOpened) openBox();
  };

  useFrame((state, delta) => {
    if (currentChapter !== 'FINAL_GIFT') return;

    // Responsive position: On desktop (window.innerWidth >= 1024), anchor leftward squarely on pedestal (-0.85). On mobile, center (0).
    if (rootGroupRef.current) {
      const isMobile = state.size.width < 1024;
      const targetX = isMobile ? 0 : -0.85;
      const targetY = -0.28;
      rootGroupRef.current.position.x = THREE.MathUtils.damp(rootGroupRef.current.position.x, targetX, 5.0, delta);
      rootGroupRef.current.position.y = THREE.MathUtils.damp(rootGroupRef.current.position.y, targetY, 5.0, delta);
    }

    // Faster, brisk, cinematic timing: ~11.5 seconds total!
    const isReducedMotion = reducedMotion === 'reduce';
    const timeSpeed = isReducedMotion ? 3.5 : 1.0;
    assemblyTimeRef.current += delta * timeSpeed;
    const t = assemblyTimeRef.current;

    const stage = (start: number, end: number) => {
      return THREE.MathUtils.smoothstep(t, start, end);
    };

    // =========================================================================
    // 1. STARDUST PARTICLES (0s - 1.8s)
    // =========================================================================
    if (stardustPointsRef.current) {
      const p1 = stage(0, 1.8);
      const pEnd = stage(9.5, 11.5);
      const opacity = (1 - pEnd) * (0.2 + p1 * 0.6);
      stardustPointsRef.current.rotation.y += delta * 0.55;
      (stardustPointsRef.current.material as THREE.PointsMaterial).opacity = opacity;
    }

    // =========================================================================
    // 2. FOUNDATION BASEPLATE (1.5s - 3.2s)
    // =========================================================================
    if (foundationGroupRef.current) {
      const pFound = stage(1.5, 3.2);
      foundationGroupRef.current.position.y = THREE.MathUtils.lerp(-2.5, -0.48, pFound);
      foundationGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.0, pFound));
      if (pFound >= 0.99 && !chimeTriggeredRef.current.found) {
        chimeTriggeredRef.current.found = true;
        proceduralAudio.playStarBridgeChime();
      }
    }

    // =========================================================================
    // 3. FOUR ROYAL BURGUNDY WALLS (3.2s - 5.5s)
    // =========================================================================
    // Front Wall (z: +3.0 -> +0.76)
    if (frontWallRef.current) {
      const pFront = stage(3.2, 5.0);
      frontWallRef.current.position.z = THREE.MathUtils.lerp(3.0, 0.76, pFront);
      frontWallRef.current.position.y = THREE.MathUtils.lerp(-0.5, 0.0, pFront);
      frontWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 1.0, pFront));
    }
    // Back Wall (z: -3.0 -> -0.76)
    if (backWallRef.current) {
      const pBack = stage(3.4, 5.2);
      backWallRef.current.position.z = THREE.MathUtils.lerp(-3.0, -0.76, pBack);
      backWallRef.current.position.y = THREE.MathUtils.lerp(-0.5, 0.0, pBack);
      backWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 1.0, pBack));
    }
    // Left Wall (x: -3.0 -> -0.76)
    if (leftWallRef.current) {
      const pLeft = stage(3.6, 5.4);
      leftWallRef.current.position.x = THREE.MathUtils.lerp(-3.0, -0.76, pLeft);
      leftWallRef.current.position.y = THREE.MathUtils.lerp(-0.5, 0.0, pLeft);
      leftWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 1.0, pLeft));
    }
    // Right Wall (x: +3.0 -> +0.76)
    if (rightWallRef.current) {
      const pRight = stage(3.8, 5.5);
      rightWallRef.current.position.x = THREE.MathUtils.lerp(3.0, 0.76, pRight);
      rightWallRef.current.position.y = THREE.MathUtils.lerp(-0.5, 0.0, pRight);
      rightWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 1.0, pRight));
    }

    // =========================================================================
    // 4. GOLD CORNER COLUMNS & UPPER RAILS (5.5s - 7.2s)
    // =========================================================================
    if (cornerColumnsRef.current) {
      const pCols = stage(5.5, 7.0);
      cornerColumnsRef.current.position.y = THREE.MathUtils.lerp(2.2, 0.0, pCols);
      cornerColumnsRef.current.scale.setScalar(THREE.MathUtils.lerp(0.5, 1.0, pCols));
    }
    if (upperRailsRef.current) {
      const pRails = stage(6.0, 7.2);
      upperRailsRef.current.position.y = THREE.MathUtils.lerp(1.8, 0.44, pRails);
      upperRailsRef.current.scale.setScalar(THREE.MathUtils.lerp(0.6, 1.0, pRails));
    }

    // =========================================================================
    // 5. ORNAMENTAL HINGED LID (7.2s - 9.0s)
    // =========================================================================
    if (lidContentGroupRef.current) {
      const pLid = stage(7.2, 9.0);
      lidContentGroupRef.current.position.y = THREE.MathUtils.lerp(2.8, 0.0, pLid);
      lidContentGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.5, 1.0, pLid));
      if (pLid >= 0.99 && !chimeTriggeredRef.current.lid) {
        chimeTriggeredRef.current.lid = true;
        proceduralAudio.playConstellationStarTone(7);
      }
    }

    // =========================================================================
    // 6. ROYAL CROWN CREST & RADIANT RUBY GEM (8.8s - 10.2s)
    // =========================================================================
    if (crownCrestGroupRef.current) {
      const pCrest = stage(8.8, 10.2);
      crownCrestGroupRef.current.position.y = THREE.MathUtils.lerp(2.0, 0.08, pCrest);
      crownCrestGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, 1.0, pCrest));
    }
    if (rubyHeartRef.current) {
      const pRuby = stage(9.2, 10.2);
      rubyHeartRef.current.scale.setScalar(THREE.MathUtils.lerp(0.001, 0.16, pRuby));
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 3.0) * 0.05;
      rubyHeartRef.current.scale.multiplyScalar(pulse);
    }

    // =========================================================================
    // 7. CRIMSON SATIN RIBBON & GRAND BOW (10.0s - 11.5s)
    // =========================================================================
    if (ribbonBowGroupRef.current) {
      const pRibbon = stage(10.0, 11.5);
      let s = pRibbon;
      // When user unties, smoothly shrink and slide off
      if (isRibbonUntied) {
        s = THREE.MathUtils.damp(ribbonBowGroupRef.current.scale.x, 0.0, 5.0, delta);
      }
      ribbonBowGroupRef.current.scale.set(s, s, s);
    }

    // =========================================================================
    // 8. ASSEMBLY COMPLETION TRIGGER (~11.5s)
    // =========================================================================
    const overallProgress = Math.min(1.0, t / 11.5);
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.giftAssemblyProgress = overallProgress;
    }

    if (overallProgress >= 1.0 && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      if (!isAssembledInStore) {
        setGiftAssembled(true);
      }
    }

    // =========================================================================
    // 9. 360° ORBIT & INERTIA DAMPING
    // =========================================================================
    if (orbitGroupRef.current) {
      currentRotationRef.current.x = THREE.MathUtils.damp(
        currentRotationRef.current.x,
        targetRotationRef.current.x,
        6.5,
        delta
      );
      currentRotationRef.current.y = THREE.MathUtils.damp(
        currentRotationRef.current.y,
        targetRotationRef.current.y,
        6.5,
        delta
      );

      // Subtle breathing idle if not dragging
      if (!isDraggingRef.current && hasFinishedRef.current) {
        const idleBob = Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
        orbitGroupRef.current.position.y = idleBob;
      }

      orbitGroupRef.current.rotation.x = currentRotationRef.current.x;
      orbitGroupRef.current.rotation.y = currentRotationRef.current.y;
    }

    // =========================================================================
    // 10. LID OPENING KINEMATICS (Hinge angle to -112° = -1.955 rad)
    // =========================================================================
    if (lidHingeGroupRef.current) {
      const targetLidAngle = isBoxOpened ? -1.955 : 0;
      lidHingeGroupRef.current.rotation.x = THREE.MathUtils.damp(
        lidHingeGroupRef.current.rotation.x,
        targetLidAngle,
        4.0,
        delta
      );
    }

    // =========================================================================
    // 11. FRONT CLASP SLIDING APART
    // =========================================================================
    if (claspLeftRef.current && claspRightRef.current) {
      const targetClaspOffset = isBoxOpened ? 0.32 : 0.12;
      claspLeftRef.current.position.x = THREE.MathUtils.damp(
        claspLeftRef.current.position.x,
        -targetClaspOffset,
        5.0,
        delta
      );
      claspRightRef.current.position.x = THREE.MathUtils.damp(
        claspRightRef.current.position.x,
        targetClaspOffset,
        5.0,
        delta
      );
    }

    // =========================================================================
    // 12. INTERIOR LIGHT BLOOM & GIFT PEDESTAL RISER
    // =========================================================================
    if (interiorLightRef.current) {
      const targetIntensity = isBoxOpened ? 3.8 : 0.3;
      interiorLightRef.current.intensity = THREE.MathUtils.damp(
        interiorLightRef.current.intensity,
        targetIntensity,
        4.5,
        delta
      );
    }

    if (riserRef.current) {
      const targetY = isBoxOpened ? 0.42 : 0.0;
      riserRef.current.position.y = THREE.MathUtils.damp(
        riserRef.current.position.y,
        targetY,
        3.5,
        delta
      );
    }

    // Update QA Test Probes
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.giftBoxOpened = isBoxOpened ? 1.0 : 0.0;
      window.__UCI_TEST_PROBES__.giftRibbonUntied = isRibbonUntied ? 1.0 : 0.0;
      window.__UCI_TEST_PROBES__.giftLidHingeAngleDeg = isBoxOpened ? 112 : 0;
    }
  });

  if (currentChapter !== 'FINAL_GIFT') return null;

  return (
    <group
      ref={rootGroupRef}
      name="RoyalGiftAssemblyRoot"
      position={[-0.85, -0.28, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOver={() => {
        document.body.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {/* 0. Swirling Golden Stardust Cloud */}
      <points ref={stardustPointsRef} geometry={stardustGeometry}>
        <pointsMaterial
          size={0.035}
          color="#FDE68A"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={orbitGroupRef}>
        {/* ================================================================= */}
        {/* STAGE 1: FOUNDATION BASEPLATE & CORNER SUPPORTS */}
        {/* ================================================================= */}
        <group ref={foundationGroupRef} name="FoundationGroup" position={[0, -0.48, 0]}>
          {/* Main Structural Plate */}
          <mesh material={materials.wineLacquer}>
            <boxGeometry args={[1.62, 0.08, 1.62]} />
          </mesh>
          {/* Outer Polished Gold Lower Bevel Rail */}
          <mesh material={materials.champagneGold} position={[0, -0.02, 0]}>
            <boxGeometry args={[1.72, 0.06, 1.72]} />
          </mesh>
          {/* 4 Sculpted Gold Corner Footings */}
          {[
            [-0.78, -0.04, -0.78],
            [0.78, -0.04, -0.78],
            [-0.78, -0.04, 0.78],
            [0.78, -0.04, 0.78],
          ].map(([x, y, z], idx) => (
            <mesh
              key={`footing-${idx}`}
              material={materials.champagneGold}
              position={[x, y, z]}
            >
              <boxGeometry args={[0.18, 0.08, 0.18]} />
            </mesh>
          ))}
        </group>

        {/* ================================================================= */}
        {/* STAGE 2: FOUR ROYAL BURGUNDY WALLS (With Celestial Dials) */}
        {/* ================================================================= */}
        {/* Front Wall */}
        <group ref={frontWallRef} name="FrontWallGroup" position={[0, 0, 0.76]}>
          <mesh material={materials.burgundyEnamel}>
            <boxGeometry args={[1.56, 0.94, 0.06]} />
          </mesh>
          {/* Gold Filigree Inset Border */}
          <mesh material={materials.champagneGold} position={[0, 0, 0.035]}>
            <boxGeometry args={[1.44, 0.82, 0.015]} />
          </mesh>
          <mesh material={materials.burgundyEnamel} position={[0, 0, 0.042]}>
            <boxGeometry args={[1.36, 0.74, 0.01]} />
          </mesh>
          {/* Central Celestial Astrological Dial Disc */}
          <mesh material={materials.antiqueGold} position={[0, 0, 0.052]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.015, 32]} />
          </mesh>
          <mesh material={materials.wineLacquer} position={[0, 0, 0.062]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.21, 0.21, 0.01, 32]} />
          </mesh>
          <mesh material={materials.champagneGold} position={[0, 0, 0.07]}>
            <torusGeometry args={[0.16, 0.015, 12, 32]} />
          </mesh>
        </group>

        {/* Back Wall */}
        <group ref={backWallRef} name="BackWallGroup" position={[0, 0, -0.76]}>
          <mesh material={materials.burgundyEnamel}>
            <boxGeometry args={[1.56, 0.94, 0.06]} />
          </mesh>
          {/* Rear Hinge Anchor Blocks */}
          <mesh material={materials.champagneGold} position={[-0.45, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
          </mesh>
          <mesh material={materials.champagneGold} position={[0.45, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
          </mesh>
        </group>

        {/* Left Wall */}
        <group ref={leftWallRef} name="LeftWallGroup" position={[-0.76, 0, 0]}>
          <mesh material={materials.burgundyEnamel} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[1.44, 0.94, 0.06]} />
          </mesh>
          {/* Celestial Dial Disc on Left Face */}
          <mesh material={materials.antiqueGold} position={[-0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.015, 32]} />
          </mesh>
        </group>

        {/* Right Wall */}
        <group ref={rightWallRef} name="RightWallGroup" position={[0.76, 0, 0]}>
          <mesh material={materials.burgundyEnamel} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[1.44, 0.94, 0.06]} />
          </mesh>
          {/* Celestial Dial Disc on Right Face */}
          <mesh material={materials.antiqueGold} position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.015, 32]} />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* STAGE 3: GOLD CORNER COLUMNS & UPPER RAILS */}
        {/* ================================================================= */}
        <group ref={cornerColumnsRef} name="CornerColumnsGroup">
          {[
            [-0.78, 0, -0.78],
            [0.78, 0, -0.78],
            [-0.78, 0, 0.78],
            [0.78, 0, 0.78],
          ].map(([x, y, z], idx) => (
            <mesh key={`col-${idx}`} material={materials.champagneGold} position={[x, y, z]}>
              <boxGeometry args={[0.12, 0.98, 0.12]} />
            </mesh>
          ))}
        </group>

        <group ref={upperRailsRef} name="UpperRailsGroup" position={[0, 0.44, 0]}>
          <mesh material={materials.champagneGold}>
            <boxGeometry args={[1.68, 0.05, 1.68]} />
          </mesh>
        </group>

        {/* Front Clasp Assembly */}
        <group name="FrontClaspAssembly" position={[0, 0.44, 0.84]}>
          <mesh material={materials.roseGoldCore} position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.1, 16, 16]} />
          </mesh>
          <mesh ref={claspLeftRef} material={materials.champagneGold} position={[-0.12, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.14, 16]} />
          </mesh>
          <mesh ref={claspRightRef} material={materials.champagneGold} position={[0.12, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.14, 16]} />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* STAGE 4 & 5: HINGED LID, CONSTELLATION STARS & ROYAL CROWN CREST */}
        {/* ================================================================= */}
        <group ref={lidHingeGroupRef} name="HingedLidGroup" position={[0, 0.46, -0.78]}>
          <group ref={lidContentGroupRef} position={[0, 0, 0.78]}>
            {/* Main Burgundy Enamel Top Surface */}
            <mesh material={materials.burgundyEnamel} position={[0, 0.03, 0]}>
              <boxGeometry args={[1.62, 0.06, 1.62]} />
            </mesh>
            {/* Bevelled Gold Frame */}
            <mesh material={materials.champagneGold} position={[0, 0.05, 0]}>
              <boxGeometry args={[1.7, 0.03, 1.7]} />
            </mesh>
            {/* Raised Center Ornamental Terrace */}
            <mesh material={materials.wineLacquer} position={[0, 0.075, 0]}>
              <boxGeometry args={[1.25, 0.03, 1.25]} />
            </mesh>

            {/* 8 Constellation Diamond Stars around lid terrace */}
            {starInlayPositions.map((pos, idx) => (
              <mesh
                key={`star-inlay-${idx}`}
                material={materials.champagneGold}
                position={pos}
              >
                <octahedronGeometry args={[0.04, 0]} />
              </mesh>
            ))}

            {/* Concentric Gold Filigree Rings */}
            {[0.36, 0.45, 0.54].map((radius, idx) => (
              <mesh
                key={`crown-ring-${idx}`}
                material={materials.champagneGold}
                position={[0, 0.09, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[radius, radius + 0.015, 36]} />
              </mesh>
            ))}

            {/* Royal Crown Crest Brooch & Radiant Ruby Gemstone */}
            <group ref={crownCrestGroupRef} name="RoyalCrownCrestGroup" position={[0, 0.08, 0]}>
              {/* Crown Base Rim */}
              <mesh material={materials.champagneGold} position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.22, 0.25, 0.04, 24]} />
              </mesh>
              {/* 5 Sculpted Crown Prongs */}
              {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i / 5) * Math.PI * 2;
                return (
                  <mesh
                    key={`prong-${i}`}
                    material={materials.champagneGold}
                    position={[Math.cos(angle) * 0.22, 0.08, Math.sin(angle) * 0.22]}
                  >
                    <coneGeometry args={[0.035, 0.09, 8]} />
                  </mesh>
                );
              })}
              {/* Center 3D Faceted Ruby Heart Gemstone */}
              <mesh
                ref={rubyHeartRef}
                geometry={rubyHeartGeometry}
                material={materials.rubyGem}
                position={[0, 0.07, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.16, 0.16, 0.16]}
              />
            </group>
          </group>
        </group>

        {/* ================================================================= */}
        {/* STAGE 6: CRIMSON SATIN RIBBON & GRAND BOW */}
        {/* ================================================================= */}
        <group
          ref={ribbonBowGroupRef}
          name="CrimsonSatinRibbonGroup"
          position={[0, 0.54, 0]}
          onClick={handleTriggerOpen}
        >
          {/* Vertical Ribbon Wrap (Front-to-Back) */}
          <mesh material={materials.crimsonSatin} position={[0, -0.54, 0]}>
            <boxGeometry args={[0.22, 1.12, 1.74]} />
          </mesh>
          {/* Horizontal Ribbon Wrap (Left-to-Right) */}
          <mesh material={materials.crimsonSatin} position={[0, -0.54, 0]}>
            <boxGeometry args={[1.74, 1.12, 0.22]} />
          </mesh>

          {/* Center Bow Knot */}
          <mesh material={materials.crimsonSatin} position={[0, 0.06, 0]}>
            <sphereGeometry args={[0.14, 18, 18]} />
          </mesh>

          {/* Left Satin Bow Loop */}
          <mesh
            material={materials.crimsonSatin}
            position={[-0.28, 0.18, 0]}
            rotation={[0, 0, 0.42]}
          >
            <torusGeometry args={[0.2, 0.065, 16, 36]} />
          </mesh>

          {/* Right Satin Bow Loop */}
          <mesh
            material={materials.crimsonSatin}
            position={[0.28, 0.18, 0]}
            rotation={[0, 0, -0.42]}
          >
            <torusGeometry args={[0.2, 0.065, 16, 36]} />
          </mesh>

          {/* Flowing Ribbon Tails */}
          <mesh
            material={materials.crimsonSatin}
            position={[-0.32, 0.02, 0.22]}
            rotation={[0.3, -0.35, 0.55]}
          >
            <cylinderGeometry args={[0.06, 0.09, 0.48, 12]} />
          </mesh>
          <mesh
            material={materials.crimsonSatin}
            position={[0.32, 0.02, 0.22]}
            rotation={[0.3, 0.35, -0.55]}
          >
            <cylinderGeometry args={[0.06, 0.09, 0.48, 12]} />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* INTERIOR CAVITY: VELVET LINING & GOLDEN POINT LIGHT */}
        {/* ================================================================= */}
        <group name="InteriorCavityGroup" position={[0, -0.1, 0]}>
          <pointLight
            ref={interiorLightRef}
            position={[0, 0.25, 0]}
            color="#FDE68A"
            intensity={0.3}
            distance={5.5}
          />
          <group ref={riserRef} position={[0, 0, 0]}>
            {/* Burgundy Velvet Gift Cushion */}
            <mesh material={materials.burgundyVelvet} position={[0, -0.22, 0]}>
              <boxGeometry args={[1.25, 0.22, 1.25]} />
            </mesh>
            {/* Center Rose-Gold Heart Token */}
            <mesh material={materials.roseGoldCore} position={[0, 0.02, 0]}>
              <sphereGeometry args={[0.18, 24, 24]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
