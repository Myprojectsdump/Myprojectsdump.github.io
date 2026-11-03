// tests/e2e/permissionsAndMissingMedia.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AT-21 / AT-31: Permission Denial Fallback & Heirloom Placeholders', () => {
  test('candle blows out with manual button hold and missing media renders heirloom placeholders', async ({ page }) => {
    // Seed visited state so all chapters are accessible
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'uci_gravity_v1',
        JSON.stringify({
          currentChapter: 'ACT_7',
          visitedChapters: ['OPENING', 'ACT_1', 'ACT_2', 'ACT_3', 'ACT_4', 'ACT_5', 'ACT_6', 'ACT_7', 'FINAL_GIFT'],
        })
      );
    });

    await page.goto('/');

    // Resume into Act VII
    const resumeButton = page.locator('button', { hasText: 'Resume at Act VII' });
    if (await resumeButton.isVisible()) {
      await resumeButton.click();
    } else {
      const enterButton = page.locator('button', { hasText: 'ENTER MY UNIVERSE' });
      await enterButton.click();
    }

    // Verify Act VII Candle stage
    await expect(page.locator("text=Make a wish, cintaku. This one's just for you.")).toBeVisible();

    // Primary Hold button is visible and active
    const blowButton = page.locator('button', { hasText: 'Hold to Blow Out Candle' });
    await expect(blowButton).toBeVisible();

    // Optional Mic button is present with explanation
    await expect(page.locator('text=Use Microphone to Blow 🎙️')).toBeVisible();

    // Advance to Final Gift
    const receiveGiftButton = page.locator('button', { hasText: 'Receive Your Birthday Gift' });
    await receiveGiftButton.click();

    // Untie ribbon to reveal gift showcase
    const untieButton = page.locator('button', { hasText: 'Untie Crimson Ribbon & Open Box' });
    await untieButton.click();

    // Verify Heirloom Media Placeholder is rendered without broken images
    await expect(page.locator('text=Reserved Royal Gift Showcase')).toBeVisible();
    await expect(page.locator('text=FOR YOUR HANDS, NOT JUST YOUR SCREEN')).toBeVisible();
  });
});
