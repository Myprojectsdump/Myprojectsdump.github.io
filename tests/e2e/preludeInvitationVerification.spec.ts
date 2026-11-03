// tests/e2e/preludeInvitationVerification.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Prelude Invitation — Verification Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local dev server
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC-PRELUDE-01: First frame loads with warm invitation envelope on desktop (1440x900)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Verify region container
    const preludeRegion = page.locator('div[role="region"][aria-label*="The Little Invitation"]');
    await expect(preludeRegion).toBeVisible();

    // Verify top bar controls
    await expect(page.getByText('THE GRAVITY OF UCI')).toBeVisible();
    await expect(page.getByRole('button', { name: /Mute Sound|Sound On/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /SKIP INTRO/i })).toBeVisible();

    // Verify envelope inscription
    await expect(page.getByRole('heading', { name: 'FOR UCI' })).toBeVisible();
    await expect(page.getByText('Something I made just for you.')).toBeVisible();

    // Verify golden wax seal button and prompt
    const waxSealBtn = page.getByRole('button', { name: /Golden heart wax seal/i });
    await expect(waxSealBtn).toBeVisible();
    await expect(page.getByText('Tap the little heart to open it ♡')).toBeVisible();

    // Take screenshot of sealed envelope
    await page.screenshot({ path: 'docs/verification/screenshots/prelude-invitation/01_sealed_desktop.png' });
  });

  test('TC-PRELUDE-02: Wax seal click fractures seal, opens envelope, and unfolds letter with text', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const waxSealBtn = page.getByRole('button', { name: /Golden heart wax seal/i });
    await expect(waxSealBtn).toBeVisible();

    // Click wax seal to break
    await waxSealBtn.click();

    // Wait for reading view with unfolded letter
    const headingSalutation = page.getByRole('heading', { name: 'Hey, Uci...' });
    await expect(headingSalutation).toBeVisible({ timeout: 6000 });

    // Verify letter body copy
    await expect(page.getByText('I could have just wished you a happy birthday.')).toBeVisible();
    await expect(page.getByText('So I made something for you.')).toBeVisible();
    await expect(page.getByText("There's a little piece of my heart waiting in every part of it.")).toBeVisible();
    await expect(page.getByText('Come with me, Uci. ♡')).toBeVisible();

    // Verify action buttons
    const comeWithMeBtn = page.getByRole('button', { name: /COME WITH ME, UCI/i });
    await expect(comeWithMeBtn).toBeVisible();
    await expect(page.getByText("Let's begin our little journey.")).toBeVisible();
    await expect(page.getByRole('button', { name: /READ AGAIN/i })).toBeVisible();

    // Take screenshot of unfolded letter
    await page.screenshot({ path: 'docs/verification/screenshots/prelude-invitation/02_unfolded_letter.png' });
  });

  test('TC-PRELUDE-03: Clicking READ AGAIN resets back to sealed envelope', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const waxSealBtn = page.getByRole('button', { name: /Golden heart wax seal/i });
    await waxSealBtn.click();

    const readAgainBtn = page.getByRole('button', { name: /READ AGAIN/i });
    await expect(readAgainBtn).toBeVisible({ timeout: 6000 });

    await readAgainBtn.click();

    // Verify envelope is sealed again
    await expect(page.getByRole('heading', { name: 'FOR UCI' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Golden heart wax seal/i })).toBeVisible();
  });

  test('TC-PRELUDE-04: Clicking COME WITH ME, UCI smoothly transitions into cosmic OPENING chapter', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const waxSealBtn = page.getByRole('button', { name: /Golden heart wax seal/i });
    await waxSealBtn.click();

    const comeWithMeBtn = page.getByRole('button', { name: /COME WITH ME, UCI/i });
    await expect(comeWithMeBtn).toBeVisible({ timeout: 6000 });

    await comeWithMeBtn.click();

    // Verify transition to OpeningPortal
    // OpeningPortal contains "ENTER MY UNIVERSE" or cosmic stage indicators
    await expect(page.locator('text=THE GRAVITY OF UCI')).toBeVisible({ timeout: 8000 });

    // Verify chapter state via probe or store
    const currentChapter = await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState();
      return store ? store.currentChapter : null;
    });
    expect(currentChapter).toBe('OPENING');

    // Take screenshot of opened universe
    await page.screenshot({ path: 'docs/verification/screenshots/prelude-invitation/03_transition_to_opening.png' });
  });

  test('TC-PRELUDE-05: Clicking SKIP INTRO directly navigates to OPENING chapter', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const skipBtn = page.getByRole('button', { name: /SKIP INTRO/i });
    await expect(skipBtn).toBeVisible();

    await skipBtn.click();

    const currentChapter = await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState();
      return store ? store.currentChapter : null;
    });
    expect(currentChapter).toBe('OPENING');
  });

  test('TC-PRELUDE-06: Mobile Viewport (390x844) responsive layout check', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // Verify elements fit nicely
    await expect(page.getByRole('heading', { name: 'FOR UCI' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Golden heart wax seal/i })).toBeVisible();

    // Take mobile screenshot
    await page.screenshot({ path: 'docs/verification/screenshots/prelude-invitation/04_mobile_sealed.png' });
  });
});
