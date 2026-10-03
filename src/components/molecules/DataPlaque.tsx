"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlowingDigit } from "@/components/atoms/GlowingDigit";
import { ProgressArc } from "@/components/atoms/ProgressArc";

interface DataPlaqueProps {
  label: string;
  labelHi?: string;
  type: "named" | "numeric";
  
  // For "named" type
  nameHi?: string;
  nameEn?: string;
  progress?: number; // 0-1 fraction
  progressTotal?: number;

  // For "numeric" type
  digits?: string; // e.g., "09:45:23"
  digitLabels?: string[];

  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DataPlaque({
  label,
  labelHi,
  type,
  nameHi,
  nameEn,
  progress = 0,
  progressTotal = 30,
  digits = "",
  digitLabels = [],
  size = "md",
  className,
}: DataPlaqueProps) {
  // Width bounds for the container
  const sizeClasses = {
    sm: "min-w-[8rem]", // w-32 equivalent min
    md: "min-w-[12rem]", // w-48 equivalent min
    lg: "min-w-[16rem]", // w-64 equivalent min
  };

  const arcWidths = {
    sm: 90,
    md: 140,
    lg: 190,
  };

  // Safe calculation for the progress arc current tick
  const currentTick = Math.round(progress * progressTotal);

  return (
    <div
      className={cn(
        "flex flex-col bg-void-navy/80 border border-brass/30 rounded-lg px-4 sm:px-5 py-4 shadow-[inset_0_1px_0_rgba(184,135,61,0.2)]",
        sizeClasses[size],
        className
      )}
    >
      {/* Top Label Row */}
      <div className="flex items-center justify-center gap-1.5 mb-4 opacity-90">
        <span className="font-sans uppercase tracking-widest text-[10px] text-antique-gold">
          {label}
        </span>
        {labelHi && (
          <>
            <span className="text-[10px] text-antique-gold/70 font-bold">·</span>
            <span className="font-hindi text-[11px] text-antique-gold">
              {labelHi}
            </span>
          </>
        )}
      </div>

      {/* Named Type Body */}
      {type === "named" && (
        <div className="flex flex-col items-center justify-center flex-1">
          {nameHi && (
            <h3 className="font-hindi text-2xl sm:text-3xl text-antique-gold font-bold leading-tight text-center drop-shadow-md">
              {nameHi}
            </h3>
          )}
          {nameEn && (
            <p className="font-sans text-[11px] sm:text-xs text-ivory uppercase tracking-wider mt-1.5 text-center">
              {nameEn}
            </p>
          )}

          {/* Progress Arc */}
          <div className="mt-5 w-full flex justify-center">
            <ProgressArc
              current={currentTick}
              total={progressTotal}
              width={arcWidths[size]}
              direction="down"
            />
          </div>
        </div>
      )}

      {/* Numeric Type Body */}
      {type === "numeric" && (
        <div className="flex items-start justify-center gap-1 sm:gap-2 flex-1 mt-2">
          {digits.split(":").map((group, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className="flex gap-0.5">
                  {group.split("").map((char, j) => (
                    <GlowingDigit key={j} value={char} size={size} />
                  ))}
                </div>
                {digitLabels[i] && (
                  <span className="font-sans text-[9px] sm:text-[10px] text-antique-gold uppercase tracking-widest mt-3">
                    {digitLabels[i]}
                  </span>
                )}
              </div>
              
              {/* Colon Separator */}
              {i < arr.length - 1 && (
                <div className="flex flex-col items-center justify-start pt-1 sm:pt-2 opacity-60">
                  <GlowingDigit value=":" size={size} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
