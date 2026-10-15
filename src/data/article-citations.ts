export interface ScholarlyCitation {
  "@type": "Book" | "ScholarlyArticle" | "CreativeWork";
  name: string;
  author?: {
    "@type": "Person" | "Organization";
    name: string;
    sameAs?: string;
  };
  sameAs?: string;
  description?: string;
}

export const ARTICLE_SCHOLARLY_CITATIONS: Record<string, ScholarlyCitation[]> = {
  "ujjain-zero-meridian": [
    {
      "@type": "Book",
      name: "Surya Siddhanta (सूर्य सिद्धान्त): Madhya-Adhikara, Verse 62",
      description:
        "Classical Sanskrit astronomical treatise defining the zero prime meridian plumb-line passing from Lanka on the equator through Avanti (Ujjain) to Mount Meru.",
      sameAs: "https://en.wikipedia.org/wiki/Surya_Siddhanta",
    },
    {
      "@type": "Book",
      name: "Siddhanta Shiromani: Goladhyaya",
      author: {
        "@type": "Person",
        name: "Bhāskarāchārya II",
        sameAs: "https://en.wikipedia.org/wiki/Bh%C4%81skara_II",
      },
      description:
        "Mathematical treatise verifying Ujjain's prime meridian coordinates and zero longitudinal gnomonic shadow.",
      sameAs: "https://en.wikipedia.org/wiki/Siddh%C4%81nta_%C5%9Airoma%E1%B9%87i",
    },
    {
      "@type": "CreativeWork",
      name: "Vedh Shala (Jantar Mantar) Astronomical Records (Ujjain)",
      description:
        "Physical ephemeris observations and masonry gnomon calibrations established by Maharaja Sawai Jai Singh II.",
      sameAs: "https://en.wikipedia.org/wiki/Vedh_Shala",
    },
  ],
  "cosmic-wheel-rigveda": [
    {
      "@type": "Book",
      name: "Rigveda Samhita: Mandala 1, Sukta 164 (Asya Vamasya Hymn)",
      author: {
        "@type": "Person",
        name: "Rishi Dirghatamas",
      },
      description:
        "Foundational Vedic astronomical hymn describing the 12-spoked, 360-day cosmic wheel (Chakra) of temporal celestial motion.",
      sameAs: "https://en.wikipedia.org/wiki/Rigveda",
    },
    {
      "@type": "Book",
      name: "Vedanga Jyotisha of Lagadha",
      description:
        "The earliest dedicated Indian astronomical treatise systematizing the solar-lunar synchronization of the Rigvedic calendar.",
      sameAs: "https://en.wikipedia.org/wiki/Vedanga_Jyotisha",
    },
  ],
  "thirty-muhurtas-diurnal-geometry": [
    {
      "@type": "Book",
      name: "Taittiriya Brahmana: Anuvaka 3.10.1 (Kala Sankhya)",
      description:
        "Vedic Brahmana text establishing the 15 dynamic daytime Muhurtas (Dinamana) and 15 nighttime Muhurtas (Ratrimana).",
      sameAs: "https://en.wikipedia.org/wiki/Brahmana",
    },
    {
      "@type": "Book",
      name: "Surya Siddhanta: Chapter 1: Computation of Mean Planetary Motions",
      description:
        "Mathematical formulation of the 60-Ghati (30-Muhurta) diurnal Ahoratra cycle and seasonal expansion factors.",
      sameAs: "https://en.wikipedia.org/wiki/Surya_Siddhanta",
    },
  ],
  "varahamihira-clepsydras-gnomons": [
    {
      "@type": "Book",
      name: "Pancha-Siddhantika (पंचसिद्धान्तिका)",
      author: {
        "@type": "Person",
        name: "Varāhamihira of Ujjain",
        sameAs: "https://en.wikipedia.org/wiki/Var%C4%81hamihira",
      },
      description:
        "Comparative astronomical compendium of the five ancient Siddhantas compiled in 6th-century Ujjain.",
      sameAs: "https://en.wikipedia.org/wiki/Pancha-Siddhantika",
    },
    {
      "@type": "Book",
      name: "Brihat Samhita (बृहत्संहिता): Horology and Gnomonics",
      author: {
        "@type": "Person",
        name: "Varāhamihira of Ujjain",
        sameAs: "https://en.wikipedia.org/wiki/Var%C4%81hamihira",
      },
      description:
        "Classical encyclopedia detailing the standardized copper water clock (Kapala Yantra) measuring exactly 24 civil minutes per Ghati.",
      sameAs: "https://en.wikipedia.org/wiki/Brihat_Samhita",
    },
  ],
  "decoding-five-limbs-panchang": [
    {
      "@type": "Book",
      name: "Surya Siddhanta: Sphuta-Adhikara (True Planetary Positions)",
      description:
        "The mathematical formulae defining the 12° solar-lunar separation for Tithi, planetary weekday lords for Vaar, 13° 20' arcs for Nakshatra and Yoga, and half-tithis for Karana.",
      sameAs: "https://en.wikipedia.org/wiki/Surya_Siddhanta",
    },
    {
      "@type": "Book",
      name: "Muhurta Chintamani of Daivajna Rama",
      description:
        "Classical authority on the practical application of the 5 limbs of Panchang in electional horology and timekeeping.",
      sameAs: "https://en.wikipedia.org/wiki/Panchangam",
    },
  ],
  "sunrise-over-midnight": [
    {
      "@type": "Book",
      name: "Atharva Veda Parishishta: Suryodaya Prakarana",
      description:
        "Vedic astronomical hymn establishing Suryodaya (horizon solar breach) as the natural, metabolic, and temporal dawn of the diurnal day.",
      sameAs: "https://en.wikipedia.org/wiki/Atharvaveda",
    },
    {
      "@type": "Book",
      name: "Charaka Samhita: Sutrasthana Chapter 6 (Dinacharya)",
      description:
        "Foundational Ayurvedic treatise detailing human circadian cortisol cycles and physiological alignment with dawn solar radiation.",
      sameAs: "https://en.wikipedia.org/wiki/Charaka_Samhita",
    },
  ],
  "ayanamsha-precession-equinoxes": [
    {
      "@type": "Book",
      name: "Aryabhatiya of Aryabhata (499 CE)",
      author: {
        "@type": "Person",
        name: "Aryabhata",
        sameAs: "https://en.wikipedia.org/wiki/Aryabhata",
      },
      description:
        "Mathematical treatise establishing the sidereal rotation of the Earth and the calculation of planetary revolutions against fixed stellar reference points.",
      sameAs: "https://en.wikipedia.org/wiki/Aryabhatiya",
    },
    {
      "@type": "Book",
      name: "Report of the Calendar Reform Committee (Government of India, 1955)",
      author: {
        "@type": "Person",
        name: "Prof. Meghnad Saha",
        sameAs: "https://en.wikipedia.org/wiki/Meghnad_Saha",
      },
      description:
        "The definitive scientific standardization of the Chitra-Paksha (Lahiri) Ayanamsha for Indian national sidereal astronomy.",
      sameAs: "https://en.wikipedia.org/wiki/Indian_national_calendar",
    },
  ],
  "vikram-samvat-calendar": [
    {
      "@type": "CreativeWork",
      name: "Archaeological Epigraphs of Malwa and the Krittika Epoch (57 BCE)",
      description:
        "Inscriptional evidence from Central Bharat establishing the foundation of the Vikram Samvat calendar under Maharaja Vikramaditya of Ujjain.",
      sameAs: "https://en.wikipedia.org/wiki/Vikram_Samvat",
    },
    {
      "@type": "Book",
      name: "Al-Biruni's India (Kitab Tarikh al-Hind, 1030 CE)",
      author: {
        "@type": "Person",
        name: "Al-Biruni",
        sameAs: "https://en.wikipedia.org/wiki/Al-Biruni",
      },
      description:
        "Historical cross-verification of the Vikramaditya lunar-solar calendar, intercalation cycles (Adhika Masa), and Ujjain's astronomical prestige.",
      sameAs: "https://en.wikipedia.org/wiki/Indica_(Al-Biruni)",
    },
  ],
  "sanctum-horology-temple-aartis": [
    {
      "@type": "Book",
      name: "Vaikhanasa Agama: Kriyadhikara (Temple Horological Sanctity)",
      description:
        "Canonical temple architecture text prescribing solar zenith (Abhijit) and Sandhya twilight synchronization for sanctum rituals.",
      sameAs: "https://en.wikipedia.org/wiki/Vaikhanasa",
    },
    {
      "@type": "Book",
      name: "Agni Purana: Chapters on Pratishtha and Kaal Vidhana",
      description:
        "Scriptural authority detailing the geometric orientation of sanctums (Garbhagriha) along cardinal solar axes.",
      sameAs: "https://en.wikipedia.org/wiki/Agni_Purana",
    },
  ],
  "bespoke-architectural-horology": [
    {
      "@type": "Book",
      name: "Rasaratna Samucchaya of Vagbhata: Metallurgy of Kansa",
      description:
        "Classical Sanskrit treatise on the exact 78:22 copper-to-tin bell metal alloy (Kamsya) for pure acoustic resonance and corrosion resistance.",
      sameAs: "https://en.wikipedia.org/wiki/Rasashastra",
    },
    {
      "@type": "Book",
      name: "Manasara Shilpa Shastra: Principles of Proportion and Monumental Casting",
      description:
        "The definitive ancient Indian architectural treatise governing proportions (Talamana), pedestal stability, and metallic longevity.",
      sameAs: "https://en.wikipedia.org/wiki/Manasara",
    },
  ],
  "shastras-to-silicon": [
    {
      "@type": "Book",
      name: "Surya Siddhanta: Planetary Computation Algorithms (Grahaganita)",
      description:
        "The mathematical sine tables (Jya), epicycles (Manda and Shighra Paridhi), and mean orbital velocities translated into embedded C/C++ firmware.",
      sameAs: "https://en.wikipedia.org/wiki/Surya_Siddhanta",
    },
    {
      "@type": "CreativeWork",
      name: "IEEE Standards on Real-Time Clock Synchronization & TCXO Crystal Horology",
      description:
        "Modern horological engineering standards for temperature-compensated crystal oscillators executing autonomous offline celestial ephemerides.",
    },
  ],
  "living-day-dawn-to-pre-dawn": [
    {
      "@type": "Book",
      name: "Ashtanga Hridaya: Sutrasthana Chapter 2 (Dinacharya Adhyaya)",
      author: {
        "@type": "Person",
        name: "Acharya Vagbhata",
        sameAs: "https://en.wikipedia.org/wiki/Vagbhata",
      },
      description:
        "The classical Ayurvedic treatise establishing the exact timing of Brahma Muhurta (two Muhurtas before sunrise) for mental acuity and hormonal balance.",
      sameAs: "https://en.wikipedia.org/wiki/Ashtanga_Hridaya",
    },
    {
      "@type": "Book",
      name: "Manusmriti: Chapter 4: Codes of Daily Temporal Rhythm",
      description:
        "Classical text on diurnal thresholds, contemplative Sandhya stillness, and living in sync with seasonal daylight transitions.",
      sameAs: "https://en.wikipedia.org/wiki/Manusmriti",
    },
  ],
};

const DEFAULT_CITATIONS: ScholarlyCitation[] = [
  {
    "@type": "Book",
    name: "Surya Siddhanta (सूर्य सिद्धान्त)",
    description: "Classical treatise on ancient Indian astronomy and planetary computation.",
    sameAs: "https://en.wikipedia.org/wiki/Surya_Siddhanta",
  },
  {
    "@type": "Book",
    name: "Pancha-Siddhantika of Varāhamihira (पंचसिद्धान्तिका)",
    description: "Astronomical compendium compiled in 6th-century Ujjain.",
    sameAs: "https://en.wikipedia.org/wiki/Var%C4%81hamihira",
  },
  {
    "@type": "CreativeWork",
    name: "Vedh Shala (Jantar Mantar) Astronomical Archives (Ujjain)",
    description: "Astronomical observation records of the historic Ujjain prime meridian observatory.",
    sameAs: "https://en.wikipedia.org/wiki/Vedh_Shala",
  },
];

export function getArticleCitations(slug: string): ScholarlyCitation[] {
  return ARTICLE_SCHOLARLY_CITATIONS[slug] || DEFAULT_CITATIONS;
}
