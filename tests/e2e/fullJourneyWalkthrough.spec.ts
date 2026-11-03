// tests/e2e/fullJourneyWalkthrough.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AT-01 to AT-28: Full Cinematic Journey Walkthrough', () => {
  test('navigates from Opening through Act VII, Gift Reveal, and VIP Vault', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    // 1. Load Opening Screen
    await page.goto('/');

    // Fast-forward prelude Beat A (4.2s timer) to Beat B if desired by clicking
    const portalSection = page.locator('section[aria-label="Opening: Enter My Universe"]');
    await expect(portalSection).toBeVisible();
    await portalSection.click();

    await expect(page.locator('text=THE GRAVITY OF UCI')).toBeVisible({ timeout: 10000 });

    // Verify Title Casing with trailing period (OQ-02)
    const titleLocator = page.locator('h1', { hasText: 'The Gravity of Uci.' });
    await expect(titleLocator).toBeVisible();

    // 2. Click Enter My Universe
    const enterButton = page.locator('button', { hasText: 'ENTER MY UNIVERSE' });
    await expect(enterButton).toBeVisible();
    await enterButton.click();

    // 3. Act I: Two Countries, One Sky
    await expect(page.locator('text=ACT I // TWO COUNTRIES, ONE SKY')).toBeVisible();
    const connectButton = page.locator('button', { hasText: 'Connect Our Skies' });
    await expect(connectButton).toBeVisible();
    await connectButton.click();

    // Proceed to Act II
    const toAct2Button = page.locator('button', { hasText: 'Continue to Act II: Keepsakes' });
    await expect(toAct2Button).toBeVisible();
    await toAct2Button.click();

    // 4. Act II: The Little Things I Keep
    await expect(page.locator('text=ACT II // THE LITTLE THINGS I KEEP')).toBeVisible();
    const toAct3Button = page.locator('button', { hasText: 'Step Toward The Mirror' });
    await expect(toAct3Button).toBeVisible();
    await toAct3Button.click();

    // 5. Act III: The Secret Mirror
    await expect(page.locator('text=ACT III // THE SECRET MIRROR')).toBeVisible();
    const toAct4Button = page.locator('button', { hasText: 'Step Through The Mirror' });
    await expect(toAct4Button).toBeVisible();
    await toAct4Button.click();

    // 6. Act IV: The Two Sides of Us
    await expect(page.locator('text=ACT IV // THE TWO SIDES OF US')).toBeVisible();
    const toAct5Button = page.locator('button', { hasText: 'Continue to Act V: The Formula' });
    await expect(toAct5Button).toBeVisible();
    await toAct5Button.click();

    // 7. Act V: The Uci Formula
    await expect(page.locator('text=ACT V // THE UCI FORMULA')).toBeVisible();
    const toAct6Button = page.locator('button', { hasText: 'Continue to Act VI: Distance' });
    await expect(toAct6Button).toBeVisible();
    await toAct6Button.click();

    // 8. Act VI: Across the Distance
    await expect(page.locator('text=ACT VI // ACROSS THE DISTANCE')).toBeVisible();
    await expect(
      page.locator('text=Hold your cursor or finger here for 8 seconds (or press and hold Spacebar)')
    ).toBeVisible();

    const toAct7Button = page.locator('button', { hasText: 'Continue to Act VII: The Finale' });
    await expect(toAct7Button).toBeVisible();
    await toAct7Button.click();

    // 9. Act VII: The Moonlit Birthday Wish
    await expect(page.locator('text=ACT VII // THE MOONLIT BIRTHDAY WISH')).toBeVisible();
    await expect(page.locator("text=Make a wish, cintaku. This one's just for you.")).toBeVisible();

    // Proceed to Gift Climax
    const toGiftButton = page.locator('button', { hasText: 'Receive Your Birthday Gift' });
    await expect(toGiftButton).toBeVisible();
    await toGiftButton.click();

    // 10. Final Gift Reveal
    await expect(page.locator('text=SEQUENCE 3 CLIMAX // THE IMPOSSIBLE GIFT')).toBeVisible();
    const untieButton = page.locator('button', { hasText: 'Untie Crimson Ribbon & Open Box' });
    await expect(untieButton).toBeVisible();
    await untieButton.click();

    // Assert Gift Showcase appears
    await expect(page.locator('text=Your Real Birthday Gift')).toBeVisible();
    const toVaultButton = page.locator('button', { hasText: 'Unlock Your After-Credits VIP Vault' });
    await expect(toVaultButton).toBeVisible();
    await toVaultButton.click();

    // 11. After-Credits VIP Vault
    await expect(page.locator('text=U ♥ S // AFTER-CREDITS — PRIVATE VIP VAULT')).toBeVisible();
    await expect(page.locator('text=SWEET // PRINCESS TIER')).toBeVisible();
    await expect(page.locator('text=AFTER-MIDNIGHT // 18+ SPICY 🔥')).toBeVisible();
    await expect(
      page.locator('text="Your birthday may happen once a year. But choosing you is something I want to do every day."')
    ).toBeVisible();
    await expect(page.locator('button', { hasText: 'CALL YOUR BOYFRIEND ❤️' })).toBeVisible();

    // Verify zero fatal console errors
    expect(consoleErrors.filter((e) => !e.includes('favicon'))).toHaveLength(0);
  });
});
