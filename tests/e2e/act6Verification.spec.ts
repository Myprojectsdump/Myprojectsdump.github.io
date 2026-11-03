// tests/e2e/act6Verification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act VI: Across The Distance — Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/act6');

  test('verifies Act VI Eight-Second Connection on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to page
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 2. Transition directly into Act VI
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          isHoldingFingerprint: false,
          heartbeatCompleted: false,
        });
        store.setCurrentChapter('ACT_6');
      }
    });

    await page.waitForTimeout(1000);

    // Verify Copy & Main Header
    await expect(page.getByText('ACT VI · EVEN ACROSS THE DISTANCE')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Eight Seconds, Just Us.' })).toBeVisible();
    await expect(
      page.getByText('Hold your cursor or finger here for 8 seconds (or press and hold Spacebar).')
    ).toBeVisible();

    // Verify Initial Whispers & Orbs
    await expect(page.getByText('Even from far away... you still make my heart feel so close.')).toBeVisible();
    await expect(page.getByText('ME', { exact: true })).toBeVisible();
    await expect(page.getByText('YOU, MY UCI ♥')).toBeVisible();
    await expect(page.getByText('HOLD MY HEART')).toBeVisible();
    await expect(page.getByText('0.0s / 8.0s')).toBeVisible();

    // Screenshot 1: Initial View
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_01_across_distance_initial.png'),
    });

    // 3. Test Press and Hold Interaction for ~2.5 seconds
    const heartTarget = page.getByRole('button', { name: /Press and hold to connect our hearts/i });
    const box = await heartTarget.boundingBox();
    expect(box).not.toBeNull();

    // Mouse down on center of target
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(2500);

    // Screenshot 2: Holding in progress
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_02_holding_in_progress.png'),
    });

    // 4. Test Early Release Reassurance
    await page.mouse.up();
    await page.waitForTimeout(500);

    // Verify Early Release Prompt appeared
    await expect(
      page.getByText("No rush, sayang. I'm right here. Whenever you're ready, let's try again.")
    ).toBeVisible();

    // Screenshot 3: Early release prompt
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_03_early_release_reassurance.png'),
    });

    // 5. Resume holding until 8.0s completion
    await page.mouse.down();
    // Hold remaining ~6 seconds
    await page.waitForTimeout(6200);
    await page.mouse.up();
    await page.waitForTimeout(500);

    // Verify Completion state
    const isCompleted = await page.evaluate(
      () => (window as any).useExperienceStore?.getState?.()?.heartbeatCompleted
    );
    expect(isCompleted).toBe(true);

    await expect(page.getByText('Different places. One very full heart.', { exact: false })).toBeVisible();
    await expect(
      page.getByText('Every beat of this heart is yours, cintaku. Yesterday, tonight, and always.')
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'FEEL THAT AGAIN' })).toBeVisible();

    // Screenshot 4: Completed Synchronized state
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_04_synchronized_completed.png'),
    });

    // 6. Test Replay Action
    const replayBtn = page.getByRole('button', { name: 'FEEL THAT AGAIN' });
    await replayBtn.click();
    await page.waitForTimeout(400);

    const replayed = await page.evaluate(
      () => (window as any).useExperienceStore?.getState?.()?.heartbeatCompleted
    );
    expect(replayed).toBe(false);
    await expect(page.getByText('0.0s / 8.0s')).toBeVisible();

    // Screenshot 5: Replayed state
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_05_replayed_state.png'),
    });

    // 7. Test Keyboard Spacebar Hold
    await page.keyboard.down('Space');
    await page.waitForTimeout(1000);
    let isHoldingState = await page.evaluate(
      () => (window as any).useExperienceStore?.getState?.()?.isHoldingFingerprint
    );
    expect(isHoldingState).toBe(true);
    await page.keyboard.up('Space');
    await page.waitForTimeout(300);

    isHoldingState = await page.evaluate(
      () => (window as any).useExperienceStore?.getState?.()?.isHoldingFingerprint
    );
    expect(isHoldingState).toBe(false);

    // 8. Test Navigation to Act VII
    const continueBtn = page.getByRole('button', { name: /LET'S SEE OUR LAST SURPRISE/i });
    await continueBtn.click();
    await page.waitForTimeout(500);

    const currentChapter = await page.evaluate(
      () => (window as any).useExperienceStore?.getState?.()?.currentChapter
    );
    expect(currentChapter).toBe('ACT_7');

    const fatalErrors = consoleErrors.filter(
      (err) => !err.includes('favicon') && !err.includes('AudioContext')
    );
    expect(fatalErrors).toEqual([]);
  });

  test('verifies Act VI on Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          isHoldingFingerprint: false,
          heartbeatCompleted: false,
        });
        store.setCurrentChapter('ACT_6');
      }
    });

    await page.waitForTimeout(1000);

    // Mobile Screenshot 1: Mobile layout
    await page.screenshot({
      path: path.join(screenshotDir, '390x844_01_mobile_across_distance.png'),
    });
  });
});
