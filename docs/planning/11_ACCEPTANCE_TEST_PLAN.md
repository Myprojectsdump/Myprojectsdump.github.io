# 11 — TESTING STRATEGY & ACCEPTANCE TEST PLAN

**Document ID:** `DOC-11`  
**Covers Requirements:** `REQ-QPA-05`, plus verification of all `REQ-*` items  
**Testing Stack:** Vitest (Unit & Copy Integrity) + Playwright (Real Chromium & WebKit Desktop Multi-Viewport E2E + Visual Screenshots)

---

## 1. Anti-"Cosmetic Pass" Verification Doctrine

A scene is **never** accepted merely because its code compiles or renders a pretty static frame. To catch visually polished yet broken implementations, `PersistentStage.tsx` exposes a lightweight read-only test bridge in `DEV`/`TEST` builds (`window.__UCI_TEST_PROBES__`) reporting live Three.js mesh transforms (`sphereRotationDelta`, `hemisphereSeparationY`, `ringExpansionProgress`, `turntableRpm`, `litConstellationCount`, `flaskFillLevel`, `corkWorldY`, `fingerprintGapDistance`, `candleExtinguishedUniform`, `fireflyActiveCount`, `giftLidHingeAngleDeg`, `activeMicTrackCount`). Playwright asserts **both** DOM state **and** actual 3D/Canvas state mutations!

 Zero `console.error`, zero `pageerror`, and zero unhandled `404` broken `<img>` elements (`img.naturalWidth === 0` never visible) are asserted globally across every Playwright test via a shared test fixture.

---

## 2. Master Acceptance Test Matrix (`AT-01` – `AT-35`)

| Test ID | Feature / Story Stage | Exact Action Executed | Required Pass Assertion (DOM + 3D/Canvas/Audio Probe) | Suite |
| :--- | :--- | :--- | :--- | :--- |
| **`AT-01`** | Verbatim Copy Integrity | Parse `SOURCE_STORY_AND_COPY.md` & compare against `storyContent.ts` | 100% byte-for-byte match across `heroOpening` (exact title `"The Gravity of Uci."`), `steamyMirrorNotes` (5), `vinylTracks` (8 confessions + groove texts), `constellationNodes` (8), `scratchCards` (4), `heartbeatWhispers` (6), `birthdayLetter`, `vipCoupons` (6 + codes). | Vitest |
| **`AT-02`** | Opening Two-Beat Scene & Muted Entry (`OQ-01`, `OQ-02`) | Load `/` without clicking; observe Beat A (`3`-line prelude) → Beat B (`heroOpening`); toggle `Enter Silently (Muted)` & click `ENTER MY UNIVERSE` | Continuous starfield & radial pulse run unbroken across Beat A → Beat B; `<h1>` equals `"The Gravity of Uci."`; zero audio plays before gesture; entry transitions to Act I with `masterGain === 0` and top-left HUD mark `U ♥ S // THE GRAVITY OF UCI`. | Playwright |
| **`AT-03`** | Opening Gesture Sound Unlock | Load `/`, leave `Sound On`, click `ENTER MY UNIVERSE` | `AudioContext.state === 'running'`; camera smoothly transitions `z: 14 → 6.4`; HUD & `ChapterRail` fade in. | Playwright |
| **`AT-04`** | Act I Gravity Sphere Rotation | Pointer-drag `(720, 450) → (880, 390)` on Gravity Engine stage (and `ArrowRight` key) | `probe.sphereRotationDelta > 0.35 rad`; damped inertia continues smoothly after `pointerup` without scrolling page. | Playwright |
| **`AT-05`** | Act I Scroll Disassembly | Scroll down through Act I (`220vh` pinned track) | `GlassShellNorth.y > +1.8`, `GlassShellSouth.y < -1.8`, 7 rings expand radially, `YOU` and `UCI` stars emerge at flanks. | Playwright |
| **`AT-06`** | Act I Reverse Scroll & Star Bridge | Scroll back to top of Act I (`1.0 → 0.0`), then scroll to `0.95` & drag `YOU → UCI` | At `0.0`: `hemisphereSeparationY < 0.05` (fully reassembled). After drag (or `Connect Our Skies` button): golden bridge `uDrawProgress === 1.0`, opening voice transcript visible. | Playwright |
| **`AT-07`** | Act II Memory Sanctuary (6 Categories) | Click each of the 6 floating memory keepsakes (`mem-01..06`) & dismiss via `Esc` and backdrop click | Native `<dialog>` opens in top layer for each category (`photograph`, `shared-moment`, `inside-joke`, `music-memory`, `voice-note`, `personal-confession`), updates `discoveredMemoryIds`, returns focus on `Esc`. | Playwright |
| **`AT-08`** | Missing Personal Media Fallbacks | Run full journey with empty `/public/media/` directory | Zero broken `<img>` icons; `<HeirloomMediaPlaceholder>` renders `U ♥ S` filigree frames; procedural Web Audio fallback plays without uncaught `404` promise rejections; zero fake invented memories shown. | Playwright |
| **`AT-09`** | Act III Mirror Wiping Accuracy | Drag `45px` scaled brush across all 5 `(x%, y%)` coordinates at `1440×900` & `1280×720` | `mirrorClearedPercent` rises accurately; each of the 5 exact `steamyMirrorNotes` illuminates as its bounding region exceeds `55%` clearance. | Vitest + PW |
| **`AT-10`** | Act III `Breathe on Glass` & Portal | Click `Breathe on Glass`; re-wipe or click `Step Through the Mirror` | `Breathe on Glass` smoothly restores fog (`mirrorClearedPercent → 0`); portal transition ripples mirror and flies camera through separating 4-ring bezel into Act IV. | Playwright |
| **`AT-11`** | Act IV-A Tonearm Start/Stop | Click 3D Tonearm (and `Drop / Lift Needle` button) | Tonearm pivots onto vinyl groove (`rotY = -24°`); `turntableRpm` ramps to `33.3`; clicking again lifts arm and stops platter & track. | Playwright |
| **`AT-12`** | Act IV-A Side A ↔ Side B World Switch | Switch toggle from `SIDE A` to `SIDE B` and back | Lighting palette, circular `grooveText`, BPM label (`92 BPM` ↔ `68 BPM`), audio deck crossfade, and all 4 displayed confessions switch completely—not a mere button recolour. | Playwright |
| **`AT-13`** | Act IV-A Vinyl Scratch & Kiss Counter | Tangentially drag spinning platter forward/backward; click `Send Kiss 💋` 3× | `turntableRpm` & Web Audio `playbackRate`/scratch filter respond live to pointer angular velocity; `kissCount === 3` and lipstick particles spawn. | Playwright |
| **`AT-14`** | Act IV-B All 8 Constellation Nodes | Move cursor spotlight & click all 8 stars (`eyes`..`heart`) | Each star permanently ignites, opens non-blocking Discovery Drawer with exact headline/description, draws golden connecting tubes, and triggers `8/8` Constellation Burst. | Playwright |
| **`AT-15`** | Act V All 4 Potion Ingredients | Click all 4 ingredient vials (`40%`, `30%`, `20%`, `10%`) | Each vial tips & pours, `flaskFillLevel` increments (`0.45 → 0.75 → 0.95 → 1.0`), room lighting shifts hue, thermal gauge climbs from `37°C`. | Playwright |
| **`AT-16`** | Act V Comedic 999°C Overheat | Pour the 4th ingredient | Flask boils, cork launches (`corkWorldY > 5.0`), gauge snaps to `999°C`, vessel glows crimson, exact banner `"DANGER: TOO HOT TO HANDLE. BOYFRIEND WILLPOWER COMPROMISED."` appears. | Playwright |
| **`AT-17`** | Act V All 4 Gold Scratch Cards (`OQ-04`) | Scratch across each of the 4 cards until `≥ 45%` cleared; test `Re-foil` & `Keep ♥` | Remaining gold foil dissolves automatically past `45%`; all 4 exact `scratchCards` secrets + supplementary remote/reunion badges appear; `Re-foil` restores foil cleanly; `Keep ♥` persists. | Vitest + PW |
| **`AT-18`** | Act VI 8-Second Heartbeat & Replay (`OQ-03`) | Verify cursor/finger/Spacebar UI prompt; release early at `2.0s`; then hold continuously for `8.1s` (mouse, touch & `Space` key); click `Replay Ritual` | UI instruction specifies cursor or finger (+ Spacebar) without requiring a physical thumb; early release shows gentle reassurance; `8.0s` hold steps through all 6 verbatim `heartbeatWhispers`, ramps `64 → 128 BPM`, closes `fingerprintGapDistance → 0`, fuses Golden-Rose Heart, and replays cleanly. | Playwright |
| **`AT-19`** | Act VII-A Candle Without Mic Permission | Deny `microphone` permission in browser context; hold `Hold to Blow Out Candle` (`1.6s`) | Zero error crash; mic denial shows calm inline fallback; manual hold bends 3D flame (`uWindBend`) and extinguishes candle cleanly. *(Plus synthetic audio-stream test asserting `activeMicTrackCount === 0` `<100ms` after mic blow!)* | Playwright |
| **`AT-20`** | Act VII-B 60 Fireflies & Sky Lantern | Extinguish candle → type wish → tick naughty wish checkbox → click `RELEASE INTO THE NIGHT SKY` | `fireflyActiveCount === 60`; music-box melody starts (if unmuted); checkbox adds crimson-ember core glow; lantern ascends (`y > 6.0`) alongside background horizon lanterns. | Playwright |
| **`AT-21`** | Act VII-C `U ♥ S` Wax Seal & Love Letter | Click/hold `U ♥ S` crimson wax seal on envelope | Seal cracks with particle burst; letter unfolds displaying exact `salutation`, all 4 `paragraphs`, `signOff`, and `signature` without forced voice autoplay. | Playwright |
| **`AT-22`** | Sequence 3 Final 3D Gift Assembly | Advance from Act VII into `FINAL GIFT REVEAL` & scrub convergence | Orbital rings, vinyl base medallion, 8 star inlays, heart gem, twin fingerprint clasp, and crimson ribbon converge into rotatable luxury gift box (`360°` orbit verified). | Playwright |
| **`AT-23`** | Gift Unboxing & Configurable Gift Stage | Click/drag Crimson Silk Bow (`Untie Crimson Ribbon & Open`) | Bow unties, fingerprint clasp opens, lid hinges to `-112°`, golden interior light blooms, and dedicated configurable Actual Gift Showcase presents cleanly. | Playwright |
| **`AT-24`** | After-Credits 6 VIP Passes & Redemption Guidance (`OQ-04`) | Flip all 6 VIP cards (`vip-01..06`), verify verbatim copy + remote vs. reunion guidance, redeem `vip-01` & `vip-04`, reload page | 3D flip reveals exact `tier`, `title`, `description`, `code` (`UCI-ROYAL-001`..`UCI-BOSS-006`) + supplementary remote/reunion guidance pill; claimed status & ISO timestamp survive `page.reload()`. | Playwright |
| **`AT-25`** | Configurable Call CTA & Fallback | Click `CALL YOUR BOYFRIEND ❤️` with empty `url: ""` and with `url: "https://..."` | When empty: opens warm glass call message modal (never dead/disabled button). When configured: opens exact target URL with `rel="noopener noreferrer"`. | Playwright |
| **`AT-26`** | Chapter Navigation Non-Destructive Jump | Visit Acts I–V, jump back to Act II via `ChapterRail`, then return to Act V | `discoveredStarIds`, `revealedScratchIds`, and `kissCount` remain 100% intact; camera, lighting, and 3D sequence switch cleanly without overlap. | Playwright |
| **`AT-27`** | Backward Scrolling Integrity | Scroll downward Acts I → IV, then scroll upward Acts IV → I | Supported 3D transformations reverse smoothly; no stuck `ScrollTrigger` pins, blank canvases, or NaN matrix errors. | Playwright |
| **`AT-28`** | Browser Refresh Resilience | Refresh browser mid-journey (`Act IV` & `After-Credits`) | Opening offers clean one-click `Resume at [Chapter]` (re-acquiring gesture audio unlock) with all persisted discoveries and VIP timestamps intact. | Playwright |
| **`AT-29`** | Complete Keyboard-Only Walkthrough | Navigate Opening → After-Credits using only `Tab`, `Shift+Tab`, `Enter`, `Space`, `ArrowKeys`, `Esc` | Every act's core ritual completes without touching a mouse; `:focus-visible` ring clearly visible on every focused control; `Esc` closes modals/drawers. | Playwright |
| **`AT-30`** | Reduced-Motion Mode | Enable `prefers-reduced-motion: reduce` (OS media query & HUD toggle) | Flying camera rushes, particle turbulence, and screen rumble are suppressed; all 10 stages and reveal interactions remain 100% functional. | Playwright |
| **`AT-31`** | Sound-Muted / Missing-Audio Journey | Mute master sound & block `*.mp3` network requests; complete Opening → Finale | Zero blocked interactions; all voice moments display readable text captions/transcripts; independent Music/SFX sliders respond cleanly. | Playwright |
| **`AT-32`** | 5-Viewport Desktop Layout Matrix | Run automated layout & hitbox overlap audit at `1920×1080`, `1680×1050`, `1440×900`, `1366×768`, `1280×720` | Primary CTAs, 3D focal targets, 4 scratch cards, letter paragraphs, and 6 VIP cards fit within viewport without horizontal overflow or overlapping interactive bounding boxes. | Playwright |
| **`AT-33`** | Non-WebGL Graceful Fallback | Launch Chromium with `--disable-webgl --disable-webgl2` | `<WebGLFallbackStage>` activates automatically without crash; 100% of acts, 2D canvases, audio, letter, gift reveal, and VIP passes complete cleanly. | Playwright |
| **`AT-34`** | Drop-In Personal Media Hot-Swap | Place sample test `.webp` & `.mp3` into `public/media/` without editing `src/acts/*` | `SmartImage` and `AudioEngine` automatically render the real image and play the real audio file over procedural fallback. | Playwright |
| **`AT-35`** | Edge Webpage & Direct Media Access Protection (`OQ-05`) | Request `GET /` and `GET /media/portraits/uci-portrait-01.webp` without `uci_edge_auth` cookie; then `POST /__auth` with valid passphrase and re-request | Unauthenticated webpage and direct `/media/*` requests both return `401 Unauthorized` (`Cache-Control: no-store`); valid passphrase sets `HttpOnly; Secure; SameSite=Lax` signed cookie and serves `200 OK`. | Vitest + PW |

---

## 3. Mandatory Milestone Screenshot Artifact List

Before Phase J can be declared complete, Playwright must capture and store visual verification screenshots (`test-results/milestones/<viewport>/`) across at minimum `1440×900` (primary) and `1280×720` (minimum desktop):
1. `00-opening-hero-lockup.png`
2. `01a-gravity-engine-assembled.png`
3. `01b-gravity-engine-exploded-sky-bridge.png`
4. `02-memory-sanctuary-and-dialog.png`
5. `03-secret-mirror-wiped-notes.png`
6. `04a-vinyl-side-a-daylight.png`
7. `04b-vinyl-side-b-afterhours.png`
8. `04c-goosebump-constellation-complete.png`
9. `05a-alchemy-999c-overheat.png`
10. `05b-gold-scratch-vault-revealed.png`
11. `06-twin-fingerprints-silk-bridge.png`
12. `07a-moonlit-cake-candle.png`
13. `07b-fireflies-sky-lantern-release.png`
14. `07c-unfolded-love-letter.png`
15. `08a-impossible-gift-box-assembled.png`
16. `08b-impossible-gift-unboxed-climax.png`
17. `09-after-credits-vip-vault-flipped.png`

---

## 4. Final Launch Gate Criteria

Implementation is **blocked from sign-off** until:
1. `npm run typecheck`, `npm run build`, `npm run test:unit`, and `npm run test:e2e` all exit `0`.
2. All 17 milestone screenshots at `1440×900` and `1280×720` are visually inspected for text overlap, contrast, lighting beauty, and emotional polish.
3. A complete unscripted manual browser walkthrough from `SCR-00` to `SCR-09` passes with `0` console errors and `0` broken media icons.
