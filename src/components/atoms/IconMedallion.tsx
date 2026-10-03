import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconMedallionProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  className?: string;
}

export function IconMedallion({
  src,
  alt,
  size = "md",
  glow = false,
  className,
}: IconMedallionProps) {
  // Config for size variants
  const sizeConfig = {
    sm: {
      container: "w-12 h-12 border-[1.5px] p-[2px]",
      imageSizes: "48px",
    },
    md: {
      container: "w-[72px] h-[72px] border-2 p-[3px]",
      imageSizes: "72px",
    },
    lg: {
      container: "w-24 h-24 border-2 p-[4px]",
      imageSizes: "96px",
    },
  };

  // Shadow composition (base vs glow)
  const shadows = glow
    ? "0 0 16px rgba(184,135,61,0.4), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(212,166,90,0.3)"
    : "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(212,166,90,0.3)";

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center shrink-0",
        "bg-deep-indigo border-brass/60",
        "motion-safe:transition-shadow motion-safe:duration-300",
        sizeConfig[size].container,
        className
      )}
      style={{ boxShadow: shadows }}
    >
      {/* Image Wrapper */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizeConfig[size].imageSizes}
          className="object-cover"
        />
        {/* Inner Vignette Overlay (sits above image to darken edges) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)" }}
        />
      </div>
    </div>
  );
}
