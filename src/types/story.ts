// src/types/story.ts
// Centralized type definitions for THE GRAVITY OF UCI story, photography, soundtrack, and acts.

export type MediaAssetKey =
  | 'opening-hero-portrait'
  | 'act1-star-bridge-memory'
  | 'act2-keepsake-01-first-night'
  | 'act2-keepsake-02-sweetest-laugh'
  | 'act2-keepsake-03-late-night-call'
  | 'act2-keepsake-04-cute-habit'
  | 'act2-keepsake-05-song-changed'
  | 'act2-keepsake-06-future-trip'
  | 'act3-mirror-silhouette'
  | 'act4-vinyl-daylight-cover'
  | 'act4-vinyl-afterhours-cover'
  | 'act4-star-eyes'
  | 'act4-star-laugh'
  | 'act4-star-lips'
  | 'act4-star-neck'
  | 'act4-star-bites'
  | 'act4-star-waist'
  | 'act4-star-voice'
  | 'act4-star-heart'
  | 'act7-letter-keepsake-photo'
  | 'final-actual-gift-reveal';

export type PhotoSlotKey =
  | 'portrait'
  | 'mirror'
  | 'daylight'
  | 'afterhours'
  | 'eyes'
  | 'smile'
  | 'playful'
  | 'sideprofile'
  | 'sleepy'
  | 'keepsake01'
  | 'keepsake02'
  | 'keepsake03'
  | 'keepsake04'
  | 'finale';

export interface PhotoEntry {
  key: PhotoSlotKey;
  path: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
}

export type PhotoManifest = Record<PhotoSlotKey, PhotoEntry>;

export type SoundtrackTrackId =
  | 'act-1-vastness'
  | 'act-2-skyline-piano'
  | 'act-2-beautiful-dream'
  | 'act-3-daydreamin'
  | 'act-3-romantic-01'
  | 'act-4-silent-descent'
  | 'act-5-jb-rnb'
  | 'act-6-possible-dreams'
  | 'act-7-discover'
  | 'closing-its-been-a-long-long-time';

export interface SoundtrackTrack {
  id: SoundtrackTrackId;
  actNumber: string;
  sceneLabel: string;
  title: string;
  artist: string;
  mood: string;
  src: string;
  fallbackSrc?: string;
  fallbackTitle?: string;
  fallbackArtist?: string;
  defaultVolume: number;
}

export interface MemoryItemConfig {
  id: string;
  populated: boolean;
  category: 'photograph' | 'shared-moment' | 'inside-joke' | 'song-call' | 'voice-note' | 'personal-confession';
  categoryBadge: string;
  title: string;
  eraOrDateLabel?: string;
  storyBody: string;
  bulletItems?: string[];
  secondaryWhisper?: string;
  imageAssetKey?: MediaAssetKey;
  audioAssetKey?: string;
  photoPath: string;
  voiceNoteSrc?: string;
  imageAltText: string;
}

export interface HeroOpeningData {
  eyebrow: string;
  title: string;
  subtitle: string;
  whisper: string;
  cta: string;
  photoPath: string;
}

export type HeroOpeningCopy = HeroOpeningData;

export interface SteamyMirrorNote {
  id: number;
  x: number;
  y: number;
  text: string;
  subtext: string;
}

export type MirrorNoteItem = SteamyMirrorNote;

export interface VinylConfessionCardItem {
  id: string;
  trackNumber: string;
  title: string;
  message: string;
}

export interface VinylTrackData {
  title: string;
  subtitle?: string;
  bpm: string;
  moodColor?: string;
  grooveText: string;
  trackId: SoundtrackTrackId;
  audioSrc: string;
  photoPath: string;
  cards: VinylConfessionCardItem[];
  confessions: string[];
}

export type VinylTrackContent = VinylTrackData;

export interface ConstellationNodeData {
  id: string;
  label: string;
  category: 'soul' | 'spicy';
  accentTier: 'rose-gold' | 'crimson-champagne' | 'warm-gold';
  x: number;
  y: number;
  headline: string;
  description: string;
  body: string;
  mediaAssetKey: MediaAssetKey;
  photoPath: string;
}

export type ConstellationNodeItem = ConstellationNodeData;

export interface Act5IngredientItem {
  id: string;
  slot?: number;
  percentage: number;
  percentageLabel: string;
  name: string;
  shortName: string;
  subtitle: string;
  color: string;
  glowColor: string;
  iconName: 'heart' | 'crown' | 'sparkles' | 'flame';
  tempTarget: number;
  isDominant?: boolean;
}

export interface ScratchCardData {
  id: string;
  cardNumberLabel: string;
  foilTitle: string;
  tag?: string;
  secretTitle: string;
  secretBody: string;
  secretText: string;
  rewardTag?: string;
  requiresAdultConsent?: boolean;
}

export type ScratchCardItem = ScratchCardData;

export interface TelegramAddressRequestConfig {
  heading: string;
  body: string;
  buttonLabel: string;
  prefillMessage: string;
  privacyNote: string;
  telegramUsername?: string;
}

export interface BirthdayLetterData {
  salutation: string;
  paragraphs: string[];
  signOff: string;
  signature: string;
  postscript?: string;
  photoPath: string;
  telegramAddressRequest: TelegramAddressRequestConfig;
}

export type BirthdayLetterContent = BirthdayLetterData;

export interface VipCouponData {
  id: string;
  tier: string;
  code: string;
  serialNumber: string;
  category: 'princess' | 'spicy';
  title: string;
  description: string;
  terms?: string;
  redeemedBadgeText: string;
}

export type VipCouponItem = VipCouponData;

export interface ActualGiftConfig {
  populated: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  imageAssetKey?: MediaAssetKey;
  photoPath: string;
  deliveryOrRedemptionNote: string;
  personalNote: string;
  ctaLabel?: string;
  addressRevealHeading?: string;
  addressRevealBody?: string;
  addressButtonLabel?: string;
  addressPrivacyNote?: string;
  whatsappPrefillMessage?: string;
  telegramPrefillMessage?: string;
}

export interface LiveCallConfig {
  url: string;
  fallbackHeadline: string;
  fallbackMessage: string;
}

export interface RedemptionGuidanceMeta {
  mode: 'remote-tonight' | 'next-reunion-in-person' | 'remote-tonight-and-reunion';
  badgeLabel: string;
  guidanceNote: string;
}

export interface StoryDataPayload {
  girlfriendName: string;
  nicknames: string[];
  initials: string;
  telegramUsername: string;
  boyfriendWhatsAppNumber?: string;
  photos: PhotoManifest;
  soundtrack: Record<SoundtrackTrackId, SoundtrackTrack>;
  heroOpening: HeroOpeningData;
  steamyMirrorNotes: SteamyMirrorNote[];
  vinylTracks: {
    daylight: VinylTrackData;
    afterHours: VinylTrackData;
  };
  constellationNodes: ConstellationNodeData[];
  keepsakeMemories: MemoryItemConfig[];
  alchemyIngredients: Act5IngredientItem[];
  alchemyOverheatWarning: string;
  scratchCards: ScratchCardData[];
  heartbeatWhispers: string[];
  birthdayLetter: BirthdayLetterData;
  vipCoupons: VipCouponData[];
  actualGift: ActualGiftConfig;
}

export type StoryData = StoryDataPayload;
