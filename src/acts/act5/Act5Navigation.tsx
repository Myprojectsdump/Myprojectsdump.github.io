// src/acts/act5/Act5Navigation.tsx

import React from 'react';
import { FlaskConical, Sparkles } from 'lucide-react';

interface Act5NavigationProps {
  currentStage: 'alchemy' | 'vault';
  revealedCount: number;
  totalPromises: number;
  onSelectStage: (stage: 'alchemy' | 'vault') => void;
}

export const Act5Navigation: React.FC<Act5NavigationProps> = ({
  currentStage,
  revealedCount,
  totalPromises,
  onSelectStage,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#1A0C06]/75 border border-[#D9AE50]/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] select-none">
      {/* 5A: The Alchemy Lab Button */}
      <button
        onClick={() => onSelectStage('alchemy')}
        className={`flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
          currentStage === 'alchemy'
            ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#4A3004] font-bold shadow-[0_0_15px_rgba(233,196,106,0.65)] scale-[1.02]'
            : 'text-[#F8E6A0]/80 hover:text-[#FFFDF5] hover:bg-[#FFF9EA]/10'
        }`}
      >
        <FlaskConical className="w-3.5 h-3.5" />
        <span>THE ALCHEMY LAB</span>
      </button>

      {/* 5B: The Gold Foil Vault Button */}
      <button
        onClick={() => onSelectStage('vault')}
        className={`flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
          currentStage === 'vault'
            ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#4A3004] font-bold shadow-[0_0_15px_rgba(233,196,106,0.65)] scale-[1.02]'
            : 'text-[#F8E6A0]/80 hover:text-[#FFFDF5] hover:bg-[#FFF9EA]/10'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>
          THE GOLD FOIL VAULT ({revealedCount}/{totalPromises})
        </span>
      </button>
    </div>
  );
};
