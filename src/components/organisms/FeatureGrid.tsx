"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { Scroll01, Scroll01Item } from "@/components/ui/scroll-01";
import { TithiDial } from "@/components/molecules/TithiDimensionCard";
import { NakshatraDial } from "@/components/molecules/NakshatraDimensionCard";
import { YogaKaranaDial } from "@/components/molecules/YogaKaranaDimensionCard";
import { MuhurtaDial } from "@/components/molecules/MuhurtaDimensionCard";

interface FeatureGridProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function FeatureGrid({ variant = "dark", className }: FeatureGridProps) {
  const isParchment = variant === "parchment";

  // Astronomical showcase values
  const tithiNameHi = "एकादशी";
  const nakshatraNameHi = "आश्लेषा";
  const nakshatraNameEn = "Ashlesha";
  const nakshatraIndex = 8;
  const yogaNameHi = "साध्य";
  const karanaNameHi = "बव";
  const muhurtaNameHi = "अभिजित";
  const muhurtaNameEn = "Abhijit";
  const muhurtaIndex = 7;

  const items: Scroll01Item[] = [
    {
      num: "01",
      title: "Angular Distance of Mind",
      titleHi: "तिथि",
      subtitle: "Lunar Phases & Consciousness",
      description:
        "A Tithi is not a static 24-hour day. It is an exact 12° angular displacement between the Moon and Sun, reflecting the mind's cyclic dance with the soul across 30 distinct lunar steps (Shukla and Krishna Pakshas).",
      pills: ["12° Sun-Moon Separation", "30 Lunar Phases", "Fluctuates 19h - 26h"],
      media: <TithiDial variant={variant} tithiNameHi={tithiNameHi} />,
    },
    {
      num: "02",
      title: "27 Cosmic Gateways",
      titleHi: "नक्षत्र",
      subtitle: "The Sidereal Wheel & Lunar Mansions",
      description:
        "The 360° celestial zodiac is divided into 27 equal 13°20' lunar mansions, each with its own presiding deity, cosmic vibration, and psychological imprint that governs deep soul energetics.",
      pills: ["27 Equal Arcs (13°20')", "4 Padas Each (108 Total)", "Fixed Stellar Matrix"],
      media: (
        <NakshatraDial
          variant={variant}
          nakshatraNameHi={nakshatraNameHi}
          nakshatraNameEn={nakshatraNameEn}
          nakshatraIndex={nakshatraIndex}
        />
      ),
    },
    {
      num: "03",
      title: "Angular Harmony & Action",
      titleHi: "योग व करण",
      subtitle: "Solar-Lunar Synergy & Pragmatic Windows",
      description:
        "Synthesizes the solar vitality of the soul (Pingala) with the lunar receptivity of the mind (Ida). 27 Nitya Yogas measure subtle angular harmony, while 11 Karana half-tithi windows guide the pragmatic timing and efficacy of worldly endeavors.",
      pills: ["27 Nitya Yogas", "11 Pragmatic Karanas", "Bio-Polarity Balance"],
      media: (
        <YogaKaranaDial
          variant={variant}
          yogaNameHi={yogaNameHi}
          karanaNameHi={karanaNameHi}
        />
      ),
    },
    {
      num: "04",
      title: "Muhurta & Micro-Time",
      titleHi: "मुहूर्त चक्र",
      subtitle: "Diurnal Cycles & Solar Rhythm",
      description:
        "Every 24-hour day is divided into 30 dynamic 48-minute cycles anchored to your true local sunrise. Rather than rigid artificial GMT zones, Vedic micro-time expands and contracts in living harmony with the Sun — cascading downward through Kalas and Kasthas to the atomic blink of an eye.",
      pills: ["30 Diurnal Windows", "48 Minutes / Cycle", "Sunrise Calibrated"],
      media: (
        <MuhurtaDial
          variant={variant}
          muhurtaNameHi={muhurtaNameHi}
          muhurtaNameEn={muhurtaNameEn}
          muhurtaIndex={muhurtaIndex}
        />
      ),
    },
  ];

  return (
    <section
      id="architecture"
      className={cn(
        "relative w-full flex flex-col items-center justify-center transition-colors duration-500",
        "py-16 sm:py-24 px-4 sm:px-6 lg:px-8",
        isParchment
          ? "bg-[#F3E9D2] text-[#2A1B10]"
          : "bg-[#03060E] text-ivory",
        className
      )}
    >
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl shrink-0 mb-10 sm:mb-14">
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

      {/* ── Scroll-01 Experience: Sticky Pinned Visual + Smooth Scroll Track ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto">
        <Scroll01 items={items} variant={variant} />
      </div>
    </section>
  );
}

