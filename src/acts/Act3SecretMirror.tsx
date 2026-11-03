// src/acts/Act3SecretMirror.tsx

import React, { useState, useEffect } from 'react';
import { useExperienceStore } from '../store/useExperienceStore';
import { FogMirrorCanvas, MIRROR_NOTES } from '../engine/canvas2d/FogMirrorCanvas';
import {
  Sparkles,
  RotateCcw,
  ArrowRight,
  Check,
  Lock,
  MousePointer,
  Hand,
} from 'lucide-react';

// Seductive teaser titles that ONLY populate AFTER the note is explored on the mirror
const NOTE_TEASERS = [
  { id: 1, title: 'For My Uci ♡', mysteryLabel: 'Secret Thought #01' },
  { id: 2, title: 'The Way You Tease Me...', mysteryLabel: 'Secret Thought #02' },
  { id: 3, title: 'What I Crave...', mysteryLabel: 'Secret Thought #03' },
  { id: 4, title: 'Our Little Fantasies...', mysteryLabel: 'Secret Thought #04' },
  { id: 5, title: 'Tonight, Maybe...? ♡', mysteryLabel: 'Secret Thought #05' },
];

export const Act3SecretMirror: React.FC = () => {
  const discoveredNotes = useExperienceStore((state) => state.discoveredMirrorNoteIds);
  const discoverMirrorNote = useExperienceStore((state) => state.discoverMirrorNote);
  const refogMirror = useExperienceStore((state) => state.refogMirror);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  // Wiping tool selection state
  const [selectedTool, setSelectedTool] = useState<'handkerchief' | 'silk' | 'feather' | 'finger'>('handkerchief');
  const [isHoldingTool, setIsHoldingTool] = useState(true);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [isPointerInsideMirror, setIsPointerInsideMirror] = useState(false);

  const isComplete = discoveredNotes.length >= 5;

  // Track cursor position for desktop tool follower
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPointerPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const handleToolSelect = (tool: 'handkerchief' | 'silk' | 'feather' | 'finger') => {
    setSelectedTool(tool);
    setIsHoldingTool(true);
  };

  const handleAccessibleWipeNext = () => {
    const nextNote = MIRROR_NOTES.find((n) => !discoveredNotes.includes(n.id));
    if (nextNote) {
      discoverMirrorNote(nextNote.id);
    }
  };

  const handleStepThrough = () => {
    setCurrentChapter('ACT_4');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-3 sm:px-6 lg:px-8 pt-10 sm:pt-4 pb-12 lg:pb-3 select-none overflow-x-hidden">
      {/* ─── LAYER 1: TOP NARRATIVE HEADER ─── */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto animate-in fade-in duration-700">
        {/* Chapter Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D9AE50]/70 bg-[#FFF9EA]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(217,174,80,0.25)] mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E9B85B] shadow-[0_0_8px_#F8E6A0]" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#8B5E0A] font-bold">
            ACT III · THE SECRET MIRROR
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-serif italic text-[#FFFDF5] font-normal tracking-tight leading-tight mb-1 drop-shadow-[0_2px_18px_rgba(74,48,4,0.95)]">
          The Secret Mirror
        </h2>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm md:text-base text-[#F8E6A0]/95 font-serif italic max-w-xl mx-auto leading-relaxed mb-0.5 drop-shadow-md">
          Some thoughts are too personal to say out loud... so I left them for you, here.
        </p>

        {/* Interaction Introduction */}
        <p className="text-[11px] sm:text-xs font-mono tracking-wider text-[#E9C46A]/90 drop-shadow-sm">
          There are five little things waiting beneath the steam.
        </p>
      </div>

      {/* ─── LAYER 2: MAIN SCENE CONTAINER (Vanity Tool Tray, Grand Antique Rococo Mirror, Progress Card) ─── */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-5 px-1 py-1">
        {/* LEFT: DESKTOP VANITY TRAY (Tools to Clean the Mirror) */}
        <div className="hidden lg:flex flex-col w-52 p-3.5 rounded-2xl bg-[#1A0C06]/45 border border-[#D9AE50]/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] select-none shrink-0">
          <div className="text-center pb-2.5 border-b border-[#D9AE50]/20 mb-2.5">
            <span className="text-xs font-serif italic text-[#FFFDF5] font-medium block">
              Pick Something to
            </span>
            <span className="text-[11px] font-serif italic text-[#F8E6A0] font-bold block">
              Clean the Mirror ♡
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Tool 1: Soft Towel (Linen cloth) */}
            <button
              onClick={() => handleToolSelect('handkerchief')}
              className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all text-left cursor-pointer group ${
                selectedTool === 'handkerchief' && isHoldingTool
                  ? 'border-[#F8E6A0] bg-[#FFF9EA]/30 shadow-[0_0_20px_rgba(248,230,160,0.4)] ring-1 ring-[#F8E6A0]'
                  : 'border-[#D9AE50]/30 hover:border-[#E9C46A]/70 hover:bg-[#FFF9EA]/15 bg-[#1A0C06]/35'
              }`}
            >
              <div className="w-10 h-8 rounded-lg bg-[#FFF8EB] border border-[#D9AE50]/60 shadow-sm flex items-center justify-center transform -rotate-2">
                <span className="text-xs text-[#D98B42] font-serif">♥</span>
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#FFFDF5] block group-hover:text-[#F8E6A0] transition-colors">
                  Soft Towel
                </span>
                <span className="text-[9px] font-mono text-[#F8E6A0]/80">
                  Linen cloth
                </span>
              </div>
            </button>

            {/* Tool 2: Silk Cloth (Crimson satin) */}
            <button
              onClick={() => handleToolSelect('silk')}
              className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all text-left cursor-pointer group ${
                selectedTool === 'silk' && isHoldingTool
                  ? 'border-[#F8E6A0] bg-[#FFF9EA]/30 shadow-[0_0_20px_rgba(248,230,160,0.4)] ring-1 ring-[#F8E6A0]'
                  : 'border-[#D9AE50]/30 hover:border-[#E9C46A]/70 hover:bg-[#FFF9EA]/15 bg-[#1A0C06]/35'
              }`}
            >
              <div className="w-10 h-8 rounded-lg bg-gradient-to-br from-[#9F1239] to-[#E11D48] border border-[#D9AE50]/60 shadow-sm flex items-center justify-center transform rotate-2">
                <span className="text-xs text-[#FFFDF5]">🧣</span>
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#FFFDF5] block group-hover:text-[#F8E6A0] transition-colors">
                  Silk Cloth
                </span>
                <span className="text-[9px] font-mono text-[#F8E6A0]/80">
                  Crimson satin
                </span>
              </div>
            </button>

            {/* Tool 3: Feather (Soft touch) */}
            <button
              onClick={() => handleToolSelect('feather')}
              className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all text-left cursor-pointer group ${
                selectedTool === 'feather' && isHoldingTool
                  ? 'border-[#F8E6A0] bg-[#FFF9EA]/30 shadow-[0_0_20px_rgba(248,230,160,0.4)] ring-1 ring-[#F8E6A0]'
                  : 'border-[#D9AE50]/30 hover:border-[#E9C46A]/70 hover:bg-[#FFF9EA]/15 bg-[#1A0C06]/35'
              }`}
            >
              <div className="w-10 h-8 rounded-lg bg-[#2A150A]/70 border border-[#D9AE50]/50 shadow-sm flex items-center justify-center">
                <span className="text-sm transform -rotate-12">🪶</span>
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#FFFDF5] block group-hover:text-[#F8E6A0] transition-colors">
                  Feather
                </span>
                <span className="text-[9px] font-mono text-[#F8E6A0]/80">
                  Soft touch
                </span>
              </div>
            </button>

            {/* Tool 4: Your Finger ♡ (Direct touch) */}
            <button
              onClick={() => handleToolSelect('finger')}
              className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all text-left cursor-pointer group ${
                selectedTool === 'finger' && isHoldingTool
                  ? 'border-[#F8E6A0] bg-[#FFF9EA]/30 shadow-[0_0_20px_rgba(248,230,160,0.4)] ring-1 ring-[#F8E6A0]'
                  : 'border-[#D9AE50]/30 hover:border-[#E9C46A]/70 hover:bg-[#FFF9EA]/15 bg-[#1A0C06]/35'
              }`}
            >
              <div className="w-10 h-8 rounded-lg bg-[#2A150A]/70 border border-[#D9AE50]/50 shadow-sm flex items-center justify-center">
                <Hand className="w-3.5 h-3.5 text-[#FDE68A]" />
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#FFFDF5] block group-hover:text-[#F8E6A0] transition-colors">
                  Your Finger ♡
                </span>
                <span className="text-[9px] font-mono text-[#F8E6A0]/80">
                  Direct touch
                </span>
              </div>
            </button>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#D9AE50]/20 text-center">
            <span className="text-[10px] font-mono text-[#F8E6A0]/70">
              {isHoldingTool ? 'Wipe the mirror glass' : 'Click to pick up tool'}
            </span>
          </div>
        </div>

        {/* CENTER: GRAND ANTIQUE BAROQUE/ROCOCO GOLD MIRROR (Increased size per feedback) */}
        <div
          className="relative flex-1 max-w-5xl lg:max-w-[1020px] w-full flex items-center justify-center p-1 sm:p-2"
          onPointerEnter={() => setIsPointerInsideMirror(true)}
          onPointerLeave={() => setIsPointerInsideMirror(false)}
        >
          {/* SVG Definition for Rococo ClipPath & Gradient Masks */}
          <svg width="0" height="0" className="absolute">
            <defs>
              {/* Normalized 0..1 ClipPath fitting the Arched Rococo Contour */}
              <clipPath id="rococoMirrorClip" clipPathUnits="objectBoundingBox">
                <path d="M 0.500, 0.100 C 0.420, 0.120 0.330, 0.138 0.250, 0.125 C 0.180, 0.112 0.130, 0.128 0.085, 0.178 C 0.055, 0.212 0.050, 0.285 0.052, 0.368 C 0.055, 0.465 0.045, 0.548 0.050, 0.630 C 0.055, 0.730 0.075, 0.812 0.120, 0.860 C 0.210, 0.895 0.350, 0.905 0.500, 0.905 C 0.650, 0.905 0.790, 0.895 0.880, 0.860 C 0.925, 0.812 0.945, 0.730 0.950, 0.630 C 0.955, 0.548 0.945, 0.465 0.948, 0.368 C 0.950, 0.285 0.945, 0.212 0.915, 0.178 C 0.870, 0.128 0.820, 0.112 0.750, 0.125 C 0.670, 0.138 0.580, 0.120 0.500, 0.100 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Antique Baroque Mirror Frame Structure */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.6] max-h-[640px] filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            {/* Mirror Glass Clipped Content */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: 'url(#rococoMirrorClip)' }}
            >
              <FogMirrorCanvas
                selectedTool={selectedTool}
              />
            </div>

            {/* Antique Gold Rococo Frame Decorative Overlay */}
            <svg
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
            >
              <defs>
                <linearGradient id="goldFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9EA" />
                  <stop offset="15%" stopColor="#E9C46A" />
                  <stop offset="35%" stopColor="#C89A43" />
                  <stop offset="60%" stopColor="#8B5E0A" />
                  <stop offset="85%" stopColor="#C89A43" />
                  <stop offset="100%" stopColor="#FFE89E" />
                </linearGradient>

                <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#F8E6A0" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8B5E0A" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Sculpted Outer Antique Baroque Bevel Contour */}
              <path
                d="M 500,32
                   C 420,48 330,60 250,50
                   C 170,40 120,52 75,88
                   C 40,112 35,162 38,218
                   C 42,282 30,342 35,398
                   C 40,462 65,522 115,552
                   C 210,578 350,586 500,586
                   C 650,586 790,578 885,552
                   C 935,522 960,462 965,398
                   C 970,342 958,282 962,218
                   C 965,162 960,112 925,88
                   C 880,52 830,40 750,50
                   C 670,60 580,48 500,32 Z"
                fill="none"
                stroke="url(#goldFrameGrad)"
                strokeWidth="28"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              />

              {/* Inner Fine Gold Beveled Lip */}
              <path
                d="M 500,62
                   C 420,74 330,86 250,78
                   C 180,70 130,80 85,110
                   C 55,131 50,177 52,228
                   C 55,288 45,340 50,391
                   C 55,453 75,503 120,533
                   C 210,555 350,561 500,561
                   C 650,561 790,555 880,533
                   C 925,503 945,453 950,391
                   C 955,340 945,288 948,228
                   C 950,177 945,131 915,110
                   C 870,80 820,70 750,78
                   C 670,86 580,74 500,62 Z"
                fill="none"
                stroke="url(#goldHighlight)"
                strokeWidth="5"
              />

              {/* Rococo Crown Crest on Top Center */}
              <g transform="translate(500, 32) scale(0.95)">
                <path
                  d="M -50,15 C -35,-5 -20,-20 0,-28 C 20,-20 35,-5 50,15 C 30,5 15,2 0,5 C -15,2 -30,5 -50,15 Z"
                  fill="url(#goldFrameGrad)"
                  stroke="#FFF9EA"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="-28" r="4.5" fill="#FFFDF5" stroke="#D9AE50" strokeWidth="1.5" />
                <circle cx="-25" cy="-10" r="3" fill="#FFE89E" />
                <circle cx="25" cy="-10" r="3" fill="#FFE89E" />
              </g>

              {/* Top-Left Ornate Scroll Flourish */}
              <g transform="translate(85, 90) scale(0.85)">
                <path
                  d="M -15,25 C -25,10 -20,-15 0,-15 C 15,-15 20,0 10,15 C 5,20 -5,20 -5,12 C -5,8 0,5 5,5"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth="3.5"
                />
              </g>

              {/* Top-Right Ornate Scroll Flourish */}
              <g transform="translate(915, 90) scale(0.85)">
                <path
                  d="M 15,25 C 25,10 20,-15 0,-15 C -15,-15 -20,0 -10,15 C -5,20 5,20 5,12 C 5,8 0,5 -5,5"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth="3.5"
                />
              </g>

              {/* Bottom-Left Carved Scroll Foot */}
              <g transform="translate(105, 555) scale(0.9)">
                <path
                  d="M -20,-10 C -30,5 -25,25 -5,25 C 15,25 20,10 10,-5"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth="4"
                />
              </g>

              {/* Bottom-Right Carved Scroll Foot */}
              <g transform="translate(895, 555) scale(0.9)">
                <path
                  d="M 20,-10 C 30,5 25,25 5,25 C -15,25 -20,10 -10,-5"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth="4"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* RIGHT: PROGRESS & HIDDEN NOTES CHECKLIST CARD */}
        {/* CRITICAL: ONLY populates after a note is explored on the mirror! */}
        <div className="w-full lg:w-60 p-3.5 rounded-2xl bg-[#1A0C06]/45 border border-[#D9AE50]/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] select-none flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#D9AE50]/20 mb-2.5">
              <div>
                <span className="text-xs font-serif font-bold text-[#FFFDF5] block">
                  Hidden Notes
                </span>
                <span className="text-[11px] font-mono text-[#F8E6A0]">
                  {discoveredNotes.length} / 5 Discovered
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-[#E9C46A]" />
            </div>

            {/* 5 Seductive Slots that ONLY reveal their title after being explored on the mirror */}
            <div className="flex flex-col gap-2">
              {NOTE_TEASERS.map((item) => {
                const isFound = discoveredNotes.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-500 ${
                      isFound
                        ? 'bg-gradient-to-r from-[#FFF9EA]/35 via-[#F8E6A0]/25 to-[#FFF9EA]/35 border border-[#E9C46A] shadow-[0_0_18px_rgba(233,196,106,0.35)]'
                        : 'border border-[#D9AE50]/20 bg-[#1A0C06]/35 opacity-70'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                        isFound
                          ? 'bg-[#E9C46A] text-[#4A3004] font-bold shadow-xs'
                          : 'text-[#D9AE50]/70'
                      }`}
                    >
                      {isFound ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-xs font-serif truncate block ${
                          isFound
                            ? 'text-[#FFFDF5] font-bold drop-shadow-sm'
                            : 'text-[#F8E6A0]/65 italic'
                        }`}
                      >
                        {/* Only populated after discovered! */}
                        {isFound ? item.title : item.mysteryLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: Accessible Wipe & Refog */}
          <div className="flex flex-col gap-2 mt-3 pt-2.5 border-t border-[#D9AE50]/20">
            {/* Accessible Reveal Button */}
            {discoveredNotes.length < 5 && (
              <button
                onClick={handleAccessibleWipeNext}
                className="w-full py-1.5 px-3 rounded-lg border border-[#E9C46A]/60 bg-[#FFF9EA]/15 hover:bg-[#FFF9EA]/30 text-[11px] font-mono text-[#FFFDF5] hover:text-[#F8E6A0] transition-colors cursor-pointer"
              >
                Reveal a Little More
              </button>
            )}

            {/* Refog Mirror Action */}
            <button
              onClick={refogMirror}
              className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg border border-[#D9AE50]/30 hover:border-[#E9C46A]/60 text-[11px] font-mono text-[#F8E6A0]/80 hover:text-[#FFFDF5] transition-colors cursor-pointer"
              title="Let condensation return to the mirror"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Let the Mirror Mist Again</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── LAYER 3: BOTTOM ACTIONS & CHAPTER TRANSITION ─── */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto w-full pt-1 pb-1">
        {/* Interaction Instructions for Desktop and Mobile (Matching Reference Pill) */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-[#F8E6A0]/95 bg-[#1A0C06]/75 px-5 py-2 rounded-full border border-[#D9AE50]/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2">
            <MousePointer className="w-3.5 h-3.5 text-[#E9C46A]" />
            <span>Desktop: Pick a tool and drag to clean the mirror.</span>
          </div>
          <span className="hidden sm:inline text-[#D9AE50]/50">|</span>
          <div className="flex items-center gap-2">
            <Hand className="w-3.5 h-3.5 text-[#E9C46A]" />
            <span>Mobile: Use your finger to wipe the steam.</span>
          </div>
        </div>

        {/* Final Chapter Transition Button */}
        <button
          onClick={handleStepThrough}
          className={`flex items-center justify-center gap-3 px-8 py-2.5 rounded-full border transition-all duration-300 cursor-pointer backdrop-blur-md group ${
            isComplete
              ? 'border-[#E9C46A] bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] shadow-[0_0_25px_rgba(233,196,106,0.65)] hover:shadow-[0_0_35px_rgba(233,196,106,0.9)] text-[#5A3B05] font-bold'
              : 'border-[#D9AE50]/60 bg-[#1A0C06]/75 hover:bg-[#1A0C06]/90 text-[#F8E6A0] hover:border-[#E9C46A]'
          } text-xs font-mono tracking-[0.22em] uppercase`}
        >
          <span>STEP THROUGH THE MIRROR</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* ─── CURSOR FOLLOWER FOR DESKTOP INTERACTION ─── */}
      {isHoldingTool && isPointerInsideMirror && (
        <div
          style={{
            position: 'fixed',
            left: pointerPos.x,
            top: pointerPos.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          className="transition-transform duration-75 select-none"
        >
          {selectedTool === 'handkerchief' && (
            <div className="relative w-12 h-10 rounded-lg bg-[#FFF5DE] border border-[#D9AE50] shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center transform -rotate-6">
              <span className="text-xs text-[#D98B42] font-serif">♥</span>
            </div>
          )}
          {selectedTool === 'silk' && (
            <div className="relative w-12 h-10 rounded-lg bg-gradient-to-br from-[#9F1239] to-[#E11D48] border border-[#D9AE50] shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center transform rotate-6">
              <span className="text-xs text-[#FFFDF5]">🧣</span>
            </div>
          )}
          {selectedTool === 'feather' && (
            <div className="text-2xl transform -rotate-12 filter drop-shadow">
              🪶
            </div>
          )}
          {selectedTool === 'finger' && (
            <div className="text-2xl transform -rotate-12 filter drop-shadow">
              👆
            </div>
          )}
        </div>
      )}
    </div>
  );
};
