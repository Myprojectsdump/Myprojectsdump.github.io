// src/engine/webgl/objects/LuxuryGiftBoxRig.tsx

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../../../store/useExperienceStore';
import {
  transientMotionState,
  setGiftSecretCompartmentOpen,
  addGiftBoxUserRotation,
} from '../../../store/transientMotionState';
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
// MAIN COMPONENT: ROYAL 3D GIFT BOX WITH PIECE-BY-PIECE ASSEMBLY & SECRET DRAWER
// =============================================================================

const ASSEMBLY_TOTAL_DURATION = 24.0; // Deliberate, cinematic 8-stage royal craftsmanship

export const LuxuryGiftBoxRig: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const isRibbonUntied = useExperienceStore((state) => state.isGiftRibbonUntied);
  const isBoxOpened = useExperienceStore((state) => state.isGiftBoxOpened);
  const isAssembledInStore = useExperienceStore((state) => state.isGiftAssembled);
  const giftAssemblyNonce = useExperienceStore((state) => state.giftAssemblyNonce);
  const setGiftAssembled = useExperienceStore((state) => state.setGiftAssembled);
  const isMuted = useExperienceStore((state) => state.isMuted);
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
  const filigreePlatesRef = useRef<THREE.Group>(null);
  const lidHingeGroupRef = useRef<THREE.Group>(null);
  const lidContentGroupRef = useRef<THREE.Group>(null);
  const crownCrestGroupRef = useRef<THREE.Group>(null);
  const rubyHeartRef = useRef<THREE.Mesh>(null);
  const amberGemsGroupRef = useRef<THREE.Group>(null);
  const ribbonBowGroupRef = useRef<THREE.Group>(null);
  const bowKnotGroupRef = useRef<THREE.Group>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);
  const riserRef = useRef<THREE.Group>(null);
  const risingPetalsGroupRef = useRef<THREE.Group>(null);
  const claspLeftRef = useRef<THREE.Mesh>(null);
  const claspRightRef = useRef<THREE.Mesh>(null);

  // Concealed Secret Compartment Drawer & Folded Note
  const secretDrawerGroupRef = useRef<THREE.Group>(null);
  const secretNote3DRef = useRef<THREE.Group>(null);
  const secretGlimmerLightRef = useRef<THREE.PointLight>(null);

  // Interactive discovery tactile boost refs
  const rubyPulseBoostRef = useRef(0);
  const ribbonBounceBoostRef = useRef(0);
  const ornamentGlowBoostRef = useRef(0);

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
      window.__UCI_TEST_PROBES__.giftCrestPulseCount =
        window.__UCI_TEST_PROBES__.giftCrestPulseCount ?? 0;
      window.__UCI_TEST_PROBES__.giftRibbonTouchCount =
        window.__UCI_TEST_PROBES__.giftRibbonTouchCount ?? 0;
      window.__UCI_TEST_PROBES__.giftOrnamentHighlightCount =
        window.__UCI_TEST_PROBES__.giftOrnamentHighlightCount ?? 0;
    }
  }, [giftAssemblyNonce]);

  // If store already marks gift assembled or opened (e.g. re-entry or test fast-forward), sync timer
  useEffect(() => {
    if (isAssembledInStore || isBoxOpened) {
      assemblyTimeRef.current = ASSEMBLY_TOTAL_DURATION;
      hasFinishedRef.current = true;
      if (window.__UCI_TEST_PROBES__) {
        window.__UCI_TEST_PROBES__.giftAssemblyProgress = 1.0;
      }
    }
  }, [isAssembledInStore, isBoxOpened]);

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
        emissive: new THREE.Color('#B45309'),
        emissiveIntensity: 0.08,
        roughness: 0.25,
        metalness: 0.85,
      }),
      crimsonSatin: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#9E1A33'),
        roughness: 0.36,
        metalness: 0.14,
      }),
      rubyGem: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E11D48'),
        emissive: new THREE.Color('#88001B'),
        emissiveIntensity: 0.75,
        roughness: 0.08,
        metalness: 0.15,
        flatShading: true,
      }),
      amberGem: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F59E0B'),
        emissive: new THREE.Color('#92400E'),
        emissiveIntensity: 0.65,
        roughness: 0.1,
        metalness: 0.2,
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
      ivoryParchment: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFF9EA'),
        emissive: new THREE.Color('#FDE68A'),
        emissiveIntensity: 0.15,
        roughness: 0.65,
        metalness: 0.05,
      }),
    };
  }, []);

  const rubyHeartGeometry = useMemo(() => createFacetedRubyHeart(16), []);

  // Swirling Golden Stardust Geometry (240 points - restrained & smooth)
  const stardustGeometry = useMemo(() => {
    const count = 240;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 0.55 + Math.random() * 2.1;
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

  // 8 Constellation Diamond Stars & Amber Gemstones around lid perimeter
  const starInlayPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const r = 0.68;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      positions.push([Math.cos(angle) * r, 0.05, Math.sin(angle) * r]);
    }
    return positions;
  }, []);

  // Helper to emit discovery notification to UI
  const dispatchDiscovery = (detailType: 'crest' | 'ribbon' | 'ornaments') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('uci:gift-discovery', { detail: detailType }));
    }
  };

  // Interactive Touchpoint 1: Tapping the Ruby Heart Crest
  const handleCrestClick = (e: any) => {
    e.stopPropagation();
    rubyPulseBoostRef.current = 1.0;
    if (!isMuted) {
      proceduralAudio.playConstellationStarTone(5);
    }
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.giftCrestPulseCount =
        (window.__UCI_TEST_PROBES__.giftCrestPulseCount ?? 0) + 1;
    }
    dispatchDiscovery('crest');
  };

  // Interactive Touchpoint 2: Tapping or dragging the Crimson Satin Ribbon
  const handleRibbonInteraction = (e: any) => {
    e.stopPropagation();
    ribbonBounceBoostRef.current = 1.0;
    if (!isMuted) {
      proceduralAudio.playMirrorNoteChime();
    }
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.giftRibbonTouchCount =
        (window.__UCI_TEST_PROBES__.giftRibbonTouchCount ?? 0) + 1;
    }
    dispatchDiscovery('ribbon');
  };

  // Interactive Touchpoint 3: Hovering or tapping the Gold Ornaments
  const handleOrnamentHighlight = (e: any) => {
    e.stopPropagation();
    ornamentGlowBoostRef.current = 1.0;
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.giftOrnamentHighlightCount =
        (window.__UCI_TEST_PROBES__.giftOrnamentHighlightCount ?? 0) + 1;
    }
    dispatchDiscovery('ornaments');
  };

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

    addGiftBoxUserRotation(deltaX, deltaY);
    targetRotationRef.current.y = transientMotionState.giftBoxUserEuler.y;
    targetRotationRef.current.x = transientMotionState.giftBoxUserEuler.x;
  };

  useFrame((state, delta) => {
    if (currentChapter !== 'FINAL_GIFT') return;

    const currentPhase = transientMotionState.giftRevealPhase || 'ASSEMBLING';
    const isQuietOrPostscript =
      currentPhase === 'QUIET_MOMENT' ||
      currentPhase === 'POSTSCRIPT_REVEAL' ||
      currentPhase === 'POSTSCRIPT_READY' ||
      currentPhase === 'COMPLETE';
    const isSecretRevealing =
      currentPhase === 'POSTSCRIPT_REVEAL' ||
      currentPhase === 'POSTSCRIPT_READY' ||
      currentPhase === 'COMPLETE';

    // Responsive positioning & subtle camera/stage framing per phase
    if (rootGroupRef.current) {
      const isMobile = state.size.width < 1024;
      const targetX = isMobile ? 0 : -0.85;
      const targetY = isSecretRevealing ? -0.18 : -0.28;
      const targetZ = currentPhase === 'QUIET_MOMENT' ? -0.35 : isSecretRevealing ? 0.25 : 0;

      rootGroupRef.current.position.x = THREE.MathUtils.damp(
        rootGroupRef.current.position.x,
        targetX,
        4.5,
        delta
      );
      rootGroupRef.current.position.y = THREE.MathUtils.damp(
        rootGroupRef.current.position.y,
        targetY,
        4.5,
        delta
      );
      rootGroupRef.current.position.z = THREE.MathUtils.damp(
        rootGroupRef.current.position.z,
        targetZ,
        3.5,
        delta
      );
    }

    // Decay interactive tactile boosts smoothly
    rubyPulseBoostRef.current = THREE.MathUtils.damp(rubyPulseBoostRef.current, 0, 3.0, delta);
    ribbonBounceBoostRef.current = THREE.MathUtils.damp(ribbonBounceBoostRef.current, 0, 5.0, delta);
    ornamentGlowBoostRef.current = THREE.MathUtils.damp(ornamentGlowBoostRef.current, 0, 2.5, delta);

    // Apply ornament highlight emissive response
    materials.antiqueGold.emissiveIntensity = 0.08 + ornamentGlowBoostRef.current * 0.65;
    materials.rubyGem.emissiveIntensity = 0.75 + rubyPulseBoostRef.current * 1.4;

    // Coordinated 8-Stage Assembly Timeline (24s normal, 4.5s reduced motion)
    const isReducedMotion =
      reducedMotion === 'reduce' ||
      (reducedMotion === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const timeSpeed = isReducedMotion ? 5.5 : 1.0;

    if (!hasFinishedRef.current) {
      assemblyTimeRef.current += delta * timeSpeed;
    } else {
      assemblyTimeRef.current = ASSEMBLY_TOTAL_DURATION;
    }
    const t = assemblyTimeRef.current;

    const stage = (start: number, end: number) => {
      return THREE.MathUtils.smoothstep(t, start, end);
    };

    // =========================================================================
    // STAGE 1: PEDESTAL ALIGNMENT & GOLDEN STARDUST (0s - 3.0s)
    // =========================================================================
    if (stardustPointsRef.current) {
      const p1 = stage(0, 2.8);
      const pEnd = stage(20.5, 24.0);
      let opacity = (1 - pEnd * 0.65) * (0.2 + p1 * 0.55);
      if (isQuietOrPostscript) opacity = 0.14;
      stardustPointsRef.current.rotation.y += delta * (isQuietOrPostscript ? 0.15 : 0.42);
      (stardustPointsRef.current.material as THREE.PointsMaterial).opacity = opacity;
    }

    // =========================================================================
    // STAGE 2: FOUNDATION BASEPLATE & REINFORCED CORNERS (2.2s - 5.8s)
    // =========================================================================
    if (foundationGroupRef.current) {
      const pFound = stage(2.2, 5.8);
      foundationGroupRef.current.position.y = THREE.MathUtils.lerp(-2.4, -0.48, pFound);
      foundationGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.35, 1.0, pFound));
      if (pFound >= 0.99 && !chimeTriggeredRef.current.found) {
        chimeTriggeredRef.current.found = true;
        if (!isMuted) proceduralAudio.playStarBridgeChime();
      }
    }

    // =========================================================================
    // STAGE 3: FOUR ROYAL BURGUNDY WALLS (5.8s - 10.6s)
    // =========================================================================
    if (frontWallRef.current) {
      const pFront = stage(5.8, 8.8);
      frontWallRef.current.position.z = THREE.MathUtils.lerp(2.8, 0.76, pFront);
      frontWallRef.current.position.y = THREE.MathUtils.lerp(-0.4, 0.0, pFront);
      frontWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.45, 1.0, pFront));
    }
    if (backWallRef.current) {
      const pBack = stage(6.4, 9.4);
      backWallRef.current.position.z = THREE.MathUtils.lerp(-2.8, -0.76, pBack);
      backWallRef.current.position.y = THREE.MathUtils.lerp(-0.4, 0.0, pBack);
      backWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.45, 1.0, pBack));
    }
    if (leftWallRef.current) {
      const pLeft = stage(7.0, 10.0);
      leftWallRef.current.position.x = THREE.MathUtils.lerp(-2.8, -0.76, pLeft);
      leftWallRef.current.position.y = THREE.MathUtils.lerp(-0.4, 0.0, pLeft);
      leftWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.45, 1.0, pLeft));
    }
    if (rightWallRef.current) {
      const pRight = stage(7.6, 10.6);
      rightWallRef.current.position.x = THREE.MathUtils.lerp(2.8, 0.76, pRight);
      rightWallRef.current.position.y = THREE.MathUtils.lerp(-0.4, 0.0, pRight);
      rightWallRef.current.scale.setScalar(THREE.MathUtils.lerp(0.45, 1.0, pRight));
    }

    // =========================================================================
    // STAGE 4: ROYAL DETAILING — GOLD COLUMNS, RAILS & FILIGREE (10.6s - 14.5s)
    // =========================================================================
    if (cornerColumnsRef.current) {
      const pCols = stage(10.6, 13.2);
      cornerColumnsRef.current.position.y = THREE.MathUtils.lerp(2.1, 0.0, pCols);
      cornerColumnsRef.current.scale.setScalar(THREE.MathUtils.lerp(0.5, 1.0, pCols));
    }
    if (upperRailsRef.current) {
      const pRails = stage(11.8, 14.2);
      upperRailsRef.current.position.y = THREE.MathUtils.lerp(1.8, 0.44, pRails);
      upperRailsRef.current.scale.setScalar(THREE.MathUtils.lerp(0.6, 1.0, pRails));
    }
    if (filigreePlatesRef.current) {
      const pFil = stage(12.4, 14.5);
      filigreePlatesRef.current.scale.setScalar(THREE.MathUtils.lerp(0.01, 1.0, pFil));
    }

    // =========================================================================
    // STAGE 5: MULTI-LAYERED HINGED LID CONSTRUCTION (14.5s - 18.0s)
    // =========================================================================
    if (lidContentGroupRef.current) {
      const pLid = stage(14.5, 18.0);
      lidContentGroupRef.current.position.y = THREE.MathUtils.lerp(2.6, 0.0, pLid);
      lidContentGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.55, 1.0, pLid));
      if (pLid >= 0.99 && !chimeTriggeredRef.current.lid) {
        chimeTriggeredRef.current.lid = true;
        if (!isMuted) proceduralAudio.playConstellationStarTone(7);
      }
    }

    // =========================================================================
    // STAGE 6: ROYAL CROWN CREST, RUBY HEART & AMBER GEMSTONES (17.8s - 20.8s)
    // =========================================================================
    if (crownCrestGroupRef.current) {
      const pCrest = stage(17.8, 20.2);
      crownCrestGroupRef.current.position.y = THREE.MathUtils.lerp(1.9, 0.08, pCrest);
      crownCrestGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, 1.0, pCrest));
    }
    if (rubyHeartRef.current) {
      const pRuby = stage(18.6, 20.6);
      const baseScale = THREE.MathUtils.lerp(0.001, 0.16, pRuby);
      const pulse =
        1.0 +
        Math.sin(state.clock.elapsedTime * 3.0) * 0.05 +
        rubyPulseBoostRef.current * 0.28;
      rubyHeartRef.current.scale.setScalar(baseScale * pulse);
    }
    if (amberGemsGroupRef.current) {
      const pAmber = stage(19.0, 20.8);
      amberGemsGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.001, 1.0, pAmber));
    }

    // =========================================================================
    // STAGE 7: CRIMSON SATIN RIBBON & ELABORATE 3D BOW (20.5s - 23.2s)
    // =========================================================================
    if (ribbonBowGroupRef.current) {
      const pRibbon = stage(20.5, 23.2);
      let s = pRibbon;
      if (isRibbonUntied) {
        s = THREE.MathUtils.damp(ribbonBowGroupRef.current.scale.x, 0.0, 4.2, delta);
      } else {
        const bounce = 1.0 + Math.sin(ribbonBounceBoostRef.current * Math.PI) * 0.12;
        s *= bounce;
      }
      ribbonBowGroupRef.current.scale.set(s, s, s);
    }
    if (bowKnotGroupRef.current) {
      // Relax bow loops slightly as ribbon unties
      const targetKnotY = isRibbonUntied ? 0.25 : 0;
      bowKnotGroupRef.current.position.y = THREE.MathUtils.damp(
        bowKnotGroupRef.current.position.y,
        targetKnotY,
        4.0,
        delta
      );
    }

    // =========================================================================
    // STAGE 8: FINAL FINISHING & HERO COMPLETION (23.2s - 24.0s)
    // =========================================================================
    const overallProgress = Math.min(1.0, t / ASSEMBLY_TOTAL_DURATION);
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
    // 9. 360° ORBIT & CAMERA/ROTATION CHOREOGRAPHY
    // =========================================================================
    if (orbitGroupRef.current) {
      const userRotY = transientMotionState.giftBoxUserEuler.y;
      const userRotX = transientMotionState.giftBoxUserEuler.x;

      if (
        !isDraggingRef.current &&
        !hasFinishedRef.current &&
        Math.abs(userRotY - 0.32) < 0.001 &&
        Math.abs(userRotX - 0.14) < 0.001
      ) {
        // Gentle craftsmanship inspection rotation during assembly before user interacts
        targetRotationRef.current.y = 0.32 + Math.sin(t * 0.35) * 0.22;
        targetRotationRef.current.x = 0.14 + Math.cos(t * 0.25) * 0.05;
      } else if (!isDraggingRef.current && isSecretRevealing) {
        // Orient gently toward the secret front-bottom drawer during postscript reveal
        targetRotationRef.current.y = THREE.MathUtils.damp(
          targetRotationRef.current.y,
          0.18 + (userRotY - 0.32),
          2.5,
          delta
        );
        targetRotationRef.current.x = THREE.MathUtils.damp(
          targetRotationRef.current.x,
          0.12 + (userRotX - 0.14),
          2.5,
          delta
        );
      } else {
        targetRotationRef.current.y = userRotY;
        targetRotationRef.current.x = userRotX;
      }

      currentRotationRef.current.x = THREE.MathUtils.damp(
        currentRotationRef.current.x,
        targetRotationRef.current.x,
        8.0,
        delta
      );
      currentRotationRef.current.y = THREE.MathUtils.damp(
        currentRotationRef.current.y,
        targetRotationRef.current.y,
        8.0,
        delta
      );

      if (!isDraggingRef.current && hasFinishedRef.current) {
        const idleBob = Math.sin(state.clock.elapsedTime * 1.2) * 0.018;
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
        3.8,
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
    // 12. INTERIOR LIGHT BLOOM, VELVET RISER & RISING ROSE PETALS
    // =========================================================================
    if (interiorLightRef.current) {
      const targetIntensity = isBoxOpened ? (isQuietOrPostscript ? 2.1 : 3.8) : 0.3;
      interiorLightRef.current.intensity = THREE.MathUtils.damp(
        interiorLightRef.current.intensity,
        targetIntensity,
        4.2,
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

    if (risingPetalsGroupRef.current) {
      const targetPetalY = isBoxOpened ? 0.85 : 0.0;
      const targetPetalScale = isBoxOpened ? 1.0 : 0.001;
      risingPetalsGroupRef.current.position.y = THREE.MathUtils.damp(
        risingPetalsGroupRef.current.position.y,
        targetPetalY,
        2.2,
        delta
      );
      risingPetalsGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(risingPetalsGroupRef.current.scale.x, targetPetalScale, 3.0, delta)
      );
      risingPetalsGroupRef.current.rotation.y += delta * 0.45;
    }

    // =========================================================================
    // 13. CONCEALED SECRET COMPARTMENT DRAWER & FOLDED NOTE (Plot Twist)
    // =========================================================================
    if (secretDrawerGroupRef.current) {
      const targetDrawerZ = isSecretRevealing ? 0.54 : 0.0;
      secretDrawerGroupRef.current.position.z = THREE.MathUtils.damp(
        secretDrawerGroupRef.current.position.z,
        targetDrawerZ,
        3.2,
        delta
      );
      const drawerProgress = Math.max(0, Math.min(1, secretDrawerGroupRef.current.position.z / 0.52));
      setGiftSecretCompartmentOpen(drawerProgress);
    }

    if (secretNote3DRef.current) {
      const targetNoteY = isSecretRevealing ? 0.14 : 0.02;
      const targetNoteRotX = isSecretRevealing ? -0.35 : 0;
      secretNote3DRef.current.position.y = THREE.MathUtils.damp(
        secretNote3DRef.current.position.y,
        targetNoteY,
        3.0,
        delta
      );
      secretNote3DRef.current.rotation.x = THREE.MathUtils.damp(
        secretNote3DRef.current.rotation.x,
        targetNoteRotX,
        3.0,
        delta
      );
    }

    if (secretGlimmerLightRef.current) {
      const glimmerPulse = isSecretRevealing
        ? 2.2 + Math.sin(state.clock.elapsedTime * 5.0) * 0.8
        : 0;
      secretGlimmerLightRef.current.intensity = THREE.MathUtils.damp(
        secretGlimmerLightRef.current.intensity,
        glimmerPulse,
        4.0,
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
          size={0.032}
          color="#FDE68A"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={orbitGroupRef}>
        {/* Invisible Interactive Hit Box for 3D Direct Mesh Raycasting */}
        <mesh
          visible={false}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          <boxGeometry args={[3.2, 3.2, 3.2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* ================================================================= */}
        {/* STAGE 2: FOUNDATION BASEPLATE, CORNERS & SECRET COMPARTMENT       */}
        {/* ================================================================= */}
        <group ref={foundationGroupRef} name="FoundationGroup" position={[0, -0.48, 0]}>
          {/* Main Structural Plate */}
          <mesh material={materials.wineLacquer}>
            <boxGeometry args={[1.62, 0.08, 1.62]} />
          </mesh>
          {/* Outer Polished Gold Lower Bevel Rail */}
          <mesh
            material={materials.champagneGold}
            position={[0, -0.02, 0]}
            onClick={handleOrnamentHighlight}
          >
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
              onClick={handleOrnamentHighlight}
            >
              <boxGeometry args={[0.18, 0.08, 0.18]} />
            </mesh>
          ))}

          {/* CONCEALED SECRET COMPARTMENT DRAWER (Pedestal-Facing Front Edge) */}
          <group ref={secretDrawerGroupRef} name="SecretCompartmentDrawer" position={[0, 0.01, 0.35]}>
            {/* Secret Drawer Tray */}
            <mesh material={materials.wineLacquer} position={[0, 0, 0]}>
              <boxGeometry args={[0.72, 0.065, 0.56]} />
            </mesh>
            {/* Gold Filigree Drawer Faceplate */}
            <mesh material={materials.champagneGold} position={[0, 0, 0.285]}>
              <boxGeometry args={[0.76, 0.075, 0.02]} />
            </mesh>
            {/* Tiny Ruby Heart Drawer Pull */}
            <mesh material={materials.rubyGem} position={[0, 0, 0.305]}>
              <octahedronGeometry args={[0.028, 0]} />
            </mesh>

            {/* 3D Folded Ivory & Burgundy Secret Postscript Note Inside Drawer */}
            <group ref={secretNote3DRef} position={[0, 0.035, 0.08]}>
              <mesh material={materials.ivoryParchment}>
                <boxGeometry args={[0.46, 0.018, 0.32]} />
              </mesh>
              {/* Fine Burgundy Satin Band & Gold Heart Seal on Note */}
              <mesh material={materials.crimsonSatin} position={[0, 0.011, 0]}>
                <boxGeometry args={[0.47, 0.006, 0.05]} />
              </mesh>
              <mesh material={materials.champagneGold} position={[0, 0.016, 0]}>
                <cylinderGeometry args={[0.038, 0.038, 0.008, 16]} />
              </mesh>
            </group>

            {/* Secret Glimmer Point Light */}
            <pointLight
              ref={secretGlimmerLightRef}
              position={[0, 0.12, 0.36]}
              color="#FDE68A"
              intensity={0}
              distance={2.2}
            />
          </group>
        </group>

        {/* ================================================================= */}
        {/* STAGE 3: FOUR ROYAL BURGUNDY WALLS                                */}
        {/* ================================================================= */}
        {/* Front Wall */}
        <group ref={frontWallRef} name="FrontWallGroup" position={[0, 0, 0.76]}>
          <mesh material={materials.burgundyEnamel}>
            <boxGeometry args={[1.56, 0.94, 0.06]} />
          </mesh>
          <mesh
            material={materials.champagneGold}
            position={[0, 0, 0.035]}
            onClick={handleOrnamentHighlight}
          >
            <boxGeometry args={[1.44, 0.82, 0.015]} />
          </mesh>
          <mesh material={materials.burgundyEnamel} position={[0, 0, 0.042]}>
            <boxGeometry args={[1.36, 0.74, 0.01]} />
          </mesh>
        </group>

        {/* Back Wall */}
        <group ref={backWallRef} name="BackWallGroup" position={[0, 0, -0.76]}>
          <mesh material={materials.burgundyEnamel}>
            <boxGeometry args={[1.56, 0.94, 0.06]} />
          </mesh>
          {/* Rear Hinge Anchor Blocks */}
          <mesh
            material={materials.champagneGold}
            position={[-0.45, 0.44, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
          </mesh>
          <mesh
            material={materials.champagneGold}
            position={[0.45, 0.44, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
          </mesh>
        </group>

        {/* Left Wall */}
        <group ref={leftWallRef} name="LeftWallGroup" position={[-0.76, 0, 0]}>
          <mesh material={materials.burgundyEnamel} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[1.44, 0.94, 0.06]} />
          </mesh>
        </group>

        {/* Right Wall */}
        <group ref={rightWallRef} name="RightWallGroup" position={[0.76, 0, 0]}>
          <mesh material={materials.burgundyEnamel} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[1.44, 0.94, 0.06]} />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* STAGE 4: ROYAL DETAILING — GOLD COLUMNS, RAILS & ENGRAVED PLATES  */}
        {/* ================================================================= */}
        <group
          ref={cornerColumnsRef}
          name="CornerColumnsGroup"
          onClick={handleOrnamentHighlight}
          onPointerOver={handleOrnamentHighlight}
        >
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

        <group
          ref={upperRailsRef}
          name="UpperRailsGroup"
          position={[0, 0.44, 0]}
          onClick={handleOrnamentHighlight}
        >
          <mesh material={materials.champagneGold}>
            <boxGeometry args={[1.68, 0.05, 1.68]} />
          </mesh>
        </group>

        {/* Engraved Filigree Medallions on Front, Left, and Right */}
        <group
          ref={filigreePlatesRef}
          name="FiligreePlatesGroup"
          onClick={handleOrnamentHighlight}
          onPointerOver={handleOrnamentHighlight}
        >
          {/* Front Celestial Astrological Dial Disc */}
          <mesh
            material={materials.antiqueGold}
            position={[0, 0, 0.812]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.26, 0.26, 0.015, 32]} />
          </mesh>
          <mesh
            material={materials.wineLacquer}
            position={[0, 0, 0.822]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.21, 0.21, 0.01, 32]} />
          </mesh>
          <mesh material={materials.champagneGold} position={[0, 0, 0.83]}>
            <torusGeometry args={[0.16, 0.015, 12, 32]} />
          </mesh>

          {/* Left & Right Filigree Discs */}
          <mesh
            material={materials.antiqueGold}
            position={[-0.80, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.24, 0.24, 0.015, 32]} />
          </mesh>
          <mesh
            material={materials.antiqueGold}
            position={[0.80, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.24, 0.24, 0.015, 32]} />
          </mesh>
        </group>

        {/* Front Clasp Assembly */}
        <group name="FrontClaspAssembly" position={[0, 0.44, 0.84]}>
          <mesh material={materials.roseGoldCore} position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.09, 16, 16]} />
          </mesh>
          <mesh ref={claspLeftRef} material={materials.champagneGold} position={[-0.12, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.14, 16]} />
          </mesh>
          <mesh ref={claspRightRef} material={materials.champagneGold} position={[0.12, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.14, 16]} />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* STAGE 5 & 6: HINGED LID, GEMSTONES & ROYAL CROWN CREST            */}
        {/* ================================================================= */}
        <group ref={lidHingeGroupRef} name="HingedLidGroup" position={[0, 0.46, -0.78]}>
          <group ref={lidContentGroupRef} position={[0, 0, 0.78]}>
            {/* Main Burgundy Enamel Top Surface */}
            <mesh material={materials.burgundyEnamel} position={[0, 0.03, 0]}>
              <boxGeometry args={[1.62, 0.06, 1.62]} />
            </mesh>
            {/* Bevelled Gold Frame */}
            <mesh
              material={materials.champagneGold}
              position={[0, 0.05, 0]}
              onClick={handleOrnamentHighlight}
            >
              <boxGeometry args={[1.7, 0.03, 1.7]} />
            </mesh>
            {/* Raised Center Ornamental Terrace */}
            <mesh material={materials.wineLacquer} position={[0, 0.075, 0]}>
              <boxGeometry args={[1.25, 0.03, 1.25]} />
            </mesh>

            {/* Concentric Gold Filigree Rings */}
            {[0.36, 0.45, 0.54].map((radius, idx) => (
              <mesh
                key={`crown-ring-${idx}`}
                material={materials.champagneGold}
                position={[0, 0.09, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={handleOrnamentHighlight}
              >
                <ringGeometry args={[radius, radius + 0.015, 36]} />
              </mesh>
            ))}

            {/* 8 Constellation Amber & Gold Gemstones around lid terrace */}
            <group ref={amberGemsGroupRef} name="AmberGemAccentsGroup">
              {starInlayPositions.map((pos, idx) => (
                <mesh
                  key={`star-inlay-${idx}`}
                  material={idx % 2 === 0 ? materials.amberGem : materials.champagneGold}
                  position={pos}
                  onClick={handleCrestClick}
                >
                  <octahedronGeometry args={[0.042, 0]} />
                </mesh>
              ))}
            </group>

            {/* Royal Crown Crest Brooch & Radiant Ruby Heart Gemstone */}
            <group
              ref={crownCrestGroupRef}
              name="RoyalCrownCrestGroup"
              position={[0, 0.08, 0]}
              onClick={handleCrestClick}
            >
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
        {/* STAGE 7: CRIMSON SATIN RIBBON & ELABORATE 3D BOW                  */}
        {/* ================================================================= */}
        <group
          ref={ribbonBowGroupRef}
          name="CrimsonSatinRibbonGroup"
          position={[0, 0.54, 0]}
          onClick={handleRibbonInteraction}
        >
          {/* Vertical Ribbon Wrap (Front-to-Back) */}
          <mesh material={materials.crimsonSatin} position={[0, -0.54, 0]}>
            <boxGeometry args={[0.22, 1.12, 1.74]} />
          </mesh>
          {/* Horizontal Ribbon Wrap (Left-to-Right) */}
          <mesh material={materials.crimsonSatin} position={[0, -0.54, 0]}>
            <boxGeometry args={[1.74, 1.12, 0.22]} />
          </mesh>

          <group ref={bowKnotGroupRef}>
            {/* Center Bow Knot */}
            <mesh material={materials.crimsonSatin} position={[0, 0.06, 0]}>
              <sphereGeometry args={[0.14, 18, 18]} />
            </mesh>

            {/* Primary Left & Right Satin Bow Loops */}
            <mesh
              material={materials.crimsonSatin}
              position={[-0.28, 0.18, 0]}
              rotation={[0, 0, 0.42]}
            >
              <torusGeometry args={[0.2, 0.065, 16, 36]} />
            </mesh>
            <mesh
              material={materials.crimsonSatin}
              position={[0.28, 0.18, 0]}
              rotation={[0, 0, -0.42]}
            >
              <torusGeometry args={[0.2, 0.065, 16, 36]} />
            </mesh>

            {/* Secondary Diagonal Satin Bow Loops for Royal Fullness */}
            <mesh
              material={materials.crimsonSatin}
              position={[-0.22, 0.16, 0.14]}
              rotation={[0.25, 0.45, 0.35]}
            >
              <torusGeometry args={[0.16, 0.05, 14, 32]} />
            </mesh>
            <mesh
              material={materials.crimsonSatin}
              position={[0.22, 0.16, 0.14]}
              rotation={[0.25, -0.45, -0.35]}
            >
              <torusGeometry args={[0.16, 0.05, 14, 32]} />
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
        </group>

        {/* ================================================================= */}
        {/* INTERIOR CAVITY: VELVET LINING, GOLDEN LIGHT & RISING PETALS      */}
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

          {/* Rising Golden Particles & Rose Petals on Box Open */}
          <group ref={risingPetalsGroupRef} scale={[0.001, 0.001, 0.001]}>
            {[
              [-0.28, 0.15, 0.18],
              [0.32, 0.28, -0.14],
              [-0.14, 0.42, -0.26],
              [0.22, 0.52, 0.24],
              [0.0, 0.64, 0.08],
              [-0.34, 0.36, -0.08],
            ].map(([px, py, pz], idx) => (
              <mesh
                key={`rising-petal-${idx}`}
                material={idx % 2 === 0 ? materials.rubyGem : materials.champagneGold}
                position={[px, py, pz]}
                rotation={[idx * 0.6, idx * 0.9, idx * 0.4]}
              >
                <octahedronGeometry args={[0.032, 0]} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
};
