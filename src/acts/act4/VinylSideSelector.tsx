// src/acts/act4/VinylSideSelector.tsx

import React from 'react';
import { Sun, Flame } from 'lucide-react';

interface VinylSideSelectorProps {
  vinylSide: 'daylight' | 'afterHours';
  onSelectSide: (side: 'daylight' | 'afterHours') => void;
}

export const VinylSideSelector: React.FC<VinylSideSelectorProps> = ({
  vinylSide,
  onSelectSide,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#1A0C06]/75 border border-[#D9AE50]/40 backdrop-blur-md shadow-lg select-none">
      {/* Side A · Daylight */}
      <button
        onClick={() => onSelectSide('daylight')}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
          vinylSide === 'daylight'
            ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#5A3B05] font-bold shadow-[0_0_18px_rgba(233,196,106,0.65)]'
            : 'text-[#F8E6A0]/75 hover:text-[#FFFDF5] hover:bg-[#FFF9EA]/10'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
        <span>Side A · Daylight</span>
      </button>

      {/* Side B · After-Hours */}
      <button
        onClick={() => onSelectSide('afterHours')}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
          vinylSide === 'afterHours'
            ? 'bg-gradient-to-r from-[#9F1239] via-[#E11D48] to-[#9F1239] text-[#FFFDF5] font-bold shadow-[0_0_20px_rgba(225,29,72,0.6)]'
            : 'text-[#F8E6A0]/75 hover:text-[#FFFDF5] hover:bg-[#FFF9EA]/10'
        }`}
      >
        <Flame className="w-3.5 h-3.5" />
        <span>Side B · After-Hours</span>
      </button>
    </div>
  );
};
