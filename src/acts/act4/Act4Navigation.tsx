// src/acts/act4/Act4Navigation.tsx

import React from 'react';
import { Disc, Sparkles } from 'lucide-react';

interface Act4NavigationProps {
  currentStage: 'vinyl' | 'constellation';
  onSelectStage: (stage: 'vinyl' | 'constellation') => void;
  discoveredStarsCount: number;
}

export const Act4Navigation: React.FC<Act4NavigationProps> = ({
  currentStage,
  onSelectStage,
  discoveredStarsCount,
}) => {
  return (
    <div className="flex items-center gap-2 p-1 rounded-full bg-[#1A0C06]/75 border border-[#D9AE50]/40 backdrop-blur-md shadow-lg select-none">
      {/* Option 1: Dual-Soul Vinyl */}
      <button
        onClick={() => onSelectStage('vinyl')}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
          currentStage === 'vinyl'
            ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#5A3B05] font-bold shadow-[0_0_18px_rgba(233,196,106,0.65)]'
            : 'text-[#F8E6A0]/80 hover:text-[#FFFDF5] hover:bg-[#FFF9EA]/10'
        }`}
      >
        <Disc className="w-3.5 h-3.5" />
        <span>Dual-Soul Vinyl</span>
      </button>

      {/* Option 2: Goosebump Constellation */}
      <button
        onClick={() => onSelectStage('constellation')}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
          currentStage === 'constellation'
            ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#5A3B05] font-bold shadow-[0_0_18px_rgba(233,196,106,0.65)]'
            : 'text-[#F8E6A0]/80 hover:text-[#FFFDF5] hover:bg-[#FFF9EA]/10'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Goosebump Constellation {discoveredStarsCount > 0 ? `(${discoveredStarsCount}/8)` : ''}</span>
      </button>
    </div>
  );
};
