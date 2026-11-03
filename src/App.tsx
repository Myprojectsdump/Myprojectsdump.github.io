// src/App.tsx

import React, { useEffect } from 'react';
import { PersistentStage } from './engine/webgl/PersistentStage';
import { TopBrandBar } from './components/hud/TopBrandBar';
import { ChapterRail } from './components/hud/ChapterRail';
import { SoundControlPill } from './components/hud/SoundControlPill';
import { ComfortControls } from './components/hud/ComfortControls';
import { SkipAndKeyboardNav } from './components/a11y/SkipAndKeyboardNav';
import { ReducedMotionProvider } from './components/a11y/ReducedMotionProvider';
import { PreludeInvitation } from './acts/PreludeInvitation';
import { OpeningPortal } from './acts/OpeningPortal';
import { Act1TwoCountriesOneSky } from './acts/Act1TwoCountriesOneSky';
import { Act2LittleThingsIKeep } from './acts/Act2LittleThingsIKeep';
import { Act3SecretMirror } from './acts/Act3SecretMirror';
import { Act4TwoSidesOfUs } from './acts/Act4TwoSidesOfUs';
import { Act5UciFormula } from './acts/Act5UciFormula';
import { Act6AcrossTheDistance } from './acts/Act6AcrossTheDistance';
import { Act7MoonlitWish } from './acts/Act7MoonlitWish';
import { FinalGiftReveal } from './acts/FinalGiftReveal';
import { AfterCreditsVipVault } from './acts/AfterCreditsVipVault';
import { FinalLoveLetter } from './acts/FinalLoveLetter';
import { GoldenPetals } from './components/effects/GoldenPetals';
import { CelestialPageTransition } from './components/effects/CelestialPageTransition';
import { useExperienceStore } from './store/useExperienceStore';
import { ScrollDirector } from './engine/motion/ScrollDirector';

export default function App(): React.JSX.Element {
  const currentChapter = useExperienceStore((state) => state.currentChapter);
  const hasEnteredUniverse = useExperienceStore((state) => state.hasEnteredUniverse);
  const act4SubStage = useExperienceStore((state) => state.act4SubStage);
  const vinylSide = useExperienceStore((state) => state.vinylSide);
  const act5SubStage = useExperienceStore((state) => state.act5SubStage);
  const act7SubStage = useExperienceStore((state) => state.act7SubStage);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    ScrollDirector.refresh();
  }, [currentChapter]);

  return (
    <ReducedMotionProvider>
      <div className="relative w-full min-h-screen bg-obsidian-void text-parchment-warm overflow-x-hidden select-none">
        {/* Accessible Keyboard Navigation Shortcut */}
        <SkipAndKeyboardNav />

        {/* Cinematic Celestial Page & Chapter Transition Curtain (z-50) */}
        <CelestialPageTransition />

        {/* Global HUD Layers */}
        <TopBrandBar />
        <SoundControlPill />
        <ChapterRail />
        <ComfortControls />

        {/* Prelude Warm Afternoon Desk Background Plate (z-0) - Persistent crossfade */}
        <div
          className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
            currentChapter === 'PRELUDE'
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src="/media/backgrounds/prelude-invitation-bg.jpg"
            alt="Warm Sunlit Afternoon Desk"
            className="w-full h-full object-cover object-center scale-[1.01]"
            draggable={false}
          />
        </div>

        {/* Background Cosmic Environment Plate (z-0) - Persistent crossfade */}
        <div
          className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
            currentChapter === 'OPENING'
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src="/media/backgrounds/opening-cosmos.webp"
            alt="Cosmic Environment"
            className="w-full h-full object-cover object-center scale-[1.02]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-void/90 via-transparent to-obsidian-void/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-void/50 via-transparent to-obsidian-void/60 pointer-events-none" />
        </div>

        {/* Golden Sunrise Lake Background Plate (z-0) for Act 1 and Act 2 - Persistent crossfade */}
        <div
          className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
            hasEnteredUniverse && (currentChapter === 'ACT_1' || currentChapter === 'ACT_2')
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src="/media/backgrounds/act1-sunrise.png"
            alt="Golden Sunrise Over Lake"
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        </div>

        {/* Act 3 Warm Candlelit Vanity Background Plate (z-0) */}
        {hasEnteredUniverse && currentChapter === 'ACT_3' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/media/backgrounds/act3-vanity.jpg"
              alt="Warm Candlelit Vanity Room"
              className="w-full h-full object-cover object-center scale-[1.01]"
              draggable={false}
            />
          </div>
        )}

        {/* Act 4 Cinematic Background Plates (z-0) with smooth crossfade */}
        {hasEnteredUniverse && currentChapter === 'ACT_4' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 4A Daylight Vinyl Plate */}
            <img
              src="/media/backgrounds/act-4-vinyl-daylight.png"
              alt="Daylight Listening Room"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act4SubStage === 'vinyl' && vinylSide === 'daylight' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />

            {/* 4A After-Hours Vinyl Plate */}
            <img
              src="/media/backgrounds/act-4-vinyl-after-hours.png"
              alt="After-Hours Listening Room"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act4SubStage === 'vinyl' && vinylSide === 'afterHours' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />

            {/* 4B Goosebump Constellation Plate */}
            <img
              src="/media/backgrounds/act-4-constellation.jpg"
              alt="The Goosebump Constellation Over Lake"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act4SubStage === 'constellation' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          </div>
        )}

        {/* Act 5 Cinematic Background Plates (z-0) with smooth crossfade */}
        {hasEnteredUniverse && currentChapter === 'ACT_5' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 5A Alchemy Lab Plate */}
            <img
              src="/media/backgrounds/act-5-alchemy-lab.jpg"
              alt="The Magical Alchemy Lab"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act5SubStage === 'alchemy' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />

            {/* 5B Gold Foil Scratch Vault Plate */}
            <img
              src="/media/backgrounds/act-5-scratch-vault.jpg"
              alt="The Gold Foil Scratch Vault"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act5SubStage === 'vault' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          </div>
        )}

        {/* Act 6 Cinematic Background Plate (z-0) */}
        {hasEnteredUniverse && currentChapter === 'ACT_6' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/media/backgrounds/act-6-across-distance.jpg"
              alt="Across the Distance Night Sky"
              className="w-full h-full object-cover object-center scale-[1.01]"
              draggable={false}
            />
          </div>
        )}

        {/* Act 7 Cinematic Background Plates (z-0) with smooth crossfade */}
        {hasEnteredUniverse && currentChapter === 'ACT_7' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 7A Cake & Candle Plate */}
            <img
              src="/media/backgrounds/act-7-cake-bg.jpg"
              alt="Moonlit Lake Birthday Cake Celebration"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act7SubStage === 'cake' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />

            {/* 7B Sky Lantern Plate */}
            <img
              src="/media/backgrounds/act-7-lantern-bg.jpg"
              alt="60 Fireflies and Sky Lantern over Moonlit Lake"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act7SubStage === 'lantern' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />

            {/* 7C Birthday Letter Plate */}
            <img
              src="/media/backgrounds/act-7-letter-bg.jpg"
              alt="The Sealed Birthday Letter"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                act7SubStage === 'letter' ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          </div>
        )}

        {/* Act VIII Final Gift Reveal Background Plate (z-0) */}
        {hasEnteredUniverse && currentChapter === 'FINAL_GIFT' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/media/backgrounds/final-gift-reveal.png"
              alt="Moonlit Lake with Royal Gift Pedestal"
              className="w-full h-full object-cover object-center scale-[1.01]"
              draggable={false}
            />
          </div>
        )}

        {/* After-Credits Private VIP Vault Background Plate (z-0) */}
        {hasEnteredUniverse && currentChapter === 'AFTER_CREDITS' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/media/backgrounds/after-credits-vault-bg.jpg"
              alt="Private Moonlit VIP Vault Lounge"
              className="w-full h-full object-cover object-center scale-[1.01]"
              draggable={false}
            />
            {/* Subtle soft dark gradient overlay for optimal voucher legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#180810]/75 via-[#180810]/50 to-[#10050A]/85 pointer-events-none" />
          </div>
        )}

        {/* Final Love Letter Grand Closing Background Plate (z-0) */}
        {hasEnteredUniverse && currentChapter === 'FINAL_LOVE_LETTER' && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/media/backgrounds/final-love-letter-bg.png"
              alt="The Last Little Universe Moonlit Lake"
              className="w-full h-full object-cover object-center scale-[1.01]"
              draggable={false}
            />
          </div>
        )}

        {/* Global Golden Drifting Petals (z-[2]) */}
        {hasEnteredUniverse && currentChapter !== 'AFTER_CREDITS' && (
          <GoldenPetals />
        )}

        {/* Persistent 3D WebGL Canvas (z-10) */}
        <PersistentStage />

        {/* Story Narrative Spine Layer (z-20) */}
        <main className="relative z-20 w-full min-h-screen pointer-events-auto">
          {currentChapter === 'PRELUDE' ? (
            <PreludeInvitation />
          ) : !hasEnteredUniverse || currentChapter === 'OPENING' ? (
            <OpeningPortal />
          ) : currentChapter === 'ACT_1' ? (
            <Act1TwoCountriesOneSky />
          ) : currentChapter === 'ACT_2' ? (
            <Act2LittleThingsIKeep />
          ) : currentChapter === 'ACT_3' ? (
            <Act3SecretMirror />
          ) : currentChapter === 'ACT_4' ? (
            <Act4TwoSidesOfUs />
          ) : currentChapter === 'ACT_5' ? (
            <Act5UciFormula />
          ) : currentChapter === 'ACT_6' ? (
            <Act6AcrossTheDistance />
          ) : currentChapter === 'ACT_7' ? (
            <Act7MoonlitWish />
          ) : currentChapter === 'FINAL_GIFT' ? (
            <FinalGiftReveal />
          ) : currentChapter === 'AFTER_CREDITS' ? (
            <AfterCreditsVipVault />
          ) : currentChapter === 'FINAL_LOVE_LETTER' ? (
            <FinalLoveLetter />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
              <div className="p-6 rounded-2xl glass-panel max-w-md">
                <span className="text-xs font-mono uppercase tracking-widest text-champagne-gold block mb-2">
                  Active Scene Target
                </span>
                <h2 className="text-2xl font-serif text-parchment-warm mb-3">{currentChapter}</h2>
                <p className="text-xs text-parchment-warm/70 leading-relaxed font-sans">
                  The persistent Three.js canvas and HUD engine are live. Sequences will mount per chapter.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </ReducedMotionProvider>
  );
}
