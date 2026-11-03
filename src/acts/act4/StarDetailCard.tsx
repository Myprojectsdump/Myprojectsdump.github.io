// src/acts/act4/StarDetailCard.tsx

import React, { useState } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { ConstellationNodeData } from '../../types/story.types';
import { ConstellationPosition } from '../../config/act4ConstellationLayout';

interface StarDetailCardProps {
  node: ConstellationNodeData;
  layout: ConstellationPosition;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const StarDetailCard: React.FC<StarDetailCardProps> = ({
  node,
  layout,
  onClose,
  onPrev,
  onNext,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const isSpicy = node.category === 'spicy';

  return (
    <div
      role="dialog"
      aria-label={layout.romanticTitle}
      className="relative w-full max-w-xl p-5 sm:p-7 rounded-3xl bg-[#1A0C06]/85 border border-[#D9AE50]/70 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl z-30 select-none animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D9AE50]/25 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D9AE50]/50 bg-[#F8E6A0]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E9B85B] shadow-[0_0_8px_#F8E6A0]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F8E6A0] font-bold">
            CONSTELLATION NOTE
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-full border border-[#D9AE50]/30 hover:border-[#D9AE50] hover:bg-[#FFF9EA]/15 text-[#F8E6A0] transition-colors cursor-pointer"
          aria-label="Close constellation note"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Layout: Polaroid Photo on Left, Story on Right */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Left Side: Heirloom Polaroid Photo */}
        <div className="relative w-44 sm:w-48 bg-[#FFFDF5] p-2.5 pb-5 rounded-lg shadow-xl border border-[#D9AE50]/40 transform -rotate-2 shrink-0">
          {/* Washi Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F8E6A0]/80 border-t border-b border-[#D9AE50]/40 rotate-1 shadow-xs pointer-events-none" />

          {/* Photograph Artwork */}
          <div className="w-full aspect-[4/3] rounded bg-gradient-to-br from-[#2D1B4E] via-[#6B21A8] to-[#D97706] overflow-hidden flex items-center justify-center relative">
            <img
              src="/media/backgrounds/opening-cosmos.webp"
              alt="Romantic Memory"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to warm sunset gradient
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom Gold Foil Monogram */}
          <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] font-serif text-[#6B4706]">
            <span className="italic">forever & always</span>
            <span className="font-serif">♡</span>
          </div>
        </div>

        {/* Right Side: Romantic Narrative */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Star Ordinal & Category */}
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#D9AE50]/80 mb-1">
              <span>STAR 0{layout.slot} / 08</span>
              <span>•</span>
              <span className={isSpicy ? 'text-[#FDA4AF]' : 'text-[#F8E6A0]'}>
                {isSpicy ? 'INTIMATE PASSION 🔥' : 'SOUL CONNECTION ✨'}
              </span>
            </div>

            {/* Romantic Title */}
            <h3 className="text-xl sm:text-2xl font-serif italic text-[#FFFDF5] font-normal leading-tight mb-1.5 drop-shadow">
              {layout.romanticTitle}
            </h3>

            {/* Source Headline */}
            <div className="text-xs font-serif italic text-[#E9C46A] mb-2 font-medium">
              "{node.headline}"
            </div>

            {/* Source Narrative Description */}
            <p className="font-sans text-xs sm:text-sm text-[#F8E6A0]/90 leading-relaxed">
              {node.description}
            </p>
          </div>

          {/* Audio Waveform Player Pill (Matching Reference Image) */}
          <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-2xl bg-[#FFFDF5]/10 border border-[#D9AE50]/30 mt-4 backdrop-blur-md">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-7 h-7 rounded-full bg-[#E9C46A] text-[#3E2507] hover:bg-[#F8E6A0] flex items-center justify-center shadow transition-transform active:scale-95 cursor-pointer shrink-0"
              aria-label={isPlayingAudio ? 'Pause' : 'Play voice note'}
            >
              {isPlayingAudio ? (
                <Pause className="w-3 h-3 fill-current" />
              ) : (
                <Play className="w-3 h-3 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Waveform Bars */}
            <div className="flex items-center gap-1 flex-1 h-4 justify-center overflow-hidden">
              {[8, 14, 10, 18, 12, 16, 11, 15, 9, 13, 17, 10].map((h, i) => (
                <span
                  key={i}
                  style={{
                    height: isPlayingAudio ? `${h}px` : '3px',
                    transition: 'height 0.2s ease',
                  }}
                  className="w-1 rounded-full bg-[#F8E6A0]"
                />
              ))}
            </div>

            <span className="text-[10px] font-mono text-[#F8E6A0] shrink-0">
              0:00 / 2:36
            </span>

            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#D9AE50]/40 text-[#F8E6A0]/80 shrink-0">
              1x
            </span>
          </div>

          {/* Keep This Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-3 py-2 px-4 rounded-full border border-[#D9AE50]/60 bg-[#1A0C06]/70 hover:bg-[#FFF9EA]/15 text-xs font-serif italic text-[#FFFDF5] hover:text-[#F8E6A0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Keep This Close</span>
            <Heart className="w-3.5 h-3.5 text-[#E9C46A]" />
          </button>
        </div>
      </div>

      {/* Bottom Star Browsing Stepper */}
      <div className="flex items-center justify-between pt-3 border-t border-[#D9AE50]/20 mt-4">
        <button
          onClick={onPrev}
          className="flex items-center gap-1 text-[11px] font-mono text-[#F8E6A0]/80 hover:text-[#FFFDF5] cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous Star</span>
        </button>

        <span className="text-[10px] font-mono text-[#D9AE50]/70">
          {layout.slot} / 8
        </span>

        <button
          onClick={onNext}
          className="flex items-center gap-1 text-[11px] font-mono text-[#F8E6A0]/80 hover:text-[#FFFDF5] cursor-pointer"
        >
          <span>Next Star</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
