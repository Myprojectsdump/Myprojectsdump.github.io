// src/components/media/SmartImage.tsx

import React, { useState, useEffect } from 'react';
import { MediaAssetKey } from '../../types/story.types';
import { PlaceholderVariant } from '../../types/media.types';
import { MEDIA_MANIFEST } from '../../config/mediaManifest';
import { HeirloomMediaPlaceholder } from './HeirloomMediaPlaceholder';

interface SmartImageProps {
  assetKey?: MediaAssetKey;
  src?: string;
  alt?: string;
  caption?: string;
  aspectRatio?: string;
  objectPosition?: string;
  placeholderVariant?: PlaceholderVariant;
  className?: string;
  theme?: 'dark' | 'warm';
  loading?: 'lazy' | 'eager';
}

function resolveImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } }).env;
  const baseUrl = metaEnv?.BASE_URL ? metaEnv.BASE_URL : '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  assetKey,
  src,
  alt,
  caption,
  aspectRatio = '',
  objectPosition = 'center 25%',
  placeholderVariant,
  className = '',
  theme = 'warm',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);
  const config = assetKey ? MEDIA_MANIFEST[assetKey] : undefined;

  const targetSrc = src || config?.src || '';
  const targetAlt = alt || config?.alt || 'Uci Keepsake Photograph';
  const targetCaption = caption || config?.caption;
  const targetVariant = placeholderVariant || config?.placeholderVariant || 'polaroid';
  const isPopulated = Boolean(targetSrc) && (src ? true : Boolean(config?.populated));

  useEffect(() => {
    setHasError(false);
  }, [targetSrc]);

  if (!isPopulated || hasError) {
    return (
      <HeirloomMediaPlaceholder
        variant={targetVariant}
        label={targetCaption}
        className={className}
        theme={theme}
      />
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl ${aspectRatio} ${className}`}>
      <img
        src={resolveImageUrl(targetSrc)}
        alt={targetAlt}
        loading={loading}
        onError={() => setHasError(true)}
        style={{ objectPosition }}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
};
