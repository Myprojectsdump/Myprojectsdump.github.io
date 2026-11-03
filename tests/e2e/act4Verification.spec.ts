// tests/e2e/act4Verification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act IV: The Two Sides of Us — Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/act4');

  test('verifies Act IV Vinyl & Constellation on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to page
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 2. Transition directly into Act IV
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          act4SubStage: 'vinyl',
          vinylSide: 'daylight',
          vinylConfessionIndex: 0,
          discoveredStarIds: [],
        });
        store.setCurrentChapter('ACT_4');
      }
    });

    await page.waitForTimeout(1000);

    // Verify Copy & Main Header
    await expect(page.getByText('ACT IV · THE TWO SIDES OF US')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Dual-Soul Vinyl' })).toBeVisible();
    await expect(page.getByText('The same story... two different sides of us.')).toBeVisible();

    // Verify Side A (Daylight) elements
    await expect(page.getByRole('button', { name: /Side A · Daylight/i })).toBeVisible();
    await expect(page.getByText('TRACK 01 / 04')).toBeVisible();

    // Screenshot 1: Side A (Daylight) Initial Screen
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_01_vinyl_daylight.png'),
    });

    // 3. Test confession stepper (Next confession)
    const nextConfessionBtn = page.getByRole('button', { name: 'Next confession' });
    await nextConfessionBtn.click();
    await page.waitForTimeout(400);
    await expect(page.getByText('TRACK 02 / 04')).toBeVisible();

    // 4. Test Play Needle Toggle
    const dropNeedleBtn = page.getByRole('button', { name: /Drop the Needle|Lift the Needle/i });
    await dropNeedleBtn.click();
    await page.waitForTimeout(300);
    let isPlaying = await page.evaluate(() => (window as any).useExperienceStore?.getState?.()?.isVinylPlaying);
    expect(isPlaying).toBe(true);

    // 5. Test Send a Kiss interaction
    const sendKissBtn = page.getByRole('button', { name: /Send a Kiss/i });
    await sendKissBtn.click();
    await page.waitForTimeout(200);

    // 6. Flip to Side B (After-Hours)
    const flipToAfterHoursBtn = page.getByRole('button', { name: /Flip to After-Hours/i }).first();
    await flipToAfterHoursBtn.click();
    await page.waitForTimeout(800);

    // Verify Side B active
    await expect(page.getByRole('button', { name: /Side B · After-Hours/i })).toBeVisible();

    // Screenshot 2: Side B (After-Hours) Screen
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_02_vinyl_after_hours.png'),
    });

    // 7. Switch to The Goosebump Constellation
    const constellationNavBtn = page.getByRole('button', { name: /Goosebump Constellation/i });
    await constellationNavBtn.click();
    await page.waitForTimeout(1000);

    // Verify Constellation Header & Title
    await expect(page.getByRole('heading', { name: 'The Goosebump Constellation' })).toBeVisible();
    await expect(page.getByText('Eight little stars... each one a feeling', { exact: false })).toBeVisible();

    // Verify Audio stopped on stage switch
    isPlaying = await page.evaluate(() => (window as any).useExperienceStore?.getState?.()?.isVinylPlaying);
    expect(isPlaying).toBe(false);

    // Screenshot 3: Constellation Main View
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_03_constellation_main.png'),
    });

    // 8. Click a Star to uncover a thought (Star 1 - Our First Spark)
    const starBtn = page.getByRole('button', { name: /Our First Spark/i });
    await expect(starBtn).toBeVisible();
    await starBtn.click();
    await page.waitForTimeout(600);

    // Verify Star Detail Card opens
    await expect(page.getByRole('dialog', { name: 'Our First Spark' })).toBeVisible();
    await expect(page.getByText('CONSTELLATION NOTE')).toBeVisible();

    // Screenshot 4: Star Detail Card Modal
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_04_star_detail_modal.png'),
    });

    // Close Star Detail Card
    const closeStarBtn = page.getByRole('button', { name: 'Close constellation note' });
    await closeStarBtn.click();
    await page.waitForTimeout(400);

    // 9. Verify Continue to Act V
    const continueBtn = page.getByRole('button', { name: /CONTINUE TO ACT V/i });
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();
    await page.waitForTimeout(500);

    const nextChapter = await page.evaluate(() => (window as any).useExperienceStore?.getState?.()?.currentChapter);
    expect(nextChapter).toBe('ACT_5');
  });

  test('verifies Act IV on Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          act4SubStage: 'vinyl',
          vinylSide: 'daylight',
        });
        store.setCurrentChapter('ACT_4');
      }
    });

    await page.waitForTimeout(1000);

    // Screenshot: Mobile Vinyl Layout
    await page.screenshot({
      path: path.join(screenshotDir, '390x844_01_mobile_vinyl.png'),
    });

    // Switch to Constellation on Mobile
    const constellationNavBtn = page.getByRole('button', { name: /Goosebump Constellation/i });
    await constellationNavBtn.click();
    await page.waitForTimeout(800);

    // Screenshot: Mobile Constellation Layout
    await page.screenshot({
      path: path.join(screenshotDir, '390x844_02_mobile_constellation.png'),
    });
  });
});
