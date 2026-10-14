import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "The Living Geometry of Time | Vikramaditya Vedic Clock",
  description:
    "Experience the world's premier Vedic horological timepiece. Precision calibrated to the historic 0° Prime Meridian of Ujjain, featuring a living 30-Muhurta diurnal dial, Panchang calculations, and sidereal solar transit.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vikramaditya Vedic Clock | The Living Geometry of Time",
    description:
      "Precision calibrated to the historic 0° Prime Meridian of Ujjain. 30 Muhurtas, offline Panchang, and 5,000 years of living astronomical heritage.",
    url: "https://thevedicghadi.in",
    type: "website",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Vikramaditya Vedic Clock Horological Dial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikramaditya Vedic Clock | The Living Geometry of Time",
    description:
      "Precision calibrated to the historic 0° Prime Meridian of Ujjain. 30 Muhurtas, offline Panchang, and sidereal astronomical horology.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
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
