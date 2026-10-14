"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NakshatraDimensionCardProps {
  nakshatraNameHi?: string;
  nakshatraNameEn?: string;
  nakshatraIndex?: number;
  variant?: "dark" | "parchment";
  className?: string;
}

export function NakshatraDimensionCard({
  nakshatraNameHi = "आश्लेषा",
  nakshatraNameEn = "Ashlesha",
  nakshatraIndex = 8,
  variant = "dark",
  className,
}: NakshatraDimensionCardProps) {
  const isParchment = variant === "parchment";
  const safeIndex = Math.max(0, Math.min(26, nakshatraIndex));
  const activeSectorDeg = (safeIndex / 27) * 360;

  const pills = [
    "27 Stellar Mansions",
    "108 Sacred Harmonics",
    "Cosmic Archetypes",
  ];

  return (
    <div
      className={cn(
        "w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 px-2 sm:px-4",
        className
      )}
    >
      {/* ── LHS: Stellar Wheel ───────────────────────────────────────────── */}
      <div className="w-full md:w-[38%] flex flex-col items-center justify-center shrink-0">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Outer zodiac boundary */}
            <circle
              cx="100"
              cy="100"
              r="76"
              fill="none"
              stroke={isParchment ? "#8A5A1A" : "#D4A65A"}
              strokeWidth="1"
              opacity={isParchment ? 0.35 : 0.25}
            />

            {/* 27 Mansions Radiating Spokes */}
            {Array.from({ length: 27 }).map((_, i) => {
              const angleDeg = (i / 27) * 360 - 90;
              const rad = (angleDeg * Math.PI) / 180;
              const x1 = 100 + 44 * Math.cos(rad);
              const y1 = 100 + 44 * Math.sin(rad);
              const x2 = 100 + 76 * Math.cos(rad);
              const y2 = 100 + 76 * Math.sin(rad);
              const isActive = i === safeIndex;

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    isActive
                      ? isParchment ? "#B8873D" : "#E8B94B"
                      : isParchment ? "#8A5A1A" : "#D4A65A"
                  }
                  strokeWidth={isActive ? "2" : "0.75"}
                  opacity={isActive ? 1 : (isParchment ? 0.35 : 0.25)}
                />
              );
            })}

            {/* Active Highlighted 13°20' Sector Wedge */}
            {(() => {
              const startDeg = activeSectorDeg - 90;
              const endDeg = startDeg + 360 / 27;
              const startRad = (startDeg * Math.PI) / 180;
              const endRad = (endDeg * Math.PI) / 180;
              const r1 = 44;
              const r2 = 76;

              const x1 = 100 + r1 * Math.cos(startRad);
              const y1 = 100 + r1 * Math.sin(startRad);
              const x2 = 100 + r2 * Math.cos(startRad);
              const y2 = 100 + r2 * Math.sin(startRad);
              const x3 = 100 + r2 * Math.cos(endRad);
              const y3 = 100 + r2 * Math.sin(endRad);
              const x4 = 100 + r1 * Math.cos(endRad);
              const y4 = 100 + r1 * Math.sin(endRad);

              const d = `M ${x1} ${y1} L ${x2} ${y2} A ${r2} ${r2} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${r1} ${r1} 0 0 0 ${x1} ${y1} Z`;

              return (
                <path
                  d={d}
                  fill={isParchment ? "#B8873D" : "#E8B94B"}
                  fillOpacity={isParchment ? "0.22" : "0.3"}
                  stroke={isParchment ? "#B8873D" : "#E8B94B"}
                  strokeWidth="1.2"
                />
              );
            })()}

            {/* Center Celestial Node */}
            <circle
              cx="100"
              cy="100"
              r="18"
              fill={isParchment ? "#2A1B10" : "#070E1E"}
              stroke={isParchment ? "#B8873D" : "#D4A65A"}
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
            NAKSHATRA · नक्षत्र
          </span>
          <span
            className={cn(
              "text-xl sm:text-2xl font-hindi font-semibold mt-0.5",
              isParchment ? "text-[#2A1B10]" : "text-[#FFF5D1]"
            )}
          >
            {nakshatraNameHi} ({nakshatraNameEn})
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
              The 27 Lunar Mansions
            </h3>
            <span
              className={cn(
                "font-hindi text-lg sm:text-xl font-medium",
                isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
              )}
            >
              सत्ताईस नक्षत्र
            </span>
          </div>
          <p
            className={cn(
              "font-sans text-xs sm:text-sm mt-1 font-medium tracking-wide",
              isParchment ? "text-[#8A5A1A]" : "text-[#E8B94B]/90"
            )}
          >
            Stellar Gates of the Sidereal Moon
          </p>
        </div>

        <p
          className={cn(
            "font-sans text-xs sm:text-[13.5px] leading-relaxed",
            isParchment ? "text-[#3D2A1A]/85" : "text-ivory/75"
          )}
        >
          The 360° celestial sphere is partitioned into 27 stellar gates traversed by the Moon every sidereal month. Each mansion splits into 4 Padas (3°20&apos;), creating 108 cosmic harmonics bridging human breath to the cosmos, presided over by Vedic deities and planetary rulers.
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
