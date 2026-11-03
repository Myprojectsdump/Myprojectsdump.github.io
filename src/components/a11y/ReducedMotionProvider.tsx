// src/components/a11y/ReducedMotionProvider.tsx

import React, { useEffect } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';

export const ReducedMotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reducedMotionChoice = useExperienceStore((state) => state.reducedMotionChoice);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMotion = () => {
      const isSystemReduced = mediaQuery.matches;
      const effectiveReduced =
        reducedMotionChoice === 'reduce' ||
        (reducedMotionChoice === 'system' && isSystemReduced);

      if (effectiveReduced) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    updateMotion();
    mediaQuery.addEventListener('change', updateMotion);
    return () => mediaQuery.removeEventListener('change', updateMotion);
  }, [reducedMotionChoice]);

  return <>{children}</>;
};
