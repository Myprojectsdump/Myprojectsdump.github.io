// src/acts/act6/WhisperMessage.tsx

import React from 'react';
import { STORY_DATA } from '../../config/storyContent';

interface WhisperMessageProps {
  holdTime: number;
  isHolding: boolean;
  isCompleted: boolean;
}

export const WhisperMessage: React.FC<WhisperMessageProps> = ({
  holdTime,
  isHolding,
  isCompleted,
}) => {
  const whispers = STORY_DATA.heartbeatWhispers;

  // Determine active whisper:
  // If completed: show whisper 5
  // If holding: partition 8.0 seconds into 6 intervals (~1.33s each)
  // If idle before start: show romantic introductory whisper
  const getWhisperText = () => {
    if (isCompleted) {
      return whispers[5] || whispers[whispers.length - 1];
    }
    if (!isHolding && holdTime === 0) {
      return 'Even from far away... you still make my heart feel so close.';
    }
    const idx = Math.min(5, Math.floor((holdTime / 8.0) * 6));
    return whispers[idx] || whispers[0];
  };

  const activeText = getWhisperText();

  return (
    <div className="w-full max-w-2xl min-h-[76px] sm:min-h-[84px] flex items-center justify-center text-center px-4 select-none z-20">
      <div className="relative py-2 px-6 rounded-2xl bg-[#1A0C06]/70 border border-[#D9AE50]/30 backdrop-blur-md shadow-md transition-all duration-500">
        <p
          key={activeText}
          className="font-serif italic text-base sm:text-lg md:text-xl text-[#F8E6A0] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-bottom-1 duration-400"
        >
          "{activeText}"
        </p>
      </div>
    </div>
  );
};
