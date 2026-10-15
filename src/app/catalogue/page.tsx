import type { Metadata } from "next";
import { CatalogueView } from "@/components/views/CatalogueView";

export const metadata: Metadata = {
  title: "Editions & Specifications",
  description:
    "Official specification monograph and editions catalogue for the Vikramaditya Vedic Clock. Sanctum wall mounts and bespoke commissions in bell brass.",
  keywords: [
    "vedic clock price in india",
    "vedic clock for temples",
    "panchang clock",
    "vedic astronomical clock",
    "sanctum wall mount clock",
    "temple clock india",
    "vedic clock editions",
    "vikramaditya clock price",
    "vedic clock specification",
  ],
  alternates: {
    canonical: "/catalogue",
    languages: {
      "en-IN": "https://thevedicghadi.in/catalogue",
      "hi-IN": "https://thevedicghadi.in/catalogue",
      "x-default": "https://thevedicghadi.in/catalogue",
    },
  },
  openGraph: {
    title: "Artisan Timepieces & Institutional Commissions | Catalogue",
    siteName: "Vikramaditya Vedic Clock",
    description:
      "Download the official monograph. Explore technical specifications, casing materials, and bespoke editions.",
    url: "https://thevedicghadi.in/catalogue",
    type: "website",
    images: [
      {
        url: "https://thevedicghadi.in/api/og?title=Artisan%20Editions%20%26%20Specifications&subtitle=Download%20the%20Official%20Horological%20Monograph%20Catalogue&category=Catalogue&cta=DOWNLOAD%20CATALOGUE%20%E2%86%92",
        width: 1200,
        height: 630,
        alt: "Vikramaditya Vedic Clock Official Catalogue and Specifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisan Timepieces & Institutional Commissions | Catalogue",
    description:
      "Official editions catalogue for the Vikramaditya Vedic Clock. Sanctum mounts, pedestal monuments, and bespoke commissions.",
    images: [
      "https://thevedicghadi.in/api/og?title=Artisan%20Editions%20%26%20Specifications&subtitle=Download%20the%20Official%20Horological%20Monograph%20Catalogue&category=Catalogue&cta=DOWNLOAD%20CATALOGUE%20%E2%86%92",
    ],
  },
};

const catalogueJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://thevedicghadi.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Catalogue & Specifications",
          item: "https://thevedicghadi.in/catalogue",
        },
      ],
    },
    {
      "@type": "Product",
      name: "Vikramaditya Vedic Clock",
      image: "https://thevedicghadi.in/assets/blog/shastras-to-silicon.jpg",
      description:
        "Handcrafted astronomical horological instrument calculating real-time Panchang, 30 dynamic Muhurtas, and sidereal zodiac positions calibrated to the ancient Ujjain 0° Prime Meridian.",
      brand: {
        "@type": "Brand",
        name: "Shiv Enterprises",
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
      material: "Acoustic Bell Brass (Kansa) and Aerospace Aluminum",
      category: "Astronomical Horological Instrument",
      offers: {
        "@type": "Offer",
        url: "https://thevedicghadi.in/catalogue",
        priceCurrency: "INR",
        price: "Upon Request",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
  ],
};

export default function CataloguePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueJsonLd) }}
      />
      <CatalogueView />
    </>
  );
}
