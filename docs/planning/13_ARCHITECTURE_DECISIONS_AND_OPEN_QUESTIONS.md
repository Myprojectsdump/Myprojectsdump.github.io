# 13 — ARCHITECTURE DECISIONS, RESOLVED QUESTIONS & FINAL AUDIT GATE

**Document ID:** `DOC-13`  
**Status:** All Open Questions Resolved — Final Planning Audit Complete (Awaiting Implementation Approval)

---

## 1. Architecture Decision Records (`ADR-01` – `ADR-09`)

### `ADR-01` — Single Persistent WebGL Canvas vs. Per-Act Unmounting Canvases
- **Decision:** Mount **one** persistent `<Canvas>` (`PersistentStage.tsx`) behind semantic React act overlays, toggling visibility and `useFrame` execution across `Sequence1`, `Sequence2`, and `Sequence3` groups.
- **Justification:** Browser WebGL contexts are capped (`~8–16` max) and take `120–350ms` to initialize shaders. Per-act canvases cause black flashes, shader compilation hitches, `Context Lost` warnings during rapid chapter jumps, and make choreographed cross-act handoffs (crystal shards → memory frames → mirror bezel → turntable → stars → alchemy → gift box) physically impossible.
- **Trade-Off:** Requires disciplined `visible={false}` culling and `AssetDisposal.ts` cleanup for retired procedural textures—fully specified in `DOC-05` and `DOC-09`.

### `ADR-02` — Procedural Precision 3D Geometries First (With Optional GLB Slots)
- **Decision:** Construct all core mechanical-cosmic 3D assemblies (`GravitySphereGroup`, `DualSoulTurntable`, `AlchemyVesselRig`, `TwinFingerprintField`, `MoonlitLakeDiorama`, `LuxuryGiftBoxRig`) from named procedural Three.js sub-meshes (`LatheGeometry`, bevelled `ExtrudeGeometry`, `TubeGeometry`, `TorusGeometry`, `InstancedMesh`) rather than depending on external `.glb` downloads.
- **Justification:** Guarantees zero reliance on unavailable paid 3D assets, exact sub-mesh pivot control for exploded views and reverse scrolling, `< 300 KB` initial 3D payload, and 100% deterministic dismantling/reassembly. Optional `public/media/models/*.glb` override hooks remain available without blocking the experience.

### `ADR-03` — Two-Speed State Architecture (Zustand Milestones + `transientMotionState` 60fps Bus)
- **Decision:** Keep continuous scroll scalars (`0.0 → 1.0`), pointer NDC coordinates, angular velocities, and live hold milliseconds in a plain mutable object (`transientMotionState.ts`), reserving Zustand (`useExperienceStore.ts`) strictly for discrete milestones, drawers, and persisted preferences.
- **Justification:** Prevents `60 Hz` React component tree re-renders during scroll scrubbing, mirror wiping, or turntable scratching, keeping UI Interaction to Next Paint (`INP`) `< 80ms`.

### `ADR-04` — Occupancy-Grid Math Over `ctx.getImageData()` for 2D Canvas Thresholds
- **Decision:** Both Act III (`FogMirrorCanvas`) and Act V (`FoilScratchCanvas`) track cleared percentages via lightweight in-memory boolean grids (`64 × 36` for mirror with 5 sub-region bounding boxes; `32 × 20` per scratch card) updated geometrically along each interpolated pointer stroke segment rather than calling `ctx.getImageData()` on move events.
- **Justification:** `getImageData()` forces a synchronous GPU-to-CPU pipeline stall across retina backing stores (`> 4 MB` per readback at `2x` DPR), causing severe stutter on integrated-GPU laptops. Occupancy-grid math runs in `< 0.05ms` per stroke and is 100% DPR-invariant.

### `ADR-05` — Native Top-Layer `<dialog>` & `popover` Over Body-Scroll-Lock Portals
- **Decision:** Use native `<dialog>` (`.showModal()` + `overscroll-behavior: contain` on `dialog:modal` and `dialog::backdrop`) for blocking modals (`SCR-02M` Memory Inspector, Fallback Call Card) and `<dialog popover="manual">` for non-blocking inspectors (`SCR-04B` Constellation Drawer).
- **Justification:** Traditional React modals toggle `document.body.style.overflow = 'hidden'`, which removes the root scrollbar, shifts `100vw` layouts sideways, and corrupts active GSAP `ScrollTrigger` pin offsets. Native top-layer `<dialog>` avoids all body-scroll mutation while providing native focus return and `Esc` handling.

### `ADR-06` — Selective ScrollTrigger Pinning vs. Global Smooth-Scroll Hijacking
- **Decision:** Reject global wheel-hijacking libraries (`lenis` / `locomotive-scroll` in forced hijack mode); use native browser scroll paired with selective GSAP `ScrollTrigger` pins (`Act I` `220vh` explosion, `Sequence 3` `160vh` gift convergence, and short bridge transitions) plus locked interactive stages with explicit `Continue / Skip Scene` exits.
- **Justification:** Satisfies Part 7 (`"Do not hijack scroll globally. Do not trap the user in a long pinned section without a clear exit"`) and preserves trackpad momentum, keyboard `PageDown`/`Space` predictability, and gesture coexistence.

### `ADR-07` — Envelope-Shaped Procedural Web Audio Fallbacks & Core Bus in Phase B
- **Decision:** Move core `AudioEngine.ts` + `ProceduralAudio.ts` initialization up to **Phase B** (ahead of Acts I–V) and synthesize only finite-envelope musical tones (plucked celesta/music-box, warm Rhodes chords, soft movement-gated breath filter, discrete lub-dub heartbeat impulses) when `.mp3` files are absent.
- **Justification:** Eliminates irritating continuous bass oscillators while ensuring every act works musically out-of-the-box before personal `.mp3` files are supplied.

### `ADR-08` — Refresh Resume Gate for Browser Audio Autoplay Integrity
- **Decision:** Persist `lastChapter` and all discoveries in `localStorage` (`uci_gravity_v1`), while keeping `hasEnteredUniverse` ephemeral so a browser refresh presents an immediate, elegant two-button choice on Opening (`Resume at [Chapter Name]` vs `Start From Beginning`).
- **Justification:** Modern desktop browsers block `AudioContext` on cold page refresh until a click/key gesture occurs. A one-click `Resume at [Chapter]` button simultaneously unlocks Web Audio cleanly and restores Uci directly to her exact act without broken muted states or abrupt mid-pin jumps.

### `ADR-09` — Edge-Level Access Protection Over Client-Side Password Gates
- **Decision:** Enforce authentication at the HTTP CDN edge via `functions/_middleware.ts` (`HttpOnly; Secure; SameSite=Lax` HMAC-signed session cookie + optional Cloudflare Zero Trust Access) gating **both** webpage navigation (`/*`) and direct media requests (`/media/*`).
- **Justification:** Static files in `/public/media/` remain directly downloadable by URL behind any client-only JS lock screen or unguessable-URL scheme. Edge authentication blocks unauthenticated direct asset requests with `401 Unauthorized` before a single byte is served.

---

## 2. Resolved Owner Decisions Register (`OQ-01` – `OQ-05`)

All five architectural and copy-mapping questions have been formally decided by the owner and propagated across `DOC-01`, `DOC-02`, `DOC-03`, `DOC-04`, `DOC-06`, `DOC-08`, `DOC-09`, `DOC-10`, `DOC-11`, and `DOC-12`:

| ID | Topic | Status | Approved Owner Decision & Spec Implementation | Updated Docs |
| :--- | :--- | :--- | :--- | :--- |
| **`OQ-01`** | Opening Copy Dual-Source Reconciliation | **RESOLVED** | Approved the **two-beat continuous cinematic scene** on `SCR-00`. Beat A (`1.8s–4.2s`) presents the 3-line long-distance introduction (*"Somewhere in this enormous universe..."* / *"Different countries. Different time zones. Different skies."* / *"But somehow, my favourite place is still wherever you are."*) over the unbroken emerging starfield and radial heartbeat, dissolving seamlessly into Beat B (`4.2s+`): the exact `STORY_DATA.heroOpening` lockup and `ENTER MY UNIVERSE` CTA. | `DOC-01`, `DOC-02`, `DOC-06`, `DOC-11`, `DOC-12` |
| **`OQ-02`** | Story Title Casing | **RESOLVED** | Preserve the exact string `"The Gravity of Uci."` (Title Case with trailing period) in the `SCR-00` Opening hero `<h1>`. Use uppercase `THE GRAVITY OF UCI` strictly as the subtle `11px` top-left HUD brand mark (`U ♥ S // THE GRAVITY OF UCI`). | `DOC-01`, `DOC-02`, `DOC-03`, `DOC-06`, `DOC-11`, `DOC-12` |
| **`OQ-03`** | Act VI Heartbeat Whispers & Desktop Hold Instructions | **RESOLVED** | Preserve every `STORY_DATA.heartbeatWhispers` string (`[0]` through `[5]`) **100% verbatim**. Provide mouse hold, touch hold, and `Spacebar`/`Enter` hold alternatives. Set the `SCR-06` UI instruction to refer to holding a cursor or finger (`"Hold your cursor or finger here for 8 seconds (or press and hold Spacebar)"`) rather than requiring an actual thumb. | `DOC-01`, `DOC-02`, `DOC-04`, `DOC-06`, `DOC-11`, `DOC-12` |
| **`OQ-04`** | Long-Distance vs. In-Person Redemption Guidance | **RESOLVED** | Preserve all original romantic, naughty, and VIP coupon copy (`steamyMirrorNotes`, `vinylTracks`, `constellationNodes`, `scratchCards`, `birthdayLetter`, `vipCoupons`) **100% verbatim**. Add supplementary `RedemptionGuidanceMeta` badges and notes on `SCR-05B` (Scratch Vault) and `SCR-09` (After-Credits VIP Vault) clearly distinguishing experiences redeemable remotely tonight across the distance from experiences reserved for their next in-person reunion. | `DOC-01`, `DOC-02`, `DOC-06`, `DOC-11`, `DOC-12` |
| **`OQ-05`** | Private Sharing & Direct Media Asset Protection | **RESOLVED** | Protect both webpage navigation (`/*`) and all direct private media requests (`/media/*`) at the CDN edge (`functions/_middleware.ts` verifying an `HttpOnly; Secure; SameSite=Lax` HMAC-signed cookie `uci_edge_auth` against `UCI_SHARED_PASSPHRASE`, plus optional Cloudflare Zero Trust Access). Never rely on unguessable URLs, hidden filenames, or client-only lock screens. Tested by `AT-35`. | `DOC-08`, `DOC-09`, `DOC-10`, `DOC-11`, `DOC-12` |

---

## 3. Master Checklist of Missing Personal Assets (To Be Supplied Later by Owner)

None of the items below block **Phases A through I**—every slot has an intentional luxury fallback specified in `DOC-06`:

1. **Act II Personal Memories (`src/config/storyContent.ts → memories[0..5]`):** 5 to 8 real memory titles, optional dates/eras, and personal captions covering: a photograph, a favourite shared moment, an inside joke, a music memory, a voice note, and a personal confession.
2. **Actual Birthday Gift (`src/config/storyContent.ts → actualGift`):** Real gift title, description, optional delivery/redemption note, personal note, and `/public/media/gift/actual-birthday-gift.webp`.
3. **Live Video/Voice Call Destination (`src/config/storyContent.ts → liveCall.url`):** WhatsApp / FaceTime / Meet / Zoom URL for `CALL YOUR BOYFRIEND ❤️`.
4. **Photographs (`/public/media/portraits/` & `/public/media/memories/`):** `uci-portrait-01.webp`, `shared-photo-01.webp`, and `memory-01..06` images.
5. **Personal Voice Recordings (`/public/media/audio/voice/`):**
   - `01-opening-voice.mp3` (*"Hey, beautiful. I know I'm not there to steal your birthday hug today..."*)
   - `02-memory-01-voice.mp3` & `02-memory-05-voice.mp3` (optional memory voice notes)
   - `06-whisper-sequence.mp3` & `06-closing-reassurance.mp3` (Act VI heartbeat whispers & sincere closing voice)
   - `07-birthday-letter-voice.mp3` (spoken reading of `birthdayLetter`)
6. **Music Tracks (`/public/media/audio/music/`):**
   - `00-cosmic-ambient-loop.mp3`
   - `04-vinyl-side-a-daylight.mp3` (`92 BPM` dream-pop)
   - `04-vinyl-side-b-afterhours.mp3` (`68 BPM` late-night R&B)
   - `07-birthday-music-box.mp3`

---

## 4. Part 16 Self-Critique & Plan Completeness Audit

| # | Audit Question | Audit Finding & How the Plan Guarantees It |
| :--- | :--- | :--- |
| 1 | *Could Gemini 3.8 Flash misunderstand any important interaction?* | **No.** `DOC-02` specifies exact desktop layouts & controls per screen; `DOC-04` defines the pointer/wheel/drag/wipe/scratch arbitration matrix and exact threshold/duration numbers (`45px` mirror brush, `55%` note zone reveal, `45%` scratch dissolve, `8.0s` `64→128 BPM` hold, `1.6s` candle hold, `60` fireflies). |
| 2 | *Could it implement the visual scene while forgetting the emotional objective?* | **No.** `DOC-00` and `DOC-01` bind every stage's lighting, pacing, HUD dimming, and comfort controls directly to Uci's emotional arc and the final emotional takeaway. |
| 3 | *Are any acts missing a transition?* | **No.** Every single transition (`Opening→I`, `I→II`, `II→III`, `III→IV-A`, `IV-A→IV-B`, `IV-B→V`, `V→VI`, `VI→VII`, `VII→Final Gift`, `Final Gift→After-Credits`) has an explicit mechanical, camera, and lighting handoff in `DOC-01` and `DOC-05`. |
| 4 | *Are the three 3D sequences truly connected?* | **Yes.** `DOC-05 §3` specifies exact structural handoffs: Act I crystals → Act II frames → Act III mirror bezel → Act IV turntable horological rings → 8 platter bearings → Act IV-B constellation stars → Act V spindle/alchemy flask & 4 chassis plates → Sequence 3 convergence returning all motifs into the Impossible Gift Box. |
| 5 | *Are any mesh transformations technically unrealistic?* | **No.** Zero fake topology-morph claims: every transformation uses parent-child gimbal pivots, hemisphere/ring translations, opacity/particle bridges, and camera portal traversal through `z = 0`. |
| 6 | *Can every animation be reversed?* | **Yes.** `DOC-04 §2` & `DOC-05 §4` specify deterministic `1.0 → 0.0` reverse scroll reassembly for every pinned timeline plus explicit `Breathe on Glass`, `Re-foil Card`, `Replay Ritual`, `Relight Candle`, `Reseal Envelope`, and `Replay Gift Assembly` controls for stateful rituals. |
| 7 | *Can the entire website work without photographs and music?* | **Yes.** `DOC-06` and `DOC-07` specify `<HeirloomMediaPlaceholder>` `U ♥ S` filigree compositions for all missing images and finite-envelope `ProceduralAudio.ts` synthesis + voice captions for all missing audio files (`AT-08`, `AT-31`). |
| 8 | *Can Uci complete every act without permissions?* | **Yes.** Microphone (`Act VII-A`), audio playback, and haptics are strictly optional enhancements with co-equal visible manual controls (`Hold to Blow Out Candle`, synchronized voice captions, desktop no-op haptics). |
| 9 | *Is the final actual gift a genuine standalone climax?* | **Yes.** `SCR-08` (`FinalGiftReveal.tsx` + `OBJ-10-IMPOSSIBLE-GIFT` 29-sub-mesh assembly, `360°` inspection, crimson ribbon untie, `-112°` lid open, volumetric champagne light spill, and dedicated Actual Gift Showcase) stands on its own full-screen climax stage prior to After-Credits (`AT-22`, `AT-23`). |
| 10 | *Will the whole experience remain beautiful on a laptop?* | **Yes.** Designed specifically around `1440×900` with explicit camera FOV compensation and `600px` vertical safe-band layout budgets verified down to `1366×768` and `1280×720` (`DOC-02`, `DOC-03`, `AT-32`). |
| 11 | *Are any dependencies unnecessary?* | **No.** `DOC-08 §1` rejects bloated audio, postprocessing, Redux, and scroll-hijack libraries, keeping only essential React, TS, Vite, Three/R3F/Drei, GSAP, Framer Motion, Tailwind, and Zustand packages. |
| 12 | *Are there any important implementation decisions still unspecified?* | **No.** All schemas, folder paths, mesh pivots, camera coordinates, state persistence slices, performance budgets, and `OQ-01..05` resolutions are locked in. |
| 13 | *Is the testing plan capable of catching a visually beautiful but non-functional implementation?* | **Yes.** `DOC-11` requires live 3D scene-graph probes (`window.__UCI_TEST_PROBES__`), DPR-independent canvas clearance assertions, permission-denial E2E tests, keyboard-only E2E walkthrough, WebGL-disabled fallback tests, edge auth verification (`AT-35`), and 17 milestone screenshots across desktop viewports. |

---

## 5. Post-Interruption Integrity Verification & Remaining External Risks

### 5.1 Document Integrity Audit
Every generated file (`00_MASTER_PRODUCT_BRIEF.md` through `13_ARCHITECTURE_DECISIONS_AND_OPEN_QUESTIONS.md`) was inspected line-by-line after the earlier stream interruption. Because that interruption occurred during a read of temporary scratch guidance rather than during a file write, **zero planning documents were truncated, corrupted, or left incomplete**.

### 5.2 Remaining External Risks (Cannot Be Resolved Until Personalization / Deployment)
1. **Owner-Supplied Audio Loudness & Timing Variance (`Low-Medium Risk`):** When the real voice recordings (`01-opening-voice.mp3`, `06-whisper-sequence.mp3`, `07-birthday-letter-voice.mp3`) and music tracks (`04-vinyl-side-a/b.mp3`) are recorded/added later in Phase J, large loudness differences could overpower voice whispers. *Mitigation built into spec:* `AudioEngine.ts` includes a master `DynamicsCompressorNode` (`-2 dBFS` ceiling) + automatic `-11 dB` music ducking whenever a voice track plays, and `DOC-06` specifies `-16 LUFS` normalization targets.
2. **Untested Integrated Laptop GPU Driver Quirks on Physical Recipient Hardware (`Low Risk`):** While Playwright verifies Chromium/WebKit across all 5 desktop viewports and `PersistentStage.tsx` auto-scales DPR (`1.75 → 1.0`) when frame times exceed `21ms`, Uci's specific physical laptop browser could have hardware acceleration turned off. *Mitigation built into spec:* `SceneErrorBoundary` + `WebGLFallbackStage.tsx` (`AT-33`) guarantees 100% story and interaction completion even with WebGL completely disabled.
3. **Edge Middleware Environment Secret Configuration at Deployment (`Operational Risk`):** `functions/_middleware.ts` (`OQ-05`) requires `UCI_SHARED_PASSPHRASE` and `UCI_COOKIE_HMAC_SECRET` to be set in the Cloudflare Pages environment settings. *Mitigation built into spec:* If either secret is missing in production, `functions/_middleware.ts` is specified to **fail closed (`503 / 401` locked)** rather than failing open, ensuring personal `/media/*` assets are never accidentally exposed publicly due to a missing environment variable.
