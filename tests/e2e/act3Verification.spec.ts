// tests/e2e/act3Verification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act III: The Secret Mirror — Visual & Interaction Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/act3');

  test('verifies Act III on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to page
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 2. Transition directly into Act III with clean fresh notes state
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        // Reset discovered notes to ensure clean fresh mist on arrival
        (window as any).useExperienceStore.setState({ discoveredMirrorNoteIds: [] });
        store.setCurrentChapter('ACT_3');
      }
    });

    await page.waitForTimeout(1000);

    // Verify Copy & Main Elements
    await expect(page.getByText('ACT III · THE SECRET MIRROR')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Secret Mirror' })).toBeVisible();
    await expect(page.getByText('Some thoughts are too personal to say out loud', { exact: false })).toBeVisible();
    await expect(page.getByText('There are five little things waiting beneath the steam.')).toBeVisible();
    await expect(page.getByText('Pick Something to', { exact: false })).toBeVisible();
    await expect(page.getByText('Clean the Mirror ♡', { exact: false })).toBeVisible();
    await expect(page.getByText('Hidden Notes', { exact: false })).toBeVisible();

    // Verify Initial Unexplored State: Secret Thoughts are locked mysteries with NO spoilers
    await expect(page.getByText('Secret Thought #01')).toBeVisible();
    await expect(page.getByText('Secret Thought #02')).toBeVisible();
    await expect(page.getByText('Secret Thought #03')).toBeVisible();
    await expect(page.getByText('Secret Thought #04')).toBeVisible();
    await expect(page.getByText('Secret Thought #05')).toBeVisible();

    // Screenshot 1: Initial Fogged Mirror Scene (100% opaque, zero text peeking through)
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_01_initial_fogged_scene.png'),
    });

    // 3. Pick up the Handkerchief tool
    const towelButton = page.getByRole('button', { name: /Soft Towel/i });
    await expect(towelButton).toBeVisible();
    await towelButton.click();
    await page.waitForTimeout(400);

    // Screenshot 2: Handkerchief Picked Up
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_02_handkerchief_picked_up.png'),
    });

    // 4. Wipe across mirror canvas to uncover notes
    const mirrorBox = await page.locator('canvas').nth(1).boundingBox();
    if (mirrorBox) {
      // Wipe center (Note 2 - "I still get weak for you... ♡" + lipstick kiss)
      await page.mouse.move(mirrorBox.x + mirrorBox.width * 0.50, mirrorBox.y + mirrorBox.height * 0.48);
      await page.mouse.down();
      for (let i = 0; i < 8; i++) {
        await page.mouse.move(
          mirrorBox.x + mirrorBox.width * 0.50 + Math.cos(i) * 50,
          mirrorBox.y + mirrorBox.height * 0.48 + Math.sin(i) * 50
        );
        await page.waitForTimeout(30);
      }
      await page.mouse.up();

      // Wipe top-left (Note 1)
      await page.mouse.move(mirrorBox.x + mirrorBox.width * 0.30, mirrorBox.y + mirrorBox.height * 0.30);
      await page.mouse.down();
      for (let i = 0; i < 6; i++) {
        await page.mouse.move(
          mirrorBox.x + mirrorBox.width * 0.30 + Math.cos(i) * 35,
          mirrorBox.y + mirrorBox.height * 0.30 + Math.sin(i) * 35
        );
        await page.waitForTimeout(30);
      }
      await page.mouse.up();
    }

    await page.waitForTimeout(600);

    // Screenshot 3: Mid-wipe reveal
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_03_mid_wipe_reveal.png'),
    });

    // 5. Use Accessible "Reveal a Little More" for remaining notes
    const revealMoreBtn = page.getByRole('button', { name: /Reveal a Little More/i });
    for (let i = 0; i < 5; i++) {
      if (await revealMoreBtn.isVisible().catch(() => false)) {
        await revealMoreBtn.click();
        await page.waitForTimeout(300);
      } else {
        break;
      }
    }

    await page.waitForTimeout(600);

    // Screenshot 4: Fully Uncovered Mirror
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_04_fully_uncovered_mirror.png'),
    });

    // Verify all 5 notes are unlocked in state
    const state = await page.evaluate(() => (window as any).useExperienceStore?.getState?.()?.discoveredMirrorNoteIds);
    expect(state.length).toBe(5);

    // Verify the checklist table now populates with the revealed seductive titles
    await expect(page.getByText('For My Uci ♡')).toBeVisible();
    await expect(page.getByText('The Way You Tease Me...')).toBeVisible();
    await expect(page.getByText('What I Crave...')).toBeVisible();
    await expect(page.getByText('Our Little Fantasies...')).toBeVisible();
    await expect(page.getByText('Tonight, Maybe...? ♡')).toBeVisible();

    // 6. Test Step Through The Mirror navigation
    const transitionBtn = page.getByRole('button', { name: /STEP THROUGH THE MIRROR|COME A LITTLE CLOSER/i });
    await expect(transitionBtn).toBeVisible();
    await transitionBtn.click();
    await page.waitForTimeout(500);

    const nextChapter = await page.evaluate(() => (window as any).useExperienceStore?.getState?.()?.currentChapter);
    expect(nextChapter).toBe('ACT_4');
  });

  test('verifies Act III on Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({ discoveredMirrorNoteIds: [] });
        store.setCurrentChapter('ACT_3');
      }
    });

    await page.waitForTimeout(1000);

    // Mobile Screenshot: Initial Mobile Composition
    await page.screenshot({
      path: path.join(screenshotDir, '390x844_01_mobile_finger_wiping.png'),
    });

    // Direct Finger Wipe on Canvas using mouse events
    const mirrorBox = await page.locator('canvas').nth(1).boundingBox();
    if (mirrorBox) {
      await page.mouse.move(mirrorBox.x + mirrorBox.width * 0.5, mirrorBox.y + mirrorBox.height * 0.5);
      await page.mouse.down();
      await page.mouse.move(mirrorBox.x + mirrorBox.width * 0.5 + 25, mirrorBox.y + mirrorBox.height * 0.5 + 25);
      await page.mouse.up();
    }

    // Verify mobile instruction
    await expect(page.getByText('Mobile: Use your finger to wipe the steam.')).toBeVisible();
  });
});
