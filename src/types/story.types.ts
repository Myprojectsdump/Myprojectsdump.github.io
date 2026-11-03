// src/types/story.types.ts

export type MemoryCategory =
  | 'photograph'
  | 'shared-moment'
  | 'inside-joke'
  | 'music-memory'
  | 'voice-note'
  | 'personal-confession';

export type RedemptionFulfilmentWindow =
  | 'remote-tonight'
  | 'next-reunion-in-person'
  | 'remote-tonight-and-reunion';

export interface RedemptionGuidanceMeta {
  mode: RedemptionFulfilmentWindow;
  badgeLabel: string;
  guidanceNote: string;
}

export interface MemoryItemConfig {
  id: string;
  populated: boolean;
  category: MemoryCategory;
  categoryBadge: string;
  title: string;
  eraOrDateLabel?: string;
  storyBody: string;
  secondaryWhisper?: string;
  imageAssetKey?: string;
  audioAssetKey?: string;
  imageAltText: string;
}

export interface ActualGiftConfig {
  populated: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  imageAssetKey: string;
  deliveryOrRedemptionNote?: string;
  personalNote?: string;
}

export interface LiveCallConfig {
  url: string;
  fallbackHeadline: string;
  fallbackMessage: string;
}

export interface SteamyMirrorNote {
  id: number;
  x: number;
  y: number;
  text: string;
  subtext: string;
}

export interface VinylTrackData {
  title: string;
  bpm: string;
  grooveText: string;
  confessions: string[];
}

export interface ConstellationNodeData {
  id: string;
  label: string;
  category: 'soul' | 'spicy';
  x: number;
  y: number;
  headline: string;
  description: string;
}

export interface ScratchCardData {
  id: string;
  foilTitle: string;
  tag: string;
  secretTitle: string;
  secretBody: string;
}

export interface BirthdayLetterData {
  salutation: string;
  paragraphs: string[];
  signOff: string;
  signature: string;
}

export interface VipCouponData {
  id: string;
  tier: string;
  code: string;
  title: string;
  description: string;
}

export interface StoryDataPayload {
  girlfriendName: string;
  nicknames: string[];
  initials: string;
  heroOpening: {
    eyebrow: string;
    title: string;
    subtitle: string;
    whisper: string;
  };
  steamyMirrorNotes: SteamyMirrorNote[];
  vinylTracks: {
    daylight: VinylTrackData;
    afterHours: VinylTrackData;
  };
  constellationNodes: ConstellationNodeData[];
  scratchCards: ScratchCardData[];
  heartbeatWhispers: string[];
  birthdayLetter: BirthdayLetterData;
  vipCoupons: VipCouponData[];
}
