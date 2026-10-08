"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BilingualPill } from "@/components/atoms/BilingualPill";

interface ProcessStepCardProps {
  step: number;
  icon: React.ReactNode;
  titleEn: string;
  titleHi: string;
  description: string;
  pill?: {
    en: string;
    hi: string;
  };
  variant?: "dark" | "light";
  className?: string;
}

export function ProcessStepCard({
  step,
  icon,
  titleEn,
  titleHi,
  description,
  pill,
  variant = "dark",
  className,
}: ProcessStepCardProps) {
  const isDark = variant === "dark";
  const titleColor = isDark ? "text-[#FBF5E7]" : "text-[#2A1B10]";
  const descColor = isDark ? "text-ivory/70" : "text-[#2A1B10]/70";
  const stepStr = step < 10 ? `0${step}` : `${step}`;

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center px-4 py-4 w-full max-w-[320px] relative group",
        className
      )}
    >
      {/* 1. Refined Step Number Bead */}
      <div
        className={cn(
          "w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 z-10",
          isDark
            ? "border-[#D4A65A]/40 bg-[#091020] shadow-[0_0_12px_rgba(212,166,90,0.15)] group-hover:border-[#E8B94B]"
            : "border-[#B8873D]/40 bg-[#FAF5E8] shadow-sm group-hover:border-[#8A5A1A]"
        )}
      >
        <span
          className={cn(
            "font-mono text-xs font-semibold tracking-wider",
            isDark ? "text-[#E8B94B]" : "text-[#8A5A1A]"
          )}
        >
          {stepStr}
        </span>
      </div>

      {/* 2. Icon Container */}
      <div
        className={cn(
          "w-16 h-16 mt-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
          isDark
            ? "text-[#E8B94B] drop-shadow-[0_2px_8px_rgba(232,185,75,0.25)]"
            : "text-[#B8873D] drop-shadow-sm"
        )}
      >
        <div className="w-10 h-10 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5]">
          {icon}
        </div>
      </div>

      {/* 3. Titles */}
      <div className="mt-4 flex flex-col items-center gap-0.5">
        <h4 className={cn("font-serif text-xl font-medium tracking-tight", titleColor)}>
          {titleEn}
        </h4>
        <h5
          className={cn(
            "font-hindi text-sm font-medium",
            isDark ? "text-[#D4A65A]" : "text-[#8A5A1A]"
          )}
        >
          {titleHi}
        </h5>
      </div>

      {/* 4. Description */}
      <p
        className={cn(
          "font-sans text-xs sm:text-[13px] mt-3 leading-relaxed",
          isDark ? "text-ivory/70" : "text-[#3D2A1A]/80"
        )}
      >
        {description}
      </p>

      {/* 5. Optional Tag Pill */}
      {pill && (
        <div className="mt-4 pt-1">
          <BilingualPill
            en={pill.en}
            hi={pill.hi}
            size="sm"
            variant={isDark ? "dark" : "light"}
          />
        </div>
      )}
    </div>
  );
}
