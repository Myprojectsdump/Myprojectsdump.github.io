# 05 — THREE.JS & WEBGL SCENE ARCHITECTURE

**Document ID:** `DOC-05`  
**Covers Requirements:** `REQ-3D-01` through `REQ-3D-05`, `REQ-STR-01` through `REQ-STR-09A`

---

## 1. Persistent Single-Canvas Rendering Architecture (`REQ-3D-01`)

The entire experience renders inside **one persistent `<Canvas>`** (`src/engine/webgl/PersistentStage.tsx`) mounted at `position: fixed; inset: 0; z-index: 0;` behind semantic React story stages (`z-index: 10`) and top-layer `<dialog>` / HUD overlays (`z-index: 30`).

### 1.1 Context & Pipeline Configuration
- **Renderer:** `WebGLRenderer({ antialias: true, powerPreference: 'high-performance', alpha: false, stencil: false })`.
- **Color Management:** `THREE.SRGBColorSpace` output; `THREE.ACESFilmicToneMapping` (`toneMappingExposure = 1.08`).
- **Adaptive DPR:** `dpr={[1, Math.min(window.devicePixelRatio, 1.75)]}` (dynamically stepped down to `1.0` if rolling 45-frame average exceeds `21ms/frame`).
- **Postprocessing Policy:** Zero heavy multi-pass SSR or Bokeh DOF. Selective glow is achieved primarily via custom additive fresnel/halo meshes, emissive bloom sprites, and at most a single lightweight half-resolution mipmap `<Bloom luminanceThreshold={0.88} mipmapBlur intensity={0.55} />` disabled automatically on low-tier GPUs or `prefers-reduced-motion`.
- **Visibility & Idle Throttling:** When `document.hidden === true` or a blocking full-parchment view obscures the stage, `frameloop` switches from `'always'` to `'demand'`, dropping GPU load to `0%`.
- **Context-Loss Recovery:** Attaches `webglcontextlost` (`event.preventDefault()`) and `webglcontextrestored` listeners on `gl.domElement` to rebuild procedural materials and resume from `useExperienceStore.getState().currentChapter` without crashing React; if WebGL initialization fails entirely, mounts `<WebGLFallbackStage />`.

### 1.2 Shared Material & Geometry Pool (`src/engine/webgl/materials/luxuryMaterials.ts`)
Instantiated once in a singleton registry and shared across all three sequences (zero duplicate shader compilations; disposed cleanly on unmount via `AssetDisposal.ts`):
1. `MAT_BOROSILICATE_GLASS`: `MeshPhysicalMaterial({ color: '#ffffff', transmission: 0.92, opacity: 1, transparent: true, roughness: 0.08, ior: 1.52, thickness: 0.45, attenuationColor: '#FDA4AF', attenuationDistance: 2.4 })`.
2. `MAT_BRUSHED_OBSIDIAN`: `MeshStandardMaterial({ color: '#07070C', metalness: 0.82, roughness: 0.28 })` (procedural anisotropic normal micro-striation CanvasTexture `256×256`).
3. `MAT_CHAMPAGNE_GOLD`: `MeshStandardMaterial({ color: '#FDE68A', metalness: 0.94, roughness: 0.18 })`.
4. `MAT_ROSE_GOLD_CORE`: `MeshStandardMaterial({ color: '#F472B6', emissive: '#E11D48', emissiveIntensity: 0.45, metalness: 0.88, roughness: 0.20 })`.
5. `MAT_CRIMSON_SILK`: `MeshPhysicalMaterial({ color: '#E11D48', roughness: 0.36, metalness: 0.12, sheen: 1.0, sheenRoughness: 0.25, sheenColor: '#FDA4AF' })`.
6. `MAT_VINYL_GROOVE`: `MeshStandardMaterial({ color: '#050508', metalness: 0.45, roughness: 0.22 })` with procedural radial sine-groove `bumpMap` (`512×512` procedural CanvasTexture—zero external texture download required).

### 1.3 Procedural-First Asset Strategy (Zero Unavailable Paid GLBs)
All signature mechanical and cosmic assemblies are constructed from **precision procedural Three.js geometries** (`LatheGeometry`, `ExtrudeGeometry` with bevelled SVG heart/clasp paths, `TubeGeometry` catenary splines, `RingGeometry`, `CylinderGeometry`, `SphereGeometry` hemispheres, and `InstancedMesh` particles), with optional clean `<Suspense>` GLB override hooks (`public/media/models/*.glb`) if custom sculpted meshes are ever dropped in later. Every mesh exists out-of-the-box with zero external asset dependency.

---

## 2. Camera Ownership & Keyframe Choreography (`CameraRig.tsx`)

One `PerspectiveCamera` (`near: 0.1, far: 120`) is owned exclusively by `CameraRig.tsx`. No child scene mutates `camera.position` directly; instead, `CameraRig` interpolates between canonical stage presets driven by `transientMotionState`:

| Stage | Camera Position `(x, y, z)` | LookAt Target `(x, y, z)` | Base FOV (`1440×900`) | Transition Motion |
| :--- | :--- | :--- | :--- | :--- |
| **00. Opening** | `(0.0, 0.0, 14.0)` | `(0.0, 0.0, 0.0)` | `40°` | Static void + subtle breathing Z-drift `±0.08` |
| **01. Act I** | `(0.0, 0.2, 6.4)` → `(0.0, 0.4, 8.2)` | `(0.0, 0.0, 0.0)` | `40°` | Pulls back gently during exploded view to frame `YOU` & `UCI` flank stars |
| **02. Act II** | `(0.0, 0.0, 7.0)` | `(0.0, 0.0, -1.5)` | `42°` | Gentle parallax pan (`±0.4` X/Y) across floating keepsakes |
| **03. Act III** | `(0.0, 0.0, 4.8)` → `(0.0, 0.0, -0.6)` | `(0.0, 0.0, -1.0)` | `38°` | **Portal Dive:** Travels straight *through* the rippling mirror plane (`z: 0`) |
| **04A. Vinyl** | `(-1.15, 2.35, 3.85)` | `(-0.9, 0.0, 0.0)` | `38°` | Hero 38° horological three-quarter angle framing turntable on left |
| **04B. Stars** | `(0.0, 0.0, 7.5)` | `(0.0, 0.0, 0.0)` | `40°` | Lifts overhead and pulls back as room pitches to `#040407` black |
| **05. Alchemy** | `(0.0, 0.35, 5.6)` | `(0.0, 0.2, 0.0)` | `40°` | Straight-on laboratory elevation framing central flask & 4 vials |
| **06. Distance**| `(0.0, 0.0, 5.2)` | `(0.0, 0.0, 0.0)` | `38°` | Intimate eye-level framing twin fingerprint structures |
| **07. Lake** | `(0.0, 1.15, 6.2)` → `(0.0, 2.4, 6.8)` | `(0.0, 0.5, 0.0)` | `42°` | Tilts gently skyward (`lookAt.y: 0.5 → 2.2`) as fireflies & lantern ascend |
| **08. Gift Box**| `(0.0, 1.45, 5.1)` → `(-0.95, 1.3, 4.6)`| `(0.0, 0.15, 0.0)` | `38°` | Hero centre convergence → glides left on lid open to frame Gift Showcase |
| **09. VIP Vault**| `(0.0, 1.8, 7.8)` | `(0.0, 0.0, 0.0)` | `40°` | Softened background bokeh glow behind scrollable VIP Vault DOM |

*(For `1366×768` and `1280×720`, `CameraRig` applies a responsive aspect-ratio FOV compensation `+2°` so horizontal flanks and vertical rings never clip.)*

---

## 3. Inter-Sequence Mechanical Continuity Architecture

To ensure transitions never look like hidden mesh swaps, the three sequences hand off shared visual structures through **explicit mechanical & spatial bridges**:

1. **Sequence 1 → Sequence 2 Bridge (Acts I → II → III → IV-A):**
   - Act I's `12` crystal fragments (`OBJ-01-CRYSTALS`) decelerate and align co-planar with `6` brushed-champagne memory frame bezels (`OBJ-02-FRAMES`).
   - At Act II exit, the `6` memory bezels slide along planar spline rails to form a closed hexagonal/stadium **Vanity Mirror Bezel** (`OBJ-03-MIRROR-RIG`), while warm steam particles obscure the plane.
   - When all 5 mirror notes are found, the mirror glass ripples via vertex sine displacement and fades `transmission → 1.0`, while the outer bezel splits along `z`-layers into **4 counter-rotating horological rings** that physically become the outer gimbal bezel surrounding Act IV-A's **Dual-Soul Turntable plinth** (`OBJ-04-TURNTABLE`) positioned directly at `z = -2.2` behind the mirror plane!
2. **Within Sequence 2 (Act IV-A → IV-B → Act V):**
   - Act IV-A's vinyl platter contains **8 embedded rose-gold bearing jewels** (`OBJ-04-BEARINGS`) visible beneath its translucent centre label ring. When transitioning to IV-B, the black PVC disc fades/dissolves into obsidian particles while those exact 8 bearing jewels elevate to their normalized `(x%, y%)` world coordinates as the **8 Goosebump Constellation Stars** (`OBJ-05-CONSTELLATION`).
   - At Act IV-B completion, all 8 stars spiral downward into `(0, -0.4, 0)` as the turntable's central brass spindle extrudes vertically via animated scale/morph into the champagne caliper cage of Act V's **Borosilicate Alchemy Vessel** (`OBJ-06-ALCHEMY`).
3. **Sequence 2 → Sequence 3 Convergence (Acts V → VI → VII → Final Gift Reveal):**
   - Act V's 4 gold scratch cards fold into **4 obsidian-and-gold chassis panels** parked smoothly in deep-space orbit.
   - Act VI's **Twin Fingerprints** (`OBJ-07-FINGERPRINTS`) fuse into the **Golden-Rose Heart Core**, which hovers as a celestial reflection over Act VII's **Moonlit Lake** (`OBJ-08-LAKE`).
   - Entering `FINAL GIFT REVEAL`, `Sequence3ImpossibleGift` executes a multi-part assembly where the 4 obsidian chassis panels + 2 lid halves lock into the **Luxury Gift Box** (`OBJ-09-GIFTBOX`), Act I's **7 Orbital Rings** sweep back around the box corners as golden filigree, Act IV's **Vinyl Platter** locks beneath as the spun gold pedestal medallion, Act IV-B's **8 Stars** seat into the 8 lid bevel sockets, Act VI's **Heart Core & Twin Fingerprint Arcs** lock into the front gem clasp, and the **Crimson Silk Ribbon** wraps and ties across the crown.

---

## 4. Master 3D Object Specification Catalog (`REQ-3D-02` to `REQ-3D-05`)

Every major 3D object implements all 14 architectural attributes mandated by Section 10.2:

### `OBJ-01` — THE GRAVITY ENGINE (`GravitySphereGroup.tsx`)
- **Object ID:** `OBJ-01-GRAVITY-ENGINE`
- **Scene / Sequence:** Sequence 1 (Opening exit → Act I → Act II bridge)
- **Parent:** `Sequence1RootGroup` (`position: [0, 0, 0]`)
- **Children:** `GlassShellNorth`, `GlassShellSouth`, `OrbitalRingsGroup` (`Ring_01`..`Ring_07`), `HeartCoreMesh`, `CrystalFragmentsInstanced` (`count: 12`), `CosmicDustPoints` (`count: 1400` high / `700` low)
- **Independent Mesh Components:**
  - `GlassShellNorth` / `GlassShellSouth`: Upper & lower `SphereGeometry(1.55, 64, 32, 0, 2π, 0, π/2)` with inner bevel lip ring.
  - `Ring_01`..`Ring_07`: Seven concentric `TorusGeometry(r_i, 0.018, 16, 100)` (`r = 1.68` to `2.45`) each with engraved chapter tick marks.
  - `HeartCoreMesh`: Bevelled `ExtrudeGeometry` 3D heart (`scale: 0.42`) + inner point light + fresnel halo mesh.
  - `CrystalFragmentsInstanced`: 12 faceted `OctahedronGeometry(0.11, 0)` shards.
- **Pivot Points:** Root pivot `(0,0,0)` for user rotation; `GlassShellNorth` local pivot `(0, 0.02, 0)`; `GlassShellSouth` local pivot `(0, -0.02, 0)`; each `Ring_i` pivoted at `(0,0,0)` on independent Euler gimbal axes.
- **Material:** Shells: `MAT_BOROSILICATE_GLASS`; Rings: `MAT_CHAMPAGNE_GOLD`; Heart: `MAT_ROSE_GOLD_CORE`; Shards: `MAT_BOROSILICATE_GLASS` + rose attenuation.
- **Lighting:** Internal `PointLight('#F472B6', intensity: 2.2, distance: 6)` + Key `DirectionalLight('#F5EBDD', 1.2)` + Rim `SpotLight('#FDE68A', 1.6)`.
- **Animation Start State (`scroll = 0.0`):** Shells closed (`y = 0, rotZ = 0`); Rings nested tightly (`scale = 0.88..1.0`); Heart enclosed at `(0,0,0)`; Dust drifting brownian motion.
- **Animation End State (`scroll = 1.0`):** `GlassShellNorth.position.y = +1.95, rotZ = +0.31 rad`; `GlassShellSouth.position.y = -1.95, rotZ = -0.31 rad`; `Ring_01..07` expanded radially (`scale = 1.15..1.85`) at distinct tilts; Heart unobstructed pulsing `1.0 → 1.08`; Dust aligned to 3 orbital planes.
- **Mouse Interaction:** Pointer drag rotates `GravityUserOrbitGroup` smoothly (`damp = 6.5`); individual rings subtly highlight emissive intensity on raycast hover.
- **Scroll Interaction:** Driven continuously by Act I `ScrollTrigger` (`0.0 → 1.0`).
- **Reverse Behaviour:** Scrolling `1.0 → 0.0` deterministically interpolates all translations, Euler tilts, and particle orbit weights back to closed sphere state.
- **Asset Format:** 100% Procedural Three.js geometry (optional GLB hook `public/media/models/heart-core.glb`).

---

### `OBJ-02` — TWIN SKY STARS & GOLDEN BRIDGE (`StarBridgeGroup.tsx`)
- **Object ID:** `OBJ-02-STAR-BRIDGE`
- **Scene / Sequence:** Sequence 1 (Act I culmination)
- **Parent:** `Sequence1RootGroup`
- **Children:** `StarLeftYou`, `StarRightUci`, `GoldenBridgeTube`, `BridgeSparkParticles`
- **Independent Mesh Components:** Two multi-layered star cores (`IcosahedronGeometry(0.14, 2)` + additive corona billboards) + dynamic `TubeGeometry` over `QuadraticBezierCurve3(pYou, pApex, pUci)`.
- **Pivot Points:** `StarLeftYou` at `(-3.6, 0.25, 0)`; `StarRightUci` at `(+3.6, 0.25, 0)`; `pApex` at `(0, 1.35, 0.4)`.
- **Material:** Stars & Tube: `MAT_CHAMPAGNE_GOLD` with animated `uDrawProgress` shader uniform (`0.0 → 1.0`).
- **Lighting:** Twin warm `PointLight('#FDE68A', 1.4, 4)` at star anchors; bridge completion boosts ambient rose-gold fill `+35%`.
- **Animation Start State:** Emerges at Act I `scroll ≥ 0.80` (`scale: 0 → 1`); `uDrawProgress = 0`.
- **Animation End State:** `uDrawProgress = 1.0` locked between `YOU` and `UCI` with flowing golden pulse wave.
- **Mouse Interaction:** Dragging from `StarLeftYou` updates live Bezier tip toward cursor and snaps to `StarRightUci` within `64px` screen radius.
- **Scroll Interaction:** Appears in upper range of Act I scroll; fades cleanly into peripheral starlight on transition to Act II.
- **Reverse Behaviour:** Scrolling back below `0.80` retracts star anchors smoothly while preserving `bridgeConnected` completion flag in store so she never loses voice-note unlock unless replaying.
- **Asset Format:** Procedural geometry + lightweight custom GLSL progress shader.

---

### `OBJ-03` — FLOATING MEMORY FRAMES CLUSTER (`MemoryFramesCluster.tsx`)
- **Object ID:** `OBJ-03-MEMORY-CLUSTER`
- **Scene / Sequence:** Sequence 1 → Sequence 2 Handoff (Act II)
- **Parent:** `Sequence1RootGroup`
- **Children:** `MemoryArtifact_01` through `MemoryArtifact_06` (supports 5–8 items dynamically from `storyContent.memories`)
- **Independent Mesh Components:** Each artifact has distinct silhouette meshes inside a champagne-gold bezel (`01`: Glass Polaroid Slab; `02`: Faceted Prism Ticket; `03`: Wax-Crested Folded Capsule; `04`: Mini Spinning Melody Locket; `05`: Waveform Glass Vial; `06`: Velvet Envelope Plaque).
- **Pivot Points:** Individual local centers arranged in a spacious golden-angle 3D ellipse (`x ∈ [-3.4, +3.4], y ∈ [-1.5, +1.5], z ∈ [-1.2, +0.8]`).
- **Material:** `MAT_BOROSILICATE_GLASS` + `MAT_CHAMPAGNE_GOLD` + `MAT_VELVET` (`#14050A`).
- **Lighting:** Soft gallery spot array + warm hover rim boost.
- **Animation Start State:** Morphs in from Act I's 12 crystal fragments settling into zero-G bobbing (`sin(t * 0.9 + phase) * 0.08`).
- **Animation End State (Act II → III Exit):** The 6 outer champagne bezels glide along spline paths to `z = 0`, interlocking radially into Act III's mirror frame perimeter.
- **Mouse Interaction:** Raycast hover tilts card toward pointer + boosts champagne glow; click opens `<dialog>` Memory Inspector `SCR-02M`.
- **Scroll Interaction:** Act II exit scroll (`0.0 → 1.0`) drives bezel convergence into mirror frame.
- **Reverse Behaviour:** Scrolling upward from Act III entrance separates the mirror bezel back into the 6 floating memory keepsakes.
- **Asset Format:** Procedural Three.js geometry.

---

### `OBJ-04` — MECHANICAL MIRROR & PORTAL BEZEL (`MechanicalMirrorRig.tsx`)
- **Object ID:** `OBJ-04-MIRROR-RIG`
- **Scene / Sequence:** Sequence 2 (Act III → Act IV-A portal)
- **Parent:** `Sequence2RootGroup`
- **Children:** `MirrorReflectivePlane`, `HorologicalBezelRing_1..4`, `SteamMotesInstanced`
- **Independent Mesh Components:** Rounded-rectangle mirror backing plane (`3.8 × 2.15` world units) overlaid in screen alignment with 2D `FogMirrorCanvas`; 4 concentric bevelled metallic bezel tracks with gear-tooth ticks.
- **Pivot Points:** Geometric centre `(0, 0, 0)`.
- **Material:** Plane: high-metalness warm tinted mirror shader + ripple displacement uniform `uRipple`; Rings: `MAT_CHAMPAGNE_GOLD` & `MAT_BRUSHED_OBSIDIAN`.
- **Lighting:** Warm bathroom vanity sconces `PointLight('#FDE68A', 1.5)` left/right + rose-gold backglow `#F472B6`.
- **Animation Start State:** Assembled flat vanity bezel (`z = 0`), `uRipple = 0`, opaque reflective backing.
- **Animation End State (Portal Dive):** `uRipple` pulses `0 → 1 → 0.2`; plane `opacity: 1 → 0`; `HorologicalBezelRing_1..4` separate along `Z` (`z = +0.6, +0.2, -0.4, -1.0`) rotating `±45°` as camera passes through `(0,0,0)` to `z = -0.6` facing `OBJ-05-TURNTABLE` at `z = -2.2`.
- **Mouse Interaction:** 2D `FogMirrorCanvas` captures wiping strokes; bezel tracks subtle specular reflection.
- **Scroll Interaction:** Portal transition timeline (`0.0 → 1.0`) scrubs camera passage & ring separation.
- **Reverse Behaviour:** Scrolling backward pulls camera back through `z = 0` and locks the 4 horological rings flush into the vanity mirror frame.
- **Asset Format:** Procedural geometry + custom vertex-ripple shader.

---

### `OBJ-05` — THE DUAL-SOUL TURNTABLE (`DualSoulTurntable.tsx`)
- **Object ID:** `OBJ-05-TURNTABLE`
- **Scene / Sequence:** Sequence 2 (Act IV-A)
- **Parent:** `Sequence2RootGroup` (`position: [-0.95, -0.15, -2.2]` relative to portal, normalized to stage origin when active)
- **Children:** `ObsidianPlinth`, `PlatterBaseMedallion`, `VinylDiscMesh`, `CentreLabelMesh`, `EmbeddedStarBearings_1..8`, `GimbalTonearmGroup` (`TonearmBase`, `TonearmCounterweight`, `TonearmTube`, `HeadshellNeedle`), `PitchSliderKnob`, `FloatingLipstickParticles`
- **Independent Mesh Components:** 15 named sub-meshes enabling independent platter spin, tonearm yaw (`rotY`) + needle drop (`rotX`), and bearing extraction.
- **Pivot Points:** Platter pivot `(0, 0.12, 0)`; Tonearm gimbal pivot `(+1.38, 0.24, -0.95)` (`rest rotY = 0°`, `playing outer groove rotY = -24°`, `inner groove = -36°`, `drop rotX = -4.5°`).
- **Material:** Plinth: `MAT_BRUSHED_OBSIDIAN`; Platter Base & Tonearm: `MAT_CHAMPAGNE_GOLD`; Disc: `MAT_VINYL_GROOVE`; Label & Accents: switches dynamically between Blush/Champagne (Side A) and Crimson Velvet `#E11D48` (Side B).
- **Lighting:** Mode-switched studio rig — Side A: warm golden sunlight key (`#FDE68A`, `1.8`) + `#FDA4AF` fill; Side B: moody `#E11D48` crimson rim + `#F472B6` low-angle neon grazing light across grooves.
- **Animation Start State:** Tonearm resting (`rotY = 0`), platter stationary (`rpm = 0`), Side A active.
- **Animation End State (Handoff to IV-B):** Tonearm lifts to rest; platter slows to `0`; `VinylDiscMesh` dissolves (`opacity → 0`); `EmbeddedStarBearings_1..8` lift out of platter sockets along `+Y/+Z`.
- **Mouse Interaction:** Click `GimbalTonearmGroup` toggles play/stop; rotary pointer drag on `VinylDiscMesh` controls angular velocity (`ω`) and Web Audio playback rate/scratch; `Send Kiss` spawns `FloatingLipstickParticles`.
- **Scroll Interaction:** Handoff scroll scrubs transition between `4A` Turntable and `4B` Constellation.
- **Reverse Behaviour:** Reversing from `4B` returns the 8 star bearings into their platter sockets and rematerializes the grooved vinyl disc.
- **Asset Format:** Procedural Three.js geometry + procedural radial groove bump texture + circular SVG/Canvas groove text texture.

---

### `OBJ-06` — GOOSEBUMP CONSTELLATION ASTROLABE (`ConstellationAstrolabe.tsx`)
- **Object ID:** `OBJ-06-CONSTELLATION`
- **Scene / Sequence:** Sequence 2 (Act IV-B)
- **Parent:** `Sequence2RootGroup`
- **Children:** `StarNode_01`..`StarNode_08`, `ConstellationFilamentsGroup`, `CursorSilkSpotlight`, `FaintAstrolabeGrid`
- **Independent Mesh Components:** 8 star jewel assemblies (faceted core + pulsing halo sprite) positioned in world space matching the exact `(x%, y%)` coordinates from `STORY_DATA.constellationNodes`; dynamic golden line tubes connecting discovered nodes in order; cursor-following `SpotLight`.
- **Pivot Points:** Individual star centers mapped via camera frustum projection at `z = 0` plane (`eyes`, `laugh`, `lips`, `neck`, `bites`, `waist`, `voice`, `heart`).
- **Material:** Undiscovered star: dim champagne crystal (`emissiveIntensity: 0.25`, brightens to `1.1` inside cursor spotlight); Discovered `soul` star: `#FDE68A` (`emissiveIntensity: 1.8`); Discovered `spicy` star: `#F472B6` / `#E11D48` core (`emissiveIntensity: 2.1`).
- **Lighting:** Near-black ambient (`0.06`) + warm silk `SpotLight('#FDE68A', intensity: 3.2, angle: 0.34, penumbra: 0.9)` smoothed to cursor position.
- **Animation Start State:** 8 bearings arrive from turntable platter into their exact 8 sky coordinates; `0` filaments drawn.
- **Animation End State:** All 8 stars ignited + connected + radial supernova shimmer → all 8 spiral down into `(0, -0.4, 0)` spindle for Act V.
- **Mouse Interaction:** Pointer moves `CursorSilkSpotlight`; clicking any star ignites node, draws golden line, fires optional `"spicy"` haptic pulse, and opens Discovery Drawer.
- **Scroll Interaction:** Exit scroll spirals the 8 stars down into the central alchemy column.
- **Reverse Behaviour:** Scrolling back up lifts the 8 stars back out to their constellation coordinates with all previously discovered golden filaments intact.
- **Asset Format:** Procedural geometry + custom additive glow sprites.

---

### `OBJ-07` — ALCHEMY VESSEL & FOUR VIALS (`AlchemyVesselRig.tsx`)
- **Object ID:** `OBJ-07-ALCHEMY`
- **Scene / Sequence:** Sequence 2 → Sequence 3 Handoff (Act V)
- **Parent:** `Sequence2RootGroup`
- **Children:** `BorosilicateFlaskMesh`, `InternalLiquidMesh`, `ChampagneCaliperCage`, `CorkStopperMesh`, `IngredientVial_1..4`, `PourStreamParticles`, `OverheatSparkFountain`, `ScratchPlateProxies_1..4`
- **Independent Mesh Components:** Lathe-profiled round-bottom luxury alchemy flask (`radius: 0.95`, long fluted neck); internal clipped liquid shader mesh (`uFillLevel: 0.05 → 1.0`, `uLiquidColor`, `uBoilAmplitude`); removable `CorkStopperMesh`; 4 surrounding crystal vials on brass arms.
- **Pivot Points:** Flask centre `(0, -0.2, 0)`; `CorkStopperMesh` at `(0, +1.18, 0)`; `IngredientVial_1..4` pivoted at neck collars so they tilt `115°` inward toward flask mouth `(0, +1.35, 0)` when clicked.
- **Material:** Flask & Vials: `MAT_BOROSILICATE_GLASS`; Cage: `MAT_CHAMPAGNE_GOLD`; Liquid: custom two-tone fresnel fluid shader interpolating `#FDA4AF` → `#FDE68A` → `#F472B6` → `#E11D48`.
- **Lighting:** Internal fluid `PointLight` whose colour and intensity (`1.0 → 4.5`) match poured ingredients, culminating in pulsing `#E11D48` crimson lab alert strobe (gentle pulse in reduced-motion).
- **Animation Start State:** `uFillLevel = 0.05`, temp `37°C`, cork seated, 4 vials full.
- **Animation End State:** 4th vial poured → `uFillLevel = 1.0`, `uBoilAmplitude = 1.0`, `CorkStopperMesh` launches to `y = +8.5` with ballistic arc + spark burst, temp `999°C` → flask recedes gracefully as 2D/3D-framed 4 Gold Scratch Cards present; upon exit, 4 metallic plates fold into obsidian chassis panels.
- **Mouse Interaction:** Clicking each vial triggers its pour choreography; 2D `FoilScratchCanvas` handles 45%-threshold card scratching.
- **Scroll Interaction:** Exit scroll folds metallic plates into orbital storage and dims laboratory into Act VI's quiet chamber.
- **Reverse Behaviour:** Scrolling back from Act VI restores the completed Scratch Vault (and `Replay Alchemy Mix` button resets flask to `37°C` anytime).
- **Asset Format:** Procedural `LatheGeometry` + custom GLSL liquid level/meniscus shader.

---

### `OBJ-08` — TWIN FINGERPRINT STRUCTURES & SILK BRIDGE (`TwinFingerprintField.tsx`)
- **Object ID:** `OBJ-08-FINGERPRINTS`
- **Scene / Sequence:** Sequence 3 Kickoff (Act VI)
- **Parent:** `Sequence3RootGroup`
- **Children:** `FingerprintLeftHim`, `FingerprintRightUci`, `GoldenSilkSplines`, `MergedGoldenRoseHeart`
- **Independent Mesh Components:** Each fingerprint consists of 11 concentric interrupted ridge-arc `TubeGeometry` contours forming an unmistakable luminous whorl pattern; 24 braided Bezier silk filaments bridging them; central `MergedGoldenRoseHeart`.
- **Pivot Points:** `FingerprintLeftHim` starts at `(-1.85, 0, 0)`; `FingerprintRightUci` starts at `(+1.85, 0, 0)`; convergence origin `(0, 0, 0)`.
- **Material:** Ridges & Silk: emissive `MAT_CHAMPAGNE_GOLD` blended with `#F472B6` rose-gold (`uHoldProgress`, `uHeartbeatPulse`).
- **Lighting:** Intimate dual rose-amber `PointLight` (`distance: 4.5`), pulsing cleanly at current simulated BPM (`64 → 128 BPM`).
- **Animation Start State (`hold = 0.0s`):** Separated by `3.7` units; steady `64 BPM` glow on left print; inviting breathing rim on right print.
- **Animation End State (`hold = 8.0s`):** Distance closes `3.7 → 0.0`; ridge arcs interleave and morph/cross-fade into `MergedGoldenRoseHeart` pulsing warmly at `(0, 0, 0)` while twin outer ridge arcs remain preserved for Sequence 3's gift clasp!
- **Mouse Interaction:** Continuous `pointerdown` hold (or `Space`/`Enter` hold) advances `0.0s → 8.0s`; early release gently eases back with reassuring whisper.
- **Scroll Interaction:** Post-completion scroll elevates `MergedGoldenRoseHeart` to `(0, +1.8, -1.5)` as Act VII's moonlit lake horizon unfolds below.
- **Reverse Behaviour:** Scrolling upward from Act VII lowers the merged heart back into the quiet chamber with `Replay Ritual` ready.
- **Asset Format:** Procedural parametric whorl `TubeGeometry` + `InstancedMesh` silk particles.

---

### `OBJ-09` — MOONLIT LAKE, CAKE, FIREFLIES & LANTERN (`MoonlitLakeDiorama.tsx`)
- **Object ID:** `OBJ-09-MOONLIT-LAKE`
- **Scene / Sequence:** Sequence 3 (Act VII Stages A, B, C)
- **Parent:** `Sequence3RootGroup`
- **Children:** `MoonlitWaterPlane`, `ArtisanCakeGroup` (`CakeTierBase`, `CakeTierTop`, `GoldLeafTrim`, `PorcelainPedestal`, `CandleWaxCylinder`, `CandleFlameShaderMesh`, `WickSmokeParticles`), `FirefliesInstanced` (`count: 60`), `HeroSkyLanternGroup`, `BackgroundLanternsInstanced` (`count: 10`), `WaxSealedEnvelopeGroup` (`EnvelopeBody`, `EnvelopeTopFlap`, `CrimsonWaxSealLeft`, `CrimsonWaxSealRight`)
- **Independent Mesh Components:**
  - `MoonlitWaterPlane`: Subtle normal-rippled reflective dark-indigo plane (`y = -1.15`).
  - `CandleFlameShaderMesh`: Teardrop mesh deformed in vertex shader by `uWindBend` (`0.0 → 1.4` from mic RMS or button hold) and extinguished smoothly at `uExtinguish = 1.0`.
  - `FirefliesInstanced`: Exact **60** golden-amber instanced glowing spheres rising along helical curl-noise trajectories into `HeroSkyLanternGroup`.
  - `HeroSkyLanternGroup`: Translucent warm-parchment `LatheGeometry` lantern (`internal PointLight` shifts golden `#FDE68A` → warm rose-crimson ember if naughty-wish checkbox is ticked!).
  - `WaxSealedEnvelopeGroup`: 3D tactile envelope with two-piece fracture `U ♥ S` crimson wax seal that cracks apart (`±0.18` X separation + particle burst) before handing off seamlessly to the crisp high-DPI DOM unfolded parchment letter sheet.
- **Pivot Points:** Cake at `(0, -0.65, 1.4)`; Candle flame base at `(0, +0.28, 1.4)`; Lantern hovers at `(-0.85, 0.55, 0.6)` before ascending to `y = +12.0`; Envelope centers at `(0, 0.1, 2.2)`.
- **Material:** Water: dark specular sapphire; Cake: velvet obsidian/cream + `MAT_CHAMPAGNE_GOLD` leaf; Lantern: subsurface translucent `#F5EBDD`; Wax Seal: `MAT_CRIMSON_SILK`/wax (`roughness: 0.32`).
- **Lighting:** Cool silver-blue moonlight `DirectionalLight('#DCE7FF', 0.95)` + warm `PointLight('#FDE68A', 2.2)` attached to candle flame, transferring smoothly to the 60 fireflies and sky lantern interior upon extinguish!
- **Animation Start State:** Stage 7A — Lit candle flickering gently over quiet lake reflection.
- **Animation End State:** Stage 7A candle extinguished → Stage 7B 60 fireflies gather in lantern & ascend with 10 distant horizon lanterns → Stage 7C `U ♥ S` crimson wax seal cracks and unfolds birthday letter.
- **Mouse Interaction:** `Hold to Blow Out` button / optional Mic breath bends & extinguishes flame; Wish release launches lantern; Clicking/holding `U ♥ S` wax seal cracks seal.
- **Scroll Interaction:** Internal smooth reading scroll within unfolded letter; footer CTA triggers Sequence 3 Finale convergence.
- **Reverse Behaviour:** Stage selector / upward scroll allows revisiting lake panorama or re-reading unfolded letter without losing entered wish text.
- **Asset Format:** Procedural Three.js geometry + custom teardrop candle-flame vertex/fragment shader.

---

### `OBJ-10` — THE IMPOSSIBLE GIFT BOX (`LuxuryGiftBoxRig.tsx`)
- **Object ID:** `OBJ-10-IMPOSSIBLE-GIFT`
- **Scene / Sequence:** Sequence 3 Climax (`FINAL GIFT REVEAL`)
- **Parent:** `Sequence3RootGroup` (`position: [0, 0, 0]`)
- **Children:** `VinylBaseMedallion`, `BoxChassisWalls_1..4`, `BoxFloorPlate`, `HingedGlassLidGroup` (`LidTopBevel`, `ConstellationGemInlays_1..8`, `OrbitalFiligreeCrown_1..7`), `FrontHeartGemCore`, `TwinFingerprintClaspLeft`, `TwinFingerprintClaspRight`, `CrimsonSilkRibbonWrap`, `CrimsonSilkBowGroup` (`BowLoopLeft`, `BowLoopRight`, `BowTailLeft`, `BowTailRight`, `BowKnot`), `InteriorAlchemyLightCore`, `GiftPedestalRiser`
- **Independent Mesh Components:** 29 named, independently animated sub-meshes—directly reusing the visual motifs and material instances from Sequences 1 & 2!
- **Pivot Points:**
  - Root inspection orbit pivot: `(0, 0, 0)`
  - `HingedGlassLidGroup` rear hinge pivot: `(0, +0.62, -0.85)` (opens from `rotX = 0°` to `rotX = -112°`)
  - `TwinFingerprintClaspLeft` / `Right` front latch pivots: `(∓0.12, +0.58, +0.87)`
  - `CrimsonSilkBowGroup` top crown pivot: `(0, +0.74, 0)`
- **Material:** Chassis & Lid: bevelled `MAT_BRUSHED_OBSIDIAN` + smoked `MAT_BOROSILICATE_GLASS` panels; Pedestal Medallion, Filigree & 8 Star Inlays: `MAT_CHAMPAGNE_GOLD`; Heart Gem: `MAT_ROSE_GOLD_CORE`; Ribbon & Bow: `MAT_CRIMSON_SILK`.
- **Lighting:** Three-point haute-joaillerie studio lighting + warm `InteriorAlchemyLightCore` (`PointLight('#FDE68A', intensity: 0.4 → 3.8)` spilling upward when lid opens).
- **Animation Start State (`convergence = 0.0`):** Constituent parts approach along sweeping orbital arcs from the surrounding cosmos (`r = 5.5 → 0.0`).
- **Animation End State (`convergence = 1.0` → `unboxed = true`):**
  1. `convergence = 1.0`: Fully locked luxury gift box wrapped in crimson silk bow, freely rotatable `360°`.
  2. `unboxed = true`: Crimson bow unties (`uRibbonUntie: 0 → 1`, tails sweep outward smoothly), twin-fingerprint clasp slides apart `±0.28`, `HingedGlassLidGroup` swings open `-112°` with weighted bounce, golden volumetric light cone blooms, and `GiftPedestalRiser` elevates while camera frames open box left + configurable Actual Gift Showcase right.
- **Mouse Interaction:** Drag anywhere on box body orbits `360°` (`damp = 6.5`); clicking or dragging `CrimsonSilkBowGroup` triggers ribbon untie & unboxing sequence.
- **Scroll Interaction:** `160vh` pinned convergence timeline scrubs assembly `0.0 → 1.0` (100% reversible before unboxing; post-unbox offers `Replay Gift Assembly` button).
- **Reverse Behaviour:** Scrolling upward during convergence gracefully separates the ribbon, clasp, 8 inlays, 7 filigree rings, vinyl medallion, and obsidian panels back into suspended orbit.
- **Asset Format:** High-precision procedural bevelled `ExtrudeGeometry` & `TubeGeometry` silk splines (with optional GLB interior token slot `public/media/models/actual-gift-token.glb`).
