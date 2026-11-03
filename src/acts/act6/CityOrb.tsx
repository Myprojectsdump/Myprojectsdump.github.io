// src/acts/act6/CityOrb.tsx

import React from 'react';

interface CityOrbProps {
  side: 'left' | 'right';
  label: string;
  isHolding: boolean;
  isCompleted: boolean;
  progressPercent: number;
}

export const CityOrb: React.FC<CityOrbProps> = ({
  side,
  label,
  isHolding,
  isCompleted,
  progressPercent,
}) => {
  const isLeft = side === 'left';

  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none">
      {/* Outer Luminous Bubble Aura */}
      <div
        style={{
          opacity: isCompleted ? 1 : isHolding ? 0.4 + (progressPercent / 100) * 0.6 : 0.35,
          transform: isHolding ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.5s ease-out',
        }}
        className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center p-1.5"
      >
        {/* Soft Radial Ambient Glow */}
        <div
          className={`absolute inset-0 rounded-full filter blur-xl transition-colors duration-700 ${
            isCompleted
              ? 'bg-[#FDA4AF]/40 shadow-[0_0_35px_rgba(253,164,175,0.6)]'
              : isHolding
              ? 'bg-[#F8E6A0]/35 shadow-[0_0_25px_rgba(248,230,160,0.4)]'
              : 'bg-[#D9AE50]/15'
          }`}
        />

        {/* Circular Glass Orb Housing */}
        <div className="relative w-full h-full rounded-full border-2 border-[#D9AE50]/60 bg-gradient-to-b from-[#101B35]/80 via-[#202C4B]/60 to-[#0D0B0A]/85 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden flex items-end justify-center backdrop-blur-xs">
          {/* Internal Specular Glass Highlight */}
          <div className="absolute top-2 left-3 w-8 h-4 rounded-[50%] bg-white/30 filter blur-xs -rotate-30 pointer-events-none" />
          <div className="absolute bottom-2 inset-x-0 h-10 bg-gradient-to-t from-[#D9AE50]/20 to-transparent pointer-events-none" />

          {/* Stylized City Skyline Silhouettes with Warm Golden Window Lights */}
          <svg
            viewBox="0 0 120 80"
            className="w-full h-20 sm:h-24 md:h-28 overflow-visible opacity-90"
          >
            <defs>
              <linearGradient id={`cityGrad-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF9EA" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#D9AE50" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#101B35" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {isLeft ? (
              /* Left City Skyline: Warm Heritage Monuments & Towers (Me) */
              <g fill={`url(#cityGrad-${side})`}>
                <rect x="10" y="32" width="14" height="48" rx="1" />
                <rect x="28" y="22" width="16" height="58" rx="1" />
                <polygon points="36,12 32,22 40,22" />
                <rect x="48" y="36" width="12" height="44" rx="1" />
                <rect x="64" y="26" width="18" height="54" rx="1" />
                <rect x="86" y="40" width="14" height="40" rx="1" />
                <rect x="104" y="46" width="10" height="34" rx="1" />

                {/* Sparkling Window Lights */}
                <circle cx="34" cy="30" r="1" fill="#FFFDF5" className="animate-pulse" />
                <circle cx="38" cy="40" r="1" fill="#F8E6A0" />
                <circle cx="72" cy="34" r="1.2" fill="#FFF" className="animate-ping" />
                <circle cx="74" cy="46" r="1" fill="#FDA4AF" />
                <circle cx="16" cy="44" r="0.8" fill="#FFF" />
              </g>
            ) : (
              /* Right City Skyline: Radiant Metropolitan Horizon & Spire (You, My Uci) */
              <g fill={`url(#cityGrad-${side})`}>
                <rect x="8" y="42" width="12" height="38" rx="1" />
                <rect x="24" y="32" width="16" height="48" rx="1" />
                <rect x="44" y="20" width="14" height="60" rx="1" />
                {/* Slender Radio / Observation Spire */}
                <line x1="51" y1="6" x2="51" y2="20" stroke="#FFF9EA" strokeWidth="1.5" />
                <circle cx="51" cy="6" r="2" fill="#FDA4AF" className="animate-ping" />
                <rect x="62" y="28" width="16" height="52" rx="1" />
                <polygon points="70,16 66,28 74,28" />
                <rect x="82" y="38" width="14" height="42" rx="1" />
                <rect x="100" y="46" width="12" height="34" rx="1" />

                {/* Sparkling Window Lights */}
                <circle cx="30" cy="38" r="1" fill="#FFFDF5" className="animate-pulse" />
                <circle cx="51" cy="24" r="1.2" fill="#F8E6A0" />
                <circle cx="68" cy="36" r="1" fill="#FFF" className="animate-ping" />
                <circle cx="72" cy="48" r="0.8" fill="#FDA4AF" />
                <circle cx="88" cy="46" r="1" fill="#FFFDF5" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Romantic Location Label Plaque */}
      <div className="mt-2.5 px-3 py-1 rounded-full bg-[#1A0C06]/85 border border-[#D9AE50]/40 backdrop-blur-md shadow-sm">
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#F8E6A0] font-semibold">
          {label}
        </span>
      </div>
    </div>
  );
};
