import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "The Living Geometry of Time | Vikramaditya Vedic Clock",
  description:
    "Experience the premier Vedic timepiece calibrated to Ujjain 0° Prime Meridian. Features a living 30-Muhurta diurnal dial, Panchang, and sidereal solar transit.",
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://thevedicghadi.in",
      "hi-IN": "https://thevedicghadi.in",
      "x-default": "https://thevedicghadi.in",
    },
  },
  openGraph: {
    title: "Vikramaditya Vedic Clock | The Living Geometry of Time",
    siteName: "Vikramaditya Vedic Clock",
    description:
      "Calibrated to historic Ujjain 0° Prime Meridian. Discover 30 Muhurtas, live Panchang, and living astronomical heritage.",
    url: "https://thevedicghadi.in",
    type: "website",
    images: [
      {
        url: "https://thevedicghadi.in/api/og?title=The%20Living%20Geometry%20of%20Time&subtitle=Vikramaditya%20Vedic%20Clock%20%E2%80%A2%20Calibrated%20to%20Ujjain%200%C2%B0%20Prime%20Meridian&category=Vedic%20Horology&cta=EXPLORE%20LIVING%20CLOCK%20%E2%86%92",
        width: 1200,
        height: 630,
        alt: "Vikramaditya Vedic Clock Horological Dial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikramaditya Vedic Clock | The Living Geometry of Time",
    description:
      "Precision Vedic time calibrated to Ujjain 0° Prime Meridian. 30 Muhurtas, live Panchang, and solar zenith synchronization.",
    images: [
      "https://thevedicghadi.in/api/og?title=The%20Living%20Geometry%20of%20Time&subtitle=Vikramaditya%20Vedic%20Clock%20%E2%80%A2%20Calibrated%20to%20Ujjain%200%C2%B0%20Prime%20Meridian&category=Vedic%20Horology&cta=EXPLORE%20LIVING%20CLOCK%20%E2%86%92",
    ],
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://thevedicghadi.in/#product",
      name: "Vikramaditya Vedic Clock",
      alternateName: [
        "विक्रमादित्य वैदिक घड़ी",
        "Vedic Clock India",
        "Vikramaditya Vedic Horological Timepiece",
      ],
      image: [
        "https://thevedicghadi.in/assets/blog/shastras-to-silicon.jpg",
        "https://thevedicghadi.in/assets/blog/ujjain-zero-meridian.jpg",
      ],
      description:
        "Handcrafted astronomical horological instrument calibrated to the historic 0° Prime Meridian of Ujjain. Computes real-time Panchang (Tithi, Vaar, Nakshatra, Yoga, Karana), 30 dynamic diurnal Muhurtas, and sidereal solar transit 100% offline via embedded Surya Siddhanta ephemerides.",
      brand: {
        "@type": "Brand",
        name: "Vikramaditya Vedic Clock",
      },
      manufacturer: {
        "@type": "Organization",
        name: "Shiv Enterprises",
        url: "https://thevedicghadi.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ujjain",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
      },
      material:
        "Acoustic Bell Brass (Kansa / कांस्य Alloy: 78% Copper, 22% Tin) and Aerospace Anodized Aluminum",
      countryOfOrigin: {
        "@type": "Country",
        name: "India",
      },
      category: "Astronomical Horological Timepiece",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "Upon Request",
        offerCount: 3,
        price: "Upon Request",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        url: "https://thevedicghadi.in/catalogue",
        seller: {
          "@type": "Organization",
          name: "Shiv Enterprises",
        },
      },
      hasVariant: [
        {
          "@type": "ProductModel",
          name: "Sanctum Wall Mount Edition",
          description:
            "Solid bell-brass wall mounting chronometer engineered for sacred mandir sanctums, private estates, and architectural halls.",
        },
        {
          "@type": "ProductModel",
          name: "Monumental Pedestal Edition",
          description:
            "Freestanding architectural monument timepiece in antique bronze patina for cultural institutions, museums, and university courtyards.",
        },
        {
          "@type": "ProductModel",
          name: "Bespoke Heirloom Commission",
          description:
            "Custom artisan commission featuring heraldic inscriptions, personalized geo-coordinates, and temple-grade acoustic casing.",
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeView />
    </>
  );
}
