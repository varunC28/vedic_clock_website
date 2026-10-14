"use client";

import React, { useState, useMemo } from "react";
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
  showCategories?: boolean;
  className?: string;
}

export function BlogSection({
  blogs = VEDIC_BLOG_ARTICLES,
  title = "Chronicles of Celestial Horology",
  titleHi = "वैदिक काल-ज्ञान एवं खगोलिकी",
  subtitle = "Discover the ancient mathematical sciences, royal histories, and living circadian philosophy behind the world's premier Vedic timepieces.",
  subtitleHi = "प्राचीन सिद्धान्तों, ऐतिहासिक धरोहर और खगोलीय गणनाओं पर आधारित शोध एवं लेख।",
  showCategories = true,
  className,
}: BlogSectionProps) {
  const { isParchment } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["All", ...Array.from(set)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat = selectedCategory === "All" || b.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.titleHi && b.titleHi.toLowerCase().includes(q)) ||
        b.description.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

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

        {/* ── Search & Category Filter Pills ── */}
        {showCategories && (
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-current/10">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer border",
                      isActive
                        ? isParchment
                          ? "bg-[#2D1B0E] text-[#FAF6F0] border-[#2D1B0E] shadow-sm font-semibold"
                          : "bg-gradient-to-r from-[#B8873D] to-[#D4A65A] text-[#03060E] border-[#D4A65A] font-bold shadow-sm"
                        : isParchment
                          ? "bg-[#FAF4EA] text-[#6E5540] border-[#DFCBB5] hover:border-[#B8873D]"
                          : "bg-[#091122] text-ivory/70 border-[#D4A65A]/25 hover:border-[#D4A65A]/50"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles / लेखक खोजें..."
                className={cn(
                  "w-full px-3.5 py-1.5 rounded-full text-xs font-sans border outline-none transition-all",
                  isParchment
                    ? "bg-[#FAF4EA] border-[#DFCBB5] text-[#2D1B0E] placeholder:text-[#6E5540]/60 focus:border-[#B8873D]"
                    : "bg-[#091122] border-[#D4A65A]/25 text-ivory placeholder:text-ivory/40 focus:border-[#D4A65A]"
                )}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="h-px w-full border-b border-dashed border-current/15 mb-8" />

      {/* ── Blog Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) ── */}
      {filteredBlogs.length === 0 ? (
        <div className="w-full py-16 text-center text-sm opacity-60">
          No articles found matching &quot;{searchQuery}&quot;. Please try another search term or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 z-10 text-left">
          {filteredBlogs.map((blog) => {
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
      )}
    </div>
  );
}

export default BlogSection;
