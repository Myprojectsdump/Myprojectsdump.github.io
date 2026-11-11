// src/acts/act7/cake/CakeBlowControls.tsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Wind, Mic, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { useExperienceStore } from '../../../store/useExperienceStore';
import { proceduralAudio } from '../../../engine/audio/ProceduralAudio';
import { musicController } from '../../../utils/musicController';
import { MicrophoneAnalyzer, MicStatus } from '../../../engine/audio/MicrophoneAnalyzer';

export const CakeBlowControls: React.FC = () => {
  const isExtinguished = useExperienceStore((state) => state.isCandleExtinguished);
  const extinguishCandle = useExperienceStore((state) => state.extinguishCandle);
  const relightCandle = useExperienceStore((state) => state.relightCandle);
  const setAct7SubStage = useExperienceStore((state) => state.setAct7SubStage);
  const currentStep = useExperienceStore((state) => state.cakeAssemblyStep);

  const [blowMode, setBlowMode] = useState<'hold' | 'mic'>('hold');
  const [blowProgress, setBlowProgress] = useState(0);
  const [micStatus, setMicStatus] = useState<MicStatus>('idle');
  const micAnalyzerRef = useRef<MicrophoneAnalyzer | null>(null);
  const blowTimerRef = useRef<number | null>(null);
  const hasExtinguishedRef = useRef<boolean>(isExtinguished);

  useEffect(() => {
    hasExtinguishedRef.current = isExtinguished;
  }, [isExtinguished]);

  // Teardown mic analyzer and timers on unmount
  useEffect(() => {
    return () => {
      if (micAnalyzerRef.current) {
        micAnalyzerRef.current.dispose();
        micAnalyzerRef.current = null;
      }
      if (blowTimerRef.current) {
        clearInterval(blowTimerRef.current);
        blowTimerRef.current = null;
      }
    };
  }, []);

  const handleCandleExtinguish = useCallback(() => {
    if (hasExtinguishedRef.current || isExtinguished) return;
    hasExtinguishedRef.current = true;

    if (blowTimerRef.current) {
      clearInterval(blowTimerRef.current);
      blowTimerRef.current = null;
    }

    if (micAnalyzerRef.current) {
      micAnalyzerRef.current.dispose();
      micAnalyzerRef.current = null;
      setMicStatus('extinguished');
    }

    extinguishCandle();
    musicController.playBirthdayCandleSequenceOnce();
  }, [extinguishCandle, isExtinguished]);

  const handleStartBlowHold = useCallback(() => {
    if (hasExtinguishedRef.current || isExtinguished || currentStep < 6) return;
    if (blowTimerRef.current) {
      clearInterval(blowTimerRef.current);
      blowTimerRef.current = null;
    }

    blowTimerRef.current = window.setInterval(() => {
      setBlowProgress((prev) => {
        const next = prev + 0.1;
        if (next >= 1.6) {
          if (blowTimerRef.current) {
            clearInterval(blowTimerRef.current);
            blowTimerRef.current = null;
          }
          handleCandleExtinguish();
          return 1.6;
        }
        return next;
      });
    }, 100);
  }, [currentStep, handleCandleExtinguish, isExtinguished]);

  const handleStopBlowHold = useCallback(() => {
    if (blowTimerRef.current) {
      clearInterval(blowTimerRef.current);
      blowTimerRef.current = null;
    }
    if (!hasExtinguishedRef.current && !isExtinguished) {
      setBlowProgress(0);
    }
  }, [isExtinguished]);

  // Keyboard Spacebar hold support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && !isExtinguished && currentStep >= 6) {
        e.preventDefault();
        handleStartBlowHold();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isExtinguished) {
        e.preventDefault();
        handleStopBlowHold();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isExtinguished, currentStep, handleStartBlowHold, handleStopBlowHold]);

  const handleToggleMicrophone = async () => {
    if (hasExtinguishedRef.current || isExtinguished) return;

    if (micStatus === 'listening') {
      if (micAnalyzerRef.current) {
        micAnalyzerRef.current.dispose();
        micAnalyzerRef.current = null;
      }
      setMicStatus('idle');
      return;
    }

    if (micAnalyzerRef.current) {
      micAnalyzerRef.current.dispose();
      micAnalyzerRef.current = null;
    }

    const analyzer = new MicrophoneAnalyzer();
    micAnalyzerRef.current = analyzer;

    await analyzer.start(
      (energy) => {
        if (energy > 0.4) {
          handleCandleExtinguish();
        }
      },
      (status) => {
        setMicStatus(status);
      }
    );
  };

  const handleRelightCandle = () => {
    // 1. Stop any active microphone session
    if (micAnalyzerRef.current) {
      micAnalyzerRef.current.dispose();
      micAnalyzerRef.current = null;
    }
    setMicStatus('idle');

    // 2. Clear any pending hold timers or intervals
    if (blowTimerRef.current) {
      clearInterval(blowTimerRef.current);
      blowTimerRef.current = null;
    }

    // 3. Stop any active birthday melody so the next extinguish plays cleanly once
    proceduralAudio.stopBirthdayMelody();

    // 4. Reset breath meter & local reference guard
    setBlowProgress(0);
    hasExtinguishedRef.current = false;

    // 5. Restore candle flame in store without erasing letter/lantern/wish/VIP state
    relightCandle();
  };

  const progressFraction = Math.min(blowProgress / 1.6, 1);
  const strokeDashoffset = 283 * (1 - progressFraction);

  return (
    <aside
      aria-label="Blow Out The Candle"
      className="w-full max-w-[270px] sm:max-w-[290px] p-3.5 rounded-2xl bg-[#140E08]/90 backdrop-blur-md border border-[#D9AE50]/40 shadow-[0_12px_32px_rgba(0,0,0,0.7)] flex flex-col items-center gap-3 text-center text-[#FFF9EA]"
    >
      {/* Mode Switcher Pill */}
      <div className="flex items-center p-0.5 rounded-full bg-black/40 border border-[#D9AE50]/25 w-full">
        <button
          type="button"
          disabled={isExtinguished}
          onClick={() => setBlowMode('hold')}
          className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-full text-xs font-mono transition-all ${
            blowMode === 'hold'
              ? 'bg-[#D9AE50] text-[#140A00] font-bold shadow-[0_2px_8px_rgba(217,174,80,0.3)]'
              : 'text-[#FFF9EA]/65 hover:text-[#FFF9EA]'
          } ${isExtinguished ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <Wind className="w-3 h-3" />
          <span>Hold & Blow</span>
        </button>

        <button
          type="button"
          disabled={isExtinguished}
          onClick={() => {
            if (isExtinguished) return;
            setBlowMode('mic');
            if (micStatus === 'idle' || micStatus === 'extinguished') {
              handleToggleMicrophone();
            }
          }}
          className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-full text-xs font-mono transition-all ${
            blowMode === 'mic'
              ? 'bg-[#D9AE50] text-[#140A00] font-bold shadow-[0_2px_8px_rgba(217,174,80,0.3)]'
              : 'text-[#FFF9EA]/65 hover:text-[#FFF9EA]'
          } ${isExtinguished ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <Mic className="w-3 h-3" />
          <span>Microphone</span>
        </button>
      </div>

      {/* Instruction */}
      <p className="text-[11px] font-serif text-[#FFF9EA]/80 italic leading-snug">
        {isExtinguished
          ? 'Your wish is made and sealed with love. ✨'
          : currentStep < 6
          ? 'Complete cake steps first to place candle.'
          : blowMode === 'hold'
          ? 'Hold and blow gently to blow out the candle.'
          : 'Blow gently into your microphone.'}
      </p>

      {/* Radial Progress Meter / Interactive Target */}
      <div className="relative w-32 h-32 flex items-center justify-center select-none my-0.5">
        {/* SVG Progress Ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 249, 234, 0.1)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#radialBlowGradientCompact)"
            strokeWidth="6"
            strokeDasharray="283"
            strokeDashoffset={isExtinguished ? 0 : strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-100 ease-linear"
          />
          <defs>
            <linearGradient id="radialBlowGradientCompact" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9AE50" />
              <stop offset="50%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Button / Target */}
        <button
          type="button"
          onPointerDown={handleStartBlowHold}
          onPointerUp={handleStopBlowHold}
          onPointerLeave={handleStopBlowHold}
          onMouseDown={handleStartBlowHold}
          onMouseUp={handleStopBlowHold}
          onTouchStart={handleStartBlowHold}
          onTouchEnd={handleStopBlowHold}
          disabled={isExtinguished || currentStep < 6}
          className={`absolute inset-3 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-300 touch-none ${
            isExtinguished
              ? 'bg-[#D9AE50]/20 border border-[#D9AE50]/50 text-[#F8E6A0] cursor-default'
              : currentStep < 6
              ? 'bg-black/30 border border-white/10 text-white/40 cursor-not-allowed'
              : 'bg-gradient-to-b from-[#2A180E] to-[#160B05] border border-[#D9AE50]/40 text-[#FFF9EA] hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.6)] cursor-pointer'
          }`}
        >
          {isExtinguished ? (
            <>
              <Sparkles className="w-5 h-5 text-[#F8E6A0] animate-bounce" />
              <span className="text-[9px] font-mono tracking-wider text-[#F8E6A0] font-bold uppercase">
                Extinguished
              </span>
            </>
          ) : (
            <>
              <Wind className={`w-5 h-5 ${blowProgress > 0 ? 'text-[#F472B6] animate-pulse' : 'text-[#D9AE50]'}`} />
              <span className="text-[10px] font-mono tracking-wider font-semibold">
                {blowProgress > 0 ? 'Blowing...' : 'HOLD TO BLOW'}
              </span>
              <span className="text-[9px] font-mono text-[#FFF9EA]/60">
                {blowProgress.toFixed(1)}s / 1.6s
              </span>
            </>
          )}
        </button>
      </div>

      {/* Action CTA when extinguished */}
      {isExtinguished ? (
        <div className="w-full space-y-2 pt-1.5 border-t border-[#D9AE50]/20 animate-in fade-in duration-300">
          <button
            type="button"
            onClick={() => setAct7SubStage('lantern')}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-full bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-mono font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-[0_3px_12px_rgba(217,174,80,0.4)] cursor-pointer"
          >
            <span>Continue to Sky Lantern ✨</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleRelightCandle}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-[#D9AE50]/45 bg-[#1A0C06]/80 hover:bg-[#1A0C06] text-[10px] font-mono tracking-wider uppercase text-[#F8E6A0] hover:text-[#FFF9EA] transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3 h-3 text-[#D9AE50]" />
            <span>RELIGHT CANDLE ✨</span>
          </button>
        </div>
      ) : (
        <p className="text-[9px] font-mono text-[#FFF9EA]/40">
          Tip: Hold Spacebar or click & hold the circle.
        </p>
      )}
    </aside>
  );
};
