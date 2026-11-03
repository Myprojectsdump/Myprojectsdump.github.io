# 01 — CANONICAL EXPERIENCE SPECIFICATION

**Document ID:** `DOC-01`  
**Covers Requirements:** `REQ-STR-00` through `REQ-STR-09`, `REQ-INT-05`, `REQ-MED-02`  
**Authoritative Copy Source:** `SOURCE_STORY_AND_COPY.md`

---

## 1. Authoritative Sequence Architecture

The experience follows one strict, immutable linear spine with non-destructive backward revisit capability:

```mermaid
flowchart LR
    OP["00. OPENING\nEnter My Universe"] --> A1["01. ACT I\nTwo Countries, One Sky"]
    A1 --> A2["02. ACT II\nThe Little Things I Keep"]
    A2 --> A3["03. ACT III\nThe Secret Mirror"]
    A3 --> A4["04. ACT IV\nThe Two Sides of Us\n(4A Vinyl -> 4B Constellation)"]
    A4 --> A5["05. ACT V\nThe Uci Formula\n(Alchemy -> Scratch Vault)"]
    A5 --> A6["06. ACT VI\nEven Across the Distance"]
    A6 --> A7["07. ACT VII\nThe Moonlit Birthday Wish\n(7A Cake -> 7B Lantern -> 7C Letter)"]
    A7 --> FG["08. FINAL GIFT REVEAL\nThe Impossible Gift"]
    FG --> AC["09. AFTER-CREDITS\nVIP Passes & Call"]
```

### 1.1 Three-Sequence 3D Continuity Spine
Beneath the 10 narrative stages, one persistent WebGL world maintains physical and poetic continuity across **Three Signature Sequences**:
- **Sequence 1 — The Gravity Engine (`OPENING` → `ACT I` → `ACT II`):** Cosmic dust condenses into the assembled glass-and-rose-gold Gravity Engine, explodes into seven orbital chapter rings and twin long-distance stars, then relaxes its crystal fragments into floating memory frames that align into a reflective mirror plane.
- **Sequence 2 — The Anatomy of Us (`ACT III` → `ACT IV` → `ACT V`):** The mirror's metallic bezel separates into layered horological rings as the camera passes *through* the glass into the Dual-Soul Turntable; the platter's concentric rings lift into the eight-star Goosebump Constellation astrolabe, then descend into the central column to form the glass Alchemy Vessel and four metallic foil plates.
- **Sequence 3 — The Impossible Gift (`ACT VI` → `ACT VII` → `FINAL GIFT REVEAL` → `AFTER-CREDITS`):** Twin luminous fingerprint arcs unite into the golden-rose heart core, drift above the moonlit birthday lake, and finally summon back the orbital rings, vinyl base medallion, eight constellation gold inlays, alchemy amber glow, and twin fingerprint clasp to assemble the black-glass and champagne-gold Birthday Gift Box wrapped in crimson silk ribbon.

---

## 2. Stage-by-Stage Narrative & Transition Specification

### STAGE 00 — OPENING: ENTER MY UNIVERSE (`REQ-STR-00`, `OQ-01 RESOLVED`, `OQ-02 RESOLVED`)
- **Emotional Objective:** Establish wonder, stillness, curiosity, and quiet romantic anticipation before the universe expands.
- **Initial State:** `#040407` Obsidian Void pitch-black screen. Zero audio playing. Top HUD and Chapter Rail hidden so nothing competes with the void.
- **Continuous Two-Beat Cinematic Scene (`0.0s – 5.5s` unbroken camera/starfield choreography, skippable via click/key):**
  - The entire opening unfolds as **one continuous cinematic scene** inside the persistent cosmic stage (never two separate screens or a hard page cut):
  1. **0.0s – 1.5s:** Sparse micro-stars (`~180` points) fade in slowly across deep space with subtle parallax drift while a soft rose-gold radial pulse (`0.8 Hz`, visual heartbeat) begins emanating continuously from screen centre.
  2. **1.8s – 4.2s (Beat A — Long-Distance Prelude):** Over the living starfield and continuous radial heartbeat, three delicate prelude lines fade in sequentially and linger softly:
     - *"Somewhere in this enormous universe, two people found each other."*
     - *"Different countries. Different time zones. Different skies."*
     - *"But somehow, my favourite place is still wherever you are."*
  3. **4.2s – 5.5s (Beat B — Hero Lockup Reveal, verbatim `STORY_DATA.heroOpening`):** While the same starfield and radial heartbeat continue uninterrupted, the prelude lines drift gently upward and dissolve into luminous stardust as the authoritative title lockup materializes in the exact same focal plane:
     - **Eyebrow:** `13.8 BILLION YEARS IN THE MAKING`
     - **Title (`<h1>`):** `The Gravity of Uci.` *(exact casing and trailing period preserved verbatim per `OQ-02`; uppercase `THE GRAVITY OF UCI` is reserved exclusively for the subtle `11px` HUD brand mark in Acts I–After-Credits)*
     - **Subtitle:** `Before you, the universe was just cold static and empty space. Then you arrived—and suddenly every atom in my world knew exactly what it was orbiting.`
     - **Whisper:** `Selamat ulang tahun, my gorgeous pacarku. Tonight, every star in this sky belongs to you.`
- **User Gesture Gate & Controls:**
  - Primary CTA button: `ENTER MY UNIVERSE`
  - Secondary sound toggle pill directly beneath CTA: `Sound On (Recommended with Headphones 🎧)` vs `Enter Silently (Muted)` — defaults to Sound On *intent* triggered **only upon clicking** `ENTER MY UNIVERSE` (or explicit mute toggle prior to entry), strictly obeying browser Web Audio user-gesture rules.
- **Transition → Act I:** Clicking `ENTER MY UNIVERSE` unlocks the Web Audio `AudioContext` (if unmuted), triggers a warm sub-harmonic bloom chime, pulls the camera forward along the Z-axis (`z: 14 → z: 6.4`), condenses the starfield into the central **Gravity Engine**, and fades in the minimal HUD (`TopBrandBar` displaying `U ♥ S // THE GRAVITY OF UCI`, `ChapterRail`, `SoundControlPill`).

---

### STAGE 01 — ACT I: TWO COUNTRIES, ONE SKY (`REQ-STR-01`)
- **Emotional Objective:** Wonder, romantic scale, and the poignant beauty of connecting across physical distance.
- **3D Focal Object (Sequence 1A):** **The Gravity Engine**, initially fully assembled at stage centre:
  - Outer refractive glass sphere (`transmission`, subtle fresnel rim).
  - Seven independent champagne- and rose-gold gimballed orbital rings (representing the 7 Acts).
  - Central luminous rose-gold sculpted heart core pulsing gently.
  - Twelve suspended crystal fragments and an instanced cosmic dust halo.
- **Direct Mouse/Keyboard Interaction (Pre- & Mid-Scroll):**
  - Moving or dragging across the stage rotates the Gravity Engine smoothly with damped inertia (keyboard `ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown` when stage focused).
- **Scroll-Driven Exploded View (Pinned Scroll Timeline `progress: 0.0 → 1.0`):**
  - `0.00 – 0.30`: Outer glass shell splits cleanly along its equatorial seam into Northern and Southern hemispheres, gliding outward along `±Y` and tilting `18°`.
  - `0.25 – 0.65`: The seven orbital rings expand radially into distinct concentric tilts; random cosmic dust aligns into coherent Keplerian orbital streams.
  - `0.55 – 0.85`: The luminous rose-gold central heart emerges unobstructed at centre; crystal fragments drift into peripheral parallax orbits.
  - `0.80 – 1.00`: Two brilliant anchor stars emerge on opposite horizontal flanks of the composition (`x: -3.6` left star labelled **`YOU`**, `x: +3.6` right star labelled **`UCI`**).
  - **Reverse Scroll Guarantee:** Scrolling upward from `1.0 → 0.0` smoothly retracts the hemispheres, collapses the seven rings back into their nested gimbal lock, and returns particles to ambient drift.
- **Culminating Ritual — The Golden Sky Bridge:**
  - Uci drags a luminous golden filament from **`YOU`** to **`UCI`** (or presses the accessible keyboard action `Connect Our Skies`).
  - **Upon Connection:**
    1. A catenary golden-rose light arc locks permanently between `YOU` and `UCI`.
    2. The central rose-gold heart emits a warm shockwave pulse; background nebula lighting shifts from `#090B19` Deep Cosmic Navy toward warm rose-amber horizon glow.
    3. The **Opening Personal Voice Recording** triggers via `VoicePlayerPill` (if `/media/audio/voice/01-opening-voice.mp3` exists; whether present or absent, the synchronized caption drawer displays the exact opening voice transcript so zero emotion is lost):
       > *"Hey, beautiful. I know I'm not there to steal your birthday hug today. So I made something. Every little bit of this is yours. Take your time, okay?"*
- **Choreographed Transition → Act II:** As Uci scrolls past the completed bridge (or clicks `Continue to Act II`), the outer glass hemispheres glide beyond camera frustum, the seven orbital rings widen to frame the room perimeter, and the twelve luminous crystal fragments decelerate and flatten into suspended glass-and-champagne **Memory Frames** inside Act II's chamber.

---

### STAGE 02 — ACT II: THE LITTLE THINGS I KEEP (`REQ-STR-02`)
- **Emotional Objective:** Nostalgia, recognition, tenderness, and the intimacy of small remembered details.
- **Environment & 3D Composition (Sequence 1B):** A warm midnight memory sanctuary where **6 configurable floating discovery objects** (expandable 5–8 via `storyContent.ts`) hover at staggered depths in gentle zero-gravity bobbing orbits around subtle dust motes.
- **Six Canonical Discovery Slots (Covering All 6 Required Categories):**
  1. `mem-01` (`category: "photograph"`): Floating Obsidian & Champagne Polaroid Glass Frame.
  2. `mem-02` (`category: "shared-moment"`): Luminous Ticket / Keepsake Prism Plaque.
  3. `mem-03` (`category: "inside-joke"`): Folded Secret Note Capsule with cheeky wax crest.
  4. `mem-04` (`category: "music-memory"`): Miniature Spinning Cassette / Melody Locket.
  5. `mem-05` (`category: "voice-note"`): Rose-Gold Waveform Vial.
  6. `mem-06` (`category: "personal-confession"`): Sealed Velvet Confession Envelope.
- **No-Fabrication Empty-Media Doctrine:** Because `SOURCE_STORY_AND_COPY.md` intentionally omits real shared memories and photos for the owner to add later, each unpopulated slot renders an **intentional, heirloom-grade silhouette composition** (e.g., engraved champagne monogram `U ♥ S`, delicate star-map filigree, and a clearly structured owner-ready card state) rather than fake events or broken `<img>` tags. Once populated in `storyContent.ts` and `/public/media/memories/`, real photos, stories, and voice notes appear automatically with zero component edits.
- **Discovery Interaction:**
  - Hovering/focusing an object illuminates its rim and displays its category tag.
  - Clicking/pressing `Enter` glides the object toward foreground focus and opens an accessible glass inspection modal (`<dialog>`) displaying: title, optional era/date badge, visual/photo frame, owner caption/story, optional `VoicePlayerPill` audio note, and `Close (Esc)` button.
  - Visited objects acquire a warm champagne halo; progress indicator tracks discovered count (no forced lock—she may inspect all 6 or proceed whenever ready).
- **Choreographed Transition → Act III:** Scrolling into the exit zone draws the floating metallic memory frames inward along planar curves; they interlock edge-to-edge into an ornate brushed-champagne **vanity mirror frame**, while warm steam particles billow up across a reflective glass plane to form Act III's fogged mirror.

---

### STAGE 03 — ACT III: THE SECRET MIRROR (`REQ-STR-03`)
- **Emotional Objective:** Playfulness, flirtation, private teasing, and tactile delight.
- **Environment:** An intimate, dimly lit midnight suite/bathroom bathed in `#14050A` Velvet After-Hours warmth, soft amber sconce reflections, and rising micro-steam.
- **Focal Surface:** A large landscape luxury mirror framed by the interlocked metallic bezels from Act II. Behind a realistic multi-layered condensation canvas (`FogMirrorCanvas`) sit warm golden-rose bokeh lights, delicate water droplets, and **5 hidden handwritten messages** rendered in `Caveat` / `Dancing Script` at exact percentage coordinates from `STORY_DATA.steamyMirrorNotes`:
  1. `(x: 22%, y: 25%)` — **"Stop looking so kissable right now."** / *"Seriously, how am I supposed to focus?"*
  2. `(x: 72%, y: 28%)` — **"Still my favorite view."** / *"Morning, midnight, messy hair, or dressed to kill."*
  3. `(x: 28%, y: 68%)` — **"Your neck + my lips ="** / *"My favorite unfinished conversation."*
  4. `(x: 75%, y: 72%)` — **"Come back to bed, cintaku."** / *"5 more minutes never meant 5 minutes with you."*
  5. `(x: 50%, y: 48%)` — **"100% Mine. ♥"** / *"Wipe the rest of the glass, baby."*
- **Wiping & Reveal Mechanics:**
  - Moving cursor while holding primary button (or hovering in effortless-wipe desktop mode / touch-dragging / keyboard `Wipe Next Region` shortcut) clears condensation via HTML5 Canvas `globalCompositeOperation = 'destination-out'` with a soft feathered radial brush (`~45 CSS px` radius scaled by viewport & DPR) plus trailing micro-droplet streaks.
  - Each of the 5 note bounding zones monitors local alpha clearance; when a note's bounding box reaches `≥ 55%` cleared pixels, that handwritten message blooms with a warm rose-gold neon/ink glow and chimes softly.
  - Global cleared surface percentage (`0% – 100%`) and discovered notes counter (`0 / 5`) update cleanly in the corner HUD.
  - **`Breathe on Glass` Control:** Always available; smoothly animates warm breath mist back across the canvas (`1.1s` ease-out opacity refill) so Uci can replay the wiping ritual without losing her unlocked progression ability.
- **Choreographed Transition → Act IV (Sequence 2 Kickoff):** Upon discovering all 5 hidden messages (or activating `Step Through the Mirror` once unlocked), the mirror glass ripples with concentric liquid-mercury waves. Its outer metallic frame unlocks into **four concentric mechanical horological rings**, rotating in opposite directions while the camera glides **straight through the reflective plane** into the dark obsidian housing of the Dual-Soul Turntable.

---

### STAGE 04 — ACT IV: THE TWO SIDES OF US (`REQ-STR-04`, `REQ-STR-05`)
- **Emotional Objective:** Celebrate both sides of their bond—sunlit tenderness and magnetic 2:00 AM attraction.

#### Experience 4A — The Dual-Soul Vinyl (`REQ-STR-04`)
- **3D Focal Object (Sequence 2A):** A bespoke luxury 3D turntable crafted from brushed `#040407` obsidian plinth, champagne-gold mechanical linkages (inherited from the mirror bezel rings), precision gimballed tonearm, micro-grooved vinyl record platter, centre record label, and circular animated SVG/canvas groove text orbiting the platter perimeter.
- **Core Turntable Interactions:**
  - **Tonearm Toggle:** Clicking the tonearm (or `Play / Drop Needle` button) swings the tonearm smoothly onto the outer groove and spins the platter (`33⅓ RPM` visual cadence).
  - **Vinyl Drag & Scratch:** Dragging radially/tangentially on the vinyl platter alters angular velocity in real time and modulates audio playback rate / subtle vinyl-scratch filter via Web Audio API.
  - **Kiss Counter Button (`Send a Kiss 💋`):** Increments a live kiss counter and spawns floating rose-crimson lipstick mark particles rising gently off the turntable.
- **Full World Mode Switch (`SIDE A` ↔ `SIDE B`):**
  - **SIDE A — `SIDE A // SUNLIGHT & SWEETHEART`** (`92 BPM • Dream Pop Aura`)
    - *Visual World:* Warm champagne gold (`#FDE68A`), soft blush rose (`#FDA4AF`), airy morning light rays.
    - *Groove Text:* `MY PACARKU • MY PEACE • THE GIRL WHO SOFTENED MY WHOLE WORLD • CINTAKU FOREVER • `
    - *Audio:* Gentle major-key dream-pop track (or warm procedural Rhodes/pad chord loop fallback).
    - *4 Exact Confessions (`STORY_DATA.vinylTracks.daylight.confessions`):* Displayed as tactile track liner cards synchronized to platter rotation or manual cycling.
  - **SIDE B — `SIDE B // 2:00 AM BEHIND CLOSED DOORS 🔥`** (`68 BPM • Heavy Late-Night Tension`)
    - *Visual World:* Deep velvet crimson (`#14050A` + `#E11D48` rim neon), moody shadow falloff, slow atmospheric ember haze.
    - *Groove Text:* `WARNING: HIGH ADDICTION • HANDS ON YOUR WAIST • BITE MARKS & NECK KISSES • DONT BE SHY CINTAKU • `
    - *Audio:* Slow 68 BPM late-night R&B sub-warmth & atmospheric minor-key texture (crossfaded seamlessly over `800ms`).
    - *4 Exact Confessions (`STORY_DATA.vinylTracks.afterHours.confessions`):* Displayed in velvet-crimson editorial typography.
- **Internal Handoff 4A → 4B:** Activating `Explore Our Constellation` (or scrolling into Stage 4B) lifts the tonearm to rest, decelerates the vinyl platter to a halt, dissolves the black PVC record body into obsidian mist, and elevates the platter's **eight internal brass/rose-gold mechanical bearings** upward into darkness as eight glowing stars.

#### Experience 4B — The Goosebump Constellation (`REQ-STR-05`)
- **Environment (Sequence 2B):** Pitch-black velvet chamber illuminated by a soft, warm silk spotlight following Uci's cursor (`radial-gradient` + 3D point light tracking pointer NDC) over a faint astrolabe ring grid.
- **Eight Star Nodes (`STORY_DATA.constellationNodes` at exact `(x%, y%)` coordinates):**
  1. `eyes` (`soul`, `24, 22`) — `01 // Her Eyes` — *"Where My Willpower Goes to Die"*
  2. `laugh` (`soul`, `68, 18`) — `02 // Her Laugh` — *"My Favorite Frequency on Earth"*
  3. `lips` (`spicy`, `48, 36`) — `03 // Her Lips 🔥` — *"My Personal Addiction"*
  4. `neck` (`spicy`, `76, 48`) — `04 // The Curve of Her Neck 🔥` — *"My Favorite Hiding Spot"*
  5. `bites` (`spicy`, `22, 54`) — `05 // Her Cute Aggression Bites 🔥` — *"Unprovoked Attacks (That I Secretly Love)"*
  6. `waist` (`spicy`, `54, 66`) — `06 // Her Waist in My Hands 🔥` — *"Custom-Built for My Grip"*
  7. `voice` (`soul`, `30, 82`) — `07 // Her 1:00 AM Sleepy Voice` — *"Soft Enough to Melt Steel"*
  8. `heart` (`soul`, `74, 80`) — `08 // Her Fierce, Loving Heart` — *"The Home I Always Wanted"*
- **Interaction & Constellation Burst:**
  - Hovering/focusing near a star within the silk spotlight brightens its corona and reveals its label.
  - Clicking/activating a star permanently ignites it, draws a fine golden constellation filament connecting it to previously discovered stars, triggers an optional subtle haptic pulse (`[18, 24, 18]` ms) on `"spicy"` nodes where supported, and opens the right-hand glass **Discovery Drawer** with its exact headline and description.
  - Discovering all `8 / 8` nodes triggers a golden **Constellation Supernova Burst** completing the full 8-point emblem.
- **Choreographed Transition → Act V:** All eight illuminated stars descend along helical paths into the mechanical centre ring; the turntable's central spindle elongates vertically and blows outward into refractive borosilicate glass, forming Act V's **Alchemy Vessel**, while four perimeter cylinders rise as ingredient vials.

---

### STAGE 05 — ACT V: THE UCI FORMULA (`REQ-STR-06`)
- **Emotional Objective:** Laughter, cheeky surprise, playful mischief, and tactile reward.

#### Stage 5A — The Magical Alchemy Laboratory
- **3D Focal Object (Sequence 2C):** A central luxury glass alchemy flask seated inside champagne-gold calipers, flanked by **four glowing crystal vials** and a live brass-and-glass thermal gauge reading **`37°C`**.
- **Exact Four Ingredients (Pourable in any order; each click tips the 3D vial toward the flask neck, pours a luminous particle/shader stream, raises internal fluid shader height, shifts room point-light hue, and increments temperature):**
  1. **`40% Pure Pacarku Sweetness`** — Blush Rose (`#FDA4AF`) nectar; fluid rises `+40%`; temp rises (`37°C → 52°C`).
  2. **`30% Effortless Goddess Radiance`** — Champagne Ember (`#FDE68A`) liquid gold; fluid rises `+30%`; temp rises (`→ 74°C`).
  3. **`20% Clingy Princess Energy`** — Rose Gold (`#F472B6`) sparkling elixir; fluid rises `+20%`; temp rises (`→ 96°C`, gentle bubbling begins).
  4. **`10% Late-Night Bedroom Menace`** *(or whichever 4th vial is poured last)* — Crimson Lust (`#E11D48`) volatile drop; fluid hits `100%` critical mass!
- **Comedic Overheating Climax:**
  - Upon pouring the 4th ingredient, the flask boils furiously for `0.6s`, launches its champagne-cork stopper upward out of frame with a comedic pop + golden-crimson spark fountain, slams the thermal gauge straight to **`999°C`**, bathes the vessel in pulsing crimson light, and flashes the luxury laboratory alert banner:
    > **`DANGER: TOO HOT TO HANDLE. BOYFRIEND WILLPOWER COMPROMISED.`**

#### Stage 5B — The Gold Foil Scratch Vault (`OQ-04 RESOLVED`)
- Out of the alchemical spark plume, **four brushed-gold metallic scratch cards** (`FoilScratchCanvas`) glide into a 2×2 desktop showcase grid.
- **Interactive Scratch Mechanics:**
  - Each card displays its embossed `foilTitle` across a realistic shimmering metallic gold canvas layer.
  - Scratching with mouse drag or touch (or keyboard `Reveal Card` button) erases foil using tracked grid cells (`32 × 20` cell occupancy grid for exact, fast percentage calculation independent of DPR).
  - At **`≥ 45%` revealed surface**, the remaining gold foil dissolves in a shimmering particle sweep, revealing `tag`, `secretTitle`, and `secretBody` verbatim from `STORY_DATA.scratchCards` (`scratch-1` through `scratch-4`).
  - **Supplementary Long-Distance vs. Reunion Guidance (`OQ-04`):** Without modifying a single character of `STORY_DATA.scratchCards`, each revealed card footer displays a discreet supplementary context pill distinguishing remote vs. next-reunion fulfilment (e.g., `scratch-3`: *"Tonight on Late-Night Call + In-Person Reunion Massage Pass"*; `scratch-1`, `scratch-2`, `scratch-4`: *"Saved for Our Next Reunion & Every Night After"*).
  - Each card supports a `Save / Keep Promise ♥` toggle badge and a `Re-foil Card` replay control.
- **Choreographed Transition → Act VI:** As Uci proceeds from Act V, the alchemy glass dims into quiet darkness while the four metallic card plates fold inward into dark obsidian structural facets stored at the scene base (ready for Sequence 3), leaving a hushed, intimate dark chamber where two luminous fingerprint fields materialize.

---

### STAGE 06 — ACT VI: EVEN ACROSS THE DISTANCE (`REQ-STR-07`, `OQ-03 RESOLVED`)
- **Emotional Objective:** Aching long-distance longing transformed into deep reassurance, stillness, and felt closeness.
- **Environment (Sequence 3A):** A hushed, near-black sanctuary (`#040407`) free of visual clutter. Two intricate, glowing golden-rose **3D ridge-line fingerprint structures** float facing each other horizontally:
  - Left Fingerprint: Boyfriend's presence (steady warm amber-rose pulse).
  - Right Fingerprint (Interactive Target): Uci's target pad. Per `OQ-03`, the UI instruction explicitly invites desktop/multi-modal holding without requiring a physical thumb: **`Hold Your Cursor or Finger Here (or Hold Spacebar)`**.
- **The Eight-Second Presence Ritual (`0.0s → 8.0s`):**
  - While held continuously via Left Mouse Button, Touch, or `Spacebar` / `Enter`:
    1. Circular golden filament progress ring advances smoothly from `0.0s` to `8.0s`.
    2. Uci's fingerprint ridges illuminate from outer edge to core.
    3. A **Golden Silk Bridge** of woven spline particles arcs across the gap as the two fingerprints physically glide closer (`distance: 3.7 → 0.0`).
    4. Simulated visual + low-warm-thump audio heartbeat accelerates smoothly along an eased curve from **`64 BPM` to `128 BPM`** (with optional gentle haptic pulse on supported touch devices; zero biometric hardware claims).
    5. The **6 exact `STORY_DATA.heartbeatWhispers`** fade in sequentially **100% verbatim** (and sync with optional whisper voice clips `/media/audio/voice/06-whisper-sequence.mp3`):
       - `0.0s – 1.3s`: *"Hold right there, pacarku... don't lift your thumb yet."*
       - `1.3s – 2.6s`: *"Can you feel that rhythm speeding up in your hand?"*
       - `2.6s – 4.0s`: *"That's what happens to my chest every single time you walk into a room."*
       - `4.0s – 5.3s`: *"Close your eyes for three seconds and imagine my forehead resting against yours..."*
       - `5.3s – 6.7s`: *"Imagine my hand sliding slowly behind your neck, pulling you close..."*
       - `6.7s – 8.0s`: *"Every beat of this heart is yours, cintaku. Yesterday, tonight, and always."*
  - **Gentle Early-Release Behaviour:** If Uci releases before `8.0s`, the progress softly pauses/eases back without harsh error buzzers or red flashes, showing a tender prompt: *"Take your time, sayang—I'm right here whenever you're ready to hold again."*
  - **Completion (`8.0s`):** The two fingerprints interlock and fuse into a **single radiant golden-rose 3D heart** accompanied by an optional sincere closing voice message and an unobtrusive `Replay Ritual` button.
- **Choreographed Transition → Act VII:** The merged golden-rose heart drifts upward like a rising moon reflection as a quiet nocturnal horizon unfolds beneath it—revealing the moonlit lake of Act VII.

---

### STAGE 07 — ACT VII: THE MOONLIT BIRTHDAY WISH (`REQ-STR-08A`, `REQ-STR-08B`, `REQ-STR-08C`)
- **Emotional Objective:** Sacred birthday celebration, tender wish-making, and emotional catharsis.

#### Stage 7A — The Cake by the Moonlit Lake (`REQ-STR-08A`)
- **Visual:** A serene dark-sapphire lake reflecting soft silver-champagne moonlight. In the foreground rests an artisan dark-velvet & gold-leaf 3D birthday cake topped with a single warm, flickering shader candle flame.
- **Visible Copy:** *"Make a wish, cintaku. This one's just for you."*
- **Dual Blow-Out Controls (Equal Dignity, Zero Permission Lockout):**
  1. **Always-Visible Primary Control:** `Hold to Blow Out Candle` (1.6s smooth breath-wind progress that bends and extinguishes the 3D flame with realistic ember smoke).
  2. **Optional Microphone Enhancement:** `Use Microphone to Blow 🎙️` — explains clearly (*"Uses microphone volume locally for a few seconds to detect your breath; never recorded"*). Only requests `getUserMedia({ audio: true })` if clicked. Flame flickers proportionally to detected airflow energy until extinguished, then immediately calls `track.stop()`. If denied or unsupported, displays a calm note (*"No microphone needed—hold the button below to blow out your candle"*) with zero interruption.

#### Stage 7B — 60 Fireflies & The Sky Lantern (`REQ-STR-08B`)
- **Visual & Audio:** The instant the candle wisp rises, **60 instanced golden fireflies** ignite off the lake surface, spiralling upward to gather inside a translucent warm-parchment **3D Sky Lantern**. If sound is enabled, the gentle **Birthday Music-Box Composition** begins playing.
- **Wish Composer UI:**
  - Elegant glass card with private text input (`"Write your birthday wish to the night sky..."` — stored strictly locally or kept ephemeral per privacy preference; never transmitted externally).
  - Optional cheeky checkbox (verbatim): `Include one unspoken naughty wish for us tonight.` (Checking it adds a subtle crimson-rose ember glow inside the lantern core!)
  - Primary CTA button (verbatim): `RELEASE INTO THE NIGHT SKY`
- **Lantern Ascent:** Activating release seals the wish inside the lantern; it lifts gracefully into the starry sky as **7–12 warm background lanterns** rise across the distant lake horizon.

#### Stage 7C — The Sealed Love Letter (`REQ-STR-08C`)
- **Visual:** Down from the lantern's golden trail glides a tactile **luxury envelope** (obsidian-rimmed `#F5EBDD` Warm Parchment with champagne foil trim) sealed by a sculpted **crimson wax seal** embossed with **`U ♥ S`**.
- **Opening Interaction:** Tapping or holding the `U ♥ S` crimson wax seal cracks the wax along realistic fracture lines, emits a delicate champagne-rose particle burst, folds open the envelope flaps, and unfolds the letter sheet at comfortable desktop reading width (`max-width: 680px`).
- **Authoritative Letter Copy:** Renders `STORY_DATA.birthdayLetter` (`salutation`, all 4 `paragraphs`, `signOff`, and `signature`) **100% verbatim** in editorial serif (`Cormorant Garamond` / readable lead spacing) with handwritten signature accent (`Caveat`).
- **Optional Voice Reading:** Integrated `VoicePlayerPill` (`/media/audio/voice/07-birthday-letter.mp3`) allowing `Listen`, `Pause`, `Replay`, and independent silent reading—never autoplayed against her will.
- **Choreographed Transition → Final Gift Reveal:** At the foot of the unfolded letter sits an illuminated invitation (`Receive Your Birthday Gift ✨`). Activating it gently folds the letter into a luminous golden seal that flies into the heart of **Sequence 3**.

---

### STAGE 08 — FINAL GIFT REVEAL: THE IMPOSSIBLE GIFT (`REQ-STR-09A`)
- **Emotional Objective:** Breathtaking climax, craftsmanship awe, and genuine excitement for her real birthday present.
- **Sequence 3 Grand Convergence Choreography (`3.8s` interactive/reversible camera & mesh assembly):**
  Every motif from Uci's journey physically returns into view to construct her luxury gift box:
  1. **Housing:** The dark obsidian mechanical plates from Acts IV–V lock together into a bevelled **black-glass & brushed-obsidian gift box** chassis.
  2. **Outer Crown:** The **seven orbital rings** from Act I sweep back in to form ornate champagne-gold filigree inlays framing the box edges.
  3. **Base Medallion:** The **Dual-Soul Vinyl platter** locks underneath as a spun champagne-gold pedestal medallion.
  4. **Star Inlays:** The **eight Goosebump Constellation stars** stud the lid corners as glittering golden gemstone inlays.
  5. **Interior Light & Core Gem:** Warm **golden alchemy light** glows through the bevel seams while the **merged golden-rose heart** from Act VI seats itself as the crown jewel.
  6. **Clasp & Ribbon:** The **twin fingerprint arcs** interlock at the front latch as the clasp, and a **luxurious crimson silk ribbon** (`#E11D48`) wraps smoothly around the box into a dimensional bow.
- **Interactive Inspection & Unboxing:**
  - Uci can freely **orbit and inspect** the assembled luxury box (`360°` damped drag / keyboard rotation).
  - Clicking/dragging the **crimson ribbon bow** (or pressing `Untie Ribbon & Open Gift`) unties the silk ribbons in a fluid spline animation, releases the twin-fingerprint clasp, and lifts the black-glass lid on damped golden hinges as warm volumetric champagne light spills upward.
- **Configurable Actual Gift Stage:**
  - Out of the illuminated interior rises the dedicated **Actual Gift Showcase Card & 3D Pedestal**, driven entirely by `storyContent.ts → actualGift` (`title`, `subtitle`, `description`, `mediaKey`, `deliveryNote`, `personalNote`).
  - **Pre-Personalization Fallback:** Until the owner fills in the real gift details, displays an unmistakably intentional, luxury *"Reserved Royal Gift Reveal"* heirloom card (`"A Real Birthday Surprise Awaits Outside This Screen — Personal Gift Details Slot Ready"`), never a fake invented product.

---

### STAGE 09 — AFTER-CREDITS: VIP PASSES & CALL (`REQ-STR-09B`, `OQ-04 RESOLVED`)
- **Emotional Objective:** Playful ongoing romance, tangible future promises, and direct real-world connection back to her boyfriend.
- **The Six Luxury VIP Passes (`STORY_DATA.vipCoupons` verbatim + Supplementary Redemption Guidance):**
  Presented in a spacious two-row desktop gallery separated by tier. Per `OQ-04`, all coupon titles, descriptions, tiers, and codes are preserved **100% verbatim**, while each card's back face and gallery header include **supplementary redemption guidance** distinguishing remote-tonight privileges from next-in-person-reunion privileges:
  - **Row 1 — `SWEET // PRINCESS TIER` (Champagne Gold & Blush Rose Foil):**
    - `vip-01` (`UCI-ROYAL-001`): *Full Princess Day & Craving Run* — Supplementary Guidance: **`Remote Delivery Tonight + Full In-Person Reunion Day`** (*"Redeemable right now for favourite food/boba delivery across the distance, plus full passenger-princess & back-rub privileges on our next reunion"*).
    - `vip-02` (`UCI-PEACE-002`): *Instant 'Win Any Argument' Trump Card* — Supplementary Guidance: **`Redeemable Remotely Anytime (Call / Text) or In Person`** (*"Valid immediately on video call, voice call, text, or in person—screenshot to play this card anytime"*).
    - `vip-03` (`UCI-NIGHT-003`): *Midnight Drive & Your Playlist Only* — Supplementary Guidance: **`Reserved for Our Next In-Person Reunion (or Shared Spotify Listening Tonight)`** (*"Queued for our very first late-night drive together when we reunite"*).
  - **Row 2 — `AFTER-MIDNIGHT // 18+ SPICY 🔥` (Obsidian Velvet & Crimson Lust Foil):**
    - `vip-04` (`UCI-HEAT-004`): *30-Minute Uninterrupted Hands-On Massage* — Supplementary Guidance: **`Next In-Person Reunion Priority Pass`** (*"Locked in for our next reunion night—zero rush, phones on Do Not Disturb"*).
    - `vip-05` (`UCI-CRAVE-005`): *Neck Kisses & Pin-Me-Down Pass* — Supplementary Guidance: **`Next In-Person Reunion Priority Pass`** (*"Redeemable the moment we're in the same room again"*).
    - `vip-06` (`UCI-BOSS-006`): *Tonight, Pacarku Calls Every Shot* — Supplementary Guidance: **`Redeemable Tonight on Late-Night Private Call & In-Person Reunion`** (*"Valid tonight across the distance on private late-night call, and again in person"*).
- **VIP Card Capabilities:**
  - Genuine `rotateY(180deg)` 3D perspective flip on click/`Enter` with metallic specular sheen following pointer tilt.
  - Back face displays exact `tier`, `title`, `description`, `code`, `Redeem This Pass` action, and persisted redemption timestamp (`"Claimed on [Date/Time] — Screenshot & Send to Your Boyfriend"`), plus an optional `Unclaim / Reset` subtle link so accidental taps are stress-free.
  - Dedicated **Screenshot-Friendly Composition** on both front and back faces (`U ♥ S` crest, clean high-contrast typography, exact VIP code pill).
- **Final Closing Lockup & Call Action:**
  - Closing vow (verbatim):
    > *"Your birthday may happen once a year. But choosing you is something I want to do every day."*
  - Primary Finale CTA (verbatim): **`CALL YOUR BOYFRIEND ❤️`**
    - If `storyContent.ts → liveCall.url` is populated (e.g., WhatsApp / FaceTime / Zoom / Meet link), opens the call destination cleanly in a new tab/handler.
    - If `liveCall.url` is empty (`""`), clicking opens a warm, polished glass call card (*"Pick up your phone and call him right now—he's waiting to hear your voice, pacarku ❤️"*) rather than rendering a dead or disabled button.
  - Subtle footer controls: `Revisit Any Chapter` & `Replay From Opening`.
