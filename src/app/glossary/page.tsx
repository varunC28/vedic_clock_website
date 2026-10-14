import { Metadata } from "next";
import { GlossaryView } from "@/components/views/GlossaryView";
import { VEDIC_GLOSSARY_TERMS } from "@/data/vedic-glossary";

export const metadata: Metadata = {
  title: "Vedic Horology Lexicon & Glossary | वैदिक कालगणना शब्दकोश",
  description:
    "Explore 42 terms of ancient Indian timekeeping: Ghati, Pala, Muhurta, Dinamana, Ayanamsha, and Panchang with formulas and classical citations.",
  alternates: {
    canonical: "/glossary",
    languages: {
      "en-IN": "https://thevedicghadi.in/glossary",
      "hi-IN": "https://thevedicghadi.in/glossary",
      "x-default": "https://thevedicghadi.in/glossary",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Vikramaditya Vedic Clock",
    title: "Vedic Horology Lexicon & Glossary | 42 Canonical Dimensions of Time",
    description:
      "Mathematical definitions and classical Sanskrit citations for Ghati, Muhurta, Tithi, Ayanamsha, and temporal science.",
    url: "https://thevedicghadi.in/glossary",
    images: [
      {
        url: "https://thevedicghadi.in/api/og?title=Vedic%20Horology%20Lexicon&subtitle=42%20Canonical%20Dimensions%20of%20Time%20%E2%80%A2%20Sanskrit%20Terminology&category=Kala-Vidya%20Lexicon&cta=EXPLORE%20LEXICON%20%E2%86%92",
        width: 1200,
        height: 630,
        alt: "Vedic Horology Lexicon and Glossary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Horology Lexicon & Glossary | 42 Canonical Dimensions of Time",
    description:
      "Mathematical definitions and classical Sanskrit citations for Ghati, Muhurta, Tithi, Ayanamsha, and Indian temporal science.",
    images: [
      "https://thevedicghadi.in/api/og?title=Vedic%20Horology%20Lexicon&subtitle=42%20Canonical%20Dimensions%20of%20Time%20%E2%80%A2%20Sanskrit%20Terminology&category=Kala-Vidya%20Lexicon&cta=EXPLORE%20LEXICON%20%E2%86%92",
    ],
  },
  keywords: [
    "Vedic Horology Glossary",
    "Ghati definition",
    "What is a Muhurta",
    "Truti Tatpara Nimesha",
    "Dinamana Ratrimana",
    "Panchang Five Limbs",
    "Ayanamsha definition",
    "Surya Siddhanta time units",
    "Vedic Clock dictionary",
    "Hindu units of time",
  ],
};

export default function GlossaryPage() {
  const jsonLd = {
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
            name: "Knowledge Hub",
            item: "https://thevedicghadi.in/guide",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Horology Lexicon",
            item: "https://thevedicghadi.in/glossary",
          },
        ],
      },
      {
        "@type": "DefinedTermSet",
        "@id": "https://thevedicghadi.in/glossary#termset",
        name: "Vedic Horology and Temporal Lexicon",
        description:
          "Canonical definitions, mathematical formulas, and Sanskrit treatise citations for 42 dimensions of ancient Indian timekeeping.",
        inLanguage: ["en", "sa", "hi"],
        publisher: {
          "@type": "Organization",
          name: "Vikramaditya Vedic Clock Initiative",
          url: "https://thevedicghadi.in",
        },
        hasDefinedTerm: VEDIC_GLOSSARY_TERMS.map((term) => ({
          "@type": "DefinedTerm",
          "@id": `https://thevedicghadi.in/glossary#${term.slug}`,
          name: `${term.termEn} (${term.termHi})`,
          termCode: term.slug,
          description: `${term.definition} ${term.formula ? `[Formula: ${term.formula}]` : ""} [Classical Source: ${term.classicalCitation || "Surya Siddhanta"}]`,
          inDefinedTermSet: "https://thevedicghadi.in/glossary#termset",
          ...(term.wikipediaUrl ? { sameAs: term.wikipediaUrl } : {}),
        })),
      },
      {
        "@type": "WebPage",
        "@id": "https://thevedicghadi.in/glossary",
        url: "https://thevedicghadi.in/glossary",
        name: "Vedic Horology Lexicon & Glossary",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".glossary-speakable-term", ".glossary-speakable-def"],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlossaryView />
    </>
  );
}
