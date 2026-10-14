"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TithiDimensionCardProps {
  tithiNameHi?: string;
  variant?: "dark" | "parchment";
  className?: string;
}

export function TithiDimensionCard({
  tithiNameHi = "एकादशी",
  variant = "dark",
  className,
}: TithiDimensionCardProps) {
  const isParchment = variant === "parchment";
  const [orbitAngle, setOrbitAngle] = useState(36);

  useEffect(() => {
    let animId: number;
    const start = performance.now();
    const animate = (time: number) => {
      const elapsed = (time - start) / 1000;
      setOrbitAngle((36 + elapsed * 18) % 360);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const pills = [
    "30 Lunar Days",
    "12° Angular Step",
    "Tidal & Biological Rhythm",
  ];

  return (
    <div
      className={cn(
        "w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 px-2 sm:px-4",
        className
      )}
    >
      {/* ── LHS: Astronomical Orbit Dial ─────────────────────────────────── */}
      <div className="w-full md:w-[38%] flex flex-col items-center justify-center shrink-0">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 220 220" fill="none">
            {/* 30 Lunar Step Orbit Ring */}
            <circle
              cx="110"
              cy="110"
              r="76"
              stroke={isParchment ? "#8A5A1A" : "#D4A65A"}
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity={isParchment ? 0.35 : 0.25}
            />

            {/* 30 Lunar Step Ticks */}
            {Array.from({ length: 30 }).map((_, i) => {
              const ang = (i * 12 * Math.PI) / 180 - Math.PI / 2;
              const tx = 110 + 76 * Math.cos(ang);
              const ty = 110 + 76 * Math.sin(ang);
              const isPassed = Math.floor(orbitAngle / 12) >= i;
              return (
                <circle
                  key={i}
                  cx={tx}
                  cy={ty}
                  r={isPassed ? "2.2" : "1.2"}
                  fill={
                    isPassed
                      ? isParchment ? "#B8873D" : "#E8B94B"
                      : isParchment ? "#8A5A1A" : "#D4A65A"
                  }
                  opacity={isPassed ? 0.95 : (isParchment ? 0.35 : 0.25)}
                />
              );
            })}

            {/* Earth Center Node */}
            <circle
              cx="110"
              cy="110"
              r="16"
              fill={isParchment ? "#2A1B10" : "#070E1E"}
              stroke={isParchment ? "#B8873D" : "#38BDF8"}
              strokeWidth="1.5"
            />
            <circle
              cx="110"
              cy="110"
              r="5"
              fill={isParchment ? "#B8873D" : "#38BDF8"}
              opacity="0.8"
            />

            {/* Sun Reference Ray (0°) */}
            <line
              x1="110"
              y1="110"
              x2="110"
              y2="24"
              stroke={isParchment ? "#C47D15" : "#F59E0B"}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity={isParchment ? 0.5 : 0.4}
            />
            <circle cx="110" cy="24" r="5" fill={isParchment ? "#C47D15" : "#F59E0B"} />

            {/* Orbiting Moon */}
            {(() => {
              const rad = (orbitAngle * Math.PI) / 180 - Math.PI / 2;
              const mx = 110 + 76 * Math.cos(rad);
              const my = 110 + 76 * Math.sin(rad);
              return (
                <g>
                  <line
                    x1="110"
                    y1="110"
                    x2={mx}
                    y2={my}
                    stroke={isParchment ? "#B8873D" : "#E8B94B"}
                    strokeWidth="1.2"
                    opacity="0.7"
                  />
                  <circle
                    cx={mx}
                    cy={my}
                    r="8"
                    fill={isParchment ? "#FAF5E8" : "#FFFBEB"}
                    stroke={isParchment ? "#B8873D" : "#E8B94B"}
                    strokeWidth="1.5"
                  />
                </g>
              );
            })()}
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
            TITHI · तिथि
          </span>
          <span
            className={cn(
              "text-xl sm:text-2xl font-hindi font-semibold mt-0.5",
              isParchment ? "text-[#2A1B10]" : "text-[#FFF5D1]"
            )}
          >
            {tithiNameHi}
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
              Tithi &amp; Lunar Phase
            </h3>
            <span
              className={cn(
                "font-hindi text-lg sm:text-xl font-medium",
                isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
              )}
            >
              तिथि एवं पक्ष
            </span>
          </div>
          <p
            className={cn(
              "font-sans text-xs sm:text-sm mt-1 font-medium tracking-wide",
              isParchment ? "text-[#8A5A1A]" : "text-[#E8B94B]/90"
            )}
          >
            The Living Phases of the Moon
          </p>
        </div>

        <p
          className={cn(
            "font-sans text-xs sm:text-[13.5px] leading-relaxed",
            isParchment ? "text-[#3D2A1A]/85" : "text-ivory/75"
          )}
        >
          Unlike static civil calendar dates, a Tithi measures the real-time 12° angular journey between the Sun and Moon. Dividing each lunar month into 30 phases across Shukla (waxing light) and Krishna (waning shadow) pakshas, it directly governs planetary ocean tides, cellular fluid balance, and traditional fasting rhythms.
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
