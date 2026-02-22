import { getStatusLabel } from "@/types";

interface BadgeProps {
  status: string;
  className?: string;
  /** Use v2 positioning (absolute top-right) for card overlays */
  variant?: "inline" | "overlay";
}

export function Badge({ status, className = "", variant = "inline" }: BadgeProps) {
  const label = getStatusLabel(status);

  // Map status to brutalist badge class
  const getBadgeClass = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-red text-white';
      case 'stay':
        return 'bg-green text-white';
      case 'visit':
        return 'bg-gold text-black';
      case 'sold':
      case 'archived':
        return 'bg-navy text-white';
      case 'museum':
      case 'donated':
        return 'bg-gold text-black';
      default:
        return 'bg-navy text-white';
    }
  };

  const positionClass = variant === "overlay" ? "status-badge-v2" : "";

  return (
    <span
      className={`status-badge ${getBadgeClass(status)} ${positionClass} ${className}`}
    >
      {label}
    </span>
  );
}

interface PreservationBadgeProps {
  status: string;
  className?: string;
}

export function PreservationBadge({ status, className = "" }: PreservationBadgeProps) {
  return (
    <span
      className={`inline-block px-4 py-2 border border-black text-[10px] font-bold tracking-[0.2em] uppercase ${className}`}
    >
      <span className="inline-block w-2 h-2 bg-black mr-3" />
      {status}
    </span>
  );
}
