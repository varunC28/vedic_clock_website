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

export default function CataloguePage() {
  return <CatalogueView />;
}
