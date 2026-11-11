// src/acts/act4/ConfessionTrackList.tsx

import React from 'react';
import { Music2 } from 'lucide-react';
import { VinylConfessionCardItem } from '../../types/story';

interface ConfessionTrackListProps {
  vinylSide: 'daylight' | 'afterHours';
  cards?: VinylConfessionCardItem[];
  confessions: string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

export const ConfessionTrackList: React.FC<ConfessionTrackListProps> = ({
  vinylSide,
  cards,
  confessions,
  selectedIndex,
  onSelectIndex,
}) => {
  const isDaylight = vinylSide === 'daylight';

  return (
    <div className="w-full max-w-lg mt-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F8E6A0]/80 mb-2 text-center">
        {isDaylight ? 'SIDE A // DAYLIGHT SWEETHEART' : 'SIDE B // 2:00 AM AFTER-HOURS 🔥'}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {confessions.map((confession, idx) => {
          const isSelected = selectedIndex === idx;
          const cardItem = cards?.[idx];
          const labelTitle = cardItem
            ? cardItem.title
            : confession.length > 28
            ? `${confession.slice(0, 28)}...`
            : confession;

          return (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              style={{
                perspective: '800px',
                transform: isSelected
                  ? isDaylight
                    ? 'rotateY(0deg) scale(1.03)'
                    : 'rotateY(0deg) scale(1.06)'
                  : 'rotateY(-4deg) scale(1)',
              }}
              className={`rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                isDaylight ? 'p-2' : 'p-2.5'
              } ${
                isSelected
                  ? isDaylight
                    ? 'border-[#D9AE50] bg-[#FFF9EA]/45 shadow-[0_0_16px_rgba(217,174,80,0.55)] ring-1 ring-[#F8E6A0]'
                    : 'border-[#E11D48] bg-[#FFE4E6]/45 shadow-[0_0_18px_rgba(225,29,72,0.55)] ring-1 ring-[#D9AE50]'
                  : 'border-[#D9AE50]/25 bg-[#1A0C06]/45 hover:bg-[#FFF9EA]/15 hover:border-[#D9AE50]/60 text-[#F8E6A0]/75'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[9px] font-mono tracking-wider font-bold ${
                    isSelected
                      ? isDaylight
                        ? 'text-[#6B4706]'
                        : 'text-[#9F1239]'
                      : 'text-[#D9AE50]/75'
                  }`}
                >
                  0{idx + 1}
                </span>
                <Music2 className="w-2.5 h-2.5 opacity-60" />
              </div>

              <span
                className={`text-[10px] font-mono uppercase tracking-wider line-clamp-2 leading-tight block ${
                  isSelected ? 'text-[#FFFDF5] font-bold' : 'text-[#F8E6A0]/85'
                }`}
              >
                {labelTitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
