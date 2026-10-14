import { VEDIC_BLOG_ARTICLES } from "@/data/blog-articles";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://thevedicghadi.in";

  const rssItems = VEDIC_BLOG_ARTICLES.map((article) => {
    const pubDate = new Date(article.createdAt).toUTCString();
    const articleUrl = `${baseUrl}/blog/${article.slug}`;

    return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.description}]]></description>
      <author>contact@thevedicghadi.in (${article.author})</author>
      <category><![CDATA[${article.category}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vikramaditya Vedic Clock • Research &amp; Scholarly Publications</title>
    <link>${baseUrl}/blog</link>
    <description>Authoritative research monographs on ancient Indian astronomical horology, Ujjain 0° Prime Meridian geodesy, 30-Muhurta diurnal dynamics, and Surya Siddhanta ephemerides.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/assets/icon.png</url>
      <title>Vikramaditya Vedic Clock</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
