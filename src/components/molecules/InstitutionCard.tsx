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
    ? "bg-[#080E1C]/80 border border-brass/25 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-brass/50 hover:shadow-[0_8px_32px_rgba(184,135,61,0.15)]"
    : "bg-white/75 border border-[#B8873D]/25 shadow-sm hover:border-[#B8873D]/50 hover:shadow-md backdrop-blur-sm";

  const numBadgeClasses = isDark
    ? "bg-antique-gold/15 border-antique-gold/30 text-antique-gold"
    : "bg-brass/15 border-brass/35 text-brass";

  const iconColor = isDark ? "text-antique-gold" : "text-brass";
  const titleColorEn = isDark ? "text-ivory" : "text-deep-bronze";
  const titleColorHi = isDark ? "text-antique-gold/90" : "text-brass";
  const taglineColor = isDark ? "text-ivory/70" : "text-deep-bronze/80";
  const dividerColor = isDark ? "border-brass/20" : "border-brass/25";

  const capsuleClasses = isDark
    ? "bg-brass/15 border border-brass/35 text-antique-gold hover:border-antique-gold/60 hover:bg-brass/25 shadow-[0_0_12px_rgba(212,166,90,0.06)]"
    : "bg-deep-bronze/10 border border-deep-bronze/25 text-deep-bronze hover:border-deep-bronze/50 hover:bg-deep-bronze/15 shadow-sm";

  return (
    <div
      className={cn(
        "flex flex-col justify-between p-5 sm:p-6 w-full h-full rounded-2xl motion-safe:transition-all motion-safe:duration-300",
        containerClasses,
        className
      )}
    >
      <div>
        {/* Top Header: Number Badge or Icon + Hindi Title */}
        {num ? (
          <div className="flex items-center gap-2 mb-2.5">
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
        <h4 className={cn("font-serif text-lg font-semibold leading-snug mb-2", titleColorEn)}>
          {titleEn}
        </h4>

        {/* If no num was provided but titleHi exists, display it below title */}
        {!num && titleHi && (
          <h5 className={cn("font-hindi text-sm mb-2", titleColorHi)}>
            {titleHi}
          </h5>
        )}

        {/* Tagline with consistent min-height for row-level alignment */}
        <p className={cn("font-sans text-xs sm:text-sm leading-relaxed mb-4 min-h-[58px] sm:min-h-[66px]", taglineColor)}>
          {tagline}
        </p>
      </div>

      {/* Capsule Bullets with uniform single-line height matching BilingualPill aesthetic */}
      {bullets.length > 0 && (
        <div className={cn("pt-4 border-t flex flex-col gap-2 w-full", dividerColor)}>
          {bullets.map((bullet, idx) => (
            <div
              key={idx}
              className={cn(
                "h-8 sm:h-8.5 px-3 rounded-full text-[10px] sm:text-[10.5px] xl:text-[11px] font-sans font-medium uppercase tracking-wider sm:tracking-widest flex items-center justify-center text-center transition-all duration-200 whitespace-nowrap overflow-hidden select-none",
                capsuleClasses
              )}
            >
              <span className="truncate">{bullet}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
