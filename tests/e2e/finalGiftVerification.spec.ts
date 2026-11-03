// tests/e2e/finalGiftVerification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act VIII: Final Gift Reveal — Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/final-gift');

  test('verifies Act VIII 3D Royal Gift Box Assembly & Reveal on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to home
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 2. Transition directly into FINAL_GIFT
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('FINAL_GIFT');
      }
    });

    await page.waitForTimeout(1000);

    // =========================================================================
    // 3. Verify Header and Initial 3D Construction Stage
    // =========================================================================
    await expect(page.getByText('SEQUENCE 3 CLIMAX // THE IMPOSSIBLE GIFT')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Convergence of Everything' })).toBeVisible();

    // Verify initial construction badge
    await expect(page.getByText(/Constructing Royal Gift/i)).toBeVisible();

    // Verify Untie/Open button is NOT yet available during construction
    await expect(page.getByRole('button', { name: /Untie Crimson Ribbon & Open Box/i })).not.toBeVisible();

    // Fast-forward or trigger assembly completion
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.setGiftAssembled(true);
      }
    });

    await page.waitForTimeout(800);

    // =========================================================================
    // 4. Verify Assembled & Ready State
    // =========================================================================
    await expect(page.getByText('Made with a little bit of magic, and a whole lot of love. ♥')).toBeVisible();
    await expect(page.getByText(/Drag to inspect.*360/i)).toBeVisible();

    const openButton = page.getByRole('button', { name: /Untie Crimson Ribbon & Open Box/i });
    await expect(openButton).toBeVisible();

    const replayAssemblyBtn = page.getByRole('button', { name: /Watch It Come Together Again/i });
    await expect(replayAssemblyBtn).toBeVisible();

    // Verify probe tracks completion
    const probeAfterAssembly = await page.evaluate(() => {
      return (window as any).__UCI_TEST_PROBES__?.giftBoxOpened ?? 0;
    });
    expect(probeAfterAssembly).toBe(0);

    // Take screenshot of assembled royal gift box
    await page.screenshot({
      path: path.join(screenshotDir, '01_gift_assembly_complete_1920x1080.png'),
      fullPage: true,
    });

    // =========================================================================
    // 5. Trigger Untie & Open Ritual
    // =========================================================================
    await openButton.click();
    await page.waitForTimeout(1000);

    // Verify Probes updated
    const probeAfterOpen = await page.evaluate(() => {
      return {
        opened: (window as any).__UCI_TEST_PROBES__?.giftBoxOpened,
        angle: (window as any).__UCI_TEST_PROBES__?.giftLidHingeAngleDeg,
      };
    });
    expect(probeAfterOpen.opened).toBe(1.0);
    expect(probeAfterOpen.angle).toBe(112);

    // =========================================================================
    // 6. Verify Opened Showcase Split View
    // =========================================================================
    // Left framing card
    await expect(page.getByText('✨ A 29-Part Mechanical Masterpiece')).toBeVisible();

    // Right Birthday Gift Showcase Card
    await expect(page.getByText('OFFICIAL BIRTHDAY GIFT')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your Real Birthday Gift Awaits' })).toBeVisible();
    await expect(page.getByText('A Tangible Surprise Outside This Universe')).toBeVisible();

    // Unlock VIP Vault button in footer
    const vaultButton = page.getByRole('button', { name: /Unlock Your After-Credits VIP Vault/i });
    await expect(vaultButton).toBeVisible();

    // Take screenshot of opened gift showcase
    await page.screenshot({
      path: path.join(screenshotDir, '02_gift_box_opened_1920x1080.png'),
      fullPage: true,
    });

    // =========================================================================
    // 7. Verify Replay Assembly Action
    // =========================================================================
    const replayInShowcase = page.getByRole('button', { name: /Replay Assembly/i });
    await expect(replayInShowcase).toBeVisible();
    await replayInShowcase.click();
    await page.waitForTimeout(800);

    // Box should close and revert to construction
    await expect(page.getByText(/Constructing Royal Gift/i)).toBeVisible();

    // Re-assemble and test navigation
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.setGiftAssembled(true);
        store.openGiftBox();
      }
    });
    await page.waitForTimeout(600);

    // Click Unlock VIP Vault
    await page.getByRole('button', { name: /Unlock Your After-Credits VIP Vault/i }).click();
    await page.waitForTimeout(1000);

    const chapterAfterNav = await page.evaluate(() => {
      return (window as any).useExperienceStore?.getState?.()?.currentChapter;
    });
    expect(chapterAfterNav).toBe('AFTER_CREDITS');

    // Confirm no critical console errors
    const severeErrors = consoleErrors.filter(
      (err) => !err.includes('AudioContext') && !err.includes('404') && !err.includes('Failed to load resource')
    );
    expect(severeErrors).toEqual([]);
  });

  test('verifies Act VIII Final Gift Reveal on 1440x900', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('FINAL_GIFT');
        store.setGiftAssembled(true);
      }
    });

    await page.waitForTimeout(1000);
    await expect(page.getByRole('button', { name: /Untie Crimson Ribbon & Open Box/i })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '03_gift_1440x900.png'),
      fullPage: true,
    });
  });

  test('verifies Act VIII Final Gift Reveal on Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('FINAL_GIFT');
        store.setGiftAssembled(true);
      }
    });

    await page.waitForTimeout(1000);
    await expect(page.getByRole('button', { name: /Untie Crimson Ribbon & Open Box/i })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    await page.screenshot({
      path: path.join(screenshotDir, '04_gift_mobile_390x844.png'),
      fullPage: true,
    });
  });
});
