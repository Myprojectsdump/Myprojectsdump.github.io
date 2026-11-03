# THE GRAVITY OF UCI — IMPLEMENTATION DECISIONS RECORD

**Project:** THE GRAVITY OF UCI  
**Workspace:** `D:\UCI Bday`  
**Purpose:** Record genuine implementation deviations, technical trade-offs, and approved alternatives during execution, without altering original specifications.

---

## 1. Approved Baseline Decisions
- **`ADR-01` to `ADR-09`:** Binding architectural decisions established in `docs/planning/13_ARCHITECTURE_DECISIONS_AND_OPEN_QUESTIONS.md`.
- **`OQ-01` to `OQ-05`:** Resolved owner decisions regarding Opening two-beat sequence, Title casing (`"The Gravity of Uci."`), Act VI heartbeat whispers and desktop hold instructions, long-distance vs in-person redemption guidance, and edge-level media protection.

---

## 2. Technical Decisions & Trade-Offs Log

| Decision ID | Area | Context & Technical Rationale | Chosen Implementation & Impact |
| :--- | :--- | :--- | :--- |
| **`IMP-DEC-01`** | Dependencies | React 18 / 19 compatibility with Three.js ecosystem | Target React 18.3 or React 19 with compatible `@react-three/fiber` and `@react-three/drei` releases to ensure stable R3F render loop, Drei helpers, and React strict mode support. |
| **`IMP-DEC-02`** | Audio Phase Placement | Core audio engine placement | As noted in `10_IMPLEMENTATION_ROADMAP.md §1`, Core Audio & Procedural Synthesizer bus is initialized in Phase B alongside the Persistent Stage and HUD so all early acts have sound hooks without waiting for Phase G. |
| **`IMP-DEC-03`** | 2D Canvas Clearance Math | Avoidance of `getImageData` GPU stalls | Using a DPR-independent `64 × 36` occupancy grid for the mirror condensation and `32 × 20` grid for scratch cards to provide instant, silky smooth performance on laptop GPUs. |
| **`IMP-DEC-04`** | Procedural 3D Geometry | Elimination of paid external GLB dependencies | Precision procedural geometries (`LatheGeometry`, bevelled `ExtrudeGeometry`, `TubeGeometry`, `InstancedMesh`) constructed for all assemblies (Gravity Sphere, Turntable, Astrolabe, Alchemy Flask, Fingerprints, Moonlit Lake, Impossible Gift Box), providing instant loading (< 300 KB) with optional drop-in GLB override hooks in `public/media/models/`. |
| **`IMP-DEC-05`** | Native Modal `<dialog>` | Elimination of body-scroll hijacking side effects | Using native HTML5 `<dialog>` for the Act II Memory Inspector and Fallback Call Card so root scroll offsets and active GSAP pins are never corrupted by `body.style.overflow = 'hidden'`. |
| **`IMP-DEC-06`** | Edge Privacy Protection | CDN edge authorization for private media | Implementing `functions/_middleware.ts` with HMAC-SHA256 signed `HttpOnly; SameSite=Lax` cookie verification, protecting both webpage navigation (`/*`) and direct `/media/*` requests with fail-closed security. |
| **`IMP-DEC-07`** | Audio Gesture & Autoplay | Cross-browser Web Audio unlocking | AudioContext initializes on first explicit gesture (`ENTER MY UNIVERSE` or `Resume at [Chapter]`), automatically ducking background music by `-12 dB` whenever voice notes or spoken letters are activated. |
