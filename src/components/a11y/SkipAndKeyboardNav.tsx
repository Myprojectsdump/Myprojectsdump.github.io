// src/components/a11y/SkipAndKeyboardNav.tsx

import React from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';

export const SkipAndKeyboardNav: React.FC = () => {
  const skipToNextChapter = useExperienceStore((state) => state.skipToNextChapter);

  return (
    <div className="sr-only focus-within:not-sr-only fixed top-2 left-2 z-50">
      <button
        onClick={skipToNextChapter}
        className="px-4 py-2 bg-obsidian-deep text-champagne-gold text-xs border border-champagne-gold/40 rounded shadow-glow focus:outline-none focus:ring-2 focus:ring-champagne-gold"
      >
        Skip to Next Act (Tab + Enter)
      </button>
    </div>
  );
};
