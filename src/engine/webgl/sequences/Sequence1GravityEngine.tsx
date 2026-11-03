// src/engine/webgl/sequences/Sequence1GravityEngine.tsx

import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { OrbitalHeartAssembly } from '../objects/OrbitalHeartAssembly';
import { StarBridgeGroup } from '../objects/StarBridgeGroup';

export const Sequence1GravityEngine: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);

  // Sequence 1 is visible during OPENING, ACT_1, and ACT_2
  const isVisible = ['OPENING', 'ACT_1', 'ACT_2'].includes(currentChapter);

  if (!isVisible) return null;

  return (
    <group name="Sequence1RootGroup">
      <OrbitalHeartAssembly />
      <StarBridgeGroup />
    </group>
  );
};
