import { getStatusLabel } from "@/types";

interface BadgeProps {
  status: string;
  className?: string;
}

export function Badge({ status, className = "" }: BadgeProps) {
  const label = getStatusLabel(status);

  // Map status to brutalist badge class
  const getBadgeClass = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-red text-white';
      case 'sold':
        return 'bg-navy text-white';
      case 'museum':
      case 'donated':
        return 'bg-gold text-black';
      default:
        return 'bg-navy text-white';
    }
  };

  return (
    <span
      className={`status-badge ${getBadgeClass(status)} ${className}`}
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
