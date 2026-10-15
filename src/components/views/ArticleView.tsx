"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Header } from "@/components/organisms/Header";
import { LazyImage } from "@/components/ui/lazy-image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BlogArticle } from "@/data/blog-articles";

const Footer = dynamic(
  () => import("@/components/organisms/Footer").then((m) => m.Footer),
  {
    loading: () => (
      <footer className="w-full py-16 bg-[#020408] border-t border-[#D4A65A]/15 min-h-[280px]" />
    ),
  }
);

interface ArticleViewProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
}
function renderFormattedText(text: string, isParchment: boolean) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    parts.push(
      <Link
        key={match.index}
        href={href}
        className={cn(
          "font-medium underline decoration-1 underline-offset-4 transition-colors cursor-pointer",
          isParchment
            ? "text-[#8C5D33] decoration-[#8C5D33]/40 hover:text-[#3D2314] hover:decoration-[#3D2314]"
            : "text-[#D4A65A] decoration-[#D4A65A]/40 hover:text-[#FFF5D1] hover:decoration-[#FFF5D1]"
        )}
      >
        {label}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function ArticleView({ article, relatedArticles }: ArticleViewProps) {
  const { isParchment } = useTheme();

  return (
    <div
      className={cn(
        "relative w-full max-w-full min-h-screen overflow-x-hidden transition-colors duration-500",
        isParchment ? "bg-[#FAF6F0] text-[#2D1B0E]" : "bg-[#03060E] text-ivory"
      )}
    >
      <Header alwaysVisible />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-5 sm:px-8 max-w-4xl mx-auto text-left">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 text-xs font-sans tracking-wide transition-colors",
              isParchment ? "text-[#8C5D33] hover:text-[#2D1B0E]" : "text-[#D4A65A] hover:text-[#FBF5E7]"
            )}
          >
            <span>←</span>
            <span>Back to all publications · सभी लेख</span>
          </Link>
        </div>

        {/* Meta Header */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-wider font-medium",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            {article.readTime}
          </span>
        </div>

        {/* Title & Bilingual Subtitle */}
        <h1
          className={cn(
            "font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] mb-4 article-speakable-title",
            isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
          )}
        >
          {article.title}
        </h1>

        {article.titleHi && (
          <p
            className={cn(
              "font-hindi text-xl sm:text-2xl font-medium mb-6",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            {article.titleHi}
          </p>
        )}

        {/* Author Bio Bar */}
        <div className="flex items-center gap-3 py-4 border-y border-current/10 mb-8">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm border",
              isParchment ? "bg-[#EFE6D6] border-[#DFCBB5] text-[#2D1B0E]" : "bg-[#0A1224] border-[#D4A65A]/40 text-[#D4A65A]"
            )}
          >
            {article.author.charAt(0)}
          </div>
          <div className="flex flex-col text-xs font-sans">
            <span className="font-semibold">{article.author}</span>
            <span className="opacity-60">{article.authorRole ?? "Vedic Horology Scholar"}</span>
          </div>
        </div>

        {/* ── Semantic Hero Visual & Figure Architecture ── */}
        {(() => {
          const heroSrc =
            article.image ||
            `/api/og?title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent(article.titleHi || "")}&category=${encodeURIComponent(article.category)}`;
          const heroAlt = article.imageAlt || `${article.title} · ${article.titleHi || "Vedic Horology"}`;
          const heroCaptionEn = article.imageCaption || article.description;
          const heroCaptionHi = article.imageCaptionHi || article.descriptionHi;
          const heroCredit = article.imageCredit || "Vikramaditya Vedic Clock Archives · Ujjain";

          return (
            <figure
              itemScope
              itemType="https://schema.org/ImageObject"
              className={cn(
                "mb-10 rounded-2xl overflow-hidden border shadow-xl transition-all duration-300",
                isParchment ? "bg-[#FAF4EA] border-[#DFCBB5]" : "bg-[#0A1224] border-[#D4A65A]/25"
              )}
            >
              <div className="relative w-full overflow-hidden">
                <LazyImage
                  src={heroSrc}
                  alt={heroAlt}
                  ratio={16 / 9}
                  priority={true}
                  className="w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.015]"
                />
                <meta
                  itemProp="url"
                  content={heroSrc.startsWith("http") ? heroSrc : `https://thevedicghadi.in${heroSrc}`}
                />
                <meta itemProp="name" content={heroAlt} />
              </div>

              {/* Caption & Attribution Bar */}
              <figcaption
                className={cn(
                  "p-3.5 sm:p-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs",
                  isParchment
                    ? "bg-[#F5EDE0] border-[#DFCBB5] text-[#5C4230]"
                    : "bg-[#060B18] border-[#D4A65A]/20 text-ivory/70"
                )}
              >
                <div className="flex-1 text-left">
                  {heroCaptionHi && (
                    <p
                      className={cn(
                        "font-hindi text-[12.5px] font-medium leading-relaxed mb-0.5",
                        isParchment ? "text-[#3D2314]" : "text-[#FBF5E7]"
                      )}
                    >
                      {heroCaptionHi}
                    </p>
                  )}
                  <p
                    className={cn(
                      "font-sans text-[11.5px] leading-relaxed italic opacity-85",
                      isParchment ? "text-[#70523C]" : "text-ivory/65"
                    )}
                  >
                    {heroCaptionEn}
                  </p>
                </div>
                <div
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border",
                    isParchment
                      ? "bg-[#8C5D33]/10 text-[#7E4A19] border-[#8C5D33]/20"
                      : "bg-[#D4A65A]/10 text-[#D4A65A] border-[#D4A65A]/25"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A65A]" />
                  <span>{heroCredit}</span>
                </div>
              </figcaption>
            </figure>
          );
        })()}

        {/* Article Excerpt */}
        {article.descriptionHi && (
          <p
            className={cn(
              "text-base sm:text-lg font-hindi font-medium leading-relaxed mb-3",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            {article.descriptionHi}
          </p>
        )}
        <p
          className={cn(
            "text-base sm:text-lg font-sans leading-relaxed mb-8 pb-6 border-b border-current/10 font-normal italic article-speakable-lead",
            isParchment ? "text-[#5C4230]" : "text-ivory/80"
          )}
        >
          {article.description}
        </p>

        {/* ── AEO Direct Answer / Key Insights Callout Box ── */}
        {article.keyInsights && (
          <aside
            id="key-insights"
            aria-label="Executive Key Insights"
            className={cn(
              "rounded-2xl p-6 sm:p-7 mb-10 border transition-all duration-300 article-speakable-takeaways scroll-mt-28",
              isParchment
                ? "bg-[#FAF4EA] border-[#8C5D33]/30 shadow-[0_4px_24px_rgba(61,35,20,0.04)]"
                : "bg-[#0C101A] border-[#D4A65A]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            )}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#D4A65A] text-base">✦</span>
              <h2
                className={cn(
                  "font-serif text-xs sm:text-sm font-bold tracking-widest uppercase",
                  isParchment ? "text-[#3D2314]" : "text-[#FFF5D1]"
                )}
              >
                Executive Key Insights • मुख्य निष्कर्ष
              </h2>
            </div>

            <ul className="space-y-3 font-sans text-xs sm:text-[13.5px] leading-relaxed mb-4">
              {article.keyInsights.en.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5">
                  <span className="text-[#D4A65A] text-xs mt-1 shrink-0">✦</span>
                  <span className={cn(isParchment ? "text-[#2D1B0E]" : "text-ivory/90")}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "pt-3.5 border-t font-hindi text-xs sm:text-[13px] leading-relaxed space-y-2",
                isParchment ? "border-[#8C5D33]/15 text-[#5C4033]" : "border-white/5 text-ivory/70"
              )}
            >
              {article.keyInsights.hi.map((bulletHi, bIdx) => (
                <p key={bIdx} className="flex items-start gap-2">
                  <span className="opacity-50 mt-0.5">•</span>
                  <span>{bulletHi}</span>
                </p>
              ))}
            </div>
          </aside>
        )}

        {/* Body Content Sections */}
        <article className="flex flex-col gap-8 mb-16">
          {article.content.map((block, idx) => {
            const sectionSlug = block.heading
              ? block.heading
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")
              : `section-${idx + 1}`;

            return (
              <section key={idx} id={sectionSlug} className="flex flex-col gap-3 scroll-mt-28">
                {block.heading && (
                  <h2
                    className={cn(
                      "font-serif text-2xl sm:text-3xl font-bold tracking-tight mt-2",
                      isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                    )}
                  >
                    {block.heading}
                  </h2>
                )}

              {block.headingHi && (
                <p
                  className={cn(
                    "font-hindi text-base sm:text-lg font-medium -mt-1",
                    isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                  )}
                >
                  {block.headingHi}
                </p>
              )}

              {/* Hindi Body Text */}
              {block.textHi && (
                <p
                  className={cn(
                    "font-hindi text-base sm:text-lg leading-relaxed text-justify mb-1 font-normal",
                    isParchment ? "text-[#3D2514]" : "text-ivory/95"
                  )}
                >
                  {renderFormattedText(block.textHi, isParchment)}
                </p>
              )}

              {/* English Translation / Counterpart */}
              <p
                className={cn(
                  "font-sans text-sm sm:text-base leading-relaxed text-justify",
                  isParchment ? "text-[#5C4230]" : "text-ivory/75"
                )}
              >
                {renderFormattedText(block.text, isParchment)}
              </p>

              {/* Shloka Highlight Block */}
              {block.shloka && (
                <div
                  className={cn(
                    "p-6 rounded-2xl border-l-4 my-4 shadow-sm",
                    isParchment
                      ? "bg-[#F2ECE1] border-[#B8873D] text-[#2D1B0E]"
                      : "bg-[#0A1224] border-[#D4A65A] text-[#FBF5E7]"
                  )}
                >
                  <p className="font-hindi text-lg sm:text-xl font-semibold leading-relaxed mb-2 text-center text-[#B8873D]">
                    {block.shloka}
                  </p>
                  {block.shlokaTranslation && (
                    <p className="font-sans text-xs sm:text-sm italic opacity-80 text-center">
                      {block.shlokaTranslation}
                    </p>
                  )}
                </div>
              )}
              </section>
            );
          })}
        </article>

        {/* Related Articles */}
        <section id="related-publications" className="pt-12 border-t border-current/15 scroll-mt-28">
          <h3
            className={cn(
              "font-serif text-xl sm:text-2xl font-bold mb-6",
              isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
            )}
          >
            Related Publications · संबंधित लेख
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className={cn(
                  "group p-3 rounded-xl border flex flex-col justify-between transition-all",
                  isParchment
                    ? "bg-[#FAF4EA] border-[#DFCBB5] hover:border-[#B8873D]"
                    : "bg-[#060B18] border-[#D4A65A]/20 hover:border-[#D4A65A]/50"
                )}
              >
                <div className="space-y-2">
                  {rel.image && (
                    <div className="overflow-hidden rounded-lg">
                      <LazyImage
                        src={rel.image}
                        alt={rel.title}
                        ratio={16 / 9}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h4
                    className={cn(
                      "font-serif text-sm font-bold line-clamp-2 transition-colors",
                      isParchment ? "group-hover:text-[#8C5D33]" : "group-hover:text-[#D4A65A]"
                    )}
                  >
                    {rel.title}
                  </h4>
                </div>
                <span className="text-[11px] opacity-60 font-sans mt-3">{rel.readTime}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer variant="dark" />
    </div>
  );
}

export default ArticleView;
