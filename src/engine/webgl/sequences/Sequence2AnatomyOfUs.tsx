// src/engine/webgl/sequences/Sequence2AnatomyOfUs.tsx

import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { MechanicalMirrorRig } from '../objects/MechanicalMirrorRig';
import { DualSoulTurntable } from '../objects/DualSoulTurntable';
import { ConstellationAstrolabe } from '../objects/ConstellationAstrolabe';
import { AlchemyVesselRig } from '../objects/AlchemyVesselRig';

export const Sequence2AnatomyOfUs: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);

  // Sequence 2 is active during ACT_3, ACT_4, ACT_5
  const isVisible = ['ACT_3', 'ACT_4', 'ACT_5'].includes(currentChapter);

  if (!isVisible) return null;

  return (
    <group name="Sequence2RootGroup">
      <MechanicalMirrorRig />
      <DualSoulTurntable />
      <ConstellationAstrolabe />
      <AlchemyVesselRig />
    </group>
  );
};
