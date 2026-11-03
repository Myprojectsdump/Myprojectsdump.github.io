// tests/e2e/reverseScrollAndNavigation.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AT-27 / AT-29: Reversible Navigation & State Reset', () => {
  test('chapter rail navigates directly to visited chapters and supports skip scene', async ({ page }) => {
    await page.goto('/');

    // Enter Universe into Act I
    const enterButton = page.locator('button', { hasText: 'ENTER MY UNIVERSE' });
    await enterButton.click();

    // Verify Chapter Rail is visible
    const chapterRail = page.locator('aside[aria-label="Chapter Navigation Rail"]');
    await expect(chapterRail).toBeVisible();

    // Jump back to Opening via rail (since Opening is already visited)
    const openingButton = chapterRail.locator('button[title*="Opening"]');
    await openingButton.click();
    await expect(page.locator('h1', { hasText: 'The Gravity of Uci.' })).toBeVisible();

    // Re-enter to Act I
    await page.locator('button', { hasText: 'ENTER MY UNIVERSE' }).click();
    await expect(page.locator('text=ACT I // TWO COUNTRIES, ONE SKY')).toBeVisible();

    // Use Skip Scene button in Comfort Controls to advance to Act II
    const skipSceneButton = page.locator('button', { hasText: 'Skip Scene' });
    await expect(skipSceneButton).toBeVisible();
    await skipSceneButton.click();

    // Verify now in Act II
    await expect(page.locator('text=ACT II // THE LITTLE THINGS I KEEP')).toBeVisible();

    // Now Act I and Opening are both visited and can be jumped to via rail
    const act1Button = chapterRail.locator('button[title*="Act I"]');
    await expect(act1Button).toBeEnabled();
    await act1Button.click();
    await expect(page.locator('text=ACT I // TWO COUNTRIES, ONE SKY')).toBeVisible();
  });
});
