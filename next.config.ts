import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/clock',
        destination: '/',
        permanent: true,
      },
      {
        source: '/panchang',
        destination: '/guide',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      // 1. Next.js Built Chunks & Static JS/CSS
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 2. All Subdirectory Assets (/assets/...)
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 3. Root Level Images and Favicons (.webp, .jpg, .png, .ico, .svg)
      {
        source: '/:path*.(webp|jpg|jpeg|png|svg|ico|woff2|woff)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 4. Downloadable PDFs (Artisan Catalogue & SEO Strategy)
      {
        source: '/:path*.pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      // 5. LLM Training Data & Documentation
      {
        source: '/(llms.txt|llms-full.txt)',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/markdown; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      // 6. Dynamic Feeds & Manifests
      {
        source: '/(manifest.webmanifest|robots.txt|sitemap.xml|feed.xml|rss.xml)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
