// src/acts/FinalGiftReveal.tsx

import React, { useEffect, useState } from 'react';
import { Gift, Sparkles, RotateCcw, Package, Heart, Eye } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { CONFIGURED_ACTUAL_GIFT } from '../config/storyContent';
import { SmartImage } from '../components/media/SmartImage';
import { HeirloomMediaPlaceholder } from '../components/media/HeirloomMediaPlaceholder';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';

export const FinalGiftReveal: React.FC = () => {
  const isBoxOpened = useExperienceStore((state) => state.isGiftBoxOpened);
  const isGiftAssembled = useExperienceStore((state) => state.isGiftAssembled);
  const giftAssemblyNonce = useExperienceStore((state) => state.giftAssemblyNonce);
  const untieRibbon = useExperienceStore((state) => state.untieGiftRibbon);
  const openBox = useExperienceStore((state) => state.openGiftBox);
  const replayGiftBox = useExperienceStore((state) => state.replayGiftBox);
  const replayGiftAssembly = useExperienceStore((state) => state.replayGiftAssembly);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);
  const reducedMotion = useExperienceStore((state) => state.reducedMotionChoice);

  // Construction stage label cycler (faster, syncs with 11.5s 3D timeline)
  const [stageLabelIndex, setStageLabelIndex] = useState(0);

  const constructionLabels = [
    'Gathering starlight above the lake...',
    'A little foundation of love...',
    'Every little piece finding its place...',
    'Four walls locking together across the distance...',
    'Gold filigree and constellation stars taking shape...',
    'A radiant crown crest, placed just for you...',
    'Crimson satin ribbon wrapping everything tight...',
    'Made with a little bit of magic, and a whole lot of love. ♥',
  ];

  useEffect(() => {
    if (isGiftAssembled) {
      setStageLabelIndex(constructionLabels.length - 1);
      return;
    }

    setStageLabelIndex(0);
    // 11.5s / 8 labels ≈ 1400ms per label (or 400ms for reduced motion)
    const intervalMs = reducedMotion === 'reduce' ? 400 : 1400;
    const interval = setInterval(() => {
      setStageLabelIndex((prev) => {
        if (prev < constructionLabels.length - 1) return prev + 1;
        return prev;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [giftAssemblyNonce, isGiftAssembled, reducedMotion]);

  const handleOpenGift = () => {
    untieRibbon();
    openBox();
    proceduralAudio.playGiftBoxOpen();
  };

  const handleProceedToVault = () => {
    setCurrentChapter('AFTER_CREDITS');
  };

  // Keyboard shortcut: Press 'V' to unlock After-Credits Vault
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isBoxOpened && (e.key === 'v' || e.key === 'V')) {
        handleProceedToVault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBoxOpened]);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none overflow-x-hidden pointer-events-none">
      {/* ===================================================================== */}
      {/* 1. CINEMATIC TOP HEADER (Compact, Stays Clear of 3D Box) */}
      {/* ===================================================================== */}
      <header className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto pt-6 sm:pt-8 pointer-events-auto">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D9B77B]/60" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#D9B77B] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            SEQUENCE 3 CLIMAX // THE IMPOSSIBLE GIFT
          </span>
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D9B77B]/60" />
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-[#FFF9EA] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {isBoxOpened ? 'A Piece of My Universe' : 'The Convergence of Everything'}
        </h2>

        <p className="text-xs sm:text-sm font-serif italic text-[#F8E6A0]/90 max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Every moment, every detail, every universe... brought together for you. ❤️
        </p>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN 2-COLUMN STAGE (Left = 3D Box Zone, Right = Controls & Gift) */}
      {/* ===================================================================== */}
      <main className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 px-2 sm:px-4 py-4 min-h-[500px]">
        {/* ───────────────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: 3D Box Inspection Subtitle (Underneath Platter)      */}
        {/* Leaves entire 3D box area 100% visible and unblocked              */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start justify-end h-full pt-48 lg:pt-80 pb-2 text-center lg:text-left pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center lg:items-start gap-2 bg-black/45 backdrop-blur-sm p-3.5 rounded-2xl border border-[#D9B77B]/30 shadow-lg max-w-xs sm:max-w-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F8E6A0] font-semibold">
              <Eye className="w-3.5 h-3.5 text-[#D9B77B]" />
              <span>Drag to inspect the royal gift box in 360°</span>
            </div>
            <span className="text-[10px] font-mono text-[#FFF9EA]/80">
              ✨ A 29-Part Mechanical Masterpiece • Reassembling elements from every act
            </span>
            {isGiftAssembled && (
              <button
                type="button"
                onClick={replayGiftAssembly}
                className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[#D9B77B] hover:text-[#FFF9EA] underline transition-colors cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Replay Assembly</span>
              </button>
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: Assembly Progress / Action / Birthday Gift Card     */}
        {/* Kept exclusively on the right side so box is never covered        */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center pointer-events-auto">
          {!isBoxOpened ? (
            /* Closed State: Either Assembling or Ready to Untie */
            !isGiftAssembled ? (
              /* A. Live Construction Progress Card (Right Column) */
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/65 backdrop-blur-md border border-[#D9B77B]/50 shadow-2xl max-w-md w-full gap-3 text-center animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-xs font-mono text-[#F8E6A0] tracking-widest uppercase font-bold">
                  <Sparkles className="w-4 h-4 text-[#D9B77B] animate-spin" />
                  <span>Constructing Royal Gift...</span>
                </div>

                <p className="text-sm sm:text-base font-serif italic text-[#FFF9EA] min-h-[44px] flex items-center justify-center">
                  "{constructionLabels[stageLabelIndex]}"
                </p>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-[#D9AE50] via-[#C5162D] to-[#E11D48] transition-all duration-500"
                    style={{
                      width: `${((stageLabelIndex + 1) / constructionLabels.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              /* B. Assembly Complete — Ready for Untie Ritual */
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-black/70 backdrop-blur-lg border border-[#D9B77B]/55 shadow-2xl max-w-md w-full gap-4 text-center animate-in zoom-in-95 duration-500">
                <div className="px-3.5 py-1.5 rounded-full bg-[#D9B77B]/20 border border-[#D9B77B]/45 text-[11px] font-mono text-[#F8E6A0] flex items-center gap-2 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-current animate-pulse" />
                  <span>Made with a little bit of magic, and a whole lot of love. ♥</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#FFF9EA] font-semibold tracking-tight">
                  YOUR SURPRISE IS READY
                </h3>

                <button
                  type="button"
                  onClick={handleOpenGift}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#9E1A33] via-[#C5162D] to-[#E11D48] text-[#FFF9EA] font-mono font-bold text-xs sm:text-sm tracking-widest uppercase hover:brightness-110 active:scale-98 transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-[#FDA4AF]/40 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Gift className="w-4 h-4 animate-bounce" />
                  <span>Untie Crimson Ribbon & Open Box</span>
                  <Sparkles className="w-4 h-4 text-[#FDE047] fill-current" />
                </button>

                <button
                  type="button"
                  onClick={replayGiftAssembly}
                  className="text-xs font-mono text-[#D9B77B] hover:text-[#FFF9EA] underline flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Watch It Come Together Again</span>
                </button>
              </div>
            )
          ) : (
            /* C. Opened State: The Real Birthday Gift Showcase Card */
            <div className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#180810]/95 to-[#10040A]/95 backdrop-blur-lg border border-[#D9B77B]/50 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex flex-col gap-4 sm:gap-5 animate-in slide-in-from-right-8 duration-700">
              <div className="flex items-center justify-between border-b border-[#D9B77B]/25 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D9B77B] font-semibold">
                  {CONFIGURED_ACTUAL_GIFT.eyebrow}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#D9B77B]/20 text-[#F8E6A0] border border-[#D9B77B]/50 shadow-xs">
                  OFFICIAL BIRTHDAY GIFT
                </span>
              </div>

              {/* Media Presentation Slot */}
              <div className="w-full h-52 sm:h-60 rounded-xl overflow-hidden relative border border-[#D9B77B]/30 bg-black/60 flex items-center justify-center shadow-inner">
                {CONFIGURED_ACTUAL_GIFT.populated ? (
                  <SmartImage
                    assetKey={CONFIGURED_ACTUAL_GIFT.imageAssetKey}
                    alt={CONFIGURED_ACTUAL_GIFT.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <HeirloomMediaPlaceholder
                    variant="gift-crest"
                    label="Reserved Royal Gift Showcase"
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Gift Headlines & Description */}
              <div className="flex flex-col gap-1">
                <h3 className="text-xl sm:text-2xl font-serif text-[#FFF9EA] tracking-tight font-normal">
                  {CONFIGURED_ACTUAL_GIFT.title}
                </h3>
                <span className="text-xs font-sans text-[#F8E6A0] font-medium">
                  {CONFIGURED_ACTUAL_GIFT.subtitle}
                </span>
                <p className="text-xs sm:text-sm font-serif text-[#FFF9EA]/85 leading-relaxed mt-1">
                  {CONFIGURED_ACTUAL_GIFT.description}
                </p>
              </div>

              {/* Delivery & Personal Note Callouts */}
              <div className="p-3.5 rounded-xl bg-[#D9B77B]/10 border border-[#D9B77B]/30 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#F8E6A0]">
                  <Package className="w-3.5 h-3.5 shrink-0 text-[#D9B77B]" />
                  <span>{CONFIGURED_ACTUAL_GIFT.deliveryOrRedemptionNote}</span>
                </div>
                <p className="text-xs font-serif italic text-[#FFF9EA]/90 pl-5 border-l border-[#D9B77B]/40">
                  "{CONFIGURED_ACTUAL_GIFT.personalNote}"
                </p>
              </div>

              {/* Secondary Close / Re-open Action & Discreet Secret Clasp */}
              <div className="flex items-center justify-between pt-2 border-t border-[#D9B77B]/20">
                <button
                  type="button"
                  onClick={replayGiftBox}
                  className="text-[11px] font-mono text-white/50 hover:text-white underline cursor-pointer"
                >
                  Close & Re-open Box
                </button>

                {/* Creatively Hidden Secret Clasp to After-Credits Vault */}
                <button
                  type="button"
                  onClick={handleProceedToVault}
                  aria-label="Unlock Your After-Credits VIP Vault"
                  title="A secret wax seal tucked under the velvet tray..."
                  className="group relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#180810]/70 hover:bg-[#881337]/60 border border-[#D9B77B]/25 hover:border-[#FDA4AF]/60 transition-all duration-300 cursor-pointer shadow-xs"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#881337] border border-[#FDA4AF]/70 flex items-center justify-center text-[8px] text-[#FDA4AF] group-hover:scale-110 transition-transform">
                    ♥
                  </span>
                  <span className="text-[10px] font-serif italic text-[#D9B77B]/40 group-hover:text-[#F8E6A0] transition-colors">
                    a secret note...
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ===================================================================== */}
      {/* 3. FOOTER NAVIGATION (Quiet, Peaceful Conclusion)                     */}
      {/* ===================================================================== */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full pt-3 pb-2 gap-3 pointer-events-auto">
        <span className="text-[11px] font-mono text-[#FFF9EA]/45">
          THE GRAVITY OF UCI • ACT VIII · FINAL GIFT REVEAL
        </span>

        <span className="text-[11px] font-serif italic text-[#F8E6A0]/50">
          Forever yours, your boyfriend ♥
        </span>
      </footer>
    </div>
  );
};
