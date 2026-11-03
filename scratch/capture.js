const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const absPath = path.resolve('scratch/font_test.html');
  await page.goto('file:///' + absPath.replace(/\\/g, '/'));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'scratch/font_test_render.png' });
  await browser.close();
  console.log('Saved scratch/font_test_render.png');
})();
