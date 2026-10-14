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

export function LazyImage({
  src,
  fallback = "https://cdn.21st.dev/assets/mirror/cc/ccf6e78beb7f7cc5b720069cb4f86696912be109614973d49df165d1e51631c8.svg",
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
      className="relative w-full overflow-hidden rounded-lg bg-black/5 dark:bg-white/5 select-none"
      style={{ aspectRatio: `${ratio}` }}
    >
      {/* Shimmer skeleton while loading */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#B8873D]/10 via-[#B8873D]/5 to-[#B8873D]/10"
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
