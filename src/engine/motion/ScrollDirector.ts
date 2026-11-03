// src/engine/motion/ScrollDirector.ts

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChapterId } from '../../types/scene.types';
import { setActScrollProgress, transientMotionState } from '../../store/transientMotionState';

gsap.registerPlugin(ScrollTrigger);

export class ScrollDirector {
  private static triggers: ScrollTrigger[] = [];

  public static registerActPin(
    triggerElement: HTMLElement,
    chapter: ChapterId,
    endDistance: string = '+=200%'
  ): ScrollTrigger {
    const trigger = ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top top',
      end: endDistance,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        setActScrollProgress(chapter, self.progress);
        transientMotionState.globalScrollY = self.scroll();
      },
    });

    this.triggers.push(trigger);
    return trigger;
  }

  public static unregister(trigger: ScrollTrigger): void {
    try {
      trigger.kill(true);
    } catch {
      // Safe guard against already unmounted nodes
    }
    this.triggers = this.triggers.filter((t) => t !== trigger);
  }

  public static refresh(): void {
    ScrollTrigger.refresh();
  }

  public static scrollToElement(element: HTMLElement | string, offset: number = 0): void {
    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (target) {
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }

  public static dispose(): void {
    this.triggers.forEach((t) => {
      try {
        t.kill(true);
      } catch {
        // Safe guard against already removed nodes
      }
    });
    this.triggers = [];
    ScrollTrigger.clearMatchMedia();
  }
}
