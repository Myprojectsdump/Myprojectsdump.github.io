// src/data/storyData.ts
// Centralized configuration & authentic Long-Distance Relationship (LDR) story data for Uci.
// All user-facing copy uses "cinta" / "cintaku" / "Sayang" and reflects grounded, truthful LDR affection.

import {
  StoryDataPayload,
  MemoryItemConfig,
  ActualGiftConfig,
  LiveCallConfig,
  RedemptionGuidanceMeta,
  PhotoManifest,
  SoundtrackTrack,
  SoundtrackTrackId,
} from '../types/story';

export const PHOTO_PATHS: PhotoManifest = {
  portrait: {
    key: 'portrait',
    path: '/photos/uci-portrait.jpg',
    alt: 'Uci — Cosmic Portrait',
    caption: 'The girl who pulled my entire world into her orbit.',
    objectPosition: 'center 25%',
  },
  mirror: {
    key: 'mirror',
    path: '/photos/uci-mirror.jpg',
    alt: 'Uci behind the steamy mirror',
    caption: 'Every wipe of the glass reveals my favourite view.',
    objectPosition: 'center 25%',
  },
  daylight: {
    key: 'daylight',
    path: '/photos/uci-daylight.jpg',
    alt: 'Uci — Side A Daylight Sweetheart',
    caption: 'Sunlight & Sweetheart',
    objectPosition: 'center 25%',
  },
  afterhours: {
    key: 'afterhours',
    path: '/photos/uci-afterhours.jpg',
    alt: 'Uci — Side B 2:00 AM After-Hours',
    caption: '2:00 AM After-Hours',
    objectPosition: 'center 25%',
  },
  eyes: {
    key: 'eyes',
    path: '/photos/uci-eyes.jpg',
    alt: 'Those Eyes That Hold My Attention',
    caption: 'Those Eyes That Hold My Attention',
    objectPosition: 'center 30%',
  },
  smile: {
    key: 'smile',
    path: '/photos/uci-smile.jpg',
    alt: 'Her Irresistible Laugh & Smile',
    caption: 'Her Irresistible Laugh',
    objectPosition: 'center 30%',
  },
  playful: {
    key: 'playful',
    path: '/photos/uci-playful.jpg',
    alt: 'That Mischievous Smile',
    caption: 'That Mischievous Smile',
    objectPosition: 'center 25%',
  },
  sideprofile: {
    key: 'sideprofile',
    path: '/photos/uci-sideprofile.jpg',
    alt: 'Her Art of Teasing Me',
    caption: 'Her Art of Teasing Me',
    objectPosition: 'center 25%',
  },
  sleepy: {
    key: 'sleepy',
    path: '/photos/uci-sleepy.jpg',
    alt: 'Her Midnight Voice & Sleepy Calls',
    caption: 'Her Midnight Voice',
    objectPosition: 'center 30%',
  },
  keepsake01: {
    key: 'keepsake01',
    path: '/photos/keepsake-01.jpg',
    alt: 'Keepsake 01 — Open When You Miss Me',
    caption: 'Open When You Miss Me',
    objectPosition: 'center 25%',
  },
  keepsake02: {
    key: 'keepsake02',
    path: '/photos/keepsake-02.jpg',
    alt: 'Keepsake 02 — A Little Piece of My Voice',
    caption: 'A Little Piece of My Voice',
    objectPosition: 'center 25%',
  },
  keepsake03: {
    key: 'keepsake03',
    path: '/photos/keepsake-03.jpg',
    alt: 'Keepsake 03 — Our Midnight Rituals',
    caption: 'Our Midnight Rituals',
    objectPosition: 'center 25%',
  },
  keepsake04: {
    key: 'keepsake04',
    path: '/photos/keepsake-04.jpg',
    alt: 'Keepsake 04 — What Is True Right Now',
    caption: 'What Is True Right Now',
    objectPosition: 'center 25%',
  },
  finale: {
    key: 'finale',
    path: '/photos/uci-finale.jpg',
    alt: 'Uci — Birthday Finale Portrait',
    caption: 'Forever my favourite person across every mile.',
    objectPosition: 'center 25%',
  },
};

export const SOUNDTRACK_MANIFEST: Record<SoundtrackTrackId, SoundtrackTrack> = {
  'act-1-vastness': {
    id: 'act-1-vastness',
    actNumber: 'ACT I',
    sceneLabel: 'Opening · The Gravity of Uci',
    title: 'Vastness',
    artist: 'Andrew Ev',
    mood: 'Expansive cinematic ambient and cosmic synth',
    src: '/audio/act-1-vastness.mp3',
    defaultVolume: 0.42,
  },
  'act-2-skyline-piano': {
    id: 'act-2-skyline-piano',
    actNumber: 'ACT II',
    sceneLabel: 'The Little Things I Keep',
    title: 'Skyline',
    artist: 'Eugenio Mininni',
    mood: 'Warm intimate acoustic piano',
    src: '/audio/act-2-skyline-piano.mp3',
    defaultVolume: 0.44,
  },
  'act-2-beautiful-dream': {
    id: 'act-2-beautiful-dream',
    actNumber: 'ACT III',
    sceneLabel: 'The Steamy Mirror',
    title: 'Beautiful Dream',
    artist: 'Diego Nava',
    mood: 'Dreamy, intimate, quiet confession',
    src: '/audio/act-2-beautiful-dream.mp3',
    defaultVolume: 0.44,
  },
  'act-3-daydreamin': {
    id: 'act-3-daydreamin',
    actNumber: 'ACT IV · SIDE A',
    sceneLabel: 'Dual-Soul Vinyl · Daylight',
    title: "Day Dreamin' with U",
    artist: 'Michael Ramir C.',
    mood: 'Dream pop and romantic vinyl mood',
    src: '/audio/act-3-daydreamin.mp3',
    defaultVolume: 0.46,
  },
  'act-3-romantic-01': {
    id: 'act-3-romantic-01',
    actNumber: 'ACT IV · SIDE B',
    sceneLabel: 'Dual-Soul Vinyl · After-Hours',
    title: 'Romantic 01',
    artist: 'Lily J.',
    mood: 'Slow, deep, sensual R&B',
    src: '/audio/act-3-romantic-01.mp3',
    defaultVolume: 0.48,
  },
  'act-4-silent-descent': {
    id: 'act-4-silent-descent',
    actNumber: 'ACT IV · STARS',
    sceneLabel: 'The Goosebump Constellation',
    title: 'Silent Descent',
    artist: 'Eugenio Mininni',
    mood: 'Emotional piano, soft strings and atmospheric texture',
    src: '/audio/act-4-silent-descent.mp3',
    defaultVolume: 0.44,
  },
  'act-5-jb-rnb': {
    id: 'act-5-jb-rnb',
    actNumber: 'ACT V',
    sceneLabel: 'The Uci Formula & Scratch Vault',
    title: 'J.B. R&B Music',
    artist: 'Arulo',
    mood: 'Deep crimson R&B and slow sensual groove',
    src: '/audio/act-5-jb-rnb.mp3',
    defaultVolume: 0.45,
  },
  'act-6-possible-dreams': {
    id: 'act-6-possible-dreams',
    actNumber: 'ACT VI',
    sceneLabel: 'Heartbeat Across the Distance',
    title: 'Possible Dreams',
    artist: 'Eugenio Mininni',
    mood: 'Sparse piano escalating into emotional orchestral warmth',
    src: '/audio/act-6-possible-dreams.mp3',
    defaultVolume: 0.45,
  },
  'act-7-discover': {
    id: 'act-7-discover',
    actNumber: 'ACT VII',
    sceneLabel: 'Birthday Cake, Letter & VIP Vault',
    title: 'Discover',
    artist: 'Eugenio Mininni',
    mood: 'Delicate music box, warm piano and soft strings',
    src: '/audio/act-7-discover.mp3',
    defaultVolume: 0.46,
  },
  'closing-its-been-a-long-long-time': {
    id: 'closing-its-been-a-long-long-time',
    actNumber: 'FINALE',
    sceneLabel: 'The Last Little Universe · Final Poem',
    title: "It's Been a Long, Long Time",
    artist: 'Harry James & His Orchestra (feat. Kitty Kallen)',
    mood: 'Nostalgic vintage slow-dance trumpet & warm orchestra',
    src: '/audio/closing-its-been-a-long-long-time.mp3',
    fallbackSrc: '/audio/closing-lounging-by-moonlight.mp3',
    fallbackTitle: "It's Been a Long, Long Time",
    fallbackArtist: 'Harry James & His Orchestra (feat. Kitty Kallen)',
    defaultVolume: 0.55,
  },
};

const DAYLIGHT_CARDS = [
  {
    id: 'daylight-01',
    trackNumber: '01',
    title: 'MY FAVOURITE NOTIFICATION',
    message:
      'Every time your name appears on my screen, my entire mood changes instantly.',
  },
  {
    id: 'daylight-02',
    trackNumber: '02',
    title: 'YOUR VOICE IS HOME',
    message:
      'Even across the distance, hearing your voice at the end of a long day makes everything feel lighter.',
  },
  {
    id: 'daylight-03',
    trackNumber: '03',
    title: 'ONE MORE MINUTE',
    message:
      "The hardest part of every call with you is pretending I'm ready to hang up when I just want five more minutes.",
  },
  {
    id: 'daylight-04',
    trackNumber: '04',
    title: 'ONE REAL CONVERSATION AT A TIME',
    message:
      'I adore talking to you, laughing at your little jokes, and discovering more of who you are every single day, cintaku.',
  },
];

const AFTER_HOURS_CARDS = [
  {
    id: 'afterhours-01',
    trackNumber: '01',
    title: 'THAT LOOK THROUGH THE SCREEN',
    message:
      'You have this look on camera when you know exactly what you are doing to me, and you do not even try to hide it.',
  },
  {
    id: 'afterhours-02',
    trackNumber: '02',
    title: 'THE ART OF TEASING ME',
    message:
      'You sit there acting innocent while casually saying things that completely ruin my focus for the rest of the night.',
  },
  {
    id: 'afterhours-03',
    trackNumber: '03',
    title: 'THE MIDNIGHT VOICE',
    message:
      'When your voice drops late at night and goes soft and sleepy, my self-control disappears.',
  },
  {
    id: 'afterhours-04',
    trackNumber: '04',
    title: 'BEDROOM MENACE: UNLOCKED',
    message:
      'Sweet princess by day, absolute menace after midnight. You know exactly how much trouble you are.',
  },
];

export const CONFIGURED_MEMORIES: MemoryItemConfig[] = [
  {
    id: 'mem-01',
    populated: true,
    category: 'photograph',
    categoryBadge: '01 // OPEN WHEN YOU MISS ME',
    title: 'OPEN WHEN YOU MISS ME',
    eraOrDateLabel: 'Whenever the Distance Feels Loud',
    storyBody:
      'Whenever the miles between us feel heavy, open this and remember: you are never loving me alone. Press play if you want to hear my voice reminding you how deeply you are cherished, cintaku.',
    secondaryWhisper: 'No matter the hour, my heart is already on your side of the sky.',
    imageAssetKey: 'act2-keepsake-01-first-night',
    photoPath: PHOTO_PATHS.keepsake01.path,
    voiceNoteSrc: '/audio/my-voice-note.mp3',
    imageAltText: PHOTO_PATHS.keepsake01.alt,
  },
  {
    id: 'mem-02',
    populated: true,
    category: 'voice-note',
    categoryBadge: '02 // A LITTLE PIECE OF MY VOICE',
    title: 'A LITTLE PIECE OF MY VOICE',
    eraOrDateLabel: 'Saved Just for Your Headphones',
    storyBody:
      'A personal voice note kept right here for the moments when texts are not enough and you just want to close your eyes and hear me talking only to you.',
    secondaryWhisper: 'Put your headphones in and let me stay with you for a minute.',
    imageAssetKey: 'act2-keepsake-02-sweetest-laugh',
    photoPath: PHOTO_PATHS.keepsake02.path,
    voiceNoteSrc: '/audio/my-voice-note.mp3',
    imageAltText: PHOTO_PATHS.keepsake02.alt,
  },
  {
    id: 'mem-03',
    populated: true,
    category: 'shared-moment',
    categoryBadge: '03 // OUR MIDNIGHT RITUALS',
    title: 'OUR MIDNIGHT RITUALS',
    eraOrDateLabel: 'Every Night Across the Screen',
    storyBody:
      'We built an entire universe out of late-night calls and shared screens—all the little habits that make the distance feel lighter:',
    bulletItems: [
      'Late-night calls',
      'Shared playlists',
      'Online movie dates',
      'Voice notes',
      'Private jokes',
      'Little daily conversations',
    ],
    secondaryWhisper: 'Every ritual with you is my favourite part of the day.',
    imageAssetKey: 'act2-keepsake-03-late-night-call',
    photoPath: PHOTO_PATHS.keepsake03.path,
    imageAltText: PHOTO_PATHS.keepsake03.alt,
  },
  {
    id: 'mem-04',
    populated: true,
    category: 'personal-confession',
    categoryBadge: '04 // WHAT IS TRUE RIGHT NOW',
    title: 'WHAT IS TRUE RIGHT NOW',
    eraOrDateLabel: 'Honest, Present & Real',
    storyBody:
      "I won't pretend that distance is easy, or make promises about a date I can't know. What I can tell you is what is true right now: I adore talking to you, hearing your voice, laughing at your little jokes and discovering more of who you are.",
    secondaryWhisper: 'Showing up with honesty, care and affection, one real conversation at a time.',
    imageAssetKey: 'act2-keepsake-04-cute-habit',
    photoPath: PHOTO_PATHS.keepsake04.path,
    imageAltText: PHOTO_PATHS.keepsake04.alt,
  },
];

export const CONFIGURED_ACTUAL_GIFT: ActualGiftConfig = {
  populated: true,
  eyebrow: 'FOR YOUR HANDS, NOT JUST YOUR SCREEN',
  title: 'A Real Birthday Gift Awaits...',
  subtitle: 'Waiting for the destination where it belongs — with you',
  description:
    'This digital world is only the beginning, cintaku. I have a real birthday gift waiting to be sent to you — something you can hold in your hands while we count down the days until I am standing right there in front of you.',
  imageAssetKey: 'final-actual-gift-reveal',
  photoPath: PHOTO_PATHS.finale.path,
  deliveryOrRedemptionNote:
    "Sayang has one little question, baby. I'd love to send a little surprise your way. When you have a moment, send me the delivery address you'd be comfortable receiving it at. No rush—just message me privately. ❤️",
  personalNote:
    'Until I can hand you everything in person, let this be the first real piece of my world arriving in yours. Happy birthday, my gorgeous Uci. ♥',
  ctaLabel: "I CAN'T WAIT — OPEN IT!",
  addressRevealHeading: 'ONE TINY THING, CINTAKU',
  addressRevealBody:
    "Sayang has one little question, baby. I'd love to send a little surprise your way. When you have a moment, send me the delivery address you'd be comfortable receiving it at. No rush—just message me privately. ❤️",
  addressButtonLabel: 'SEND MY ADDRESS TO SAYANG ON TELEGRAM',
  addressPrivacyNote:
    'Opens a private Telegram chat with Sayang • Your address is never typed or stored on this website.',
  telegramPrefillMessage:
    "Hey Sayang ❤️ Here's the delivery address I'm comfortable using for my birthday surprise: ",
  whatsappPrefillMessage:
    "Hey Sayang ❤️ Here's the delivery address I'm comfortable using for my birthday surprise: ",
};

export const CONFIGURED_LIVE_CALL: LiveCallConfig = {
  url: '',
  fallbackHeadline: 'Call Sayang Right Now ❤️',
  fallbackMessage:
    "Sayang is waiting on the other side of this screen to hear your laugh and celebrate with you. Pick up your phone and call right now!",
};

export const OPENING_PRELUDE_LINES = [
  'Somewhere in this enormous universe, two people found each other.',
  'Different countries. Different time zones. Different skies.',
  'But somehow, my favourite place is still wherever you are.',
];

export const OPENING_VOICE_TRANSCRIPT =
  "Hey, beautiful. Even across the miles today, I wanted to build this little universe just for you. Every star, song, and secret inside it belongs to you, cintaku.";

export const SUPPLEMENTARY_REDEMPTION_GUIDANCE: Record<string, RedemptionGuidanceMeta> = {
  'scratch-1': {
    mode: 'remote-tonight',
    badgeLabel: 'After-Dark Confession Unlocked',
    guidanceNote: 'Strictly between us on our late-night line.',
  },
  'scratch-2': {
    mode: 'remote-tonight',
    badgeLabel: '2:00 AM Private Channel Pass',
    guidanceNote: 'Unfiltered late-night conversations, zero pretending.',
  },
  'scratch-3': {
    mode: 'remote-tonight',
    badgeLabel: '18+ · Mutual Yes Only',
    guidanceNote: 'Your pace, your boundaries, always mutual.',
  },
  'scratch-4': {
    mode: 'remote-tonight',
    badgeLabel: 'My Favourite Kind of Trouble ♥',
    guidanceNote: 'Celebrating that mischievous mind of yours.',
  },
  'vip-01': {
    mode: 'remote-tonight',
    badgeLabel: 'Redeemable Anytime Across Time Zones',
    guidanceNote: 'Screenshot & send to Sayang whenever you want a comfort call.',
  },
  'vip-02': {
    mode: 'remote-tonight',
    badgeLabel: 'Redeemable for Our Next Virtual Date Night',
    guidanceNote: 'Screenshot & send to Sayang to schedule your virtual date night.',
  },
  'vip-03': {
    mode: 'remote-tonight',
    badgeLabel: 'Surprise Doorstep Delivery Pass',
    guidanceNote: 'Screenshot & send to Sayang whenever you want your favourite treat delivered.',
  },
  'vip-04': {
    mode: 'remote-tonight',
    badgeLabel: 'After-Midnight Private Call Pass',
    guidanceNote: 'Screenshot & send to Sayang after midnight when you want private 2:00 AM energy.',
  },
  'vip-05': {
    mode: 'remote-tonight',
    badgeLabel: 'Late-Night Private Session Pass',
    guidanceNote: 'You set the mood, the questions, and the rules on our private call.',
  },
  'vip-06': {
    mode: 'remote-tonight',
    badgeLabel: 'All-Night Do-Not-Disturb Lock-In Pass',
    guidanceNote: 'Phones muted for the rest of the world—just us all night.',
  },
};

export const STORY_DATA: StoryDataPayload = {
  girlfriendName: 'Uci',
  nicknames: ['cintaku', 'cinta', 'sayang'],
  initials: 'U ♥ S',
  telegramUsername: 'Hereitsme1234',
  photos: PHOTO_PATHS,
  soundtrack: SOUNDTRACK_MANIFEST,

  heroOpening: {
    eyebrow: '13.8 BILLION YEARS IN THE MAKING',
    title: 'The Gravity of Uci.',
    subtitle:
      'Before you, the universe was just cold static and empty space. Then you arrived—and suddenly every atom in my world knew exactly what it was orbiting.',
    whisper:
      'Selamat ulang tahun, my gorgeous cintaku. Tonight, every star in this sky belongs to you.',
    cta: 'ENTER HER UNIVERSE',
    photoPath: PHOTO_PATHS.portrait.path,
  },

  steamyMirrorNotes: [
    {
      id: 1,
      x: 22,
      y: 25,
      text: 'Even through a screen, you leave me breathless.',
      subtext: 'Seriously, how am I supposed to focus when your camera turns on?',
    },
    {
      id: 2,
      x: 72,
      y: 28,
      text: 'Still my favourite view on every call.',
      subtext: 'Morning texts, sleepy midnight voice, or dressed to kill.',
    },
    {
      id: 3,
      x: 28,
      y: 68,
      text: 'Your laugh is my favourite sound.',
      subtext: 'One voice note from you changes my whole night, cinta.',
    },
    {
      id: 4,
      x: 75,
      y: 72,
      text: 'Stay on the line with me, cintaku.',
      subtext: 'Five more minutes never meant five minutes with you.',
    },
    {
      id: 5,
      x: 50,
      y: 48,
      text: 'Worth every mile between us. ♥',
      subtext: 'Wipe the rest of the glass to see who owns my heart.',
    },
  ],

  vinylTracks: {
    daylight: {
      title: 'SIDE A // SUNLIGHT & SWEETHEART',
      subtitle: 'The Soft, Pure, Everyday Magic of Loving You Across the Miles',
      bpm: '92 BPM • Dream Pop Aura',
      moodColor: '#FDE68A',
      grooveText:
        'MY CINTAKU • MY PEACE • THE GIRL WHO SOFTENED MY WHOLE WORLD • CINTA FOREVER • ',
      trackId: 'act-3-daydreamin',
      audioSrc: SOUNDTRACK_MANIFEST['act-3-daydreamin'].src,
      photoPath: PHOTO_PATHS.daylight.path,
      cards: DAYLIGHT_CARDS,
      confessions: DAYLIGHT_CARDS.map((c) => `${c.title} — ${c.message}`),
    },
    afterHours: {
      title: 'SIDE B // 2:00 AM BEHIND CLOSED DOORS 🔥',
      subtitle: 'Late-Night Calls, Camera Looks & Bedroom Menace Energy',
      bpm: '68 BPM • Heavy Late-Night Tension',
      moodColor: '#E11D48',
      grooveText:
        'THAT LOOK THROUGH THE SCREEN • THE ART OF TEASING ME • THE MIDNIGHT VOICE • BEDROOM MENACE UNLOCKED • ',
      trackId: 'act-3-romantic-01',
      audioSrc: SOUNDTRACK_MANIFEST['act-3-romantic-01'].src,
      photoPath: PHOTO_PATHS.afterhours.path,
      cards: AFTER_HOURS_CARDS,
      confessions: AFTER_HOURS_CARDS.map((c) => `${c.title} — ${c.message}`),
    },
  },

  constellationNodes: [
    {
      id: 'eyes',
      label: '01 // Those Eyes',
      category: 'soul',
      accentTier: 'rose-gold',
      x: 24,
      y: 22,
      headline: 'Those Eyes That Hold My Attention',
      description:
        'Even across a screen, one look from your eyes makes the whole noisy world go quiet. I always end up staring longer than I mean to, cintaku.',
      body: 'Even across a screen, one look from your eyes makes the whole noisy world go quiet. I always end up staring longer than I mean to, cintaku.',
      mediaAssetKey: 'act4-star-eyes',
      photoPath: PHOTO_PATHS.eyes.path,
    },
    {
      id: 'laugh',
      label: '02 // That Laugh',
      category: 'soul',
      accentTier: 'rose-gold',
      x: 68,
      y: 18,
      headline: 'Her Irresistible Laugh',
      description:
        'The sound that instantly fixes my worst days. Hearing you laugh over a call is still my favourite melody in the world, sayang.',
      body: 'The sound that instantly fixes my worst days. Hearing you laugh over a call is still my favourite melody in the world, sayang.',
      mediaAssetKey: 'act4-star-laugh',
      photoPath: PHOTO_PATHS.smile.path,
    },
    {
      id: 'lips',
      label: '03 // Mischievous Smile 🔥',
      category: 'spicy',
      accentTier: 'crimson-champagne',
      x: 48,
      y: 36,
      headline: 'That Mischievous Smile',
      description:
        'That slow, knowing little smile you get on camera right before you say something bold enough to ruin my composure.',
      body: 'That slow, knowing little smile you get on camera right before you say something bold enough to ruin my composure.',
      mediaAssetKey: 'act4-star-lips',
      photoPath: PHOTO_PATHS.playful.path,
    },
    {
      id: 'neck',
      label: '04 // Her Flirty Side 🔥',
      category: 'spicy',
      accentTier: 'crimson-champagne',
      x: 76,
      y: 48,
      headline: 'Her Flirty Side',
      description:
        'The effortless way you turn a normal conversation into a private late-night confession that leaves my heart racing across time zones.',
      body: 'The effortless way you turn a normal conversation into a private late-night confession that leaves my heart racing across time zones.',
      mediaAssetKey: 'act4-star-neck',
      photoPath: PHOTO_PATHS.afterhours.path,
    },
    {
      id: 'bites',
      label: '05 // Her Midnight Voice 🔥',
      category: 'spicy',
      accentTier: 'crimson-champagne',
      x: 22,
      y: 54,
      headline: 'Her Midnight Voice',
      description:
        'When it is past 2:00 AM and your voice drops into that soft, sleepy whisper in my headphones—my willpower does not stand a chance, cintaku.',
      body: 'When it is past 2:00 AM and your voice drops into that soft, sleepy whisper in my headphones—my willpower does not stand a chance, cintaku.',
      mediaAssetKey: 'act4-star-bites',
      photoPath: PHOTO_PATHS.sleepy.path,
    },
    {
      id: 'waist',
      label: '06 // Art of Teasing 🔥',
      category: 'spicy',
      accentTier: 'crimson-champagne',
      x: 54,
      y: 66,
      headline: 'Her Art of Teasing Me',
      description:
        'Acting completely innocent while testing my patience from miles away—you know exactly how easily you get under my skin, cinta.',
      body: 'Acting completely innocent while testing my patience from miles away—you know exactly how easily you get under my skin, cinta.',
      mediaAssetKey: 'act4-star-waist',
      photoPath: PHOTO_PATHS.sideprofile.path,
    },
    {
      id: 'voice',
      label: '07 // Clingy Little Moments',
      category: 'soul',
      accentTier: 'warm-gold',
      x: 30,
      y: 82,
      headline: 'Her Clingy Little Moments',
      description:
        'When you ask me to stay on the line a little longer or send me a sleepy voice note because you miss me. I adore every second of it.',
      body: 'When you ask me to stay on the line a little longer or send me a sleepy voice note because you miss me. I adore every second of it.',
      mediaAssetKey: 'act4-star-voice',
      photoPath: PHOTO_PATHS.daylight.path,
    },
    {
      id: 'heart',
      label: '08 // Her Beautiful Heart',
      category: 'soul',
      accentTier: 'warm-gold',
      x: 72,
      y: 80,
      headline: 'Her Beautiful Heart',
      description:
        'Fierce, loyal, tender, and impossibly loving across the distance. Loving you is the easiest, truest thing I have ever done.',
      body: 'Fierce, loyal, tender, and impossibly loving across the distance. Loving you is the easiest, truest thing I have ever done.',
      mediaAssetKey: 'act4-star-heart',
      photoPath: PHOTO_PATHS.portrait.path,
    },
  ],

  keepsakeMemories: CONFIGURED_MEMORIES,

  alchemyIngredients: [
    {
      id: 'sweetness',
      slot: 1,
      percentage: 20,
      percentageLabel: '20%',
      name: 'Pure Cintaku Sweetness',
      shortName: 'Pure Cintaku Sweetness',
      subtitle: 'Soft voice notes, gentle check-ins & pure warmth across the miles',
      color: '#FDE68A',
      glowColor: 'rgba(253, 230, 138, 0.85)',
      iconName: 'heart',
      tempTarget: 180,
      isDominant: false,
    },
    {
      id: 'radiance',
      slot: 2,
      percentage: 20,
      percentageLabel: '20%',
      name: 'Effortless Goddess Radiance',
      shortName: 'Effortless Goddess Radiance',
      subtitle: 'Stealing my breath every single time your camera turns on',
      color: '#F472B6',
      glowColor: 'rgba(244, 114, 182, 0.85)',
      iconName: 'crown',
      tempTarget: 420,
      isDominant: false,
    },
    {
      id: 'princess',
      slot: 3,
      percentage: 20,
      percentageLabel: '20%',
      name: 'Clingy Princess Energy',
      shortName: 'Clingy Princess Energy',
      subtitle: '"Don\'t hang up yet" & wanting all my attention from afar',
      color: '#FB7185',
      glowColor: 'rgba(251, 113, 133, 0.85)',
      iconName: 'sparkles',
      tempTarget: 680,
      isDominant: false,
    },
    {
      id: 'menace',
      slot: 4,
      percentage: 40,
      percentageLabel: '40%',
      name: 'Bedroom Menace & Mischief',
      shortName: 'Bedroom Menace & Mischief',
      subtitle: '2:00 AM teasing, dangerous looks & zero mercy on my self-control',
      color: '#E11D48',
      glowColor: 'rgba(225, 29, 72, 0.95)',
      iconName: 'flame',
      tempTarget: 999,
      isDominant: true,
    },
  ],

  alchemyOverheatWarning:
    'DANGER: TOO HOT TO HANDLE. SAYANG WILLPOWER COMPROMISED.',

  scratchCards: [
    {
      id: 'scratch-1',
      cardNumberLabel: 'CARD 01',
      foilTitle: 'CARD 01 — YOU MAKE ME STUPIDLY HORNY',
      tag: 'CONFESSION AFTER DARK 🔥',
      secretTitle: 'YOU MAKE ME STUPIDLY HORNY',
      secretBody:
        "One teasing look through the camera, one low voice note, one naughty little hint from you, and my concentration is completely fucked. You're ridiculously distracting, cinta. Sometimes all it takes is one message from you to turn a perfectly normal night into a very different kind of night.",
      secretText:
        "One teasing look through the camera, one low voice note, one naughty little hint from you, and my concentration is completely fucked. You're ridiculously distracting, cinta. Sometimes all it takes is one message from you to turn a perfectly normal night into a very different kind of night.",
      rewardTag: 'CONFESSION AFTER DARK 🔥',
      requiresAdultConsent: true,
    },
    {
      id: 'scratch-2',
      cardNumberLabel: 'CARD 02',
      foilTitle: 'CARD 02 — 2:00 AM — NO FILTER',
      tag: 'PRIVATE CHANNEL 🔥',
      secretTitle: '2:00 AM — NO FILTER',
      secretBody:
        "I love our unfiltered late-night conversations. The flirting, the filthy jokes, the dirty talk, the things we admit when it's just us. You really know how to make me horny through a screen, and I am absolutely not complaining.",
      secretText:
        "I love our unfiltered late-night conversations. The flirting, the filthy jokes, the dirty talk, the things we admit when it's just us. You really know how to make me horny through a screen, and I am absolutely not complaining.",
      rewardTag: 'PRIVATE CHANNEL 🔥',
      requiresAdultConsent: true,
    },
    {
      id: 'scratch-3',
      cardNumberLabel: 'CARD 03',
      foilTitle: 'CARD 03 — OUR PRIVATE AFTER-HOURS CALL',
      tag: '18+ · MUTUAL YES ONLY',
      secretTitle: 'OUR PRIVATE AFTER-HOURS CALL',
      secretBody:
        "One private call where we forget about the world for a little while. When we're both in the mood, I want the shameless flirting, the explicit little confessions, the word sex without pretending we're innocent, and all the naughty things we genuinely want to explore together. Your pace, your boundaries, always.",
      secretText:
        "One private call where we forget about the world for a little while. When we're both in the mood, I want the shameless flirting, the explicit little confessions, the word sex without pretending we're innocent, and all the naughty things we genuinely want to explore together. Your pace, your boundaries, always.",
      rewardTag: '18+ · MUTUAL YES ONLY',
      requiresAdultConsent: true,
    },
    {
      id: 'scratch-4',
      cardNumberLabel: 'CARD 04',
      foilTitle: 'CARD 04 — FUCK, I LOVE YOUR LITTLE MIND',
      tag: 'DANGEROUSLY ADDICTED TO YOU ♥',
      secretTitle: 'FUCK, I LOVE YOUR LITTLE MIND',
      secretBody:
        "Your attitude, your confidence, your playful little provocations and that mischievous mind of yours. You can make me smile, blush, lose my train of thought and get ridiculously worked up without even being in the same room. You're my favourite kind of trouble.",
      secretText:
        "Your attitude, your confidence, your playful little provocations and that mischievous mind of yours. You can make me smile, blush, lose my train of thought and get ridiculously worked up without even being in the same room. You're my favourite kind of trouble.",
      rewardTag: 'DANGEROUSLY ADDICTED TO YOU ♥',
      requiresAdultConsent: true,
    },
  ],

  heartbeatWhispers: [
    'Hold right there, cintaku. Just a little longer.',
    'Imagine my thumb on the other side of this little screen.',
    'The distance is real, but so is everything I feel for you.',
    'I wish I could pause this moment and stay right here with you.',
    'Every call, every message, every sleepy whisper brings you closer to me.',
    'Every beat carries a little piece of me to you, cinta.',
  ],

  birthdayLetter: {
    salutation:
      'To my gorgeous girlfriend, my cinta, my forever cintaku — Uci,',
    paragraphs: [
      'Happy birthday, my love. Even though there is a screen and miles of sky between us tonight, I wanted to build you a place where distance does not get the final word—a universe made entirely around the way you make me feel.',
      "There are days when the distance feels especially loud—when I wish I didn't have to hear your laugh through a speaker or say goodnight to a screen. Yet somehow, even from miles away, you've become my favourite part of every single day.",
      'I love every side of what we have built together. I love the soft daylight version of us—waiting for your notifications, hearing your voice after a long day, and sharing our little daily rituals. And I love the 2:00 AM version of us too—when your voice goes sleepy, when you tease me through the camera, and when it feels like we are the only two people awake in the world.',
      "We're miles apart, and I don't need to make big promises about the future to know what you mean to me right now. Even through a screen, you've become someone I genuinely care for, someone who makes ordinary days brighter and late nights warmer. I just want to keep enjoying what we have—honestly, gently and wholeheartedly.",
    ],
    signOff: 'Forever obsessed with you,',
    signature: 'Sayang ♥',
    postscript:
      'P.S. Keep going after you close this letter... your birthday surprise and your private VIP Passbook are waiting just ahead.',
    photoPath: PHOTO_PATHS.finale.path,
    telegramAddressRequest: {
      heading: 'ONE TINY THING, CINTAKU',
      body: "Sayang has one little question, baby. I'd love to send a little surprise your way. When you have a moment, send me the delivery address you'd be comfortable receiving it at. No rush—just message me privately. ❤️",
      buttonLabel: 'SEND MY ADDRESS TO SAYANG ON TELEGRAM',
      prefillMessage:
        "Hey Sayang ❤️ Here's the delivery address I'm comfortable using for my birthday surprise: ",
      privacyNote:
        'Opens a private Telegram chat with Sayang • Your address is never typed or stored on this website.',
    },
  },

  vipCoupons: [
    {
      id: 'vip-01',
      tier: 'SWEET // PRINCESS TIER',
      code: 'UCI-ROYAL-001',
      serialNumber: 'LDR-PASS-2026-01',
      category: 'princess',
      title: '01 — THE COMFORT CALL',
      description:
        'Redeemable whenever you miss me, feel overwhelmed, or just want to hear my voice until you fall asleep on the line.',
      terms: 'Valid 24/7 across time zones • Unlimited duration',
      redeemedBadgeText:
        'REDEEMED BY UCI — SCREENSHOT & SEND TO SAYANG.',
    },
    {
      id: 'vip-02',
      tier: 'SWEET // PRINCESS TIER',
      code: 'UCI-PEACE-002',
      serialNumber: 'LDR-PASS-2026-02',
      category: 'princess',
      title: '02 — VIRTUAL DATE NIGHT',
      description:
        'A planned long-distance date night completely on your terms: your choice of movie, shared music, and undivided camera time together.',
      terms: 'Princess Priority • Sayang brings the snacks & full attention',
      redeemedBadgeText:
        'REDEEMED BY UCI — SCREENSHOT & SEND TO SAYANG.',
    },
    {
      id: 'vip-03',
      tier: 'SWEET // PRINCESS TIER',
      code: 'UCI-NIGHT-003',
      serialNumber: 'LDR-PASS-2026-03',
      category: 'princess',
      title: '03 — THE PRINCESS DELIVERY',
      description:
        'One surprise comfort delivery—your favourite food, dessert, coffee, or flowers—sent straight to your doorstep when you least expect it.',
      terms: 'Valid any day you want to be spoiled from afar',
      redeemedBadgeText:
        'REDEEMED BY UCI — SCREENSHOT & SEND TO SAYANG.',
    },
    {
      id: 'vip-04',
      tier: 'AFTER-MIDNIGHT // 18+ SPICY 🔥',
      code: 'UCI-HEAT-004',
      serialNumber: 'LDR-PASS-2026-04',
      category: 'spicy',
      title: '04 — AFTER-HOURS PRIVATE MODE',
      description:
        'An exclusive past-midnight private call where daylight politeness is turned off and our flirty, unfiltered 2:00 AM energy takes over.',
      terms: 'After-Midnight Tier • Always mutual. Either of us can say "not now".',
      redeemedBadgeText:
        'REDEEMED BY UCI — SCREENSHOT & SEND TO SAYANG.',
    },
    {
      id: 'vip-05',
      tier: 'AFTER-MIDNIGHT // 18+ SPICY 🔥',
      code: 'UCI-CRAVE-005',
      serialNumber: 'LDR-PASS-2026-05',
      category: 'spicy',
      title: '05 — HER FANTASY, HER RULES',
      description:
        'You set the mood, the questions, and the rules for a private late-night session—your pace, your boundaries, and our favourite late-night chemistry.',
      terms: '18+ Private Pass • Always mutual. Either of us can say "not now".',
      redeemedBadgeText:
        'REDEEMED BY UCI — SCREENSHOT & SEND TO SAYANG.',
    },
    {
      id: 'vip-06',
      tier: 'AFTER-MIDNIGHT // 18+ SPICY 🔥',
      code: 'UCI-BOSS-006',
      serialNumber: 'LDR-PASS-2026-06',
      category: 'spicy',
      title: '06 — NO-DISTRACTION MIDNIGHT',
      description:
        'Phones on Do Not Disturb for everyone else, notifications muted, lights low—just you and me locked into each other all night.',
      terms: 'High Addiction Warning • Always mutual. Either of us can say "not now".',
      redeemedBadgeText:
        'REDEEMED BY UCI — SCREENSHOT & SEND TO SAYANG.',
    },
  ],

  actualGift: CONFIGURED_ACTUAL_GIFT,
};
