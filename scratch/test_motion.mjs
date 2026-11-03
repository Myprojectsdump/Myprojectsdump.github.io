import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173');
  const reducedMotion = await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const textTitle = await page.evaluate(() => document.querySelector('h1')?.textContent);
  console.log('prefers-reduced-motion in Playwright:', reducedMotion);
  console.log('h1 text on load:', textTitle);
  await browser.close();
})();
