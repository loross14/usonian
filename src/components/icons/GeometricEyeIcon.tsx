interface GeometricEyeIconProps {
  className?: string;
  size?: number;
}

export function GeometricEyeIcon({
  className = "",
  size = 20,
}: GeometricEyeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer eye shape - angular diamond */}
      <path d="M12 5 L21 12 L12 19 L3 12 Z" />

      {/* Inner iris - concentric diamond */}
      <path d="M12 8 L16 12 L12 16 L8 12 Z" />

      {/* Pupil - filled diamond center */}
      <path
        d="M12 10 L14 12 L12 14 L10 12 Z"
        fill="currentColor"
        stroke="none"
      />

      {/* FLW-inspired corner accents */}
      <path d="M4.5 9 L6 10.5" />
      <path d="M19.5 9 L18 10.5" />
      <path d="M4.5 15 L6 13.5" />
      <path d="M19.5 15 L18 13.5" />
    </svg>
  );
}
