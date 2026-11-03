// src/engine/webgl/objects/MoonlitLakeDiorama.tsx

import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useExperienceStore } from '../../../store/useExperienceStore';

export const MoonlitLakeDiorama: React.FC = () => {
  const isExtinguished = useExperienceStore((state) => state.isCandleExtinguished);

  useFrame(() => {
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.candleExtinguishedUniform = isExtinguished ? 1.0 : 0.0;
      window.__UCI_TEST_PROBES__.fireflyActiveCount = isExtinguished ? 60 : 0;
    }
  });

  // Legacy 3D meshes disabled to preserve the cinematic photographic background plate
  // and the artisan interactive cake builder built directly on the golden pedestal.
  return null;
};
