// src/acts/act6/FingerprintHeartTarget.tsx

import React, { useRef } from 'react';
import { Heart } from 'lucide-react';

interface FingerprintHeartTargetProps {
  holdTime: number;
  isHolding: boolean;
  isCompleted: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
}

export const FingerprintHeartTarget: React.FC<FingerprintHeartTargetProps> = ({
  holdTime,
  isHolding,
  isCompleted,
  onPointerDown,
  onPointerUp,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // SVG circular geometry
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1.0, holdTime / 8.0);
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Calculate runner head bead angle
  const angleRad = (progressRatio * 360 - 90) * (Math.PI / 180);
  const beadX = 120 + radius * Math.cos(angleRad);
  const beadY = 120 + radius * Math.sin(angleRad);

  return (
    <div className="relative flex flex-col items-center justify-center select-none z-20">
      {/* Outer Ambient Glow Ring */}
      <div
        className={`absolute inset-0 rounded-full filter blur-2xl transition-all duration-700 pointer-events-none ${
          isCompleted
            ? 'bg-gradient-to-tr from-[#FDA4AF]/50 via-[#F8E6A0]/40 to-[#E11D48]/40 scale-110'
            : isHolding
            ? 'bg-gradient-to-tr from-[#FDA4AF]/40 via-[#F8E6A0]/30 to-[#E9B85B]/30 scale-105'
            : 'bg-[#D9AE50]/15 scale-95'
        }`}
      />

      {/* Circular Progress Ring Container */}
      <div className="relative w-60 h-60 sm:w-68 sm:h-68 md:w-72 md:h-72 flex items-center justify-center">
        {/* SVG Progress Arc */}
        <svg
          viewBox="0 0 240 240"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible -rotate-90"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9EA" />
              <stop offset="35%" stopColor="#F8E6A0" />
              <stop offset="70%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>

            <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="rgba(217, 174, 80, 0.2)"
            strokeWidth="5"
            fill="transparent"
          />

          {/* Active Animated Progress Circle */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="url(#ringGrad)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter="url(#ringGlow)"
            className="transition-all duration-75 ease-linear"
          />

          {/* Glowing Runner Head Bead */}
          {progressRatio > 0.01 && progressRatio < 0.99 && (
            <circle
              cx={beadX}
              cy={beadY}
              r="5"
              fill="#FFFDF5"
              filter="url(#ringGlow)"
              className="animate-ping"
            />
          )}
        </svg>

        {/* Central Tactile Heart Target Button Pad */}
        <button
          ref={buttonRef}
          type="button"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onLostPointerCapture={onPointerUp}
          disabled={isCompleted}
          style={{
            transform: isHolding ? 'scale(0.96)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s',
          }}
          className={`relative w-44 h-44 sm:w-50 sm:h-50 md:w-54 md:h-54 rounded-full border-2 flex flex-col items-center justify-center p-3 select-none touch-none cursor-pointer backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.85)] ${
            isCompleted
              ? 'border-[#F8E6A0] bg-[#1A0C06]/85 shadow-[0_0_30px_rgba(233,196,106,0.6)] cursor-default'
              : isHolding
              ? 'border-[#FDA4AF] bg-gradient-to-b from-[#702B42]/80 to-[#1A0C06]/90 shadow-[0_0_35px_rgba(253,164,175,0.7)] ring-4 ring-[#FDA4AF]/30'
              : 'border-[#D9AE50]/50 hover:border-[#D9AE50] bg-gradient-to-b from-[#1A0C06]/80 via-[#202C4B]/40 to-[#0D0B0A]/90 hover:shadow-[0_0_20px_rgba(217,174,80,0.4)]'
          }`}
          aria-label={
            isCompleted
              ? 'Our hearts are synchronized'
              : isHolding
              ? `Holding heart, ${holdTime.toFixed(1)} of 8.0 seconds`
              : 'Press and hold to connect our hearts for 8 seconds'
          }
        >
          {/* Glass Specular Reflection Highlight */}
          <div className="absolute top-2 inset-x-8 h-8 rounded-[50%] bg-white/15 filter blur-xs pointer-events-none" />

          {/* Stylized Fingerprint Ridges with Epicentral Glowing Heart */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="printGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9EA" />
                  <stop offset="50%" stopColor="#FDA4AF" />
                  <stop offset="100%" stopColor="#D9AE50" />
                </linearGradient>
              </defs>

              {/* Concentric Fingerprint Arcs */}
              <g
                fill="none"
                stroke="url(#printGrad)"
                strokeWidth={isHolding ? '2.4' : '1.8'}
                strokeLinecap="round"
                className={`transition-all duration-300 ${isHolding ? 'opacity-95' : 'opacity-70'}`}
              >
                <path d="M 50,15 C 32,15 20,28 20,48 C 20,68 35,84 50,88 C 65,84 80,68 80,48 C 80,28 68,15 50,15" />
                <path d="M 50,22 C 36,22 26,33 26,48 C 26,64 38,77 50,81 C 62,77 74,64 74,48 C 74,33 64,22 50,22" />
                <path d="M 50,30 C 40,30 33,38 33,49 C 33,60 41,70 50,74 C 59,70 67,60 67,49 C 67,38 60,30 50,30" />
                <path d="M 50,38 C 44,38 40,43 40,50 C 40,57 45,63 50,66 C 55,63 60,57 60,50 C 60,43 56,38 50,38" />
              </g>
            </svg>

            {/* Glowing Heart at the Center of the Fingerprint */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
                isHolding || isCompleted ? 'scale-115' : 'scale-100'
              }`}
            >
              <Heart
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${
                  isCompleted
                    ? 'text-[#FDA4AF] fill-current drop-shadow-[0_0_12px_#FDA4AF] animate-pulse'
                    : isHolding
                    ? 'text-[#E11D48] fill-current drop-shadow-[0_0_15px_#E11D48] animate-bounce'
                    : 'text-[#F8E6A0] fill-current drop-shadow-[0_0_8px_#D9AE50]'
                }`}
              />
            </div>
          </div>

          {/* Button Text & Time Status */}
          <div className="flex flex-col items-center mt-1 pointer-events-none">
            <span
              className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] font-bold transition-colors ${
                isCompleted
                  ? 'text-[#F8E6A0]'
                  : isHolding
                  ? 'text-[#FDA4AF]'
                  : 'text-[#FFFDF5]'
              }`}
            >
              {isCompleted ? 'OUR HEARTS, STILL CLOSE ♥' : isHolding ? 'HOLDING STEADY' : 'HOLD MY HEART'}
            </span>

            <span className="text-[9px] sm:text-[10px] font-mono text-[#D9AE50]/90 tracking-wider mt-0.5">
              {holdTime.toFixed(1)}s / 8.0s
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
