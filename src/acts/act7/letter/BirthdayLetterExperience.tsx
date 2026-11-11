// src/acts/act7/letter/BirthdayLetterExperience.tsx

import React, { useState } from 'react';
import { Mail, RotateCcw } from 'lucide-react';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { STORY_DATA } from '../../../config/storyContent';
import { proceduralAudio } from '../../../engine/audio/ProceduralAudio';
import { VoicePlayerPill } from '../../../components/media/VoicePlayerPill';
import { SmartImage } from '../../../components/media/SmartImage';

export const BirthdayLetterExperience: React.FC = () => {
  const isLetterSealBroken = useExperienceStore((state) => state.isLetterSealBroken);
  const breakLetterSeal = useExperienceStore((state) => state.breakLetterSeal);
  const resealLetter = useExperienceStore((state) => state.resealLetter);

  const [isCracking, setIsCracking] = useState(false);

  const handleCrackSeal = () => {
    if (isLetterSealBroken) return;
    setIsCracking(true);
    proceduralAudio.playWaxSealCrack();

    setTimeout(() => {
      breakLetterSeal();
      setIsCracking(false);
    }, 450);
  };

  return (
    <div
      aria-label="The Sealed Birthday Letter"
      className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 px-4 py-1 select-none flex-1 overflow-hidden"
    >
      {/* Left Column: Interactive Wax Seal Aura positioned directly over envelope in background */}
      <div className="relative flex flex-col items-center justify-center w-full lg:w-[35%] py-2 gap-4">
        <div
          onClick={handleCrackSeal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleCrackSeal();
            }
          }}
          className={`relative flex flex-col items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
            !isLetterSealBroken
              ? 'hover:scale-105 active:scale-95'
              : 'opacity-85'
          }`}
        >
          {/* Glowing Aura Ring over the Envelope's Existing Wax Seal in Photo */}
          <div
            className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
              isCracking
                ? 'scale-110 shadow-[0_0_35px_#E11D48]'
                : !isLetterSealBroken
                ? 'shadow-[0_0_22px_rgba(217,174,80,0.6)]'
                : 'opacity-40'
            }`}
          >
            {/* Outer Shimmer Ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 transition-all ${
                !isLetterSealBroken
                  ? 'border-[#FDE047] shadow-[0_0_12px_#FDE047]'
                  : 'border-white/20'
              }`}
            />

            {/* Pulsing Aura if sealed */}
            {!isLetterSealBroken && (
              <div className="absolute -inset-2 rounded-full border border-[#FDE047]/60 animate-ping pointer-events-none" />
            )}

            {/* Monogram Crest (Matching the envelope seal) */}
            <div className="flex flex-col items-center justify-center text-center select-none">
              <span className="font-serif text-base sm:text-lg font-bold text-[#FFF9EA] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                UCI
              </span>
              <span className="text-[10px] text-[#FDE047] font-sans">♥</span>
            </div>
          </div>

          {/* Action Prompt Pill */}
          <div className="px-3.5 py-1 rounded-full bg-[#1A1006]/85 backdrop-blur-md border border-[#D9AE50]/40 text-center shadow-lg">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#F8E6A0] font-semibold">
              {!isLetterSealBroken
                ? '✨ Tap Wax Seal to Open Letter'
                : 'Wax Seal Broken • Letter Unfolded'}
            </span>
          </div>
        </div>

        {/* Finale Keepsake Portrait Card (uci-finale.jpg) Revealed When Letter Unfolds */}
        {isLetterSealBroken && (
          <div className="hidden sm:flex flex-col items-center p-2.5 pb-4 rounded-2xl bg-[#FFFDF5]/90 border border-[#D9AE50]/60 shadow-[0_12px_32px_rgba(0,0,0,0.5)] transform -rotate-2 max-w-[190px] w-full animate-in fade-in duration-500">
            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#FFF9EA] border border-[#D9AE50]/30">
              <SmartImage
                assetKey="act7-letter-keepsake-photo"
                src={STORY_DATA.birthdayLetter.photoPath || STORY_DATA.photos.finale.path}
                alt={STORY_DATA.photos.finale.alt}
                className="w-full h-full"
                theme="warm"
              />
            </div>
            <span className="text-[10px] font-serif italic text-[#5A3B05] mt-2 text-center">
              My favourite person across every mile ♥
            </span>
          </div>
        )}
      </div>

      {/* Right Column: Transparent Letter Parchment Sheet */}
      <div className="relative z-10 w-full lg:w-[60%] lg:ml-auto flex justify-center lg:justify-end pr-0 lg:pr-4">
        {!isLetterSealBroken ? (
          /* Sealed State Preview (Transparent Frosted Glass) */
          <div
            onClick={handleCrackSeal}
            className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#FFFDF7]/15 backdrop-blur-[2px] text-[#241206] border border-[#D9AE50]/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center text-center gap-3.5 cursor-pointer hover:border-[#D9AE50] transition-all"
          >
            <div className="w-11 h-11 rounded-full bg-[#D9AE50]/20 border border-[#D9AE50] flex items-center justify-center text-[#9E7321]">
              <Mail className="w-5 h-5 text-[#D9AE50]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1408] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                A Birthday Letter From Sayang
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-[#3E1A08] mt-1.5 max-w-sm leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                &ldquo;Some words are too meaningful to stay unwritten. Break the wax seal on the envelope to read what&apos;s waiting for you, cintaku.&rdquo;
              </p>
            </div>
            <button
              type="button"
              onClick={handleCrackSeal}
              className="mt-1 px-5 py-2 rounded-full bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-mono font-bold text-xs tracking-wider uppercase shadow-[0_4px_12px_rgba(217,174,80,0.35)] cursor-pointer"
            >
              Break Wax Seal ✨
            </button>
          </div>
        ) : (
          /* Unfolded Letter Sheet */
          <article
            className="w-full max-w-xl p-5 sm:p-7 rounded-2xl bg-[#FFFDF7]/25 backdrop-blur-[2px] text-[#241206] border border-[#D9AE50]/45 shadow-[0_10px_36px_rgba(0,0,0,0.35)] flex flex-col gap-3.5 animate-in fade-in zoom-in-95 duration-500 max-h-[66vh] overflow-y-auto relative"
          >
            {/* Top Bar with Title and Voice Player */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#D9AE50]/30 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#78350F]" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5C2A0A] font-bold">
                  A Birthday Letter From Sayang
                </span>
              </div>

              {/* Voice Note Pill Player */}
              <VoicePlayerPill
                audioPath="/audio/my-voice-note.mp3"
                transcript="Spoken reading of your birthday letter"
                title="Listen to My Voice"
              />
            </div>

            {/* Salutation */}
            <h3 className="text-base sm:text-xl font-serif font-bold text-[#241206] tracking-tight leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              {STORY_DATA.birthdayLetter.salutation}
            </h3>

            {/* LDR Body Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm font-serif leading-relaxed text-[#2A1408] font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
              {STORY_DATA.birthdayLetter.paragraphs.map((p, idx) => (
                <p key={idx} className="indent-4 sm:indent-6">
                  {p}
                </p>
              ))}
            </div>

            {/* Sign-Off and Signature */}
            <div className="pt-3 border-t border-[#D9AE50]/30 flex flex-col items-end gap-0.5">
              <span className="font-serif italic text-sm text-[#451A03] font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {STORY_DATA.birthdayLetter.signOff}
              </span>
              <span className="font-serif text-xl font-bold text-[#881337] tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {STORY_DATA.birthdayLetter.signature}
              </span>
            </div>

            {/* Reseal Envelope Link */}
            <div className="flex justify-start pt-1">
              <button
                type="button"
                onClick={resealLetter}
                className="flex items-center gap-1.5 text-[11px] font-mono text-[#5C2A0A] hover:text-[#1F1206] underline transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reseal Envelope</span>
              </button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
