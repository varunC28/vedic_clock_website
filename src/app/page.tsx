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

export default function Home() {
  return <HomeView />;
}
