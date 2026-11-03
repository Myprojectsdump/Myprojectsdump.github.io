// src/types/media.types.ts

export type MediaAssetKey =
  | 'uci-portrait-01'
  | 'uci-portrait-02'
  | 'shared-photo-01'
  | 'memory-01-photo'
  | 'memory-02-moment'
  | 'memory-03-joke'
  | 'memory-04-music-cover'
  | 'memory-06-confession'
  | 'voice-opening'
  | 'voice-memory-01'
  | 'voice-memory-05'
  | 'music-cosmic-ambient'
  | 'music-vinyl-daylight'
  | 'music-vinyl-afterhours'
  | 'voice-heartbeat-whispers'
  | 'voice-act6-closing'
  | 'voice-birthday-letter'
  | 'music-birthday-box'
  | 'sfx-chime-star-connect'
  | 'sfx-mirror-wipe'
  | 'sfx-alchemy-cork-pop'
  | 'sfx-wax-seal-crack'
  | 'gift-hero-photo';

export type PlaceholderVariant =
  | 'portrait'
  | 'polaroid'
  | 'prism'
  | 'folded-note'
  | 'melody-locket'
  | 'waveform-vial'
  | 'velvet-envelope'
  | 'gift-crest'
  | 'star-map';

export interface MediaAssetDescriptor {
  key: MediaAssetKey;
  category: string;
  destinationPath: string;
  preferredFormat: string;
  placeholderVariant: PlaceholderVariant;
  fallbackDescription: string;
}
