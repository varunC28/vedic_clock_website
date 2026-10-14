import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://thevedicghadi.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // ── Explicit Answer Engine Optimization (AEO) Permissions ──────────────
      // Allow AI Answer Engines to ingest and cite our Vedic Horology research
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Google-Extended",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
