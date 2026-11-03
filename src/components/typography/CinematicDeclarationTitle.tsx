// src/components/typography/CinematicDeclarationTitle.tsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { proceduralAudio } from '../../engine/audio/ProceduralAudio';

export interface CinematicDeclarationTitleProps {
  /**
   * 'intro': Full-screen cinematic live writing against the midnight backdrop
   * 'header': Compact header version anchored at the top of the main reading interface
   */
  mode?: 'intro' | 'header';
  onSequenceComplete?: () => void;
  isSkipped?: boolean;
}

interface StardustSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CinematicDeclarationTitle: React.FC<CinematicDeclarationTitleProps> = ({
  mode = 'intro',
  onSequenceComplete,
  isSkipped = false,
}) => {
  const reducedMotion = useExperienceStore((state) => state.reducedMotionChoice);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const penTipRef = useRef<HTMLDivElement>(null);

  // Structural Eyebrow, Subtitle & Shimmer Refs
  const eyebrowRef = useRef<SVGGElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  // Distinct Calligraphy Word Refs (Fluid, natural handwriting reveals without clipping)
  const wordIRef = useRef<SVGGElement>(null);
  const wordLoveRef = useRef<SVGGElement>(null);
  const wordYouRef = useRef<SVGGElement>(null);
  const wordUciRef = useRef<SVGGElement>(null);

  // Decorative Elements: Heart Ribbon, Saturn Ring, Crystal Jewel
  const pathHeartHaloRef = useRef<SVGPathElement>(null);
  const pathHeartCoreRef = useRef<SVGPathElement>(null);
  const pathSaturnRingRef = useRef<SVGPathElement>(null);
  const crystalJewelRef = useRef<SVGGElement>(null);

  const [isCompleted, setIsCompleted] = useState(mode === 'header' || isSkipped);
  const onSequenceCompleteRef = useRef(onSequenceComplete);
  onSequenceCompleteRef.current = onSequenceComplete;

  // Sparks Array for Stardust Canvas
  const sparksRef = useRef<StardustSpark[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Spawn stardust sparks at canvas pixel coordinate (x, y)
  const spawnSparks = useCallback((x: number, y: number, count = 2) => {
    const colors = ['#FFFDF7', '#FDE68A', '#F59E0B', '#FDA4AF', '#E9B85B'];
    for (let i = 0; i < count; i++) {
      sparksRef.current.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.3) * 1.6,
        size: Math.random() * 2.8 + 1.2,
        alpha: 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, []);

  // Canvas Particle Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.024;
        s.size *= 0.98;

        if (s.alpha <= 0 || s.size <= 0.2) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowColor = '#FDE68A';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Sync skip trigger
  useEffect(() => {
    if (isSkipped && !isCompleted) {
      setIsCompleted(true);
      onSequenceCompleteRef.current?.();
    }
  }, [isSkipped, isCompleted]);

  // Master GSAP Live Writing Timeline
  useEffect(() => {
    if (mode === 'header' || isSkipped) {
      setIsCompleted(true);
      return;
    }

    if (reducedMotion === 'reduce') {
      const timer = setTimeout(() => {
        setIsCompleted(true);
        onSequenceCompleteRef.current?.();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Safety fallback timer: Ensure user is NEVER stuck under any unexpected circumstance
    const safetyTimer = setTimeout(() => {
      setIsCompleted(true);
      onSequenceCompleteRef.current?.();
    }, 11000);

    const ctx = gsap.context(() => {
      const setupSvgPath = (path: SVGPathElement | null) => {
        if (!path) return 100;
        try {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          return len;
        } catch {
          return 100;
        }
      };

      const lenHeartHalo = setupSvgPath(pathHeartHaloRef.current);
      const lenHeartCore = setupSvgPath(pathHeartCoreRef.current);
      const lenSaturn = setupSvgPath(pathSaturnRingRef.current);

      const pen = penTipRef.current;
      const container = containerRef.current;

      // Initial States: Hidden before animation starts (ZERO Flash!)
      gsap.set(pen, { opacity: 0, scale: 0.2 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: -8 });
      gsap.set(crystalJewelRef.current, { opacity: 0, scale: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
      gsap.set(shimmerRef.current, { opacity: 0, x: '-100%' });

      // Words start invisible with subtle vertical offset
      if (wordIRef.current) gsap.set(wordIRef.current, { opacity: 0, y: 8, scale: 0.95 });
      if (wordLoveRef.current) gsap.set(wordLoveRef.current, { opacity: 0, y: 8 });
      if (wordYouRef.current) gsap.set(wordYouRef.current, { opacity: 0, y: 8 });
      if (wordUciRef.current) gsap.set(wordUciRef.current, { opacity: 0, y: 10 });

      if (pathHeartHaloRef.current) gsap.set(pathHeartHaloRef.current, { opacity: 0 });
      if (pathHeartCoreRef.current) gsap.set(pathHeartCoreRef.current, { opacity: 0 });
      if (pathSaturnRingRef.current) gsap.set(pathSaturnRingRef.current, { opacity: 0 });

      // Helper to position pen tip relative to SVG coordinates (960 x 520)
      const movePenToSvgCoord = (svgX: number, svgY: number) => {
        if (!pen || !container) return;
        const cRect = container.getBoundingClientRect();
        if (cRect.width === 0 || cRect.height === 0) return;
        const curX = (svgX / 960) * cRect.width;
        const curY = (svgY / 520) * cRect.height;
        pen.style.left = `${curX}px`;
        pen.style.top = `${curY}px`;
        spawnSparks(curX, curY, 2);
      };

      // Helper: Animate SVG Stroke Drawing
      const addPathStrokeAnimation = (
        path: SVGPathElement | null,
        length: number,
        duration: number,
        ease = 'power1.inOut'
      ) => {
        const state = { progress: 0 };
        return tl.to(state, {
          progress: 1,
          duration,
          ease,
          onUpdate: () => {
            const p = state.progress;
            if (path) {
              path.style.strokeDashoffset = `${length * (1 - p)}`;
              if (pen && container) {
                try {
                  const safeLen = Math.max(0, Math.min(length - 0.01, p * length));
                  const pt = path.getPointAtLength(safeLen);
                  if (Number.isFinite(pt.x) && Number.isFinite(pt.y)) {
                    movePenToSvgCoord(pt.x, pt.y);
                  }
                } catch {
                  // Safe guard
                }
              }
            }
          },
          onComplete: () => {
            if (path) path.style.strokeDashoffset = '0';
          },
        });
      };

      // Master Timeline - Authentic calligraphic letter-by-letter live reveal!
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          setIsCompleted(true);
          onSequenceCompleteRef.current?.();
        },
      });

      // BEAT 1: The Spark ignites at the start of "I" (255, 215) (0.45s)
      tl.call(() => {
        movePenToSvgCoord(255, 215);
        try {
          proceduralAudio.playStarBridgeChime();
        } catch {}
      });

      tl.to(pen, {
        opacity: 1,
        scale: 1.1,
        duration: 0.45,
        ease: 'power2.out',
      });

      // Eyebrow emerges gently above
      tl.to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );

      // BEAT 2: The Golden Light writes the letter "I" (0.75s)
      tl.to(
        wordIRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
          onUpdate: () => {
            movePenToSvgCoord(275, 215);
          },
        }
      );

      // Light lifts and glides to start of "Love" (320, 215) (0.2s)
      tl.to(pen, {
        duration: 0.2,
        ease: 'power2.inOut',
        onStart: () => {
          movePenToSvgCoord(320, 215);
          try {
            proceduralAudio.playConstellationStarTone(3);
          } catch {}
        },
      });

      // BEAT 3: The Golden Light writes "Love" (Hero Cursive Flow) (1.2s)
      tl.to(
        wordLoveRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: function () {
            const p = this.progress();
            movePenToSvgCoord(320 + p * 150, 215 - Math.sin(p * Math.PI) * 12);
          },
        }
      );

      // Light glides to start of "You," (520, 215) (0.18s)
      tl.to(pen, {
        duration: 0.18,
        ease: 'power2.inOut',
        onStart: () => {
          movePenToSvgCoord(520, 215);
          try {
            proceduralAudio.playConstellationStarTone(5);
          } catch {}
        },
      });

      // BEAT 4: The Golden Light writes "You," (1.1s)
      tl.to(
        wordYouRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          onUpdate: function () {
            const p = this.progress();
            movePenToSvgCoord(520 + p * 160, 215 - Math.sin(p * Math.PI) * 10);
          },
        }
      );

      // Light glides down to signature position "Uci" (410, 325) (0.22s)
      tl.to(pen, {
        duration: 0.22,
        ease: 'power2.inOut',
        onStart: () => {
          movePenToSvgCoord(410, 325);
          try {
            proceduralAudio.playConstellationStarTone(7);
          } catch {}
        },
      });

      // BEAT 5: The Golden Light writes the personal signature "Uci" (1.2s)
      tl.to(
        wordUciRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: function () {
            const p = this.progress();
            movePenToSvgCoord(410 + p * 150, 325 - Math.sin(p * Math.PI) * 8);
          },
        }
      );

      // BEAT 6: Golden Light glides to vertex (480, 435) to draw the Grand Celestial Heart (0.22s)
      tl.to(pen, {
        duration: 0.22,
        ease: 'power2.inOut',
        onStart: () => {
          movePenToSvgCoord(480, 435);
          try {
            proceduralAudio.playStarBridgeChime();
          } catch {}
        },
      });

      // BEAT 7: The Golden Light draws the Grand Celestial Heart Ribbon (1.6s)
      tl.call(() => {
        if (pathHeartHaloRef.current) pathHeartHaloRef.current.style.opacity = '0.35';
        if (pathHeartCoreRef.current) pathHeartCoreRef.current.style.opacity = '1';
      });

      if (pathHeartHaloRef.current && lenHeartHalo > 0) {
        tl.to(
          pathHeartHaloRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'sine.inOut',
          },
          '<'
        );
      }

      addPathStrokeAnimation(pathHeartCoreRef.current, lenHeartCore, 1.6, 'sine.inOut');

      // Secondary Saturn Perspective Orbit illuminates (0.9s)
      if (pathSaturnRingRef.current && lenSaturn > 0) {
        tl.to(
          pathSaturnRingRef.current,
          {
            strokeDashoffset: 0,
            opacity: 0.45,
            duration: 0.9,
            ease: 'sine.inOut',
            onStart: () => {
              if (pathSaturnRingRef.current) pathSaturnRingRef.current.style.opacity = '0.45';
            },
          },
          '-=0.9'
        );
      }

      // BEAT 8: Radiant Faceted Crystal Heart Jewel pulses at vertex (480, 435) (0.5s)
      tl.to(
        crystalJewelRef.current,
        {
          opacity: 1,
          scale: 1.35,
          duration: 0.32,
          ease: 'back.out(2)',
          onStart: () => {
            if (container) {
              const cRect = container.getBoundingClientRect();
              spawnSparks(cRect.width * 0.5, cRect.height * 0.84, 16);
            }
          },
        },
        '-=0.15'
      );
      tl.to(crystalJewelRef.current, {
        scale: 1.0,
        duration: 0.2,
        ease: 'power1.inOut',
      });

      // Pen fades out gracefully into the stardust
      tl.to(pen, { opacity: 0, scale: 0.3, duration: 0.3 }, '-=0.2');

      // BEAT 9: Supporting Subtitle Line & Golden Winged Flourish (0.7s)
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.1'
      );

      // Shimmer sweep across completed declaration
      if (shimmerRef.current) {
        tl.fromTo(
          shimmerRef.current,
          { opacity: 0.75, x: '-100%' },
          { opacity: 0, x: '200%', duration: 1.1, ease: 'power2.out' },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, [mode, isSkipped, reducedMotion, spawnSparks]);

  const isIntro = mode === 'intro';

  return (
    <div
      ref={containerRef}
      className={`relative select-none flex flex-col items-center justify-center text-center ${
        isIntro
          ? 'w-full max-w-4xl mx-auto py-2 sm:py-6 px-4'
          : 'w-full max-w-2xl mx-auto py-1 px-2'
      }`}
    >
      {/* Accessible semantic headings for assistive tech and test probes */}
      <div className="sr-only">
        <h2>I Love You, Uci</h2>
      </div>

      {/* Subtle radial ambient warmth behind the golden title */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] sm:w-[700px] h-[350px] sm:h-[450px] rounded-full bg-radial from-[#F5B838]/12 via-[#B45309]/4 to-transparent blur-2xl" />
      </div>

      {/* Dynamic Stardust Spark Canvas */}
      <canvas
        ref={canvasRef}
        width={960}
        height={520}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />

      {/* The Glowing Golden Stylus Pen Tip / Calligraphic Light Point */}
      <div
        ref={penTipRef}
        className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <div className="relative w-7 h-7 flex items-center justify-center">
          {/* Luminous Pulsing Halo */}
          <div className="absolute inset-0 rounded-full bg-[#FDE68A] opacity-60 blur-xs animate-ping" />
          {/* Incandescent Core Point of Light */}
          <div className="w-3 h-3 rounded-full bg-[#FFFDF7] shadow-[0_0_14px_#FDE68A,0_0_28px_#E11D48] flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-[#B45309]" />
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MASTER SVG CINEMATIC TITLE CANVAS (960 x 520)                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[24/13] max-w-4xl flex items-center justify-center overflow-visible my-1">
        {/* Shimmer sweep container */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFDF7]/30 to-transparent pointer-events-none z-20"
          style={{ opacity: 0 }}
        />

        <svg
          viewBox="0 0 960 520"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
        >
          <defs>
            {/* 1. Warm Champagne-Gold Luxury Gradient matching Image 1 */}
            <linearGradient id={`luxuryGoldGrad_${mode}`} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="18%" stopColor="#FFF2B2" />
              <stop offset="45%" stopColor="#FCD34D" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* 2. Heart Starlight Ribbon Gradient */}
            <linearGradient id={`heartRibbonGrad_${mode}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="25%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="80%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#FFFDF7" />
            </linearGradient>

            {/* 3. Crystal Gemstone Ruby-Amber Gradient */}
            <radialGradient id={`crystalGemGrad_${mode}`} cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>

            {/* 4. Multi-Layer Incandescent Gold Bloom Filter */}
            <filter id={`goldBloom_${mode}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feGaussianBlur stdDeviation="22" result="blur3" />
              <feMerge>
                <feMergeNode in="blur3" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 5. Subtle Soft Drop Shadow for Dimensional Depth */}
            <filter id={`textShadow_${mode}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#000000" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* ───────────────────────────────────────────────────────── */}
          {/* A. TOP EYEBROW: THE GRAVITY OF UCI                        */}
          {/* ───────────────────────────────────────────────────────── */}
          <g
            ref={eyebrowRef}
            transform="translate(480, 50)"
            textAnchor="middle"
            style={{ opacity: isCompleted ? 1 : 0 }}
          >
            <text
              fontFamily="'Cinzel', serif"
              fontSize="12"
              fontWeight="600"
              letterSpacing="0.38em"
              fill="#D9B77B"
              opacity="0.95"
            >
              ⋆ &nbsp; ☾ &nbsp; ⋆ &nbsp; THE GRAVITY OF UCI &nbsp; ⋆ &nbsp; ☽ &nbsp; ⋆
            </text>
            <text
              y="18"
              fontFamily="'Cormorant Garamond', serif"
              fontSize="11"
              fontStyle="italic"
              letterSpacing="0.22em"
              fill="#F8E6A0"
              opacity="0.8"
            >
              the final chapter
            </text>
          </g>

          {/* ───────────────────────────────────────────────────────── */}
          {/* B. CELESTIAL BACKGROUND PERSPECTIVE ORBIT (Saturn Ring)   */}
          {/* Frames composition without cutting through words         */}
          {/* ───────────────────────────────────────────────────────── */}
          <path
            ref={pathSaturnRingRef}
            d="M 120 290 C 200 170, 760 170, 840 290 C 760 410, 200 410, 120 290"
            fill="none"
            stroke={`url(#luxuryGoldGrad_${mode})`}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            style={{ opacity: isCompleted ? 0.45 : 0 }}
          />

          {/* ───────────────────────────────────────────────────────── */}
          {/* C. GRAND CELESTIAL HEART RIBBON (Encloses the words)      */}
          {/* ───────────────────────────────────────────────────────── */}
          {/* Outer Soft Starlight Halo */}
          <path
            ref={pathHeartHaloRef}
            d="M 480 435 C 415 375, 185 275, 185 155 C 185 75, 290 55, 400 98 C 450 118, 475 148, 480 168 C 485 148, 510 118, 560 98 C 670 55, 775 75, 775 155 C 775 275, 545 375, 480 435 Z"
            fill="none"
            stroke={`url(#heartRibbonGrad_${mode})`}
            strokeWidth="5"
            filter={`url(#goldBloom_${mode})`}
            style={{ opacity: isCompleted ? 0.35 : 0 }}
          />
          {/* Sharp Incandescent Golden Core */}
          <path
            ref={pathHeartCoreRef}
            d="M 480 435 C 415 375, 185 275, 185 155 C 185 75, 290 55, 400 98 C 450 118, 475 148, 480 168 C 485 148, 510 118, 560 98 C 670 55, 775 75, 775 155 C 775 275, 545 375, 480 435 Z"
            fill="none"
            stroke={`url(#luxuryGoldGrad_${mode})`}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#goldBloom_${mode})`}
            style={{ opacity: isCompleted ? 1 : 0 }}
          />

          {/* ───────────────────────────────────────────────────────── */}
          {/* D. MASTER CALLIGRAPHIC TYPOGRAPHY                         */}
          {/* Pure, recognizable typography matching Image 1 perfectly  */}
          {/* ───────────────────────────────────────────────────────── */}
          <g filter={`url(#textShadow_${mode})`}>
            {/* Word: 'I' */}
            <g
              ref={wordIRef}
              style={{ opacity: isCompleted ? 1 : 0 }}
            >
              <text
                x="265"
                y="215"
                textAnchor="middle"
                fontFamily="'Alex Brush', cursive"
                fontSize="112"
                fill={`url(#luxuryGoldGrad_${mode})`}
                filter={`url(#goldBloom_${mode})`}
              >
                I
              </text>
            </g>

            {/* Word: 'Love' */}
            <g
              ref={wordLoveRef}
              style={{ opacity: isCompleted ? 1 : 0 }}
            >
              <text
                x="410"
                y="215"
                textAnchor="middle"
                fontFamily="'Alex Brush', cursive"
                fontSize="112"
                fill={`url(#luxuryGoldGrad_${mode})`}
                filter={`url(#goldBloom_${mode})`}
              >
                Love
              </text>
            </g>

            {/* Word: 'You,' */}
            <g
              ref={wordYouRef}
              style={{ opacity: isCompleted ? 1 : 0 }}
            >
              <text
                x="605"
                y="215"
                textAnchor="middle"
                fontFamily="'Alex Brush', cursive"
                fontSize="112"
                fill={`url(#luxuryGoldGrad_${mode})`}
                filter={`url(#goldBloom_${mode})`}
              >
                You,
              </text>
            </g>

            {/* Word: 'Uci' Personal Signature */}
            <g
              ref={wordUciRef}
              style={{ opacity: isCompleted ? 1 : 0 }}
            >
              <text
                x="490"
                y="330"
                textAnchor="middle"
                fontFamily="'Alex Brush', cursive"
                fontSize="130"
                fill={`url(#luxuryGoldGrad_${mode})`}
                filter={`url(#goldBloom_${mode})`}
                letterSpacing="0.02em"
              >
                Uci
              </text>
            </g>
          </g>

          {/* ───────────────────────────────────────────────────────── */}
          {/* E. LUMINOUS FACETED CRYSTAL HEART JEWEL AT BOTTOM VERTEX  */}
          {/* ───────────────────────────────────────────────────────── */}
          <g
            ref={crystalJewelRef}
            transform="translate(480, 435)"
            style={{ opacity: isCompleted ? 1 : 0 }}
          >
            {/* Golden Flare Glow */}
            <circle
              cx="0"
              cy="0"
              r="24"
              fill="#FDE047"
              opacity="0.32"
              filter={`url(#goldBloom_${mode})`}
            />
            {/* 4-point golden light rays */}
            <line x1="-32" y1="0" x2="32" y2="0" stroke="#FFF" strokeWidth="0.9" opacity="0.85" />
            <line x1="0" y1="-32" x2="0" y2="32" stroke="#FFF" strokeWidth="0.9" opacity="0.85" />
            <line x1="-16" y1="-16" x2="16" y2="16" stroke="#FDE68A" strokeWidth="0.6" opacity="0.6" />
            <line x1="-16" y1="16" x2="16" y2="-16" stroke="#FDE68A" strokeWidth="0.6" opacity="0.6" />
            {/* Heart Facet Body */}
            <path
              d="M 0 16 C -12 6, -20 -4, -20 -12 C -20 -20, -10 -24, 0 -18 C 10 -24, 20 -20, 20 -12 C 20 -4, 12 6, 0 16 Z"
              fill={`url(#crystalGemGrad_${mode})`}
              stroke="#FFFDF7"
              strokeWidth="1.5"
              filter={`url(#goldBloom_${mode})`}
            />
            {/* Diamond Facet Cut Lines */}
            <path
              d="M 0 -18 L 0 8 M -10 -8 L 0 0 L 10 -8 M -16 -12 L 0 -18 L 16 -12 M -10 -8 L 0 16 L 10 -8"
              stroke="#FFFFFF"
              strokeWidth="0.9"
              opacity="0.9"
              fill="none"
            />
          </g>

          {/* ───────────────────────────────────────────────────────── */}
          {/* F. DELICATE GOLDEN WINGED FLOURISH UNDER JEWEL            */}
          {/* ───────────────────────────────────────────────────────── */}
          <g
            transform="translate(480, 470)"
            textAnchor="middle"
            style={{ opacity: isCompleted ? 1 : 0 }}
          >
            {/* Delicate Golden Divider Lines ── ʚ♡ɞ ── */}
            <path
              d="M -50 0 L -18 0 M 18 0 L 50 0"
              stroke="#D9B77B"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* Small Winged Heart */}
            <path
              d="M 0 4 C -3 1, -6 -1, -6 -4 C -6 -7, -3 -8, 0 -6 C 3 -8, 6 -7, 6 -4 C 6 -1, 3 1, 0 4 Z"
              fill="#F43F5E"
              stroke="#FDE68A"
              strokeWidth="0.6"
            />
            <path
              d="M -6 -4 C -10 -6, -14 -4, -16 -2 M 6 -4 C 10 -6, 14 -4, 16 -2"
              stroke="#D9B77B"
              strokeWidth="0.8"
              fill="none"
              opacity="0.8"
            />
          </g>
        </svg>
      </div>

      {/* Supporting Subtitle: Today, Tomorrow. Always. */}
      <div
        ref={subtitleRef}
        className={`flex flex-col items-center gap-1 transition-opacity duration-700 pointer-events-none ${
          isIntro ? '-mt-2 sm:-mt-4 mb-2' : '-mt-1 mb-1'
        } ${isCompleted ? 'opacity-100' : 'opacity-0'}`}
      >
        <span
          className={`font-serif tracking-[0.32em] uppercase text-[#F8E6A0] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] ${
            isIntro ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
          }`}
          style={{ fontFamily: '"Cinzel", "Cormorant Garamond", serif' }}
        >
          Today, Tomorrow. Always.
        </span>
      </div>
    </div>
  );
};
