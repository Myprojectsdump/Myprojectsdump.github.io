// src/store/transientMotionState.ts

import { ChapterId, GiftRevealPhase, TransientMotionBus } from '../types/scene.types';

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
  giftBoxUserEuler: { x: 0.14, y: 0.32 },
  openingStage: 1,
  openingParticlesConvergence: 0,
  openingHeartScale: 0,
  openingHeartGlow: 0,
  openingRingProgress: [0, 0, 0, 0, 0, 0, 0],
  giftRevealPhase: 'ASSEMBLING',
  giftSecretCompartmentOpen: 0,
};

export function setGiftRevealPhase(phase: GiftRevealPhase): void {
  transientMotionState.giftRevealPhase = phase;
  if (typeof window !== 'undefined' && window.__UCI_TEST_PROBES__) {
    window.__UCI_TEST_PROBES__.giftRevealPhase = phase;
  }
}

export function setGiftSecretCompartmentOpen(progress: number): void {
  transientMotionState.giftSecretCompartmentOpen = progress;
  if (typeof window !== 'undefined' && window.__UCI_TEST_PROBES__) {
    window.__UCI_TEST_PROBES__.giftSecretCompartmentOpen = progress;
  }
}

export function addGiftBoxUserRotation(deltaX: number, deltaY: number): void {
  transientMotionState.giftBoxUserEuler.y += deltaX * 0.008;
  transientMotionState.giftBoxUserEuler.x = Math.max(
    -0.45,
    Math.min(0.75, transientMotionState.giftBoxUserEuler.x + deltaY * 0.008)
  );
  if (typeof window !== 'undefined' && window.__UCI_TEST_PROBES__) {
    window.__UCI_TEST_PROBES__.giftBoxRotationY = transientMotionState.giftBoxUserEuler.y;
    window.__UCI_TEST_PROBES__.giftBoxRotationX = transientMotionState.giftBoxUserEuler.x;
  }
}

export function setGiftBoxUserRotation(x: number, y: number): void {
  transientMotionState.giftBoxUserEuler.x = Math.max(-0.45, Math.min(0.75, x));
  transientMotionState.giftBoxUserEuler.y = y;
  if (typeof window !== 'undefined' && window.__UCI_TEST_PROBES__) {
    window.__UCI_TEST_PROBES__.giftBoxRotationY = y;
    window.__UCI_TEST_PROBES__.giftBoxRotationX = x;
  }
}

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
