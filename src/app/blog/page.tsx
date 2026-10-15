import type { Metadata } from "next";
import { BlogView } from "@/components/views/BlogView";

export const metadata: Metadata = {
  title: "Chronicles of Vedic Time",
  description:
    "Scholarly publications and essays on ancient Indian astronomy, Ujjain prime meridian, Surya Siddhanta calculations, and circadian Vedic time.",
  alternates: {
    canonical: "/blog",
    languages: {
      "en-IN": "https://thevedicghadi.in/blog",
      "hi-IN": "https://thevedicghadi.in/blog",
      "x-default": "https://thevedicghadi.in/blog",
    },
  },
  openGraph: {
    title: "Chronicles of Celestial Horology | Research & Publications",
    siteName: "Vikramaditya Vedic Clock",
    description:
      "Explore ancient mathematical sciences, royal observatories, and circadian philosophy behind Vedic horology.",
    url: "https://thevedicghadi.in/blog",
    type: "website",
    images: [
      {
        url: "https://thevedicghadi.in/api/og?title=Chronicles%20of%20Celestial%20Horology&subtitle=Scholarly%20Essays%20on%20Ancient%20Indian%20Astronomical%20Sciences&category=Research%20Journal&cta=READ%20ARTICLES%20%E2%86%92",
        width: 1200,
        height: 630,
        alt: "Chronicles of Celestial Horology Publications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronicles of Celestial Horology | Research & Publications",
    description:
      "Essays and research on Ujjain's zero meridian, 30 Muhurtas, and ancient Indian astronomical science.",
    images: [
      "https://thevedicghadi.in/api/og?title=Chronicles%20of%20Celestial%20Horology&subtitle=Scholarly%20Essays%20on%20Ancient%20Indian%20Astronomical%20Sciences&category=Research%20Journal&cta=READ%20ARTICLES%20%E2%86%92",
    ],
  },
};

const blogIndexJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://thevedicghadi.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Publications & Research",
          item: "https://thevedicghadi.in/blog",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "Chronicles of Celestial Horology",
      description:
        "Scholarly publications and essays on ancient Indian astronomy, the prime meridian of Ujjain, Surya Siddhanta mathematical models, and the living circadian philosophy of Vedic time.",
      url: "https://thevedicghadi.in/blog",
      publisher: {
        "@type": "Organization",
        name: "Vikramaditya Vedic Clock",
        url: "https://thevedicghadi.in",
      },
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />
      <BlogView />
    </>
  );
}
