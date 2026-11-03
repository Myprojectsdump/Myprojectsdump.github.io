# 06 — CONTENT SCHEMA & PERSONAL MEDIA MANIFEST

**Document ID:** `DOC-06`  
**Covers Requirements:** `REQ-MED-01` through `REQ-MED-04`, `REQ-STR-00` through `REQ-STR-09B`  
**Authoritative Copy Source:** `SOURCE_STORY_AND_COPY.md`

---

## 1. Strict Copy Integrity & Presentation Mapping Contract

1. **Zero-Mutation Rule:** Every string inside `SOURCE_STORY_AND_COPY.md` (`STORY_DATA`) must be stored verbatim in `src/config/storyContent.ts`. No typo "fixes", no punctuation edits, no emoji removals, no British/American spelling normalization, and no rewriting of private adult or romantic copy.
2. **Zero-Fabrication Rule:** Because `SOURCE_STORY_AND_COPY.md` explicitly states that Act II shared memories, personal photos, voice recordings, music files, actual birthday gift details, personal dates/timezones, and live call URL are **not yet supplied**, `storyContent.ts` provides strongly typed, clearly labelled owner configuration slots (`populated: false` by default) that render luxury heirloom empty states until edited.
3. **Complete Field-by-Field `STORY_DATA` Mapping & Verification Table:**

| `STORY_DATA` Path | Exact Value / Count in `SOURCE_STORY_AND_COPY.md` | Target Screen ID | Target Component | Resolution & Presentation Rule |
| :--- | :--- | :--- | :--- | :--- |
| `girlfriendName` | `"Uci"` | Global / `SCR-00..09` | `storyContent.ts` | Used in metadata & ARIA labels; never altered. |
| `nicknames[0..2]` | `["pacarku", "cintaku", "sayang"]` | Global / `SCR-00..09` | `storyContent.ts` | Preserved verbatim across all supplied copy. |
| `initials` | `"U ♥ S"` | `SCR-01..09`, `SCR-07C` | `TopBrandBar.tsx`, `Act7MoonlitWish.tsx`, `HeirloomMediaPlaceholder.tsx` | Embossed on Act VII Stage C crimson wax seal, HUD brand bar, and empty-media filigree crests. |
| `heroOpening.eyebrow` | `"13.8 BILLION YEARS IN THE MAKING"` | `SCR-00` (Beat B) | `OpeningPortal.tsx` | Fades in as Beat B eyebrow after the 3-line Beat A long-distance prelude (`OQ-01` resolved). |
| `heroOpening.title` | `"The Gravity of Uci."` | `SCR-00` (Beat B) | `OpeningPortal.tsx` | Rendered verbatim as the `<h1>` hero title with exact casing and period (`OQ-02` resolved). |
| `heroOpening.subtitle` | `"Before you, the universe was just cold static and empty space. Then you arrived—and suddenly every atom in my world knew exactly what it was orbiting."` | `SCR-00` (Beat B) | `OpeningPortal.tsx` | Rendered verbatim beneath `heroOpening.title`. |
| `heroOpening.whisper` | `"Selamat ulang tahun, my gorgeous pacarku. Tonight, every star in this sky belongs to you."` | `SCR-00` (Beat B) | `OpeningPortal.tsx` | Rendered verbatim above `ENTER MY UNIVERSE`. |
| `steamyMirrorNotes[0]` (`id: 1`) | `x: 22, y: 25`, `text: "Stop looking so kissable right now."`, `subtext: "Seriously, how am I supposed to focus?"` | `SCR-03` | `Act3SecretMirror.tsx` + `FogMirrorCanvas.tsx` | Illuminates at `(22%, 25%)` when local fog clearance `≥ 55%`. |
| `steamyMirrorNotes[1]` (`id: 2`) | `x: 72, y: 28`, `text: "Still my favorite view."`, `subtext: "Morning, midnight, messy hair, or dressed to kill."` | `SCR-03` | `Act3SecretMirror.tsx` | Illuminates at `(72%, 28%)` when local fog clearance `≥ 55%`. |
| `steamyMirrorNotes[2]` (`id: 3`) | `x: 28, y: 68`, `text: "Your neck + my lips ="`, `subtext: "My favorite unfinished conversation."` | `SCR-03` | `Act3SecretMirror.tsx` | Illuminates at `(28%, 68%)` when local fog clearance `≥ 55%`. |
| `steamyMirrorNotes[3]` (`id: 4`) | `x: 75, y: 72`, `text: "Come back to bed, cintaku."`, `subtext: "5 more minutes never meant 5 minutes with you."` | `SCR-03` | `Act3SecretMirror.tsx` | Illuminates at `(75%, 72%)` when local fog clearance `≥ 55%`. |
| `steamyMirrorNotes[4]` (`id: 5`) | `x: 50, y: 48`, `text: "100% Mine. ♥"`, `subtext: "Wipe the rest of the glass, baby."` | `SCR-03` | `Act3SecretMirror.tsx` | Illuminates at centre `(50%, 48%)` when local fog clearance `≥ 55%`. |
| `vinylTracks.daylight` | `title: "SIDE A // SUNLIGHT & SWEETHEART"`, `bpm: "92 BPM • Dream Pop Aura"`, `grooveText`, `confessions[0..3]` (4 strings) | `SCR-04A` (Side A) | `Act4TwoSidesOfUs.tsx` + `DualSoulTurntable.tsx` | Active in Side A mode: circular `grooveText` orbits platter; all 4 confessions displayed verbatim. |
| `vinylTracks.afterHours` | `title: "SIDE B // 2:00 AM BEHIND CLOSED DOORS 🔥"`, `bpm: "68 BPM • Heavy Late-Night Tension"`, `grooveText`, `confessions[0..3]` (4 strings) | `SCR-04A` (Side B) | `Act4TwoSidesOfUs.tsx` + `DualSoulTurntable.tsx` | Active in Side B mode: shifts world lighting, audio, circular `grooveText`, and all 4 confessions verbatim. |
| `constellationNodes[0..7]` | 8 nodes (`eyes`, `laugh`, `lips`, `neck`, `bites`, `waist`, `voice`, `heart`) with exact `label`, `category` (`soul`/`spicy`), `x`, `y`, `headline`, `description` | `SCR-04B` | `Act4TwoSidesOfUs.tsx` + `ConstellationAstrolabe.tsx` | Positioned at exact `(x%, y%)`; clicking ignites star, draws golden line, and shows verbatim `label`, `headline`, and `description` in Discovery Drawer. |
| `scratchCards[0..3]` | `scratch-1..4` with exact `foilTitle`, `tag`, `secretTitle`, `secretBody` | `SCR-05B` | `Act5UciFormula.tsx` + `FoilScratchCanvas.tsx` | Embossed `foilTitle` on gold foil; `≥ 45%` scratch dissolves foil to reveal `tag`, `secretTitle`, `secretBody` verbatim + supplementary `OQ-04` redemption badge. |
| `heartbeatWhispers[0..5]` | 6 exact whisper strings | `SCR-06` | `Act6AcrossTheDistance.tsx` | Sequenced across `0.0s → 8.0s` hold (`64 → 128 BPM`); paired with desktop-friendly `"Hold your cursor or finger here (or hold Spacebar)"` UI prompt (`OQ-03` resolved). |
| `birthdayLetter` | `salutation`, `paragraphs[0..3]` (4 paragraphs), `signOff`, `signature` (`"Your Boyfriend ♥"`) | `SCR-07C` | `Act7MoonlitWish.tsx` | Unfolds after cracking the `"U ♥ S"` crimson wax seal; every paragraph and signature rendered 100% verbatim. |
| `vipCoupons[0..5]` | `vip-01..06` with exact `tier`, `code` (`UCI-ROYAL-001`..`UCI-BOSS-006`), `title`, `description` | `SCR-09` | `AfterCreditsVipVault.tsx` | 3 Princess Tier + 3 After-Midnight Tier 3D-flip cards; preserves all fields verbatim + supplementary `OQ-04` remote vs. next-reunion redemption guidance. |

---

## 2. Authoritative TypeScript Content Schema (`src/types/story.types.ts`)

```ts
export type MemoryCategory =
  | 'photograph'
  | 'shared-moment'
  | 'inside-joke'
  | 'music-memory'
  | 'voice-note'
  | 'personal-confession';

export type RedemptionFulfilmentWindow =
  | 'remote-tonight'
  | 'next-reunion-in-person'
  | 'remote-tonight-and-reunion';

export interface RedemptionGuidanceMeta {
  mode: RedemptionFulfilmentWindow;
  badgeLabel: string;              // Supplementary UI pill (never alters STORY_DATA title/description)
  guidanceNote: string;            // Clarifies how Uci can claim tonight remotely vs. at next reunion
}

export interface MemoryItemConfig {
  id: string;                      // 'mem-01' .. 'mem-06'
  populated: boolean;              // Set to true once owner fills real content
  category: MemoryCategory;
  categoryBadge: string;           // e.g. '01 // A Photograph'
  title: string;                   // Owner-supplied memory title (neutral label when populated=false)
  eraOrDateLabel?: string;         // Optional owner-supplied date/era (never fabricated)
  storyBody: string;               // Owner-supplied memory caption/story
  secondaryWhisper?: string;       // Optional secondary reveal line inside modal
  imageAssetKey?: MediaAssetKey;   // Maps into mediaManifest.ts
  audioAssetKey?: MediaAssetKey;   // Optional memory voice note or song snippet
  imageAltText: string;            // Accessible description for screen readers
}

export interface ActualGiftConfig {
  populated: boolean;              // Set to true once owner specifies real gift
  eyebrow: string;                 // Default: 'FOR YOUR HANDS, NOT JUST YOUR SCREEN'
  title: string;                   // Real gift name (neutral royal title until populated)
  description: string;             // Real gift story / description
  imageAssetKey: MediaAssetKey;    // 'gift-hero-photo'
  deliveryOrRedemptionNote?: string; // Tracking / courier / unboxing instruction
  personalNote?: string;           // Optional intimate note paired with gift
}

export interface LiveCallConfig {
  url: string;                     // e.g. 'https://wa.me/...' or FaceTime/Meet link; '' when unconfigured
  fallbackHeadline: string;        // Shown in warm glass dialog when url === ''
  fallbackMessage: string;
}
```

### Supplementary Long-Distance Redemption Mapping (`OQ-04` Resolved)
Stored in `src/config/storyContent.ts → supplementaryRedemptionGuidance` (keyed by `scratch-1..4` and `vip-01..06` so `STORY_DATA` remains 100% untouched):
- **`vip-01` (`UCI-ROYAL-001`):** `mode: 'remote-tonight-and-reunion'`, `badgeLabel: 'Remote Delivery Tonight + Reunion Princess Day'`, `guidanceNote: 'Redeemable right now for favourite food & boba delivered to your door across the distance, plus full passenger-princess & back-rub privileges on our next reunion.'`
- **`vip-02` (`UCI-PEACE-002`):** `mode: 'remote-tonight'`, `badgeLabel: 'Redeemable Remotely Anytime (Call / Text / In-Person)'`, `guidanceNote: 'Play this screenshot anytime on call, text, or in person—argument ends immediately and your forehead kiss is banked.'`
- **`vip-03` (`UCI-NIGHT-003`):** `mode: 'next-reunion-in-person'`, `badgeLabel: 'Next In-Person Reunion (or Shared Playlist Tonight)'`, `guidanceNote: 'Locked in for our first late-night drive together when we reunite (with optional shared listening session tonight).'`
- **`vip-04` (`UCI-HEAT-004`):** `mode: 'next-reunion-in-person'`, `badgeLabel: 'Next In-Person Reunion Priority Pass'`, `guidanceNote: 'Reserved for our first night back in the same room—phones on Do Not Disturb, zero rush.'`
- **`vip-05` (`UCI-CRAVE-005`):** `mode: 'next-reunion-in-person'`, `badgeLabel: 'Next In-Person Reunion Priority Pass'`, `guidanceNote: 'Redeemable the very second you are back in my arms.'`
- **`vip-06` (`UCI-BOSS-006`):** `mode: 'remote-tonight-and-reunion'`, `badgeLabel: 'Redeemable Tonight on Private Call & At Reunion'`, `guidanceNote: 'Valid tonight across the distance on late-night private call, and again in person.'`

### Verbatim Verification Unit Test (`tests/unit/storyContentIntegrity.test.ts`)
Reads `SOURCE_STORY_AND_COPY.md` directly during Vitest runs, extracts the `STORY_DATA` object literal, and asserts strict deep equality (`expect(STORY_CONTENT.sourceData).toEqual(EXTRACTED_SOURCE_STORY_DATA)`) so any accidental character edit fails CI immediately (`AT-01`).

---

## 3. Central Personal Media Manifest (`src/config/mediaManifest.ts`)

All personal media lives under `public/media/` so the owner can drop or replace files **either before building OR post-build** without modifying a single React or Three.js component.

### 3.1 Folder Layout Under `public/media/`
```text
public/media/
├── portraits/
│   ├── uci-portrait-01.webp
│   └── uci-portrait-02.webp
├── memories/
│   ├── shared-photo-01.webp
│   ├── memory-01-photo.webp
│   ├── memory-02-moment.webp
│   ├── memory-03-joke.webp
│   ├── memory-04-music-cover.webp
│   └── memory-06-confession.webp
├── gift/
│   └── actual-birthday-gift.webp
└── audio/
    ├── voice/
    │   ├── 01-opening-voice.mp3
    │   ├── 02-memory-01-voice.mp3
    │   ├── 02-memory-05-voice.mp3
    │   ├── 06-whisper-sequence.mp3
    │   ├── 06-closing-reassurance.mp3
    │   └── 07-birthday-letter-voice.mp3
    ├── music/
    │   ├── 00-cosmic-ambient-loop.mp3
    │   ├── 04-vinyl-side-a-daylight.mp3
    │   ├── 04-vinyl-side-b-afterhours.mp3
    │   └── 07-birthday-music-box.mp3
    └── sfx/
        ├── chime-star-connect.mp3
        ├── mirror-wipe-soft.mp3
        ├── alchemy-cork-pop.mp3
        └── wax-seal-crack.mp3
```

### 3.2 Complete Asset Specification & Fallback Catalog (All 12 Required Categories)

| Manifest Key (`MediaAssetKey`) | Category | Exact Destination Path (`public/...`) | Preferred Format (& Accepted Alt) | Recommended Dimensions / Audio Specs | Elegant Missing-File Fallback Behaviour (Zero Broken Icons) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `uci-portrait-01` | 1. Uci Portraits | `/media/portraits/uci-portrait-01.webp` | `.webp` (or `.jpg`, `.png`, `.avif`) | `1200 × 1500 px` (`4:5`), `≤ 280 KB`, sRGB | Renders luxury obsidian-champagne engraved crest silhouette (`U ♥ S` filigree) inside frame |
| `uci-portrait-02` | 1. Uci Portraits | `/media/portraits/uci-portrait-02.webp` | `.webp` (or `.jpg`, `.png`) | `1200 × 1500 px` (`4:5`), `≤ 280 KB` | Gracefully omitted or displays starry rose-gold monogram medallion |
| `shared-photo-01` | 2. Shared Photographs | `/media/memories/shared-photo-01.webp` | `.webp` (or `.jpg`, `.png`) | `1600 × 1200 px` (`4:3`), `≤ 350 KB` | Displays subtle twin-constellation (`YOU ↔ UCI`) golden star-map artwork |
| `memory-01-photo` | 3. Memory Photographs | `/media/memories/memory-01-photo.webp` | `.webp` (or `.jpg`, `.png`) | `1400 × 1050 px` (`4:3`), `≤ 320 KB` | Displays Polaroid glass frame with shimmering rose-gold starlight bokeh & `"Personal Photo Slot #01"` subtle designer watermark (hidden automatically when `populated: true` or image loads) |
| `memory-02-moment` | 3. Memory Photographs | `/media/memories/memory-02-moment.webp` | `.webp` (or `.jpg`, `.png`) | `1400 × 1050 px`, `≤ 320 KB` | Faceted champagne prism emblem art inside Memory Inspector |
| `memory-03-joke` | 3. Memory Photographs | `/media/memories/memory-03-joke.webp` | `.webp` (or `.jpg`, `.png`) | `1200 × 1200 px` (`1:1`), `≤ 280 KB` | Embossed wax-seal note illustration |
| `memory-04-music-cover`| 3. Memory Photographs | `/media/memories/memory-04-music-cover.webp`| `.webp` (or `.jpg`, `.png`) | `1000 × 1000 px` (`1:1`), `≤ 220 KB` | Animated miniature golden vinyl/cassette locket illustration |
| `memory-06-confession` | 3. Memory Photographs | `/media/memories/memory-06-confession.webp`| `.webp` (or `.jpg`, `.png`) | `1400 × 1050 px`, `≤ 320 KB` | Velvet & champagne calligraphy card composition |
| `voice-opening` | 4. Opening Voice Recording | `/media/audio/voice/01-opening-voice.mp3` | `.mp3` `128–192 kbps` (`44.1 kHz`, `-16 LUFS`) or `.m4a`/`.ogg` | `10s – 25s`, `≤ 600 KB` | Plays gentle warm cosmic harp/chime chord + displays synchronized voice transcript card smoothly |
| `voice-memory-01` | 5. Memory Voice Notes | `/media/audio/voice/02-memory-01-voice.mp3` | `.mp3` `128 kbps` mono/stereo, `-16 LUFS` | `10s – 45s`, `≤ 900 KB` | Hides audio scrubber gracefully (no broken play button); shows written caption cleanly |
| `voice-memory-05` | 5. Memory Voice Notes | `/media/audio/voice/02-memory-05-voice.mp3` | `.mp3` `128 kbps`, `-16 LUFS` | `15s – 60s`, `≤ 1.1 MB` | Renders gentle visual waveform animation paired with written voice-note transcript |
| `music-cosmic-ambient` | 6/11. Cosmic Ambient Bed | `/media/audio/music/00-cosmic-ambient-loop.mp3` | `.mp3` `160 kbps` stereo seamless loop (`-18 LUFS`) | `45s – 90s`, `≤ 1.8 MB` | Synthesizes soft, airy Web Audio warm Major-9th glass pad (filtered & breathy, never harsh drone) |
| `music-vinyl-daylight` | 6. Vinyl Background Music | `/media/audio/music/04-vinyl-side-a-daylight.mp3`| `.mp3` `192 kbps` stereo (`92 BPM`, `-15 LUFS`) | `60s – 180s`, `≤ 3.5 MB` | Procedural 92 BPM Dream-Pop electric-piano/bell arpeggio loop with real turntable pitch-scrub support |
| `music-vinyl-afterhours`| 7. After-Hours Music | `/media/audio/music/04-vinyl-side-b-afterhours.mp3`| `.mp3` `192 kbps` stereo (`68 BPM`, `-15 LUFS`) | `60s – 180s`, `≤ 3.5 MB` | Procedural 68 BPM late-night minor-9th velvet Rhodes + gentle warm pulse |
| `voice-heartbeat-whispers`| 8. Heartbeat Whispers | `/media/audio/voice/06-whisper-sequence.mp3` | `.mp3` `128–160 kbps` (`8.0s` timed track or `06-whisper-01..06.mp3`) | `8s – 12s`, `≤ 350 KB` | Procedural warm low-passed dual-thump heartbeat (`64→128 BPM`) + timed typographic whisper reveals |
| `voice-act6-closing` | 8. Heartbeat Closing Voice | `/media/audio/voice/06-closing-reassurance.mp3` | `.mp3` `128–160 kbps`, `-16 LUFS` | `10s – 30s`, `≤ 650 KB` | Warm harmonic resolution chord + tender visual heart glow |
| `voice-birthday-letter`| 9. Birthday Letter Recording| `/media/audio/voice/07-birthday-letter-voice.mp3`| `.mp3` `128–160 kbps`, `-16 LUFS` | `60s – 150s`, `≤ 2.8 MB` | Displays letter in pure silent-reading editorial mode (hides voice player pill cleanly or shows subtle `"Read at your own pace"` indicator—never a failing play button) |
| `music-birthday-box` | 10. Birthday Music-Box | `/media/audio/music/07-birthday-music-box.mp3` | `.mp3` `160 kbps` stereo (`-16 LUFS`) | `45s – 90s`, `≤ 1.6 MB` | Procedural celesta / music-box plucked-tine synthesis playing a gentle romantic birthday motif |
| `sfx-pack-optional` | 11. Optional SFX (`4` files)| `/media/audio/sfx/*.mp3` | `.mp3` `128 kbps` short one-shots | `0.3s – 1.8s`, `≤ 60 KB` each | Crisp procedural Web Audio Foley (crystal chime, soft breath noise filter, cork pop envelope, wax snap) |
| `gift-hero-photo` | 12. Actual Birthday Gift | `/media/gift/actual-birthday-gift.webp` | `.webp` (or `.jpg`, `.png`, `.mp4` loop) | `1600 × 1200 px` (or `1:1` `1400×1400`), `≤ 400 KB` | Displays bespoke 3D/SVG champagne-and-crimson royal gift crest card (`U ♥ S`) inside the illuminated gift showcase |

---

## 4. Runtime Asset Resolution & Zero-Code-Change Hot-Swapping

`SmartImage.tsx` and `AudioEngine.ts` probe assets via `mediaManifest.ts` using deterministic extension fallback (`.webp` → `.jpg` → `.png` for images; `.mp3` → `.m4a` → `.ogg` for audio, or direct manifest path) with in-memory availability caching:
- **Never Renders Broken `<img>`:** `SmartImage` preloads via `new Image()` (or `<img onError>` state swap prior to paint) and renders `<HeirloomMediaPlaceholder variant={asset.placeholderVariant} />` until `naturalWidth > 0` succeeds.
- **Never Blocks Scene Mount:** Audio probing uses lightweight `HEAD` / lazy `<audio preload="none">` checks when approaching the target chapter (`currentChapter - 1`), silently routing to `ProceduralAudio.ts` if `404` or offline.
