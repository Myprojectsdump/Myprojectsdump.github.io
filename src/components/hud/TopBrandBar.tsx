// src/components/hud/TopBrandBar.tsx

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { CHAPTERS } from '../../config/chapters';
import { ChapterId } from '../../types/scene.types';

export const TopBrandBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const hasEnteredUniverse = useExperienceStore((state) => state.hasEnteredUniverse);
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);
  const skipToPrevChapter = useExperienceStore((state) => state.skipToPrevChapter);
  const skipToNextChapter = useExperienceStore((state) => state.skipToNextChapter);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  if (!hasEnteredUniverse) return null;

  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);
  const activeChapterInfo = CHAPTERS[currentIndex] || CHAPTERS[0];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < CHAPTERS.length - 1;

  const handleSelectChapter = (id: ChapterId) => {
    setCurrentChapter(id);
    setMenuOpen(false);
  };

  return (
    <header
      aria-label="Brand and chapter navigation bar"
      className="fixed top-0 left-0 right-0 h-[var(--header-height)] z-40 flex items-center justify-between px-4 sm:px-6 pointer-events-none select-none transition-opacity duration-700"
    >
      {/* Brand HUD Mark */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <span
          className={`text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] font-bold ${
            currentChapter === 'ACT_1' || currentChapter === 'ACT_2'
              ? 'text-[#6B4706] drop-shadow-[0_1px_8px_rgba(255,253,245,0.95)]'
              : 'text-[#F8E6A0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
          }`}
        >
          THE GRAVITY OF UCI
        </span>
      </div>

      {/* Global Interactive Chapter Navigation Bar */}
      <div ref={menuRef} className="relative pointer-events-auto flex items-center">
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-[#180E04]/75 backdrop-blur-md border border-[#D9AE50]/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          {/* Previous Act Button */}
          <button
            type="button"
            onClick={skipToPrevChapter}
            disabled={!canGoPrev}
            title={canGoPrev ? `Back to ${CHAPTERS[currentIndex - 1]?.shortTitle}` : 'First Act'}
            className={`p-1 rounded-full transition-all duration-200 ${
              canGoPrev
                ? 'text-[#F8E6A0] hover:bg-[#D9AE50]/20 hover:text-white cursor-pointer active:scale-95'
                : 'text-white/20 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Current Act Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-[#D9AE50]/15 text-[#FFF9EA] transition-colors group cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#D9AE50] group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold text-[#F8E6A0]">
              {activeChapterInfo.railLabel}
            </span>
            <span className="hidden sm:inline text-[10px] sm:text-[11px] font-serif text-white/70">
              • {activeChapterInfo.shortTitle}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-[#D9AE50]/80 transition-transform duration-200 ${
                menuOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {/* Next Act Button */}
          <button
            type="button"
            onClick={skipToNextChapter}
            disabled={!canGoNext}
            title={canGoNext ? `Next to ${CHAPTERS[currentIndex + 1]?.shortTitle}` : 'Final Act'}
            className={`p-1 rounded-full transition-all duration-200 ${
              canGoNext
                ? 'text-[#F8E6A0] hover:bg-[#D9AE50]/20 hover:text-white cursor-pointer active:scale-95'
                : 'text-white/20 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Dropdown Menu of All Acts */}
        {menuOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 max-h-[75vh] overflow-y-auto rounded-2xl bg-[#140A02]/95 backdrop-blur-xl border border-[#D9AE50]/50 shadow-[0_12px_40px_rgba(0,0,0,0.85)] p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-3 py-1.5 border-b border-[#D9AE50]/20 mb-1 flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#D9AE50]">
                Jump to Any Chapter
              </span>
              <span className="text-[9px] font-mono text-white/50">
                {currentIndex + 1} / {CHAPTERS.length}
              </span>
            </div>

            <div className="space-y-1">
              {CHAPTERS.map((ch) => {
                const isCurrent = ch.id === currentChapter;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleSelectChapter(ch.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isCurrent
                        ? 'bg-[#D9AE50]/20 text-[#FFF9EA] border border-[#D9AE50]/50'
                        : 'text-white/75 hover:bg-white/5 hover:text-[#F8E6A0]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#D9AE50]">
                          {ch.railLabel}
                        </span>
                        <span className="text-xs font-serif font-medium text-white">
                          {ch.shortTitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-serif italic text-white/50 line-clamp-1">
                        {ch.fullTitle}
                      </span>
                    </div>

                    {isCurrent && <Check className="w-3.5 h-3.5 text-[#F8E6A0] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Spacer for SoundControlPill */}
      <div className="w-20 sm:w-28" />
    </header>
  );
};
