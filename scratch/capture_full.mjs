import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const absPath = path.resolve('scratch/test_full_declaration.html');
  await page.goto('file:///' + absPath.replace(/\\/g, '/'));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'scratch/full_declaration_render.png' });
  await browser.close();
  console.log('Saved scratch/full_declaration_render.png');
})();
