// src/acts/act4/ConfessionCard.tsx

import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Repeat } from 'lucide-react';

interface ConfessionCardProps {
  vinylSide: 'daylight' | 'afterHours';
  confessionIndex: number;
  confessions: string[];
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}

export const ConfessionCard: React.FC<ConfessionCardProps> = ({
  vinylSide,
  confessionIndex,
  confessions,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
}) => {
  const currentConfession = confessions[confessionIndex] || '';
  const isDaylight = vinylSide === 'daylight';

  return (
    <div
      className={`relative w-full max-w-lg p-6 sm:p-8 rounded-3xl border transition-all duration-500 shadow-2xl backdrop-blur-md select-none ${
        isDaylight
          ? 'bg-[#FFF9EA]/95 border-[#D9AE50]/70 shadow-[0_16px_50px_rgba(110,75,10,0.3)] text-[#3E2507]'
          : 'bg-[#FFF5ED]/95 border-[#E11D48]/60 shadow-[0_16px_50px_rgba(120,20,40,0.4)] text-[#3E1018]'
      }`}
    >
      {/* Subtle Antique Stationery Watermark Monogram */}
      <div className="absolute top-4 right-5 text-xs font-serif text-[#C89A43]/40 tracking-widest select-none pointer-events-none">
        U ♥ S
      </div>

      {/* Track Ordinal Header */}
      <div className="text-center pb-2 border-b border-[#D9AE50]/30 mb-4">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase font-bold text-[#8B5E0A]">
          TRACK 0{confessionIndex + 1} / 04
        </span>
      </div>

      {/* Main Confession Quote with Carousel Arrows */}
      <div className="relative flex items-center justify-between min-h-[110px] sm:min-h-[130px] px-1 sm:px-3">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
            isDaylight
              ? 'border-[#D9AE50]/40 hover:border-[#D9AE50] hover:bg-[#F8E6A0]/40 text-[#6B4706]'
              : 'border-[#E11D48]/40 hover:border-[#E11D48] hover:bg-[#FFE4E6]/50 text-[#9F1239]'
          }`}
          aria-label="Previous confession"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Confession Quote Text */}
        <div className="flex-1 px-3 sm:px-5 text-center flex items-center justify-center">
          <p className="font-serif italic text-base sm:text-lg md:text-[21px] leading-relaxed tracking-normal font-normal">
            "{currentConfession}"
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
            isDaylight
              ? 'border-[#D9AE50]/40 hover:border-[#D9AE50] hover:bg-[#F8E6A0]/40 text-[#6B4706]'
              : 'border-[#E11D48]/40 hover:border-[#E11D48] hover:bg-[#FFE4E6]/50 text-[#9F1239]'
          }`}
          aria-label="Next confession"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Audio Waveform Player Bar */}
      <div
        className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border mt-5 transition-colors ${
          isDaylight
            ? 'bg-[#F8E6A0]/35 border-[#D9AE50]/40'
            : 'bg-[#FFE4E6]/40 border-[#E11D48]/40'
        }`}
      >
        {/* Play / Pause Toggle Button */}
        <button
          onClick={onTogglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer ${
            isDaylight
              ? 'bg-[#D9AE50] text-[#3E2507] hover:bg-[#E9B85B]'
              : 'bg-[#E11D48] text-white hover:bg-[#BE123C]'
          }`}
          aria-label={isPlaying ? 'Pause vinyl' : 'Play vinyl'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Subtle Waveform Animation Bars */}
        <div className="flex items-center gap-1 flex-1 h-5 px-1 justify-center overflow-hidden">
          {[12, 20, 16, 28, 22, 14, 26, 18, 24, 12, 16, 22, 18, 26, 15, 20, 14].map(
            (height, idx) => (
              <span
                key={idx}
                style={{
                  height: isPlaying ? `${height}px` : '4px',
                  transition: 'height 0.25s ease',
                  animation: isPlaying ? `waveformPulse 0.8s ease-in-out infinite alternate ${idx * 0.05}s` : 'none',
                }}
                className={`w-1 rounded-full ${
                  isDaylight ? 'bg-[#D9AE50]' : 'bg-[#E11D48]'
                }`}
              />
            )
          )}
        </div>

        {/* Playback Timer Display */}
        <span className="text-[11px] font-mono font-medium tracking-wider text-[#6B4706] shrink-0">
          {isPlaying ? '1:24 / 3:56' : '0:00 / 3:56'}
        </span>

        {/* Loop Icon */}
        <div className="shrink-0 text-[#8B5E0A]/70" title="Repeating warm analog groove">
          <Repeat className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
