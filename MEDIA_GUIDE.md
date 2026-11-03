# THE GRAVITY OF UCI — PERSONAL MEDIA & DROP-IN ASSET GUIDE

This document details exactly how to personalize **THE GRAVITY OF UCI** with your real photographs, voice recordings, shared memories, music, and actual birthday gift details whenever you are ready.

---

## 1. Zero-Pressure Philosophy
- The website is **100% complete, fully functional, and visually breathtaking right now**.
- Until you add your personal media, every single slot renders an intentional **Heirloom Media Placeholder** with the `U ♥ S` champagne filigree crest, warm velvet backdrops, and procedural luxury audio.
- There are **zero broken image icons**, **zero missing asset errors**, and **zero fake fabricated events**.

---

## 2. Directory Structure for Assets

Drop your personal files directly into the corresponding folders inside `public/media/`:

```
public/media/
├── portraits/
│   ├── uci-portrait-01.webp       # Hero portrait of Uci (Opening / Act I / Act II)
│   └── shared-photo-01.webp       # Favorite couple photo
│
├── memories/
│   ├── memory-01-photo.webp       # 01 // A Photograph I Keep
│   ├── memory-02-moment.webp      # 02 // A Shared Moment
│   ├── memory-03-joke.webp        # 03 // Our Inside Joke
│   ├── memory-04-music.webp       # 04 // A Music Memory
│   ├── memory-05-voice.webp       # 05 // A Voice Note I Saved
│   └── memory-06-confession.webp  # 06 // A Private Truth
│
├── gift/
│   └── actual-birthday-gift.webp  # Real birthday gift photo (Act VIII Showcase)
│
├── audio/
│   ├── voice/
│   │   ├── 01-opening-voice.mp3          # Opening voice note ("Hey, beautiful...")
│   │   ├── 02-memory-01-voice.mp3        # Optional keepsake voice note
│   │   ├── 02-memory-05-voice.mp3        # Optional 1:00 AM sleepy voice note
│   │   ├── 06-whisper-sequence.mp3       # Optional whispered heartbeat track
│   │   ├── 06-closing-reassurance.mp3    # Sincere voice note after fingerprint merge
│   │   └── 07-birthday-letter-voice.mp3  # Spoken reading of the birthday letter
│   │
│   └── music/
│       ├── 00-cosmic-ambient-loop.mp3    # Opening cosmic ambient music
│       ├── 04-vinyl-side-a-daylight.mp3  # Side A: 92 BPM dream-pop aura
│       ├── 04-vinyl-side-b-afterhours.mp3# Side B: 68 BPM late-night tension
│       └── 07-birthday-music-box.mp3     # Moonlit wish music-box waltz
│
└── models/
    ├── heart-core.glb                    # (Optional) custom sculpted 3D heart
    └── actual-gift-token.glb             # (Optional) custom 3D gift token
```

*(Supported image formats: `.webp` recommended, `.jpg`, `.png` supported; supported audio: `.mp3`, `.m4a`, `.wav`)*

---

## 3. Configuring Story Text & Slots (`src/config/storyContent.ts`)

Open `src/config/storyContent.ts` in any code editor to customize your story memories, gift, and call button:

### 3.1 Act II: The 6 Memory Keepsakes (`CONFIGURED_MEMORIES`)
For each item (`mem-01` through `mem-06`):
1. Change `populated: false` to `populated: true`.
2. Update `title` (e.g. `"The Coffee Shop in Bandung"`).
3. Update `eraOrDateLabel` (e.g. `"October 14, 2024"`).
4. Update `storyBody` with your real personal memory story.
5. Update `secondaryWhisper` with an intimate quote or inside joke.

### 3.2 Act VIII: Actual Birthday Gift (`CONFIGURED_ACTUAL_GIFT`)
1. Change `populated: false` to `populated: true`.
2. Update `title` with the real gift name (e.g. `"The Celine Triomphe Necklace"`).
3. Update `subtitle` (e.g. `"Gold & Pearl Keepsake for Pacarku"`).
4. Update `description` with why you chose it for her.
5. Update `deliveryOrRedemptionNote` with tracking details or courier status.
6. Update `personalNote` with a private romantic message.

### 3.3 After-Credits: Live Call URL (`CONFIGURED_LIVE_CALL`)
Set `url` to your direct messaging or video call link:
- WhatsApp: `'https://wa.me/YOUR_PHONE_NUMBER'`
- FaceTime: `'facetime:YOUR_APPLE_ID_OR_PHONE'`
- Google Meet / Zoom: `'https://meet.google.com/YOUR_MEET_CODE'`

*(If left as `""`, clicking "CALL YOUR BOYFRIEND ❤️" opens an affectionate in-app card telling her to dial your number.)*

---

## 4. Testing Your Changes Locally
After updating files:
```bash
npm run dev
```
Open `http://localhost:5173` to verify your media loads instantly with zero console warnings.
