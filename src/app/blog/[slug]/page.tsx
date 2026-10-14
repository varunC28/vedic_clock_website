import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VEDIC_BLOG_ARTICLES } from "@/data/blog-articles";
import { ArticleView } from "@/components/views/ArticleView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VEDIC_BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = VEDIC_BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  const ogImages = article.image
    ? [{ url: article.image, width: 1200, height: 675, alt: article.title }]
    : [{ url: "/assets/blog/shastras-to-silicon.jpg", width: 1200, height: 675, alt: article.title }];

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `https://thevedicghadi.in/blog/${article.slug}`,
      publishedTime: article.createdAt,
      authors: [article.author],
      section: article.category,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ogImages.map((img) => img.url),
    },
    keywords: [
      article.category,
      article.title,
      article.titleHi ?? "",
      "Vedic Horology",
      "Ujjain Prime Meridian",
      "Panchang",
      "Surya Siddhanta",
    ],
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = VEDIC_BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = VEDIC_BLOG_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = {
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
            name: "Publications",
            item: "https://thevedicghadi.in/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `https://thevedicghadi.in/blog/${article.slug}`,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: article.title,
        alternativeHeadline: article.titleHi,
        description: article.description,
        image: [article.image || "/assets/blog/shastras-to-silicon.jpg"],
        datePublished: article.createdAt,
        dateModified: article.createdAt,
        inLanguage: ["en", "hi"],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".article-speakable-title", ".article-speakable-lead"],
        },
        author: {
          "@type": "Person",
          name: article.author,
          jobTitle: article.authorRole,
          worksFor: {
            "@type": "Organization",
            name: "Vikramaditya Research & Horological Guild",
            url: "https://thevedicghadi.in",
            location: {
              "@type": "Place",
              name: "Ujjain, Madhya Pradesh, Bharat",
            },
          },
        },
        citation: [
          {
            "@type": "Book",
            name: "Surya Siddhanta (सूर्य सिद्धान्त)",
            sameAs: "https://en.wikipedia.org/wiki/Surya_Siddhanta",
          },
          {
            "@type": "Book",
            name: "Pancha-Siddhantika of Varāhamihira (पंचसिद्धान्तिका)",
            sameAs: "https://en.wikipedia.org/wiki/Var%C4%81hamihira",
          },
          {
            "@type": "Book",
            name: "Vedh Shala Astronomical Astronomical Archives (Ujjain)",
            sameAs: "https://en.wikipedia.org/wiki/Vedh_Shala",
          },
        ],
        publisher: {
          "@type": "Organization",
          name: "Vikramaditya Vedic Clock",
          url: "https://thevedicghadi.in",
        },
        articleSection: article.category,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://thevedicghadi.in/blog/${article.slug}`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleView article={article} relatedArticles={relatedArticles} />
    </>
  );
}
