# THE GRAVITY OF UCI — Photograph Asset Manifest

Authoritative mapping of Uci's authentic photographs integrated into the seven-act interactive birthday experience.

## Master Photo Mapping Table

| No. | Original Filename | New Asset Path | Intended Act & Component | Presentation / Reveal Type | Framing & Object Position |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `1000784796.jpg` | `/images/uci/uci-genesis.jpg` | **Act I** (`Act1TwoCountriesOneSky.tsx`) | **Interactive Reveal**: Discovered inside the cosmic locket after two-country bridge connection & supernova. | Natural smiling portrait; `objectPosition: "center 25%"`; preserve warm gold locket framing. |
| **02** | `1000784793.jpg` | `/images/uci/uci-mirror-reveal.jpg` | **Act II / III** (`FogMirrorCanvas.tsx` / `Act3SecretMirror.tsx`) | **Interactive Reveal**: Underneath condensation mirror; revealed progressively as user wipes the fogged glass. | Blue blazer mirror portrait; `objectPosition: "center 25%"`; unwarped rectangular reflection. |
| **03** | `1000784787.jpg` | `/images/uci/uci-daylight-vinyl.jpg` | **Act III / IV** (`VinylTurntable.tsx` / `VinylExperience.tsx`) | **Interactive Mode**: Side A (Daylight Sweetheart) vinyl sleeve and circular spinning record label. | Soft casual selfie resting chin on hand; `objectPosition: "center 30%"`; circular center label. |
| **04** | `1000784784.jpg` | `/images/uci/uci-after-hours-vinyl.jpg` | **Act III / IV** (`VinylTurntable.tsx` / `VinylExperience.tsx`) | **Interactive Mode**: Side B (2:00 AM After-Hours) vinyl sleeve and circular spinning record label. | Nighttime car window portrait; `objectPosition: "center 35%"`; circular center label. |
| **05** | `1000784794.jpg` | `/images/uci/uci-eyes-detail.jpg` | **Act IV** (`ConstellationMap.tsx` / `StarDetailCard.tsx`) | **Interactive Reveal**: Discovered upon tapping the **Eyes** node (Node 01) in the heart constellation. | Narrow detail crop of eyes in monochrome; `object-fit: cover`; tight horizontal container; never stretched. |
| **06** | `1000784802.jpg` | `/images/uci/uci-lips-detail.jpg` | **Act IV** (`ConstellationMap.tsx` / `StarDetailCard.tsx`) | **Interactive Reveal**: Discovered upon tapping the **Lips** node (Node 03 / 05) in the heart constellation. | Tilted close-up with loose hair; `objectPosition: "center 25%"`; Polaroid modal frame. |
| **07** | `1000784792.jpg` | `/images/uci/uci-bedroom-menace.jpg` | **Act V** (`IngredientShelf.tsx` / `ScratchVault.tsx`) | **Interactive Reveal**: 40% Bedroom Menace potion vial & after-hours scratch card reveal. | Playful finger-near-lips selfie; `objectPosition: "center 20%"`; gold foil scratch reveal. |
| **08** | `1000784782.jpg` | `/images/uci/uci-princess-energy.jpg` | **Act V** (`IngredientShelf.tsx` / `ScratchVault.tsx`) | **Interactive Reveal**: 20% Clingy Princess Energy potion vial & scratch card reveal. | Star-filter hijab selfie with glasses; `objectPosition: "center 25%"`; warm princess glow. |
| **09** | `1000784803.jpg` | `/images/uci/uci-heartbeat-reveal.jpg` | **Act VI** (`Act6AcrossTheDistance.tsx`) | **Interactive Reveal**: Discovered immediately after holding the 8-second biometric fingerprint connection. | Closed-eyes sweet smile with glasses; `objectPosition: "center 25%"`; heartbeat waveform reveal. |
| **10** | `1000784785.jpg` | `/images/uci/uci-final-letter.jpg` | **Act VII** (`BirthdayLetterExperience.tsx` & `FinalGiftReveal.tsx`) | **Interactive Climax**: Framed portrait beside the unfolded birthday letter and final gift showcase. | Warm cinematic portrait in satin with red rose; `objectPosition: "center 25%"`; elegant heirloom deckled frame. |
| **11** | `1000784804.jpg` | `/images/uci/uci-keepsake-four-moments.jpg` | **Keepsakes Gallery** (`Act2LittleThingsIKeep.tsx`) | **Interactive Keepsake**: Keepsake Card 02 — "Four Moments I Cherish" / "Our Midnight Rituals". | Four-frame playful collage; kept strictly intact as one complete single image; `object-fit: contain`. |
| **12** | `1000784791.jpg` | `/images/uci/uci-keepsake-late-night-call.jpg` | **Keepsakes Gallery** (`Act2LittleThingsIKeep.tsx`) | **Interactive Keepsake**: Keepsake Card 01 — "Open When You Miss Me" (paired with `/audio/my-voice-note.mp3`). | Dark selfie with earphones and peace sign; `objectPosition: "center 25%"`; voice-note keepsake. |
| **13** | `1000784783.jpg` | `/images/uci/uci-keepsake-casual-selfie.jpg` | **Keepsakes Gallery** (`Act2LittleThingsIKeep.tsx`) | **Interactive Keepsake**: Keepsake Card 03 — "Casual Everydays" / "A Little Piece of My Heart". | Close-up reaching for camera in olive top; `objectPosition: "center 30%"`; Polaroid frame. |
| **14** | `1000784775.jpg` | `/images/uci/uci-keepsake-night-memory.jpg` | **Keepsakes Gallery** (`Act2LittleThingsIKeep.tsx`) | **Interactive Keepsake**: Keepsake Card 04 — "What Is True Right Now" / Night Walk Memory. | Outdoor nighttime portrait in brown hijab and white sweatshirt; `objectPosition: "center 20%"`. |
| **15** | `1000784795.jpg` | `/images/uci/uci-keepsake-monochrome.jpg` | **Keepsakes Gallery** (`Act2LittleThingsIKeep.tsx`) | **Interactive Keepsake**: Keepsake Card 05 — "Quiet Reflection" (Secondary / Optional Keepsake). | Elegant black-and-white mirror portrait; `objectPosition: "center 20%"`; monochrome Polaroid. |

## Directory Conventions & Backward Compatibility

- **Primary Assets**: All 15 photographs reside in `public/images/uci/*.jpg`.
- **Legacy Aliases**: Direct backward-compatible alias copies reside in `public/photos/*.jpg` (`uci-portrait.jpg`, `uci-mirror.jpg`, `keepsake-01..05.jpg`, etc.).
- **Code Access**: Centralized through `src/data/storyData.ts` (`PHOTO_PATHS`) and `src/config/mediaManifest.ts` (`MEDIA_MANIFEST`).
