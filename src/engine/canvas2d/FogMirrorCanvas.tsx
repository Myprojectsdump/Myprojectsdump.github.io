// src/engine/canvas2d/FogMirrorCanvas.tsx

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { STORY_DATA } from '../../config/storyContent';
import { proceduralAudio } from '../audio/ProceduralAudio';

interface FogMirrorCanvasProps {
  selectedTool: 'handkerchief' | 'silk' | 'feather' | 'finger';
}

const COLS = 40;
const ROWS = 25;

// Perfectly spaced SYG notes safely contained within the mirror glass
export const MIRROR_NOTES = [
  {
    id: 1,
    x: 30,
    y: 30,
    headline: 'Even through a screen, you leave me breathless... ♡',
    subtext: 'Seriously, how am I supposed to focus when your camera turns on?',
    accent: '♡',
  },
  {
    id: 2,
    x: 50,
    y: 48,
    lines: ['I still', 'get weak', 'for you... ♡'],
    subtext: 'Every single time I hear your voice on the line.',
    kiss: true,
  },
  {
    id: 3,
    x: 30,
    y: 70,
    headline: 'Counting down to our first real hug ♥',
    subtext: 'The day the screen between us finally disappears.',
    accent: '♥',
  },
  {
    id: 4,
    x: 70,
    y: 70,
    headline: 'Stay on the call with me, cintaku... ✨',
    subtext: "'Five more minutes' never meant just five minutes with you.",
    accent: '✨',
  },
  {
    id: 5,
    x: 70,
    y: 30,
    headline: 'Worth every mile between us. ♥',
    subtext: 'Still my favourite view on every late-night call... 💋',
    kiss: true,
  },
];

export const FogMirrorCanvas: React.FC<FogMirrorCanvasProps> = ({
  selectedTool,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isWiping = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const grid = useRef<boolean[]>(new Array(COLS * ROWS).fill(false));
  const [mirrorPhotoError, setMirrorPhotoError] = useState(false);

  const discoverMirrorNote = useExperienceStore((state) => state.discoverMirrorNote);
  const setMirrorClearedPercent = useExperienceStore((state) => state.setMirrorClearedPercent);
  const mirrorRefogNonce = useExperienceStore((state) => state.mirrorRefogNonce);

  // ─── DRAW 100% SOLID OPAQUE CONDENSATION STEAM OVER THE MIRROR ───
  const drawFog = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // 1. 100% Solid Opaque Steamy Bathroom Condensation (Zero transparency so no text peeks through)
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#EAE1D2');
    grad.addColorStop(0.25, '#E2D5C2');
    grad.addColorStop(0.55, '#DDD0BD');
    grad.addColorStop(0.85, '#E5D8C6');
    grad.addColorStop(1, '#ECE2D4');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Warm Candlelight Reflection Bloom on Bottom Half of Fog
    const candleBloom = ctx.createRadialGradient(
      width * 0.5,
      height * 0.92,
      10 * dpr,
      width * 0.5,
      height * 0.92,
      width * 0.48
    );
    candleBloom.addColorStop(0, 'rgba(253, 230, 138, 0.45)');
    candleBloom.addColorStop(0.4, 'rgba(245, 158, 11, 0.20)');
    candleBloom.addColorStop(0.8, 'rgba(217, 174, 80, 0.06)');
    candleBloom.addColorStop(1, 'rgba(217, 174, 80, 0.0)');
    ctx.fillStyle = candleBloom;
    ctx.fillRect(0, 0, width, height);

    // 3. Dense Micro-Condensation Texture & Water Droplets
    ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
    for (let i = 0; i < 1200; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rr = (Math.random() * 2.2 + 0.4) * dpr;
      ctx.beginPath();
      ctx.arc(rx, ry, rr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Vertical Condensation Trickle Streaks (Moisture running down glass)
    ctx.strokeStyle = 'rgba(255, 252, 245, 0.30)';
    ctx.lineWidth = 1.4 * dpr;
    for (let i = 0; i < 22; i++) {
      const sx = (i / 22) * width + (Math.random() * 30 - 15) * dpr;
      const sy = Math.random() * (height * 0.25);
      const sLen = Math.random() * (height * 0.55) + height * 0.25;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(
        sx + Math.sin(i) * 7 * dpr,
        sy + sLen * 0.35,
        sx - Math.cos(i) * 6 * dpr,
        sy + sLen * 0.7,
        sx + 2 * dpr,
        sy + sLen
      );
      ctx.stroke();
    }

    // 5. Delicate Finger-Traced Heart Outline in the Steam (Per Reference Image)
    ctx.save();
    ctx.strokeStyle = 'rgba(168, 138, 108, 0.60)';
    ctx.lineWidth = Math.max(3, 4.5 * dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(120, 90, 60, 0.40)';
    ctx.shadowBlur = 4 * dpr;

    const hx = width * 0.72;
    const hy = height * 0.48;
    const hr = Math.min(width, height) * 0.12;

    ctx.beginPath();
    ctx.moveTo(hx, hy + hr * 0.65);
    ctx.bezierCurveTo(
      hx - hr * 1.15,
      hy - hr * 0.25,
      hx - hr * 1.1,
      hy - hr * 1.1,
      hx,
      hy - hr * 0.45
    );
    ctx.bezierCurveTo(
      hx + hr * 1.1,
      hy - hr * 1.1,
      hx + hr * 1.15,
      hy - hr * 0.25,
      hx,
      hy + hr * 0.65
    );
    ctx.stroke();
    ctx.restore();

    ctx.restore();
    grid.current.fill(false);
    setMirrorClearedPercent(0);
  }, [setMirrorClearedPercent]);

  // Handle high-DPI resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFog();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFog]);

  // Listen to refog trigger
  useEffect(() => {
    if (mirrorRefogNonce > 0) {
      drawFog();
    }
  }, [mirrorRefogNonce, drawFog]);

  // Calculate local note clearance and trigger unlock
  const checkNoteClearances = useCallback(() => {
    const currentDiscovered = useExperienceStore.getState().discoveredMirrorNoteIds;

    MIRROR_NOTES.forEach((note) => {
      if (currentDiscovered.includes(note.id)) return;

      const normX = note.x / 100;
      const normY = note.y / 100;
      const boxSize = 0.12; // 12% radius

      const minCol = Math.max(0, Math.floor((normX - boxSize) * COLS));
      const maxCol = Math.min(COLS - 1, Math.floor((normX + boxSize) * COLS));
      const minRow = Math.max(0, Math.floor((normY - boxSize) * ROWS));
      const maxRow = Math.min(ROWS - 1, Math.floor((normY + boxSize) * ROWS));

      let cleared = 0;
      let total = 0;

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          total++;
          if (grid.current[r * COLS + c]) {
            cleared++;
          }
        }
      }

      const percent = total > 0 ? (cleared / total) * 100 : 0;
      if (percent >= 35) {
        discoverMirrorNote(note.id);
        proceduralAudio.playMirrorNoteChime();
      }
    });

    // Compute total mirror clearance
    let totalCleared = 0;
    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i]) totalCleared++;
    }
    const globalPercent = Math.round((totalCleared / grid.current.length) * 100);
    setMirrorClearedPercent(globalPercent);
  }, [discoverMirrorNote, setMirrorClearedPercent]);

  // Erase circular feathered dab with soft cloth/finger texture
  const eraseDab = (canvasX: number, canvasY: number, brushRadius: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    const grad = ctx.createRadialGradient(
      canvasX,
      canvasY,
      brushRadius * 0.22,
      canvasX,
      canvasY,
      brushRadius
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 1.0)');
    grad.addColorStop(0.68, 'rgba(0, 0, 0, 0.92)');
    grad.addColorStop(0.88, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const wipeAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasX = x * dpr;
    const canvasY = y * dpr;

    // Brush radius by selected tool
    let baseRadius = 45;
    if (selectedTool === 'handkerchief') baseRadius = 58;
    else if (selectedTool === 'silk') baseRadius = 50;
    else if (selectedTool === 'feather') baseRadius = 38;
    else if (selectedTool === 'finger') baseRadius = 44;

    const brushRadius = baseRadius * dpr;

    // Interpolate between lastPoint and currentPoint for silky-smooth continuous strokes
    if (lastPoint.current) {
      const dx = canvasX - lastPoint.current.x;
      const dy = canvasY - lastPoint.current.y;
      const dist = Math.hypot(dx, dy);
      const step = brushRadius * 0.3;

      if (dist > step) {
        const count = Math.ceil(dist / step);
        for (let i = 1; i <= count; i++) {
          const ix = lastPoint.current.x + (dx * i) / count;
          const iy = lastPoint.current.y + (dy * i) / count;
          eraseDab(ix, iy, brushRadius);
        }
      } else {
        eraseDab(canvasX, canvasY, brushRadius);
      }
    } else {
      eraseDab(canvasX, canvasY, brushRadius);
    }

    lastPoint.current = { x: canvasX, y: canvasY };

    // Update grid state
    const normX = x / rect.width;
    const normY = y / rect.height;
    const radiusNormX = baseRadius / rect.width;
    const radiusNormY = baseRadius / rect.height;

    const minC = Math.max(0, Math.floor((normX - radiusNormX) * COLS));
    const maxC = Math.min(COLS - 1, Math.ceil((normX + radiusNormX) * COLS));
    const minR = Math.max(0, Math.floor((normY - radiusNormY) * ROWS));
    const maxR = Math.min(ROWS - 1, Math.ceil((normY + radiusNormY) * ROWS));

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        grid.current[r * COLS + c] = true;
      }
    }

    checkNoteClearances();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isWiping.current = true;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      lastPoint.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    }
    wipeAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isWiping.current) return;
    wipeAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isWiping.current = false;
    lastPoint.current = null;
  };

  return (
    <div className="relative w-full h-full select-none">
      {/* ─── LAYER 1: DARK REFLECTIVE ANTIQUE MIRROR GLASS, UCI PHOTO REFLECTION & GLOWING SECRET MESSAGES ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140804] via-[#241007] to-[#0E0502] p-6 sm:p-10 pointer-events-none overflow-hidden">
        {/* Uci Mirror Reflection Photograph underneath the steamy glass (emerges as steam is wiped) */}
        {!mirrorPhotoError && (
          <img
            src={STORY_DATA.photos.mirror.path}
            alt={STORY_DATA.photos.mirror.alt}
            loading="lazy"
            onError={() => setMirrorPhotoError(true)}
            style={{ objectPosition: STORY_DATA.photos.mirror.objectPosition || 'center 25%' }}
            className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-screen filter contrast-105 brightness-95 pointer-events-none"
          />
        )}

        {/* Soft Candlelight Caustic Glow & Room Depth Reflection */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(245,158,11,0.22)_0%,rgba(113,61,69,0.12)_45%,transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(253,230,138,0.15)_0%,transparent_50%)] pointer-events-none" />

        {/* 5 Steamy Mirror Notes (Safely placed in inner quadrants so they never touch the frame) */}
        {MIRROR_NOTES.map((note) => {
          return (
            <div
              key={note.id}
              style={{
                position: 'absolute',
                left: `${note.x}%`,
                top: `${note.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="flex flex-col text-center pointer-events-none select-none px-2"
            >
              {/* Note 2 Centerpiece (Matching Reference Image "I still get weak for you... ♡") */}
              {note.id === 2 ? (
                <div className="flex flex-col items-center max-w-[280px] sm:max-w-[340px]">
                  {note.lines?.map((line, idx) => (
                    <span
                      key={idx}
                      className="font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl text-[#FFFDF5] leading-tight tracking-wide drop-shadow-[0_2px_14px_rgba(253,230,138,0.95)]"
                    >
                      {line}
                    </span>
                  ))}
                  <span className="font-serif italic text-xs sm:text-sm text-[#FDE68A]/90 mt-1 leading-snug drop-shadow-[0_1px_8px_rgba(217,174,80,0.8)]">
                    {note.subtext}
                  </span>
                  <div className="mt-1 text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_rgba(225,29,72,0.9)] transform -rotate-12">
                    💋
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center max-w-[200px] sm:max-w-[240px]">
                  {/* Headline */}
                  <span className="font-serif italic font-medium text-sm sm:text-base md:text-lg text-[#FFFDF5] leading-tight drop-shadow-[0_2px_12px_rgba(253,230,138,0.95)]">
                    {note.headline}
                  </span>

                  {/* Teasing Subtext Whisper */}
                  <span className="font-serif italic text-[10px] sm:text-xs text-[#FDE68A]/90 mt-1 leading-snug drop-shadow-[0_1px_6px_rgba(217,174,80,0.8)]">
                    {note.subtext}
                  </span>

                  {/* Sensual Accents */}
                  {note.kiss && (
                    <div className="mt-1 text-lg sm:text-xl filter drop-shadow-[0_0_10px_rgba(225,29,72,0.85)]">
                      💋
                    </div>
                  )}
                  {note.accent && !note.kiss && (
                    <span className="text-[#E9C46A] font-serif text-xs mt-0.5 drop-shadow">
                      {note.accent}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── LAYER 2: 100% SOLID OPAQUE CONDENSATION CANVAS (ERASED WITH DESTINATION-OUT) ─── */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
      />
    </div>
  );
};
