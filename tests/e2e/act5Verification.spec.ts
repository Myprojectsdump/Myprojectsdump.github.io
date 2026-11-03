// tests/e2e/act5Verification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act V: The UCI Formula — Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/act5');

  test('verifies Act V Alchemy Lab & Gold Foil Vault on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to page
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 2. Transition directly into Act V
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          act5SubStage: 'alchemy',
          pouredVialIds: [],
          temperatureCelsius: 37,
          isAlchemyOverheated: false,
          revealedScratchIds: [],
        });
        store.setCurrentChapter('ACT_5');
      }
    });

    await page.waitForTimeout(1000);

    // Verify Copy & Main Header
    await expect(page.getByText('ACT V · THE UCI FORMULA')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Magical Alchemy Lab' })).toBeVisible();
    await expect(page.getByText('Four little ingredients. One very familiar kind of magic.')).toBeVisible();

    // Verify Initial Temperature
    await expect(page.getByText('37°C')).toBeVisible();
    await expect(page.getByText('LOVE IS GETTING WARMER • 0 / 4 INGREDIENTS')).toBeVisible();

    // Screenshot 1: Initial Alchemy Lab View
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_01_alchemy_lab_initial.png'),
    });

    // 3. Test First Pour (Vial 1: Pure Pacarku Sweetness)
    const pourVial1Btn = page.getByRole('button', { name: /40% Pure Sweetness|40% Pure Pacarku Sweetness/i }).first();
    await pourVial1Btn.click();
    await page.waitForTimeout(600);

    // Verify Temperature increased to 52°C
    await expect(page.getByText('52°C')).toBeVisible();

    // Screenshot 2: First Vial Poured
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_02_alchemy_first_pour.png'),
    });

    // 4. Pour remaining 3 vials to reach Overheated State
    const pourVial2Btn = page.getByRole('button', { name: /30% Goddess Radiance|30% Effortless Goddess Radiance/i }).first();
    await pourVial2Btn.click();
    await page.waitForTimeout(400);

    const pourVial3Btn = page.getByRole('button', { name: /20% Clingy Princess|20% Clingy Princess Energy/i }).first();
    await pourVial3Btn.click();
    await page.waitForTimeout(400);

    const pourVial4Btn = page.getByRole('button', { name: /10% Bedroom Menace|10% Late-Night Bedroom Menace/i }).first();
    await pourVial4Btn.click();
    await page.waitForTimeout(800);

    // Verify Overheated State
    await expect(page.getByText('999°C')).toBeVisible();
    await expect(page.getByText('OH NO… THIS IS GETTING DANGEROUSLY LOVELY.')).toBeVisible();
    await expect(page.getByText("Boyfriend's self-control has officially left the room. ♥")).toBeVisible();

    // Screenshot 3: Overheated Alchemy Lab
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_03_alchemy_overheated.png'),
    });

    // 5. Switch to Gold Foil Vault
    const vaultNavBtn = page.getByRole('button', { name: /THE GOLD FOIL VAULT/i });
    await vaultNavBtn.click();
    await page.waitForTimeout(1000);

    // Verify Vault Header
    await expect(page.getByText('ACT V · THE LITTLE PROMISES')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Four Little Things I Want You to Keep' })).toBeVisible();
    await expect(page.getByText("I've hidden four little promises here. Scratch away the gold", { exact: false })).toBeVisible();

    // Verify 4 Scratch Cards rendered
    await expect(page.getByText('Promises uncovered: 0 / 4')).toBeVisible();

    // Screenshot 4: Gold Foil Scratch Vault Initial View
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_04_scratch_vault_initial.png'),
    });

    // 6. Test Scratch Card Reveal (using accessible Reveal button for card 1)
    const revealCard1Btn = page.getByRole('button', { name: /Reveal promise: The Oversized Tee Clause/i });
    await revealCard1Btn.click();
    await page.waitForTimeout(500);

    // Verify Card 1 Content Revealed
    await expect(page.getByText('The Oversized Tee Clause')).toBeVisible();
    await expect(page.getByText('Promises uncovered: 1 / 4')).toBeVisible();

    // Screenshot 5: First Promise Revealed
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_05_promise_revealed.png'),
    });

    // 7. Reveal Remaining Cards
    const revealButtons = page.getByRole('button', { name: /Reveal promise:/i });
    const count = await revealButtons.count();
    for (let i = 0; i < count; i++) {
      await revealButtons.nth(0).click();
      await page.waitForTimeout(300);
    }

    // Verify All 4 Revealed
    await expect(page.getByText('Promises uncovered: 4 / 4')).toBeVisible();
    await expect(page.getByText('• Every little promise, revealed. ♥')).toBeVisible();

    // Screenshot 6: All Promises Revealed
    await page.screenshot({
      path: path.join(screenshotDir, '1920x1080_06_all_promises_revealed.png'),
    });

    // 8. Test Navigation to Act VI
    const continueAct6Btn = page.getByRole('button', { name: /CONTINUE TO ACT VI · DISTANCE/i });
    await continueAct6Btn.click();
    await page.waitForTimeout(500);

    const chapter = await page.evaluate(() => (window as any).useExperienceStore?.getState?.()?.currentChapter);
    expect(chapter).toBe('ACT_6');

    // Confirm no unexpected console errors
    const fatalErrors = consoleErrors.filter(
      (err) => !err.includes('favicon') && !err.includes('AudioContext')
    );
    expect(fatalErrors).toEqual([]);
  });

  test('verifies Act V on Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          act5SubStage: 'alchemy',
          pouredVialIds: [],
          temperatureCelsius: 37,
          isAlchemyOverheated: false,
          revealedScratchIds: [],
        });
        store.setCurrentChapter('ACT_5');
      }
    });

    await page.waitForTimeout(1000);

    // Mobile Screenshot 1: Mobile Alchemy Lab
    await page.screenshot({
      path: path.join(screenshotDir, '390x844_01_mobile_alchemy.png'),
    });

    // Switch to Scratch Vault on mobile
    const vaultNavBtn = page.getByRole('button', { name: /THE GOLD FOIL VAULT/i });
    await vaultNavBtn.click();
    await page.waitForTimeout(800);

    // Mobile Screenshot 2: Mobile Scratch Vault
    await page.screenshot({
      path: path.join(screenshotDir, '390x844_02_mobile_vault.png'),
    });
  });
});
