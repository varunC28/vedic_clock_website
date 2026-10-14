import type { Metadata } from "next";
import { BlogView } from "@/components/views/BlogView";

export const metadata: Metadata = {
  title: "Chronicles of Celestial Horology · Research & Publications",
  description:
    "Scholarly publications and essays on ancient Indian astronomy, the prime meridian of Ujjain, Surya Siddhanta mathematical models, and the living circadian philosophy of Vedic time.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Chronicles of Celestial Horology | Research & Publications",
    description:
      "Discover the ancient mathematical sciences, royal histories, and living circadian philosophy behind the world's premier Vedic timepieces.",
    url: "https://thevedicghadi.in/blog",
    type: "website",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Chronicles of Celestial Horology Publications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronicles of Celestial Horology | Research & Publications",
    description:
      "Essays and research on Ujjain's zero meridian, 30 Muhurtas, and ancient Indian astronomical science.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
  },
};

export default function BlogPage() {
  return <BlogView />;
}
