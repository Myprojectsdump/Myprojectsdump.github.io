// src/config/storyContent.ts
// Authoritative copy source: SOURCE_STORY_AND_COPY.md (VERBATIM — DO NOT ALTER)

import {
  StoryDataPayload,
  MemoryItemConfig,
  ActualGiftConfig,
  LiveCallConfig,
  RedemptionGuidanceMeta,
} from '../types/story.types';

export const STORY_DATA: StoryDataPayload = {
  girlfriendName: "Uci",
  nicknames: ["pacarku", "cintaku", "sayang"],
  initials: "U ♥ S",
  heroOpening: {
    eyebrow: "13.8 BILLION YEARS IN THE MAKING",
    title: "The Gravity of Uci.",
    subtitle: "Before you, the universe was just cold static and empty space. Then you arrived—and suddenly every atom in my world knew exactly what it was orbiting.",
    whisper: "Selamat ulang tahun, my gorgeous pacarku. Tonight, every star in this sky belongs to you."
  },
  steamyMirrorNotes: [
    { id: 1, x: 22, y: 25, text: "Stop looking so kissable right now.", subtext: "Seriously, how am I supposed to focus?" },
    { id: 2, x: 72, y: 28, text: "Still my favorite view.", subtext: "Morning, midnight, messy hair, or dressed to kill." },
    { id: 3, x: 28, y: 68, text: "Your neck + my lips =", subtext: "My favorite unfinished conversation." },
    { id: 4, x: 75, y: 72, text: "Come back to bed, cintaku.", subtext: "5 more minutes never meant 5 minutes with you." },
    { id: 5, x: 50, y: 48, text: "100% Mine. ♥", subtext: "Wipe the rest of the glass, baby." }
  ],
  vinylTracks: {
    daylight: {
      title: "SIDE A // SUNLIGHT & SWEETHEART",
      bpm: "92 BPM • Dream Pop Aura",
      grooveText: "MY PACARKU • MY PEACE • THE GIRL WHO SOFTENED MY WHOLE WORLD • CINTAKU FOREVER • ",
      confessions: [
        "The way your eyes crinkle when you're trying not to laugh at my terrible jokes.",
        "How holding your hand in public makes me feel like I won at life.",
        "You turn the most ordinary random Tuesday into a memory I want to keep forever.",
        "Every gentle, soft part of my heart only exists because you taught it how to feel safe."
      ]
    },
    afterHours: {
      title: "SIDE B // 2:00 AM BEHIND CLOSED DOORS 🔥",
      bpm: "68 BPM • Heavy Late-Night Tension",
      grooveText: "WARNING: HIGH ADDICTION • HANDS ON YOUR WAIST • BITE MARKS & NECK KISSES • DONT BE SHY CINTAKU • ",
      confessions: [
        "That dangerous little look you give me when we're alone and you want my full attention.",
        "How fast my self-control disappears the second you sit on my lap or pull me close.",
        "The quiet little sounds you make when I kiss right below your ear—my absolute kryptonite.",
        "My favorite outfit on you will forever be my oversized shirt... and even better when it comes off."
      ]
    }
  },
  constellationNodes: [
    {
      id: "eyes",
      label: "01 // Her Eyes",
      category: "soul",
      x: 24,
      y: 22,
      headline: "Where My Willpower Goes to Die",
      description: "One look from you—whether it's soft and sleepy or sharp and teasing—and I'm already folding. You don't even have to ask twice, pacarku."
    },
    {
      id: "laugh",
      label: "02 // Her Laugh",
      category: "soul",
      x: 68,
      y: 18,
      headline: "My Favorite Frequency on Earth",
      description: "If I could bottle the sound of your genuine, breathless laugh and play it on repeat on my hardest days, I'd never need another medicine."
    },
    {
      id: "lips",
      label: "03 // Her Lips 🔥",
      category: "spicy",
      x: 48,
      y: 36,
      headline: "My Personal Addiction",
      description: "Soft, dangerous, and 100% my territory. Whether you're pouting because you want food or kissing me until we both lose our breath—I never get enough."
    },
    {
      id: "neck",
      label: "04 // The Curve of Her Neck 🔥",
      category: "spicy",
      x: 76,
      y: 48,
      headline: "My Favorite Hiding Spot",
      description: "Burying my face right into your neck while wrapping my arms around you from behind isn't just a habit—it's a biological need at this point."
    },
    {
      id: "bites",
      label: "05 // Her Cute Aggression Bites 🔥",
      category: "spicy",
      x: 22,
      y: 54,
      headline: "Unprovoked Attacks (That I Secretly Love)",
      description: "You claim you bite my arm or shoulder because you love me too much to handle it. Truth is? Leave all the marks you want, cintaku."
    },
    {
      id: "waist",
      label: "06 // Her Waist in My Hands 🔥",
      category: "spicy",
      x: 54,
      y: 66,
      headline: "Custom-Built for My Grip",
      description: "Pulling you flush against me by your waist so there's zero space left between us is easily top-tier human engineering."
    },
    {
      id: "voice",
      label: "07 // Her 1:00 AM Sleepy Voice",
      category: "soul",
      x: 30,
      y: 82,
      headline: "Soft Enough to Melt Steel",
      description: "When you're half-asleep, extra clingy, and whispering 'sayang' in that tiny voice—that's the moment I fall in love with you all over again."
    },
    {
      id: "heart",
      label: "08 // Her Fierce, Loving Heart",
      category: "soul",
      x: 74,
      y: 80,
      headline: "The Home I Always Wanted",
      description: "Beneath all our teasing, playfulness, and chaos is the warmest, most loyal heart I have ever known. Thank you for loving me the way you do."
    }
  ],
  scratchCards: [
    {
      id: "scratch-1",
      foilTitle: "CONFESSION #01 // WARDROBE RULE",
      tag: "SPICY TRUTH 🔥",
      secretTitle: "The Oversized Tee Clause",
      secretBody: "You look breathtaking dressed up, baby. But nothing beats you in just my oversized shirt, messy hair, bare legs, and zero distance between us."
    },
    {
      id: "scratch-2",
      foilTitle: "CONFESSION #02 // PHYSICAL TELEMETRY",
      tag: "BOYFRIEND SECRET 💋",
      secretTitle: "What Happens When You Touch Me",
      secretBody: "You think I'm calm and composed? The second your fingers touch the back of my neck or you whisper in my ear, my brain completely short-circuits."
    },
    {
      id: "scratch-3",
      foilTitle: "CONFESSION #03 // UNLIMITED DARE",
      tag: "TONIGHT'S PROMISE 🌙",
      secretTitle: "Your Birthday Immunity Pass",
      secretBody: "Whatever pace you want tonight—whether it's slow forehead kisses, a 45-minute full-body massage, or keeping me awake until 3 AM—my hands are yours."
    },
    {
      id: "scratch-4",
      foilTitle: "CONFESSION #04 // CORE MEMORY",
      tag: "PURE CINTAKU ♥",
      secretTitle: "My Favorite Addiction",
      secretBody: "I don't just love you, Uci. I crave you—your mind, your laugh, your body, your attitude, and every single tomorrow we get to steal together."
    }
  ],
  heartbeatWhispers: [
    "Hold right there, pacarku... don't lift your thumb yet.",
    "Can you feel that rhythm speeding up in your hand?",
    "That's what happens to my chest every single time you walk into a room.",
    "Close your eyes for three seconds and imagine my forehead resting against yours...",
    "Imagine my hand sliding slowly behind your neck, pulling you close...",
    "Every beat of this heart is yours, cintaku. Yesterday, tonight, and always."
  ],
  birthdayLetter: {
    salutation: "To my gorgeous girlfriend, my pacarku, my forever cintaku — Uci,",
    paragraphs: [
      "Happy Birthday, baby. I wanted to build you something that didn't just sit on a screen, because loving you has never been a passive thing for me. Loving you feels like electricity, like warmth after a cold rain, like coming home and losing my breath all at the exact same time.",
      "Look at everything you are: you are effortless grace and absolute chaos rolled into one irresistible human being. One minute you're the sweetest, softest girl in my arms making my heart ache with how precious you are—and the next minute you're biting my arm, rolling your eyes with that cute attitude, or looking at me in a way that makes me forget my own name.",
      "Thank you for every late-night laugh, every tight hug when the world felt heavy, every sweet whisper, and every wild, unfiltered moment behind closed doors where it's just you and me against the universe.",
      "As you step into this new year of your life, here is my promise to you: I will keep choosing you, spoiling you, protecting your peace, hyping your dreams, kissing every inch of you until you're dizzy, and loving you louder than anyone ever has."
    ],
    signOff: "Forever obsessed with you,",
    signature: "Your Boyfriend ♥"
  },
  vipCoupons: [
    {
      id: "vip-01",
      tier: "SWEET // PRINCESS TIER",
      code: "UCI-ROYAL-001",
      title: "Full Princess Day & Craving Run",
      description: "Zero decisions required. Your favorite food, boba/dessert delivered, back rubs, and 100% passenger-princess privileges all day."
    },
    {
      id: "vip-02",
      tier: "SWEET // PRINCESS TIER",
      code: "UCI-PEACE-002",
      title: "Instant 'Win Any Argument' Trump Card",
      description: "Play this card mid-debate. I immediately stop talking, admit you are right and gorgeous, and pull you into a forehead kiss."
    },
    {
      id: "vip-03",
      tier: "SWEET // PRINCESS TIER",
      code: "UCI-NIGHT-003",
      title: "Midnight Drive & Your Playlist Only",
      description: "Windows down, late-night roads, your hand in mine over the console, and zero skips on whatever songs you want to sing."
    },
    {
      id: "vip-04",
      tier: "AFTER-MIDNIGHT // 18+ SPICY 🔥",
      code: "UCI-HEAT-004",
      title: "30-Minute Uninterrupted Hands-On Massage",
      description: "Lights dimmed, phones on Do Not Disturb. Shoulders, back, waist, and wherever else you tell my hands to stay—with no rush to stop."
    },
    {
      id: "vip-05",
      tier: "AFTER-MIDNIGHT // 18+ SPICY 🔥",
      code: "UCI-CRAVE-005",
      title: "Neck Kisses & Pin-Me-Down Pass",
      description: "Redeemable whenever you're feeling clingy or needy. Instant drop-everything attention until you're completely breathless and smiling."
    },
    {
      id: "vip-06",
      tier: "AFTER-MIDNIGHT // 18+ SPICY 🔥",
      code: "UCI-BOSS-006",
      title: "Tonight, Pacarku Calls Every Shot",
      description: "Your rules, your pace, your secret fantasy. Whisper what you want in my ear and consider it done, cintaku."
    }
  ]
};

// Opening Prelude lines (Beat A per OQ-01 resolved)
export const OPENING_PRELUDE_LINES = [
  "Somewhere in this enormous universe, two people found each other.",
  "Different countries. Different time zones. Different skies.",
  "But somehow, my favourite place is still wherever you are."
];

// Act I Opening Voice Transcript (Used whether 01-opening-voice.mp3 is present or absent)
export const OPENING_VOICE_TRANSCRIPT =
  "Hey, beautiful. I know I'm not there to steal your birthday hug today. So I made something. Every little bit of this is yours. Take your time, okay?";

// Act II Configurable Memory Slots (Pending owner content — Heirloom placeholders active)
export const CONFIGURED_MEMORIES: MemoryItemConfig[] = [
  {
    id: "mem-01",
    populated: false,
    category: "photograph",
    categoryBadge: "01 // A Photograph I Keep",
    title: "The Moment I Knew",
    eraOrDateLabel: "A Random Tuesday We Stole",
    storyBody:
      "A personal photograph and quiet memory slot waiting for your story. Once added, this frame reveals your photo in a floating glass keepsake.",
    secondaryWhisper: "Still my favorite view in this whole world.",
    imageAssetKey: "memory-01-photo",
    audioAssetKey: "voice-memory-01",
    imageAltText: "A cherished personal photograph of Uci"
  },
  {
    id: "mem-02",
    populated: false,
    category: "shared-moment",
    categoryBadge: "02 // A Shared Moment",
    title: "When Time Completely Stopped",
    eraOrDateLabel: "Late Night Air",
    storyBody:
      "A quiet confession of a shared hour where nothing else mattered. Ready for the exact words and memories you want to preserve.",
    secondaryWhisper: "I wish I could live inside that hour forever.",
    imageAssetKey: "memory-02-moment",
    imageAltText: "An engraved keepsake prism marking a shared moment"
  },
  {
    id: "mem-03",
    populated: false,
    category: "inside-joke",
    categoryBadge: "03 // Our Private Joke",
    title: "The Thing Only We Understand",
    eraOrDateLabel: "Classified Intel",
    storyBody:
      "The kind of ridiculous inside joke that makes both of us dissolve into helpless laughter in public.",
    secondaryWhisper: "Don't look at me like that, you started it.",
    imageAssetKey: "memory-03-joke",
    imageAltText: "A wax-sealed folded note capsule containing an inside joke"
  },
  {
    id: "mem-04",
    populated: false,
    category: "music-memory",
    categoryBadge: "04 // A Song That Feels Like You",
    title: "The Melody In My Head",
    eraOrDateLabel: "Track #04",
    storyBody:
      "The track that immediately turns into you every time the intro plays through my headphones.",
    secondaryWhisper: "Put this on next time we are on a midnight call.",
    imageAssetKey: "memory-04-music-cover",
    imageAltText: "A miniature spinning melody locket"
  },
  {
    id: "mem-05",
    populated: false,
    category: "voice-note",
    categoryBadge: "05 // A Voice Note I Saved",
    title: "Your 1:00 AM Voice",
    eraOrDateLabel: "Saved Audio",
    storyBody:
      "That tiny, sleepy voice note where you sounded half-awake and completely mine.",
    secondaryWhisper: "I listen to this whenever the distance feels too loud.",
    audioAssetKey: "voice-memory-05",
    imageAltText: "A rose-gold waveform vial containing a voice recording"
  },
  {
    id: "mem-06",
    populated: false,
    category: "personal-confession",
    categoryBadge: "06 // A Private Truth",
    title: "What I Never Told Anyone Else",
    eraOrDateLabel: "Just For Pacarku",
    storyBody:
      "A quiet truth about how much safer, softer, and braver my whole world became after meeting you.",
    secondaryWhisper: "You are the best decision I ever made.",
    imageAssetKey: "memory-06-confession",
    imageAltText: "A velvet-and-champagne sealed confession envelope"
  }
];

// Actual Birthday Gift Slot (Pending owner content — Royal heirloom card active)
export const CONFIGURED_ACTUAL_GIFT: ActualGiftConfig = {
  populated: false,
  eyebrow: "FOR YOUR HANDS, NOT JUST YOUR SCREEN",
  title: "Your Real Birthday Gift Awaits",
  subtitle: "A Tangible Surprise Outside This Universe",
  description:
    "Your boyfriend has prepared a real-world surprise to celebrate your birthday. The full reveal details, tracking, and personal note can be dropped into storyContent.ts whenever ready.",
  imageAssetKey: "gift-hero-photo",
  deliveryOrRedemptionNote:
    "Check your door, message notification, or ask him directly right now ❤️",
  personalNote:
    "No website could ever hold everything you deserve, pacarku. This is just the beginning."
};

// Live Call Destination (OQ-05 / REQ-STR-09B)
export const CONFIGURED_LIVE_CALL: LiveCallConfig = {
  url: "", // Set to 'https://wa.me/...' or FaceTime/Zoom/Meet URL when ready
  fallbackHeadline: "Call Your Boyfriend Right Now ❤️",
  fallbackMessage:
    "He's waiting on the other side of this screen to hear your laugh and celebrate with you. Pick up your phone, open FaceTime or WhatsApp, and call him right now!"
};

// Supplementary Long-Distance vs Reunion Guidance (OQ-04 Resolved)
// Preserves STORY_DATA verbatim while adding clear fulfillment context pills
export const SUPPLEMENTARY_REDEMPTION_GUIDANCE: Record<string, RedemptionGuidanceMeta> = {
  // Scratch Cards
  "scratch-1": {
    mode: "next-reunion-in-person",
    badgeLabel: "Next Reunion Night Pass",
    guidanceNote: "Saved for our very first night back together."
  },
  "scratch-2": {
    mode: "next-reunion-in-person",
    badgeLabel: "Saved for In-Person Touch",
    guidanceNote: "Redeemable the exact second you are in my arms."
  },
  "scratch-3": {
    mode: "remote-tonight-and-reunion",
    badgeLabel: "Tonight on Call + In-Person Massage Pass",
    guidanceNote: "Valid tonight across the distance, and again for your full massage at our reunion."
  },
  "scratch-4": {
    mode: "remote-tonight-and-reunion",
    badgeLabel: "Active Tonight & Forever",
    guidanceNote: "Every word is true tonight, tomorrow, and every tomorrow after."
  },

  // VIP Coupons
  "vip-01": {
    mode: "remote-tonight-and-reunion",
    badgeLabel: "Remote Delivery Tonight + Reunion Princess Day",
    guidanceNote:
      "Redeemable right now for favourite food & boba delivered to your door across the distance, plus full passenger-princess & back-rub privileges on our next reunion."
  },
  "vip-02": {
    mode: "remote-tonight",
    badgeLabel: "Redeemable Remotely Anytime (Call / Text / In-Person)",
    guidanceNote:
      "Play this screenshot anytime on call, text, or in person—argument ends immediately and your forehead kiss is banked."
  },
  "vip-03": {
    mode: "next-reunion-in-person",
    badgeLabel: "Next In-Person Reunion (or Shared Playlist Tonight)",
    guidanceNote:
      "Locked in for our first late-night drive together when we reunite (with optional shared listening session tonight)."
  },
  "vip-04": {
    mode: "next-reunion-in-person",
    badgeLabel: "Next In-Person Reunion Priority Pass",
    guidanceNote:
      "Reserved for our first night back in the same room—phones on Do Not Disturb, zero rush."
  },
  "vip-05": {
    mode: "next-reunion-in-person",
    badgeLabel: "Next In-Person Reunion Priority Pass",
    guidanceNote:
      "Redeemable the very second you are back in my arms."
  },
  "vip-06": {
    mode: "remote-tonight-and-reunion",
    badgeLabel: "Redeemable Tonight on Private Call & At Reunion",
    guidanceNote:
      "Valid tonight across the distance on late-night private call, and again in person."
  }
};
