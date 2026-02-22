/**
 * MCM Research Agent
 *
 * A research agent that gathers data on Mid-Century Modern architects and homes.
 * Can be run manually or scheduled as a daily cron job.
 *
 * Usage:
 *   npx tsx scripts/research-agent.ts daily          # Run daily scan
 *   npx tsx scripts/research-agent.ts architect "Bruce Goff"
 *   npx tsx scripts/research-agent.ts property "Chemosphere"
 *   npx tsx scripts/research-agent.ts listings
 *   npx tsx scripts/research-agent.ts flw-monitor    # Monitor FLW properties
 *   npx tsx scripts/research-agent.ts flw-sites      # Gap analysis by state
 */

import * as fs from 'fs'
import * as path from 'path'

const DATA_DIR = path.join(__dirname, '../src/data')
const REPORTS_DIR = path.join(__dirname, '../reports')

interface Property {
  id: string
  slug: string
  home_name: string
  architect_id: string
  last_sale_price: number | null
  status: string
  [key: string]: unknown
}

interface Architect {
  id: string
  slug: string
  name: string
  [key: string]: unknown
}

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true })
}

// Load current data
function loadProperties(): Property[] {
  const data = fs.readFileSync(path.join(DATA_DIR, 'properties.json'), 'utf-8')
  return JSON.parse(data)
}

function loadArchitects(): Architect[] {
  const data = fs.readFileSync(path.join(DATA_DIR, 'architects.json'), 'utf-8')
  return JSON.parse(data)
}

// Search queries for finding MCM listings
const SEARCH_QUERIES = [
  'John Lautner house for sale',
  'E. Fay Jones house for sale',
  'Alden B. Dow house for sale',
  'mid century modern architect designed home for sale',
  'Frank Lloyd Wright apprentice house listing',
  'Taliesin architect home for sale',
  'organic architecture home for sale',
  'usonian home for sale',
]

// Architects to track for new listings
const TRACKED_ARCHITECTS = [
  'John Lautner',
  'E. Fay Jones',
  'Alden B. Dow',
  'Paolo Soleri',
  'Aaron Green',
  'Edgar Tafel',
  'Arthur Dyson',
  'Eric Lloyd Wright',
  'Cornelia Brierly',
  'William Wesley Peters',
  'John Rattenbury',
  'Vernon Swaback',
]

// FLW properties to monitor (from savewright.org research)
const FLW_MONITORED_PROPERTIES = [
  { id: 'norman-lykes-house', name: 'Norman Lykes House', location: 'Phoenix, AZ', price: 8800000 },
  { id: 'benjamin-adelman-house', name: 'Benjamin Adelman House', location: 'Phoenix, AZ', price: 4950000 },
  { id: 'spring-house-lewis', name: 'Spring House', location: 'Tallahassee, FL', price: 2128000 },
  { id: 'david-christine-weisblat-house', name: 'Weisblat House', location: 'Galesburg, MI', price: 1444000 },
  { id: 'samuel-dorothy-eppstein-house', name: 'Eppstein House', location: 'Galesburg, MI', price: 2100000 },
]

// All US states with FLW sites (from franklloydwrightsites.com)
const FLW_SITES_STATES = [
  { state: 'Alabama', slug: 'alabama', abbrev: 'AL' },
  { state: 'Arizona', slug: 'arizona', abbrev: 'AZ' },
  { state: 'Arkansas', slug: 'arkansas', abbrev: 'AR' },
  { state: 'California', slug: 'california', abbrev: 'CA' },
  { state: 'Connecticut', slug: 'connecticut', abbrev: 'CT' },
  { state: 'Delaware', slug: 'delaware', abbrev: 'DE' },
  { state: 'Florida', slug: 'florida', abbrev: 'FL' },
  { state: 'Hawaii', slug: 'hawaii', abbrev: 'HI' },
  { state: 'Idaho', slug: 'idaho', abbrev: 'ID' },
  { state: 'Illinois', slug: 'illinois', abbrev: 'IL' },
  { state: 'Indiana', slug: 'indiana', abbrev: 'IN' },
  { state: 'Iowa', slug: 'iowa', abbrev: 'IA' },
  { state: 'Kansas', slug: 'kansas', abbrev: 'KS' },
  { state: 'Kentucky', slug: 'kentucky', abbrev: 'KY' },
  { state: 'Maryland', slug: 'maryland', abbrev: 'MD' },
  { state: 'Massachusetts', slug: 'massachusetts', abbrev: 'MA' },
  { state: 'Michigan', slug: 'michigan', abbrev: 'MI' },
  { state: 'Minnesota', slug: 'minnesota', abbrev: 'MN' },
  { state: 'Mississippi', slug: 'mississippi', abbrev: 'MS' },
  { state: 'Missouri', slug: 'missouri', abbrev: 'MO' },
  { state: 'Montana', slug: 'montana', abbrev: 'MT' },
  { state: 'Nebraska', slug: 'nebraska', abbrev: 'NE' },
  { state: 'New Hampshire', slug: 'newhampshire', abbrev: 'NH' },
  { state: 'New Jersey', slug: 'new-jersey', abbrev: 'NJ' },
  { state: 'New Mexico', slug: 'newmexico', abbrev: 'NM' },
  { state: 'New York', slug: 'newyork', abbrev: 'NY' },
  { state: 'Ohio', slug: 'ohio', abbrev: 'OH' },
  { state: 'Oklahoma', slug: 'oklahoma', abbrev: 'OK' },
  { state: 'Oregon', slug: 'oregon', abbrev: 'OR' },
  { state: 'Pennsylvania', slug: 'pennsylvania', abbrev: 'PA' },
  { state: 'South Carolina', slug: 'south-carolina', abbrev: 'SC' },
  { state: 'Tennessee', slug: 'tennessee', abbrev: 'TN' },
  { state: 'Texas', slug: 'texas', abbrev: 'TX' },
  { state: 'Utah', slug: 'utah', abbrev: 'UT' },
  { state: 'Virginia', slug: 'virginia', abbrev: 'VA' },
  { state: 'Washington', slug: 'washington', abbrev: 'WA' },
  { state: 'Wisconsin', slug: 'wisconsin', abbrev: 'WI' },
  { state: 'Wyoming', slug: 'wyoming', abbrev: 'WY' },
]

// Generate daily report template
function generateDailyReport(): string {
  const properties = loadProperties()
  const architects = loadArchitects()
  const date = new Date().toISOString().split('T')[0]

  const report = `# Usonian Daily Research Report - ${date}

## Current Database Status
- **Properties**: ${properties.length}
- **Architects**: ${architects.length}

## Properties by Status
${getStatusSummary(properties)}

## Search Queries to Run
${SEARCH_QUERIES.map((q, i) => `${i + 1}. "${q}"`).join('\n')}

## Architects to Monitor
${TRACKED_ARCHITECTS.map(a => `- ${a}`).join('\n')}

## Research Tasks

### 1. Check Existing Listings
Review these properties for status changes:
${properties
  .filter(p => p.status === 'active' || p.last_sale_price)
  .slice(0, 10)
  .map(p => `- [ ] ${p.home_name} (${p.architect_id})`)
  .join('\n')}

### 2. Search for New Listings
Run the search queries above and document any new findings.

### 3. Verify Recent Sales
Check county records for properties marked as recently sold.

## Notes
_Add research notes here_

---
Generated by MCM Research Agent
`

  return report
}

function getStatusSummary(properties: Property[]): string {
  const counts: Record<string, number> = {}
  for (const p of properties) {
    counts[p.status] = (counts[p.status] || 0) + 1
  }
  return Object.entries(counts)
    .map(([status, count]) => `- ${status}: ${count}`)
    .join('\n')
}

// Generate architect research template
function generateArchitectTemplate(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  return `# Architect Research: ${name}

## Basic Information
- **Full Name**: ${name}
- **Slug**: ${slug}
- **Birth Year**:
- **Death Year**:
- **Birthplace**:

## FLW/Taliesin Connection
- **Fellowship Years**:
- **Role at Taliesin**:
- **Notable Projects with FLW**:

## Biography
_Write 2-3 sentences about their career and significance_

## Notable Works
1.
2.
3.

## Sources
- [ ] Wikipedia
- [ ] FLW Foundation
- [ ] AIA records
- [ ] University archives

## JSON Output
\`\`\`json
{
  "id": "${slug}",
  "slug": "${slug}",
  "name": "${name}",
  "birth_year": null,
  "death_year": null,
  "birthplace": null,
  "biography": "",
  "fellowship_years": null,
  "image_url": null,
  "property_count": 0
}
\`\`\`

---
Generated by MCM Research Agent
`
}

// Generate property research template
function generatePropertyTemplate(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

  return `# Property Research: ${name}

## Basic Information
- **Home Name**: ${name}
- **Slug**: ${slug}
- **Full Address**:
- **City**:
- **State**:
- **Year Built**:

## Architect
- **Architect Name**:
- **Architect ID**:

## Ownership
- **Original Owner/Client**:
- **Current Owner**:

## Property Details
- **Square Footage**:
- **Bedrooms**:
- **Bathrooms**:

## Preservation Status
- [ ] NRHP (National Register of Historic Places)
- [ ] NHL (National Historic Landmark)
- [ ] State Register
- [ ] Local Landmark
- [ ] None

## Sales History
| Date | Price | Buyer | Notes |
|------|-------|-------|-------|
|      |       |       |       |

## Description
_Architectural description and significance_

## Images
- Best Image URL:

## Sources
- [ ] Zillow/Redfin
- [ ] County records
- [ ] Preservation database
- [ ] Architectural publications

## JSON Output
\`\`\`json
{
  "id": "${slug}",
  "slug": "${slug}",
  "home_name": "${name}",
  "full_address": null,
  "parsed_city": null,
  "parsed_state": null,
  "country": "USA",
  "latitude": null,
  "longitude": null,
  "year_built": null,
  "architect_id": "",
  "client_owner": null,
  "current_owner": null,
  "preservation_status": null,
  "significance": null,
  "description": null,
  "curator_notes": null,
  "square_footage": null,
  "bedrooms": null,
  "bathrooms": null,
  "status": "archived",
  "best_image_url": null,
  "last_sale_price": null,
  "last_sale_date": null,
  "created_at": "${new Date().toISOString().split('T')[0]}",
  "updated_at": "${new Date().toISOString().split('T')[0]}"
}
\`\`\`

---
Generated by MCM Research Agent
`
}

// Generate FLW monitoring report
function generateFlwMonitorReport(): string {
  const properties = loadProperties()
  const date = new Date().toISOString().split('T')[0]

  const flwActive = properties.filter(p =>
    p.architect_id === 'frank-lloyd-wright' && p.status === 'active'
  )

  const totalValue = flwActive.reduce((sum, p) => sum + (p.last_sale_price || 0), 0)

  return `# Frank Lloyd Wright Properties Monitor - ${date}

## Portfolio Overview
- **Total Active FLW Listings**: ${flwActive.length}
- **Combined Asking Value**: $${totalValue.toLocaleString()}

## Properties to Check

${FLW_MONITORED_PROPERTIES.map(mp => {
  const dbProp = properties.find(p => p.id === mp.id)
  const dbPrice = dbProp?.last_sale_price || 0
  const priceMatch = dbPrice === mp.price ? '✓' : '⚠️ PRICE CHANGE'
  const status = dbProp?.status || 'unknown'

  return `### ${mp.name}
- **Location**: ${mp.location}
- **Recorded Price**: $${mp.price.toLocaleString()}
- **Database Price**: $${dbPrice.toLocaleString()} ${priceMatch}
- **Status**: ${status}
- **Check**: [ ] Zillow [ ] Redfin [ ] SaveWright.org`
}).join('\n\n')}

## Search Links for Price Verification
${FLW_MONITORED_PROPERTIES.map(mp =>
  `- [${mp.name}](https://www.google.com/search?q=${encodeURIComponent(mp.name + ' for sale ' + mp.location)})`
).join('\n')}

## SaveWright.org Check
- [Properties For Sale](https://savewright.org/wright-on-the-market/properties-for-sale/)

## Price Change Log
| Property | Previous Price | New Price | Change | Date |
|----------|---------------|-----------|--------|------|
| _Add changes here_ | | | | |

## Status Change Log
| Property | Previous Status | New Status | Date |
|----------|----------------|------------|------|
| _Add changes here_ | | | |

## Notes
_Add monitoring notes here_

---
Generated by MCM Research Agent - FLW Monitor
Last baseline: ${date}
`
}

// Generate FLW sites gap analysis report
function generateFlwSitesReport(): string {
  const properties = loadProperties()
  const date = new Date().toISOString().split('T')[0]

  // Get all FLW properties from our database
  const flwProperties = properties.filter(p =>
    p.architect_id === 'frank-lloyd-wright'
  )

  // Group by state
  const byState: Record<string, Property[]> = {}
  for (const p of flwProperties) {
    const state = (p.parsed_state || 'Unknown') as string
    if (!byState[state]) byState[state] = []
    byState[state].push(p)
  }

  // Count states represented
  const statesRepresented = Object.keys(byState).filter(s => s !== 'Unknown').length

  // Generate state-by-state analysis
  const stateAnalysis = FLW_SITES_STATES.map(s => {
    const stateProps = byState[s.abbrev] || []
    const propList = stateProps.length > 0
      ? stateProps.map(p => `  - ${p.home_name} (${p.parsed_city || 'Unknown'})`).join('\n')
      : '  _No properties in database_'

    return `### ${s.state} (${s.abbrev})
- **In Database**: ${stateProps.length} properties
- **On franklloydwrightsites.com**: [View all](https://franklloydwrightsites.com/sites/${s.slug}/)
- **Our Properties**:
${propList}`
  }).join('\n\n')

  // Generate gap checklist
  const gapChecklist = FLW_SITES_STATES.map(s => {
    const count = (byState[s.abbrev] || []).length
    return `| ${s.abbrev} | ${count} | [ ] | |`
  }).join('\n')

  return `# FLW Sites Gap Analysis - ${date}

## Summary
- **Total FLW in Database**: ${flwProperties.length}
- **States Represented**: ${statesRepresented} of ${FLW_SITES_STATES.length}
- **Source**: [franklloydwrightsites.com](https://franklloydwrightsites.com/sites/)

## State-by-State Analysis

${stateAnalysis}

## Gap Checklist

Compare our database count against franklloydwrightsites.com for each state:

| State | DB Count | Checked | Notes |
|-------|----------|---------|-------|
${gapChecklist}

## Research Tasks

1. Visit each state page on franklloydwrightsites.com
2. Compare site count against our DB count
3. Note missing properties for future data entry
4. Prioritize states with largest gaps

---
Generated by MCM Research Agent - FLW Sites
Source: franklloydwrightsites.com
`
}

// Generate listings search template
function generateListingsTemplate(): string {
  const architects = loadArchitects()

  return `# MCM Listings Research

## Search Queries

### General MCM Searches
${SEARCH_QUERIES.map((q, i) => `${i + 1}. [${q}](https://www.google.com/search?q=${encodeURIComponent(q)})`).join('\n')}

### Architect-Specific Searches
${architects.slice(0, 15).map(a =>
  `- [${a.name} house for sale](https://www.google.com/search?q=${encodeURIComponent(a.name + ' house for sale')})`
).join('\n')}

## Real Estate Sites to Check
- [Zillow MCM](https://www.zillow.com/)
- [Redfin](https://www.redfin.com/)
- [Sotheby's](https://www.sothebysrealty.com/)
- [Christie's Real Estate](https://www.christiesrealestate.com/)
- [Dwell](https://www.dwell.com/homes-for-sale)

## New Listings Found

### Listing 1
- **Property Name**:
- **Architect**:
- **Location**:
- **Year Built**:
- **Asking Price**:
- **Listing URL**:
- **Status**: New / Price Change / Back on Market

### Listing 2
_Copy template above_

## Price Changes

| Property | Old Price | New Price | Change |
|----------|-----------|-----------|--------|
|          |           |           |        |

## Sold Properties

| Property | Sale Price | Sale Date | Buyer |
|----------|------------|-----------|-------|
|          |            |           |       |

---
Generated by MCM Research Agent
`
}

// Main CLI
async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'help'
  const param = args.slice(1).join(' ')

  const date = new Date().toISOString().split('T')[0]

  switch (command) {
    case 'daily': {
      const report = generateDailyReport()
      const filename = `daily-report-${date}.md`
      fs.writeFileSync(path.join(REPORTS_DIR, filename), report)
      console.log(`Daily report generated: reports/${filename}`)
      console.log(report)
      break
    }

    case 'architect': {
      if (!param) {
        console.error('Usage: npx tsx scripts/research-agent.ts architect "Architect Name"')
        process.exit(1)
      }
      const template = generateArchitectTemplate(param)
      const slug = param.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const filename = `architect-${slug}-${date}.md`
      fs.writeFileSync(path.join(REPORTS_DIR, filename), template)
      console.log(`Architect research template generated: reports/${filename}`)
      console.log(template)
      break
    }

    case 'property': {
      if (!param) {
        console.error('Usage: npx tsx scripts/research-agent.ts property "Property Name"')
        process.exit(1)
      }
      const template = generatePropertyTemplate(param)
      const slug = param.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const filename = `property-${slug}-${date}.md`
      fs.writeFileSync(path.join(REPORTS_DIR, filename), template)
      console.log(`Property research template generated: reports/${filename}`)
      console.log(template)
      break
    }

    case 'listings': {
      const template = generateListingsTemplate()
      const filename = `listings-${date}.md`
      fs.writeFileSync(path.join(REPORTS_DIR, filename), template)
      console.log(`Listings research template generated: reports/${filename}`)
      console.log(template)
      break
    }

    case 'flw-monitor': {
      const report = generateFlwMonitorReport()
      const filename = `flw-monitor-${date}.md`
      fs.writeFileSync(path.join(REPORTS_DIR, filename), report)
      console.log(`FLW Monitor report generated: reports/${filename}`)
      console.log(report)
      break
    }

    case 'flw-sites': {
      const report = generateFlwSitesReport()
      const filename = `flw-sites-${date}.md`
      fs.writeFileSync(path.join(REPORTS_DIR, filename), report)
      console.log(`FLW Sites report generated: reports/${filename}`)
      console.log(report)
      break
    }

    case 'help':
    default:
      console.log(`
MCM Research Agent

Usage:
  npx tsx scripts/research-agent.ts <command> [options]

Commands:
  daily                      Generate daily research report
  architect "<name>"         Generate architect research template
  property "<name>"          Generate property research template
  listings                   Generate listings search template
  flw-monitor                Monitor FLW properties for price/status changes
  flw-sites                  Gap analysis: compare DB against franklloydwrightsites.com
  help                       Show this help message

Examples:
  npx tsx scripts/research-agent.ts daily
  npx tsx scripts/research-agent.ts architect "Bruce Goff"
  npx tsx scripts/research-agent.ts property "Chemosphere"
  npx tsx scripts/research-agent.ts listings
  npx tsx scripts/research-agent.ts flw-monitor
  npx tsx scripts/research-agent.ts flw-sites

Reports are saved to: ./reports/
`)
  }
}

main().catch(console.error)
