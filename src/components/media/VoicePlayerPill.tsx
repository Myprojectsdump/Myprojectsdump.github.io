// src/components/media/VoicePlayerPill.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, RotateCcw } from 'lucide-react';
import { audioEngine } from '../../engine/audio/AudioEngine';
import { useExperienceStore } from '../../store/useExperienceStore';

interface VoicePlayerPillProps {
  audioPath?: string;
  transcript: string;
  title?: string;
  autoPlay?: boolean;
}

export const VoicePlayerPill: React.FC<VoicePlayerPillProps> = ({
  audioPath,
  transcript,
  title = 'Voice Note',
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const captionsEnabled = useExperienceStore((state) => state.captionsEnabled);

  useEffect(() => {
    if (autoPlay && audioPath) {
      handlePlay();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioPath]);

  const handlePlay = () => {
    if (!audioPath) {
      // Missing audio file: toggle caption simulation
      setIsPlaying(true);
      setTimeout(() => {
        setIsPlaying(false);
        setHasEnded(true);
      }, 4000);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = audioEngine.playAudioFile(
        audioPath,
        () => {
          setIsPlaying(false);
          setHasEnded(true);
        },
        true
      );
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(true);
    setHasEnded(false);
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else {
      handlePlay();
    }
    setIsPlaying(true);
    setHasEnded(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg my-3 select-none">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-champagne-gold/30 self-start">
        <Volume2 className="w-4 h-4 text-champagne-gold animate-pulse" />
        <span className="text-xs font-mono tracking-wider text-parchment-warm/90">{title}</span>

        <div className="flex items-center gap-1.5 ml-2 border-l border-champagne-gold/20 pl-2">
          {!isPlaying ? (
            <button
              onClick={hasEnded ? handleReplay : handlePlay}
              className="p-1 rounded-full hover:bg-champagne-gold/20 text-champagne-gold transition-colors"
              aria-label={hasEnded ? 'Replay Voice Note' : 'Play Voice Note'}
            >
              {hasEnded ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="p-1 rounded-full hover:bg-champagne-gold/20 text-champagne-gold transition-colors"
              aria-label="Pause Voice Note"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
            </button>
          )}
        </div>
      </div>

      {/* Synchronized transcript caption drawer */}
      {captionsEnabled && (
        <div className="px-4 py-2.5 rounded-lg bg-obsidian-void/70 border border-champagne-gold/15 text-xs text-parchment-warm/85 font-sans leading-relaxed italic">
          "{transcript}"
        </div>
      )}
    </div>
  );
};
