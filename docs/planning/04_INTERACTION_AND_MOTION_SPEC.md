# 04 — INTERACTION, SCROLL & MOTION SPECIFICATION

**Document ID:** `DOC-04`  
**Covers Requirements:** `REQ-INT-01` through `REQ-INT-05`, `REQ-3D-05`, `REQ-QPA-03`

---

## 1. Animation Ownership Contract (Zero Library Contention)

To guarantee butter-smooth `60fps` desktop motion with zero property tug-of-war, animation authority is strictly partitioned:

| Layer / Target | Exclusive Owner | Prohibited From Touching |
| :--- | :--- | :--- |
| **Macro Scroll Progress, Section Pinning & Reversible 3D Assembly Timelines** | **GSAP + `ScrollTrigger`** writing normalized scalar progress (`0.0 → 1.0`) into `transientMotionState` | Framer Motion, CSS `transition` on 3D canvas containers |
| **Per-Frame 3D Mesh Transforms, Damped Pointer Rotation & Shader Uniforms** | **React Three Fiber `useFrame`** reading `transientMotionState` + pointer deltas via `THREE.MathUtils.damp` | Direct React `useState` per frame, CSS transforms |
| **Discrete React UI Overlays, Drawers, Buttons & Text Staggers** | **Framer Motion** (compositor-only `transform` & `opacity`) + CSS `@starting-style` for `<dialog>` | GSAP tweens on the same React DOM nodes |
| **2D Surface Erasure (Mirror Fog & Scratch Foil)** | **HTML5 2D Canvas (`requestAnimationFrame`-batched pointer strokes)** | React state updates on `pointermove` (throttled percentage commits at `10 Hz` max) |

---

## 2. Selective Scroll Choreography & Pinning Policy (`REQ-INT-01`)

**Golden Rule:** Never hijack `window` wheel events globally with a custom smooth-scroll wrapper that traps trackpad momentum or breaks native accessibility. Use native browser scrolling paired with **selective GSAP `ScrollTrigger` pinning** *only* where continuous scroll-scrubbed 3D disassembly adds genuine cinematic value:

| Stage | Scroll Behaviour | Pin Distance | Scrub Factor | Reverse Scroll (`Upward`) Behaviour |
| :--- | :--- | :--- | :--- | :--- |
| **00. Opening** | Locked `100dvh` pre-entry gate until `ENTER MY UNIVERSE` clicked | Unpinned gate | N/A | Chapter Rail jump `Replay Opening` restores portal cleanly |
| **01. Act I** | **Pinned Scroll Scrub** (`pin: true`) | `220vh` | `scrub: 0.65` | **100% Reversible:** Glass hemispheres close, 7 orbital rings nest back into gimbal lock, flank stars retract (`1.0 → 0.0`) |
| **01→02 Bridge** | Continuous unpinned scroll handoff | `90vh` | `scrub: 0.5` | Crystal fragments reconverge from Act II frames back to Act I orbit |
| **02. Act II** | Unpinned interactive room (`100dvh` stage + `80vh` exit convergence) | Exit `80vh` | `scrub: 0.6` | Interlocked mirror bezel separates back into 6 floating memory frames |
| **03. Act III** | Interactive viewport stage (`Step Through Mirror` unlocks/advances portal transition `110vh`) | Portal `110vh` | `scrub: 0.7` | Camera pulls backward out of turntable housing back through mirror surface |
| **04. Act IV** | Interactive deck (`4A` Turntable ↔ `4B` Constellation toggle/scroll `120vh`) | Handoff `120vh`| `scrub: 0.6` | 8 stars descend back into vinyl platter bearings; turntable re-materializes |
| **05. Act V** | Interactive Lab (`5A` Mixing → `5B` Scratch Vault) + `90vh` exit fold | Exit `90vh` | `scrub: 0.6` | Obsidian base facets unfold back to Act V vault stage |
| **06. Act VI** | Quiet `100dvh` hold chamber + `90vh` heart-rise horizon transition | Exit `90vh` | `scrub: 0.6` | Moonlit lake recedes downward; merged golden-rose heart returns to centre |
| **07. Act VII** | Stage-stepped Lake (`7A` Cake → `7B` Lantern → `7C` Unfolded Letter) | Natural scroll inside letter | `scrub: 0.5` | Scrolling upward revisits Lake panorama without erasing her wish or re-locking opened letter |
| **08. Final Gift**| **Pinned Sequence 3 Convergence** (`160vh`) → Interactive Unbox Stage | `160vh` | `scrub: 0.75` | **100% Reversible Pre-Open:** Gift box components gracefully separate back into orbital suspension when scrolled up; once opened, `Replay Gift Assembly` button replays convergence cleanly |
| **09. After-Credits**| Natural vertical editorial scroll | Unpinned | N/A | Smooth standard scroll back up into Gift Showcase |

**Anti-Trap Escape Hatch:** Every pinned or interactive stage includes a visible, unobtrusive `Continue / Skip Scene` control and full `ChapterRail` access so Uci is **never** trapped in any section.

---

## 3. Gesture Arbitration & Conflict-Resolution Matrix (`REQ-INT-02`)

Because desktop users scroll with mouse wheels/two-finger trackpads while also dragging 3D objects, wiping mirrors, scratching cards, and holding fingerprints, **explicit gesture arbitration (`src/engine/motion/gestureArbitrator.ts`)** enforces strict mutual exclusion:

| Active Surface / Mode | Wheel / Two-Finger Scroll | Primary Pointer Down + Move (`Drag`) | Hover Move (No Button Pressed) | Touch (`touch-action`) |
| :--- | :--- | :--- | :--- | :--- |
| **Act I — Gravity Sphere Hitbox** | Scrolls page normally (drives exploded view!) | Captures pointer (`setPointerCapture`) → rotates 3D sphere; suppresses text selection (`user-select: none`) | Subtle `±4°` parallax tilt | `touch-action: pan-y` on outer margin; `touch-action: none` strictly inside sphere drag ring |
| **Act I — `YOU` Star Handle** | Ignored while pointer captured during thread drag | Pulls golden spline thread toward `UCI` star (`snap radius: 64px`) | Magnetic pulse halo | `touch-action: none` on star handle |
| **Act III — Mirror Glass Canvas** | Scrolls only when cursor is in outer frame margin; inside mirror bounds during wipe, canvas does not scroll | Wipes condensation (`destination-out`, `45px` scaled radius) | Optional gentle cursor mist ripple (requires button press *or* explicit `Effortless Hover Wipe` toggle to erase fog, preventing accidental erasure while aiming for buttons) | `touch-action: none` on mirror `<canvas>` |
| **Act IV-A — Vinyl Platter** | Scrolls page when outside turntable plinth | Computes `atan2(y - cy, x - cx)` angular delta → scrubs platter RPM & audio pitch/scratch | Specular highlight tracks cursor | `touch-action: none` on platter mesh bounds |
| **Act IV-B — Constellation Stage** | Scrolls transition zone at bottom | Clicks/activates star node | Moves warm silk spotlight smoothly (`damp: 12`) | `touch-action: manipulation` (tap star moves spotlight & opens drawer) |
| **Act V-B — Foil Scratch Cards** | Scrolls page when cursor is between cards; never hijacks wheel | Scratches gold foil inside captured card `<canvas>` | Metallic foil sheen tilt (`±6°`) | `touch-action: none` strictly on unrevealed foil `<canvas>`; switches to `touch-action: auto` once `≥ 45%` dissolved! |
| **Act VI — Fingerprint Target** | Disabled during active 8s hold | Starts 8.0s continuous hold timer (`pointerdown` → `pointerup`/`pointercancel`) | Warm ridge breathing glow | `touch-action: none` + `-webkit-touch-callout: none` (prevents mobile long-press context menu!) |
| **Final Gift — Box & Ribbon** | Scrolls when outside box hitbox | Drag on box body orbits `360°`; drag/click directly on Crimson Bow unties ribbon (bow raycast priority `renderOrder: 10` > box orbit) | Cursor swaps to `grab` on box, `pointer` + bow-shimmer tooltip on ribbon | `touch-action: none` on gift box hitbox |

---

## 4. Canonical Timing, Easing & Physics Curves

- **Cinematic Camera & Mechanical Transforms:** `power3.inOut` (`cubic-bezier(0.65, 0, 0.35, 1)`) over `1.1s – 1.8s` — deliberate, weighted horological inertia.
- **3D Interactive Pointer Damping (`useFrame`):** `THREE.MathUtils.damp(current, target, lambda, delta)`:
  - Object Orbit Rotation: `lambda = 6.5` (silky, heavy luxury glass feel).
  - Silk Cursor Spotlight (Act IV-B): `lambda = 11.0` (responsive yet fluid).
  - Camera Mouse Parallax: `lambda = 3.5` (max amplitude `±0.18` world units).
- **UI Drawer & Modal Entrances:** `0.42s` `cubic-bezier(0.22, 1, 0.36, 1)` (crisp quintic ease-out); exit `0.26s` `ease-in`.
- **Comedic Alchemy Overheat (Act V):** Anticipation rumble (`0.55s`, high-frequency `±3px` damped oscillation) → Cork launch (`power4.out`, `0.45s`) → `999°C` gauge snap (`elastic.out(1, 0.5)`).
- **Heartbeat Hold Curve (Act VI):** Duration `8.00s` exact; BPM interpolates via `bpm(t) = 64 + 64 * Math.pow(t / 8, 1.35)` so acceleration feels organic and emotionally earned.

---

## 5. Full Keyboard & Reduced-Motion Choreography (`REQ-INT-04`, `REQ-QPA-03`)

### 5.1 Keyboard Equivalents for Every Tactile Gesture
No interaction relies solely on fine pointer dexterity:
- **3D Rotation (Act I & Final Gift):** Stage focusable (`tabIndex={0}`, `role="application"` with clear aria instructions or paired accessible rotation buttons): `ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown` rotate `15°` per press.
- **Act I Star Bridge:** Focusable `Connect Our Skies` button triggers the golden filament arc animation identically to pointer drag.
- **Act III Mirror Wiping:** Focusable `Wipe Mirror Glass (+25%)` / `Reveal Next Secret Note` keyboard control reveals each of the 5 notes sequentially with the same glow and chime.
- **Act IV-A Turntable:** `Drop / Lift Tonearm`, `Side A / Side B` radio switch, `Scratch / Spin Boost` key button, and `Send Kiss 💋` button are all standard `<button>` controls.
- **Act IV-B Constellation:** All 8 stars are rendered as keyboard-focusable `<button>` pins synchronized to 3D star projected screen coordinates; `Tab` moves the silk spotlight directly onto the focused star!
- **Act V Scratch Cards:** Each card provides a keyboard-focusable `Scratch & Reveal Confession` button that runs an animated diagonal foil-wipe sweep and triggers the `45%` dissolve.
- **Act VI 8-Second Hold:** Holding `Space` or `Enter` on the Fingerprint Target button drives the exact 8-second timer (ignoring OS key-repeat `event.repeat === true` so holding `Space` continuously never resets the timer!).
- **Act VII Candle & Wax Seal:** `Hold to Blow Out Candle` works identically with `Space`/`Enter` hold; `Open Wax Seal` activates on `Enter`/`Space`.

### 5.2 `prefers-reduced-motion` Mode
Detected automatically via `window.matchMedia('(prefers-reduced-motion: reduce)')` AND manually toggleable anytime in `ComfortControls`:
- Replaces flying Z-axis camera rushes (Opening → Act I, Act III through-mirror zoom) with gentle `0.5s` cross-dissolves and static, well-framed camera presets.
- Disables continuous background particle turbulence, comedic screen shake (Act V), and ambient floating bob; preserves **all** interactive state changes (exploded view positions, mirror reveals, scratch reveals, gift lid opening, VIP card flips via crisp crossfade rather than 3D spin).
