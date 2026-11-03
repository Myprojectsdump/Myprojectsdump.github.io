// src/acts/FinalLoveLetter.tsx

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  Feather,
  Infinity,
  ArrowRight,
} from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import {
  FINAL_POEMS,
  FINAL_NOTE_CONTENT,
  INTRO_SEQUENCE_CONFIG,
  LovePoem,
} from '../config/finalLoveLetterContent';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';
import { CinematicDeclarationTitle } from '../components/typography/CinematicDeclarationTitle';

type ExperiencePhase =
  | 'INTRO'            // Sequential text lines written letter-by-letter on deep black
  | 'DECLARATION'      // Concluding "I Love You, Uci" live handwriting sequence on black
  | 'DECLARATION_DONE' // Live writing complete; buttons to enter main universe or admire
  | 'REVEALING'        // Smooth fade-out of black overlay into moonlit lake
  | 'MAIN'             // Full reading screen with poems, 3D astrolabe heart, and glass reader
  | 'FOCUS_READING'    // Immersive quiet reading mode
  | 'AMBIENT';         // Ambient scenery contemplation

// =============================================================================
// LIVE INVISIBLE HANDWRITING TEXT RENDERER (Letter-by-Letter Reveal)
// =============================================================================
interface LiveHandwrittenTextProps {
  text: string;
  charSpeedMs?: number;
  onLineComplete?: () => void;
  isSkipped?: boolean;
}

const LiveHandwrittenText: React.FC<LiveHandwrittenTextProps> = ({
  text,
  charSpeedMs = 45,
  onLineComplete,
  isSkipped = false,
}) => {
  const [revealedChars, setRevealedChars] = useState(isSkipped ? text.length : 0);
  const onLineCompleteRef = useRef(onLineComplete);
  onLineCompleteRef.current = onLineComplete;

  useEffect(() => {
    if (isSkipped) {
      setRevealedChars(text.length);
      onLineCompleteRef.current?.();
      return;
    }

    setRevealedChars(0);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setRevealedChars(index);
      if (index >= text.length) {
        clearInterval(interval);
        onLineCompleteRef.current?.();
      }
    }, charSpeedMs);

    return () => clearInterval(interval);
  }, [text, charSpeedMs, isSkipped]);

  const visibleText = text.slice(0, revealedChars);
  const isTyping = revealedChars < text.length;

  return (
    <span className="relative inline-block font-serif text-2xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EA] via-[#FDE68A] to-[#FFF9EA] tracking-wide leading-relaxed drop-shadow-[0_4px_24px_rgba(217,174,80,0.5)]">
      {visibleText}
      {isTyping && (
        <span className="inline-block w-1.5 h-6 sm:h-8 ml-1 bg-[#FDE68A] rounded-full animate-pulse align-middle shadow-[0_0_10px_#FDE68A]" />
      )}
    </span>
  );
};

// =============================================================================
// MINI THEMATIC SVG THUMBNAIL RENDERER (Matches Reference Image Cards)
// =============================================================================
const PoemThumbnail: React.FC<{ theme: LovePoem['theme'] }> = ({ theme }) => {
  if (theme === 'blossom') {
    return (
      <div className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg overflow-hidden relative shrink-0 bg-gradient-to-br from-[#3D1420] to-[#1A080E] border border-[#FDA4AF]/30 flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#FDA4AF]">
          <circle cx="20" cy="14" r="5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="26" cy="20" r="5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="20" cy="26" r="5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="14" cy="20" r="5" fill="#FDA4AF" opacity="0.85" />
          <circle cx="20" cy="20" r="3.5" fill="#FDE047" />
        </svg>
      </div>
    );
  }

  if (theme === 'moon') {
    return (
      <div className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg overflow-hidden relative shrink-0 bg-gradient-to-br from-[#1E1138] to-[#0A0514] border border-[#C084FC]/30 flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-8 h-8">
          <circle cx="20" cy="20" r="9" fill="#F5F3FF" opacity="0.9" />
          <ellipse cx="23" cy="23" rx="14" ry="4" fill="#818CF8" opacity="0.35" />
        </svg>
      </div>
    );
  }

  if (theme === 'flower') {
    return (
      <div className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg overflow-hidden relative shrink-0 bg-gradient-to-br from-[#330D1B] to-[#120308] border border-[#FB7185]/30 flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#FB7185]">
          <path d="M 20 8 Q 23 15 20 20 Q 17 15 20 8" fill="#F43F5E" />
          <path d="M 32 20 Q 25 23 20 20 Q 25 17 32 20" fill="#F43F5E" />
          <path d="M 20 32 Q 17 25 20 20 Q 23 25 20 32" fill="#F43F5E" />
          <path d="M 8 20 Q 15 17 20 20 Q 15 23 8 20" fill="#F43F5E" />
          <circle cx="20" cy="20" r="3" fill="#FDE047" />
        </svg>
      </div>
    );
  }

  // cosmos
  return (
    <div className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg overflow-hidden relative shrink-0 bg-gradient-to-br from-[#121B3A] to-[#050A18] border border-[#93C5FD]/30 flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#FDE047]">
        <circle cx="20" cy="20" r="2" fill="#FFF" />
        <path d="M 20 10 L 20 30 M 10 20 L 30 20" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
        <circle cx="13" cy="14" r="1" fill="#93C5FD" />
        <circle cx="27" cy="26" r="1" fill="#93C5FD" />
      </svg>
    </div>
  );
};

// =============================================================================
// MASTER COMPONENT: FINAL LOVE LETTER (Act IX Finale)
// =============================================================================
export const FinalLoveLetter: React.FC = () => {
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  // Experience Phase
  const [phase, setPhase] = useState<ExperiencePhase>('INTRO');
  const [introStep, setIntroStep] = useState(0);
  const [isLineFinished, setIsLineFinished] = useState(false);
  const [isIntroSkipped, setIsIntroSkipped] = useState(false);
  const [writingNonce, setWritingNonce] = useState(0);

  // Active Reading Item: 'note' or index 0..N-1 of FINAL_POEMS
  const [selectedPoemIndex, setSelectedPoemIndex] = useState<number | 'note'>(0);

  // Ambient Mode toggle
  const [isAmbient, setIsAmbient] = useState(false);

  // Focus Reading Mode toggle
  const [isFocusReading, setIsFocusReading] = useState(false);

  // Active poem reference
  const currentPoem: LovePoem | null = useMemo(() => {
    if (selectedPoemIndex === 'note' || FINAL_POEMS.length === 0) return null;
    return FINAL_POEMS[selectedPoemIndex] || null;
  }, [selectedPoemIndex]);

  const totalPoems = FINAL_POEMS.length;
  const totalIntroLines = INTRO_SEQUENCE_CONFIG.lines.length;

  // Called when typing for the current line completes
  const handleCurrentLineFinished = useCallback(() => {
    setIsLineFinished(true);
  }, []);

  // Advance intro lines on timer or tap
  const handleAdvanceIntro = useCallback(() => {
    if (phase !== 'INTRO') return;

    // If still typing current line, finish it instantly
    if (!isLineFinished) {
      setIsLineFinished(true);
      return;
    }

    // If finished, proceed to next line or declaration
    if (introStep < totalIntroLines - 1) {
      setIsLineFinished(false);
      setIntroStep((prev) => prev + 1);
      try {
        proceduralAudio.playConstellationStarTone(introStep + 1);
      } catch {
        // audio fallback
      }
    } else {
      // Transition from sequential lines to the concluding "I Love You, Uci" declaration sequence
      setPhase('DECLARATION');
      try {
        proceduralAudio.playStarBridgeChime();
      } catch {
        // audio fallback
      }
    }
  }, [phase, isLineFinished, introStep, totalIntroLines]);

  // Automatic progression: after line finishes typing, wait 2.2s then advance
  useEffect(() => {
    if (phase !== 'INTRO' || !isLineFinished) return;
    const timer = setTimeout(() => {
      handleAdvanceIntro();
    }, 2200);
    return () => clearTimeout(timer);
  }, [phase, isLineFinished, handleAdvanceIntro]);

  // Handler when "I Love You, Uci" sequence completes (strictly memoized to prevent re-runs)
  const handleTitleSequenceComplete = useCallback(() => {
    setPhase('DECLARATION_DONE');
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
  }, []);

  // Skip Intro Action directly to MAIN poems screen
  const handleSkipIntro = () => {
    setIsIntroSkipped(true);
    setPhase('MAIN');
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
  };

  // Enter Main Universe (Fades in the last screen with poems and all)
  const handleEnterMain = () => {
    setPhase('REVEALING');
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
    const timer = setTimeout(() => {
      setPhase('MAIN');
    }, 900);
    return () => clearTimeout(timer);
  };

  // Replay from beginning of intro sequence
  const handleReplayIntro = () => {
    setIsIntroSkipped(false);
    setIsLineFinished(false);
    setIntroStep(0);
    setWritingNonce((n) => n + 1);
    setPhase('INTRO');
  };

  // Replay only the "I Love You, Uci" live handwriting declaration
  const handleReplayDeclaration = () => {
    setIsIntroSkipped(false);
    setWritingNonce((n) => n + 1);
    setPhase('DECLARATION');
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // POETRY NAVIGATION HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSelectPoem = (idx: number) => {
    setSelectedPoemIndex(idx);
    try {
      proceduralAudio.playConstellationStarTone(idx + 1);
    } catch {
      // audio fallback
    }
  };

  const handleSelectFinalNote = () => {
    setSelectedPoemIndex('note');
    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // audio fallback
    }
  };

  const handlePrev = () => {
    if (selectedPoemIndex === 'note') {
      if (totalPoems > 0) {
        setSelectedPoemIndex(totalPoems - 1);
      }
    } else if (selectedPoemIndex > 0) {
      setSelectedPoemIndex(selectedPoemIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedPoemIndex === 'note') {
      if (totalPoems > 0) {
        setSelectedPoemIndex(0);
      }
    } else if (selectedPoemIndex < totalPoems - 1) {
      setSelectedPoemIndex(selectedPoemIndex + 1);
    } else {
      setSelectedPoemIndex('note');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'MAIN' && phase !== 'FOCUS_READING') return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape' && isFocusReading) setIsFocusReading(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, selectedPoemIndex, isFocusReading]);

  // ─────────────────────────────────────────────────────────────────────────────
  // BOTTOM ACTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  const handleReplayStory = () => {
    setCurrentChapter('OPENING');
  };

  const handleToggleFocusReading = () => {
    setIsFocusReading((prev) => !prev);
  };

  const handleToggleAmbient = () => {
    setIsAmbient((prev) => !prev);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-3 sm:p-5 lg:p-7 select-none overflow-x-hidden">
      {/* ===================================================================== */}
      {/* CINEMATIC BLACK INTRO OVERLAY                                         */}
      {/* Runs introductory text sequence concluding with "I Love You, Uci",   */}
      {/* then smoothly fades out so the last screen with poems fades in!       */}
      {/* ===================================================================== */}
      {(phase === 'INTRO' || phase === 'DECLARATION' || phase === 'DECLARATION_DONE' || phase === 'REVEALING') && (
        <div
          onClick={phase === 'INTRO' ? handleAdvanceIntro : undefined}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-[#07040C] text-center transition-opacity duration-1000 ${
            phase === 'REVEALING'
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 pointer-events-auto cursor-pointer'
          }`}
        >
          {/* Faint Golden Point of Light in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#D9B77B]/10 blur-[100px] pointer-events-none animate-pulse" />

          {/* Top Eyebrow Tag */}
          <div className="relative z-10 w-full flex items-center justify-center pt-2 sm:pt-4">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-[#D9B77B]/60 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              THE GRAVITY OF UCI • CLOSING MOMENT
            </span>
          </div>

          {/* Central Stage: Live Letter-by-Letter Story OR "I Love You, Uci" Live Handwriting */}
          <div className="relative z-10 my-auto w-full max-w-4xl flex flex-col items-center justify-center">
            {phase === 'INTRO' && (
              <div className="max-w-xl mx-auto flex flex-col items-center gap-6 min-h-[140px] justify-center">
                <LiveHandwrittenText
                  key={introStep}
                  text={INTRO_SEQUENCE_CONFIG.lines[introStep] || INTRO_SEQUENCE_CONFIG.lines[0]}
                  charSpeedMs={45}
                  onLineComplete={handleCurrentLineFinished}
                  isSkipped={isLineFinished}
                />

                {/* Gentle tap indicator */}
                <span className="text-[10px] font-mono tracking-widest text-[#D9B77B]/40 uppercase mt-2">
                  (tap anywhere to continue)
                </span>
              </div>
            )}

            {(phase === 'DECLARATION' || phase === 'DECLARATION_DONE') && (
              <div className="w-full flex flex-col items-center justify-center">
                <CinematicDeclarationTitle
                  key={`decl-${writingNonce}`}
                  mode="intro"
                  onSequenceComplete={handleTitleSequenceComplete}
                  isSkipped={isIntroSkipped}
                />
              </div>
            )}
          </div>

          {/* Bottom Deck: Progress Dots & Actions */}
          <div className="relative z-10 w-full flex flex-col items-center gap-3 pb-4 sm:pb-6">
            {phase === 'INTRO' && (
              <div className="flex items-center gap-2 mb-2">
                {INTRO_SEQUENCE_CONFIG.lines.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`inline-block rounded-full transition-all duration-500 ${
                      introStep === dotIdx
                        ? 'w-3 h-1.5 bg-[#D9B77B]'
                        : 'w-1.5 h-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* In DECLARATION (during real-time writing): give next & replay buttons immediately */}
            {phase === 'DECLARATION' && (
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center animate-in fade-in duration-300">
                <button
                  type="button"
                  onClick={handleEnterMain}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D9B77B] via-[#E9B85B] to-[#F8E6A0] text-[#140A00] font-mono font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_24px_rgba(217,183,123,0.5)] border border-[#FFF9EA]/60"
                >
                  <span>ENTER OUR FINAL UNIVERSE</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B45309]" />
                </button>

                <button
                  type="button"
                  onClick={handleReplayDeclaration}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-[#D9B77B]/40 text-xs font-mono text-[#F8E6A0] hover:text-[#FFF9EA] transition-all cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D9B77B]" />
                  <span>REPLAY WRITING ↺</span>
                </button>
              </div>
            )}

            {/* In DECLARATION_DONE (writing complete): grand celebration actions */}
            {phase === 'DECLARATION_DONE' && (
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center animate-in fade-in duration-500">
                {/* Primary Button to fade into the last screen with poems */}
                <button
                  type="button"
                  onClick={handleEnterMain}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D9B77B] via-[#E9B85B] to-[#F8E6A0] text-[#140A00] font-mono font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_36px_rgba(217,183,123,0.75)] border border-[#FFF9EA]/80 animate-pulse"
                >
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  <span>ENTER OUR FINAL UNIVERSE</span>
                  <ArrowRight className="w-4 h-4 text-[#B45309]" />
                </button>

                {/* Replay declaration action */}
                <button
                  type="button"
                  onClick={handleReplayDeclaration}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/60 hover:bg-black/80 border border-[#D9B77B]/40 text-xs font-mono text-[#F8E6A0] hover:text-[#FFF9EA] transition-all cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D9B77B]" />
                  <span>REPLAY WRITING ↺</span>
                </button>

                {/* Watch story from beginning */}
                <button
                  type="button"
                  onClick={handleReplayIntro}
                  className="flex items-center gap-2 px-4 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-xs font-mono text-[#FFF9EA]/75 hover:text-white transition-all cursor-pointer"
                >
                  <span>WATCH STORY FROM BEGINNING ⟲</span>
                </button>
              </div>
            )}

            {/* In INTRO: Skip intro button */}
            {phase === 'INTRO' && (
              <button
                type="button"
                onClick={handleSkipIntro}
                className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-[11px] font-mono uppercase tracking-widest text-[#FFF9EA]/70 hover:text-white transition-all cursor-pointer shadow-sm"
              >
                Skip Intro ❯
              </button>
            )}

            <span className="text-[10px] font-serif italic text-[#FFF9EA]/45 tracking-wider">
              Today. Tomorrow. Always. ♡
            </span>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* THE LAST SCREEN — FADES IN WITH POEMS, 3D ASTROLABE & ALL             */}
      {/* Set against the moonlit lake background plate (final-love-letter-bg) */}
      {/* ===================================================================== */}

      {/* Header: Signature Declaration Title */}
      <header
        className={`relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto pt-1 sm:pt-2 pb-1 transition-opacity duration-700 pointer-events-auto ${
          phase !== 'MAIN' && phase !== 'FOCUS_READING' && phase !== 'AMBIENT'
            ? 'opacity-0 pointer-events-none'
            : isAmbient
            ? 'opacity-30'
            : 'opacity-100'
        }`}
      >
        <div
          className="relative group cursor-pointer"
          onClick={handleReplayDeclaration}
          title="Click to replay closing declaration"
        >
          <CinematicDeclarationTitle mode="header" />
        </div>
      </header>

      {/* Main 3-Zone Balanced Layout */}
      <main
        className={`relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 px-2 sm:px-4 py-2 min-h-[500px] transition-all duration-700 ${
          phase !== 'MAIN' && phase !== 'FOCUS_READING' && phase !== 'AMBIENT'
            ? 'opacity-0 pointer-events-none'
            : isAmbient
            ? 'opacity-20 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 1. LEFT COLUMN: "MY POEMS FOR YOU" Collection Rail                */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {!isFocusReading && (
          <div className="w-full lg:w-[28%] max-w-md lg:max-w-none flex flex-col pointer-events-auto">
            <div className="rounded-3xl overflow-hidden backdrop-blur-[24px] bg-[#0A1022]/70 border border-[#EBCB91]/35 shadow-[0_16px_40px_rgba(0,0,0,0.8)] p-4 sm:p-5 flex flex-col gap-3">
              {/* Rail Title Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-[#EBCB91]/20">
                <Feather className="w-4 h-4 text-[#D9B77B]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D9B77B] font-bold">
                  My Poems For You
                </span>
              </div>

              {/* Vertical Card Stack */}
              <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {FINAL_POEMS.map((poem, idx) => {
                  const isActive = selectedPoemIndex === idx;
                  return (
                    <button
                      key={poem.id}
                      type="button"
                      onClick={() => handleSelectPoem(idx)}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#D9B77B]/20 border border-[#EBCB91] text-[#FFF9EA] shadow-[0_0_20px_rgba(217,183,123,0.45)]'
                          : 'bg-black/30 hover:bg-white/5 border border-white/10 text-[#FFF9EA]/75'
                      }`}
                    >
                      {/* Left Thumbnail Art */}
                      <PoemThumbnail theme={poem.theme} />

                      {/* Right Numerals & Title */}
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-serif font-bold text-[#D9B77B]">
                          {poem.numeral}.
                        </span>
                        <span className="text-xs sm:text-[13px] font-serif leading-snug truncate">
                          {poem.title}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* A Final Note Collection Card */}
                <button
                  type="button"
                  onClick={handleSelectFinalNote}
                  className={`flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all duration-300 cursor-pointer mt-1 ${
                    selectedPoemIndex === 'note'
                      ? 'bg-gradient-to-r from-[#E11D48]/25 to-[#881337]/30 border border-[#FDA4AF] text-[#FFF9EA] shadow-[0_0_20px_rgba(225,29,72,0.4)]'
                      : 'bg-black/30 hover:bg-white/5 border border-white/10 text-[#FDA4AF]/80'
                  }`}
                >
                  <div className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg bg-[#881337]/40 border border-[#FDA4AF]/40 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-[#FDA4AF] fill-current animate-pulse" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FDA4AF] font-bold">
                      Finale
                    </span>
                    <span className="text-xs sm:text-[13px] font-serif font-semibold text-[#FFF9EA]">
                      A Final Note
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 2. CENTER ZONE: 3D Celestial Astrolabe Sculpture Stage Reserve   */}
        {/* Clear center column allows 3D R3F astrolabe to shine on pedestal  */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {!isFocusReading && (
          <div className="hidden lg:flex w-[32%] flex-col items-center justify-end h-[420px] pb-4 pointer-events-none text-center">
            <div className="pointer-events-auto flex items-center gap-2 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D9B77B]/35 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D9B77B] animate-spin" />
              <span className="text-[10px] font-mono text-[#F8E6A0]/90">
                Celestial Astrolabe • Tap to pulse
              </span>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 3. RIGHT COLUMN: Grand Glass Poetry Reader Surface                */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div
          className={`w-full transition-all duration-700 pointer-events-auto ${
            isFocusReading
              ? 'max-w-3xl mx-auto'
              : 'lg:w-[38%] max-w-xl lg:max-w-none'
          }`}
        >
          <div className="relative rounded-3xl overflow-hidden backdrop-blur-[26px] bg-[#0A1022]/70 border border-[#EBCB91]/40 shadow-[0_24px_64px_rgba(0,0,0,0.85)] p-6 sm:p-8 flex flex-col justify-between min-h-[440px] sm:min-h-[480px]">
            {/* Top Specular Edge Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFF9EA]/50 to-transparent pointer-events-none" />

            {/* Inner Header Action: Maximize / Minimize Button */}
            <div className="flex items-center justify-between pb-2 border-b border-[#EBCB91]/20">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D9B77B] font-semibold">
                {selectedPoemIndex === 'note' ? 'Final Love Declaration' : 'Poetry Keepsake'}
              </span>

              <button
                type="button"
                onClick={handleToggleFocusReading}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-[#D9B77B]/30 text-[10px] font-mono text-[#F8E6A0] transition-colors cursor-pointer"
              >
                {isFocusReading ? (
                  <>
                    <Minimize2 className="w-3 h-3 text-[#D9B77B]" />
                    <span>Standard View</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3 h-3 text-[#D9B77B]" />
                    <span>Read Quietly</span>
                  </>
                )}
              </button>
            </div>

            {/* Reading Content Area */}
            <div className="my-auto py-4">
              {selectedPoemIndex === 'note' ? (
                /* ─────────────────────────────────────────────────────────── */
                /* A FINAL NOTE VIEW                                          */
                /* ─────────────────────────────────────────────────────────── */
                <div className="flex flex-col gap-4 text-center items-center animate-in fade-in duration-500">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D9B77B] font-semibold">
                    {FINAL_NOTE_CONTENT.eyebrow}
                  </span>

                  <div className="flex flex-col gap-3 font-serif text-[#FFF9EA]/90 text-sm sm:text-base leading-relaxed max-w-md">
                    {FINAL_NOTE_CONTENT.messageParagraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Gold Divider Line */}
                  <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#D9B77B]/60 to-transparent my-2" />

                  {/* Grand Finale Declaration */}
                  <div className="flex flex-col items-center gap-1.5">
                    <Heart className="w-6 h-6 text-[#E11D48] fill-current animate-pulse drop-shadow-[0_0_12px_rgba(225,29,72,0.8)]" />
                    <h3 className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EA] via-[#FDE047] to-[#FDA4AF] font-bold tracking-wide">
                      {FINAL_NOTE_CONTENT.closingDeclaration}
                    </h3>
                    <p className="text-xs font-serif italic text-[#F8E6A0]/80">
                      {FINAL_NOTE_CONTENT.finalHeartNote}
                    </p>
                  </div>
                </div>
              ) : currentPoem ? (
                /* ─────────────────────────────────────────────────────────── */
                /* ACTIVE POEM READER VIEW (Matches Reference Image Layout)   */
                /* ─────────────────────────────────────────────────────────── */
                <div className="flex flex-col text-center items-center gap-2 animate-in fade-in duration-500">
                  {/* Roman Numeral Emblem */}
                  <div className="flex items-center justify-center gap-2 text-xs font-serif text-[#D9B77B] tracking-widest font-semibold">
                    <span>•</span>
                    <span>{currentPoem.numeral}.</span>
                    <span>•</span>
                  </div>

                  {/* Poem Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-serif text-[#FFF9EA] font-normal tracking-tight mb-2">
                    {currentPoem.title}
                  </h3>

                  {/* Full Poetry Content (Formatted Stanzas) */}
                  <div className="font-serif text-[#FFF9EA]/90 text-sm sm:text-[15px] lg:text-base leading-[1.9] whitespace-pre-wrap max-w-md mx-auto text-center px-2">
                    {currentPoem.content}
                  </div>

                  {/* Little Gold Heart Flourish at Bottom of Poem */}
                  <div className="flex items-center justify-center gap-2 text-[#D9B77B]/70 mt-3">
                    <Heart className="w-3.5 h-3.5 fill-current text-[#D9B77B]" />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Embedded Side Navigation Arrow Controls & Bottom Page Indicator */}
            <div className="flex items-center justify-between pt-3 border-t border-[#EBCB91]/20 mt-auto">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous poem"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-[#D9B77B]/40 flex items-center justify-center text-[#D9B77B] hover:text-[#FFF9EA] transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Indicator (e.g. 1 / 4 • • • •) */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#F8E6A0]/80">
                <span>
                  {selectedPoemIndex === 'note' ? 'Final Note' : `${selectedPoemIndex + 1} / ${totalPoems}`}
                </span>
                <span className="text-[#D9B77B]/40">•</span>
                <div className="flex items-center gap-1">
                  {FINAL_POEMS.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`inline-block rounded-full transition-all duration-300 ${
                        selectedPoemIndex === dotIdx
                          ? 'w-2 h-2 bg-[#D9B77B]'
                          : 'w-1.5 h-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                  <span
                    className={`inline-block rounded-full transition-all duration-300 ${
                      selectedPoemIndex === 'note'
                        ? 'w-2 h-2 bg-[#E11D48]'
                        : 'w-1.5 h-1.5 bg-white/20'
                    }`}
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next poem"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-[#D9B77B]/40 flex items-center justify-center text-[#D9B77B] hover:text-[#FFF9EA] transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ===================================================================== */}
      {/* FOOTER 3 PILL ACTIONS (Matches Reference Image Bottom Deck)           */}
      {/* ===================================================================== */}
      <footer
        className={`relative z-20 flex flex-col items-center justify-center gap-2.5 pt-3 pb-2 pointer-events-auto transition-opacity duration-700 ${
          phase !== 'MAIN' && phase !== 'FOCUS_READING' && phase !== 'AMBIENT'
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          {/* Action 1: Replay Story */}
          <button
            type="button"
            onClick={handleReplayStory}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-[#D9B77B]/40 text-xs font-mono text-[#F8E6A0] hover:text-[#FFF9EA] transition-all cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D9B77B]" />
            <span>REPLAY OUR STORY</span>
          </button>

          {/* Action 2: Replay Declaration */}
          <button
            type="button"
            onClick={handleReplayDeclaration}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-[#D9B77B]/40 text-xs font-mono text-[#F8E6A0] hover:text-[#FFF9EA] transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D9B77B]" />
            <span>REPLAY DECLARATION ↺</span>
          </button>

          {/* Action 3: Read All Poems (Focus Reading Mode Hero Pill) */}
          <button
            type="button"
            onClick={handleToggleFocusReading}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#D9B77B] via-[#E9B85B] to-[#F8E6A0] text-[#140A00] text-xs font-mono font-bold uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all cursor-pointer shadow-[0_0_24px_rgba(217,183,123,0.55)] border border-[#FFF9EA]/50"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#140A00]" />
            <span>{isFocusReading ? 'CLOSE READING MODE' : 'READ ALL MY POEMS'}</span>
          </button>

          {/* Action 4: Stay A Little Longer (Ambient Mode Pill) */}
          <button
            type="button"
            onClick={handleToggleAmbient}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-mono transition-all cursor-pointer shadow-md ${
              isAmbient
                ? 'bg-[#D9B77B]/30 border-[#D9B77B] text-[#FFF9EA]'
                : 'bg-black/50 hover:bg-black/70 border-[#D9B77B]/40 text-[#F8E6A0] hover:text-[#FFF9EA]'
            }`}
          >
            <Infinity className="w-3.5 h-3.5 text-[#D9B77B]" />
            <span>{isAmbient ? 'RESUME CONTROLS' : 'STAY A LITTLE LONGER'}</span>
          </button>
        </div>

        {/* Closing Romantic Vow */}
        <span className="text-[10px] sm:text-[11px] font-serif italic text-[#FFF9EA]/65 tracking-wider">
          NOT AN ENDING... JUST ANOTHER BEAUTIFUL BEGINNING. ♡
        </span>
      </footer>
    </div>
  );
};
