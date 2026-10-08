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
    <div className="relative w-full min-h-screen bg-[#FAF6F0] text-[#2D1B0E] selection:bg-[#B8873D]/25 selection:text-[#2D1B0E] overflow-x-hidden">
      <Header alwaysVisible />

      {/* ── Main Editorial Container (Clean, Simple, Uncluttered) ── */}
      <main className="pt-28 sm:pt-36 pb-20 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto flex flex-col gap-16 sm:gap-20">
        
        {/* ── Top Section: 2 Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: Clean Typography, Direct Contact & Offices ── */}
          <div className="lg:col-span-6 flex flex-col text-left">
            {/* Eyebrow */}
            <span className="font-mono text-xs text-[#8C5D33] tracking-[0.25em] uppercase mb-4">
              / get in touch /
            </span>

            {/* Headline */}
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#2D1B0E] leading-[1.18] tracking-tight mb-4">
              We are always ready to help you and answer your questions
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-[#6E5540] leading-relaxed mb-8 max-w-lg">
              At Shiv Enterprises, we are dedicated to bringing timeless Vedic wisdom and precision horology to life. We love connecting with our community — reach out to us directly!
            </p>

            {/* ── DIRECT PERSONAL CONTACT ── */}
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#F2ECE1]/70 border border-[#E5D7C2] text-left flex flex-col gap-3">
              <span className="font-mono text-[11px] font-semibold text-[#8C5D33] uppercase tracking-wider">
                Direct Contact · Shiv Enterprises
              </span>
              <div className="text-lg font-bold text-[#2D1B0E]">
                Varun Chaturvedi
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-1 text-sm">
                <a
                  href="tel:+919406664444"
                  className="inline-flex items-center gap-2 font-mono text-[#2D1B0E] hover:text-[#8C5D33] transition-colors"
                >
                  <span className="text-[#8C5D33]">📞</span>
                  <span>+91 94066 64444</span>
                </a>
                <a
                  href="mailto:contact@vedicghadi.in"
                  className="inline-flex items-center gap-2 font-sans text-[#2D1B0E] hover:text-[#8C5D33] transition-colors"
                >
                  <span className="text-[#8C5D33]">✉️</span>
                  <span>contact@vedicghadi.in</span>
                </a>
              </div>
            </div>

            {/* ── TWO OFFICES (Clean Typography, No Clutter) ── */}
            <div className="flex flex-col gap-6 pt-2">
              <span className="font-mono text-[11px] font-semibold text-[#8C5D33] uppercase tracking-wider">
                Our Office Locations
              </span>

              {/* 1. INDORE OFFICE */}
              <div className="flex flex-col gap-1.5 text-left border-l-2 border-[#B8873D] pl-4">
                <h2 className="font-sans text-sm font-bold tracking-wider text-[#2D1B0E] uppercase">
                  INDORE OFFICE · इंदौर कार्यालय
                </h2>
                <p className="font-sans text-sm text-[#5C4533] leading-relaxed">
                  LG 16A Silver Mall 8, RNT Road, Indore-452001, Madhya Pradesh
                </p>
                <div className="pt-1 flex items-center gap-4 text-xs">
                  <a
                    href="https://maps.app.goo.gl/KEvH5Sx6vmgivjeG7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#8C5D33] hover:text-[#482D1C] underline underline-offset-4 transition-colors"
                  >
                    View on Google Maps →
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveOffice(OFFICES[0])}
                    className="text-[#8C5D33] hover:text-[#482D1C] cursor-pointer"
                  >
                    Show on map below ↓
                  </button>
                </div>
              </div>

              {/* 2. BHOPAL OFFICE */}
              <div className="flex flex-col gap-1.5 text-left border-l-2 border-[#B8873D] pl-4">
                <h2 className="font-sans text-sm font-bold tracking-wider text-[#2D1B0E] uppercase">
                  BHOPAL OFFICE · भोपाल कार्यालय
                </h2>
                <p className="font-sans text-sm text-[#5C4533] leading-relaxed">
                  Danish Hills View Township, Bhopal, Madhya Pradesh
                </p>
                <div className="pt-1 flex items-center gap-4 text-xs">
                  <a
                    href="https://maps.app.goo.gl/ChwNZnMpVyBmwaaX9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#8C5D33] hover:text-[#482D1C] underline underline-offset-4 transition-colors"
                  >
                    View on Google Maps →
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveOffice(OFFICES[1])}
                    className="text-[#8C5D33] hover:text-[#482D1C] cursor-pointer"
                  >
                    Show on map below ↓
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN: Clean Minimalist Form ── */}
          <div className="lg:col-span-6">
            <div className="bg-[#F2ECE1] rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm text-left">
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#2D1B0E] mb-8 tracking-tight">
                Send a Message
              </h2>

              {submitted ? (
                <div className="py-10 flex flex-col items-start text-left">
                  <div className="w-12 h-12 rounded-full bg-[#E5D7C2] text-[#482D1C] flex items-center justify-center text-xl font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="font-sans font-bold text-lg text-[#2D1B0E] mb-1">
                    Thank you for reaching out
                  </h3>
                  <p className="font-sans text-sm text-[#6E5540] leading-relaxed mb-6">
                    Your message has been received. We will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#8C5D33] hover:text-[#2D1B0E] underline underline-offset-4 cursor-pointer"
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
                      className="w-full bg-transparent border-b border-[#D8C7B0] focus:border-[#482D1C] py-3 text-sm sm:text-base text-[#2D1B0E] placeholder-[#8C7662] outline-none transition-colors"
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
                      className="w-full bg-transparent border-b border-[#D8C7B0] focus:border-[#482D1C] py-3 text-sm sm:text-base text-[#2D1B0E] placeholder-[#8C7662] outline-none transition-colors"
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
                      className="w-full bg-transparent border-b border-[#D8C7B0] focus:border-[#482D1C] py-3 text-sm sm:text-base text-[#2D1B0E] placeholder-[#8C7662] outline-none transition-colors"
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
                      className="w-full bg-transparent border-b border-[#D8C7B0] focus:border-[#482D1C] py-3 text-sm sm:text-base text-[#2D1B0E] placeholder-[#8C7662] outline-none resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "rounded-full px-8 py-3 bg-[#482D1C] hover:bg-[#382315] text-[#FAF6F0] font-sans text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-sm",
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

        {/* ── BOTTOM SECTION: Clean Minimal Map ── */}
        <section className="w-full flex flex-col gap-4 text-left">
          {/* Map Switcher Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="font-sans text-xs uppercase tracking-wider text-[#8C5D33] font-semibold">
              Location Map:
            </span>
            <div className="flex items-center gap-2">
              {OFFICES.map((office) => (
                <button
                  key={office.id}
                  type="button"
                  onClick={() => setActiveOffice(office)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer font-medium",
                    activeOffice.id === office.id
                      ? "bg-[#482D1C] text-[#FAF6F0] shadow-sm"
                      : "bg-[#EFE7DA] text-[#482D1C] hover:bg-[#E5D7C2]"
                  )}
                >
                  {office.cityEn} ({office.cityHi})
                </button>
              ))}
            </div>
          </div>

          {/* Minimal Map Frame */}
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-[#DFCBB5] bg-[#EFE7DA] shadow-sm">
            <iframe
              title={`Shiv Enterprises ${activeOffice.titleEn}`}
              width="100%"
              height="100%"
              className="border-0 w-full h-full filter sepia-[15%] contrast-[105%]"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeOffice.bbox}&layer=mapnik&marker=${activeOffice.lat}%2C${activeOffice.lng}`}
            />

            {/* Clean Location Tag on bottom-left */}
            <div className="absolute bottom-4 left-4 z-10 bg-[#FAF6F0]/95 backdrop-blur-sm border border-[#DFCBB5] rounded-2xl p-3.5 sm:p-4 shadow-md max-w-xs text-left">
              <span className="font-sans text-[10px] font-bold tracking-widest text-[#8C5D33] uppercase block">
                SHIV ENTERPRISES
              </span>
              <span className="font-sans font-bold text-sm text-[#2D1B0E] block mt-0.5">
                {activeOffice.titleEn}
              </span>
              <p className="font-sans text-xs text-[#5C4533] leading-snug mt-1">
                {activeOffice.address}
              </p>
              <a
                href={activeOffice.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-sans text-xs font-semibold text-[#8C5D33] hover:text-[#482D1C] underline"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Grounded Luxury Footer ── */}
      <Footer variant="parchment" />
    </div>
  );
}
