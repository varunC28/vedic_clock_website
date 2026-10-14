import type { Metadata } from "next";
import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Acquisitions & Institutional Enquiries · Contact Us",
  description:
    "Connect with the Vikramaditya Vedic Clock team. Inquire about bespoke horological commissions, temple installations, university astronomical dials, and institution acquisitions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Acquisitions & Institutional Enquiries | Contact Us",
    description:
      "Direct communication channel for bespoke commissions, sacred horology inquiries, and institutional partnerships with Shiv Enterprises.",
    url: "https://thevedicghadi.in/contact",
    type: "website",
    images: [
      {
        url: "/assets/blog/shastras-to-silicon.jpg",
        width: 1200,
        height: 675,
        alt: "Vikramaditya Vedic Clock Institutional Acquisitions and Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acquisitions & Institutional Enquiries | Contact Us",
    description:
      "Inquire about bespoke Vedic horological commissions, museum installations, and temple timepieces.",
    images: ["/assets/blog/shastras-to-silicon.jpg"],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
