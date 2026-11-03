// src/acts/act4/ConstellationExperience.tsx

import React from 'react';
import { ConstellationMap } from './ConstellationMap';

export const ConstellationExperience: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-between my-auto px-2 select-none">
      <ConstellationMap />
    </div>
  );
};
