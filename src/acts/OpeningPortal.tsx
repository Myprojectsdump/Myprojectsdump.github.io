// src/acts/OpeningPortal.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Headphones,
  Volume2,
  VolumeX,
  ArrowRight,
  Bookmark,
  RotateCcw,
  FastForward,
  ChevronDown,
} from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { STORY_DATA } from '../config/storyContent';
import { audioEngine } from '../engine/audio/AudioEngine';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';
import {
  setOpeningStage,
  setOpeningAssemblyProgress,
  transientMotionState,
} from '../store/transientMotionState';

export const OpeningPortal: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [soundPref, setSoundPref] = useState<boolean>(true); // true = sound on

  const enterUniverse = useExperienceStore((state) => state.enterUniverse);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);
  const visitedChapters = useExperienceStore((state) => state.visitedChapters);

  const actChaptersVisited = visitedChapters.filter((c) => c !== 'PRELUDE' && c !== 'OPENING');
  const hasVisitedBefore = actChaptersVisited.length > 0;
  const lastVisitedChapter = actChaptersVisited[actChaptersVisited.length - 1] || 'ACT_1';

  // Ref to hold all active timers for clean cancellation
  const timersRef = useRef<number[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  // Launch the 8-Stage Sequential Reveal Timeline
  const runSequence = () => {
    clearAllTimers();
    setStage(1);
    setOpeningStage(1);
    setOpeningAssemblyProgress(0, 0, 0, [0, 0, 0, 0, 0, 0, 0]);

    // Check for reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      skipToFinalStage();
      return;
    }

    // Stage 1 (0ms to 2400ms): Cosmic Environment only
    // Stage 2 (2400ms): Two Distant Stars emerge
    addTimer(() => {
      setStage(2);
      setOpeningStage(2);
      if (soundPref) {
        proceduralAudio.playStarBridgeChime();
      }
    }, 2400);

    // Stage 3 (4500ms): Golden Filament connects the two stars
    addTimer(() => {
      setStage(3);
      setOpeningStage(3);
    }, 4500);

    // Stage 4 (6800ms): Three Prelude lines reveal sequentially
    addTimer(() => {
      setStage(4);
      setOpeningStage(4);
    }, 6800);

    // Stage 5 (12200ms): 3D Orbital Heart Structure Formation
    addTimer(() => {
      setStage(5);
      setOpeningStage(5);

      // 5A: Stardust convergence
      let conv = 0;
      const convInterval = window.setInterval(() => {
        conv += 0.05;
        transientMotionState.openingParticlesConvergence = Math.min(1, conv);
        if (conv >= 1) clearInterval(convInterval);
      }, 50);

      // 5B (13400ms): Heart emerges and blooms
      addTimer(() => {
        let heartProgress = 0;
        const heartInterval = window.setInterval(() => {
          heartProgress += 0.04;
          const s = THREE_smoothstep(heartProgress, 0, 1);
          transientMotionState.openingHeartScale = s;
          transientMotionState.openingHeartGlow = s;
          if (heartProgress >= 1) clearInterval(heartInterval);
        }, 40);

        if (soundPref) {
          proceduralAudio.playCosmicBloomChord();
        }
      }, 1200);

      // 5C (14600ms): Seven Astrolabe Orbital Rings arrive sequentially
      RING_DELAYS.forEach((delay, idx) => {
        addTimer(() => {
          let ringProg = 0;
          const rInterval = window.setInterval(() => {
            ringProg += 0.05;
            transientMotionState.openingRingProgress[idx] = Math.min(1, ringProg);
            if (ringProg >= 1) clearInterval(rInterval);
          }, 35);
        }, 1800 + delay);
      });
    }, 12200);

    // Stage 6 (18800ms): Hero Eyebrow and Main Title
    addTimer(() => {
      setStage(6);
      setOpeningStage(6);
    }, 18800);

    // Stage 7 (21000ms): Subtitle and Romantic Whisper
    addTimer(() => {
      setStage(7);
      setOpeningStage(7);
    }, 21000);

    // Stage 8 (23400ms): Final Illumination of ENTER MY UNIVERSE
    addTimer(() => {
      setStage(8);
      setOpeningStage(8);
      transientMotionState.openingHeartScale = 1;
      transientMotionState.openingHeartGlow = 1;
      transientMotionState.openingParticlesConvergence = 1;
      transientMotionState.openingRingProgress = [1, 1, 1, 1, 1, 1, 1];
    }, 23400);
  };

  const skipToFinalStage = () => {
    clearAllTimers();
    setStage(8);
    setOpeningStage(8);
    setOpeningAssemblyProgress(1, 1, 1, [1, 1, 1, 1, 1, 1, 1]);
  };

  const advanceNextStep = () => {
    if (stage < 8) {
      const next = stage + 1;
      setStage(next);
      setOpeningStage(next);
      if (next >= 5) {
        transientMotionState.openingParticlesConvergence = 1;
        transientMotionState.openingHeartScale = 1;
        transientMotionState.openingHeartGlow = 1;
        transientMotionState.openingRingProgress = [1, 1, 1, 1, 1, 1, 1];
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const probes = ((window as any).__UCI_TEST_PROBES__ = (window as any).__UCI_TEST_PROBES__ || {});
      probes.setOpeningStage = (s: number) => {
        clearAllTimers();
        setStage(s);
        setOpeningStage(s);
        if (s <= 4) {
          setOpeningAssemblyProgress(0, 0, 0, [0, 0, 0, 0, 0, 0, 0]);
        } else if (s === 5) {
          setOpeningAssemblyProgress(1, 0.8, 0.8, [1, 0.6, 0.3, 0, 0, 0, 0]);
        } else if (s >= 6) {
          setOpeningAssemblyProgress(1, 1, 1, [1, 1, 1, 1, 1, 1, 1]);
        }
      };
    }
    runSequence();
    return () => clearAllTimers();
  }, []);

  const handleEnterUniverse = (target: string = 'ACT_1') => {
    enterUniverse(!soundPref);
    if (soundPref) {
      audioEngine.unlockAudioContext();
      proceduralAudio.playCosmicBloomChord();
    }
    if (target === 'ACT_1') {
      setCurrentChapter('ACT_1');
    } else {
      setCurrentChapter(target as any);
    }
  };

  const toggleSound = () => {
    const next = !soundPref;
    setSoundPref(next);
    if (next) {
      audioEngine.unlockAudioContext();
      proceduralAudio.playStarBridgeChime();
    }
  };

  return (
    <div
      className="relative w-full min-h-screen bg-transparent text-parchment-warm select-none overflow-hidden"
      aria-label="Opening: Enter My Universe"
    >
      {/* ─── LAYER 2: AMBIENT CELESTIAL ELEMENTS (STARS & FILAMENT) ─── */}
      {stage >= 2 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Star 1 (Left: At the Golden Heart Loop above the Cliff) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{
              scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute left-[21.1%] top-[41.5%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-champagne-gold shadow-glow" />
            <div className="absolute inset-0 w-7 h-7 -left-1.5 -top-1.5 rounded-full bg-champagne-gold/30 blur-sm" />
            {/* 4-Point Diamond Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-[1.5px] bg-champagne-gold/90" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-10 bg-champagne-gold/90" />
          </motion.div>

          {/* Star 2 (Center-High: Near the Celestial Light Column) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }}
            transition={{
              scale: { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
              opacity: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
            }}
            className="absolute left-[46.8%] top-[29.5%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-3 h-3 rounded-full bg-blush-rose shadow-glow-rose" />
            <div className="absolute inset-0 w-6 h-6 -left-1.5 -top-1.5 rounded-full bg-blush-rose/30 blur-sm" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-blush-rose/80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-8 bg-blush-rose/80" />
          </motion.div>
        </div>
      )}

      {/* Golden Connecting Filament with Heart Loop (Stage 3+) */}
      {stage >= 3 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="goldFilamentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FDA4AF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.85" />
            </linearGradient>
            <filter id="goldenBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Golden Thread (Arcs gracefully over the cliff toward the central beam) */}
          <motion.path
            d="M 60 520 C 180 515, 290 480, 375 455 C 390 440, 415 435, 422 455 C 428 475, 400 488, 385 478 C 370 468, 392 445, 412 456 C 490 498, 620 545, 780 585"
            fill="none"
            stroke="url(#goldFilamentGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="url(#goldenBloom)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
          />

          {/* Glowing Golden Heart on the Filament */}
          <motion.g
            transform="translate(392, 436) scale(0.9)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.85, 1, 0.85] }}
            transition={{
              scale: { duration: 2.0, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <path
              d="M 12 21.35 l -1.45 -1.32 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 c 1.74 0 3.41 0.81 4.5 2.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 c 0 3.78 -3.4 6.86 -8.55 11.54 L 12 21.35 z"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="2.2"
              filter="url(#goldenBloom)"
            />
          </motion.g>
        </svg>
      )}

      {/* ─── LAYER 3: TOP GLOBAL BRANDING & AUDIO STATUS ─── */}
      <header className="relative z-30 w-full flex items-center justify-between px-8 py-6 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <span className="text-sm">🪐</span>
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-gold/90 font-medium">
            THE GRAVITY OF UCI
          </span>
        </div>

        {/* Top Controls: Sound, Fullscreen & Skip Intro */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel border border-champagne-gold/30 text-[11px] font-mono text-champagne-gold hover:bg-champagne-gold/15 transition-colors"
            title="Toggle Sound"
          >
            <Headphones className="w-3.5 h-3.5 text-champagne-gold" />
            {soundPref ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-parchment-warm/50" />}
            <span className="hidden sm:inline text-[10px]">
              {soundPref ? 'Audio On' : 'Muted'}
            </span>
          </button>

          {stage < 8 && (
            <button
              onClick={skipToFinalStage}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-champagne-gold/10 hover:bg-champagne-gold/20 border border-champagne-gold/40 text-[10px] font-mono tracking-widest uppercase text-champagne-gold transition-all duration-300"
            >
              <span>Skip Intro</span>
              <FastForward className="w-3 h-3" />
            </button>
          )}

          {stage === 8 && (
            <button
              onClick={runSequence}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-champagne-gold/25 text-[10px] font-mono text-parchment-warm/75 hover:text-champagne-gold hover:border-champagne-gold transition-colors"
              title="Replay Introduction Animation"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">Replay Intro</span>
            </button>
          )}
        </div>
      </header>

      {/* ─── LAYER 4: MAIN ASYMMETRIC CINEMATIC CONTENT GRID ─── */}
      <main className="relative z-20 w-full min-h-[calc(100vh-140px)] flex flex-col justify-between px-6 md:px-12 py-4 pointer-events-none">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-start">
          {/* LEFT COLUMN: PRELUDE NARRATIVE LINES (Stages 4+) */}
          <div className="lg:col-span-4 lg:col-start-1 flex flex-col items-start justify-start pt-12 lg:pt-24 pl-4 lg:pl-10 pointer-events-auto">
            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="space-y-3.5 max-w-sm lg:max-w-md"
              >
                <p className="font-serif italic text-lg sm:text-xl lg:text-2xl font-light text-parchment-warm/95 leading-relaxed drop-shadow-md">
                  Somewhere in this enormous universe,
                </p>
                <p className="font-serif italic text-lg sm:text-xl lg:text-2xl font-light text-parchment-warm/95 leading-relaxed drop-shadow-md">
                  across time zones, miles and days apart...
                </p>
                <p className="font-serif italic text-lg sm:text-xl lg:text-2xl font-light text-champagne-gold leading-relaxed drop-shadow-md">
                  there's still one thing that remains constant —
                </p>
              </motion.div>
            )}

            {/* Fast step continue affordance if active in stages 4-7 */}
            {stage >= 4 && stage < 8 && (
              <button
                onClick={advanceNextStep}
                className="mt-6 flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-champagne-gold/60 hover:text-champagne-gold uppercase transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* CENTER SPACE: Reserved for the 3D Crystalline Heart and Astrolabe Rings in Three.js */}
          <div className="lg:col-span-4 hidden lg:block" aria-hidden="true" />

          {/* RIGHT COLUMN: HERO EDITORIAL TYPOGRAPHY & INTERACTION CONTROLS (Stages 6+) */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col items-start text-left space-y-4 lg:space-y-5 pt-8 lg:pt-14 pr-4 lg:pr-8 pointer-events-auto">
            {/* Stage 6: Eyebrow & Editorial Title */}
            {stage >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="space-y-1.5"
              >
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.38em] uppercase text-champagne-gold/90 font-medium block">
                  {STORY_DATA.heroOpening.eyebrow}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-serif font-light text-parchment-warm tracking-tight italic leading-[1.08] lg:whitespace-nowrap drop-shadow-lg">
                  {STORY_DATA.heroOpening.title}
                </h1>
              </motion.div>
            )}

            {/* Stage 7: Subtitle, Divider, and Romantic Whispers */}
            {stage >= 7 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
                className="space-y-3 max-w-sm lg:max-w-md"
              >
                <p className="text-[10px] md:text-[11px] font-mono tracking-[0.24em] uppercase text-parchment-warm/75 leading-relaxed">
                  A CINEMATIC JOURNEY THROUGH THE LITTLE THINGS, THE BIG FEELINGS, AND EVERYTHING IN BETWEEN.
                </p>

                {/* Delicate Celestial Filigree Divider */}
                <div className="flex items-center gap-3 py-1 text-champagne-gold/50">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-champagne-gold/40" />
                  <span className="text-xs">✦</span>
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-champagne-gold/40" />
                </div>

                <p className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-champagne-gold tracking-wide drop-shadow-md">
                  “A universe, just for you.”
                </p>

                <p className="text-xs sm:text-[13px] text-parchment-warm/65 font-sans italic leading-relaxed pt-0.5">
                  {STORY_DATA.heroOpening.whisper}
                </p>
              </motion.div>
            )}

            {/* Stage 8: ENTER Button, Resume Option & Sound Toggle */}
            {stage >= 8 && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="pt-2 w-full max-w-sm lg:max-w-md space-y-4"
              >
                {/* Primary Illuminated CTA */}
                <button
                  onClick={() => handleEnterUniverse('ACT_1')}
                  className="w-full sm:w-auto min-w-[300px] flex items-center justify-center gap-3.5 px-9 py-4 rounded-full border border-champagne-gold/85 bg-gradient-to-r from-champagne-gold/25 via-champagne-gold/15 to-champagne-gold/25 hover:from-champagne-gold/35 hover:to-champagne-gold/35 shadow-[0_0_30px_rgba(253,230,138,0.3)] hover:shadow-[0_0_45px_rgba(253,230,138,0.5)] text-champagne-gold hover:text-white font-mono font-medium text-xs lg:text-sm tracking-[0.28em] uppercase transition-all duration-300 group cursor-pointer backdrop-blur-md"
                >
                  <span>ENTER MY UNIVERSE</span>
                  <ArrowRight className="w-4 h-4 text-champagne-gold group-hover:translate-x-1.5 transition-transform" />
                </button>

                {/* Secondary Resume Action if previously visited */}
                {hasVisitedBefore && (
                  <button
                    onClick={() => handleEnterUniverse(lastVisitedChapter)}
                    className="flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-champagne-gold/30 text-xs font-mono text-parchment-warm/80 hover:text-champagne-gold hover:border-champagne-gold transition-all duration-200"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>Resume at {lastVisitedChapter.replace('_', ' ')}</span>
                  </button>
                )}

                {/* Sound Toggle Status Pill */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={toggleSound}
                    className="flex items-center gap-2.5 text-[11px] font-mono text-parchment-warm/70 hover:text-champagne-gold transition-colors"
                  >
                    <Headphones className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>Sound On (Recommended with Headphones 🎧)</span>
                    <span
                      className={`inline-block w-8 h-4 rounded-full p-0.5 transition-colors ${
                        soundPref ? 'bg-champagne-gold' : 'bg-parchment-warm/20'
                      }`}
                    >
                      <span
                        className={`block w-3 h-3 rounded-full bg-obsidian-void transition-transform ${
                          soundPref ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ─── LAYER 5: BOTTOM SCROLL EXPLORE AFFORDANCE ─── */}
        <div className="relative z-20 flex flex-col items-center justify-center pb-2 pointer-events-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-parchment-warm/50 mb-1">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-champagne-gold/60" />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// Ring arrival stagger helper
const RING_DELAYS = [0, 300, 600, 900, 1200, 1500, 1800];

// Smoothstep helper
function THREE_smoothstep(x: number, min: number, max: number): number {
  if (x <= min) return 0;
  if (x >= max) return 1;
  x = (x - min) / (max - min);
  return x * x * (3 - 2 * x);
}
