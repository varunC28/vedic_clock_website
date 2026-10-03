import { cn } from "@/lib/utils";

interface GoldDividerProps {
  variant?: "dark" | "light";
  className?: string;
}

export function GoldDivider({ variant = "dark", className }: GoldDividerProps) {
  const lineColor = variant === "dark" ? "#D4A65A" : "#8A6A2E";
  const lineOpacity = variant === "dark" ? 0.7 : 0.5;
  const diamondColor = "#B8873D";

  return (
    <div
      aria-hidden="true"
      className={cn("w-full", className)}
    >
      <svg
        width="100%"
        height="16"
        viewBox="0 0 400 16"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left line */}
        <line
          x1="0"
          y1="8"
          x2="186"
          y2="8"
          stroke={lineColor}
          strokeWidth="0.5"
          strokeOpacity={lineOpacity}
        />
        {/* Right line */}
        <line
          x1="214"
          y1="8"
          x2="400"
          y2="8"
          stroke={lineColor}
          strokeWidth="0.5"
          strokeOpacity={lineOpacity}
        />
        {/* Center 4-point diamond */}
        <polygon
          points="200,1 208,8 200,15 192,8"
          fill={diamondColor}
          fillOpacity={variant === "dark" ? 0.9 : 0.7}
        />
        {/* Inner diamond highlight */}
        <polygon
          points="200,4 205,8 200,12 195,8"
          fill={variant === "dark" ? "#FFE3A8" : "#D4A65A"}
          fillOpacity={0.4}
        />
      </svg>
    </div>
  );
}
