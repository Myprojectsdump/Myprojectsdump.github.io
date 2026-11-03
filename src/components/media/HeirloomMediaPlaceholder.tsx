// src/components/media/HeirloomMediaPlaceholder.tsx

import React from 'react';
import { PlaceholderVariant } from '../../types/media.types';

interface HeirloomMediaPlaceholderProps {
  variant?: PlaceholderVariant;
  className?: string;
  label?: string;
  theme?: 'dark' | 'warm';
}

export const HeirloomMediaPlaceholder: React.FC<HeirloomMediaPlaceholderProps> = ({
  variant = 'polaroid',
  className = '',
  label,
  theme = 'warm',
}) => {
  const isWarm = theme === 'warm';

  return (
    <div
      className={`relative w-full h-full min-h-[160px] rounded-xl overflow-hidden flex flex-col items-center justify-center p-5 select-none ${
        isWarm
          ? 'bg-gradient-to-b from-[#FFFDF5] to-[#F8E6A0]/35 border border-[#D9AE50]/35 shadow-sm'
          : 'bg-gradient-to-b from-obsidian-deep to-obsidian-void border border-champagne-gold/20 shadow-glow'
      } ${className}`}
    >
      {/* Background Starry Filigree Overlay */}
      <svg
        className={`absolute inset-0 w-full h-full ${isWarm ? 'opacity-25' : 'opacity-15'} pointer-events-none`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`heirloom-grid-${theme}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="0.75" fill={isWarm ? '#D9AE50' : '#FDE68A'} />
            <path
              d="M 0 16 L 32 16 M 16 0 L 16 32"
              stroke={isWarm ? '#D9AE50' : '#FDE68A'}
              strokeWidth="0.2"
              strokeOpacity={isWarm ? '0.6' : '0.4'}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#heirloom-grid-${theme})`} />
      </svg>

      {/* Center Heirloom Monogram / Icon depending on variant */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-2.5 shadow-sm ${
            isWarm
              ? 'border border-[#D9AE50]/45 bg-[#FFF9EA]/90'
              : 'border border-champagne-gold/30 bg-obsidian-void/60 shadow-glow'
          }`}
        >
          {variant === 'gift-crest' ? (
            <span className="text-xl">🎁</span>
          ) : variant === 'portrait' ? (
            <span className={`text-xs font-serif font-bold tracking-widest ${isWarm ? 'text-[#8B5E0A]' : 'text-champagne-gold'}`}>
              U ♥ S
            </span>
          ) : variant === 'melody-locket' ? (
            <span className="text-base text-[#8B5E0A]">🎵</span>
          ) : variant === 'waveform-vial' ? (
            <span className="text-base text-[#E11D48]">🎙️</span>
          ) : (
            <span className={`text-xs font-serif font-bold tracking-widest ${isWarm ? 'text-[#8B5E0A]' : 'text-champagne-gold'}`}>
              U ♥ S
            </span>
          )}
        </div>

        <span
          className={`text-[11px] font-mono uppercase tracking-[0.22em] font-bold mb-1 ${
            isWarm ? 'text-[#8B5E0A]' : 'text-champagne-gold/80'
          }`}
        >
          {label || 'Personal Keepsake'}
        </span>
        <span
          className={`text-[10px] font-sans max-w-[200px] leading-tight ${
            isWarm ? 'text-[#6B4706]/75' : 'text-parchment-warm/60'
          }`}
        >
          Reserved for your photograph or memory
        </span>
      </div>

      {/* Ornate corner brackets */}
      <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l ${isWarm ? 'border-[#D9AE50]/55' : 'border-champagne-gold/40'} pointer-events-none`} />
      <div className={`absolute top-2 right-2 w-3 h-3 border-t border-r ${isWarm ? 'border-[#D9AE50]/55' : 'border-champagne-gold/40'} pointer-events-none`} />
      <div className={`absolute bottom-2 left-2 w-3 h-3 border-b border-l ${isWarm ? 'border-[#D9AE50]/55' : 'border-champagne-gold/40'} pointer-events-none`} />
      <div className={`absolute bottom-2 right-2 w-3 h-3 border-b border-r ${isWarm ? 'border-[#D9AE50]/55' : 'border-champagne-gold/40'} pointer-events-none`} />
    </div>
  );
};
