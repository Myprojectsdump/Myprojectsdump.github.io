// src/acts/act5/AlchemyCauldron.tsx

import React from 'react';

interface AlchemyCauldronProps {
  pouredCount: number;
  isOverheated: boolean;
}

export const AlchemyCauldron: React.FC<AlchemyCauldronProps> = ({
  pouredCount,
  isOverheated,
}) => {
  // Potion glow gradient based on poured ingredients
  const getPotionGradient = () => {
    switch (pouredCount) {
      case 0:
        return 'from-[#F8E6A0]/20 via-[#D9AE50]/15 to-transparent';
      case 1:
        return 'from-[#FDA4AF]/40 via-[#F472B6]/25 to-transparent';
      case 2:
        return 'from-[#FDE68A]/50 via-[#FDA4AF]/40 to-[#F472B6]/20';
      case 3:
        return 'from-[#F472B6]/60 via-[#E11D48]/40 to-[#D9AE50]/30';
      case 4:
      default:
        return 'from-[#FDA4AF]/70 via-[#E11D48]/60 to-[#FDE68A]/50';
    }
  };

  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-84 md:h-84 flex items-center justify-center pointer-events-none select-none">
      {/* Outer Cauldron Ambient Illumination */}
      <div
        className={`absolute inset-4 rounded-full filter blur-2xl transition-all duration-1000 ${
          isOverheated
            ? 'bg-gradient-to-t from-[#E11D48]/50 via-[#F472B6]/40 to-[#FDE68A]/35 scale-110 animate-pulse'
            : pouredCount >= 2
            ? 'bg-gradient-to-t from-[#F472B6]/30 via-[#E9B85B]/25 to-transparent scale-100'
            : 'bg-gradient-to-t from-[#F8E6A0]/20 to-transparent scale-90'
        }`}
      />

      {/* Center Cauldron Glass Core Potion Layer */}
      <div className="relative w-36 h-28 sm:w-48 sm:h-36 md:w-56 md:h-42 rounded-[50%] flex items-center justify-center overflow-hidden">
        {/* Dynamic Liquid Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${getPotionGradient()} transition-all duration-700 ease-in-out`}
        />

        {/* Swirling Liquid Texture */}
        <div
          className={`absolute inset-1 rounded-[50%] border border-[#F8E6A0]/30 transition-opacity duration-700 ${
            pouredCount > 0 ? 'opacity-80' : 'opacity-30'
          }`}
          style={{
            animation: pouredCount > 0 ? 'spin 12s linear infinite' : 'none',
          }}
        />

        {/* Liquid Surface Highlight */}
        <div className="absolute top-2 inset-x-4 h-4 rounded-[50%] bg-white/20 filter blur-xs" />

        {/* Suspended Sparkles in Potion */}
        {pouredCount > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFDF5] shadow-[0_0_8px_#FFF] animate-ping" />
            <span className="w-1 h-1 rounded-full bg-[#F8E6A0] shadow-[0_0_6px_#F8E6A0] absolute top-1/3 left-1/4 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-[#FDA4AF] shadow-[0_0_6px_#FDA4AF] absolute bottom-1/3 right-1/4 animate-pulse" />
          </div>
        )}
      </div>

      {/* Heart-Shaped Magical Starlight Smoke Aura (Rises above Cauldron) */}
      <div
        className={`absolute -top-6 sm:-top-8 inset-x-0 flex flex-col items-center justify-center transition-all duration-700 ${
          isOverheated
            ? 'opacity-100 scale-110 drop-shadow-[0_0_25px_rgba(253,164,175,0.9)] animate-pulse'
            : pouredCount >= 4
            ? 'opacity-90 scale-100 drop-shadow-[0_0_18px_rgba(253,230,138,0.8)]'
            : pouredCount >= 2
            ? 'opacity-60 scale-90'
            : 'opacity-25 scale-75'
        }`}
      >
        <svg viewBox="0 0 100 90" className="w-20 h-18 sm:w-28 sm:h-24 overflow-visible">
          <defs>
            <linearGradient id="heartSmokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9EA" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDA4AF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.6" />
            </linearGradient>
            <filter id="smokeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d="M 50,22 C 35,-5 0,0 0,35 C 0,55 35,75 50,88 C 65,75 100,55 100,35 C 100,0 65,-5 50,22 Z"
            fill="none"
            stroke="url(#heartSmokeGrad)"
            strokeWidth="2.2"
            strokeDasharray="3 4"
            filter="url(#smokeGlow)"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
};
