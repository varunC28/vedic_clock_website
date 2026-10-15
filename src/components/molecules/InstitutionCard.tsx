"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InstitutionCardProps {
  num?: string;
  icon?: React.ReactNode;
  titleEn: string;
  titleHi: string;
  tagline: string;
  bullets?: string[];
  variant?: "dark" | "light";
  className?: string;
}

export function InstitutionCard({
  num,
  icon,
  titleEn,
  titleHi,
  tagline,
  bullets = [],
  variant = "dark",
  className,
}: InstitutionCardProps) {
  const isDark = variant === "dark";

  const numBadgeClasses = isDark
    ? "bg-[#D4A65A]/10 border-[#D4A65A]/30 text-[#E8B94B] group-hover:border-[#D4A65A]/70 group-hover:bg-[#D4A65A]/20 group-hover:shadow-[0_0_14px_rgba(212,166,90,0.25)]"
    : "bg-[#B8873D]/10 border-[#B8873D]/30 text-[#8B6425] group-hover:border-[#B8873D]/60 group-hover:bg-[#B8873D]/20 shadow-sm";

  const iconColor = isDark ? "text-antique-gold" : "text-brass";
  const titleColorEn = isDark ? "text-[#FBF5E7] group-hover:text-[#E8B94B]" : "text-[#2A1B10] group-hover:text-[#8B6425]";
  const titleColorHi = isDark ? "text-antique-gold/80" : "text-[#8B6425]/80";
  const taglineColor = isDark ? "text-ivory/70 group-hover:text-ivory/90" : "text-[#3D2A1A]/75 group-hover:text-[#3D2A1A]/95";
  const dividerColor = isDark ? "border-white/10" : "border-brass/25";

  const capsuleClasses = isDark
    ? "bg-white/[0.04] border border-[#D4A65A]/25 text-antique-gold hover:border-antique-gold/60 hover:bg-white/[0.08]"
    : "bg-[#3D2A1A]/[0.04] border border-[#B8873D]/25 text-[#3D2A1A] hover:border-[#B8873D]/50 hover:bg-[#3D2A1A]/[0.08]";

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between w-full h-full p-2 sm:p-3 lg:p-2 xl:p-3 bg-transparent select-none motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-y-1.5",
        className
      )}
    >
      <div>
        {/* ── Expanding Top Golden Accent Filament ── */}
        <div
          className={cn(
            "w-8 h-[1.5px] mb-4 rounded-full transition-all duration-300 ease-out group-hover:w-16",
            isDark
              ? "bg-gradient-to-r from-[#D4A65A]/70 to-transparent group-hover:from-[#E8B94B]"
              : "bg-gradient-to-r from-[#B8873D]/70 to-transparent group-hover:from-[#8B6425]"
          )}
        />

        {/* Top Header: Number Badge or Icon + Hindi Title */}
        {num ? (
          <div className="flex items-center gap-2 mb-3">
            <span
              className={cn(
                "font-mono text-xs font-semibold px-2 py-0.5 rounded-full border tracking-wider transition-all duration-300 group-hover:scale-105",
                numBadgeClasses
              )}
            >
              {num}
            </span>
            {titleHi && (
              <span className={cn("text-xs font-hindi tracking-wide transition-colors duration-300", titleColorHi)}>
                {titleHi}
              </span>
            )}
          </div>
        ) : icon ? (
          <div className={cn("w-10 h-10 mb-3 flex items-center justify-start drop-shadow-sm transition-transform duration-300 group-hover:scale-105", iconColor)}>
            <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5] [&>svg]:stroke-currentColor [&>svg]:fill-none">
              {icon}
            </div>
          </div>
        ) : null}

        {/* English Title */}
        <h4 className={cn("font-serif text-lg sm:text-xl font-normal leading-snug mb-2.5 transition-colors duration-300", titleColorEn)}>
          {titleEn}
        </h4>

        {/* If no num was provided but titleHi exists, display it below title */}
        {!num && titleHi && (
          <h5 className={cn("font-hindi text-sm mb-2", titleColorHi)}>
            {titleHi}
          </h5>
        )}

        {/* Tagline / Description */}
        <p className={cn("font-sans text-xs sm:text-[13px] xl:text-sm leading-relaxed transition-colors duration-300", taglineColor)}>
          {tagline}
        </p>
      </div>

      {/* Capsule Bullets with uniform single-line height matching BilingualPill aesthetic */}
      {bullets.length > 0 && (
        <div className={cn("pt-4 mt-4 border-t flex flex-col gap-2 w-full", dividerColor)}>
          {bullets.map((bullet, idx) => (
            <div
              key={idx}
              className={cn(
                "h-8 sm:h-8.5 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-[11.5px] xl:text-xs font-sans font-medium tracking-tight sm:tracking-normal flex items-center justify-center text-center transition-all duration-200 whitespace-nowrap select-none",
                capsuleClasses
              )}
            >
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
