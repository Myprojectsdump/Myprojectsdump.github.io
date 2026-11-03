// src/acts/act4/ConfessionTrackList.tsx

import React from 'react';
import { Music2 } from 'lucide-react';

interface ConfessionTrackListProps {
  vinylSide: 'daylight' | 'afterHours';
  confessions: string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

export const ConfessionTrackList: React.FC<ConfessionTrackListProps> = ({
  vinylSide,
  confessions,
  selectedIndex,
  onSelectIndex,
}) => {
  const isDaylight = vinylSide === 'daylight';

  return (
    <div className="w-full max-w-lg mt-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F8E6A0]/80 mb-2 text-center">
        A FEW THINGS I WANT YOU TO KNOW
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {confessions.map((confession, idx) => {
          const isSelected = selectedIndex === idx;
          const excerpt = confession.length > 28 ? `${confession.slice(0, 28)}...` : confession;

          return (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={`p-2 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? isDaylight
                    ? 'border-[#D9AE50] bg-[#FFF9EA]/40 shadow-[0_0_15px_rgba(217,174,80,0.45)] ring-1 ring-[#F8E6A0]'
                    : 'border-[#E11D48] bg-[#FFE4E6]/40 shadow-[0_0_15px_rgba(225,29,72,0.45)] ring-1 ring-[#FDA4AF]'
                  : 'border-[#D9AE50]/20 bg-[#1A0C06]/40 hover:bg-[#FFF9EA]/15 text-[#F8E6A0]/70'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[9px] font-mono tracking-wider font-bold ${
                    isSelected
                      ? isDaylight
                        ? 'text-[#6B4706]'
                        : 'text-[#9F1239]'
                      : 'text-[#D9AE50]/70'
                  }`}
                >
                  TRACK 0{idx + 1}
                </span>
                <Music2 className="w-2.5 h-2.5 opacity-60" />
              </div>

              <span
                className={`text-[11px] font-serif italic truncate block ${
                  isSelected ? 'text-[#FFFDF5] font-medium' : 'text-[#F8E6A0]/80'
                }`}
              >
                "{excerpt}"
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
