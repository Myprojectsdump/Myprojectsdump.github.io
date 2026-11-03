// src/types/store.types.ts

import { ChapterId } from './scene.types';

export interface VipRedemptionRecord {
  redeemed: boolean;
  redeemedAtIso: string | null;
}

export interface ExperienceState {
  // Navigation & Spine
  hasEnteredUniverse: boolean;
  currentChapter: ChapterId;
  visitedChapters: ChapterId[];
  isTransitioning: boolean;
  transitionPhase: 'idle' | 'in' | 'out';
  transitionMessage: string;

  // Act I
  isBridgeConnected: boolean;

  // Act II — Memories
  discoveredMemoryIds: string[];
  activeMemoryModalId: string | null;

  // Act III — Mirror
  discoveredMirrorNoteIds: number[];
  mirrorClearedPercent: number;
  mirrorRefogNonce: number;

  // Act IV — Two Sides of Us
  act4SubStage: 'vinyl' | 'constellation';
  vinylSide: 'daylight' | 'afterHours';
  isVinylPlaying: boolean;
  vinylConfessionIndex: number;
  kissCount: number;

  // Act IV-B — Constellation
  discoveredStarIds: string[];
  activeStarId: string | null;

  // Act V-A — Alchemy
  act5SubStage: 'alchemy' | 'vault';
  pouredVialIds: string[];
  temperatureCelsius: number;
  isAlchemyOverheated: boolean;

  // Act V-B — Scratch Vault
  revealedScratchIds: string[];
  savedScratchIds: string[];

  // Act VI — Heartbeat
  isHoldingFingerprint: boolean;
  heartbeatCompleted: boolean;

  // Act VII — Lake, Candle, Lantern, Letter
  act7SubStage: 'cake' | 'lantern' | 'letter';
  cakeAssemblyStep: number;
  cakeBaseType: 'vanilla' | 'chocolate' | 'red-velvet' | 'strawberry';
  isCandleExtinguished: boolean;
  isLanternReleased: boolean;
  birthdayWishText: string;
  includeNaughtyWish: boolean;
  isLetterSealBroken: boolean;
  isLetterVoicePlaying: boolean;

  // Sequence 3 Climax — Impossible Gift
  isGiftAssembled: boolean;
  giftAssemblyNonce: number;
  isGiftRibbonUntied: boolean;
  isGiftBoxOpened: boolean;

  // After-Credits — VIP Passes
  vipRedemptions: Record<string, VipRedemptionRecord>;

  // Audio & Accessibility Settings
  isMuted: boolean;
  musicVolume: number;
  sfxVolume: number;
  captionsEnabled: boolean;
  reducedMotionChoice: 'system' | 'reduce' | 'full';

  // Actions
  enterUniverse: (muted?: boolean) => void;
  setCurrentChapter: (chapter: ChapterId, immediate?: boolean) => void;
  skipToNextChapter: () => void;
  skipToPrevChapter: () => void;
  setBridgeConnected: (connected: boolean) => void;
  discoverMemory: (id: string) => void;
  setActiveMemoryModal: (id: string | null) => void;
  discoverMirrorNote: (id: number) => void;
  setMirrorClearedPercent: (percent: number) => void;
  refogMirror: () => void;
  setAct4SubStage: (stage: 'vinyl' | 'constellation') => void;
  setVinylSide: (side: 'daylight' | 'afterHours') => void;
  setVinylPlaying: (playing: boolean) => void;
  setVinylConfessionIndex: (index: number) => void;
  incrementKissCount: () => void;
  discoverStar: (id: string) => void;
  setActiveStar: (id: string | null) => void;
  pourVial: (id: string) => void;
  replayAlchemy: () => void;
  setAct5SubStage: (stage: 'alchemy' | 'vault') => void;
  revealScratchCard: (id: string) => void;
  refoilScratchCard: (id: string) => void;
  toggleSaveScratchCard: (id: string) => void;
  setHoldingFingerprint: (holding: boolean) => void;
  completeHeartbeat: () => void;
  replayHeartbeat: () => void;
  setAct7SubStage: (stage: 'cake' | 'lantern' | 'letter') => void;
  setCakeAssemblyStep: (step: number) => void;
  setCakeBaseType: (base: 'vanilla' | 'chocolate' | 'red-velvet' | 'strawberry') => void;
  resetCake: () => void;
  extinguishCandle: () => void;
  relightCandle: () => void;
  setBirthdayWish: (text: string, naughty: boolean) => void;
  releaseLantern: () => void;
  breakLetterSeal: () => void;
  resealLetter: () => void;
  setLetterVoicePlaying: (playing: boolean) => void;
  setGiftAssembled: (assembled: boolean) => void;
  replayGiftAssembly: () => void;
  untieGiftRibbon: () => void;
  openGiftBox: () => void;
  replayGiftBox: () => void;
  redeemVipPass: (id: string) => void;
  unclaimVipPass: (id: string) => void;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  toggleCaptions: () => void;
  setReducedMotionChoice: (choice: 'system' | 'reduce' | 'full') => void;
  resetAllProgress: () => void;
}
