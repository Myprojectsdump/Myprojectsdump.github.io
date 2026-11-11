// src/acts/act5/IngredientVial.tsx

import React, { useState } from 'react';
import { Heart, Crown, Sparkles, Flame, Check } from 'lucide-react';
import { Act5Ingredient } from '../../config/act5Ingredients';

interface IngredientVialProps {
  ingredient: Act5Ingredient;
  isPoured: boolean;
  onPour: () => void;
}

export const IngredientVial: React.FC<IngredientVialProps> = ({
  ingredient,
  isPoured,
  onPour,
}) => {
  const [isPouringAnim, setIsPouringAnim] = useState(false);
  const isDominant = Boolean(ingredient.isDominant || ingredient.percentage >= 40);

  const handleClick = () => {
    if (isPoured || isPouringAnim) return;
    setIsPouringAnim(true);
    onPour();
    setTimeout(() => {
      setIsPouringAnim(false);
    }, 800);
  };

  const renderIcon = () => {
    switch (ingredient.iconName) {
      case 'heart':
        return <Heart className="w-3.5 h-3.5 text-[#FDA4AF] fill-current" />;
      case 'crown':
        return <Crown className="w-3.5 h-3.5 text-[#FDE68A] fill-current" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-[#F472B6]" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-[#E11D48] fill-current animate-pulse" />;
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none group">
      {/* Hanging Percentage Paper Tag */}
      <div className="absolute -top-3 -right-2 z-20 transform rotate-12 transition-transform group-hover:scale-105 pointer-events-none">
        <div
          className={`px-2 py-0.5 rounded border shadow-md text-[10px] font-mono font-bold ${
            isDominant
              ? 'bg-[#FFE4E6] border-[#E11D48] text-[#9F1239] shadow-[0_0_12px_rgba(225,29,72,0.5)]'
              : 'bg-[#FFFDF5] border-[#D9AE50]/70 text-[#4A3004]'
          }`}
        >
          {ingredient.percentageLabel}
        </div>
      </div>

      {/* Antique Glass Bottle Visual Container (40% Bedroom Menace & Mischief is largest & most prominent) */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isPoured}
        aria-label={`Pour ${ingredient.percentageLabel} ${ingredient.name}`}
        style={{
          transform: isPouringAnim ? 'translateY(-14px) rotate(-22deg) scale(1.05)' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s',
        }}
        className={`relative rounded-2xl flex flex-col items-center justify-between p-2 cursor-pointer transition-all ${
          isDominant
            ? 'w-24 h-36 sm:w-28 sm:h-40 md:w-32 md:h-44'
            : 'w-20 h-32 sm:w-24 sm:h-36 md:w-28 md:h-40'
        } ${
          isPoured
            ? 'opacity-40 cursor-not-allowed filter grayscale-[30%]'
            : isDominant
            ? 'hover:scale-108 filter drop-shadow-[0_10px_24px_rgba(225,29,72,0.6)] hover:drop-shadow-[0_14px_34px_rgba(225,29,72,0.85)]'
            : 'hover:scale-105 filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)] hover:drop-shadow-[0_12px_28px_rgba(233,196,106,0.45)]'
        }`}
      >
        {/* Gold Cork Stopper */}
        <div className="w-7 sm:w-8 h-4 rounded-t-sm bg-gradient-to-b from-[#E9C46A] via-[#D9AE50] to-[#8B5E0A] border border-[#FFF9EA]/60 shadow-sm z-10 shrink-0" />

        {/* Bottle Neck Glass */}
        <div className="w-5 sm:w-6 h-3 bg-white/20 border-x border-[#FFFDF5]/40 backdrop-blur-xs z-10 shrink-0" />

        {/* Main Glass Flask Body */}
        <div
          className={`relative w-full flex-1 rounded-2xl bg-gradient-to-b from-white/25 via-white/10 to-white/5 border shadow-inner overflow-hidden flex flex-col justify-end p-1.5 backdrop-blur-xs ${
            isDominant ? 'border-[#FDA4AF]/75 ring-1 ring-[#E11D48]/40' : 'border-[#FFFDF5]/50'
          }`}
        >
          {/* Glass Specular Reflection Highlight */}
          <div className="absolute top-1 left-1.5 w-1.5 h-16 rounded-full bg-white/50 filter blur-xs pointer-events-none" />
          <div className="absolute top-3 right-1.5 w-1 h-8 rounded-full bg-white/30 filter blur-xs pointer-events-none" />

          {/* Liquid Level Inside Bottle */}
          <div
            style={{
              height: isPoured ? '14%' : isDominant ? '86%' : '72%',
              backgroundColor: ingredient.color,
              boxShadow: `0 0 ${isDominant ? '22px' : '15px'} ${ingredient.glowColor}`,
              transition: 'height 0.8s ease-in-out',
            }}
            className={`w-full rounded-b-xl relative overflow-hidden ${
              isDominant && !isPoured ? 'animate-pulse' : ''
            }`}
          >
            {/* Liquid Surface Meniscus */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-white/45 filter blur-xs" />

            {/* Micro Sparkles inside Liquid */}
            {!isPoured && (
              <>
                <span className="w-1 h-1 rounded-full bg-white absolute bottom-3 left-1/3 animate-ping" />
                {isDominant && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FECDD3] absolute top-3 right-1/3 animate-ping" />
                )}
              </>
            )}
          </div>

          {/* Centered Heirloom Paper Label on Front of Glass */}
          <div
            className={`absolute inset-x-2 top-1/2 -translate-y-1/2 rounded p-1 shadow-md flex flex-col items-center text-center pointer-events-none border ${
              isDominant
                ? 'bg-[#FFF5F5]/95 border-[#E11D48]/70'
                : 'bg-[#FFFDF5]/90 border-[#D9AE50]/70'
            }`}
          >
            <div className="mb-0.5">{renderIcon()}</div>
            <span
              className={`text-[7px] sm:text-[8px] font-serif font-bold leading-tight line-clamp-2 ${
                isDominant ? 'text-[#881337]' : 'text-[#4A3004]'
              }`}
            >
              {ingredient.shortName}
            </span>
          </div>

          {/* Poured State Checkmark Badge */}
          {isPoured && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
              <div className="w-7 h-7 rounded-full bg-[#E9B85B] text-[#1A0C06] flex items-center justify-center shadow-lg border border-white">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Pouring Liquid Stream Animation */}
      {isPouringAnim && (
        <div
          style={{
            borderColor: ingredient.color,
            boxShadow: `0 0 10px ${ingredient.glowColor}`,
          }}
          className="absolute -bottom-8 left-1/2 w-1.5 h-12 bg-current rounded-full animate-pulse z-30 pointer-events-none"
        />
      )}
    </div>
  );
};
