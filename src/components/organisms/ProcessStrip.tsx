"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { ProcessStepCard } from "@/components/molecules/ProcessStepCard";

interface ProcessStripProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function ProcessStrip({ variant = "dark", className }: ProcessStripProps) {
  const isParchment = variant === "parchment";

  return (
    <section
      id="creation-story"
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
          en="THE CREATION STORY"
          hi="निर्माण एवं विज्ञान"
          variant={isParchment ? "light" : "dark"}
          className="mb-1 justify-center"
        />

        <h2
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight leading-tight",
            isParchment ? "text-[#2A1B10]" : "text-[#FBF5E7]"
          )}
        >
          From Ancient Shastras to Modern Silicon
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
          How five thousand years of sacred astronomical geometry was brought to life in an artisan physical timepiece.
        </p>
      </div>

      {/* ── 3 Steps Process Strip ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mt-4 sm:mt-8">
        {/* Subtle Horizontal Connector Thread (Desktop) */}
        <div
          className={cn(
            "hidden md:block absolute top-5 left-[18%] right-[18%] h-[1px] bg-gradient-to-r from-transparent to-transparent z-0 pointer-events-none",
            isParchment ? "via-[#B8873D]/40" : "via-[#D4A65A]/35"
          )}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 justify-items-center relative z-10">
          {/* Step 01: Ancient Wisdom */}
          <ProcessStepCard
            step={1}
            variant={isParchment ? "light" : "dark"}
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8" />
                <path d="M8 11h6" />
              </svg>
            }
            titleEn="Ancient Wisdom"
            titleHi="प्राचीन ज्ञान"
            description="5,000 years of Vedic astronomical science, encoded in Sanskrit texts and observed through generations."
            pill={{
              en: "Vedic Science",
              hi: "वैदिक विज्ञान",
            }}
          />

          {/* Step 02: Precise Astronomy */}
          <ProcessStepCard
            step={2}
            variant={isParchment ? "light" : "dark"}
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            }
            titleEn="Precise Astronomy"
            titleHi="खगोल विज्ञान"
            description="Real-time sunrise-based calculations using the astronomy-engine, accurate to the second."
            pill={{
              en: "Sunrise Calibrated",
              hi: "सूर्योदय आधारित",
            }}
          />

          {/* Step 03: Modern Technology */}
          <ProcessStepCard
            step={3}
            variant={isParchment ? "light" : "dark"}
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" />
                <line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" />
                <line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" />
                <line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" />
                <line x1="1" y1="14" x2="4" y2="14" />
              </svg>
            }
            titleEn="Modern Technology"
            titleHi="आधुनिक तकनीक"
            description="Delivered through a handcrafted brass instrument powered by modern web technology."
            pill={{
              en: "Modern Silicon",
              hi: "आधुनिक सिलिकॉन",
            }}
          />
        </div>
      </div>
    </section>
  );
}
