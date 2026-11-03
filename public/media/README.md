# PERSONAL MEDIA DIRECTORY — THE GRAVITY OF UCI

This directory holds all personal media assets (portraits, memory photographs, actual gift photo, personal voice notes, and background music).

## Folder Structure
```text
public/media/
├── portraits/
│   ├── uci-portrait-01.webp          # 1200x1500px, 4:5 aspect ratio
│   └── uci-portrait-02.webp
├── memories/
│   ├── shared-photo-01.webp          # 1600x1200px, 4:3 aspect ratio
│   ├── memory-01-photo.webp          # 1400x1050px
│   ├── memory-02-moment.webp         # 1400x1050px
│   ├── memory-03-joke.webp           # 1200x1200px
│   ├── memory-04-music-cover.webp    # 1000x1000px
│   └── memory-06-confession.webp     # 1400x1050px
├── gift/
│   └── actual-birthday-gift.webp     # 1600x1200px (or 1400x1400px)
├── audio/
│   ├── voice/
│   │   ├── 01-opening-voice.mp3      # Opening greeting
│   │   ├── 02-memory-01-voice.mp3    # Optional voice note for memory 1
│   │   ├── 02-memory-05-voice.mp3    # Sleepy 1:00 AM voice note
│   │   ├── 06-whisper-sequence.mp3   # Timed whispers for 8s heartbeat
│   │   ├── 06-closing-reassurance.mp3# Closing voice note for Act VI
│   │   └── 07-birthday-letter-voice.mp3 # Spoken reading of birthday letter
│   ├── music/
│   │   ├── 00-cosmic-ambient-loop.mp3# Seamless ambient music loop
│   │   ├── 04-vinyl-side-a-daylight.mp3 # 92 BPM dream pop track
│   │   ├── 04-vinyl-side-b-afterhours.mp3 # 68 BPM late-night R&B track
│   │   └── 07-birthday-music-box.mp3 # 3/4 birthday music box waltz
│   └── sfx/
│       ├── chime-star-connect.mp3
│       ├── mirror-wipe-soft.mp3
│       ├── alchemy-cork-pop.mp3
│       └── wax-seal-crack.mp3
└── models/
    └── (optional 3D .glb overrides if custom models are created)
```

## Zero-Code-Change Drop-In
You can drop or replace any `.webp` / `.jpg` / `.png` or `.mp3` file in these folders at any time (either before building or directly in the deployed `public/media/` folder).
If any file is absent, the application automatically displays luxury heirloom placeholder compositions and synthesizes procedural audio in real time.
No broken icons or audio errors will ever appear.
