/**
 * Helper utilities for architect portrait photos
 */

// Map of architect slugs to their photo file paths
const architectPhotos: Record<string, string> = {
  "john-lautner": "/architect-photos/john-lautner.png",
  "e-fay-jones": "/architect-photos/e-fay-jones.webp",
  "alden-b-dow": "/architect-photos/alden-b-dow.jpg",
  "arthur-dyson": "/architect-photos/arthur-dyson.jpg",
  "edgar-tafel": "/architect-photos/edgar-tafel.jpeg",
  "eric-lloyd-wright": "/architect-photos/eric-lloyd-wright.webp",
};

/**
 * Check if a portrait photo exists for an architect slug
 */
export function hasArchitectPortrait(slug: string): boolean {
  return slug in architectPhotos;
}

/**
 * Get the URL path for an architect's portrait photo
 * Returns null if no portrait exists for this architect
 */
export function getArchitectPortraitUrl(slug: string): string | null {
  return architectPhotos[slug] || null;
}

/**
 * For backwards compatibility - returns the same as getArchitectPortraitUrl
 * (We no longer have separate wide versions for photos)
 */
export function getArchitectPortraitWideUrl(slug: string): string | null {
  return architectPhotos[slug] || null;
}
