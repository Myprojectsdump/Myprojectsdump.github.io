# 09 — PERFORMANCE, ACCESSIBILITY & PRIVACY SPECIFICATION

**Document ID:** `DOC-09`  
**Covers Requirements:** `REQ-QPA-01` through `REQ-QPA-04`, `REQ-VIS-01`, `REQ-INT-04`

---

## 1. Performance Engineering & Measurable Budgets (`REQ-QPA-01`)

> **Important Distinction:** All numbers below are **engineering budgets and acceptance targets** for the implementation phase. Zero performance claims may be reported as "verified" until measured via Playwright / Chrome DevTools Lighthouse & Performance traces in Phase J.

### 1.1 Measurable Desktop Performance Budgets
| Metric | Target Budget (Desktop `1440×900`) | Minimum Acceptable (`1366×768` Integrated GPU) | Enforcement Mechanism |
| :--- | :--- | :--- | :--- |
| **Initial Critical Bundle (HTML + CSS + Opening UI Shell)** | `≤ 95 KB` gzipped | `≤ 130 KB` gzipped | Dynamic `import()` splits `PersistentStage` (Three.js/R3F) & late acts (`Act4`..`AfterCredits`) |
| **Deferred WebGL Engine Chunk (`three` + `r3f` + `gsap`)** | `≤ 260 KB` gzipped | `≤ 310 KB` gzipped | Tree-shaken Three imports; streamed in background during the `4.2s` Opening prelude |
| **First Contentful Paint (Opening Void & Prelude)** | `≤ 0.8s` | `≤ 1.3s` | Inline `#040407` critical CSS; zero blocking media requests prior to `ENTER MY UNIVERSE` |
| **Personal Media Downloaded Before Entry Click** | **`0 KB` (Strict Zero)** | **`0 KB` (Strict Zero)** | `preload="none"` on audio; Chapter `N+1` lazy prefetch triggered only after entering universe |
| **Steady-State Frame Rate (Active 3D Stage)** | `60 FPS` (`≤ 16.6ms` p95 frame) | `≥ 45 FPS` (`≤ 22.2ms` p95 frame) | Adaptive DPR monitor steps `dpr` from `1.75 → 1.25 → 1.0` if 45-frame avg `> 21ms` |
| **Interaction to Next Paint (INP — UI & Drawers)** | `≤ 80ms` | `≤ 140ms` | Zero React `setState` on `pointermove`/`scroll`; native `<dialog>` & `popover` top-layer UI |
| **WebGL Draw Calls & Active Triangles** | `≤ 40` draw calls / `≤ 75k` tris | `≤ 50` draw calls / `≤ 85k` tris | Mandatory `InstancedMesh` for shards (`12`), fireflies (`60`), sky lanterns (`10`), steam & dust |
| **GPU Texture & Buffer Footprint** | `≤ 48 MB` VRAM | `≤ 64 MB` VRAM | Singleton `luxuryMaterials.ts` + explicit `AssetDisposal.ts` on retired chapter textures |

### 1.2 Progressive Asset Loading & Off-Screen Hibernation
1. **Chapter-Windowed Media Prefetch:** Only assets belonging to `currentChapter` and `currentChapter + 1` are prefetched (`fetchPriority="low"` for `N+1`). Act VII's letter recording and Finale gift image are never fetched during Act I.
2. **Off-Screen DOM & Canvas Hibernation:**
   - Below-the-fold heavy DOM containers (e.g., After-Credits 6-card 3D-flip VIP Vault and unmounted 2D Canvas wrappers) declare:
     ```css
     .deferred-stage-block {
       content-visibility: auto;
       contain-intrinsic-size: auto none auto 900px;
     }
     ```
   - Attach a direct `contentvisibilityautostatechange` listener on each container (`{ capture: true }` if delegated, because the event does not bubble reliably) to pause tilt/shimmer `requestAnimationFrame` loops whenever `event.skipped === true`, paired with an `IntersectionObserver({ rootMargin: '200px' })` fallback when `'contentVisibility' in document.documentElement.style` is false.
3. **Inactive Sequence Culling:** Inside `<PersistentStage>`, `Sequence1GravityEngine`, `Sequence2AnatomyOfUs`, and `Sequence3ImpossibleGift` set `visible={false}` and skip `useFrame` matrix updates whenever the user is outside their active act range (+ transition overlap buffer).
4. **Tab Background Suspension:** When `document.visibilityState === 'hidden'`, R3F switches `frameloop="demand"`, 2D canvases cancel pending `requestAnimationFrame` IDs, and `AudioEngine` ramps down and suspends `AudioContext`.

---

## 2. Browser Compatibility & Graceful Non-WebGL Fallback (`REQ-QPA-02`)

### 2.1 Supported Desktop Browser Matrix
- **Primary Verified Targets:** Chrome `122+` (Windows/macOS), Edge `122+` (Windows), Safari `17.4+` (macOS MacBook Air/Pro), Firefox `124+` (Windows/macOS).
- **Modern HTML/CSS Progressive Fallbacks:**
  - `<dialog closedby="any">`: Native `Esc` everywhere + `14`-line bounding-box `pointerdown`/`pointerup` light-dismiss listener where `'closedBy' in HTMLDialogElement.prototype` is absent (Safari).
  - `[popover]`: Feature-detected `if (!('popover' in HTMLElement.prototype)) import('@oddbird/popover-polyfill')` + `[popover]:is(:popover-open, .\:popover-open)` selector rule.
  - `text-wrap: balance` & `text-wrap: pretty`: Pure progressive enhancement; gracefully falls back to standard greedy wrapping with zero layout breakage.

### 2.2 Non-WebGL Luxury Fallback (`src/components/fallback/WebGLFallbackStage.tsx`)
If `WebGLRenderingContext` / `WebGL2RenderingContext` creation fails (e.g., hardware acceleration disabled in browser settings) or `SceneErrorBoundary` catches an unrecoverable shader fault:
- Displays a discreet, non-alarming notice once (`"Simplified Visual Mode Active"`), and mounts **`WebGLFallbackStage`**—an atmospheric 2.5D layered SVG + CSS 3D-transform + radial-glow stage keyed to `currentChapter`:
  - **Act I:** Layered rotating SVG champagne orbital rings, glowing rose-gold SVG heart, and interactive SVG `YOU ↔ UCI` golden Bezier drag thread.
  - **Act II:** CSS 3D-perspective floating keepsake cards opening the exact same `<dialog>` Memory Inspector.
  - **Act III & Act V Scratch Cards:** **100% full fidelity** (both use HTML5 2D Canvas, completely independent of WebGL!).
  - **Act IV:** CSS-rotated grooved SVG vinyl turntable (with full Web Audio pitch/mode switching) + interactive 8-star SVG spotlight constellation.
  - **Act V Alchemy, Act VI Fingerprints, Act VII Cake/Lantern/Letter & Final Gift Box:** High-craft animated SVG/CSS compositions preserving **every interaction, sound cue, and verbatim line of copy**.

---

## 3. Accessibility Specification (`REQ-QPA-03`)

1. **Contrast & Legibility (WCAG 2.2 AA+):**
   - Primary Warm Parchment `#F5EBDD` over Obsidian Void `#040407` achieves **`17.6 : 1`** contrast (`AAA`).
   - Muted metadata `rgba(245, 235, 221, 0.68)` over `#040407` achieves **`7.4 : 1`** (`AAA` for normal text).
   - Frosted glass cards enforce a dark backing tint (`rgba(14, 12, 22, 0.78)`) so bright 3D champagne rings passing behind text never drop text contrast below `7.0 : 1`.
   - Unfolded Birthday Letter uses `#1A1014` espresso ink over `#F5EBDD` parchment (`14.1 : 1`).
2. **Respect OS Text Scale:** Root font sizes use `rem`-based `clamp()` without `px`-locked line boxes or fixed-height text clipping containers; cards grow naturally with text zoom up to `150%`.
3. **Complete Keyboard & Assistive Technology Access:**
   - Semantic DOM mirrors every 3D interactive affordance (`<button>` pins for all 6 Act II memories, all 8 Act IV-B constellation stars, all 4 Act V vials, Act VI fingerprint hold pad, Act VII candle & wax seal, and Final Gift crimson ribbon).
   - High-visibility `:focus-visible` champagne-ember + rose-gold double halo on every interactive element.
   - `Esc` cleanly dismisses any open `<dialog>` or Discovery Drawer and returns focus to its invoking trigger natively.
4. **Captions & Transcripts for All Voice Content:**
   - `VoicePlayerPill.tsx` renders synchronized, readable text captions by default (`captionsEnabled: true`) for the Opening Voice Note, Memory Voice Notes, Act VI Heartbeat Whispers, and the Birthday Love Letter—ensuring Uci never misses a word whether muted, in a quiet room without headphones, or before voice `.mp3` files are added.
5. **Zero Precision-Timing Barriers & Reduced Motion:**
   - No quick-time events, no disappearing targets, and gentle forgiveness on early release in Act VI (`8.0s` hold) and Act VII (`1.6s` candle blow hold).
   - `prefers-reduced-motion: reduce` (plus manual HUD toggle) eliminates Z-axis camera rushes, continuous particle drift, and screen rumble while keeping 100% of story reveals intact.

---

## 4. Privacy, `localStorage` Transparency & Deployment Protection (`REQ-QPA-04`)

### 4.1 Strict Zero-Telemetry Privacy Guarantee
- **No Analytics or Trackers:** Zero Google Analytics, Meta pixels, Sentry cloud reporting, PostHog, or third-party scripts.
- **Self-Hosted Fonts & Assets:** Bundle WOFF2 subsets (`Cormorant Garamond`, `Plus Jakarta Sans`, `Caveat`) under `public/fonts/` during build so visiting the website makes **zero** outbound requests to `fonts.googleapis.com` or external CDNs (`Content-Security-Policy: default-src 'self'; media-src 'self' blob:; img-src 'self' data: blob:; connect-src 'self';`).

### 4.2 Exact `localStorage` Inventory
Only **one** versioned key (`uci_gravity_v1`) is written to `window.localStorage`:
- `version`: `1`
- `lastChapter` & `visitedChapters`: chapter IDs visited
- `discoveredMemoryIds`, `discoveredMirrorNoteIds`, `discoveredStarIds`, `revealedScratchIds`, `savedScratchIds`: array of item IDs (`"mem-01"`, `"eyes"`, etc.)
- `vinylSide`, `kissCount`, `isAlchemyOverheated`, `heartbeatCompleted`, `isCandleExtinguished`, `isLanternReleased`, `isLetterSealBroken`, `isGiftRibbonUntied`, `isGiftBoxOpened`: boolean/enum progress flags
- `birthdayWishText` & `includeNaughtyWish`: stored **strictly locally in Uci's own browser** so an accidental tab refresh in Act VII doesn't erase her wish; never transmitted anywhere over the network.
- `vipRedemptions`: `{ "vip-01": { redeemed: true, redeemedAtIso: "..." }, ... }`
- `audioPrefs` & `a11yPrefs`: mute, music/sfx volume floats, captions & reduced-motion choice.
- **User Reset Control:** A subtle `Reset Saved Progress & Local Data` control in the settings popover / After-Credits footer calls `localStorage.removeItem('uci_gravity_v1')` and resets the store cleanly.

### 4.3 Mandatory Edge-Level Access Protection for Webpage & Private Media (`OQ-05 RESOLVED`)
> **Strict Architectural Rule (`OQ-05`):** Never rely on unguessable URLs, hidden media filenames, or client-only React password screens (which leave `/media/portraits/*` and `/media/audio/*` directly downloadable via URL). The deployment **must** enforce authentication at the HTTP edge for **both** webpage navigation (`/`, `/index.html`) **and** all direct asset requests (`/media/*`, `/fonts/*`, `/assets/*`).

#### Canonical Private Sharing Architecture: Cloudflare Pages + Edge Session Gate (`functions/_middleware.ts`)
1. **How Every Request Is Protected (`/*` including `/media/*`):**
   - `functions/_middleware.ts` intercepts **every incoming HTTP request** at the Cloudflare edge before static asset serving occurs.
   - It verifies an `HttpOnly; Secure; SameSite=Lax; Path=/` HMAC-SHA256 signed session cookie (`uci_edge_auth`) against two server-only environment secrets (`UCI_SHARED_PASSPHRASE` and `UCI_COOKIE_HMAC_SECRET`, configured in the Cloudflare Pages dashboard and **never** committed to Git).
   - **Unauthenticated Direct Asset Request (`GET /media/portraits/uci-portrait-01.webp` or `/media/audio/voice/01-opening-voice.mp3` without valid cookie):** Immediately rejected at the edge with `401 Unauthorized` (`Cache-Control: no-store`)—zero bytes of personal media are ever served.
   - **Unauthenticated Webpage Request (`GET /` without valid cookie):** Returns `401 Unauthorized` with a minimal, self-contained `#040407` dark-velvet HTML entry form (`"Private Universe for Uci — Enter Our Secret Passphrase"`).
   - **Passphrase Submission (`POST /__auth`):** Verifies the submitted passphrase using Web Crypto constant-time comparison (`crypto.subtle.timingSafeEqual` / HMAC digest match), sets the signed `HttpOnly` cookie (`Max-Age=2592000`, 30 days), and redirects (`303 See Other`) to `/`.
2. **Simplest Reliable Private Sharing Workflow (Creator Steps):**
   1. Deploy repository to **Cloudflare Pages** (free tier, private GitHub repo or `npx wrangler pages deploy dist`).
   2. Set two environment variables in Cloudflare Pages (`UCI_SHARED_PASSPHRASE` = a memorable phrase only you and Uci know, e.g. a private nickname/date; `UCI_COOKIE_HMAC_SECRET` = random 32-byte hex string).
   3. Send Uci the URL and tell her the shared passphrase (or optionally enable **Cloudflare Zero Trust Access One-Time PIN** to Uci's email address as an additional/alternative zero-password layer).
3. **Recipient Access Requirements (What Uci Experiences):**
   1. Uci opens the link on her laptop browser.
   2. She enters the shared passphrase once on the velvet gate screen and clicks `Unlock`.
   3. Her browser receives the `HttpOnly` edge cookie (`30-day` validity): `SCR-00` loads immediately, every `/media/*` photo, voice note, and song streams seamlessly for her, and even if she refreshes or returns days later on her laptop, she stays authenticated without re-typing the passphrase.
4. **Mandatory Search-Crawler & Referrer Hardening (`public/_headers` & `public/robots.txt`):**
   - `public/robots.txt`: `User-agent: *` / `Disallow: /`
   - HTTP Response Headers on all responses:
     - `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`
     - `Cache-Control: private, no-store` on `/media/*` personal assets (prevents shared proxy caching)
     - `Referrer-Policy: no-referrer` (clicking `CALL YOUR BOYFRIEND ❤️` never leaks the private deployment URL in `Referer` headers)
     - `Permissions-Policy: camera=(), geolocation=(), microphone=(self)`
