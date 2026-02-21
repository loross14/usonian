import { getStatusLabel, getStatusBadgeClass } from "@/types";

interface BadgeProps {
  status: string;
  className?: string;
}

export function Badge({ status, className = "" }: BadgeProps) {
  const label = getStatusLabel(status);
  const badgeClass = getStatusBadgeClass(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide rounded ${badgeClass} ${className}`}
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
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide rounded badge-nrhp ${className}`}
    >
      {status}
    </span>
  );
}
