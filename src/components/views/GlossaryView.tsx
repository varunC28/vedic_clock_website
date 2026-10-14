"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { cn } from "@/lib/utils";
import { VEDIC_GLOSSARY_TERMS, GlossaryTerm } from "@/data/vedic-glossary";

// ── Lightweight, Zero-Dependency Semantic Icons ──────────────────────────────
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.8 6.2l-2 5.5-5.5 2 2-5.5 5.5-2z" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function GlossaryView() {
  const { isParchment } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(VEDIC_GLOSSARY_TERMS.map((t) => t.category)));
    return ["All", ...cats];
  }, []);

  const filteredTerms = useMemo(() => {
    return VEDIC_GLOSSARY_TERMS.filter((term) => {
      const matchesCategory =
        selectedCategory === "All" || term.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        term.termEn.toLowerCase().includes(q) ||
        term.termHi.includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.definitionHi.includes(q) ||
        (term.formula && term.formula.toLowerCase().includes(q)) ||
        (term.classicalCitation && term.classicalCitation.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const copyAnchor = (slug: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/glossary#${slug}`;
      navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col transition-colors duration-500",
        isParchment ? "bg-[#F5EDE1] text-[#2D1B0E]" : "bg-[#03060E] text-ivory"
      )}
    >
      <Header />

      <main className="flex-1 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs font-sans mb-8 opacity-70">
          <Link
            href="/"
            className={cn(
              "hover:underline transition-colors",
              isParchment ? "text-[#704828]" : "text-[#D4A65A]"
            )}
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/guide"
            className={cn(
              "hover:underline transition-colors",
              isParchment ? "text-[#704828]" : "text-[#D4A65A]"
            )}
          >
            Knowledge Hub
          </Link>
          <span>/</span>
          <span className="font-medium opacity-100">Horology Glossary</span>
        </nav>

        {/* ── Hero Header ── */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-widest uppercase mb-5 border",
              isParchment
                ? "bg-[#E6DACF]/60 border-[#8C5D33]/30 text-[#8C5D33]"
                : "bg-[#D4A65A]/10 border-[#D4A65A]/30 text-[#D4A65A]"
            )}
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Kala-Vidya Lexicon • ४२ शास्त्रीय पारिभाषिक पद</span>
          </div>

          <h1
            className={cn(
              "font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.18] mb-4",
              isParchment ? "text-[#3D2314]" : "text-[#FFF5D1]"
            )}
          >
            Vedic Horology & Timekeeping Lexicon
          </h1>

          <p
            className={cn(
              "font-sans text-sm sm:text-base leading-relaxed max-w-2xl mx-auto",
              isParchment ? "text-[#5C4033]" : "text-ivory/70"
            )}
          >
            Authoritative definitions of ancient Indian temporal dimensions—from infinitesimal
            microseconds (<span className="italic">Truti</span>) and clepsydra water-vessels (
            <span className="italic">Ghati</span>) to solar solstices and the 30 diurnal Muhurtas.
          </p>
        </header>

        {/* ── Search & Filter Controls ── */}
        <div className="mb-10 sm:mb-12 space-y-5">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <SearchIcon
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search terms, Sanskrit words, or treatises (e.g. Ghati, Muhurta, Surya Siddhanta)..."
              className={cn(
                "w-full pl-11 pr-4 py-3 rounded-xl font-sans text-sm outline-none transition-all border shadow-sm",
                isParchment
                  ? "bg-[#EFE7DE] border-[#8C5D33]/30 text-[#2C1810] placeholder-[#704828]/50 focus:border-[#8C5D33] focus:ring-2 focus:ring-[#8C5D33]/15"
                  : "bg-[#0E121A] border-[#D4A65A]/25 text-ivory placeholder-ivory/40 focus:border-[#D4A65A] focus:ring-2 focus:ring-[#D4A65A]/15"
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-sans opacity-60 hover:opacity-100 px-2 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all duration-200 cursor-pointer border",
                    isSelected
                      ? isParchment
                        ? "bg-[#8C5D33] text-white border-[#8C5D33] shadow-sm font-medium"
                        : "bg-[#D4A65A] text-[#07090E] border-[#D4A65A] shadow-sm font-semibold"
                      : isParchment
                      ? "bg-[#EADBCC]/50 border-[#8C5D33]/20 text-[#5C4033] hover:bg-[#EADBCC]"
                      : "bg-[#111520] border-[#D4A65A]/15 text-ivory/70 hover:border-[#D4A65A]/35 hover:text-ivory"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Results Count ── */}
        <div className="flex items-center justify-between mb-6 text-xs font-sans opacity-70 px-1">
          <span>
            Showing <strong className="opacity-100">{filteredTerms.length}</strong> canonical terms
          </span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* ── Terms Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {filteredTerms.map((term: GlossaryTerm) => {
            const isCopied = copiedSlug === term.slug;
            return (
              <article
                key={term.slug}
                id={term.slug}
                className={cn(
                  "relative rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group scroll-mt-24",
                  isParchment
                    ? "bg-[#FDFBF7] border-[#8C5D33]/20 shadow-[0_4px_20px_rgba(61,35,20,0.04)] hover:border-[#8C5D33]/45 hover:shadow-[0_8px_30px_rgba(61,35,20,0.08)]"
                    : "bg-[#0C0F17] border-[#D4A65A]/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-[#D4A65A]/35 hover:shadow-[0_8px_32px_rgba(212,166,90,0.08)]"
                )}
              >
                <div>
                  {/* Top Bar: Category Pill & Copy Anchor Button */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <span
                      className={cn(
                        "text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full border",
                        isParchment
                          ? "bg-[#E6DACF]/60 text-[#704828] border-[#8C5D33]/25"
                          : "bg-[#D4A65A]/10 text-[#D4A65A] border-[#D4A65A]/25"
                      )}
                    >
                      {term.category}
                    </span>

                    <button
                      onClick={() => copyAnchor(term.slug)}
                      title="Copy permanent anchor link"
                      className={cn(
                        "p-1.5 rounded-lg opacity-40 group-hover:opacity-100 transition-all cursor-pointer border",
                        isParchment
                          ? "hover:bg-[#EADBCC] border-transparent hover:border-[#8C5D33]/30 text-[#704828]"
                          : "hover:bg-white/10 border-transparent hover:border-white/20 text-ivory"
                      )}
                    >
                      {isCopied ? (
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <LinkIcon className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Term Header: English + Devanagari */}
                  <div className="flex items-baseline gap-2.5 mb-2">
                    <h2
                      className={cn(
                        "font-serif text-xl sm:text-2xl font-bold tracking-tight glossary-speakable-term",
                        isParchment ? "text-[#3D2314]" : "text-[#FFF5D1]"
                      )}
                    >
                      {term.termEn}
                    </h2>
                    <span
                      className={cn(
                        "font-hindi text-base sm:text-lg font-medium opacity-85",
                        isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                      )}
                    >
                      {term.termHi}
                    </span>
                  </div>

                  {/* Pronunciation & Etymology */}
                  {term.etymology && (
                    <p
                      className={cn(
                        "text-xs font-sans italic mb-3 opacity-75 leading-relaxed",
                        isParchment ? "text-[#704828]" : "text-ivory/65"
                      )}
                    >
                      {term.pronunciation && (
                        <span className="font-semibold not-italic mr-1.5 opacity-90">
                          [{term.pronunciation}]
                        </span>
                      )}
                      {term.etymology}
                    </p>
                  )}

                  {/* Declarative Definitions (EN & HI) */}
                  <p
                    className={cn(
                      "font-sans text-xs sm:text-[13.5px] leading-relaxed mb-3 glossary-speakable-def",
                      isParchment ? "text-[#2C1810]" : "text-ivory/90"
                    )}
                  >
                    {term.definition}
                  </p>

                  <p
                    className={cn(
                      "font-hindi text-xs sm:text-[13px] leading-relaxed mb-4 pb-3 border-b",
                      isParchment
                        ? "text-[#5C4033] border-[#8C5D33]/15"
                        : "text-ivory/70 border-white/5"
                    )}
                  >
                    {term.definitionHi}
                  </p>
                </div>

                {/* Metadata Badges: Formula, Treatise, Wikipedia Link */}
                <div className="pt-2 flex flex-col gap-2 font-sans text-xs">
                  {term.formula && (
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border",
                        isParchment
                          ? "bg-[#EFE7DE] border-[#8C5D33]/20 text-[#3D2314]"
                          : "bg-[#111520] border-[#D4A65A]/20 text-[#FFF5D1]"
                      )}
                    >
                      <CompassIcon className="w-3.5 h-3.5 text-[#D4A65A] shrink-0" />
                      <span className="font-mono text-[11px] sm:text-xs">{term.formula}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-[11px] opacity-80">
                    {term.classicalCitation && (
                      <span className="inline-flex items-center gap-1.5">
                        <BookIcon className="w-3 h-3 text-[#D4A65A]" />
                        <span>{term.classicalCitation}</span>
                      </span>
                    )}

                    {term.wikipediaUrl && (
                      <a
                        href={term.wikipediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-1 hover:underline ml-auto font-medium",
                          isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                        )}
                      >
                        <span>Wikipedia</span>
                        <ExternalLinkIcon className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Empty State ── */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-16 px-4">
            <p className="font-serif text-lg opacity-70 mb-2">No matching horological terms found.</p>
            <p className="text-xs font-sans opacity-50 mb-4">
              Try searching for a different keyword or resetting your category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-sans font-medium transition-colors border cursor-pointer",
                isParchment
                  ? "bg-[#8C5D33] text-white border-[#8C5D33]"
                  : "bg-[#D4A65A] text-[#07090E] border-[#D4A65A]"
              )}
            >
              Show all terms
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
