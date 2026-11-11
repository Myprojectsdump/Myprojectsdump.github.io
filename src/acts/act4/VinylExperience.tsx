// src/acts/act4/VinylExperience.tsx

import React, { useEffect } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { STORY_DATA } from '../../config/storyContent';
import { musicController } from '../../utils/musicController';
import { VinylSideSelector } from './VinylSideSelector';
import { VinylTurntable } from './VinylTurntable';
import { ConfessionCard } from './ConfessionCard';
import { ConfessionTrackList } from './ConfessionTrackList';

export const VinylExperience: React.FC = () => {
  const vinylSide = useExperienceStore((state) => state.vinylSide);
  const setVinylSide = useExperienceStore((state) => state.setVinylSide);
  const isPlaying = useExperienceStore((state) => state.isVinylPlaying);
  const setVinylPlaying = useExperienceStore((state) => state.setVinylPlaying);
  const confessionIndex = useExperienceStore((state) => state.vinylConfessionIndex);
  const setConfessionIndex = useExperienceStore((state) => state.setVinylConfessionIndex);
  const kissCount = useExperienceStore((state) => state.kissCount);
  const incrementKissCount = useExperienceStore((state) => state.incrementKissCount);

  const trackData = STORY_DATA.vinylTracks[vinylSide];

  // Keep Vinyl turntable play state in sync with musicController
  useEffect(() => {
    return musicController.subscribe((mState) => {
      if (mState.isPlaying && !mState.isMuted && !isPlaying) {
        setVinylPlaying(true);
      }
    });
  }, [isPlaying, setVinylPlaying]);

  const handleToggleSide = (newSide?: 'daylight' | 'afterHours') => {
    const nextSide = newSide || (vinylSide === 'daylight' ? 'afterHours' : 'daylight');
    setVinylSide(nextSide);
    musicController.switchTrack(
      nextSide === 'afterHours' ? 'act-3-romantic-01' : 'act-3-daydreamin'
    );
  };

  const handleTogglePlay = () => {
    const nextPlaying = !isPlaying;
    setVinylPlaying(nextPlaying);
    if (nextPlaying) {
      musicController.switchTrack(
        vinylSide === 'afterHours' ? 'act-3-romantic-01' : 'act-3-daydreamin'
      );
      musicController.play();
    } else {
      musicController.pause();
    }
  };

  const handleScratch = (deltaSeconds: number) => {
    musicController.scratchActiveVinyl(deltaSeconds);
  };

  const handleNextConfession = () => {
    setConfessionIndex((confessionIndex + 1) % 4);
  };

  const handlePrevConfession = () => {
    setConfessionIndex((confessionIndex - 1 + 4) % 4);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-5 px-2 sm:px-4 py-1 select-none">
      {/* Side Selector (Side A · Daylight vs Side B · After-Hours) */}
      <div className="z-20">
        <VinylSideSelector
          vinylSide={vinylSide}
          onSelectSide={(side) => handleToggleSide(side)}
        />
      </div>

      {/* Main Center Stage: Dual Translucent Ruby Turntable on Left, Featured Confession Card on Right */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 my-auto z-20">
        {/* Left Column: Dual Translucent Ruby-Red Vinyl Turntable & Controls */}
        <div className="flex flex-col items-center">
          <VinylTurntable
            vinylSide={vinylSide}
            isPlaying={isPlaying}
            kissCount={kissCount}
            photoPath={trackData.photoPath}
            daylightPhotoPath={STORY_DATA.vinylTracks.daylight.photoPath}
            afterHoursPhotoPath={STORY_DATA.vinylTracks.afterHours.photoPath}
            onToggleSide={(side) => handleToggleSide(side)}
            onTogglePlay={handleTogglePlay}
            onSendKiss={incrementKissCount}
            onScratch={handleScratch}
          />
        </div>

        {/* Right Column: Featured Confession Card & 4-Track Selector */}
        <div className="flex flex-col items-center w-full max-w-lg">
          <ConfessionCard
            vinylSide={vinylSide}
            confessionIndex={confessionIndex}
            cards={trackData.cards}
            confessions={trackData.confessions}
            isPlaying={isPlaying}
            onPrev={handlePrevConfession}
            onNext={handleNextConfession}
            onTogglePlay={handleTogglePlay}
          />

          <ConfessionTrackList
            vinylSide={vinylSide}
            cards={trackData.cards}
            confessions={trackData.confessions}
            selectedIndex={confessionIndex}
            onSelectIndex={(idx) => setConfessionIndex(idx)}
          />
        </div>
      </div>
    </div>
  );
};
