/**
 * Helper utilities for generated SVG house illustrations
 */

import generatedHousesIndex from "@/data/generated-houses-index.json";

// Set of slugs that have generated SVG illustrations
const generatedHouseSlugs = new Set(
  generatedHousesIndex.properties.map((p) => p.slug)
);

/**
 * Check if a generated SVG illustration exists for a property slug
 */
export function hasGeneratedSvg(slug: string): boolean {
  return generatedHouseSlugs.has(slug);
}

/**
 * Get the URL path for a generated SVG illustration
 * Returns null if no SVG exists for this slug
 */
export function getGeneratedSvgUrl(slug: string): string | null {
  if (!hasGeneratedSvg(slug)) {
    return null;
  }
  return `/generated-houses/${slug}.svg`;
}
