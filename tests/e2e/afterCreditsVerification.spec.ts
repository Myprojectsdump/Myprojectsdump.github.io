// tests/e2e/afterCreditsVerification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('After-Credits: Private VIP Vault — Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/vip-vault');

  test('verifies After-Credits VIP Vault on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to home
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 2. Transition directly into AFTER_CREDITS
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('AFTER_CREDITS');
      }
    });

    await page.waitForTimeout(1000);

    // =========================================================================
    // 3. Verify Introduction & Headings
    // =========================================================================
    await expect(page.getByText('U ♥ S // AFTER-CREDITS — PRIVATE VIP VAULT')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your Lifetime VIP Passes' })).toBeVisible();
    await expect(
      page.getByText('Redeemable remotely tonight across the distance, or at our next reunion ♥')
    ).toBeVisible();

    // Verify Both Tier Headings
    await expect(page.getByRole('heading', { name: 'SWEET // PRINCESS TIER' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AFTER-MIDNIGHT // 18+ SPICY 🔥' })).toBeVisible();

    // Verify initial probe count
    const initialProbeCount = await page.evaluate(() => {
      return (window as any).__UCI_TEST_PROBES__?.vipRedemptionCount ?? 0;
    });
    expect(initialProbeCount).toBe(0);

    // Verify initial Claimed count badges
    await expect(page.getByText('0 of 3 Claimed').first()).toBeVisible();

    // Take screenshot of initial vault layout
    await page.screenshot({
      path: path.join(screenshotDir, '01_vip_vault_initial_1920x1080.png'),
      fullPage: true,
    });

    // =========================================================================
    // 4. Test Sweet Coupon Flip, Claim, and Stamp
    // =========================================================================
    // Click first Sweet card (UCI-ROYAL-001) to flip
    const sweetCard1 = page.getByRole('button', { name: /Full Princess Day & Craving Run/i }).first();
    await expect(sweetCard1).toBeVisible();
    await sweetCard1.click();
    await page.waitForTimeout(700);

    // Verify Back Face elements
    await expect(page.getByText('OFFICIAL VIP VOUCHER').first()).toBeVisible();
    await expect(page.getByText('UCI-ROYAL-001').first()).toBeVisible();
    await expect(page.getByText('READY TO REDEEM').first()).toBeVisible();

    // Click Redeem This Pass button on back face
    const redeemSweetBtn = page.getByRole('button', { name: /Redeem This Pass/i }).first();
    await expect(redeemSweetBtn).toBeVisible();
    await redeemSweetBtn.click();
    await page.waitForTimeout(600);

    // Verify Claimed Stamp and timestamp
    await expect(page.getByText('CLAIMED & REDEEMED').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Reset \/ Unclaim Pass/i }).first()).toBeVisible();

    // Verify live count badge updated to 1 of 3 Claimed
    await expect(page.getByText('1 of 3 Claimed').first()).toBeVisible();

    // Verify test probe incremented
    const probeAfterSweet = await page.evaluate(() => {
      return (window as any).__UCI_TEST_PROBES__?.vipRedemptionCount;
    });
    expect(probeAfterSweet).toBe(1);

    // Flip back
    const flipBackSweetBtn = page.getByRole('button', { name: /Flip Back/i }).first();
    await flipBackSweetBtn.click();
    await page.waitForTimeout(700);

    // Verify Front face now reflects Redeemed status
    await expect(page.getByText('Redeemed').first()).toBeVisible();

    // =========================================================================
    // 5. Test Spicy Coupon Flip, Consent Terms, Claim, and Stamp
    // =========================================================================
    // Click first Spicy card (UCI-HEAT-004) to flip
    const spicyCard1 = page.getByRole('button', { name: /30-Minute Uninterrupted Hands-On Massage/i }).first();
    await expect(spicyCard1).toBeVisible();
    await spicyCard1.click();
    await page.waitForTimeout(700);

    // Verify Back Face elements and Consent terms
    await expect(page.getByText('AFTER-MIDNIGHT PASS').first()).toBeVisible();
    await expect(page.getByText('UCI-HEAT-004').first()).toBeVisible();
    await expect(
      page.getByText('Always mutual. Either of us can say "not now".').first()
    ).toBeVisible();
    // Confirm "No Refusal Allowed" is NOT present
    await expect(page.getByText('No Refusal Allowed')).not.toBeVisible();

    // Click Claim This Pass button on back face
    const claimSpicyBtn = page.getByRole('button', { name: /Claim This Pass/i }).first();
    await expect(claimSpicyBtn).toBeVisible();
    await claimSpicyBtn.click();
    await page.waitForTimeout(600);

    // Verify Claimed Stamp
    await expect(page.getByText('CLAIMED FOR TONIGHT / REUNION').first()).toBeVisible();

    // Verify probe updated to 2
    const probeAfterSpicy = await page.evaluate(() => {
      return (window as any).__UCI_TEST_PROBES__?.vipRedemptionCount;
    });
    expect(probeAfterSpicy).toBe(2);

    // Take screenshot of redeemed passes
    await page.screenshot({
      path: path.join(screenshotDir, '02_vip_vault_cards_redeemed_1920x1080.png'),
      fullPage: true,
    });

    // Flip back
    const flipBackSpicyBtn = page.getByRole('button', { name: /Flip Back/i }).first();
    await flipBackSpicyBtn.click();
    await page.waitForTimeout(700);

    // =========================================================================
    // 6. Test Unclaiming / Reset
    // =========================================================================
    // Flip first sweet card again
    await sweetCard1.click();
    await page.waitForTimeout(700);

    // Click Reset / Unclaim Pass
    await page.getByRole('button', { name: /Reset \/ Unclaim Pass/i }).first().click();
    await page.waitForTimeout(600);

    // Verify it reverts to READY TO REDEEM
    await expect(page.getByText('READY TO REDEEM').first()).toBeVisible();

    // Verify probe decremented to 1
    const probeAfterReset = await page.evaluate(() => {
      return (window as any).__UCI_TEST_PROBES__?.vipRedemptionCount;
    });
    expect(probeAfterReset).toBe(1);

    await flipBackSweetBtn.click();
    await page.waitForTimeout(700);

    // =========================================================================
    // 7. Verify Closing Vow and On-Call Presence
    // =========================================================================
    await expect(
      page.getByText('"Your birthday may happen once a year. But choosing you is something I want to do every day."')
    ).toBeVisible();

    // Verify On Call status indicator
    await expect(page.getByText(/On Call With You Right Now/i)).toBeVisible();

    // Verify Our Final Universe navigation button
    const finalUniverseBtn = page.getByRole('button', { name: /Our Final Universe/i }).first();
    await expect(finalUniverseBtn).toBeVisible();

    // =========================================================================
    // 8. Verify Footer Navigation Destinations
    // =========================================================================
    await expect(page.getByRole('button', { name: /Replay From Opening/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Back to 3D Gift Box/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Re-read Letter/i })).toBeVisible();

    // Test transition to Re-read Letter (ACT_7)
    await page.getByRole('button', { name: /Re-read Letter/i }).click();
    await page.waitForTimeout(800);

    const chapterAfterNav = await page.evaluate(() => {
      return (window as any).useExperienceStore?.getState?.()?.currentChapter;
    });
    expect(chapterAfterNav).toBe('ACT_7');

    // Confirm no uncaught exceptions
    const severeErrors = consoleErrors.filter(
      (err) => !err.includes('AudioContext') && !err.includes('404') && !err.includes('Failed to load resource')
    );
    expect(severeErrors).toEqual([]);
  });

  test('verifies After-Credits VIP Vault on 1440x900', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('AFTER_CREDITS');
      }
    });

    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Your Lifetime VIP Passes' })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '04_vip_vault_1440x900.png'),
      fullPage: true,
    });
  });

  test('verifies After-Credits VIP Vault on 1280x720', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('AFTER_CREDITS');
      }
    });

    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Your Lifetime VIP Passes' })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '05_vip_vault_1280x720.png'),
      fullPage: true,
    });
  });

  test('verifies After-Credits VIP Vault on Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('AFTER_CREDITS');
      }
    });

    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Your Lifetime VIP Passes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SWEET // PRINCESS TIER' })).toBeVisible();

    // Verify no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    await page.screenshot({
      path: path.join(screenshotDir, '06_vip_vault_mobile_390x844.png'),
      fullPage: true,
    });
  });
});
