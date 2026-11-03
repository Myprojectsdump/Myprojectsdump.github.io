# 03 — VISUAL DESIGN SYSTEM & CINEMATIC ART DIRECTION

**Document ID:** `DOC-03`  
**Covers Requirements:** `REQ-VIS-01` through `REQ-VIS-06`

---

## 1. Aesthetic Doctrine: "Midnight Horology Meets Intimate Cinema"

**THE GRAVITY OF UCI** combines five visual disciplines:
1. **Luxury Horological & Jewellery Presentation** (Cartier / Apple Vision / Chanel Haute Horlogerie dark-stage lighting, machined bevels, brushed obsidian, real fresnel glass).
2. **Interactive Cinematic Art** (depth-cued atmospheric haze, motivated rim lighting, poetic negative space).
3. **A Romantic Midnight Film** (warm skin-tone rose-amber highlights cutting through deep cosmic navy and velvet shadow).
4. **Premium Editorial Typography** (spacious high-contrast serif display lockups paired with whisper-clean sans metadata and intimate handwritten notes).
5. **Tactile Physicality** (condensation droplets, vinyl micro-grooves, metallic gold scratch foil, embossed crimson wax, woven silk ribbon).

### Anti-Patterns (Strictly Forbidden)
- Never flood backgrounds with bubblegum pink; rose-gold and crimson are **luminous accents** against `85%+` dark obsidian/navy/velvet space.
- Never render SaaS dashboard cards, multi-column Bootstrap grids, heavy top navbars, or generic confetti/balloon clipart.
- Never place unbacked thin serif body text directly over high-contrast moving 3D specular highlights.

---

## 2. Colour Token System (`src/styles/tokens.css`)

Declare `color-scheme: dark;` on `:root` so native scrollbars, form controls, and `<dialog>` backdrops harmonize with the dark stage.

| CSS Custom Property | Hex / Value | Role & Usage Constraint |
| :--- | :--- | :--- |
| `--color-obsidian-void` | `#040407` | Primary deep-space & studio void canvas (`SCR-00`, `SCR-04B`, `SCR-06`, `SCR-08`). |
| `--color-cosmic-navy` | `#090B19` | Upper-atmosphere radial backdrop (`SCR-01`, `SCR-02`, `SCR-07` night lake sky). |
| `--color-velvet-afterhours` | `#14050A` | Intimate warm-shadow environment (`SCR-03`, `SCR-04A` Side B, `SCR-05`, `SCR-09` Spicy row). |
| `--color-rose-gold` | `#F472B6` | Primary romantic glow accent, heart core emission, active chapter node, focus ring halo. |
| `--color-blush-rose` | `#FDA4AF` | Soft secondary highlight, Side A vinyl warmth, delicate hover borders, gentle subtitles. |
| `--color-champagne-ember` | `#FDE68A` | Luxury metallic gold UI trim, star filaments, fireflies, Princess Tier VIP foil, primary CTA border sheen. |
| `--color-crimson-lust` | `#E11D48` | High-intensity accent reserved for Side B neon rim, 999°C overheat state, `U ♥ S` wax seal, gift silk ribbon, and 18+ VIP tier. |
| `--color-warm-parchment` | `#F5EBDD` | Primary high-legibility editorial ink on dark surfaces (`≥ 14.8:1` contrast on `#040407`) AND physical paper fill for Act VII unfolded love letter (with `#1A1014` deep espresso ink on parchment, `13.2:1` contrast). |
| `--color-glass-white` | `rgba(255, 255, 255, 0.12)` | Frosted glass surface stroke & subtle specular surface fill (`--glass-fill: rgba(14, 12, 22, 0.62)` for text legibility). |
| `--color-ink-muted` | `rgba(245, 235, 221, 0.68)` | Secondary captions, chapter hints, inactive HUD metadata (`≥ 7.2:1` contrast on `#040407`). |

### Act-Keyed Atmospheric Palette Table
| Stage | Background Gradient / Clear Color | Key Light | Rim / Accent Light |
| :--- | :--- | :--- | :--- |
| **Opening & Act I** | `#040407` → `#090B19` | `#F5EBDD` (`1.2`) | `#F472B6` (`1.8`) + `#FDE68A` (`1.1`) |
| **Act II (Memories)** | `#090B19` warm radial | `#FDE68A` (`1.4`) | `#FDA4AF` (`1.2`) |
| **Act III (Mirror)** | `#14050A` warm steam | `#FDE68A` (`1.5`) | `#F472B6` (`1.6`) |
| **Act IV-A (Side A)** | `#120D16` → champagne haze | `#FDE68A` (`1.8`) | `#FDA4AF` (`1.5`) |
| **Act IV-A (Side B)** | `#14050A` → `#040407` | `#E11D48` (`1.7`) | `#F472B6` (`1.4`) |
| **Act IV-B (Stars)** | `#040407` pure pitch | Cursor spotlight `#FDE68A` | `#F472B6` / `#E11D48` star cores |
| **Act V (Alchemy)** | `#0D0612` → `#14050A` | Shifts per vial (`#FDA4AF`→`#E11D48`) | `#FDE68A` gold foil |
| **Act VI (Distance)** | `#040407` quiet chamber | `#F472B6` → `#FDE68A` bridge | Soft amber sub-glow |
| **Act VII (Lake)** | `#060918` moonlit indigo | Cool moonlight `#DCE7FF` (`1.1`) | Warm candle/firefly `#FDE68A` (`2.0`) |
| **Gift & VIP Finale** | `#040407` → `#14050A` | Studio champagne `#FDE68A` (`2.0`) | Crimson silk `#E11D48` (`1.6`) |

---

## 3. Typography System

Load self-hosted WOFF2 (preferred for privacy and zero third-party font latency) or preconnected Google Fonts with `font-display: swap` and metric-matched `size-adjust` fallbacks:

1. **Editorial Display Serif (`--font-serif`):** `'Cormorant Garamond', 'Garamond', 'Times New Roman', serif` (Weights: `400`, `500`, `600`, `400 italic`, `600 italic`).
2. **Precision UI Sans (`--font-sans`):** `'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif` (Weights: `400`, `500`, `600`).
3. **Intimate Handwritten Script (`--font-hand`):** `'Caveat', 'Dancing Script', cursive` (Weights: `500`, `600` — **strictly reserved** for Act III steamy mirror messages, Act VII letter signature, and small personal margin whispers; never used for multi-paragraph body copy or navigation).

### Desktop Fluid Type Scale (`1280px` → `1920px`)
| Token | Element / Role | Font Family | Fluid Size (`clamp`) | Line Height | Tracking | Wrapping Rule |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-hero` | Opening Title (`The Gravity of Uci.`) | `--font-serif` | `clamp(3.25rem, 4.6vw, 5.25rem)` | `1.04` | `-0.02em` | `text-wrap: balance` |
| `--text-act-title` | Act Titles (`h1`/`h2`) | `--font-serif` | `clamp(2.15rem, 3.0vw, 3.35rem)` | `1.10` | `-0.015em` | `text-wrap: balance` |
| `--text-card-title`| Drawer / Card / Letter Salutation | `--font-serif` | `clamp(1.5rem, 1.9vw, 2.05rem)` | `1.20` | `-0.01em` | `text-wrap: balance` |
| `--text-editorial` | Birthday Letter & Confessions | `--font-serif` | `clamp(1.125rem, 1.28vw, 1.325rem)` | `1.68` | `0.005em` | `text-wrap: pretty` |
| `--text-body` | UI Descriptions, VIP Pass Copy | `--font-sans` | `clamp(0.9375rem, 1.0vw, 1.05rem)` | `1.60` | `0` | `text-wrap: pretty` |
| `--text-hand-lg` | Mirror Notes & Signature | `--font-hand` | `clamp(1.65rem, 2.2vw, 2.35rem)` | `1.22` | `0.01em` | Standard wrap |
| `--text-eyebrow` | Chapter Tags, VIP Codes, BPM | `--font-sans` | `0.75rem` (`12px`) | `1.35` | `0.22em` uppercase | `white-space: nowrap` |
| `--text-micro` | HUD Hints, Progress Counters | `--font-sans` | `0.8125rem` (`13px`) | `1.40` | `0.06em` | Standard wrap |

> **Modern CSS Wrapping Mandate:** Apply `text-wrap: balance` **only** to short standalone headings (`≤ 6` lines, never globally with `*` and never on full-width bordered boxes where trailing space breaks symmetry). Apply `text-wrap: pretty` selectively to multi-line narrative `<p>` and `<blockquote>` elements (Birthday Letter, Vinyl/Constellation/Scratch confessions) to eliminate single-word orphans.

---

## 4. Responsive Desktop Viewport Matrix

| Viewport | Aspect | Target Class | Stage & Camera Adaptation Rule |
| :--- | :--- | :--- | :--- |
| **`1920 × 1080`** | `16:9` | Large Desktop | Max UI container `1600px` centered; camera `fov: 38°`; generous breathing room around 3D stage. |
| **`1680 × 1050`** | `16:10`| High-Res Laptop | Camera `fov: 40°`; side drawers `400px` wide. |
| **`1440 × 900`** | `16:10`| **Primary Design Target** | Baseline reference coordinates (`fov: 40°`, side panels `380px`, mirror `1020 × 560`). |
| **`1366 × 768`** | `~16:9`| Common Laptop | Compact vertical HUD padding (`16px`), camera `fov: 42°` (pulls slightly wider vertically so top/bottom orbital rings never clip), letter frame max-height `72dvh` with internal smooth scroll. |
| **`1280 × 720`** | `16:9` | **Minimum Supported Desktop** | Side panels tighten to `340px`; Scratch Vault & VIP grids use `16px` gap and compact padding so all 4 scratch cards / primary CTAs remain visible without vertical clipping. |
| `< 1024px` | Portrait/Tablet | Graceful Secondary Fallback | Stacks split-screen panels cleanly beneath a `52dvh` top 3D stage; touch gestures enabled seamlessly. |

---

## 5. Luxury Glass, Surface & Overlay Components

### 5.1 Frosted Obsidian-Champagne Glass Surface (`.luxury-glass`)
- **Background:** `linear-gradient(145deg, rgba(20, 16, 28, 0.74) 0%, rgba(9, 11, 25, 0.86) 100%)`
- **Backdrop Filter:** `backdrop-filter: blur(18px) saturate(130%);` (with solid `rgba(12, 11, 20, 0.94)` fallback when `prefers-reduced-transparency` or low-GPU tier is active).
- **Border:** `1px solid rgba(255, 255, 255, 0.12)` with top specular highlight `border-top-color: rgba(253, 230, 138, 0.28)`.
- **Shadow:** `0 24px 64px -16px rgba(0, 0, 0, 0.78), inset 0 1px 0 rgba(255, 255, 255, 0.08)`.
- **Radius:** `18px` for cards/drawers; `9999px` for interactive pills/CTAs.

### 5.2 Native Top-Layer Dialogs & Popovers (Zero Scroll-Jump Architecture)
- **Blocking Modals** (Act II Memory Inspector `SCR-02M`, Fallback Call Prompt, Replay Confirmation):
  - Implemented as native `<dialog closedby="any" aria-labelledby="...">` opened via `.showModal()`.
  - **Mandatory CSS Scroll Containment** (never apply `overflow: hidden` or `position: fixed` to `html`/`body`, which destroys GSAP `ScrollTrigger` pin calculations!):
    ```css
    dialog:modal {
      overscroll-behavior: contain;
    }
    dialog::backdrop {
      background: rgba(4, 4, 7, 0.72);
      backdrop-filter: blur(10px);
      overflow: hidden;
      overscroll-behavior: contain;
    }
    ```
  - Scope layout display strictly to `dialog[open]` so closed dialogs remain hidden. Include the lightweight bounding-box `pointerdown` + `pointerup` outside-click fallback where `'closedBy' in HTMLDialogElement.prototype` is absent (Safari).
- **Non-Blocking Contextual Panels** (Act IV-B Constellation Discovery Drawer, `SoundControlPill` mixer popover, `ChapterRail` quick-jump preview):
  - Implemented with native `popover` (`<dialog popover="manual">` for the Constellation Drawer so clicking another star updates the drawer without inadvertently closing it; `popover="auto"` for the Sound mixer menu) styled via `[popover]:is(:popover-open, .\:popover-open)` and feature-detected `@oddbird/popover-polyfill` fallback.

### 5.3 Primary & Secondary Controls
- **Primary Cinematic CTA (`.btn-celestial`):** Pill geometry (`padding: 14px 32px`), subtle champagne-gold border gradient (`rgba(253, 230, 138, 0.48)`), warm parchment text (`13px`, `0.18em` uppercase), radial rose-gold inner glow on `:hover` and `:focus-visible`.
- **Keyboard Focus Ring:** `outline: 2px solid var(--color-champagne-ember); outline-offset: 4px; box-shadow: 0 0 0 6px rgba(244, 114, 182, 0.25);` — unmistakably visible on every dark and parchment surface.
