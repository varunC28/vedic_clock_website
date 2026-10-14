"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MuhurtaDimensionCardProps {
  muhurtaNameHi?: string;
  muhurtaNameEn?: string;
  muhurtaIndex?: number;
  variant?: "dark" | "parchment";
  className?: string;
}

export function MuhurtaDimensionCard({
  muhurtaNameHi = "अभिजित",
  muhurtaNameEn = "Abhijit",
  muhurtaIndex = 7,
  variant = "dark",
  className,
}: MuhurtaDimensionCardProps) {
  const isParchment = variant === "parchment";
  const safeIndex = Math.max(0, Math.min(29, muhurtaIndex));
  const pointerAngle = (safeIndex / 30) * 360;
  const pointerRad = ((pointerAngle - 90) * Math.PI) / 180;
  const handX = 100 + 58 * Math.cos(pointerRad);
  const handY = 100 + 58 * Math.sin(pointerRad);

  const pills = [
    "30 Diurnal Windows",
    "48 Minutes / Cycle",
    "Sunrise Calibrated",
  ];

  return (
    <div
      className={cn(
        "w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 px-2 sm:px-4",
        className
      )}
    >
      {/* ── LHS: Clean Astronomical Dial ─────────────────────────────────── */}
      <div className="w-full md:w-[38%] flex flex-col items-center justify-center shrink-0">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Horizon Reference Line */}
            <line
              x1="26"
              y1="100"
              x2="174"
              y2="100"
              stroke={isParchment ? "#8A5A1A" : "#D4A65A"}
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity={isParchment ? 0.35 : 0.25}
            />

            {/* 30 Muhurta Dial Spokes */}
            {Array.from({ length: 30 }).map((_, i) => {
              const angleDeg = (i / 30) * 360 - 90;
              const rad = (angleDeg * Math.PI) / 180;
              const isZenith = i === 7;
              const isCurrent = i === safeIndex;
              const r1 = isCurrent ? 54 : isZenith ? 62 : 66;
              const r2 = 76;
              const x1 = 100 + r1 * Math.cos(rad);
              const y1 = 100 + r1 * Math.sin(rad);
              const x2 = 100 + r2 * Math.cos(rad);
              const y2 = 100 + r2 * Math.sin(rad);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    isCurrent
                      ? isParchment ? "#2A1B10" : "#FBF5E7"
                      : isZenith
                      ? isParchment ? "#B8873D" : "#E8B94B"
                      : i < 15
                      ? isParchment ? "#8A5A1A" : "#D4A65A"
                      : isParchment ? "#78716C" : "#64748B"
                  }
                  strokeWidth={isCurrent ? "2.5" : isZenith ? "1.5" : "0.75"}
                  opacity={isCurrent ? 1 : isZenith ? 0.95 : (isParchment ? 0.4 : 0.3)}
                />
              );
            })}

            {/* Midday Zenith (Abhijit) Marker */}
            <circle
              cx="100"
              cy="24"
              r="3.5"
              fill={isParchment ? "#B8873D" : "#E8B94B"}
            />

            {/* Sweeping Sun Ray Hand to Current Muhurta */}
            <line
              x1="100"
              y1="100"
              x2={handX}
              y2={handY}
              stroke={isParchment ? "#B8873D" : "#E8B94B"}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx={handX}
              cy={handY}
              r="4.5"
              fill={isParchment ? "#FAF5E8" : "#FFF5D1"}
              stroke={isParchment ? "#B8873D" : "#E8B94B"}
              strokeWidth="1.5"
            />

            {/* Central Sun Node */}
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
            MUHURTA · मुहूर्त
          </span>
          <span
            className={cn(
              "text-xl sm:text-2xl font-hindi font-semibold mt-0.5",
              isParchment ? "text-[#2A1B10]" : "text-[#FFF5D1]"
            )}
          >
            {muhurtaNameHi} ({muhurtaNameEn})
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
              Muhurta &amp; Micro-Time
            </h3>
            <span
              className={cn(
                "font-hindi text-lg sm:text-xl font-medium",
                isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
              )}
            >
              मुहूर्त चक्र
            </span>
          </div>
          <p
            className={cn(
              "font-sans text-xs sm:text-sm mt-1 font-medium tracking-wide",
              isParchment ? "text-[#8A5A1A]" : "text-[#E8B94B]/90"
            )}
          >
            Diurnal Cycles &amp; Solar Rhythm
          </p>
        </div>

        <p
          className={cn(
            "font-sans text-xs sm:text-[13.5px] leading-relaxed",
            isParchment ? "text-[#3D2A1A]/85" : "text-ivory/75"
          )}
        >
          Every 24-hour day is divided into 30 dynamic 48-minute cycles anchored to your true local sunrise. Rather than rigid artificial GMT zones, Vedic micro-time expands and contracts in living harmony with the Sun — cascading downward through Kalas and Kasthas to the atomic blink of an eye.
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
