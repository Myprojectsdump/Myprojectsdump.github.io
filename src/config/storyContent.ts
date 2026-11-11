// src/config/storyContent.ts
// Re-exports centralized storyData so both src/data/storyData and src/config/storyContent imports work identically.

export {
  STORY_DATA,
  CONFIGURED_MEMORIES,
  CONFIGURED_ACTUAL_GIFT,
  CONFIGURED_LIVE_CALL,
  OPENING_PRELUDE_LINES,
  OPENING_VOICE_TRANSCRIPT,
  SUPPLEMENTARY_REDEMPTION_GUIDANCE,
  PHOTO_PATHS,
  SOUNDTRACK_MANIFEST,
} from '../data/storyData';
