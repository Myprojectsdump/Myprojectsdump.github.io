// src/config/finalLoveLetterContent.ts

/**
 * =============================================================================
 * THE LAST LITTLE UNIVERSE — A CINEMATIC LOVE LETTER
 * Configuration & Content Specifications
 * =============================================================================
 * Configured per visual reference and creative specifications.
 * The owner can edit any verse, title, or dedication at any time.
 */

export interface LovePoem {
  id: string;
  numeral: string;
  title: string;
  subtitle?: string;
  dedication?: string;
  theme: 'blossom' | 'moon' | 'flower' | 'cosmos';
  content: string;
}

/**
 * REAL CONFIGURED POEMS
 * Matched 1:1 with the visual reference layout and titles.
 */
export const FINAL_POEMS: LovePoem[] = [
  {
    id: 'poem-1',
    numeral: 'I',
    title: 'The Day You Changed Everything',
    subtitle: 'For My Cintaku',
    dedication: 'November 2026',
    theme: 'blossom',
    content: `Some people just enter your life,
but you... you rearranged it.

The ordinary days felt brighter,
the heavy ones felt lighter,
and somewhere in between,
I realized —
you weren't just a part of my life,
you became the reason it feels like home.`,
  },
  {
    id: 'poem-2',
    numeral: 'II',
    title: 'My Favourite Chaos',
    subtitle: 'Her Fierce & Gentle Heart',
    dedication: 'For Uci',
    theme: 'moon',
    content: `You are gentle mornings and midnight storms,
quiet whispers and wild, breathless laughs.

You roll your eyes when I tease you,
tease me on camera when you can't contain your love,
and look at me through the screen like I'm the only person in your world.

Out of all the quiet, predictable things in this world,
you will always be my favourite kind of chaos.`,
  },
  {
    id: 'poem-3',
    numeral: 'III',
    title: 'In Every Universe',
    subtitle: 'Across Every Map & Distance',
    dedication: 'Delhi to waterfront pagoda',
    theme: 'flower',
    content: `They say time dilates near immense gravity,
and maybe that's why every second with you
feels like an eternity I never want to leave.

Across 3,000 miles of sky,
across every map and time zone,
if there are a million parallel realities out there —
I would still search every single one
just to find you again.`,
  },
  {
    id: 'poem-4',
    numeral: 'IV',
    title: 'The Gravity of Us',
    subtitle: 'The Inevitable Collision',
    dedication: 'Always and Forever',
    theme: 'cosmos',
    content: `It was never about luck.
It was the steady, undeniable pull of two souls
that were always meant to collide.

No distance could weaken it.
No ocean could silence it.

You are my anchor, my peace,
and the only gravity I will ever need.`,
  },
];

export interface FinalNoteConfig {
  eyebrow: string;
  messageParagraphs: string[];
  closingDeclaration: string;
  finalHeartNote: string;
}

/**
 * A FINAL NOTE — SEPARATE SPECIAL VIEW
 * Appears after the configured poems in the navigation rail.
 */
export const FINAL_NOTE_CONTENT: FinalNoteConfig = {
  eyebrow: 'AND AFTER ALL THESE WORDS...',
  messageParagraphs: [
    'I hope you never forget how deeply you are loved.',
    'You are my favourite part of ordinary days, my favourite thought at the end of the night, and someone I would choose in every little universe.',
  ],
  closingDeclaration: 'I LOVE YOU. ALWAYS.',
  finalHeartNote: 'Not an ending. Just another beautiful beginning. ♥',
};

export interface IntroSequenceConfig {
  lines: string[];
  finalDeclaration: {
    part1: string;
    part2: string;
    part3: string;
    name: string;
    fullText: string;
    subtitle: string;
  };
}

/**
 * PHASE A — INTRODUCTORY STRINGS
 * Configurable sequential cinematic intro lines.
 */
export const INTRO_SEQUENCE_CONFIG: IntroSequenceConfig = {
  lines: [
    'Before you leave...',
    'I saved one last moment for you.',
    'Not another surprise.',
    'Just a few words I want you to keep.',
    'Uci...',
  ],
  finalDeclaration: {
    part1: 'I',
    part2: 'LOVE',
    part3: 'YOU',
    name: 'UCI',
    fullText: 'I LOVE YOU, UCI',
    subtitle: 'Today, Tomorrow. Always.',
  },
};
