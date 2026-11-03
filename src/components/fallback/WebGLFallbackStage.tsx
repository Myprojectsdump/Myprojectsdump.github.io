// src/components/fallback/WebGLFallbackStage.tsx

import React from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';

export const WebGLFallbackStage: React.FC = () => {
  const currentChapter = useExperienceStore((state) => state.currentChapter);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-obsidian-void select-none">
      {/* 2.5D Atmospheric Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-rose-900/20 via-champagne-gold/15 to-transparent blur-3xl animate-pulse" />
      </div>

      {/* SVG Starfield */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="15%" cy="20%" r="2" fill="url(#star-glow)" />
        <circle cx="85%" cy="15%" r="3" fill="url(#star-glow)" />
        <circle cx="35%" cy="75%" r="1.5" fill="url(#star-glow)" />
        <circle cx="70%" cy="80%" r="2.5" fill="url(#star-glow)" />
        <circle cx="50%" cy="45%" r="4" fill="url(#star-glow)" />
      </svg>

      {/* Chapter Indicator Stamp */}
      <div className="absolute bottom-6 left-6 text-xs font-mono text-champagne-gold/40">
        STAGE // 2.5D ESSENTIALS MODE ({currentChapter})
      </div>
    </div>
  );
};
