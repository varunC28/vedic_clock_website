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
    {
      "@type": "Article",
      "@id": "https://thevedicghadi.in/heritage#article",
      headline: "Where Time Has a Horizon: The Zero Meridian of Ujjain",
      alternativeHeadline: "अवंतिका: खगोलीय शून्य रेखा और सृष्टि का स्वाभाविक समय",
      url: "https://thevedicghadi.in/heritage",
      description:
        "Long before civil conventions fixed the Prime Meridian at Greenwich in 1884, classical Indian astronomers recognized Ujjain as the navel of the earth where the Tropic of Cancer intersected Earth's baseline axis.",
      inLanguage: ["en-IN", "hi-IN"],
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".heritage-speakable-headline", ".heritage-speakable-lead"],
      },
      about: [
        {
          "@type": "Place",
          name: "Ujjain Prime Meridian",
          sameAs: [
            "https://en.wikipedia.org/wiki/Ujjain",
            "https://www.wikidata.org/wiki/Q200237",
          ],
        },
        {
          "@type": "Person",
          name: "Varāhamihira",
          sameAs: [
            "https://en.wikipedia.org/wiki/Var%C4%81hamihira",
            "https://www.wikidata.org/wiki/Q318451",
          ],
        },
        {
          "@type": "Place",
          name: "Vedh Shala (Ujjain Astronomical Observatory)",
          sameAs: [
            "https://en.wikipedia.org/wiki/Vedh_Shala",
            "https://www.wikidata.org/wiki/Q7917997",
          ],
        },
        {
          "@type": "Thing",
          name: "Surya Siddhanta",
          sameAs: [
            "https://en.wikipedia.org/wiki/Surya_Siddhanta",
            "https://www.wikidata.org/wiki/Q1089082",
          ],
        },
        {
          "@type": "Thing",
          name: "Tropic of Cancer",
          sameAs: [
            "https://en.wikipedia.org/wiki/Tropic_of_Cancer",
            "https://www.wikidata.org/wiki/Q176635",
          ],
        },
      ],
      author: {
        "@type": "Organization",
        name: "Vikramaditya Research & Horological Guild",
        url: "https://thevedicghadi.in",
      },
      publisher: {
        "@type": "Organization",
        name: "Vikramaditya Vedic Clock",
        url: "https://thevedicghadi.in",
        logo: {
          "@type": "ImageObject",
          url: "https://thevedicghadi.in/assets/icon.png",
        },
      },
      image: "https://thevedicghadi.in/assets/blog/ujjain-zero-meridian.jpg",
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
