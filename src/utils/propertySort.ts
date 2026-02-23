/**
 * Property Sorting Utility
 * ========================
 *
 * This module handles all property sorting logic for the archive grid.
 *
 * IMPORTANT: The "smart" sort priority order was deliberately chosen to match
 * the user's browsing intent:
 *   1. For Sale - actively purchasable
 *   2. Stay - can book overnight (BnB, hotel)
 *   3. Visit - can tour in person
 *   4. Off-market with price data - historical context available
 *   5. Off-market without data - least actionable
 *
 * Properties without images are penalized heavily (+1000) to push them to the
 * bottom regardless of category, as they provide poor browsing experience.
 *
 * DO NOT reorder the priority values without understanding the UX rationale.
 */

import { type Property } from "@/types";

// =============================================================================
// TYPES
// =============================================================================

export type SortOption = "smart" | "year-asc" | "year-desc" | "price-asc" | "price-desc";

// =============================================================================
// SMART SORT HELPERS
// =============================================================================

/**
 * Returns priority score for experience-based sorting.
 * Lower = higher priority (appears first)
 *
 * Priority order:
 * 0 - For Sale (active listings)
 * 1 - Stay (rentals, BnB, hotels)
 * 2 - Visit (tours available)
 * 3 - Off-market with price history
 * 4 - Off-market without price data
 */
function getExperiencePriority(property: Property): number {
  // For Sale - highest priority
  if (property.status === "active") {
    return 0;
  }

  // Stay - second priority (can rent/stay overnight)
  if (property.is_rental) {
    return 1;
  }

  // Visit - third priority (can tour)
  if (property.is_visitable) {
    return 2;
  }

  // Off-market with price history
  if (property.last_sale_price !== null) {
    return 3;
  }

  // Off-market without price data
  return 4;
}

/**
 * Returns penalty score for data quality issues.
 * Properties with no image get pushed to the bottom.
 */
function getDataQualityPenalty(property: Property): number {
  const hasImage = property.best_image_url || property.hero_image;
  return hasImage ? 0 : 1000;
}

/**
 * Smart sort comparator - combines experience priority + data quality
 */
function smartSortComparator(a: Property, b: Property): number {
  const scoreA = getExperiencePriority(a) + getDataQualityPenalty(a);
  const scoreB = getExperiencePriority(b) + getDataQualityPenalty(b);
  return scoreA - scoreB;
}

// =============================================================================
// PRICE HELPERS
// =============================================================================

/**
 * Gets the best available price for sorting.
 * Prefers listing_price (current), falls back to last_sale_price (historical)
 */
function getEffectivePrice(property: Property): number | null {
  return property.listing_price ?? property.last_sale_price ?? null;
}

// =============================================================================
// MAIN SORT FUNCTION
// =============================================================================

/**
 * Sorts properties by the specified sort option.
 * Returns a new array (does not mutate input).
 */
export function sortProperties(
  properties: Property[],
  sortOption: SortOption
): Property[] {
  const sorted = [...properties];

  switch (sortOption) {
    case "smart":
      return sorted.sort(smartSortComparator);

    case "year-asc":
      // Oldest first
      return sorted.sort((a, b) => (a.year_built ?? 0) - (b.year_built ?? 0));

    case "year-desc":
      // Newest first
      return sorted.sort((a, b) => (b.year_built ?? 0) - (a.year_built ?? 0));

    case "price-asc":
      // Lowest price first (no price = at end)
      return sorted.sort((a, b) => {
        const priceA = getEffectivePrice(a) ?? Infinity;
        const priceB = getEffectivePrice(b) ?? Infinity;
        return priceA - priceB;
      });

    case "price-desc":
      // Highest price first (no price = at end)
      return sorted.sort((a, b) => {
        const priceA = getEffectivePrice(a) ?? -Infinity;
        const priceB = getEffectivePrice(b) ?? -Infinity;
        return priceB - priceA;
      });

    default:
      return sorted;
  }
}

// =============================================================================
// SORT OPTIONS CONFIG
// =============================================================================

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "smart", label: "RECOMMENDED" },
  { value: "year-desc", label: "NEWEST FIRST" },
  { value: "year-asc", label: "OLDEST FIRST" },
  { value: "price-desc", label: "PRICE: HIGH TO LOW" },
  { value: "price-asc", label: "PRICE: LOW TO HIGH" },
];
