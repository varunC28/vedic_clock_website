import type { Metadata } from "next";
import { FaqView } from "@/components/views/FaqView";
import { MASTER_FAQ_ITEMS } from "@/data/faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions · Horological & Astronomical Knowledge Base",
  description:
    "Authoritative answers on the Vikramaditya Vedic Clock, ancient 0° Ujjain Prime Meridian, offline horological engineering, global location calibration, and institutional commissions.",
  alternates: {
    canonical: "/faq",
    languages: {
      "en-IN": "https://thevedicghadi.in/faq",
      "hi-IN": "https://thevedicghadi.in/faq",
      "x-default": "https://thevedicghadi.in/faq",
    },
  },
  openGraph: {
    title: "Frequently Asked Questions | Master Horological Knowledge Base",
    description:
      "Comprehensive Q&A on Vedic timekeeping science, 30 Muhurtas, bell brass acoustic casework, offline microcontroller engineering, and temple acquisitions.",
    url: "https://thevedicghadi.in/faq",
    type: "website",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Vikramaditya Vedic Clock Frequently Asked Questions and Knowledge Base",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Master Horological Knowledge Base",
    description:
      "Authoritative answers on Vedic astronomy, Ujjain 0° meridian, clock engineering, and bespoke commissions.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
  },
};

const faqJsonLd = {
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
          name: "Frequently Asked Questions",
          item: "https://thevedicghadi.in/faq",
        },
      ],
    },
    {
      "@type": "FAQPage",
      name: "Vikramaditya Vedic Clock Master Knowledge Base & FAQ",
      url: "https://thevedicghadi.in/faq",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".faq-speakable-question", ".faq-speakable-answer"],
      },
      mainEntity: MASTER_FAQ_ITEMS.flatMap((item) => [
        {
          "@type": "Question",
          name: item.questionEn,
          alternateName: item.questionHi,
          inLanguage: "en",
          acceptedAnswer: {
            "@type": "Answer",
            text: `${item.answerEn}\n\n[हिन्दी व्याख्या / Hindi Explanation]: ${item.answerHi}`,
            inLanguage: ["en", "hi"],
          },
        },
        {
          "@type": "Question",
          name: item.questionHi,
          alternateName: item.questionEn,
          inLanguage: "hi",
          acceptedAnswer: {
            "@type": "Answer",
            text: `${item.answerHi}\n\n[English Translation]: ${item.answerEn}`,
            inLanguage: ["hi", "en"],
          },
        },
      ]),
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqView />
    </>
  );
}
