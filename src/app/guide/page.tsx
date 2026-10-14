import type { Metadata } from "next";
import { GuideView } from "@/components/views/GuideView";

export const metadata: Metadata = {
  title: "Panchang & Muhurta Guide · Astronomy of Vedic Timekeeping",
  description:
    "A comprehensive master guide to Vedic timekeeping. Learn the five limbs of Panchang (Tithi, Vaar, Nakshatra, Yoga, Karana), the 30 Muhurtas, and sidereal zodiac astronomy.",
  alternates: {
    canonical: "/guide",
  },
  openGraph: {
    title: "The Panchang & Muhurta Guide | Astronomy of Vedic Timekeeping",
    description:
      "Master the astronomical foundations of Indian timekeeping: Tithi angles, Nakshatra constellations, Ghati/Pala mathematics, and the 12 sidereal Rashis.",
    url: "https://thevedicghadi.in/guide",
    type: "article",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Panchang Guide and Astronomical Vedic Horology Instruments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Panchang & Muhurta Guide | Astronomy of Vedic Timekeeping",
    description:
      "A complete guide to Tithi, Nakshatra, Yoga, Karana, and the 30 dynamic Muhurtas of day and night.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
  },
};

const guideJsonLd = {
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
          name: "Panchang & Muhurta Guide",
          item: "https://thevedicghadi.in/guide",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why is Ujjain considered the ancient 0° Prime Meridian of the Earth?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Centuries before the 1884 Greenwich designation, classical Indian astronomers (including Varahamihira and the Surya Siddhanta) calibrated all planetary ephemerides from Ujjain (Avantika). Ujjain sits precisely where the Tropic of Cancer intersects the ancient baseline axis connecting Lanka on the equator to Mount Meru at the North Pole. At the summer solstice, the midday sun reaches a 90° zenith overhead, casting zero shadow from vertical gnomons.",
          },
        },
        {
          "@type": "Question",
          name: "What are the 30 Muhurtas of a Vedic day-and-night cycle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In Vedic horology, a complete 24-hour day-and-night cycle (Ahoratra) comprises 30 Muhurtas (equal to 60 Ghatis). Unlike rigid 60-minute Western civil hours, daytime Muhurtas (Dinamana / 15) and nighttime Muhurtas (Ratrimana / 15) expand and contract gracefully with seasonal solstices, reflecting the living diurnal arc of the sun.",
          },
        },
        {
          "@type": "Question",
          name: "What are the Five Limbs (Panchang) of Vedic Time?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Panchang coordinates time through five fundamental astronomical dimensions: 1. Tithi (12° longitudinal separation between Sun and Moon), 2. Vaar (the solar weekday ruled by planetary lords), 3. Nakshatra (the 13° 20' sidereal lunar mansion), 4. Yoga (the combined longitudinal sum of Sun and Moon), and 5. Karana (half of a lunar Tithi, 6° solar-lunar arc).",
          },
        },
        {
          "@type": "Question",
          name: "Why does Vedic time begin at Sunrise (Suryodaya) instead of Midnight?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Civil midnight (12:00 AM) is an artificial abstraction set at the darkest hour of the night. Vedic time begins at Suryodaya (local astronomical sunrise), when the upper limb of the solar disc breaches the horizon. This aligns human metabolic rhythms, cortisol secretion, and circadian biology directly with solar dawn.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Nirayana (Sidereal) and Sayana (Tropical) zodiacs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Nirayana (sidereal) zodiac used in Vedic astronomy measures planetary positions against the actual physical, observable fixed constellations (Nakshatras). The Western Sayana (tropical) zodiac measures time against the moving vernal equinox point, which drifts by approximately 1° every 72 years due to the precession of the Earth's axis (Ayanamsha), creating an approximate 24° offset today.",
          },
        },
      ],
    },
  ],
};

export default function GuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />
      <GuideView />
    </>
  );
}
