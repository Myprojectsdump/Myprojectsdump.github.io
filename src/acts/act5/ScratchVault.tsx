// src/acts/act5/ScratchVault.tsx

import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { STORY_DATA } from '../../config/storyContent';
import { FoilScratchCanvas } from '../../engine/canvas2d/FoilScratchCanvas';

interface ScratchVaultProps {
  onBackToFormula: () => void;
  onProceedToAct6: () => void;
}

export const ScratchVault: React.FC<ScratchVaultProps> = ({
  onBackToFormula,
  onProceedToAct6,
}) => {
  const revealedScratchIds = useExperienceStore((state) => state.revealedScratchIds);
  const totalCards = STORY_DATA.scratchCards.length;
  const allRevealed = revealedScratchIds.length >= totalCards;

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-between gap-4 py-2 select-none z-20">
      {/* Chapter Subtitle & Interaction Instruction */}
      <div className="text-center max-w-xl px-4">
        <p className="font-serif italic text-sm sm:text-base text-[#F8E6A0]/90 drop-shadow">
          I've hidden four little promises here. Scratch away the gold and find what's waiting for you.
        </p>
        <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#D9AE50]/70 uppercase block mt-1">
          Use your finger or mouse to uncover each little secret.
        </span>
      </div>

      {/* 2x2 Gold Scratch Vault Cards Grid (Matching Reference Image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full px-2 sm:px-4 my-2">
        {STORY_DATA.scratchCards.map((card) => (
          <FoilScratchCanvas key={card.id} card={card} />
        ))}
      </div>

      {/* Promises Uncovered Plaque Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0C06]/85 border border-[#D9AE50]/60 backdrop-blur-md shadow-md mt-1">
        <Sparkles className="w-3.5 h-3.5 text-[#E9C46A]" />
        <span className="text-xs font-mono tracking-wider text-[#F8E6A0] uppercase font-bold">
          Promises uncovered: {revealedScratchIds.length} / {totalCards}
        </span>
        {allRevealed && (
          <span className="text-xs font-serif text-[#FDA4AF] italic font-semibold ml-1">
            • Every little promise, revealed. ♥
          </span>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full px-2 sm:px-4 pt-3 border-t border-[#D9AE50]/20 mt-2">
        {/* Back to Formula Mix */}
        <button
          onClick={onBackToFormula}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#D9AE50]/40 bg-[#1A0C06]/75 hover:bg-[#1A0C06]/90 text-xs font-mono text-[#F8E6A0]/80 hover:text-[#FFFDF5] transition-all cursor-pointer backdrop-blur-md shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO OUR FORMULA</span>
        </button>

        {/* Continue to Act VI */}
        <button
          onClick={onProceedToAct6}
          className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg ${
            allRevealed
              ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#4A3004] font-bold border border-[#FFF9EA] shadow-[0_0_20px_rgba(233,196,106,0.7)] scale-105'
              : 'border border-[#D9AE50]/60 bg-[#1A0C06]/80 hover:bg-[#1A0C06]/95 text-[#F8E6A0]'
          }`}
        >
          <span>CONTINUE TO ACT VI · DISTANCE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
