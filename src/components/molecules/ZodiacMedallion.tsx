"use client";

import { cn } from "@/lib/utils";
import { IconMedallion } from "@/components/atoms/IconMedallion";
import { ProgressArc } from "@/components/atoms/ProgressArc";

interface ZodiacMedallionProps {
  iconSrc: string;
  nameEn: string;
  nameHi: string;
  progress?: number; // 0-1 fraction
  progressTotal?: number;
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  className?: string;
}

export function ZodiacMedallion({
  iconSrc,
  nameEn,
  nameHi,
  progress,
  progressTotal = 30,
  size = "md",
  isActive = false,
  className,
}: ZodiacMedallionProps) {
  const arcWidths = {
    sm: 64,
    md: 104,
    lg: 136,
  };

  const arcMargins = {
    sm: "-mt-1",
    md: "-mt-2",
    lg: "-mt-3",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center shrink-0 relative", className)}>
      {/* 1. Icon Medallion (A4) */}
      <IconMedallion 
        src={iconSrc} 
        alt={nameEn} 
        size={size} 
        glow={isActive} 
        className="z-10" 
      />

      {/* 2. Progress Arc (A6) - Cupping the medallion */}
      {progress !== undefined && (
        <div className={cn("z-20 relative", arcMargins[size])}>
          <ProgressArc
            current={Math.round(progress * progressTotal)}
            total={progressTotal}
            width={arcWidths[size]}
            direction="down"
            showLabel={false}
          />
        </div>
      )}

      {/* 3. Bilingual Labels */}
      {/* Add a tiny top margin if progress arc is not there to balance spacing */}
      <div className={cn("flex flex-col items-center gap-1.5", progress !== undefined ? "mt-1" : "mt-3")}>
        <span className="font-sans text-[10px] sm:text-[11px] text-antique-gold uppercase tracking-widest leading-none text-center">
          {nameEn}
        </span>
        <span className="font-hindi text-xs sm:text-sm text-antique-gold leading-none text-center">
          {nameHi}
        </span>
      </div>
    </div>
  );
}
