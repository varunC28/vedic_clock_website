/**
 * ══════════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT: PURE WHITE + GREEN USED KEYWORDS ONLY
 * ══════════════════════════════════════════════════════════════════
 * 
 * WHAT THIS SCRIPT DOES:
 * - Makes all rows clean WHITE (#FFFFFF) by default.
 * - Highlights ONLY the SEO keywords actively used on the website in GREEN (#D4EDDA).
 * - Appends the 35 new keywords from the website in GREEN at the bottom.
 * 
 * HOW TO RUN:
 * 1. Open your copy of the sheet (File > Make a copy).
 * 2. Click Extensions > Apps Script.
 * 3. Paste this script and click "Run" (▶).
 */

function highlightUsedKeywordsGreenOnly() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // 1. Setup Status and Location Headers in Columns B and C (or append)
  sheet.getRange(1, 8).setValue("Website Status");
  sheet.getRange(1, 9).setValue("Pages Found / Notes");
  sheet.getRange(1, 1, 1, 9).setFontWeight("bold");

  // 2. Active keywords used on website
  const USED_KEYWORDS = new Set([
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
]);

  const COLOR_WHITE = "#FFFFFF";
  const COLOR_GREEN = "#D4EDDA";

  // 3. Clear all colors to White, and mark used rows in Green
  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 9);
    const values = dataRange.getValues();
    const backgrounds = dataRange.getBackgrounds();

    for (let i = 0; i < values.length; i++) {
      const kw = String(values[i][0]).trim().toLowerCase();
      if (!kw) continue;

      if (USED_KEYWORDS.has(kw)) {
        values[i][7] = "USED";
        values[i][8] = "Active on Website";
        for (let c = 0; c < 9; c++) backgrounds[i][c] = COLOR_GREEN;
      } else {
        values[i][7] = "NOT USED";
        values[i][8] = "-";
        for (let c = 0; c < 9; c++) backgrounds[i][c] = COLOR_WHITE;
      }
    }
    dataRange.setValues(values);
    dataRange.setBackgrounds(backgrounds);
  }

  // 4. Append the 35 New Website Keywords in Green
  const newKeywords = [
  [
    "vedic horology",
    "USED (New Addition)",
    "Heritage, Clock, Home",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Core Platform / Scientific Discipline"
  ],
  [
    "zero meridian of ujjain",
    "USED (New Addition)",
    "Heritage, Clock",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Historical / Geographic AEO"
  ],
  [
    "prime meridian of ujjain",
    "USED (New Addition)",
    "Heritage, Meta SEO",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Geographic / Historical SEO"
  ],
  [
    "avantika meridian",
    "USED (New Addition)",
    "Heritage, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Historical Astronomical Meridian"
  ],
  [
    "ghati and vighati",
    "USED (New Addition)",
    "Clock, Guide, Home",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Time Unit (Vedic Chronometry)"
  ],
  [
    "ghati",
    "USED (New Addition)",
    "Clock, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Time Unit (24 modern minutes)"
  ],
  [
    "vighati",
    "USED (New Addition)",
    "Clock, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Time Unit (24 modern seconds)"
  ],
  [
    "brahma muhurta",
    "USED (New Addition)",
    "Home, Guide, Blog",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Circadian Muhurta (Creation Hour)"
  ],
  [
    "abhijit muhurta",
    "USED (New Addition)",
    "Guide, Blog",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Auspicious Solar Midday Muhurta"
  ],
  [
    "choghadiya",
    "USED (New Addition)",
    "Clock, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Diurnal Astrological Time Windows"
  ],
  [
    "choghadiya muhurta",
    "USED (New Addition)",
    "Clock, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Astrological Muhurta Timing"
  ],
  [
    "suryodaya",
    "USED (New Addition)",
    "Home, Heritage, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Sunrise-based Diurnal Horizon"
  ],
  [
    "sunrise to sunrise timekeeping",
    "USED (New Addition)",
    "Heritage, Home",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Vedic Diurnal Concept"
  ],
  [
    "lala devanagari numerals",
    "USED (New Addition)",
    "Clock, Heritage",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Horological Devanagari Dial Design"
  ],
  [
    "devanagari clock dial",
    "USED (New Addition)",
    "Clock, Catalogue",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Product / Horological Design"
  ],
  [
    "sidereal solar time",
    "USED (New Addition)",
    "Clock, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Astronomical Principle"
  ],
  [
    "lahiri ayanamsha",
    "USED (New Addition)",
    "Core Engine, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Astro Calculation Engine"
  ],
  [
    "ayanamsha",
    "USED (New Addition)",
    "Core Engine, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Sidereal Coordinate Shift"
  ],
  [
    "samvatsara",
    "USED (New Addition)",
    "Guide, Home",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "60-Year Jovian Solar Cycle"
  ],
  [
    "adhika masa",
    "USED (New Addition)",
    "Guide, Core Engine",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Intercalary Lunar Month Calculation"
  ],
  [
    "shukla paksha",
    "USED (New Addition)",
    "Guide, Panchang, Home",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Waxing Lunar Fortnight"
  ],
  [
    "krishna paksha",
    "USED (New Addition)",
    "Guide, Panchang, Home",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Waning Lunar Fortnight"
  ],
  [
    "nakshatra calculator",
    "USED (New Addition)",
    "Clock, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Panchang Limb Calculator"
  ],
  [
    "tithi calculator",
    "USED (New Addition)",
    "Clock, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Panchang Limb Calculator"
  ],
  [
    "27 nakshatras",
    "USED (New Addition)",
    "Guide, Clock",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Lunar Mansions Reference"
  ],
  [
    "vedic clock for institutions",
    "USED (New Addition)",
    "Institutions, Contact",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "B2B Commercial / Architectural Intent"
  ],
  [
    "monumental tower clock",
    "USED (New Addition)",
    "Institutions, Heritage",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Monumental Civic / Temple Horology"
  ],
  [
    "brass astronomical clock",
    "USED (New Addition)",
    "Institutions, Clock",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Hardware Horological Craftsmanship"
  ],
  [
    "surya siddhanta",
    "USED (New Addition)",
    "Heritage, Blog, Guide",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Foundational Astronomical Treatise"
  ],
  [
    "vedanga jyotisha",
    "USED (New Addition)",
    "Heritage, Blog",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Ancient Vedic Astronomy Canon"
  ],
  [
    "lagadha",
    "USED (New Addition)",
    "Heritage",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Ancient Avanti Astronomer"
  ],
  [
    "circadian solar arc",
    "USED (New Addition)",
    "Heritage, Home",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Biological / Diurnal Synchronization"
  ],
  [
    "sun-arc diurnal dial",
    "USED (New Addition)",
    "Heritage",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Interactive Chronometric Dial"
  ],
  [
    "panchang guide",
    "USED (New Addition)",
    "Guide, Header",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Panchang Educational Pillar"
  ],
  [
    "muhurta calculation",
    "USED (New Addition)",
    "Guide, Blog",
    "High Intent (Niche)",
    "New",
    "New",
    "Low",
    "Astrological Muhurta Reckoning"
  ]
];

  if (newKeywords.length > 0) {
    const startAppendRow = sheet.getLastRow() + 1;
    // Format to match 9-column sheet layout: Keyword, Currency, Volume, 3M, YoY, Comp, CompIndex, Status, Notes
    const appendRows = newKeywords.map(k => [
      k[0],           // Keyword
      "INR",         // Currency
      k[3],           // Searches
      k[4],           // 3M
      k[5],           // YoY
      k[6],           // Comp
      k[7],           // CompIndex
      k[1],           // Status ("USED (New Addition)")
      k[2]            // Pages Found
    ]);

    const appendRange = sheet.getRange(startAppendRow, 1, appendRows.length, 9);
    appendRange.setValues(appendRows);
    appendRange.setBackground(COLOR_GREEN);
  }

  // Auto-fit columns
  for (let col = 1; col <= 9; col++) {
    sheet.autoResizeColumn(col);
  }

  SpreadsheetApp.getActiveSpreadsheet().toast("Finished: All rows set to white, only active keywords marked green!", "Success", 5);
}
