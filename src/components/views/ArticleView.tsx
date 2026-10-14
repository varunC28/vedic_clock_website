"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { LazyImage } from "@/components/ui/lazy-image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BlogArticle } from "@/data/blog-articles";

interface ArticleViewProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
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

        {/* Hero Image */}
        {article.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-xl border border-current/10">
            <LazyImage
              src={article.image}
              alt={article.title}
              ratio={16 / 9}
              className="w-full"
            />
          </div>
        )}

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
            "text-base sm:text-lg font-sans leading-relaxed mb-10 pb-6 border-b border-current/10 font-normal italic article-speakable-lead",
            isParchment ? "text-[#5C4230]" : "text-ivory/80"
          )}
        >
          {article.description}
        </p>

        {/* Body Content Sections */}
        <article className="flex flex-col gap-8 mb-16">
          {article.content.map((block, idx) => (
            <section key={idx} className="flex flex-col gap-3">
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
                  {block.textHi}
                </p>
              )}

              {/* English Translation / Counterpart */}
              <p
                className={cn(
                  "font-sans text-sm sm:text-base leading-relaxed text-justify",
                  isParchment ? "text-[#5C4230]" : "text-ivory/75"
                )}
              >
                {block.text}
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
          ))}
        </article>

        {/* Related Articles */}
        <section className="pt-12 border-t border-current/15">
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
