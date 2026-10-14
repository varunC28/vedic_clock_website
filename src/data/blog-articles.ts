export interface BlogArticle {
  title: string;
  titleHi?: string;
  slug: string;
  description: string;
  descriptionHi?: string;
  image: string;
  createdAt: string;
  author: string;
  authorRole?: string;
  readTime: string;
  category: "Sacred Horology" | "Astronomy & Math" | "Historical Heritage" | "Panchang Science" | "Philosophy of Time";
  categoryHi?: string;
  featured?: boolean;
  content: {
    heading?: string;
    headingHi?: string;
    text: string;
    shloka?: string;
    shlokaTranslation?: string;
  }[];
}

export const VEDIC_BLOG_ARTICLES: BlogArticle[] = [
  {
    title: "The 0° Prime Meridian of Ujjain: Why Ancient India Reckoned Earth's Center at Avanti",
    titleHi: "अवंतिका की शून्य रेखा: उज्जयिनी क्यों थी पृथ्वी की स्वाभाविक प्रधान मध्याह्न रेखा",
    slug: "ujjain-zero-meridian",
    description: "Centuries before Greenwich was designated in 1884, classical astronomers calibrated all planetary ephemerides from the intersection of the Tropic of Cancer and Ujjain's meridian.",
    descriptionHi: "ग्रीनविच से शताब्दियों पूर्व, वराहमिहिर और भास्कराचार्य ने कर्क रेखा और शून्य देशांतर के संगम पर स्थित उज्जयिनी को समय-गणना का वैश्विक केंद्र माना था।",
    image: "https://cdn.21st.dev/assets/mirror/f2/f2b2a055966c6c1681569e43db628e02b5f32ce532c436bd05b2889a78914819.jpg",
    createdAt: "2026-03-15",
    author: "Dr. Kalyan Sundaram",
    authorRole: "Historian of Ancient Indian Astronomy",
    readTime: "8 min read",
    category: "Sacred Horology",
    categoryHi: "वैदिक कालगणना",
    featured: true,
    content: [
      {
        heading: "The Natural Geographic Anchor of Antiquity",
        headingHi: "भूगोल और खगोल का प्राकृतिक संगम",
        text: "Long before maritime empires voted at the 1884 International Meridian Conference to fix the prime meridian at Greenwich, classical Indian horology recognized a cosmic principle: zero longitude should not be an arbitrary imperial line. It must intersect natural celestial geometry.",
        shloka: "राक्षसालये देवतानां च मध्ये यत् समसूत्रम्। तदवन्तीमुपरि गतं रेखादेश इति स्मृतः॥",
        shlokaTranslation: "That true plumb line which passes midway between the realm of Lanka and the celestial summit, traversing straight above Avanti (Ujjain), is proclaimed the baseline meridian of the earth. — Surya Siddhanta",
      },
      {
        heading: "Intersection with the Tropic of Cancer",
        headingHi: "कर्क रेखा का खगोलीय संपात",
        text: "Ujjain sits at approximately 23.18° North latitude — precisely where the Tropic of Cancer traverses Central India. On the summer solstice, the midday sun reaches its absolute zenith (90° overhead), casting zero shadow from vertical gnomons. No other ancient capital combined this solstice alignment with direct transit geometry across the subcontinent.",
      },
      {
        heading: "From Varahamihira to Jai Singh II",
        headingHi: "वराहमिहिर से सवाई जयसिंह तक की परंपरा",
        text: "In the 6th century, royal astronomer Varahamihira composed the Pancha-Siddhantika in Ujjain. A millennium later, Maharaja Sawai Jai Singh II erected the grand stone observatory (Vedh Shala) in Ujjain to recalibrate planetary tables against centuries of precessional drift.",
      },
    ],
  },
  {
    title: "From Ancient Shastras to Modern Silicon: Building the Vikramaditya Clock",
    titleHi: "प्राचीन सूत्रों से आधुनिक सिलिकॉन तक: विक्रमादित्य वेदिक घड़ी का निर्माण",
    slug: "shastras-to-silicon",
    description: "How five thousand years of Sanskrit astronomical geometry was transformed into living digital horology and micro-stepper mechanical dials.",
    descriptionHi: "सूर्य सिद्धान्त के सूक्ष्म गणितीय सूत्रों को आधुनिक माइक्रो-प्रोसेसर और स्टेपर मोटर तकनीक से जीवंत करने की अभूतपूर्व यात्रा।",
    image: "https://cdn.21st.dev/assets/mirror/1c/1c9069d4c0e2ec6e906649d4872849733f11e1d5bc9acc77afa11d51300e042f.jpg",
    createdAt: "2026-02-28",
    author: "Vikramaditya Research Group",
    authorRole: "Horological Engineering Faculty",
    readTime: "7 min read",
    category: "Astronomy & Math",
    categoryHi: "गणित एवं तकनीक",
    featured: true,
    content: [
      {
        heading: "The Challenge of Dynamic Time Units",
        headingHi: "परिवर्तनशील समय इकाइयों की चुनौती",
        text: "Western horology is built on mechanical invariance: every second is mathematically identical. Vedic horology, by contrast, is living and breathing. Because a daytime Muhurta equals Dinamana / 15, the duration of each unit expands during northern solstices and contracts in winter.",
      },
      {
        heading: "Synthesizing Planetary Ephemerides with Steppers",
        headingHi: "उपग्रह पंचांग और स्टेपर मोटर्स का समन्वय",
        text: "The physical dials of the Vikramaditya Vedic Clock execute non-linear gear movements governed by real-time satellite solar elevation tables, presenting the 30 Muhurtas, Nakshatras, and Tithis with absolute astronomical authenticity.",
      },
    ],
  },
  {
    title: "Sunrise Over Midnight: The Chronobiological Genius of Suryodaya",
    titleHi: "सूर्योदय बनाम मध्यरात्रि: सृजन-आधारित वैदिक समय का वैज्ञानिक आधार",
    slug: "sunrise-over-midnight",
    description: "Civil midnight is an artificial abstraction set in total darkness. Vedic time begins at Suryodaya — synchronizing human biology with the solar arc.",
    descriptionHi: "12:00 AM का कृत्रिम विभाजन रात्रि के गहनतम अंधकार में होता है, जबकि वैदिक दिन प्रथम सूर्य किरण के साथ जागता है।",
    image: "https://cdn.21st.dev/assets/mirror/02/02f7ddc201e97fad2664c317fa4182a86cd41174d0618f09d41b712cafd243be.jpg",
    createdAt: "2026-02-14",
    author: "Acharya Vidyadhar",
    authorRole: "Vedic Scholar & Chronobiologist",
    readTime: "6 min read",
    category: "Philosophy of Time",
    categoryHi: "काल दर्शन",
    content: [
      {
        heading: "Circadian Rhythm and Solar Breaches",
        headingHi: "जैविक घड़ी और सौर उदय",
        text: "When the upper limb of the solar disc breaches the local horizon, atmospheric ionization shifts, cortisol production initiates, and metabolic awakenings begin. Starting the calendar date at 00:00 sunrise anchors human consciousness directly to nature.",
        shloka: "उद्यन्नुद्यन्त्सूर्यः प्राणान् प्रेरयति सर्वशः। तस्मादुद्यन्तमेवैनं नमस्कुर्वन्ति साधवः॥",
        shlokaTranslation: "As the sun ascends, it awakens the vital prana throughout all living beings. Therefore, the wise greet time at the horizon. — Atharvaveda",
      },
    ],
  },
  {
    title: "The 30 Muhurtas: Decoding the Living Expansion of Day and Night",
    titleHi: "३० मुहूर्त: अहोरात्र चक्र और गतिशील समय विभाजन",
    slug: "thirty-muhurtas-diurnal-geometry",
    description: "A complete day-and-night cycle comprises 30 Muhurtas. Discover how ancient astronomers mapped subtle psychological undertones to each 48-minute span.",
    descriptionHi: "एक अहोरात्र में 30 मुहूर्त और 60 घटी होती हैं। जानिए कैसे प्रत्येक मुहूर्त की विशिष्ट ऊर्जा मानव चेतना को प्रभावित करती है।",
    image: "https://cdn.21st.dev/assets/mirror/ba/ba0e6341e9bf5eefa9dd354dce1cdc4a0ca745a5b6f338b0271000f1b7fc3248.jpg",
    createdAt: "2026-01-20",
    author: "Pt. Rajeshwar Shastri",
    authorRole: "Jyotisha Researcher",
    readTime: "9 min read",
    category: "Sacred Horology",
    categoryHi: "वैदिक कालगणना",
    content: [
      {
        heading: "Dinamana vs Ratrimana",
        headingHi: "दिनमान और रात्रिमान का अनुपात",
        text: "The 15 daytime Muhurtas begin at dawn with Rudra and culminate at sunset with Rakshasa. The 15 nocturnal Muhurtas begin at dusk, traversing through Nisheetha (midnight) and crowning in Brahma Muhurta before dawn.",
      },
    ],
  },
  {
    title: "Varahamihira's Clepsydras: Standardizing the 24-Minute Ghati",
    titleHi: "वराहमिहिर का घटी-यंत्र: प्राचीन जल घड़ी और शंकु विज्ञान",
    slug: "varahamihira-clepsydras-gnomons",
    description: "In 6th-century Ujjain, Varahamihira calibrated copper water bowls with microscopic apertures, creating timepieces accurate to fractions of a second.",
    descriptionHi: "ताम्र पात्र में सूक्ष्म छिद्र द्वारा जल के प्रवाह से २४ मिनट की घटी नापने वाले प्राचीन भारतीय जल-यंत्र का वैज्ञानिक विश्लेषण।",
    image: "https://cdn.21st.dev/assets/mirror/c1/c12cf6dc6daca5173fd0bfc4b1562743c92e8f1fb17efa224098180d940ba880.jpg",
    createdAt: "2025-12-18",
    author: "Prof. Meera Deshpande",
    authorRole: "Archeoastronomy Department",
    readTime: "8 min read",
    category: "Historical Heritage",
    categoryHi: "ऐतिहासिक धरोहर",
    content: [
      {
        heading: "The Physics of the Ghati Yantra",
        headingHi: "घटी यंत्र की जल-यांत्रिकी",
        text: "The Ghati-Yantra was a hemisphere of copper weighing exactly 10 Palas, floating in clean water with a golden needle piercing the base. When sixty Palas of time elapsed (exactly 24 modern civil minutes), the bowl filled and sank with an audible chime.",
      },
    ],
  },
  {
    title: "Decoding the Five Limbs of Panchang: A Practical Modern Guide",
    titleHi: "पंचांग के पाँच अंग: आधुनिक जीवन में इनका व्यावहारिक महत्व",
    slug: "decoding-five-limbs-panchang",
    description: "Tithi, Vaar, Nakshatra, Yoga, and Karana — understanding how the interaction of the Sun and Moon shapes daily focus and decision-making.",
    descriptionHi: "तिथि, वार, नक्षत्र, योग और करण — सूर्य और चंद्रमा के कोणों से निर्धारित होने वाले पाँच खगोलीय तत्वों की सरल व्याख्या।",
    image: "https://cdn.21st.dev/assets/mirror/03/03e08e6b748cd888b6c4bb295b1348148830b5cfc87cce5ecb1ad62b4dd79fb3.jpg",
    createdAt: "2025-11-25",
    author: "Dr. Kalyan Sundaram",
    authorRole: "Historian of Ancient Indian Astronomy",
    readTime: "10 min read",
    category: "Panchang Science",
    categoryHi: "पंचांग विज्ञान",
    content: [
      {
        heading: "Why Five Limbs?",
        headingHi: "पाँच अंगों का समन्वय",
        text: "Every moment in time possesses five distinct astronomical coordinates. While Western dates only measure solar days, the Panchang captures the precise 12° lunar angular separation (Tithi) and the 13° 20' sidereal lunar transit (Nakshatra).",
      },
    ],
  },
  {
    title: "The 360-Spoke Cosmic Wheel in Rigvedic Astronomy",
    titleHi: "ऋग्वेद में ३६० अरों वाला काल-चक्र: ब्रह्मांडीय खगोलशास्त्र",
    slug: "cosmic-wheel-rigveda",
    description: "The 12-month solar cycle and 360-degree ecliptic circle first articulated in Rigvedic hymns millennia before modern geometry.",
    descriptionHi: "द्वादश प्रधयश्चक्रमेकं त्रीणि नभ्यानि क उ तच्चिकेत — ऋग्वेद के प्रथम मण्डल में वर्णित सौर मंडल की ज्यामिति।",
    image: "https://cdn.21st.dev/assets/mirror/94/94f309ffe240e6252865b9a1fe6fc11c086414e7271e8565aae29d9e75dcfc44.jpg",
    createdAt: "2025-10-30",
    author: "Acharya Vidyadhar",
    authorRole: "Vedic Scholar & Chronobiologist",
    readTime: "7 min read",
    category: "Historical Heritage",
    categoryHi: "ऐतिहासिक धरोहर",
    content: [
      {
        heading: "The Chariot Wheel of Time",
        headingHi: "समय का अखंड रथ",
        text: "In Rigveda (1.164.48), Rishi Dirghatamas describes a wheel with twelve spokes and 720 sons (360 days and 360 nights) that traverses space without aging or decaying.",
      },
    ],
  },
  {
    title: "The Vikram Samvat Royal Calendar (57 BCE): India's Living Heritage",
    titleHi: "विक्रम संवत् (५७ ईसा पूर्व): भारतीय राष्ट्रीय काल-गणना का गौरव",
    slug: "vikram-samvat-calendar",
    description: "Pre-dating the Gregorian calendar by nearly six decades, Vikram Samvat remains the premier lunisolar standard for national festivals and administration.",
    descriptionHi: "सम्राट विक्रमादित्य द्वारा शक विजय के उपलक्ष्य में आरंभ किया गया संवत्सर, जो आज भी भारत की सांस्कृतिक आत्मा को जोड़ता है।",
    image: "https://cdn.21st.dev/assets/mirror/dd/dd7374e5608609dce96fedb6220383770fe180d2d2e9f41f9b3c22ccfa5b654e.jpg",
    createdAt: "2025-09-14",
    author: "Vikramaditya Research Group",
    authorRole: "Horological Engineering Faculty",
    readTime: "6 min read",
    category: "Historical Heritage",
    categoryHi: "ऐतिहासिक धरोहर",
    content: [
      {
        heading: "The Victory Era of King Vikramaditya",
        headingHi: "विक्रमादित्य का राज्यारोहण और काल मानक",
        text: "In 57 BCE, Emperor Vikramaditya defeated foreign invaders and liberated Malwa, inaugurating an era where civil debt was cleared and astronomical observation was restored to royal patronage.",
      },
    ],
  },
  {
    title: "Ayanamsha and Precession: Why Sidereal Rashi Differs from Tropical",
    titleHi: "अयनांश एवं विषुव अयन: सायन और निरयण राशि चक्र का सूक्ष्म अंतर",
    slug: "ayanamsha-precession-equinoxes",
    description: "Earth's 25,772-year axial wobble causes tropical Western signs to drift 24° away from actual physical constellations. Here is how Vedic math corrects it.",
    descriptionHi: "पृथ्वी की धुरी के धीमे घूर्णन से होने वाले अयनांश का वैदिक खगोलशास्त्र में अचूक समाधान।",
    image: "https://cdn.21st.dev/assets/mirror/1e/1e4a4d1babea6eab29262d2283d9fb7a28b0301690e5f9c45612978ae2ff064f.jpg",
    createdAt: "2025-08-22",
    author: "Pt. Rajeshwar Shastri",
    authorRole: "Jyotisha Researcher",
    readTime: "9 min read",
    category: "Astronomy & Math",
    categoryHi: "गणित एवं तकनीक",
    content: [
      {
        heading: "The Physical Stars vs Abstract Seasons",
        headingHi: "वास्तविक नक्षत्र बनाम ऋतु चक्र",
        text: "When modern astronomy points a telescope at the sky on April 15th, the sun physically transits Aries (Mesha). Vedic sidereal (Nirayana) coordinates align with the real stars, whereas Western tropical calendars drifted into abstract solar solstices.",
      },
    ],
  },
  {
    title: "Sanctum Horology: Synchronizing Temple Aartis with Solar Zenith",
    titleHi: "गर्भगृह होरोलॉजी: सूर्य की किरणों से आरती और अनुष्ठान का समन्वय",
    slug: "sanctum-horology-temple-aartis",
    description: "Ancient Indian temples were giant astronomical observatories designed to capture solar equinox beams on inner sanctum idols at precise Muhurtas.",
    descriptionHi: "मोढेरा, कोणार्क और उज्जैन के महाकाल मंदिर में खगोलीय गणनाओं के आधार पर रचित वास्तुकला और समय-प्रबंधन।",
    image: "https://cdn.21st.dev/assets/mirror/66/66c2376b01010086f676afcd56d9e3b0f0498b4d1c4e2c3e7e91eb3af2f179f2.jpg",
    createdAt: "2025-07-19",
    author: "Prof. Meera Deshpande",
    authorRole: "Archeoastronomy Department",
    readTime: "5 min read",
    category: "Sacred Horology",
    categoryHi: "वैदिक कालगणना",
    content: [
      {
        heading: "The Sanctum as an Ephemeris",
        headingHi: "खगोलीय वेधशाला के रूप में देवालय",
        text: "From Modhera's Sun Temple to Konark's stone chariot wheels, ancient architects calibrated aartis not to arbitrary minute clocks, but to the exact shadow angle cast by gnomons onto sanctum thresholds.",
      },
    ],
  },
  {
    title: "The Architecture of Brass: Crafting Heirloom Horological Artifacts",
    titleHi: "पीतल की वास्तुकला: धरोहर वेदिक घड़ियों का कारीगरी शिल्प",
    slug: "bespoke-architectural-horology",
    description: "The tactile art of hand-finished brass, deep obsidian dials, and celestial wheel iconography forged for royal residences and institutions.",
    descriptionHi: "हस्तशिल्प और नक्काशीदार पीतल के आवरण में सजी विक्रमादित्य वेदिक घड़ी की कारीगरी और डिजाइन सौंदर्य।",
    image: "https://cdn.21st.dev/assets/mirror/ee/ee1bd0742f0ae1ed3cc484df2b2a51495d35fd0e853eb14757b4f78df82f450c.jpg",
    createdAt: "2025-06-11",
    author: "Vikramaditya Artisan Guild",
    authorRole: "Master Horological Craftsmen",
    readTime: "8 min read",
    category: "Historical Heritage",
    categoryHi: "ऐतिहासिक धरोहर",
    content: [
      {
        heading: "Forging Metal and Memory",
        headingHi: "धातु और परंपरा का संगम",
        text: "Every bezel and chassis of our heirloom timepieces is cast in virgin bell brass, treated with organic oxidization patina, and engraved with classical Devanagari numerals.",
      },
    ],
  },
  {
    title: "The Living Day: Reclaiming Contemplative Stillness in Modern Life",
    titleHi: "जीवंत दिवस: संध्या और ब्रह्म मुहूर्त में मानसिक शांति की पुनः खोज",
    slug: "living-day-dawn-to-pre-dawn",
    description: "How synchronizing daily habits with Sandhya twilights and Brahma Muhurta restores clarity, mental plasticity, and biological balance.",
    descriptionHi: "भागदौड़ भरे आधुनिक युग में वैदिक काल विभाजन द्वारा मानसिक शांति और कार्यकुशलता प्राप्त करने का मार्ग।",
    image: "https://cdn.21st.dev/assets/mirror/f0/f05e33f6d849e65bc6507c82ed416805bba5d5dd4152fde67b1d833b5ff91b88.jpg",
    createdAt: "2025-05-04",
    author: "Dr. Kalyan Sundaram",
    authorRole: "Historian of Ancient Indian Astronomy",
    readTime: "6 min read",
    category: "Philosophy of Time",
    categoryHi: "काल दर्शन",
    content: [
      {
        heading: "Brahma Muhurta: The Gateway of Pure Mind",
        headingHi: "ब्रह्म मुहूर्त का अलौकिक प्रभाव",
        text: "Occurring approximately 96 to 48 minutes before local sunrise, Brahma Muhurta presents peak atmospheric serenity, minimal electromagnetic interference, and optimal neural plasticity for contemplative insight.",
      },
    ],
  },
];
