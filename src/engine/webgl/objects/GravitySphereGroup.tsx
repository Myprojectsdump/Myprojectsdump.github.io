// src/engine/webgl/objects/GravitySphereGroup.tsx

import React, { useRef, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import {
  MAT_BOROSILICATE_GLASS,
  MAT_CHAMPAGNE_GOLD,
  MAT_ROSE_GOLD_CORE,
} from '../materials/luxuryMaterials';
import { transientMotionState } from '../../../store/transientMotionState';
import { gestureArbitrator } from '../../motion/gestureArbitrator';

// Construct procedural 3D sculpted heart geometry
function createHeartGeometry(): THREE.ExtrudeGeometry {
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 0.25, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
  heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
  heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 2,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  };

  const geom = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  geom.center();
  return geom;
}

export const GravitySphereGroup: React.FC = () => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const userOrbitRef = useRef<THREE.Group>(null);
  const shellNorthRef = useRef<THREE.Mesh>(null);
  const shellSouthRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Drag interaction states for 3D orbit
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.003 });

  // Generate 7 concentric orbital ring radii and distinct tilt axes
  const ringConfigs = useMemo(() => {
    return [
      { r: 1.68, tilt: [0.35, 0.2, 0.1] },
      { r: 1.81, tilt: [-0.25, 0.45, -0.15] },
      { r: 1.94, tilt: [0.15, -0.3, 0.4] },
      { r: 2.07, tilt: [-0.4, -0.2, 0.3] },
      { r: 2.20, tilt: [0.5, 0.35, -0.25] },
      { r: 2.33, tilt: [-0.3, 0.5, 0.2] },
      { r: 2.45, tilt: [0.2, -0.45, -0.35] },
    ];
  }, []);

  // Heart geometry
  const heartGeometry = useMemo(() => createHeartGeometry(), []);

  // Instanced cosmic dust particles (1400 points)
  const dustParticles = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.6 + Math.random() * 2.2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  useFrame((_state, delta) => {
    const scroll = transientMotionState.actScrollProgress.ACT_1 || 0;

    // Apply damped inertia to user orbit
    if (!isDragging.current && userOrbitRef.current) {
      userOrbitRef.current.rotation.y += rotationVelocity.current.y;
      userOrbitRef.current.rotation.x += rotationVelocity.current.x;
      rotationVelocity.current.x *= 0.94;
      rotationVelocity.current.y = THREE.MathUtils.damp(rotationVelocity.current.y, 0.002, 3.0, delta);
    }

    // Exploded view transformations based on scroll (0.0 to 1.0)
    if (shellNorthRef.current && shellSouthRef.current) {
      const sepY = THREE.MathUtils.lerp(0.02, 1.95, scroll);
      const rotZ = THREE.MathUtils.lerp(0, 0.31, scroll);

      shellNorthRef.current.position.y = sepY;
      shellNorthRef.current.rotation.z = rotZ;

      shellSouthRef.current.position.y = -sepY;
      shellSouthRef.current.rotation.z = -rotZ;

      // Update test probe
      if (window.__UCI_TEST_PROBES__) {
        window.__UCI_TEST_PROBES__.hemisphereSeparationY = sepY;
      }
    }

    // Rings expansion and independent gimbal rotation
    if (ringsRef.current) {
      const ringScale = THREE.MathUtils.lerp(1.0, 1.45, scroll);
      ringsRef.current.scale.set(ringScale, ringScale, ringScale);

      ringsRef.current.children.forEach((child, i) => {
        const speed = (i + 1) * 0.15;
        child.rotation.z += delta * speed * (i % 2 === 0 ? 1 : -1);
      });

      if (window.__UCI_TEST_PROBES__) {
        window.__UCI_TEST_PROBES__.ringExpansionProgress = scroll;
      }
    }

    // Central Heart subtle breathing pulse
    if (heartRef.current) {
      const pulse = 0.5 + Math.sin(_state.clock.elapsedTime * 2.5) * 0.035;
      heartRef.current.scale.set(pulse, pulse, pulse);
      heartRef.current.rotation.y += delta * 0.2;
    }

    // Cosmic dust slow rotation
    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.05;
    }

    // Update rotation probe
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
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      <group
        ref={userOrbitRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Northern Glass Hemisphere */}
        <mesh ref={shellNorthRef} material={MAT_BOROSILICATE_GLASS} position={[0, 0.02, 0]}>
          <sphereGeometry args={[1.55, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Southern Glass Hemisphere */}
        <mesh
          ref={shellSouthRef}
          material={MAT_BOROSILICATE_GLASS}
          position={[0, -0.02, 0]}
          rotation={[Math.PI, 0, 0]}
        >
          <sphereGeometry args={[1.55, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Seven Concentric Orbital Rings */}
        <group ref={ringsRef}>
          {ringConfigs.map((cfg, i) => (
            <group
              key={i}
              rotation={[cfg.tilt[0] as number, cfg.tilt[1] as number, cfg.tilt[2] as number]}
            >
              <mesh material={MAT_CHAMPAGNE_GOLD}>
                <torusGeometry args={[cfg.r, 0.016, 16, 100]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Central Luminous Rose-Gold Heart */}
        <mesh ref={heartRef} geometry={heartGeometry} material={MAT_ROSE_GOLD_CORE} position={[0, 0, 0]}>
          <pointLight color="#F472B6" intensity={2.4} distance={6} />
        </mesh>

        {/* Cosmic Dust Halo */}
        <points ref={dustRef} geometry={dustParticles}>
          <pointsMaterial
            size={0.035}
            color="#FDE68A"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </group>
    </group>
  );
};
