// tests/unit/storyContentIntegrity.test.ts

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { STORY_DATA } from '../../src/config/storyContent';

describe('AT-01: Verbatim Copy Integrity Verification', () => {
  const sourcePath = path.resolve(__dirname, '../../SOURCE_STORY_AND_COPY.md');
  const sourceContent = fs.readFileSync(sourcePath, 'utf-8');

  it('source file SOURCE_STORY_AND_COPY.md exists and is readable', () => {
    expect(sourceContent).toBeDefined();
    expect(sourceContent.length).toBeGreaterThan(100);
  });

  it('girlfriend name, nicknames and initials match verbatim', () => {
    expect(STORY_DATA.girlfriendName).toBe('Uci');
    expect(STORY_DATA.nicknames).toEqual(['pacarku', 'cintaku', 'sayang']);
    expect(STORY_DATA.initials).toBe('U ♥ S');
    expect(sourceContent).toContain('girlfriendName: "Uci"');
    expect(sourceContent).toContain('initials: "U ♥ S"');
  });

  it('heroOpening title has exact casing and period ("The Gravity of Uci.")', () => {
    expect(STORY_DATA.heroOpening.title).toBe('The Gravity of Uci.');
    expect(STORY_DATA.heroOpening.eyebrow).toBe('13.8 BILLION YEARS IN THE MAKING');
    expect(STORY_DATA.heroOpening.subtitle).toBe(
      'Before you, the universe was just cold static and empty space. Then you arrived—and suddenly every atom in my world knew exactly what it was orbiting.'
    );
    expect(STORY_DATA.heroOpening.whisper).toBe(
      'Selamat ulang tahun, my gorgeous pacarku. Tonight, every star in this sky belongs to you.'
    );
    expect(sourceContent).toContain('title: "The Gravity of Uci."');
  });

  it('steamyMirrorNotes contains exact 5 notes and coordinates', () => {
    expect(STORY_DATA.steamyMirrorNotes).toHaveLength(5);
    expect(STORY_DATA.steamyMirrorNotes[0].text).toBe('Stop looking so kissable right now.');
    expect(STORY_DATA.steamyMirrorNotes[1].text).toBe('Still my favorite view.');
    expect(STORY_DATA.steamyMirrorNotes[2].text).toBe('Your neck + my lips =');
    expect(STORY_DATA.steamyMirrorNotes[3].text).toBe('Come back to bed, cintaku.');
    expect(STORY_DATA.steamyMirrorNotes[4].text).toBe('100% Mine. ♥');
  });

  it('vinylTracks contains both Side A and Side B with exact grooveText and 4 confessions each', () => {
    expect(STORY_DATA.vinylTracks.daylight.title).toBe('SIDE A // SUNLIGHT & SWEETHEART');
    expect(STORY_DATA.vinylTracks.daylight.confessions).toHaveLength(4);
    expect(STORY_DATA.vinylTracks.afterHours.title).toBe('SIDE B // 2:00 AM BEHIND CLOSED DOORS 🔥');
    expect(STORY_DATA.vinylTracks.afterHours.confessions).toHaveLength(4);

    expect(STORY_DATA.vinylTracks.daylight.grooveText).toBe(
      'MY PACARKU • MY PEACE • THE GIRL WHO SOFTENED MY WHOLE WORLD • CINTAKU FOREVER • '
    );
    expect(STORY_DATA.vinylTracks.afterHours.grooveText).toBe(
      'WARNING: HIGH ADDICTION • HANDS ON YOUR WAIST • BITE MARKS & NECK KISSES • DONT BE SHY CINTAKU • '
    );
  });

  it('constellationNodes contains exact 8 nodes with coordinates and labels', () => {
    expect(STORY_DATA.constellationNodes).toHaveLength(8);
    const nodeIds = STORY_DATA.constellationNodes.map((n) => n.id);
    expect(nodeIds).toEqual(['eyes', 'laugh', 'lips', 'neck', 'bites', 'waist', 'voice', 'heart']);

    const spicyCount = STORY_DATA.constellationNodes.filter((n) => n.category === 'spicy').length;
    const soulCount = STORY_DATA.constellationNodes.filter((n) => n.category === 'soul').length;
    expect(spicyCount).toBe(4);
    expect(soulCount).toBe(4);
  });

  it('scratchCards contains exact 4 cards with secret copy', () => {
    expect(STORY_DATA.scratchCards).toHaveLength(4);
    expect(STORY_DATA.scratchCards[0].id).toBe('scratch-1');
    expect(STORY_DATA.scratchCards[0].foilTitle).toBe('CONFESSION #01 // WARDROBE RULE');
    expect(STORY_DATA.scratchCards[1].id).toBe('scratch-2');
    expect(STORY_DATA.scratchCards[2].id).toBe('scratch-3');
    expect(STORY_DATA.scratchCards[3].id).toBe('scratch-4');
  });

  it('heartbeatWhispers contains exact 6 whisper strings', () => {
    expect(STORY_DATA.heartbeatWhispers).toHaveLength(6);
    expect(STORY_DATA.heartbeatWhispers[0]).toBe("Hold right there, pacarku... don't lift your thumb yet.");
    expect(STORY_DATA.heartbeatWhispers[5]).toBe(
      'Every beat of this heart is yours, cintaku. Yesterday, tonight, and always.'
    );
  });

  it('birthdayLetter contains salutation, 4 paragraphs, signOff, signature', () => {
    expect(STORY_DATA.birthdayLetter.salutation).toBe(
      'To my gorgeous girlfriend, my pacarku, my forever cintaku — Uci,'
    );
    expect(STORY_DATA.birthdayLetter.paragraphs).toHaveLength(4);
    expect(STORY_DATA.birthdayLetter.signOff).toBe('Forever obsessed with you,');
    expect(STORY_DATA.birthdayLetter.signature).toBe('Your Boyfriend ♥');
  });

  it('vipCoupons contains exact 6 coupons with correct codes', () => {
    expect(STORY_DATA.vipCoupons).toHaveLength(6);
    expect(STORY_DATA.vipCoupons[0].code).toBe('UCI-ROYAL-001');
    expect(STORY_DATA.vipCoupons[1].code).toBe('UCI-PEACE-002');
    expect(STORY_DATA.vipCoupons[2].code).toBe('UCI-NIGHT-003');
    expect(STORY_DATA.vipCoupons[3].code).toBe('UCI-HEAT-004');
    expect(STORY_DATA.vipCoupons[4].code).toBe('UCI-CRAVE-005');
    expect(STORY_DATA.vipCoupons[5].code).toBe('UCI-BOSS-006');
  });
});
