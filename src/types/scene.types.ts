// src/types/scene.types.ts

export type ChapterId =
  | 'PRELUDE'
  | 'OPENING'
  | 'ACT_1'
  | 'ACT_2'
  | 'ACT_3'
  | 'ACT_4'
  | 'ACT_5'
  | 'ACT_6'
  | 'ACT_7'
  | 'FINAL_GIFT'
  | 'AFTER_CREDITS'
  | 'FINAL_LOVE_LETTER';

export interface CameraPreset {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export type GiftRevealPhase =
  | 'ASSEMBLING'
  | 'ASSEMBLY_COMPLETE'
  | 'READY_TO_OPEN'
  | 'UNTYING'
  | 'OPENING'
  | 'GIFT_REVEALED'
  | 'QUIET_MOMENT'
  | 'POSTSCRIPT_REVEAL'
  | 'POSTSCRIPT_READY'
  | 'COMPLETE';

export interface TransientMotionBus {
  actScrollProgress: Record<ChapterId, number>;
  globalScrollY: number;
  pointerNdc: { x: number; y: number };
  sphereUserEuler: { x: number; y: number; z: number };
  vinylAngularVelocity: number;
  mirrorClearRatioLive: number;
  heartbeatHoldSecondsLive: number;
  candleWindLive: number;
  giftBoxUserEuler: { x: number; y: number };
  openingStage: number;
  openingParticlesConvergence: number;
  openingHeartScale: number;
  openingHeartGlow: number;
  openingRingProgress: number[];
  giftRevealPhase?: GiftRevealPhase;
  giftSecretCompartmentOpen?: number;
}

export interface UciTestProbes {
  sphereRotationDelta: number;
  hemisphereSeparationY: number;
  ringExpansionProgress: number;
  turntableRpm: number;
  litConstellationCount: number;
  flaskFillLevel: number;
  corkWorldY: number;
  fingerprintGapDistance: number;
  candleExtinguishedUniform: number;
  fireflyActiveCount: number;
  giftLidHingeAngleDeg: number;
  giftBoxOpened?: number;
  giftRibbonUntied?: number;
  giftAssemblyProgress?: number;
  giftRevealPhase?: GiftRevealPhase;
  giftSecretCompartmentOpen?: number;
  giftCrestPulseCount?: number;
  giftRibbonTouchCount?: number;
  giftOrnamentHighlightCount?: number;
  giftBoxRotationY?: number;
  giftBoxRotationX?: number;
  velvetCardClicked?: boolean;
  vipRedemptionCount?: number;
  activeMicTrackCount: number;
  masterAudioState: string;
}

declare global {
  interface Window {
    __UCI_TEST_PROBES__?: UciTestProbes;
  }
}
