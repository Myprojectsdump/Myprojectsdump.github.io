// src/engine/webgl/PersistentStage.tsx

import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraRig } from './CameraRig';
import { LightingDirector } from './LightingDirector';
import { Sequence1GravityEngine } from './sequences/Sequence1GravityEngine';
import { Sequence2AnatomyOfUs } from './sequences/Sequence2AnatomyOfUs';
import { Sequence3ImpossibleGift } from './sequences/Sequence3ImpossibleGift';
import { MemoryFramesCluster } from './objects/MemoryFramesCluster';
import { SceneErrorBoundary } from '../../components/fallback/SceneErrorBoundary';
import { WebGLFallbackStage } from '../../components/fallback/WebGLFallbackStage';
import { setPointerNdc } from '../../store/transientMotionState';
import type { UciTestProbes } from '../../types/scene.types';

// Default global test probes
if (typeof window !== 'undefined') {
  const probes: UciTestProbes = {
    sphereRotationDelta: 0,
    hemisphereSeparationY: 0,
    ringExpansionProgress: 0,
    turntableRpm: 0,
    litConstellationCount: 0,
    flaskFillLevel: 0.05,
    corkWorldY: 0,
    fingerprintGapDistance: 3.7,
    candleExtinguishedUniform: 0,
    fireflyActiveCount: 0,
    giftLidHingeAngleDeg: 0,
    activeMicTrackCount: 0,
    masterAudioState: 'uninitialized',
  };
  window.__UCI_TEST_PROBES__ = probes;
}

interface PersistentStageProps {
  children?: React.ReactNode;
}

export const PersistentStage: React.FC<PersistentStageProps> = ({ children }) => {
  const [dpr] = useState<number>(() =>
    typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.75) : 1
  );
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsDocumentHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handlePointerMove = (e: PointerEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointerNdc(ndcX, ndcY);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <SceneErrorBoundary fallback={<WebGLFallbackStage />}>
      <div className="fixed inset-0 pointer-events-none z-10">
        <Canvas
          dpr={dpr}
          frameloop={isDocumentHidden ? 'demand' : 'always'}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
            stencil: false,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.08;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.setClearColor(0x000000, 0);

            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('WebGL context lost, awaiting restoration...');
            });

            gl.domElement.addEventListener('webglcontextrestored', () => {
              console.info('WebGL context restored successfully.');
            });
          }}
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        >
          <CameraRig />
          <LightingDirector />
          <Sequence1GravityEngine />
          <MemoryFramesCluster />
          <Sequence2AnatomyOfUs />
          <Sequence3ImpossibleGift />
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
};
