// src/acts/act5/IngredientShelf.tsx

import React from 'react';
import { RotateCcw, ArrowRight, FlaskConical, Check } from 'lucide-react';
import { ACT5_INGREDIENTS } from '../../config/act5Ingredients';

interface IngredientShelfProps {
  pouredVialIds: string[];
  isOverheated: boolean;
  onPour: (id: string, index: number) => void;
  onReset: () => void;
  onUnlockVault: () => void;
}

export const IngredientShelf: React.FC<IngredientShelfProps> = ({
  pouredVialIds,
  isOverheated,
  onPour,
  onReset,
  onUnlockVault,
}) => {
  const allPoured = pouredVialIds.length >= 4;

  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-3 select-none">
      {/* 4 Horizontal Ingredient Buttons (Matching Reference Image) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
        {ACT5_INGREDIENTS.map((ing, i) => {
          const isPoured = pouredVialIds.includes(ing.id);
          return (
            <button
              key={ing.id}
              onClick={() => onPour(ing.id, i)}
              disabled={isPoured}
              className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 backdrop-blur-md cursor-pointer ${
                isPoured
                  ? 'bg-[#1A0C06]/40 border-[#D9AE50]/20 opacity-40 cursor-not-allowed'
                  : 'bg-[#1A0C06]/80 border-[#D9AE50]/50 hover:border-[#D9AE50] hover:bg-[#1A0C06]/95 hover:scale-[1.02] shadow-[0_4px_15px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Bottle Mini Icon Pill */}
              <div
                style={{
                  backgroundColor: isPoured ? 'rgba(255,255,255,0.05)' : `${ing.color}25`,
                  borderColor: isPoured ? 'rgba(255,255,255,0.1)' : ing.color,
                }}
                className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0"
              >
                {isPoured ? (
                  <Check className="w-4 h-4 text-[#E9B85B]" />
                ) : (
                  <FlaskConical
                    style={{ color: ing.color }}
                    className="w-4 h-4"
                  />
                )}
              </div>

              {/* Text Information */}
              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#D9AE50]/80 uppercase block">
                  {isPoured ? 'ADDED TO MIX ✓' : `VIAL #0${ing.slot}`}
                </span>
                <span className="text-xs sm:text-[13px] font-serif font-medium text-[#FFFDF5] leading-tight block truncate">
                  {ing.percentageLabel} {ing.shortName}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Row: Reset on Left, Unlock Vault on Right */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full pt-2">
        {/* Reset Formula Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D9AE50]/40 bg-[#1A0C06]/75 hover:bg-[#1A0C06]/90 text-[11px] font-mono text-[#F8E6A0]/80 hover:text-[#FFFDF5] transition-all cursor-pointer backdrop-blur-md shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>START THE MIX AGAIN</span>
        </button>

        {/* Unlock Vault Action Button */}
        <button
          onClick={onUnlockVault}
          className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg ${
            allPoured || isOverheated
              ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#4A3004] font-bold border border-[#FFF9EA] shadow-[0_0_20px_rgba(233,196,106,0.7)] scale-105'
              : 'border border-[#D9AE50]/60 bg-[#1A0C06]/80 hover:bg-[#1A0C06]/95 text-[#F8E6A0]'
          }`}
        >
          <span>{allPoured || isOverheated ? 'UNLOCK THE LITTLE PROMISES →' : 'EXPLORE PROMISES VAULT →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
