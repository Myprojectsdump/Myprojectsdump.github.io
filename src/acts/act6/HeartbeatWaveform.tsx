// src/acts/act6/HeartbeatWaveform.tsx

import React from 'react';

interface HeartbeatWaveformProps {
  isHolding: boolean;
  isCompleted: boolean;
  progressPercent: number;
}

export const HeartbeatWaveform: React.FC<HeartbeatWaveformProps> = ({
  isHolding,
  isCompleted,
  progressPercent,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden z-10">
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="w-full h-24 overflow-visible"
      >
        <defs>
          {/* Golden EKG Pulse Gradient */}
          <linearGradient id="ekgPulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9AE50" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#F8E6A0" stopOpacity={isHolding ? 0.95 : 0.4} />
            <stop offset="50%" stopColor="#FDA4AF" stopOpacity={isCompleted ? 1 : isHolding ? 0.95 : 0.6} />
            <stop offset="75%" stopColor="#F8E6A0" stopOpacity={isHolding ? 0.95 : 0.4} />
            <stop offset="100%" stopColor="#D9AE50" stopOpacity="0.2" />
          </linearGradient>

          {/* Glowing Shadow Filter */}
          <filter id="ekgGlow" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Subtle Static Guide Line */}
        <path
          d="
            M 60,60 
            L 240,60 
            L 260,40 L 275,80 L 290,20 L 305,95 L 320,60 
            L 400,60 
            L 600,60 
            L 680,60 
            L 695,40 L 710,80 L 725,20 L 740,95 L 755,60 
            L 940,60
          "
          fill="none"
          stroke="rgba(217, 174, 80, 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic Animated Glowing Heartbeat Path */}
        <path
          d="
            M 60,60 
            L 240,60 
            L 260,40 L 275,80 L 290,20 L 305,95 L 320,60 
            L 400,60 
            L 600,60 
            L 680,60 
            L 695,40 L 710,80 L 725,20 L 740,95 L 755,60 
            L 940,60
          "
          fill="none"
          stroke="url(#ekgPulseGradient)"
          strokeWidth={isCompleted ? 3 : isHolding ? 2.8 : 1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ekgGlow)"
          className={`transition-all duration-300 ${
            isCompleted
              ? 'animate-pulse'
              : isHolding
              ? 'animate-pulse drop-shadow-[0_0_12px_rgba(253,164,175,0.85)]'
              : 'opacity-50'
          }`}
        />

        {/* Pulse Traveling Bead during Active Hold */}
        {isHolding && (
          <circle
            cx={`${200 + (progressPercent / 100) * 600}`}
            cy="60"
            r="4"
            fill="#FFFDF5"
            className="animate-ping"
          />
        )}
      </svg>
    </div>
  );
};
