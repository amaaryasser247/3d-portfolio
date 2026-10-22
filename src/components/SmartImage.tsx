import { useState, type SyntheticEvent } from 'react';
import type { ImageAsset } from '../data/portfolio';

interface SmartImageProps {
  asset: ImageAsset;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Renders an ImageAsset. Tries the local `src` first; if the file fails to
 * load, swaps once to `fallbackSrc` so the section always renders an image.
 */
export default function SmartImage({ asset, className, loading = 'lazy' }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (failed) {
      // Fallback also failed — hide the broken image gracefully.
      event.currentTarget.style.visibility = 'hidden';
      return;
    }
    setFailed(true);
  };

  return (
    <img
      src={failed ? asset.fallbackSrc : asset.src}
      alt={asset.alt}
      loading={loading}
      draggable={false}
      onError={handleError}
      className={className}
    />
  );
}
