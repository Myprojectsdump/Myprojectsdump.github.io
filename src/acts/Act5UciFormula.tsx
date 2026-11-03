// src/acts/Act5UciFormula.tsx

import React from 'react';
import { useExperienceStore } from '../store/useExperienceStore';
import { STORY_DATA } from '../config/storyContent';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';
import { Act5Navigation } from './act5/Act5Navigation';
import { AlchemyLab } from './act5/AlchemyLab';
import { ScratchVault } from './act5/ScratchVault';

export const Act5UciFormula: React.FC = () => {
  const act5SubStage = useExperienceStore((state) => state.act5SubStage);
  const setAct5SubStage = useExperienceStore((state) => state.setAct5SubStage);
  const revealedScratchIds = useExperienceStore((state) => state.revealedScratchIds);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  const totalPromises = STORY_DATA.scratchCards.length;

  const handleStageSelect = (stage: 'alchemy' | 'vault') => {
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
    setAct5SubStage(stage);
  };

  const handleProceedToAct6 = () => {
    setCurrentChapter('ACT_6');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-3 sm:px-6 py-4 select-none overflow-x-hidden">
      {/* Top Header Region (Matching Exact Creative Direction) */}
      <header className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto pt-8 sm:pt-10 mb-2">
        {/* Brand Bar is fixed globally, small chapter subtitle */}
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#D9AE50] mb-1 font-semibold drop-shadow">
          {act5SubStage === 'alchemy' ? 'ACT V · THE UCI FORMULA' : 'ACT V · THE LITTLE PROMISES'}
        </span>

        {/* Main Editorial Serif Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#FFFDF5] tracking-tight font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] mb-3">
          {act5SubStage === 'alchemy' ? 'The Magical Alchemy Lab' : 'Four Little Things I Want You to Keep'}
        </h1>

        {/* Segmented Sub-Stage Navigation */}
        <Act5Navigation
          currentStage={act5SubStage}
          revealedCount={revealedScratchIds.length}
          totalPromises={totalPromises}
          onSelectStage={handleStageSelect}
        />
      </header>

      {/* Main Experience Stage with Smooth Sub-Stage Animated Transition */}
      <main className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-auto">
        <div
          key={act5SubStage}
          className="w-full flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 ease-out"
        >
          {act5SubStage === 'alchemy' ? (
            <AlchemyLab onUnlockVault={() => handleStageSelect('vault')} />
          ) : (
            <ScratchVault
              onBackToFormula={() => handleStageSelect('alchemy')}
              onProceedToAct6={handleProceedToAct6}
            />
          )}
        </div>
      </main>
    </div>
  );
};
