// src/utils/musicController.ts
// Authoritative central music & lifecycle controller for THE GRAVITY OF UCI.
// Manages a single HTMLAudioElement with 1.5s cosine crossfades, act-aware procedural cleanup,
// birthday melody ducking, final poem trumpet/jazz synchronization, and single global mute state.

import { SOUNDTRACK_MANIFEST } from '../data/storyData';
import { SoundtrackTrack, SoundtrackTrackId } from '../types/story';
import { ChapterId } from '../types/scene.types';
import { audioEngine } from '../engine/audio/AudioEngine';
import { proceduralAudio } from '../engine/audio/ProceduralAudio';

export interface MusicControllerState {
  currentTrackId: SoundtrackTrackId;
  currentTrack: SoundtrackTrack;
  displayTitle: string;
  displayArtist: string;
  isPlaying: boolean;
  isMuted: boolean;
  isLoading: boolean;
  hasUnlockedGesture: boolean;
  usingFallbackSynth: boolean;
  usingSubstituteTrack: boolean;
  soundtrackUnavailableReason: string | null;
  currentTime: number;
  duration: number;
}

type MusicStateListener = (state: MusicControllerState) => void;

const CROSSFADE_OUT_MS = 600;
const CROSSFADE_IN_MS = 850;

function resolveAssetUrl(src: string): string {
  const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } }).env;
  const baseUrl = metaEnv?.BASE_URL ? metaEnv.BASE_URL : '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  return `${normalizedBase}${normalizedSrc}`;
}

export function mapChapterToTrackId(
  chapter: ChapterId,
  vinylSide: 'daylight' | 'afterHours' = 'daylight',
  act4SubStage: 'vinyl' | 'constellation' = 'vinyl'
): SoundtrackTrackId {
  switch (chapter) {
    case 'PRELUDE':
    case 'OPENING':
    case 'ACT_1':
      return 'act-1-vastness';
    case 'ACT_2':
      return 'act-2-skyline-piano';
    case 'ACT_3':
      return 'act-2-beautiful-dream';
    case 'ACT_4':
      if (act4SubStage === 'constellation') {
        return 'act-4-silent-descent';
      }
      return vinylSide === 'afterHours' ? 'act-3-romantic-01' : 'act-3-daydreamin';
    case 'ACT_5':
      return 'act-5-jb-rnb';
    case 'ACT_6':
      return 'act-6-possible-dreams';
    case 'ACT_7':
    case 'FINAL_GIFT':
    case 'AFTER_CREDITS':
      return 'act-7-discover';
    case 'FINAL_LOVE_LETTER':
      return 'closing-its-been-a-long-long-time';
    default:
      return 'act-1-vastness';
  }
}

class MusicController {
  private audioEl: HTMLAudioElement | null = null;
  private fadeTimer: number | null = null;
  private duckRestoreTimer: number | null = null;
  private listeners: Set<MusicStateListener> = new Set();
  private lastSyncedChapter: ChapterId | null = null;
  private finalPoemOutroStarted = false;
  private triedSubstituteForTrackId: string | null = null;

  private state: MusicControllerState = {
    currentTrackId: 'act-1-vastness',
    currentTrack: SOUNDTRACK_MANIFEST['act-1-vastness'],
    displayTitle: SOUNDTRACK_MANIFEST['act-1-vastness'].title,
    displayArtist: SOUNDTRACK_MANIFEST['act-1-vastness'].artist,
    isPlaying: false,
    isMuted: false,
    isLoading: false,
    hasUnlockedGesture: false,
    usingFallbackSynth: false,
    usingSubstituteTrack: false,
    soundtrackUnavailableReason: null,
    currentTime: 0,
    duration: 0,
  };

  private ensureAudioElement(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (this.audioEl) return this.audioEl;

    const el = new Audio();
    el.preload = 'auto';
    el.loop = true;

    el.addEventListener('playing', () => {
      this.updateState({
        isPlaying: true,
        isLoading: false,
        usingFallbackSynth: false,
        soundtrackUnavailableReason: null,
      });
    });

    el.addEventListener('pause', () => {
      if (!this.state.usingFallbackSynth) {
        this.updateState({ isPlaying: false });
      }
    });

    el.addEventListener('waiting', () => {
      this.updateState({ isLoading: true });
    });

    el.addEventListener('timeupdate', () => {
      this.updateState({
        currentTime: el.currentTime || 0,
        duration: Number.isFinite(el.duration) ? el.duration : 0,
      });
    });

    el.addEventListener('error', () => {
      const track = this.state.currentTrack;
      // If primary file is missing and a licensed fallbackSrc exists (e.g., closing-its-been-a-long-long-time.mp3 -> closing-lounging-by-moonlight.mp3)
      if (track.fallbackSrc && this.triedSubstituteForTrackId !== track.id) {
        this.triedSubstituteForTrackId = track.id;
        this.updateState({
          usingSubstituteTrack: true,
          displayTitle: track.fallbackTitle || track.title,
          displayArtist: track.fallbackArtist || track.artist,
          soundtrackUnavailableReason: null,
        });
        el.src = resolveAssetUrl(track.fallbackSrc);
        el.load();
        if (this.state.hasUnlockedGesture && !this.state.isMuted) {
          el.play().catch(() => {
            this.handleFinalFallback();
          });
        }
        return;
      }

      this.handleFinalFallback();
    });

    this.audioEl = el;
    return el;
  }

  private handleFinalFallback(): void {
    const track = this.state.currentTrack;
    this.updateState({
      isLoading: false,
      usingFallbackSynth: true,
      soundtrackUnavailableReason:
        track.id === 'closing-its-been-a-long-long-time'
          ? 'Closing audio file unavailable — displaying poem in quiet mode.'
          : null,
    });

    if (this.state.hasUnlockedGesture && !this.state.isMuted) {
      this.triggerFallbackSynthForTrack(this.state.currentTrackId);
      this.updateState({ isPlaying: true });
    }
  }

  private triggerFallbackSynthForTrack(trackId: SoundtrackTrackId): void {
    audioEngine.unlockAudioContext();
    proceduralAudio.stopVinylLoop();
    if (trackId === 'act-3-daydreamin') {
      proceduralAudio.startVinylLoop('daylight');
    } else if (trackId === 'act-3-romantic-01') {
      proceduralAudio.startVinylLoop('afterHours');
    }
  }

  private clearFadeTimer(): void {
    if (this.fadeTimer !== null) {
      window.clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  private clearDuckRestoreTimer(): void {
    if (this.duckRestoreTimer !== null) {
      window.clearTimeout(this.duckRestoreTimer);
      this.duckRestoreTimer = null;
    }
  }

  private animateVolume(
    el: HTMLAudioElement,
    fromVol: number,
    toVol: number,
    durationMs: number,
    onComplete?: () => void
  ): void {
    this.clearFadeTimer();
    const steps = Math.max(12, Math.floor(durationMs / 30));
    const stepMs = durationMs / steps;
    let currentStep = 0;

    el.volume = Math.max(0, Math.min(1, fromVol));

    this.fadeTimer = window.setInterval(() => {
      currentStep++;
      const progress = Math.min(1, currentStep / steps);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      const nextVol = fromVol + (toVol - fromVol) * eased;
      el.volume = Math.max(0, Math.min(1, this.state.isMuted ? 0 : nextVol));

      if (progress >= 1) {
        this.clearFadeTimer();
        if (onComplete) onComplete();
      }
    }, stepMs);
  }

  private updateState(partial: Partial<MusicControllerState>): void {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => listener(this.state));
  }

  public getState(): MusicControllerState {
    return this.state;
  }

  public subscribe(listener: MusicStateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public unlockFromUserGesture(initialMuted: boolean = false): void {
    const el = this.ensureAudioElement();
    this.updateState({
      hasUnlockedGesture: true,
      isMuted: initialMuted,
    });

    if (el) {
      el.muted = initialMuted;
    }

    if (!initialMuted) {
      audioEngine.unlockAudioContext();
      this.playTrack(this.state.currentTrackId, true);
    }
  }

  public syncChapterAndMode(
    chapter: ChapterId,
    vinylSide: 'daylight' | 'afterHours' = 'daylight',
    act4SubStage: 'vinyl' | 'constellation' = 'vinyl'
  ): void {
    // Critical audio lifecycle fix: when chapter changes, stop any recurring act intervals/loops
    if (this.lastSyncedChapter !== null && this.lastSyncedChapter !== chapter) {
      proceduralAudio.stopAllActiveLoops();
      this.clearDuckRestoreTimer();
      if (chapter !== 'FINAL_LOVE_LETTER') {
        this.finalPoemOutroStarted = false;
      }
    }
    this.lastSyncedChapter = chapter;

    // Special rule for FINAL_LOVE_LETTER:
    // Do NOT trigger the closing song when entering the black-screen intro/declaration.
    // Instead, fade down any prior background music and wait for playFinalPoemOutroOnce()
    // when the poem reveal animation completes.
    if (chapter === 'FINAL_LOVE_LETTER') {
      if (!this.finalPoemOutroStarted) {
        const el = this.ensureAudioElement();
        const closingTrack = SOUNDTRACK_MANIFEST['closing-its-been-a-long-long-time'];
        this.updateState({
          currentTrackId: 'closing-its-been-a-long-long-time',
          currentTrack: closingTrack,
          displayTitle: closingTrack.title,
          displayArtist: closingTrack.artist,
        });
        if (el && !el.paused) {
          this.animateVolume(el, el.volume, 0, 500, () => {
            el.pause();
          });
        }
      }
      return;
    }

    const nextTrackId = mapChapterToTrackId(chapter, vinylSide, act4SubStage);
    if (nextTrackId === this.state.currentTrackId && this.audioEl && this.audioEl.src) {
      // Ensure volume is restored if returning from a ducked state
      if (this.state.hasUnlockedGesture && !this.state.isMuted && this.audioEl.paused) {
        this.playTrack(nextTrackId, true);
      }
      return;
    }

    const nextTrack = SOUNDTRACK_MANIFEST[nextTrackId];
    const wasPlaying = this.state.isPlaying && !this.state.isMuted;

    this.triedSubstituteForTrackId = null;
    this.updateState({
      currentTrackId: nextTrackId,
      currentTrack: nextTrack,
      displayTitle: nextTrack.title,
      displayArtist: nextTrack.artist,
      usingSubstituteTrack: false,
      soundtrackUnavailableReason: null,
    });

    if (this.state.hasUnlockedGesture && (wasPlaying || !this.state.isMuted)) {
      this.crossfadeToTrack(nextTrackId);
    } else if (this.audioEl) {
      this.audioEl.src = resolveAssetUrl(nextTrack.src);
    }
  }

  // Triggered when entering the Final Poem screen in FinalLoveLetter.tsx
  public playFinalPoemOutroOnce(): void {
    if (this.finalPoemOutroStarted && this.audioEl && !this.audioEl.paused) return;
    this.finalPoemOutroStarted = true;

    this.clearFadeTimer();
    this.clearDuckRestoreTimer();
    proceduralAudio.stopAllActiveLoops();
    this.triedSubstituteForTrackId = null;

    const closingTrack = SOUNDTRACK_MANIFEST['closing-its-been-a-long-long-time'];
    this.updateState({
      currentTrackId: 'closing-its-been-a-long-long-time',
      currentTrack: closingTrack,
      displayTitle: closingTrack.title,
      displayArtist: closingTrack.artist,
      hasUnlockedGesture: true,
      usingSubstituteTrack: false,
      soundtrackUnavailableReason: null,
    });

    const el = this.ensureAudioElement();
    if (!el) return;

    const START_OFFSET_SECONDS = 2.0;
    const applyStartTime = () => {
      try {
        if (el.currentTime < START_OFFSET_SECONDS) {
          el.currentTime = START_OFFSET_SECONDS;
        }
      } catch {
        // Ignore seek errors before metadata loads
      }
    };

    const resolvedUrl = resolveAssetUrl(closingTrack.src);
    if (!el.src.endsWith(closingTrack.src)) {
      el.src = resolvedUrl;
      el.load();
    }

    if (el.readyState >= 1) {
      applyStartTime();
    } else {
      el.addEventListener('loadedmetadata', applyStartTime, { once: true });
    }

    el.muted = this.state.isMuted;
    // Start immediately at target volume (e.g. 0.55) so the trumpet tune plays clearly from 00:02
    el.volume = this.state.isMuted ? 0 : closingTrack.defaultVolume;

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          applyStartTime();
          this.updateState({
            isPlaying: !this.state.isMuted,
            isLoading: false,
            usingFallbackSynth: false,
          });
        })
        .catch(() => {
          // Handled by error listener or autoplay block
        });
    }
  }

  public resetFinalPoemOutroGuard(): void {
    this.finalPoemOutroStarted = false;
  }

  // Coordinates Act VII cake candle blow: ducks background music, plays 8s felt-piano Happy Birthday once, then restores
  public playBirthdayCandleSequenceOnce(): void {
    this.clearDuckRestoreTimer();
    proceduralAudio.stopVinylLoop();
    audioEngine.unlockAudioContext();

    const el = this.ensureAudioElement();
    const targetTrack = this.state.currentTrack;

    if (el && !el.paused && !this.state.isMuted) {
      this.animateVolume(el, el.volume, 0.05, 450);
    }

    proceduralAudio.playBirthdayMelodyOnce(() => {
      if (el && !this.state.isMuted && this.lastSyncedChapter === 'ACT_7') {
        if (el.paused && this.state.hasUnlockedGesture) {
          el.play().catch(() => {});
        }
        this.animateVolume(el, el.volume, targetTrack.defaultVolume, 1100);
      }
    });
  }

  // Interactive scratching on the active vinyl record in Act IV
  public scratchActiveVinyl(deltaSeconds: number): void {
    const el = this.ensureAudioElement();
    audioEngine.unlockAudioContext();
    proceduralAudio.playVinylScratchTransient(Math.abs(deltaSeconds) * 2.5);

    if (el && Number.isFinite(el.duration) && el.duration > 0) {
      const nextTime = (el.currentTime + deltaSeconds + el.duration) % el.duration;
      el.currentTime = Math.max(0, Math.min(el.duration - 0.1, nextTime));
    }
  }

  public crossfadeToTrack(trackId: SoundtrackTrackId): void {
    const el = this.ensureAudioElement();
    const nextTrack = SOUNDTRACK_MANIFEST[trackId];
    if (!el || !nextTrack) return;

    this.triedSubstituteForTrackId = null;
    this.updateState({
      currentTrackId: trackId,
      currentTrack: nextTrack,
      displayTitle: nextTrack.title,
      displayArtist: nextTrack.artist,
      isLoading: true,
      usingSubstituteTrack: false,
    });

    if (!el.paused && el.volume > 0.02) {
      this.animateVolume(el, el.volume, 0, CROSSFADE_OUT_MS, () => {
        this.startNewTrackSource(nextTrack, true);
      });
    } else {
      this.startNewTrackSource(nextTrack, true);
    }
  }

  private startNewTrackSource(track: SoundtrackTrack, fadeIn: boolean): void {
    const el = this.ensureAudioElement();
    if (!el) return;

    proceduralAudio.stopVinylLoop();
    const resolvedUrl = resolveAssetUrl(track.src);

    if (!el.src.endsWith(track.src)) {
      el.src = resolvedUrl;
      el.load();
    }

    if (track.id === 'closing-its-been-a-long-long-time') {
      const applyStartTime = () => {
        try {
          if (el.currentTime < 2.0) {
            el.currentTime = 2.0;
          }
        } catch {
          // Ignore seek errors
        }
      };
      if (el.readyState >= 1) {
        applyStartTime();
      } else {
        el.addEventListener('loadedmetadata', applyStartTime, { once: true });
      }
    }

    el.muted = this.state.isMuted;
    const targetVol = this.state.isMuted ? 0 : track.defaultVolume;
    el.volume = fadeIn ? 0.01 : targetVol;

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (track.id === 'closing-its-been-a-long-long-time') {
            try {
              if (el.currentTime < 2.0) {
                el.currentTime = 2.0;
              }
            } catch {}
          }
          this.updateState({
            isPlaying: !this.state.isMuted,
            isLoading: false,
            usingFallbackSynth: false,
          });
          if (fadeIn && !this.state.isMuted) {
            this.animateVolume(el, 0.01, track.defaultVolume, CROSSFADE_IN_MS);
          }
        })
        .catch(() => {
          // Handled by error listener or autoplay block
        });
    }
  }

  public playTrack(trackId?: SoundtrackTrackId, fadeIn: boolean = true): void {
    const targetId = trackId || this.state.currentTrackId;
    const track = SOUNDTRACK_MANIFEST[targetId];
    if (!track) return;

    this.updateState({
      currentTrackId: targetId,
      currentTrack: track,
      displayTitle: track.title,
      displayArtist: track.artist,
      hasUnlockedGesture: true,
    });

    if (this.state.isMuted) {
      this.setMuted(false);
    }

    this.startNewTrackSource(track, fadeIn);
  }

  public pause(): void {
    this.clearFadeTimer();
    if (this.audioEl && !this.audioEl.paused) {
      this.audioEl.pause();
    }
    proceduralAudio.stopVinylLoop();
    this.updateState({ isPlaying: false });
  }

  public resume(): void {
    this.updateState({ hasUnlockedGesture: true });
    if (this.state.isMuted) {
      this.setMuted(false);
    }
    const el = this.ensureAudioElement();
    if (!el) return;

    if (!el.src) {
      this.startNewTrackSource(this.state.currentTrack, true);
      return;
    }

    el.play()
      .then(() => {
        this.animateVolume(el, el.volume, this.state.currentTrack.defaultVolume, 400);
        this.updateState({ isPlaying: true, usingFallbackSynth: false });
      })
      .catch(() => {
        this.triggerFallbackSynthForTrack(this.state.currentTrackId);
        this.updateState({ isPlaying: true, usingFallbackSynth: true });
      });
  }

  public togglePlay(): void {
    if (this.state.isPlaying && !this.state.isMuted) {
      this.pause();
    } else {
      this.resume();
    }
  }

  public play(): void {
    this.resume();
  }

  public switchTrack(trackId: SoundtrackTrackId): void {
    this.crossfadeToTrack(trackId);
  }

  public setMuted(muted: boolean): void {
    this.clearFadeTimer();
    this.clearDuckRestoreTimer();
    this.updateState({ isMuted: muted });

    const el = this.ensureAudioElement();
    if (el) {
      el.muted = muted;
      if (muted) {
        el.volume = 0;
        if (!el.paused) {
          el.pause();
        }
      } else {
        el.volume = this.state.currentTrack.defaultVolume;
        if (this.state.hasUnlockedGesture) {
          if (el.src) {
            el.play().catch(() => {});
          } else {
            this.startNewTrackSource(this.state.currentTrack, true);
          }
          this.updateState({ isPlaying: true });
        }
      }
    }

    if (muted) {
      proceduralAudio.stopAllActiveLoops();
      this.updateState({ isPlaying: false });
    } else {
      audioEngine.unlockAudioContext();
      audioEngine.syncGainsFromStore();
    }
  }

  public seekToFraction(fraction: number): void {
    const el = this.audioEl;
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return;
    const clamped = Math.max(0, Math.min(1, fraction));
    el.currentTime = clamped * el.duration;
  }
}

export const musicController = new MusicController();
