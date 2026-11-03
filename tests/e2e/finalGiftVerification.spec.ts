// tests/e2e/finalGiftVerification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act VIII: The Royal Gift & The Hidden Postscript — Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/final-gift');

  test('verifies full 24-point acceptance sequence: 3D Assembly -> Discovery -> Reveal -> Quiet Moment -> Hidden Postscript -> After-Credits (1920x1080)', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 1. Enter FINAL_GIFT chapter
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('FINAL_GIFT', true);
      }
    });

    await page.waitForTimeout(600);

    // Verify no project name or formal "THE END" heading appears
    await expect(page.locator('text=THE END')).toHaveCount(0);
    await expect(page.locator('text=END CREDITS')).toHaveCount(0);

    // 2. Verify automatic assembly starts in ASSEMBLING phase with first construction message
    const initialPhase = await page.evaluate(() => (window as any).__UCI_TEST_PROBES__?.giftRevealPhase);
    expect(initialPhase).toBe('ASSEMBLING');
    await expect(page.getByText(/Something special is taking shape/i)).toBeVisible();

    // Opening CTA must NOT be visible during assembly
    await expect(page.getByRole('button', { name: /I CAN'T WAIT — OPEN IT!/i })).not.toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '01_empty_pedestal_assembly_start_1920x1080.png'),
      fullPage: true,
    });

    // 3. Complete assembly and verify READY_TO_OPEN state
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.setGiftAssembled(true);
      }
    });

    await expect(page.getByText('Your surprise is ready, princess. ♥')).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByText('Take a closer look. I put a little extra love into the details. ♥')
    ).toBeVisible();

    // 4. Verify optional discovery interactions work (Heart Crest, Satin Ribbon, Gold Filigree)
    await page.getByRole('button', { name: /Ruby Heart Crest/i }).click();
    await expect(page.getByText('The ruby heart crest pulses with warm light ♥')).toBeVisible();

    await page.getByRole('button', { name: /Satin Ribbon/i }).click();
    await expect(page.getByText('Crimson satin tied just for your hands...')).toBeVisible();

    await page.getByRole('button', { name: /Gold Filigree/i }).click();
    await expect(page.getByText('Every golden engraving carries a little wish for you.')).toBeVisible();

    const discoveryProbes = await page.evaluate(() => ({
      crest: (window as any).__UCI_TEST_PROBES__?.giftCrestPulseCount,
      ribbon: (window as any).__UCI_TEST_PROBES__?.giftRibbonTouchCount,
      ornaments: (window as any).__UCI_TEST_PROBES__?.giftOrnamentHighlightCount,
    }));
    expect(discoveryProbes.crest).toBeGreaterThanOrEqual(1);
    expect(discoveryProbes.ribbon).toBeGreaterThanOrEqual(1);
    expect(discoveryProbes.ornaments).toBeGreaterThanOrEqual(1);

    // 5. Verify main opening CTA: "I CAN'T WAIT — OPEN IT!"
    const openCta = page.getByRole('button', { name: /I CAN'T WAIT — OPEN IT!/i });
    await expect(openCta).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '02_completed_gift_box_1920x1080.png'),
      fullPage: true,
    });

    // 6. Click "I CAN'T WAIT — OPEN IT!" and verify physical opening & configured gift showcase
    await openCta.click();

    await expect(page.getByRole('heading', { name: 'Your Real Birthday Gift Awaits' })).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText('A Tangible Surprise Outside This Universe')).toBeVisible();

    const openProbes = await page.evaluate(() => ({
      opened: (window as any).__UCI_TEST_PROBES__?.giftBoxOpened,
      untied: (window as any).__UCI_TEST_PROBES__?.giftRibbonUntied,
      angle: (window as any).__UCI_TEST_PROBES__?.giftLidHingeAngleDeg,
    }));
    expect(openProbes.opened).toBe(1.0);
    expect(openProbes.untied).toBe(1.0);
    expect(openProbes.angle).toBe(112);

    await page.screenshot({
      path: path.join(screenshotDir, '03_gift_opening_and_real_gift_1920x1080.png'),
      fullPage: true,
    });

    // 7. Test distinct Replay Gift Reveal vs Replay Assembly
    await page.getByRole('button', { name: 'Replay Gift Reveal' }).click();
    await expect(page.getByRole('button', { name: /I CAN'T WAIT — OPEN IT!/i })).toBeVisible();

    // Open again to proceed into the Quiet Moment
    await page.getByRole('button', { name: /I CAN'T WAIT — OPEN IT!/i }).click();
    await expect(page.getByRole('heading', { name: 'Your Real Birthday Gift Awaits' })).toBeVisible({
      timeout: 5000,
    });

    // 8. Transition into The Quiet Moment (Apparent Finale)
    await page.getByRole('button', { name: /Let the moment settle/i }).click();

    await expect(
      page.getByText('Thank you for making ordinary days feel a little more beautiful.')
    ).toBeVisible();
    await expect(
      page.getByText("And for being someone I'd choose, in every little moment. ♥")
    ).toBeVisible();

    // Verify golden glimmer clue appears near the open gift box
    const glimmerBtn = page.getByRole('button', {
      name: /Inspect the golden glimmer beneath the gift box/i,
    });
    await expect(glimmerBtn).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '04_quiet_closing_moment_1920x1080.png'),
      fullPage: true,
    });

    // 9. Wait for or trigger the Hidden Postscript Note reveal
    await glimmerBtn.click();

    await expect(page.getByText('P.S. — ONE LAST THING')).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole('heading', { name: 'You thought that was the whole picture?' })
    ).toBeVisible();
    await expect(page.getByText("Oh, we're not done yet. ❤️")).toBeVisible();
    await expect(page.getByText("There's still a little more waiting for you...")).toBeVisible();

    const finalSurpriseBtn = page.getByRole('button', { name: /THERE'S A LITTLE MORE\.\.\. →/i });
    await expect(finalSurpriseBtn).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '05_unfolded_postscript_note_1920x1080.png'),
      fullPage: true,
    });

    // 10. Click "THERE'S A LITTLE MORE... →" and verify transition to AFTER_CREDITS
    await finalSurpriseBtn.click();
    await page.waitForTimeout(1400);

    const chapterAfterNav = await page.evaluate(() => {
      return (window as any).useExperienceStore?.getState?.()?.currentChapter;
    });
    expect(chapterAfterNav).toBe('AFTER_CREDITS');

    await page.screenshot({
      path: path.join(screenshotDir, '06_transition_to_after_credits_1920x1080.png'),
      fullPage: true,
    });

    const severeErrors = consoleErrors.filter(
      (err) =>
        !err.includes('AudioContext') &&
        !err.includes('404') &&
        !err.includes('Failed to load resource')
    );
    expect(severeErrors).toEqual([]);
  });

  test('verifies Mobile Viewport (390x844) composition & zero horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        store.setCurrentChapter('FINAL_GIFT', true);
        store.setGiftAssembled(true);
      }
    });

    await expect(page.getByRole('button', { name: /I CAN'T WAIT — OPEN IT!/i })).toBeVisible({
      timeout: 5000,
    });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });
    expect(hasHorizontalOverflow).toBe(false);

    await page.screenshot({
      path: path.join(screenshotDir, '07_mobile_ready_390x844.png'),
      fullPage: true,
    });
  });
});
