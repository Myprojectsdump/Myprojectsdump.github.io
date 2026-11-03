// src/engine/webgl/CameraRig.tsx

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { transientMotionState } from '../../store/transientMotionState';
import { ChapterId, CameraPreset } from '../../types/scene.types';

const STAGE_PRESETS: Record<ChapterId, CameraPreset> = {
  PRELUDE: {
    position: [0.0, 0.1, 7.8],
    lookAt: [0.0, 0.0, 0.0],
    fov: 40,
  },
  OPENING: {
    position: [0.0, 0.1, 7.8],
    lookAt: [0.0, 0.0, 0.0],
    fov: 40,
  },
  ACT_1: {
    position: [0.0, 0.08, 9.6],
    lookAt: [0.0, -0.05, 0.0],
    fov: 38,
  },
  ACT_2: {
    position: [0.0, 0.0, 7.0],
    lookAt: [0.0, 0.0, -1.5],
    fov: 42,
  },
  ACT_3: {
    position: [0.0, 0.0, 4.8],
    lookAt: [0.0, 0.0, -1.0],
    fov: 38,
  },
  ACT_4: {
    position: [-1.15, 2.35, 3.85],
    lookAt: [-0.9, 0.0, 0.0],
    fov: 38,
  },
  ACT_5: {
    position: [0.0, 0.35, 5.6],
    lookAt: [0.0, 0.2, 0.0],
    fov: 40,
  },
  ACT_6: {
    position: [0.0, 0.0, 5.2],
    lookAt: [0.0, 0.0, 0.0],
    fov: 38,
  },
  ACT_7: {
    position: [0.0, 1.15, 6.2],
    lookAt: [0.0, 0.5, 0.0],
    fov: 42,
  },
  FINAL_GIFT: {
    position: [0.0, 1.45, 5.1],
    lookAt: [0.0, 0.15, 0.0],
    fov: 38,
  },
  AFTER_CREDITS: {
    position: [0.0, 1.8, 7.8],
    lookAt: [0.0, 0.0, 0.0],
    fov: 40,
  },
  FINAL_LOVE_LETTER: {
    position: [0.0, 0.45, 6.2],
    lookAt: [0.0, 0.05, 0.0],
    fov: 40,
  },
};

export const CameraRig: React.FC = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const { size } = useThree();

  useFrame((_state, delta) => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;

    const preset = STAGE_PRESETS[currentChapter] || STAGE_PRESETS.OPENING;
    const progress = transientMotionState.actScrollProgress[currentChapter] || 0;

    // Viewport aspect ratio FOV compensation
    const aspect = size.width / Math.max(1, size.height);
    const aspectComp = aspect < 1.77 || size.width < 1400 ? 2.5 : 0;
    const targetFov = preset.fov + aspectComp;

    // Calculate target position and lookAt with chapter-specific progress interpolation
    const targetPos = new THREE.Vector3(...preset.position);
    const targetLook = new THREE.Vector3(...preset.lookAt);

    if (currentChapter === 'ACT_1') {
      // Act 1 pulls back as exploded view expands
      targetPos.y = THREE.MathUtils.lerp(0.2, 0.4, progress);
      targetPos.z = THREE.MathUtils.lerp(6.4, 8.2, progress);
    } else if (currentChapter === 'ACT_3') {
      // Act 3 portal dive through mirror
      targetPos.z = THREE.MathUtils.lerp(4.8, -0.6, progress);
    } else if (currentChapter === 'ACT_7') {
      // Act 7 tilts upward into moonlit sky
      targetPos.y = THREE.MathUtils.lerp(1.15, 2.4, progress);
      targetPos.z = THREE.MathUtils.lerp(6.2, 6.8, progress);
      targetLook.y = THREE.MathUtils.lerp(0.5, 2.2, progress);
    } else if (currentChapter === 'FINAL_GIFT') {
      // Stable cinematic framing for royal gift on table pedestal
      targetPos.x = 0.0;
      targetPos.y = 1.25;
      targetPos.z = 5.0;
      targetLook.x = 0.0;
      targetLook.y = 0.1;
      targetLook.z = 0.0;
    }

    // Parallax pointer drift (subtle and cinematic)
    const px = transientMotionState.pointerNdc.x * 0.15;
    const py = transientMotionState.pointerNdc.y * 0.12;
    targetPos.x += px;
    targetPos.y += py;

    // Smooth damping
    const dampSpeed = 4.5;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, dampSpeed, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y, dampSpeed, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, dampSpeed, delta);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLook.x, dampSpeed, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLook.y, dampSpeed, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLook.z, dampSpeed, delta);

    camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, dampSpeed, delta);
    camera.updateProjectionMatrix();

    camera.lookAt(currentLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 14]}
      fov={40}
      near={0.1}
      far={120}
    />
  );
};
