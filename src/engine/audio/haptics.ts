// src/engine/audio/haptics.ts

import { useExperienceStore } from '../../store/useExperienceStore';

export function triggerHaptic(pattern: number | number[]): void {
  const reducedMotion = useExperienceStore.getState().reducedMotionChoice;
  if (reducedMotion === 'reduce') return;

  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') {
    return;
  }
  try {
    navigator.vibrate(pattern);
  } catch {
    // Silent no-op on desktop browsers, iOS Safari, or restricted permissions
  }
}
