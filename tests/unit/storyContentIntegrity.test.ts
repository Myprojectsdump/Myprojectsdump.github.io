// tests/unit/storyContentIntegrity.test.ts

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  STORY_DATA,
  PHOTO_PATHS,
  SOUNDTRACK_MANIFEST,
  CONFIGURED_ACTUAL_GIFT,
} from '../../src/config/storyContent';
import { useExperienceStore } from '../../src/store/useExperienceStore';

describe('AT-01: Final Refinement, Audio Repair & SYG Story Content Integrity', () => {
  const sourcePath = path.resolve(__dirname, '../../SOURCE_STORY_AND_COPY.md');
  const sourceContent = fs.readFileSync(sourcePath, 'utf-8');

  it('source file SOURCE_STORY_AND_COPY.md exists and is readable', () => {
    expect(sourceContent).toBeDefined();
    expect(sourceContent.length).toBeGreaterThan(100);
  });

  it('girlfriend name, nicknames (cintaku, cinta, sayang) and initials match verbatim', () => {
    expect(STORY_DATA.girlfriendName).toBe('Uci');
    expect(STORY_DATA.nicknames).toEqual(['cintaku', 'cinta', 'sayang']);
    expect(STORY_DATA.initials).toBe('U ♥ S');
    expect(STORY_DATA.telegramUsername).toBe('Hereitsme1234');
    expect(CONFIGURED_ACTUAL_GIFT.addressButtonLabel).toBe('SEND MY ADDRESS TO SAYANG ON TELEGRAM');
  });

  it('heroOpening title has exact casing and period ("The Gravity of Uci.") and uses cintaku', () => {
    expect(STORY_DATA.heroOpening.title).toBe('The Gravity of Uci.');
    expect(STORY_DATA.heroOpening.eyebrow).toBe('13.8 BILLION YEARS IN THE MAKING');
    expect(STORY_DATA.heroOpening.subtitle).toBe(
      'Before you, the universe was just cold static and empty space. Then you arrived—and suddenly every atom in my world knew exactly what it was orbiting.'
    );
    expect(STORY_DATA.heroOpening.whisper).toBe(
      'Selamat ulang tahun, my gorgeous cintaku. Tonight, every star in this sky belongs to you.'
    );
  });

  it('centralized PHOTO_PATHS and expanded 10-track SOUNDTRACK_MANIFEST are defined', () => {
    expect(PHOTO_PATHS.portrait.path).toBe('/images/uci/uci-genesis.jpg');
    expect(PHOTO_PATHS.mirror.path).toBe('/images/uci/uci-mirror-reveal.jpg');
    expect(PHOTO_PATHS.finale.path).toBe('/images/uci/uci-final-letter.jpg');
    expect(Object.keys(SOUNDTRACK_MANIFEST)).toHaveLength(10);
    expect(SOUNDTRACK_MANIFEST['act-1-vastness'].src).toBe('/audio/act-1-vastness.mp3');
    expect(SOUNDTRACK_MANIFEST['act-2-skyline-piano'].src).toBe('/audio/act-2-skyline-piano.mp3');
    expect(SOUNDTRACK_MANIFEST['act-7-discover'].src).toBe('/audio/act-7-discover.mp3');
    expect(SOUNDTRACK_MANIFEST['closing-its-been-a-long-long-time'].src).toBe(
      '/audio/closing-its-been-a-long-long-time.mp3'
    );
    expect(SOUNDTRACK_MANIFEST['closing-its-been-a-long-long-time'].fallbackSrc).toBe(
      '/audio/closing-lounging-by-moonlight.mp3'
    );
    expect(SOUNDTRACK_MANIFEST['closing-its-been-a-long-long-time'].defaultVolume).toBe(0.55);
  });

  it('keepsakeMemories contains 5 SYG keepsake memories without false future meeting promises', () => {
    expect(STORY_DATA.keepsakeMemories).toHaveLength(5);
    expect(STORY_DATA.keepsakeMemories[0].categoryBadge).toBe('01 // LATE-NIGHT CALL');
    expect(STORY_DATA.keepsakeMemories[1].categoryBadge).toBe('02 // FOUR LITTLE MOMENTS');
    expect(STORY_DATA.keepsakeMemories[2].categoryBadge).toBe('03 // OUR MIDNIGHT RITUALS');
    expect(STORY_DATA.keepsakeMemories[2].bulletItems).toHaveLength(6);
    expect(STORY_DATA.keepsakeMemories[3].categoryBadge).toBe('04 // WHAT IS TRUE RIGHT NOW');
    expect(STORY_DATA.keepsakeMemories[4].categoryBadge).toBe('05 // QUIET REFLECTION');
  });

  it('steamyMirrorNotes contains exact 5 SYG notes and coordinates', () => {
    expect(STORY_DATA.steamyMirrorNotes).toHaveLength(5);
    expect(STORY_DATA.steamyMirrorNotes[0].text).toBe('Even through a screen, you leave me breathless.');
    expect(STORY_DATA.steamyMirrorNotes[4].text).toBe('Worth every mile between us. ♥');
  });

  it('vinylTracks contains both Side A and Side B with 4 cards and confessions each', () => {
    expect(STORY_DATA.vinylTracks.daylight.title).toBe('SIDE A // SUNLIGHT & SWEETHEART');
    expect(STORY_DATA.vinylTracks.daylight.confessions).toHaveLength(4);
    expect(STORY_DATA.vinylTracks.daylight.cards).toHaveLength(4);
    expect(STORY_DATA.vinylTracks.daylight.cards[0].title).toBe('MY FAVOURITE NOTIFICATION');

    expect(STORY_DATA.vinylTracks.afterHours.title).toBe('SIDE B // 2:00 AM BEHIND CLOSED DOORS 🔥');
    expect(STORY_DATA.vinylTracks.afterHours.confessions).toHaveLength(4);
    expect(STORY_DATA.vinylTracks.afterHours.cards).toHaveLength(4);
    expect(STORY_DATA.vinylTracks.afterHours.cards[0].title).toBe('THAT LOOK THROUGH THE SCREEN');
  });

  it('constellationNodes contains exact 8 SYG nodes with local photo paths', () => {
    expect(STORY_DATA.constellationNodes).toHaveLength(8);
    const nodeIds = STORY_DATA.constellationNodes.map((n) => n.id);
    expect(nodeIds).toEqual(['eyes', 'laugh', 'lips', 'neck', 'bites', 'waist', 'voice', 'heart']);
    expect(STORY_DATA.constellationNodes[0].photoPath).toBe('/images/uci/uci-eyes-detail.jpg');
    expect(STORY_DATA.constellationNodes[7].photoPath).toBe('/images/uci/uci-genesis.jpg');

    const spicyCount = STORY_DATA.constellationNodes.filter((n) => n.category === 'spicy').length;
    const soulCount = STORY_DATA.constellationNodes.filter((n) => n.category === 'soul').length;
    expect(spicyCount).toBe(4);
    expect(soulCount).toBe(4);
  });

  it('alchemyIngredients has 20%, 20%, 20%, 40% distribution and SAYANG overheat warning', () => {
    expect(STORY_DATA.alchemyIngredients).toHaveLength(4);
    expect(STORY_DATA.alchemyIngredients.map((i) => i.percentage)).toEqual([20, 20, 20, 40]);
    expect(STORY_DATA.alchemyIngredients[3].name).toBe('Bedroom Menace & Mischief');
    expect(STORY_DATA.alchemyIngredients[3].percentageLabel).toBe('40%');
    expect(STORY_DATA.alchemyOverheatWarning).toBe(
      'DANGER: TOO HOT TO HANDLE. SAYANG WILLPOWER COMPROMISED.'
    );
  });

  it('scratchCards contains the 4 revised adult-oriented cards with 18+ consent requirement', () => {
    expect(STORY_DATA.scratchCards).toHaveLength(4);
    expect(STORY_DATA.scratchCards[0].id).toBe('scratch-1');
    expect(STORY_DATA.scratchCards[0].secretTitle).toBe('YOU MAKE ME STUPIDLY HORNY');
    expect(STORY_DATA.scratchCards[0].tag).toBe('CONFESSION AFTER DARK 🔥');
    expect(STORY_DATA.scratchCards[0].requiresAdultConsent).toBe(true);

    expect(STORY_DATA.scratchCards[1].id).toBe('scratch-2');
    expect(STORY_DATA.scratchCards[1].secretTitle).toBe('2:00 AM — NO FILTER');
    expect(STORY_DATA.scratchCards[1].tag).toBe('PRIVATE CHANNEL 🔥');

    expect(STORY_DATA.scratchCards[2].id).toBe('scratch-3');
    expect(STORY_DATA.scratchCards[2].secretTitle).toBe('OUR PRIVATE AFTER-HOURS CALL');
    expect(STORY_DATA.scratchCards[2].tag).toBe('18+ · MUTUAL YES ONLY');

    expect(STORY_DATA.scratchCards[3].id).toBe('scratch-4');
    expect(STORY_DATA.scratchCards[3].secretTitle).toBe('FUCK, I LOVE YOUR LITTLE MIND');
    expect(STORY_DATA.scratchCards[3].tag).toBe('DANGEROUSLY ADDICTED TO YOU ♥');
  });

  it('heartbeatWhispers contains exact 6 grounded SYG whisper strings', () => {
    expect(STORY_DATA.heartbeatWhispers).toHaveLength(6);
    expect(STORY_DATA.heartbeatWhispers[0]).toBe('Hold right there, cintaku. Just a little longer.');
    expect(STORY_DATA.heartbeatWhispers[5]).toBe(
      'Every beat carries a little piece of me to you, cinta.'
    );
  });

  it('birthdayLetter contains grounded SYG paragraph, Sayang signature, and Telegram address request', () => {
    expect(STORY_DATA.birthdayLetter.salutation).toBe(
      'To my gorgeous girlfriend, my cinta, my forever cintaku — Uci,'
    );
    expect(STORY_DATA.birthdayLetter.paragraphs).toHaveLength(4);
    expect(STORY_DATA.birthdayLetter.paragraphs.join(' ')).toContain(
      "We're miles apart, and I don't need to make big promises about the future to know what you mean to me right now."
    );
    expect(STORY_DATA.birthdayLetter.signOff).toBe('Forever obsessed with you,');
    expect(STORY_DATA.birthdayLetter.signature).toBe('Sayang ♥');
    expect(STORY_DATA.birthdayLetter.telegramAddressRequest?.heading).toBe('ONE TINY THING, CINTAKU');
    expect(STORY_DATA.birthdayLetter.telegramAddressRequest?.buttonLabel).toBe(
      'SEND MY ADDRESS TO SAYANG ON TELEGRAM'
    );
  });

  it('vipCoupons contains exact 6 SYG coupons with SAYANG redeemed badges', () => {
    expect(STORY_DATA.vipCoupons).toHaveLength(6);
    expect(STORY_DATA.vipCoupons[0].code).toBe('UCI-ROYAL-001');
    expect(STORY_DATA.vipCoupons[0].title).toBe('01 — THE COMFORT CALL');
    expect(STORY_DATA.vipCoupons[5].code).toBe('UCI-BOSS-006');
    expect(STORY_DATA.vipCoupons[5].redeemedBadgeText).toBe(
      'REDEEMED BY UCI — SCREENSHOT & SEND TO SAYANG.'
    );
  });

  it('relightCandle resets only isCandleExtinguished without erasing lantern, wish, letter, or VIP state', () => {
    const store = useExperienceStore.getState();
    store.extinguishCandle();
    store.setBirthdayWish('Stay close across the distance', true);
    store.releaseLantern();
    store.breakLetterSeal();
    store.redeemVipPass('vip-01');

    expect(useExperienceStore.getState().isCandleExtinguished).toBe(true);
    useExperienceStore.getState().relightCandle();

    const afterRelight = useExperienceStore.getState();
    expect(afterRelight.isCandleExtinguished).toBe(false);
    expect(afterRelight.isLanternReleased).toBe(true);
    expect(afterRelight.birthdayWishText).toBe('Stay close across the distance');
    expect(afterRelight.isLetterSealBroken).toBe(true);
    expect(afterRelight.vipRedemptions['vip-01']?.redeemed).toBe(true);
  });
});
