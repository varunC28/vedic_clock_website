export interface FaqItem {
  id: string;
  category: "astronomy" | "hardware" | "geography" | "acquisitions";
  categoryLabelEn: string;
  categoryLabelHi: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  tags: string[];
}

export interface FaqCategory {
  key: "all" | "astronomy" | "hardware" | "geography" | "acquisitions";
  labelEn: string;
  labelHi: string;
  icon: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { key: "all", labelEn: "All Questions", labelHi: "सभी प्रश्न", icon: "✦" },
  { key: "astronomy", labelEn: "Vedic Astronomy", labelHi: "खगोल विज्ञान", icon: "🌌" },
  { key: "hardware", labelEn: "Clock & Hardware", labelHi: "यंत्र व तकनीक", icon: "🕰️" },
  { key: "geography", labelEn: "Global Calibration", labelHi: "वैश्विक भूगोल", icon: "🌍" },
  { key: "acquisitions", labelEn: "Commissions & Orders", labelHi: "अधिग्रहण व संस्थाएँ", icon: "🏛️" },
];

export const MASTER_FAQ_ITEMS: FaqItem[] = [
  // ── Category 1: Vedic Astronomy & Panchang ──
  {
    id: "ujjain-prime-meridian",
    category: "astronomy",
    categoryLabelEn: "Vedic Astronomy",
    categoryLabelHi: "खगोल विज्ञान",
    questionEn: "Why is Ujjain recognized as the ancient 0° Prime Meridian of the Earth?",
    questionHi: "उज्जैन को पृथ्वी की प्राचीन ०° प्रधान मध्याह्न रेखा (Prime Meridian) क्यों माना जाता है?",
    answerEn:
      "Centuries before the 1884 Greenwich Meridian Conference, classical Indian astronomers (including Varahamihira and the Surya Siddhanta) calibrated all planetary ephemerides from Ujjain (ancient Avantika). Ujjain sits precisely where the Tropic of Cancer intersects the ancient baseline axis connecting Lanka on the equator to Mount Meru at the North Pole. At the summer solstice, the midday sun reaches a 90° zenith overhead, casting zero shadow from vertical gnomons.",
    answerHi:
      "ग्रीनविच (1884) से शताब्दियों पूर्व, वराहमिहिर और सूर्य सिद्धान्त के भारतीय खगोलविदों ने उज्जैन (अवंतिका) से सभी ग्रह गणनाएँ की थीं। उज्जैन कर्क रेखा और भूमध्य रेखा से सुमेरु पर्वत को जोड़ने वाली प्राचीन मध्याह्न रेखा के संपात बिंदु पर स्थित है। ग्रीष्म संक्रांति के समय दोपहर का सूर्य ठीक ९०° शीर्ष पर होता है, जिससे शंकु की छाया शून्य हो जाती है।",
    tags: ["Ujjain", "Prime Meridian", "Surya Siddhanta", "Varahamihira"],
  },
  {
    id: "thirty-muhurtas-science",
    category: "astronomy",
    categoryLabelEn: "Vedic Astronomy",
    categoryLabelHi: "खगोल विज्ञान",
    questionEn: "What is the scientific significance of the 30 dynamic Muhurtas?",
    questionHi: "३० गतिशील मुहूर्तों का वैज्ञानिक और खगोलीय महत्व क्या है?",
    answerEn:
      "In Vedic horology, a complete 24-hour day-and-night cycle (Ahoratra) comprises 30 Muhurtas (equal to 60 Ghatis). Unlike rigid 60-minute Western civil hours, daytime Muhurtas (Dinamana / 15) and nighttime Muhurtas (Ratrimana / 15) expand and contract gracefully with seasonal solstices, reflecting the living diurnal arc of the sun and human circadian biology.",
    answerHi:
      "वैदिक काल-गणना में संपूर्ण २४ घंटे का अहोरात्र ३० मुहूर्तों (६० घटियों) में विभाजित होता है। पाश्चात्य ६०-मिनट के स्थिर घंटों के विपरीत, दिन के १५ मुहूर्त (दिनमान/१५) और रात्रि के १५ मुहूर्त (रात्रिमान/१५) ऋतुओं के अनुसार घटते-बढ़ते हैं, जो सूर्य के प्राकृतिक चक्र और मानव जैविक घड़ी का जीवंत प्रतिबिंब हैं।",
    tags: ["Muhurta", "Ahoratra", "Ghati", "Circadian Rhythms"],
  },
  {
    id: "panchang-five-limbs",
    category: "astronomy",
    categoryLabelEn: "Vedic Astronomy",
    categoryLabelHi: "खगोल विज्ञान",
    questionEn: "How do the Five Limbs (Panchang) coordinate astronomical time?",
    questionHi: "पंचांग के पाँच अंग समय का खगोलीय समन्वय कैसे करते हैं?",
    answerEn:
      "The Panchang coordinates time through five fundamental celestial dimensions: 1. Tithi (12° longitudinal separation between Sun and Moon), 2. Vaar (the solar weekday ruled by planetary lords), 3. Nakshatra (the 13° 20' sidereal lunar mansion), 4. Yoga (the combined longitudinal sum of Sun and Moon), and 5. Karana (half of a lunar Tithi, 6° solar-lunar arc).",
    answerHi:
      "पंचांग समय को पाँच मूलभूत खगोलीय आयामों द्वारा समन्वित करता है: १. तिथि (सूर्य और चंद्रमा के बीच १२° का देशांतरीय अंतर), २. वार (ग्रहों द्वारा शासित सौर दिन), ३. नक्षत्र (१३° २०' का नक्षत्र मंडल), ४. योग (सूर्य व चंद्र के देशांतर का योग), और ५. करण (तिथि का आधा भाग, ६° सौर-चंद्र चाप)।",
    tags: ["Panchang", "Tithi", "Nakshatra", "Yoga", "Karana", "Vaar"],
  },
  {
    id: "sunrise-vs-midnight",
    category: "astronomy",
    categoryLabelEn: "Vedic Astronomy",
    categoryLabelHi: "खगोल विज्ञान",
    questionEn: "Why does the Vedic day commence at local astronomical sunrise (Suryodaya)?",
    questionHi: "वैदिक दिन नागरिक अर्धरात्रि के बजाय स्थानीय सूर्योदय से क्यों प्रारंभ होता है?",
    answerEn:
      "Civil midnight (12:00 AM) is an artificial abstraction set at the darkest hour of the night. Vedic time begins at Suryodaya (local astronomical sunrise), when the upper limb of the solar disc breaches the horizon. This aligns human metabolic rhythms, cortisol secretion, and circadian biology directly with solar dawn.",
    answerHi:
      "नागरिक अर्धरात्रि (१२:०० पूर्वाह्न) रात्रि के अंधकार में एक कृत्रिम निर्धारण है। वैदिक समय का आरंभ स्थानीय सूर्योदय से होता है, जब सूर्य का ऊपरी किनारा क्षितिज पर दृष्टिगोचर होता है। यह मानव जैविक घड़ी (सर्कैडियन रिदम), उपापचय और चेतना को सीधे सौर भोर से जोड़ता है।",
    tags: ["Suryodaya", "Sunrise", "Circadian Biology", "Ahoratra"],
  },
  {
    id: "sidereal-nirayana-vs-tropical",
    category: "astronomy",
    categoryLabelEn: "Vedic Astronomy",
    categoryLabelHi: "खगोल विज्ञान",
    questionEn: "How does the Nirayana (sidereal) zodiac differ from the Western Sayana (tropical) zodiac?",
    questionHi: "निरयण (नाक्षत्र) और सायन (क्रांतिवृत्तीय) राशि चक्र में क्या अंतर है?",
    answerEn:
      "The Nirayana (sidereal) zodiac used in Vedic astronomy measures planetary positions against the actual physical, observable fixed constellations (Nakshatras). The Western Sayana (tropical) zodiac measures time against the moving vernal equinox point, which drifts by approximately 1° every 72 years due to the precession of the Earth's axis (Ayanamsha), creating an approximate 24° offset today.",
    answerHi:
      "वैदिक खगोल विज्ञान में प्रयुक्त निरयण राशि चक्र ग्रहों की स्थिति को वास्तविक, दृश्यमान स्थिर नक्षत्रों के आधार पर मापता है। पाश्चात्य सायन चक्र विषुव बिंदु के आधार पर मापता है, जो पृथ्वी की धुरी के अयन चलन (अयनांश) के कारण प्रत्येक ७२ वर्ष में लगभग १° खिसक जाता है, जिससे आज लगभग २४° का अंतर विद्यमान है।",
    tags: ["Nirayana", "Ayanamsha", "Sidereal Zodiac", "Nakshatras"],
  },

  // ── Category 2: Clock & Hardware Engineering ──
  {
    id: "clock-offline-operation",
    category: "hardware",
    categoryLabelEn: "Clock & Hardware",
    categoryLabelHi: "यंत्र व तकनीक",
    questionEn: "Does the Vikramaditya Vedic Clock require an active Wi-Fi or internet connection?",
    questionHi: "क्या विक्रमादित्य वैदिक घड़ी को निरंतर इंटरनेट या वाई-फ़ाई की आवश्यकता होती है?",
    answerEn:
      "No. The timepiece operates on a dedicated offline astronomical computing engine with embedded mathematical ephemerides running locally on industrial-grade microcontrollers. It functions entirely standalone without internet, cloud dependencies, or external servers, making it impervious to network outages and suitable for remote sanctums and sacred temple heritage sites.",
    answerHi:
      "नहीं। यह घड़ी एक समर्पित ऑफ़लाइन खगोलीय गणना इंजन पर कार्य करती है, जिसमें सूर्य सिद्धान्त आधारित गणितीय सूत्र स्थानीय माइक्रोकंट्रोलर पर चलते हैं। इसे क्लाउड, सर्वर या इंटरनेट की आवश्यकता नहीं होती, जिससे यह दूरस्थ गर्भगृहों, हेरिटेज परिसरों और वेधशालाओं में बिना किसी रुकावट के स्वतंत्र रूप से कार्य करती है।",
    tags: ["Offline", "Microcontroller", "Autonomous Horology", "Embedded Systems"],
  },
  {
    id: "bell-brass-casework",
    category: "hardware",
    categoryLabelEn: "Clock & Hardware",
    categoryLabelHi: "यंत्र व तकनीक",
    questionEn: "What alloy is used for the casework, and how is the acoustic bell chime produced?",
    questionHi: "घड़ी के आवरण (कवर) में कौन-सी धातु का उपयोग होता है और घंटी की ध्वनि कैसे उत्पन्न होती है?",
    answerEn:
      "The casing and internal acoustic resonator are cast from traditional Acoustic Bell Brass (Kansa / Panchadhatu), renowned across millennia for its crystalline resonance, high copper-tin acoustic purity, and natural anti-microbial properties. The bezel and casework are precision hand-turned by master artisans and finished with museum-grade protective patinas.",
    answerHi:
      "घड़ी का आवरण और आंतरिक ध्वनिक प्रतिध्वनिकार पारंपरिक कांस्य/बेल ब्रास (कांसा/पंचधातु) से ढला गया है, जो सहस्राब्दियों से अपनी कर्णप्रिय गूँज और ध्वनिक शुद्धता के लिए विख्यात है। इसके डायल और आवरण को अनुभवी शिल्पकारों द्वारा हस्तनिर्मित और संग्रहालय-स्तरीय सुरक्षात्मक पॉलिश से सुसज्जित किया गया है।",
    tags: ["Bell Brass", "Kansa", "Panchadhatu", "Artisan Horology", "Acoustics"],
  },
  {
    id: "power-backup-protection",
    category: "hardware",
    categoryLabelEn: "Clock & Hardware",
    categoryLabelHi: "यंत्र व तकनीक",
    questionEn: "What power backup and electrical protection is built into the instrument?",
    questionHi: "घड़ी में विद्युत आपूर्ति और बैकअप की क्या व्यवस्था है?",
    answerEn:
      "The clock incorporates dual power redundancy: a low-noise, surge-protected regulated power supply paired with an internal high-endurance lithium backup battery. In the event of a mains power failure, the internal astronomical engine maintains uninterrupted timekeeping down to the microsecond.",
    answerHi:
      "घड़ी में दोहरी विद्युत सुरक्षा प्रणाली है: एक सर्ज-संरक्षित विनियमित विद्युत आपूर्ति और एक आंतरिक उच्च-क्षमता लिथियम बैकअप बैटरी। मुख्य बिजली कट जाने पर भी इसका खगोलीय गणना इंजन बिना किसी व्यवधान के माइक्रो-सेकंड स्तर की शुद्धता के साथ समय का निरंतर संचालन जारी रखता है।",
    tags: ["Power Backup", "Battery Redundancy", "Microsecond Precision"],
  },
  {
    id: "dial-planetary-synchronization",
    category: "hardware",
    categoryLabelEn: "Clock & Hardware",
    categoryLabelHi: "यंत्र व तकनीक",
    questionEn: "How are the physical hands and dials synchronized with real-time planetary transits?",
    questionHi: "घड़ी की सुइयाँ और चक्र वास्तविक ग्रहीय गोचर के साथ कैसे तालमेल बनाते हैं?",
    answerEn:
      "Precision multi-axis micro-stepper motors drive the physical indicators, translating instantaneous mathematical ephemeris calculations into smooth mechanical rotations. The dial articulates the living 30-Muhurta ring, the 12-Rashi sidereal transit, and the solar diurnal progress arc.",
    answerHi:
      "अति-सूक्ष्म मल्टी-एक्सिस माइक्रो-स्टेपर मोटर्स घड़ी के संकेतकों को संचालित करते हैं, जो खगोलीय गणनाओं को सुचारू यांत्रिक गति में रूपांतरित करते हैं। यह डायल ३०-मुहूर्त चक्र, १२ राशि नाक्षत्र गोचर और सूर्य के दैनिक चाप का सजीव प्रदर्शन करता है।",
    tags: ["Stepper Motors", "Planetary Transit", "Dial Engineering"],
  },

  // ── Category 3: Global Geography & International Calibration ──
  {
    id: "global-international-usage",
    category: "geography",
    categoryLabelEn: "Global Calibration",
    categoryLabelHi: "वैश्विक भूगोल",
    questionEn: "Can the Vedic Clock be calibrated for cities outside India (e.g., USA, UK, Australia)?",
    questionHi: "क्या वैदिक घड़ी को भारत के बाहर (जैसे अमेरिका, ब्रिटेन, ऑस्ट्रेलिया) के नगरों के लिए कैलिब्रेट किया जा सकता है?",
    answerEn:
      "Yes. While the instrument honors the sacred 0° Prime Meridian of Ujjain as its celestial foundation, its internal coordinate engine allows configuration for any geographical latitude, longitude, and elevation on Earth. It computes exact local astronomical sunrise, sunset, and localized diurnal Muhurta proportions for any city globally.",
    answerHi:
      "हाँ। यद्यपि यह घड़ी उज्जैन की ०° प्रधान मध्याह्न रेखा को अपनी खगोलीय आधारशिला मानती है, इसका आंतरिक निर्देशांक इंजन पृथ्वी के किसी भी अक्षांश, देशांतर और ऊँचाई के अनुसार कॉन्फ़िगर किया जा सकता है। यह विश्व के किसी भी नगर के लिए स्थानीय सूर्योदय, सूर्यास्त और सटीक मुहूर्त अवधियों की गणना करता है।",
    tags: ["Global Cities", "Latitude Longitude", "International NRI", "Sunrise Calibration"],
  },
  {
    id: "seasonal-muhurta-latitudes",
    category: "geography",
    categoryLabelEn: "Global Calibration",
    categoryLabelHi: "वैश्विक भूगोल",
    questionEn: "How does geographical latitude affect the duration of daytime and nighttime Muhurtas?",
    questionHi: "भौगोलिक अक्षांश दिन और रात के मुहूर्तों की अवधि को कैसे प्रभावित करता है?",
    answerEn:
      "At higher latitudes, seasonal variation between summer and winter day lengths is pronounced. The Vedic Clock dynamically computes Dinamana (day span / 15) and Ratrimana (night span / 15) based on solar declination and observer latitude, elegantly expanding daytime Muhurtas during summer and contracting them during winter with mathematical fidelity.",
    answerHi:
      "उच्च अक्षांशों पर ग्रीष्म और शीत ऋतु के दिन-रात की लंबाई में व्यापक अंतर होता है। वैदिक घड़ी सौर क्रांति और पर्यवेक्षक के अक्षांश के आधार पर दिनमान (दिन/१५) और रात्रिमान (रात/१५) की वास्तविक गणना करती है, जिससे ग्रीष्मकाल में दिन के मुहूर्त स्वाभाविक रूप से बड़े और शीतकाल में छोटे हो जाते हैं।",
    tags: ["Dinamana", "Ratrimana", "Solstice", "Seasonal Variance"],
  },
  {
    id: "gnss-gps-synchronization",
    category: "geography",
    categoryLabelEn: "Global Calibration",
    categoryLabelHi: "वैश्विक भूगोल",
    questionEn: "Is automatic GNSS/GPS synchronization available for location detection?",
    questionHi: "क्या स्थान पहचान और समय शुद्धता के लिए स्वचालित जीपीएस (GPS) सुविधा उपलब्ध है?",
    answerEn:
      "Yes. Select bespoke and institutional editions incorporate a discreet GNSS satellite receiver that automatically synchronizes atomic time reference and geographical coordinates, eliminating any need for manual latitude/longitude input or periodic time setting.",
    answerHi:
      "हाँ। चुनिंदा संस्थागत और विशिष्ट संस्करणों में एक विशेष जीएनएसएस (GNSS/GPS) उपग्रह रिसीवर अंतर्निहित होता है, जो स्वतः परमाणु समय और भौगोलिक निर्देशांक प्राप्त कर सूर्योदय का सटीक निर्धारण करता है।",
    tags: ["GPS", "GNSS", "Atomic Synchronization", "Auto Calibration"],
  },

  // ── Category 4: Acquisitions & Institutional Commissions ──
  {
    id: "institutional-temple-commissions",
    category: "acquisitions",
    categoryLabelEn: "Commissions & Orders",
    categoryLabelHi: "अधिग्रहण व संस्थाएँ",
    questionEn: "How can temples, universities, and museums commission an edition of the clock?",
    questionHi: "मंदिर, विश्वविद्यालय और संग्रहालय घड़ी के अधिष्ठापन के लिए कैसे संपर्क कर सकते हैं?",
    answerEn:
      "Institutional commissions are coordinated directly through Shiv Enterprises in Ujjain. Our engineering team assists with architectural spatial planning, sanctum wall mounts, monumental brass courtyard pedestals, and custom heraldic/trust dedications engraved onto the casework.",
    answerHi:
      "संस्थागत अधिष्ठापन का समन्वय सीधे शिव एंटरप्राइजेज (उज्जैन) द्वारा किया जाता है। हमारी टीम वास्तुशिल्प एकीकरण, गर्भगृह वॉल-माउंट, विशाल कांस्य स्तंभों और अनुकूलित उत्कीर्ण पट्टिकाओं के लिए पूर्ण परामर्श प्रदान करती है।",
    tags: ["Institutions", "Temples", "Universities", "Shiv Enterprises", "Monuments"],
  },
  {
    id: "catalogue-editions-formats",
    category: "acquisitions",
    categoryLabelEn: "Commissions & Orders",
    categoryLabelHi: "अधिग्रहण व संस्थाएँ",
    questionEn: "What editions and physical formats are featured in the official catalogue?",
    questionHi: "आधिकारिक कैटलॉग में कौन-से संस्करण और प्रारूप उपलब्ध हैं?",
    answerEn:
      "The collection features three principal formats: 1. Sanctum Wall Mount Editions (designed for sacred rooms, mandirs, and executive studies), 2. Horological Table Dials (handcrafted desktop showpieces), and 3. Monumental Pedestal Editions (for temple courtyards, university astronomical centers, and civic squares).",
    answerHi:
      "संग्रह में तीन प्रमुख प्रारूप सम्मिलित हैं: १. गर्भगृह वॉल माउंट संस्करण (पूजा कक्षों और विशिष्ट अध्ययन कक्षों के लिए), २. टेबल-टॉप डायल (हस्तनिर्मित मेज़ घड़ियाँ), और ३. स्मारक स्तंभ संस्करण (मंदिर परिसरों, विश्वविद्यालयों और सार्वजनिक वेधशालाओं के लिए)।",
    tags: ["Catalogue", "Editions", "Wall Mount", "Table Dial", "Pedestal"],
  },
  {
    id: "ordering-lead-time-process",
    category: "acquisitions",
    categoryLabelEn: "Commissions & Orders",
    categoryLabelHi: "अधिग्रहण व संस्थाएँ",
    questionEn: "What is the ordering process and lead time for bespoke handcrafted commissions?",
    questionHi: "हस्तनिर्मित घड़ी के ऑर्डर की प्रक्रिया और निर्माण की समयावधि क्या है?",
    answerEn:
      "Interested collectors and institutions can initiate an inquiry via our official Contact Portal (/contact) or by downloading the official Monograph Catalogue (/catalogue.pdf). Due to artisan bell brass casting, hand-finishing, and multi-week astronomical horological calibration, bespoke editions require approximately 6 to 12 weeks for delivery.",
    answerHi:
      "इच्छुक संरक्षक और संस्थाएँ हमारे संपर्क पृष्ठ (/contact) अथवा आधिकारिक कैटलॉग (/catalogue.pdf) के माध्यम से संपर्क कर सकते हैं। कांस्य ढलाई, हस्त-शिल्प और बहु-सप्ताह के खगोलीय कैलिब्रेशन के कारण प्रत्येक विशिष्ट घड़ी के निर्माण में लगभग ६ से १२ सप्ताह का समय लगता है।",
    tags: ["Order Process", "Lead Time", "Handcrafting", "Bespoke Horology"],
  },
];
