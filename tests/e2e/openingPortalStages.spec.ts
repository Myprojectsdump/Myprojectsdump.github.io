// tests/e2e/openingPortalStages.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Opening Portal Cinematic Reveal Stages', () => {
  test.setTimeout(180000);

  const resolutions = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1440x900', width: 1440, height: 900 },
  ];

  for (const res of resolutions) {
    test(`captures all reveal stages at ${res.name}`, async ({ page }) => {
      await page.setViewportSize({ width: res.width, height: res.height });
      const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/opening');

      await page.goto('/');
      await page.waitForSelector('canvas');
      await page.waitForTimeout(500);

      // Stage 1: Empty Cosmic Environment Plate
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(1));
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_01_empty_environment.png`),
      });

      // Stage 2: Two Distant Stars
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(2));
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_02_distant_stars.png`),
      });

      // Stage 3: Golden Connecting Filament
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(3));
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_03_golden_filament.png`),
      });

      // Stage 4: Prelude Narrative on Upper-Left
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(4));
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_04_prelude_narrative.png`),
      });

      // Stage 5: 3D Faceted Diamond Heart & Astrolabe Rings Assembly
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(5));
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_05_orbital_heart_assembly.png`),
      });

      // Stage 6: Hero Eyebrow & Title
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(6));
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_06_hero_title.png`),
      });

      // Stage 7: Subtitle, Divider & Whispers
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(7));
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_07_whisper_and_quote.png`),
      });

      // Stage 8: Final Illuminated CTA & Sound Toggle
      await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.setOpeningStage(8));
      await page.waitForTimeout(800);
      const enterButton = page.locator('button', { hasText: 'ENTER MY UNIVERSE' });
      await expect(enterButton).toBeVisible();

      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_08_final_typography_composition.png`),
      });
    });
  }
});
