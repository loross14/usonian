/**
 * Helper utilities for AI-generated hero images (JPG photos)
 */

import heroImagesIndex from "@/data/hero-images-index.json";

// Set of slugs that have hero JPG images
const heroImageSlugs = new Set(
  heroImagesIndex.properties.map((p) => p.slug)
);

/**
 * Check if a hero JPG image exists for a property slug
 */
export function hasHeroImage(slug: string): boolean {
  return heroImageSlugs.has(slug);
}

/**
 * Get the URL path for a hero JPG image
 * Returns null if no hero image exists for this slug
 */
export function getHeroImageUrl(slug: string): string | null {
  if (!hasHeroImage(slug)) {
    return null;
  }
  return `/ai-images/hero/${slug}.jpg`;
}
