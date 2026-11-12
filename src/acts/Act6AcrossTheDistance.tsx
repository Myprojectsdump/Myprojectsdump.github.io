// src/acts/Act6AcrossTheDistance.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';
import { STORY_DATA } from '../config/storyContent';
import { CityOrb } from './act6/CityOrb';
import { HeartbeatWaveform } from './act6/HeartbeatWaveform';
import { FingerprintHeartTarget } from './act6/FingerprintHeartTarget';
import { WhisperMessage } from './act6/WhisperMessage';

export const Act6AcrossTheDistance: React.FC = () => {
  const isHolding = useExperienceStore((state) => state.isHoldingFingerprint);
  const setHolding = useExperienceStore((state) => state.setHoldingFingerprint);
  const isCompleted = useExperienceStore((state) => state.heartbeatCompleted);
  const completeHeartbeat = useExperienceStore((state) => state.completeHeartbeat);
  const replayHeartbeat = useExperienceStore((state) => state.replayHeartbeat);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  const [holdTime, setHoldTime] = useState(isCompleted ? 8.0 : 0.0);
  const [showEarlyReleasePrompt, setShowEarlyReleasePrompt] = useState(false);

  // High-precision monotonic timer refs (Fixing React interval re-mount bug per Part 9)
  const accumulatedSecondsRef = useRef(isCompleted ? 8.0 : 0.0);
  const lastTimestampRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastBpmRef = useRef<number>(64);

  // Handle Stop Holding logic
  const handleStopHolding = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    lastTimestampRef.current = null;
    setHolding(false);
    proceduralAudio.stopHeartbeat();

    if (!isCompleted && accumulatedSecondsRef.current > 0.4) {
      setShowEarlyReleasePrompt(true);
    }
  }, [isCompleted, setHolding]);

  // High-precision RAF monotonic timer loop
  useEffect(() => {
    if (isHolding && !isCompleted) {
      setShowEarlyReleasePrompt(false);
      lastTimestampRef.current = performance.now();
      proceduralAudio.startHeartbeat(lastBpmRef.current);

      const loop = (now: number) => {
        if (!lastTimestampRef.current) lastTimestampRef.current = now;
        const deltaSec = (now - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = now;

        accumulatedSecondsRef.current = Math.min(8.0, accumulatedSecondsRef.current + deltaSec);
        setHoldTime(accumulatedSecondsRef.current);

        // Update BPM progressively: 64 BPM up to 128 BPM
        const progressRatio = accumulatedSecondsRef.current / 8.0;
        const currentBpm = Math.round(64 + progressRatio * 64);
        if (Math.abs(currentBpm - lastBpmRef.current) >= 4) {
          lastBpmRef.current = currentBpm;
          proceduralAudio.updateHeartbeatBpm(currentBpm);
        }

        // Completion at exactly 8.0 seconds
        if (accumulatedSecondsRef.current >= 8.0) {
          if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
          animFrameIdRef.current = null;
          setHolding(false);
          completeHeartbeat();
          proceduralAudio.stopHeartbeat();
          proceduralAudio.playStarBridgeChime();
          if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
            try {
              navigator.vibrate([60, 40, 120]);
            } catch (_) {}
          }
          return;
        }

        animFrameIdRef.current = requestAnimationFrame(loop);
      };

      animFrameIdRef.current = requestAnimationFrame(loop);
    } else {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      proceduralAudio.stopHeartbeat();
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      proceduralAudio.stopHeartbeat();
    };
  }, [isHolding, isCompleted, completeHeartbeat, setHolding]);

  // Spacebar and Enter Keyboard Hold Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        const target = e.target as HTMLElement;
        if (!['input', 'textarea', 'button'].includes(target.tagName.toLowerCase())) {
          e.preventDefault();
          if (!isCompleted) setHolding(true);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleStopHolding();
      }
    };

    const handleWindowBlur = () => {
      handleStopHolding();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('visibilitychange', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('visibilitychange', handleWindowBlur);
    };
  }, [isCompleted, handleStopHolding, setHolding]);

  // Pointer interactions with pointer capture
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCompleted) return;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if not supported
    }
    setHolding(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    handleStopHolding();
  };

  const handleReplay = () => {
    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    accumulatedSecondsRef.current = 0.0;
    setHoldTime(0.0);
    lastBpmRef.current = 64;
    setShowEarlyReleasePrompt(false);
    replayHeartbeat();
    proceduralAudio.stopHeartbeat();
  };

  const handleProceedToAct7 = () => {
    setCurrentChapter('ACT_7');
  };

  const progressPercent = Math.min(100, Math.round((holdTime / 8.0) * 100));

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-3 sm:px-6 py-4 select-none overflow-x-hidden">
      {/* Top Header Region (Matching Exact Creative Direction) */}
      <header className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto pt-8 sm:pt-10 mb-2">
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#D9AE50] mb-1 font-semibold drop-shadow">
          ACT VI · EVEN ACROSS THE DISTANCE
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#FFFDF5] tracking-tight font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] mb-2">
          Eight Seconds, Just Us.
        </h1>

        <p className="font-sans text-xs sm:text-sm text-[#F8E6A0]/85 max-w-md mx-auto leading-relaxed drop-shadow">
          Hold your cursor or finger here for 8 seconds (or press and hold Spacebar).
        </p>
      </header>

      {/* Main Intimate Altar Region */}
      <main className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-auto gap-4">
        {/* Sequenced Whisper Banner (Verbatim from STORY_DATA.heartbeatWhispers) */}
        <WhisperMessage
          holdTime={holdTime}
          isHolding={isHolding}
          isCompleted={isCompleted}
        />

        {/* Central Stage: Left City Orb, Central Heart Pad, Right City Orb, and Connecting Waveform */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-6 my-2">
          {/* Connecting Heartbeat Waveform Line Spanning Across */}
          <HeartbeatWaveform
            isHolding={isHolding}
            isCompleted={isCompleted}
            progressPercent={progressPercent}
          />

          {/* Left City Representation: "ME" */}
          <CityOrb
            side="left"
            label="ME"
            isHolding={isHolding}
            isCompleted={isCompleted}
            progressPercent={progressPercent}
          />

          {/* Central Circular Fingerprint Heart Target Pad */}
          <FingerprintHeartTarget
            holdTime={holdTime}
            isHolding={isHolding}
            isCompleted={isCompleted}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          />

          {/* Right City Representation: "YOU, MY UCI" */}
          <CityOrb
            side="right"
            label="YOU, MY UCI ♥"
            isHolding={isHolding}
            isCompleted={isCompleted}
            progressPercent={progressPercent}
          />
        </div>

        {/* Early-Release Gentle Reassurance Prompt */}
        {showEarlyReleasePrompt && !isCompleted && (
          <div className="px-5 py-2.5 rounded-2xl bg-[#1A0C06]/85 border border-[#D9AE50]/40 text-xs sm:text-sm font-serif italic text-[#F8E6A0] text-center max-w-md shadow-lg backdrop-blur-md animate-in fade-in duration-300">
            No rush, sayang. I'm right here. Whenever you're ready, let's try again.
          </div>
        )}

        {/* Progress Description Plaque */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0C06]/85 border border-[#D9AE50]/50 backdrop-blur-md shadow-md mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E9B85B] shadow-[0_0_8px_#F8E6A0]" />
          <span className="text-xs font-mono tracking-wider text-[#F8E6A0] uppercase font-bold">
            {isCompleted
              ? 'OUR HEARTS, STILL CLOSE ♥ • Different places. One very full heart.'
              : `${progressPercent}% Synchronized`}
          </span>
        </div>

        {/* Heartbeat Completion Portrait Reveal */}
        {isCompleted && (
          <div className="flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-[#1A0C06]/90 border border-[#D9AE50]/75 shadow-[0_8px_32px_rgba(225,29,72,0.35)] backdrop-blur-md animate-in fade-in zoom-in-95 duration-700 max-w-sm mt-1">
            <div className="w-14 h-16 sm:w-16 sm:h-18 rounded-xl overflow-hidden border border-[#D9AE50]/60 shrink-0 shadow-md bg-[#2A1408]">
              <img
                src={STORY_DATA.photos.heartbeat?.path || '/images/uci/uci-heartbeat-reveal.jpg'}
                alt="Our Hearts in Sync"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#FDA4AF] font-bold">
                HEARTS IN SYNC // ACROSS THE MILES
              </span>
              <p className="font-serif italic text-sm sm:text-base text-[#FFFDF5] font-normal leading-snug">
                Different places. One very full heart. <span className="text-[#E11D48]">♥</span>
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer Actions */}
      <footer className="relative z-20 flex flex-wrap items-center justify-between gap-3 max-w-5xl mx-auto w-full pt-4 border-t border-[#D9AE50]/20 mt-2">
        {/* Replay Ritual Button */}
        {isCompleted ? (
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-[#D9AE50]/40 bg-[#1A0C06]/75 hover:bg-[#1A0C06]/90 text-xs font-mono text-[#F8E6A0] transition-all cursor-pointer backdrop-blur-md shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>FEEL THAT AGAIN</span>
          </button>
        ) : (
          <span className="text-[11px] font-mono text-[#F8E6A0]/60">
            Hold for 8.0 seconds to synchronize
          </span>
        )}

        {/* Continue to Act VII Action Button */}
        <button
          onClick={handleProceedToAct7}
          className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg ${
            isCompleted
              ? 'bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#4A3004] font-bold border border-[#FFF9EA] shadow-[0_0_20px_rgba(233,196,106,0.7)] scale-105'
              : 'border border-[#D9AE50]/60 bg-[#1A0C06]/80 hover:bg-[#1A0C06]/95 text-[#F8E6A0]'
          }`}
        >
          <span>LET'S SEE OUR LAST SURPRISE →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
