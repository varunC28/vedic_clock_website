"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { useTheme } from "@/components/providers/ThemeProvider";

const ProcessStrip = dynamic(
  () => import("@/components/organisms/ProcessStrip").then((m) => m.ProcessStrip),
  {
    loading: () => (
      <div className="w-full py-24 bg-[#050A14] flex items-center justify-center min-h-[360px]">
        <div className="w-8 h-8 border-2 border-[#D4A65A]/40 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

const FeatureGrid = dynamic(
  () => import("@/components/organisms/FeatureGrid").then((m) => m.FeatureGrid),
  {
    loading: () => (
      <div className="w-full min-h-[500px] py-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A65A]/40 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

const InstitutionGrid = dynamic(
  () => import("@/components/organisms/InstitutionGrid").then((m) => m.InstitutionGrid),
  {
    loading: () => (
      <div className="w-full min-h-[440px] py-24 bg-[#050A14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A65A]/40 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

const ClosingCtaSection = dynamic(
  () => import("@/components/organisms/ClosingCtaSection").then((m) => m.ClosingCtaSection),
  {
    loading: () => (
      <div className="w-full min-h-[320px] py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A65A]/40 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

const Footer = dynamic(
  () => import("@/components/organisms/Footer").then((m) => m.Footer),
  {
    loading: () => (
      <footer className="w-full py-16 bg-[#020408] border-t border-[#D4A65A]/15 min-h-[280px]" />
    ),
  }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeView() {
  const { isParchment } = useTheme();

  const pageRef = useRef<HTMLDivElement>(null);
  const processStripRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef<HTMLDivElement>(null);
  const institutionsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ── GSAP Natural ScrollTrigger Reveals (Scoped to pageRef) ─────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
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
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className={cn(
        "relative w-full min-h-screen overflow-x-hidden transition-colors duration-500",
        isParchment ? "bg-[#F3E9D2] text-[#2A1B10]" : "bg-[#03060E] text-ivory"
      )}
    >
      {/* ── Fixed Sticky Navigation Header ─────────────────────────────────── */}
      <Header />

      {/* ── Section 1: Hero Showcase (40% Text / 60% Luxury Clock) [LIGHT in light mode / DARK in dark mode] ─── */}
      <Hero variant={isParchment ? "parchment" : "dark"} />

      {/* ── Section 2: The Creation Story (3-Step Process Strip) [DARK in both modes for alternation] ───── */}
      <div ref={processStripRef}>
        <ProcessStrip variant="dark" />
      </div>

      {/* ── Section 3: Astrological Architecture / Dimensions [LIGHT in light mode / DARK in dark mode] ──── */}
      <div ref={dimensionsRef}>
        <FeatureGrid variant={isParchment ? "parchment" : "dark"} />
      </div>

      {/* ── Section 4: Patrons & Institutions (Who It's For) [DARK in both modes for alternation] ───────── */}
      <div ref={institutionsRef}>
        <InstitutionGrid variant="dark" />
      </div>

      {/* ── Section 5: The Final Conversion Closer (M10 CTA Card) [LIGHT in light mode / DARK in dark mode] ─ */}
      <div ref={ctaRef}>
        <ClosingCtaSection variant={isParchment ? "parchment" : "dark"} />
      </div>

      {/* ── Section 6: Grounded 4-Column Luxury Footer [DARK in both modes for alternation] ──────────────── */}
      <Footer variant="dark" />
    </div>
  );
}

export default HomeView;
