/**
 * ══════════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT: AUTO-HIGHLIGHT & ENRICH SEO KEYWORDS
 * ══════════════════════════════════════════════════════════════════
 * 
 * HOW TO RUN IN 30 SECONDS:
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/18mwgxwrvCUQDTd4t2bUIugA5NGwbn81k9OY9aOmiPIc/edit
 * 2. In the top navigation menu, click:
 *    Extensions > Apps Script
 * 3. Delete any default placeholder code (e.g., function myFunction()),
 *    paste this ENTIRE script, and click the Save icon (💾).
 * 4. Click the "Run" button (▶) at the top toolbar.
 *    (If Google asks for authorization, click Advanced > Go to Untitled project).
 * 5. Return to your Google Sheet tab:
 *    - Row headers will have "Website Status" and "Pages Found" added.
 *    - 26 Exact Matches are highlighted in Soft Pastel Green (#D4EDDA).
 *    - 104 Entity Matches are highlighted in Soft Pastel Gold/Yellow (#FFF3CD).
 *    - 81 Archival/Competitor queries are marked in Neutral Light Gray (#F8F9FA).
 *    - 35 Brand New High-Value Keywords from your website are appended
 *      at the bottom and highlighted in Soft Pastel Purple (#E2D9F3)!
 */

function highlightAndEnrichKeywords() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // 1. Setup Status and Location Headers in Columns H and I
  sheet.getRange(1, 8).setValue("Website Status");
  sheet.getRange(1, 9).setValue("Pages Found / Notes");
  sheet.getRange(1, 1, 1, 9).setFontWeight("bold");

  // 2. Exact Matches (26 Keywords)
  const EXACT_LIST = [
  "hindu calendar",
  "aaj ka panchang",
  "panchang for today",
  "panchang",
  "hindi panchang",
  "indian calendar",
  "panchang calendar",
  "calendar tithi",
  "hindu calendar online",
  "ka panchang",
  "today tithi and panchang",
  "vikram samvat",
  "calendar vikram samvat",
  "dainik panchang",
  "panchang calculator",
  "vikram samvat calendar",
  "vedic clock",
  "vedic clock online",
  "vikramaditya vedic clock",
  "panchang clock",
  "ujjain prime meridian",
  "vaidik clock",
  "vedic astronomical clock",
  "vedic clock price in india",
  "vedic clock for temples",
  "vedic timekeeping system"
];
  const exactSet = new Set(EXACT_LIST);

  // 3. Entity / Covered in Engine (104 Keywords)
  const ENTITY_LIST = [
  "calendar hindu calendar",
  "date of deepavali",
  "panchang drik",
  "hindu panchang",
  "2025 ka calendar",
  "aaj ka hindi panchang",
  "calendar hindu panchang",
  "date of holi",
  "drik panchang for today",
  "ganesh chaturthi dates",
  "hindi panchang today",
  "hindu calendar month",
  "hindu calendar of this month",
  "hindu calendar this month",
  "hindu calendar today",
  "hindu panchang today",
  "hindu tithi today",
  "kal ka panchang",
  "m panchang",
  "navratri dates",
  "panchang tithi today",
  "tithi panchang today",
  "tithi today panchang",
  "today s panchang",
  "today tithi hindi",
  "today tithi in panchang",
  "hindu festivals",
  "2024 ka calendar",
  "aaj ka hindu panchang",
  "aaj ka panchang tithi",
  "aaj ki tithi panchang",
  "aaj panchang",
  "according to hindu calendar what is today",
  "all hindu festival",
  "as per hindu calendar what is today",
  "calendar hindi",
  "calendar panchangam",
  "date panchang today",
  "day panchang",
  "deepavali calendar",
  "diwali calendar",
  "drik panchang calendar",
  "drik panchang com",
  "drik panchang hindu calendar",
  "drik panchang in hindi",
  "drik panchang rashi",
  "dussehra festival date",
  "e panchang",
  "hindi month calendar",
  "hindi month today",
  "hindi months of the year",
  "hindi panchang calendar",
  "hindi panchang today tithi",
  "hindi panchang tomorrow",
  "hindi tithi",
  "hindu almanac",
  "hindu calendar 2024",
  "hindu calendar date today",
  "hindu calendar day today",
  "hindu calendar drik panchang",
  "hindu calendar festival",
  "hindu calendar new year",
  "hindu calendar tithi",
  "hindu calendar tithi today",
  "hindu calendar year",
  "hindu date today",
  "hindu festival today",
  "hindu festival tomorrow",
  "hindu months",
  "hindu samvat calendar",
  "holi calendar",
  "indian calendar date today",
  "lakshmi calendar",
  "my panchang",
  "online panchang",
  "online panchangam",
  "panchang rashi",
  "panchang tomorrow in hindi",
  "this year deepavali date",
  "this year holi date",
  "to day panchang",
  "today calendar hindi",
  "today date according to hindu calendar",
  "today tithi as per hindu calendar",
  "today tithi panchang in hindi",
  "today vikram samvat",
  "today's tithi according to hindu calendar",
  "today's tithi according to hindu panchang",
  "tomorrow panchang in hindi",
  "tomorrow tithi panchang",
  "upcoming hindu festival",
  "vedic astrology calendar",
  "vikram calendar",
  "vikram samvat today",
  "vedic panchang",
  "panchang vedic astrology",
  "vedic hindu panchang",
  "vedic panchang 2022",
  "vedic panchang in hindi",
  "vedic panchang today",
  "vedic rishi panchang",
  "vedic time panchang",
  "ancient indian timekeeping system",
  "vedic calendar and panchang"
];
  const entitySet = new Set(ENTITY_LIST);

  // 4. Color Palette
  const COLOR_EXACT = "#D4EDDA";   // Soft Green
  const COLOR_ENTITY = "#FFF3CD";  // Soft Yellow/Gold
  const COLOR_UNUSED = "#F8F9FA";  // Neutral Gray
  const COLOR_NEW = "#E2D9F3";     // Soft Purple

  // 5. Update and color-code existing rows
  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 9);
    const values = dataRange.getValues();
    const backgrounds = dataRange.getBackgrounds();

    for (let i = 0; i < values.length; i++) {
      const kw = String(values[i][0]).trim().toLowerCase();
      if (!kw) continue;

      if (exactSet.has(kw)) {
        values[i][7] = "USED (Exact Match)";
        values[i][8] = "Live in Website Content & SEO Meta";
        for (let c = 0; c < 9; c++) backgrounds[i][c] = COLOR_EXACT;
      } else if (entitySet.has(kw)) {
        values[i][7] = "USED (Entity / Engine)";
        values[i][8] = "Calculated Live in Panchang Engine & Festivals";
        for (let c = 0; c < 9; c++) backgrounds[i][c] = COLOR_ENTITY;
      } else {
        values[i][7] = "NOT USED (Archival / Competitor)";
        values[i][8] = "Archival Year Query or Competitor Brand";
        for (let c = 0; c < 9; c++) backgrounds[i][c] = COLOR_UNUSED;
      }
    }
    dataRange.setValues(values);
    dataRange.setBackgrounds(backgrounds);
  }

  // 6. Append New High-Value Keywords from Website (35 Keywords)
  const newRows = [
  [
    "vedic horology",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Core Platform / Scientific Discipline",
    "NEW (Added from Website)",
    "Heritage, Clock, Home"
  ],
  [
    "zero meridian of ujjain",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Historical / Geographic AEO",
    "NEW (Added from Website)",
    "Heritage, Clock"
  ],
  [
    "prime meridian of ujjain",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Geographic / Historical SEO",
    "NEW (Added from Website)",
    "Heritage, Meta SEO"
  ],
  [
    "avantika meridian",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Historical Astronomical Meridian",
    "NEW (Added from Website)",
    "Heritage, Guide"
  ],
  [
    "ghati and vighati",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Time Unit (Vedic Chronometry)",
    "NEW (Added from Website)",
    "Clock, Guide, Home"
  ],
  [
    "ghati",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Time Unit (24 modern minutes)",
    "NEW (Added from Website)",
    "Clock, Guide"
  ],
  [
    "vighati",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Time Unit (24 modern seconds)",
    "NEW (Added from Website)",
    "Clock, Guide"
  ],
  [
    "brahma muhurta",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Circadian Muhurta (Creation Hour)",
    "NEW (Added from Website)",
    "Home, Guide, Blog"
  ],
  [
    "abhijit muhurta",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Auspicious Solar Midday Muhurta",
    "NEW (Added from Website)",
    "Guide, Blog"
  ],
  [
    "choghadiya",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Diurnal Astrological Time Windows",
    "NEW (Added from Website)",
    "Clock, Guide"
  ],
  [
    "choghadiya muhurta",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Astrological Muhurta Timing",
    "NEW (Added from Website)",
    "Clock, Guide"
  ],
  [
    "suryodaya",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Sunrise-based Diurnal Horizon",
    "NEW (Added from Website)",
    "Home, Heritage, Guide"
  ],
  [
    "sunrise to sunrise timekeeping",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Vedic Diurnal Concept",
    "NEW (Added from Website)",
    "Heritage, Home"
  ],
  [
    "lala devanagari numerals",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Horological Devanagari Dial Design",
    "NEW (Added from Website)",
    "Clock, Heritage"
  ],
  [
    "devanagari clock dial",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Product / Horological Design",
    "NEW (Added from Website)",
    "Clock, Catalogue"
  ],
  [
    "sidereal solar time",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Astronomical Principle",
    "NEW (Added from Website)",
    "Clock, Guide"
  ],
  [
    "lahiri ayanamsha",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Astro Calculation Engine",
    "NEW (Added from Website)",
    "Core Engine, Guide"
  ],
  [
    "ayanamsha",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Sidereal Coordinate Shift",
    "NEW (Added from Website)",
    "Core Engine, Guide"
  ],
  [
    "samvatsara",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "60-Year Jovian Solar Cycle",
    "NEW (Added from Website)",
    "Guide, Home"
  ],
  [
    "adhika masa",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Intercalary Lunar Month Calculation",
    "NEW (Added from Website)",
    "Guide, Core Engine"
  ],
  [
    "shukla paksha",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Waxing Lunar Fortnight",
    "NEW (Added from Website)",
    "Guide, Panchang, Home"
  ],
  [
    "krishna paksha",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Waning Lunar Fortnight",
    "NEW (Added from Website)",
    "Guide, Panchang, Home"
  ],
  [
    "nakshatra calculator",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Panchang Limb Calculator",
    "NEW (Added from Website)",
    "Clock, Guide"
  ],
  [
    "tithi calculator",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Panchang Limb Calculator",
    "NEW (Added from Website)",
    "Clock, Guide"
  ],
  [
    "27 nakshatras",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Lunar Mansions Reference",
    "NEW (Added from Website)",
    "Guide, Clock"
  ],
  [
    "vedic clock for institutions",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "B2B Commercial / Architectural Intent",
    "NEW (Added from Website)",
    "Institutions, Contact"
  ],
  [
    "monumental tower clock",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Monumental Civic / Temple Horology",
    "NEW (Added from Website)",
    "Institutions, Heritage"
  ],
  [
    "brass astronomical clock",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Hardware Horological Craftsmanship",
    "NEW (Added from Website)",
    "Institutions, Clock"
  ],
  [
    "surya siddhanta",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Foundational Astronomical Treatise",
    "NEW (Added from Website)",
    "Heritage, Blog, Guide"
  ],
  [
    "vedanga jyotisha",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Ancient Vedic Astronomy Canon",
    "NEW (Added from Website)",
    "Heritage, Blog"
  ],
  [
    "lagadha",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Ancient Avanti Astronomer",
    "NEW (Added from Website)",
    "Heritage"
  ],
  [
    "circadian solar arc",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Biological / Diurnal Synchronization",
    "NEW (Added from Website)",
    "Heritage, Home"
  ],
  [
    "sun-arc diurnal dial",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Interactive Chronometric Dial",
    "NEW (Added from Website)",
    "Heritage"
  ],
  [
    "panchang guide",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Panchang Educational Pillar",
    "NEW (Added from Website)",
    "Guide, Header"
  ],
  [
    "muhurta calculation",
    "INR",
    "High Intent (AEO/Niche)",
    "New",
    "New",
    "Low",
    "Astrological Muhurta Reckoning",
    "NEW (Added from Website)",
    "Guide, Blog"
  ]
];

  if (newRows.length > 0) {
    const startAppendRow = sheet.getLastRow() + 1;
    const appendRange = sheet.getRange(startAppendRow, 1, newRows.length, 9);
    appendRange.setValues(newRows);
    appendRange.setBackground(COLOR_NEW);
  }

  // Auto-fit column widths
  for (let col = 1; col <= 9; col++) {
    sheet.autoResizeColumn(col);
  }

  SpreadsheetApp.getActiveSpreadsheet().toast("SEO Keywords successfully highlighted and enriched!", "Complete", 5);
}
