// tests/unit/storePersistence.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { useExperienceStore } from '../../src/store/useExperienceStore';
import { STORAGE_KEY, loadPersistedState } from '../../src/store/persistence';

describe('Store & Persistence Unit Verification', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
    useExperienceStore.getState().resetAllProgress();
  });

  it('initializes with clean default state', () => {
    const state = useExperienceStore.getState();
    expect(state.hasEnteredUniverse).toBe(false);
    expect(state.currentChapter).toBe('PRELUDE');
    expect(state.visitedChapters).toEqual(['PRELUDE']);
    expect(state.discoveredMemoryIds).toEqual([]);
    expect(state.discoveredMirrorNoteIds).toEqual([]);
    expect(state.kissCount).toBe(0);
    expect(state.isMuted).toBe(false);
  });

  it('updates chapter and records visited chapters', () => {
    const store = useExperienceStore.getState();
    store.setCurrentChapter('ACT_1', true);
    expect(useExperienceStore.getState().currentChapter).toBe('ACT_1');
    expect(useExperienceStore.getState().visitedChapters).toContain('ACT_1');

    store.setCurrentChapter('ACT_2', true);
    expect(useExperienceStore.getState().visitedChapters).toEqual(['PRELUDE', 'ACT_1', 'ACT_2']);
  });

  it('tracks discovered items in runtime store and resets on reload per user rule', () => {
    const store = useExperienceStore.getState();
    store.discoverMemory('mem-01');
    store.discoverMirrorNote(1);
    store.incrementKissCount();
    store.discoverStar('eyes');
    store.revealScratchCard('scratch-1');

    const state = useExperienceStore.getState();
    expect(state.discoveredMemoryIds).toContain('mem-01');
    expect(state.discoveredMirrorNoteIds).toContain(1);
    expect(state.kissCount).toBe(1);
    expect(state.discoveredStarIds).toContain('eyes');
    expect(state.revealedScratchIds).toContain('scratch-1');

    const persisted = loadPersistedState();
    expect(persisted.lastChapter).toBe('PRELUDE');
  });

  it('handles corrupted localStorage gracefully', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, '{invalid_json--');
      const loaded = loadPersistedState();
      expect(loaded.lastChapter).toBe('PRELUDE');
      expect(loaded.visitedChapters).toEqual(['PRELUDE']);
    }
  });

  it('redeems VIP pass with ISO timestamp and remembers status', () => {
    const store = useExperienceStore.getState();
    store.redeemVipPass('vip-01');
    const record = useExperienceStore.getState().vipRedemptions['vip-01'];
    expect(record).toBeDefined();
    expect(record.redeemed).toBe(true);
    expect(record.redeemedAtIso).toBeTruthy();
  });
});
