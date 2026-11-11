# Soundtrack & Audio Licensing Manifest (`public/audio/`)

All stock soundtrack tracks included in **THE GRAVITY OF UCI** are downloaded from **Mixkit Free Stock Music** under the **Mixkit Stock Music Free License** (`https://mixkit.co/license/#musicFree` — royalty-free for personal and commercial web projects, hosted locally via native `HTMLAudioElement` with zero runtime third-party streaming APIs).

## 1. Downloaded Local Stock Music Tracks (`public/audio/`)

| Filename | Track Name | Artist | Act / Scene Direction | Source & Download Page | Licence Type | Date Downloaded |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `act-1-vastness.mp3` | **Vastness** | Andrew Ev | **Act I & Opening** — Expansive cinematic ambient and cosmic synth | Mixkit (`https://mixkit.co/free-stock-music/ambient/`, asset `612`) | Mixkit Stock Music Free License | 2026-11-11 |
| `act-2-skyline-piano.mp3` | **Skyline** | Eugenio Mininni | **Act II (Keepsakes)** — Warm intimate acoustic piano | Mixkit (`https://mixkit.co/free-stock-music/mood/romantic/`, asset `601`) | Mixkit Stock Music Free License | 2026-11-12 |
| `act-2-beautiful-dream.mp3` | **Beautiful Dream** | Diego Nava | **Act III (Secret Mirror)** — Dreamy, intimate, quiet confession | Mixkit (`https://mixkit.co/free-stock-music/mood/romantic/`, asset `493`) | Mixkit Stock Music Free License | 2026-11-11 |
| `act-3-daydreamin.mp3` | **Day Dreamin' with U** | Michael Ramir C. | **Vinyl Side A (Daylight)** — Dream pop and romantic vinyl mood | Mixkit (`https://mixkit.co/free-stock-music/mood/romantic/`, asset `1082`) | Mixkit Stock Music Free License | 2026-11-11 |
| `act-3-romantic-01.mp3` | **Romantic 01** | Lily J. | **Vinyl Side B (After-Hours)** — Slow, deep, sensual R&B / romance | Mixkit (`https://mixkit.co/free-stock-music/mood/romantic/`, asset `658`) | Mixkit Stock Music Free License | 2026-11-11 |
| `act-4-silent-descent.mp3` | **Silent Descent** | Eugenio Mininni | **Act IV (Constellation)** — Emotional piano, soft strings & atmospheric texture | Mixkit (`https://mixkit.co/free-stock-music/classical/`, asset `614`) | Mixkit Stock Music Free License | 2026-11-11 |
| `act-5-jb-rnb.mp3` | **J.B. R&B Music** | Arulo | **Act V (Formula & Scratch Vault)** — Deep crimson R&B and slow sensual groove | Mixkit (`https://mixkit.co/free-stock-music/mood/romantic/`, asset `227`) | Mixkit Stock Music Free License | 2026-11-11 |
| `act-6-possible-dreams.mp3` | **Possible Dreams** | Eugenio Mininni | **Act VI (Heartbeat)** — Sparse piano escalating into emotional orchestral warmth | Mixkit (`https://mixkit.co/free-stock-music/mood/romantic/`, asset `599`) | Mixkit Stock Music Free License | 2026-11-11 |
| `act-7-discover.mp3` | **Discover** | Eugenio Mininni | **Act VII (Cake, Lantern, Letter & VIP Vault)** — Delicate music box, warm piano & soft strings | Mixkit (`https://mixkit.co/free-stock-music/classical/`, asset `587`) | Mixkit Stock Music Free License | 2026-11-11 |
| `closing-lounging-by-moonlight.mp3` | **Lounging By Moonlight** | Ahjay Stelino | **Final Poem Licensed Vintage Jazz Substitute** — Expressive slow-dance vintage jazz horn & piano | Mixkit (`https://mixkit.co/free-stock-music/mood/romantic/`, asset `40`) | Mixkit Stock Music Free License | 2026-11-12 |

---

## 2. Optional User-Supplied Licensed Tracks (`public/audio/`)

| Filename | Track Name | Artist | Usage & Fallback Behaviour |
| :--- | :--- | :--- | :--- |
| `closing-its-been-a-long-long-time.mp3` | **It's Been a Long, Long Time** | Harry James and His Orchestra (feat. Kitty Kallen) | **Final Poem Scene Primary Slot.** Commercial master recording requires user-supplied authorized local file. When not present in `public/audio/`, `musicController.ts` automatically falls back to the licensed vintage slow-dance jazz recording `closing-lounging-by-moonlight.mp3` (*Lounging By Moonlight* by Ahjay Stelino) and honestly labels the active track in the HUD. |
| `my-voice-note.mp3` | **Personal Voice Note** | Sayang | **Act I & Act II Keepsakes (`01` & `02`) & Act VII Letter.** Optional personal voice recording. Gracefully falls back to transcript / synth chime if not yet added. |
