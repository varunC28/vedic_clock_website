"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

interface OfficeLocation {
  id: "indore" | "bhopal";
  cityEn: string;
  cityHi: string;
  titleEn: string;
  titleHi: string;
  address: string;
  mapsUrl: string;
  lat: number;
  lng: number;
  bbox: string;
}

const OFFICES: OfficeLocation[] = [
  {
    id: "indore",
    cityEn: "Indore",
    cityHi: "इंदौर",
    titleEn: "Indore Office",
    titleHi: "इंदौर कार्यालय",
    address: "LG 16A Silver Mall 8, RNT Road, Indore-452001, Madhya Pradesh",
    mapsUrl: "https://maps.app.goo.gl/KEvH5Sx6vmgivjeG7",
    lat: 22.7169,
    lng: 75.8770,
    bbox: "75.86%2C22.70%2C75.89%2C22.73",
  },
  {
    id: "bhopal",
    cityEn: "Bhopal",
    cityHi: "भोपाल",
    titleEn: "Bhopal Office",
    titleHi: "भोपाल कार्यालय",
    address: "Danish Hills View Township, Bhopal, Madhya Pradesh",
    mapsUrl: "https://maps.app.goo.gl/ChwNZnMpVyBmwaaX9",
    lat: 23.1830,
    lng: 77.4041,
    bbox: "77.38%2C23.16%2C77.43%2C23.20",
  },
];

export default function ContactPage() {
  const [isParchment, setIsParchment] = useState(false);
  const [activeOffice, setActiveOffice] = useState<OfficeLocation>(OFFICES[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-x-hidden transition-colors duration-500",
        isParchment
          ? "bg-[#FAF6F0] text-[#2D1B0E] selection:bg-[#B8873D]/25 selection:text-[#2D1B0E]"
          : "bg-[#03060E] text-ivory selection:bg-[#D4A65A]/30 selection:text-[#FFFDF7]"
      )}
    >
      <Header alwaysVisible />

      {/* ── Ambient Radial Golden Glow ── */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-28 left-1/2 -translate-x-1/2 w-[850px] h-[500px] blur-3xl pointer-events-none rounded-full transition-opacity duration-500",
          isParchment
            ? "bg-gradient-to-tr from-[#B8873D]/12 via-[#D4A65A]/10 to-transparent"
            : "bg-gradient-to-tr from-[#D4A65A]/12 via-[#E8B94B]/6 to-transparent"
        )}
      />

      {/* ── Main Editorial Container (Clean, Simple, Zero Clutter) ── */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto flex flex-col gap-16 sm:gap-20">
        
        {/* ── Top Section: 2 Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: Typography, Direct Contact & Offices (No Card Boxes) ── */}
          <div className="lg:col-span-6 flex flex-col text-left">
            {/* Eyebrow */}
            <span
              className={cn(
                "font-mono text-xs tracking-[0.25em] uppercase mb-4",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            >
              / get in touch /
            </span>

            {/* Headline */}
            <h1
              className={cn(
                "font-sans text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.18] tracking-tight mb-4",
                isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
              )}
            >
              We are always ready to help you and answer your questions
            </h1>

            {/* Subtitle */}
            <p
              className={cn(
                "font-sans text-sm sm:text-base leading-relaxed mb-10 max-w-lg",
                isParchment ? "text-[#6E5540]" : "text-ivory/70"
              )}
            >
              At Shiv Enterprises, we are dedicated to bringing timeless Vedic wisdom and precision horology to life. We love connecting with our community — reach out to us directly!
            </p>

            {/* ── DIRECT PERSONAL CONTACT (Pure typography, zero card box) ── */}
            <div className="mb-10 flex flex-col gap-2 text-left">
              <span
                className={cn(
                  "font-mono text-[11px] font-semibold uppercase tracking-wider",
                  isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                )}
              >
                Direct Contact · Shiv Enterprises
              </span>
              <div
                className={cn(
                  "text-xl font-bold tracking-tight",
                  isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                )}
              >
                Varun Chaturvedi
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-sm font-sans">
                <a
                  href="tel:+919406664444"
                  className={cn(
                    "inline-flex items-center gap-2 font-mono transition-colors",
                    isParchment
                      ? "text-[#2D1B0E] hover:text-[#8C5D33]"
                      : "text-ivory hover:text-[#E8B94B]"
                  )}
                >
                  <span className={isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"}>📞</span>
                  <span>+91 94066 64444</span>
                </a>
                <a
                  href="mailto:contact@vedicghadi.in"
                  className={cn(
                    "inline-flex items-center gap-2 transition-colors",
                    isParchment
                      ? "text-[#2D1B0E] hover:text-[#8C5D33]"
                      : "text-ivory hover:text-[#E8B94B]"
                  )}
                >
                  <span className={isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"}>✉️</span>
                  <span>contact@vedicghadi.in</span>
                </a>
              </div>
            </div>

            {/* ── TWO OFFICES (Clean Typography, No Clutter, Direct Maps Links) ── */}
            <div className="flex flex-col gap-6 pt-2">
              <span
                className={cn(
                  "font-mono text-[11px] font-semibold uppercase tracking-wider",
                  isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                )}
              >
                Our Office Locations
              </span>

              {/* 1. INDORE OFFICE */}
              <div
                className={cn(
                  "flex flex-col gap-1 text-left border-l-2 pl-4 transition-colors",
                  isParchment ? "border-[#B8873D]" : "border-[#D4A65A]"
                )}
              >
                <h2
                  className={cn(
                    "font-sans text-sm font-bold tracking-wider uppercase",
                    isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                  )}
                >
                  INDORE OFFICE · इंदौर कार्यालय
                </h2>
                <p
                  className={cn(
                    "font-sans text-sm leading-relaxed",
                    isParchment ? "text-[#5C4533]" : "text-ivory/70"
                  )}
                >
                  LG 16A Silver Mall 8, RNT Road, Indore-452001, Madhya Pradesh
                </p>
                <div className="pt-1 text-xs">
                  <a
                    href="https://maps.app.goo.gl/KEvH5Sx6vmgivjeG7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1 font-medium underline underline-offset-4 transition-colors",
                      isParchment
                        ? "text-[#8C5D33] hover:text-[#482D1C]"
                        : "text-[#D4A65A] hover:text-[#F3E9D2]"
                    )}
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* 2. BHOPAL OFFICE */}
              <div
                className={cn(
                  "flex flex-col gap-1 text-left border-l-2 pl-4 transition-colors",
                  isParchment ? "border-[#B8873D]" : "border-[#D4A65A]"
                )}
              >
                <h2
                  className={cn(
                    "font-sans text-sm font-bold tracking-wider uppercase",
                    isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                  )}
                >
                  BHOPAL OFFICE · भोपाल कार्यालय
                </h2>
                <p
                  className={cn(
                    "font-sans text-sm leading-relaxed",
                    isParchment ? "text-[#5C4533]" : "text-ivory/70"
                  )}
                >
                  Danish Hills View Township, Bhopal, Madhya Pradesh
                </p>
                <div className="pt-1 text-xs">
                  <a
                    href="https://maps.app.goo.gl/ChwNZnMpVyBmwaaX9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1 font-medium underline underline-offset-4 transition-colors",
                      isParchment
                        ? "text-[#8C5D33] hover:text-[#482D1C]"
                        : "text-[#D4A65A] hover:text-[#F3E9D2]"
                    )}
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN: Clean Minimalist Form (Theme Adaptive) ── */}
          <div className="lg:col-span-6">
            <div
              className={cn(
                "rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm text-left transition-all duration-500",
                isParchment
                  ? "bg-[#F2ECE1] border border-[#DFCBB5]/50"
                  : "bg-[#080E1C]/85 border border-[#D4A65A]/25 backdrop-blur-md"
              )}
            >
              <h2
                className={cn(
                  "font-sans text-2xl sm:text-3xl font-bold mb-8 tracking-tight",
                  isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                )}
              >
                Send a Message
              </h2>

              {submitted ? (
                <div className="py-10 flex flex-col items-start text-left">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4",
                      isParchment
                        ? "bg-[#E5D7C2] text-[#482D1C]"
                        : "bg-[#D4A65A]/20 text-[#E8B94B] border border-[#D4A65A]/30"
                    )}
                  >
                    ✓
                  </div>
                  <h3
                    className={cn(
                      "font-sans font-bold text-lg mb-1",
                      isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                    )}
                  >
                    Thank you for reaching out
                  </h3>
                  <p
                    className={cn(
                      "font-sans text-sm leading-relaxed mb-6",
                      isParchment ? "text-[#6E5540]" : "text-ivory/70"
                    )}
                  >
                    Your message has been received. We will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className={cn(
                      "text-xs font-semibold underline underline-offset-4 cursor-pointer",
                      isParchment
                        ? "text-[#8C5D33] hover:text-[#2D1B0E]"
                        : "text-[#D4A65A] hover:text-[#F3E9D2]"
                    )}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Your name */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="sr-only">Your name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        "w-full bg-transparent border-b py-3 text-sm sm:text-base outline-none transition-colors",
                        isParchment
                          ? "border-[#D8C7B0] focus:border-[#482D1C] text-[#2D1B0E] placeholder-[#8C7662]"
                          : "border-[#D4A65A]/30 focus:border-[#E8B94B] text-ivory placeholder-ivory/40"
                      )}
                    />
                  </div>

                  {/* Your email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="sr-only">Your email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        "w-full bg-transparent border-b py-3 text-sm sm:text-base outline-none transition-colors",
                        isParchment
                          ? "border-[#D8C7B0] focus:border-[#482D1C] text-[#2D1B0E] placeholder-[#8C7662]"
                          : "border-[#D4A65A]/30 focus:border-[#E8B94B] text-ivory placeholder-ivory/40"
                      )}
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col">
                    <label htmlFor="subject" className="sr-only">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      required
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={cn(
                        "w-full bg-transparent border-b py-3 text-sm sm:text-base outline-none transition-colors",
                        isParchment
                          ? "border-[#D8C7B0] focus:border-[#482D1C] text-[#2D1B0E] placeholder-[#8C7662]"
                          : "border-[#D4A65A]/30 focus:border-[#E8B94B] text-ivory placeholder-ivory/40"
                      )}
                    />
                  </div>

                  {/* Your message (optional) */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="sr-only">Your message (optional)</label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Your message (optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={cn(
                        "w-full bg-transparent border-b py-3 text-sm sm:text-base outline-none resize-none transition-colors",
                        isParchment
                          ? "border-[#D8C7B0] focus:border-[#482D1C] text-[#2D1B0E] placeholder-[#8C7662]"
                          : "border-[#D4A65A]/30 focus:border-[#E8B94B] text-ivory placeholder-ivory/40"
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "rounded-full px-8 py-3 font-sans text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-sm",
                        isParchment
                          ? "bg-[#482D1C] hover:bg-[#382315] text-[#FAF6F0]"
                          : "bg-gradient-to-r from-[#B8873D] to-[#D4A65A] hover:from-[#C9974D] hover:to-[#E5B76A] text-[#03060E] font-bold shadow-[#D4A65A]/20 shadow-md",
                        isSubmitting && "opacity-75 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* ── BOTTOM SECTION: Clean Minimal Map (Indore & Bhopal) ── */}
        <section className="w-full flex flex-col gap-4 text-left">
          {/* Map Switcher Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span
              className={cn(
                "font-sans text-xs uppercase tracking-wider font-semibold",
                isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
              )}
            >
              Location Map:
            </span>
            <div className="flex items-center gap-2">
              {OFFICES.map((office) => {
                const isActive = activeOffice.id === office.id;
                return (
                  <button
                    key={office.id}
                    type="button"
                    onClick={() => setActiveOffice(office)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer font-medium",
                      isActive
                        ? isParchment
                          ? "bg-[#482D1C] text-[#FAF6F0] shadow-sm"
                          : "bg-[#D4A65A] text-[#03060E] font-semibold shadow-sm"
                        : isParchment
                          ? "bg-[#EFE7DA] text-[#482D1C] hover:bg-[#E5D7C2]"
                          : "bg-[#0B1220] text-ivory/80 border border-[#D4A65A]/20 hover:bg-[#121B2F]"
                    )}
                  >
                    {office.cityEn} ({office.cityHi})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimal Map Frame */}
          <div
            className={cn(
              "relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm transition-all duration-500",
              isParchment
                ? "border border-[#DFCBB5] bg-[#EFE7DA]"
                : "border border-[#D4A65A]/30 bg-[#0B1220]"
            )}
          >
            <iframe
              title={`Shiv Enterprises ${activeOffice.titleEn}`}
              width="100%"
              height="100%"
              className={cn(
                "border-0 w-full h-full",
                isParchment
                  ? "filter sepia-[15%] contrast-[105%]"
                  : "filter contrast-[108%] brightness-[90%]"
              )}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeOffice.bbox}&layer=mapnik&marker=${activeOffice.lat}%2C${activeOffice.lng}`}
            />

            {/* Clean Location Tag on bottom-left */}
            <div
              className={cn(
                "absolute bottom-4 left-4 z-10 rounded-2xl p-3.5 sm:p-4 shadow-md max-w-xs text-left backdrop-blur-md transition-all duration-500",
                isParchment
                  ? "bg-[#FAF6F0]/95 border border-[#DFCBB5]"
                  : "bg-[#060B18]/90 border border-[#D4A65A]/30 text-ivory"
              )}
            >
              <span
                className={cn(
                  "font-sans text-[10px] font-bold tracking-widest uppercase block",
                  isParchment ? "text-[#8C5D33]" : "text-[#D4A65A]"
                )}
              >
                SHIV ENTERPRISES
              </span>
              <span
                className={cn(
                  "font-sans font-bold text-sm block mt-0.5",
                  isParchment ? "text-[#2D1B0E]" : "text-[#FBF5E7]"
                )}
              >
                {activeOffice.titleEn}
              </span>
              <p
                className={cn(
                  "font-sans text-xs leading-snug mt-1",
                  isParchment ? "text-[#5C4533]" : "text-ivory/70"
                )}
              >
                {activeOffice.address}
              </p>
              <a
                href={activeOffice.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-block mt-2 font-sans text-xs font-semibold underline",
                  isParchment
                    ? "text-[#8C5D33] hover:text-[#482D1C]"
                    : "text-[#D4A65A] hover:text-[#F3E9D2]"
                )}
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Grounded Luxury Footer ── */}
      <Footer variant={isParchment ? "parchment" : "dark"} />

      {/* ── Minimal Floating Theme Switcher ── */}
      <aside
        aria-label="Theme switcher"
        className="fixed bottom-5 right-5 z-50 flex items-center bg-[#060B18]/90 backdrop-blur-md border border-[#D4A65A]/30 rounded-full p-1 shadow-lg"
      >
        <button
          type="button"
          onClick={() => setIsParchment(!isParchment)}
          className="px-3 py-1 rounded-full text-[11px] font-sans text-ivory/80 hover:text-ivory cursor-pointer flex items-center gap-1.5 transition-colors"
          title="Toggle Dark Cosmic / Light Parchment"
        >
          <span>{isParchment ? "🌌 Cosmic Mode" : "📜 Parchment Mode"}</span>
        </button>
      </aside>
    </div>
  );
}
