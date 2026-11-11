// src/acts/act4/ConstellationMap.tsx

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { STORY_DATA } from '../../config/storyContent';
import { CONSTELLATION_LAYOUT, CONSTELLATION_HEART_PATH } from '../../config/act4ConstellationLayout';
import { proceduralAudio } from '../../engine/audio/ProceduralAudio';
import { StarNode } from './StarNode';
import { StarDetailCard } from './StarDetailCard';

export const ConstellationMap: React.FC = () => {
  const discoveredStarIds = useExperienceStore((state) => state.discoveredStarIds);
  const activeStarId = useExperienceStore((state) => state.activeStarId);
  const discoverStar = useExperienceStore((state) => state.discoverStar);
  const setActiveStar = useExperienceStore((state) => state.setActiveStar);

  const starNodes = STORY_DATA.constellationNodes;
  const activeNode = starNodes.find((n) => n.id === activeStarId);
  const activeLayout = activeStarId ? CONSTELLATION_LAYOUT[activeStarId] : null;
  const allDiscovered = discoveredStarIds.length >= starNodes.length;

  const handleStarSelect = (id: string) => {
    const targetNode = starNodes.find((n) => n.id === id);

    // Stronger haptic feedback on spicy nodes (nodes 3-6)
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(targetNode?.category === 'spicy' ? [35, 25, 50] : 18);
      } catch (_) {}
    }

    if (!discoveredStarIds.includes(id)) {
      const willCompleteAll = discoveredStarIds.length + 1 >= starNodes.length;
      discoverStar(id);
      const starIndex = starNodes.findIndex((n) => n.id === id);
      proceduralAudio.playConstellationStarTone(starIndex >= 0 ? starIndex : 0);

      if (willCompleteAll) {
        setTimeout(() => {
          proceduralAudio.playSupernovaCascade();
        }, 320);
      }
    }
    setActiveStar(id);
  };

  const handlePrevStar = () => {
    if (!activeStarId) return;
    const currentIdx = starNodes.findIndex((n) => n.id === activeStarId);
    const prevIdx = (currentIdx - 1 + starNodes.length) % starNodes.length;
    const prevNode = starNodes[prevIdx];
    handleStarSelect(prevNode.id);
  };

  const handleNextStar = () => {
    if (!activeStarId) return;
    const currentIdx = starNodes.findIndex((n) => n.id === activeStarId);
    const nextIdx = (currentIdx + 1) % starNodes.length;
    const nextNode = starNodes[nextIdx];
    handleStarSelect(nextNode.id);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto select-none py-2">
      {/* All 8 Stars Illuminated Celebration Banner */}
      {allDiscovered && (
        <div className="mb-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFF9EA]/15 border border-[#F8E6A0]/60 text-[11px] font-serif italic text-[#FFF9EA] shadow-[0_0_24px_rgba(253,230,138,0.45)] animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-[#FDE68A] animate-spin" />
          <span>Every star in your constellation is shining, cintaku ♥</span>
        </div>
      )}

      {/* Constellation Diagram Container */}
      <div className="relative w-full aspect-[800/420] max-h-[520px] flex items-center justify-center">
        {/* SVG Constellation Connection Lines & Starlight Glow */}
        <svg
          viewBox="0 0 800 420"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <defs>
            <linearGradient id="constellationGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9EA" />
              <stop offset="50%" stopColor="#F8E6A0" />
              <stop offset="100%" stopColor="#D9AE50" />
            </linearGradient>

            <filter id="starlightGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Starlight Cosmic Heart Silhouette (Matching Reference Image) */}
          <g transform="translate(400, 210) scale(0.65)" opacity="0.85">
            <path
              d="M 0,25 C -55,-25 -85,-75 0,-130 C 85,-75 55,-25 0,25 Z"
              fill={allDiscovered ? 'rgba(253, 230, 138, 0.12)' : 'none'}
              stroke="#FDE68A"
              strokeWidth={allDiscovered ? '3.2' : '2.5'}
              strokeDasharray={allDiscovered ? 'none' : '4 8'}
              filter="url(#starlightGlow)"
              className="animate-pulse"
            />
          </g>

          {/* Connecting Heart Path Between the 8 Stars */}
          <path
            d={CONSTELLATION_HEART_PATH}
            fill="none"
            stroke="url(#constellationGold)"
            strokeWidth={allDiscovered ? '3.2' : '2.4'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_12px_rgba(253,230,138,0.85)]"
          />

          {/* Subtle Outer Star Trail Accents */}
          <line x1="250" y1="80" x2="400" y2="165" stroke="#FFF9EA" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 5" />
          <line x1="400" y1="165" x2="550" y2="80" stroke="#FFF9EA" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 5" />
        </svg>

        {/* 8 Interactive HTML Star Node Buttons positioned over the 8 slots */}
        {starNodes.map((node) => {
          const layout = CONSTELLATION_LAYOUT[node.id];
          if (!layout) return null;

          const isDiscovered = discoveredStarIds.includes(node.id);
          const isActive = activeStarId === node.id;

          return (
            <StarNode
              key={node.id}
              node={layout}
              isDiscovered={isDiscovered}
              isActive={isActive}
              onSelect={() => handleStarSelect(node.id)}
            />
          );
        })}
      </div>

      {/* Floating Star Detail Heirloom Modal on Right Side */}
      {activeNode && activeLayout && (
        <div className="fixed inset-0 sm:inset-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 z-50 flex items-center justify-center p-4">
          <StarDetailCard
            node={activeNode}
            layout={activeLayout}
            onClose={() => setActiveStar(null)}
            onPrev={handlePrevStar}
            onNext={handleNextStar}
          />
        </div>
      )}
    </div>
  );
};
