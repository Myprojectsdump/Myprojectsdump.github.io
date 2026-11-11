// src/acts/act5/TemperatureGauge.tsx

import React from 'react';
import { Flame, AlertCircle } from 'lucide-react';
import { ACT5_OVERHEAT_WARNING } from '../../config/act5Ingredients';

interface TemperatureGaugeProps {
  temperature: number;
  isOverheated: boolean;
  pouredCount: number;
}

export const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({
  temperature,
  isOverheated,
  pouredCount,
}) => {
  // Normalized visual percentage across stages
  const getPercentage = () => {
    switch (pouredCount) {
      case 0:
        return 18;
      case 1:
        return 38;
      case 2:
        return 62;
      case 3:
        return 82;
      case 4:
      default:
        return 100;
    }
  };

  const fillPercent = getPercentage();

  return (
    <div className="flex flex-col items-center gap-2.5 w-full max-w-md select-none">
      {/* Ornate Thermometer Plaque matching Reference Image */}
      <div className="w-full rounded-2xl bg-[#1A0C06]/80 border border-[#D9AE50]/60 p-3 sm:p-4 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.65)] flex flex-col items-center">
        {/* Header Label & Degree */}
        <div className="flex items-center justify-between w-full px-2 mb-1.5">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#D9AE50]">
            <Flame className={`w-3.5 h-3.5 ${isOverheated ? 'text-[#EF4444] animate-pulse' : 'text-[#E9C46A]'}`} />
            <span>CORE TEMPERATURE</span>
          </div>

          <div
            className={`font-mono text-sm sm:text-base font-bold tracking-wider transition-colors duration-500 ${
              isOverheated ? 'text-[#FDA4AF] animate-pulse drop-shadow-[0_0_8px_#E11D48]' : 'text-[#FFFDF5]'
            }`}
          >
            {temperature}°C
          </div>
        </div>

        {/* Illuminated Progress Bar */}
        <div className="relative w-full h-3 sm:h-3.5 rounded-full bg-[#0D0B0A]/90 border border-[#D9AE50]/40 overflow-hidden p-0.5 shadow-inner">
          <div
            style={{ width: `${fillPercent}%` }}
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              isOverheated
                ? 'bg-gradient-to-r from-[#F8E6A0] via-[#F472B6] to-[#E11D48] shadow-[0_0_15px_#E11D48]'
                : pouredCount >= 2
                ? 'bg-gradient-to-r from-[#F8E6A0] via-[#E9B85B] to-[#F472B6] shadow-[0_0_10px_#F472B6]'
                : 'bg-gradient-to-r from-[#FFF9EA] via-[#F8E6A0] to-[#E9B85B] shadow-[0_0_8px_#E9B85B]'
            }`}
          />
        </div>

        {/* Small Progress Status Subtitle */}
        <div className="text-[10px] font-mono text-[#F8E6A0]/80 tracking-wider mt-2 text-center">
          {pouredCount === 0 && 'LOVE IS GETTING WARMER • 0 / 4 INGREDIENTS'}
          {pouredCount === 1 && 'THE FIRST SPARK IS CATCHING • 1 / 4 INGREDIENTS'}
          {pouredCount === 2 && 'THINGS ARE HEATING UP • 2 / 4 INGREDIENTS'}
          {pouredCount === 3 && 'ALMOST AT CRITICAL SWEETNESS • 3 / 4 INGREDIENTS'}
          {pouredCount >= 4 && '100% UCI ESSENCE • MAXIMUM TEMPERATURE REACHED'}
        </div>
      </div>

      {/* Comedic Overheating Romantic Alert Banner */}
      {isOverheated && (
        <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#702B42]/90 border border-[#FDA4AF]/70 text-center shadow-[0_4px_25px_rgba(225,29,72,0.45)] backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-4 h-4 text-[#FDA4AF] shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#FFFDF5] uppercase">
              {ACT5_OVERHEAT_WARNING}
            </span>
            <span className="text-[9px] sm:text-[10px] font-serif italic text-[#FDA4AF]">
              20% Sweetness • 20% Radiance • 20% Princess • 40% Bedroom Menace ♥
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
