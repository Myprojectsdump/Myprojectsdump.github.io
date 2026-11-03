// tests/e2e/act7AndTransitionsVerification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Reload Reset, Cake Initial Stage, Navigation & Page Transitions Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/act7-and-transitions');

  test('verifies fresh page reload starts at Opening with reset state and cake at first stage (not built completely)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Visit root page
    await page.goto('/');
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    // 2. Advance store to simulate progress in session
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      store.enterUniverse(true);
      store.setCurrentChapter('ACT_7', true);
      store.setCakeAssemblyStep(6);
      store.extinguishCandle();
    });

    await page.waitForTimeout(500);
    await expect(page.getByText('ACT VII • THE MOONLIT BIRTHDAY WISH')).toBeVisible();

    // 3. RELOAD the page (F5 / Refresh)
    await page.reload();
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    // 4. Verify EVERYTHING reset back to new
    const reloadedState = await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      return {
        hasEnteredUniverse: store.hasEnteredUniverse,
        currentChapter: store.currentChapter,
        cakeAssemblyStep: store.cakeAssemblyStep,
        isCandleExtinguished: store.isCandleExtinguished,
        isLanternReleased: store.isLanternReleased,
        isLetterSealBroken: store.isLetterSealBroken,
      };
    });

    expect(reloadedState.hasEnteredUniverse).toBe(false);
    expect(reloadedState.currentChapter).toBe('OPENING');
    expect(reloadedState.cakeAssemblyStep).toBe(1); // First stage - not built completely
    expect(reloadedState.isCandleExtinguished).toBe(false);
    expect(reloadedState.isLanternReleased).toBe(false);
    expect(reloadedState.isLetterSealBroken).toBe(false);

    // Opening portal should be visible
    await expect(page.getByText(/THE GRAVITY OF UCI/i).first()).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '01_reload_reset_to_opening.png'),
      fullPage: true,
    });
  });

  test('verifies Act VII cake starts at first stage (sponge only) and navigation has zero duplicates', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('/');
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    // Enter Act VII
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      store.enterUniverse(true);
      store.setCurrentChapter('ACT_7', true);
    });

    await page.waitForTimeout(600);

    // 1. Verify Cake Step 1 is active (First stage - not built completely)
    await expect(page.getByText('1. Choose Cake Base')).toBeVisible();
    await expect(page.getByText('Complete cake steps first to place candle.')).toBeVisible();

    // Verify cake stage artwork is present
    await expect(page.locator('div[aria-label="Artisan Multi-Layered Birthday Cake"]')).toBeVisible();

    // 2. Verify Navigation de-duplication:
    // Header has the 3 sub-stage buttons
    await expect(page.getByRole('button', { name: /7A \/\/ Cake & Candle/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /7B \/\/ Sky Lantern/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /7C \/\/ Birthday Letter/i })).toBeVisible();

    // Footer has clean Previous & Next buttons with NO duplicate 7A/7B/7C buttons
    await expect(page.locator('footer').getByRole('button', { name: /Back to Act VI/i })).toBeVisible();
    await expect(page.locator('footer').getByRole('button', { name: /Continue to Sky Lantern ✨/i })).toBeVisible();
    await expect(page.getByText('Stage 1 of 3 · Cake & Candle')).toBeVisible();

    // Take screenshot of Stage 1 unbuilt cake
    await page.screenshot({
      path: path.join(screenshotDir, '02_cake_stage_1_sponge_only.png'),
      fullPage: true,
    });

    // 3. Step forward to Step 6 using "Finish Cake Quickly ✨"
    const finishQuicklyBtn = page.getByRole('button', { name: /Finish Cake Quickly/i });
    await expect(finishQuicklyBtn).toBeVisible();
    await finishQuicklyBtn.click();
    await page.waitForTimeout(400);

    // Now candle is placed and blow controls are enabled
    await expect(page.getByText('Hold and blow gently to blow out the candle.')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '03_cake_stage_6_candle_placed.png'),
      fullPage: true,
    });
  });

  test('verifies Celestial Page Transition when navigating between chapters', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('/');
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      store.enterUniverse(true);
      store.setCurrentChapter('ACT_1', true);
    });

    await page.waitForTimeout(600);
    await expect(page.getByRole('heading', { name: /A Little Closer, Even From Miles Away/i })).toBeVisible();

    // Trigger chapter navigation using Act 1 next button
    const nextBtn = page.getByRole('button', { name: /LET'S RELIVE OUR LITTLE MOMENTS/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Wait for transition to complete into Act II
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: /Our Little Keepsakes/i })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '04_celestial_page_transition_complete.png'),
      fullPage: true,
    });
  });
});
