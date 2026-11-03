// src/components/hud/InteractionHint.tsx

import React from 'react';
import { MousePointer, ChevronDown } from 'lucide-react';

interface InteractionHintProps {
  hint: string;
  icon?: 'drag' | 'scroll' | 'click' | 'wipe' | 'hold';
}

export const InteractionHint: React.FC<InteractionHintProps> = ({ hint, icon = 'scroll' }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-champagne-gold/25 text-xs font-mono tracking-wider text-champagne-gold/80 shadow-glow animate-pulse select-none">
      {icon === 'scroll' ? (
        <ChevronDown className="w-3.5 h-3.5" />
      ) : (
        <MousePointer className="w-3.5 h-3.5" />
      )}
      <span>{hint}</span>
    </div>
  );
};
