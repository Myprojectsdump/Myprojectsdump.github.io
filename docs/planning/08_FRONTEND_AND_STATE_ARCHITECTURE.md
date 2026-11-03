# 08 — FRONTEND, FILE & STATE ARCHITECTURE

**Document ID:** `DOC-08`  
**Covers Requirements:** `REQ-STA-01` through `REQ-STA-03`, `REQ-INT-03`, `REQ-3D-01`, `REQ-MED-01`, `REQ-MED-02`

---

## 1. Technology Stack Evaluation & Justification

Every dependency in `package.json` earns its place through a concrete functional requirement. Unnecessary libraries are rejected:

| Technology | Selected Version Target | Architectural Role & Justification | Why Not Alternatives / What We Avoid |
| :--- | :--- | :--- | :--- |
| **React + TypeScript** | React `^19.0` (or `^18.3`) + TS `~5.7` (strict mode) | Semantic accessible UI layers, `<dialog>`/`popover` story views, strict compile-time enforcement of verbatim `STORY_DATA` and `mediaManifest` schemas. | Avoids untyped JS drift across 10 narrative stages. |
| **Vite** | `^6.0` | Instant HMR, ES-module code splitting for late-act modules, static `/public/media/` pass-through for zero-rebuild asset hot-swapping. | Avoids Next.js/SSR complexity (product is 100% static client-side, zero server needed). |
| **Three.js + `@react-three/fiber`** | `three ^0.172` + `@react-three/fiber ^9.0` (matched to React version) | Declarative scene graph lifecycle paired with zero-overhead `useFrame` imperative 60fps mesh mutations inside one persistent WebGL context. | Avoids imperative spaghetti across 10 acts while keeping per-frame transforms out of React's VDOM reconciler. |
| **`@react-three/drei`** | Matched major | Selectively tree-shaken helpers (`PerspectiveCamera`, `Environment` lightformers, `Float` where appropriate, `useGLTF` optional loader). | **Do NOT** import heavy Drei `<Html>` inside tight particle loops or bloated postprocessing wrappers. |
| **GSAP + `ScrollTrigger`** | `gsap ^3.12` | Deterministic, scrubbable, **100% reversible** scroll pinning and normalized progress timelines (`0.0 → 1.0` & `1.0 → 0.0`). | CSS scroll-driven animations alone cannot coordinate multi-stage pinned 3D camera + mechanical hierarchy handoffs reliably across all desktop browsers yet. |
| **Framer Motion** | `motion` / `framer-motion ^12` | Expressive discrete UI transitions (Act IV confession card swaps, VIP 3D flip spring polish, whisper crossfades). | Strictly barred from animating Three.js objects or fighting GSAP-owned containers. |
| **Tailwind CSS** | `^4.0` (or `^3.4`) + `tokens.css` | Rapid, zero-bloat utility layout for the 5 desktop viewports anchored to CSS custom-property design tokens. | Avoids CSS-in-JS runtime style injection overhead during 60fps WebGL rendering. |
| **Zustand** | `^5.0` | Minimal (`~1.2 KB`), hook- and outside-React (`getState()`/`subscribe()`) state store with clean `persist` middleware slicing. | Avoids Redux boilerplate and React Context whole-tree re-render cascades. |
| **Native Web Audio API & HTML5 2D Canvas** | Browser Native (`0 KB` bundle cost) | Custom dual-deck music crossfader, procedural sound synthesis, mic blow FFT/RMS analyzer, `destination-out` mirror fog, and 45%-threshold scratch foil. | Rejects `howler.js`, `tone.js` (`>150 KB`), and stale scratch-card npm libraries that fail high-DPI scaling. |
| **Vitest + Playwright** | DevDependencies only | Unit tests for verbatim copy & threshold math + real Chromium/WebKit desktop multi-viewport browser tests with milestone screenshots. | Ensures genuine interactive verification rather than superficial code compilation. |

*(Conditional tiny progressive-enhancement polyfill: `@oddbird/popover-polyfill` dynamically `import()`ed **only** if `!("popover" in HTMLElement.prototype)`).*

---

## 2. Complete Project Directory Tree & Single-Responsibility Rules

```text
d:/UCI Bday/
├── docs/planning/                        # All 14 canonical specification documents (00..13)
├── SOURCE_STORY_AND_COPY.md              # Immutable authoritative copy source (verified by unit test)
├── index.html                            # Dark-first (#040407) shell, font preloads, title "The Gravity of Uci."
├── functions/
│   └── _middleware.ts                    # Edge authentication gate protecting BOTH /* routes AND /media/* assets (OQ-05)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── playwright.config.ts
├── public/
│   └── media/                            # Drop-in personal assets folder (portraits, memories, gift, audio, models)
├── src/
│   ├── main.tsx                          # React root mount + conditional feature-detected popover polyfill check
│   ├── App.tsx                           # Top-level orchestrator: PersistentStage + HUD + Canonical Act Spine
│   ├── styles/
│   │   ├── tokens.css                    # Principal colour, typography, glass & spacing CSS custom properties
│   │   └── globals.css                   # Base dark reset, <dialog> scroll containment, focus-visible rings
│   ├── types/
│   │   ├── story.types.ts                # Story, Memory, MirrorNote, Vinyl, Constellation, Scratch, VIP schemas
│   │   ├── media.types.ts                # MediaAssetKey union, manifest descriptor & fallback variant types
│   │   ├── scene.types.ts                # 3D sequence IDs, camera preset types, transient motion bus interface
│   │   └── store.types.ts                # Zustand state slices, actions & persisted storage V1 schema
│   ├── config/
│   │   ├── storyContent.ts               # ONLY file holding STORY_DATA verbatim + owner pending config slots
│   │   ├── mediaManifest.ts              # ONLY file mapping MediaAssetKey -> public/media/* paths & fallbacks
│   │   └── chapters.ts                   # Canonical 10-stage registry (IDs, titles, sequence ownership, rail labels)
│   ├── store/
│   │   ├── useExperienceStore.ts         # Zustand reactive store (story milestones, UI state, persisted slices)
│   │   ├── transientMotionState.ts       # Plain mutable JS object read at 60fps by R3F useFrame & written by GSAP
│   │   └── persistence.ts                # Versioned localStorage ('uci_gravity_v1') hydration, migration & reset
│   ├── engine/
│   │   ├── audio/
│   │   │   ├── AudioEngine.ts            # Gesture-unlocked AudioContext, dual music crossfader, voice ducking
│   │   │   ├── ProceduralAudio.ts        # Gentle envelope-based procedural fallbacks (music-box, Rhodes, pulse, SFX)
│   │   │   ├── MicrophoneAnalyzer.ts     # On-demand Act VII Stage A breath analyzer & guaranteed track.stop()
│   │   │   └── haptics.ts                # Safe navigator.vibrate wrapper with desktop & reduced-motion no-op
│   │   ├── canvas2d/
│   │   │   ├── FogMirrorCanvas.tsx       # High-DPI destination-out condensation wipe, 5-zone alpha tracker, re-fog
│   │   │   └── FoilScratchCanvas.tsx     # Brushed gold foil canvas, 32x20 cell reveal counter, 45% auto-dissolve
│   │   ├── motion/
│   │   │   ├── ScrollDirector.ts         # GSAP ScrollTrigger registration, selective pinning & resize refresh
│   │   │   └── gestureArbitrator.ts      # Pointer capture & scroll/orbit/wipe/scratch mutual-exclusion locks
│   │   └── webgl/
│   │       ├── PersistentStage.tsx       # Single <Canvas>, adaptive DPR monitor, visibility pause, context recovery
│   │       ├── CameraRig.tsx             # Exclusive PerspectiveCamera controller & viewport aspect FOV compensator
│   │       ├── LightingDirector.tsx      # Smooth colour/intensity interpolation across acts & Vinyl Side A/B
│   │       ├── AssetDisposal.ts          # Deterministic geometry/material/texture cleanup registry
│   │       ├── materials/
│   │       │   └── luxuryMaterials.ts    # Singleton physical glass, obsidian, champagne, rose-gold & crimson silk
│   │       ├── sequences/
│   │       │   ├── Sequence1GravityEngine.tsx  # Orchestrates Acts I-II meshes & crystal->frame handoff
│   │       │   ├── Sequence2AnatomyOfUs.tsx    # Orchestrates Acts III-V portal, turntable, stars & alchemy
│   │       │   └── Sequence3ImpossibleGift.tsx # Orchestrates Acts VI-VII & Final Gift Box grand convergence
│   │       └── objects/
│   │           ├── GravitySphereGroup.tsx
│   │           ├── StarBridgeGroup.tsx
│   │           ├── MemoryFramesCluster.tsx
│   │           ├── MechanicalMirrorRig.tsx
│   │           ├── DualSoulTurntable.tsx
│   │           ├── ConstellationAstrolabe.tsx
│   │           ├── AlchemyVesselRig.tsx
│   │           ├── TwinFingerprintField.tsx
│   │           ├── MoonlitLakeDiorama.tsx
│   │           └── LuxuryGiftBoxRig.tsx
│   ├── components/
│   │   ├── hud/
│   │   │   ├── TopBrandBar.tsx           # Minimal 'U ♥ S // THE GRAVITY OF UCI' & current act indicator
│   │   │   ├── ChapterRail.tsx           # Right-edge 10-node chapter indicator & non-destructive jump nav
│   │   │   ├── SoundControlPill.tsx      # Master mute + popover independent Music / SFX sliders + Captions toggle
│   │   │   ├── ComfortControls.tsx       # Skip Scene, Reduced Motion toggle & Replay Current Act
│   │   │   └── InteractionHint.tsx       # Auto-hiding contextual micro-prompt
│   │   ├── media/
│   │   │   ├── SmartImage.tsx            # Manifest key resolver + zero-broken-icon HeirloomMediaPlaceholder
│   │   │   ├── HeirloomMediaPlaceholder.tsx # Bespoke SVG/CSS obsidian-champagne filigree empty-media art
│   │   │   └── VoicePlayerPill.tsx       # Play/pause/replay voice controller + synchronized live transcript caption
│   │   ├── a11y/
│   │   │   ├── SkipAndKeyboardNav.tsx    # Skip-to-act shortcuts & keyboard instructions
│   │   │   └── ReducedMotionProvider.tsx # Syncs OS prefers-reduced-motion + user override into store & GSAP
│   │   └── fallback/
│   │       ├── WebGLFallbackStage.tsx    # Luxury 2.5D CSS/SVG/Canvas visual stage if WebGL is disabled/unsupported
│   │       └── SceneErrorBoundary.tsx    # Catches any 3D subtree fault without ever blocking story DOM
│   └── acts/
│       ├── OpeningPortal.tsx             # SCR-00
│       ├── Act1TwoCountriesOneSky.tsx    # SCR-01
│       ├── Act2LittleThingsIKeep.tsx     # SCR-02 & SCR-02M <dialog>
│       ├── Act3SecretMirror.tsx          # SCR-03
│       ├── Act4TwoSidesOfUs.tsx          # SCR-04A & SCR-04B + Discovery Drawer popover
│       ├── Act5UciFormula.tsx            # SCR-05A & SCR-05B
│       ├── Act6AcrossTheDistance.tsx     # SCR-06
│       ├── Act7MoonlitWish.tsx           # SCR-07A, SCR-07B, SCR-07C
│       ├── FinalGiftReveal.tsx           # SCR-08
│       └── AfterCreditsVipVault.tsx      # SCR-09
└── tests/
    ├── unit/
    │   ├── storyContentIntegrity.test.ts
    │   ├── revealThresholdMath.test.ts
    │   └── storePersistence.test.ts
    └── e2e/
        ├── fullJourneyWalkthrough.spec.ts
        ├── reverseScrollAndNavigation.spec.ts
        ├── permissionsAndMissingMedia.spec.ts
        ├── accessibilityAndKeyboard.spec.ts
        └── viewportsDesktopMatrix.spec.ts
```

### Strict Import-Boundary Rules (Zero Circular Dependencies)
1. `types/*` imports nothing from `src/*`.
2. `config/*` imports only from `types/*`. **No `engine/webgl/*` mesh component may hardcode story strings**; `acts/*` read `storyContent.ts` via typed props/selectors and pass strictly geometric/visual parameters (`count`, `coordinates`, `mode`) to 3D objects.
3. `store/*` imports only from `types/*` and `config/chapters.ts`.
4. `engine/*` imports from `types/*`, `config/mediaManifest.ts`, and `store/*` (`getState()` / `transientMotionState`), never from `acts/*` or `components/*`.

---

## 3. State Management & Persistence Specification (`REQ-STA-01` to `REQ-STA-03`)

### 3.1 Two-Speed State Split (Why `useExperienceStore` Never Re-renders at 60fps)
- **Channel A — `transientMotionState.ts` (Mutable 60fps Non-Reactive Bus):**
  Holds `actScrollProgress: Record<ChapterId, number>`, `globalScrollY`, `pointerNdc: { x: number; y: number }`, `sphereUserEuler`, `vinylAngularVelocity`, `mirrorClearRatioLive`, `heartbeatHoldSecondsLive`, `candleWindLive`, and `giftBoxUserEuler`. Written by GSAP `ScrollTrigger` / pointer listeners and read directly inside R3F `useFrame` with **zero React re-renders**.
- **Channel B — `useExperienceStore.ts` (Reactive Milestone & UI Store):**
  Updates **only** on discrete story milestones, mode switches, drawer opens, card reveals, and user preference toggles.

### 3.2 Complete State Domain & Persistence Matrix

| State Domain | Store Key(s) | Type & Initial Value | Persisted in `localStorage` (`uci_gravity_v1`)? | Refresh & Replay Behaviour |
| :--- | :--- | :--- | :--- | :--- |
| **1. Current & Visited Chapters** | `hasEnteredUniverse`, `currentChapter`, `visitedChapters` | `boolean (false)`, `ChapterId ('OPENING')`, `ChapterId[] (['OPENING'])` | `visitedChapters` & `lastChapter`: **YES** (`hasEnteredUniverse`: **NO** — refresh always shows a quick *"Resume at Act X"* or *"Enter From Beginning"* choice on Opening so browser Web Audio gesture unlock is cleanly re-acquired!) | Refresh never drops her into a broken muted mid-scroll pin without audio unlock; `Resume` jumps smoothly to `lastChapter` on click! |
| **2. Scroll Progress** | `transientMotionState.actScrollProgress` | `Record<ChapterId, number>` (`0..1`) | **NO** (Ephemeral) | Recomputed deterministically from DOM scroll position by `ScrollTrigger.refresh()`. |
| **3. Discovered Memories** | `discoveredMemoryIds`, `activeMemoryModalId` | `string[] ([])`, `string \| null (null)` | `discoveredMemoryIds`: **YES** (`activeMemoryModalId`: **NO**) | Remembered champagne glow across refreshes; modal starts closed on refresh. |
| **4. Mirror Reveal** | `discoveredMirrorNoteIds`, `mirrorClearedPercent`, `mirrorRefogNonce` | `number[] ([])`, `number (0)`, `number (0)` | `discoveredMirrorNoteIds`: **YES** (`mirrorClearedPercent`: **NO** — fresh steam on revisit is fun, while `Step Through` remains unlocked if `5/5` previously found!) | `Breathe on Glass` increments `mirrorRefogNonce` to refill steam while keeping chapter exit unlocked. |
| **5. Vinyl Mode** | `vinylSide` | `'daylight' \| 'afterHours'` (`'daylight'`) | **YES** | Restores her last chosen mood (`Side A` or `Side B`). |
| **6. Vinyl Playback** | `isVinylPlaying`, `vinylConfessionIndex`, `kissCount` | `boolean (false)`, `0..3 (0)`, `number (0)` | `kissCount`: **YES** (`isVinylPlaying`: **NO** — never auto-spins audio without click) | Preserves total kisses sent! |
| **7. Constellation** | `discoveredStarIds`, `activeStarId` | `string[] ([])`, `string \| null (null)` | `discoveredStarIds`: **YES** (`activeStarId`: **NO**) | Ignited stars & golden connecting filaments persist across chapter jumps and refresh. |
| **8. Alchemy Vessels** | `pouredVialIds`, `temperatureCelsius`, `isAlchemyOverheated` | `string[] ([])`, `number (37)`, `boolean (false)` | `isAlchemyOverheated`: **YES** (vials/temp resettable via `Replay Alchemy Mix`) | If already overheated, returning to Act V shows Scratch Vault immediately with a `Replay Formula Mix` button. |
| **9. Scratch Cards** | `revealedScratchIds`, `savedScratchIds` | `string[] ([])`, `string[] ([])` | **YES** (both) | Revealed & kept confessions stay unlocked; `Re-foil Card` removes single ID from `revealedScratchIds` for replay. |
| **10. Heartbeat Hold** | `isHoldingFingerprint` (ephemeral), `heartbeatCompleted` | `boolean (false)`, `boolean (false)` | `heartbeatCompleted`: **YES** | Early release gently resets ephemeral timer; `Replay Ritual` re-runs the 8-second merge anytime. |
| **11. Candle & Lantern** | `isCandleExtinguished`, `isLanternReleased` | `boolean (false)`, `boolean (false)` | **YES** | Allows revisiting Moonlit Lake in post-lantern serenity or clicking `Relight Candle` to replay wish. |
| **12. Birthday Wish** | `birthdayWishText`, `includeNaughtyWish` | `string ('')`, `boolean (false)` | **OPTIONAL / LOCAL-ONLY** (persisted locally so refresh mid-Act VII doesn't lose typed text; cleared instantly by `Clear Local Progress`; never sent over network) | Preserves her typed wish across accidental refresh. |
| **13. Love Letter** | `isLetterSealBroken`, `isLetterVoicePlaying` | `boolean (false)`, `boolean (false)` | `isLetterSealBroken`: **YES** (`isLetterVoicePlaying`: **NO**) | Once wax seal is cracked, returning to Act VII Stage C allows immediate reading + `Reseal Envelope` replay option. |
| **14. Final Gift Reveal**| `isGiftRibbonUntied`, `isGiftBoxOpened` | `boolean (false)`, `boolean (false)` | **YES** | `Replay Gift Unboxing` re-ties crimson silk ribbon and closes lid for repeat awe. |
| **15. VIP Redemptions** | `vipRedemptions` | `Record<VipId, { redeemed: boolean; redeemedAtIso: string \| null }>` | **YES** | Crucial permanence: remembers exact claim timestamp when she comes back days or weeks later! |
| **16. Audio & A11y** | `isMuted`, `musicVolume`, `sfxVolume`, `captionsEnabled`, `reducedMotionChoice` | `boolean (false)`, `0.7`, `0.85`, `true`, `'system' \| 'reduce' \| 'full'` | **YES** | Honours her exact comfort, volume, and motion preferences everywhere. |

---

## 4. Chapter Navigation & Non-Destructive State Guarantees (`REQ-INT-03`)

- **`ChapterRail.tsx` Behaviour:**
  - Displays 10 minimalist nodes (`Opening`, `I`..`VII`, `Gift`, `VIP`).
  - Any chapter already in `visitedChapters` is directly clickable for instant smooth transition.
  - Unvisited future chapters show a subtle lock-dot by default to protect story spoilers, **while** `ComfortControls → Skip Scene` always allows advancing one stage forward without friction if she ever wants to skip an interaction.
  - Jumping backward (e.g., from `Act VI` back to `Act III` or `Act IV`) **never clears** `discoveredMemoryIds`, `discoveredStarIds`, `revealedScratchIds`, `isLetterSealBroken`, or `vipRedemptions`. It updates `currentChapter`, scrolls smoothly to the target stage anchor, refreshes `ScrollTrigger` bounds, crossfades lighting/audio to the target act, and mounts/activates the corresponding 3D sequence group.

---

## 5. Fault Isolation & Error Handling (`SceneErrorBoundary.tsx`)

1. **WebGL Subtree Isolation:** `<PersistentStage>` is wrapped in `<SceneErrorBoundary fallback={<WebGLFallbackStage />}>`. Even if a GPU driver crashes or throws a shader error mid-journey, the React story layer (`acts/*`), `<dialog>` modals, 2D Mirror/Scratch canvases, audio player, Birthday Letter, Actual Gift card, and VIP Passes remain **100% interactive and readable**.
2. **Corrupt `localStorage` Resilience:** `persistence.ts` validates stored JSON against schema version `version: 1` inside a `try/catch`; malformed or quota-exceeded storage silently falls back to clean in-memory defaults without throwing.
