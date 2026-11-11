// src/engine/audio/ProceduralAudio.ts

import { useExperienceStore } from '../../store/useExperienceStore';

export class ProceduralAudio {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private heartbeatInterval: number | null = null;
  private vinylLoopInterval: number | null = null;
  private birthdayTimeouts: number[] = [];
  private isBirthdayMelodyPlaying = false;
  private hasPlayedOpeningSignature = false;
  private lastScratchTime = 0;

  public init(ctx: AudioContext, musicGain: GainNode, sfxGain: GainNode): void {
    this.ctx = ctx;
    this.musicGain = musicGain;
    this.sfxGain = sfxGain;
  }

  private isGlobalMuted(): boolean {
    try {
      return useExperienceStore.getState().isMuted;
    } catch {
      return false;
    }
  }

  // Helper to create a low-pass filtered oscillator with an ADSR envelope
  private playEnvelopeTone(
    freq: number,
    type: OscillatorType,
    attack: number,
    decay: number,
    sustain: number,
    release: number,
    destination: GainNode,
    peakGain: number = 0.25,
    cutoff: number = 2200
  ): void {
    if (!this.ctx || this.isGlobalMuted()) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peakGain, now + attack);
    gain.gain.linearRampToValueAtTime(Math.max(0.0001, peakGain * sustain), now + attack + decay);
    gain.gain.linearRampToValueAtTime(0.0001, now + attack + decay + release);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    const stopTime = now + attack + decay + release + 0.08;
    osc.stop(stopTime);
    osc.onended = () => {
      try {
        osc.disconnect();
        filter.disconnect();
        gain.disconnect();
      } catch {
        // ignore
      }
    };
  }

  // Warm felt-piano + delicate celesta voice for Opening Signature & Birthday Melody
  private playWarmFeltPianoNote(
    freq: number,
    durationSec: number,
    destination: GainNode,
    velocity: number = 0.18,
    includeCelestaShimmer: boolean = true
  ): void {
    if (!this.ctx || this.isGlobalMuted()) return;
    const attack = 0.025;
    const decay = Math.min(0.35, durationSec * 0.45);
    const release = Math.max(0.45, durationSec * 0.75);

    // 1. Warm felt-piano fundamental (rounded sine)
    this.playEnvelopeTone(
      freq,
      'sine',
      attack,
      decay,
      0.38,
      release,
      destination,
      velocity,
      1450
    );

    // 2. Soft wood-body warmth (low-pass triangle)
    this.playEnvelopeTone(
      freq,
      'triangle',
      attack + 0.01,
      decay,
      0.22,
      release * 0.85,
      destination,
      velocity * 0.42,
      1100
    );

    // 3. Delicate celesta / champagne shimmer (restrained octave harmonic, never piercing)
    if (includeCelestaShimmer && freq * 2 <= 1350) {
      this.playEnvelopeTone(
        freq * 2,
        'sine',
        0.015,
        0.18,
        0.08,
        0.42,
        destination,
        velocity * 0.14,
        1600
      );
    }
  }

  // 1. Refined Opening Interaction Signature (~2 seconds, plays once on intentional start)
  public playOpeningSignature(forceReplay: boolean = false): void {
    if (!this.ctx || !this.musicGain || this.isGlobalMuted()) return;
    if (this.hasPlayedOpeningSignature && !forceReplay) return;
    this.hasPlayedOpeningSignature = true;

    // Gentle low-frequency warmth pad: F3 (174.61 Hz) + C4 (261.63 Hz)
    this.playEnvelopeTone(174.61, 'sine', 0.18, 0.7, 0.35, 1.15, this.musicGain, 0.11, 900);
    this.playEnvelopeTone(261.63, 'sine', 0.22, 0.65, 0.3, 1.1, this.musicGain, 0.08, 1100);

    // 4-note intimate piano/celesta phrase (~2.0s total): F4 -> A4 -> C5 -> G4
    const phrase = [
      { freq: 349.23, delayMs: 0, dur: 0.55, vel: 0.15 },    // F4
      { freq: 440.0, delayMs: 320, dur: 0.55, vel: 0.16 },   // A4
      { freq: 523.25, delayMs: 650, dur: 0.65, vel: 0.17 },  // C5
      { freq: 392.0, delayMs: 1020, dur: 0.95, vel: 0.15 },  // G4 (warm Fmaj9 resolution)
    ];

    phrase.forEach((n) => {
      window.setTimeout(() => {
        if (!this.isGlobalMuted() && this.musicGain) {
          this.playWarmFeltPianoNote(n.freq, n.dur, this.musicGain, n.vel, true);
        }
      }, n.delayMs);
    });
  }

  public resetOpeningSignatureGuard(): void {
    this.hasPlayedOpeningSignature = false;
  }

  // Alias kept for backward compatibility
  public playCosmicBloomChord(): void {
    this.playOpeningSignature();
  }

  // 2. Star Bridge Connection (Golden Pentatonic Harp)
  public playStarBridgeChime(): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    // C4 (261.63), E4 (329.63), G4 (392.0), A4 (440.0), C5 (523.25)
    const notes = [261.63, 329.63, 392.0, 440.0, 523.25];
    notes.forEach((freq, i) => {
      window.setTimeout(() => {
        if (!this.isGlobalMuted() && this.sfxGain) {
          this.playEnvelopeTone(freq, 'triangle', 0.02, 0.35, 0.12, 0.9, this.sfxGain, 0.14, 1800);
        }
      }, i * 85);
    });
  }

  // 3. Mirror Note Discovered Bell
  public playMirrorNoteChime(): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    this.playEnvelopeTone(523.25, 'sine', 0.015, 0.2, 0.18, 0.65, this.sfxGain, 0.15, 1800);
    this.playEnvelopeTone(659.25, 'triangle', 0.02, 0.15, 0.1, 0.55, this.sfxGain, 0.1, 1900);
  }

  // 4. Constellation Node Tone (0..7 warm Lydian scale)
  public playConstellationStarTone(index: number): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    // F4, G4, A4, B4, C5, D5, E5, F5
    const lydian = [349.23, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 698.46];
    const freq = lydian[Math.min(lydian.length - 1, Math.max(0, index))];
    this.playEnvelopeTone(freq, 'triangle', 0.03, 0.28, 0.15, 1.1, this.sfxGain, 0.16, 1850);
  }

  // Constellation 8/8 Supernova Cascade
  public playSupernovaCascade(): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    const notes = [261.63, 329.63, 392.0, 440.0, 523.25, 659.25];
    notes.forEach((freq, i) => {
      window.setTimeout(() => {
        if (!this.isGlobalMuted() && this.sfxGain) {
          this.playEnvelopeTone(freq, 'sine', 0.05, 0.35, 0.2, 1.5, this.sfxGain, 0.16, 1900);
        }
      }, i * 80);
    });
  }

  // 5. Alchemy Pour & Comedic Overheat Pop
  public playVialPourTone(vialIndex: number): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    const baseFreq = 260 + vialIndex * 70;
    this.playEnvelopeTone(baseFreq, 'sine', 0.05, 0.25, 0.28, 0.45, this.sfxGain, 0.16, 1500);
  }

  public playAlchemyCorkPop(): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // 6. Discrete Heartbeat Lub-Dub Synth (58 Hz & 48 Hz impulses)
  public startHeartbeat(initialBpm: number = 64): void {
    this.stopHeartbeat();
    if (this.isGlobalMuted()) return;
    const currentBpm = initialBpm;

    this.triggerLubDubOnce();
    const intervalMs = (60 / currentBpm) * 1000;
    this.heartbeatInterval = window.setInterval(() => {
      this.triggerLubDubOnce();
    }, intervalMs);
  }

  public updateHeartbeatBpm(bpm: number): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      const intervalMs = (60 / Math.max(40, bpm)) * 1000;
      this.heartbeatInterval = window.setInterval(() => {
        this.triggerLubDubOnce();
      }, intervalMs);
    }
  }

  private triggerLubDubOnce(): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.frequency.setValueAtTime(58, now);
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.26, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    osc1.connect(gain1);
    gain1.connect(this.sfxGain);
    osc1.start(now);
    osc1.stop(now + 0.1);

    window.setTimeout(() => {
      if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
      const dubNow = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.frequency.setValueAtTime(48, dubNow);
      gain2.gain.setValueAtTime(0.0001, dubNow);
      gain2.gain.linearRampToValueAtTime(0.22, dubNow + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, dubNow + 0.1);
      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(dubNow);
      osc2.stop(dubNow + 0.12);
    }, 115);
  }

  public stopHeartbeat(): void {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // 7. Wax Seal Crack Transient
  public playWaxSealCrack(): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    const now = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1400, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
  }

  // 8. Intimate 8-Second Felt-Piano & Celesta "Happy Birthday" Arrangement (One-Shot, Non-Looping)
  public playBirthdayMelodyOnce(onComplete?: () => void): void {
    if (this.isBirthdayMelodyPlaying) return;
    if (!this.ctx || !this.musicGain || this.isGlobalMuted()) {
      if (onComplete) onComplete();
      return;
    }

    this.stopBirthdayMelody();
    this.isBirthdayMelodyPlaying = true;

    // Recognizable Happy Birthday in warm F Major (C4 = 261.63 Hz up to C5 = 523.25 Hz)
    // Total duration ~7.8 seconds with warm felt-piano notes and lower-register bass support
    const melodyNotes: Array<{
      freq: number;
      bassFreq?: number;
      timeMs: number;
      durSec: number;
      vel: number;
    }> = [
      // Phrase 1: "Happy birthday to you" (C4 C4 D4 C4 F4 E4)
      { freq: 261.63, timeMs: 0, durSec: 0.32, vel: 0.16 },
      { freq: 261.63, timeMs: 260, durSec: 0.24, vel: 0.14 },
      { freq: 293.66, bassFreq: 174.61, timeMs: 480, durSec: 0.52, vel: 0.18 }, // F3 bass
      { freq: 261.63, timeMs: 960, durSec: 0.52, vel: 0.16 },
      { freq: 349.23, bassFreq: 220.0, timeMs: 1440, durSec: 0.55, vel: 0.19 },  // A3 warm third
      { freq: 329.63, bassFreq: 130.81, timeMs: 1920, durSec: 0.95, vel: 0.17 }, // C3 bass

      // Phrase 2: "Happy birthday to you" (C4 C4 D4 C4 G4 F4)
      { freq: 261.63, timeMs: 2780, durSec: 0.3, vel: 0.16 },
      { freq: 261.63, timeMs: 3040, durSec: 0.24, vel: 0.14 },
      { freq: 293.66, bassFreq: 130.81, timeMs: 3260, durSec: 0.5, vel: 0.18 },  // C3 bass
      { freq: 261.63, timeMs: 3720, durSec: 0.5, vel: 0.16 },
      { freq: 392.0, bassFreq: 196.0, timeMs: 4180, durSec: 0.55, vel: 0.19 },   // G3
      { freq: 349.23, bassFreq: 174.61, timeMs: 4660, durSec: 0.95, vel: 0.18 }, // F3 bass

      // Phrase 3 & 4 warm cadence: C4 C5 A4 F4 E4 D4 -> Bb4 A4 F4 G4 F4
      { freq: 261.63, timeMs: 5450, durSec: 0.26, vel: 0.16 },
      { freq: 523.25, bassFreq: 174.61, timeMs: 5680, durSec: 0.48, vel: 0.19 }, // C5 + F3
      { freq: 440.0, timeMs: 6100, durSec: 0.42, vel: 0.17 },                    // A4
      { freq: 349.23, bassFreq: 116.54, timeMs: 6480, durSec: 0.42, vel: 0.17 }, // F4 + Bb2
      { freq: 329.63, timeMs: 6860, durSec: 0.38, vel: 0.16 },                   // E4
      { freq: 392.0, bassFreq: 130.81, timeMs: 7200, durSec: 0.45, vel: 0.17 },  // G4 + C3
      { freq: 349.23, bassFreq: 174.61, timeMs: 7620, durSec: 1.5, vel: 0.2 },   // F4 + F3 final warm resolution
    ];

    melodyNotes.forEach((item) => {
      const tid = window.setTimeout(() => {
        if (!this.isBirthdayMelodyPlaying || this.isGlobalMuted() || !this.musicGain) return;
        this.playWarmFeltPianoNote(item.freq, item.durSec, this.musicGain, item.vel, true);
        if (item.bassFreq) {
          this.playEnvelopeTone(
            item.bassFreq,
            'sine',
            0.04,
            0.45,
            0.35,
            item.durSec * 1.1,
            this.musicGain,
            item.vel * 0.65,
            850
          );
        }
      }, item.timeMs);
      this.birthdayTimeouts.push(tid);
    });

    // Final warm F major triad pad on the resolution note (7620ms)
    const chordTid = window.setTimeout(() => {
      if (!this.isBirthdayMelodyPlaying || this.isGlobalMuted() || !this.musicGain) return;
      this.playEnvelopeTone(220.0, 'sine', 0.08, 0.7, 0.3, 1.4, this.musicGain, 0.1, 1100);  // A3
      this.playEnvelopeTone(261.63, 'sine', 0.08, 0.7, 0.3, 1.4, this.musicGain, 0.1, 1200); // C4
    }, 7620);
    this.birthdayTimeouts.push(chordTid);

    const doneTid = window.setTimeout(() => {
      this.isBirthdayMelodyPlaying = false;
      this.birthdayTimeouts = [];
      if (onComplete) onComplete();
    }, 8600);
    this.birthdayTimeouts.push(doneTid);
  }

  public stopBirthdayMelody(): void {
    this.birthdayTimeouts.forEach((tid) => clearTimeout(tid));
    this.birthdayTimeouts = [];
    this.isBirthdayMelodyPlaying = false;
  }

  // Backward-compatible alias
  public playBirthdayMusicBoxMelody(): void {
    this.playBirthdayMelodyOnce();
  }

  // 9. Subtle Vinyl Record Scratch / Scrubbing Transient
  public playVinylScratchTransient(speedFactor: number = 1): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    const nowMs = performance.now();
    if (nowMs - this.lastScratchTime < 65) return;
    this.lastScratchTime = nowMs;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    const clamped = Math.min(2.2, Math.max(0.5, speedFactor));
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 * clamped, now);
    osc.frequency.exponentialRampToValueAtTime(240 * clamped, now + 0.045);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, now);
    filter.Q.setValueAtTime(2.5, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // 10. Vinyl Side A / Side B Procedural Fallback Loops (only used if MP3 fails to load)
  public startVinylLoop(mode: 'daylight' | 'afterHours'): void {
    this.stopVinylLoop();
    if (!this.ctx || !this.musicGain || this.isGlobalMuted()) return;

    if (mode === 'daylight') {
      const chords = [
        [311.13, 392.0, 466.16],
        [293.66, 349.23, 440.0],
        [261.63, 329.63, 392.0],
        [349.23, 440.0, 523.25],
      ];
      let chordIndex = 0;
      this.vinylLoopInterval = window.setInterval(() => {
        if (this.isGlobalMuted() || !this.musicGain) return;
        const chord = chords[chordIndex % chords.length];
        chord.forEach((freq) => {
          this.playEnvelopeTone(freq, 'sine', 0.1, 0.8, 0.3, 1.8, this.musicGain!, 0.08, 1400);
        });
        chordIndex++;
      }, 1300);
    } else {
      const chords = [
        [185.0, 277.18, 329.63],
        [138.59, 207.65, 246.94],
        [146.83, 220.0, 277.18],
      ];
      let chordIndex = 0;
      this.vinylLoopInterval = window.setInterval(() => {
        if (this.isGlobalMuted() || !this.musicGain) return;
        const chord = chords[chordIndex % chords.length];
        chord.forEach((freq) => {
          this.playEnvelopeTone(freq, 'sine', 0.15, 1.2, 0.4, 2.2, this.musicGain!, 0.1, 1100);
        });
        chordIndex++;
      }, 1760);
    }
  }

  public stopVinylLoop(): void {
    if (this.vinylLoopInterval !== null) {
      clearInterval(this.vinylLoopInterval);
      this.vinylLoopInterval = null;
    }
  }

  // Stop all recurring intervals & pending melody timers on chapter transition or mute
  public stopAllActiveLoops(): void {
    this.stopVinylLoop();
    this.stopHeartbeat();
    this.stopBirthdayMelody();
  }

  // 11. Luxury Gift Box Unboxing Shimmer
  public playGiftBoxOpen(): void {
    if (!this.ctx || !this.sfxGain || this.isGlobalMuted()) return;
    const notes = [349.23, 440.0, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => {
        if (!this.isGlobalMuted() && this.sfxGain) {
          this.playEnvelopeTone(freq, 'triangle', 0.02, 0.45, 0.22, 1.6, this.sfxGain, 0.15, 2100);
        }
      }, idx * 105);
    });
  }

  public dispose(): void {
    this.stopAllActiveLoops();
  }
}

export const proceduralAudio = new ProceduralAudio();
