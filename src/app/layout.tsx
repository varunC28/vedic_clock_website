import type { Metadata } from "next";
import { Inter, Fraunces, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces" 
});

const notoDevanagari = Noto_Sans_Devanagari({ 
  subsets: ["devanagari"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-devanagari" 
});

export const metadata: Metadata = {
  title: "Vikramaditya Vedic Clock",
  description: "Offline Panchang + 30-Muhurta dial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${notoDevanagari.variable}`}>
      <body className="font-sans selection:bg-brass/30 selection:text-ivory">
        {children}
      </body>
    </html>
  );
}
