import type { Metadata } from "next";
import { HeritageView } from "@/components/views/HeritageView";

export const metadata: Metadata = {
  title: "0° Prime Meridian of Ujjain",
  description:
    "Explore ancient Indian astronomy. Why Ujjain was recognized as the 0° prime meridian millennia before Greenwich, and Varahamihira's legacy.",
  keywords: [
    "ujjain prime meridian",
    "jantar mantar ujjain",
    "jantar mantar vedic clock",
    "ujjain jantar mantar",
    "jantar mantar observatory",
    "samrat yantra ujjain",
    "vikram samvat",
    "calendar vikram samvat",
    "indian calendar",
    "ancient indian timekeeping",
    "vedic timekeeping system",
    "surya siddhanta",
    "varahamihira",
    "avanti 0 meridian",
    "ujjain vedh shala",
    "history of indian horology",
  ],
  alternates: {
    canonical: "/heritage",
    languages: {
      "en-IN": "https://thevedicghadi.in/heritage",
      "hi-IN": "https://thevedicghadi.in/heritage",
      "x-default": "https://thevedicghadi.in/heritage",
    },
  },
  openGraph: {
    title: "Sacred Meridian of Ujjain & Historical Heritage | Avanti 0°",
    siteName: "Vikramaditya Vedic Clock",
    description:
      "Why ancient Indian astronomers calibrated planetary ephemerides from Ujjain (Avanti), the original 0° prime meridian.",
    url: "https://thevedicghadi.in/heritage",
    type: "article",
    images: [
      {
        url: "https://thevedicghadi.in/api/og?title=Sacred%200%C2%B0%20Meridian%20of%20Ujjain&subtitle=Ancient%20Indian%20Astronomy%20Millennia%20Before%20Greenwich&category=Heritage&cta=DISCOVER%20HISTORY%20%E2%86%92",
        width: 1200,
        height: 630,
        alt: "Ujjain Prime Meridian and Historic Astronomical Vedh Shala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacred Meridian of Ujjain & Historical Heritage | Avanti 0°",
    description:
      "Discover the 0° prime meridian of Ujjain, Varahamihira's clepsydras, and the living science of Vedic timekeeping.",
    images: [
      "https://thevedicghadi.in/api/og?title=Sacred%200%C2%B0%20Meridian%20of%20Ujjain&subtitle=Ancient%20Indian%20Astronomy%20Millennia%20Before%20Greenwich&category=Heritage&cta=DISCOVER%20HISTORY%20%E2%86%92",
    ],
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
          alternateName: [
            "Jantar Mantar Ujjain",
            "जंतर मंतर उज्जैन",
            "Jiwaji Observatory",
            "Ujjain Vedh Shala"
          ],
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
