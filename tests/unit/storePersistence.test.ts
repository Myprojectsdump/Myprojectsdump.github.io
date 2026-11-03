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
    expect(state.currentChapter).toBe('OPENING');
    expect(state.visitedChapters).toEqual(['OPENING']);
    expect(state.discoveredMemoryIds).toEqual([]);
    expect(state.discoveredMirrorNoteIds).toEqual([]);
    expect(state.kissCount).toBe(0);
    expect(state.isMuted).toBe(false);
  });

  it('updates chapter and records visited chapters', () => {
    const store = useExperienceStore.getState();
    store.setCurrentChapter('ACT_1');
    expect(useExperienceStore.getState().currentChapter).toBe('ACT_1');
    expect(useExperienceStore.getState().visitedChapters).toContain('ACT_1');

    store.setCurrentChapter('ACT_2');
    expect(useExperienceStore.getState().visitedChapters).toEqual(['OPENING', 'ACT_1', 'ACT_2']);
  });

  it('persists discovered items and survives state reload', () => {
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
    expect(persisted.discoveredMemoryIds).toContain('mem-01');
    expect(persisted.discoveredMirrorNoteIds).toContain(1);
    expect(persisted.kissCount).toBe(1);
    expect(persisted.discoveredStarIds).toContain('eyes');
    expect(persisted.revealedScratchIds).toContain('scratch-1');
  });

  it('handles corrupted localStorage gracefully', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, '{invalid_json--');
      const loaded = loadPersistedState();
      expect(loaded.lastChapter).toBe('OPENING');
      expect(loaded.visitedChapters).toEqual(['OPENING']);
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
