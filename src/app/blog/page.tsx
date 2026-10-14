import type { Metadata } from "next";
import { BlogView } from "@/components/views/BlogView";

export const metadata: Metadata = {
  title: "Chronicles of Celestial Horology · Research & Publications",
  description:
    "Scholarly publications and essays on ancient Indian astronomy, the prime meridian of Ujjain, Surya Siddhanta mathematical models, and the living circadian philosophy of Vedic time.",
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
    description:
      "Discover the ancient mathematical sciences, royal histories, and living circadian philosophy behind the world's premier Vedic timepieces.",
    url: "https://thevedicghadi.in/blog",
    type: "website",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Chronicles of Celestial Horology Publications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronicles of Celestial Horology | Research & Publications",
    description:
      "Essays and research on Ujjain's zero meridian, 30 Muhurtas, and ancient Indian astronomical science.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
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
