"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LazyImage } from "./lazy-image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { VEDIC_BLOG_ARTICLES, BlogArticle } from "@/data/blog-articles";

export interface BlogSectionProps {
  blogs?: BlogArticle[];
  title?: string;
  titleHi?: string;
  subtitle?: string;
  subtitleHi?: string;
  className?: string;
}

export function BlogSection({
  blogs = VEDIC_BLOG_ARTICLES,
  title = "Chronicles of Celestial Horology",
  titleHi = "वैदिक काल-ज्ञान एवं खगोलिकी",
  subtitle = "Discover the ancient mathematical sciences, royal histories, and living circadian philosophy behind the world's premier Vedic timepieces.",
  subtitleHi = "प्राचीन सिद्धान्तों, ऐतिहासिक धरोहर और खगोलीय गणनाओं पर आधारित शोध एवं लेख।",
  className,
}: BlogSectionProps) {
  const { isParchment } = useTheme();

  return (
    <div
      className={cn(
        "relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 select-none",
        className
      )}
    >
      {/* ── Ambient Radial Gradient Glows (Preserved from user snippet) ── */}
      <div
        aria-hidden
        className="absolute inset-0 isolate pointer-events-none -z-10 opacity-70 overflow-hidden"
      >
        <div
          className={cn(
            "-rotate-45 absolute top-0 left-0 h-96 w-96 -translate-y-32 rounded-full blur-3xl transition-colors duration-500",
            isParchment ? "bg-[#B8873D]/10" : "bg-[#D4A65A]/12"
          )}
        />
        <div
          className={cn(
            "-rotate-45 absolute top-1/3 right-0 h-96 w-96 rounded-full blur-3xl transition-colors duration-500",
            isParchment ? "bg-[#D4A65A]/8" : "bg-[#E8B94B]/6"
          )}
        />
      </div>

      {/* ── Header Title Block ── */}
      <div className="flex flex-col items-start gap-3 pb-8 text-left">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-widest font-semibold",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            / publications &amp; essays / शोध एवं विचार /
          </span>
        </div>

        <h1
          className={cn(
            "font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight",
            isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
          )}
        >
          {title}
        </h1>

        {titleHi && (
          <p
            className={cn(
              "font-hindi text-lg sm:text-xl font-medium",
              isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
            )}
          >
            {titleHi}
          </p>
        )}

        <p
          className={cn(
            "font-sans text-sm sm:text-base max-w-3xl leading-relaxed mt-1",
            isParchment ? "text-[#6E5540]" : "text-ivory/70"
          )}
        >
          {subtitle}
        </p>

      </div>

      <div className="h-px w-full border-b border-dashed border-current/15 mb-8" />

      {/* ── Blog Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 z-10 text-left">
        {blogs.map((blog) => {
            const articleHref = blog.slug.startsWith("#") ? `/blog/${blog.slug.replace("#", "")}` : `/blog/${blog.slug}`;
            return (
              <Link
                href={articleHref}
                key={blog.title}
                className={cn(
                  "group flex flex-col justify-between rounded-2xl p-3 sm:p-3.5 border transition-all duration-300",
                  isParchment
                    ? "bg-[#FAF6F0] border-[#DFCBB5] hover:bg-[#FFFDF9] hover:border-[#B8873D]/60 hover:shadow-lg shadow-sm"
                    : "bg-[#060B18]/80 border-[#D4A65A]/20 hover:bg-[#0A1224] hover:border-[#D4A65A]/50 hover:shadow-xl hover:shadow-[#D4A65A]/5"
                )}
              >
                <div className="flex flex-col gap-3">
                  {/* Aspect Ratio 16/9 Lazy Image */}
                  <div className="overflow-hidden rounded-xl">
                    <LazyImage
                      src={blog.image}
                      fallback="https://cdn.21st.dev/assets/mirror/cc/ccf6e78beb7f7cc5b720069cb4f86696912be109614973d49df165d1e51631c8.svg"
                      inView={true}
                      alt={blog.title}
                      ratio={16 / 9}
                      className="transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2 px-1 pt-1 pb-2">
                    {/* Meta pill: Author, Date, Read Time */}
                    <div
                      className={cn(
                        "flex flex-wrap items-center gap-1.5 text-[11px] font-sans font-medium tracking-wide",
                        isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                      )}
                    >
                      <span className="font-semibold">{blog.author}</span>
                      <span className="opacity-40">·</span>
                      <span className="opacity-75">{blog.createdAt}</span>
                      <span className="opacity-40">·</span>
                      <span className="opacity-75">{blog.readTime}</span>
                    </div>

                    {/* Article Headline */}
                    <h2
                      className={cn(
                        "line-clamp-2 text-base sm:text-lg font-serif font-bold tracking-tight leading-snug transition-colors",
                        isParchment
                          ? "text-[#2D1B0E] group-hover:text-[#8C5D33]"
                          : "text-[#FBF5E7] group-hover:text-[#D4A65A]"
                      )}
                    >
                      {blog.title}
                    </h2>

                    {/* Hindi Subtitle if available */}
                    {blog.titleHi && (
                      <p
                        className={cn(
                          "line-clamp-1 font-hindi text-xs sm:text-sm font-semibold",
                          isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                        )}
                      >
                        {blog.titleHi}
                      </p>
                    )}

                    {/* Hindi Description */}
                    {blog.descriptionHi && (
                      <p
                        className={cn(
                          "line-clamp-2 font-hindi text-xs sm:text-[13px] font-medium leading-relaxed pt-0.5",
                          isParchment ? "text-[#5C4533]" : "text-ivory/85"
                        )}
                      >
                        {blog.descriptionHi}
                      </p>
                    )}

                    {/* English Description */}
                    <p
                      className={cn(
                        "line-clamp-2 text-xs sm:text-[12.5px] font-sans leading-relaxed pt-0.5",
                        isParchment ? "text-[#7A614D]" : "text-ivory/60"
                      )}
                    >
                      {blog.description}
                    </p>
                  </div>
                </div>

                {/* Card footer: Category badge + Read Arrow */}
                <div className="pt-3 px-1 border-t border-current/10 flex items-center justify-between text-xs font-sans">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border",
                      isParchment
                        ? "bg-[#F2ECE1] border-[#DFCBB5] text-[#8C5D33]"
                        : "bg-[#091122] border-[#D4A65A]/25 text-[#D4A65A]"
                    )}
                  >
                    {blog.category}
                  </span>

                  <span
                    className={cn(
                      "font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform",
                      isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                    )}
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
    </div>
  );
}

export default BlogSection;
