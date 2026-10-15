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

  const containerClasses = isDark
    ? "bg-gradient-to-b from-white/[0.05] via-white/[0.025] to-transparent hover:from-white/[0.08] hover:via-white/[0.04] hover:to-white/[0.02] backdrop-blur-md border border-[#D4A65A]/20 hover:border-[#D4A65A]/50 ring-1 ring-inset ring-white/[0.06] hover:ring-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:shadow-[0_14px_44px_rgba(212,166,90,0.15)] hover:-translate-y-1"
    : "bg-gradient-to-b from-white/45 to-white/20 hover:from-white/65 hover:to-white/35 backdrop-blur-md border border-[#B8873D]/30 hover:border-[#B8873D]/60 ring-1 ring-inset ring-white/70 hover:ring-white/90 shadow-[0_8px_24px_rgba(61,42,26,0.06)] hover:shadow-[0_14px_36px_rgba(184,135,61,0.16)] hover:-translate-y-1";

  const numBadgeClasses = isDark
    ? "bg-[#D4A65A]/15 border-[#D4A65A]/30 text-[#E8B94B] shadow-[0_0_12px_rgba(212,166,90,0.08)]"
    : "bg-brass/15 border-brass/35 text-brass shadow-sm";

  const iconColor = isDark ? "text-antique-gold" : "text-brass";
  const titleColorEn = isDark ? "text-ivory" : "text-[#2A1B10]";
  const titleColorHi = isDark ? "text-antique-gold/90" : "text-[#8B6425]";
  const taglineColor = isDark ? "text-ivory/70" : "text-[#3D2A1A]/80";
  const dividerColor = isDark ? "border-white/10" : "border-brass/25";

  const capsuleClasses = isDark
    ? "bg-white/[0.04] border border-[#D4A65A]/25 text-antique-gold hover:border-antique-gold/60 hover:bg-white/[0.08] shadow-[0_0_12px_rgba(212,166,90,0.06)]"
    : "bg-white/60 border border-brass/30 text-deep-bronze hover:border-brass/60 hover:bg-white/90 shadow-sm";

  return (
    <div
      className={cn(
        "flex flex-col justify-between p-5 sm:p-6 lg:p-5 xl:p-6 w-full h-full rounded-2xl motion-safe:transition-all motion-safe:duration-300",
        containerClasses,
        className
      )}
    >
      <div>
        {/* Top Header: Number Badge or Icon + Hindi Title */}
        {num ? (
          <div className="flex items-center gap-2 mb-3">
            <span
              className={cn(
                "font-mono text-xs font-bold px-2 py-0.5 rounded-full border tracking-wider",
                numBadgeClasses
              )}
            >
              {num}
            </span>
            {titleHi && (
              <span className={cn("text-xs font-hindi tracking-wide", titleColorHi)}>
                {titleHi}
              </span>
            )}
          </div>
        ) : icon ? (
          <div className={cn("w-10 h-10 mb-3 flex items-center justify-start drop-shadow-sm", iconColor)}>
            <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5] [&>svg]:stroke-currentColor [&>svg]:fill-none">
              {icon}
            </div>
          </div>
        ) : null}

        {/* English Title */}
        <h4 className={cn("font-serif text-lg font-semibold leading-snug mb-2.5", titleColorEn)}>
          {titleEn}
        </h4>

        {/* If no num was provided but titleHi exists, display it below title */}
        {!num && titleHi && (
          <h5 className={cn("font-hindi text-sm mb-2", titleColorHi)}>
            {titleHi}
          </h5>
        )}

        {/* Tagline / Description */}
        <p className={cn("font-sans text-xs sm:text-sm leading-relaxed", taglineColor)}>
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
