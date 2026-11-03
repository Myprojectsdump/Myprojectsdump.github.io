// src/engine/audio/AudioEngine.ts

import { proceduralAudio } from './ProceduralAudio';
import { useExperienceStore } from '../../store/useExperienceStore';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private voiceGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private voiceDuckingNode: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private isUnlocked = false;
  private isVoiceDucked = false;
  private currentMusicAudio: HTMLAudioElement | null = null;

  public unlockAudioContext(): void {
    if (this.isUnlocked && this.ctx && this.ctx.state === 'running') return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.ctx) {
        this.ctx = new AudioContextClass();
        this.buildRoutingGraph();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isUnlocked = true;
      this.attachVisibilityListener();

      // Sync initial gains with store
      this.syncGainsFromStore();
    } catch (e) {
      console.warn('AudioContext unlock failed or was blocked by browser', e);
    }
  }

  private buildRoutingGraph(): void {
    if (!this.ctx) return;

    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-2, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

    this.masterGain = this.ctx.createGain();
    this.musicGain = this.ctx.createGain();
    this.voiceGain = this.ctx.createGain();
    this.sfxGain = this.ctx.createGain();
    this.voiceDuckingNode = this.ctx.createGain();

    // Voice ducking sits between music and musicGain
    this.voiceDuckingNode.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.voiceDuckingNode.connect(this.musicGain);

    this.musicGain.connect(this.masterGain);
    this.voiceGain.connect(this.masterGain);
    this.sfxGain.connect(this.masterGain);

    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.ctx.destination);

    // Initialize procedural audio synthesizer bus
    proceduralAudio.init(this.ctx, this.voiceDuckingNode, this.sfxGain);
  }

  private attachVisibilityListener(): void {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      if (!this.ctx || !this.masterGain) return;
      const isMuted = useExperienceStore.getState().isMuted;

      if (document.hidden) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.18);
        setTimeout(() => {
          if (document.hidden && this.ctx && this.ctx.state === 'running') {
            this.ctx.suspend();
          }
        }, 200);
      } else {
        if (!isMuted && this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().then(() => {
            this.syncGainsFromStore();
          });
        }
      }
    });
  }

  public syncGainsFromStore(): void {
    if (!this.ctx || !this.masterGain || !this.musicGain || !this.sfxGain || !this.voiceGain) return;

    const state = useExperienceStore.getState();
    const now = this.ctx.currentTime;

    const targetMaster = state.isMuted ? 0.0001 : 1.0;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(targetMaster, now + 0.08);

    this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
    this.musicGain.gain.linearRampToValueAtTime(state.musicVolume, now + 0.08);

    this.sfxGain.gain.setValueAtTime(this.sfxGain.gain.value, now);
    this.sfxGain.gain.linearRampToValueAtTime(state.sfxVolume, now + 0.08);

    this.voiceGain.gain.setValueAtTime(1.0, now);
  }

  public setVoiceDucking(ducked: boolean): void {
    if (!this.ctx || !this.voiceDuckingNode) return;
    const now = this.ctx.currentTime;
    const targetGain = ducked ? 0.28 : 1.0; // -11 dB attenuation
    const rampTime = ducked ? 0.35 : 0.5;

    this.isVoiceDucked = ducked;
    this.voiceDuckingNode.gain.setValueAtTime(this.voiceDuckingNode.gain.value, now);
    this.voiceDuckingNode.gain.linearRampToValueAtTime(targetGain, now + rampTime);
  }

  public getIsVoiceDucked(): boolean {
    return this.isVoiceDucked;
  }

  public playAudioFile(
    src: string,
    onEnded?: () => void,
    isVoice: boolean = false
  ): HTMLAudioElement {
    this.unlockAudioContext();

    const audio = new Audio(src);
    audio.crossOrigin = 'anonymous';

    if (isVoice) {
      this.setVoiceDucking(true);
      audio.addEventListener('ended', () => {
        this.setVoiceDucking(false);
        if (onEnded) onEnded();
      });
      audio.addEventListener('pause', () => {
        this.setVoiceDucking(false);
      });
    } else {
      if (onEnded) {
        audio.addEventListener('ended', onEnded);
      }
    }

    audio.play().catch(() => {
      // Missing file or autoplay policy block -> fall back gracefully
      if (isVoice) {
        this.setVoiceDucking(false);
      }
    });

    return audio;
  }

  public stopCurrentMusic(): void {
    if (this.currentMusicAudio) {
      this.currentMusicAudio.pause();
      this.currentMusicAudio.src = '';
      this.currentMusicAudio = null;
    }
    proceduralAudio.stopVinylLoop();
  }

  public getContextState(): string {
    return this.ctx ? this.ctx.state : 'uninitialized';
  }

  public dispose(): void {
    this.stopCurrentMusic();
    proceduralAudio.dispose();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const audioEngine = new AudioEngine();
