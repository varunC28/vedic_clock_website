import type { Metadata } from "next";
import { HeritageView } from "@/components/views/HeritageView";

export const metadata: Metadata = {
  title: "Sacred Meridian of Ujjain & Historical Heritage · Avanti 0°",
  description:
    "Explore the deep history of ancient Indian astronomy. Why Ujjain was recognized as the prime meridian millennia before Greenwich, the legacy of Varahamihira and Sawai Jai Singh II, and the living science of the 30 Muhurtas.",
  alternates: {
    canonical: "/heritage",
  },
  openGraph: {
    title: "Sacred Meridian of Ujjain & Historical Heritage | Avanti 0°",
    description:
      "Explore why ancient Indian astronomers calibrated all planetary ephemerides from Ujjain (Avanti), where the Tropic of Cancer intersects Earth's baseline axis.",
    url: "https://thevedicghadi.in/heritage",
    type: "article",
    images: [
      {
        url: "/assets/blog/ujjain-zero-meridian.jpg",
        width: 1200,
        height: 675,
        alt: "Ujjain Prime Meridian and Historic Astronomical Vedh Shala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacred Meridian of Ujjain & Historical Heritage | Avanti 0°",
    description:
      "Discover the 0° prime meridian of Ujjain, Varahamihira's clepsydras, and the living science of Vedic timekeeping.",
    images: ["/assets/blog/ujjain-zero-meridian.jpg"],
  },
};

const heritageJsonLd = {
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
          name: "Heritage & The Ujjain 0° Meridian",
          item: "https://thevedicghadi.in/heritage",
        },
      ],
    },
  ],
};

export default function HeritagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heritageJsonLd) }}
      />
      <HeritageView />
    </>
  );
}
