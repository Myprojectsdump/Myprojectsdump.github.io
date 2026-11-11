// src/config/mediaManifest.ts

import { PlaceholderVariant } from '../types/media.types';
import { MediaAssetKey } from '../types/story.types';
import { PHOTO_PATHS } from '../data/storyData';

export interface MediaAssetConfig {
  key: MediaAssetKey;
  populated: boolean;
  src: string;
  alt: string;
  caption?: string;
  aspectRatio: string;
  placeholderVariant: PlaceholderVariant;
}

// Mapped to the centralized /photos/*.jpg paths in public/photos/.
// SmartImage automatically attempts to load `src` and gracefully falls back to HeirloomMediaPlaceholder if the photo file is not yet placed in public/photos/.
export const MEDIA_MANIFEST: Record<MediaAssetKey, MediaAssetConfig> = {
  'opening-hero-portrait': {
    key: 'opening-hero-portrait',
    populated: true,
    src: PHOTO_PATHS.portrait.path,
    alt: PHOTO_PATHS.portrait.alt,
    caption: PHOTO_PATHS.portrait.caption,
    aspectRatio: '4:5',
    placeholderVariant: 'portrait',
  },
  'act1-star-bridge-memory': {
    key: 'act1-star-bridge-memory',
    populated: true,
    src: PHOTO_PATHS.portrait.path,
    alt: 'Across Two Countries, One Sky',
    caption: 'Connected by every message and late-night call',
    aspectRatio: '1:1',
    placeholderVariant: 'polaroid',
  },
  'act2-keepsake-01-first-night': {
    key: 'act2-keepsake-01-first-night',
    populated: true,
    src: PHOTO_PATHS.keepsake01.path,
    alt: PHOTO_PATHS.keepsake01.alt,
    caption: PHOTO_PATHS.keepsake01.caption,
    aspectRatio: '4:5',
    placeholderVariant: 'polaroid',
  },
  'act2-keepsake-02-sweetest-laugh': {
    key: 'act2-keepsake-02-sweetest-laugh',
    populated: true,
    src: PHOTO_PATHS.keepsake02.path,
    alt: PHOTO_PATHS.keepsake02.alt,
    caption: PHOTO_PATHS.keepsake02.caption,
    aspectRatio: '4:5',
    placeholderVariant: 'waveform-vial',
  },
  'act2-keepsake-03-late-night-call': {
    key: 'act2-keepsake-03-late-night-call',
    populated: true,
    src: PHOTO_PATHS.keepsake03.path,
    alt: PHOTO_PATHS.keepsake03.alt,
    caption: PHOTO_PATHS.keepsake03.caption,
    aspectRatio: '4:5',
    placeholderVariant: 'polaroid',
  },
  'act2-keepsake-04-cute-habit': {
    key: 'act2-keepsake-04-cute-habit',
    populated: true,
    src: PHOTO_PATHS.keepsake04.path,
    alt: PHOTO_PATHS.keepsake04.alt,
    caption: PHOTO_PATHS.keepsake04.caption,
    aspectRatio: '4:5',
    placeholderVariant: 'polaroid',
  },
  'act2-keepsake-05-song-changed': {
    key: 'act2-keepsake-05-song-changed',
    populated: true,
    src: PHOTO_PATHS.daylight.path,
    alt: 'Songs That Remind Me of You',
    caption: 'Every lyric sounds like us',
    aspectRatio: '1:1',
    placeholderVariant: 'melody-locket',
  },
  'act2-keepsake-06-future-trip': {
    key: 'act2-keepsake-06-future-trip',
    populated: true,
    src: PHOTO_PATHS.finale.path,
    alt: 'Loving You Right Now',
    caption: 'Every real moment we share across the distance',
    aspectRatio: '16:9',
    placeholderVariant: 'polaroid',
  },
  'act3-mirror-silhouette': {
    key: 'act3-mirror-silhouette',
    populated: true,
    src: PHOTO_PATHS.mirror.path,
    alt: PHOTO_PATHS.mirror.alt,
    caption: PHOTO_PATHS.mirror.caption,
    aspectRatio: '4:5',
    placeholderVariant: 'portrait',
  },
  'act4-vinyl-daylight-cover': {
    key: 'act4-vinyl-daylight-cover',
    populated: true,
    src: PHOTO_PATHS.daylight.path,
    alt: PHOTO_PATHS.daylight.alt,
    caption: PHOTO_PATHS.daylight.caption,
    aspectRatio: '1:1',
    placeholderVariant: 'melody-locket',
  },
  'act4-vinyl-afterhours-cover': {
    key: 'act4-vinyl-afterhours-cover',
    populated: true,
    src: PHOTO_PATHS.afterhours.path,
    alt: PHOTO_PATHS.afterhours.alt,
    caption: PHOTO_PATHS.afterhours.caption,
    aspectRatio: '1:1',
    placeholderVariant: 'melody-locket',
  },
  'act4-star-eyes': {
    key: 'act4-star-eyes',
    populated: true,
    src: PHOTO_PATHS.eyes.path,
    alt: PHOTO_PATHS.eyes.alt,
    caption: PHOTO_PATHS.eyes.caption,
    aspectRatio: '1:1',
    placeholderVariant: 'portrait',
  },
  'act4-star-laugh': {
    key: 'act4-star-laugh',
    populated: true,
    src: PHOTO_PATHS.smile.path,
    alt: PHOTO_PATHS.smile.alt,
    caption: PHOTO_PATHS.smile.caption,
    aspectRatio: '1:1',
    placeholderVariant: 'polaroid',
  },
  'act4-star-lips': {
    key: 'act4-star-lips',
    populated: true,
    src: PHOTO_PATHS.playful.path,
    alt: PHOTO_PATHS.playful.alt,
    caption: PHOTO_PATHS.playful.caption,
    aspectRatio: '1:1',
    placeholderVariant: 'portrait',
  },
  'act4-star-neck': {
    key: 'act4-star-neck',
    populated: true,
    src: PHOTO_PATHS.afterhours.path,
    alt: 'Her Flirty Side',
    caption: 'Her Flirty Side',
    aspectRatio: '1:1',
    placeholderVariant: 'portrait',
  },
  'act4-star-bites': {
    key: 'act4-star-bites',
    populated: true,
    src: PHOTO_PATHS.sleepy.path,
    alt: PHOTO_PATHS.sleepy.alt,
    caption: PHOTO_PATHS.sleepy.caption,
    aspectRatio: '1:1',
    placeholderVariant: 'portrait',
  },
  'act4-star-waist': {
    key: 'act4-star-waist',
    populated: true,
    src: PHOTO_PATHS.sideprofile.path,
    alt: PHOTO_PATHS.sideprofile.alt,
    caption: PHOTO_PATHS.sideprofile.caption,
    aspectRatio: '1:1',
    placeholderVariant: 'portrait',
  },
  'act4-star-voice': {
    key: 'act4-star-voice',
    populated: true,
    src: PHOTO_PATHS.daylight.path,
    alt: 'Her Clingy Little Moments',
    caption: 'Her Clingy Little Moments',
    aspectRatio: '1:1',
    placeholderVariant: 'waveform-vial',
  },
  'act4-star-heart': {
    key: 'act4-star-heart',
    populated: true,
    src: PHOTO_PATHS.portrait.path,
    alt: 'Her Beautiful Heart',
    caption: 'Her Beautiful Heart',
    aspectRatio: '1:1',
    placeholderVariant: 'polaroid',
  },
  'act7-letter-keepsake-photo': {
    key: 'act7-letter-keepsake-photo',
    populated: true,
    src: PHOTO_PATHS.finale.path,
    alt: PHOTO_PATHS.finale.alt,
    caption: PHOTO_PATHS.finale.caption,
    aspectRatio: '4:5',
    placeholderVariant: 'polaroid',
  },
  'final-actual-gift-reveal': {
    key: 'final-actual-gift-reveal',
    populated: true,
    src: PHOTO_PATHS.finale.path,
    alt: 'Your Real Birthday Gift Awaits',
    caption: 'Waiting to be sent straight to your door ♥',
    aspectRatio: '4:5',
    placeholderVariant: 'gift-crest',
  },
};
