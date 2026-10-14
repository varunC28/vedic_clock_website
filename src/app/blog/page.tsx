"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { BlogSection } from "@/components/ui/blog-section";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function BlogPage() {
  const { isParchment } = useTheme();

  return (
    <div
      className={cn(
        "relative w-full max-w-full min-h-screen overflow-x-hidden transition-colors duration-500",
        isParchment ? "bg-[#FAF6F0] text-[#2D1B0E]" : "bg-[#03060E] text-ivory"
      )}
    >
      {/* ── Fixed Sticky Navigation Header ── */}
      <Header alwaysVisible />

      {/* ── Main Publication Container ── */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-20">
        <BlogSection />
      </main>

      {/* ── Grounded 4-Column Luxury Footer ── */}
      <Footer variant="dark" />
    </div>
  );
}
