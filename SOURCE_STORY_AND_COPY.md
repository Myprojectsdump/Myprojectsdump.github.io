# SOURCE STORY AND COPY — THE GRAVITY OF UCI

**Status:** Authoritative source copy for planning and implementation  
**Purpose:** Preserve the original supplied story text verbatim so the planning and implementation agents can map it into the canonical seven-act experience without inventing or rewriting personal content.

## Instructions for the planning and implementation agents

1. Treat the `STORY_DATA` block below as the authoritative source for every supplied line of story copy.
2. Preserve all strings, punctuation, capitalization, emoji, identifiers, percentages, and code values exactly unless the owner explicitly approves a change.
3. The experience order is defined in the approved canonical experience specification. If the original blueprint's section labels differ from that order, preserve the content and change only its presentation mapping.
4. The original material does **not** contain real shared-memory stories, photographs, personal dates, a real gift description, or a video-call URL. Do not invent these. Create clearly labelled empty asset/content slots for the owner to fill later.
5. The `heroOpening`, `steamyMirrorNotes`, `vinylTracks`, `constellationNodes`, `scratchCards`, `heartbeatWhispers`, `birthdayLetter`, and `vipCoupons` data below must not be replaced with generic generated copy.

## Exact supplied copy payload

```ts
export const STORY_DATA = {
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
```

## Content that has not yet been supplied

The following are intentionally **not populated**. The planning and implementation agents must create schemas and polished empty states, but must not invent the personal content.

### Act II — personal memory gallery

The original source supplied the general concept of a memory gallery but did not provide actual shared-memory stories, photographs, dates, inside jokes, song choices, or voice-note recordings.

Create configurable slots for approximately 5–8 memory items. Each item should support:

- Stable ID.
- Memory title.
- Optional date or era label.
- Memory category.
- Personal story/caption supplied by the owner.
- Optional photograph or video asset path.
- Optional audio recording path.
- Optional secondary reveal message.
- Accessible text alternative.

Use clearly labelled neutral fallbacks until the owner supplies the real content. Never fabricate a shared event.

### Personal media

No actual photographs, music files, voice recordings, or portraits have been supplied in this source file. The owner will add them later. Provide a central media manifest and document every expected filename and destination.

### Actual birthday gift

The actual physical or digital gift and its details have not yet been specified. Build a configurable gift-reveal module with clearly marked fields for:

- Gift title.
- Gift description.
- Gift image or media.
- Optional delivery/redemption details.
- Optional personal note.

Do not invent the gift.

### Live call destination

No video-call URL has been supplied. Provide a configurable destination with a friendly fallback message when empty. The experience must not require a live call to complete.

### Personal date and timezone details

No birthday date, birth time, birth location, or time-zone-specific content has been supplied in this source file. Do not invent these values or make the cosmic timeline imply an exact birth-second value unless the owner supplies it.

## Mapping requirements

The planning agent must map the exact supplied source copy into the canonical experience order:

- Opening: `heroOpening`.
- Act II: memory-gallery slots are pending owner content; do not invent.
- Act III: `steamyMirrorNotes`.
- Act IV: `vinylTracks` and `constellationNodes`.
- Act V: `scratchCards`.
- Act VI: `heartbeatWhispers`.
- Act VII: `birthdayLetter`.
- After-credits: `vipCoupons`.

The original content remains authoritative even if the implementation reorganizes its visual placement. Preserve the source text exactly.
