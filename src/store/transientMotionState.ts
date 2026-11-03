// src/store/transientMotionState.ts

import { ChapterId, TransientMotionBus } from '../types/scene.types';

export const transientMotionState: TransientMotionBus = {
  actScrollProgress: {
    PRELUDE: 0,
    OPENING: 0,
    ACT_1: 0,
    ACT_2: 0,
    ACT_3: 0,
    ACT_4: 0,
    ACT_5: 0,
    ACT_6: 0,
    ACT_7: 0,
    FINAL_GIFT: 0,
    AFTER_CREDITS: 0,
    FINAL_LOVE_LETTER: 0,
  },
  globalScrollY: 0,
  pointerNdc: { x: 0, y: 0 },
  sphereUserEuler: { x: 0, y: 0, z: 0 },
  vinylAngularVelocity: 0,
  mirrorClearRatioLive: 0,
  heartbeatHoldSecondsLive: 0,
  candleWindLive: 0,
  giftBoxUserEuler: { x: 0, y: 0 },
  openingStage: 1,
  openingParticlesConvergence: 0,
  openingHeartScale: 0,
  openingHeartGlow: 0,
  openingRingProgress: [0, 0, 0, 0, 0, 0, 0],
};

export function setOpeningStage(stage: number): void {
  transientMotionState.openingStage = stage;
}

export function setOpeningAssemblyProgress(
  particles: number,
  heartScale: number,
  heartGlow: number,
  ringProgress: number[]
): void {
  transientMotionState.openingParticlesConvergence = particles;
  transientMotionState.openingHeartScale = heartScale;
  transientMotionState.openingHeartGlow = heartGlow;
  transientMotionState.openingRingProgress = ringProgress;
}

export function setActScrollProgress(chapter: ChapterId, progress: number): void {
  transientMotionState.actScrollProgress[chapter] = Math.max(0, Math.min(1, progress));
}

export function setPointerNdc(x: number, y: number): void {
  transientMotionState.pointerNdc.x = x;
  transientMotionState.pointerNdc.y = y;
}
