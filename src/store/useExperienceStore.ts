// src/store/useExperienceStore.ts

import { create } from 'zustand';
import { ExperienceState } from '../types/store.types';
import { ChapterId } from '../types/scene.types';
import { CHAPTERS } from '../config/chapters';
import { loadPersistedState, savePersistedState, clearAllPersistedState, DEFAULT_PERSISTED_STATE } from './persistence';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';

const persisted = loadPersistedState();

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  // Navigation & Spine - Always reset on reload per user instruction
  hasEnteredUniverse: false,
  currentChapter: 'PRELUDE',
  visitedChapters: ['PRELUDE'],
  isTransitioning: false,
  transitionPhase: 'idle',
  transitionMessage: 'A little moment with you...',

  // Act I
  isBridgeConnected: false,

  // Act II — Memories
  discoveredMemoryIds: persisted.discoveredMemoryIds || [],
  activeMemoryModalId: null,

  // Act III — Mirror
  discoveredMirrorNoteIds: persisted.discoveredMirrorNoteIds || [],
  mirrorClearedPercent: 0,
  mirrorRefogNonce: 0,

  // Act IV — Two Sides of Us
  act4SubStage: 'vinyl',
  vinylSide: persisted.vinylSide || 'daylight',
  isVinylPlaying: false,
  vinylConfessionIndex: 0,
  kissCount: persisted.kissCount || 0,

  // Act IV-B — Constellation
  discoveredStarIds: persisted.discoveredStarIds || [],
  activeStarId: null,

  // Act V-A — Alchemy
  act5SubStage: 'alchemy',
  pouredVialIds: [],
  temperatureCelsius: 37,
  isAlchemyOverheated: false,

  // Act V-B — Scratch Vault
  revealedScratchIds: persisted.revealedScratchIds || [],
  savedScratchIds: persisted.savedScratchIds || [],

  // Act VI — Heartbeat
  isHoldingFingerprint: false,
  heartbeatCompleted: false,

  // Act VII — Lake, Candle, Lantern, Letter
  act7SubStage: 'cake',
  cakeAssemblyStep: 1, // Start at first stage - not built completely per user instruction
  cakeBaseType: 'vanilla',
  isCandleExtinguished: false,
  isLanternReleased: false,
  birthdayWishText: '',
  includeNaughtyWish: false,
  isLetterSealBroken: false,
  isLetterVoicePlaying: false,

  // Sequence 3 Climax — Impossible Gift
  isGiftAssembled: false,
  giftAssemblyNonce: 0,
  isGiftRibbonUntied: persisted.isGiftRibbonUntied || false,
  isGiftBoxOpened: persisted.isGiftBoxOpened || false,

  // After-Credits — VIP Passes
  vipRedemptions: persisted.vipRedemptions || {},

  // Audio & Accessibility Settings
  isMuted: persisted.isMuted ?? false,
  musicVolume: persisted.musicVolume ?? 0.7,
  sfxVolume: persisted.sfxVolume ?? 0.85,
  captionsEnabled: persisted.captionsEnabled ?? true,
  reducedMotionChoice: persisted.reducedMotionChoice || 'system',

  // Actions
  enterUniverse: (muted?: boolean) => {
    const isMuted = muted !== undefined ? muted : get().isMuted;
    set({ hasEnteredUniverse: true, isMuted });
    savePersistedState({ isMuted });
  },

  setCurrentChapter: (chapter: ChapterId, immediate = false) => {
    const current = get().currentChapter;
    if (current === chapter) return;

    const visited = get().visitedChapters;
    const newVisited = visited.includes(chapter) ? visited : [...visited, chapter];

    const reducedMotion = get().reducedMotionChoice;
    if (immediate || reducedMotion === 'reduce') {
      set({
        currentChapter: chapter,
        visitedChapters: newVisited,
        isTransitioning: false,
        transitionPhase: 'idle',
      });
      return;
    }

    // Creative Celestial Page Transition
    const chapterConfig = CHAPTERS.find((c) => c.id === chapter);
    const label = chapterConfig ? `${chapterConfig.railLabel} • ${chapterConfig.shortTitle}` : 'Our Little Universe';

    set({
      isTransitioning: true,
      transitionPhase: 'in',
      transitionMessage: label,
    });

    try {
      proceduralAudio.playStarBridgeChime();
    } catch {
      // Audio fallback
    }

    setTimeout(() => {
      set({
        currentChapter: chapter,
        visitedChapters: newVisited,
        transitionPhase: 'out',
      });
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

      setTimeout(() => {
        set({
          isTransitioning: false,
          transitionPhase: 'idle',
        });
      }, 350);
    }, 320);
  },

  skipToNextChapter: () => {
    const current = get().currentChapter;
    const currentIndex = CHAPTERS.findIndex((c) => c.id === current);
    if (currentIndex >= 0 && currentIndex < CHAPTERS.length - 1) {
      const nextChapter = CHAPTERS[currentIndex + 1].id;
      get().setCurrentChapter(nextChapter);
    }
  },

  skipToPrevChapter: () => {
    const current = get().currentChapter;
    const currentIndex = CHAPTERS.findIndex((c) => c.id === current);
    if (currentIndex > 0) {
      const prevChapter = CHAPTERS[currentIndex - 1].id;
      get().setCurrentChapter(prevChapter);
    }
  },

  setBridgeConnected: (connected: boolean) => {
    set({ isBridgeConnected: connected });
  },

  discoverMemory: (id: string) => {
    const current = get().discoveredMemoryIds;
    if (!current.includes(id)) {
      const updated = [...current, id];
      set({ discoveredMemoryIds: updated });
      savePersistedState({ discoveredMemoryIds: updated });
    }
  },

  setActiveMemoryModal: (id: string | null) => {
    set({ activeMemoryModalId: id });
  },

  discoverMirrorNote: (id: number) => {
    const current = get().discoveredMirrorNoteIds;
    if (!current.includes(id)) {
      const updated = [...current, id];
      set({ discoveredMirrorNoteIds: updated });
      savePersistedState({ discoveredMirrorNoteIds: updated });
    }
  },

  setMirrorClearedPercent: (percent: number) => {
    set({ mirrorClearedPercent: Math.max(0, Math.min(100, percent)) });
  },

  refogMirror: () => {
    set((state) => ({
      mirrorClearedPercent: 0,
      mirrorRefogNonce: state.mirrorRefogNonce + 1,
    }));
  },

  setAct4SubStage: (stage: 'vinyl' | 'constellation') => {
    set({ act4SubStage: stage });
  },

  setVinylSide: (side: 'daylight' | 'afterHours') => {
    set({ vinylSide: side, vinylConfessionIndex: 0 });
    savePersistedState({ vinylSide: side });
  },

  setVinylPlaying: (playing: boolean) => {
    set({ isVinylPlaying: playing });
  },

  setVinylConfessionIndex: (index: number) => {
    set({ vinylConfessionIndex: Math.max(0, Math.min(3, index)) });
  },

  incrementKissCount: () => {
    const updated = get().kissCount + 1;
    set({ kissCount: updated });
    savePersistedState({ kissCount: updated });
  },

  discoverStar: (id: string) => {
    const current = get().discoveredStarIds;
    if (!current.includes(id)) {
      const updated = [...current, id];
      set({ discoveredStarIds: updated });
      savePersistedState({ discoveredStarIds: updated });
    }
  },

  setActiveStar: (id: string | null) => {
    set({ activeStarId: id });
  },

  pourVial: (id: string) => {
    const currentPoured = get().pouredVialIds;
    if (currentPoured.includes(id)) return;

    const newPoured = [...currentPoured, id];
    const tempMap = [37, 52, 74, 96, 999];
    const newTemp = tempMap[newPoured.length] || 999;
    const isOverheated = newPoured.length >= 4;

    set({
      pouredVialIds: newPoured,
      temperatureCelsius: newTemp,
      isAlchemyOverheated: isOverheated,
    });

    if (isOverheated) {
      savePersistedState({ isAlchemyOverheated: true });
    }
  },

  replayAlchemy: () => {
    set({
      pouredVialIds: [],
      temperatureCelsius: 37,
      isAlchemyOverheated: false,
    });
    savePersistedState({ isAlchemyOverheated: false });
  },

  setAct5SubStage: (stage: 'alchemy' | 'vault') => {
    set({ act5SubStage: stage });
  },

  revealScratchCard: (id: string) => {
    const current = get().revealedScratchIds;
    if (!current.includes(id)) {
      const updated = [...current, id];
      set({ revealedScratchIds: updated });
      savePersistedState({ revealedScratchIds: updated });
    }
  },

  refoilScratchCard: (id: string) => {
    const current = get().revealedScratchIds;
    const updated = current.filter((item) => item !== id);
    set({ revealedScratchIds: updated });
    savePersistedState({ revealedScratchIds: updated });
  },

  toggleSaveScratchCard: (id: string) => {
    const current = get().savedScratchIds;
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    set({ savedScratchIds: updated });
    savePersistedState({ savedScratchIds: updated });
  },

  setHoldingFingerprint: (holding: boolean) => {
    set({ isHoldingFingerprint: holding });
  },

  completeHeartbeat: () => {
    set({ heartbeatCompleted: true, isHoldingFingerprint: false });
    savePersistedState({ heartbeatCompleted: true });
  },

  replayHeartbeat: () => {
    set({ heartbeatCompleted: false, isHoldingFingerprint: false });
    savePersistedState({ heartbeatCompleted: false });
  },

  setAct7SubStage: (stage: 'cake' | 'lantern' | 'letter') => {
    set({ act7SubStage: stage });
  },

  setCakeAssemblyStep: (step: number) => {
    set({ cakeAssemblyStep: step });
  },

  setCakeBaseType: (base: 'vanilla' | 'chocolate' | 'red-velvet' | 'strawberry') => {
    set({ cakeBaseType: base });
  },

  resetCake: () => {
    set({ cakeAssemblyStep: 1, isCandleExtinguished: false });
    savePersistedState({ isCandleExtinguished: false });
  },

  extinguishCandle: () => {
    set({ isCandleExtinguished: true });
    savePersistedState({ isCandleExtinguished: true });
  },

  relightCandle: () => {
    set({ isCandleExtinguished: false });
    savePersistedState({ isCandleExtinguished: false });
  },

  setBirthdayWish: (text: string, naughty: boolean) => {
    set({ birthdayWishText: text, includeNaughtyWish: naughty });
    savePersistedState({ birthdayWishText: text, includeNaughtyWish: naughty });
  },

  releaseLantern: () => {
    set({ isLanternReleased: true });
    savePersistedState({ isLanternReleased: true });
  },

  breakLetterSeal: () => {
    set({ isLetterSealBroken: true });
    savePersistedState({ isLetterSealBroken: true });
  },

  resealLetter: () => {
    set({ isLetterSealBroken: false, isLetterVoicePlaying: false });
    savePersistedState({ isLetterSealBroken: false });
  },

  setLetterVoicePlaying: (playing: boolean) => {
    set({ isLetterVoicePlaying: playing });
  },

  setGiftAssembled: (assembled: boolean) => {
    set({ isGiftAssembled: assembled });
  },

  replayGiftAssembly: () => {
    set((state) => ({
      isGiftAssembled: false,
      isGiftRibbonUntied: false,
      isGiftBoxOpened: false,
      giftAssemblyNonce: state.giftAssemblyNonce + 1,
    }));
    savePersistedState({ isGiftRibbonUntied: false, isGiftBoxOpened: false });
  },

  untieGiftRibbon: () => {
    set({ isGiftRibbonUntied: true });
    savePersistedState({ isGiftRibbonUntied: true });
  },

  openGiftBox: () => {
    set({ isGiftRibbonUntied: true, isGiftBoxOpened: true });
    savePersistedState({ isGiftRibbonUntied: true, isGiftBoxOpened: true });
  },

  replayGiftBox: () => {
    set({ isGiftRibbonUntied: false, isGiftBoxOpened: false });
    savePersistedState({ isGiftRibbonUntied: false, isGiftBoxOpened: false });
  },

  redeemVipPass: (id: string) => {
    const current = { ...get().vipRedemptions };
    current[id] = {
      redeemed: true,
      redeemedAtIso: new Date().toISOString(),
    };
    set({ vipRedemptions: current });
    savePersistedState({ vipRedemptions: current });
  },

  unclaimVipPass: (id: string) => {
    const current = { ...get().vipRedemptions };
    current[id] = {
      redeemed: false,
      redeemedAtIso: null,
    };
    set({ vipRedemptions: current });
    savePersistedState({ vipRedemptions: current });
  },

  toggleMute: () => {
    const updated = !get().isMuted;
    set({ isMuted: updated });
    savePersistedState({ isMuted: updated });
  },

  setMuted: (muted: boolean) => {
    set({ isMuted: muted });
    savePersistedState({ isMuted: muted });
  },

  setMusicVolume: (volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume));
    set({ musicVolume: clamped });
    savePersistedState({ musicVolume: clamped });
  },

  setSfxVolume: (volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume));
    set({ sfxVolume: clamped });
    savePersistedState({ sfxVolume: clamped });
  },

  toggleCaptions: () => {
    const updated = !get().captionsEnabled;
    set({ captionsEnabled: updated });
    savePersistedState({ captionsEnabled: updated });
  },

  setReducedMotionChoice: (choice: 'system' | 'reduce' | 'full') => {
    set({ reducedMotionChoice: choice });
    savePersistedState({ reducedMotionChoice: choice });
  },

  resetAllProgress: () => {
    clearAllPersistedState();
    set({
      hasEnteredUniverse: false,
      currentChapter: 'PRELUDE',
      visitedChapters: ['PRELUDE'],
      isTransitioning: false,
      isBridgeConnected: false,
      discoveredMemoryIds: [],
      activeMemoryModalId: null,
      discoveredMirrorNoteIds: [],
      mirrorClearedPercent: 0,
      mirrorRefogNonce: 0,
      vinylSide: 'daylight',
      isVinylPlaying: false,
      vinylConfessionIndex: 0,
      kissCount: 0,
      discoveredStarIds: [],
      activeStarId: null,
      pouredVialIds: [],
      temperatureCelsius: 37,
      isAlchemyOverheated: false,
      revealedScratchIds: [],
      savedScratchIds: [],
      isHoldingFingerprint: false,
      heartbeatCompleted: false,
      isCandleExtinguished: false,
      isLanternReleased: false,
      birthdayWishText: '',
      includeNaughtyWish: false,
      isLetterSealBroken: false,
      isLetterVoicePlaying: false,
      isGiftRibbonUntied: false,
      isGiftBoxOpened: false,
      vipRedemptions: {},
      isMuted: DEFAULT_PERSISTED_STATE.isMuted,
      musicVolume: DEFAULT_PERSISTED_STATE.musicVolume,
      sfxVolume: DEFAULT_PERSISTED_STATE.sfxVolume,
      captionsEnabled: DEFAULT_PERSISTED_STATE.captionsEnabled,
      reducedMotionChoice: DEFAULT_PERSISTED_STATE.reducedMotionChoice,
    });
  },
}));

if (typeof window !== 'undefined') {
  (window as any).__UCI_TEST_PROBES__ = (window as any).__UCI_TEST_PROBES__ || {};
  (window as any).__UCI_TEST_PROBES__.useExperienceStore = useExperienceStore;
  (window as any).useExperienceStore = useExperienceStore;
}
