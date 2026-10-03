"use client";

import { cn } from "@/lib/utils";

interface ProgressArcProps {
  current: number;
  total: number;
  width?: number;
  direction?: "up" | "down";
  showLabel?: boolean;
  className?: string;
}

export function ProgressArc({
  current,
  total,
  width = 300,
  direction = "up",
  showLabel = true,
  className,
}: ProgressArcProps) {
  const safeCurrent = Math.max(0, Math.min(total, current));
  const tickCount = Math.min(total, 60);
  const activeCount = Math.round((safeCurrent / total) * tickCount);

  // Arc geometry
  const height = width * 0.4;
  const padding = 20;
  const arcWidth = width - padding * 2;

  // Diamond scale factor relative to width
  const scale = width / 300;
  const dw = 3.5 * scale; // diamond half-width
  const dh = 7 * scale;   // diamond half-height

  // Build arc points along a quadratic curve
  const ticks: { x: number; y: number; angle: number; isActive: boolean; isCurrent: boolean }[] = [];

  for (let i = 0; i < tickCount; i++) {
    const t = tickCount > 1 ? i / (tickCount - 1) : 0.5;

    // Quadratic bezier: P0 (left), P1 (control/apex), P2 (right)
    const p0x = padding;
    const p2x = padding + arcWidth;
    const p1x = padding + arcWidth / 2;

    let p0y: number, p1y: number, p2y: number;

    if (direction === "up") {
      // Arc curves upward (concave — apex at top)
      p0y = height - 10;
      p2y = height - 10;
      p1y = 10;
    } else {
      // Arc curves downward (convex — apex at bottom)
      p0y = 10;
      p2y = 10;
      p1y = height - 10;
    }

    // Quadratic bezier position
    const x = (1 - t) * (1 - t) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
    const y = (1 - t) * (1 - t) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;

    // Tangent for rotation (derivative of quadratic bezier)
    const dx = 2 * (1 - t) * (p1x - p0x) + 2 * t * (p2x - p1x);
    const dy = 2 * (1 - t) * (p1y - p0y) + 2 * t * (p2y - p1y);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    ticks.push({
      x,
      y,
      angle,
      isActive: i < activeCount,
      isCurrent: i === activeCount - 1 && activeCount > 0,
    });
  }

  // Diamond path (cubic bezier leaf/diamond shape — ported from DialCore.tsx)
  const diamondPath = `M 0 ${dh} C ${-dw} ${dh * 0.2}, ${-dw * 1.2} ${-dh * 0.6}, 0 ${-dh} C ${dw * 1.2} ${-dh * 0.6}, ${dw} ${dh * 0.2}, 0 ${dh} Z`;

  // Label position: at the leading edge of active ticks
  const labelTick = activeCount > 0 ? ticks[activeCount - 1] : ticks[0];
  const labelOffsetY = direction === "up" ? -16 * scale : 16 * scale;

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {/* Label */}
      {showLabel && (
        <div
          className={cn(
            "text-antique-gold font-sans text-xs tabular-nums font-medium tracking-wider",
            direction === "up" ? "mb-1" : "order-first mb-1"
          )}
          style={direction === "down" ? { order: 1 } : undefined}
        >
          {safeCurrent}/{total}
        </div>
      )}

      {/* SVG Arc */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {ticks.map((tick, i) => (
          <g
            key={i}
            transform={`translate(${tick.x}, ${tick.y}) rotate(${tick.angle})`}
          >
            <path
              d={diamondPath}
              fill={tick.isActive ? "#FF9933" : "rgba(255, 255, 255, 0.1)"}
              stroke={tick.isActive ? "#FFD700" : "rgba(255, 255, 255, 0.2)"}
              strokeWidth={0.8 * scale}
              className={cn(
                tick.isCurrent && "motion-safe:animate-pulse"
              )}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
