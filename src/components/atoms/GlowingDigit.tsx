"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GlowingDigitProps {
  value: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const digitMap: Record<string, string> = {
  "0": "/assets/numbers/0.webp",
  "1": "/assets/numbers/1.webp",
  "2": "/assets/numbers/2.webp",
  "3": "/assets/numbers/3.webp",
  "4": "/assets/numbers/4.webp",
  "5": "/assets/numbers/5.webp",
  "6": "/assets/numbers/6.webp",
  "7": "/assets/numbers/7.webp",
  "8": "/assets/numbers/8.webp",
  "9": "/assets/numbers/9.webp",
  ":": "/assets/numbers/colon.webp",
};

export function GlowingDigit({ value, size = "md", className }: GlowingDigitProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (value !== currentValue) {
      setPrevValue(currentValue);
      setCurrentValue(value);
      setIsFading(true);

      const timer = setTimeout(() => {
        setPrevValue(null);
        setIsFading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [value, currentValue]);

  const sizeConfig = {
    sm: { container: "h-8", imageH: 28 },
    md: { container: "h-12", imageH: 44 },
    lg: { container: "h-20", imageH: 72 },
  };

  const h = sizeConfig[size].imageH;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0",
        sizeConfig[size].container,
        className
      )}
    >
      {/* Amber Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none scale-125"
        style={{
          background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Previous Value (Fading out) */}
      {prevValue && digitMap[prevValue] && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center z-10",
            "motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in-out",
            isFading ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={digitMap[prevValue]}
            alt=""
            height={h}
            width={0}
            sizes={`${h}px`}
            priority
            className="object-contain"
            style={{ width: "auto", height: `${h}px` }}
          />
        </div>
      )}

      {/* Current Value (Fading in) */}
      {digitMap[currentValue] && (
        <div
          className={cn(
            "relative flex items-center justify-center z-20",
            "motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in-out",
            isFading && prevValue ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={digitMap[currentValue]}
            alt=""
            height={h}
            width={0}
            sizes={`${h}px`}
            priority
            className="object-contain"
            style={{ width: "auto", height: `${h}px` }}
          />
        </div>
      )}
    </div>
  );
}
