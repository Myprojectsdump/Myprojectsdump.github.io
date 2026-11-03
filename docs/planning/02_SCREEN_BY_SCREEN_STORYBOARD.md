# 02 — SCREEN-BY-SCREEN DESKTOP STORYBOARD

**Document ID:** `DOC-02`  
**Covers Requirements:** `REQ-VIS-01`, `REQ-VIS-05`, `REQ-STR-00` through `REQ-STR-09`  
**Primary Viewport Target:** `1440 × 900` (Responsive Desktop Envelope: `1920 × 1080` down to `1280 × 720`)

---

## 1. Global Desktop Stage Rules

1. **Distinct Spatial Choreography Per Act:** Every act uses a distinct desktop spatial composition (Central Symmetry, Dual-Flank Bridge, Zero-Gravity Gallery, Full-Bleed Vanity Plane, Left-Turntable / Right-Liner Split, Cursor-Spotlight Astrolabe, Laboratory Bench + 2×2 Vault, Symmetric Horizon Chamber, Lake Foreground/Sky Verticality, Pedestal Unbox, and Tiered VIP Showcase). Never repeat a generic left-text / right-card template seven times.
2. **3D Focal Supremacy:** Text panels occupy peripheral safe zones (`max-width: 420px` for side editorial blocks; `max-width: 680px` for the unfolded birthday letter) and never occlude active 3D drag/wipe/scratch targets.
3. **1280 × 720 Minimum Guarantee:** All vertical focal assemblies fit within a `600px` central safe-height band (`top: 64px` below minimal HUD to `bottom: 56px` above interaction hints) so `1366 × 768` and `1280 × 720` laptop screens never clip primary CTAs or require awkward zoom-out.
4. **Persistent Minimal Chrome (Hidden on `SCR-00`, visible `SCR-01` → `SCR-09`):**
   - **Top-Left (`24px, 20px`):** Subtle wordmark `U ♥ S  //  THE GRAVITY OF UCI` (`11px` tracked uppercase sans, `0.65` opacity — approved per `OQ-02`).
   - **Top-Right (`24px, 20px`):** `SoundControlPill` (Master Mute + expandable Music/SFX sliders) + `ComfortControls` (`Skip Scene` / `Reduced Motion`).
   - **Right Vertical Edge (`right: 24px, vertically centered`):** Discreet 10-dot `ChapterRail` showing visited/current chapters with hover/focus labels and direct jump to any unlocked chapter (auto-fades to `0.25` opacity during emotional climaxes like Act VI hold & Act VII letter reading).

---

## 2. Screen-by-Screen Specifications & Desktop Diagrams

### `SCR-00` — OPENING: ENTER MY UNIVERSE (`OQ-01` & `OQ-02` RESOLVED)
- **Viewport Mode:** Locked `100dvh` full-bleed portal (`#040407` Obsidian Void). HUD hidden. Operates as **one continuous cinematic scene** across two choreographed beats without any cut.
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
|                                   [ #040407 ]                                    |
|                         .      *           .          *                          |
|                     ( Soft Rose-Gold Radial Heartbeat Pulse )                    |
|                                                                                  |
|     [ Beat A: 1.8s–4.2s — Dissolves gently into stardust as Beat B emerges ]     |
|           "Somewhere in this enormous universe, two people found each other."    |
|                "Different countries. Different time zones. Different skies."     |
|               "But somehow, my favourite place is still wherever you are."       |
|                                        |                                         |
|                                        v                                         |
|                       13.8 BILLION YEARS IN THE MAKING                           |
|                            The Gravity of Uci.                                   |
|          "Before you, the universe was just cold static and empty space.         |
|           Then you arrived—and suddenly every atom in my world knew              |
|                          exactly what it was orbiting."                          |
|                                                                                  |
|        "Selamat ulang tahun, my gorgeous pacarku. Tonight, every star            |
|                           in this sky belongs to you."                           |
|                                                                                  |
|                           [  ENTER MY UNIVERSE  ]                                |
|                  (o) Sound On • Best experienced with headphones                 |
+----------------------------------------------------------------------------------+
```
- **Visual Hierarchy:** 1. Hero Title `The Gravity of Uci.` (`clamp(3.25rem, 4.6vw, 5.25rem)` Cormorant Garamond, exact casing and period preserved per `OQ-02`) → 2. `ENTER MY UNIVERSE` champagne-glass pill button → 3. Subtitle & italic whisper → 4. Discreet sound/headphones toggle (`Resume at [Chapter]` pill also shown if returning after refresh).
- **Exact Visible Copy:**
  - *Beat A — Long-Distance Introduction (`1.8s–4.2s`, centered italic serif):*
    - `"Somewhere in this enormous universe, two people found each other."`
    - `"Different countries. Different time zones. Different skies."`
    - `"But somehow, my favourite place is still wherever you are."`
  - *Beat B — Hero Lockup (`4.2s+`, verbatim `STORY_DATA.heroOpening`):*
    - `eyebrow`: `"13.8 BILLION YEARS IN THE MAKING"`
    - `title`: `"The Gravity of Uci."`
    - `subtitle`: `"Before you, the universe was just cold static and empty space. Then you arrived—and suddenly every atom in my world knew exactly what it was orbiting."`
    - `whisper`: `"Selamat ulang tahun, my gorgeous pacarku. Tonight, every star in this sky belongs to you."`
  - *Controls Copy:* `"ENTER MY UNIVERSE"` | `"Sound On • Best experienced with headphones"` | `"Enter Silently (Muted)"`
- **Interactive Controls:** `ENTER MY UNIVERSE` primary button (`Enter`/`Space`/Click); `Sound On / Enter Silently (Muted)` pre-entry toggle; click/keypress during Beat A fast-forwards smoothly to Beat B.
- **Fallback State:** Works with `0` photographs and `0` audio files; if WebGL is unavailable, `<WebGLFallbackStage>` renders CSS/SVG twinkling starfield and radial rose-gold pulse.
- **Success & Exit State:** Clicking `ENTER MY UNIVERSE` unlocks Web Audio (if Sound On), dissolves button into golden stardust, pulls camera from `z: 14 → z: 6.4` into the assembled Gravity Engine (`SCR-01`), and reveals HUD.
- **Acceptance Criteria:** `AT-01`, `AT-02`, `AT-03`, `AT-08`, `AT-32`, `AT-33`.

---

### `SCR-01` — ACT I: TWO COUNTRIES, ONE SKY
- **Viewport Mode:** Pinned scroll stage (`220vh` scroll track driving `0.0 → 1.0` Gravity Engine explosion, followed by interactive star-bridge completion).
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI                                [Sound] [Skip]        |
|                                                                                  |
|   ACT I — TWO COUNTRIES, ONE SKY                                              *  |
|   Rotate the sphere. Scroll to unfold our universe.                           o  |
|                                                                               o  |
|            ( ★ YOU )  ~~~~~~~~~~~~~~~~~~~~~~~~~~~>  ( ★ UCI )                 o  |
|               \        .- - - ( Ring 1..7 ) - - -.        /                   o  |
|                \     /     [ Rose-Gold Heart ]    \      /                    o  |
|                      ' - - - ( Glass Halves ) - - '                           o  |
|                                                                                  |
|   +--------------------------------------------------------+                     |
|   | [ > ] Voice Note • "Hey, beautiful. I know I'm not     |                     |
|   | there to steal your birthday hug today..."             |                     |
|   +--------------------------------------------------------+                     |
|                     [ Connect Our Skies ] • Scroll / Drag golden thread          |
+----------------------------------------------------------------------------------+
```
- **Visual Hierarchy:** 1. Central 3D Gravity Engine (`520px × 520px` clear focal stage) → 2. Flank stars `YOU` (left `18%`) and `UCI` (right `82%`) emerging at scroll `≥ 0.80` → 3. Top-left compact chapter header → 4. Bottom-left glass `VoicePlayerPill` + synchronized transcript upon connection.
- **Exact Visible Copy:**
  - Header: `ACT I — TWO COUNTRIES, ONE SKY`
  - Star Labels: `YOU` | `UCI`
  - Contextual Hint (`scroll < 0.80`): `Drag to rotate • Scroll to unfold the Gravity Engine`
  - Contextual Hint (`scroll ≥ 0.80`): `Drag a golden thread from YOU to UCI (or press Connect Our Skies)`
  - Opening Voice Transcript (verbatim): `"Hey, beautiful. I know I'm not there to steal your birthday hug today. So I made something. Every little bit of this is yours. Take your time, okay?"`
- **Interactive Controls:** 3D orbit drag on Gravity Engine (+ keyboard `Arrow` keys); wheel/trackpad scroll (`0.0 → 1.0` & reversible `1.0 → 0.0`); pointer drag from `YOU` star to `UCI` star + accessible button `Connect Our Skies`; `VoicePlayerPill` play/pause/replay.
- **Fallback State:** If `/media/audio/voice/01-opening-voice.mp3` is not yet supplied, plays a warm procedural pentatonic harp bloom chord and presents the verbatim voice transcript smoothly inside the glass card.
- **Success & Exit State:** Golden filament bridges `YOU ↔ UCI`, central heart pulses rose-amber, voice greeting plays/displays, and scrolling downward morphs the 12 crystal fragments into Act II's floating memory frames; scrolling upward reassembles the sphere cleanly.
- **Acceptance Criteria:** `AT-04`, `AT-05`, `AT-06`, `AT-08`, `AT-27`, `AT-29`.

---

### `SCR-02` — ACT II: THE LITTLE THINGS I KEEP
- **Viewport Mode:** Full-screen interactive 3D spatial chamber (`100dvh` exploration stage + `80vh` exit convergence track).
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI                                [Sound] [Skip]        |
|   ACT II — THE LITTLE THINGS I KEEP                        Discovered: 2 / 6     |
|                                                                                  |
|         +-------------+                     +--------------+                  o  |
|         | [01 Photo]  |       +---------+   | [02 Moment]  |                  *  |
|         +-------------+       | [05     |   +--------------+                  o  |
|                               |  Voice] |                                     o  |
|     +---------------+         +---------+         +----------------+          o  |
|     | [03 Inside    |                             | [06 Personal   |          o  |
|     |     Joke]     |      +---------------+      |    Confession] |          o  |
|     +---------------+      | [04 Music]    |      +----------------+             |
|                            +---------------+                                     |
|                                                                                  |
|                     Click any keepsake to open • [ Continue to Act III -> ]      |
+----------------------------------------------------------------------------------+
```
- **Exact Visible Copy & 6 Required Discovery Categories:**
  - Header: `ACT II — THE LITTLE THINGS I KEEP`
  - Six keepsake slots (`mem-01`..`mem-06`) mapped from `storyContent.ts → memories` covering: `01 // A Photograph`, `02 // A Shared Moment`, `03 // Our Inside Joke`, `04 // A Music Memory`, `05 // A Voice Note`, `06 // A Personal Confession`.
- **Inspector Modal Overlay (`SCR-02M`, native `<dialog closedby="any">`):**
  - Left column (`48%`): High-resolution `SmartImage` frame.
  - Right column (`52%`): Category eyebrow, Memory Title, optional Era/Date pill, personal story copy, optional `VoicePlayerPill`, and `Back to Room (Esc)`.
- **Fallback State:** Until the owner populates `storyContent.ts → memories` and `/public/media/memories/*`, each card displays a bespoke `<HeirloomMediaPlaceholder>` (`U ♥ S` champagne filigree crest + reserved memory slot frame) with **zero** fabricated couple events and **zero** broken image icons.
- **Success & Exit State:** Visited keepsakes glow warm champagne; scrolling forward draws the 6 metallic bezels inward along planar curves to interlock into the vanity mirror frame of `SCR-03` (reversible on upward scroll).
- **Acceptance Criteria:** `AT-07`, `AT-08`, `AT-26`, `AT-27`, `AT-29`.

---

### `SCR-03` — ACT III: THE SECRET MIRROR
- **Viewport Mode:** Locked interactive viewport (`100dvh` stage during wiping + `110vh` portal transition track).
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI     ACT III — THE SECRET MIRROR       [Sound] [Skip] |
|                                                                                  |
|        +================================================================+        |
|        ||  [Fogged Condensation Layer - Wipe with cursor ~45px]        ||     o  |
|        ||                                                              ||     o  |
|        ||   (1) "Stop looking so            (2) "Still my favorite     ||     *  |
|        ||        kissable right now."            view."                ||     o  |
|        ||                                                              ||     o  |
|        ||                  (5) "100% Mine. ♥"                          ||     o  |
|        ||                                                              ||     o  |
|        ||   (3) "Your neck + my lips ="     (4) "Come back to bed,     ||        |
|        ||                                        cintaku."             ||        |
|        +================================================================+        |
|                                                                                  |
|        Glass Cleared: 64%  •  Secrets Found: 5 / 5    [ Breathe on Glass ]       |
|                                                  [ Step Through the Mirror -> ]  |
+----------------------------------------------------------------------------------+
```
- **Visual Hierarchy:** 1. Large landscape bevelled mirror (`min(1040px, 78vw) × min(580px, 66vh)`) → 2. Handwritten glowing rose-gold notes (`Caveat`, `28px–34px`) + crisp subtexts (`Plus Jakarta Sans`, `14px`) emerging behind wiped mist → 3. Bottom action bar (`Glass Cleared %`, `Secrets Found X / 5`, `Breathe on Glass`, `Step Through the Mirror`).
- **Exact Visible Copy (`STORY_DATA.steamyMirrorNotes` verbatim at exact `(x%, y%)` coordinates):**
  1. `id: 1` `(x: 22%, y: 25%)`: `"Stop looking so kissable right now."` / Subtext: `"Seriously, how am I supposed to focus?"`
  2. `id: 2` `(x: 72%, y: 28%)`: `"Still my favorite view."` / Subtext: `"Morning, midnight, messy hair, or dressed to kill."`
  3. `id: 3` `(x: 28%, y: 68%)`: `"Your neck + my lips ="` / Subtext: `"My favorite unfinished conversation."`
  4. `id: 4` `(x: 75%, y: 72%)`: `"Come back to bed, cintaku."` / Subtext: `"5 more minutes never meant 5 minutes with you."`
  5. `id: 5` `(x: 50%, y: 48%)`: `"100% Mine. ♥"` / Subtext: `"Wipe the rest of the glass, baby."`
  - Controls Copy: `"Breathe on Glass"` | `"Reveal Next Secret Note"` (keyboard alt) | `"Step Through the Mirror"`
- **Interactive Controls:** Pointer drag/wipe (`~45 CSS px` scaled feathered `destination-out` brush) and touch fallback; keyboard `Reveal Next Secret Note` button; `Breathe on Glass` fog-restore button; `Step Through the Mirror` exit CTA.
- **Fallback State:** Uses native HTML5 2D Canvas (`FogMirrorCanvas.tsx`), working identically even if WebGL is disabled; procedural soft breath-mist SFX when audio file is absent.
- **Success & Exit State:** At `5 / 5` notes discovered, the mirror surface ripples, the metallic bezel separates into 4 counter-rotating horological rings, and the camera flies straight through the glass into `SCR-04A` (reversible on upward scroll).
- **Acceptance Criteria:** `AT-01`, `AT-09`, `AT-10`, `AT-27`, `AT-29`, `AT-32`.

---

### `SCR-04A` — ACT IV (EXPERIENCE A): THE DUAL-SOUL VINYL
- **Viewport Mode:** Asymmetric 60 / 40 split-stage (`100dvh` interactive deck).
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI                                [Sound] [Skip]        |
|                                                                                  |
|   [ (o) SIDE A: SUNLIGHT & SWEETHEART ]  [ ( ) SIDE B: 2:00 AM AFTER-HOURS 🔥 ]  |
|                                                                                  |
|      . - - - - - - - - - - .          SIDE A // SUNLIGHT & SWEETHEART         o  |
|    /   GROOVE TEXT ORBIT     \        92 BPM • Dream Pop Aura                 o  |
|   |    . - - - - - - - - .    |   /|                                          o  |
|   |   |   (  U ♥ S  )     |   |  / |  +------------------------------------+  *  |
|   |    ' - - - - - - - - '    | /  |  | 01. "The way your eyes crinkle     |  o  |
|   |      3D VINYL PLATTER     |/__/   | when you're trying not to laugh    |  o  |
|    \                         / Tonearm| at my terrible jokes."             |     |
|      ' - - - - - - - - - - '          +------------------------------------+     |
|                                       [ < Prev ]  Confession 1 / 4  [ Next > ]   |
|   [ Drop Needle ]  [ Send Kiss 💋 14 ]    [ Explore Our Constellation -> ]       |
+----------------------------------------------------------------------------------+
```
- **Exact Visible Copy (`STORY_DATA.vinylTracks` verbatim):**
  - **Side A (`daylight`):**
    - `title`: `"SIDE A // SUNLIGHT & SWEETHEART"`
    - `bpm`: `"92 BPM • Dream Pop Aura"`
    - `grooveText`: `"MY PACARKU • MY PEACE • THE GIRL WHO SOFTENED MY WHOLE WORLD • CINTAKU FOREVER • "`
    - `confessions`:
      1. `"The way your eyes crinkle when you're trying not to laugh at my terrible jokes."`
      2. `"How holding your hand in public makes me feel like I won at life."`
      3. `"You turn the most ordinary random Tuesday into a memory I want to keep forever."`
      4. `"Every gentle, soft part of my heart only exists because you taught it how to feel safe."`
  - **Side B (`afterHours`):**
    - `title`: `"SIDE B // 2:00 AM BEHIND CLOSED DOORS 🔥"`
    - `bpm`: `"68 BPM • Heavy Late-Night Tension"`
    - `grooveText`: `"WARNING: HIGH ADDICTION • HANDS ON YOUR WAIST • BITE MARKS & NECK KISSES • DONT BE SHY CINTAKU • "`
    - `confessions`:
      1. `"That dangerous little look you give me when we're alone and you want my full attention."`
      2. `"How fast my self-control disappears the second you sit on my lap or pull me close."`
      3. `"The quiet little sounds you make when I kiss right below your ear—my absolute kryptonite."`
      4. `"My favorite outfit on you will forever be my oversized shirt... and even better when it comes off."`
- **Interactive Controls:** 3D Tonearm click / `Drop Needle / Lift Needle` button; rotary pointer drag on vinyl platter (modulating angular velocity & audio playback rate/scratch filter); `SIDE A` ↔ `SIDE B` full world/lighting/sound/copy switch; Confession selector (`1..4`); `Send Kiss 💋` counter button spawning floating lipstick particles; `Explore Our Constellation ->` CTA.
- **Fallback State:** If `/media/audio/music/04-vinyl-side-a-daylight.mp3` or `04-vinyl-side-b-afterhours.mp3` is missing, `ProceduralAudio.ts` synthesizes warm `92 BPM` dream-pop Rhodes chords (Side A) and `68 BPM` late-night minor-9th chords (Side B) with full rotary pitch-scrub support.
- **Success & Exit State:** Platter slows to a halt, black vinyl disc dissolves into mist, and the 8 internal golden platter bearings float upward into the pitch-black sky of `SCR-04B` (reversible on upward scroll / back toggle).
- **Acceptance Criteria:** `AT-01`, `AT-11`, `AT-12`, `AT-13`, `AT-27`, `AT-29`.

---

### `SCR-04B` — ACT IV (EXPERIENCE B): THE GOOSEBUMP CONSTELLATION
- **Viewport Mode:** Full-bleed midnight astrolabe (`68%` left/center starfield when drawer open + `32%` right non-blocking `<dialog popover="manual">` Discovery Drawer).
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI    GOOSEBUMP CONSTELLATION (5/8)       [Sound] [Skip]|
|                                                                                  |
|            ★ 01 Eyes (24,22)            ★ 02 Laugh (68,18)                       |
|                   \                    /                                         |
|                    \                  /      +-------------------------------+   |
|                     ★ 03 Lips 🔥 (48,36)     | 03 // Her Lips 🔥             |   |
|                    /                  \      | [ SPICY ]                     |   |
|     ★ 05 Bites 🔥 (22,54)        ★ 04 Neck 🔥| My Personal Addiction         |   |
|                    \            (76,48)      |                               |   |
|                     ★ 06 Waist 🔥 (54,66)    | "Soft, dangerous, and 100%    |   |
|                    /              \          |  my territory..."             |   |
|        ★ 07 Voice (30,82)    ★ 08 Heart      +-------------------------------+   |
|                                (74,80)              [ Enter Act V: Formula -> ]  |
+----------------------------------------------------------------------------------+
```
- **Exact Visible Copy (`STORY_DATA.constellationNodes` verbatim — all 8 nodes):**
  1. `id: "eyes"` (`soul`, `x: 24, y: 22`) — Label: `"01 // Her Eyes"` — Headline: `"Where My Willpower Goes to Die"` — Description: `"One look from you—whether it's soft and sleepy or sharp and teasing—and I'm already folding. You don't even have to ask twice, pacarku."`
  2. `id: "laugh"` (`soul`, `x: 68, y: 18`) — Label: `"02 // Her Laugh"` — Headline: `"My Favorite Frequency on Earth"` — Description: `"If I could bottle the sound of your genuine, breathless laugh and play it on repeat on my hardest days, I'd never need another medicine."`
  3. `id: "lips"` (`spicy`, `x: 48, y: 36`) — Label: `"03 // Her Lips 🔥"` — Headline: `"My Personal Addiction"` — Description: `"Soft, dangerous, and 100% my territory. Whether you're pouting because you want food or kissing me until we both lose our breath—I never get enough."`
  4. `id: "neck"` (`spicy`, `x: 76, y: 48`) — Label: `"04 // The Curve of Her Neck 🔥"` — Headline: `"My Favorite Hiding Spot"` — Description: `"Burying my face right into your neck while wrapping my arms around you from behind isn't just a habit—it's a biological need at this point."`
  5. `id: "bites"` (`spicy`, `x: 22, y: 54`) — Label: `"05 // Her Cute Aggression Bites 🔥"` — Headline: `"Unprovoked Attacks (That I Secretly Love)"` — Description: `"You claim you bite my arm or shoulder because you love me too much to handle it. Truth is? Leave all the marks you want, cintaku."`
  6. `id: "waist"` (`spicy`, `x: 54, y: 66`) — Label: `"06 // Her Waist in My Hands 🔥"` — Headline: `"Custom-Built for My Grip"` — Description: `"Pulling you flush against me by your waist so there's zero space left between us is easily top-tier human engineering."`
  7. `id: "voice"` (`soul`, `x: 30, y: 82`) — Label: `"07 // Her 1:00 AM Sleepy Voice"` — Headline: `"Soft Enough to Melt Steel"` — Description: `"When you're half-asleep, extra clingy, and whispering 'sayang' in that tiny voice—that's the moment I fall in love with you all over again."`
  8. `id: "heart"` (`soul`, `x: 74, y: 80`) — Label: `"08 // Her Fierce, Loving Heart"` — Headline: `"The Home I Always Wanted"` — Description: `"Beneath all our teasing, playfulness, and chaos is the warmest, most loyal heart I have ever known. Thank you for loving me the way you do."`
- **Interactive Controls:** Warm silk cursor spotlight following pointer (and snapping to focused star on `Tab`); click/`Enter` on each of the 8 star nodes; Discovery Drawer `Next Undiscovered Star` & `Close (Esc)`.
- **Fallback State:** Haptics on `"spicy"` nodes safely no-op on desktop; Lydian star chimes synthesized procedurally; SVG constellation fallback in non-WebGL mode.
- **Success & Exit State:** At `8 / 8` stars discovered, golden filaments connect the entire constellation in a radiant burst, then all 8 stars spiral downward into the central spindle to blow the glass Alchemy Vessel of `SCR-05A` (reversible on upward scroll).
- **Acceptance Criteria:** `AT-01`, `AT-14`, `AT-27`, `AT-29`, `AT-32`.

---

### `SCR-05A` & `SCR-05B` — ACT V: THE UCI FORMULA & SCRATCH VAULT (`OQ-04` RESOLVED)
- **Viewport Mode:** Two-beat laboratory stage (`SCR-05A` Alchemy Mixing → comedic `999°C` explosion → `SCR-05B` 2×2 Gold Foil Scratch Vault).
- **Desktop Layout Diagram — `SCR-05A` (Alchemy Mixing):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI        ACT V — THE UCI FORMULA         [Sound] [Skip]|
|                                                                                  |
|   [ Vial 1: 40% Pure Pacarku Sweetness ]        +--------+        [ TEMP ]       |
|                                                 |  Cork  |        | 37°C |       |
|   [ Vial 2: 30% Effortless Goddess Radiance ]  /          \       |  ||  |       |
|                                               |   3D GLASS |      |  ||  |       |
|   [ Vial 3: 20% Clingy Princess Energy ]      |    VESSEL  |      | (__) |       |
|                                                \  ~~~~~~  /       +------+       |
|   [ Vial 4: 10% Late-Night Bedroom Menace ]     '--------'                       |
|                                                                                  |
|       DANGER: TOO HOT TO HANDLE. BOYFRIEND WILLPOWER COMPROMISED. (at 999°C!)    |
+----------------------------------------------------------------------------------+
```
- **Desktop Layout Diagram — `SCR-05B` (Gold Scratch Vault after 999°C explosion):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // ACT V — SECRET VAULT             Revealed: 4 / 4  [Sound] [Skip]        |
|                                                                                  |
|    +----------------------------------+   +----------------------------------+   |
|    | SPICY TRUTH 🔥                   |   | BOYFRIEND SECRET 💋              |   |
|    | The Oversized Tee Clause         |   | What Happens When You Touch Me   |   |
|    | "You look breathtaking dressed   |   | "You think I'm calm and          |   |
|    |  up, baby. But nothing beats..." |   |  composed? The second your..."   |   |
|    | [Reunion Rule] [♥ Kept] [Re-foil]|   | [Next Reunion] [♥ Kept] [Re-foil]|   |
|    +----------------------------------+   +----------------------------------+   |
|    +----------------------------------+   +----------------------------------+   |
|    | TONIGHT'S PROMISE 🌙             |   | PURE CINTAKU ♥                   |   |
|    | Your Birthday Immunity Pass      |   | My Favorite Addiction            |   |
|    | [Remote Tonight + Reunion Pass]  |   | [Tonight & Every Tomorrow]       |   |
|    +----------------------------------+   +----------------------------------+   |
|                                  [ Replay Formula Mix ]  [ Continue to Act VI ->]|
+----------------------------------------------------------------------------------+
```
- **Exact Visible Copy (`SCR-05A` & `SCR-05B` verbatim `STORY_DATA.scratchCards` + `OQ-04` Supplementary Redemption Guidance):**
  - **4 Ingredients:** `40% Pure Pacarku Sweetness` | `30% Effortless Goddess Radiance` | `20% Clingy Princess Energy` | `10% Late-Night Bedroom Menace`
  - **Thermal States & Overheat Banner:** `37°C` → `999°C` | `DANGER: TOO HOT TO HANDLE. BOYFRIEND WILLPOWER COMPROMISED.`
  - **4 Scratch Cards (Verbatim `STORY_DATA.scratchCards` + Supplementary Badge):**
    1. `id: "scratch-1"` — `foilTitle`: `"CONFESSION #01 // WARDROBE RULE"` | `tag`: `"SPICY TRUTH 🔥"` | `secretTitle`: `"The Oversized Tee Clause"` | `secretBody`: `"You look breathtaking dressed up, baby. But nothing beats you in just my oversized shirt, messy hair, bare legs, and zero distance between us."` *(Supplementary Guidance Badge: `In-Person Reunion Rule — Oversized Shirt Reserved for You`)*
    2. `id: "scratch-2"` — `foilTitle`: `"CONFESSION #02 // PHYSICAL TELEMETRY"` | `tag`: `"BOYFRIEND SECRET 💋"` | `secretTitle`: `"What Happens When You Touch Me"` | `secretBody`: `"You think I'm calm and composed? The second your fingers touch the back of my neck or you whisper in my ear, my brain completely short-circuits."` *(Supplementary Guidance Badge: `Tonight via Late-Night Voice Whisper + Next In-Person Reunion`)*
    3. `id: "scratch-3"` — `foilTitle`: `"CONFESSION #03 // UNLIMITED DARE"` | `tag`: `"TONIGHT'S PROMISE 🌙"` | `secretTitle`: `"Your Birthday Immunity Pass"` | `secretBody`: `"Whatever pace you want tonight—whether it's slow forehead kisses, a 45-minute full-body massage, or keeping me awake until 3 AM—my hands are yours."` *(Supplementary Guidance Badge: `Redeemable Tonight (Keep Me Awake Until 3 AM on Call) + 45-Min Massage at Reunion`)*
    4. `id: "scratch-4"` — `foilTitle`: `"CONFESSION #04 // CORE MEMORY"` | `tag`: `"PURE CINTAKU ♥"` | `secretTitle`: `"My Favorite Addiction"` | `secretBody`: `"I don't just love you, Uci. I crave you—your mind, your laugh, your body, your attitude, and every single tomorrow we get to steal together."` *(Supplementary Guidance Badge: `Across Every Time Zone Tonight & Every Reunion Tomorrow`)*
- **Interactive Controls:** Click/`Enter` on each of the 4 vials; pointer/touch scratch on each gold foil `<canvas>` (`≥ 45%` auto-dissolve) + keyboard `Scratch & Reveal Confession` button + `Re-foil Card` replay + `Save / Keep Promise ♥` toggle + `Replay Formula Mix`.
- **Fallback State:** 2D `FoilScratchCanvas` operates natively with or without WebGL; procedural bubbling & cork-pop audio fallback.
- **Success & Exit State:** Four revealed metallic cards fold into sleek obsidian structural plates stored at the world base as the laboratory dims into `SCR-06` (reversible on upward scroll).
- **Acceptance Criteria:** `AT-01`, `AT-15`, `AT-16`, `AT-17`, `AT-27`, `AT-29`, `AT-32`.

---

### `SCR-06` — ACT VI: EVEN ACROSS THE DISTANCE (`OQ-03` RESOLVED)
- **Viewport Mode:** Hushed full-screen dark sanctuary (`100dvh` stage + `90vh` heart-rise horizon transition). Peripheral HUD dims to `0.2` opacity while holding.
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI                                [Sound] [Skip]        |
|                      ACT VI — EVEN ACROSS THE DISTANCE                           |
|                                                                                  |
|                 "Close your eyes for three seconds and imagine                   |
|                      my forehead resting against yours..."                       |
|                                                                                  |
|               . - - - .                               . - - - .                  |
|             /   (((   \   =======================   /   )))   \                  |
|            |   (((((   |     Golden Silk Bridge    |   )))))   |                 |
|             \   (((   /       98 BPM  •  5.2s       \   )))   /                  |
|               ' - - - '                               ' - - - '                  |
|                  HIM                       HOLD CURSOR OR FINGER HERE            |
|                                             (Mouse / Touch / Spacebar)           |
|                                                                                  |
|                                  [ Replay Ritual ]                               |
+----------------------------------------------------------------------------------+
```
- **Exact Visible Copy (`STORY_DATA.heartbeatWhispers` verbatim + `OQ-03` UI Instructions):**
  - Target UI Instruction (`OQ-03` desktop-first phrasing): `"Hold your cursor or finger here for 8 seconds (or press and hold Spacebar)"`
  - All 6 `STORY_DATA.heartbeatWhispers` timed across `0.0s → 8.0s` **100% verbatim**:
    1. `0.0s – 1.3s`: `"Hold right there, pacarku... don't lift your thumb yet."`
    2. `1.3s – 2.6s`: `"Can you feel that rhythm speeding up in your hand?"`
    3. `2.6s – 4.0s`: `"That's what happens to my chest every single time you walk into a room."`
    4. `4.0s – 5.3s`: `"Close your eyes for three seconds and imagine my forehead resting against yours..."`
    5. `5.3s – 6.7s`: `"Imagine my hand sliding slowly behind your neck, pulling you close..."`
    6. `6.7s – 8.0s`: `"Every beat of this heart is yours, cintaku. Yesterday, tonight, and always."`
  - Gentle Early-Release Prompt: `"Take your time, sayang—I'm right here whenever you're ready to hold again."`
  - Simulated Pulse Readout: `64 BPM` → `128 BPM` (artistic visual/audio simulation; zero biometric hardware claim).
- **Interactive Controls:** Continuous press-and-hold via Left Mouse Button, Touch, or `Spacebar` / `Enter` on Uci's fingerprint pad; `Replay Ritual` button after completion; `VoicePlayerPill` for optional closing sincere voice note.
- **Fallback State:** Procedural discrete `lub-dub` heartbeat synthesizer (`64→128 BPM`) + timed on-screen whisper captions when voice files are absent; desktop no-op for `navigator.vibrate`.
- **Success & Exit State:** At `8.0s`, the two fingerprints fuse into one luminous golden-rose 3D heart, which rises softly over the moonlit lake horizon of `SCR-07A` (scrolling upward lowers the heart back into the quiet chamber).
- **Acceptance Criteria:** `AT-01`, `AT-18`, `AT-27`, `AT-29`, `AT-30`, `AT-31`.

---

### `SCR-07A`, `SCR-07B`, `SCR-07C` — ACT VII: THE MOONLIT BIRTHDAY WISH
- **Viewport Mode:** Three seamless sub-stages anchored over the 3D Moonlit Lake diorama.
- **Desktop Layout Diagrams (`1440 × 900`):**
  - **`SCR-07A` (Stage A — The Cake):** Central 3D artisan birthday cake with flickering candle flame reflected in moonlit water.
    - Exact Visible Copy: `"Make a wish, cintaku. This one's just for you."`
    - Interactive Controls: Always-visible primary button `[ Hold to Blow Out Candle ]` (`1.6s` hold via mouse/touch/`Space`) + Optional pill `[ Use Microphone to Blow 🎙️ ]` (*"Optional: detects breath locally for a few seconds; never recorded"*).
    - Fallback State: If microphone permission is denied, dismissed, or unavailable, displays calm reassurance (*"No microphone needed—hold the button below to blow out your candle"*) and highlights `[ Hold to Blow Out Candle ]`.
  - **`SCR-07B` (Stage B — Fireflies & Sky Lantern):** 60 golden fireflies rise from extinguished wick into a hovering 3D translucent parchment Sky Lantern (`58%` left/center), paired with a glass Wish Composer card (`42%` right):
    - Exact Visible Copy:
      - Wish Input Placeholder: `"Write your birthday wish to the night sky..."`
      - Optional Checkbox (verbatim): `"Include one unspoken naughty wish for us tonight."`
      - Primary CTA Button (verbatim): `"RELEASE INTO THE NIGHT SKY"`
    - Interactive Controls: Textarea input, optional naughty-wish checkbox (adds warm crimson-rose ember glow inside lantern), `RELEASE INTO THE NIGHT SKY` button.
    - Fallback State: Procedural plucked celesta music-box melody plays if `/media/audio/music/07-birthday-music-box.mp3` is not yet supplied.
  - **`SCR-07C` (Stage C — The Sealed Love Letter):** Centered luxury envelope (`U ♥ S` crimson wax seal). Clicking/holding cracks the wax seal with a champagne particle burst and unfolds the Warm Parchment (`#F5EBDD`) editorial letter sheet (`max-width: 680px`, internal smooth scroll with `VoicePlayerPill` at top-right):
    - **Exact Visible Copy (`STORY_DATA.initials` & `STORY_DATA.birthdayLetter` verbatim):**
      - Wax Seal Emboss: `"U ♥ S"`
      - `salutation`: `"To my gorgeous girlfriend, my pacarku, my forever cintaku — Uci,"`
      - `paragraphs[0]`: `"Happy Birthday, baby. I wanted to build you something that didn't just sit on a screen, because loving you has never been a passive thing for me. Loving you feels like electricity, like warmth after a cold rain, like coming home and losing my breath all at the exact same time."`
      - `paragraphs[1]`: `"Look at everything you are: you are effortless grace and absolute chaos rolled into one irresistible human being. One minute you're the sweetest, softest girl in my arms making my heart ache with how precious you are—and the next minute you're biting my arm, rolling your eyes with that cute attitude, or looking at me in a way that makes me forget my own name."`
      - `paragraphs[2]`: `"Thank you for every late-night laugh, every tight hug when the world felt heavy, every sweet whisper, and every wild, unfiltered moment behind closed doors where it's just you and me against the universe."`
      - `paragraphs[3]`: `"As you step into this new year of your life, here is my promise to you: I will keep choosing you, spoiling you, protecting your peace, hyping your dreams, kissing every inch of you until you're dizzy, and loving you louder than anyone ever has."`
      - `signOff`: `"Forever obsessed with you,"`
      - `signature`: `"Your Boyfriend ♥"`
    - Interactive Controls: Tap/hold `U ♥ S` wax seal; `Listen / Pause / Replay` voice letter player (never forced autoplay); `Reseal Envelope` replay link; footer CTA `[ Unveil Your Birthday Gift ✨ ]`.
    - Fallback State: If `/media/audio/voice/07-birthday-letter-voice.mp3` is absent, presents clean silent-reading parchment layout without a broken audio player.
- **Success & Exit State:** Activating `[ Unveil Your Birthday Gift ✨ ]` folds the golden seal into the grand convergence of `SCR-08`.
- **Acceptance Criteria:** `AT-01`, `AT-19`, `AT-20`, `AT-21`, `AT-29`, `AT-31`, `AT-32`.

---

### `SCR-08` — FINAL GIFT REVEAL: THE IMPOSSIBLE GIFT
- **Viewport Mode:** Dedicated `100dvh` 3D luxury showcase stage (`160vh` reversible convergence scrub → interactive unboxing climax).
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // THE GRAVITY OF UCI                                [Sound] [Skip]        |
|                                                                                  |
|              [ Sequence 3 Convergence -> Interactive Gift Box ]                  |
|                                                                                  |
|                            ___  ( Crimson Silk Bow )  ___                        |
|                        +====================================+                    |
|                        |  *   Black Glass & Champagne    *  |                    |
|                        |        [ Twin-Print Clasp ]        |                    |
|                        |  *   7-Ring Filigree & Heart    *  |                    |
|                        +====================================+                    |
|                             ( Vinyl Gold Base Medallion )                        |
|                                                                                  |
|             Drag to inspect 360°  •  [ Untie Crimson Ribbon & Open ]             |
+----------------------------------------------------------------------------------+
```
- **Opened State (`SCR-08-OPEN`):** Crimson bow unties, twin-fingerprint clasp parts, lid pivots open `-112°` with golden volumetric light spill; camera frames open box on the left (`45%`) and elevates the configurable **Actual Birthday Gift Reveal Showcase** (`storyContent.ts → actualGift`) on the right (`55%`), followed by `[ Unlock Your After-Credits VIP Vault -> ]` and `[ Replay Gift Assembly ]`.
- **Fallback State:** Before `storyContent.ts → actualGift` (`populated: true`) and `/public/media/gift/actual-birthday-gift.webp` are supplied by the owner, displays the bespoke *Reserved Royal Gift Reveal* heirloom card (`"FOR YOUR HANDS, NOT JUST YOUR SCREEN — Personal Birthday Gift Slot Ready"`) without inventing a fake product.
- **Reverse Behaviour:** Scrolling upward prior to unboxing deterministically separates the ribbon, clasp, 8 star inlays, 7 filigree rings, vinyl medallion, and obsidian panels back into orbital suspension.
- **Acceptance Criteria:** `AT-08`, `AT-22`, `AT-23`, `AT-27`, `AT-29`, `AT-32`.

---

### `SCR-09` — AFTER-CREDITS: VIP PASSES & CALL (`OQ-04` RESOLVED)
- **Viewport Mode:** Spacious scrollable editorial finale (`min-height: 100dvh`, natural vertical scroll, zero scroll-hijacking).
- **Desktop Layout Diagram (`1440 × 900`):**
```text
+----------------------------------------------------------------------------------+
| U ♥ S // AFTER-CREDITS — PRIVATE VIP VAULT                             [Sound]   |
|   Redeemable remotely tonight across the distance, or at our next reunion ♥      |
|                                                                                  |
|   SWEET // PRINCESS TIER                                                         |
|   +-----------------------+  +-----------------------+  +----------------------+ |
|   | UCI-ROYAL-001         |  | UCI-PEACE-002         |  | UCI-NIGHT-003        | |
|   | Full Princess Day &   |  | Instant 'Win Any      |  | Midnight Drive &     | |
|   | Craving Run   [Flip]  |  | Argument' Card [Flip] |  | Your Playlist [Flip] | |
|   | [Remote Delivery +    |  | [Remote Anytime:      |  | [Next In-Person      | |
|   |  Reunion Princess Day]|  |  Call/Text/In-Person] |  |  Reunion Drive]      | |
|   +-----------------------+  +-----------------------+  +----------------------+ |
|                                                                                  |
|   AFTER-MIDNIGHT // 18+ SPICY 🔥                                                 |
|   +-----------------------+  +-----------------------+  +----------------------+ |
|   | UCI-HEAT-004          |  | UCI-CRAVE-005         |  | UCI-BOSS-006         | |
|   | 30-Min Uninterrupted  |  | Neck Kisses &         |  | Tonight, Pacarku     | |
|   | Massage       [Flip]  |  | Pin-Me-Down    [Flip] |  | Calls Every Shot     | |
|   | [Next In-Person       |  | [Next In-Person       |  | [Tonight on Private  | |
|   |  Reunion Priority]    |  |  Reunion Priority]    |  |  Call + Reunion]     | |
|   +-----------------------+  +-----------------------+  +----------------------+ |
|                                                                                  |
|      "Your birthday may happen once a year. But choosing you is something        |
|                             I want to do every day."                             |
|                                                                                  |
|                        [   CALL YOUR BOYFRIEND ❤️   ]                            |
|                  [ Replay From Opening ]   [ Jump to Chapter ]                   |
+----------------------------------------------------------------------------------+
```
- **Exact Visible Copy (`STORY_DATA.vipCoupons` verbatim + `OQ-04` Supplementary Redemption Guidance):**
  1. `id: "vip-01"` — `tier`: `"SWEET // PRINCESS TIER"` | `code`: `"UCI-ROYAL-001"` | `title`: `"Full Princess Day & Craving Run"` | `description`: `"Zero decisions required. Your favorite food, boba/dessert delivered, back rubs, and 100% passenger-princess privileges all day."` *(Supplementary Guidance: `Remote Delivery Tonight (Boba/Craving Run Ordered to Your Door) + Full In-Person Reunion Princess Day`)*
  2. `id: "vip-02"` — `tier`: `"SWEET // PRINCESS TIER"` | `code`: `"UCI-PEACE-002"` | `title`: `"Instant 'Win Any Argument' Trump Card"` | `description`: `"Play this card mid-debate. I immediately stop talking, admit you are right and gorgeous, and pull you into a forehead kiss."` *(Supplementary Guidance: `Redeemable Remotely Anytime (Call / FaceTime / Text) + Forehead Kiss Owed at Reunion`)*
  3. `id: "vip-03"` — `tier`: `"SWEET // PRINCESS TIER"` | `code`: `"UCI-NIGHT-003"` | `title`: `"Midnight Drive & Your Playlist Only"` | `description`: `"Windows down, late-night roads, your hand in mine over the console, and zero skips on whatever songs you want to sing."` *(Supplementary Guidance: `Reserved for Our Next In-Person Reunion (or Shared Late-Night Playlist Session Tonight)`)*
  4. `id: "vip-04"` — `tier`: `"AFTER-MIDNIGHT // 18+ SPICY 🔥"` | `code`: `"UCI-HEAT-004"` | `title`: `"30-Minute Uninterrupted Hands-On Massage"` | `description`: `"Lights dimmed, phones on Do Not Disturb. Shoulders, back, waist, and wherever else you tell my hands to stay—with no rush to stop."` *(Supplementary Guidance: `Next In-Person Reunion Priority Pass — Locked In for Our First Night Together`)*
  5. `id: "vip-05"` — `tier`: `"AFTER-MIDNIGHT // 18+ SPICY 🔥"` | `code`: `"UCI-CRAVE-005"` | `title`: `"Neck Kisses & Pin-Me-Down Pass"` | `description`: `"Redeemable whenever you're feeling clingy or needy. Instant drop-everything attention until you're completely breathless and smiling."` *(Supplementary Guidance: `Next In-Person Reunion Priority Pass — Redeemable the Second You're in My Arms`)*
  6. `id: "vip-06"` — `tier`: `"AFTER-MIDNIGHT // 18+ SPICY 🔥"` | `code`: `"UCI-BOSS-006"` | `title`: `"Tonight, Pacarku Calls Every Shot"` | `description`: `"Your rules, your pace, your secret fantasy. Whisper what you want in my ear and consider it done, cintaku."` *(Supplementary Guidance: `Dual Pass — Redeemable Tonight on Private Late-Night Call & Again at Our Next Reunion`)*
  - **Closing Vow (verbatim):** `"Your birthday may happen once a year. But choosing you is something I want to do every day."`
  - **Final CTA Button (verbatim):** `"CALL YOUR BOYFRIEND ❤️"`
- **Interactive Controls:** 3D card flip (`Click`/`Enter`); `Redeem This Pass` recording persisted ISO timestamp + screenshot-ready front/back view (`Unclaim / Reset` undo link); `CALL YOUR BOYFRIEND ❤️` button; `Replay From Opening` & `Jump to Chapter`.
- **Fallback State:** When `storyContent.ts → liveCall.url` is `""` (unconfigured), clicking `CALL YOUR BOYFRIEND ❤️` opens a warm luxury `<dialog>` call card (*"Pick up your phone and call him right now—he's waiting to hear your voice, pacarku ❤️"*) rather than an inactive button.
- **Acceptance Criteria:** `AT-01`, `AT-24`, `AT-25`, `AT-28`, `AT-29`, `AT-32`.
