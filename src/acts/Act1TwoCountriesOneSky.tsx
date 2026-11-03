// src/acts/Act1TwoCountriesOneSky.tsx

import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { ScrollDirector } from '../engine/motion/ScrollDirector';
import { VoicePlayerPill } from '../components/media/VoicePlayerPill';
import { OPENING_VOICE_TRANSCRIPT } from '../config/storyContent';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';

export const Act1TwoCountriesOneSky: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinnedTargetRef = useRef<HTMLDivElement>(null);
  const isBridgeConnected = useExperienceStore((state) => state.isBridgeConnected);
  const setBridgeConnected = useExperienceStore((state) => state.setBridgeConnected);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  const [isAnimatingConnection, setIsAnimatingConnection] = useState(false);

  useLayoutEffect(() => {
    let trigger: ReturnType<typeof ScrollDirector.registerActPin> | null = null;
    const ctx = gsap.context(() => {
      if (pinnedTargetRef.current) {
        trigger = ScrollDirector.registerActPin(pinnedTargetRef.current, 'ACT_1', '+=220%');
      }
    }, rootRef);

    return () => {
      if (trigger) {
        ScrollDirector.unregister(trigger);
      }
      ctx.revert();
      ScrollDirector.dispose();
    };
  }, []);

  const handleConnectBridge = () => {
    if (!isBridgeConnected && !isAnimatingConnection) {
      setIsAnimatingConnection(true);
      proceduralAudio.playStarBridgeChime();

      // Sequential romantic illumination ritual
      setTimeout(() => {
        setBridgeConnected(true);
        setIsAnimatingConnection(false);
      }, 1200);
    }
  };

  const handleProceedToAct2 = () => {
    setCurrentChapter('ACT_2');
  };

  const hasConnected = isBridgeConnected || isAnimatingConnection;

  return (
    <div ref={rootRef} className="relative w-full select-none">
      <div
        ref={pinnedTargetRef}
        className="relative w-full h-screen flex flex-col justify-between px-6 sm:px-12 py-8 select-none overflow-hidden"
      >
        {/* ─── LAYER 1: CONNECTING GOLDEN LIGHT ARCS (SVG) ─── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bridgeGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF9EA" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#F8E6A0" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#D9AE50" stopOpacity="1" />
              <stop offset="75%" stopColor="#F8E6A0" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFF9EA" stopOpacity="0.9" />
            </linearGradient>
            <filter id="bridgeBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4.0" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Arc: ME (210, 540) to Central Heart (960, 540) */}
          <path
            d="M 210 540 C 450 460, 720 460, 960 540"
            fill="none"
            stroke="url(#bridgeGoldGrad)"
            strokeWidth={hasConnected ? '3.5' : '2.0'}
            strokeDasharray={hasConnected ? 'none' : '6 8'}
            strokeOpacity={hasConnected ? '0.95' : '0.50'}
            filter={hasConnected ? 'url(#bridgeBloom)' : undefined}
            className="transition-all duration-700"
          />

          {/* Right Arc: Central Heart (960, 540) to YOU, MY UCI (1710, 540) */}
          <path
            d="M 960 540 C 1200 460, 1470 460, 1710 540"
            fill="none"
            stroke="url(#bridgeGoldGrad)"
            strokeWidth={hasConnected ? '3.5' : '2.0'}
            strokeDasharray={hasConnected ? 'none' : '6 8'}
            strokeOpacity={hasConnected ? '0.95' : '0.50'}
            filter={hasConnected ? 'url(#bridgeBloom)' : undefined}
            className="transition-all duration-700"
          />

          {/* Dynamic Traveling Golden Light Pulse during ritual */}
          {isAnimatingConnection && (
            <motion.circle
              r="9"
              fill="#FFFDF5"
              filter="url(#bridgeBloom)"
              initial={{ cx: 210, cy: 540, opacity: 1 }}
              animate={{
                cx: [210, 960, 1710],
                cy: [540, 540, 540],
                opacity: [1, 1, 1],
              }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          )}
        </svg>

        {/* ─── LAYER 2: TOP NARRATIVE CONTEXT & BRANDING ─── */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto pt-3 sm:pt-5 animate-in fade-in duration-700">
          {/* Chapter Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D9AE50]/70 bg-[#FFF9EA]/85 backdrop-blur-md shadow-[0_2px_12px_rgba(217,174,80,0.25)] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E9B85B] shadow-[0_0_8px_#F8E6A0]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#8B5E0A] font-bold">
              ACT I · TWO COUNTRIES, ONE SKY
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-light text-[#4A3004] tracking-tight leading-tight drop-shadow-[0_2px_18px_rgba(255,253,245,0.95)]">
            A Little Closer, Even From Miles Away.
          </h2>
        </div>

        {/* ─── LAYER 3: FLANKING LOCATION PORTALS (ME & YOU, MY UCI) ─── */}
        <div className="relative z-20 w-full flex items-center justify-between px-6 sm:px-16 lg:px-24 my-auto pointer-events-none">
          {/* LEFT LOCATION PORTAL: ME */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <div
              className={`relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center p-4 transition-all duration-700 backdrop-blur-md ${
                hasConnected
                  ? 'border-2 border-[#D9AE50] shadow-[0_0_35px_rgba(248,230,160,0.7),0_0_15px_rgba(217,174,80,0.5)] bg-[#FFFDF5]/85'
                  : 'border-2 border-[#D9AE50]/80 shadow-[0_0_22px_rgba(217,174,80,0.35)] bg-[#FFFDF5]/75'
              }`}
            >
              {/* Inner Radiant Aura Ring */}
              <div className="absolute inset-1.5 rounded-full border border-[#D9AE50]/40 pointer-events-none" />

              {/* India Gate Vector Silhouette */}
              <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 text-[#7A5208] drop-shadow-sm">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Stepped Base Foundation */}
                  <line x1="18" y1="88" x2="82" y2="88" />
                  <line x1="22" y1="84" x2="78" y2="84" />
                  <line x1="26" y1="80" x2="74" y2="80" />

                  {/* Outer Left & Right Pilasters */}
                  <rect x="26" y="38" width="14" height="42" fill="#F8E6A0" fillOpacity="0.3" />
                  <rect x="60" y="38" width="14" height="42" fill="#F8E6A0" fillOpacity="0.3" />

                  {/* Inner Arch Columns */}
                  <line x1="40" y1="80" x2="40" y2="52" />
                  <line x1="60" y1="80" x2="60" y2="52" />

                  {/* Main Central Grand Archway */}
                  <path d="M 40 52 C 40 40, 60 40, 60 52" />

                  {/* Entablature & Cornice */}
                  <line x1="22" y1="38" x2="78" y2="38" strokeWidth="2.4" />
                  <rect x="25" y="32" width="50" height="6" fill="#F8E6A0" fillOpacity="0.3" />

                  {/* Attic & Top Stepped Crown */}
                  <line x1="28" y1="32" x2="72" y2="32" />
                  <rect x="34" y="24" width="32" height="8" fill="#F8E6A0" fillOpacity="0.3" />
                  <line x1="38" y1="24" x2="62" y2="24" strokeWidth="2.2" />
                  <path d="M 46 24 C 46 20, 54 20, 54 24" />

                  {/* Golden Sunrise Star above the Gate */}
                  <circle cx="50" cy="14" r="2.5" fill="#D9AE50" stroke="none" />
                  <line x1="50" y1="9" x2="50" y2="19" strokeWidth="1.2" stroke="#D9AE50" />
                  <line x1="45" y1="14" x2="55" y2="14" strokeWidth="1.2" stroke="#D9AE50" />
                </g>
              </svg>
            </div>

            {/* Location Label */}
            <div className="text-center mt-3">
              <span className="text-xs sm:text-sm font-mono tracking-[0.28em] text-[#6B4706] font-bold block drop-shadow-sm">
                ME
              </span>
              <span className="w-8 h-[1.5px] bg-[#D9AE50]/70 mx-auto mt-1 block" />
            </div>
          </motion.div>

          {/* RIGHT LOCATION PORTAL: YOU, MY UCI ♥ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <div
              className={`relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center p-4 transition-all duration-700 backdrop-blur-md ${
                hasConnected
                  ? 'border-2 border-[#D9AE50] shadow-[0_0_35px_rgba(248,230,160,0.7),0_0_15px_rgba(217,174,80,0.5)] bg-[#FFFDF5]/85'
                  : 'border-2 border-[#D9AE50]/80 shadow-[0_0_22px_rgba(217,174,80,0.35)] bg-[#FFFDF5]/75'
              }`}
            >
              {/* Inner Radiant Aura Ring */}
              <div className="absolute inset-1.5 rounded-full border border-[#D9AE50]/40 pointer-events-none" />

              {/* Decorative Yellow Floral Sprig on the Rim */}
              <div className="absolute -top-3 -right-3 w-9 h-9 pointer-events-none drop-shadow-md select-none">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <path d="M 5 35 Q 20 25, 35 5" stroke="#8B5E0A" strokeWidth="1.5" fill="none" />
                  {/* Blossom 1 */}
                  <circle cx="28" cy="14" r="5" fill="#F8E6A0" stroke="#D9AE50" strokeWidth="1" />
                  <circle cx="28" cy="14" r="2" fill="#E9B85B" />
                  {/* Blossom 2 */}
                  <circle cx="34" cy="8" r="4" fill="#FDE68A" stroke="#D9AE50" strokeWidth="1" />
                  <circle cx="34" cy="8" r="1.5" fill="#E9B85B" />
                  {/* Petal 3 */}
                  <ellipse cx="20" cy="22" rx="3.5" ry="2" fill="#FEF08A" transform="rotate(-30 20 22)" />
                </svg>
              </div>

              {/* Pagoda Vector Silhouette */}
              <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 text-[#7A5208] drop-shadow-sm">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Base Platform */}
                  <line x1="20" y1="88" x2="80" y2="88" strokeWidth="2.4" />
                  <line x1="24" y1="84" x2="76" y2="84" />

                  {/* Level 1: Bottom Tier & Wide Curved Eaves */}
                  <rect x="34" y="68" width="32" height="16" fill="#F8E6A0" fillOpacity="0.3" />
                  <line x1="46" y1="84" x2="46" y2="72" />
                  <line x1="54" y1="84" x2="54" y2="72" />
                  <path d="M 18 68 C 28 66, 72 66, 82 68" strokeWidth="2.4" />

                  {/* Level 2: Middle Tier & Eaves */}
                  <rect x="37" y="52" width="26" height="16" fill="#F8E6A0" fillOpacity="0.3" />
                  <line x1="47" y1="68" x2="47" y2="56" />
                  <line x1="53" y1="68" x2="53" y2="56" />
                  <path d="M 23 52 C 32 50, 68 50, 77 52" strokeWidth="2.4" />

                  {/* Level 3: Top Tier & Eaves */}
                  <rect x="40" y="38" width="20" height="14" fill="#F8E6A0" fillOpacity="0.3" />
                  <path d="M 28 38 C 36 36, 64 36, 72 38" strokeWidth="2.4" />

                  {/* Spire / Finial Jewels */}
                  <line x1="50" y1="36" x2="50" y2="16" strokeWidth="2" stroke="#D9AE50" />
                  <circle cx="50" cy="24" r="2" fill="#D9AE50" stroke="none" />
                  <circle cx="50" cy="18" r="1.5" fill="#D9AE50" stroke="none" />
                  <circle cx="50" cy="12" r="2.5" fill="#D9AE50" stroke="none" />
                </g>
              </svg>
            </div>

            {/* Location Label */}
            <div className="text-center mt-3">
              <span className="text-xs sm:text-sm font-mono tracking-[0.28em] text-[#6B4706] font-bold block drop-shadow-sm">
                YOU, MY UCI <span className="text-[#E11D48]">♥</span>
              </span>
              <span className="w-12 h-[1.5px] bg-[#D9AE50]/70 mx-auto mt-1 block" />
            </div>
          </motion.div>
        </div>

        {/* ─── LAYER 4: BOTTOM INTERACTIVE AREA & SUPPORTING ROMANTIC COPY ─── */}
        <div className="relative z-20 flex flex-col items-center justify-center pb-4 sm:pb-6">
          {/* Supporting Romantic Message (Above the action) */}
          <p className="text-xs sm:text-sm md:text-base text-[#5A3B05]/95 font-serif italic text-center max-w-xl mx-auto leading-relaxed pb-3 drop-shadow-[0_1px_8px_rgba(255,255,255,0.85)]">
            Different countries. Different skies. But every night, we're looking at the same stars. And somehow, you're still my closest person.
          </p>

          <AnimatePresence mode="wait">
            {!isBridgeConnected ? (
              <motion.div
                key="unconnected-controls"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-2.5 pointer-events-auto"
              >
                {/* Main Illuminated Connection Button */}
                <button
                  onClick={handleConnectBridge}
                  disabled={isAnimatingConnection}
                  className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border-2 border-[#D9AE50] bg-gradient-to-r from-[#F8E6A0]/90 via-[#FFF9EA] to-[#F8E6A0]/90 hover:from-[#F8E6A0] hover:to-[#F8E6A0] shadow-[0_0_25px_rgba(217,174,80,0.45)] hover:shadow-[0_0_40px_rgba(217,174,80,0.7)] text-[#5A3B05] font-mono font-bold text-xs sm:text-sm tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer backdrop-blur-md group disabled:opacity-75"
                >
                  <span>BRING OUR SKIES TOGETHER</span>
                  <Sparkles className="w-4 h-4 text-[#C49226] group-hover:scale-125 transition-transform" />
                </button>

                {/* Gentle Intimate Instruction */}
                <p className="text-xs font-mono tracking-wider text-[#6B4706]/80 mt-1">
                  Take a moment. This little universe is ours.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="connected-controls"
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="flex flex-col items-center gap-3.5 max-w-lg w-full pointer-events-auto"
              >
                {/* Romantic Post-Connection Message */}
                <p className="font-serif italic text-xl sm:text-2xl text-[#4A3004] font-medium text-center drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
                  No distance could make you feel far away. <span className="text-[#E11D48]">♥</span>
                </p>

                {/* Voice Player Pill */}
                <VoicePlayerPill
                  audioPath="/media/audio/voice/01-opening-voice.mp3"
                  transcript={OPENING_VOICE_TRANSCRIPT}
                  title="I Have Something to Tell You ❤️"
                  autoPlay={false}
                />

                {/* Continue Navigation Button */}
                <button
                  onClick={handleProceedToAct2}
                  className="flex items-center justify-center gap-3 px-8 py-3 rounded-full border border-[#D9AE50] bg-gradient-to-r from-[#F8E6A0]/85 via-[#FFF9EA]/95 to-[#F8E6A0]/85 hover:from-[#F8E6A0] hover:to-[#F8E6A0] shadow-[0_0_20px_rgba(217,174,80,0.35)] text-[#5A3B05] font-mono font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer backdrop-blur-md group mt-1"
                >
                  <span>LET'S RELIVE OUR LITTLE MOMENTS</span>
                  <ArrowRight className="w-4 h-4 text-[#8B5E0A] group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
