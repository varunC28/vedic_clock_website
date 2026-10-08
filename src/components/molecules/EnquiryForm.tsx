"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { GoldDivider } from "@/components/atoms/GoldDivider";
import { BrassButton } from "@/components/atoms/BrassButton";

interface EnquiryFormProps {
  variant?: "dark" | "parchment";
  className?: string;
}

export function EnquiryForm({ variant = "dark", className }: EnquiryFormProps) {
  const isParchment = variant === "parchment";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("submitting");
    setTimeout(() => {
      const generatedRef = `VK-${Math.floor(100000 + Math.random() * 900000)}`;
      setRefId(generatedRef);
      setStatus("success");
    }, 600);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setMessage("");
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "w-full max-w-xl mx-auto text-center py-12 px-6 sm:px-10 rounded-2xl transition-all duration-500",
          isParchment
            ? "bg-[#FAF5E8]/80 border border-[#B8873D]/30 text-[#2A1B10]"
            : "bg-[#060B18]/80 border border-[#D4A65A]/30 text-ivory",
          className
        )}
      >
        <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center border border-[#D4A65A]/40 bg-[#D4A65A]/10 text-[#E8B94B]">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3
          className={cn(
            "font-serif text-2xl sm:text-3xl font-normal tracking-tight",
            isParchment ? "text-[#2A1B10]" : "text-[#FBF5E7]"
          )}
        >
          Inquiry Registered with Atelier
        </h3>
        <h4 className="font-hindi text-lg text-[#D4A65A] font-medium mt-1">
          संवाद सफलतापूर्वक प्रेषित हुआ
        </h4>

        <GoldDivider
          variant={isParchment ? "light" : "dark"}
          className="my-4 max-w-xs scale-90 mx-auto"
        />

        <p
          className={cn(
            "font-sans text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-6",
            isParchment ? "text-[#3D2A1A]/80" : "text-ivory/75"
          )}
        >
          Thank you, <strong className="font-semibold">{name}</strong>. Your commission request has been received directly by our Ujjain horology desk. Our curation team will correspond with you via <span className="underline decoration-[#D4A65A]/50">{email}</span> within 24 hours.
        </p>

        {/* Reference Stamp */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-8",
            isParchment
              ? "bg-[#B8873D]/12 border border-[#B8873D]/30 text-[#8A5A1A]"
              : "bg-[#D4A65A]/10 border border-[#D4A65A]/25 text-[#E8B94B]"
          )}
        >
          <span>REF NUMBER:</span>
          <span className="font-semibold tracking-wider">{refId}</span>
        </div>

        <div>
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              "text-xs font-sans underline underline-offset-4 transition-colors cursor-pointer",
              isParchment
                ? "text-[#8A5A1A] hover:text-[#2A1B10]"
                : "text-[#D4A65A] hover:text-[#FFF5D1]"
            )}
          >
            Submit Another Inquiry / नया संदेश भेजें
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-2xl mx-auto flex flex-col gap-5 select-none", className)}
    >

      {/* ── 2. Full Name ── */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="patron-name"
            className={cn(
              "font-sans text-[11px] font-semibold uppercase tracking-wider",
              isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
            )}
          >
            Full Name <span className="text-red-400">*</span>
          </label>
          <span
            className={cn(
              "font-hindi text-[11px]",
              isParchment ? "text-[#3D2A1A]/50" : "text-[#FFF5D1]/40"
            )}
          >
            आपका नाम
          </span>
        </div>
        <input
          id="patron-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm font-sans transition-all duration-300",
            isParchment
              ? "bg-[#FAF5E8]/80 border border-[#B8873D]/30 text-[#2A1B10] focus:border-[#B8873D] focus:ring-2 focus:ring-[#B8873D]/30 focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
              : "bg-[#060B18]/80 border border-[#D4A65A]/25 text-[#FBF5E7] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/40 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          )}
        />
      </div>

      {/* ── 3. Contact Coordinates (2-Column Grid) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="patron-email"
              className={cn(
                "font-sans text-[11px] font-semibold uppercase tracking-wider",
                isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
              )}
            >
              Email Address <span className="text-red-400">*</span>
            </label>
            <span
              className={cn(
                "font-hindi text-[11px]",
                isParchment ? "text-[#3D2A1A]/50" : "text-[#FFF5D1]/40"
              )}
            >
              ईमेल पता
            </span>
          </div>
          <input
            id="patron-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-xl text-sm font-sans transition-all duration-300",
              isParchment
                ? "bg-[#FAF5E8]/80 border border-[#B8873D]/30 text-[#2A1B10] focus:border-[#B8873D] focus:ring-2 focus:ring-[#B8873D]/30 focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
                : "bg-[#060B18]/80 border border-[#D4A65A]/25 text-[#FBF5E7] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/40 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            )}
          />
        </div>

        {/* Phone / WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="patron-phone"
              className={cn(
                "font-sans text-[11px] font-semibold uppercase tracking-wider",
                isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
              )}
            >
              Phone / WhatsApp
            </label>
            <span
              className={cn(
                "font-hindi text-[11px]",
                isParchment ? "text-[#3D2A1A]/50" : "text-[#FFF5D1]/40"
              )}
            >
              दूरभाष / व्हाट्सएप
            </span>
          </div>
          <input
            id="patron-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-xl text-sm font-sans transition-all duration-300",
              isParchment
                ? "bg-[#FAF5E8]/80 border border-[#B8873D]/30 text-[#2A1B10] focus:border-[#B8873D] focus:ring-2 focus:ring-[#B8873D]/30 focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
                : "bg-[#060B18]/80 border border-[#D4A65A]/25 text-[#FBF5E7] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/40 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            )}
          />
        </div>
      </div>

      {/* ── 4. Target Location / Sanctuary City ── */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="patron-location"
            className={cn(
              "font-sans text-[11px] font-semibold uppercase tracking-wider",
              isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
            )}
          >
            Installation City &amp; Country
          </label>
          <span
            className={cn(
              "font-hindi text-[11px]",
              isParchment ? "text-[#3D2A1A]/50" : "text-[#FFF5D1]/40"
            )}
          >
            स्थापना स्थल
          </span>
        </div>
        <input
          id="patron-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm font-sans transition-all duration-300",
            isParchment
              ? "bg-[#FAF5E8]/80 border border-[#B8873D]/30 text-[#2A1B10] focus:border-[#B8873D] focus:ring-2 focus:ring-[#B8873D]/30 focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
              : "bg-[#060B18]/80 border border-[#D4A65A]/25 text-[#FBF5E7] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/40 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          )}
        />
      </div>

      {/* ── 5. Message or Intended Space ── */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="patron-message"
            className={cn(
              "font-sans text-[11px] font-semibold uppercase tracking-wider",
              isParchment ? "text-[#8A5A1A]" : "text-[#D4A65A]"
            )}
          >
            Message or Intended Space
          </label>
          <span
            className={cn(
              "font-hindi text-[11px]",
              isParchment ? "text-[#3D2A1A]/50" : "text-[#FFF5D1]/40"
            )}
          >
            विशेष अपेक्षाएं अथवा संदेश
          </span>
        </div>
        <textarea
          id="patron-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm font-sans leading-relaxed transition-all duration-300 resize-none",
            isParchment
              ? "bg-[#FAF5E8]/80 border border-[#B8873D]/30 text-[#2A1B10] focus:border-[#B8873D] focus:ring-2 focus:ring-[#B8873D]/30 focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
              : "bg-[#060B18]/80 border border-[#D4A65A]/25 text-[#FBF5E7] focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/40 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          )}
        />
      </div>

      {/* ── Submit Action with Heartbeat Pulse ── */}
      <div className="flex flex-col items-center pt-2">
        <div className="relative group w-full sm:w-auto">
          {/* Heartbeat pulse glow */}
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-lg blur-xl motion-safe:animate-heartbeat",
              isParchment ? "bg-[#B8873D]/30" : "bg-antique-gold/40"
            )}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className={cn(
              "w-full sm:w-auto px-8 py-3.5 rounded-full font-serif text-sm tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 font-semibold",
              isParchment
                ? "bg-[#B8873D] text-[#FAF5E8] hover:bg-[#8A5A1A] shadow-[0_4px_20px_rgba(184,135,61,0.3)]"
                : "bg-gradient-to-r from-[#D4A65A] via-[#E8B94B] to-[#D4A65A] text-[#050A14] hover:shadow-[0_0_24px_rgba(212,166,90,0.5)] shadow-[0_0_16px_rgba(212,166,90,0.3)]",
              status === "submitting" && "opacity-75 cursor-wait"
            )}
          >
            <span>{status === "submitting" ? "Registering..." : "Send Commission Inquiry"}</span>
            <span className="font-hindi text-xs opacity-80">
              {status === "submitting" ? "प्रतीक्षा करें..." : "संदेश भेजें"}
            </span>
            <span>→</span>
          </button>
        </div>

        {/* Respect Note */}
        <p
          className={cn(
            "font-sans text-[11px] mt-4 text-center tracking-wide",
            isParchment ? "text-[#3D2A1A]/60" : "text-ivory/50"
          )}
        >
          Strict confidentiality observed. Direct correspondence from our Ujjain curation team within 24 hours.
        </p>
      </div>
    </form>
  );
}
