"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Header } from "@/components/organisms/Header";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SolarArcSlider } from "@/components/molecules/SolarArcSlider";

const Footer = dynamic(
  () => import("@/components/organisms/Footer").then((m) => m.Footer),
  {
    loading: () => (
      <footer className="w-full py-16 bg-[#020408] border-t border-[#D4A65A]/15 min-h-[280px]" />
    ),
  }
);

const Timeline = dynamic(() => import("@/components/ui/timeline"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[480px] flex flex-col items-center justify-center p-8 bg-[#03060E] rounded-2xl border border-[#D4A65A]/20">
      <div className="w-10 h-10 border-2 border-[#D4A65A] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="font-serif text-sm text-[#D4A65A] tracking-widest uppercase">
        Loading Vedic Chronology · कालक्रम लोड हो रहा है...
      </span>
    </div>
  ),
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── 1. The 3 Core Pillars Data ──
interface Pillar {
  id: string;
  number: string;
  titleEn: string;
  titleHi: string;
  tagline: string;
  hoverDetail: string;
  shloka?: string;
  shlokaSource?: string;
}

const PILLARS: Pillar[] = [
  {
    id: "meridian",
    number: "01",
    titleEn: "The Zero Meridian",
    titleHi: "शून्य रेखा · अवंतिका",
    tagline: "Intersection of Tropic of Cancer & Prime Meridian",
    hoverDetail:
      "Centuries before Greenwich was designated in 1884, classical Indian astronomers recognized Ujjain (Avantika) as the natural prime meridian of Earth. Sitting precisely where the Tropic of Cancer intersects the ancient reference axis, all celestial ephemerides were calibrated from this point.",
    shloka: "राक्षसालये देवतानां च मध्ये यत् समसूत्रम्...",
    shlokaSource: "Surya Siddhanta (भूगोल अध्याय)",
  },
  {
    id: "sunrise",
    number: "02",
    titleEn: "Sunrise Over Midnight",
    titleHi: "सूर्योदय · सृष्टि का समय",
    tagline: "Natural Horizon Origin vs. Arbitrary Midnight",
    hoverDetail:
      "Civil midnight (12:00 AM) is an artificial abstraction set at the darkest hour. Vedic timekeeping begins at Suryodaya (local astronomical sunrise), when the first solar ray crosses the horizon, aligning biological circadian rhythms and metabolic awakening with the cosmos.",
    shloka: "उद्यन्नुद्यन्त्सूर्यः प्राणान् प्रेरयति...",
    shlokaSource: "Atharvaveda (प्राण सूक्त)",
  },
  {
    id: "muhurta",
    number: "03",
    titleEn: "The 30 Muhurtas",
    titleHi: "अहोरात्र · काल विभाजन",
    tagline: "Dynamic Seasonal Diurnal & Nocturnal Spans",
    hoverDetail:
      "A complete day-and-night cycle (Ahoratra) is divided into 30 Muhurtas (60 Ghati). Unlike rigid 60-minute Western hours, the 15 daytime Muhurtas (Dinamana) expand and contract gracefully with the changing solstices, capturing time as a living, breathing cycle.",
    shloka: "पञ्चदश मुहूर्ताः अहः, पञ्चदश मुहूर्ताः रात्रिः...",
    shlokaSource: "Taittiriya Brahmana",
  },
];

// ── 2. Sun-Arc Diurnal Phases ──
interface ArcPhase {
  id: string;
  nameEn: string;
  nameHi: string;
  timeHint: string;
  angle: number; // in degrees along top semicircle (0 to 180)
  summary: string;
  nature: string;
}

const ARC_PHASES: ArcPhase[] = [
  {
    id: "sunrise",
    nameEn: "Suryodaya (Dawn)",
    nameHi: "सूर्योदय",
    timeHint: "~06:00 AM",
    angle: 0,
    summary: "The zero point of the Vedic day. The solar disc breaches the horizon, activating Prana and opening the diurnal Muhurtas.",
    nature: "Creation & Awakening · सृजन",
  },
  {
    id: "morning",
    nameEn: "Sangava (Mid-Morning)",
    nameHi: "संगव",
    timeHint: "~09:00 AM",
    angle: 45,
    summary: "Peak mental clarity and energetic action. Commencing auspicious endeavors, scholarship, and enterprise.",
    nature: "Vitality & Enterprise · उद्यम",
  },
  {
    id: "zenith",
    nameEn: "Madhyahna / Abhijit",
    nameHi: "मध्याह्न · अभिजित",
    timeHint: "~12:00 PM",
    angle: 90,
    summary: "The solar meridian transit. The 8th Muhurta (Abhijit) dissolves obstacles, sanctified by direct overhead solar radiation.",
    nature: "Zenith & Victory · विजय",
  },
  {
    id: "sunset",
    nameEn: "Suryasta (Dusk)",
    nameHi: "सूर्यास्त",
    timeHint: "~06:00 PM",
    angle: 180,
    summary: "Sandhya twilight. Daylight gives way to nocturnal Ratrimana. A sacred threshold for contemplative pause and Aarti.",
    nature: "Equilibrium & Stillness · संध्या",
  },
  {
    id: "brahma",
    nameEn: "Brahma Muhurta",
    nameHi: "ब्रह्म मुहूर्त",
    timeHint: "~04:24 AM",
    angle: 315, // nocturnal pre-dawn
    summary: "The 14th nocturnal Muhurta (approx. 96 to 48 minutes before sunrise). Peak atmospheric serenity and cognitive plasticity.",
    nature: "Pure Consciousness · चेतना",
  },
];

// ── 3. Canonical Quotes Carousel Data ──
interface CanonQuote {
  id: string;
  canon: string;
  quoteEn: string;
  source: string;
}

const CANON_QUOTES: CanonQuote[] = [
  {
    id: "surya-siddhanta",
    canon: "Ancient Canon · Surya Siddhanta",
    quoteEn:
      "“That true vertical meridian which passes between Lanka and the celestial abode through Avanti (Ujjain) is the sacred prime meridian of astronomical observation.”",
    source: "Surya Siddhanta (भूगोल अध्याय)",
  },
  {
    id: "pancha-siddhantika",
    canon: "Astronomical Treatise · Varahamihira",
    quoteEn:
      "“Time is the primordial seed of cosmic creation, calibrated by celestial spheres. In Avanti, where celestial latitude aligns with Earth’s spine, solar shadows reveal divine geometry.”",
    source: "Varahamihira (पंचसिद्धान्तिका)",
  },
  {
    id: "vedanga-jyotisha",
    canon: "Cosmic Jyotisha · Vedanga Jyotisha",
    quoteEn:
      "“As the crest on the head of a peacock, as the brilliant gem on the hood of a cobra, so astronomy and celestial reckoning sit at the summit of all sacred Vedic knowledge.”",
    source: "Lagadha (वेदांग ज्योतिष, श्लोक ४)",
  },
];

export function HeritageView() {
  const { isParchment } = useTheme();
  const [activePhase, setActivePhase] = useState<ArcPhase>(ARC_PHASES[0]);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  // Auto-rotate quotes every 5.5 seconds, pause on hover
  useEffect(() => {
    if (isQuoteHovered) return;
    const interval = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % CANON_QUOTES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isQuoteHovered]);

  useEffect(() => {
    // Ensure ScrollTrigger refreshes after Next.js client-side route transition
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full max-w-full min-h-screen overflow-x-hidden transition-colors duration-500 selection:bg-[#B8873D]/30",
        isParchment
          ? "bg-[#FAF6F0] text-[#2D1B0E]"
          : "bg-[#03060E] text-ivory selection:text-[#FFFDF7]"
      )}
    >
      <Header alwaysVisible />

      {/* ── Ambient Radial Golden Glow ── */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] blur-3xl pointer-events-none rounded-full transition-opacity duration-500",
          isParchment
            ? "bg-gradient-to-tr from-[#B8873D]/10 via-[#D4A65A]/8 to-transparent"
            : "bg-gradient-to-tr from-[#D4A65A]/12 via-[#E8B94B]/6 to-transparent"
        )}
      />

      {/* ── Main Editorial Container (Minimalist, Breathable, No Clutter) ── */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-4 sm:pb-6 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto flex flex-col gap-20 sm:gap-24 text-left">
        
        {/* ═══════════════════════════════════════════════════════
            SECTION 1: HERO · THE PRIME MERIDIAN OF ANTIQUITY
           ═══════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-start max-w-3xl">
          {/* Eyebrow */}
          <span
            className={cn(
              "font-mono text-xs tracking-[0.25em] uppercase mb-4",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            / heritage & the idea / विचार एवं परंपरा /
          </span>

          {/* Headline */}
          <h1
            className={cn(
              "font-sans text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.15] tracking-tight mb-4 heritage-speakable-headline",
              isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
            )}
          >
            Where Time Has a Horizon: The Zero Meridian of Ujjain
          </h1>

          {/* Bilingual Subtitle */}
          <p
            className={cn(
              "font-hindi text-lg sm:text-xl font-medium mb-5",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            अवंतिका: खगोलीय शून्य रेखा और सृष्टि का स्वाभाविक समय
          </p>

          {/* Clean Editorial Lead */}
          <p
            className={cn(
              "font-sans text-sm sm:text-base leading-relaxed max-w-2xl heritage-speakable-lead",
              isParchment ? "text-[#6E5540]" : "text-ivory/70"
            )}
          >
            Long before civil conventions fixed the Prime Meridian at Greenwich in 1884, classical Indian astronomers recognized Ujjain as the navel of the earth. Here, where the Tropic of Cancer intersected the ancient meridian of reference, time was never measured from arbitrary midnight. It was born anew with each sunrise.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2: 3 PILLARS (EDITORIAL BLENDED LAYOUT)
           ═══════════════════════════════════════════════════════ */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-wider",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            >
              ASTRONOMICAL PRINCIPLES · त्रिसूत्री सिद्धांत
            </span>
            <h2
              className={cn(
                "font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight",
                isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
              )}
            >
              The Three Tenets of Vedic Chronometry
            </h2>
            <p
              className={cn(
                "font-sans text-xs sm:text-sm max-w-xl leading-relaxed mt-1",
                isParchment ? "text-[#6E5540]" : "text-ivory/65"
              )}
            >
              Foundational principles that distinguish classical Indian astronomical timekeeping from arbitrary civil conventions.
            </p>
          </div>

          {/* 3 Pillars Grid (Unboxed Editorial Columns Blended With Background) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start">
            {PILLARS.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={cn(
                  "group relative flex flex-col justify-between w-full h-full p-2 sm:p-3 bg-transparent select-none motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-y-1.5",
                  idx !== 0 && "md:border-l md:border-white/[0.08] md:pl-6 lg:pl-8",
                  isParchment && idx !== 0 && "md:border-l md:border-[#3D2A1A]/10 md:pl-6 lg:pl-8"
                )}
              >
                <div>
                  {/* Expanding Top Golden Accent Filament */}
                  <div
                    className={cn(
                      "w-8 h-[1.5px] mb-4 rounded-full transition-all duration-300 ease-out group-hover:w-16",
                      isParchment
                        ? "bg-gradient-to-r from-[#B8873D]/70 to-transparent group-hover:from-[#8B6425]"
                        : "bg-gradient-to-r from-[#D4A65A]/70 to-transparent group-hover:from-[#E8B94B]"
                    )}
                  />

                  {/* Header: Number Badge + Hindi Subtitle */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold px-2 py-0.5 rounded-full border tracking-wider transition-all duration-300 group-hover:scale-105",
                        isParchment
                          ? "bg-[#B8873D]/10 border-[#B8873D]/30 text-[#8B6425] group-hover:border-[#B8873D]/60 group-hover:bg-[#B8873D]/20 shadow-sm"
                          : "bg-[#D4A65A]/10 border-[#D4A65A]/30 text-[#E8B94B] group-hover:border-[#D4A65A]/70 group-hover:bg-[#D4A65A]/20 group-hover:shadow-[0_0_14px_rgba(212,166,90,0.25)]"
                      )}
                    >
                      {pillar.number}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-hindi tracking-wide transition-colors duration-300",
                        isParchment ? "text-[#8B6425]/80" : "text-[#D4A65A]/85"
                      )}
                    >
                      {pillar.titleHi}
                    </span>
                  </div>

                  {/* English Title */}
                  <h3
                    className={cn(
                      "font-serif text-xl sm:text-2xl font-normal leading-snug mb-2 transition-colors duration-300",
                      isParchment
                        ? "text-[#2D1B0E] group-hover:text-[#8B6425]"
                        : "text-[#FBF5E7] group-hover:text-[#E8B94B]"
                    )}
                  >
                    {pillar.titleEn}
                  </h3>

                  {/* Tagline / Subtitle */}
                  <p
                    className={cn(
                      "font-sans text-xs sm:text-[13px] font-medium tracking-wide mb-3 transition-colors duration-300",
                      isParchment ? "text-[#8A5A1A]" : "text-[#E8B94B]/90"
                    )}
                  >
                    {pillar.tagline}
                  </p>

                  {/* Detailed Description */}
                  <p
                    className={cn(
                      "font-sans text-xs sm:text-[13.5px] leading-relaxed transition-colors duration-300",
                      isParchment
                        ? "text-[#3D2A1A]/75 group-hover:text-[#3D2A1A]/95"
                        : "text-ivory/70 group-hover:text-ivory/90"
                    )}
                  >
                    {pillar.hoverDetail}
                  </p>
                </div>

                {/* Classical Shloka Citation */}
                {pillar.shloka && (
                  <div
                    className={cn(
                      "mt-6 pt-4 border-t flex flex-col gap-1 transition-colors duration-300",
                      isParchment ? "border-[#3D2A1A]/10" : "border-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "font-hindi text-xs sm:text-[13px] italic tracking-wide leading-relaxed",
                        isParchment ? "text-[#8B6425]" : "text-[#D4A65A]"
                      )}
                    >
                      {pillar.shloka}
                    </span>
                    <span
                      className={cn(
                        "font-sans text-[11px] font-medium uppercase tracking-wider",
                        isParchment ? "text-[#6E5540]/70" : "text-ivory/50"
                      )}
                    >
                      {pillar.shlokaSource}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: CHRONOLOGY TIMELINE
         ═══════════════════════════════════════════════════════ */}
      <section
        className={cn(
          "w-full transition-colors duration-500 pt-16 sm:pt-20 pb-8 overflow-hidden border-y",
          isParchment
            ? "bg-[#FAF6F0] text-[#2D1B0E] border-[#DFCBB5]"
            : "bg-[#03060E] text-ivory border-[#D4A65A]/20"
        )}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 mb-8 sm:mb-12 flex flex-col gap-1 text-left">
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-wider",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            Chronological Epochs · 1500 BCE to 2026 CE
          </span>
          <h2
            className={cn(
              "font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight",
              isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
            )}
          >
            The Evolution of Vedic Horology
          </h2>
          <p
            className={cn(
              "font-sans text-xs sm:text-sm max-w-xl mt-1 leading-relaxed",
              isParchment ? "text-[#6E5540]" : "text-ivory/70"
            )}
          >
            Trace the intellectual continuum across millennia, from Rigvedic solar mathematics to modern monumental tower horology.
          </p>
        </div>

        {/* ── Full Width Timeline Stream (Unconstrained by max-w-5xl) ── */}
        <div className="w-full max-w-full overflow-hidden relative">
          <Timeline
            title="Vedic Chronology"
            periodLabel="1500 BCE to 2026 CE"
            backgroundColor={isParchment ? "#FAF6F0" : "#03060E"}
            textColor={isParchment ? "#2D1B0E" : "#FBF5E7"}
            mutedTextColor={isParchment ? "#6E5540" : "rgba(251, 245, 231, 0.7)"}
            activeColor={isParchment ? "#B8873D" : "#D4A65A"}
            imageUrl="/assets/images/ancient-temple-celestial-wheel.webp?v=2"
            imageAlt="Ancient Temple Beneath the Celestial Wheel - Avanti Meridian"
          />
        </div>
      </section>

      {/* ── Bottom Editorial Container ── */}
      <div className="relative z-10 pt-16 sm:pt-20 pb-24 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto flex flex-col gap-20 sm:gap-24 text-left">

        {/* ═══════════════════════════════════════════════════════
            SECTION 4: SUN-ARC DIURNAL DIAL (DRAGGABLE CELESTIAL ORB)
           ═══════════════════════════════════════════════════════ */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-wider",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            >
              Circadian Ephemeris · Interactive Solar Arc
            </span>
            <h2
              className={cn(
                "font-sans text-2xl sm:text-3xl font-bold tracking-tight",
                isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
              )}
            >
              The Living Day: From Dawn to Pre-Dawn
            </h2>
            <p
              className={cn(
                "font-sans text-sm max-w-xl mt-1",
                isParchment ? "text-[#6E5540]" : "text-ivory/70"
              )}
            >
              Unlike uniform mechanical clock hours, the Vedic diurnal cycle is calibrated by dynamic solar elevation angles. Drag the celestial marker across the horizon to explore each circadian transition.
            </p>
          </div>

          {/* Draggable Celestial Rail & Orb Slider */}
          <SolarArcSlider
            phases={ARC_PHASES}
            activePhase={activePhase}
            onPhaseChange={setActivePhase}
            isParchment={isParchment}
          />

          {/* Active Phase Dynamic Spotlight (Transparent glass card blended into background) */}
          <div
            className={cn(
              "p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left",
              isParchment
                ? "border-[#DFCBB5] bg-gradient-to-b from-[#FAF6F0]/60 to-transparent shadow-sm"
                : "border-[#D4A65A]/20 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm"
            )}
          >
            <div key={activePhase.id} className="flex flex-col gap-1.5 max-w-xl animate-in fade-in duration-300">
              <h3
                className={cn(
                  "font-sans text-lg sm:text-xl font-bold tracking-tight",
                  isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                )}
              >
                {activePhase.nameEn} · <span className="font-hindi font-medium">{activePhase.nameHi}</span>
              </h3>

              <p
                className={cn(
                  "font-sans text-sm sm:text-[14.5px] leading-relaxed",
                  isParchment ? "text-[#5C4533]" : "text-ivory/80"
                )}
              >
                {activePhase.summary}
              </p>
            </div>

            {/* Pill Badge */}
            <div
              key={`${activePhase.id}-badge`}
              className={cn(
                "shrink-0 px-4 py-2.5 rounded-xl border flex flex-col items-start md:items-end text-xs transition-colors animate-in fade-in duration-300",
                isParchment
                  ? "bg-transparent border-[#DFCBB5] text-[#8C5D33]"
                  : "bg-transparent border-[#D4A65A]/25 text-[#D4A65A]"
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">Cosmic Quality</span>
              <span className="font-medium font-sans mt-0.5">{activePhase.nature}</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5: CANONICAL INSCRIPTIONS CAROUSEL (3 QUOTES)
            [BLENDED EDITORIAL LAYOUT]
           ═══════════════════════════════════════════════════════ */}
        <section
          onMouseEnter={() => setIsQuoteHovered(true)}
          onMouseLeave={() => setIsQuoteHovered(false)}
          className="w-full py-6 sm:py-8 px-2 sm:px-4 bg-transparent text-left flex flex-col justify-between gap-6 relative select-none min-h-[260px] sm:min-h-[230px]"
        >
          {/* Subtle cosmic glow */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none",
              isParchment ? "bg-[#B8873D]/8" : "bg-[#D4A65A]/10"
            )}
          />

          {/* Animated Quote Card */}
          <div
            key={CANON_QUOTES[activeQuoteIndex].id}
            className="relative z-10 flex flex-col gap-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
          >
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-widest",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            >
              {CANON_QUOTES[activeQuoteIndex].canon}
            </span>

            <blockquote
              className={cn(
                "font-serif text-lg sm:text-2xl italic leading-relaxed",
                isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
              )}
            >
              {CANON_QUOTES[activeQuoteIndex].quoteEn}
            </blockquote>

            <div className="flex items-center justify-end pt-2 text-xs">
              <span
                className={cn(
                  "font-sans font-medium uppercase tracking-wider text-right",
                  isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                )}
              >
                {CANON_QUOTES[activeQuoteIndex].source}
              </span>
            </div>
          </div>

          {/* 3 Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-1 z-10">
            {CANON_QUOTES.map((q, idx) => {
              const isActive = activeQuoteIndex === idx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveQuoteIndex(idx)}
                  aria-label={`Go to quote ${idx + 1}`}
                  className={cn(
                    "h-2 rounded-full motion-safe:transition-[width] motion-safe:duration-300 cursor-pointer",
                    isActive
                      ? isParchment ? "w-6 bg-[#8C5D33]" : "w-6 bg-[#D4A65A]"
                      : isParchment ? "w-2 bg-[#8C5D33]/30 hover:bg-[#8C5D33]/60" : "w-2 bg-[#D4A65A]/30 hover:bg-[#D4A65A]/60"
                  )}
                />
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 6: MINIMALIST NEXT STEPS / CTA
           ═══════════════════════════════════════════════════════ */}
        <section className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t",
          isParchment ? "border-[#DFCBB5]" : "border-white/10"
        )}>
          <div className="flex flex-col gap-1">
            <h3
              className={cn(
                "font-sans text-lg font-bold",
                isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
              )}
            >
              Experience Living Vedic Horology
            </h3>
            <p
              className={cn(
                "font-sans text-xs sm:text-sm",
                isParchment ? "text-[#6E5540]" : "text-ivory/70"
              )}
            >
              See the astronomical principles embodied in our interactive dial or explore the Panchang handbook.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/clock"
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all",
                isParchment
                  ? "bg-black hover:bg-neutral-900 text-white shadow-sm"
                  : "bg-gradient-to-r from-[#B8873D] to-[#D4A65A] hover:from-[#C9974D] hover:to-[#E5B76A] text-[#03060E] shadow-sm font-bold"
              )}
            >
              The Clock →
            </Link>
            <Link
              href="/guide"
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all",
                isParchment
                  ? "border-[#482D1C] text-[#482D1C] hover:bg-[#EFE7DA]"
                  : "border-[#D4A65A]/40 text-[#D4A65A] hover:bg-[#D4A65A]/10"
              )}
            >
              Panchang Guide →
            </Link>
          </div>
        </section>

      </div>

      {/* ── Grounded Luxury Footer ── */}
      <Footer variant={isParchment ? "parchment" : "dark"} />
    </div>
  );
}
