// src/acts/Act4TwoSidesOfUs.tsx

import React, { useEffect } from 'react';
import { ArrowRight, Star, MousePointer } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';
import { Act4Navigation } from './act4/Act4Navigation';
import { VinylExperience } from './act4/VinylExperience';
import { ConstellationExperience } from './act4/ConstellationExperience';

export const Act4TwoSidesOfUs: React.FC = () => {
  const act4SubStage = useExperienceStore((state) => state.act4SubStage);
  const setAct4SubStage = useExperienceStore((state) => state.setAct4SubStage);
  const setVinylPlaying = useExperienceStore((state) => state.setVinylPlaying);
  const discoveredStarIds = useExperienceStore((state) => state.discoveredStarIds);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  // Stop vinyl loop when switching sub-stages or unmounting Act IV
  useEffect(() => {
    if (act4SubStage === 'constellation') {
      proceduralAudio.stopVinylLoop();
      setVinylPlaying(false);
    }
  }, [act4SubStage, setVinylPlaying]);

  useEffect(() => {
    return () => {
      proceduralAudio.stopVinylLoop();
      setVinylPlaying(false);
    };
  }, [setVinylPlaying]);

  const handleStageSelect = (stage: 'vinyl' | 'constellation') => {
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
    if (stage === 'constellation') {
      proceduralAudio.stopVinylLoop();
      setVinylPlaying(false);
    }
    setAct4SubStage(stage);
  };

  const handleProceedToAct5 = () => {
    proceduralAudio.stopVinylLoop();
    setVinylPlaying(false);
    setCurrentChapter('ACT_5');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-3 sm:px-6 lg:px-10 pt-10 sm:pt-4 pb-10 lg:pb-3 select-none overflow-x-hidden">
      {/* ─── LAYER 1: TOP NARRATIVE HEADER & SUB-STAGE SWITCHER ─── */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto animate-in fade-in duration-700">
        {/* Chapter Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D9AE50]/70 bg-[#FFF9EA]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(217,174,80,0.25)] mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E9B85B] shadow-[0_0_8px_#F8E6A0]" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#8B5E0A] font-bold">
            ACT IV · THE TWO SIDES OF US
          </span>
        </div>

        {/* Dynamic Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-serif italic text-[#FFFDF5] font-normal tracking-tight leading-tight mb-1 drop-shadow-[0_2px_18px_rgba(74,48,4,0.95)]">
          {act4SubStage === 'vinyl' ? 'The Dual-Soul Vinyl' : 'The Goosebump Constellation'}
        </h2>

        {/* Dynamic Supporting Copy */}
        <p className="text-xs sm:text-sm md:text-base text-[#F8E6A0]/95 font-serif italic max-w-xl mx-auto leading-relaxed mb-2.5 drop-shadow-md">
          {act4SubStage === 'vinyl'
            ? 'The same story... two different sides of us.'
            : 'Eight little stars... each one a feeling, a memory, or a thought about us.'}
        </p>

        {/* Sub-Stage Switcher (Dual-Soul Vinyl vs Goosebump Constellation) */}
        <Act4Navigation
          currentStage={act4SubStage}
          onSelectStage={handleStageSelect}
          discoveredStarsCount={discoveredStarIds.length}
        />
      </div>

      {/* ─── LAYER 2: ACTIVE DESTINATION STAGE (Smooth Animated Sub-Stage Transition) ─── */}
      <div
        key={act4SubStage}
        className="relative z-20 w-full my-auto flex items-center justify-center py-2 animate-in fade-in zoom-in-95 duration-500 ease-out"
      >
        {act4SubStage === 'vinyl' ? (
          <VinylExperience />
        ) : (
          <ConstellationExperience />
        )}
      </div>

      {/* ─── LAYER 3: FOOTER ACTIONS & CHAPTER V NAVIGATION ─── */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto w-full pt-2 pb-1">
        {/* Constellation Discovery Progress Pill / Hint */}
        {act4SubStage === 'constellation' ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D9AE50]/40 bg-[#1A0C06]/75 backdrop-blur-md text-xs font-mono text-[#F8E6A0]">
              <Star className="w-3.5 h-3.5 fill-[#E9B85B] text-[#E9B85B]" />
              <span>Discovered: {discoveredStarIds.length} / 8</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#F8E6A0]/80">
              <MousePointer className="w-3 h-3 text-[#E9C46A]" />
              <span>Click any star to uncover a thought</span>
            </div>
          </div>
        ) : (
          <div className="text-[11px] font-mono text-[#F8E6A0]/70">
            Two moods. Four confessions each.
          </div>
        )}

        {/* Continuation Button to Act V */}
        <button
          onClick={handleProceedToAct5}
          className="flex items-center justify-center gap-3 px-8 py-2.5 rounded-full border border-[#D9AE50] bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] hover:shadow-[0_0_30px_rgba(233,196,106,0.8)] text-[#5A3B05] font-bold text-xs font-mono tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(233,196,106,0.5)] group"
        >
          <span>CONTINUE TO ACT V →</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
