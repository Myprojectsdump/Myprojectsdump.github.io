// src/store/persistence.ts

import { ChapterId } from '../types/scene.types';
import { VipRedemptionRecord } from '../types/store.types';

export const STORAGE_KEY = 'uci_gravity_v1';
export const STORAGE_VERSION = 1;

export interface PersistedStorageV1 {
  version: number;
  lastChapter: ChapterId;
  visitedChapters: ChapterId[];
  discoveredMemoryIds: string[];
  discoveredMirrorNoteIds: number[];
  vinylSide: 'daylight' | 'afterHours';
  kissCount: number;
  discoveredStarIds: string[];
  isAlchemyOverheated: boolean;
  revealedScratchIds: string[];
  savedScratchIds: string[];
  heartbeatCompleted: boolean;
  isCandleExtinguished: boolean;
  isLanternReleased: boolean;
  birthdayWishText: string;
  includeNaughtyWish: boolean;
  isLetterSealBroken: boolean;
  isGiftRibbonUntied: boolean;
  isGiftBoxOpened: boolean;
  vipRedemptions: Record<string, VipRedemptionRecord>;
  isMuted: boolean;
  musicVolume: number;
  sfxVolume: number;
  captionsEnabled: boolean;
  reducedMotionChoice: 'system' | 'reduce' | 'full';
}

export const DEFAULT_PERSISTED_STATE: PersistedStorageV1 = {
  version: STORAGE_VERSION,
  lastChapter: 'PRELUDE',
  visitedChapters: ['PRELUDE'],
  discoveredMemoryIds: [],
  discoveredMirrorNoteIds: [],
  vinylSide: 'daylight',
  kissCount: 0,
  discoveredStarIds: [],
  isAlchemyOverheated: false,
  revealedScratchIds: [],
  savedScratchIds: [],
  heartbeatCompleted: false,
  isCandleExtinguished: false,
  isLanternReleased: false,
  birthdayWishText: '',
  includeNaughtyWish: false,
  isLetterSealBroken: false,
  isGiftRibbonUntied: false,
  isGiftBoxOpened: false,
  vipRedemptions: {},
  isMuted: false,
  musicVolume: 0.7,
  sfxVolume: 0.85,
  captionsEnabled: true,
  reducedMotionChoice: 'system',
};

export function loadPersistedState(): PersistedStorageV1 {
  // User Rule: "whenever i reload the page it should reset everything and go back to new."
  // Wipe stale session cache on fresh browser reload
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable or blocked
    }
  }
  return { ...DEFAULT_PERSISTED_STATE };
}

export function savePersistedState(state: Partial<PersistedStorageV1>): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const current = loadPersistedState();
    const updated: PersistedStorageV1 = {
      ...current,
      ...state,
      version: STORAGE_VERSION,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
}

export function clearAllPersistedState(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear localStorage', e);
  }
}
