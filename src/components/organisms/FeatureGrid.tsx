"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { TithiDimensionCard } from "@/components/molecules/TithiDimensionCard";
import { NakshatraDimensionCard } from "@/components/molecules/NakshatraDimensionCard";
import { YogaKaranaDimensionCard } from "@/components/molecules/YogaKaranaDimensionCard";
import { MuhurtaDimensionCard } from "@/components/molecules/MuhurtaDimensionCard";

interface DimensionTab {
  id: string;
  num: string;
  en: string;
  hi: string;
}

const TABS: DimensionTab[] = [
  { id: "tithi", num: "01", en: "Tithi", hi: "तिथि" },
  { id: "nakshatra", num: "02", en: "Nakshatra", hi: "नक्षत्र" },
  { id: "yoga", num: "03", en: "Yoga & Karana", hi: "योग-करण" },
  { id: "muhurta", num: "04", en: "Muhurta", hi: "मुहूर्त" },
];

interface FeatureGridProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function FeatureGrid({ variant = "dark", className }: FeatureGridProps) {
  const isParchment = variant === "parchment";
  const [activeIndex, setActiveIndex] = useState(0);

  // Showcase values
  const tithiNameHi = "एकादशी";
  const nakshatraNameHi = "आश्लेषा";
  const nakshatraNameEn = "Ashlesha";
  const nakshatraIndex = 8;
  const yogaNameHi = "साध्य";
  const yogaNameEn = "Sadhya";
  const karanaNameHi = "बव";
  const karanaNameEn = "Bava";
  const muhurtaNameHi = "अभिजित";
  const muhurtaNameEn = "Abhijit";
  const muhurtaIndex = 7;

  return (
    <section
      id="architecture"
      className={cn(
        "relative w-full flex flex-col items-center justify-center transition-colors duration-500",
        "py-12 sm:py-16 px-4 sm:px-6 lg:px-8 select-none",
        isParchment
          ? "bg-[#F3E9D2] text-[#2A1B10]"
          : "bg-[#03060E] text-ivory",
        className
      )}
    >
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl shrink-0 mb-6 sm:mb-8">
        <SectionEyebrow
          en="TIME IN FOUR DIMENSIONS"
          hi="काल के चार आयाम"
          variant={isParchment ? "light" : "dark"}
          className="mb-1 justify-center"
        />

        <h2
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight leading-tight",
            isParchment ? "text-[#2A1B10]" : "text-[#FBF5E7]"
          )}
        >
          The Astrological Architecture
        </h2>

        <GoldDivider
          variant={isParchment ? "light" : "dark"}
          className="mt-2.5 mb-2.5 max-w-xs scale-90 sm:scale-100"
        />

        <p
          className={cn(
            "text-xs sm:text-sm max-w-lg font-sans leading-relaxed",
            isParchment ? "text-[#3D2A1A]/75" : "text-ivory/65"
          )}
        >
          Not uniform mechanical gears — the Vedic Clock measures time through the living celestial geometry of the Sun, Moon, and cosmos.
        </p>
      </div>

      {/* ── Minimalist 4-Dimension Tabs ────────────────────────────────────── */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        {TABS.map((tab, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "group px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-2",
                isActive
                  ? isParchment
                    ? "bg-[#B8873D]/15 border border-[#B8873D] text-[#2A1B10] shadow-sm font-semibold"
                    : "bg-[#D4A65A]/20 border border-[#D4A65A] text-[#FFF5D1] shadow-[0_0_14px_rgba(212,166,90,0.25)]"
                  : isParchment
                  ? "bg-transparent border border-black/10 text-[#3D2A1A]/60 hover:text-[#2A1B10] hover:border-black/20"
                  : "bg-transparent border border-white/10 text-ivory/60 hover:text-ivory hover:border-white/20"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] tracking-wider transition-colors",
                  isActive
                    ? "text-[#B8873D]"
                    : isParchment
                    ? "text-[#3D2A1A]/40"
                    : "text-ivory/40"
                )}
              >
                {tab.num}
              </span>
              <span className="font-medium tracking-wide">{tab.en}</span>
              <span
                className={cn(
                  "font-hindi text-[11px] transition-colors",
                  isActive
                    ? "text-[#B8873D]"
                    : isParchment
                    ? "text-[#3D2A1A]/40"
                    : "text-ivory/40"
                )}
              >
                {tab.hi}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active Dimension Presentation ─────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-4xl flex items-center justify-center transition-all duration-500 min-h-[280px]">
        {activeIndex === 0 && (
          <TithiDimensionCard
            variant={variant}
            tithiNameHi={tithiNameHi}
          />
        )}
        {activeIndex === 1 && (
          <NakshatraDimensionCard
            variant={variant}
            nakshatraNameHi={nakshatraNameHi}
            nakshatraNameEn={nakshatraNameEn}
            nakshatraIndex={nakshatraIndex}
          />
        )}
        {activeIndex === 2 && (
          <YogaKaranaDimensionCard
            variant={variant}
            yogaNameHi={yogaNameHi}
            yogaNameEn={yogaNameEn}
            karanaNameHi={karanaNameHi}
            karanaNameEn={karanaNameEn}
          />
        )}
        {activeIndex === 3 && (
          <MuhurtaDimensionCard
            variant={variant}
            muhurtaNameHi={muhurtaNameHi}
            muhurtaNameEn={muhurtaNameEn}
            muhurtaIndex={muhurtaIndex}
          />
        )}
      </div>
    </section>
  );
}
