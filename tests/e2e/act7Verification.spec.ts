// tests/e2e/act7Verification.spec.ts

import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Act VII: The Moonlit Birthday Wish — Master Verification', () => {
  test.setTimeout(180000);

  const screenshotDir = path.resolve(process.cwd(), 'docs/verification/screenshots/act7');

  test('verifies Act VII Cake, Lantern, and Letter on Desktop (1920x1080)', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1920, height: 1080 });

    // 1. Navigate to home
    await page.goto('/');
    await page.waitForSelector('canvas');

    // 2. Transition directly into Act VII
    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          act7SubStage: 'cake',
          cakeAssemblyStep: 1,
          cakeBaseType: 'vanilla',
          isCandleExtinguished: false,
          isLanternReleased: false,
          isLetterSealBroken: false,
        });
        store.setCurrentChapter('ACT_7');
      }
    });

    await page.waitForTimeout(1000);

    // =========================================================================
    // 3. Verify STAGE 7A: Cake & Candle
    // =========================================================================
    await expect(page.getByText('ACT VII • THE MOONLIT BIRTHDAY WISH')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Make A Wish, Cintaku' })).toBeVisible();
    await expect(
      page.getByText("Let's build your birthday cake, piece by piece... then make a wish and blow the candle together.")
    ).toBeVisible();

    // Verify 7A navigation button is active
    await expect(page.getByRole('button', { name: /7A \/\/ Cake & Candle/i })).toBeVisible();

    // Verify Cake Step Panel exists
    await expect(page.getByRole('complementary', { name: 'Build Your Cake' })).toBeVisible();
    await expect(page.getByText('1. Choose Cake Base')).toBeVisible();

    // Take screenshot of Stage 7A initial step 1
    await page.screenshot({
      path: path.join(screenshotDir, '01_act7_cake_step1_desktop.png'),
      fullPage: true,
    });

    // Select Belgian Chocolate flavor
    const chocolateBtn = page.getByRole('button', { name: /Belgian Chocolate/i });
    if (await chocolateBtn.isVisible()) {
      await chocolateBtn.click();
    }

    // Step through cake assembly to Step 6
    const finishQuicklyBtn = page.getByRole('button', { name: /Finish Cake Quickly/i });
    if (await finishQuicklyBtn.isVisible()) {
      await finishQuicklyBtn.click();
    } else {
      for (let s = 2; s <= 6; s++) {
        await page.getByRole('button', { name: /Next Step/i }).click();
        await page.waitForTimeout(300);
      }
    }

    await page.waitForTimeout(500);

    // Verify candle is placed and cake plaque is rendered
    await expect(page.getByText('Happy Birthday', { exact: true })).toBeVisible();
    await expect(page.getByText('Uci ♡', { exact: true })).toBeVisible();
    await expect(page.getByText('Cake is ready! Blow the candle on the right →')).toBeVisible();

    // Verify Hold to Blow Controls
    const blowButton = page.getByRole('button', { name: /HOLD TO BLOW/i });
    await expect(blowButton).toBeVisible();

    // Take screenshot of fully assembled cake with lit candle
    await page.screenshot({
      path: path.join(screenshotDir, '02_act7_cake_assembled_lit_desktop.png'),
      fullPage: true,
    });

    // Simulate hold to blow
    const box = await blowButton.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      // Hold for 2.4 seconds to trigger complete blow progress
      await page.waitForTimeout(2400);
      await page.mouse.up();
    }

    await page.waitForTimeout(600);

    // Verify candle extinguished state
    await expect(page.getByText(/Extinguished/i)).toBeVisible();
    await expect(page.getByText(/Continue to Sky Lantern ✨/i).first()).toBeVisible();

    // Take screenshot of extinguished cake
    await page.screenshot({
      path: path.join(screenshotDir, '03_act7_cake_extinguished_desktop.png'),
      fullPage: true,
    });

    // =========================================================================
    // 4. Verify STAGE 7B: 60 Fireflies & Sky Lantern
    // =========================================================================
    await page.getByRole('button', { name: /7B \/\/ Sky Lantern/i }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByRole('heading', { name: '60 Fireflies & Sky Lantern' })).toBeVisible();
    await expect(page.getByText('"Write your birthday wish to the night sky, sayang."')).toBeVisible();
    await expect(page.getByText('My Birthday Wish for the Night Sky')).toBeVisible();

    // Fill in birthday wish
    const wishTextarea = page.locator('#sky-wish-textarea');
    await expect(wishTextarea).toBeVisible();
    await wishTextarea.fill('I wish for endless laughter, late-night talks, tight hugs, and a lifetime of adventures together.');

    // Check naughty wish checkbox
    const naughtyCheckbox = page.getByRole('checkbox', { name: /Include one unspoken naughty wish for us tonight/i });
    await expect(naughtyCheckbox).toBeVisible();
    await naughtyCheckbox.check();

    // Take screenshot of 7B form filled
    await page.screenshot({
      path: path.join(screenshotDir, '04_act7_lantern_wish_form_desktop.png'),
      fullPage: true,
    });

    // Submit wish to release into night sky
    await page.getByRole('button', { name: /RELEASE INTO THE NIGHT SKY/i }).click();
    await page.waitForTimeout(1200);

    // Verify success banner and released status
    await expect(page.getByText(/Wish released into the night sky!/i)).toBeVisible();

    // Take screenshot of 7B wish released
    await page.screenshot({
      path: path.join(screenshotDir, '05_act7_lantern_released_desktop.png'),
      fullPage: true,
    });

    // =========================================================================
    // 5. Verify STAGE 7C: The Sealed Birthday Letter
    // =========================================================================
    await page.getByRole('button', { name: /7C \/\/ Birthday Letter/i }).click();
    await page.waitForTimeout(1000);

    await expect(page.getByRole('heading', { name: 'The Sealed Birthday Letter' })).toBeVisible();
    await expect(page.getByText('"A letter from my heart, only for you."')).toBeVisible();

    // Verify Wax Seal Crest and Monogram
    await expect(page.getByText('UCI', { exact: true })).toBeVisible();
    await expect(page.getByText('A Birthday Letter From Your Boyfriend')).toBeVisible();

    // Click to crack the wax seal and unfold letter
    const breakSealBtn = page.getByRole('button', { name: /Break Wax Seal/i }).first();
    if (await breakSealBtn.isVisible()) {
      await breakSealBtn.click();
    } else {
      await page.getByText('UCI', { exact: true }).click();
    }
    await page.waitForTimeout(700);

    // Verify verbatim letter copy
    await expect(
      page.getByText('To my gorgeous girlfriend, my pacarku, my forever cintaku — Uci,')
    ).toBeVisible();
    await expect(
      page.getByText(/Happy Birthday, baby. I wanted to build you something that didn't just sit on a screen/i)
    ).toBeVisible();
    await expect(
      page.getByText(/As you step into this new year of your life, here is my promise to you/i)
    ).toBeVisible();
    await expect(page.getByText('Forever obsessed with you,')).toBeVisible();
    await expect(page.getByText('Your Boyfriend ♥')).toBeVisible();

    // Verify Voice Player & Final Gift CTA
    await expect(page.getByText('Listen to My Voice')).toBeVisible();
    await expect(page.getByRole('button', { name: /RECEIVE YOUR BIRTHDAY GIFT ✨/i }).first()).toBeVisible();

    // Take screenshot of 7C birthday letter
    await page.screenshot({
      path: path.join(screenshotDir, '06_act7_birthday_letter_desktop.png'),
      fullPage: true,
    });

    // Click Proceed To Gift button to verify chapter transition
    await page.getByRole('button', { name: /RECEIVE YOUR BIRTHDAY GIFT ✨/i }).first().click();
    await page.waitForTimeout(800);

    const chapterAfterProceed = await page.evaluate(() => {
      return (window as any).useExperienceStore?.getState?.()?.currentChapter;
    });
    expect(chapterAfterProceed).toBe('FINAL_GIFT');

    // Confirm no uncaught exceptions
    const severeErrors = consoleErrors.filter(
      (err) => !err.includes('AudioContext') && !err.includes('404') && !err.includes('Failed to load resource')
    );
    expect(severeErrors).toEqual([]);
  });

  test('verifies Act VII on Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/');
    await page.waitForSelector('canvas');

    await page.evaluate(() => {
      const store = (window as any).useExperienceStore?.getState?.();
      if (store) {
        store.enterUniverse(true);
        (window as any).useExperienceStore.setState({
          act7SubStage: 'cake',
          cakeAssemblyStep: 6,
          cakeBaseType: 'vanilla',
          isCandleExtinguished: false,
          isLanternReleased: false,
          isLetterSealBroken: false,
        });
        store.setCurrentChapter('ACT_7');
      }
    });

    await page.waitForTimeout(1000);

    // Verify Mobile 7A Layout
    await expect(page.getByText('ACT VII • THE MOONLIT BIRTHDAY WISH')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Make A Wish, Cintaku' })).toBeVisible();
    await expect(page.getByText('Happy Birthday', { exact: true })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '07_act7_cake_mobile.png'),
      fullPage: true,
    });

    // Switch to 7B Mobile
    await page.getByRole('button', { name: /7B \/\/ Sky Lantern/i }).click();
    await page.waitForTimeout(800);

    await expect(page.getByRole('heading', { name: '60 Fireflies & Sky Lantern' })).toBeVisible();
    await expect(page.getByText('My Birthday Wish for the Night Sky')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '08_act7_lantern_mobile.png'),
      fullPage: true,
    });

    // Switch to 7C Mobile
    await page.getByRole('button', { name: /7C \/\/ Birthday Letter/i }).click();
    await page.waitForTimeout(800);

    await expect(page.getByRole('heading', { name: 'The Sealed Birthday Letter' })).toBeVisible();

    const breakSealMobile = page.getByRole('button', { name: /Break Wax Seal/i }).first();
    if (await breakSealMobile.isVisible()) {
      await breakSealMobile.click();
    } else {
      await page.getByText('UCI', { exact: true }).click();
    }
    await page.waitForTimeout(700);

    await expect(page.getByText('To my gorgeous girlfriend, my pacarku, my forever cintaku — Uci,')).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, '09_act7_letter_mobile.png'),
      fullPage: true,
    });
  });
});
