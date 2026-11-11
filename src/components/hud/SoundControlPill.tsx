// src/components/hud/SoundControlPill.tsx

import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { audioEngine } from '../../engine/audio/AudioEngine';
import { proceduralAudio } from '../../engine/audio/ProceduralAudio';
import { musicController, MusicControllerState } from '../../utils/musicController';

export const SoundControlPill: React.FC = () => {
  const isMuted = useExperienceStore((state) => state.isMuted);
  const setMuted = useExperienceStore((state) => state.setMuted);
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const vinylSide = useExperienceStore((state) => state.vinylSide);
  const act4SubStage = useExperienceStore((state) => state.act4SubStage);

  const [musicState, setMusicState] = useState<MusicControllerState>(() =>
    musicController.getState()
  );

  // Subscribe to musicController state updates
  useEffect(() => {
    return musicController.subscribe(setMusicState);
  }, []);

  // Automatically crossfade soundtrack when chapter, vinylSide, or act4SubStage changes
  useEffect(() => {
    musicController.syncChapterAndMode(currentChapter, vinylSide, act4SubStage);
  }, [currentChapter, vinylSide, act4SubStage]);

  // Global first-gesture audio unlock listener
  useEffect(() => {
    const handleFirstGesture = () => {
      audioEngine.unlockAudioContext();
      musicController.unlockFromUserGesture(useExperienceStore.getState().isMuted);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const handleToggleGlobalSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.unlockAudioContext();

    const nextMuted = !isMuted;
    setMuted(nextMuted);

    if (nextMuted) {
      proceduralAudio.stopAllActiveLoops();
    }

    musicController.setMuted(nextMuted);
    audioEngine.syncGainsFromStore();

    if (!nextMuted) {
      musicController.play();
    }
  };

  const track = musicState.currentTrack;

  return (
    <div
      role="region"
      aria-label="Global Sound Control"
      className={`fixed z-40 pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-card border border-champagne-gold/30 hover:border-champagne-gold/60 transition-all duration-300 shadow-lg ${
        currentChapter === 'PRELUDE' ? 'top-3.5 right-36 sm:right-40' : 'top-3.5 right-4 sm:right-6'
      }`}
    >
      {/* Current Track & Artist Info (Non-button read-only display) */}
      <div className="hidden lg:flex flex-col text-left max-w-[155px] leading-tight select-none pr-1 border-r border-champagne-gold/20">
        <div className="flex items-center gap-1 text-[8px] font-mono uppercase tracking-[0.18em] text-champagne-gold/80 truncate">
          <Music className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">{track.actNumber}</span>
        </div>
        <span className="text-[10px] font-serif italic text-parchment-cream truncate">
          {track.title} · <span className="text-parchment-warm/75">{track.artist}</span>
        </span>
      </div>

      {/* Single Global Master Sound Control Button: SOUND ON / SOUND OFF */}
      <button
        type="button"
        data-testid="global-sound-toggle"
        onClick={handleToggleGlobalSound}
        aria-label={isMuted ? 'SOUND OFF — Click to turn sound on' : 'SOUND ON — Click to turn sound off'}
        aria-pressed={!isMuted}
        className="flex items-center gap-1.5 px-1 py-0.5 rounded-full text-[11px] font-mono tracking-wider text-parchment-cream cursor-pointer"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-rose-blush shrink-0" />
            <span className="text-parchment-warm/80 font-semibold">SOUND OFF</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-champagne-gold animate-pulse shrink-0" />
            <span className="text-champagne-gold font-semibold">SOUND ON</span>
          </>
        )}
      </button>
    </div>
  );
};
