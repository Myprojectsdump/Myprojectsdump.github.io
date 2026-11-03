// src/acts/act4/StarNode.tsx

import React from 'react';
import { ConstellationPosition } from '../../config/act4ConstellationLayout';

interface StarNodeProps {
  node: ConstellationPosition;
  isDiscovered: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export const StarNode: React.FC<StarNodeProps> = ({
  node,
  isDiscovered,
  isActive,
  onSelect,
}) => {
  // Map SVG coordinates (viewBox 800x420) to percentages
  const leftPercent = (node.x / 800) * 100;
  const topPercent = (node.y / 420) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className="flex flex-col items-center z-20 select-none"
    >
      {/* Interactive Star Button */}
      <button
        onClick={onSelect}
        className="relative group p-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F8E6A0]"
        aria-label={`${node.romanticTitle} (${isDiscovered ? 'Discovered' : 'Click to uncover'})`}
      >
        {/* Active Expanding Halo */}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-[#F8E6A0]/40 animate-ping pointer-events-none" />
        )}

        {/* Outer Glow Aura */}
        <div
          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
            isActive
              ? 'bg-[#F8E6A0]/35 shadow-[0_0_25px_#F8E6A0] scale-125'
              : isDiscovered
              ? 'bg-[#F8E6A0]/20 shadow-[0_0_15px_rgba(248,230,160,0.8)] group-hover:scale-115'
              : 'bg-[#1A0C06]/40 border border-[#D9AE50]/40 shadow-[0_0_10px_rgba(217,174,80,0.4)] group-hover:scale-115'
          }`}
        >
          {/* Radiant 4-Point Diamond Star Core */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow">
            <path
              d="M 12 2 Q 12 10 2 12 Q 12 12 12 22 Q 12 14 22 12 Q 12 12 12 2 Z"
              fill={isActive ? '#FFFDF5' : isDiscovered ? '#FDE68A' : '#E9B85B'}
              stroke="#FFF9EA"
              strokeWidth="0.8"
            />
            {/* Center Glistening Jewel */}
            <circle cx="12" cy="12" r="2.2" fill="#FFFDF5" />
          </svg>
        </div>
      </button>

      {/* Romantic Title Label under / beside Star */}
      <span
        className={`text-[10px] sm:text-xs font-serif italic tracking-wide transition-colors pointer-events-none whitespace-nowrap mt-0.5 ${
          isActive
            ? 'text-[#FFFDF5] font-bold drop-shadow-[0_0_10px_rgba(253,230,138,0.95)]'
            : isDiscovered
            ? 'text-[#F8E6A0] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]'
            : 'text-[#F8E6A0]/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
        }`}
      >
        {node.romanticTitle}
      </span>
    </div>
  );
};
