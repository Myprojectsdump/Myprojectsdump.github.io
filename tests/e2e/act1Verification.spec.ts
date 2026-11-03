// tests/e2e/act1Verification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act I: Two Countries, One Sky — Visual & Interaction Verification', () => {
  test.setTimeout(180000);

  const resolutions = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1440x900', width: 1440, height: 900 },
  ];

  for (const res of resolutions) {
    test(`verifies Act I at ${res.name}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.setViewportSize({ width: res.width, height: res.height });
      const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/act1');

      // 1. Navigate to page
      await page.goto('/');
      await page.waitForSelector('canvas');

      // 2. Transition into Act I
      await page.evaluate(() => {
        const store = (window as any).useExperienceStore?.getState?.();
        if (store) {
          store.enterUniverse(true);
          store.setCurrentChapter('ACT_1');
        } else {
          // Fallback via button
          const btn = document.querySelector('button');
          btn?.click();
        }
      });

      await page.waitForTimeout(1000);

      // Verify Exact Copy & Elements
      await expect(page.getByText('ACT I · TWO COUNTRIES, ONE SKY')).toBeVisible();
      await expect(page.getByText('A Little Closer, Even From Miles Away.')).toBeVisible();
      await expect(page.getByText('Different countries. Different skies.', { exact: false })).toBeVisible();
      await expect(page.getByText('ME', { exact: true })).toBeVisible();
      await expect(page.getByText('YOU, MY UCI', { exact: false })).toBeVisible();

      const bringTogetherBtn = page.getByRole('button', { name: /BRING OUR SKIES TOGETHER/i });
      await expect(bringTogetherBtn).toBeVisible();
      await expect(page.getByText('Take a moment. This little universe is ours.')).toBeVisible();

      // Screenshot 1: Initial Screen Composition
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_01_initial_composition.png`),
      });

      // 3. Click "BRING OUR SKIES TOGETHER ✨"
      await bringTogetherBtn.click();
      await page.waitForTimeout(400);

      // Screenshot 2: Connection Animation in Progress
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_02_connecting_animation.png`),
      });

      // Wait for ritual completion
      await page.waitForTimeout(1400);

      // Verify Connected-State Message & Voice Player
      await expect(page.getByText('No distance could make you feel far away.', { exact: false })).toBeVisible();
      await expect(page.getByText('I Have Something to Tell You ❤️')).toBeVisible();

      const proceedBtn = page.getByRole('button', { name: /LET'S RELIVE OUR LITTLE MOMENTS/i });
      await expect(proceedBtn).toBeVisible();

      // Screenshot 3: Connected State
      await page.screenshot({
        path: path.join(screenshotDir, `${res.name}_03_connected_state.png`),
      });

      // 4. Test Scroll Experience (Forward and Reverse)
      await page.mouse.wheel(0, 800);
      await page.waitForTimeout(500);
      await page.mouse.wheel(0, -800);
      await page.waitForTimeout(500);

      // 5. Test Continue Navigation to Act II
      await proceedBtn.click();
      await page.waitForTimeout(600);

      // Verify navigation to Act II
      const state = await page.evaluate(() => (window as any).useExperienceStore?.getState?.()?.currentChapter);
      expect(state).toBe('ACT_2');

      // Verify no critical uncaught console errors
      const criticalErrors = consoleErrors.filter(
        (err) => !err.includes('favicon') && !err.includes('AudioContext')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  }
});
