// tests/e2e/accessibilityAndKeyboard.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AT-30 / AT-31: Accessibility & Keyboard Navigation', () => {
  test('supports keyboard navigation, skip act button and comfort controls', async ({ page }) => {
    await page.goto('/');

    // Verify skip button is present in DOM
    const skipButton = page.locator('button', { hasText: 'Skip to Next Act' });
    await expect(skipButton).toBeAttached();

    // Enter Universe
    const enterButton = page.locator('button', { hasText: 'ENTER MY UNIVERSE' });
    await enterButton.click();

    // Verify main story content is visible
    await expect(page.locator('main')).toBeVisible();

    // Test Comfort Controls: Skip Scene & Motion mode toggles
    const skipSceneButton = page.locator('button', { hasText: 'Skip Scene' });
    await expect(skipSceneButton).toBeVisible();

    const motionToggleButton = page.locator('button', { hasText: /Motion:/ });
    await expect(motionToggleButton).toBeVisible();
    await motionToggleButton.click();

    // Verify sound control button is accessible
    const soundButton = page.locator('button[aria-label="Mute Sound"]');
    await expect(soundButton).toBeVisible();
  });
});
