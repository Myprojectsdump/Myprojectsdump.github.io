// src/acts/FinalGiftReveal.tsx

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Package, Heart, Eye, Gift } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import {
  setGiftRevealPhase,
  addGiftBoxUserRotation,
  setGiftBoxUserRotation,
} from '../store/transientMotionState';
import { GiftRevealPhase } from '../types/scene.types';
import { CONFIGURED_ACTUAL_GIFT } from '../config/storyContent';
import { SmartImage } from '../components/media/SmartImage';
import { HeirloomMediaPlaceholder } from '../components/media/HeirloomMediaPlaceholder';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';

const CONSTRUCTION_MESSAGES = [
  'Something special is taking shape...',
  'A little piece of everything, just for you.',
  'Because ordinary was never going to be enough.',
  "Now comes the part I've been waiting for...",
  'Your surprise is ready, princess. ♥',
] as const;

const DISCOVERY_WHISPERS: Record<'crest' | 'ribbon' | 'ornaments', string> = {
  crest: 'The ruby heart crest pulses with warm light ♥',
  ribbon: 'Crimson satin tied just for your hands...',
  ornaments: 'Every golden engraving carries a little wish for you.',
};

export const FinalGiftReveal: React.FC = () => {
  const isBoxOpened = useExperienceStore((state) => state.isGiftBoxOpened);
  const isGiftAssembled = useExperienceStore((state) => state.isGiftAssembled);
  const giftAssemblyNonce = useExperienceStore((state) => state.giftAssemblyNonce);
  const setGiftAssembled = useExperienceStore((state) => state.setGiftAssembled);
  const untieRibbon = useExperienceStore((state) => state.untieGiftRibbon);
  const openBox = useExperienceStore((state) => state.openGiftBox);
  const replayGiftBox = useExperienceStore((state) => state.replayGiftBox);
  const replayGiftAssembly = useExperienceStore((state) => state.replayGiftAssembly);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);
  const reducedMotion = useExperienceStore((state) => state.reducedMotionChoice);
  const isMuted = useExperienceStore((state) => state.isMuted);

  const isReducedMotion =
    reducedMotion === 'reduce' ||
    (reducedMotion === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Determine initial phase coherently (supports re-entry & persisted open state)
  const [phase, setPhase] = useState<GiftRevealPhase>(() => {
    if (isBoxOpened) return 'GIFT_REVEALED';
    if (isGiftAssembled) return 'READY_TO_OPEN';
    return 'ASSEMBLING';
  });

  const [constructionIndex, setConstructionIndex] = useState<number>(0);
  const [discoveryFeedback, setDiscoveryFeedback] = useState<string | null>(null);
  const [showGiftOverlayInQuietMode, setShowGiftOverlayInQuietMode] = useState<boolean>(false);

  // Guards against duplicate calls & timers
  const isOpeningInProgressRef = useRef<boolean>(false);
  const isNavigatingRef = useRef<boolean>(false);
  const timersRef = useRef<number[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const scheduleTimer = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    timersRef.current.push(id);
    return id;
  }, []);

  // Keep transient motion bus & test probes synchronized with current phase
  const updatePhase = useCallback((nextPhase: GiftRevealPhase) => {
    setPhase(nextPhase);
    setGiftRevealPhase(nextPhase);
  }, []);

  useEffect(() => {
    setGiftRevealPhase(phase);
    return () => {
      clearAllTimers();
    };
  }, []);

  // Listen for 3D box optional discovery interactions (crest, ribbon, ornaments)
  useEffect(() => {
    const handleDiscoveryEvent = (e: Event) => {
      const custom = e as CustomEvent<'crest' | 'ribbon' | 'ornaments'>;
      const msg = DISCOVERY_WHISPERS[custom.detail];
      if (msg) {
        setDiscoveryFeedback(msg);
      }
    };
    window.addEventListener('uci:gift-discovery', handleDiscoveryEvent);
    return () => window.removeEventListener('uci:gift-discovery', handleDiscoveryEvent);
  }, []);

  // Sync external store changes (e.g. if test or external caller sets isGiftAssembled / isBoxOpened)
  useEffect(() => {
    if (isBoxOpened && (phase === 'ASSEMBLING' || phase === 'ASSEMBLY_COMPLETE' || phase === 'READY_TO_OPEN')) {
      clearAllTimers();
      updatePhase('GIFT_REVEALED');
    } else if (isGiftAssembled && phase === 'ASSEMBLING') {
      setConstructionIndex(CONSTRUCTION_MESSAGES.length - 1);
      updatePhase('ASSEMBLY_COMPLETE');
      const admireMs = isReducedMotion ? 150 : 650;
      scheduleTimer(() => {
        updatePhase('READY_TO_OPEN');
      }, admireMs);
    }
  }, [isGiftAssembled, isBoxOpened, phase, isReducedMotion, clearAllTimers, scheduleTimer, updatePhase]);

  // Sequential construction messages during ASSEMBLING
  useEffect(() => {
    if (phase !== 'ASSEMBLING') return;

    setConstructionIndex(0);
    // 24s total across 5 messages (~4.6s per message, or 800ms in reduced motion)
    const stepMs = isReducedMotion ? 850 : 4600;
    const interval = window.setInterval(() => {
      setConstructionIndex((prev) => {
        if (prev < CONSTRUCTION_MESSAGES.length - 1) return prev + 1;
        return prev;
      });
    }, stepMs);

    return () => window.clearInterval(interval);
  }, [phase, giftAssemblyNonce, isReducedMotion]);

  // Dedicated 360° Drag Gesture State for Royal Gift Box
  const isDraggingBoxRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDragStart = (e: React.PointerEvent) => {
    isDraggingBoxRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerDragMove = (e: React.PointerEvent) => {
    if (!isDraggingBoxRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    addGiftBoxUserRotation(deltaX, deltaY);
  };

  const handlePointerDragEnd = (e: React.PointerEvent) => {
    isDraggingBoxRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  // Only animate the unfold transition once POSTSCRIPT_REVEAL is explicitly triggered.
  // The experience intentionally stops on GIFT_REVEALED so the user & girlfriend can stay on call indefinitely.
  useEffect(() => {
    if (phase === 'POSTSCRIPT_REVEAL') {
      // Secret compartment opens & folded note emerges and unfolds (~1.8s)
      const unfoldDelay = isReducedMotion ? 400 : 1800;
      const id = scheduleTimer(() => {
        if (!isMuted) {
          proceduralAudio.playMirrorNoteChime();
        }
        updatePhase('POSTSCRIPT_READY');
      }, unfoldDelay);
      return () => window.clearTimeout(id);
    }
  }, [phase, isReducedMotion, isMuted, scheduleTimer, updatePhase]);

  // Trigger optional discovery from accessible UI pills as well as 3D meshes
  const triggerDiscoveryFromUI = (type: 'crest' | 'ribbon' | 'ornaments') => {
    setDiscoveryFeedback(DISCOVERY_WHISPERS[type]);
    if (!isMuted) {
      proceduralAudio.playConstellationStarTone(type === 'crest' ? 5 : type === 'ribbon' ? 3 : 7);
    }
    if (window.__UCI_TEST_PROBES__) {
      if (type === 'crest') {
        window.__UCI_TEST_PROBES__.giftCrestPulseCount =
          (window.__UCI_TEST_PROBES__.giftCrestPulseCount ?? 0) + 1;
      } else if (type === 'ribbon') {
        window.__UCI_TEST_PROBES__.giftRibbonTouchCount =
          (window.__UCI_TEST_PROBES__.giftRibbonTouchCount ?? 0) + 1;
      } else {
        window.__UCI_TEST_PROBES__.giftOrnamentHighlightCount =
          (window.__UCI_TEST_PROBES__.giftOrnamentHighlightCount ?? 0) + 1;
      }
    }
  };

  // Skip assembly directly to READY_TO_OPEN
  const handleSkipAssembly = () => {
    clearAllTimers();
    setGiftAssembled(true);
    setConstructionIndex(CONSTRUCTION_MESSAGES.length - 1);
    updatePhase('READY_TO_OPEN');
  };

  // Main Opening Action: "I CAN'T WAIT — OPEN IT!"
  const handleOpenGift = () => {
    if (phase === 'ASSEMBLING' || isOpeningInProgressRef.current) return;
    isOpeningInProgressRef.current = true;
    clearAllTimers();

    // Play gift box open audio once
    if (!isMuted) {
      proceduralAudio.playGiftBoxOpen();
    }

    // Step 1: Untie crimson satin ribbon
    untieRibbon();
    updatePhase('UNTYING');

    const untieDuration = isReducedMotion ? 150 : 650;
    const openDuration = isReducedMotion ? 300 : 1200;

    scheduleTimer(() => {
      // Step 2: Release clasp & rotate hinged lid open
      openBox();
      updatePhase('OPENING');
    }, untieDuration);

    scheduleTimer(() => {
      // Step 3: Present actual gift showcase
      isOpeningInProgressRef.current = false;
      updatePhase('GIFT_REVEALED');
    }, untieDuration + openDuration);
  };

  // Replay Action 1: Replay Assembly (resets all 3D parts to initial state and rebuilds)
  const handleReplayAssembly = () => {
    clearAllTimers();
    isOpeningInProgressRef.current = false;
    isNavigatingRef.current = false;
    setShowGiftOverlayInQuietMode(false);
    setDiscoveryFeedback(null);
    setConstructionIndex(0);
    updatePhase('ASSEMBLING');
    replayGiftAssembly();
  };

  // Replay Action 2: Replay Gift Reveal (restores completed closed box & ribbon without re-running assembly)
  const handleReplayGiftReveal = () => {
    clearAllTimers();
    isOpeningInProgressRef.current = false;
    isNavigatingRef.current = false;
    setShowGiftOverlayInQuietMode(false);
    setDiscoveryFeedback(null);
    replayGiftBox();
    setGiftAssembled(true);
    updatePhase('READY_TO_OPEN');
  };

  // Fast-forward to Quiet Moment or Postscript Note
  const handleEnterQuietMoment = () => {
    clearAllTimers();
    setShowGiftOverlayInQuietMode(false);
    updatePhase('QUIET_MOMENT');
  };

  const handleOpenVelvetCard = () => {
    clearAllTimers();
    setShowGiftOverlayInQuietMode(false);
    if (!isMuted) {
      proceduralAudio.playMirrorNoteChime();
    }
    if (window.__UCI_TEST_PROBES__) {
      window.__UCI_TEST_PROBES__.velvetCardClicked = true;
    }
    updatePhase('POSTSCRIPT_REVEAL');
  };

  const handleRevealPostscriptNow = () => {
    handleOpenVelvetCard();
  };

  // Final Action: "THERE'S A LITTLE MORE... →"
  const handleProceedToNextSurprise = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    clearAllTimers();

    if (!isMuted) {
      proceduralAudio.playStarBridgeChime();
    }

    // Turn note over to reveal golden heart emblem & emit particles before transitioning
    updatePhase('COMPLETE');

    const navDelay = isReducedMotion ? 250 : 1100;
    scheduleTimer(() => {
      setCurrentChapter('AFTER_CREDITS');
    }, navDelay);
  };

  return (
    <section
      aria-label="Your Royal Birthday Gift"
      className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-10 select-none overflow-x-hidden pointer-events-none"
    >
      {/* Subtle ambient vignette that softens further during the Quiet Moment */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
          phase === 'QUIET_MOMENT' || phase === 'POSTSCRIPT_REVEAL' || phase === 'POSTSCRIPT_READY'
            ? 'opacity-80'
            : 'opacity-40'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 75% 70% at 32% 52%, rgba(253, 230, 138, 0.08) 0%, rgba(16, 4, 10, 0.55) 70%, rgba(8, 2, 6, 0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ===================================================================== */}
      {/* TOP AREA: Understated Whisper or Quiet Moment Message                 */}
      {/* Never displays project name or formal "THE END" heading               */}
      {/* ===================================================================== */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto pt-4 sm:pt-6 min-h-[84px] pointer-events-auto">
        <AnimatePresence mode="wait">
          {(phase === 'ASSEMBLING' || phase === 'ASSEMBLY_COMPLETE' || phase === 'READY_TO_OPEN') && (
            <motion.div
              key="header-anticipation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-[11px] font-serif italic tracking-[0.22em] text-[#F8E6A0]/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                ⋆ A little something I had made just for you ⋆
              </span>
            </motion.div>
          )}

          {(phase === 'QUIET_MOMENT' || phase === 'POSTSCRIPT_REVEAL') && (
            <motion.div
              key="header-quiet-moment"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3 pt-4 sm:pt-8 px-4"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-serif font-light text-[#FFF9EA] tracking-wide leading-relaxed drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
                Thank you for making ordinary days feel a little more beautiful.
              </p>
              <p className="text-base sm:text-xl font-serif italic text-[#F8E6A0] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                And for being someone I&apos;d choose, in every little moment. ♥
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===================================================================== */}
      {/* MAIN 2-COLUMN STAGE (Left = 3D Royal Box on Pedestal, Right = Story)  */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 px-2 sm:px-4 py-2 min-h-[480px]">
        {/* ───────────────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: 3D Royal Gift Box & Pedestal Zone                    */}
        {/* Transparent drag rotation overlay, velvet card, and angle presets */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="relative w-full lg:w-[48%] flex flex-col items-center lg:items-start justify-end h-full pt-12 sm:pt-16 lg:pt-20 pb-2 text-center lg:text-left pointer-events-none">
          {/* Transparent Dedicated 360° Drag Gesture Overlay over the 3D Box */}
          <div
            className="w-full h-[260px] sm:h-[320px] lg:h-[380px] pointer-events-auto cursor-grab active:cursor-grabbing touch-none select-none flex items-center justify-center relative rounded-3xl"
            onPointerDown={handlePointerDragStart}
            onPointerMove={handlePointerDragMove}
            onPointerUp={handlePointerDragEnd}
            onPointerCancel={handlePointerDragEnd}
            role="region"
            aria-label="360 degree interactive view of the royal gift box. Drag horizontally or vertically to rotate."
          >
            {/* Subtle floating hint when hovering the 3D viewport */}
            <div className="absolute top-2 inset-x-0 flex justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-[#D9B77B]/40 text-[10px] font-mono text-[#FDE68A] backdrop-blur-sm shadow-lg">
                Drag to rotate the 3D box in 360° ↺
              </span>
            </div>
          </div>

          {/* =============================================================== */}
          {/* THE TACTILE BURGUNDY VELVET CARD LYING ON THE TABLE             */}
          {/* The user calls his girlfriend and tells her to find and click it */}
          {/* =============================================================== */}
          <AnimatePresence>
            {(phase === 'GIFT_REVEALED' || phase === 'QUIET_MOMENT') && (
              <motion.div
                key="velvet-keepsake-card"
                initial={{ opacity: 0, y: 22, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, y: 16 }}
                transition={{ duration: 0.75, delay: 0.3, ease: 'easeOut' }}
                className="pointer-events-auto self-center lg:self-start my-3 z-30"
              >
                <button
                  type="button"
                  onClick={handleOpenVelvetCard}
                  aria-label="A little velvet card resting on the table. Click to open secret message."
                  className="group relative text-left transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FDE68A]/80 rounded-2xl block"
                  style={{ perspective: '900px' }}
                >
                  {/* Card Body with 3D Resting Tilt */}
                  <div
                    className="relative flex items-center gap-3.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl border border-[#D9AE50]/80 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-98"
                    style={{
                      background:
                        'linear-gradient(135deg, #4A0E22 0%, #300614 45%, #1F030C 100%)',
                      boxShadow:
                        '0 18px 36px -8px rgba(0, 0, 0, 0.9), 0 0 24px rgba(217, 174, 80, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                      transform: 'rotateX(10deg) rotateZ(-2.5deg)',
                      transformOrigin: 'center bottom',
                    }}
                  >
                    {/* Delicate Inner Gold Foil Border */}
                    <div
                      className="absolute inset-1 rounded-lg border border-[#FDE68A]/40 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 0 1px rgba(184, 134, 11, 0.25)',
                      }}
                    />

                    {/* Gilded Heart Wax Seal Charm */}
                    <div className="relative w-9 h-9 shrink-0 rounded-full flex items-center justify-center shadow-lg border border-[#FFF4C2]/80 bg-gradient-to-br from-[#FFF9E0] via-[#F5D061] to-[#92400E] group-hover:shadow-[0_0_18px_rgba(253,230,138,0.7)] transition-shadow">
                      <span className="text-[#6B0F24] font-serif text-xs drop-shadow-sm">♥</span>
                      <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDE68A] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FDE68A]" />
                      </span>
                    </div>

                    {/* Card Content & Embossed Gold Foil Lettering */}
                    <div className="flex flex-col pr-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#D9AE50] font-semibold">
                        P.S. Kept For You
                      </span>
                      <span className="text-sm font-serif italic text-[#FFF9EA] group-hover:text-[#FDE68A] transition-colors drop-shadow-md">
                        A quiet little note is resting here...
                      </span>
                      <span className="text-[10px] font-mono text-[#F8E6A0]/75 tracking-wide mt-0.5">
                        Click the velvet card ✦
                      </span>
                    </div>

                    {/* Periodic traveling starlight glint */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <motion.div
                        className="w-16 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
                        animate={{ x: [-80, 260] }}
                        transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut', repeatDelay: 2.2 }}
                      />
                    </div>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tiny Golden Glimmer near the open gift box's lower compartment */}
          <AnimatePresence>
            {(phase === 'QUIET_MOMENT' || phase === 'POSTSCRIPT_REVEAL') && (
              <motion.div
                key="secret-glimmer-clue"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.7 }}
                className="pointer-events-auto self-center lg:self-start mb-3"
              >
                <button
                  type="button"
                  onClick={handleRevealPostscriptNow}
                  aria-label="Inspect the golden glimmer beneath the gift box"
                  className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#180810]/80 hover:bg-[#2A0D1B]/90 border border-[#FDE68A]/50 hover:border-[#FDE68A] shadow-[0_0_28px_rgba(253,230,138,0.45)] transition-all duration-300 cursor-pointer"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDE68A] opacity-85" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FDE68A]" />
                  </span>
                  <span className="text-xs font-serif italic text-[#FFF9EA] group-hover:text-[#FDE68A] transition-colors">
                    {phase === 'POSTSCRIPT_REVEAL'
                      ? 'A hidden compartment is opening beneath the box...'
                      : 'Wait... something is glimmering beneath the box ✦'}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 360° Inspection & Optional Touchpoint Bar (Hidden during Quiet Moment for serenity) */}
          <AnimatePresence>
            {phase !== 'QUIET_MOMENT' && phase !== 'COMPLETE' && (
              <motion.div
                key="inspection-controls"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto flex flex-col items-center lg:items-start gap-2 bg-[#12060B]/75 backdrop-blur-md p-3.5 rounded-2xl border border-[#D9B77B]/35 shadow-xl max-w-sm w-full"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F8E6A0]">
                  <Eye className="w-3.5 h-3.5 text-[#D9B77B]" />
                  <span>Drag to inspect the royal gift box in 360°</span>
                </div>

                {/* Optional interactive detail triggers */}
                {(phase === 'READY_TO_OPEN' || phase === 'ASSEMBLY_COMPLETE') && (
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => triggerDiscoveryFromUI('crest')}
                      className="px-2.5 py-1 rounded-full bg-[#380715]/80 hover:bg-[#5A0E23] border border-[#D9B77B]/40 text-[10px] font-serif text-[#FFF9EA] transition-colors cursor-pointer"
                    >
                      ♦ Ruby Heart Crest
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerDiscoveryFromUI('ribbon')}
                      className="px-2.5 py-1 rounded-full bg-[#380715]/80 hover:bg-[#5A0E23] border border-[#D9B77B]/40 text-[10px] font-serif text-[#FFF9EA] transition-colors cursor-pointer"
                    >
                      🎀 Satin Ribbon
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerDiscoveryFromUI('ornaments')}
                      className="px-2.5 py-1 rounded-full bg-[#380715]/80 hover:bg-[#5A0E23] border border-[#D9B77B]/40 text-[10px] font-serif text-[#FFF9EA] transition-colors cursor-pointer"
                    >
                      ✦ Gold Filigree
                    </button>
                  </div>
                )}

                {/* 360° Angle Presets */}
                <div className="flex items-center justify-between w-full pt-1.5 border-t border-[#D9B77B]/20 text-[10px] font-mono">
                  <span className="text-[#D9B77B]/80">Angles:</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setGiftBoxUserRotation(0.14, 0.32)}
                      className="px-2 py-0.5 rounded bg-black/40 hover:bg-[#380715] border border-[#D9B77B]/30 text-[#FFF9EA] transition-colors cursor-pointer"
                    >
                      30°
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiftBoxUserRotation(0, 0)}
                      className="px-2 py-0.5 rounded bg-black/40 hover:bg-[#380715] border border-[#D9B77B]/30 text-[#FFF9EA] transition-colors cursor-pointer"
                    >
                      Front
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiftBoxUserRotation(0.45, 0)}
                      className="px-2 py-0.5 rounded bg-black/40 hover:bg-[#380715] border border-[#D9B77B]/30 text-[#FFF9EA] transition-colors cursor-pointer"
                    >
                      Top
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiftBoxUserRotation(0.14, 0.32)}
                      className="px-2 py-0.5 rounded bg-black/40 hover:bg-[#380715] border border-[#D9B77B]/30 text-[#FDE68A] flex items-center gap-0.5 transition-colors cursor-pointer"
                      title="Reset to default angle"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      Reset
                    </button>
                  </div>
                </div>

                {discoveryFeedback && (
                  <p className="text-[11px] font-serif italic text-[#F8E6A0] animate-in fade-in duration-300">
                    {discoveryFeedback}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: Dynamic Story Stage                                 */}
        {/* 1. Assembling Copy                                                */}
        {/* 2. Ready to Open ("I CAN'T WAIT — OPEN IT!")                      */}
        {/* 3. Actual Birthday Gift Showcase                                  */}
        {/* 4. Unfolding Hidden Postscript Note                               */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {/* ============================================================= */}
            {/* STATE A: AUTOMATIC 3D ASSEMBLY IN PROGRESS                    */}
            {/* ============================================================= */}
            {phase === 'ASSEMBLING' && (
              <motion.div
                key="stage-assembling"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#14060C]/75 backdrop-blur-md border border-[#D9B77B]/45 shadow-2xl max-w-md w-full gap-4 text-center"
              >
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#F8E6A0] tracking-[0.22em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9B77B] animate-pulse" />
                  <span>Piece by Piece</span>
                </div>

                {/* Single active construction message */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={constructionIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                    className="text-lg sm:text-xl font-serif italic text-[#FFF9EA] min-h-[56px] flex items-center justify-center px-2"
                  >
                    &ldquo;{CONSTRUCTION_MESSAGES[constructionIndex]}&rdquo;
                  </motion.p>
                </AnimatePresence>

                {/* Subtle craftsmanship progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D9AE50] via-[#C5162D] to-[#FDE68A] transition-all duration-700"
                    style={{
                      width: `${((constructionIndex + 1) / CONSTRUCTION_MESSAGES.length) * 100}%`,
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSkipAssembly}
                  className="mt-1 text-[11px] font-mono text-[#D9B77B]/75 hover:text-[#FFF9EA] underline transition-colors cursor-pointer"
                >
                  Skip to Finished Gift →
                </button>
              </motion.div>
            )}

            {/* ============================================================= */}
            {/* STATE B: ASSEMBLED & READY TO EXPLORE / OPEN                  */}
            {/* ============================================================= */}
            {(phase === 'ASSEMBLY_COMPLETE' || phase === 'READY_TO_OPEN' || phase === 'UNTYING' || phase === 'OPENING') && (
              <motion.div
                key="stage-ready-to-open"
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#16070E]/80 backdrop-blur-md border border-[#D9B77B]/55 shadow-[0_16px_48px_rgba(0,0,0,0.85)] max-w-md w-full gap-4 text-center"
              >
                <div className="px-3.5 py-1.5 rounded-full bg-[#D9B77B]/15 border border-[#D9B77B]/45 text-xs font-serif italic text-[#F8E6A0] flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-current animate-pulse" />
                  <span>Your surprise is ready, princess. ♥</span>
                </div>

                <p className="text-sm sm:text-base font-serif text-[#FFF9EA]/90 leading-relaxed">
                  Take a closer look. I put a little extra love into the details. ♥
                </p>

                <button
                  type="button"
                  onClick={handleOpenGift}
                  disabled={phase === 'UNTYING' || phase === 'OPENING'}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#6B0F24] via-[#9E1A33] to-[#6B0F24] text-[#FFF9EA] font-mono font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:brightness-115 active:scale-98 transition-all duration-300 shadow-[0_0_32px_rgba(217,174,80,0.45)] border-2 border-[#FDE68A]/75 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                >
                  <Gift className="w-4 h-4 text-[#FDE68A]" />
                  <span>
                    {phase === 'UNTYING'
                      ? 'Untying Crimson Ribbon...'
                      : phase === 'OPENING'
                      ? 'Opening Royal Clasp...'
                      : "I CAN'T WAIT — OPEN IT!"}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FDE68A]" />
                </button>

                <button
                  type="button"
                  onClick={handleReplayAssembly}
                  className="text-xs font-mono text-[#D9B77B]/85 hover:text-[#FFF9EA] underline flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Watch It Come Together Again</span>
                </button>
              </motion.div>
            )}

            {/* ============================================================= */}
            {/* STATE C: THE ACTUAL BIRTHDAY GIFT SHOWCASE                    */}
            {/* ============================================================= */}
            {(phase === 'GIFT_REVEALED' || showGiftOverlayInQuietMode) && (
              <motion.div
                key="stage-gift-revealed"
                initial={{ opacity: 0, x: 24, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#220915]/95 via-[#180710]/95 to-[#10040A]/95 backdrop-blur-md border border-[#D9B77B]/55 shadow-[0_18px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4 sm:gap-5"
              >
                <div className="flex items-center justify-between border-b border-[#D9B77B]/25 pb-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D9B77B] font-semibold">
                    {CONFIGURED_ACTUAL_GIFT.eyebrow}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#D9B77B]/20 text-[#F8E6A0] border border-[#D9B77B]/50">
                    FOR YOU, UCI ♥
                  </span>
                </div>

                {/* Media Presentation Slot */}
                <div className="w-full h-52 sm:h-60 rounded-xl overflow-hidden relative border border-[#D9B77B]/35 bg-black/60 flex items-center justify-center shadow-inner">
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
                  <h2 className="text-xl sm:text-2xl font-serif text-[#FFF9EA] tracking-tight font-normal">
                    {CONFIGURED_ACTUAL_GIFT.title}
                  </h2>
                  <span className="text-xs font-sans text-[#F8E6A0] font-medium">
                    {CONFIGURED_ACTUAL_GIFT.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm font-serif text-[#FFF9EA]/90 leading-relaxed mt-1">
                    {CONFIGURED_ACTUAL_GIFT.description}
                  </p>
                </div>

                {/* Delivery & Personal Note Callouts */}
                <div className="p-3.5 rounded-xl bg-[#D9B77B]/10 border border-[#D9B77B]/35 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F8E6A0]">
                    <Package className="w-3.5 h-3.5 shrink-0 text-[#D9B77B]" />
                    <span>{CONFIGURED_ACTUAL_GIFT.deliveryOrRedemptionNote}</span>
                  </div>
                  <p className="text-xs font-serif italic text-[#FFF9EA]/95 pl-5 border-l border-[#D9B77B]/45">
                    &ldquo;{CONFIGURED_ACTUAL_GIFT.personalNote}&rdquo;
                  </p>
                </div>

                {/* Subtle replay & quiet moment controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D9B77B]/20">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReplayGiftReveal}
                      className="text-[11px] font-mono text-[#D9B77B]/80 hover:text-[#FFF9EA] underline cursor-pointer"
                    >
                      Replay Gift Reveal
                    </button>
                    <button
                      type="button"
                      onClick={handleReplayAssembly}
                      className="text-[11px] font-mono text-white/50 hover:text-white underline cursor-pointer"
                    >
                      Replay Assembly
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={
                      showGiftOverlayInQuietMode
                        ? () => setShowGiftOverlayInQuietMode(false)
                        : handleEnterQuietMoment
                    }
                    className="text-xs font-serif italic text-[#F8E6A0] hover:text-[#FFF9EA] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>
                      {showGiftOverlayInQuietMode ? 'Return to the moment ♥' : 'Let the moment settle ♥'}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ============================================================= */}
            {/* STATE D: THE HIDDEN POSTSCRIPT — UNFOLDING IVORY & BURGUNDY   */}
            {/* ============================================================= */}
            {(phase === 'POSTSCRIPT_READY' || phase === 'COMPLETE') && !showGiftOverlayInQuietMode && (
              <motion.div
                key="stage-hidden-postscript"
                initial={{ opacity: 0, y: 36, rotateX: -35, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                className="relative w-full max-w-md mx-auto"
              >
                {phase === 'COMPLETE' ? (
                  /* Reverse of the Note: Glowing Golden Heart Emblem & Outward Particles */
                  <motion.div
                    key="postscript-reverse-heart"
                    initial={{ rotateY: -90, opacity: 0.4, scale: 0.96 }}
                    animate={{
                      rotateY: 0,
                      opacity: [1, 1, 0],
                      scale: [1, 1.06, 0.92],
                    }}
                    transition={{ duration: 1.05, ease: 'easeInOut' }}
                    className="relative rounded-xl p-10 sm:p-12 border-2 border-[#FDE68A] shadow-[0_0_65px_rgba(253,230,138,0.65)] flex flex-col items-center justify-center min-h-[290px] overflow-hidden"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, #5A0E23 0%, #2A0712 65%, #120308 100%)',
                    }}
                  >
                    {/* Warm Golden Light Aura */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_45px_rgba(253,230,138,0.9)] border-2 border-[#FFF9EA]"
                      style={{
                        background:
                          'radial-gradient(circle at 35% 30%, #FFFBEB 0%, #FDE68A 40%, #D99B26 80%, #92400E 100%)',
                      }}
                    >
                      <Heart className="w-9 h-9 text-[#6B0F24] fill-current animate-pulse" />
                    </div>

                    {/* Golden Particles Traveling Towards Screen Edge */}
                    {[
                      { dx: 190, dy: -90 },
                      { dx: 210, dy: -20 },
                      { dx: 185, dy: 65 },
                      { dx: -180, dy: -75 },
                      { dx: -195, dy: 55 },
                      { dx: 140, dy: -130 },
                    ].map((pt, i) => (
                      <motion.span
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: pt.dx, y: pt.dy, opacity: 0, scale: 0.3 }}
                        transition={{ duration: 0.95, ease: 'easeOut', delay: i * 0.04 }}
                        className="absolute w-2.5 h-2.5 rounded-full bg-[#FDE68A] shadow-[0_0_12px_#FDE68A]"
                      />
                    ))}
                  </motion.div>
                ) : (
                  /* Front of the Unfolded Warm Ivory & Burgundy Note Card */
                  <div
                    className="relative rounded-xl p-7 sm:p-9 border-2 border-[#D9AE50]/70 shadow-[0_28px_65px_rgba(10,2,6,0.92)] overflow-hidden text-center"
                    style={{
                      background:
                        'linear-gradient(135deg, #FFFDF8 0%, #FAF2E1 42%, #F3E4C8 85%, #E8D1AC 100%)',
                    }}
                  >
                    {/* Inner Fine Gold Decorative Border */}
                    <div
                      className="absolute inset-2.5 rounded-lg border border-[#B8860B]/45 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.75)',
                      }}
                    />

                    {/* Subtle Paper Fold Crease Line Across Center */}
                    <div
                      className="absolute inset-x-3 top-1/2 h-[1px] pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(160, 115, 50, 0.28), transparent)',
                      }}
                    />

                    {/* Top Burgundy Satin Ribbon Accent & Golden Heart Wax Seal */}
                    <div className="relative flex flex-col items-center justify-center mb-5">
                      <div
                        className="w-24 h-1.5 rounded-full mb-2"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, #881337, #9E1A33, #881337, transparent)',
                        }}
                      />
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-[#FFF4C2]"
                        style={{
                          background:
                            'radial-gradient(circle at 35% 30%, #FFF9E0 0%, #F5D061 35%, #D99B26 75%, #8C5808 100%)',
                        }}
                      >
                        <span className="text-xs text-[#6B0F24]">♥</span>
                      </div>
                    </div>

                    {/* Exact Required Postscript Copy */}
                    <span className="block text-[11px] font-mono uppercase tracking-[0.28em] text-[#8C5808] font-semibold mb-3">
                      P.S. — ONE LAST THING
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-serif text-[#3D121E] font-normal leading-snug mb-2">
                      You thought that was the whole picture?
                    </h3>

                    <p className="text-lg sm:text-xl font-serif italic text-[#881337] font-medium mb-4">
                      Oh, we&apos;re not done yet. ❤️
                    </p>

                    <p className="text-xs sm:text-sm font-serif text-[#5C3414] leading-relaxed mb-7">
                      There&apos;s still a little more waiting for you...
                    </p>

                    {/* Refined Invitation Action */}
                    <button
                      type="button"
                      onClick={handleProceedToNextSurprise}
                      className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#FFF9EA] transition-all duration-300 shadow-[0_10px_28px_rgba(136,19,55,0.4)] hover:shadow-[0_12px_34px_rgba(136,19,55,0.65)] cursor-pointer"
                      style={{
                        background:
                          'linear-gradient(135deg, #5A0E23 0%, #881337 50%, #5A0E23 100%)',
                        border: '1px solid rgba(217, 174, 80, 0.75)',
                      }}
                    >
                      <span>THERE&apos;S A LITTLE MORE... →</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BOTTOM AREA: Discreet Re-View Controls (Never a Formal Ending Title)  */}
      {/* ===================================================================== */}
      <div className="relative z-20 flex flex-wrap items-center justify-between max-w-7xl mx-auto w-full pt-2 pb-1 gap-3 pointer-events-auto">
        <div className="flex items-center gap-4">
          {(phase === 'QUIET_MOMENT' || phase === 'POSTSCRIPT_REVEAL' || phase === 'POSTSCRIPT_READY') && (
            <button
              type="button"
              onClick={() => setShowGiftOverlayInQuietMode((prev) => !prev)}
              className="text-xs font-serif italic text-[#F8E6A0]/75 hover:text-[#FFF9EA] underline transition-colors cursor-pointer"
            >
              {showGiftOverlayInQuietMode ? 'Hide Gift Card' : 'View Your Birthday Gift Again'}
            </button>
          )}
          {phase === 'QUIET_MOMENT' && (
            <button
              type="button"
              onClick={handleRevealPostscriptNow}
              className="text-xs font-serif italic text-[#D9B77B]/70 hover:text-[#FDE68A] transition-colors cursor-pointer"
            >
              ✦ Notice the golden glimmer...
            </button>
          )}
        </div>

        <span className="text-xs font-serif italic text-[#F8E6A0]/60 ml-auto">
          Forever yours ♥
        </span>
      </div>
    </section>
  );
};
