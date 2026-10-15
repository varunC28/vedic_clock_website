"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ArcPhase {
  id: string;
  nameEn: string;
  nameHi: string;
  timeHint: string;
  angle: number;
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

  const total = phases.length - 1;
  const activeIndex = Math.max(
    0,
    phases.findIndex((p) => p.id === activePhase.id)
  );

  // Continuous percentage state (0 to 100)
  const [percent, setPercent] = useState<number>(() => (activeIndex / total) * 100);

  // Keep percentage in sync with external activePhase changes when NOT dragging
  useEffect(() => {
    if (!isDragging) {
      setPercent((activeIndex / total) * 100);
    }
  }, [activeIndex, total, isDragging]);

  // Calculate position and phase from pointer event
  const updateFromPointer = useCallback(
    (clientX: number, snapOnRelease = false) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const raw = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(0, Math.min(100, raw));

      const closestIndex = Math.min(
        total,
        Math.max(0, Math.round((clamped / 100) * total))
      );

      if (snapOnRelease) {
        setPercent((closestIndex / total) * 100);
      } else {
        setPercent(clamped);
      }

      if (phases[closestIndex] && phases[closestIndex].id !== activePhase.id) {
        onPhaseChange(phases[closestIndex]);
      }
    },
    [phases, total, activePhase.id, onPhaseChange]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromPointer(e.clientX, false);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    updateFromPointer(e.clientX, true);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Pointer already released
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = Math.min(total, activeIndex + 1);
      onPhaseChange(phases[nextIndex]);
      setPercent((nextIndex / total) * 100);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prevIndex = Math.max(0, activeIndex - 1);
      onPhaseChange(phases[prevIndex]);
      setPercent((prevIndex / total) * 100);
    } else if (e.key === "Home") {
      e.preventDefault();
      onPhaseChange(phases[0]);
      setPercent(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onPhaseChange(phases[total]);
      setPercent(100);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 py-3 select-none touch-none">
      {/* ── TRACK & DRAGGABLE CELESTIAL DOT ── */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-14 sm:h-16 flex items-center cursor-pointer group"
      >
        {/* Continuous Horizon Rail Line (No intermediate dots) */}
        <div
          className={cn(
            "w-full h-1 sm:h-1.5 rounded-full relative overflow-hidden transition-colors duration-300",
            isParchment ? "bg-[#DFCBB5]" : "bg-white/10"
          )}
        >
          {/* Active Filled Progress Line */}
          <div
            className={cn(
              "h-full rounded-full",
              isDragging ? "transition-none" : "transition-all duration-350 ease-out",
              isParchment
                ? "bg-gradient-to-r from-[#8C5D33] via-[#B8873D] to-[#8C5D33]"
                : "bg-gradient-to-r from-[#B8873D] via-[#D4A65A] to-[#E8B94B] shadow-[0_0_12px_rgba(212,166,90,0.6)]"
            )}
            style={{ width: `${percent}%` }}
          />
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
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 outline-none cursor-grab active:cursor-grabbing",
            isDragging
              ? "scale-110 cursor-grabbing transition-none"
              : "transition-[left,transform] duration-350 ease-out hover:scale-105"
          )}
          style={{ left: `${percent}%` }}
        >
          {/* Floating Phase Pill Above the Dot */}
          <div
            className={cn(
              "absolute -top-10 sm:-top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full border text-[11px] sm:text-xs font-sans font-medium flex items-center gap-2 pointer-events-none shadow-lg",
              isDragging ? "transition-none" : "transition-all duration-350 ease-out",
              isParchment
                ? "bg-[#FAF6F0] border-[#DFCBB5] text-[#2D1B0E] shadow-[0_4px_16px_rgba(72,45,28,0.12)]"
                : "bg-[#091122]/95 border-[#D4A65A]/40 text-[#FBF5E7] shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
            )}
          >
            <span className="font-semibold tracking-tight">{activePhase.nameEn}</span>
            <span className="opacity-50 text-[10px] font-mono">·</span>
            <span className="opacity-75 text-[10.5px] font-mono">{activePhase.timeHint}</span>

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

          {/* Draggable Celestial Dot */}
          <div
            className={cn(
              "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2",
              isParchment
                ? "bg-gradient-to-tr from-[#8C5D33] via-[#B8873D] to-[#FAF6F0] border-white shadow-[0_2px_10px_rgba(72,45,28,0.4)]"
                : "bg-gradient-to-tr from-[#B8873D] via-[#D4A65A] to-[#FFF5D1] border-white shadow-[0_0_16px_rgba(212,166,90,0.95)]"
            )}
          >
            {/* Core golden jewel */}
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isParchment ? "bg-[#482D1C]" : "bg-[#03060E]"
              )}
            />
          </div>
        </div>
      </div>

      {/* ── MILESTONE LABELS BELOW THE LINE (CLICKABLE, NO EMOJIS) ── */}
      <div className="relative w-full h-11 text-xs font-sans">
        {phases.map((phase, idx) => {
          const stepPercent = (idx / total) * 100;
          const isActive = idx === activeIndex;

          // Alignment logic so edge labels never get clipped
          let alignmentClass = "-translate-x-1/2 text-center";
          if (idx === 0) alignmentClass = "translate-x-0 text-left";
          if (idx === total) alignmentClass = "-translate-x-full text-right";

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => {
                onPhaseChange(phase);
                setPercent(stepPercent);
              }}
              className={cn(
                "absolute top-0 flex flex-col cursor-pointer transition-all duration-300 hover:opacity-100 outline-none",
                alignmentClass,
                isActive ? "opacity-100" : "opacity-55 hover:opacity-85"
              )}
              style={{ left: `${stepPercent}%` }}
            >
              <span
                className={cn(
                  "font-mono text-[10px] sm:text-[11px] tracking-wider transition-colors duration-200",
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
                  "text-[11px] sm:text-xs mt-0.5 whitespace-nowrap transition-colors duration-200",
                  isActive
                    ? isParchment
                      ? "text-[#2D1B0E] font-semibold"
                      : "text-[#FBF5E7] font-semibold"
                    : isParchment
                      ? "text-[#5C4533]"
                      : "text-ivory/70"
                )}
              >
                {phase.nameEn.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
