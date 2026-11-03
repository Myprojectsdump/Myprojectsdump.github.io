// src/acts/act5/AlchemyLab.tsx

import React from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { proceduralAudio } from '../../engine/audio/ProceduralAudio';
import { ACT5_INGREDIENTS } from '../../config/act5Ingredients';
import { TemperatureGauge } from './TemperatureGauge';
import { AlchemyCauldron } from './AlchemyCauldron';
import { IngredientVial } from './IngredientVial';
import { IngredientShelf } from './IngredientShelf';

interface AlchemyLabProps {
  onUnlockVault: () => void;
}

export const AlchemyLab: React.FC<AlchemyLabProps> = ({ onUnlockVault }) => {
  const pouredVialIds = useExperienceStore((state) => state.pouredVialIds);
  const temperatureCelsius = useExperienceStore((state) => state.temperatureCelsius);
  const isOverheated = useExperienceStore((state) => state.isAlchemyOverheated);
  const pourVial = useExperienceStore((state) => state.pourVial);
  const replayAlchemy = useExperienceStore((state) => state.replayAlchemy);

  const handlePour = (id: string, index: number) => {
    if (!pouredVialIds.includes(id)) {
      pourVial(id);
      proceduralAudio.playVialPourTone(index);
      if (pouredVialIds.length + 1 >= 4) {
        setTimeout(() => {
          proceduralAudio.playAlchemyCorkPop();
        }, 400);
      }
    }
  };

  const leftVials = ACT5_INGREDIENTS.slice(0, 2);
  const rightVials = ACT5_INGREDIENTS.slice(2, 4);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 py-2 select-none z-20">
      {/* Chapter Subtitle & Interaction Instruction */}
      <div className="text-center max-w-xl px-4">
        <p className="font-serif italic text-sm sm:text-base text-[#F8E6A0]/90 drop-shadow">
          Four little ingredients. One very familiar kind of magic.
        </p>
        <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#D9AE50]/70 uppercase block mt-1">
          {pouredVialIds.length >= 4
            ? 'OUR LITTLE FORMULA IS COMPLETE ♥'
            : 'Choose an ingredient and add a little magic.'}
        </span>
      </div>

      {/* Temperature Gauge */}
      <TemperatureGauge
        temperature={temperatureCelsius}
        isOverheated={isOverheated}
        pouredCount={pouredVialIds.length}
      />

      {/* Main Center Altar: 2 Vials on Left, Cauldron in Center, 2 Vials on Right */}
      <div className="w-full flex items-center justify-center gap-3 sm:gap-6 md:gap-10 my-1">
        {/* Left Pair of Vials */}
        <div className="flex items-center gap-2 sm:gap-5">
          {leftVials.map((ing, i) => (
            <IngredientVial
              key={ing.id}
              ingredient={ing}
              isPoured={pouredVialIds.includes(ing.id)}
              onPour={() => handlePour(ing.id, i)}
            />
          ))}
        </div>

        {/* Central Magical Cauldron */}
        <AlchemyCauldron
          pouredCount={pouredVialIds.length}
          isOverheated={isOverheated}
        />

        {/* Right Pair of Vials */}
        <div className="flex items-center gap-2 sm:gap-5">
          {rightVials.map((ing, i) => (
            <IngredientVial
              key={ing.id}
              ingredient={ing}
              isPoured={pouredVialIds.includes(ing.id)}
              onPour={() => handlePour(ing.id, i + 2)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Shelf of Ingredients & Controls */}
      <IngredientShelf
        pouredVialIds={pouredVialIds}
        isOverheated={isOverheated}
        onPour={handlePour}
        onReset={replayAlchemy}
        onUnlockVault={onUnlockVault}
      />
    </div>
  );
};
