"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { InstitutionCard } from "@/components/molecules/InstitutionCard";

interface InstitutionGridProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function InstitutionGrid({ variant = "dark", className }: InstitutionGridProps) {
  const isParchment = variant === "parchment";

  const segments = [
    {
      num: "01",
      titleEn: "Temples & Sanctuaries",
      titleHi: "मंदिर एवं तीर्थ स्थल",
      tagline:
        "Synchronizing sunrise-based aarti alerts, daily rituals, and Panchang festival observances to living solar time — beautifully encased in handcrafted sanctum bell-brass casework.",
    },
    {
      num: "02",
      titleEn: "Museums & Heritage",
      titleHi: "संग्रहालय एवं धरोहर",
      tagline:
        "A monumental interactive centerpiece showcasing Ujjain's ancient 0° prime meridian and India's living horological science as a permanent visitor exhibit.",
    },
    {
      num: "03",
      titleEn: "Universities & Research",
      titleHi: "विश्वविद्यालय एवं शोध",
      tagline:
        "A scientific foyer installation for astrophysics and astronomical faculties, computing live Surya Siddhanta ephemerides as an authoritative sidereal research reference.",
    },
    {
      num: "04",
      titleEn: "Estates & Collectors",
      titleHi: "भव्य निवास एवं संग्राहक",
      tagline:
        "An heirloom architectural timepiece for distinguished private estates, available in custom wall or pedestal mountings with a numbered curator provenance certificate.",
    },
  ];

  return (
    <section
      id="institutions"
      className={cn(
        "relative w-full flex flex-col items-center justify-center transition-colors duration-500",
        "py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 select-none overflow-hidden",
        isParchment
          ? "bg-[#F3E9D2] text-[#2A1B10]"
          : "bg-[#03060E] text-ivory",
        className
      )}
    >
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl shrink-0 mb-8 sm:mb-12">
        <SectionEyebrow
          en="PATRONS & INSTALLATIONS"
          hi="संरक्षण एवं अधिष्ठापन"
          variant={isParchment ? "light" : "dark"}
          className="mb-1 justify-center"
        />

        <h2
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight leading-tight",
            isParchment ? "text-[#2A1B10]" : "text-[#FBF5E7]"
          )}
        >
          Crafted for Sacred &amp; Historic Spaces
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
          From ancient sanctums to private architectural estates — bespoke installations of the Vikramaditya Vedic Clock.
        </p>
      </div>

      {/* ── 4 Segment Grid (Equal Height Cards & Rows) ───────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 xl:gap-6 items-stretch">
        {segments.map((seg) => (
          <InstitutionCard
            key={seg.num}
            num={seg.num}
            titleEn={seg.titleEn}
            titleHi={seg.titleHi}
            tagline={seg.tagline}
            variant={isParchment ? "light" : "dark"}
            className={cn(
              "transition-all duration-300 h-full",
              isParchment
                ? "bg-white/70 border border-[#B8873D]/25 shadow-sm hover:border-[#B8873D]/60 hover:shadow-md"
                : "bg-[#080E1C]/80 border border-[#D4A65A]/20 hover:border-[#D4A65A]/50"
            )}
          />
        ))}
      </div>
    </section>
  );
}
