import type { Metadata } from "next";
import { Inter, Fraunces, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces" 
});

const notoDevanagari = Noto_Sans_Devanagari({ 
  subsets: ["devanagari"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-devanagari" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thevedicghadi.in"),
  title: {
    default: "Vikramaditya Vedic Clock | Living Astronomical Timepiece",
    template: "%s | Vikramaditya Vedic Clock",
  },
  description:
    "The premier Vedic timepiece calibrated to Ujjain 0° Prime Meridian. Features 30 Muhurtas, five limbs of Panchang, and sidereal solar geometry.",
  keywords: [
    "Vedic Clock",
    "Vikramaditya Vedic Clock",
    "वैदिक घड़ी",
    "विक्रमादित्य वैदिक घड़ी",
    "vedic clock online",
    "vaidik clock",
    "panchang clock",
    "vedic astronomical clock",
    "vedic clock price in india",
    "aaj ka panchang",
    "panchang for today",
    "dainik panchang",
    "hindu calendar",
    "indian calendar",
    "calendar tithi",
    "vikram samvat",
    "calendar vikram samvat",
    "Ujjain Prime Meridian",
    "अवंतिका शून्य रेखा",
    "Surya Siddhanta",
    "सूर्य सिद्धान्त",
    "Panchang",
    "पंचांग",
    "30 Muhurtas",
    "मुहूर्त",
    "ancient indian timekeeping",
    "Sidereal Horology",
    "Astronomical Clock India",
    "Ujjain Vedh Shala",
    "Varahamihira",
  ],
  authors: [{ name: "Vikramaditya Research & Horological Guild" }],
  creator: "Shiv Enterprises",
  publisher: "Vikramaditya Vedic Clock",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://thevedicghadi.in",
      "hi-IN": "https://thevedicghadi.in",
      "x-default": "https://thevedicghadi.in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: "https://thevedicghadi.in",
    siteName: "Vikramaditya Vedic Clock",
    title: "Vikramaditya Vedic Clock | The Living Geometry of Time",
    description:
      "Calibrated to Ujjain 0° Prime Meridian. Discover 30 Muhurtas, live Panchang, and sidereal astronomical horology.",
    images: [
      {
        url: "https://thevedicghadi.in/api/og?title=Vikramaditya%20Vedic%20Clock&subtitle=Living%20Diurnal%20Horology%20Calibrated%20to%20Ujjain%200%C2%B0%20Prime%20Meridian&category=Sacred%20Horology&cta=EXPLORE%20LIVING%20CLOCK%20%E2%86%92",
        width: 1200,
        height: 630,
        alt: "Vikramaditya Vedic Clock Horological Dial and Ancient Indian Astronomy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikramaditya Vedic Clock | World's Premier Astronomical Timepiece",
    description:
      "Precision Vedic time calibrated to Ujjain 0° Prime Meridian. 30 Muhurtas, live Panchang, and solar zenith synchronization.",
    images: [
      "https://thevedicghadi.in/api/og?title=Vikramaditya%20Vedic%20Clock&subtitle=Living%20Diurnal%20Horology%20Calibrated%20to%20Ujjain%200%C2%B0%20Prime%20Meridian&category=Sacred%20Horology&cta=EXPLORE%20LIVING%20CLOCK%20%E2%86%92",
    ],
    creator: "@thevedicghadi",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "XvWDa7owOFDVTB2O2LY6k77fam9mKN7SnvO4JK9R-TQ",
  },
};

const rootJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://thevedicghadi.in/#organization",
      name: "Vikramaditya Vedic Clock",
      alternateName: ["विक्रमादित्य वैदिक घड़ी", "Vedic Ghadi"],
      url: "https://thevedicghadi.in",
      logo: {
        "@type": "ImageObject",
        "@id": "https://thevedicghadi.in/#logo",
        url: "https://thevedicghadi.in/assets/icon.png",
        caption: "Vikramaditya Vedic Clock Emblem",
      },
      image: "https://thevedicghadi.in/assets/blog/shastras-to-silicon.jpg",
      description:
        "World's premier precision astronomical Vedic timepiece calibrating living 30-Muhurta diurnal cycles, Panchang coordinates, and sidereal solar transit from the ancient 0° prime meridian of Ujjain.",
      foundingLocation: {
        "@type": "Place",
        name: "Ujjain, Madhya Pradesh, Bharat",
        sameAs: [
          "https://en.wikipedia.org/wiki/Ujjain",
          "https://www.wikidata.org/wiki/Q200237",
        ],
      },
      areaServed: {
        "@type": "Country",
        name: "India",
        sameAs: "https://en.wikipedia.org/wiki/India",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jaisinghpura, Near Vedh Shala",
        addressLocality: "Ujjain",
        addressRegion: "Madhya Pradesh",
        postalCode: "456010",
        addressCountry: "IN",
      },
      telephone: "+91-94066-64444",
      email: "contact@thevedicghadi.in",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-94066-64444",
        contactType: "Customer Support & Acquisitions",
        email: "contact@thevedicghadi.in",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      knowsAbout: [
        {
          "@type": "Thing",
          name: "Surya Siddhanta",
          alternateName: "सूर्य सिद्धान्त",
          sameAs: [
            "https://en.wikipedia.org/wiki/Surya_Siddhanta",
            "https://www.wikidata.org/wiki/Q1089082",
          ],
        },
        {
          "@type": "Place",
          name: "Ujjain Prime Meridian",
          alternateName: "उज्जयिनी शून्य रेखा (Avantika)",
          sameAs: [
            "https://en.wikipedia.org/wiki/Ujjain",
            "https://www.wikidata.org/wiki/Q200237",
          ],
        },
        {
          "@type": "Thing",
          name: "Muhurta",
          alternateName: "मुहूर्त",
          sameAs: [
            "https://en.wikipedia.org/wiki/Muhurta",
            "https://www.wikidata.org/wiki/Q1952295",
          ],
        },
        {
          "@type": "Thing",
          name: "Panchangam",
          alternateName: "पञ्चाङ्गम्",
          sameAs: [
            "https://en.wikipedia.org/wiki/Panchangam",
            "https://www.wikidata.org/wiki/Q2488349",
          ],
        },
        {
          "@type": "Person",
          name: "Varāhamihira",
          alternateName: "वराहमिहिर",
          sameAs: [
            "https://en.wikipedia.org/wiki/Var%C4%81hamihira",
            "https://www.wikidata.org/wiki/Q318451",
          ],
        },
        {
          "@type": "Place",
          name: "Vedh Shala (Ujjain Observatory)",
          alternateName: "वेधशाला उज्जैन",
          sameAs: [
            "https://en.wikipedia.org/wiki/Vedh_Shala",
            "https://www.wikidata.org/wiki/Q7917997",
          ],
        },
        {
          "@type": "Thing",
          name: "Tropic of Cancer",
          alternateName: "कर्क रेखा",
          sameAs: [
            "https://en.wikipedia.org/wiki/Tropic_of_Cancer",
            "https://www.wikidata.org/wiki/Q176635",
          ],
        },
        {
          "@type": "Thing",
          name: "Nakshatra",
          alternateName: "नक्षत्र",
          sameAs: [
            "https://en.wikipedia.org/wiki/Nakshatra",
            "https://www.wikidata.org/wiki/Q1048408",
          ],
        },
        {
          "@type": "Thing",
          name: "Hindu Calendar & Horology",
          sameAs: [
            "https://en.wikipedia.org/wiki/Hindu_calendar",
            "https://www.wikidata.org/wiki/Q19020",
          ],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://thevedicghadi.in/#website",
      url: "https://thevedicghadi.in",
      name: "Vikramaditya Vedic Clock",
      alternateName: "विक्रमादित्य वैदिक घड़ी",
      publisher: {
        "@id": "https://thevedicghadi.in/#organization",
      },
      inLanguage: ["en-IN", "hi-IN"],
      description:
        "The living geometry of time: Exploring the 30-Muhurta dial, classical Hindu astronomy, and the historic 0° meridian of Ujjain.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://thevedicghadi.in/glossary?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${notoDevanagari.variable}`}>
      <head>
        {/* Preload critical above-the-fold clock hero assets to achieve sub-second LCP */}
        <link
          rel="preload"
          as="image"
          href="/assets/images/OnlyFrame.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/earth.jpg"
          type="image/jpeg"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Vikramaditya Vedic Clock Research Feed"
          href="/feed.xml"
        />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="Vedic Clock Horology Search"
          href="/opensearch.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body className="font-sans selection:bg-brass/30 selection:text-ivory">
        <SmoothScrollProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
