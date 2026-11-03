// tests/e2e/finalLoveLetterVerification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Grand Closing Experience — Final Love Letter Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/final-love-letter');

  test('verifies Phase A cinematic intro and Phase B world reveal on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      const text = msg.text();
      if (msg.type() === 'error' && !text.includes('net::ERR_INTERNET_DISCONNECTED') && !text.includes('fonts.gstatic.com') && !text.includes('fonts.googleapis.com')) {
        consoleErrors.push(text);
      }
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to root
    await page.goto('/');
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    // 2. Transition directly into FINAL_LOVE_LETTER
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      store.enterUniverse(true);
      store.setCurrentChapter('FINAL_LOVE_LETTER');
    });

    await page.waitForTimeout(600);

    // =========================================================================
    // 3. Verify Phase A — The Empty Introduction
    // =========================================================================
    await expect(page.getByText('THE GRAVITY OF UCI • CLOSING MOMENT')).toBeVisible();
    await expect(page.getByText(/Before you leave|I saved one last moment|Not another surprise|Just a few words|Uci\.\.\./i)).toBeVisible();

    const skipIntroBtn = page.getByRole('button', { name: /Skip Intro/i });
    await expect(skipIntroBtn).toBeVisible();

    // Capture screenshot of Phase A
    await page.screenshot({
      path: path.join(screenshotDir, '01_phase_a_intro_1920x1080.png'),
      fullPage: true,
    });

    // 4. Click Skip Intro to smoothly transition to Phase B
    await skipIntroBtn.click();
    await page.waitForTimeout(1000);

    // =========================================================================
    // 5. Verify Phase B — The World Reveals Itself
    // =========================================================================
    await expect(page.getByRole('heading', { name: 'I Love You, Uci' })).toBeVisible();
    await expect(page.getByText('Today, Tomorrow. Always.')).toBeVisible();

    // Verify 3D Astrolabe Label
    await expect(page.getByText(/Celestial Astrolabe/i)).toBeVisible();

    // Verify My Poems For You Rail
    await expect(page.getByText(/My Poems For You/i)).toBeVisible();

    // Verify Poem 1 Heading is visible by default
    await expect(page.getByRole('heading', { name: 'The Day You Changed Everything' })).toBeVisible();

    // Verify A Final Note is accessible
    const finalNoteBtn = page.getByRole('button', { name: /A Final Note/i });
    await expect(finalNoteBtn).toBeVisible();
    await finalNoteBtn.click();
    await page.waitForTimeout(500);

    // Verify Final Note content
    await expect(page.getByText('AND AFTER ALL THESE WORDS...')).toBeVisible();
    await expect(page.getByText(/I hope you never forget how deeply you are loved/i)).toBeVisible();
    await expect(page.getByText('I LOVE YOU. ALWAYS.')).toBeVisible();

    // Capture screenshot of Phase B with Final Note
    await page.screenshot({
      path: path.join(screenshotDir, '02_phase_b_final_note_1920x1080.png'),
      fullPage: true,
    });

    // =========================================================================
    // 6. Verify Focus Reading Mode ("Read Quietly")
    // =========================================================================
    const focusReadingBtn = page.getByRole('button', { name: /Read Quietly/i });
    await expect(focusReadingBtn).toBeVisible();
    await focusReadingBtn.click();
    await page.waitForTimeout(600);

    await expect(page.getByText('Standard View')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '03_focus_reading_mode_1920x1080.png'),
      fullPage: true,
    });

    // Exit reading mode
    await page.getByRole('button', { name: /Standard View/i }).click();
    await page.waitForTimeout(400);

    // =========================================================================
    // 7. Verify Ambient Mode ("Stay a Little Longer")
    // =========================================================================
    const ambientBtn = page.getByRole('button', { name: /STAY A LITTLE LONGER|Stay a Little Longer/i });
    await expect(ambientBtn).toBeVisible();
    await ambientBtn.click();
    await page.waitForTimeout(600);

    await expect(page.getByRole('button', { name: /RESUME CONTROLS|Resume Controls/i })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '04_ambient_mode_1920x1080.png'),
      fullPage: true,
    });

    // Resume controls
    await page.getByRole('button', { name: /RESUME CONTROLS|Resume Controls/i }).click();
    await page.waitForTimeout(400);

    // Verify Replay Our Story button is present
    await expect(page.getByRole('button', { name: /REPLAY OUR STORY|Replay Our Story/i })).toBeVisible();
    await expect(page.getByText('NOT AN ENDING... JUST ANOTHER BEAUTIFUL BEGINNING. ♡')).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test('verifies live letter-by-letter handwriting, declaration sequence, and next button navigation', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      const text = msg.text();
      if (msg.type() === 'error' && !text.includes('net::ERR_INTERNET_DISCONNECTED') && !text.includes('fonts.gstatic.com') && !text.includes('fonts.googleapis.com')) {
        consoleErrors.push(text);
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      store.enterUniverse(true);
      store.setCurrentChapter('FINAL_LOVE_LETTER');
    });

    await page.waitForTimeout(600);

    // Verify initial story line
    await expect(page.getByText('THE GRAVITY OF UCI • CLOSING MOMENT')).toBeVisible();

    // Tap through lines 0..4 to reach declaration (two taps per line: 1 to finish typing, 1 to advance)
    for (let i = 0; i < 11; i++) {
      await page.waitForTimeout(150);
      await page.click('body');
    }

    // Now in DECLARATION phase: verify "ENTER OUR FINAL UNIVERSE" and "REPLAY WRITING" buttons appear
    const enterUniverseBtn = page.getByRole('button', { name: /ENTER OUR FINAL UNIVERSE/i });
    await expect(enterUniverseBtn).toBeVisible({ timeout: 10000 });

    const replayWritingBtn = page.getByRole('button', { name: /REPLAY WRITING/i });
    await expect(replayWritingBtn).toBeVisible();

    // Capture screenshot of live declaration
    await page.screenshot({
      path: path.join(screenshotDir, '07_live_handwritten_declaration_1440x900.png'),
      fullPage: true,
    });

    // Test clicking "ENTER OUR FINAL UNIVERSE"
    await enterUniverseBtn.click();
    await page.waitForTimeout(1200);

    // Should now be in MAIN poems screen
    await expect(page.getByRole('heading', { name: 'The Day You Changed Everything' })).toBeVisible();
    await expect(page.getByRole('button', { name: /REPLAY DECLARATION/i })).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test('verifies Final Love Letter on 1440x900 Viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      store.enterUniverse(true);
      store.setCurrentChapter('FINAL_LOVE_LETTER');
    });

    await page.waitForTimeout(600);
    await page.getByRole('button', { name: /Skip Intro/i }).click();
    await page.waitForTimeout(800);

    await expect(page.getByRole('heading', { name: 'I Love You, Uci' })).toBeVisible();
    await expect(page.getByText('NOT AN ENDING... JUST ANOTHER BEAUTIFUL BEGINNING. ♡')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '05_final_love_letter_1440x900.png'),
      fullPage: true,
    });
  });

  test('verifies Final Love Letter on Mobile Viewport (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForSelector('canvas');
    await page.waitForFunction(() => typeof (window as any).useExperienceStore?.getState === 'function');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore.getState();
      store.enterUniverse(true);
      store.setCurrentChapter('FINAL_LOVE_LETTER');
    });

    await page.waitForTimeout(600);
    await page.getByRole('button', { name: /Skip Intro/i }).click();
    await page.waitForTimeout(800);

    await expect(page.getByRole('heading', { name: 'I Love You, Uci' })).toBeVisible();
    await expect(page.getByRole('button', { name: /A Final Note/i })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '06_final_love_letter_mobile_390x844.png'),
      fullPage: true,
    });
  });
});
