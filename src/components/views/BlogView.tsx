"use client";

import React from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Header } from "@/components/organisms/Header";
import { useTheme } from "@/components/providers/ThemeProvider";

const BlogSection = dynamic(
  () => import("@/components/ui/blog-section").then((m) => m.BlogSection),
  {
    loading: () => (
      <div className="w-full min-h-[500px] flex items-center justify-center">
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

export function BlogView() {
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

export default BlogView;
