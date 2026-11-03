// src/engine/audio/MicrophoneAnalyzer.ts

export type MicStatus = 'idle' | 'listening' | 'extinguished' | 'denied' | 'unsupported';

export class MicrophoneAnalyzer {
  private stream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  private isRunning = false;
  private ambientFloor = 0.02;
  private calibrationFrames = 0;

  public async start(
    onWindEnergy: (energy: number) => void,
    onStatusChange: (status: MicStatus) => void
  ): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      onStatusChange('unsupported');
      return false;
    }

    try {
      onStatusChange('listening');
      const constraints: MediaStreamConstraints = {
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      };

      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch {
        // Fallback to simple audio: true if detailed constraints are rejected
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      this.sourceNode = this.audioCtx.createMediaStreamSource(this.stream);

      // Lowpass filter at 850 Hz to capture deep wind/breath rumble and ignore high room clicks
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(850, this.audioCtx.currentTime);

      this.analyserNode = this.audioCtx.createAnalyser();
      this.analyserNode.fftSize = 512;
      this.dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);

      this.sourceNode.connect(this.filterNode);
      this.filterNode.connect(this.analyserNode);
      // NOTE: NEVER connect this.analyserNode to this.audioCtx.destination (prevents feedback loops!)

      this.isRunning = true;
      this.calibrationFrames = 0;
      this.pollAudio(onWindEnergy);

      return true;
    } catch (e) {
      console.warn('Microphone permission denied or unavailable', e);
      onStatusChange('denied');
      this.dispose();
      return false;
    }
  }

  private pollAudio(onWindEnergy: (energy: number) => void): void {
    if (!this.isRunning || !this.analyserNode || !this.dataArray) return;

    this.analyserNode.getByteTimeDomainData(this.dataArray);

    // Calculate RMS from time domain data
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const normalized = (this.dataArray[i] - 128) / 128;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / this.dataArray.length);

    // Calibrate baseline ambient room noise during first 15 frames (~250ms)
    if (this.calibrationFrames < 15) {
      this.ambientFloor = Math.max(this.ambientFloor, rms);
      this.calibrationFrames++;
      onWindEnergy(0);
    } else {
      // Wind breath signal exceeds ambient floor
      const deltaRms = Math.max(0, rms - this.ambientFloor * 1.5);
      const windNormalized = Math.min(1.0, deltaRms / 0.12);
      onWindEnergy(windNormalized);
    }

    requestAnimationFrame(() => this.pollAudio(onWindEnergy));
  }

  public getActiveTrackCount(): number {
    if (!this.stream) return 0;
    return this.stream.getTracks().filter((t) => t.readyState === 'live').length;
  }

  public dispose(): void {
    this.isRunning = false;

    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      this.stream = null;
    }

    if (this.sourceNode) {
      try {
        this.sourceNode.disconnect();
      } catch {
        // ignore
      }
      this.sourceNode = null;
    }

    if (this.filterNode) {
      try {
        this.filterNode.disconnect();
      } catch {
        // ignore
      }
      this.filterNode = null;
    }

    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch {
        // ignore
      }
      this.audioCtx = null;
    }
  }
}
