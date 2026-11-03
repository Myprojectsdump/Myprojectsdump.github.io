// src/acts/Act7MoonlitWish.tsx

import React, { useCallback } from 'react';
import { Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';
import { Act7Navigation } from './act7/Act7Navigation';
import { CakeStepPanel } from './act7/cake/CakeStepPanel';
import { CakeAssembly } from './act7/cake/CakeAssembly';
import { CakeBlowControls } from './act7/cake/CakeBlowControls';
import { SkyLanternExperience } from './act7/lantern/SkyLanternExperience';
import { BirthdayLetterExperience } from './act7/letter/BirthdayLetterExperience';

export const Act7MoonlitWish: React.FC = () => {
  const act7SubStage = useExperienceStore((state) => state.act7SubStage);
  const setAct7SubStage = useExperienceStore((state) => state.setAct7SubStage);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  const handleProceedToGift = useCallback(() => {
    setCurrentChapter('FINAL_GIFT');
  }, [setCurrentChapter]);

  const handleBack = useCallback(() => {
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
    if (act7SubStage === 'cake') {
      setCurrentChapter('ACT_6');
    } else if (act7SubStage === 'lantern') {
      setAct7SubStage('cake');
    } else {
      setAct7SubStage('lantern');
    }
  }, [act7SubStage, setCurrentChapter, setAct7SubStage]);

  const handleNext = useCallback(() => {
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
    if (act7SubStage === 'cake') {
      setAct7SubStage('lantern');
    } else if (act7SubStage === 'lantern') {
      setAct7SubStage('letter');
    } else {
      handleProceedToGift();
    }
  }, [act7SubStage, setAct7SubStage, handleProceedToGift]);

  return (
    <div className="relative w-full h-screen max-h-screen flex flex-col justify-between p-2 sm:p-3 select-none overflow-hidden">
      {/* Top Header Region with comfortable clearance under TopBrandBar */}
      <header className="relative z-20 flex flex-col items-center text-center max-w-xl mx-auto pt-11 sm:pt-13 flex-shrink-0">
        {/* Eyebrow */}
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#D9AE50]/90 mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
          THE GRAVITY OF UCI • ACT VII • THE MOONLIT BIRTHDAY WISH
        </span>

        {/* Dynamic Chapter Headline */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-[#FFF9EA] tracking-tight mb-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {act7SubStage === 'cake'
            ? 'Make A Wish, Cintaku'
            : act7SubStage === 'lantern'
            ? '60 Fireflies & Sky Lantern'
            : 'The Sealed Birthday Letter'}
        </h2>

        {/* Romantic Subtitle Quote */}
        <p className="text-[10px] sm:text-xs font-serif text-[#F8E6A0]/90 italic mb-2 max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
          {act7SubStage === 'cake'
            ? '"Let\'s build your birthday cake, piece by piece... then make a wish and blow the candle together."'
            : act7SubStage === 'lantern'
            ? '"Write your birthday wish to the night sky, sayang."'
            : '"A letter from my heart, only for you."'}
        </p>

        {/* Stage Navigation Switcher */}
        <Act7Navigation />
      </header>

      {/* Main Interactive Stage per Sub-Stage with smooth romantic sub-stage transition */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full overflow-hidden my-auto py-0">
        <div
          key={act7SubStage}
          className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 ease-out"
        >
          {act7SubStage === 'cake' ? (
            /* ========================================================================= */
            /* STAGE 7A: CAKE & CANDLE (Calibrated on Golden Platter in Background) */
            /* ========================================================================= */
            <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-end items-center relative overflow-hidden pb-1">
              {/* 3-Column Desktop Grid: Step Panel (Left), Cake on Platter (Center), Blow Controls (Right) */}
              <div className="w-full flex-1 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-3 px-2 sm:px-6 relative pb-0">
                {/* Left Column: Build Your Cake Step Panel */}
                <div className="w-full lg:w-auto flex justify-center order-2 lg:order-1 z-20 mb-2">
                  <CakeStepPanel />
                </div>

                {/* Center Column: The Large Multi-Tier Cake seated squarely on top of the Golden Platter in the background */}
                <div className="relative flex flex-col items-center justify-end order-1 lg:order-2 flex-1 h-full z-10 mb-4 sm:mb-14 lg:mb-24">
                  <CakeAssembly />
                </div>

                {/* Right Column: Blow Controls */}
                <div className="w-full lg:w-auto flex justify-center order-3 z-20 mb-2">
                  <CakeBlowControls />
                </div>
              </div>
            </div>
          ) : act7SubStage === 'lantern' ? (
            /* ========================================================================= */
            /* STAGE 7B: 60 FIREFLIES & SKY LANTERN (Clean plate background) */
            /* ========================================================================= */
            <SkyLanternExperience />
          ) : (
            /* ========================================================================= */
            /* STAGE 7C: THE SEALED BIRTHDAY LETTER (Transparent vintage letter) */
            /* ========================================================================= */
            <BirthdayLetterExperience />
          )}
        </div>
      </main>

      {/* Unified Bottom Page Navigation Bar (Optimized, Zero Duplicates) */}
      <footer className="relative z-40 flex items-center justify-between max-w-4xl sm:max-w-5xl mx-auto w-full py-1.5 px-3 border border-[#D9AE50]/30 bg-[#140A02]/90 backdrop-blur-md rounded-full shadow-[0_6px_28px_rgba(0,0,0,0.7)] text-[#FFF9EA]/80 text-[11px] font-mono flex-shrink-0 mb-1">
        {/* Left: Previous Page Action */}
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#D9AE50]/20 text-[#F8E6A0] hover:text-[#FFF9EA] border border-[#D9AE50]/30 transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-semibold">
            {act7SubStage === 'cake'
              ? 'Back to Act VI'
              : act7SubStage === 'lantern'
              ? 'Back to Cake & Candle'
              : 'Back to Sky Lantern'}
          </span>
        </button>

        {/* Center: Stage Indicator Milestone (Clean, Non-duplicate) */}
        <div className="hidden sm:flex items-center gap-2.5 text-[10px] font-mono tracking-widest text-[#D9AE50]/80">
          <span>⋆</span>
          <span className="uppercase text-[#FFF9EA]/90 font-medium">
            {act7SubStage === 'cake'
              ? 'Stage 1 of 3 · Cake & Candle'
              : act7SubStage === 'lantern'
              ? 'Stage 2 of 3 · Sky Lantern Wish'
              : 'Stage 3 of 3 · Sealed Birthday Letter'}
          </span>
          <span>⋆</span>
        </div>

        {/* Right: Next Page Action */}
        <button
          type="button"
          onClick={handleNext}
          className={`flex items-center gap-2 px-5 py-1.5 rounded-full font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_2px_12px_rgba(217,174,80,0.4)] cursor-pointer active:scale-95 ${
            act7SubStage === 'letter'
              ? 'bg-gradient-to-r from-[#D9AE50] via-[#E9B85B] to-[#F8E6A0] text-[#140A00] hover:brightness-110'
              : 'bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] hover:brightness-110'
          }`}
        >
          {act7SubStage === 'cake' ? (
            <>
              <span>Continue to Sky Lantern ✨</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : act7SubStage === 'lantern' ? (
            <>
              <span>Continue to Birthday Letter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>RECEIVE YOUR BIRTHDAY GIFT ✨</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </footer>
    </div>
  );
};
