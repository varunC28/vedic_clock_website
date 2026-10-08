"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { BilingualPill } from "@/components/atoms/BilingualPill";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { PanchangTableRow } from "@/components/molecules/PanchangTableRow";

interface TocItem {
  id: string;
  num: number;
  numHi: string;
  titleHi: string;
  titleEn: string;
}

const TOC_ITEMS: TocItem[] = [
  {
    id: "chapter-1",
    num: 1,
    numHi: "१",
    titleHi: "वैदिक समय को समझना",
    titleEn: "Understanding Vedic Time",
  },
  {
    id: "chapter-2",
    num: 2,
    numHi: "२",
    titleHi: "वैदिक समय की इकाइयाँ",
    titleEn: "The Vedic Units of Time",
  },
  {
    id: "chapter-3",
    num: 3,
    numHi: "३",
    titleHi: "पंचांग के पाँच अंग",
    titleEn: "The Five Limbs of the Panchang",
  },
  {
    id: "chapter-4",
    num: 4,
    numHi: "४",
    titleHi: "तीस नित्य-मुहूर्त",
    titleEn: "The 30 Daily Muhurtas",
  },
  {
    id: "chapter-5",
    num: 5,
    numHi: "५",
    titleHi: "राशि — सूर्य व चंद्र",
    titleEn: "Rashi — Zodiac Signs",
  },
  {
    id: "chapter-6",
    num: 6,
    numHi: "६",
    titleHi: "विक्रम संवत् पंचांग",
    titleEn: "The Vikram Samvat Calendar",
  },
  {
    id: "chapter-7",
    num: 7,
    numHi: "७",
    titleHi: "अपनी घड़ी को पढ़ना",
    titleEn: "Reading Your Clock",
  },
  {
    id: "chapter-8",
    num: 8,
    numHi: "८",
    titleHi: "घड़ी का दैनिक उपयोग",
    titleEn: "Using the Clock Daily",
  },
];

const VARA_ITEMS = [
  { dayHi: "रविवार", dayEn: "Sunday", planetHi: "सूर्य", planetEn: "Surya (Sun)", meaningHi: "आत्मबल, नेतृत्व, ऊर्जा", meaningEn: "vitality, leadership, energy" },
  { dayHi: "सोमवार", dayEn: "Monday", planetHi: "चंद्रमा", planetEn: "Chandra (Moon)", meaningHi: "मन, भावनाएं, शांति", meaningEn: "mind, emotions, calmness" },
  { dayHi: "मंगलवार", dayEn: "Tuesday", planetHi: "मंगल", planetEn: "Mangal (Mars)", meaningHi: "साहस, शक्ति, क्रिया", meaningEn: "courage, strength, action" },
  { dayHi: "बुधवार", dayEn: "Wednesday", planetHi: "बुध", planetEn: "Budh (Mercury)", meaningHi: "बुद्धि, संवाद, व्यापार", meaningEn: "intellect, communication, trade" },
  { dayHi: "गुरुवार", dayEn: "Thursday", planetHi: "बृहस्पति", planetEn: "Guru (Jupiter)", meaningHi: "ज्ञान, समृद्धि, शिक्षा", meaningEn: "wisdom, prosperity, teaching" },
  { dayHi: "शुक्रवार", dayEn: "Friday", planetHi: "शुक्र", planetEn: "Shukra (Venus)", meaningHi: "प्रेम, सौंदर्य, कला", meaningEn: "love, beauty, art" },
  { dayHi: "शनिवार", dayEn: "Saturday", planetHi: "शनि", planetEn: "Shani (Saturn)", meaningHi: "अनुशासन, परिश्रम, कर्मफल", meaningEn: "discipline, hard work, karma" },
];

const NAKSHATRA_ITEMS = [
  { num: 1, hi: "अश्विनी", en: "Ashwini", descHi: "शीघ्र आरंभ, चिकित्सा", descEn: "quick starts, healing" },
  { num: 2, hi: "भरणी", en: "Bharani", descHi: "अनुशासन, धैर्य", descEn: "discipline, endurance" },
  { num: 3, hi: "कृत्तिका", en: "Krittika", descHi: "अग्नि, परिवर्तन", descEn: "fire, transformation" },
  { num: 4, hi: "रोहिणी", en: "Rohini", descHi: "सौंदर्य, वृद्धि", descEn: "beauty, growth" },
  { num: 5, hi: "मृगशिरा", en: "Mrigashira", descHi: "खोज, यात्रा", descEn: "searching, travel" },
  { num: 6, hi: "आर्द्रा", en: "Ardra", descHi: "तीव्रता, नवीनीकरण", descEn: "intensity, renewal" },
  { num: 7, hi: "पुनर्वसु", en: "Punarvasu", descHi: "पुनः आरंभ", descEn: "return, renewal" },
  { num: 8, hi: "पुष्य", en: "Pushya", descHi: "पोषण, समृद्धि", descEn: "nourishment, prosperity" },
  { num: 9, hi: "आश्लेषा", en: "Ashlesha", descHi: "गोपनीयता, बंधन", descEn: "secrecy, binding" },
  { num: 10, hi: "मघा", en: "Magha", descHi: "पूर्वज, अधिकार", descEn: "ancestry, authority" },
  { num: 11, hi: "पूर्व फाल्गुनी", en: "Purva Phalguni", descHi: "सृजन, आनंद", descEn: "creativity, enjoyment" },
  { num: 12, hi: "उत्तर फाल्गुनी", en: "Uttara Phalguni", descHi: "स्थायित्व, संबंध", descEn: "stability, partnership" },
  { num: 13, hi: "हस्त", en: "Hasta", descHi: "कौशल, हस्तकला", descEn: "skill, craftsmanship" },
  { num: 14, hi: "चित्रा", en: "Chitra", descHi: "कला, वास्तु", descEn: "art, design" },
  { num: 15, hi: "स्वाति", en: "Swati", descHi: "स्वतंत्रता, गति", descEn: "independence, movement" },
  { num: 16, hi: "विशाखा", en: "Vishakha", descHi: "लक्ष्य, महत्वाकांक्षा", descEn: "goal, ambition" },
  { num: 17, hi: "अनुराधा", en: "Anuradha", descHi: "मित्रता, समर्पण", descEn: "friendship, devotion" },
  { num: 18, hi: "ज्येष्ठा", en: "Jyeshtha", descHi: "नेतृत्व, शक्ति", descEn: "leadership, power" },
  { num: 19, hi: "मूल", en: "Mula", descHi: "मूल, रूपांतरण", descEn: "roots, transformation" },
  { num: 20, hi: "पूर्वाषाढ़ा", en: "Purva Ashadha", descHi: "घोषणा, शुद्धि", descEn: "declaration, cleansing" },
  { num: 21, hi: "उत्तराषाढ़ा", en: "Uttara Ashadha", descHi: "विजय, अधिकार", descEn: "victory, authority" },
  { num: 22, hi: "श्रवण", en: "Shravana", descHi: "श्रवण, शिक्षा", descEn: "listening, learning" },
  { num: 23, hi: "धनिष्ठा", en: "Dhanishtha", descHi: "संगीत, समृद्धि", descEn: "music, prosperity" },
  { num: 24, hi: "शतभिषा", en: "Shatabhisha", descHi: "उपचार, गोपनीयता", descEn: "healing, secrecy" },
  { num: 25, hi: "पूर्वभाद्रपद", en: "Purva Bhadrapada", descHi: "दृष्टि, तीव्रता", descEn: "vision, intensity" },
  { num: 26, hi: "उत्तरभाद्रपद", en: "Uttara Bhadrapada", descHi: "स्थायित्व, गहराई", descEn: "stability, depth" },
  { num: 27, hi: "रेवती", en: "Revati", descHi: "यात्रा, समृद्धि", descEn: "safe travel, prosperity" },
];

const YOGA_ITEMS = [
  { num: 1, hi: "विष्कम्भ", en: "Vishkambha", descHi: "बाधा; सावधानी आवश्यक", descEn: "obstacles; proceed with caution" },
  { num: 2, hi: "प्रीति", en: "Priti", descHi: "प्रेम, सामंजस्य", descEn: "love and harmony; good for relationships" },
  { num: 3, hi: "आयुष्मान्", en: "Ayushman", descHi: "दीर्घायु, स्वास्थ्य", descEn: "long life, health; auspicious" },
  { num: 4, hi: "सौभाग्य", en: "Saubhagya", descHi: "सौभाग्य; सभी कार्य हेतु शुभ", descEn: "good fortune; favourable for most work" },
  { num: 5, hi: "शोभन", en: "Shobhana", descHi: "तेज, सुंदरता; शुभ", descEn: "brilliance, beauty; auspicious" },
  { num: 6, hi: "अतिगण्ड", en: "Atiganda", descHi: "जोखिम; नए कार्य टालें", descEn: "risk; avoid starting new ventures" },
  { num: 7, hi: "सुकर्मा", en: "Sukarma", descHi: "सत्कर्म हेतु शुभ", descEn: "favourable for good deeds" },
  { num: 8, hi: "धृति", en: "Dhriti", descHi: "धैर्य, स्थिरता", descEn: "patience, stability; good for long plans" },
  { num: 9, hi: "शूल", en: "Shoola", descHi: "पीड़ा, संघर्ष; अशुभ", descEn: "conflict, strain; inauspicious" },
  { num: 10, hi: "गण्ड", en: "Ganda", descHi: "बाधा, अस्वस्थता; सावधानी", descEn: "trouble; take precautions" },
  { num: 11, hi: "वृद्धि", en: "Vriddhi", descHi: "वृद्धि; निवेश हेतु शुभ", descEn: "growth; good for investment" },
  { num: 12, hi: "ध्रुव", en: "Dhruva", descHi: "स्थायित्व; स्थायी कार्य हेतु शुभ", descEn: "permanence; good for lasting work" },
  { num: 13, hi: "व्याघात", en: "Vyaghata", descHi: "अवरोध; जोखिम भरे कार्य टालें", descEn: "obstruction; avoid risky tasks" },
  { num: 14, hi: "हर्षण", en: "Harshana", descHi: "आनंद, उल्लास; शुभ", descEn: "joy; good for celebrations" },
  { num: 15, hi: "वज्र", en: "Vajra", descHi: "कठोरता; मिश्रित फल", descEn: "hardness; mixed results" },
  { num: 16, hi: "सिद्धि", en: "Siddhi", descHi: "सिद्धि, सफलता; अत्यंत शुभ", descEn: "accomplishment; highly auspicious" },
  { num: 17, hi: "व्यतीपात", en: "Vyatipata", descHi: "विपत्ति; बड़े कार्य टालें", descEn: "calamity; avoid major undertakings" },
  { num: 18, hi: "वरीयान्", en: "Variyana", descHi: "श्रेष्ठता, सुख; शुभ", descEn: "excellence, comfort; auspicious" },
  { num: 19, hi: "परिघ", en: "Parigha", descHi: "अवरोध; आरंभ टालें", descEn: "blockage; avoid new beginnings" },
  { num: 20, hi: "शिव", en: "Shiva", descHi: "मंगल, कल्याण; धार्मिक कार्य हेतु शुभ", descEn: "well-being; good for religious acts" },
  { num: 21, hi: "सिद्ध", en: "Siddha", descHi: "सिद्धि; शुभ", descEn: "accomplishment; auspicious" },
  { num: 22, hi: "साध्य", en: "Sadhya", descHi: "साध्य, अनुकूल; लक्ष्य-निर्धारण हेतु शुभ", descEn: "favourable; good for goal-setting" },
  { num: 23, hi: "शुभ", en: "Shubha", descHi: "शुभ, कल्याणकारी", descEn: "auspicious in general" },
  { num: 24, hi: "शुक्ल", en: "Shukla", descHi: "शुद्धता, उज्ज्वलता; शुभ", descEn: "purity, brightness; auspicious" },
  { num: 25, hi: "ब्रह्म", en: "Brahma", descHi: "पवित्रता; आध्यात्मिक कार्य हेतु शुभ", descEn: "sacred; good for spiritual work" },
  { num: 26, hi: "ऐन्द्र", en: "Indra", descHi: "शक्ति, अधिकार; नेतृत्व कार्य हेतु शुभ", descEn: "power; good for leadership tasks" },
  { num: 27, hi: "वैधृति", en: "Vaidhriti", descHi: "विरोध, विच्छेद; अशुभ, नए आरंभ टालें", descEn: "discord; inauspicious, avoid new starts" },
];

const KARANA_ITEMS = [
  { num: 1, hi: "बव", en: "Bava", typeHi: "चर", typeEn: "Repeating", descHi: "यात्राओं के लिए शुभ", descEn: "favourable for travel" },
  { num: 2, hi: "बालव", en: "Balava", typeHi: "चर", typeEn: "Repeating", descHi: "शिक्षा और बच्चों से जुड़े कार्य", descEn: "good for education and children" },
  { num: 3, hi: "कौलव", en: "Kaulava", typeHi: "चर", typeEn: "Repeating", descHi: "परिवार और दैनिक कार्य", descEn: "good for family and routine tasks" },
  { num: 4, hi: "तैतिल", en: "Taitila", typeHi: "चर", typeEn: "Repeating", descHi: "व्यापार और व्यवसाय", descEn: "good for trade and business" },
  { num: 5, hi: "गर", en: "Gara", typeHi: "चर", typeEn: "Repeating", descHi: "खेती और निर्माण कार्य", descEn: "good for farming and construction" },
  { num: 6, hi: "वणिज", en: "Vanija", typeHi: "चर", typeEn: "Repeating", descHi: "क्रय-विक्रय", descEn: "good for buying and selling" },
  { num: 7, hi: "विष्टि (भद्रा)", en: "Vishti (Bhadra)", typeHi: "चर", typeEn: "Repeating", descHi: "शुभ कार्यों के लिए अशुभ माना जाता है", descEn: "considered inauspicious for auspicious work" },
  { num: 8, hi: "शकुनि", en: "Shakuni", typeHi: "स्थिर", typeEn: "Fixed", descHi: "रणनीति और राजनीति", descEn: "good for strategy and negotiation" },
  { num: 9, hi: "चतुष्पद", en: "Chatushpada", typeHi: "स्थिर", typeEn: "Fixed", descHi: "पशुपालन और आधार कार्य", descEn: "good for animal care and foundational work" },
  { num: 10, hi: "नाग", en: "Naga", typeHi: "स्थिर", typeEn: "Fixed", descHi: "गुप्त एवं शक्तिशाली कार्य", descEn: "good for secretive or high-stakes work" },
  { num: 11, hi: "किंस्तुघ्न", en: "Kimstughna", typeHi: "स्थिर", typeEn: "Fixed", descHi: "पुराने विवाद समाप्त कर कार्य पूर्ण करने के लिए", descEn: "good for ending disputes and completing tasks" },
];

const MUHURTA_GUIDE_ITEMS = [
  { num: 1, hi: "रुद्र", en: "Rudra", deity: "Rudra", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Avoid — destruction energy, inauspicious for all new starts", doHi: "व्रत, संयम", doEn: "fasting, restraint", avoidHi: "नए कार्य आरंभ", avoidEn: "starting new work" },
  { num: 2, hi: "आहि", en: "Ahi", deity: "Sarpa", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Avoid — serpent energy, inauspicious", doHi: "आंतरिक/दफ़्तर कार्य", doEn: "back-office work", avoidHi: "कानूनी कार्य, शुभारंभ", avoidEn: "legal filings, launches" },
  { num: 3, hi: "मित्र", en: "Mitra", deity: "Mitra", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Friendships, alliances, business partnerships", doHi: "मित्रता, समझौते", doEn: "meetings, agreements", avoidHi: "झगड़े", avoidEn: "quarrels" },
  { num: 4, hi: "पितृ", en: "Pitri", deity: "Pitrs", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Ancestral rites, Shraddha ceremonies only", doHi: "पितृ तर्पण, दान", doEn: "ancestor remembrance, charity", avoidHi: "विवाह, गृहप्रवेश", avoidEn: "weddings, house-warming" },
  { num: 5, hi: "वसु", en: "Vasu", deity: "Ashtavasus", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Wealth-related activities, business, purchasing", doHi: "धन लेन-देन, खरीद", doEn: "finance, purchases", avoidHi: "अपव्यय", avoidEn: "wasteful spending" },
  { num: 6, hi: "वाराह", en: "Varaha", deity: "Varaha", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Agriculture, construction, auspicious works", doHi: "मरम्मत, निर्माण", doEn: "repairs, construction", avoidHi: "मुक़दमेबाज़ी", avoidEn: "lawsuits" },
  { num: 7, hi: "विश्वेदेव", en: "Vishvadeva", deity: "Vishvedevas", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "All good deeds, worship, charitable acts", doHi: "दान, सेवा, टीम कार्य", doEn: "charity, teamwork", avoidHi: "स्वार्थी कार्य", avoidEn: "selfish acts" },
  { num: 8, hi: "विधि", en: "Vidhi", deity: "Brahma", nature: "conditional", natureHi: "शुभ (सोम/शुक्र को अशुभ)", natureEn: "Auspicious (except Mon/Fri)", suitableFor: "Learning, studies, writing, creative works", doHi: "पढ़ाई, अनुबंध", doEn: "study, contracts", avoidHi: "सोम/शुक्र को आरंभ", avoidEn: "launches on Mon/Fri" },
  { num: 9, hi: "सुतमुखी", en: "Sutamukhi", deity: "Indra", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Leadership, governance, important decisions", doHi: "यात्रा, नेटवर्किंग", doEn: "travel, networking", avoidHi: "अधिक वादे", avoidEn: "over-promising" },
  { num: 10, hi: "पुरुहूत", en: "Puruhuta", deity: "Indra", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "War, competitions, debates, legal matters", doHi: "निजी उपासना", doEn: "private worship", avoidHi: "बड़े उपक्रम", avoidEn: "major ventures" },
  { num: 11, hi: "वाहिनी", en: "Vahini", deity: "Agni", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Fire ceremonies, Havana, Yajna, cooking", doHi: "योजना, तैयारी", doEn: "planning, preparation", avoidHi: "यात्रा आरंभ", avoidEn: "starting journeys" },
  { num: 12, hi: "नक्तनकरा", en: "Naktanankara", deity: "Nishachara", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Avoid — night-walker energy, inauspicious", doHi: "विश्राम, रख-रखाव", doEn: "rest, maintenance", avoidHi: "सार्वजनिक आयोजन", avoidEn: "public events" },
  { num: 13, hi: "वरुण", en: "Varuna", deity: "Varuna", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Water travel, trade, contracts, oath-taking", doHi: "शुद्धिकरण, जल-कार्य", doEn: "purification, water-related work", avoidHi: "चुगली", avoidEn: "gossip" },
  { num: 14, hi: "अर्यमन्", en: "Aryaman", deity: "Aryaman", nature: "conditional", natureHi: "शुभ (रविवार को अशुभ)", natureEn: "Auspicious (except Sunday)", suitableFor: "Marriage, social ceremonies, guest reception", doHi: "समझौते, संबंध", doEn: "contracts, alliances", avoidHi: "रवि को प्रतिष्ठा-कार्य", avoidEn: "prestige events on Sunday" },
  { num: 15, hi: "भग", en: "Bhaga", deity: "Bhaga", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Prosperity rituals, Lakshmi puja, wealth blessings", doHi: "दान", doEn: "charity", avoidHi: "संपत्ति बाँटना", avoidEn: "dividing property" },
  { num: 16, hi: "गिरीश", en: "Girisha", deity: "Shiva", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Shiva worship only; completing tasks", doHi: "कार्य का समापन", doEn: "completing tasks", avoidHi: "जोखिम भरे आरंभ", avoidEn: "risky new starts" },
  { num: 17, hi: "अजपाद", en: "Ajapada", deity: "Aja Ekapada", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Avoid — associated with obstacles", doHi: "परीक्षण, लेखा-जोखा", doEn: "audits, review", avoidHi: "यात्रा, शल्यक्रिया", avoidEn: "travel, surgery" },
  { num: 18, hi: "अहिर्बुध्न्य", en: "Ahirbudhnya", deity: "Ahirbudhnya", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Deep study, healing, tantric contemplation", doHi: "अध्ययन, चिकित्सा", doEn: "deep study, healing", avoidHi: "सतही प्रचार", avoidEn: "superficial promotion" },
  { num: 19, hi: "पुष्य", en: "Pushya", deity: "Pushan", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Highly auspicious — travel, education, buying gold", doHi: "शिक्षा, पोषण", doEn: "education, nourishment", avoidHi: "ग़लत भोजन", avoidEn: "poor diet" },
  { num: 20, hi: "अश्विनी", en: "Ashvini", deity: "Ashvins", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Medicine, healing, swift actions, horse riding", doHi: "उपचार, यात्रा, शुरुआत", doEn: "medical care, travel, beginnings", avoidHi: "विलम्ब", avoidEn: "delaying starts" },
  { num: 21, hi: "यम", en: "Yama", deity: "Yama", nature: "inauspicious", natureHi: "अशुभ", natureEn: "Inauspicious", suitableFor: "Avoid — lord of death, inauspicious for all", doHi: "अनुशासन, नियम-पालन", doEn: "discipline, following rules", avoidHi: "उत्सव, जोखिम", avoidEn: "celebrations, risk-taking" },
  { num: 22, hi: "अग्नि", en: "Agni", deity: "Agni", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Fire rituals, purification, bold energetic work", doHi: "साहसिक कार्य, ऊर्जा", doEn: "bold, energetic work", avoidHi: "क्रोध, जल्दबाज़ी", avoidEn: "anger, haste" },
  { num: 23, hi: "विधातृ", en: "Vidhatr", deity: "Brahma", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Creative arts, writing, designing, planning", doHi: "दस्तावेज़, अनुबंध", doEn: "drafting agreements", avoidHi: "टालमटोल", avoidEn: "procrastination" },
  { num: 24, hi: "कण्ड", en: "Chanda", deity: "Chandra", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Emotional healing, poetry, music, meditation", doHi: "कला, सजावट", doEn: "art, decoration", avoidHi: "अहंकार", avoidEn: "vanity" },
  { num: 25, hi: "अदिति", en: "Aditi", deity: "Aditi", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Liberation, freedom, travel abroad, releasing burdens", doHi: "क्षमा, दान", doEn: "forgiveness, charity", avoidHi: "कठोरता", avoidEn: "harshness" },
  { num: 26, hi: "जीव/अमृत", en: "Jiiva", deity: "Brihaspati", nature: "highly_auspicious", natureHi: "अति शुभ", natureEn: "Highly Auspicious", suitableFor: "Education, teaching, spiritual study, Guru worship", doHi: "व्रत, साधना, स्वास्थ्य", doEn: "vows, spiritual practice, health matters", avoidHi: "हानिकारक कार्य", avoidEn: "harmful actions" },
  { num: 27, hi: "विष्णु", en: "Vishnu", deity: "Vishnu", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "All Vaishnava rites, preservation, sustenance work", doHi: "दीर्घकालीन योजना, दान", doEn: "long-term planning, charity", avoidHi: "जुआ", avoidEn: "gambling" },
  { num: 28, hi: "द्युमद्गद्युति", en: "Dyumadgadyuti", deity: "Surya", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Solar worship, authority matters, arts, music", doHi: "कला, संगीत", doEn: "art, music", avoidHi: "झगड़े", avoidEn: "conflict" },
  { num: 29, hi: "ब्रह्मा", en: "Brahma", deity: "Brahma", nature: "highly_auspicious", natureHi: "अति शुभ", natureEn: "Highly Auspicious", suitableFor: "Most auspicious — sacred beginnings, deep meditation", doHi: "ध्यान, वेदाध्ययन", doEn: "meditation, sacred study", avoidHi: "व्यर्थ बातें", avoidEn: "idle talk" },
  { num: 30, hi: "समुद्र", en: "Samudrama", deity: "Varuna", nature: "auspicious", natureHi: "शुभ", natureEn: "Auspicious", suitableFor: "Sea travel, deep study, hidden knowledge, Yoga", doHi: "यात्रा आरंभ, शुद्धि", doEn: "starting journeys, purification", avoidHi: "गंदगी, अपव्यय", avoidEn: "clutter, waste" },
];

export const RASHI_GUIDE_ITEMS = [
  { num: 1, hi: "मेष", en: "Aries (Mesha)", signifiesHi: "साहस, नेतृत्व", signifiesEn: "courage, initiative" },
  { num: 2, hi: "वृषभ", en: "Taurus (Vrishabha)", signifiesHi: "स्थिरता, धन", signifiesEn: "stability, wealth" },
  { num: 3, hi: "मिथुन", en: "Gemini (Mithuna)", signifiesHi: "संवाद, बुद्धि", signifiesEn: "communication, wit" },
  { num: 4, hi: "कर्क", en: "Cancer (Karka)", signifiesHi: "गृह, पोषण", signifiesEn: "home, nurturing" },
  { num: 5, hi: "सिंह", en: "Leo (Simha)", signifiesHi: "सत्ता, प्रतिष्ठा", signifiesEn: "authority, pride" },
  { num: 6, hi: "कन्या", en: "Virgo (Kanya)", signifiesHi: "सेवा, विश्लेषण", signifiesEn: "service, analysis" },
  { num: 7, hi: "तुला", en: "Libra (Tula)", signifiesHi: "संतुलन, न्याय", signifiesEn: "balance, justice" },
  { num: 8, hi: "वृश्चिक", en: "Scorpio (Vrishchika)", signifiesHi: "गहराई, परिवर्तन", signifiesEn: "depth, transformation" },
  { num: 9, hi: "धनु", en: "Sagittarius (Dhanu)", signifiesHi: "ज्ञान, यात्रा", signifiesEn: "knowledge, travel" },
  { num: 10, hi: "मकर", en: "Capricorn (Makara)", signifiesHi: "अनुशासन, महत्त्वाकांक्षा", signifiesEn: "discipline, ambition" },
  { num: 11, hi: "कुंभ", en: "Aquarius (Kumbha)", signifiesHi: "समाज, नवाचार", signifiesEn: "society, innovation" },
  { num: 12, hi: "मीन", en: "Pisces (Meena)", signifiesHi: "अध्यात्म, करुणा", signifiesEn: "spirituality, compassion" },
];

export const PANCHANG_READING_STEPS = [
  {
    titleHi: "देखें कौन-सा मुहूर्त चल रहा है",
    descEn: "Check the current Muhurta → decide what to start or avoid.",
  },
  {
    titleHi: "देखें करण",
    descEn: "Check the Karana → postpone auspicious work if it's Vishti (Bhadra).",
  },
  {
    titleHi: "देखें नक्षत्र",
    descEn: "Check the Nakshatra → gauge the day's mental/emotional undertone.",
  },
  {
    titleHi: "सूर्य व चंद्र राशि देखें",
    descEn: "Check Surya & Chandra Rashi → sense the long-term vs. immediate mood.",
  },
  {
    titleHi: "तिथि व विक्रम संवत् देखें",
    descEn: "Check the Tithi & Vikram Samvat → time your rituals and festivals.",
  },
];

export const DAILY_USE_STEPS = [
  {
    titleHi: "मुहूर्त जाँचें",
    descEn: "Check the Muhurta before starting anything important — matching it against the Do / Avoid table.",
  },
  {
    titleHi: "करण जाँचें",
    descEn: "Check the Karana — make sure it isn't Vishti (Bhadra) before auspicious work.",
  },
  {
    titleHi: "नक्षत्र देखें",
    descEn: "Look at the Nakshatra for a read on the day's emotional tone.",
  },
  {
    titleHi: "राशि देखें",
    descEn: "Check Surya & Chandra Rashi for the broader backdrop and daily mood.",
  },
  {
    titleHi: "तिथि व संवत् देखें",
    descEn: "Use the Tithi and Vikram Samvat to time festivals and rituals.",
  },
];

export default function GuidePage() {
  const [selectedChapter, setSelectedChapter] = useState<string>("chapter-1");
  const [muhurtaFilter, setMuhurtaFilter] = useState<"all" | "day" | "night" | "auspicious" | "inauspicious">("all");
  const [selectedMuhurta, setSelectedMuhurta] = useState<number>(3); // Row 3 (Mitra) highlighted by default as in screenshot

  const filteredMuhurtas = MUHURTA_GUIDE_ITEMS.filter((m) => {
    if (muhurtaFilter === "day") return m.num <= 15;
    if (muhurtaFilter === "night") return m.num > 15;
    if (muhurtaFilter === "auspicious") return m.nature === "auspicious" || m.nature === "highly_auspicious";
    if (muhurtaFilter === "inauspicious") return m.nature === "inauspicious";
    return true;
  });

  const scrollToSection = (id: string) => {
    setSelectedChapter(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F5EDE1] text-[#2D1B0E] selection:bg-[#B8873D]/30 selection:text-[#2D1B0E] overflow-x-hidden">
      <Header alwaysVisible />

      {/* ── Document Container (Book / Manuscript Reader) ── */}
      <main className="pt-24 sm:pt-28 pb-20 px-3.5 sm:px-6 lg:px-8 w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 items-center min-w-0">
        
        {/* ========================================================
            PAGE 1: COVER & TABLE OF CONTENTS
           ======================================================== */}
        <article className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col items-center">
          
          {/* Eyebrow */}
          <div className="text-center mb-5">
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#8C5D33] uppercase">
              A Complete Guide · एक सम्पूर्ण मार्गदर्शिका
            </span>
          </div>

          {/* Primary Titles */}
          <h1 className="font-hindi text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#3D2314] tracking-normal leading-tight text-center">
            विक्रमादित्य वैदिक घड़ी
          </h1>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#4A2E1B] font-medium tracking-tight mt-1 text-center">
            Vikramaditya Vedic Clock
          </h2>

          {/* Golden Hairline Divider */}
          <div className="w-24 sm:w-32 h-[1.5px] bg-[#C29858] my-6 opacity-75" />

          {/* Subtitles */}
          <div className="flex flex-col items-center text-center gap-1.5 max-w-xl mb-10 sm:mb-14">
            <p className="font-hindi text-sm sm:text-base md:text-lg text-[#4A2E1B] font-medium leading-relaxed">
              सूर्योदय पर आधारित भारत की प्राचीन समय-प्रणाली को समझने की मार्गदर्शिका
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#70523C] leading-relaxed">
              Understanding India&apos;s ancient, sunrise-based system of time
            </p>
          </div>

          {/* ── TABLE OF CONTENTS (Using M5: PanchangTableRow) ── */}
          <section
            aria-label="विषय-सूची — Table of Contents"
            className="w-full max-w-4xl bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm"
          >
            {/* Table Container Eyebrow */}
            <div className="px-2 sm:px-4 pt-1 pb-3 sm:pb-4 border-b border-[#DFCBB5]/50 flex items-center justify-between">
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#8C5D33] uppercase">
                TABLE OF CONTENTS · विषय-सूची (८ अध्याय)
              </span>
              <span className="font-sans text-[10.5px] text-[#70523C]/70">
                Click chapter to jump
              </span>
            </div>

            {/* List of 9 Chapters using PanchangTableRow (M5) */}
            <div className="divide-y divide-[#DFCBB5]/40">
              {TOC_ITEMS.map((item) => (
                <PanchangTableRow
                  key={item.id}
                  index={item.num}
                  nameHi={item.titleHi}
                  nameEn={item.titleEn}
                  nameClassName="w-44 sm:w-64"
                  badge={`अध्याय ${item.numHi}`}
                  detail="अध्याय पर जाएँ · Jump to Chapter →"
                  isHighlighted={selectedChapter === item.id}
                  onClick={() => scrollToSection(item.id)}
                  variant="parchment"
                />
              ))}
            </div>
          </section>

        </article>


        {/* ========================================================
            CHAPTER 1: UNDERSTANDING VEDIC TIME (वैदिक समय को समझना)
           ======================================================== */}
        <article
          id="chapter-1"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 01
            </span>
          </div>

          {/* Header Capsule */}
          <div className="w-full flex justify-center mb-10 sm:mb-12">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                वैदिक समय को समझना
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                Understanding Vedic Time
              </span>
            </div>
          </div>

          {/* ── Section 1: The Vikramaditya Vedic Clock ── */}
          <div className="flex flex-col items-start mb-8 sm:mb-10">
            <div className="mb-3.5">
              <BilingualPill
                hi="विक्रमादित्य वैदिक घड़ी"
                en="The Vikramaditya Vedic Clock"
                size="md"
                variant="light"
              />
            </div>

            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2.5 text-justify">
              विक्रमादित्य वैदिक घड़ी भारत की प्राचीन समय-प्रणाली को आधुनिक डिजिटल रूप में सामने लाती है। इसमें एक दिन — अर्थात् एक सूर्योदय से अगले सूर्योदय तक — को 30 मुहूर्त में बाँटा गया है। प्रत्येक मुहूर्त 30 कला में और प्रत्येक कला 30 काष्ठा में विभाजित होती है। घड़ी किसी भी स्थान के अक्षांश, देशांतर और स्थानीय सूर्योदय के आधार पर यह समय सटीक रूप से निकालती है।
            </p>

            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed text-justify">
              The Vikramaditya Vedic Clock brings India&apos;s ancient time system into a modern digital form. It divides a day — one sunrise to the next — into 30 Muhurtas. Each Muhurta contains 30 Kala, and each Kala contains 30 Kashtha. The clock calculates this precisely for any location, using its latitude, longitude, and local sunrise.
            </p>
          </div>

          {/* ── Section 2: A Brief History of Vedic Time-Keeping ── */}
          <div className="flex flex-col items-start mb-8 sm:mb-10">
            <div className="mb-3.5">
              <BilingualPill
                hi="वैदिक काल-गणना का इतिहास"
                en="A Brief History of Vedic Time-Keeping"
                size="md"
                variant="light"
              />
            </div>

            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2.5 text-justify">
              ऋग्वेद में समय की पहली गणना &apos;मुहूर्त&apos; के रूप में मिलती है — एक सूर्योदय से दूसरे सूर्योदय तक 30 मुहूर्त, प्रत्येक मुहूर्त में 30 काल और प्रत्येक काल में 30 काष्ठा। इस प्रकार प्राचीन भारत एक 30-घंटे की समय-प्रणाली का उपयोग करता था, जिसमें सूर्योदय से सूर्यास्त तक 15 मुहूर्त और सूर्यास्त से अगले सूर्योदय तक शेष 15 मुहूर्त होते थे। यांत्रिक तकनीक की सीमाओं के कारण 20वीं सदी तक इस प्रणाली पर आधारित घड़ियाँ बनाना संभव नहीं था, और सन् 1884 में 24-घंटे की प्रणाली को वैश्विक मानक के रूप में अपना लिया गया। अब डिजिटल तकनीक की मदद से इस प्राचीन, सूर्योदय-आधारित प्रणाली को पुनः जीवित किया जा सकता है।
            </p>

            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed text-justify">
              The Rig Veda contains the earliest known unit of time, the &apos;Muhurta&apos; — 30 of them between one sunrise and the next, each split into 30 Kala, each Kala into 30 Kashtha. Ancient India effectively worked on a 30-hour clock, with 15 Muhurtas from sunrise to sunset and the remaining 15 from sunset to the next sunrise. Mechanical clockwork couldn&apos;t support a system this granular until the 20th century, and the 24-hour system was adopted worldwide in 1884. With digital technology, this older, sunrise-based system can now be brought back to life.
            </p>
          </div>

          {/* ── Section 3: Why Anchor Time to Sunrise? ── */}
          <div className="flex flex-col items-start mb-8 sm:mb-10">
            <div className="mb-3.5">
              <BilingualPill
                hi="सूर्योदय ही क्यों?"
                en="Why Anchor Time to Sunrise?"
                size="md"
                variant="light"
              />
            </div>

            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2.5 text-justify">
              वैदिक ऋषियों ने एक ऐसी समय-प्रणाली विकसित की जो मनुष्य को प्रकृति से जोड़े, क्योंकि यह पृथ्वी की सूर्य के सापेक्ष स्थिति पर आधारित है। आज का कैलेंडर भी सूर्य पर आधारित है, परंतु दिन की गणना मध्यरात्रि (24:00) से होती है — एक मनमाना, प्रकृति से असंबद्ध बिंदु। वैदिक प्रणाली में तिथि सदैव सूर्योदय पर बदलती है, अर्थात प्रत्येक स्थान पर सुबह ठीक 00:00 बजे सूर्योदय होता है। इससे दिन की गणना कहीं अधिक सहज और सटीक हो जाती है।
            </p>

            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed text-justify">
              The Vedic Rishis designed a time system that keeps people connected to nature, since it&apos;s based on the earth&apos;s position relative to the sun. Today&apos;s calendar is also solar, but the day still resets at an arbitrary point — midnight. In the Vedic system, the date instead changes at sunrise, so the clock always reads 00:00 the moment the sun rises at that location — a more intuitive and precise way of marking a day.
            </p>
          </div>

          {/* ── Callout: One More Thing (Daylight Saving Alignment) ── */}
          <section className="w-full mt-2">
            <div className="border-2 border-dashed border-[#B8873D]/60 bg-[#FAF4EA] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
              <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-3 text-justify">
                <strong className="font-bold text-[#3D2314]">
                  एक और बात · One more thing
                </strong>{" "}
                — कई देश डेलाइट सेविंग टाइम का उपयोग करते हैं, जिससे सूर्योदय का समय स्थिर 24-घंटे की घड़ी पर प्रतिदिन बदलता दिखता है। एक सूर्योदय-आधारित घड़ी में यह भ्रम नहीं रहता — हर जगह सूर्योदय सदैव 00:00 पर होता है, और हर देश, राज्य व शहर का अपना स्थानीय वैदिक समय होता है, जो वहाँ की कार्य-संस्कृति को प्रकृति के अनुरूप व्यवस्थित करता है।
              </p>

              <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed text-justify">
                Many countries use daylight saving time, which makes sunrise appear to shift daily on a fixed 24-hour clock. A sunrise-based clock removes that confusion — sunrise is always 00:00, everywhere — and every country, state, and city gets its own local Vedic time, keeping daily rhythms aligned with nature.
              </p>
            </div>
          </section>
        </article>


        {/* ========================================================
            CHAPTER 2: THE VEDIC UNITS OF TIME (वैदिक समय की इकाइयाँ)
           ======================================================== */}
        <article
          id="chapter-2"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 02
            </span>
          </div>

          {/* Header Capsule */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                वैदिक समय की इकाइयाँ
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                The Vedic Units of Time
              </span>
            </div>
          </div>

          {/* Intro Text */}
          <div className="mb-6 sm:mb-8 text-left">
            <h3 className="font-hindi text-base sm:text-lg font-bold text-[#2D1B0E] leading-snug">
              प्राचीन वैदिक ग्रंथों (सूर्य सिद्धांत व विष्णु पुराण) में समय की सूक्ष्म से स्थूल इकाइयाँ:
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#5C4230] mt-1 leading-relaxed">
              Ancient Vedic texts (Surya Siddhanta & Vishnu Purana) calibrate time from atomic moments to full cycles:
            </p>
          </div>

          {/* ── Table Container 1: Vedic Time Units Hierarchy (Matching media_1791463915816) ── */}
          <div className="w-full bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm mb-8">
            <div className="px-2 sm:px-4 pt-1 pb-3 sm:pb-4 border-b border-[#DFCBB5]/50 flex items-center justify-between">
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#8C5D33] uppercase">
                VEDIC TIME UNITS (NO DEITY/NATURE TAGS)
              </span>
              <span className="font-sans text-[10.5px] text-[#70523C]/70">
                Microsecond to Macro Cycles
              </span>
            </div>
            <div className="divide-y divide-[#DFCBB5]/40">
              <PanchangTableRow
                index={1}
                nameHi="त्रुटि"
                nameEn="Truti"
                detail="= 29.6 microseconds"
                variant="parchment"
              />
              <PanchangTableRow
                index={2}
                nameHi="तत्पर"
                nameEn="Tatpara"
                detail="= 100 Truti ≈ 3.2 milliseconds"
                variant="parchment"
              />
              <PanchangTableRow
                index={3}
                nameHi="निमेष"
                nameEn="Nimesha"
                detail="= 45 Tatpara ≈ 0.13 seconds (one eye-blink)"
                variant="parchment"
              />
              <PanchangTableRow
                index={4}
                nameHi="काष्ठा"
                nameEn="Kashtha"
                detail="= 18 Nimesha ≈ 2.4 seconds"
                variant="parchment"
              />
              <PanchangTableRow
                index={5}
                nameHi="कला"
                nameEn="Kala"
                detail="= 30 Kashtha ≈ 72 seconds"
                variant="parchment"
              />
              <PanchangTableRow
                index={6}
                nameHi="घटी"
                nameEn="Ghati"
                detail="= 30 Kala ≈ 24 minutes (60 Ghati per day)"
                variant="parchment"
              />
              <PanchangTableRow
                index={7}
                nameHi="मुहूर्त"
                nameEn="Muhurta"
                detail="= 2 Ghati ≈ 48 minutes (30 Muhurtas per day)"
                variant="parchment"
              />
            </div>
          </div>

          {/* ── Table Container 2: Digital Clock Dial Units ── */}
          <div className="mb-4 text-left">
            <h4 className="font-hindi text-sm sm:text-base font-bold text-[#2D1B0E] leading-snug">
              विक्रमादित्य वैदिक घड़ी के 3 मुख्य अंक:
            </h4>
            <p className="font-sans text-xs sm:text-[13px] text-[#5C4230] mt-0.5 leading-relaxed">
              The 3 digital counter units active on the clock face:
            </p>
          </div>

          <div className="w-full bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm mb-6 sm:mb-8">
            <div className="px-2 sm:px-4 pt-1 pb-3 sm:pb-4 border-b border-[#DFCBB5]/50 flex items-center justify-between">
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#8C5D33] uppercase">
                CLOCK DIAL UNITS · घड़ी की मुख्य इकाइयाँ
              </span>
              <span className="font-sans text-[10.5px] text-[#70523C]/70">
                1 Sunrise = 30 Muhurtas
              </span>
            </div>
            <div className="divide-y divide-[#DFCBB5]/40">
              <PanchangTableRow
                index={1}
                nameHi="मुहूर्त"
                nameEn="Muhurta"
                detail="= 30 संख्या/दिन ≈ 48 मिनट (विषुव पर)"
                secondary="30 per day"
                variant="parchment"
              />
              <PanchangTableRow
                index={2}
                nameHi="कला"
                nameEn="Kala"
                detail="= 900 (30×30) ≈ 96 सेकंड"
                secondary="900 per day"
                variant="parchment"
              />
              <PanchangTableRow
                index={3}
                nameHi="काष्ठा"
                nameEn="Kashtha"
                detail="= 27,000 (30×30×30) ≈ 3.2 सेकंड"
                secondary="27,000 per day"
                variant="parchment"
              />
            </div>
          </div>

          {/* ── Callout Box with Left Accent Bar ── */}
          <div className="w-full bg-[#EFE4D3] border-l-4 border-[#A36D31] rounded-r-2xl p-4 sm:p-5 shadow-sm">
            <p className="font-hindi text-sm sm:text-[15px] font-bold text-[#2D1B0E] leading-relaxed mb-1.5 text-left">
              घड़ी पर दिखने वाला समय जैसे 11:10:20 इसी तरह पढ़ा जाता है — 11वाँ मुहूर्त, 10वीं कला, 20वीं काष्ठा।
            </p>
            <p className="font-sans text-xs sm:text-[13px] text-[#5C4230] leading-relaxed text-left">
              So a reading like 11:10:20 on the clock means: the 11th Muhurta, 10th Kala, 20th Kashtha of the current day.
            </p>
          </div>
        </article>


        {/* ========================================================
            CHAPTER 3: THE FIVE LIMBS OF THE PANCHANG (पंचांग के पाँच अंग)
           ======================================================== */}
        <article
          id="chapter-3"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 03
            </span>
          </div>

          {/* Header Capsule */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                पंचांग के पाँच अंग
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                The Five Limbs of the Panchang
              </span>
            </div>
          </div>

          {/* Intro Text */}
          <div className="mb-6 sm:mb-8 text-left">
            <h3 className="font-hindi text-base sm:text-lg font-bold text-[#2D1B0E] leading-snug">
              पंचांग पाँच मूल तत्वों से मिलकर बनता है — तिथि, वार, नक्षत्र, योग और करण। प्रत्येक दिन का चरित्र इन्हीं पाँच अंगों से तय होता है।
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#5C4230] mt-1.5 leading-relaxed">
              The Panchang (Vedic almanac) is built from five core elements — Tithi, Vara, Nakshatra, Yoga and Karana. Together, they define the character of every single day.
            </p>
          </div>

          <GoldDivider variant="light" className="my-6 max-w-sm mx-auto" />

          {/* ────────────────────────────────────────────────────────
              LIMB 1: TITHI (तिथि — चंद्र दिवस)
             ──────────────────────────────────────────────────────── */}
          <section className="mb-12 sm:mb-14">
            <div className="mb-3.5">
              <BilingualPill
                hi="1. तिथि — चंद्र दिवस"
                en="1. Tithi — The Lunar Day"
                size="md"
                variant="light"
              />
            </div>

            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2 text-justify">
              एक चंद्र मास में 30 तिथियाँ होती हैं — 15 शुक्ल पक्ष (बढ़ता चंद्रमा) और 15 कृष्ण पक्ष (घटता चंद्रमा) में।
            </p>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed mb-5 text-justify">
              A lunar month has 30 Tithis — 15 in Shukla Paksha (waxing moon) and 15 in Krishna Paksha (waning moon).
            </p>

            {/* Sacred Days Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="bg-[#FAF4EA] border border-[#D9C4AB] rounded-2xl p-4 shadow-sm">
                <span className="font-hindi font-bold text-base text-[#3D2314] block">
                  एकादशी · <span className="font-sans font-medium text-xs text-[#8C5D33]">Ekadashi</span>
                </span>
                <p className="font-sans text-xs text-[#5C4230] mt-1.5 leading-relaxed">
                  A sacred day dedicated to fasting, spiritual reflection, and inner cleansing.
                </p>
              </div>

              <div className="bg-[#FAF4EA] border border-[#D9C4AB] rounded-2xl p-4 shadow-sm">
                <span className="font-hindi font-bold text-base text-[#3D2314] block">
                  पूर्णिमा · <span className="font-sans font-medium text-xs text-[#8C5D33]">Purnima</span>
                </span>
                <p className="font-sans text-xs text-[#5C4230] mt-1.5 leading-relaxed">
                  The radiant full moon; a powerful threshold for worship, celebration, and rituals.
                </p>
              </div>

              <div className="bg-[#FAF4EA] border border-[#D9C4AB] rounded-2xl p-4 shadow-sm">
                <span className="font-hindi font-bold text-base text-[#3D2314] block">
                  अमावस्या · <span className="font-sans font-medium text-xs text-[#8C5D33]">Amavasya</span>
                </span>
                <p className="font-sans text-xs text-[#5C4230] mt-1.5 leading-relaxed">
                  The dark new moon; reserved for contemplation, rest, and sacred ancestor rites.
                </p>
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              LIMB 2: VARA (वार — सप्ताह का दिन)
             ──────────────────────────────────────────────────────── */}
          <section className="mb-12 sm:mb-14">
            <div className="mb-3.5">
              <BilingualPill
                hi="2. वार — सप्ताह का दिन"
                en="2. Vara — The Day of the Week"
                size="md"
                variant="light"
              />
            </div>

            {/* ── 7-Day Vara Table (Using M5: PanchangTableRow) ── */}
            <div className="w-full bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm mb-12 sm:mb-14">
              <div className="px-2 sm:px-4 pt-1 pb-3 sm:pb-4 border-b border-[#DFCBB5]/50 flex items-center justify-between">
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#8C5D33] uppercase">
                  VARA LIST · सात वार व स्वामी ग्रह
                </span>
                <span className="font-sans text-[10.5px] text-[#70523C]/70">
                  7 Solar Days
                </span>
              </div>
              <div className="divide-y divide-[#DFCBB5]/40">
                {VARA_ITEMS.map((item, idx) => (
                  <PanchangTableRow
                    key={item.dayEn}
                    index={idx + 1}
                    nameHi={item.dayHi}
                    nameEn={item.dayEn}
                    secondary={item.planetEn}
                    secondaryHi={item.planetHi}
                    detail={item.meaningEn}
                    detailHi={item.meaningHi}
                    variant="parchment"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              LIMB 3: NAKSHATRA (नक्षत्र — 27 नक्षत्र)
             ──────────────────────────────────────────────────────── */}
          <section className="mb-12 sm:mb-14">
            <div className="mb-3.5">
              <BilingualPill
                hi="3. नक्षत्र — 27 नक्षत्र"
                en="3. Nakshatra — The 27 Lunar Mansions"
                size="md"
                variant="light"
              />
            </div>

            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2 text-justify">
              चंद्रमा प्रतिदिन एक नक्षत्र में रहता है; प्रत्येक नक्षत्र आकाश के 13°20&apos; भाग को दर्शाता है और मन तथा भावनाओं को प्रभावित करता है।
            </p>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed mb-6 text-justify">
              The Moon occupies one Nakshatra each day; each spans 13°20&apos; of sky and colours the day&apos;s mental and emotional tone.
            </p>

            {/* 3-Column Grid for 27 Nakshatras */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {NAKSHATRA_ITEMS.map((item) => (
                <div
                  key={item.num}
                  className="bg-[#FAF4EA] border border-[#D9C4AB] rounded-xl p-3 sm:p-3.5 shadow-sm hover:border-[#B8873D] transition-colors"
                >
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-sans text-[11px] font-bold text-[#8C5D33]">
                      {item.num}.
                    </span>
                    <span className="font-hindi font-bold text-sm text-[#3D2314]">
                      {item.hi}
                    </span>
                    <span className="text-[#8C5D33] text-xs">·</span>
                    <span className="font-sans text-xs text-[#70523C] font-medium">
                      {item.en}
                    </span>
                  </div>
                  <p className="font-hindi text-[11.5px] text-[#2D1B0E] font-medium leading-tight">
                    {item.descHi}
                  </p>
                  <p className="font-sans text-[10.5px] text-[#70523C] leading-tight mt-0.5">
                    {item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              LIMB 4: YOGA (योग — 27 योग)
             ──────────────────────────────────────────────────────── */}
          <section className="mb-12 sm:mb-14">
            <div className="mb-3.5">
              <BilingualPill
                hi="4. योग — 27 योग"
                en="4. Yoga — The 27 Yogas"
                size="md"
                variant="light"
              />
            </div>

            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2 text-justify">
              योग सूर्य और चंद्रमा की संयुक्त स्थिति से बनता है और दिन के समग्र फल को दर्शाता है।
            </p>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed mb-6 text-justify">
              A Yoga arises from the combined position of the Sun and Moon, and reflects the overall outcome-tendency of the day.
            </p>

            {/* 3-Column Grid for 27 Yogas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {YOGA_ITEMS.map((item) => (
                <div
                  key={item.num}
                  className="bg-[#FAF4EA] border border-[#D9C4AB] rounded-xl p-3 sm:p-3.5 shadow-sm hover:border-[#B8873D] transition-colors"
                >
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-sans text-[11px] font-bold text-[#8C5D33]">
                      {item.num}.
                    </span>
                    <span className="font-hindi font-bold text-sm text-[#3D2314]">
                      {item.hi}
                    </span>
                    <span className="text-[#8C5D33] text-xs">·</span>
                    <span className="font-sans text-xs text-[#70523C] font-medium">
                      {item.en}
                    </span>
                  </div>
                  <p className="font-hindi text-[11.5px] text-[#2D1B0E] font-medium leading-tight">
                    {item.descHi}
                  </p>
                  <p className="font-sans text-[10.5px] text-[#70523C] leading-tight mt-0.5">
                    {item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              LIMB 5: KARANA (करण — 11 करण)
             ──────────────────────────────────────────────────────── */}
          <section className="mb-4">
            <div className="mb-3.5">
              <BilingualPill
                hi="5. करण — 11 करण"
                en="5. Karana — The 11 Karanas"
                size="md"
                variant="light"
              />
            </div>

            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2 text-justify">
              प्रत्येक तिथि दो करण में बँटी होती है — कुल 11 नाम हैं, जिनमें से 7 बार-बार आते हैं और 4 स्थिर हैं।
            </p>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed mb-6 text-justify">
              Each Tithi splits into two Karanas. There are 11 names in all — 7 repeat through the month, and 4 are fixed.
            </p>

            {/* ── 11 Karanas Table (Using M5: PanchangTableRow) ── */}
            <div className="w-full bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm mb-4">
              <div className="px-2 sm:px-4 pt-1 pb-3 sm:pb-4 border-b border-[#DFCBB5]/50 flex items-center justify-between">
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#8C5D33] uppercase">
                  KARANA LIST · ग्यारह करण
                </span>
                <span className="font-sans text-[10.5px] text-[#70523C]/70">
                  7 Repeating · 4 Fixed
                </span>
              </div>
              <div className="divide-y divide-[#DFCBB5]/40">
                {KARANA_ITEMS.map((item) => (
                  <PanchangTableRow
                    key={item.en}
                    index={item.num}
                    nameHi={item.hi}
                    nameEn={item.en}
                    badge={`${item.typeHi} · ${item.typeEn}`}
                    detail={item.descEn}
                    detailHi={item.descHi}
                    variant="parchment"
                  />
                ))}
              </div>
            </div>
          </section>

        </article>

        {/* ========================================================
            CHAPTER 4: THE 30 DAILY MUHURTAS (तीस नित्य-मुहूर्त)
           ======================================================== */}
        <article
          id="chapter-4"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 04
            </span>
          </div>

          {/* Header Capsule */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                तीस नित्य-मुहूर्त
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                The 30 Daily Muhurtas
              </span>
            </div>
          </div>

          {/* Intro Text */}
          <div className="mb-6 sm:mb-8 text-left">
            <h3 className="font-hindi text-base sm:text-lg font-bold text-[#2D1B0E] leading-snug">
              दिन के 30 भाग — प्रत्येक का अपना स्वभाव और मार्गदर्शन है। विषुव पर एक मुहूर्त ≈ 48 मिनट का होता है।
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#5C4230] mt-1.5 leading-relaxed">
              The 30 parts of the day — each with its own nature and guidance. On the equinox, one Muhurta ≈ 48 minutes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setMuhurtaFilter("all")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer font-medium",
                muhurtaFilter === "all"
                  ? "bg-[#482D1C] text-[#FFF9F0] shadow-sm"
                  : "bg-[#EEDEC8]/70 text-[#482D1C] hover:bg-[#EEDEC8]"
              )}
            >
              समग्र ३० · All 30
            </button>
            <button
              type="button"
              onClick={() => setMuhurtaFilter("day")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer font-medium",
                muhurtaFilter === "day"
                  ? "bg-[#482D1C] text-[#FFF9F0] shadow-sm"
                  : "bg-[#EEDEC8]/70 text-[#482D1C] hover:bg-[#EEDEC8]"
              )}
            >
              दिवस १–१५ · Day (1–15)
            </button>
            <button
              type="button"
              onClick={() => setMuhurtaFilter("night")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer font-medium",
                muhurtaFilter === "night"
                  ? "bg-[#482D1C] text-[#FFF9F0] shadow-sm"
                  : "bg-[#EEDEC8]/70 text-[#482D1C] hover:bg-[#EEDEC8]"
              )}
            >
              रात्रि १६–३० · Night (16–30)
            </button>
            <button
              type="button"
              onClick={() => setMuhurtaFilter("auspicious")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer font-medium",
                muhurtaFilter === "auspicious"
                  ? "bg-[#256029] text-white shadow-sm"
                  : "bg-[#EAF5E9] text-[#256029] hover:bg-[#D5EED4]"
              )}
            >
              शुभ · Auspicious
            </button>
            <button
              type="button"
              onClick={() => setMuhurtaFilter("inauspicious")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer font-medium",
                muhurtaFilter === "inauspicious"
                  ? "bg-[#A63620] text-white shadow-sm"
                  : "bg-[#FDECE8] text-[#A63620] hover:bg-[#F9D8D2]"
              )}
            >
              अशुभ · Inauspicious
            </button>
          </div>

          {/* ── 30 Muhurtas Document Table (Exact match of media_1791465161128) ── */}
          <div className="w-full bg-[#FAF5EC] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
            {/* Desktop / Tablet Header Row (md and above) */}
            <div className="hidden md:flex w-full bg-[#482D1C] text-[#FFF9F0] py-3.5 px-6 items-center gap-4 font-sans text-sm font-bold select-none">
              <div className="w-12 text-center shrink-0">#</div>
              <div className="w-36 shrink-0 text-left">मुहूर्त · Muhurta</div>
              <div className="w-44 shrink-0 text-left">प्रकृति · Nature</div>
              <div className="flex-1 min-w-[130px] text-left">करें · Do</div>
              <div className="flex-1 min-w-[130px] text-left">न करें · Avoid</div>
            </div>

            {/* Mobile Header Bar (< md) */}
            <div className="md:hidden w-full bg-[#482D1C] text-[#FFF9F0] py-3 px-4 flex items-center justify-between font-sans text-xs font-bold select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5A84B]" />
                <span className="tracking-wide">३० नित्य-मुहूर्त · 30 MUHURTAS</span>
              </div>
              <span className="text-[#DFCBB5] text-[11px] font-normal">दैनिक मुहूर्त विवरण</span>
            </div>

            {/* Table Rows (Zebra striped: alternating #FAF5EC and #F2E6D4) */}
            <div className="w-full divide-y divide-[#DFCBB5]/40">
              {filteredMuhurtas.map((item, idx) => (
                <PanchangTableRow
                  key={item.num}
                  index={item.num}
                  nameHi={item.hi}
                  nameEn={item.en}
                  natureLabelHi={item.natureHi}
                  natureLabelEn={item.natureEn}
                  detailHi={item.doHi}
                  detail={item.doEn}
                  avoidHi={item.avoidHi}
                  avoid={item.avoidEn}
                  variant="document"
                  isHighlighted={selectedMuhurta === item.num}
                  onClick={() => setSelectedMuhurta(item.num)}
                  className={idx % 2 === 1 ? "bg-[#F2E6D4]" : "bg-[#FAF5EC]"}
                />
              ))}
            </div>
          </div>
        </article>

        {/* ========================================================
            CHAPTER 5: RASHI — ZODIAC SIGNS (राशि — सूर्य व चंद्र)
           ======================================================== */}
        <article
          id="chapter-5"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 05
            </span>
          </div>

          {/* Header Capsule (Matching book document scan media_1791472831537) */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                राशि — सूर्य व चंद्र
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                Rashi — Zodiac Signs
              </span>
            </div>
          </div>

          {/* ── Top Callouts (Surya Rashi & Chandra Rashi) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* Surya Rashi Card */}
            <div className="flex flex-col items-start bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="mb-3">
                <BilingualPill
                  hi="सूर्य राशि"
                  en="Surya Rashi"
                  size="md"
                  variant="light"
                />
              </div>
              <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2 text-justify">
                सूर्य की स्थिति; आत्मा, जीवनशक्ति और मासिक प्रवाह को दर्शाती है।
              </p>
              <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed text-justify">
                Position of the Sun; reflects the soul, vitality, and month-long tone.
              </p>
            </div>

            {/* Chandra Rashi Card */}
            <div className="flex flex-col items-start bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="mb-3">
                <BilingualPill
                  hi="चंद्र राशि"
                  en="Chandra Rashi"
                  size="md"
                  variant="light"
                />
              </div>
              <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2 text-justify">
                चंद्रमा की स्थिति; मन, भावनाएँ और दैनिक परिणाम को दर्शाती है।
              </p>
              <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed text-justify">
                Position of the Moon; reflects the mind, emotions, and day-to-day results.
              </p>
            </div>
          </div>

          {/* ── Subheading Pill: 12 Signs ── */}
          <div className="flex items-center gap-2 mb-4">
            <BilingualPill
              hi="12 राशियाँ"
              en="The 12 Signs"
              size="md"
              variant="light"
            />
          </div>

          {/* ── 12 Signs Document Table (Exact match of media_1791472831537 using M5 PanchangTableRow) ── */}
          <div className="w-full bg-[#FAF5EC] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
            {/* Header Row (Deep walnut bar matching screenshot) */}
            <div className="w-full bg-[#482D1C] text-[#FFF9F0] py-3.5 px-3.5 sm:px-6 flex items-center justify-between font-sans text-xs sm:text-sm font-bold select-none">
              <div className="w-1/2 sm:w-2/5 shrink-0 text-left">
                राशि · Sign
              </div>
              <div className="flex-1 text-left">
                भाव · Signifies
              </div>
            </div>

            {/* 12 Rows using M5 PanchangTableRow (Zebra striped: alternating #FAF5EC and #F2E6D4) */}
            <div className="w-full divide-y divide-[#DFCBB5]/40">
              {RASHI_GUIDE_ITEMS.map((item, idx) => (
                <PanchangTableRow
                  key={item.en}
                  index={item.num}
                  nameHi={item.hi}
                  nameEn={item.en}
                  detailHi={item.signifiesHi}
                  detail={item.signifiesEn}
                  variant="document"
                  className={idx % 2 === 1 ? "bg-[#F2E6D4]" : "bg-[#FAF5EC]"}
                />
              ))}
            </div>
          </div>
        </article>

        {/* ========================================================
            CHAPTER 6: THE VIKRAM SAMVAT CALENDAR (विक्रम संवत् पंचांग)
           ======================================================== */}
        <article
          id="chapter-6"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 06
            </span>
          </div>

          {/* Header Capsule (Matching book document scan media_1791473243986) */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                विक्रम संवत् पंचांग
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                The Vikram Samvat Calendar
              </span>
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="mb-8 text-left">
            <p className="font-hindi text-sm sm:text-base text-[#2D1B0E] font-medium leading-relaxed mb-2.5 text-justify">
              विक्रम संवत् भारत का परंपरागत कैलेंडर है, जिसका प्रारंभ राजा विक्रमादित्य द्वारा 57 ईसा पूर्व में हुआ माना जाता है। इसमें संवत् वर्ष, चंद्र मास, पक्ष, तिथि और वार एक साथ दिखते हैं, और भारत के सभी पारंपरिक त्योहार व अनुष्ठान इसी पंचांग पर आधारित होते हैं।
            </p>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#5C4230] leading-relaxed text-justify">
              Vikram Samvat is India&apos;s traditional calendar, said to begin with King Vikramaditya in 57 BCE. It brings together the Samvat year, lunar month, Paksha, Tithi, and weekday in one view — and nearly every traditional Indian festival and ritual is timed against it.
            </p>
          </div>

          {/* ── Subheading Pill: How to Read the Panchang at a Glance ── */}
          <div className="flex items-center gap-2 mb-4">
            <BilingualPill
              hi="घड़ी का प्रयोग कैसे करें"
              en="How to Read the Panchang at a Glance"
              size="md"
              variant="light"
            />
          </div>

          {/* ── Checklist / Steps Box (Matching media_1791473243986) ── */}
          <div className="w-full bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm">
            <div className="flex flex-col divide-y divide-[#DFCBB5]/40">
              {PANCHANG_READING_STEPS.map((step, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3 sm:gap-4">
                  <span className="text-[#482D1C] font-bold text-lg sm:text-xl leading-none mt-0.5">•</span>
                  <div className="flex flex-col text-left">
                    <span className="font-hindi font-bold text-sm sm:text-base text-[#2D1B0E] leading-snug">
                      {step.titleHi}
                    </span>
                    <span className="font-sans text-xs sm:text-[13px] text-[#5C4230] mt-1 leading-relaxed">
                      {step.descEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>


        {/* ========================================================
            CHAPTER 7: READING YOUR CLOCK (अपनी घड़ी को पढ़ना)
           ======================================================== */}
        <article
          id="chapter-7"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 07
            </span>
          </div>

          {/* Header Capsule */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                अपनी घड़ी को पढ़ना
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                Reading Your Clock
              </span>
            </div>
          </div>

          {/* Core Concept Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl p-4 sm:p-5 shadow-sm text-left">
              <span className="font-hindi font-bold text-base text-[#3D2314] block">
                मुहूर्त सुई · <span className="font-sans font-medium text-xs text-[#8C5D33]">Muhurta Hand</span>
              </span>
              <p className="font-sans text-xs text-[#5C4230] mt-1.5 leading-relaxed">
                Completes one full revolution of 30 Muhurtas in a single day (one sunrise to the next).
              </p>
            </div>

            <div className="bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl p-4 sm:p-5 shadow-sm text-left">
              <span className="font-hindi font-bold text-base text-[#3D2314] block">
                कला सुई · <span className="font-sans font-medium text-xs text-[#8C5D33]">Kala Hand</span>
              </span>
              <p className="font-sans text-xs text-[#5C4230] mt-1.5 leading-relaxed">
                Marks the 30 subdivisions within each Muhurta (1 Kala ≈ 96 seconds).
              </p>
            </div>

            <div className="bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl p-4 sm:p-5 shadow-sm text-left">
              <span className="font-hindi font-bold text-base text-[#3D2314] block">
                काष्ठा सुई · <span className="font-sans font-medium text-xs text-[#8C5D33]">Kashtha Hand</span>
              </span>
              <p className="font-sans text-xs text-[#5C4230] mt-1.5 leading-relaxed">
                The continuous rhythm of seconds (30 Kashtha per Kala ≈ 3.2 seconds each).
              </p>
            </div>
          </div>

          {/* Reading Formula */}
          <div className="w-full bg-[#EFE4D3] border-l-4 border-[#A36D31] rounded-r-2xl p-4 sm:p-5 shadow-sm text-left">
            <p className="font-hindi text-sm sm:text-[15px] font-bold text-[#2D1B0E] leading-relaxed mb-1">
              वैदिक समय पठन सूत्र: [मुहूर्त] : [कला] : [काष्ठा]
            </p>
            <p className="font-sans text-xs sm:text-[13px] text-[#5C4230] leading-relaxed">
              Standard Vedic Display: Muhurta : Kala : Kashtha calculated from local sunrise.
            </p>
          </div>
        </article>


        {/* ========================================================
            CHAPTER 8: USING THE CLOCK DAILY (घड़ी का दैनिक उपयोग)
           ======================================================== */}
        <article
          id="chapter-8"
          className="w-full bg-[#F8F2E8] border border-[#DFCBB5] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_12px_40px_rgba(72,45,28,0.08)] flex flex-col scroll-mt-24"
        >
          {/* Quick Nav back to TOC */}
          <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-[#DFCBB5]/60 text-xs font-sans">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#8C5D33] hover:text-[#3D2314] font-medium transition-colors cursor-pointer"
            >
              <span>↑</span>
              <span>विषय-सूची · Table of Contents</span>
            </button>
            <span className="text-[#8C5D33]/70 font-mono tracking-wider">
              CHAPTER 08
            </span>
          </div>

          {/* Header Capsule (Matching book document scan media_1791473252269) */}
          <div className="w-full flex justify-center mb-8 sm:mb-10">
            <div className="w-full max-w-lg bg-[#482D1C] rounded-full py-3.5 sm:py-4 px-6 sm:px-10 text-center shadow-[0_6px_20px_rgba(72,45,28,0.25)] flex flex-col items-center">
              <span className="font-hindi text-xl sm:text-2xl md:text-3xl text-[#FFF9F0] font-bold leading-tight tracking-wide">
                घड़ी का दैनिक उपयोग
              </span>
              <span className="font-serif text-xs sm:text-sm text-[#DFCBB5] tracking-wider mt-1">
                Using the Clock Daily
              </span>
            </div>
          </div>

          {/* ── Daily Checklist Box (Matching media_1791473252269) ── */}
          <div className="w-full bg-[#FAF4EA] border border-[#DFCBB5] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm">
            <div className="flex flex-col divide-y divide-[#DFCBB5]/40">
              {DAILY_USE_STEPS.map((step, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3 sm:gap-4">
                  <span className="text-[#482D1C] font-bold text-lg sm:text-xl leading-none mt-0.5">•</span>
                  <div className="flex flex-col text-left">
                    <span className="font-hindi font-bold text-sm sm:text-base text-[#2D1B0E] leading-snug">
                      {step.titleHi}
                    </span>
                    <span className="font-sans text-xs sm:text-[13px] text-[#5C4230] mt-1 leading-relaxed">
                      {step.descEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

      </main>

      {/* Grounded Luxury Footer */}
      <Footer variant="parchment" />
    </div>
  );
}
