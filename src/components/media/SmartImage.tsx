// src/components/media/SmartImage.tsx

import React, { useState, useEffect } from 'react';
import { MediaAssetKey } from '../../types/media.types';
import { MEDIA_MANIFEST } from '../../config/mediaManifest';
import { HeirloomMediaPlaceholder } from './HeirloomMediaPlaceholder';

interface SmartImageProps {
  assetKey?: MediaAssetKey | string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  theme?: 'dark' | 'warm';
}

export const SmartImage: React.FC<SmartImageProps> = ({
  assetKey,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  theme = 'warm',
}) => {
  const descriptor = assetKey && (assetKey in MEDIA_MANIFEST)
    ? MEDIA_MANIFEST[assetKey as MediaAssetKey]
    : null;

  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!descriptor?.destinationPath) {
      setHasError(true);
      return;
    }

    const img = new Image();
    img.src = descriptor.destinationPath;
    img.onload = () => {
      if (img.naturalWidth > 0) {
        setHasLoaded(true);
        setHasError(false);
      } else {
        setHasError(true);
      }
    };
    img.onerror = () => {
      setHasError(true);
    };
  }, [descriptor?.destinationPath]);

  if (!descriptor || hasError || !hasLoaded) {
    return (
      <div className={`w-full overflow-hidden ${aspectRatio} ${className}`}>
        <HeirloomMediaPlaceholder
          variant={descriptor?.placeholderVariant || 'polaroid'}
          label={descriptor?.fallbackDescription || alt}
          theme={theme}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-champagne-gold/20 ${aspectRatio} ${className}`}>
      <img
        src={descriptor.destinationPath}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};
