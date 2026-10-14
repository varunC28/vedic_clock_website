import type { Metadata } from "next";
import { GuideView } from "@/components/views/GuideView";

export const metadata: Metadata = {
  title: "Panchang & Muhurta Guide · Astronomy of Vedic Timekeeping",
  description:
    "A comprehensive master guide to Vedic timekeeping. Learn the five limbs of Panchang (Tithi, Vaar, Nakshatra, Yoga, Karana), the 30 Muhurtas, and sidereal zodiac astronomy.",
  alternates: {
    canonical: "/guide",
  },
  openGraph: {
    title: "The Panchang & Muhurta Guide | Astronomy of Vedic Timekeeping",
    description:
      "Master the astronomical foundations of Indian timekeeping: Tithi angles, Nakshatra constellations, Ghati/Pala mathematics, and the 12 sidereal Rashis.",
    url: "https://thevedicghadi.in/guide",
    type: "article",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Panchang Guide and Astronomical Vedic Horology Instruments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Panchang & Muhurta Guide | Astronomy of Vedic Timekeeping",
    description:
      "A complete guide to Tithi, Nakshatra, Yoga, Karana, and the 30 dynamic Muhurtas of day and night.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
  },
};

export default function GuidePage() {
  return <GuideView />;
}
