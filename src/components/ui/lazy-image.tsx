"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt?: string;
  ratio?: number;
  inView?: boolean;
  className?: string;
}

const VEDIC_IMAGE_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
      <rect width="100%" height="100%" fill="#060B18"/>
      <circle cx="600" cy="337" r="220" fill="none" stroke="#D4A65A" stroke-width="1.5" stroke-opacity="0.25"/>
      <circle cx="600" cy="337" r="160" fill="none" stroke="#D4A65A" stroke-width="1" stroke-dasharray="4 8" stroke-opacity="0.35"/>
      <circle cx="600" cy="337" r="80" fill="none" stroke="#D4A65A" stroke-width="1" stroke-opacity="0.45"/>
      <text x="600" y="343" fill="#D4A65A" font-family="serif" font-size="24" text-anchor="middle" letter-spacing="4" opacity="0.85">VIKRAMADITYA VEDIC CLOCK</text>
    </svg>`
  );

export function LazyImage({
  src,
  fallback = VEDIC_IMAGE_FALLBACK,
  alt = "",
  ratio = 16 / 9,
  inView = true,
  className,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(inView);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      setShouldLoad(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "150px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg bg-black/10 dark:bg-white/5 select-none"
      style={{ aspectRatio: `${ratio}` }}
    >
      {/* Golden-shimmer skeleton while loading */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#D4A65A]/10 via-[#F5D590]/25 to-[#D4A65A]/10"
        />
      )}

      {shouldLoad && (
        <img
          src={hasError ? fallback : src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
            className
          )}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
}

export default LazyImage;
