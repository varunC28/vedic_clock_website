"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { ProcessStrip } from "@/components/organisms/ProcessStrip";
import { FeatureGrid } from "@/components/organisms/FeatureGrid";
import { InstitutionGrid } from "@/components/organisms/InstitutionGrid";
import { ClosingCtaSection } from "@/components/organisms/ClosingCtaSection";
import { Footer } from "@/components/organisms/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ThemeMode = "full-cosmic" | "full-parchment" | "alternate";

export function getVariant(
  mode: ThemeMode,
  section: "hero" | "process" | "features" | "institutions" | "cta" | "footer"
): "dark" | "parchment" {
  if (mode === "full-cosmic") return "dark";
  if (mode === "full-parchment") return "parchment";

  // Alternate Mode: One Dark, One Light Alternating
  switch (section) {
    case "hero":
      return "dark"; // 1. Hero: Dark Cosmic
    case "process":
      return "parchment"; // 2. Process: Light Parchment
    case "features":
      return "dark"; // 3. Dimensions: Dark Cosmic
    case "institutions":
      return "parchment"; // 4. Institutions: Light Parchment
    case "cta":
      return "dark"; // 5. Closer: Dark Cosmic
    case "footer":
      return "dark"; // 6. Footer: Dark Cosmic
    default:
      return "dark";
  }
}

export default function Home() {
  // Theme Modes:
  // 1. "full-cosmic"     -> 100% Deep Cosmic Gold throughout
  // 2. "full-parchment"  -> 100% Illuminated Parchment throughout
  // 3. "alternate"       -> One Dark, One Light Component alternating
  const [themeMode, setThemeMode] = useState<ThemeMode>("full-cosmic");

  const pageRef = useRef<HTMLDivElement>(null);
  const processStripRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef<HTMLDivElement>(null);
  const institutionsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ── GSAP Natural ScrollTrigger Reveals ──────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = [
      processStripRef.current,
      dimensionsRef.current,
      institutionsRef.current,
      ctaRef.current,
    ].filter(Boolean) as HTMLDivElement[];

    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const isFullParchment = themeMode === "full-parchment";

  return (
    <div
      ref={pageRef}
      className={cn(
        "relative w-full min-h-screen overflow-x-hidden transition-colors duration-500",
        isFullParchment ? "bg-[#F3E9D2] text-[#2A1B10]" : "bg-[#03060E] text-ivory"
      )}
    >
      {/* ── Fixed Sticky Navigation Header ─────────────────────────────────── */}
      <Header />

      {/* ── Section 1: Hero Showcase (40% Text / 60% Luxury Clock) ─────────── */}
      <Hero variant={getVariant(themeMode, "hero")} />

      {/* ── Section 2: The Creation Story (3-Step Process Strip) ───────────── */}
      <div ref={processStripRef}>
        <ProcessStrip variant={getVariant(themeMode, "process")} />
      </div>

      {/* ── Section 3: Astrological Architecture / Dimensions (Placeholder) ── */}
      <div ref={dimensionsRef}>
        <FeatureGrid variant={getVariant(themeMode, "features")} />
      </div>

      {/* ── Section 4: Patrons & Institutions (Who It's For) ───────────────── */}
      <div ref={institutionsRef}>
        <InstitutionGrid variant={getVariant(themeMode, "institutions")} />
      </div>

      {/* ── Section 5: The Final Conversion Closer (M10 CTA Card) ─────────── */}
      <div ref={ctaRef}>
        <ClosingCtaSection variant={getVariant(themeMode, "cta")} />
      </div>

      {/* ── Section 6: Grounded 4-Column Luxury Footer ──────────────────────── */}
      <Footer variant={getVariant(themeMode, "footer")} />

      {/* ── Floating Theme Comparison Controller (3 Options) ────────────────── */}
      <aside
        aria-label="Theme comparison controls"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 bg-[#060B18]/95 backdrop-blur-md border border-[#D4A65A]/30 rounded-full p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
      >
        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#D4A65A]/80 px-2 select-none hidden lg:inline">
          Theme Mode
        </span>

        {/* 1. Full Cosmic */}
        <button
          type="button"
          onClick={() => setThemeMode("full-cosmic")}
          className={cn(
            "px-3 py-1.5 rounded-full text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1.5",
            themeMode === "full-cosmic"
              ? "bg-[#D4A65A] text-[#050A14] font-semibold shadow-[0_0_12px_rgba(212,166,90,0.4)]"
              : "text-ivory/70 hover:text-ivory hover:bg-white/5"
          )}
          title="Option 1: 100% Deep Cosmic Gold across all sections"
        >
          <span>🌌</span>
          <span>Full Cosmic</span>
        </button>

        {/* 2. Full Parchment */}
        <button
          type="button"
          onClick={() => setThemeMode("full-parchment")}
          className={cn(
            "px-3 py-1.5 rounded-full text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1.5",
            themeMode === "full-parchment"
              ? "bg-[#F3E9D2] text-[#2A1B10] font-semibold shadow-[0_0_12px_rgba(243,233,210,0.4)]"
              : "text-ivory/70 hover:text-ivory hover:bg-white/5"
          )}
          title="Option 2: 100% Light Parchment across all sections"
        >
          <span>📜</span>
          <span>Full Parchment</span>
        </button>

        {/* 3. Alternate (One Dark, One Light) */}
        <button
          type="button"
          onClick={() => setThemeMode("alternate")}
          className={cn(
            "px-3 py-1.5 rounded-full text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1.5",
            themeMode === "alternate"
              ? "bg-gradient-to-r from-[#D4A65A] to-[#F3E9D2] text-[#1A1208] font-semibold shadow-[0_0_12px_rgba(212,166,90,0.4)]"
              : "text-ivory/70 hover:text-ivory hover:bg-white/5"
          )}
          title="Option 3: One Dark, One Light Component alternating down the page"
        >
          <span>🌓</span>
          <span>Alternate</span>
        </button>

        {/* Link to Workbench */}
        <a
          href="/workbench"
          className="text-[10px] font-mono text-[#D4A65A]/60 hover:text-[#FFF5D1] px-2.5 transition-colors border-l border-white/10 hidden md:inline"
          title="View All Component Atoms & Molecules Workbench"
        >
          Workbench →
        </a>
      </aside>
    </div>
  );
}
