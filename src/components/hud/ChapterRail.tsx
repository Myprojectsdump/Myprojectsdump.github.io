// src/components/hud/ChapterRail.tsx

import React from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { CHAPTERS } from '../../config/chapters';
import { ChapterId } from '../../types/scene.types';

export const ChapterRail: React.FC = () => {
  const hasEnteredUniverse = useExperienceStore((state) => state.hasEnteredUniverse);
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const visitedChapters = useExperienceStore((state) => state.visitedChapters);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  if (!hasEnteredUniverse) return null;

  const handleChapterClick = (id: ChapterId) => {
    // Free back-and-forth chapter navigation per user request
    setCurrentChapter(id);
  };

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 select-none pointer-events-auto"
      aria-label="Chapter Navigation Rail"
    >
      <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-champagne-gold/20" />

      {CHAPTERS.map((chapter) => {
        const isCurrent = chapter.id === currentChapter;
        const isVisited = visitedChapters.includes(chapter.id);

        return (
          <button
            key={chapter.id}
            onClick={() => handleChapterClick(chapter.id)}
            title={`${chapter.railLabel} - ${chapter.fullTitle} (Click to jump)`}
            className="group relative flex items-center justify-center p-1.5 transition-all duration-300 focus:outline-none cursor-pointer opacity-80 hover:opacity-100"
          >
            {/* Visual Node */}
            <div
              className={`rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-3.5 h-3.5 bg-champagne-gold shadow-glow ring-2 ring-champagne-gold/60'
                  : isVisited
                  ? 'w-2 h-2 bg-champagne-gold/70 group-hover:scale-125'
                  : 'w-1.5 h-1.5 bg-parchment-warm/40 group-hover:scale-125 group-hover:bg-champagne-gold'
              }`}
            />

            {/* Hover Tooltip Pill */}
            <span className="absolute right-7 px-2.5 py-1 rounded-md glass-panel text-[10px] font-mono whitespace-nowrap text-champagne-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-glow">
              {chapter.railLabel} • {chapter.shortTitle}
            </span>
          </button>
        );
      })}

      <div className="w-[1px] h-8 bg-gradient-to-b from-champagne-gold/20 to-transparent" />
    </nav>
  );
};
