// src/acts/act7/Act7Navigation.tsx

import React from 'react';
import { Cake, Sparkles, Mail } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { proceduralAudio } from '../../engine/audio/ProceduralAudio';

export const Act7Navigation: React.FC = () => {
  const act7SubStage = useExperienceStore((state) => state.act7SubStage);
  const setAct7SubStage = useExperienceStore((state) => state.setAct7SubStage);
  const isExtinguished = useExperienceStore((state) => state.isCandleExtinguished);
  const isLanternReleased = useExperienceStore((state) => state.isLanternReleased);

  const handleSelectSubStage = (stage: 'cake' | 'lantern' | 'letter') => {
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
    setAct7SubStage(stage);
  };

  return (
    <nav
      aria-label="Act VII Stages"
      className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#1A1208]/80 backdrop-blur-md border border-[#D9AE50]/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      {/* 7A: Cake & Candle */}
      <button
        type="button"
        onClick={() => handleSelectSubStage('cake')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
          act7SubStage === 'cake'
            ? 'bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-bold shadow-[0_2px_12px_rgba(217,174,80,0.5)] scale-[1.02]'
            : 'text-[#FFF9EA]/75 hover:text-[#FFF9EA] hover:bg-white/5'
        }`}
      >
        <Cake className={`w-3.5 h-3.5 ${act7SubStage === 'cake' ? 'text-[#140A00]' : 'text-[#D9AE50]'}`} />
        <span>7A // Cake & Candle</span>
        {isExtinguished && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_6px_#4ADE80]" title="Candle Extinguished" />
        )}
      </button>

      {/* 7B: Sky Lantern */}
      <button
        type="button"
        onClick={() => handleSelectSubStage('lantern')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
          act7SubStage === 'lantern'
            ? 'bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-bold shadow-[0_2px_12px_rgba(217,174,80,0.5)] scale-[1.02]'
            : 'text-[#FFF9EA]/75 hover:text-[#FFF9EA] hover:bg-white/5'
        }`}
      >
        <Sparkles className={`w-3.5 h-3.5 ${act7SubStage === 'lantern' ? 'text-[#140A00]' : 'text-[#D9AE50]'}`} />
        <span>7B // Sky Lantern</span>
        {isLanternReleased && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_6px_#4ADE80]" title="Wish Released" />
        )}
      </button>

      {/* 7C: Birthday Letter */}
      <button
        type="button"
        onClick={() => handleSelectSubStage('letter')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
          act7SubStage === 'letter'
            ? 'bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-bold shadow-[0_2px_12px_rgba(217,174,80,0.5)] scale-[1.02]'
            : 'text-[#FFF9EA]/75 hover:text-[#FFF9EA] hover:bg-white/5'
        }`}
      >
        <Mail className={`w-3.5 h-3.5 ${act7SubStage === 'letter' ? 'text-[#140A00]' : 'text-[#D9AE50]'}`} />
        <span>7C // Birthday Letter</span>
      </button>
    </nav>
  );
};
