// src/engine/webgl/objects/OrbitalHeartAssembly.tsx

import React, { useRef, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { transientMotionState } from '../../../store/transientMotionState';
import { gestureArbitrator } from '../../motion/gestureArbitrator';
import { useExperienceStore } from '../../../store/useExperienceStore';

// Construct true 3D volumetric faceted brilliant-cut crystalline heart geometry
function createFacetedDiamondHeart(N: number = 22): THREE.BufferGeometry {
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

    // Table triangles (pointing forward)
    indices.push(0, tNext, tK);

    // Crown upper tier
    indices.push(tK, tNext, cNext);
    indices.push(tK, cNext, cK);

    // Crown lower tier to girdle
    indices.push(cK, cNext, gNext);
    indices.push(cK, gNext, gK);

    // Pavilion to intermediate ring
    indices.push(gK, gNext, pNext);
    indices.push(gK, pNext, pK);

    // Pavilion to culet tip
    indices.push(pK, pNext, culetIdx);
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setIndex(indices);
  const nonIndexed = geom.toNonIndexed();
  nonIndexed.computeVertexNormals();
  geom.computeBoundingBox();
  return nonIndexed;
}

// 7 Distinct Astrolabe Orbital Ring Specifications (proportioned to surround heart)
interface RingSpec {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  rotationSpeed: number;
  spawnOffset: [number, number, number];
  gimbals: number[]; // radian angles along circumference
}

const RING_SPECS: RingSpec[] = [
  {
    radius: 0.64,
    tube: 0.017,
    tilt: [0.25, 0.1, 0.0],
    rotationSpeed: 0.16,
    spawnOffset: [-5, 4, -3],
    gimbals: [0, Math.PI],
  },
  {
    radius: 0.71,
    tube: 0.016,
    tilt: [0.75, 0.35, 0.2],
    rotationSpeed: -0.20,
    spawnOffset: [4, -4, -3],
    gimbals: [Math.PI * 0.45, Math.PI * 1.45],
  },
  {
    radius: 0.78,
    tube: 0.015,
    tilt: [-0.75, -0.35, -0.2],
    rotationSpeed: 0.14,
    spawnOffset: [-4, -5, 3],
    gimbals: [0, Math.PI * 0.75, Math.PI * 1.5],
  },
  {
    radius: 0.85,
    tube: 0.015,
    tilt: [1.45, 0.1, 0.0],
    rotationSpeed: -0.17,
    spawnOffset: [5, 5, -2],
    gimbals: [Math.PI * 0.25, Math.PI * 1.25],
  },
  {
    radius: 0.92,
    tube: 0.014,
    tilt: [-0.45, 0.85, 0.4],
    rotationSpeed: 0.19,
    spawnOffset: [-4, 4, 4],
    gimbals: [Math.PI * 0.5, Math.PI * 1.5],
  },
  {
    radius: 0.99,
    tube: 0.014,
    tilt: [0.85, -0.75, -0.3],
    rotationSpeed: -0.13,
    spawnOffset: [4, -4, 4],
    gimbals: [0, Math.PI * 0.6, Math.PI * 1.3],
  },
  {
    radius: 1.06,
    tube: 0.013,
    tilt: [0.35, -0.2, 0.9],
    rotationSpeed: 0.11,
    spawnOffset: [0, 5, -4],
    gimbals: [Math.PI * 0.33, Math.PI * 1.0, Math.PI * 1.66],
  },
];

export const OrbitalHeartAssembly: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const isOpening = currentChapter === 'OPENING';
  const rootGroupRef = useRef<THREE.Group>(null);
  const userOrbitRef = useRef<THREE.Group>(null);
  const heartGroupRef = useRef<THREE.Group>(null);
  const outerHeartRef = useRef<THREE.Mesh>(null);
  const innerHeartRef = useRef<THREE.Mesh>(null);
  const innerLightRef = useRef<THREE.PointLight>(null);
  const amberLightRef = useRef<THREE.PointLight>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Act 1 glass shells
  const shellNorthRef = useRef<THREE.Mesh>(null);
  const shellSouthRef = useRef<THREE.Mesh>(null);

  // Drag interaction states for 3D user inspection
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.0025 });

  // Custom 3D volumetric faceted crystalline heart geometries (outer shell and inner diamond core)
  const outerHeartGeometry = useMemo(() => createFacetedDiamondHeart(22), []);

  const innerHeartGeometry = useMemo(() => {
    const geom = createFacetedDiamondHeart(16);
    geom.scale(0.56, 0.56, 0.56);
    return geom;
  }, []);

  // Outer Crystalline Faceted Heart: Rich Sparkling Amber-Golden Gem
  const crystallineMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F59E0B'), // Deep Amber Honey
      emissive: new THREE.Color('#D97706'), // Radiant Amber Gold
      emissiveIntensity: 0.88,
      metalness: 0.18,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      flatShading: true, // Crucial: crisp brilliant diamond facets!
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
    });
  }, []);

  // Inner Radiant Core: Warm Honey Golden White Core
  const innerCoreMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFDF5'),
      emissive: new THREE.Color('#F59E0B'),
      emissiveIntensity: 1.6,
      roughness: 0.15,
      metalness: 0.12,
      flatShading: true,
    });
  }, []);

  // Seven Orbital Rings Material: Radiant Champagne Gold with Amber Shimmer
  const goldRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FBBF24'), // Warm Golden Amber
      emissive: new THREE.Color('#D97706'), // Warm Amber Glow
      emissiveIntensity: 0.52,
      metalness: 0.42,
      roughness: 0.18,
    });
  }, []);

  // Outer Borosilicate Glass Sphere: Crystal-Clear Luminous Bubble (Zero Dark Seam / Rim)
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFDF5'),
      transparent: true,
      opacity: 0.20,
      roughness: 0.08,
      metalness: 0.0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.05,
      reflectivity: 0.25,
      depthWrite: false, // Prevents depth occlusion and dark clipping line!
      side: THREE.FrontSide, // Eliminates backface normal inversion and dark seam!
    });
  }, []);

  // Soft Circular Bokeh Texture for Stardust
  const particleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(253, 230, 138, 0.95)');
    grad.addColorStop(0.6, 'rgba(251, 113, 133, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Golden Stardust Particles (1,000 points)
  const { dustGeometry, originalPositions, targetPositions } = useMemo(() => {
    const count = 1000;
    const orig = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const live = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Outer spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rOuter = 5.0 + Math.random() * 7.0;
      orig[i * 3] = rOuter * Math.sin(phi) * Math.cos(theta);
      orig[i * 3 + 1] = rOuter * Math.sin(phi) * Math.sin(theta);
      orig[i * 3 + 2] = rOuter * Math.cos(phi);

      // Inner target distribution surrounding orbital rings
      const rInner = 0.8 + Math.random() * 1.5;
      const tInner = Math.random() * Math.PI * 2;
      const yInner = (Math.random() - 0.5) * 1.2;
      target[i * 3] = rInner * Math.cos(tInner);
      target[i * 3 + 1] = yInner;
      target[i * 3 + 2] = rInner * Math.sin(tInner);

      live[i * 3] = orig[i * 3];
      live[i * 3 + 1] = orig[i * 3 + 1];
      live[i * 3 + 2] = orig[i * 3 + 2];
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(live, 3));
    return { dustGeometry: geom, originalPositions: orig, targetPositions: target };
  }, []);

  useFrame((state, delta) => {
    const isOpening = currentChapter === 'OPENING';
    const scroll = transientMotionState.actScrollProgress.ACT_1 || 0;

    // Apply damped inertia to user orbit
    if (!isDragging.current && userOrbitRef.current) {
      userOrbitRef.current.rotation.y += rotationVelocity.current.y;
      userOrbitRef.current.rotation.x += rotationVelocity.current.x;
      rotationVelocity.current.x *= 0.94;
      rotationVelocity.current.y = THREE.MathUtils.damp(
        rotationVelocity.current.y,
        0.002,
        3.0,
        delta
      );
    }

    // In OPENING: Align group over the cosmic light beam (-0.30, 0.35, 0)
    // In ACT_1: Align group at water level (0, 0.02, 0) for serene lake resting
    if (rootGroupRef.current) {
      const targetX = isOpening ? -0.30 : 0;
      const targetY = isOpening ? 0.35 : 0.02;
      rootGroupRef.current.position.x = THREE.MathUtils.damp(
        rootGroupRef.current.position.x,
        targetX,
        4.0,
        delta
      );
      rootGroupRef.current.position.y = THREE.MathUtils.damp(
        rootGroupRef.current.position.y,
        targetY,
        4.0,
        delta
      );
    }

    // Heart Scaling, Illumination, and Breathing Pulse
    if (heartGroupRef.current) {
      let baseScale = isOpening ? transientMotionState.openingHeartScale : 0.54;
      const glow = isOpening ? transientMotionState.openingHeartGlow : 1.0;

      // Breathing pulse when alive
      if (baseScale > 0.05) {
        const breathing = 1.0 + Math.sin(state.clock.elapsedTime * 2.2) * 0.035;
        const s = baseScale * breathing;
        heartGroupRef.current.scale.set(s, s, s);
        heartGroupRef.current.rotation.y += delta * 0.18;
      } else {
        heartGroupRef.current.scale.set(0.001, 0.001, 0.001);
      }

      // Dynamic inner emissive lighting
      if (innerHeartRef.current) {
        innerCoreMaterial.emissiveIntensity = THREE.MathUtils.lerp(
          0.3,
          1.6,
          glow
        );
      }
      if (crystallineMaterial) {
        crystallineMaterial.emissiveIntensity = THREE.MathUtils.lerp(
          0.15,
          0.65,
          glow
        );
      }
      if (innerLightRef.current) {
        innerLightRef.current.intensity = THREE.MathUtils.lerp(0.5, 2.8, glow);
      }
      if (amberLightRef.current) {
        amberLightRef.current.intensity = THREE.MathUtils.lerp(0.4, 2.0, glow);
      }
    }

    // 7 Astrolabe Orbital Rings Sequential Arrival & Rotation
    if (ringsRef.current) {
      const ringScaleMultiplier = !isOpening
        ? THREE.MathUtils.lerp(1.0, 1.45, scroll)
        : 1.0;

      ringsRef.current.children.forEach((child, i) => {
        const spec = RING_SPECS[i];
        if (!spec) return;

        const progress = isOpening
          ? transientMotionState.openingRingProgress[i] ?? 0
          : 1.0;

        if (progress <= 0.001) {
          child.scale.set(0.0001, 0.0001, 0.0001);
          child.position.set(...spec.spawnOffset);
        } else if (progress < 0.999) {
          // Smooth power2 easing into target position
          const ease = THREE.MathUtils.smoothstep(progress, 0, 1);
          child.position.x = THREE.MathUtils.lerp(spec.spawnOffset[0], 0, ease);
          child.position.y = THREE.MathUtils.lerp(spec.spawnOffset[1], 0, ease);
          child.position.z = THREE.MathUtils.lerp(spec.spawnOffset[2], 0, ease);

          const s = ease * ringScaleMultiplier;
          child.scale.set(s, s, s);
          child.rotation.z += delta * spec.rotationSpeed * 2.5;
        } else {
          // Fully assembled: lock to center and rotate gracefully
          child.position.set(0, 0, 0);
          child.scale.set(ringScaleMultiplier, ringScaleMultiplier, ringScaleMultiplier);
          child.rotation.z += delta * spec.rotationSpeed;
        }
      });

      if (window.__UCI_TEST_PROBES__) {
        window.__UCI_TEST_PROBES__.ringExpansionProgress = scroll;
      }
    }

    // Stardust Convergence & Ambient Swirl
    if (dustRef.current) {
      const posAttr = dustRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      const conv = isOpening
        ? transientMotionState.openingParticlesConvergence
        : 1.0;

      if (conv < 0.999) {
        for (let i = 0; i < 1000; i++) {
          const idx = i * 3;
          positions[idx] = THREE.MathUtils.lerp(
            originalPositions[idx],
            targetPositions[idx],
            conv
          );
          positions[idx + 1] = THREE.MathUtils.lerp(
            originalPositions[idx + 1],
            targetPositions[idx + 1],
            conv
          );
          positions[idx + 2] = THREE.MathUtils.lerp(
            originalPositions[idx + 2],
            targetPositions[idx + 2],
            conv
          );
        }
        posAttr.needsUpdate = true;
      }

      dustRef.current.rotation.y += delta * 0.06;
    }

    // Act 1 Glass Hemispheres (visible only during Act 1 exploded view)
    if (shellNorthRef.current && shellSouthRef.current) {
      if (isOpening) {
        shellNorthRef.current.visible = false;
        shellSouthRef.current.visible = false;
      } else {
        shellNorthRef.current.visible = true;
        shellSouthRef.current.visible = true;
        const sepY = THREE.MathUtils.lerp(0.0, 1.8, scroll);
        const rotZ = THREE.MathUtils.lerp(0, 0.28, scroll);

        shellNorthRef.current.position.y = sepY;
        shellNorthRef.current.rotation.z = rotZ;

        shellSouthRef.current.position.y = -sepY;
        shellSouthRef.current.rotation.z = -rotZ;

        if (window.__UCI_TEST_PROBES__) {
          window.__UCI_TEST_PROBES__.hemisphereSeparationY = sepY;
        }
      }
    }

    if (window.__UCI_TEST_PROBES__ && userOrbitRef.current) {
      window.__UCI_TEST_PROBES__.sphereRotationDelta = userOrbitRef.current.rotation.y;
    }
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (gestureArbitrator.requestLock('orbit3d')) {
      isDragging.current = true;
      previousPointer.current = { x: e.clientX, y: e.clientY };
      if (e.nativeEvent.target instanceof HTMLElement) {
        try {
          e.nativeEvent.target.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current || !userOrbitRef.current) return;
    const deltaX = e.clientX - previousPointer.current.x;
    const deltaY = e.clientY - previousPointer.current.y;
    previousPointer.current = { x: e.clientX, y: e.clientY };

    rotationVelocity.current = {
      x: deltaY * 0.003,
      y: deltaX * 0.003,
    };

    userOrbitRef.current.rotation.y += deltaX * 0.005;
    userOrbitRef.current.rotation.x += deltaY * 0.005;
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging.current) {
      isDragging.current = false;
      gestureArbitrator.releaseLock('orbit3d');
      if (e.nativeEvent.target instanceof HTMLElement) {
        try {
          e.nativeEvent.target.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    }
  };

  return (
    <group ref={rootGroupRef} position={[-0.30, 0.35, 0]}>
      <group
        ref={userOrbitRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Act 1 Northern Glass Hemisphere */}
        <mesh
          ref={shellNorthRef}
          material={glassMaterial}
          position={[0, 0, 0]}
          renderOrder={10}
          visible={false}
        >
          <sphereGeometry args={[1.20, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Act 1 Southern Glass Hemisphere */}
        <mesh
          ref={shellSouthRef}
          material={glassMaterial}
          position={[0, 0, 0]}
          rotation={[Math.PI, 0, 0]}
          renderOrder={10}
          visible={false}
        >
          <sphereGeometry args={[1.20, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Seven Astrolabe Orbital Rings with Mounted Gimbals */}
        <group ref={ringsRef}>
          {RING_SPECS.map((spec, i) => (
            <group
              key={i}
              rotation={spec.tilt}
              position={spec.spawnOffset}
              scale={[0.0001, 0.0001, 0.0001]}
            >
              {/* Primary Elegant Golden Ribbon Band */}
              <mesh material={goldRingMaterial}>
                <torusGeometry args={[spec.radius, spec.tube, 20, 120]} />
              </mesh>

              {/* Spherical Golden Gimbals Mounted Along Ring */}
              {spec.gimbals.map((angle, gi) => (
                <mesh
                  key={gi}
                  material={goldRingMaterial}
                  position={[
                    spec.radius * Math.cos(angle),
                    spec.radius * Math.sin(angle),
                    0,
                  ]}
                >
                  <sphereGeometry args={[spec.tube * 1.8, 16, 16]} />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* Central Volumetric Crystalline Golden Heart */}
        <group ref={heartGroupRef} scale={[0.001, 0.001, 0.001]}>
          {/* Outer Faceted Crystalline Shell */}
          <mesh
            ref={outerHeartRef}
            geometry={outerHeartGeometry}
            material={crystallineMaterial}
            position={[0, 0, 0]}
          />

          {/* Inner Radiant Glowing Core */}
          <mesh
            ref={innerHeartRef}
            geometry={innerHeartGeometry}
            material={innerCoreMaterial}
            position={[0, 0, 0]}
          />

          {/* Internal Radiance Point Lights */}
          <pointLight
            ref={innerLightRef}
            color="#FFF9EA"
            intensity={1.5}
            distance={5}
            decay={2}
          />
          <pointLight
            ref={amberLightRef}
            color="#E9B85B"
            intensity={1.2}
            distance={4}
            decay={2}
          />
        </group>

        {/* Golden Lake Reflection Ripple Halo (visible during Act 1) */}
        {!isOpening && (
          <group position={[0, -1.18, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.75, 1.25, 64]} />
              <meshBasicMaterial
                color="#D9AE50"
                transparent
                opacity={0.34}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.30, 1.70, 64]} />
              <meshBasicMaterial
                color="#FBBF24"
                transparent
                opacity={0.18}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        )}

        {/* Converging Stardust Energy Halo */}
        <points ref={dustRef} geometry={dustGeometry}>
          <pointsMaterial
            size={0.065}
            map={particleTexture}
            color="#FDE68A"
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      </group>
    </group>
  );
};
