/**
 * Compass logo icon - used as decorative element in headings and hero
 */

interface CompassIconProps {
  /** Size variant */
  size?: "period" | "sm" | "md" | "lg" | "hero";
  /** Additional classes */
  className?: string;
}

const sizeClasses = {
  period: "w-[0.6em] h-[0.6em]", // Tiny - size of punctuation
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  hero: "w-32 h-32 md:w-40 md:h-40", // Clean, smaller hero element
};

export function CompassIcon({ size = "md", className = "" }: CompassIconProps) {
  return (
    <img
      src="/icons/Usonian-Logo.png"
      alt=""
      aria-hidden="true"
      className={`inline-block object-contain ${sizeClasses[size]} ${className}`}
    />
  );
}
