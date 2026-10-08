"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BrassButton } from "@/components/atoms/BrassButton";
import { GoldDivider } from "@/components/atoms/GoldDivider";

interface CtaCardProps {
  titleEn: string;
  titleHi: string;
  description: string;
  buttonTextEn: string;
  buttonTextHi?: string;
  buttonSize?: "sm" | "md" | "lg";
  href?: string;
  variant?: "dark" | "light";
  className?: string;
  unboxed?: boolean;
}

export function CtaCard({
  titleEn,
  titleHi,
  description,
  buttonTextEn,
  buttonTextHi,
  buttonSize = "md",
  href = "/contact",
  variant = "dark",
  className,
  unboxed = false,
}: CtaCardProps) {
  const isLight = variant === "light";

  if (unboxed) {
    return (
      <div
        className={cn(
          "relative w-full flex flex-col items-center text-center gap-6 sm:gap-7 transition-colors duration-500",
          isLight ? "text-[#2A1B10]" : "text-ivory",
          className
        )}
      >
        {/* Subtle Ambient Glow Behind Content */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full blur-3xl pointer-events-none",
            isLight ? "bg-[#B8873D]/10" : "bg-[#D4A65A]/10"
          )}
        />

        {/* Text Column */}
        <div className="flex flex-col items-center flex-1 max-w-2xl z-10 space-y-2">
          <h2
            className={cn(
              "font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight",
              isLight ? "text-[#2A1B10]" : "text-[#FBF5E7]"
            )}
          >
            {titleEn}
          </h2>
          <h3
            className={cn(
              "font-hindi text-2xl sm:text-3xl md:text-4xl leading-tight",
              isLight ? "text-[#B8873D]" : "text-[#D4A65A]"
            )}
          >
            {titleHi}
          </h3>

          <GoldDivider
            variant={isLight ? "light" : "dark"}
            className="my-3 max-w-xs scale-90"
          />

          <p
            className={cn(
              "font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-xl pt-1",
              isLight ? "text-[#3D2A1A]/80" : "text-ivory/75"
            )}
          >
            {description}
          </p>
        </div>

        {/* Button Column with Heartbeat Glow */}
        <div className="shrink-0 relative group z-10 flex justify-center pt-2">
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-lg blur-xl motion-safe:animate-heartbeat",
              isLight ? "bg-[#B8873D]/30" : "bg-antique-gold/50"
            )}
          />
          <BrassButton
            en={buttonTextEn}
            hi={buttonTextHi}
            href={href}
            size={buttonSize}
            variant="primary"
            className="shadow-none"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full rounded-2xl transition-colors duration-500",
        "px-6 py-10 sm:px-10 sm:py-14",
        "flex flex-col items-center gap-8 text-center",
        isLight
          ? "bg-[#F3E9D2] border border-[#B8873D]/30 shadow-[0_4px_30px_rgba(184,135,61,0.12)] text-[#2A1B10]"
          : "bg-void-navy border border-brass/20 text-ivory",
        className
      )}
    >
      {/* Background Accent (Faint glowing halo in top-right) */}
      <div
        className={cn(
          "absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none",
          isLight ? "bg-[#B8873D]/15" : "bg-antique-gold/10"
        )}
      />

      {/* Text Column */}
      <div className="flex flex-col items-center flex-1 max-w-2xl z-10">
        <h2
          className={cn(
            "font-serif text-3xl sm:text-4xl font-semibold leading-tight",
            isLight ? "text-[#2A1B10]" : "text-ivory"
          )}
        >
          {titleEn}
        </h2>
        <h3
          className={cn(
            "font-hindi text-2xl sm:text-3xl mt-2 leading-tight",
            isLight ? "text-[#B8873D]" : "text-antique-gold"
          )}
        >
          {titleHi}
        </h3>
        <p
          className={cn(
            "font-sans text-sm sm:text-base leading-relaxed mt-4 max-w-xl",
            isLight ? "text-[#3D2A1A]/75" : "text-ivory/60"
          )}
        >
          {description}
        </p>
      </div>

      {/* Button Column */}
      <div className="shrink-0 relative group z-10 flex justify-center">
        {/* The Heartbeat Glow Behind the Button */}
        <div className="absolute inset-0 -z-10 rounded-lg bg-antique-gold/50 blur-xl motion-safe:animate-heartbeat" />

        {/* The actual button */}
        <BrassButton
          en={buttonTextEn}
          hi={buttonTextHi}
          href={href}
          size={buttonSize}
          variant="primary"
          className="shadow-none"
        />
      </div>
    </div>
  );
}
