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
          alternateName: "उज्जैन को पृथ्वी की प्राचीन ०° प्रधान मध्याह्न रेखा (Prime Meridian) क्यों माना जाता है?",
          inLanguage: "en",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Centuries before the 1884 Greenwich designation, classical Indian astronomers (including Varahamihira and the Surya Siddhanta) calibrated all planetary ephemerides from Ujjain (Avantika). Ujjain sits precisely where the Tropic of Cancer intersects the ancient baseline axis connecting Lanka on the equator to Mount Meru at the North Pole. At the summer solstice, the midday sun reaches a 90° zenith overhead, casting zero shadow from vertical gnomons.\n\n[हिन्दी व्याख्या]: ग्रीनविच (1884) से शताब्दियों पूर्व, वराहमिहिर और सूर्य सिद्धान्त के भारतीय खगोलविदों ने उज्जैन (अवंतिका) से सभी ग्रह गणनाएँ की थीं। उज्जैन कर्क रेखा और भूमध्य रेखा से सुमेरु पर्वत को जोड़ने वाली प्राचीन मध्याह्न रेखा के संपात बिंदु पर स्थित है।",
            inLanguage: ["en", "hi"],
          },
        },
        {
          "@type": "Question",
          name: "What are the 30 Muhurtas of a Vedic day-and-night cycle?",
          alternateName: "वैदिक अहोरात्र (दिन-रात) के ३० मुहूर्त क्या हैं?",
          inLanguage: "en",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In Vedic horology, a complete 24-hour day-and-night cycle (Ahoratra) comprises 30 Muhurtas (equal to 60 Ghatis). Unlike rigid 60-minute Western civil hours, daytime Muhurtas (Dinamana / 15) and nighttime Muhurtas (Ratrimana / 15) expand and contract gracefully with seasonal solstices, reflecting the living diurnal arc of the sun.\n\n[हिन्दी व्याख्या]: वैदिक काल-गणना में संपूर्ण २४ घंटे का अहोरात्र ३० मुहूर्तों (६० घटियों) में विभाजित होता है। दिन के १५ मुहूर्त और रात्रि के १५ मुहूर्त ऋतुओं के अनुसार घटते-बढ़ते हैं।",
            inLanguage: ["en", "hi"],
          },
        },
        {
          "@type": "Question",
          name: "What are the Five Limbs (Panchang) of Vedic Time?",
          alternateName: "वैदिक काल-गणना के पाँच अंग (पंचांग) क्या हैं?",
          inLanguage: "en",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Panchang coordinates time through five fundamental astronomical dimensions: 1. Tithi (12° longitudinal separation between Sun and Moon), 2. Vaar (the solar weekday ruled by planetary lords), 3. Nakshatra (the 13° 20' sidereal lunar mansion), 4. Yoga (the combined longitudinal sum of Sun and Moon), and 5. Karana (half of a lunar Tithi, 6° solar-lunar arc).\n\n[हिन्दी व्याख्या]: पंचांग समय को पाँच मूलभूत खगोलीय आयामों द्वारा समन्वित करता है: १. तिथि, २. वार, ३. नक्षत्र, ४. योग, और ५. करण।",
            inLanguage: ["en", "hi"],
          },
        },
        {
          "@type": "Question",
          name: "Why does Vedic time begin at Sunrise (Suryodaya) instead of Midnight?",
          alternateName: "वैदिक समय अर्धरात्रि के बजाय सूर्योदय से क्यों प्रारंभ होता है?",
          inLanguage: "en",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Civil midnight (12:00 AM) is an artificial abstraction set at the darkest hour of the night. Vedic time begins at Suryodaya (local astronomical sunrise), when the upper limb of the solar disc breaches the horizon. This aligns human metabolic rhythms, cortisol secretion, and circadian biology directly with solar dawn.\n\n[हिन्दी व्याख्या]: वैदिक समय का आरंभ स्थानीय सूर्योदय से होता है, जो मानव जैविक घड़ी (सर्कैडियन रिदम), उपापचय और चेतना को सीधे सौर भोर से जोड़ता है।",
            inLanguage: ["en", "hi"],
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Nirayana (Sidereal) and Sayana (Tropical) zodiacs?",
          alternateName: "निरयण (नाक्षत्र) और सायन (क्रांतिवृत्तीय) राशि चक्र में क्या अंतर है?",
          inLanguage: "en",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Nirayana (sidereal) zodiac used in Vedic astronomy measures planetary positions against the actual physical, observable fixed constellations (Nakshatras). The Western Sayana (tropical) zodiac measures time against the moving vernal equinox point, which drifts by approximately 1° every 72 years due to the precession of the Earth's axis (Ayanamsha), creating an approximate 24° offset today.\n\n[हिन्दी व्याख्या]: निरयण राशि चक्र ग्रहों की स्थिति को वास्तविक दृश्यमान स्थिर नक्षत्रों के आधार पर मापता है, जबकि सायन चक्र विषुव बिंदु के आधार पर मापता है।",
            inLanguage: ["en", "hi"],
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
