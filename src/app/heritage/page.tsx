"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { HorizontalTimeline } from "@/components/molecules/HorizontalTimeline";
import Timeline from "@/components/ui/timeline";
import { useTheme } from "@/components/providers/ThemeProvider";

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
      "Civil midnight (12:00 AM) is an artificial abstraction set at the darkest hour. Vedic timekeeping begins at Suryodaya (local astronomical sunrise), when the first solar ray crosses the horizon—aligning biological circadian rhythm and metabolic awakening with the cosmos.",
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
  icon: string;
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
    icon: "🌅",
    summary: "The zero point of the Vedic day. The solar disc breaches the horizon, activating Prana and opening the diurnal Muhurtas.",
    nature: "Creation & Awakening · सृजन",
  },
  {
    id: "morning",
    nameEn: "Sangava (Mid-Morning)",
    nameHi: "संगव",
    timeHint: "~09:00 AM",
    angle: 45,
    icon: "☀️",
    summary: "Peak mental clarity and energetic action. Commencing auspicious endeavors, scholarship, and enterprise.",
    nature: "Vitality & Enterprise · उद्यम",
  },
  {
    id: "zenith",
    nameEn: "Madhyahna / Abhijit",
    nameHi: "मध्याह्न · अभिजित",
    timeHint: "~12:00 PM",
    angle: 90,
    icon: "👑",
    summary: "The solar meridian transit. The 8th Muhurta (Abhijit) dissolves obstacles, sanctified by direct overhead solar radiation.",
    nature: "Zenith & Victory · विजय",
  },
  {
    id: "sunset",
    nameEn: "Suryasta (Dusk)",
    nameHi: "सूर्यास्त",
    timeHint: "~06:00 PM",
    angle: 180,
    icon: "🌇",
    summary: "Sandhya twilight. Daylight gives way to nocturnal Ratrimana. A sacred threshold for contemplative pause and Aarti.",
    nature: "Equilibrium & Stillness · संध्या",
  },
  {
    id: "brahma",
    nameEn: "Brahma Muhurta",
    nameHi: "ब्रह्म मुहूर्त",
    timeHint: "~04:24 AM",
    angle: 315, // nocturnal pre-dawn
    icon: "✨",
    summary: "The 14th nocturnal Muhurta (approx. 96 to 48 minutes before sunrise). Peak atmospheric serenity and cognitive plasticity.",
    nature: "Pure Consciousness · चेतना",
  },
];

// ── 3. Chronology Milestones ──
interface Milestone {
  year: string;
  eraEn: string;
  eraHi: string;
  headlineEn: string;
  headlineHi: string;
  description: string;
  impact: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "1500+ BCE",
    eraEn: "Vedic Antiquity",
    eraHi: "वैदिक काल",
    headlineEn: "The 360-Spoke Cosmic Wheel",
    headlineHi: "अहोरात्र चक्र",
    description:
      "Rigvedic astronomical hymns formulate the solar cycle into 12 lunar months, 30 daily Muhurtas, and 27 Nakshatras tracing the Moon’s ecliptic path.",
    impact: "First recorded formulation of horizon-anchored time units in human history.",
  },
  {
    year: "500 BCE",
    eraEn: "Siddhantic Foundation",
    eraHi: "सूर्य सिद्धान्त",
    headlineEn: "Ujjain Formally Defined as Prime Meridian",
    headlineHi: "अवंतिका रेखांश",
    description:
      "The Surya Siddhanta mathematically defines the Rekha-Desha (zero longitude) traversing Avanti (Ujjain), calculating time down to Truti (29.6 microseconds).",
    impact: "Established astronomical coordinate system linking planetary longitude to local gnomon shadows.",
  },
  {
    year: "57 BCE",
    eraEn: "Vikramaditya Era",
    eraHi: "विक्रम संवत्",
    headlineEn: "The Royal Calendar of King Vikramaditya",
    headlineHi: "राजकीय पंचांग",
    description:
      "Emperor Vikramaditya of Ujjain inaugurates the Vikram Samvat era, uniting astronomical observation with civil administration, temple rituals, and national calendar standards.",
    impact: "Pre-dates the Gregorian calendar by 57 years; remains India's premier astronomical dating era.",
  },
  {
    year: "505 CE",
    eraEn: "Classical Golden Age",
    eraHi: "वराहमिहिर काल",
    headlineEn: "Varahamihira Calibrates Clepsydras & Gnomons",
    headlineHi: "घटी-यंत्र एवं शंकु",
    description:
      "In Ujjain, royal astronomer Varahamihira compiles the Pancha-Siddhantika, standardizing the copper bowl water clock (Ghati-Yantra) for micro-accurate 24-minute intervals.",
    impact: "Mechanical horology calibrated precisely to solar altitude angles.",
  },
  {
    year: "2024–2026",
    eraEn: "Modern Rebirth",
    eraHi: "नव पुनर्जागरण",
    headlineEn: "The Vikramaditya Vedic Clock in Ujjain",
    headlineHi: "आधुनिक वेदिक घड़ी",
    description:
      "Ancient Sanskrit astronomical mathematics synthesized with high-precision micro-stepper horology and satellite astronomical ephemerides in a monumental tower clock.",
    impact: "Returning astronomical authenticity and living Vedic time to the civil world.",
  },
];

// ── 4. Canonical Quotes Carousel Data ──
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
    source: "— Surya Siddhanta (भूगोल अध्याय)",
  },
  {
    id: "pancha-siddhantika",
    canon: "Astronomical Treatise · Varahamihira",
    quoteEn:
      "“Time is the primordial seed of cosmic creation, calibrated by celestial spheres. In Avanti, where celestial latitude aligns with Earth’s spine, solar shadows reveal divine geometry.”",
    source: "— Varahamihira (पंचसिद्धान्तिका)",
  },
  {
    id: "vedanga-jyotisha",
    canon: "Cosmic Jyotisha · Vedanga Jyotisha",
    quoteEn:
      "“As the crest on the head of a peacock, as the brilliant gem on the hood of a cobra, so astronomy and celestial reckoning sit at the summit of all sacred Vedic knowledge.”",
    source: "— Lagadha (वेदांग ज्योतिष, श्लोक ४)",
  },
];

export default function HeritagePage() {
  const { isParchment } = useTheme();
  const [activePillar, setActivePillar] = useState<string>(PILLARS[0].id);
  const [activePhase, setActivePhase] = useState<ArcPhase>(ARC_PHASES[0]);
  const [timelineVariant, setTimelineVariant] = useState<"hyperiux" | "rail">("hyperiux");
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
            SECTION 1: HERO — THE PRIME MERIDIAN OF ANTIQUITY
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
              "font-sans text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.15] tracking-tight mb-4",
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
              "font-sans text-sm sm:text-base leading-relaxed max-w-2xl",
              isParchment ? "text-[#6E5540]" : "text-ivory/70"
            )}
          >
            Long before civil conventions fixed the Prime Meridian at Greenwich in 1884, classical Indian astronomers recognized Ujjain as the navel of the earth. Here, where the Tropic of Cancer intersected the ancient meridian of reference, time was never measured from arbitrary midnight—it was born anew with each sunrise.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2: 3 PILLARS (HOVER-TO-DISCOVER INTERACTION)
           ═══════════════════════════════════════════════════════ */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-wider",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            >
              Interactive Principles · Hover to reveal
            </span>
            <h2
              className={cn(
                "font-sans text-2xl sm:text-3xl font-bold tracking-tight",
                isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
              )}
            >
              The Three Tenets of Vedic Chronometry
            </h2>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => {
              const isHovered = activePillar === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActivePillar(pillar.id)}
                  onClick={() => setActivePillar(pillar.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${pillar.titleEn} details`}
                  className={cn(
                    "group relative p-7 rounded-2xl cursor-pointer transition-all duration-300 text-left outline-none flex flex-col justify-between min-h-[300px]",
                    isHovered
                      ? isParchment
                        ? "bg-[#F2ECE1] border border-[#B8873D]/60 shadow-md translate-y-[-2px]"
                        : "bg-[#0A1122] border border-[#D4A65A]/60 shadow-lg shadow-[#D4A65A]/5 translate-y-[-2px]"
                      : isParchment
                        ? "bg-[#FAF6F0] border border-[#DFCBB5] hover:border-[#B8873D]/40"
                        : "bg-[#060B18]/70 border border-[#D4A65A]/20 hover:border-[#D4A65A]/40"
                  )}
                >
                  {/* Top: Number & Title */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "font-mono text-xs font-bold tracking-wider",
                          isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                        )}
                      >
                        {pillar.number}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] uppercase font-mono tracking-widest transition-opacity duration-300",
                          isHovered
                            ? "opacity-100 text-[#B8873D]"
                            : "opacity-40 text-current"
                        )}
                      >
                        {isHovered ? "Expanded" : "Hover / Tap"}
                      </span>
                    </div>

                    <div>
                      <h3
                        className={cn(
                          "font-sans text-lg font-bold transition-colors",
                          isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                        )}
                      >
                        {pillar.titleEn}
                      </h3>
                      <p
                        className={cn(
                          "font-hindi text-sm mt-0.5",
                          isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                        )}
                      >
                        {pillar.titleHi}
                      </p>
                    </div>

                    {/* Tagline / Subtitle */}
                    <p
                      className={cn(
                        "font-sans text-xs leading-relaxed",
                        isParchment ? "text-[#6E5540]" : "text-ivory/60"
                      )}
                    >
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Bottom: Hover-Revealed Wisdom */}
                  <div className="pt-4 border-t border-current/10 flex flex-col gap-2 mt-4">
                    <p
                      className={cn(
                        "font-sans text-xs leading-relaxed transition-opacity duration-300",
                        isHovered ? "opacity-100" : "opacity-75",
                        isParchment ? "text-[#482D1C]" : "text-ivory/90"
                      )}
                    >
                      {pillar.hoverDetail}
                    </p>

                    {pillar.shloka && (
                      <div className="pt-1 flex items-baseline justify-between text-[11px]">
                        <span className="font-hindi italic text-[#B8873D]">
                          {pillar.shloka}
                        </span>
                        <span className="font-sans text-[10px] opacity-60">
                          {pillar.shlokaSource}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: CHRONOLOGY TIMELINE (ALWAYS DARK FOR ALTERNATION)
         ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#03060E] text-ivory transition-colors duration-500 pt-16 sm:pt-20 pb-8 overflow-hidden border-y border-[#D4A65A]/20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 mb-8 sm:mb-12 flex flex-col gap-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wider text-[#D4A65A]">
                Chronological Epochs · 1500 BCE to 2026 CE
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#FBF5E7]">
                The Evolution of Vedic Horology
              </h2>
              <p className="font-sans text-sm max-w-xl mt-1 text-ivory/70">
                Trace the intellectual continuum across millennia—from Rigvedic solar mathematics to modern monumental tower horology.
              </p>
            </div>

            {/* Layout Comparison Switcher */}
            <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded-full border bg-[#091122]/90 border-[#D4A65A]/25 shadow-inner shrink-0">
              <button
                type="button"
                onClick={() => setTimelineVariant("hyperiux")}
                className={cn(
                  "px-4 py-2 sm:py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center justify-center text-center",
                  timelineVariant === "hyperiux"
                    ? "bg-gradient-to-r from-[#B8873D] to-[#D4A65A] text-[#03060E] shadow-md shadow-[#D4A65A]/20 font-bold"
                    : "text-ivory/65 hover:text-ivory hover:bg-white/5 font-medium"
                )}
              >
                Hyperiux Scroll
              </button>
              <button
                type="button"
                onClick={() => setTimelineVariant("rail")}
                className={cn(
                  "px-4 py-2 sm:py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center justify-center text-center",
                  timelineVariant === "rail"
                    ? "bg-gradient-to-r from-[#B8873D] to-[#D4A65A] text-[#03060E] shadow-md shadow-[#D4A65A]/20 font-bold"
                    : "text-ivory/65 hover:text-ivory hover:bg-white/5 font-medium"
                )}
              >
                Rail Cards
              </button>
            </div>
          </div>
        </div>

        {/* ── Full Width Timeline Stream (Unconstrained by max-w-5xl) ── */}
        {timelineVariant === "hyperiux" ? (
          <div className="w-full max-w-full overflow-hidden relative">
            <Timeline
              title="Vedic Chronology"
              periodLabel="1500 BCE — 2026 CE"
              backgroundColor="#03060E"
              textColor="#FBF5E7"
              mutedTextColor="rgba(251, 245, 231, 0.7)"
              activeColor="#D4A65A"
              imageUrl="/assets/images/ancient-temple-celestial-wheel.webp?v=2"
              imageAlt="Ancient Temple Beneath the Celestial Wheel - Avanti Meridian"
            />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 my-8">
            <HorizontalTimeline
              milestones={MILESTONES}
              variant="dark"
            />
          </div>
        )}
      </section>

      {/* ── Bottom Editorial Container (LIGHT in light mode / DARK in dark mode) ── */}
      <main className="relative z-10 pt-16 sm:pt-20 pb-24 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto flex flex-col gap-20 sm:gap-24 text-left">

        {/* ═══════════════════════════════════════════════════════
            SECTION 4: SUN-ARC DIURNAL DIAL (HOVER TO EXPLORE)
           ═══════════════════════════════════════════════════════ */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "font-mono text-xs uppercase tracking-wider",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            >
              Circadian Ephemeris · Hover Phases
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
              Unlike artificial clock hands ticking evenly in a circle, the Vedic diurnal cycle is rooted in dynamic solar elevation angles. Hover over the celestial markers below.
            </p>
          </div>

          {/* Interactive Celestial Ribbon */}
          <div
            className={cn(
              "p-6 sm:p-8 rounded-2xl border transition-all duration-300",
              isParchment
                ? "bg-[#F2ECE1]/60 border-[#DFCBB5]"
                : "bg-[#080E1C]/80 border-[#D4A65A]/25"
            )}
          >
            {/* Phase Selector Chips */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              {ARC_PHASES.map((phase) => {
                const isActive = activePhase.id === phase.id;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onMouseEnter={() => setActivePhase(phase)}
                    onClick={() => setActivePhase(phase)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer flex items-center gap-2 border",
                      isActive
                        ? isParchment
                          ? "bg-[#482D1C] text-[#FAF6F0] border-[#482D1C] shadow-sm"
                          : "bg-[#D4A65A] text-[#03060E] border-[#D4A65A] font-semibold shadow-sm"
                        : isParchment
                          ? "bg-[#FAF6F0] text-[#5C4533] border-[#DFCBB5] hover:border-[#B8873D]"
                          : "bg-[#060B18] text-ivory/70 border-[#D4A65A]/20 hover:border-[#D4A65A]/40"
                    )}
                  >
                    <span>{phase.icon}</span>
                    <span className="font-medium">{phase.nameEn}</span>
                    <span className="opacity-60 text-[10px] hidden sm:inline">{phase.timeHint}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Dynamic Spotlight */}
            <div
              className={cn(
                "p-6 rounded-xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left",
                isParchment
                  ? "bg-[#FAF6F0] border-[#DFCBB5]"
                  : "bg-[#060B18] border-[#D4A65A]/30"
              )}
            >
              <div className="flex flex-col gap-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activePhase.icon}</span>
                  <h3
                    className={cn(
                      "font-sans text-lg font-bold",
                      isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                    )}
                  >
                    {activePhase.nameEn} · <span className="font-hindi font-medium">{activePhase.nameHi}</span>
                  </h3>
                </div>

                <p
                  className={cn(
                    "font-sans text-sm leading-relaxed",
                    isParchment ? "text-[#5C4533]" : "text-ivory/80"
                  )}
                >
                  {activePhase.summary}
                </p>
              </div>

              {/* Pill Badge */}
              <div
                className={cn(
                  "shrink-0 px-4 py-2.5 rounded-xl border flex flex-col items-start md:items-end text-xs",
                  isParchment
                    ? "bg-[#F2ECE1] border-[#DFCBB5] text-[#8C5D33]"
                    : "bg-[#0B1220] border-[#D4A65A]/30 text-[#D4A65A]"
                )}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">Cosmic Quality</span>
                <span className="font-medium font-sans mt-0.5">{activePhase.nature}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 5: CANONICAL INSCRIPTIONS CAROUSEL (3 QUOTES)
            [ALWAYS DARK for alternating rhythm]
           ═══════════════════════════════════════════════════════ */}
        <section
          onMouseEnter={() => setIsQuoteHovered(true)}
          onMouseLeave={() => setIsQuoteHovered(false)}
          className="p-8 sm:p-12 rounded-3xl border border-[#D4A65A]/30 bg-[#060B18] text-ivory shadow-2xl transition-all duration-300 text-left flex flex-col justify-between gap-6 relative overflow-hidden min-h-[290px] sm:min-h-[260px]"
        >
          {/* Subtle cosmic glow */}
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 w-64 h-64 bg-[#D4A65A]/10 rounded-full blur-3xl pointer-events-none"
          />

          {/* Animated Quote Card */}
          <div
            key={CANON_QUOTES[activeQuoteIndex].id}
            className="relative z-10 flex flex-col gap-4 animate-in fade-in duration-500 transition-all ease-out"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4A65A]">
              {CANON_QUOTES[activeQuoteIndex].canon}
            </span>

            <blockquote className="font-serif text-lg sm:text-2xl italic leading-relaxed text-[#FBF5E7]">
              {CANON_QUOTES[activeQuoteIndex].quoteEn}
            </blockquote>

            <div className="flex items-center justify-end pt-2 text-xs">
              <span className="font-sans font-medium uppercase tracking-wider text-right text-[#D4A65A]">
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
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    isActive
                      ? "w-6 bg-[#D4A65A]"
                      : "w-2 bg-[#D4A65A]/30 hover:bg-[#D4A65A]/60"
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
                  ? "bg-[#482D1C] hover:bg-[#382315] text-[#FAF6F0]"
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

      </main>

      {/* ── Grounded Luxury Footer [ALWAYS DARK] ── */}
      <Footer variant="dark" />
    </div>
  );
}
