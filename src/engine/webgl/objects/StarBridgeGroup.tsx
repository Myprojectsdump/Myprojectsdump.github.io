// src/engine/webgl/objects/StarBridgeGroup.tsx

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAT_CHAMPAGNE_GOLD } from '../materials/luxuryMaterials';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { transientMotionState } from '../../../store/transientMotionState';
import { proceduralAudio } from '../../audio/ProceduralAudio';

export const StarBridgeGroup: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bridgeMeshRef = useRef<THREE.Mesh>(null);
  const starYouRef = useRef<THREE.Mesh>(null);
  const starUciRef = useRef<THREE.Mesh>(null);

  const isBridgeConnected = useExperienceStore((state) => state.isBridgeConnected);
  const setBridgeConnected = useExperienceStore((state) => state.setBridgeConnected);

  // Quadratic Bezier curve points: YOU (-3.6, 0.25, 0), Apex (0, 1.35, 0.4), UCI (+3.6, 0.25, 0)
  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-3.6, 0.25, 0),
      new THREE.Vector3(0, 1.35, 0.4),
      new THREE.Vector3(3.6, 0.25, 0)
    );
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.025, 12, false);
  }, [curve]);

  useFrame((_state) => {
    const scroll = transientMotionState.actScrollProgress.ACT_1 || 0;
    if (!groupRef.current) return;

    // Stars emerge when scroll >= 0.70
    const visibility = THREE.MathUtils.smoothstep(scroll, 0.7, 0.95);
    groupRef.current.position.y = THREE.MathUtils.lerp(-1.0, 0, visibility);
    groupRef.current.scale.setScalar(visibility);

    // Pulse stars
    if (starYouRef.current && starUciRef.current) {
      const pulse = 1.0 + Math.sin(_state.clock.elapsedTime * 4.0) * 0.12;
      starYouRef.current.scale.setScalar(pulse);
      starUciRef.current.scale.setScalar(pulse);
    }

    // Bridge tube visibility
    if (bridgeMeshRef.current) {
      bridgeMeshRef.current.visible = isBridgeConnected || scroll >= 0.92;
    }
  });

  const handleConnect = () => {
    if (!isBridgeConnected) {
      setBridgeConnected(true);
      proceduralAudio.playStarBridgeChime();
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Left Star — YOU */}
      <mesh
        ref={starYouRef}
        position={[-3.6, 0.25, 0]}
        material={MAT_CHAMPAGNE_GOLD}
        onClick={handleConnect}
      >
        <icosahedronGeometry args={[0.18, 2]} />
        <pointLight color="#FDE68A" intensity={1.8} distance={4} />
      </mesh>

      {/* Right Star — UCI */}
      <mesh
        ref={starUciRef}
        position={[3.6, 0.25, 0]}
        material={MAT_CHAMPAGNE_GOLD}
        onClick={handleConnect}
      >
        <icosahedronGeometry args={[0.22, 2]} />
        <pointLight color="#FDA4AF" intensity={2.2} distance={4} />
      </mesh>

      {/* Connecting Golden Bridge Tube */}
      <mesh ref={bridgeMeshRef} geometry={tubeGeometry} material={MAT_CHAMPAGNE_GOLD} />
    </group>
  );
};
