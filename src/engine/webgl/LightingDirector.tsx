// src/engine/webgl/LightingDirector.tsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';

export const LightingDirector: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const vinylSide = useExperienceStore((state) => state.vinylSide);

  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const moodPointLightRef = useRef<THREE.PointLight>(null);

  useFrame((_state, delta) => {
    if (!ambientLightRef.current || !keyLightRef.current || !rimLightRef.current || !moodPointLightRef.current) return;

    // Target light values based on active chapter
    let targetAmbient = { color: '#090B19', intensity: 0.35 };
    let targetKey = { color: '#F5EBDD', intensity: 1.2, pos: [3, 5, 4] };
    let targetRim = { color: '#FDE68A', intensity: 1.5, pos: [-4, -2, -2] };
    let targetMood = { color: '#F472B6', intensity: 1.2, pos: [0, 0, 0] };

    if (currentChapter === 'OPENING') {
      targetAmbient = { color: '#2E1065', intensity: 0.85 };
      targetKey = { color: '#FDE68A', intensity: 2.2, pos: [2, 4, 5] };
      targetRim = { color: '#FDA4AF', intensity: 2.5, pos: [-3, -1, 3] };
      targetMood = { color: '#FB7185', intensity: 1.8, pos: [-0.30, 0.35, 0.5] };
    } else if (currentChapter === 'ACT_1') {
      targetAmbient = { color: '#FFF9EA', intensity: 0.95 };
      targetKey = { color: '#F8E6A0', intensity: 2.2, pos: [2, 5, 4] };
      targetRim = { color: '#E9B85B', intensity: 1.8, pos: [-3, -1, 2] };
      targetMood = { color: '#D9AE50', intensity: 2.4, pos: [0, 0.1, 0.5] };
    } else if (currentChapter === 'ACT_3') {
      // Act 3 vanity sconces
      targetAmbient = { color: '#14050A', intensity: 0.3 };
      targetKey = { color: '#FDE68A', intensity: 1.4, pos: [2, 3, 2] };
      targetRim = { color: '#F472B6', intensity: 1.8, pos: [-2, 1, 0] };
      targetMood = { color: '#E11D48', intensity: 1.5, pos: [0, 0, 0.5] };
    } else if (currentChapter === 'ACT_4') {
      if (vinylSide === 'afterHours') {
        // Velvet crimson after-hours
        targetAmbient = { color: '#14050A', intensity: 0.25 };
        targetKey = { color: '#E11D48', intensity: 1.6, pos: [-2, 3, 3] };
        targetRim = { color: '#F472B6', intensity: 2.2, pos: [3, -1, -1] };
        targetMood = { color: '#E11D48', intensity: 2.5, pos: [0, 0.5, 0] };
      } else {
        // Warm daylight sweetheart
        targetAmbient = { color: '#090B19', intensity: 0.45 };
        targetKey = { color: '#FDE68A', intensity: 1.8, pos: [3, 4, 3] };
        targetRim = { color: '#FDA4AF', intensity: 1.2, pos: [-3, 1, -1] };
        targetMood = { color: '#FDE68A', intensity: 1.5, pos: [0, 0.5, 0] };
      }
    } else if (currentChapter === 'ACT_5') {
      const isOverheated = useExperienceStore.getState().isAlchemyOverheated;
      if (isOverheated) {
        targetAmbient = { color: '#14050A', intensity: 0.4 };
        targetKey = { color: '#E11D48', intensity: 2.4, pos: [0, 4, 2] };
        targetRim = { color: '#F59E0B', intensity: 2.0, pos: [0, -2, -2] };
        targetMood = { color: '#E11D48', intensity: 3.5, pos: [0, 0, 0] };
      } else {
        targetAmbient = { color: '#07070C', intensity: 0.35 };
        targetKey = { color: '#FDE68A', intensity: 1.4, pos: [2, 4, 3] };
        targetRim = { color: '#FDA4AF', intensity: 1.2, pos: [-2, 0, -2] };
        targetMood = { color: '#F59E0B', intensity: 1.8, pos: [0, 0, 0] };
      }
    } else if (currentChapter === 'ACT_7') {
      // Moonlit lake sapphire-silver
      targetAmbient = { color: '#070B18', intensity: 0.25 };
      targetKey = { color: '#DCE7FF', intensity: 0.95, pos: [-4, 6, 2] };
      targetRim = { color: '#FDE68A', intensity: 1.6, pos: [2, 1, 2] };
      targetMood = { color: '#FDE68A', intensity: 2.2, pos: [0, 0.28, 1.4] };
    } else if (currentChapter === 'FINAL_GIFT') {
      // Haute joaillerie showcase
      targetAmbient = { color: '#07070C', intensity: 0.3 };
      targetKey = { color: '#FDE68A', intensity: 2.0, pos: [3, 4, 4] };
      targetRim = { color: '#F472B6', intensity: 1.8, pos: [-3, 2, -2] };
      targetMood = { color: '#FDE68A', intensity: 2.8, pos: [0, 0.5, 0] };
    }

    const speed = 3.5;
    const tColorAmbient = new THREE.Color(targetAmbient.color);
    ambientLightRef.current.color.lerp(tColorAmbient, speed * delta);
    ambientLightRef.current.intensity = THREE.MathUtils.damp(
      ambientLightRef.current.intensity,
      targetAmbient.intensity,
      speed,
      delta
    );

    const tColorKey = new THREE.Color(targetKey.color);
    keyLightRef.current.color.lerp(tColorKey, speed * delta);
    keyLightRef.current.intensity = THREE.MathUtils.damp(
      keyLightRef.current.intensity,
      targetKey.intensity,
      speed,
      delta
    );

    const tColorRim = new THREE.Color(targetRim.color);
    rimLightRef.current.color.lerp(tColorRim, speed * delta);
    rimLightRef.current.intensity = THREE.MathUtils.damp(
      rimLightRef.current.intensity,
      targetRim.intensity,
      speed,
      delta
    );

    const tColorMood = new THREE.Color(targetMood.color);
    moodPointLightRef.current.color.lerp(tColorMood, speed * delta);
    moodPointLightRef.current.intensity = THREE.MathUtils.damp(
      moodPointLightRef.current.intensity,
      targetMood.intensity,
      speed,
      delta
    );
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.35} color="#090B19" />
      <directionalLight
        ref={keyLightRef}
        position={[3, 5, 4]}
        intensity={1.2}
        color="#F5EBDD"
        castShadow={false}
      />
      <spotLight
        ref={rimLightRef}
        position={[-4, -2, -2]}
        intensity={1.5}
        color="#FDE68A"
        angle={0.6}
        penumbra={0.8}
      />
      <pointLight ref={moodPointLightRef} position={[0, 0, 0]} intensity={1.2} color="#F472B6" distance={8} />
    </>
  );
};
