/**
 * Architect Sorting Utility
 * =========================
 *
 * Handles sorting logic for the architects directory.
 *
 * Sort options:
 *   - name-asc: A to Z (alphabetical by name)
 *   - name-desc: Z to A (reverse alphabetical)
 *   - properties-desc: Most properties first
 *   - taliesin-first: Taliesin Fellows grouped at top, then alphabetically
 *
 * Note: Letter grouping in the UI only makes sense for alphabetical sorts.
 * When sorting by properties or Taliesin, the directory renders as a flat list.
 */

import { type Architect } from "@/types";

// =============================================================================
// TYPES
// =============================================================================

export type ArchitectSortOption =
  | "name-asc"
  | "name-desc"
  | "properties-desc"
  | "taliesin-first";

// =============================================================================
// SORT OPTIONS CONFIG
// =============================================================================

export const ARCHITECT_SORT_OPTIONS: Array<{
  value: ArchitectSortOption;
  label: string;
}> = [
  { value: "name-asc", label: "A TO Z" },
  { value: "name-desc", label: "Z TO A" },
  { value: "properties-desc", label: "MOST PROPERTIES" },
  { value: "taliesin-first", label: "TALIESIN FELLOWS" },
];

// =============================================================================
// MAIN SORT FUNCTION
// =============================================================================

/**
 * Sorts architects by the specified sort option.
 * Returns a new array (does not mutate input).
 */
export function sortArchitects(
  architects: Architect[],
  sortOption: ArchitectSortOption
): Architect[] {
  const sorted = [...architects];

  switch (sortOption) {
    case "name-asc":
      // A to Z
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "name-desc":
      // Z to A
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "properties-desc":
      // Most properties first, then alphabetically for ties
      return sorted.sort((a, b) => {
        const countA = a.property_count ?? 0;
        const countB = b.property_count ?? 0;
        if (countB !== countA) {
          return countB - countA;
        }
        return a.name.localeCompare(b.name);
      });

    case "taliesin-first":
      // Taliesin Fellows first (fellowship_years not null), then others
      // Within each group, sort alphabetically
      return sorted.sort((a, b) => {
        const aIsTaliesin = a.fellowship_years !== null;
        const bIsTaliesin = b.fellowship_years !== null;

        if (aIsTaliesin && !bIsTaliesin) return -1;
        if (!aIsTaliesin && bIsTaliesin) return 1;

        // Same group - sort alphabetically
        return a.name.localeCompare(b.name);
      });

    default:
      return sorted;
  }
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Returns true if the sort option should display with letter grouping.
 * Only alphabetical sorts make sense with letter groups.
 */
export function shouldGroupByLetter(sortOption: ArchitectSortOption): boolean {
  return sortOption === "name-asc" || sortOption === "name-desc";
}

/**
 * Groups architects by first letter of name.
 * Used only for alphabetical sorts.
 */
export function groupArchitectsByLetter(
  architects: Architect[]
): Record<string, Architect[]> {
  return architects.reduce((acc, architect) => {
    const letter = architect.name.charAt(0).toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(architect);
    return acc;
  }, {} as Record<string, Architect[]>);
}
