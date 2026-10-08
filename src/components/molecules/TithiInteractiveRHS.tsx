"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TithiPartData {
  id: string;
  tabTitleEn: string;
  tabTitleHi: string;
  titleEn: string;
  titleHi: string;
  badge: string;
  eyebrow: string;
  bullets: { label: string; text: string }[];
  tags: string[];
}

const TITHI_PARTS: TithiPartData[] = [
  {
    id: "30-lunar-days",
    tabTitleEn: "30 Lunar Days",
    tabTitleHi: "३० तिथियाँ",
    titleEn: "30 Lunar Days: The 12° Step",
    titleHi: "द्वादशांश सूर्य-चन्द्र गति",
    badge: "12° Step · चन्द्र गति",
    eyebrow: "NOT TICKING GEARS — CELESTIAL GEOMETRY",
    bullets: [
      {
        label: "Angular Quantum",
        text: "A Tithi is not an arbitrary mechanical 24-hour tick. It measures exact 12° angular separations between Sun (Soul) and Moon (Mind) across the 360° zodiac.",
      },
      {
        label: "Dynamic Duration",
        text: "Because elliptical orbits vary in velocity (Kepler's Law), each Tithi naturally spans ~19 to ~26 solar hours, breathing with cosmic reality.",
      },
      {
        label: "Harmonic Synchrony",
        text: "30 discrete lunar days complete the synodic cycle, directly synchronizing human circadian rhythms with astronomical time.",
      },
    ],
    tags: ["12° / Tithi", "30 Days / Month", "19h – 26h Variable"],
  },
  {
    id: "two-pakshas",
    tabTitleEn: "Two Pakshas",
    tabTitleHi: "दो पक्ष",
    titleEn: "Two Fortnights: Shukla & Krishna",
    titleHi: "शुक्ल एवं कृष्ण पक्ष",
    badge: "Light & Shadow · पक्ष भेद",
    eyebrow: "NOT STATIC HOURS — PHASES OF CONSCIOUSNESS",
    bullets: [
      {
        label: "Shukla Paksha (शुक्ल)",
        text: "15 days of ascending light from New Moon (Amavasya) to Full Moon (Purnima). Governs creative initiative, outward expansion, and vital energy.",
      },
      {
        label: "Krishna Paksha (कृष्ण)",
        text: "15 days of descending shadow from Full Moon to New Moon. Directs vitality inward toward contemplation, detoxification, and detachment.",
      },
      {
        label: "Cosmic Zenith",
        text: "Peak reflective illumination culminates at Purnima (180° opposition) and pure celestial renewal at Amavasya (0° solar union).",
      },
    ],
    tags: ["15 Waxing Days", "15 Waning Days", "180° Opposition"],
  },
  {
    id: "biological-rhythm",
    tabTitleEn: "Biological Rhythm",
    tabTitleHi: "प्राकृतिक लय",
    titleEn: "Gravitational Tides & Bio-Rhythm",
    titleHi: "ज्वार-भाटा एवं शारीरिक ताल",
    badge: "Planetary Resonance · जैव ताल",
    eyebrow: "NOT ARTIFICIAL TIME — CELLULAR HARMONY",
    bullets: [
      {
        label: "Gravitational Waves",
        text: "The Moon's gravitational pull moves oceanic tides. Human biology (over 70% fluid) experiences an identical subtle cellular gravitational wave.",
      },
      {
        label: "Sacred Fasting",
        text: "Ekadashi (11th Tithi) fasting was calibrated by ancient rishis right before peak tidal pressure to optimize metabolic and neuro-endocrine cleansing.",
      },
      {
        label: "Pineal Soma Cycle",
        text: "Harmonizes subtle brain chemistry (melatonin and pineal secretions) with the natural electromagnetic frequency of lunar phases.",
      },
    ],
    tags: ["Oceanic Syzygy", "Ekadashi Detox", "70% Fluid Equilibrium"],
  },
];

const AUTO_ROTATE_MS = 5000;

export function TithiInteractiveRHS() {
  const [activePart, setActivePart] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Active pause state: either user clicked hold / selected a tab, or mouse is currently hovered
  const isPaused = isHeld || isHovered;

  // Smooth orbital & wave tickers
  const [orbitAngle, setOrbitAngle] = useState(36);
  const [phaseCycle, setPhaseCycle] = useState(0.65);
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    let animId: number;
    let start = performance.now();
    const animate = (time: number) => {
      const elapsed = (time - start) / 1000;
      setOrbitAngle((36 + elapsed * 20) % 360);
      setPhaseCycle((Math.sin(elapsed * 0.9) + 1) / 2);
      setWaveOffset(elapsed * 35);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Auto-advance timer with progress bar (runs ONLY when NOT paused)
  useEffect(() => {
    if (isPaused) return;

    const intervalMs = 50;
    const stepIncrement = (intervalMs / AUTO_ROTATE_MS) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActivePart((curr) => (curr + 1) % TITHI_PARTS.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isPaused]);

  // When user clicks a tab, freeze in Reading Mode (Held) so they can read without getting interrupted
  const handleSelectTab = (idx: number) => {
    setActivePart(idx);
    setIsHeld(true);
    setProgress(0);
  };

  const toggleHold = () => {
    setIsHeld((prev) => !prev);
    setProgress(0);
  };

  const current = TITHI_PARTS[activePart];

  return (
    <div
      className="w-full flex flex-col justify-between text-left relative z-10 space-y-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* ── Top Bar: Section Title + Reading Mode Hold Toggle ─────────────── */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold tracking-wider text-[#D4A65A] uppercase">
          TITHI FACETS · {activePart + 1} OF 3
        </span>

        {/* Hold / Resume Auto-Cycle Button */}
        <button
          type="button"
          onClick={toggleHold}
          className={cn(
            "inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer shadow-sm",
            isHeld
              ? "bg-[#E8B94B]/20 border-[#E8B94B]/70 text-[#FFF5D1] shadow-[0_0_12px_rgba(232,185,75,0.3)]"
              : "bg-[#070D18]/90 border-[#D4A65A]/30 text-[#D4A65A] hover:bg-[#D4A65A]/15 hover:border-[#D4A65A]/50"
          )}
          title={isHeld ? "Click to resume 5s auto-cycle" : "Click to hold on this tab and read"}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              isHeld ? "bg-[#E8B94B] animate-ping" : "bg-emerald-400"
            )}
          />
          <span>{isHeld ? "⏸ HELD (READING MODE)" : "▶ AUTO-CYCLE (5s)"}</span>
          <span className="text-[9px] opacity-70 underline ml-0.5">
            {isHeld ? "Resume ▶" : "Hold ⏸"}
          </span>
        </button>
      </div>

      {/* ── 1. Top Tabs / Stepper (3 Parts) ─────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {TITHI_PARTS.map((part, idx) => {
          const isActive = activePart === idx;
          return (
            <button
              key={part.id}
              type="button"
              onClick={() => handleSelectTab(idx)}
              className={cn(
                "group relative flex flex-col text-left py-1.5 px-2.5 sm:px-3 rounded-xl border transition-all duration-300 cursor-pointer",
                isActive
                  ? "bg-[#D4A65A]/14 border-[#D4A65A]/60 shadow-[0_0_15px_rgba(212,166,90,0.2)]"
                  : "bg-[#070D18]/70 border-[#D4A65A]/20 hover:border-[#D4A65A]/40 hover:bg-[#D4A65A]/5"
              )}
            >
              <div className="flex items-center justify-between w-full pointer-events-none">
                <span
                  className={cn(
                    "text-[10px] font-mono font-bold tracking-wider",
                    isActive ? "text-[#E8B94B]" : "text-ivory/50"
                  )}
                >
                  0{idx + 1}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-hindi",
                    isActive ? "text-[#FFF5D1]" : "text-ivory/40"
                  )}
                >
                  {part.tabTitleHi}
                </span>
              </div>
              <span
                className={cn(
                  "text-[11px] sm:text-xs font-sans font-medium mt-0.5 truncate pointer-events-none",
                  isActive ? "text-[#FBF5E7] font-semibold" : "text-ivory/70 group-hover:text-ivory"
                )}
              >
                {part.tabTitleEn}
              </span>

              {/* Progress Bar under active tab */}
              <div className="w-full h-0.5 bg-white/10 rounded-full mt-1 overflow-hidden pointer-events-none">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-75",
                    isActive
                      ? isPaused
                        ? "w-full bg-[#E8B94B]/80"
                        : "bg-gradient-to-r from-[#D4A65A] to-[#E8B94B]"
                      : "w-0"
                  )}
                  style={{ width: isActive ? (isPaused ? "100%" : `${progress}%`) : "0%" }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* ── 2. Header: Eyebrow, Title, Hindi Subhead, and Status Badge ───────── */}
      <div className="flex items-start justify-between gap-3 border-b border-[#D4A65A]/15 pb-2">
        <div>
          <span className="text-[9.5px] font-mono font-bold tracking-[0.18em] text-[#D4A65A] uppercase block mb-0.5">
            {current.eyebrow}
          </span>
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-[#FBF5E7] font-bold leading-tight">
              {current.titleEn}
            </h3>
            <span className="font-hindi text-sm sm:text-base text-[#D4A65A] font-medium">
              {current.titleHi}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex text-[10px] font-sans font-semibold tracking-wider text-[#E8B94B] uppercase bg-[#E8B94B]/10 border border-[#E8B94B]/30 rounded-full px-2.5 py-0.5">
            {current.badge}
          </span>
          {isPaused && (
            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[#D4A65A] bg-[#D4A65A]/15 border border-[#D4A65A]/35 rounded-full px-2 py-0.5 animate-pulse">
              <span>⏸</span>
              <span>HELD</span>
            </span>
          )}
        </div>
      </div>

      {/* ── 3. Balanced Sub-Grid: Left (Visual + Tags) | Right (Full Descriptions) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
        {/* Left Sub-Column (4.5 / 12): Visual Animation Stage + Tags */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
          <div className="w-full h-[105px] sm:h-[115px] rounded-xl bg-[#040812]/95 border border-[#D4A65A]/25 relative overflow-hidden flex items-center justify-center px-2 py-1 shadow-inner">
            {/* Visual 1: 30 Lunar Days / 12° Step Orbit Animation */}
            {activePart === 0 && (
              <svg
                className="w-full h-full"
                viewBox="0 0 240 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Center Earth */}
                <circle cx="120" cy="50" r="11" fill="#0A1830" stroke="#38BDF8" strokeWidth="1.5" />
                <circle cx="120" cy="50" r="3.5" fill="#38BDF8" />
                <text x="120" y="69" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                  EARTH
                </text>

                {/* Orbit Path */}
                <ellipse
                  cx="120"
                  cy="50"
                  rx="85"
                  ry="32"
                  stroke="#D4A65A"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  opacity="0.3"
                />

                {/* 30 Tithi Ticks along orbit */}
                {Array.from({ length: 30 }).map((_, i) => {
                  const ang = (i * 12 * Math.PI) / 180;
                  const tx = 120 + 85 * Math.cos(ang);
                  const ty = 50 + 32 * Math.sin(ang);
                  const isCurrent = Math.floor(orbitAngle / 12) === i;
                  return (
                    <circle
                      key={i}
                      cx={tx}
                      cy={ty}
                      r={isCurrent ? "2.5" : "1"}
                      fill={isCurrent ? "#E8B94B" : "#D4A65A"}
                      opacity={isCurrent ? 1 : 0.35}
                    />
                  );
                })}

                {/* Sun Reference Vector (at right 0°) */}
                <line x1="120" y1="50" x2="205" y2="50" stroke="#F59E0B" strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />
                <circle cx="205" cy="50" r="5" fill="#F59E0B" opacity="0.9" />
                <text x="205" y="40" textAnchor="middle" fill="#F59E0B" fontSize="7.5" fontWeight="bold">
                  SUN 0°
                </text>

                {/* Dynamic Moon Position */}
                {(() => {
                  const rad = (orbitAngle * Math.PI) / 180;
                  const mx = 120 + 85 * Math.cos(rad);
                  const my = 50 + 32 * Math.sin(rad);
                  const tithiNumber = (Math.floor(orbitAngle / 12) % 30) + 1;
                  return (
                    <g>
                      <line x1="120" y1="50" x2={mx} y2={my} stroke="#E8B94B" strokeWidth="1.2" opacity="0.75" />
                      <circle cx={mx} cy={my} r="7" fill="#FFFBEB" stroke="#E8B94B" strokeWidth="1.5" />
                      <text
                        x={mx}
                        y={my > 50 ? my + 13 : my - 10}
                        textAnchor="middle"
                        fill="#FFF5D1"
                        fontSize="7.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        #{tithiNumber} ({Math.round(orbitAngle)}°)
                      </text>
                    </g>
                  );
                })()}

                {/* Step badge */}
                <rect x="8" y="8" width="68" height="18" rx="4" fill="#070D18" stroke="#D4A65A" strokeWidth="0.8" strokeOpacity="0.4" />
                <text x="42" y="20" textAnchor="middle" fill="#E8B94B" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                  Δθ = +12°/DAY
                </text>
              </svg>
            )}

            {/* Visual 2: Two Pakshas (Shukla & Krishna) Phase Animation */}
            {activePart === 1 && (
              <svg
                className="w-full h-full"
                viewBox="0 0 240 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Shukla Label Left */}
                <g transform="translate(10, 10)">
                  <rect x="0" y="0" width="76" height="18" rx="3.5" fill="#E8B94B" fillOpacity="0.1" stroke="#E8B94B" strokeWidth="0.8" strokeOpacity="0.4" />
                  <text x="38" y="12" textAnchor="middle" fill="#E8B94B" fontSize="7" fontWeight="bold" fontFamily="monospace">
                    SHUKLA · 15D
                  </text>
                  <text x="38" y="26" textAnchor="middle" fill="#94A3B8" fontSize="6.5">
                    🌑 → 🌕 Waxing
                  </text>
                </g>

                {/* Krishna Label Right */}
                <g transform="translate(154, 10)">
                  <rect x="0" y="0" width="76" height="18" rx="3.5" fill="#94A3B8" fillOpacity="0.1" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.4" />
                  <text x="38" y="12" textAnchor="middle" fill="#CBD5E1" fontSize="7" fontWeight="bold" fontFamily="monospace">
                    KRISHNA · 15D
                  </text>
                  <text x="38" y="26" textAnchor="middle" fill="#94A3B8" fontSize="6.5">
                    🌕 → 🌑 Waning
                  </text>
                </g>

                {/* Connecting Arc */}
                <path
                  d="M 48 55 C 80 80 160 80 192 55"
                  stroke="#D4A65A"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  opacity="0.35"
                />

                {/* Center Moon: Animated Phase Shading */}
                <g transform="translate(120, 48)">
                  <circle cx="0" cy="0" r="19" fill="#070C16" stroke="#D4A65A" strokeWidth="1.2" />
                  <path
                    d={`M 0 -19 A 19 19 0 0 1 0 19 A ${19 * Math.abs(phaseCycle * 2 - 1)} 19 0 0 ${phaseCycle > 0.5 ? "1" : "0"} 0 -19`}
                    fill="#FDE68A"
                    opacity="0.95"
                  />
                  <circle cx="0" cy="0" r="19" fill="none" stroke="#D4A65A" strokeWidth="0.8" opacity="0.6" />
                  <text x="0" y="32" textAnchor="middle" fill="#FFF5D1" fontSize="7" fontWeight="bold">
                    {phaseCycle > 0.5 ? "Waxing (प्रकाश)" : "Waning (छाया)"}
                  </text>
                </g>
              </svg>
            )}

            {/* Visual 3: Biological Rhythm & Gravitational Tides Animation */}
            {activePart === 2 && (
              <svg
                className="w-full h-full"
                viewBox="0 0 240 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ocean Tide Sine Wave (Cyan) */}
                <path
                  d={`M 15 ${50 + Math.sin((waveOffset + 0) * 0.05) * 16} 
                      Q ${65} ${50 + Math.sin((waveOffset + 60) * 0.05) * 20}, 
                        ${115} ${50 + Math.sin((waveOffset + 120) * 0.05) * 16} 
                      T ${185} ${50 + Math.sin((waveOffset + 240) * 0.05) * 16} 
                      T ${225} ${50 + Math.sin((waveOffset + 300) * 0.05) * 16}`}
                  stroke="#38BDF8"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.85"
                />

                {/* Cellular Fluid Vibration Wave (Gold) */}
                <path
                  d={`M 15 ${50 + Math.sin((waveOffset * 1.4 + 30) * 0.05) * 10} 
                      Q ${65} ${50 + Math.sin((waveOffset * 1.4 + 90) * 0.05) * 12}, 
                        ${115} ${50 + Math.sin((waveOffset * 1.4 + 150) * 0.05) * 10} 
                      T ${185} ${50 + Math.sin((waveOffset * 1.4 + 270) * 0.05) * 10} 
                      T ${225} ${50 + Math.sin((waveOffset * 1.4 + 330) * 0.05) * 10}`}
                  stroke="#E8B94B"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                  fill="none"
                  opacity="0.75"
                />

                {/* Left Pill: Spring Tide */}
                <g transform="translate(48, 12)">
                  <rect x="-38" y="0" width="76" height="16" rx="3.5" fill="#070D18" stroke="#38BDF8" strokeWidth="0.8" opacity="0.85" />
                  <text x="0" y="11" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
                    SPRING TIDE (पूर्णिमा)
                  </text>
                </g>

                {/* Right Pill: Ekadashi Detox */}
                <g transform="translate(188, 12)">
                  <rect x="-40" y="0" width="80" height="16" rx="3.5" fill="#070D18" stroke="#E8B94B" strokeWidth="0.8" opacity="0.85" />
                  <text x="0" y="11" textAnchor="middle" fill="#E8B94B" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
                    EKADASHI (एकादशी)
                  </text>
                </g>

                <text x="120" y="86" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="monospace">
                  CELLULAR FLUID RESONANCE (70% H₂O)
                </text>
              </svg>
            )}
          </div>

          {/* Compact Inline Tags Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {current.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center text-[10px] font-mono font-medium text-[#E8B94B] bg-[#070D18]/90 border border-[#D4A65A]/25 rounded-md px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Sub-Column (7 / 12): The 3 Detailed, Rich Descriptive Points */}
        <div className="lg:col-span-7 space-y-2">
          {current.bullets.map((b, bIdx) => (
            <div key={bIdx} className="flex items-start gap-2.5">
              <div className="w-2 h-2 shrink-0 mt-1.5 rotate-45 bg-[#E8B94B] shadow-[0_0_6px_rgba(232,185,75,0.7)]" />
              <p className="font-sans text-[12.5px] sm:text-[13px] leading-relaxed text-ivory/85">
                <strong className="font-semibold text-ivory text-[13px] sm:text-[13.5px]">
                  {b.label}
                </strong>
                <span className="mx-1.5 text-[#D4A65A]/60 font-semibold">—</span>
                <span>{b.text}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
