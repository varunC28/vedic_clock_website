import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vikramaditya Vedic Clock · विक्रमादित्य वैदिक घड़ी",
    short_name: "Vedic Clock",
    description:
      "World's premier precision astronomical Vedic timepiece calibrated to the ancient 0° Prime Meridian of Ujjain. 30 Muhurtas, offline Panchang, and sidereal solar transit.",
    start_url: "/",
    display: "standalone",
    background_color: "#03060E",
    theme_color: "#D4A65A",
    icons: [
      {
        src: "/assets/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
