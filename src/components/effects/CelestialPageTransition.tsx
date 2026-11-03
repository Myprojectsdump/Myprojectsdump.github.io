// src/components/effects/CelestialPageTransition.tsx

import React, { useMemo } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';

export const CelestialPageTransition: React.FC = () => {
  const isTransitioning = useExperienceStore((state) => state.isTransitioning);
  const transitionPhase = useExperienceStore((state) => state.transitionPhase);
  const transitionMessage = useExperienceStore((state) => state.transitionMessage);
  const reducedMotion = useExperienceStore((state) => state.reducedMotionChoice);

  // Procedural romantic background sparkles
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7 + 11) % 92}%`,
      top: `${(i * 13 + 7) % 88}%`,
      size: (i % 3) + 2,
      delayMs: (i * 120) % 600,
    }));
  }, []);

  if (!isTransitioning && transitionPhase === 'idle') return null;

  const isFadingIn = transitionPhase === 'in';
  const isFadingOut = transitionPhase === 'out';

  if (reducedMotion === 'reduce') {
    return (
      <div
        className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-[#070308] transition-opacity duration-200 ${
          isFadingIn ? 'opacity-95' : 'opacity-0'
        }`}
      >
        <span className="text-sm font-serif italic text-[#FFF9EA]">
          {transitionMessage || 'Entering...'}
        </span>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center transition-all duration-350 ease-out overflow-hidden ${
        isFadingIn
          ? 'opacity-100 backdrop-blur-md bg-gradient-to-b from-[#1A0E08]/75 via-[#2C1808]/80 to-[#1A0E08]/75'
          : isFadingOut
          ? 'opacity-0 backdrop-blur-xs bg-black/20 scale-102'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* 1. Atmospheric Golden Radial Shimmer */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-gradient-radial from-[#D9B77B]/20 via-[#E11D48]/10 to-transparent blur-3xl pointer-events-none animate-pulse" />

      {/* 2. Floating Star Dust Sparkles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#FFE6A7] animate-ping pointer-events-none shadow-[0_0_8px_#F8E6A0]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: '1.2s',
            animationDelay: `${p.delayMs}ms`,
            opacity: 0.65,
          }}
        />
      ))}

      {/* 3. Center Celestial Emblem & Message */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4 max-w-md animate-in zoom-in-95 duration-300">
        {/* Orbital Golden Heart Icon */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full text-[#D9B77B] animate-spin" style={{ animationDuration: '6s' }} viewBox="0 0 80 80">
            <ellipse cx="40" cy="40" rx="34" ry="14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.75" />
            <circle cx="74" cy="40" r="2.5" fill="#FFF9EA" />
          </svg>
          <Heart className="absolute w-6 h-6 text-[#E11D48] fill-current animate-pulse drop-shadow-[0_0_12px_rgba(225,29,72,0.8)]" />
        </div>

        {/* Brand & Chapter Transition Eyebrow */}
        <div className="flex items-center gap-2 text-[#D9B77B] text-[10px] font-mono tracking-[0.3em] uppercase">
          <Sparkles className="w-3 h-3 text-[#D9B77B]" />
          <span>The Gravity of Uci</span>
          <Sparkles className="w-3 h-3 text-[#D9B77B]" />
        </div>

        {/* Dynamic Transition Message */}
        <h3 className="text-xl sm:text-2xl font-serif italic text-[#FFF9EA] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {transitionMessage || 'A Little Moment With You...'}
        </h3>

        {/* Delicate Golden Divider */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D9B77B]/60 to-transparent my-1" />

        <p className="text-[11px] font-serif italic text-[#F8E6A0]/80">
          Every little detail, made for you. ♥
        </p>
      </div>
    </div>
  );
};
