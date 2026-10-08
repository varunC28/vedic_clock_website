"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { EnquiryForm } from "@/components/molecules/EnquiryForm";

export default function ContactPage() {
  const [isParchment, setIsParchment] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-x-hidden transition-colors duration-500",
        isParchment ? "bg-[#F3E9D2] text-[#2A1B10]" : "bg-[#03060E] text-ivory"
      )}
    >
      <Header alwaysVisible />

      {/* ── Ambient Radial Golden Glow ── */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-36 left-1/2 -translate-x-1/2 w-[800px] h-[450px] blur-3xl pointer-events-none rounded-full transition-opacity duration-500",
          isParchment
            ? "bg-gradient-to-tr from-[#B8873D]/10 via-[#D4A65A]/12 to-transparent"
            : "bg-gradient-to-tr from-[#D4A65A]/10 via-[#E8B94B]/5 to-transparent"
        )}
      />

      {/* ── Main Content Container ── */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
        {/* ── Editorial Header ── */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">

          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight leading-tight mt-1",
              isParchment ? "text-[#2A1B10]" : "text-[#FBF5E7]"
            )}
          >
            Begin a Conversation
          </h1>

          <h2
            className={cn(
              "text-xl sm:text-2xl font-hindi font-medium mt-1 leading-tight",
              isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
            )}
          >
            समय का एक अंश अपने नाम करें
          </h2>

          <GoldDivider
            variant={isParchment ? "light" : "dark"}
            className="my-3.5 max-w-xs scale-90"
          />

          <p
            className={cn(
              "font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-lg mt-1",
              isParchment ? "text-[#3D2A1A]/80" : "text-ivory/75"
            )}
          >
            Each Vikramaditya Vedic Clock is an individually commissioned astronomical monument. Share your details, and our curation atelier in Ujjain will connect with you directly.
          </p>
        </div>

        {/* ── Clean Centered Enquiry Form (Zero Boxed Card, Blended Directly) ── */}
        <div className="w-full max-w-2xl mx-auto">
          <EnquiryForm variant={isParchment ? "parchment" : "dark"} />
        </div>
      </main>

      {/* ── Grounded Luxury Footer ── */}
      <Footer variant={isParchment ? "parchment" : "dark"} />

      {/* ── Minimal Floating Theme Toggle (for comparison) ── */}
      <aside
        aria-label="Theme switcher"
        className="fixed bottom-5 right-5 z-50 flex items-center bg-[#060B18]/90 backdrop-blur-md border border-[#D4A65A]/30 rounded-full p-1 shadow-lg"
      >
        <button
          type="button"
          onClick={() => setIsParchment(!isParchment)}
          className="px-3 py-1 rounded-full text-[11px] font-sans text-ivory/80 hover:text-ivory cursor-pointer flex items-center gap-1.5"
          title="Toggle Dark Cosmic / Light Parchment"
        >
          <span>{isParchment ? "🌌 Cosmic Mode" : "📜 Parchment Mode"}</span>
        </button>
      </aside>
    </div>
  );
}
