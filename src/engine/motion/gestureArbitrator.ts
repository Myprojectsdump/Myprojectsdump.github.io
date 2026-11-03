// src/engine/motion/gestureArbitrator.ts

export type InteractionLockMode =
  | 'none'
  | 'orbit3d'
  | 'mirrorWipe'
  | 'scratchCard'
  | 'fingerprintHold'
  | 'tonearmDrag';

class GestureArbitrator {
  private currentLock: InteractionLockMode = 'none';

  public requestLock(mode: InteractionLockMode): boolean {
    if (this.currentLock !== 'none' && this.currentLock !== mode) {
      return false;
    }
    this.currentLock = mode;
    return true;
  }

  public releaseLock(mode: InteractionLockMode): void {
    if (this.currentLock === mode) {
      this.currentLock = 'none';
    }
  }

  public isLocked(mode?: InteractionLockMode): boolean {
    if (mode) return this.currentLock === mode;
    return this.currentLock !== 'none';
  }

  public getLockMode(): InteractionLockMode {
    return this.currentLock;
  }
}

export const gestureArbitrator = new GestureArbitrator();
