import { cn } from "@/lib/utils";

interface BrassButtonProps {
  en: string;
  hi?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function BrassButton({
  en,
  hi,
  size = "md",
  variant = "primary",
  href,
  onClick,
  disabled = false,
  className,
}: BrassButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2 min-w-[120px]",
    md: "px-6 py-2.5 sm:px-8 sm:py-3 min-w-[160px]",
    lg: "px-8 py-3 sm:px-10 sm:py-4 min-w-[200px]",
  };

  const enTextSize = {
    sm: "text-xs",
    md: "text-xs sm:text-sm",
    lg: "text-sm sm:text-base",
  };

  const hiTextSize = {
    sm: "text-sm",
    md: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
  };

  const baseClasses = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-sans",
    "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-void-navy",
    sizeClasses[size],
  );

  const variantClasses = {
    primary: cn(
      "bg-gradient-to-br from-antique-gold to-brass",
      "border border-antique-gold/50",
      "text-void-navy",
      "shadow-[0_0_20px_rgba(184,135,61,0.3)]",
      !disabled && [
        "hover:shadow-[0_0_30px_rgba(184,135,61,0.5)]",
        "hover:from-[#DCAF64] hover:to-[#C49545]",
        "active:shadow-[0_0_12px_rgba(184,135,61,0.2)]",
        "active:from-[#C49545] active:to-[#A87835]",
      ],
    ),
    ghost: cn(
      "bg-transparent",
      "border border-brass/30",
      "text-brass",
      !disabled && [
        "hover:bg-brass/10 hover:border-brass/50",
        "active:bg-brass/15",
      ],
    ),
  };

  const disabledClasses = disabled
    ? "opacity-40 cursor-not-allowed shadow-none"
    : "cursor-pointer";

  const content = (
    <>
      <span className={cn("uppercase tracking-wider font-semibold", enTextSize[size])}>
        {en}
      </span>
      {hi && (
        <>
          <span className="opacity-50 mx-1.5">/</span>
          <span className={cn("font-hindi font-medium", hiTextSize[size])}>
            {hi}
          </span>
        </>
      )}
    </>
  );

  const allClasses = cn(baseClasses, variantClasses[variant], disabledClasses, className);

  if (href && !disabled) {
    return (
      <a href={href} className={allClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
    >
      {content}
    </button>
  );
}
