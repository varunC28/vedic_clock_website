"use client";

import React, { useEffect, useRef } from "react";
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
import { useTheme } from "@/components/providers/ThemeProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { isParchment } = useTheme();
  const variant = isParchment ? "parchment" : "dark";

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

      {/* ── Section 1: Hero Showcase (40% Text / 60% Luxury Clock) ─────────── */}
      <Hero variant={variant} />

      {/* ── Section 2: The Creation Story (3-Step Process Strip) ───────────── */}
      <div ref={processStripRef}>
        <ProcessStrip variant={variant} />
      </div>

      {/* ── Section 3: Astrological Architecture / Dimensions ──────────────── */}
      <div ref={dimensionsRef}>
        <FeatureGrid variant={variant} />
      </div>

      {/* ── Section 4: Patrons & Institutions (Who It's For) ───────────────── */}
      <div ref={institutionsRef}>
        <InstitutionGrid variant={variant} />
      </div>

      {/* ── Section 5: The Final Conversion Closer (M10 CTA Card) ─────────── */}
      <div ref={ctaRef}>
        <ClosingCtaSection variant={variant} />
      </div>

      {/* ── Section 6: Grounded 4-Column Luxury Footer ──────────────────────── */}
      <Footer variant={variant} />
    </div>
  );
}
