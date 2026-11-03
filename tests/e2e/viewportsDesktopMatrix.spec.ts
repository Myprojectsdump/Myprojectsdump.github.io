// tests/e2e/viewportsDesktopMatrix.spec.ts

import { test, expect } from '@playwright/test';

const viewports = [
  { width: 1920, height: 1080, name: '1080p Desktop' },
  { width: 1680, height: 1050, name: '16:10 Laptop' },
  { width: 1440, height: 900, name: 'Target 1440x900' },
  { width: 1366, height: 768, name: 'Common Laptop' },
  { width: 1280, height: 720, name: 'Compact 720p' },
];

test.describe('AT-32: Multi-Viewport Desktop Matrix Verification', () => {
  for (const vp of viewports) {
    test(`renders cleanly without horizontal overflow at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // Verify no root horizontal scrollbar
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

      // Verify title is within visible bounds
      const title = page.locator('h1', { hasText: 'The Gravity of Uci.' });
      await expect(title).toBeVisible();

      // Enter Universe and verify layout integrity
      const enterButton = page.locator('button', { hasText: 'ENTER MY UNIVERSE' });
      await enterButton.click();

      const brandBar = page.locator('header[aria-label="Brand and experience status bar"]');
      await expect(brandBar).toBeVisible();
    });
  }
});
