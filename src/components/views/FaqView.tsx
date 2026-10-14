"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { useTheme } from "@/components/providers/ThemeProvider";
import { MASTER_FAQ_ITEMS } from "@/data/faq-data";

export function FaqView() {
  const { isParchment } = useTheme();
  // By default, the first card is open
  const [activeId, setActiveId] = useState<string | null>(MASTER_FAQ_ITEMS[0]?.id || null);

  // Aesthetic theme tokens matching Vedic Clock design system
  const t = {
    bg: isParchment ? "bg-[#F5EDE1] text-[#2D1B0E]" : "bg-[#03060E] text-ivory",
    card: isParchment
      ? "bg-[#F8F2E8] border-[#DFCBB5] shadow-[0_12px_40px_rgba(72,45,28,0.08)]"
      : "bg-[#060B18] border-[#D4A65A]/25 shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
    box: isParchment
      ? "bg-[#FAF4EA] border-[#DFCBB5]"
      : "bg-[#0A1122] border-[#D4A65A]/20",
    titleHi: isParchment ? "text-[#3D2314]" : "text-[#FBF5E7]",
    titleEn: isParchment ? "text-[#70523C]" : "text-[#D4A65A]",
    bodyEn: isParchment ? "text-[#5C4230]" : "text-ivory/80",
    bodyHi: isParchment ? "text-[#2D1B0E]" : "text-ivory",
    eyebrow: isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]",
    tag: isParchment
      ? "bg-[#EFE4D3] text-[#7E4A19] border-[#DFCBB5]"
      : "bg-[#D4A65A]/15 text-[#D4A65A] border-[#D4A65A]/30",
  };

  return (
    <div className={cn("relative w-full min-h-screen transition-colors duration-500 overflow-x-hidden", t.bg)}>
      <Header alwaysVisible />

      {/* ── Ambient Radial Golden Glow ── */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[480px] blur-3xl pointer-events-none rounded-full transition-opacity duration-500",
          isParchment
            ? "bg-gradient-to-tr from-[#B8873D]/10 via-[#D4A65A]/8 to-transparent"
            : "bg-gradient-to-tr from-[#D4A65A]/14 via-[#E8B94B]/8 to-transparent"
        )}
      />

      <main className="relative z-10 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
        {/* ── Hero Header ── */}
        <div className="text-center mb-12 max-w-2xl flex flex-col items-center">
          <span className={cn("font-mono text-xs tracking-[0.25em] uppercase font-semibold mb-3", t.eyebrow)}>
            Knowledge Hub · ज्ञान-कोष
          </span>

          <h1 className={cn("font-hindi text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-normal leading-tight", t.titleHi)}>
            प्रश्नोत्तरी एवं संदर्भ
          </h1>

          <h2 className={cn("font-serif text-lg sm:text-2xl md:text-3xl font-medium tracking-tight mt-1", t.titleEn)}>
            Frequently Asked Questions
          </h2>

          <div className="w-24 h-[1.5px] bg-[#D4A65A]/50 my-5" />

          <p className={cn("font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl", t.bodyEn)}>
            Authoritative answers on the Vikramaditya Vedic Clock, ancient Ujjain 0° meridian calculations, offline microcontroller engineering, and global institutional commissions.
          </p>
        </div>

        {/* ── Hover-Activated FAQ Accordion List ── */}
        <div className="w-full flex flex-col gap-3.5 sm:gap-4">
          {MASTER_FAQ_ITEMS.map((item, index) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                className={cn(
                  "group relative w-full rounded-2xl select-none origin-center cursor-pointer overflow-hidden",
                  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen
                    ? isParchment
                      ? "bg-[#FFF9F0] border-2 border-[#9E672B] border-l-[4px] border-l-[#7E4A19] shadow-[0_12px_30px_-6px_rgba(110,65,25,0.18),0_4px_12px_rgba(110,65,25,0.08)] scale-[1.012] -translate-y-0.5 sm:-translate-y-1 z-10"
                      : "bg-[#0C1428] border-2 border-[#E5A84B] border-l-[4px] border-l-[#F59E0B] shadow-[0_14px_34px_-6px_rgba(229,168,75,0.32),0_4px_14px_rgba(0,0,0,0.5)] scale-[1.012] -translate-y-0.5 sm:-translate-y-1 z-10"
                    : isParchment
                      ? "bg-[#FAF4EA] border-2 border-transparent border-l-[4px] border-l-transparent hover:border-[#9E672B]/60 hover:border-l-[#7E4A19] hover:bg-[#FFF9F0] hover:shadow-[0_10px_25px_-5px_rgba(110,65,25,0.12)] hover:scale-[1.008] hover:-translate-y-0.5 scale-100 translate-y-0 z-0"
                      : "bg-[#060B18] border-2 border-transparent border-l-[4px] border-l-transparent hover:border-[#E5A84B]/60 hover:border-l-[#F59E0B] hover:bg-[#0A1224] hover:shadow-[0_12px_28px_-6px_rgba(229,168,75,0.2)] hover:scale-[1.008] hover:-translate-y-0.5 scale-100 translate-y-0 z-0"
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? null : item.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <span
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center font-sans text-[11px] sm:text-xs font-bold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen
                          ? isParchment
                            ? "bg-[#B8873D] text-[#FFF9F0] shadow-md scale-110"
                            : "bg-[#E5A84B] text-[#120F0B] shadow-[0_0_16px_rgba(229,168,75,0.55)] scale-110"
                          : isParchment
                            ? "bg-[#EADCCB] text-[#5C4230] scale-100 group-hover:scale-105"
                            : "bg-white/10 text-[#D4A65A] scale-100 group-hover:scale-105"
                      )}
                    >
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <h3
                      className={cn(
                        "font-serif text-sm sm:text-base md:text-lg font-medium tracking-tight leading-snug transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen
                          ? isParchment
                            ? "text-[#3D2314]"
                            : "text-[#FCD34D]"
                          : isParchment
                            ? "text-[#5C4230] group-hover:text-[#3D2314]"
                            : "text-ivory/80 group-hover:text-ivory"
                      )}
                    >
                      {item.questionEn}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-[10px] sm:text-xs",
                      isOpen
                        ? isParchment
                          ? "rotate-180 bg-[#482D1C] text-[#FFF9F0] border-[#482D1C] scale-105"
                          : "rotate-180 bg-[#E5A84B] text-[#0A0D18] border-[#E5A84B] shadow-[0_0_12px_rgba(229,168,75,0.4)] scale-105"
                        : isParchment
                          ? "rotate-0 bg-[#EFE4D3] border-[#DFCBB5] text-[#7E4A19] scale-100"
                          : "rotate-0 bg-[#10192D] border-[#D4A65A]/25 text-[#D4A65A] scale-100"
                    )}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>

                {/* CSS Grid intrinsic height animation for buttery smooth opening */}
                <div
                  id={`faq-answer-${item.id}`}
                  className={cn(
                    "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <div
                      className={cn(
                        "px-4 sm:px-6 pb-6 pt-3.5 border-t text-left flex flex-col gap-4",
                        isParchment ? "border-[#9E672B]/30" : "border-[#E5A84B]/20"
                      )}
                    >
                      {/* English Primary Answer */}
                      <div className="flex flex-col gap-1">
                        <span className={cn("text-[10px] font-mono tracking-widest uppercase", t.eyebrow)}>
                          Answer · English
                        </span>
                        <p className={cn("font-sans text-xs sm:text-sm md:text-[14.5px] leading-relaxed", t.bodyEn)}>
                          {item.answerEn}
                        </p>
                      </div>

                      {/* Hindi Translated Answer */}
                      <div className={cn("pt-3.5 border-t flex flex-col gap-1", isParchment ? "border-[#DFCBB5]/50" : "border-[#D4A65A]/15")}>
                        <span className={cn("text-[10px] font-mono tracking-widest uppercase", t.eyebrow)}>
                          उत्तर · हिन्दी
                        </span>
                        <p className={cn("font-hindi text-xs sm:text-sm md:text-[15px] leading-relaxed", t.bodyHi)}>
                          {item.answerHi}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom Institutional CTA Box ── */}
        <div className={cn("w-full mt-14 rounded-3xl p-6 sm:p-10 border text-center flex flex-col items-center gap-4", t.card)}>
          <span className={cn("font-mono text-xs tracking-widest uppercase font-semibold", t.eyebrow)}>
            Shiv Enterprises · Ujjain
          </span>
          <h3 className={cn("font-hindi text-xl sm:text-2xl font-bold", t.titleHi)}>
            क्या आपका कोई विशेष तकनीकी अथवा संस्थागत प्रश्न है?
          </h3>
          <p className={cn("font-sans text-xs sm:text-sm max-w-xl leading-relaxed", t.bodyEn)}>
            For bespoke temple courtyard monuments, sanctum wall mounts, university astronomical installations, or heraldic inscriptions, connect directly with our engineering team in Ujjain.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer",
                isParchment
                  ? "bg-[#482D1C] text-[#FFF9F0] hover:bg-[#5E3B24] shadow-sm"
                  : "bg-gradient-to-r from-[#B8873D] via-[#D4A65A] to-[#E5B76A] text-[#03060E] hover:opacity-95 shadow-[0_4px_16px_rgba(212,166,90,0.25)]"
              )}
            >
              Enquire Now →
            </Link>
            <a
              href="/catalogue.pdf"
              download="Vedic_Watch_Catalogue.pdf"
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border cursor-pointer",
                isParchment
                  ? "border-[#482D1C]/40 text-[#482D1C] hover:bg-[#482D1C]/5"
                  : "border-[#D4A65A]/40 text-[#D4A65A] hover:bg-[#D4A65A]/10"
              )}
            >
              Download Catalogue (PDF) ↓
            </a>
          </div>
        </div>
      </main>

      <Footer variant={isParchment ? "parchment" : "dark"} />
    </div>
  );
}
