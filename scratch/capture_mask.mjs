import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
  const absPath = path.resolve('scratch/test_mask.html');
  await page.goto('file:///' + absPath.replace(/\\/g, '/'));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'scratch/mask_test_render.png' });
  await browser.close();
  console.log('Saved scratch/mask_test_render.png');
})();
