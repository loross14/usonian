import Image from "next/image";

/**
 * Compass logo icon - used as decorative element in headings and hero
 *
 * Uses unoptimized mode for crisp logo rendering - Next.js Image optimization
 * can cause blurriness on logos due to lossy WebP compression and downscaling.
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

// Use source dimensions for crisp rendering at all sizes
// The actual display size is controlled by CSS classes above
// Using larger base ensures sharp rendering on high-DPI displays (2x, 3x)
const baseDimensions = {
  period: { width: 64, height: 64 },
  sm: { width: 64, height: 64 },
  md: { width: 96, height: 96 },
  lg: { width: 160, height: 160 },
  hero: { width: 480, height: 480 },
};

export function CompassIcon({ size = "md", className = "" }: CompassIconProps) {
  const { width, height } = baseDimensions[size];

  return (
    <Image
      src="/icons/Usonian-Logo.png"
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      quality={100}
      unoptimized
      className={`inline-block object-contain ${sizeClasses[size]} ${className}`}
    />
  );
}
