"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { PanchangTableRow } from "@/components/molecules/PanchangTableRow";
import { MUHURTAS } from "@/data/muhurtas";

interface PanchangTableSectionProps {
  className?: string;
}

type FilterType = "all" | "shubha" | "ashubha";

export function PanchangTableSection({ className }: PanchangTableSectionProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Filter & search logic
  const filteredMuhurtas = useMemo(() => {
    return MUHURTAS.filter((m) => {
      // Nature filter
      if (filter !== "all" && m.nature !== filter) return false;

      // Text search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesHi = m.devanagari.includes(q);
        const matchesDeity = m.deity.toLowerCase().includes(q);
        const matchesSuitable = m.suitableFor.toLowerCase().includes(q);
        return matchesName || matchesHi || matchesDeity || matchesSuitable;
      }
      return true;
    });
  }, [filter, search]);

  // Initial visible slice (show 8 initially, expandable to all)
  const displayedMuhurtas = showAll ? filteredMuhurtas : filteredMuhurtas.slice(0, 8);

  const shubhaCount = useMemo(() => MUHURTAS.filter((m) => m.nature === "shubha").length, []);
  const ashubhaCount = useMemo(() => MUHURTAS.filter((m) => m.nature === "ashubha").length, []);

  return (
    <section
      id="muhurtas-guide"
      className={cn(
        "relative w-full bg-[#050912] text-ivory flex flex-col items-center justify-center",
        "py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8",
        "border-t border-[#D4A65A]/15 select-none overflow-hidden",
        className
      )}
    >
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl shrink-0 mb-8 sm:mb-10">
        <SectionEyebrow
          en="THE 30 DIURNAL CYCLES"
          hi="दैनिक मुहूर्त संदर्भ"
          variant="dark"
          className="mb-1 justify-center"
        />

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#FBF5E7] font-normal tracking-tight leading-tight">
          The Thirty Muhurtas of the Day
        </h2>

        <GoldDivider variant="dark" className="mt-2.5 mb-2.5 max-w-xs scale-90 sm:scale-100" />

        <p className="text-xs sm:text-sm text-ivory/65 max-w-lg font-sans leading-relaxed">
          Every 24-hour day is partitioned into 30 living 48-minute windows from sunrise, each governed by an ancient presiding deity and energy.
        </p>
      </div>

      {/* ── Interactive Filter & Search Bar ─────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer",
              filter === "all"
                ? "bg-[#D4A65A]/20 border border-[#D4A65A] text-[#FFF5D1] shadow-[0_0_12px_rgba(212,166,90,0.2)]"
                : "bg-transparent border border-white/10 text-ivory/60 hover:text-ivory hover:border-white/20"
            )}
          >
            All <span className="font-mono text-[10px] opacity-70 ml-1">({MUHURTAS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("shubha")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-1.5",
              filter === "shubha"
                ? "bg-[#4A9D6F]/20 border border-[#4A9D6F] text-[#A7F3D0] shadow-[0_0_12px_rgba(74,157,111,0.2)]"
                : "bg-transparent border border-white/10 text-ivory/60 hover:text-ivory hover:border-white/20"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A9D6F]" />
            Shubha / शुभ <span className="font-mono text-[10px] opacity-70 ml-0.5">({shubhaCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("ashubha")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-1.5",
              filter === "ashubha"
                ? "bg-[#C04848]/20 border border-[#C04848] text-[#FECACA] shadow-[0_0_12px_rgba(192,72,72,0.2)]"
                : "bg-transparent border border-white/10 text-ivory/60 hover:text-ivory hover:border-white/20"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C04848]" />
            Ashubha / अशुभ <span className="font-mono text-[10px] opacity-70 ml-0.5">({ashubhaCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deity, name, deed..."
            className="w-full px-3.5 py-1.5 bg-[#091120] border border-white/10 rounded-full text-xs text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-[#D4A65A]/60 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ivory/50 hover:text-ivory"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Table Container ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl bg-[#080E1C]/70 border border-[#D4A65A]/15 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl backdrop-blur-sm overflow-x-auto">
        {/* Container Eyebrow matching screenshot media_1791463915820 */}
        <div className="px-2 sm:px-4 pt-1 pb-3 sm:pb-4 border-b border-white/[0.06] flex items-center justify-between min-w-[580px] sm:min-w-0">
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#D4A65A]/80 uppercase">
            MUHURTA LIST {showAll ? "(ALL 30 ROWS)" : "(SHOWING ROWS 1-8)"}
          </span>
          <span className="font-sans text-[10.5px] text-ivory/40">
            Hover or tap row to highlight
          </span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/5 min-w-[580px] sm:min-w-0">
          {displayedMuhurtas.length > 0 ? (
            displayedMuhurtas.map((m) => (
              <div
                key={m.index}
                onMouseEnter={() => setHoveredIdx(m.index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <PanchangTableRow
                  index={m.index + 1 < 10 ? `0${m.index + 1}` : `${m.index + 1}`}
                  nameHi={m.devanagari}
                  nameEn={m.name}
                  nature={m.nature}
                  deity={m.deity}
                  detail={m.suitableFor}
                  isHighlighted={hoveredIdx === m.index}
                />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-ivory/50">
              No Muhurtas match your search criteria.
            </div>
          )}
        </div>

        {/* View All / Collapse Button */}
        {filteredMuhurtas.length > 8 && (
          <div className="pt-4 pb-2 flex justify-center border-t border-white/5 mt-2">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 rounded-full border border-[#D4A65A]/40 text-xs font-sans tracking-wide text-[#D4A65A] hover:bg-[#D4A65A]/15 hover:border-[#D4A65A] transition-all cursor-pointer"
            >
              {showAll
                ? "Show Less / संक्षिप्त देखें ↑"
                : `Show All ${filteredMuhurtas.length} Muhurtas / सभी देखें (${filteredMuhurtas.length}) ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
