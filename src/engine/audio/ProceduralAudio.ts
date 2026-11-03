// src/engine/audio/ProceduralAudio.ts

export class ProceduralAudio {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private heartbeatInterval: number | null = null;
  private vinylLoopInterval: number | null = null;

  public init(ctx: AudioContext, musicGain: GainNode, sfxGain: GainNode): void {
    this.ctx = ctx;
    this.musicGain = musicGain;
    this.sfxGain = sfxGain;
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
    if (!this.ctx) return;
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
    gain.gain.linearRampToValueAtTime(peakGain * sustain, now + attack + decay);
    gain.gain.linearRampToValueAtTime(0.0001, now + attack + decay + release);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + attack + decay + release + 0.1);
  }

  // 1. Cosmic Ambient Bloom Chord (Opening & Entry)
  public playCosmicBloomChord(): void {
    if (!this.ctx || !this.musicGain) return;
    // Fmaj9: F3 (174.61), C4 (261.63), E4 (329.63), G4 (392.0), A4 (440.0)
    const freqs = [174.61, 261.63, 329.63, 392.0, 440.0];
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        this.playEnvelopeTone(freq, 'sine', 0.8, 1.8, 0.4, 2.5, this.musicGain!, 0.15, 1800);
      }, idx * 120);
    });
  }

  // 2. Star Bridge Connection (Golden Pentatonic Harp)
  public playStarBridgeChime(): void {
    if (!this.ctx || !this.sfxGain) return;
    // C5 (523.25), E5 (659.25), G5 (783.99), B5 (987.77), D6 (1174.66)
    const notes = [523.25, 659.25, 783.99, 987.77, 1174.66];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playEnvelopeTone(freq, 'triangle', 0.02, 0.4, 0.1, 1.2, this.sfxGain!, 0.18, 2400);
      }, i * 90);
    });
  }

  // 3. Mirror Note Discovered Bell
  public playMirrorNoteChime(): void {
    if (!this.ctx || !this.sfxGain) return;
    // Bell harmonic: E5 + B5
    this.playEnvelopeTone(659.25, 'sine', 0.01, 0.2, 0.2, 0.8, this.sfxGain, 0.2, 2200);
    this.playEnvelopeTone(987.77, 'triangle', 0.02, 0.15, 0.1, 0.6, this.sfxGain, 0.12, 2400);
  }

  // 4. Constellation Node Tone (0..7 Lydian scale)
  public playConstellationStarTone(index: number): void {
    if (!this.ctx || !this.sfxGain) return;
    // F4, G4, A4, B4, C5, D5, E5, G5
    const lydian = [349.23, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 783.99];
    const freq = lydian[Math.min(lydian.length - 1, Math.max(0, index))];
    this.playEnvelopeTone(freq, 'triangle', 0.03, 0.3, 0.15, 1.4, this.sfxGain, 0.22, 2200);
  }

  // Constellation 8/8 Supernova Cascade
  public playSupernovaCascade(): void {
    if (!this.ctx || !this.sfxGain) return;
    const notes = [349.23, 440.0, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playEnvelopeTone(freq, 'sine', 0.05, 0.4, 0.2, 2.0, this.sfxGain!, 0.2, 2400);
      }, i * 80);
    });
  }

  // 5. Alchemy Pour & Comedic Overheat Pop
  public playVialPourTone(vialIndex: number): void {
    if (!this.ctx || !this.sfxGain) return;
    const baseFreq = 260 + vialIndex * 80;
    this.playEnvelopeTone(baseFreq, 'sine', 0.05, 0.25, 0.3, 0.5, this.sfxGain, 0.18, 1600);
  }

  public playAlchemyCorkPop(): void {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // 180 Hz -> 620 Hz rapid pitch envelope
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // 6. Discrete Heartbeat Lub-Dub Synth (58 Hz & 48 Hz impulses, NO continuous hum)
  public startHeartbeat(initialBpm: number = 64): void {
    this.stopHeartbeat();
    let currentBpm = initialBpm;

    const scheduleBeat = () => {
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // "Lub" (58 Hz)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.frequency.setValueAtTime(58, now);
      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      osc1.connect(gain1);
      gain1.connect(this.sfxGain);
      osc1.start(now);
      osc1.stop(now + 0.1);

      // "Dub" (48 Hz, 120ms later)
      setTimeout(() => {
        if (!this.ctx || !this.sfxGain) return;
        const dubNow = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.frequency.setValueAtTime(48, dubNow);
        gain2.gain.setValueAtTime(0.0001, dubNow);
        gain2.gain.linearRampToValueAtTime(0.24, dubNow + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.0001, dubNow + 0.1);
        osc2.connect(gain2);
        gain2.connect(this.sfxGain);
        osc2.start(dubNow);
        osc2.stop(dubNow + 0.12);
      }, 120);
    };

    scheduleBeat();
    const intervalMs = (60 / currentBpm) * 1000;
    this.heartbeatInterval = window.setInterval(() => {
      scheduleBeat();
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
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.frequency.setValueAtTime(58, now);
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.28, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    osc1.connect(gain1);
    gain1.connect(this.sfxGain);
    osc1.start(now);
    osc1.stop(now + 0.1);

    setTimeout(() => {
      if (!this.ctx || !this.sfxGain) return;
      const dubNow = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.frequency.setValueAtTime(48, dubNow);
      gain2.gain.setValueAtTime(0.0001, dubNow);
      gain2.gain.linearRampToValueAtTime(0.24, dubNow + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, dubNow + 0.1);
      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(dubNow);
      osc2.stop(dubNow + 0.12);
    }, 110);
  }

  public stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // 7. Wax Seal Crack Transient
  public playWaxSealCrack(): void {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.08;
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
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
  }

  // 8. Birthday Music Box (3/4 waltz melody)
  public playBirthdayMusicBoxMelody(): void {
    if (!this.ctx || !this.musicGain) return;
    // Gentle 3/4 waltz celesta motif: C5, C5, D5, C5, F5, E5
    const melody = [
      { note: 523.25, time: 0 },
      { note: 523.25, time: 300 },
      { note: 587.33, time: 600 },
      { note: 523.25, time: 900 },
      { note: 698.46, time: 1200 },
      { note: 659.25, time: 1600 },
    ];

    melody.forEach((item) => {
      setTimeout(() => {
        this.playEnvelopeTone(item.note, 'triangle', 0.01, 0.4, 0.2, 1.4, this.musicGain!, 0.16, 2600);
      }, item.time);
    });
  }

  // 9. Vinyl Side A / Side B Procedural Background Loops
  public startVinylLoop(mode: 'daylight' | 'afterHours'): void {
    this.stopVinylLoop();
    if (!this.ctx || !this.musicGain) return;

    if (mode === 'daylight') {
      // 92 BPM dream-pop Rhodes progression
      const chords = [
        [311.13, 392.0, 466.16], // Eb
        [293.66, 349.23, 440.0],  // Dm
        [261.63, 329.63, 392.0],  // C
        [349.23, 440.0, 523.25],  // F
      ];
      let chordIndex = 0;
      this.vinylLoopInterval = window.setInterval(() => {
        const chord = chords[chordIndex % chords.length];
        chord.forEach((freq) => {
          this.playEnvelopeTone(freq, 'sine', 0.1, 0.8, 0.3, 1.8, this.musicGain!, 0.08, 1400);
        });
        chordIndex++;
      }, 1300);
    } else {
      // 68 BPM velvet late-night progression
      const chords = [
        [185.0, 277.18, 329.63], // F#m9
        [138.59, 207.65, 246.94], // C#m7
        [146.83, 220.0, 277.18],  // Dmaj7
      ];
      let chordIndex = 0;
      this.vinylLoopInterval = window.setInterval(() => {
        const chord = chords[chordIndex % chords.length];
        chord.forEach((freq) => {
          this.playEnvelopeTone(freq, 'sine', 0.15, 1.2, 0.4, 2.2, this.musicGain!, 0.1, 1100);
        });
        chordIndex++;
      }, 1760);
    }
  }

  public stopVinylLoop(): void {
    if (this.vinylLoopInterval) {
      clearInterval(this.vinylLoopInterval);
      this.vinylLoopInterval = null;
    }
  }

  // 10. Luxury Gift Box Unboxing Shimmer
  public playGiftBoxOpen(): void {
    if (!this.ctx || !this.sfxGain) return;
    // Ascending shimmer chords: D5, F#5, A5, C#6, E6
    const notes = [587.33, 739.99, 880.0, 1108.73, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playEnvelopeTone(freq, 'triangle', 0.02, 0.5, 0.25, 2.0, this.sfxGain!, 0.18, 2800);
      }, idx * 110);
    });
  }

  public dispose(): void {
    this.stopHeartbeat();
    this.stopVinylLoop();
  }
}

export const proceduralAudio = new ProceduralAudio();
