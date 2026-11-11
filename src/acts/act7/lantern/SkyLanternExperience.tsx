// src/acts/act7/lantern/SkyLanternExperience.tsx

import React, { useState, useMemo } from 'react';
import { Send, Feather, Check, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { proceduralAudio } from '../../../engine/audio/ProceduralAudio';

export const SkyLanternExperience: React.FC = () => {
  const isLanternReleased = useExperienceStore((state) => state.isLanternReleased);
  const releaseLantern = useExperienceStore((state) => state.releaseLantern);
  const birthdayWishText = useExperienceStore((state) => state.birthdayWishText);
  const includeNaughtyWish = useExperienceStore((state) => state.includeNaughtyWish);
  const setBirthdayWish = useExperienceStore((state) => state.setBirthdayWish);
  const setAct7SubStage = useExperienceStore((state) => state.setAct7SubStage);

  const [wishInput, setWishInput] = useState(birthdayWishText);
  const [naughtyWish, setNaughtyWish] = useState(includeNaughtyWish);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate 60 fireflies with randomized positions, delays, and float speeds
  const fireflies = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 12 + Math.random() * 75,
      size: 2.2 + Math.random() * 3.5,
      duration: 3 + Math.random() * 3.5,
      delay: Math.random() * 2.5,
      glowColor: i % 7 === 0 ? '#FB7185' : '#FDE047',
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBirthdayWish(wishInput, naughtyWish);
    proceduralAudio.playStarBridgeChime();
    releaseLantern();

    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div
      aria-label="60 Fireflies and Sky Lantern"
      className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 px-4 py-1 select-none flex-1 overflow-hidden"
    >
      {/* 60 Ambient Dancing Fireflies Layer (No duplicate 3D or SVG lantern) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {fireflies.map((fly) => (
          <div
            key={fly.id}
            className="absolute rounded-full transition-transform duration-1000 ease-out"
            style={{
              left: `${fly.x}%`,
              top: `${fly.y}%`,
              width: `${fly.size}px`,
              height: `${fly.size}px`,
              backgroundColor: fly.glowColor,
              boxShadow: `0 0 10px ${fly.glowColor}, 0 0 20px ${fly.glowColor}`,
              opacity: isLanternReleased ? 0.95 : 0.75,
              transform: isLanternReleased ? 'translateY(-65px)' : 'none',
              animation: `fireflyFloat ${fly.duration}s ease-in-out infinite alternate`,
              animationDelay: `${fly.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Left Column: Ambient Starlight Aura over background lantern (ZERO duplicate lantern objects) */}
      <div className="relative z-10 flex flex-col items-center justify-end flex-1 w-full max-w-md pointer-events-none py-2">
        {/* Soft Radiant Glow placed directly over the background image lantern */}
        <div className="relative flex flex-col items-center justify-center">
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full transition-all duration-1000 ${
              isLanternReleased
                ? 'bg-gradient-radial from-[#FDE047]/40 via-[#F59E0B]/20 to-transparent -translate-y-20 scale-125'
                : 'bg-gradient-radial from-[#FDE047]/25 via-[#F59E0B]/10 to-transparent'
            } blur-2xl animate-pulse`}
          />

          {/* Ascending Stardust Sparkles when wish is released */}
          {isLanternReleased && (
            <div className="absolute -top-16 flex flex-col items-center gap-2 animate-in fade-in duration-700">
              <div className="flex items-center gap-2 text-[#FDE047]">
                <Sparkles className="w-5 h-5 animate-ping" />
                <span className="text-xs font-serif italic text-[#FFF9EA] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Your wish is ascending to the stars... ✨
                </span>
                <Sparkles className="w-5 h-5 animate-ping" />
              </div>
            </div>
          )}
        </div>

        {/* Floating status badge underneath */}
        <div className="pt-2 text-center pointer-events-auto">
          <span className="px-4 py-1.5 rounded-full bg-[#1A1006]/85 backdrop-blur-md border border-[#D9AE50]/40 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#F8E6A0] shadow-lg">
            {isLanternReleased ? '✨ Wish Ascending with 60 Fireflies' : '✨ 60 Fireflies Gathered for Uci'}
          </span>
        </div>
      </div>

      {/* Right Column: Parchment Wish Composer Form */}
      <div className="relative z-10 w-full max-w-md lg:max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-7 rounded-2xl bg-[#FFFDF5] text-[#1E1107] border-2 border-[#D9AE50]/60 shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col gap-3 sm:gap-4 animate-in fade-in duration-500 relative overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(217, 174, 80, 0.12) 0%, transparent 60%)',
          }}
        >
          {/* Deckled Edge Inner Border */}
          <div className="absolute inset-1.5 border border-[#D9AE50]/30 rounded-xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-[#D9AE50]/30 pb-2.5">
            <div className="flex items-center gap-2 text-[#78350F]">
              <Feather className="w-4 h-4 text-[#D9AE50]" />
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-tight">
                My Birthday Wish for the Night Sky
              </h3>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-[#78350F]/70 uppercase">
              Secret & Private
            </span>
          </div>

          {/* Form Prompt */}
          <label htmlFor="sky-wish-textarea" className="text-xs font-serif text-[#451A03] italic leading-snug">
            What does cintaku wish for this year? (Keep it secret or share with the sky...)
          </label>

          {/* Text Area */}
          <textarea
            id="sky-wish-textarea"
            rows={3}
            value={wishInput}
            onChange={(e) => setWishInput(e.target.value)}
            disabled={isLanternReleased}
            placeholder="Write your secret wish here, sayang... Whatever you hope for this year, I want to make it come true."
            className="w-full p-3 rounded-xl bg-[#FFF9EA]/90 border border-[#D9AE50]/50 text-xs sm:text-sm font-serif text-[#1F1206] placeholder:text-[#1F1206]/40 focus:outline-none focus:ring-2 focus:ring-[#D9AE50] transition-all resize-none leading-relaxed"
          />

          {/* Cheeky Naughty Wish Checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-serif text-[#881337] p-1.5 rounded-lg hover:bg-[#FFE4E6]/50 transition-colors">
            <input
              type="checkbox"
              checked={naughtyWish}
              onChange={(e) => setNaughtyWish(e.target.checked)}
              disabled={isLanternReleased}
              className="w-4 h-4 accent-[#E11D48] rounded cursor-pointer"
            />
            <span className="font-medium text-[11px] sm:text-xs">
              Include one unspoken naughty wish for us tonight.
            </span>
          </label>

          {/* Release CTA or State Banner */}
          {!isLanternReleased ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-mono font-bold text-xs tracking-widest uppercase hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(217,174,80,0.4)] mt-0.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>RELEASE INTO THE NIGHT SKY</span>
            </button>
          ) : (
            <div className="space-y-2.5 pt-1 border-t border-[#D9AE50]/20 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#ECFDF5] border border-[#10B981]/30 text-[#065F46] text-xs font-mono">
                <Check className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Wish released into the night sky! Every star has heard you. ♥</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => releaseLantern()}
                  className="flex items-center gap-1 text-[11px] font-mono text-[#78350F]/70 hover:text-[#78350F] underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Release Another Lantern</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAct7SubStage('letter')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-mono font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all shadow-[0_4px_14px_rgba(217,174,80,0.35)] cursor-pointer"
                >
                  <span>Read Your Birthday Letter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
