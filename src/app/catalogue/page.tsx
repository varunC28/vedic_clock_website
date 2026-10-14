import type { Metadata } from "next";
import { CatalogueView } from "@/components/views/CatalogueView";

export const metadata: Metadata = {
  title: "Artisan Timepieces & Institutional Commissions · Catalogue",
  description:
    "Official specification monograph and editions catalogue for the Vikramaditya Vedic Clock. Sanctum wall mounts, museum pedestal monuments, and bespoke heirloom commissions in bell brass.",
  alternates: {
    canonical: "/catalogue",
  },
  openGraph: {
    title: "Artisan Timepieces & Institutional Commissions | Catalogue",
    description:
      "Download the official monograph. Explore technical specifications, casing materials, and bespoke editions of the world's premier Vedic horological instrument.",
    url: "https://thevedicghadi.in/catalogue",
    type: "website",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Vikramaditya Vedic Clock Official Catalogue and Specifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisan Timepieces & Institutional Commissions | Catalogue",
    description:
      "Official editions catalogue for the Vikramaditya Vedic Clock. Sanctum mounts, pedestal monuments, and bespoke commissions.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
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
