import { useState, useEffect } from 'react';
import { getFallbackBackgroundUrl } from '../../features/background/monthBackgrounds';

interface BackgroundLayerProps {
  imageUrl: string;
  children: React.ReactNode;
}

/**
 * Reusable background layer component that renders a background image
 * with contrast overlays and implements runtime fallback on load error.
 */
export default function BackgroundLayer({ imageUrl, children }: BackgroundLayerProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  // Reset error state when imageUrl changes
  useEffect(() => {
    setCurrentImageUrl(imageUrl);
    setHasError(false);
  }, [imageUrl]);

  // Handle image load error by falling back to default
  useEffect(() => {
    if (hasError) {
      setCurrentImageUrl(getFallbackBackgroundUrl());
    }
  }, [hasError]);

  // Preload image and handle errors
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Image loaded successfully
    };
    img.onerror = () => {
      setHasError(true);
    };
    img.src = currentImageUrl;
  }, [currentImageUrl]);

  return (
    <div className="min-h-screen relative">
      {/* Background image with overlays */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{ backgroundImage: `url(${currentImageUrl})` }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
