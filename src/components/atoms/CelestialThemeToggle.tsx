"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CelestialThemeToggleProps {
  isParchment: boolean;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Refined Theme Toggle Button
 * Clean, iconic, and color-planned to blend seamlessly with the navbar in both
 * Cosmic Dark and Parchment Day modes.
 */
export function CelestialThemeToggle({
  isParchment,
  onToggle,
  className,
  size = "md",
}: CelestialThemeToggleProps) {
  const isSm = size === "sm";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        !isParchment
          ? "Switch to Parchment Day Mode"
          : "Switch to Cosmic Night Mode"
      }
      title={
        !isParchment
          ? "Switch to Parchment Day Mode"
          : "Switch to Cosmic Night Mode"
      }
      style={{ outline: "none" }}
      className={cn(
        "theme-toggle-btn group relative rounded-full flex items-center justify-center cursor-pointer shrink-0 select-none",
        "outline-none focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none active:scale-95 transition-all duration-300",
        isSm ? "w-8 h-8" : "w-9 h-9",
        // Navbar-aware color planning:
        !isParchment
          ? [
              // Cosmic Dark Navbar: dark glass container with antique gold bezel
              "bg-[#0A1120]/85 border border-[#D4A65A]/35 text-[#E8B94B]",
              "shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
              "hover:bg-[#131F38] hover:border-[#D4A65A] hover:text-[#FFD875] hover:shadow-[0_0_14px_rgba(212,166,90,0.3)]",
            ]
          : [
              // Parchment Day Navbar: warm parchment glass container with rich bronze bezel
              "bg-[#EADDC5]/90 border border-[#B8873D]/45 text-[#8C5D33]",
              "shadow-[0_2px_6px_rgba(61,42,26,0.12)]",
              "hover:bg-[#DFCFB2] hover:border-[#8C5D33] hover:text-[#643D1A] hover:shadow-[0_0_12px_rgba(184,135,61,0.25)]",
            ],
        className
      )}
    >
      {!isParchment ? (
        /* ── COSMIC MODE: Clean, Attractive Golden Moon (Crescent) ── */
        <svg
          className={cn(
            isSm ? "w-3.5 h-3.5" : "w-4 h-4",
            "transition-transform duration-300 group-hover:-rotate-12 drop-shadow-[0_0_6px_rgba(232,185,75,0.4)]"
          )}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        /* ── PARCHMENT MODE: Clean, Attractive Bronze Sun (Solid Center + Rounded Rays) ── */
        <svg
          className={cn(
            isSm ? "w-3.5 h-3.5" : "w-4 h-4",
            "transition-transform duration-500 group-hover:rotate-45 drop-shadow-[0_0_4px_rgba(140,93,51,0.25)]"
          )}
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Solid radiant core */}
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          {/* 8 Clean rounded radial rays */}
          <path
            d="M12 2v2.3M12 19.7V22M4.93 4.93l1.6 1.6M17.47 17.47l1.6 1.6M2 12h2.3M19.7 12H22M6.53 17.47l-1.6 1.6M19.07 4.93l-1.6 1.6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
