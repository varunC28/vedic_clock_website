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
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      titleEn: "Temples & Sanctuaries",
      titleHi: "मंदिर एवं तीर्थ स्थल",
      tagline: "Synchronizing sanctum aartis, daily rituals, and festival observances to living sunrise time.",
      bullets: [
        "Sunrise-based aarti alerts",
        "Panchang festival calendar",
        "Sanctum-grade brass casework",
      ],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V10" />
          <path d="M19 21V10" />
          <path d="M9 21V10" />
          <path d="M15 21V10" />
          <path d="M2 10h20L12 3z" />
        </svg>
      ),
      titleEn: "Museums & Heritage",
      titleHi: "संग्रहालय एवं धरोहर",
      tagline: "A functioning astronomical monument celebrating India's sacred prime meridian and horological heritage.",
      bullets: [
        "Ujjain 0° meridian showcase",
        "Interactive visitor engagement",
        "Permanent cultural horology exhibit",
      ],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      titleEn: "Universities & Research",
      titleHi: "विश्वविद्यालय एवं शोध",
      tagline: "A monumental scientific centerpiece for faculties of astronomy, astrophysics, and Vedic sciences.",
      bullets: [
        "Living astronomical algorithms",
        "Grand foyer public installation",
        "Sidereal research reference",
      ],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      titleEn: "Estates & Collectors",
      titleHi: "भव्य निवास एवं संग्राहक",
      tagline: "An heirloom architectural timepiece for connoisseurs of timeless horology and cultural distinction.",
      bullets: [
        "Custom wall & pedestal mounts",
        "Numbered limited artisan edition",
        "Dedicated curator certificate",
      ],
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

      {/* ── 4 Segment Grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6 justify-items-center">
        {segments.map((seg, idx) => (
          <InstitutionCard
            key={idx}
            icon={seg.icon}
            titleEn={seg.titleEn}
            titleHi={seg.titleHi}
            tagline={seg.tagline}
            bullets={seg.bullets}
            variant={isParchment ? "light" : "dark"}
            className={cn(
              "transition-all duration-300 max-w-none",
              isParchment
                ? "bg-white/60 border border-[#B8873D]/25 shadow-sm hover:border-[#B8873D]/60 hover:shadow-md"
                : "bg-[#080E1C]/50 border border-[#D4A65A]/15 hover:border-[#D4A65A]/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}
