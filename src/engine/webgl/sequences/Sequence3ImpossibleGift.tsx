// src/engine/webgl/sequences/Sequence3ImpossibleGift.tsx

import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { TwinFingerprintField } from '../objects/TwinFingerprintField';
import { MoonlitLakeDiorama } from '../objects/MoonlitLakeDiorama';
import { LuxuryGiftBoxRig } from '../objects/LuxuryGiftBoxRig';
import { CelestialAstrolabeHeartRig } from '../objects/CelestialAstrolabeHeartRig';

export const Sequence3ImpossibleGift: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);

  // Sequence 3 is active during ACT_6, ACT_7, FINAL_GIFT, AFTER_CREDITS, FINAL_LOVE_LETTER
  const isVisible = ['ACT_6', 'ACT_7', 'FINAL_GIFT', 'AFTER_CREDITS', 'FINAL_LOVE_LETTER'].includes(currentChapter);

  if (!isVisible) return null;

  return (
    <group name="Sequence3RootGroup">
      <TwinFingerprintField />
      <MoonlitLakeDiorama />
      <LuxuryGiftBoxRig />
      <CelestialAstrolabeHeartRig />
    </group>
  );
};
