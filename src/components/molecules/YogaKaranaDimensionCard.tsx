"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface YogaKaranaDimensionCardProps {
  yogaNameHi?: string;
  yogaNameEn?: string;
  karanaNameHi?: string;
  karanaNameEn?: string;
  variant?: "dark" | "parchment";
  className?: string;
}

export function YogaKaranaDimensionCard({
  yogaNameHi = "साध्य",
  yogaNameEn = "Sadhya",
  karanaNameHi = "बव",
  karanaNameEn = "Bava",
  variant = "dark",
  className,
}: YogaKaranaDimensionCardProps) {
  const isParchment = variant === "parchment";
  const pills = [
    "27 Nitya Yogas",
    "11 Pragmatic Karanas",
    "Bio-Polarity Balance",
  ];

  return (
    <div
      className={cn(
        "w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 px-2 sm:px-4",
        className
      )}
    >
      {/* ── LHS: Solar-Lunar Dial ────────────────────────────────────────── */}
      <div className="w-full md:w-[38%] flex flex-col items-center justify-center shrink-0">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Outer harmonic ring */}
            <circle
              cx="100"
              cy="100"
              r="76"
              fill="none"
              stroke={isParchment ? "#8A5A1A" : "#D4A65A"}
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity={isParchment ? 0.35 : 0.25}
            />

            {/* 27 Segment Ticks */}
            {Array.from({ length: 27 }).map((_, i) => {
              const rad = (i * (360 / 27) * Math.PI) / 180;
              const x1 = 100 + 66 * Math.cos(rad);
              const y1 = 100 + 66 * Math.sin(rad);
              const x2 = 100 + 76 * Math.cos(rad);
              const y2 = 100 + 76 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isParchment ? "#8A5A1A" : "#D4A65A"}
                  strokeWidth="1"
                  opacity={isParchment ? 0.4 : 0.3}
                />
              );
            })}

            {/* Sun Vector (Orange ray) */}
            <line
              x1="100"
              y1="100"
              x2="148"
              y2="52"
              stroke={isParchment ? "#C47D15" : "#F59E0B"}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="148" cy="52" r="4.5" fill={isParchment ? "#C47D15" : "#F59E0B"} />

            {/* Moon Vector (Cyan ray) */}
            <line
              x1="100"
              y1="100"
              x2="52"
              y2="62"
              stroke={isParchment ? "#2563EB" : "#38BDF8"}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="52" cy="62" r="4.5" fill={isParchment ? "#2563EB" : "#38BDF8"} />

            {/* Combined Resultant Vector (Gold ray) */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="28"
              stroke={isParchment ? "#B8873D" : "#E8B94B"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="100"
              cy="28"
              r="5.5"
              fill={isParchment ? "#FAF5E8" : "#FFF5D1"}
              stroke={isParchment ? "#B8873D" : "#E8B94B"}
              strokeWidth="1.5"
            />

            {/* Center Solar-Lunar Hub */}
            <circle
              cx="100"
              cy="100"
              r="16"
              fill={isParchment ? "#2A1B10" : "#070E1E"}
              stroke={isParchment ? "#B8873D" : "#E8B94B"}
              strokeWidth="1.2"
            />
            <circle
              cx="100"
              cy="100"
              r="4"
              fill={isParchment ? "#B8873D" : "#E8B94B"}
            />
          </svg>
        </div>

        {/* Clean Caption */}
        <div className="flex flex-col items-center text-center mt-2.5">
          <span
            className={cn(
              "text-[11px] font-sans tracking-[0.2em] uppercase font-semibold",
              isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]/80"
            )}
          >
            YOGA &amp; KARANA · योग व करण
          </span>
          <span
            className={cn(
              "text-xl sm:text-2xl font-hindi font-semibold mt-0.5",
              isParchment ? "text-[#2A1B10]" : "text-[#FFF5D1]"
            )}
          >
            {yogaNameHi} · {karanaNameHi}
          </span>
        </div>
      </div>

      {/* ── RHS: Clean Editorial Presentation ────────────────────────────── */}
      <div className="w-full md:w-[60%] flex flex-col justify-center text-center md:text-left space-y-3 sm:space-y-4">
        <div>
          <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-2 sm:gap-3">
            <h3
              className={cn(
                "font-serif text-2xl sm:text-3xl font-normal tracking-tight",
                isParchment ? "text-[#2A1B10]" : "text-[#FBF5E7]"
              )}
            >
              Angular Harmony &amp; Action
            </h3>
            <span
              className={cn(
                "font-hindi text-lg sm:text-xl font-medium",
                isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
              )}
            >
              योग एवं करण
            </span>
          </div>
          <p
            className={cn(
              "font-sans text-xs sm:text-sm mt-1 font-medium tracking-wide",
              isParchment ? "text-[#8A5A1A]" : "text-[#E8B94B]/90"
            )}
          >
            Solar-Lunar Synergy &amp; Pragmatic Windows
          </p>
        </div>

        <p
          className={cn(
            "font-sans text-xs sm:text-[13.5px] leading-relaxed",
            isParchment ? "text-[#3D2A1A]/85" : "text-ivory/75"
          )}
        >
          Synthesizes the solar vitality of the soul (Pingala) with the lunar receptivity of the mind (Ida). 27 Nitya Yogas measure subtle angular harmony, while 11 Karana half-tithi windows guide the pragmatic timing and efficacy of worldly endeavors.
        </p>

        {/* Minimal Spec Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
          {pills.map((pill, idx) => (
            <span
              key={idx}
              className={cn(
                "px-3 py-1 rounded-full text-[11px] font-sans transition-colors",
                isParchment
                  ? "bg-[#B8873D]/12 border border-[#B8873D]/30 text-[#2A1B10] font-medium"
                  : "bg-[#D4A65A]/10 border border-[#D4A65A]/25 text-[#FFF5D1]/90"
              )}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
