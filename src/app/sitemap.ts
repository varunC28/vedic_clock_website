import { MetadataRoute } from "next";
import { VEDIC_BLOG_ARTICLES } from "@/data/blog-articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thevedicghadi.in";
  const now = new Date();

  // ── Primary Landing & Core Route Index ────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/assets/blog/shastras-to-silicon.jpg`,
        `${baseUrl}/assets/blog/ujjain-zero-meridian.jpg`,
      ],
    },
    {
      url: `${baseUrl}/heritage`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [
        `${baseUrl}/assets/blog/ujjain-zero-meridian.jpg`,
      ],
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [
        `${baseUrl}/assets/rashi/aries.webp`,
        `${baseUrl}/assets/rashi/taurus.webp`,
        `${baseUrl}/assets/rashi/gemini.webp`,
        `${baseUrl}/assets/rashi/cancer.webp`,
        `${baseUrl}/assets/rashi/leo.webp`,
        `${baseUrl}/assets/rashi/virgo.webp`,
        `${baseUrl}/assets/rashi/libra.webp`,
        `${baseUrl}/assets/rashi/scorpio.webp`,
      ],
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${baseUrl}/assets/blog/shastras-to-silicon.jpg`,
      ],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
      images: [
        `${baseUrl}/assets/blog/shastras-to-silicon.jpg`,
        `${baseUrl}/assets/blog/ujjain-zero-meridian.jpg`,
      ],
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [
        `${baseUrl}/assets/blog/shastras-to-silicon.jpg`,
      ],
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Dynamic Research & Editorial Blog Articles (12 Seed Publications) ──────
  const blogRoutes: MetadataRoute.Sitemap = VEDIC_BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
    images: article.image
      ? [`${baseUrl}${article.image}`]
      : [`${baseUrl}/assets/blog/shastras-to-silicon.jpg`],
  }));

  return [...staticRoutes, ...blogRoutes];
}
