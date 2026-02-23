"use client";

/**
 * Architects Directory Client Component
 * ======================================
 *
 * Handles sorting for the architects directory page.
 * Conditionally groups architects by letter only for alphabetical sorts.
 *
 * Sort options:
 *   - A TO Z / Z TO A: Display with letter markers
 *   - MOST PROPERTIES / TALIESIN FELLOWS: Display as flat list
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { SortControl } from "@/components/ui/SortControl";
import {
  sortArchitects,
  shouldGroupByLetter,
  groupArchitectsByLetter,
  type ArchitectSortOption,
  ARCHITECT_SORT_OPTIONS,
} from "@/utils/architectSort";
import { type Architect } from "@/types";

// =============================================================================
// TYPES
// =============================================================================

interface ArchitectsDirectoryClientProps {
  architects: Architect[];
}

// =============================================================================
// ARCHITECT ROW COMPONENT
// =============================================================================

function ArchitectRow({ architect }: { architect: Architect }) {
  const isTaliesin = architect.fellowship_years !== null;
  const yearStr = architect.birth_year
    ? `${architect.birth_year}${architect.death_year ? ` - ${architect.death_year}` : " - present"}`
    : "—";
  const propertyCount = architect.property_count || 0;

  return (
    <Link
      href={`/architects/${architect.slug}`}
      className="group grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 md:gap-10 py-5 border-b border-black/10 hover:bg-black/[0.02] hover:pl-5 hover:-ml-5 hover:pr-5 hover:-mr-5 transition-all"
    >
      {/* Name & Fellowship */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-bold text-sm tracking-[0.02em] uppercase group-hover:underline underline-offset-4">
          {architect.name}
        </span>
        {isTaliesin && (
          <span className="fellowship-badge">
            Taliesin {architect.fellowship_years}
          </span>
        )}
      </div>

      {/* Years */}
      <div className="hidden md:block text-sm opacity-50 whitespace-nowrap">
        {yearStr}
      </div>

      {/* Property Count */}
      <div className="text-sm text-right min-w-[140px]">
        <span className="font-bold">{propertyCount}</span>
        <span className="opacity-50 ml-1">
          {propertyCount === 1 ? "property" : "properties"}
        </span>
      </div>
    </Link>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ArchitectsDirectoryClient({
  architects,
}: ArchitectsDirectoryClientProps) {
  // Sort state - defaults to alphabetical A-Z
  const [sortOption, setSortOption] = useState<ArchitectSortOption>("name-asc");

  // Apply sorting
  const sortedArchitects = useMemo(() => {
    return sortArchitects(architects, sortOption);
  }, [architects, sortOption]);

  // Determine if we should group by letter
  const useLetterGroups = shouldGroupByLetter(sortOption);

  // Group architects if using alphabetical sort
  const groupedArchitects = useMemo(() => {
    if (!useLetterGroups) return null;
    return groupArchitectsByLetter(sortedArchitects);
  }, [sortedArchitects, useLetterGroups]);

  return (
    <>
      {/* Sort Control */}
      <div className="mb-8">
        <SortControl
          value={sortOption}
          onChange={setSortOption}
          options={ARCHITECT_SORT_OPTIONS}
        />
      </div>

      {/* Architects List */}
      {useLetterGroups && groupedArchitects ? (
        // Grouped by letter (for A-Z or Z-A sorts)
        <>
          {Object.entries(groupedArchitects).map(([letter, letterArchitects]) => (
            <div key={letter} className="mb-16 last:mb-0">
              {/* Letter Marker */}
              <div className="letter-marker">{letter}</div>

              {/* Architect List */}
              <div className="flex flex-col">
                {letterArchitects.map((architect) => (
                  <ArchitectRow key={architect.id} architect={architect} />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        // Flat list (for property count or Taliesin sorts)
        <div className="flex flex-col">
          {sortedArchitects.map((architect) => (
            <ArchitectRow key={architect.id} architect={architect} />
          ))}
        </div>
      )}
    </>
  );
}
