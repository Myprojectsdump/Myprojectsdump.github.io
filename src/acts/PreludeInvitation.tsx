// src/acts/PreludeInvitation.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { PRELUDE_CONTENT } from '../config/preludeContent';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';

type PreludeStage = 'sealed' | 'breaking' | 'unfolding' | 'reading' | 'transitioning';

interface StardustSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

export const PreludeInvitation: React.FC = () => {
  const [stage, setStage] = useState<PreludeStage>('sealed');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>(PRELUDE_CONTENT.aria.envelopeLabel);

  const isMuted = useExperienceStore((state) => state.isMuted);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);
  const reducedMotionChoice = useExperienceStore((state) => state.reducedMotionChoice);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparklesRef = useRef<StardustSparkle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const sealBtnRef = useRef<HTMLButtonElement | null>(null);

  const isReducedMotion =
    reducedMotionChoice === 'reduce' ||
    (reducedMotionChoice === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Floating dust motes & golden sparkles canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial warm ambient sunlight motes
    const motes: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
      speedX: number;
    }> = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      speedY: -(Math.random() * 0.35 + 0.15),
      speedX: Math.sin(Math.random() * Math.PI) * 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw ambient sunbeam dust motes
      ctx.fillStyle = '#FFE6A0';
      motes.forEach((mote) => {
        mote.y += mote.speedY;
        mote.x += mote.speedX;
        if (mote.y < -10) {
          mote.y = height + 10;
          mote.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        ctx.globalAlpha = mote.alpha * 0.6;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#FDE68A';
        ctx.fill();
      });

      // Draw interactive stardust sparkles (during wax seal break & paper-to-stars transition)
      if (sparklesRef.current.length > 0) {
        sparklesRef.current = sparklesRef.current.filter((sp) => {
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.opacity -= 0.016;
          sp.size *= 0.98;

          if (sp.opacity <= 0) return false;

          ctx.beginPath();
          ctx.arc(sp.x, sp.y, Math.max(0.2, sp.size), 0, Math.PI * 2);
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.opacity);
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#F59E0B';
          ctx.fill();
          return true;
        });
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Spawn stardust burst helper
  const spawnSparkles = useCallback((originX: number, originY: number, count = 28) => {
    const colors = ['#FFF9EA', '#FDE68A', '#F59E0B', '#D97706', '#FEF3C7'];
    const newSparkles: StardustSparkle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3.5 + 1.2;
      return {
        id: Math.random() + Date.now(),
        x: originX,
        y: originY,
        size: Math.random() * 3.2 + 1.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    sparklesRef.current.push(...newSparkles);
  }, []);

  // Open wax seal interaction
  const handleOpenSeal = () => {
    if (stage !== 'sealed') return;

    if (!isMuted) {
      proceduralAudio.playWaxSealCrack();
    }

    // Spawn sparks from seal center
    if (sealBtnRef.current) {
      const rect = sealBtnRef.current.getBoundingClientRect();
      spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 36);
    } else {
      spawnSparkles(window.innerWidth / 2, window.innerHeight / 2, 36);
    }

    setAnnouncement(PRELUDE_CONTENT.aria.openedAnnouncement);
    setStage('breaking');

    if (isReducedMotion) {
      setTimeout(() => setStage('reading'), 500);
      return;
    }

    // Phase 1: Breaking wax and ribbon slip (600ms)
    // Phase 2: Flap lifts and letter emerges (1200ms)
    // Phase 3: Letter settles into reading view (2000ms)
    setTimeout(() => {
      setStage('unfolding');
      if (!isMuted) {
        proceduralAudio.playMirrorNoteChime();
      }
    }, 700);

    setTimeout(() => {
      setStage('reading');
    }, 1800);
  };

  // Re-read sequence
  const handleReadAgain = () => {
    setStage('sealed');
    setAnnouncement(PRELUDE_CONTENT.aria.envelopeLabel);
  };

  // Transition into the cosmic universe
  const handleProceedToUniverse = () => {
    if (stage === 'transitioning') return;

    setAnnouncement(PRELUDE_CONTENT.aria.transitionAnnouncement);
    setStage('transitioning');

    if (!isMuted) {
      proceduralAudio.playOpeningSignature();
    }

    // Spawn sweeping upward stardust
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        spawnSparkles(
          window.innerWidth / 2 + (Math.random() - 0.5) * 360,
          window.innerHeight / 2 + (Math.random() - 0.5) * 200,
          20
        );
      }, i * 160);
    }

    // Smooth handoff to OpeningPortal
    setTimeout(() => {
      setCurrentChapter('OPENING');
    }, isReducedMotion ? 400 : 2200);
  };

  // Skip Intro directly
  const handleSkipIntro = () => {
    if (!isMuted) {
      proceduralAudio.playStarBridgeChime();
    }
    setCurrentChapter('OPENING');
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
      role="region"
      aria-label="The Little Invitation — Prelude"
    >
      {/* Screen Reader ARIA Live Status Announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      {/* Floating Sunlight Motes & Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Warm Ambient Sunlight Vignette (Upper Left Light Source) */}
      <div
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 18% 12%, rgba(254, 243, 199, 0.22) 0%, rgba(245, 158, 11, 0.08) 45%, rgba(15, 6, 9, 0.45) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header Bar: Elegant Brand & Controls */}
      <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-4 pointer-events-auto">
        <div className="flex items-center gap-2 text-champagne-gold/80 text-xs sm:text-sm tracking-[0.25em] uppercase font-serif">
          <span>⋆ ☾ ⋆</span>
          <span className="hidden sm:inline font-light">THE GRAVITY OF UCI</span>
          <span className="text-[10px] tracking-widest text-parchment-warm/60 lowercase italic">
            — the prelude
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Skip Intro Button */}
          <button
            onClick={handleSkipIntro}
            aria-label="Skip prelude directly to cosmic opening"
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-obsidian-void/60 hover:bg-obsidian-void/90 border border-champagne-gold/40 hover:border-champagne-gold text-champagne-gold text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-glow hover:shadow-[0_0_20px_rgba(217,174,80,0.4)]"
          >
            <span>{PRELUDE_CONTENT.actions.skip}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </header>

      {/* Main Interactive Stage Container */}
      <main className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {/* =========================================================================
              VIEW A: THE SEALED / OPENING ENVELOPE (Sealed, Breaking, Unfolding)
              ========================================================================= */}
          {(stage === 'sealed' || stage === 'breaking' || stage === 'unfolding') && (
            <motion.div
              key="envelope-container"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
              className="relative w-full max-w-[580px] aspect-[16/10] sm:aspect-[16/10] flex items-center justify-center"
              style={{
                perspective: '1400px',
                transform: 'rotate(-1.5deg)',
              }}
            >
              {/* Outer Realistic Drop Shadow on Wooden Table */}
              <div
                className="absolute inset-4 rounded-xl pointer-events-none transition-shadow duration-500"
                style={{
                  boxShadow:
                    '0 35px 60px -15px rgba(20, 8, 4, 0.85), 0 15px 30px -10px rgba(10, 4, 2, 0.7), inset 0 0 1px 1px rgba(255, 245, 220, 0.1)',
                }}
              />

              {/* Envelope Body Card */}
              <div
                className="relative w-full h-full rounded-lg overflow-hidden border border-[#D9AE50]/40 transition-transform duration-500"
                style={{
                  background:
                    'linear-gradient(135deg, #FFFDF8 0%, #FBF6E9 40%, #F5E8D2 85%, #EEDBBF 100%)',
                  boxShadow:
                    'inset 0 1px 2px rgba(255, 255, 255, 0.9), inset 0 -2px 6px rgba(140, 95, 45, 0.15)',
                }}
              >
                {/* Paper Fiber Texture & Fine Gold Foil Trim */}
                <div
                  className="absolute inset-2.5 rounded border border-[#C99A45]/35 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
                  }}
                />

                {/* Triangular Top Flap Fold Crease with CSS 3D rotateX */}
                <motion.div
                  className="absolute top-0 inset-x-0 h-1/2 origin-top z-10 pointer-events-none"
                  animate={{
                    rotateX: stage === 'sealed' ? 0 : -140,
                    opacity: stage === 'sealed' ? 1 : 0.85,
                  }}
                  transition={{
                    duration: isReducedMotion ? 0.3 : 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <svg
                    viewBox="0 0 580 180"
                    preserveAspectRatio="none"
                    className="w-full h-full drop-shadow-[0_6px_8px_rgba(70,40,15,0.25)]"
                  >
                    <polygon
                      points="0,0 580,0 290,175"
                      fill="#FAF4E5"
                      stroke="#C99A45"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                    />
                    {/* Inner gold foil decorative trim */}
                    <polygon
                      points="18,6 562,6 290,162"
                      fill="none"
                      stroke="#D9AE50"
                      strokeWidth="0.8"
                      strokeOpacity="0.5"
                      strokeDasharray="4 2"
                    />
                  </svg>
                </motion.div>

                {/* Front Inscription Text Block */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
                  {/* Eyebrow */}
                  <span className="text-xs tracking-[0.35em] text-[#A67C37] mb-2 font-serif opacity-80">
                    {PRELUDE_CONTENT.eyebrow}
                  </span>

                  {/* Main Title: FOR UCI */}
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-[0.22em] uppercase mb-2"
                    style={{
                      background:
                        'linear-gradient(135deg, #4A2810 0%, #7A4B1A 40%, #B8860B 80%, #5C3714 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 1px 1px rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {PRELUDE_CONTENT.envelope.recipient}
                  </h1>

                  {/* Subtitle: Something I made just for you. */}
                  <p
                    className="text-base sm:text-lg md:text-xl text-[#6D431B] italic font-serif tracking-wide mb-3"
                    style={{ fontFamily: "'Alex Brush', 'Playfair Display', Georgia, serif" }}
                  >
                    {PRELUDE_CONTENT.envelope.subtitle}
                  </p>

                  {/* Small Bottom Heart Ornament */}
                  <span className="text-sm text-[#C99A45] tracking-widest opacity-75">
                    {PRELUDE_CONTENT.envelope.heartMark}
                  </span>
                </div>

                {/* Burgundy Satin Ribbon (Horizontal Band across Envelope) */}
                <motion.div
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-14 z-15 pointer-events-none overflow-visible"
                  animate={{
                    opacity: stage === 'sealed' ? 1 : 0,
                    scaleX: stage === 'sealed' ? 1 : 1.15,
                    y: stage === 'sealed' ? '-50%' : '-45%',
                  }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{
                    background:
                      'linear-gradient(180deg, #5A0E23 0%, #7E1430 25%, #9B1A3D 50%, #7E1430 75%, #500A1D 100%)',
                    boxShadow:
                      '0 4px 12px rgba(60, 10, 20, 0.45), inset 0 1px 2px rgba(255, 180, 200, 0.35), inset 0 -1px 2px rgba(30, 5, 10, 0.6)',
                  }}
                >
                  {/* Satin Lustre Specular Sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255, 220, 235, 0.25) 45%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 220, 235, 0.25) 55%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 4s infinite linear',
                    }}
                  />
                  {/* Subtle Satin Edge Stitching */}
                  <div className="absolute top-1 inset-x-0 border-t border-[#F472B6]/30 border-dashed" />
                  <div className="absolute bottom-1 inset-x-0 border-b border-[#F472B6]/30 border-dashed" />
                </motion.div>

                {/* Ribbon Draped Bow Tails (Left and Right below seal) */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 z-16 pointer-events-none flex justify-center w-48 h-28"
                  animate={{
                    opacity: stage === 'sealed' ? 1 : 0,
                    scale: stage === 'sealed' ? 1 : 0.8,
                    y: stage === 'sealed' ? 0 : 20,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Left draped tail */}
                  <div
                    className="w-10 h-24 origin-top-right -rotate-25 rounded-b-md"
                    style={{
                      background:
                        'linear-gradient(175deg, #7E1430 0%, #9B1A3D 45%, #500A1D 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
                      boxShadow: '0 8px 16px rgba(40, 5, 15, 0.5)',
                    }}
                  />
                  {/* Right draped tail */}
                  <div
                    className="w-10 h-24 origin-top-left rotate-25 rounded-b-md -ml-3"
                    style={{
                      background:
                        'linear-gradient(185deg, #7E1430 0%, #9B1A3D 45%, #500A1D 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
                      boxShadow: '0 8px 16px rgba(40, 5, 15, 0.5)',
                    }}
                  />
                </motion.div>

                {/* Golden Wax Seal (The Centerpiece Showpiece Button) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25">
                  <motion.button
                    ref={sealBtnRef}
                    type="button"
                    onClick={handleOpenSeal}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    disabled={stage !== 'sealed'}
                    aria-label="Golden heart wax seal. Click or press Enter to open your invitation."
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-champagne-gold/70 group"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    animate={
                      stage === 'sealed'
                        ? {
                            boxShadow: isHovered
                              ? '0 0 35px rgba(245, 158, 11, 0.65), 0 12px 24px rgba(40, 15, 5, 0.6)'
                              : '0 0 20px rgba(245, 158, 11, 0.35), 0 8px 18px rgba(40, 15, 5, 0.5)',
                          }
                        : {
                            scale: 1.15,
                            opacity: 0,
                            transition: { duration: 0.6 },
                          }
                    }
                  >
                    {/* Organic Scalloped Golden Wax Rim SVG */}
                    <svg
                      viewBox="0 0 120 120"
                      className="absolute inset-0 w-full h-full filter drop-shadow-[0_6px_10px_rgba(30,10,2,0.6)]"
                    >
                      <defs>
                        {/* Metallic Gold Shader Gradient */}
                        <linearGradient id="waxGoldGradient" x1="20%" y1="10%" x2="80%" y2="90%">
                          <stop offset="0%" stopColor="#FFF9E0" />
                          <stop offset="25%" stopColor="#F5D061" />
                          <stop offset="50%" stopColor="#D99B26" />
                          <stop offset="75%" stopColor="#B37410" />
                          <stop offset="100%" stopColor="#784B05" />
                        </linearGradient>

                        {/* Wax Inner Shadow Filter */}
                        <filter id="waxInnerDepth" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#3D2005" floodOpacity="0.8" />
                        </filter>
                      </defs>

                      {/* Organic Hand-Stamped Wax Perimeter */}
                      <path
                        d="M 60,10 
                           C 72,9 79,15 88,20 
                           C 97,25 106,32 108,42 
                           C 111,53 108,65 106,75 
                           C 103,86 98,96 89,102 
                           C 80,108 69,111 58,110 
                           C 46,109 35,106 27,99 
                           C 19,91 12,82 11,70 
                           C 9,59 13,48 18,38 
                           C 23,28 32,20 43,14 
                           C 49,11 54,10 60,10 Z"
                        fill="url(#waxGoldGradient)"
                        stroke="#FFEAA7"
                        strokeWidth="1.2"
                        strokeOpacity="0.8"
                      />

                      {/* Raised Laurel Wreath Concentric Circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="37"
                        fill="none"
                        stroke="#784B05"
                        strokeWidth="1.8"
                        strokeOpacity="0.6"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="35"
                        fill="none"
                        stroke="#FFF4C2"
                        strokeWidth="1.2"
                        strokeOpacity="0.9"
                      />

                      {/* Laurel Leaf Accents */}
                      {Array.from({ length: 16 }).map((_, i) => {
                        const ang = (i * Math.PI * 2) / 16;
                        const lx = 60 + Math.cos(ang) * 36;
                        const ly = 60 + Math.sin(ang) * 36;
                        return (
                          <circle
                            key={i}
                            cx={lx}
                            cy={ly}
                            r="1.6"
                            fill="#FFEBA3"
                            filter="url(#waxInnerDepth)"
                          />
                        );
                      })}

                      {/* Sculpted 3D Raised Heart in Wax Center */}
                      <path
                        d="M 60,42 
                           C 60,42 54,34 45,34 
                           C 36,34 32,41 32,49 
                           C 32,61 46,71 60,82 
                           C 74,71 88,61 88,49 
                           C 88,41 84,34 75,34 
                           C 66,34 60,42 60,42 Z"
                        fill="url(#waxGoldGradient)"
                        stroke="#FFFBD6"
                        strokeWidth="1.5"
                        filter="url(#waxInnerDepth)"
                      />

                      {/* Specular Highlight Arc across Heart Top-Left */}
                      <path
                        d="M 45,37 C 39,37 36,42 36,48 C 36,54 42,61 48,66"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    </svg>

                    {/* Subtle Pulsing Golden Sparkle Overlay */}
                    <Sparkles
                      className={`w-6 h-6 text-amber-200 transition-opacity duration-300 pointer-events-none ${
                        isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-90'
                      }`}
                    />
                  </motion.button>
                </div>
              </div>

              {/* Gentle Hint Prompt below Envelope */}
              <motion.div
                className="absolute -bottom-14 inset-x-0 flex flex-col items-center justify-center text-center pointer-events-none"
                initial={{ opacity: 0, y: 6 }}
                animate={{
                  opacity: stage === 'sealed' ? [0.65, 1, 0.65] : 0,
                  y: stage === 'sealed' ? 0 : 8,
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span
                  className="text-sm sm:text-base text-amber-200 font-serif tracking-widest drop-shadow-[0_2px_8px_rgba(20,6,2,0.8)]"
                  style={{ textShadow: '0 0 12px rgba(245, 158, 11, 0.6)' }}
                >
                  {PRELUDE_CONTENT.envelope.sealPrompt}
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* =========================================================================
              VIEW B: THE UNFOLDED LETTER (Reading & Step into the Universe)
              ========================================================================= */}
          {(stage === 'reading' || stage === 'transitioning') && (
            <motion.div
              key="letter-parchment"
              initial={{ opacity: 0, y: 32, scale: 0.94 }}
              animate={
                stage === 'transitioning'
                  ? { opacity: 0, scale: 1.08, filter: 'blur(16px)', transition: { duration: 1.8 } }
                  : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
              }
              exit={{ opacity: 0, scale: 0.92, filter: 'blur(8px)', transition: { duration: 0.8 } }}
              className="relative w-full max-w-xl mx-auto rounded-xl p-8 sm:p-10 md:p-12 overflow-hidden border border-[#D9AE50]/50 shadow-[0_30px_70px_rgba(15,4,2,0.85)]"
              style={{
                background:
                  'linear-gradient(135deg, #FFFDF7 0%, #FAF3E3 35%, #F4E8D0 80%, #EBD4B4 100%)',
              }}
            >
              {/* Inner Deckled Paper Border & Subtle Foil Corners */}
              <div
                className="absolute inset-3 rounded-lg border border-[#C99A45]/30 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.7)',
                }}
              />

              {/* Decorative Corner Filigrees */}
              <div className="absolute top-4 left-4 text-xs text-[#B8860B]/50 font-serif select-none pointer-events-none">
                ✦
              </div>
              <div className="absolute top-4 right-4 text-xs text-[#B8860B]/50 font-serif select-none pointer-events-none">
                ✦
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-[#B8860B]/50 font-serif select-none pointer-events-none">
                ✦
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-[#B8860B]/50 font-serif select-none pointer-events-none">
                ✦
              </div>

              {/* Letter Header Ornament */}
              <div className="flex flex-col items-center justify-center text-center mb-6">
                <span className="text-sm tracking-[0.4em] text-[#A67C37] font-serif mb-1 opacity-80">
                  {PRELUDE_CONTENT.letter.headerOrnament}
                </span>
                <h2
                  className="text-3xl sm:text-4xl text-[#3D1F08] font-serif italic"
                  style={{ fontFamily: "'Alex Brush', 'Playfair Display', Georgia, serif" }}
                >
                  {PRELUDE_CONTENT.letter.salutation}
                </h2>
              </div>

              {/* Letter Body Paragraphs (Sequential Fade-in) */}
              <div className="space-y-4 sm:space-y-5 text-[#402008] font-serif text-sm sm:text-base leading-relaxed tracking-wide">
                {PRELUDE_CONTENT.letter.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: isReducedMotion ? 0.1 : 0.3 + idx * 0.45,
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-justify sm:text-center text-[#4A240A]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Letter Closing & Calligraphic Signoff */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isReducedMotion ? 0.2 : 1.7,
                  duration: 0.9,
                }}
                className="mt-8 text-center"
              >
                <p
                  className="text-2xl sm:text-3xl text-[#7E1430] font-serif italic"
                  style={{ fontFamily: "'Alex Brush', 'Playfair Display', Georgia, serif" }}
                >
                  {PRELUDE_CONTENT.letter.closing}
                </p>
              </motion.div>

              {/* Action Buttons: Primary 'COME WITH ME, UCI' & Secondary 'READ AGAIN' */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isReducedMotion ? 0.3 : 2.2,
                  duration: 0.9,
                }}
                className="mt-10 flex flex-col items-center justify-center gap-3 pt-6 border-t border-[#D9AE50]/30"
              >
                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleProceedToUniverse}
                  className="group relative px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-champagne-gold shadow-[0_10px_25px_rgba(180,120,20,0.35)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.55)] cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(135deg, #7E1430 0%, #A31B3F 45%, #C2234D 80%, #7E1430 100%)',
                    border: '1px solid rgba(253, 230, 138, 0.6)',
                  }}
                >
                  {/* Subtle golden shimmer sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(254, 240, 138, 0.3), transparent)',
                      animation: 'shimmer 2s infinite',
                    }}
                  />

                  <div className="relative flex items-center gap-2.5 text-amber-100 font-serif tracking-[0.2em] uppercase text-sm sm:text-base font-medium">
                    <span>{PRELUDE_CONTENT.actions.primary}</span>
                    <ArrowRight className="w-4 h-4 text-amber-200 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>

                {/* Supporting prompt */}
                <span className="text-xs text-[#8C5824] font-serif italic tracking-wide">
                  {PRELUDE_CONTENT.actions.primarySubtitle}
                </span>

                {/* Secondary Read Again Action */}
                <button
                  type="button"
                  onClick={handleReadAgain}
                  className="mt-2 flex items-center gap-1.5 text-xs text-[#8C5824]/80 hover:text-[#5C320A] tracking-wider uppercase font-mono transition-colors duration-200 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{PRELUDE_CONTENT.actions.replay}</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
