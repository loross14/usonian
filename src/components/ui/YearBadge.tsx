"use client";

import { useState } from "react";

function getEraContext(year: number): string | null {
  // FLW Usonian era (most relevant for this collection)
  if (year >= 1936 && year <= 1958) return "Usonian Era";
  // Case Study Houses program in LA
  if (year >= 1945 && year <= 1966) return "Case Study Era";
  // Googie/Space Age architecture
  if (year >= 1950 && year <= 1965) return "Atomic Age";
  // General mid-century golden age
  if (year >= 1940 && year <= 1970) return "Mid-Century Golden Age";
  return null;
}

interface YearBadgeProps {
  year: number;
  className?: string;
}

export function YearBadge({ year, className = "" }: YearBadgeProps) {
  const [showEra, setShowEra] = useState(false);
  const era = getEraContext(year);

  return (
    <span
      className={`relative cursor-default ${className}`}
      onMouseEnter={() => setShowEra(true)}
      onMouseLeave={() => setShowEra(false)}
    >
      {year}
      {era && showEra && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-charcoal text-warm-white text-xs whitespace-nowrap rounded opacity-0 animate-fade-in pointer-events-none">
          {era}
        </span>
      )}
    </span>
  );
}
