import type { Metadata } from "next";
import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Acquisitions & Institutional Enquiries · Contact Us",
  description:
    "Connect with the Vikramaditya Vedic Clock team. Inquire about bespoke horological commissions, temple installations, university astronomical dials, and institution acquisitions.",
  alternates: {
    canonical: "/contact",
    languages: {
      "en-IN": "https://thevedicghadi.in/contact",
      "hi-IN": "https://thevedicghadi.in/contact",
      "x-default": "https://thevedicghadi.in/contact",
    },
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

const contactJsonLd = {
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
          name: "Contact & Acquisitions",
          item: "https://thevedicghadi.in/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      name: "Acquisitions & Institutional Enquiries",
      description:
        "Direct communication channel for bespoke commissions, sacred horology inquiries, and institutional partnerships with Shiv Enterprises.",
      url: "https://thevedicghadi.in/contact",
      mainEntity: {
        "@type": "Organization",
        name: "Shiv Enterprises",
        url: "https://thevedicghadi.in",
        email: "contact@thevedicghadi.in",
        telephone: "+91-94066-64444",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ujjain",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactView />
    </>
  );
}
