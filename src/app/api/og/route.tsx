import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Retrieve parameters with elegant defaults
    const title = searchParams.get("title") || "The Vikramaditya Vedic Clock";
    const subtitle =
      searchParams.get("subtitle") ||
      "Living Diurnal Horology Calibrated to the Ancient 0° Prime Meridian of Ujjain";
    const category = searchParams.get("category") || "Vedic Horology";
    const author = searchParams.get("author") || "Vikramaditya Research & Horological Guild";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0B0C10",
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(212, 166, 90, 0.15) 0%, rgba(11, 12, 16, 1) 75%)",
            fontFamily: "serif",
            padding: "50px 60px",
            boxSizing: "border-box",
            border: "8px solid #1A1C23",
            position: "relative",
          }}
        >
          {/* Inner Golden Border */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              bottom: 16,
              border: "1px solid rgba(212, 166, 90, 0.35)",
              display: "flex",
              pointerEvents: "none",
            }}
          />

          {/* Top Bar: Brand, Coordinates & Category Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              zIndex: 10,
            }}
          >
            {/* Brand Logo & Sanskrit Inscription */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "2px solid #D4A65A",
                  backgroundColor: "rgba(212, 166, 90, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D4A65A",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                ॐ
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#D4A65A",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  विक्रमादित्य वैदिक घड़ी
                </span>
                <span
                  style={{
                    color: "rgba(255, 245, 209, 0.6)",
                    fontSize: 12,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Ujjain Prime Meridian • 23.18° N
                </span>
              </div>
            </div>

            {/* Category Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 24,
                backgroundColor: "rgba(212, 166, 90, 0.12)",
                border: "1px solid rgba(212, 166, 90, 0.4)",
                color: "#D4A65A",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </div>
          </div>

          {/* Main Headline & Subtitle Block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: "1040px",
              zIndex: 10,
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <h1
              style={{
                color: "#FFF5D1",
                fontSize: title.length > 60 ? 46 : 54,
                fontWeight: 700,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                margin: 0,
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                color: "rgba(255, 245, 209, 0.8)",
                fontSize: 20,
                lineHeight: 1.45,
                margin: 0,
                maxWidth: "920px",
                fontStyle: "italic",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer Bar: Authority & Domain URL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 20,
              borderTop: "1px solid rgba(212, 166, 90, 0.25)",
              zIndex: 10,
            }}
          >
            {/* Author / Source */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#D4A65A", fontSize: 16 }}>✦</span>
              <span
                style={{
                  color: "rgba(255, 245, 209, 0.85)",
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {author}
              </span>
            </div>

            {/* Domain Branding */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  color: "#D4A65A",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                }}
              >
                THEVEDICGHADI.IN
              </span>
              <span
                style={{
                  color: "rgba(212, 166, 90, 0.5)",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                }}
              >
                | SURYA SIDDHANTA
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Failed to generate OG image:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
