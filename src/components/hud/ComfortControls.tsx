// src/components/hud/ComfortControls.tsx

import React from 'react';
import { FastForward, Eye } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';

export const ComfortControls: React.FC = () => {
  const hasEnteredUniverse = useExperienceStore((state) => state.hasEnteredUniverse);
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const skipToNextChapter = useExperienceStore((state) => state.skipToNextChapter);
  const reducedMotionChoice = useExperienceStore((state) => state.reducedMotionChoice);
  const setReducedMotionChoice = useExperienceStore((state) => state.setReducedMotionChoice);

  if (!hasEnteredUniverse) return null;

  const toggleReducedMotion = () => {
    const next = reducedMotionChoice === 'reduce' ? 'full' : 'reduce';
    setReducedMotionChoice(next);
  };

  return (
    <div className="fixed bottom-4 left-6 z-30 flex items-center gap-2 select-none pointer-events-auto">
      {/* Skip Scene Button */}
      {currentChapter !== 'AFTER_CREDITS' && currentChapter !== 'FINAL_GIFT' && (
        <button
          onClick={skipToNextChapter}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-champagne-gold/20 text-[11px] font-mono tracking-wider text-parchment-warm/70 hover:text-champagne-gold hover:border-champagne-gold/40 transition-colors shadow-glow"
          title="Advance to Next Scene"
        >
          <FastForward className="w-3.5 h-3.5 text-champagne-gold/80" />
          <span className="hidden sm:inline">Skip Scene</span>
        </button>
      )}

      {/* Motion Preference Toggle */}
      <button
        onClick={toggleReducedMotion}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border text-[11px] font-mono tracking-wider transition-colors shadow-glow ${
          reducedMotionChoice === 'reduce'
            ? 'border-champagne-gold text-champagne-gold bg-champagne-gold/15'
            : 'border-champagne-gold/20 text-parchment-warm/70 hover:text-champagne-gold'
        }`}
        title="Toggle Motion Reduction"
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{reducedMotionChoice === 'reduce' ? 'Motion: Calm' : 'Motion: Full'}</span>
      </button>
    </div>
  );
};
