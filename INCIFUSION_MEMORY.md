# Project Memory

## Current Architecture

1. **Frontend Core:**
   - React 18, Vite, TypeScript, Tailwind CSS, GSAP (ScrollTrigger / ScrollDirector), Framer Motion, Lucide icons.
   - Three.js / React Three Fiber / Drei for persistent WebGL canvas layer (`PersistentStage.tsx`).
   - HTML5 2D Canvas with high-DPI scaling for interactive tactile experiences (`FogMirrorCanvas.tsx`, `FoilScratchCanvas.tsx`).

2. **State Management:**
   - Single canonical Zustand store (`useExperienceStore.ts`) tracking global progression, audio settings, chapters, and act-specific state (`isBridgeConnected`, `discoveredMemoryIds`, `discoveredMirrorNoteIds`, `mirrorClearedPercent`, `pouredVialIds`, `temperatureCelsius`, `revealedScratchIds`, `isHoldingFingerprint`, `heartbeatCompleted`, `cakeStage`, `isCandleBlown`, `lanternWish`, `isLanternReleased`, `isLetterOpened`, `vipRedemptions`, `currentChapter`).
   - Transient motion store (`transientMotionState.ts`) for 60fps frame loop variables without triggering React re-renders.

3. **Narrative Spine & Acts:**
   - `OpeningPortal`: Initial cosmos convergence ritual.
   - `Act1TwoCountriesOneSky`: Two countries, one sky romantic sunrise experience. Static golden sunrise background plate with 3D faceted amber diamond heart, 7 champagne gold rings, glass bubble, golden light connection arc between ME (India Gate) and YOU, MY UCI (Pagoda), voice player pill, and navigation to Act II.
   - `Act2LittleThingsIKeep`: Warm keepsake gallery with 6 Polaroid cards, washi tape styling, interactive heirloom modal, voice player pill, and navigation to Act III.
   - `Act3SecretMirror`: Grand antique baroque gold-carved mirror with 100% solid steamy condensation, finger-drawn condensation heart outline, 4 wiping tools (Soft Towel handkerchief, Silk Cloth, Feather, Finger), glowing handwritten personal notes with safe-quadrant margins, lipstick kiss mark, mystery-locked checklist slots that only populate upon mirror exploration, and navigation to Act IV (`STEP THROUGH THE MIRROR →`).
   - `Act4TwoSidesOfUs`: Dual-destination romantic experience:
     - **Destination A (The Dual-Soul Vinyl):** Side A Daylight (warm golden room, 92 BPM Rhodes dream-pop loop, butter yellow label, 4 track cards) and Side B After-Hours (candlelit red velvet room, 68 BPM velvet loop, crimson heart label, 4 track cards), rotating microgroove vinyl disc, animated tonearm needle drop/lift toggle, kiss counter button (`Send a Kiss 💋`) with floating hearts, and deckled parchment confession card.
     - **Destination B (The Goosebump Constellation):** 8-node heart-shaped star constellation (`CONSTELLATION_LAYOUT`) with central starlight cosmic heart silhouette, interactive diamond star buttons with sound synthesis (`playConstellationStarTone`), and heirloom Polaroid detail card with washi tape, audio waveform pill, and `Keep This Close ♡`.
     - Navigation to Act V (`CONTINUE TO ACT V →`).
   - `Act5UciFormula`: Two connected romantic experiences:
     - **5A (The Magical Alchemy Lab):** Fantasy apothecary laboratory with central glowing glass cauldron, starlight heart smoke, core temperature meter with illuminated progress bar (`37°C` -> `999°C`), playful overheated state banner, four antique glass potion vials (`40% Pure Sweetness`, `30% Goddess Radiance`, `20% Clingy Princess`, `10% Bedroom Menace`) with pouring animations and procedural audio synthesis (`playVialPourTone`, `playAlchemyCorkPop`), and `START THE MIX AGAIN` reset action.
     - **5B (The Gold Foil Scratch Vault):** Antique gold display cabinet against burgundy velvet backdrop, 2x2 grid of four large gold foil scratch cards (`FoilScratchCanvas.tsx`) with engraved ribbon bow motifs and laurel hearts, real-time mouse/touch pointer clearing with >= 38% auto-dissolve threshold, accessible one-click reveal buttons, configured story confessions from `STORY_DATA.scratchCards`, fulfillment badges, and `Save Promise ♥` button.
     - Navigation to Act VI (`CONTINUE TO ACT VI · DISTANCE →`).
   - `Act6AcrossTheDistance`: Cinematic 8-second biometric heart touch-and-hold connection ritual. Dual glowing glass orb floating cityscapes (ME in Delhi / YOU, MY UCI in waterfront pagoda) connected by dynamic cardiac glowing pulse waves, circular glowing SVG progress ring, procedural heartbeat audio synthesis, rotating whispers (`STORY_DATA.heartbeatWhispers`), and continuation to Act VII (`ACT_7`).
   - `Act7MoonlitWish`: Three connected finale experiences against authentic moonlit lake plates:
     - **7A (The Birthday Cake):** Multi-tier birthday cake (`min(520px, 44vw)`) seated squarely on the golden cake stand on the wooden table in `act-7-cake-bg.jpg`. Step-by-step interactive assembly (base, vanilla cream, fresh fruits, toppings, velvet ribbon & plaque, glowing candle), interactive candle blow ritual (hold button or microphone), smoke wisps, and confetti.
     - **7B (The Sky Lantern Wish):** Antique deckled wish parchment, secret naughty wish toggle, and sky release animation with lantern ascending towards the full moon amidst 60 fireflies (`act-7-lantern-bg.jpg`).
     - **7C (The Sealed Birthday Letter):** Authentic wax-sealed envelope with broken seal animation, semi-transparent frosted deckled parchment showing table and quill through the text (`act-7-letter-bg.jpg`), personal handwritten letter, and audio voice player pill.
     - Navigation: Bottom persistent navigation bar (`BottomActNav.tsx`) with breadcrumbs and Prev/Next controls, plus top brand switcher.
   - `FinalGiftReveal`: 3D interactive royal birthday gift box assembly and opening reveal (`LuxuryGiftBoxRig.tsx`). Features automatic 7-stage piece-by-piece 3D mechanical construction mirroring the opening heart assembly, accelerated ~11.5s sequence, asymmetric 2-column layout (left column: unobstructed 3D box seated at `[-0.85, -0.28, 0]` atop the golden table platter in `final-gift-reveal.png` with 360° drag inspection pill; right column: dedicated zone for dynamic construction card, untie ritual button, and `CONFIGURED_ACTUAL_GIFT` showcase card). State managed via `isGiftAssembled`, `giftAssemblyNonce`, and `replayGiftAssembly()`.
   - `AfterCreditsVipVault`: Private, luxurious VIP keepsakes lounge matching `after-credits-vault-bg.jpg`. Reusable 3D ticket cards (`VipCouponCard.tsx`) with Sweet / Princess Tier (warm ivory/gold) and After-Midnight / 18+ Spicy Tier (velvet wine/rose-gold), dynamic live claim count, interactive 3D CSS flip, realistic ink stamps (`CLAIMED & REDEEMED`, `CLAIMED FOR TONIGHT / REUNION`), strict consent correction (`"Always mutual. Either of us can say 'not now'."`), Closing Vow with glowing heart and primary `CALL YOUR BOYFRIEND ❤️` action with native `<dialog>` fallback, and test probe `window.__UCI_TEST_PROBES__.vipRedemptionCount`.
   - `FinalLoveLetter`: Grand final destination of the experience ("The Last Little Universe — A Cinematic Love Letter").
     - **Phase A (The Midnight Intro & Real-Time Live Handwriting):** Starts on quiet midnight-navy backdrop (`bg-[#07040C]`) with subtle radial ambient warmth. Sequential story lines written letter-by-letter with glowing amber/gold starlight caret. Concludes with "I Love You, Uci" calligraphic masterpiece achieving 100% aesthetic parity with `final-love-you-title-reference.png`. Utilizes an authentic SVG `<mask id="declarationMask">` handwriting architecture where high-resolution champagne-gold vector typography (`Great Vibes` / `Alex Brush`, font size 108px and 124px with multi-stage incandescent gold bloom and soft dimensional depth) is progressively unveiled letter-by-letter ("I" -> "Love" -> "You," -> "Uci" -> star dot on 'i' -> celestial starlight heart ribbon -> Saturn perspective orbit -> multifaceted crystal diamond heart) by a traveling golden stylus light point emitting real-time stardust canvas sparks and harmonic audio chimes. Concludes with "Today, Tomorrow. Always." and delicate golden winged heart flourish (`── ʚ♡ɞ ──`). Eliminates all crude vector approximations and overlapping text artifacts.
     - **Interactive Controls & Replay:** Immediate progression buttons during writing ("ENTER OUR FINAL UNIVERSE →", "REPLAY WRITING ↺"), grand celebratory completion buttons, and replay triggers in the final reading header and footer.
     - **Phase B (The Moonlit Lake Poetry Sanctuary):** Smooth fade transition into `final-love-letter-bg.png` featuring 3-column layout: left poem navigation rail (4 authentic poems with thematic SVG artwork), center 3D faceted crystal heart with concentric golden gimbal rings seated on the lakeside circular pedestal, and right frosted glass poetry reader with tactile page turn controls. Includes special "A Final Note" view, focus reading mode, and ambient mode.

4. **Visual Direction:**
   - Soft editorial sunrise, warm candlelit vanity, romantic listening room, fantasy apothecary, starlit distance, moonlit lake serenity, and luxury private velvet lounge:
     - Warm ivory (`#FFF9EA` / `#F5E9D5`)
     - Butter yellow (`#F8E6A0`)
     - Champagne gold (`#D9AE50` / `#C99A45` / `#D9B77B`)
     - Soft amber (`#E9B85B`)
     - Warm white (`#FFFDF5`)
     - Pale peach (`#F6D5B5`)
     - Rose potion & rose gold (`#FDA4AF` / `#EF83AC` / `#B98278`)
     - Soft magenta (`#F472B6` / `#C75C9B`)
     - Candlelight amber (`#D98B42`)
     - Deep warm brown (`#56351F` / `#60402C`)
     - Midnight burgundy / wine / velvet crimson (`#260B16` / `#3B1020` / `#711D35` / `#E11D48` / `#9F1239`)

5. **Known Limitations & Decisions:**
   - 3D nested transmission materials cause WebGL buffer refraction conflicts when background alpha is transparent; resolved by utilizing physical clearcoat with specular reflection for the outer glass bubble and flat-shaded crystalline physical material for the faceted diamond heart.
   - Legacy mechanical 3D rigs (`MemoryFramesCluster`, `MechanicalMirrorRig`, `DualSoulTurntable`, `ConstellationAstrolabe`, `AlchemyVesselRig`) have been bypassed (`return null`) to prevent dark gear/aperture rings and box clusters from occluding the romantic 2D/3D vanity, keepsakes, vinyl, constellation, and alchemy scenes.
   - Clean photographic background plates are mounted at `z-0` beneath global drifting golden petals (`z-[2]`) and main UI (`z-20`). For `AFTER_CREDITS`, golden petals are excluded per creative specification.
   - Refresh persistence: Refreshing the browser preserves the active act in `currentChapter`, while within-act rituals (cake candle, wax seal, sky lantern) reset to their default uncompleted states.
   - Consent correction: Strictly forbidden phrase `"No Refusal Allowed"` is replaced everywhere by `"Always mutual. Either of us can say 'not now'."`.
   - Never use mockup screenshots as website backgrounds; only clean photograph plates.
   - Zero technical or mechanism-oriented vocabulary in user-facing copy.

6. **Next Priorities:**
   - Standby for user feedback or deployment instructions.
