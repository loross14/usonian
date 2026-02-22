/**
 * Import FLW Sites from franklloydwrightsites.com
 *
 * Usage:
 *   npx tsx scripts/import-flw-sites.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const DATA_DIR = path.join(__dirname, '../src/data')
const REPORTS_DIR = path.join(__dirname, '../reports')

interface ImportProperty {
  name: string
  year: number
  city: string
  state: string
}

interface Property {
  id: string
  slug: string
  home_name: string
  full_address: string | null
  parsed_city: string | null
  parsed_state: string | null
  country: string
  latitude: number | null
  longitude: number | null
  year_built: number
  architect_id: string
  client_owner: string | null
  current_owner: string | null
  preservation_status: string | null
  significance: string | null
  description: string | null
  curator_notes: string | null
  square_footage: number | null
  bedrooms: number | null
  bathrooms: number | null
  status: string
  best_image_url: string | null
  last_sale_price: number | null
  last_sale_date: string | null
  created_at: string
  updated_at: string
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function loadExistingProperties(): Property[] {
  const data = fs.readFileSync(path.join(DATA_DIR, 'properties.json'), 'utf-8')
  return JSON.parse(data)
}

function loadImportData(): { properties: ImportProperty[] } {
  const data = fs.readFileSync(path.join(REPORTS_DIR, 'flw-import-2026-02-22.json'), 'utf-8')
  return JSON.parse(data)
}

function createProperty(imp: ImportProperty, date: string): Property {
  const slug = generateSlug(imp.name)
  return {
    id: slug,
    slug: slug,
    home_name: imp.name,
    full_address: null,
    parsed_city: imp.city,
    parsed_state: imp.state,
    country: 'USA',
    latitude: null,
    longitude: null,
    year_built: imp.year,
    architect_id: 'frank-lloyd-wright',
    client_owner: null,
    current_owner: null,
    preservation_status: null,
    significance: null,
    description: null,
    curator_notes: `Imported from franklloydwrightsites.com`,
    square_footage: null,
    bedrooms: null,
    bathrooms: null,
    status: 'archived',
    best_image_url: null,
    last_sale_price: null,
    last_sale_date: null,
    created_at: date,
    updated_at: date
  }
}

async function main() {
  const date = new Date().toISOString().split('T')[0]

  console.log('Loading existing properties...')
  const existing = loadExistingProperties()
  const existingSlugs = new Set(existing.map(p => p.slug))
  const existingNames = new Set(existing.map(p => p.home_name.toLowerCase()))

  console.log(`Found ${existing.length} existing properties`)

  console.log('Loading import data...')
  const importData = loadImportData()
  console.log(`Found ${importData.properties.length} properties to import`)

  // Filter out duplicates
  const newProperties: Property[] = []
  const skipped: string[] = []

  for (const imp of importData.properties) {
    const slug = generateSlug(imp.name)
    const nameLower = imp.name.toLowerCase()

    // Check for duplicates by slug or name
    if (existingSlugs.has(slug) || existingNames.has(nameLower)) {
      skipped.push(imp.name)
      continue
    }

    // Check for partial matches (e.g., "Lykes House" vs "Norman Lykes House")
    const partialMatch = existing.find(e =>
      e.home_name.toLowerCase().includes(nameLower) ||
      nameLower.includes(e.home_name.toLowerCase())
    )
    if (partialMatch) {
      skipped.push(`${imp.name} (partial match: ${partialMatch.home_name})`)
      continue
    }

    newProperties.push(createProperty(imp, date))
    existingSlugs.add(slug)
    existingNames.add(nameLower)
  }

  console.log(`\nSkipped ${skipped.length} duplicates:`)
  skipped.forEach(s => console.log(`  - ${s}`))

  console.log(`\nAdding ${newProperties.length} new properties...`)

  // Merge and save
  const merged = [...existing, ...newProperties]
  fs.writeFileSync(
    path.join(DATA_DIR, 'properties.json'),
    JSON.stringify(merged, null, 2)
  )

  console.log(`\nDone! Total properties: ${merged.length}`)

  // Summary by state
  const byState: Record<string, number> = {}
  for (const p of newProperties) {
    const state = p.parsed_state || 'Unknown'
    byState[state] = (byState[state] || 0) + 1
  }

  console.log('\nNew properties by state:')
  Object.entries(byState)
    .sort((a, b) => b[1] - a[1])
    .forEach(([state, count]) => console.log(`  ${state}: ${count}`))
}

main().catch(console.error)
