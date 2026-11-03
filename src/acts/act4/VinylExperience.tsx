// src/acts/act4/VinylExperience.tsx

import React from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { STORY_DATA } from '../../config/storyContent';
import { proceduralAudio } from '../../engine/audio/ProceduralAudio';
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

  const handleToggleSide = (newSide?: 'daylight' | 'afterHours') => {
    const nextSide = newSide || (vinylSide === 'daylight' ? 'afterHours' : 'daylight');
    setVinylSide(nextSide);
    if (isPlaying) {
      proceduralAudio.startVinylLoop(nextSide);
    }
  };

  const handleTogglePlay = () => {
    const nextPlaying = !isPlaying;
    setVinylPlaying(nextPlaying);
    if (nextPlaying) {
      proceduralAudio.startVinylLoop(vinylSide);
    } else {
      proceduralAudio.stopVinylLoop();
    }
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

      {/* Main Center Stage: Turntable on Left, Featured Confession Card on Right */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 my-auto z-20">
        {/* Left Column: Detailed Vinyl Turntable & Controls */}
        <div className="flex flex-col items-center">
          <VinylTurntable
            vinylSide={vinylSide}
            isPlaying={isPlaying}
            kissCount={kissCount}
            onToggleSide={() => handleToggleSide()}
            onTogglePlay={handleTogglePlay}
            onSendKiss={incrementKissCount}
          />
        </div>

        {/* Right Column: Featured Confession Card & 4-Track Selector */}
        <div className="flex flex-col items-center w-full max-w-lg">
          <ConfessionCard
            vinylSide={vinylSide}
            confessionIndex={confessionIndex}
            confessions={trackData.confessions}
            isPlaying={isPlaying}
            onPrev={handlePrevConfession}
            onNext={handleNextConfession}
            onTogglePlay={handleTogglePlay}
          />

          <ConfessionTrackList
            vinylSide={vinylSide}
            confessions={trackData.confessions}
            selectedIndex={confessionIndex}
            onSelectIndex={(idx) => setConfessionIndex(idx)}
          />
        </div>
      </div>
    </div>
  );
};
