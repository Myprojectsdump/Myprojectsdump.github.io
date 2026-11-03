# 00 — MASTER PRODUCT BRIEF: THE GRAVITY OF UCI

**Document ID:** `DOC-00`  
**Product Name:** `THE GRAVITY OF UCI`  
**Document Status:** Canonical Planning Contract (Pre-Implementation Gate)  
**Target Implementation Agent:** Gemini 3.8 Flash High  
**Architecture & Creative Specification Lead:** Gemini 4 Argon High  

---

## 1. Executive Vision & Product Identity

**THE GRAVITY OF UCI** is a private, desktop-first, interactive cinematic 3D birthday universe created exclusively for **Uci** (lovingly addressed throughout the experience as *pacarku*, *cintaku*, and *sayang*) by her boyfriend across a long-distance international separation.

This product is **not** a digital greeting card, a static photo scrapbook, or a conventional web page. It is an interactive midnight romantic film, a luxury mechanical-cosmic keepsake, and an emotional story controller operated directly by Uci's cursor, scroll wheel, and keyboard.

### 1.1 Recipient & Context Profile
- **Recipient:** Uci (`girlfriendName: "Uci"`, `initials: "U ♥ S"`).
- **Terms of Endearment:** `pacarku`, `cintaku`, `sayang` (used organically in the authoritative copy; never over-inserted synthetically).
- **Relationship Context:** Long-distance relationship across different countries, time zones, and skies. The experience bridges physical absence on her birthday through tactile digital presence, voice whispers, shared playfulness, private romantic chemistry, and a culminating real-world gift reveal.
- **Primary Viewing Context:** Viewed privately by Uci on a laptop or desktop screen, ideally at night with headphones, completely self-contained without requiring her boyfriend to be online simultaneously.

### 1.2 The North-Star Emotional Takeaway
Every visual, mechanical, musical, and interactive decision is subordinate to one final emotional outcome. When Uci reaches the closing screen, she must feel:

> *"He knows me. He remembers our little moments. He loves me, he desires me, he makes me laugh, and even though we're in different countries, he created something extraordinary just for me."*

Whenever decorative technical complexity threatens emotional clarity, pacing, readability, or user comfort, **emotional resonance and tactile responsiveness win**.

---

## 2. Emotional Arc & Pacing Doctrine

The experience deliberately alternates between wonder, tender nostalgia, cheeky teasing, private adult attraction, comedic mischief, aching long-distance intimacy, and celebratory joy:

| Story Phase | Dominant Emotional Register | Intensity Level | Intimacy / Spice Level |
| :--- | :--- | :--- | :--- |
| **Opening — Enter My Universe** | Wonder, curiosity, quiet anticipation | Low → Building | Pure cosmic romance |
| **Act I — Two Countries, One Sky** | Awe, romantic gravity, across-the-sky connection | Medium | Tender romantic |
| **Act II — The Little Things I Keep** | Recognition, nostalgia, warmth, feeling remembered | Medium-Soft | Affectionate & personal |
| **Act III — The Secret Mirror** | Playfulness, flirtation, private teasing | Medium | Flirtatious & cheeky |
| **Act IV-A — The Dual-Soul Vinyl** | Dual chemistry: sunlit sweetness vs. 2:00 AM attraction | Medium-High | User-toggled (Sweet ↔ Spicy) |
| **Act IV-B — Goosebump Constellation** | Intimate adoration, sensory magnetism | High | Balanced (`soul` + `spicy` nodes) |
| **Act V — The Uci Formula** | Laughter, comedic surprise, playful mischief | High (Playful) | Cheeky comedic + spicy truths |
| **Act VI — Even Across the Distance** | Longing, reassurance, deep presence | Deep / Quiet | Deeply intimate & emotional |
| **Act VII — The Moonlit Birthday Wish** | Celebration, tenderness, emotional catharsis | High (Cathartic) | Sacred, celebratory & romantic |
| **Final Gift Reveal** | Awe, excitement, tangible surprise | Climax | Luxury celebratory |
| **After-Credits — VIP Passes & Call** | Ongoing devotion, playful anticipation, connection | Warm Afterglow | Split (`Princess` + `After-Midnight`) |

### 2.1 Consent, Comfort & Mood Agency
- **No Unwanted Pressure:** Private/spicy adult moments (Act III mirror notes, Act IV Side B & spicy constellation nodes, Act V scratch cards, Act VII optional naughty wish checkbox, After-Credits 18+ VIP passes) are framed with warmth, humour, and mutual affection—never crude or overwhelming.
- **Always Skippable & Reversible:** Uci can skip forward, return to a calmer chapter via the discreet Chapter Rail, switch Act IV back to *Side A — Sunlight & Sweetheart* at any time, or mute audio instantaneously.

---

## 3. Non-Negotiable Product & Engineering Requirements

The implementation agent (`Gemini 3.8 Flash High`) must treat every item below as a hard contractual constraint:

1. **Complete Canonical Journey (`REQ-STR-00` to `REQ-STR-09`):** Implement `OPENING → ACT I → ACT II → ACT III → ACT IV → ACT V → ACT VI → ACT VII → FINAL GIFT REVEAL → AFTER-CREDITS` in exact canonical order without omitting or merging acts.
2. **Three Interconnected Three.js Sequences (`REQ-3D-01` to `REQ-3D-05`):**
   - *Sequence 1: The Gravity Engine* (Acts I–II)
   - *Sequence 2: The Anatomy of Us* (Acts III–V)
   - *Sequence 3: The Impossible Gift* (Acts VI–VII & Final Gift Reveal)
   All three sequences run inside one persistent WebGL canvas, sharing materials, visual motifs, and choreographed mechanical/particle handoffs rather than hard screen cuts or pre-rendered videos.
3. **Real Interactive 3D & Reversible Choreography:** Important 3D assemblies have named, independent sub-meshes and meaningful pivot hierarchies so they dismantle with scroll/interaction and deterministically reassemble when scrolling backward.
4. **Desktop-First Precision (`REQ-VIS-01`):** Engineered primarily for laptop and desktop viewports (`1440 × 900` primary design target; fully validated across `1920 × 1080`, `1680 × 1050`, `1366 × 768`, and `1280 × 720`). Mobile/tablet viewports receive a clean, usable secondary adaptation, never dictating desktop layout compromises.
5. **Dedicated Real-Gift Climax (`REQ-STR-09A`):** The actual birthday gift has its own choreographed 3D luxury gift-box assembly, ribbon interaction, lid opening, and configurable gift presentation stage—never reduced to a generic coupon card.
6. **Zero-Dependency on Missing Personal Media (`REQ-MED-01` to `REQ-MED-04`):** The experience must look complete, intentional, and luxury-grade *before* the owner adds personal photographs, voice notes, music tracks, actual gift details, or a live call URL. Missing files must never render broken image icons, unhandled promise rejections, dead audio buttons, or fabricated fake memories.
7. **Verbatim Copy Preservation (`REQ-MED-02`):** Every string supplied in `SOURCE_STORY_AND_COPY.md` (`STORY_DATA`) must appear verbatim—preserving exact spelling, punctuation, capitalization, emojis, percentages, and VIP codes—unless explicitly approved by the owner.
8. **Offline-From-Creator Independence:** The site operates 100% client-side as a static deployment with zero backend server dependency and zero requirement for the boyfriend to be online when Uci opens it.
9. **Zero Permission Gates (`REQ-AUD-01` to `REQ-AUD-04`):** Audio autoplay before user gesture is prohibited. Microphone permission (Act VII candle), audio playback, and haptic vibration (`navigator.vibrate`) are strictly optional enhancements; manual pointer and keyboard interactions are always first-class citizens.
10. **Fail-Safe Story Continuity (`REQ-QPA-02`):** No failed WebGL shader, denied browser permission, missing media asset, or interrupted scroll animation may ever block Uci from reading any story text or completing the experience.

---

## 4. Explicit Scope Boundaries

### 4.1 In Scope
- Persistent single-canvas React Three Fiber / Three.js rendering architecture with procedural luxury mechanical-cosmic assemblies (and optional Draco GLB hook points).
- Interactive HTML5 2D Canvas effects for Act III condensation wiping (`destination-out`) and Act V metallic gold foil scratch cards.
- Selective GSAP `ScrollTrigger` pinning and reversible timeline scrubbing paired with Framer Motion UI transitions.
- Dual-deck Web Audio API / HTML5 Audio sound engine with procedural Web Audio synthesis fallbacks so every scene sounds musical and responsive out of the box even with zero `.mp3`/`.ogg` files present.
- On-demand Web Audio microphone RMS/low-frequency blow analyzer for Act VII Stage A with instant track teardown.
- Central typed `storyContent.ts` and `mediaManifest.ts` configuration layer for drop-in personalization.
- Versioned `localStorage` progress & VIP pass redemption state with explicit replay/reset controls.
- Full keyboard navigation, `prefers-reduced-motion` choreography mode, voice transcript captions, and non-WebGL luxury fallback stage.
- Automated Vitest unit suite + Playwright desktop multi-viewport end-to-end verification suite with milestone screenshot capture.

### 4.2 Explicitly Out of Scope (Prohibited Without Owner Approval)
- **No Fabricated Personal History:** Never invent dates, locations, shared memories, fake couple photos, AI-generated portraits of Uci, or fictional gift items.
- **No Backend / Database / Auth Server:** Do not add Firebase, Supabase, Express, WebSockets, or real-time multiplayer presence servers. (Static hosting access protection options such as Cloudflare Access / Basic Auth / unlisted subpath + client passcode gate are documented in `09_PERFORMANCE_ACCESSIBILITY_PRIVACY.md`.)
- **No Biometric Claims:** Act VI simulates an artistic 64 → 128 BPM heartbeat synchronization; never claim to read real heart rate via camera or hardware sensors.
- **No Analytics / Telemetry / Third-Party Trackers:** Zero Google Analytics, PostHog, Sentry cloud beacons, or external logging of Uci's wishes or interactions.
- **No Heavy Post-Processing Bloat:** Avoid multi-pass Screen-Space Reflections (SSR), heavy Depth-of-Field bokeh passes, or unthrottled bloom shaders that degrade 1366×768 integrated-GPU laptops below budget.

---

## 5. Success Definition for Planning Gate Approval

This planning package is complete and ready for implementation handoff when:
1. All 14 documents (`00` through `13`) exist in `docs/planning/` with concrete schemas, coordinates, mesh hierarchies, state contracts, timelines, and test assertions.
2. Every supplied string in `SOURCE_STORY_AND_COPY.md` is mapped to an exact screen and component without alteration.
3. Every pending personal asset (photos, voice notes, music, gift details, call URL, Act II memory texts) is catalogued with exact file paths, technical specs, and graceful empty-state designs.
4. All architectural trade-offs and copy-mapping nuances are transparently surfaced in `13_ARCHITECTURE_DECISIONS_AND_OPEN_QUESTIONS.md` for owner sign-off prior to writing a single line of application code.
