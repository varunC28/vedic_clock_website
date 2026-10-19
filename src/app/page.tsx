import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "The Living Geometry of Time | Vikramaditya Vedic Clock",
  description:
    "Experience the premier Vedic timepiece calibrated to Ujjain 0° Prime Meridian. Features a living 30-Muhurta diurnal dial, Panchang, and sidereal solar transit.",
  keywords: [
    "Vedic Clock",
    "Vikramaditya Vedic Clock",
    "vedic clock online",
    "vaidik clock",
    "panchang clock",
    "vedic astronomical clock",
    "living astronomical timepiece",
    "ujjain prime meridian clock",
    "panchang clock india",
  ],
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
        url: "https://thevedicghadi.in/og-image.webp",
        secureUrl: "https://thevedicghadi.in/og-image.webp",
        type: "image/webp",
        width: 1200,
        height: 725,
        alt: "Vikramaditya Vedic Clock Horological Dial",
      },
      {
        url: "https://thevedicghadi.in/og-image.jpg",
        secureUrl: "https://thevedicghadi.in/og-image.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 725,
        alt: "Vikramaditya Vedic Clock Horological Dial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikramaditya Vedic Clock | The Living Geometry of Time",
    description:
      "Precision Vedic time calibrated to Ujjain 0° Prime Meridian. 30 Muhurtas, live Panchang, and solar zenith synchronization.",
    images: ["https://thevedicghadi.in/og-image.webp"],
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
        "Vedic Clock Online",
        "Vaidik Clock",
        "Panchang Clock",
        "Vedic Astronomical Clock",
        "Vikramaditya Vedic Horological Timepiece",
      ],
      image: [
        "https://thevedicghadi.in/og-image.webp",
        "https://thevedicghadi.in/og-image.jpg",
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
          streetAddress: "Jaisinghpura, Near Vedh Shala",
          addressLocality: "Ujjain",
          addressRegion: "Madhya Pradesh",
          postalCode: "456010",
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
        lowPrice: "45000",
        highPrice: "250000",
        offerCount: 3,
        price: "45000",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        url: "https://thevedicghadi.in/catalogue",
        seller: {
          "@type": "Organization",
          name: "Shiv Enterprises",
          url: "https://thevedicghadi.in",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jaisinghpura, Near Vedh Shala",
            addressLocality: "Ujjain",
            addressRegion: "Madhya Pradesh",
            postalCode: "456010",
            addressCountry: "IN",
          },
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "24",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Dr. Kalyan Sundaram",
          },
          reviewBody:
            "An extraordinary horological feat restoring the authentic 0° prime meridian of Ujjain with mathematical precision according to Surya Siddhanta.",
        },
      ],
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
