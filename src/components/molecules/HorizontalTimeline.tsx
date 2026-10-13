"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface TimelineMilestone {
  year: string;
  eraEn: string;
  eraHi: string;
  headlineEn: string;
  headlineHi: string;
  description: string;
  impact: string;
}

interface HorizontalTimelineProps {
  milestones: TimelineMilestone[];
  variant?: "dark" | "parchment";
  className?: string;
}

export function HorizontalTimeline({
  milestones,
  variant = "parchment",
  className,
}: HorizontalTimelineProps) {
  const isParchment = variant === "parchment";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll buttons and progress on scroll
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;

    setCanScrollLeft(current > 10);
    setCanScrollRight(current < maxScroll - 10);
    setScrollProgress(maxScroll > 0 ? (current / maxScroll) * 100 : 0);

    // Calculate which card is closest to the left/center
    const cardWidth = el.scrollWidth / milestones.length;
    const index = Math.round(current / cardWidth);
    setActiveIndex(Math.max(0, Math.min(milestones.length - 1, index)));
  };

  useEffect(() => {
    handleScroll();
  }, [milestones]);

  const scrollToCard = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-milestone-card]");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  };

  const scrollByDelta = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const delta = direction === "left" ? -420 : 420;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      {/* ── Top Bar: Progress Indicator & Navigation Arrows ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Step Counter & Mini Progress */}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-xs font-bold tracking-wider uppercase",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            Epoch {activeIndex + 1} of {milestones.length}
          </span>
          <div
            className={cn(
              "w-28 sm:w-36 h-1 rounded-full overflow-hidden",
              isParchment ? "bg-[#DFCBB5]" : "bg-[#D4A65A]/20"
            )}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                isParchment ? "bg-[#8C5D33]" : "bg-[#D4A65A]"
              )}
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByDelta("left")}
            disabled={!canScrollLeft}
            aria-label="Previous epoch"
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border text-sm font-semibold",
              canScrollLeft
                ? isParchment
                  ? "border-[#B8873D]/40 bg-[#FAF6F0] text-[#2D1B0E] hover:bg-[#F2ECE1] shadow-sm"
                  : "border-[#D4A65A]/40 bg-[#080E1C] text-[#FBF5E7] hover:bg-[#121B2F] shadow-sm"
                : isParchment
                  ? "border-[#DFCBB5]/40 text-[#6E5540]/40 cursor-not-allowed bg-transparent"
                  : "border-[#D4A65A]/15 text-ivory/20 cursor-not-allowed bg-transparent"
            )}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByDelta("right")}
            disabled={!canScrollRight}
            aria-label="Next epoch"
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border text-sm font-semibold",
              canScrollRight
                ? isParchment
                  ? "border-[#B8873D]/40 bg-[#FAF6F0] text-[#2D1B0E] hover:bg-[#F2ECE1] shadow-sm"
                  : "border-[#D4A65A]/40 bg-[#080E1C] text-[#FBF5E7] hover:bg-[#121B2F] shadow-sm"
                : isParchment
                  ? "border-[#DFCBB5]/40 text-[#6E5540]/40 cursor-not-allowed bg-transparent"
                  : "border-[#D4A65A]/15 text-ivory/20 cursor-not-allowed bg-transparent"
            )}
          >
            →
          </button>
        </div>
      </div>

      {/* ── Timeline Rail & Connected Node Markers (Interactive Top Track) ── */}
      <div className="relative pt-6 pb-2 px-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Connecting Horizontal Rail Line */}
        <div
          className={cn(
            "absolute top-[35px] left-6 right-6 h-[2px] transition-colors",
            isParchment ? "bg-[#DFCBB5]" : "bg-[#D4A65A]/25"
          )}
        />

        {/* Nodes along the rail */}
        <div className="relative flex justify-between items-start min-w-[620px] px-2">
          {milestones.map((milestone, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={milestone.year}
                type="button"
                onClick={() => scrollToCard(idx)}
                className="group flex flex-col items-center gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#B8873D] rounded-lg transition-transform"
              >
                {/* Node Dot / Halo */}
                <div
                  className={cn(
                    "relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                    isCurrent
                      ? isParchment
                        ? "bg-[#482D1C] ring-4 ring-[#B8873D]/30 scale-110 shadow-md"
                        : "bg-[#D4A65A] ring-4 ring-[#D4A65A]/30 scale-110 shadow-[0_0_12px_rgba(212,166,90,0.6)]"
                      : isParchment
                        ? "bg-[#FAF6F0] border-2 border-[#DFCBB5] group-hover:border-[#B8873D]"
                        : "bg-[#060B18] border-2 border-[#D4A65A]/30 group-hover:border-[#D4A65A]"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      isCurrent
                        ? isParchment
                          ? "bg-[#FAF6F0]"
                          : "bg-[#060B18]"
                        : isParchment
                          ? "bg-[#8C5D33]/60 group-hover:bg-[#8C5D33]"
                          : "bg-[#D4A65A]/60 group-hover:bg-[#D4A65A]"
                    )}
                  />
                </div>

                {/* Node Year Badge */}
                <span
                  className={cn(
                    "font-mono text-xs font-bold tracking-tight transition-colors whitespace-nowrap",
                    isCurrent
                      ? isParchment
                        ? "text-[#2D1B0E]"
                        : "text-[#D4A65A]"
                      : isParchment
                        ? "text-[#6E5540] group-hover:text-[#2D1B0E]"
                        : "text-ivory/60 group-hover:text-ivory"
                  )}
                >
                  {milestone.year}
                </span>

                {/* Era Tag */}
                <span
                  className={cn(
                    "font-sans text-[10px] uppercase tracking-wider transition-colors whitespace-nowrap",
                    isCurrent
                      ? isParchment
                        ? "text-[#8C5D33] font-semibold"
                        : "text-[#E8B94B] font-semibold"
                      : "text-current opacity-40 group-hover:opacity-75"
                  )}
                >
                  {milestone.eraEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Horizontal Scrollable Cards Stream ── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Chronological milestones scroll track"
        className="flex gap-5 sm:gap-6 overflow-x-auto py-3 px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden outline-none focus-visible:ring-2 focus-visible:ring-[#B8873D] rounded-2xl"
      >
        {milestones.map((milestone, idx) => {
          const isCurrent = activeIndex === idx;
          return (
            <div
              key={milestone.year}
              data-milestone-card
              onClick={() => scrollToCard(idx)}
              className={cn(
                "snap-start shrink-0 w-[300px] sm:w-[360px] md:w-[410px] rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer select-none",
                isCurrent
                  ? isParchment
                    ? "bg-[#F2ECE1] border-[#B8873D]/60 shadow-lg translate-y-[-3px]"
                    : "bg-[#080E1C] border-[#D4A65A]/60 shadow-[0_8px_30px_rgba(212,166,90,0.12)] translate-y-[-3px]"
                  : isParchment
                    ? "bg-[#FAF6F0] border-[#DFCBB5] hover:border-[#B8873D]/40 hover:bg-[#F2ECE1]/50"
                    : "bg-[#060B18]/70 border-[#D4A65A]/20 hover:border-[#D4A65A]/40 hover:bg-[#080E1C]/80"
              )}
            >
              {/* Card Header: Year badge & Era */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full font-mono text-xs font-bold tracking-wider",
                      isCurrent
                        ? isParchment
                          ? "bg-[#482D1C] text-[#FAF6F0]"
                          : "bg-[#D4A65A] text-[#03060E]"
                        : isParchment
                          ? "bg-[#DFCBB5]/50 text-[#482D1C]"
                          : "bg-[#D4A65A]/15 text-[#D4A65A]"
                    )}
                  >
                    {milestone.year}
                  </div>
                  <span
                    className={cn(
                      "font-mono text-xs opacity-50 font-medium",
                      isParchment ? "text-[#6E5540]" : "text-ivory"
                    )}
                  >
                    0{idx + 1} / 0{milestones.length}
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-sans text-xl sm:text-2xl font-bold tracking-tight leading-tight",
                      isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                    )}
                  >
                    {milestone.headlineEn}
                  </h3>
                  <p
                    className={cn(
                      "font-hindi text-sm sm:text-base mt-1 font-medium",
                      isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                    )}
                  >
                    {milestone.headlineHi} · <span className="opacity-80">{milestone.eraHi}</span>
                  </p>
                </div>

                {/* Main Narrative Description */}
                <p
                  className={cn(
                    "font-sans text-xs sm:text-sm leading-relaxed mt-1",
                    isParchment ? "text-[#5C4533]" : "text-ivory/80"
                  )}
                >
                  {milestone.description}
                </p>
              </div>

              {/* Scientific Impact Pill */}
              <div
                className={cn(
                  "mt-6 pt-4 border-t flex flex-col gap-1 text-xs",
                  isParchment
                    ? "border-[#DFCBB5]/80 text-[#6E5540]"
                    : "border-[#D4A65A]/20 text-ivory/70"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] font-bold uppercase tracking-wider",
                    isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                  )}
                >
                  Scientific Impact
                </span>
                <span className="font-sans leading-snug">{milestone.impact}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
