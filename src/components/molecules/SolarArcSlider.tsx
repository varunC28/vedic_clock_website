"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ArcPhase {
  id: string;
  nameEn: string;
  nameHi: string;
  timeHint: string;
  angle: number;
  icon: string;
  summary: string;
  nature: string;
}

interface SolarArcSliderProps {
  phases: readonly ArcPhase[];
  activePhase: ArcPhase;
  onPhaseChange: (phase: ArcPhase) => void;
  isParchment: boolean;
}

export function SolarArcSlider({
  phases,
  activePhase,
  onPhaseChange,
  isParchment,
}: SolarArcSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const activeIndex = Math.max(
    0,
    phases.findIndex((p) => p.id === activePhase.id)
  );
  const total = phases.length - 1;
  const activePercent = (activeIndex / total) * 100;

  // Calculate phase from pointer position
  const handlePointerPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const rawFraction = (clientX - rect.left) / rect.width;
      const clamped = Math.max(0, Math.min(1, rawFraction));
      const newIndex = Math.round(clamped * total);
      if (phases[newIndex] && phases[newIndex].id !== activePhase.id) {
        onPhaseChange(phases[newIndex]);
      }
    },
    [phases, total, activePhase.id, onPhaseChange]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handlePointerPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // In case pointer was already released
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = Math.min(total, activeIndex + 1);
      onPhaseChange(phases[nextIndex]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prevIndex = Math.max(0, activeIndex - 1);
      onPhaseChange(phases[prevIndex]);
    } else if (e.key === "Home") {
      e.preventDefault();
      onPhaseChange(phases[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      onPhaseChange(phases[total]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 py-4 select-none touch-none">
      {/* ── TRACK & DRAGGABLE CELESTIAL DOT ── */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-16 sm:h-20 flex items-center cursor-pointer group"
      >
        {/* Background Rail Line */}
        <div
          className={cn(
            "w-full h-1.5 sm:h-2 rounded-full relative transition-colors duration-300",
            isParchment ? "bg-[#DFCBB5]" : "bg-white/10"
          )}
        >
          {/* Active Filled Progress Rail */}
          <div
            className={cn(
              "h-full rounded-full transition-all duration-200 ease-out",
              isParchment
                ? "bg-gradient-to-r from-[#8C5D33] via-[#B8873D] to-[#8C5D33]"
                : "bg-gradient-to-r from-[#B8873D] via-[#D4A65A] to-[#E8B94B] shadow-[0_0_12px_rgba(212,166,90,0.5)]"
            )}
            style={{ width: `${activePercent}%` }}
          />

          {/* Milestone Step Ticks on the Line */}
          {phases.map((phase, idx) => {
            const percent = (idx / total) * 100;
            const isPassed = idx <= activeIndex;
            return (
              <div
                key={phase.id}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 -translate-x-1/2 rounded-full border-2 transition-all duration-300 pointer-events-none flex items-center justify-center",
                  isPassed
                    ? isParchment
                      ? "bg-[#8C5D33] border-[#FAF6F0] shadow-sm scale-110"
                      : "bg-[#D4A65A] border-[#FAF6F0] shadow-[0_0_8px_rgba(212,166,90,0.7)] scale-110"
                    : isParchment
                      ? "bg-[#FAF6F0] border-[#DFCBB5]"
                      : "bg-[#060B18] border-white/20"
                )}
                style={{ left: `${percent}%` }}
              >
                {/* Micro inner dot */}
                <div
                  className={cn(
                    "w-1 h-1 rounded-full",
                    isPassed
                      ? "bg-white"
                      : isParchment
                        ? "bg-[#DFCBB5]"
                        : "bg-white/30"
                  )}
                />
              </div>
            );
          })}
        </div>

        {/* ── DRAGGABLE SOLAR ORB (THUMB) & FLOATING TOOLTIP ── */}
        <div
          role="slider"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Circadian Phase"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={activeIndex}
          aria-valuetext={`${activePhase.nameEn} (${activePhase.timeHint})`}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 outline-none transition-transform duration-150 ease-out cursor-grab active:cursor-grabbing",
            isDragging ? "scale-110 cursor-grabbing" : "hover:scale-105"
          )}
          style={{ left: `${activePercent}%` }}
        >
          {/* Floating Phase Pill Above the Dot */}
          <div
            className={cn(
              "absolute -top-11 sm:-top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-sans font-medium flex items-center gap-1.5 pointer-events-none transition-all duration-200 shadow-lg",
              isParchment
                ? "bg-[#FAF6F0] border-[#DFCBB5] text-[#2D1B0E]"
                : "bg-[#091122]/95 border-[#D4A65A]/40 text-[#FBF5E7] shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            )}
          >
            <span>{activePhase.icon}</span>
            <span className="font-semibold">{activePhase.nameEn}</span>
            <span className="opacity-60 text-[10px] hidden sm:inline">{activePhase.timeHint}</span>

            {/* Downward triangle arrow pointing to the dot */}
            <div
              className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b",
                isParchment
                  ? "bg-[#FAF6F0] border-[#DFCBB5]"
                  : "bg-[#091122] border-[#D4A65A]/40"
              )}
            />
          </div>

          {/* Draggable Sun Orb */}
          <div
            className={cn(
              "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all duration-200",
              isParchment
                ? "bg-gradient-to-tr from-[#8C5D33] via-[#B8873D] to-[#FAF6F0] border-white shadow-[0_2px_10px_rgba(72,45,28,0.35)]"
                : "bg-gradient-to-tr from-[#B8873D] via-[#D4A65A] to-[#FFF5D1] border-white shadow-[0_0_18px_rgba(212,166,90,0.9)]"
            )}
          >
            {/* Core jewel */}
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isParchment ? "bg-[#482D1C]" : "bg-[#03060E]"
              )}
            />
          </div>
        </div>
      </div>

      {/* ── MILESTONE LABELS BELOW THE LINE ── */}
      <div className="relative w-full h-12 text-xs font-sans">
        {phases.map((phase, idx) => {
          const percent = (idx / total) * 100;
          const isActive = idx === activeIndex;

          // Alignment logic so edge labels don't get clipped by screen edges
          let alignmentClass = "-translate-x-1/2 text-center";
          if (idx === 0) alignmentClass = "translate-x-0 text-left";
          if (idx === total) alignmentClass = "-translate-x-full text-right";

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => onPhaseChange(phase)}
              className={cn(
                "absolute top-0 flex flex-col cursor-pointer transition-all duration-200 hover:opacity-100",
                alignmentClass,
                isActive ? "opacity-100" : "opacity-60 hover:opacity-85"
              )}
              style={{ left: `${percent}%` }}
            >
              <span
                className={cn(
                  "font-mono text-[10px] sm:text-[11px] tracking-wider",
                  isActive
                    ? isParchment
                      ? "text-[#8C5D33] font-bold"
                      : "text-[#D4A65A] font-bold"
                    : isParchment
                      ? "text-[#6E5540]"
                      : "text-ivory/60"
                )}
              >
                {phase.timeHint}
              </span>
              <span
                className={cn(
                  "text-[11px] sm:text-xs mt-0.5 whitespace-nowrap",
                  isActive
                    ? isParchment
                      ? "text-[#2D1B0E] font-semibold"
                      : "text-[#FBF5E7] font-semibold"
                    : isParchment
                      ? "text-[#5C4533]"
                      : "text-ivory/70"
                )}
              >
                <span className="mr-1 hidden sm:inline">{phase.icon}</span>
                <span>{phase.nameEn.split(" ")[0]}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
