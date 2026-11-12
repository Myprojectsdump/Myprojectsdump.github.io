// src/engine/canvas2d/FoilScratchCanvas.tsx

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Heart, Lock, RotateCcw, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { ScratchCardData } from '../../types/story.types';
import { SUPPLEMENTARY_REDEMPTION_GUIDANCE } from '../../config/storyContent';

const SCRATCH_COLS = 36;
const SCRATCH_ROWS = 24;

interface FoilScratchCanvasProps {
  card: ScratchCardData;
  isAdultConsentConfirmed?: boolean;
  onConfirmAdultConsent?: () => void;
}

export const FoilScratchCanvas: React.FC<FoilScratchCanvasProps> = ({
  card,
  isAdultConsentConfirmed = true,
  onConfirmAdultConsent,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
  const grid = useRef<boolean[]>(new Array(SCRATCH_COLS * SCRATCH_ROWS).fill(false));

  const [isFullyDissolved, setIsFullyDissolved] = useState(false);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);

  const revealedScratchIds = useExperienceStore((state) => state.revealedScratchIds);
  const savedScratchIds = useExperienceStore((state) => state.savedScratchIds);
  const revealScratchCard = useExperienceStore((state) => state.revealScratchCard);
  const refoilScratchCard = useExperienceStore((state) => state.refoilScratchCard);
  const toggleSaveScratchCard = useExperienceStore((state) => state.toggleSaveScratchCard);

  const isRevealed = revealedScratchIds.includes(card.id);
  const isSaved = savedScratchIds.includes(card.id);
  const guidance = SUPPLEMENTARY_REDEMPTION_GUIDANCE[card.id];
  const needsConsentGate = Boolean(card.requiresAdultConsent) && !isAdultConsentConfirmed;

  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // 1. Brushed Royal Gold Leaf Gradient (Matching Reference)
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E6BE5A');
    grad.addColorStop(0.2, '#FDF2B8');
    grad.addColorStop(0.45, '#D4973B');
    grad.addColorStop(0.7, '#FDE68A');
    grad.addColorStop(0.9, '#C98B28');
    grad.addColorStop(1, '#E6BE5A');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Micro-Brushed Metallic Striations
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1;
    for (let i = 0; i < height; i += 3) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // 3. Ornate Double Gold Border Framing
    ctx.strokeStyle = 'rgba(92, 53, 11, 0.55)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = 'rgba(255, 253, 245, 0.5)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(15, 15, width - 30, height - 30);

    // Corner Filigree Accents
    const cornerSize = 12;
    const drawCorner = (x: number, y: number, dx: number, dy: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + dy * cornerSize);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx * cornerSize, y);
      ctx.stroke();
    };
    drawCorner(15, 15, 1, 1);
    drawCorner(width - 15, 15, -1, 1);
    drawCorner(15, height - 15, 1, -1);
    drawCorner(width - 15, height - 15, -1, -1);

    // 4. Center Engraved Ribbon Bow Motif
    const midX = width / 2;
    const midY = height / 2;

    ctx.fillStyle = 'rgba(92, 53, 11, 0.65)';
    ctx.strokeStyle = 'rgba(92, 53, 11, 0.7)';
    ctx.lineWidth = 1.8;

    // Bow knot & loops
    ctx.beginPath();
    ctx.arc(midX - 16, midY - 32, 10, 0, Math.PI * 2);
    ctx.arc(midX + 16, midY - 32, 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(midX, midY - 32, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Bow ribbons trailing down
    ctx.beginPath();
    ctx.moveTo(midX - 3, midY - 28);
    ctx.quadraticCurveTo(midX - 12, midY - 18, midX - 22, midY - 14);
    ctx.moveTo(midX + 3, midY - 28);
    ctx.quadraticCurveTo(midX + 12, midY - 18, midX + 22, midY - 14);
    ctx.stroke();

    // 5. Embossed Text: "— SCRATCH TO REVEAL —"
    ctx.fillStyle = 'rgba(84, 46, 8, 0.85)';
    ctx.font = 'bold 13px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('—  SCRATCH TO REVEAL  —', midX, midY + 4);

    // 6. Laurel Heart Motif Beneath Text
    ctx.font = '14px serif';
    ctx.fillText('♥', midX, midY + 28);

    // Laurel branch lines
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(midX - 16, midY + 28, 9, 0.5 * Math.PI, 1.8 * Math.PI, false);
    ctx.arc(midX + 16, midY + 28, 9, 1.2 * Math.PI, 0.5 * Math.PI, false);
    ctx.stroke();

    ctx.restore();
    grid.current.fill(false);
  }, []);

  useEffect(() => {
    if (isRevealed && !needsConsentGate) {
      setIsFullyDissolved(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFoil();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFoil, isRevealed, needsConsentGate]);

  const checkScratchPercentage = useCallback(() => {
    let cleared = 0;
    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i]) cleared++;
    }
    const percent = (cleared / grid.current.length) * 100;

    if (percent >= 45 && !isRevealed) {
      revealScratchCard(card.id);
      setIsFullyDissolved(true);
    }
  }, [card.id, isRevealed, revealScratchCard]);

  const scratchAt = (clientX: number, clientY: number) => {
    if (needsConsentGate) {
      setShowConsentPrompt(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || isFullyDissolved) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasX = x * dpr;
    const canvasY = y * dpr;
    const brushRadius = 32 * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Mark grid
    const normX = x / rect.width;
    const normY = y / rect.height;
    const rNorm = 32 / rect.width;

    const minC = Math.max(0, Math.floor((normX - rNorm) * SCRATCH_COLS));
    const maxC = Math.min(SCRATCH_COLS - 1, Math.ceil((normX + rNorm) * SCRATCH_COLS));
    const minR = Math.max(0, Math.floor((normY - rNorm) * SCRATCH_ROWS));
    const maxR = Math.min(SCRATCH_ROWS - 1, Math.ceil((normY + rNorm) * SCRATCH_ROWS));

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        const dc = (c - normX * SCRATCH_COLS) / (rNorm * SCRATCH_COLS);
        const dr = (r - normY * SCRATCH_ROWS) / (rNorm * SCRATCH_ROWS);
        if (dc * dc + dr * dr <= 1.0) {
          grid.current[r * SCRATCH_COLS + c] = true;
        }
      }
    }

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (needsConsentGate) {
      setShowConsentPrompt(true);
      return;
    }
    isScratching.current = true;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching.current || needsConsentGate) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isScratching.current = false;
  };

  const handleManualReveal = () => {
    if (needsConsentGate) {
      setShowConsentPrompt(true);
      return;
    }
    revealScratchCard(card.id);
    setIsFullyDissolved(true);
  };

  const handleConfirmConsentAndUnlock = () => {
    setShowConsentPrompt(false);
    if (onConfirmAdultConsent) {
      onConfirmAdultConsent();
    }
  };

  const handleRefoil = () => {
    refoilScratchCard(card.id);
    setIsFullyDissolved(false);
    setTimeout(() => {
      drawFoil();
    }, 50);
  };

  return (
    <div className="relative w-full min-h-[220px] sm:min-h-[240px] rounded-2xl overflow-hidden bg-[#1A0C06]/85 border border-[#D9AE50]/70 shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col justify-between p-5 select-none transition-all duration-300 backdrop-blur-md">
      {/* Secret Card Underlying Content (Protected by 18+ Consent Gate until confirmed) */}
      <div
        className={`flex flex-col gap-2 relative z-0 transition-all duration-300 ${
          needsConsentGate ? 'blur-md select-none pointer-events-none opacity-40' : ''
        }`}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#D9AE50]/20">
          <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-[#702B42]/60 text-[#FDA4AF] border border-[#FDA4AF]/30 uppercase font-semibold">
            {card.tag}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F8E6A0]/80">
            <Sparkles className="w-3 h-3 text-[#E9C46A]" />
            <span>PROMISE REVEALED</span>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-1">
          {card.photoPath && (
            <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden border border-[#D9AE50]/60 shrink-0 shadow-md bg-[#2C1810]">
              <img
                src={card.photoPath}
                alt={card.imageAltText || card.secretTitle}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-base sm:text-lg font-serif italic text-[#FFFDF5] font-normal leading-snug drop-shadow">
              {card.secretTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#F8E6A0]/90 font-sans leading-relaxed mt-1">
              "{card.secretBody}"
            </p>
          </div>
        </div>

        {/* Supplementary Redemption Guidance */}
        {guidance && (
          <div className="mt-2 pt-2 border-t border-[#D9AE50]/20 flex flex-col gap-0.5">
            <span className="text-[10px] font-mono text-[#E9C46A] font-semibold">
              📍 {guidance.badgeLabel}
            </span>
            <span className="text-[10px] text-[#FFFDF5]/70 leading-tight">
              {guidance.guidanceNote}
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#D9AE50]/20 mt-3 relative z-0">
        <button
          onClick={() => toggleSaveScratchCard(card.id)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
            isSaved
              ? 'bg-[#E11D48]/30 text-[#FDA4AF] border border-[#FDA4AF]/50 font-bold'
              : 'text-[#F8E6A0]/70 hover:text-[#FFFDF5] hover:bg-white/10'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#E11D48]' : ''}`} />
          <span>{isSaved ? 'Promise Kept ♥' : 'Save Promise ♥'}</span>
        </button>

        {isRevealed && !needsConsentGate && (
          <button
            onClick={handleRefoil}
            className="flex items-center gap-1 text-[10px] font-mono text-[#F8E6A0]/60 hover:text-[#FFFDF5] cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Re-foil Card</span>
          </button>
        )}
      </div>

      {/* Gold Foil Scratch Canvas Layer */}
      {(!isFullyDissolved || needsConsentGate) && (
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10 rounded-2xl shadow-inner"
        />
      )}

      {/* 18+ Confirmation Gate Modal Overlay on Card when triggered */}
      {needsConsentGate && showConsentPrompt && (
        <div
          data-testid={`adult-consent-gate-${card.id}`}
          className="absolute inset-0 z-30 bg-[#0D0609]/95 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center gap-2.5 rounded-2xl border border-[#E11D48]/50"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#881337]/60 border border-[#FDA4AF]/40 text-[10px] font-mono uppercase tracking-widest text-[#FECDD3]">
            <Lock className="w-3 h-3 text-[#FDA4AF]" />
            <span>18+</span>
          </div>
          <p className="font-serif italic text-sm text-[#FFFDF5] max-w-xs leading-snug">
            Private After-Hours Confession for Uci. Just for you, my naughty girl!
          </p>
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={handleConfirmConsentAndUnlock}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#4A3004] font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(233,196,106,0.5)] cursor-pointer"
            >
              I submit to you 🔥
            </button>
            <button
              type="button"
              onClick={() => setShowConsentPrompt(false)}
              className="px-3 py-1.5 rounded-full border border-[#D9AE50]/40 bg-[#1A0C06]/80 text-[#F8E6A0]/80 font-mono text-[10px] uppercase tracking-wider cursor-pointer"
            >
              Keep Sealed
            </button>
          </div>
        </div>
      )}

      {/* Accessible One-Click Reveal Button */}
      {(!isFullyDissolved || needsConsentGate) && !showConsentPrompt && (
        <button
          onClick={handleManualReveal}
          aria-label={`Reveal promise: ${card.secretTitle}`}
          className="absolute bottom-2.5 right-2.5 z-20 text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1A0C06]/90 text-[#F8E6A0] hover:text-[#FFFDF5] border border-[#D9AE50]/60 backdrop-blur-md shadow cursor-pointer"
        >
          {needsConsentGate ? '18+ · Unlock to Scratch' : 'Reveal This Promise'}
        </button>
      )}
    </div>
  );
};
