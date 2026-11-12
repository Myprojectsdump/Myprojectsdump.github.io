// src/components/media/VoicePlayerPill.tsx
// Deprecated: Voice note playback removed across THE GRAVITY OF UCI in favor of direct call/text reassurance.

import React from 'react';

export interface VoicePlayerPillProps {
  audioPath?: string;
  transcript?: string;
  title?: string;
  autoPlay?: boolean;
}

export const VoicePlayerPill: React.FC<VoicePlayerPillProps> = () => null;
