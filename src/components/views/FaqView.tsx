"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  MASTER_FAQ_ITEMS,
  FAQ_CATEGORIES,
  FaqCategory,
  FaqItem,
} from "@/data/faq-data";

export function FaqView() {
  const { isParchment } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory["key"]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "ujjain-prime-meridian": true, // First item open by default
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = useMemo(() => {
    return MASTER_FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase();
      const matchesQuery =
        item.questionEn.toLowerCase().includes(q) ||
        item.questionHi.toLowerCase().includes(q) ||
        item.answerEn.toLowerCase().includes(q) ||
        item.answerHi.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Aesthetic theme tokens matching GuideView and BlogView
  const t = {
    bg: isParchment ? "bg-[#F5EDE1] text-[#2D1B0E]" : "bg-[#03060E] text-ivory",
    card: isParchment
      ? "bg-[#F8F2E8] border-[#DFCBB5] shadow-[0_12px_40px_rgba(72,45,28,0.08)]"
      : "bg-[#060B18] border-[#D4A65A]/25 shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
    box: isParchment
      ? "bg-[#FAF4EA] border-[#DFCBB5]"
      : "bg-[#0A1122] border-[#D4A65A]/20",
    pillActive: isParchment
      ? "bg-[#482D1C] text-[#FFF9F0] border-[#482D1C] shadow-sm"
      : "bg-gradient-to-r from-[#B8873D] via-[#D4A65A] to-[#E5B76A] text-[#03060E] border-transparent shadow-[0_2px_12px_rgba(212,166,90,0.3)]",
    pillInactive: isParchment
      ? "bg-[#EFE4D3] text-[#70523C] border-[#DFCBB5] hover:border-[#B8873D]/60 hover:text-[#3D2314]"
      : "bg-[#080D1A] text-ivory/70 border-[#D4A65A]/20 hover:border-[#D4A65A]/50 hover:text-ivory",
    input: isParchment
      ? "bg-[#FAF4EA] border-[#DFCBB5] text-[#2D1B0E] placeholder:text-[#8C5D33]/60 focus:border-[#A36D31] focus:ring-[#A36D31]/20"
      : "bg-[#0A1122] border-[#D4A65A]/25 text-ivory placeholder:text-ivory/40 focus:border-[#D4A65A] focus:ring-[#D4A65A]/20",
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

      <main className="relative z-10 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center">
        {/* ── Hero Header ── */}
        <div className="text-center mb-10 max-w-2xl flex flex-col items-center">
          <span className={cn("font-mono text-xs tracking-[0.25em] uppercase font-semibold mb-3", t.eyebrow)}>
            Knowledge Hub · ज्ञान-कोष
          </span>

          <h1 className={cn("font-hindi text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-normal leading-tight", t.titleHi)}>
            प्रश्नोत्तरी एवं संदर्भ
          </h1>

          <h2 className={cn("font-serif text-lg sm:text-2xl md:text-3xl font-medium tracking-tight mt-1", t.titleEn)}>
            Master Knowledge Base & FAQ
          </h2>

          <div className="w-24 h-[1.5px] bg-[#D4A65A]/50 my-5" />

          <p className={cn("font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl", t.bodyEn)}>
            Authoritative answers on the Vikramaditya Vedic Clock, ancient Ujjain $0^\circ$ meridian calculations, offline microcontroller engineering, and global institutional commissions.
          </p>
        </div>

        {/* ── Interactive Search Bar ── */}
        <div className="w-full max-w-2xl mb-8 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries (e.g., Ujjain, Muhurta, Offline, GPS, Brass, Temple)..."
            className={cn(
              "w-full px-5 py-3.5 pl-12 rounded-full text-xs sm:text-sm font-sans transition-all border outline-none shadow-sm focus:ring-2",
              t.input
            )}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm opacity-60">
            🔍
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs opacity-60 hover:opacity-100 px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border flex items-center gap-1.5 cursor-pointer whitespace-nowrap",
                  isActive ? t.pillActive : t.pillInactive
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.labelEn}</span>
                <span className="opacity-50 text-[10px]">·</span>
                <span className="font-hindi text-[11px]">{cat.labelHi}</span>
              </button>
            );
          })}
        </div>

        {/* ── Result Counter ── */}
        <div className="w-full flex items-center justify-between mb-6 px-1">
          <span className={cn("text-xs font-mono tracking-wider uppercase", t.eyebrow)}>
            Showing {filteredItems.length} {filteredItems.length === 1 ? "Inquiry" : "Inquiries"}
          </span>
          {searchQuery && (
            <span className={cn("text-xs font-sans", t.bodyEn)}>
              Filtered by &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* ── Main FAQ Accordion List ── */}
        {filteredItems.length === 0 ? (
          <div className={cn("w-full rounded-2xl p-10 text-center border", t.box)}>
            <p className={cn("font-hindi text-base font-bold", t.titleHi)}>
              कोई प्रश्न नहीं मिला
            </p>
            <p className={cn("font-sans text-xs mt-1", t.bodyEn)}>
              No matching inquiries found. Try clearing your search or switching categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-1.5 text-xs font-medium rounded-full bg-[#D4A65A]/20 text-[#D4A65A] hover:bg-[#D4A65A]/30 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3.5 sm:gap-4">
            {filteredItems.map((item, index) => {
              const isOpen = !!openIds[item.id];
              return (
                <div
                  key={item.id}
                  className={cn(
                    "w-full rounded-2xl border transition-all duration-300 overflow-hidden",
                    isOpen
                      ? isParchment
                        ? "bg-[#FFF9F0] border-[#B8873D]/60 shadow-[0_6px_20px_rgba(110,65,25,0.08)]"
                        : "bg-[#0A1224] border-[#D4A65A]/50 shadow-[0_6px_24px_rgba(212,166,90,0.12)]"
                      : isParchment
                        ? "bg-[#FAF4EA] border-[#DFCBB5] hover:border-[#B8873D]/40"
                        : "bg-[#060B18] border-[#D4A65A]/15 hover:border-[#D4A65A]/35"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className={cn(
                        "font-mono text-xs sm:text-sm font-bold px-2 py-0.5 rounded-md mt-0.5 shrink-0 border",
                        t.tag
                      )}>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className={cn(
                          "text-[10px] sm:text-[11px] font-mono tracking-wider uppercase mb-1",
                          t.eyebrow
                        )}>
                          {item.categoryLabelEn} · {item.categoryLabelHi}
                        </span>
                        <span className={cn("font-hindi font-bold text-base sm:text-lg md:text-xl leading-snug", t.titleHi)}>
                          {item.questionHi}
                        </span>
                        <span className={cn("font-serif text-xs sm:text-sm mt-1 leading-snug font-medium", t.titleEn)}>
                          {item.questionEn}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 mt-1 text-[10px] sm:text-xs",
                        isOpen ? "rotate-180" : "rotate-0",
                        isParchment
                          ? "bg-[#EFE4D3] border-[#DFCBB5] text-[#7E4A19]"
                          : "bg-[#10192D] border-[#D4A65A]/25 text-[#D4A65A]"
                      )}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className={cn(
                      "px-4 sm:px-6 pb-6 pt-2 border-t text-left flex flex-col gap-3.5",
                      isParchment ? "border-[#DFCBB5]/60" : "border-[#D4A65A]/15"
                    )}>
                      {/* Hindi Answer */}
                      <p className={cn("font-hindi text-sm sm:text-base leading-relaxed pt-2", t.bodyHi)}>
                        {item.answerHi}
                      </p>

                      {/* English Answer */}
                      <p className={cn("font-sans text-xs sm:text-sm leading-relaxed", t.bodyEn)}>
                        {item.answerEn}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={cn(
                              "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                              t.tag
                            )}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

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
              Direct Acquisitions Portal →
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
              Download Monograph (PDF) ↓
            </a>
          </div>
        </div>
      </main>

      <Footer variant={isParchment ? "parchment" : "dark"} />
    </div>
  );
}
