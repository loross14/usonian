/**
 * Data layer - abstracts data source (static JSON vs Supabase)
 *
 * Set USE_SUPABASE=true in .env.local to use Supabase
 * Otherwise falls back to static JSON files
 */

import type { Property, Architect } from '@/types'

// Static JSON imports
import propertiesJson from '@/data/properties.json'
import architectsJson from '@/data/architects.json'

const USE_SUPABASE = process.env.USE_SUPABASE === 'true'

// Cast static data to proper types
const staticProperties = propertiesJson as Property[]
const staticArchitects = architectsJson as Architect[]

/**
 * Get all properties
 */
export async function getProperties(): Promise<Property[]> {
  if (USE_SUPABASE) {
    const { getProperties: getSupabaseProperties } = await import('@/lib/queries/properties')
    return getSupabaseProperties()
  }
  return staticProperties
}

/**
 * Get a property by slug
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (USE_SUPABASE) {
    const { getPropertyBySlug: getSupabaseProperty } = await import('@/lib/queries/properties')
    return getSupabaseProperty(slug)
  }
  return staticProperties.find(p => p.slug === slug) || null
}

/**
 * Get properties by architect
 */
export async function getPropertiesByArchitect(architectId: string): Promise<Property[]> {
  if (USE_SUPABASE) {
    const { getPropertiesByArchitect: getSupabasePropertiesByArchitect } = await import('@/lib/queries/properties')
    return getSupabasePropertiesByArchitect(architectId)
  }
  return staticProperties.filter(p => p.architect_id === architectId)
}

/**
 * Get all architects
 */
export async function getArchitects(): Promise<Architect[]> {
  if (USE_SUPABASE) {
    const { getArchitects: getSupabaseArchitects } = await import('@/lib/queries/architects')
    return getSupabaseArchitects()
  }
  return staticArchitects
}

/**
 * Get an architect by slug
 */
export async function getArchitectBySlug(slug: string): Promise<Architect | null> {
  if (USE_SUPABASE) {
    const { getArchitectBySlug: getSupabaseArchitect } = await import('@/lib/queries/architects')
    return getSupabaseArchitect(slug)
  }
  return staticArchitects.find(a => a.slug === slug) || null
}

/**
 * Get featured properties (for homepage carousel)
 */
export async function getFeaturedProperties(limit: number = 5): Promise<Property[]> {
  if (USE_SUPABASE) {
    const { getFeaturedProperties: getSupabaseFeatured } = await import('@/lib/queries/properties')
    return getSupabaseFeatured(limit)
  }
  // Return properties with image URLs for featured display
  return staticProperties
    .filter(p => p.best_image_url)
    .slice(0, limit)
}

/**
 * Get static data for generateStaticParams (always uses JSON)
 */
export function getStaticProperties(): Property[] {
  return staticProperties
}

export function getStaticArchitects(): Architect[] {
  return staticArchitects
}
