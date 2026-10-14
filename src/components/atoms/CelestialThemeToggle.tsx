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
 * Luxury Horological Celestial Theme Toggle
 * Crafted like a minted brass astrolabe token with engraved concentric bezels
 * and bespoke Vedic Chandra (Moon & Star) and Surya (Radiant Solar Disc) emblems.
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
          ? "Switch to Parchment Day Mode (Surya)"
          : "Switch to Cosmic Night Mode (Chandra)"
      }
      title={
        !isParchment
          ? "Switch to Parchment Day Mode (Surya)"
          : "Switch to Cosmic Night Mode (Chandra)"
      }
      className={cn(
        "group relative rounded-full flex items-center justify-center cursor-pointer shrink-0 select-none",
        "outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A65A]/70 active:scale-95 transition-all duration-500",
        isSm ? "w-8 h-8" : "w-9.5 h-9.5 sm:w-10 sm:h-10",
        !isParchment
          ? "bg-gradient-to-b from-[#18253D] via-[#0B1322] to-[#040812] border border-[#D4A65A]/45 shadow-[0_2px_10px_rgba(0,0,0,0.7),inset_0_1px_1.5px_rgba(255,215,0,0.35)] hover:border-[#F3CA68] hover:shadow-[0_0_16px_rgba(212,166,90,0.45),inset_0_1px_2px_rgba(255,215,0,0.5)]"
          : "bg-gradient-to-b from-[#FFFDF9] via-[#F4E9D5] to-[#E5D4B6] border border-[#B8873D]/50 shadow-[0_2px_8px_rgba(61,42,26,0.18),inset_0_1px_1.5px_rgba(255,255,255,0.9)] hover:border-[#8C5D33] hover:shadow-[0_0_14px_rgba(184,135,61,0.35)]",
        className
      )}
    >
      {/* Astrolabe Engraved Concentric Dial Track (Delicate Milled Rim) */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-[2.5px] rounded-full pointer-events-none transition-colors duration-500",
          !isParchment
            ? "border border-dashed border-[#D4A65A]/30 group-hover:border-[#E8B94B]/50"
            : "border border-dashed border-[#B8873D]/30 group-hover:border-[#8C5D33]/45"
        )}
      />

      {/* Inner Metallic Disc Glow */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-[4px] rounded-full pointer-events-none opacity-60 transition-opacity duration-500 group-hover:opacity-100",
          !isParchment
            ? "bg-radial from-[#D4A65A]/15 to-transparent"
            : "bg-radial from-[#B8873D]/15 to-transparent"
        )}
      />

      {/* ── CELESTIAL EMBLEMS ─────────────────────────────────────────────── */}
      {!isParchment ? (
        /* ── COSMIC NIGHT: Vedic Chandra (Crescent Moon with Twinkling Star) ── */
        <div className="relative z-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
          <svg
            className={cn(isSm ? "w-4.5 h-4.5" : "w-5 h-5", "overflow-visible")}
            viewBox="0 0 24 24"
            fill="none"
          >
            <defs>
              {/* Chandra Gold Metallic Gradient */}
              <linearGradient id="chandraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3C4" />
                <stop offset="45%" stopColor="#E8B94B" />
                <stop offset="85%" stopColor="#C49233" />
                <stop offset="100%" stopColor="#8C5D1E" />
              </linearGradient>

              {/* Star Diamond Radial Flare */}
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FFEAA7" />
                <stop offset="100%" stopColor="#E8B94B" />
              </radialGradient>

              {/* Soft Moonlight Drop Shadow */}
              <filter id="moonGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#E8B94B" floodOpacity="0.75" />
              </filter>
            </defs>

            {/* Chandra Crescent Body */}
            <path
              d="M14.8 3.2 C 8.6 3.9 3.8 9.1 4.1 15.3 C 4.4 19.8 8.1 22.4 12.6 22.2 C 14.8 22.1 16.8 21.2 18.2 19.8 C 12.2 20.1 7.2 15.5 7.4 9.8 C 7.5 6.7 9.8 4.2 14.8 3.2 Z"
              fill="url(#chandraGrad)"
              filter="url(#moonGlow)"
              stroke="#FFF9E0"
              strokeWidth="0.4"
            />

            {/* Subtle Lunar Craters / Shading */}
            <circle cx="8.5" cy="12.5" r="0.9" fill="#9C6B1C" opacity="0.4" />
            <circle cx="10" cy="16.5" r="1.1" fill="#9C6B1C" opacity="0.35" />
            <circle cx="7.5" cy="15.2" r="0.6" fill="#9C6B1C" opacity="0.4" />

            {/* 4-Point Primary Diamond Star (Nakshatra Tara) */}
            <path
              d="M 16.5 6.2 C 16.5 8.2 17.5 9.2 19.5 9.2 C 17.5 9.2 16.5 10.2 16.5 12.2 C 16.5 10.2 15.5 9.2 13.5 9.2 C 15.5 9.2 16.5 8.2 16.5 6.2 Z"
              fill="url(#starGlow)"
              filter="url(#moonGlow)"
            />

            {/* Micro Companion Star */}
            <circle cx="19" cy="15" r="0.75" fill="#FFEAA7" opacity="0.9" />
          </svg>
        </div>
      ) : (
        /* ── PARCHMENT DAY: Vedic Surya (Sacred 16-Ray Solar Chronometer) ───── */
        <div className="relative z-10 flex items-center justify-center transition-transform duration-700 group-hover:rotate-90 group-hover:scale-110">
          <svg
            className={cn(isSm ? "w-4.5 h-4.5" : "w-5 h-5", "overflow-visible")}
            viewBox="0 0 24 24"
            fill="none"
          >
            <defs>
              {/* Surya Radiant Golden Gradient */}
              <linearGradient id="suryaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE79A" />
                <stop offset="35%" stopColor="#E2A638" />
                <stop offset="75%" stopColor="#B87720" />
                <stop offset="100%" stopColor="#7E470E" />
              </linearGradient>

              {/* Surya Core Flare */}
              <radialGradient id="suryaCore" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="45%" stopColor="#F5B942" />
                <stop offset="100%" stopColor="#B36B15" />
              </radialGradient>

              {/* Solar Halo Filter */}
              <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#B87720" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* 8 Diamond Spear Rays (Cardinal & Diagonal) */}
            <g fill="url(#suryaGrad)" filter="url(#sunGlow)">
              {/* 0° Top */}
              <path d="M 12 1.5 L 12.8 4.2 L 12 4.9 L 11.2 4.2 Z" />
              {/* 180° Bottom */}
              <path d="M 12 22.5 L 12.8 19.8 L 12 19.1 L 11.2 19.8 Z" />
              {/* 90° Right */}
              <path d="M 22.5 12 L 19.8 12.8 L 19.1 12 L 19.8 11.2 Z" />
              {/* 270° Left */}
              <path d="M 1.5 12 L 4.2 12.8 L 4.9 12 L 4.2 11.2 Z" />

              {/* 45° Top-Right */}
              <path d="M 19.4 4.6 L 17.5 6.9 L 16.9 6.3 L 17.1 5.4 Z" />
              {/* 225° Bottom-Left */}
              <path d="M 4.6 19.4 L 6.5 17.1 L 7.1 17.7 L 6.9 18.6 Z" />
              {/* 135° Bottom-Right */}
              <path d="M 19.4 19.4 L 17.1 18.6 L 16.9 17.7 L 17.5 17.1 Z" />
              {/* 315° Top-Left */}
              <path d="M 4.6 4.6 L 6.9 5.4 L 7.1 6.3 L 6.5 6.9 Z" />
            </g>

            {/* 8 Interstitial Teardrop Flame Rays */}
            <g fill="#D48B28" opacity="0.85">
              {/* 22.5° */}
              <circle cx="15.8" cy="3.6" r="0.85" />
              {/* 67.5° */}
              <circle cx="20.4" cy="8.2" r="0.85" />
              {/* 112.5° */}
              <circle cx="20.4" cy="15.8" r="0.85" />
              {/* 157.5° */}
              <circle cx="15.8" cy="20.4" r="0.85" />
              {/* 202.5° */}
              <circle cx="8.2" cy="20.4" r="0.85" />
              {/* 247.5° */}
              <circle cx="3.6" cy="15.8" r="0.85" />
              {/* 292.5° */}
              <circle cx="3.6" cy="8.2" r="0.85" />
              {/* 337.5° */}
              <circle cx="8.2" cy="3.6" r="0.85" />
            </g>

            {/* Outer Concentric Solar Ring */}
            <circle
              cx="12"
              cy="12"
              r="5.6"
              fill="none"
              stroke="#B87720"
              strokeWidth="0.6"
              opacity="0.8"
            />

            {/* Core Solar Disc with Radiant Depth */}
            <circle
              cx="12"
              cy="12"
              r="4.4"
              fill="url(#suryaCore)"
              stroke="#FFF3C4"
              strokeWidth="0.5"
              filter="url(#sunGlow)"
            />

            {/* Inner Bindu Point (Center of Horology) */}
            <circle cx="12" cy="12" r="1.3" fill="#8C4E0B" />
            <circle cx="12" cy="12" r="0.5" fill="#FFF9E0" />
          </svg>
        </div>
      )}
    </button>
  );
}
