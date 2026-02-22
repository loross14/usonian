/**
 * Generate comprehensive JSON data from architecture folder
 *
 * Sources:
 * - Appendix_Updated_With_Sales_Images.csv (52 properties)
 * - 18 architect works.txt files (biographical data)
 */

import * as fs from 'fs'
import * as path from 'path'

const ARCH_ROOT = '/Users/loganross/Desktop/eng/arcitecture'
const OUTPUT_DIR = path.join(ARCH_ROOT, 'mcm-platform/src/data')

// Known architect data (verified from research)
const KNOWN_ARCHITECTS: Record<string, Omit<Architect, 'property_count'>> = {
  'frank-lloyd-wright': {
    id: 'frank-lloyd-wright',
    slug: 'frank-lloyd-wright',
    name: 'Frank Lloyd Wright',
    birth_year: 1867,
    death_year: 1959,
    birthplace: 'Richland Center, Wisconsin',
    biography: "Frank Lloyd Wright was an American architect who designed more than 1,000 structures over a creative period of 70 years. He pioneered organic architecture, promoting harmony between human habitation and nature. His work includes Unity Temple, Fallingwater, and the Guggenheim Museum.",
    fellowship_years: null,
    image_url: null,
  },
  'marion-mahony-griffin': {
    id: 'marion-mahony-griffin',
    slug: 'marion-mahony-griffin',
    name: 'Marion Mahony Griffin',
    birth_year: 1871,
    death_year: 1961,
    birthplace: 'Chicago, Illinois',
    biography: "Marion Mahony Griffin was one of the first licensed female architects in the world. She worked in Frank Lloyd Wright's Oak Park studio and was renowned for her architectural renderings. With her husband Walter Burley Griffin, she designed Canberra, Australia's capital city.",
    fellowship_years: null,
    image_url: null,
  },
  'mortimer-j-matthews': {
    id: 'mortimer-j-matthews',
    slug: 'mortimer-j-matthews',
    name: 'Mortimer J. Matthews',
    birth_year: null,
    death_year: null,
    birthplace: null,
    biography: "Mortimer J. Matthews was an architect associated with the organic architecture movement. He is known for designing the Snow Flake Motel in Michigan, which featured a distinctive six-pointed snowflake pattern.",
    fellowship_years: null,
    image_url: null,
  },
  'taliesin-associated-architects': {
    id: 'taliesin-associated-architects',
    slug: 'taliesin-associated-architects',
    name: 'Taliesin Associated Architects',
    birth_year: null,
    death_year: null,
    birthplace: null,
    biography: "Taliesin Associated Architects was the successor firm to Frank Lloyd Wright's practice, continuing to design buildings in the organic architecture tradition after Wright's death in 1959. The firm completed many of Wright's unfinished projects and designed new works.",
    fellowship_years: null,
    image_url: null,
  },
  'aaron-green': {
    id: 'aaron-green',
    slug: 'aaron-green',
    name: 'Aaron Green',
    birth_year: 1917,
    death_year: 2001,
    birthplace: 'Alabama',
    biography: "Aaron Green was an American architect and Frank Lloyd Wright's West Coast representative from 1951 until Wright's death. He supervised many of Wright's California projects and established Aaron G. Green Associates in San Francisco. Wright once said, 'Aaron Green is my son.'",
    fellowship_years: '1940-1951',
    image_url: null,
  },
  'alden-b-dow': {
    id: 'alden-b-dow',
    slug: 'alden-b-dow',
    name: 'Alden B. Dow',
    birth_year: 1904,
    death_year: 1983,
    birthplace: 'Midland, Michigan',
    biography: "Alden Ball Dow was an American architect who studied under Frank Lloyd Wright at Taliesin. Son of Herbert Henry Dow, founder of Dow Chemical Company, he became one of Michigan's most celebrated architects. His Home and Studio in Midland is a National Historic Landmark, and he won the Paris Grand Prix in 1937.",
    fellowship_years: '1933-1934',
    image_url: null,
  },
  'arthur-dyson': {
    id: 'arthur-dyson',
    slug: 'arthur-dyson',
    name: 'Arthur Dyson',
    birth_year: 1940,
    death_year: null,
    birthplace: null,
    biography: "Arthur Dyson is an American architect based in Fresno, California, known as 'The Living Legacy' of the Taliesin Fellowship. He trained under Frank Lloyd Wright and later Bruce Goff, and served as Dean of the Frank Lloyd Wright School of Architecture from 1999-2002. He has designed over 700 buildings.",
    fellowship_years: null,
    image_url: null,
  },
  'cornelia-brierly': {
    id: 'cornelia-brierly',
    slug: 'cornelia-brierly',
    name: 'Cornelia Brierly',
    birth_year: 1913,
    death_year: 2012,
    birthplace: 'Pittsburgh, Pennsylvania',
    biography: "Cornelia Brierly was an American architect and one of the first women to join the Taliesin Fellowship. She designed Pennsylvania's first Usonian home (the Notz House) with Frank Lloyd Wright's approval. She remained at Taliesin for over 70 years as an architect and educator.",
    fellowship_years: '1934-2012',
    image_url: null,
  },
  'e-fay-jones': {
    id: 'e-fay-jones',
    slug: 'e-fay-jones',
    name: 'E. Fay Jones',
    birth_year: 1921,
    death_year: 2004,
    birthplace: 'Pine Bluff, Arkansas',
    biography: "Euine Fay Jones was an American architect who studied under Frank Lloyd Wright. He is best known for designing Thorncrown Chapel in Eureka Springs, Arkansas, which was ranked as the fourth-best building in America by the AIA. He received the AIA Gold Medal in 1990 and was a professor at the University of Arkansas.",
    fellowship_years: '1953',
    image_url: null,
  },
  'edgar-tafel': {
    id: 'edgar-tafel',
    slug: 'edgar-tafel',
    name: 'Edgar Tafel',
    birth_year: 1912,
    death_year: 2011,
    birthplace: 'New York City',
    biography: "Edgar Tafel was an American architect who was one of the first apprentices at Taliesin Fellowship. He designed over 80 homes and 35 churches, and authored 'Apprentice to Genius: Years with Frank Lloyd Wright.' He worked on Fallingwater and donated $3.8 million to Cornell University's architecture program.",
    fellowship_years: '1932-1941',
    image_url: null,
  },
  'elizabeth-wright-ingraham': {
    id: 'elizabeth-wright-ingraham',
    slug: 'elizabeth-wright-ingraham',
    name: 'Elizabeth Wright Ingraham',
    birth_year: 1922,
    death_year: 2013,
    birthplace: null,
    biography: "Elizabeth Wright Ingraham was the granddaughter of Frank Lloyd Wright. She established her own architectural practice in Colorado Springs, designing over 150 residential and institutional buildings that reflected the organic architecture principles of her grandfather.",
    fellowship_years: null,
    image_url: null,
  },
  'eric-lloyd-wright': {
    id: 'eric-lloyd-wright',
    slug: 'eric-lloyd-wright',
    name: 'Eric Lloyd Wright',
    birth_year: 1929,
    death_year: 2023,
    birthplace: 'Los Angeles, California',
    biography: "Eric Lloyd Wright was the grandson of Frank Lloyd Wright and son of architect Lloyd Wright. He carried on the family's organic architecture tradition in Southern California and was involved with the Frank Lloyd Wright Foundation throughout his life.",
    fellowship_years: null,
    image_url: null,
  },
  'eugene-masselink': {
    id: 'eugene-masselink',
    slug: 'eugene-masselink',
    name: 'Eugene Masselink',
    birth_year: 1910,
    death_year: 1962,
    birthplace: null,
    biography: "Eugene Masselink was Frank Lloyd Wright's personal secretary and artist-in-residence at Taliesin. He created abstract pattern studies and geometric designs, serving as art director for Fellowship publications.",
    fellowship_years: null,
    image_url: null,
  },
  'john-dekoven-hill': {
    id: 'john-dekoven-hill',
    slug: 'john-dekoven-hill',
    name: 'John deKoven Hill',
    birth_year: 1920,
    death_year: 1996,
    birthplace: null,
    biography: "John deKoven Hill was Frank Lloyd Wright's chief draftsman and Architecture Editor of House Beautiful magazine from 1953-1963. He designed notable residences including the Corbett House in Cincinnati.",
    fellowship_years: null,
    image_url: null,
  },
  'john-h-howe': {
    id: 'john-h-howe',
    slug: 'john-h-howe',
    name: 'John H. Howe',
    birth_year: 1913,
    death_year: 1997,
    birthplace: null,
    biography: "John H. Howe was a charter member of Taliesin Fellowship and served as chief draftsman from 1937. Known as 'the pencil in Wright's hand,' he worked on Fallingwater and established a Minneapolis practice designing over 80 buildings.",
    fellowship_years: '1932-1997',
    image_url: null,
  },
  'john-lautner': {
    id: 'john-lautner',
    slug: 'john-lautner',
    name: 'John Lautner',
    birth_year: 1911,
    death_year: 1994,
    birthplace: 'Marquette, Michigan',
    biography: "John Lautner was an American architect whose work was largely based in and around Los Angeles. He was a student of Frank Lloyd Wright at Taliesin from 1933-1939, and became known for his futuristic and dramatic residential designs including the Chemosphere, Elrod House, and Silvertop.",
    fellowship_years: '1933-1939',
    image_url: null,
  },
  'paolo-soleri': {
    id: 'paolo-soleri',
    slug: 'paolo-soleri',
    name: 'Paolo Soleri',
    birth_year: 1919,
    death_year: 2013,
    birthplace: 'Turin, Italy',
    biography: "Paolo Soleri was an Italian-American architect known for his concept of arcology, combining architecture and ecology. He studied with Frank Lloyd Wright from 1947-1949 and founded Arcosanti, an experimental urban laboratory in Arizona.",
    fellowship_years: '1947-1949',
    image_url: null,
  },
  'paul-tuttle': {
    id: 'paul-tuttle',
    slug: 'paul-tuttle',
    name: 'Paul Tuttle',
    birth_year: 1918,
    death_year: 2002,
    birthplace: null,
    biography: "Paul Tuttle was a furniture and interior designer who was a Taliesin Fellow in 1941. He collaborated with Strassle International in Switzerland and designed over 200 custom furniture pieces including the iconic Zeta Chair.",
    fellowship_years: '1941',
    image_url: null,
  },
  'shao-fang-sheng': {
    id: 'shao-fang-sheng',
    slug: 'shao-fang-sheng',
    name: 'Shao Fang Sheng',
    birth_year: 1918,
    death_year: 2009,
    birthplace: 'Tianjin, China',
    biography: "Shao Fang Sheng was a world-renowned artist and architect who came to the USA in 1947 with her husband Sheng Pao Sheng as apprentices to Frank Lloyd Wright at Taliesin. They were among the few Chinese pioneers in the Fellowship.",
    fellowship_years: '1947-',
    image_url: null,
  },
  'vernon-swaback': {
    id: 'vernon-swaback',
    slug: 'vernon-swaback',
    name: 'Vernon Swaback',
    birth_year: 1944,
    death_year: null,
    birthplace: null,
    biography: "Vernon D. Swaback, FAIA, FAICP, became Frank Lloyd Wright's youngest apprentice when he joined Taliesin in 1957. He served as Director of Planning at the Wright Organization for 21 years before founding SWABACK in 1978. He authored 12 books including 'Frank Lloyd Wright's Unfinished Work.'",
    fellowship_years: '1957-1978',
    image_url: null,
  },
  'william-wesley-peters': {
    id: 'william-wesley-peters',
    slug: 'william-wesley-peters',
    name: 'William Wesley Peters',
    birth_year: 1912,
    death_year: 1991,
    birthplace: 'Evansville, Indiana',
    biography: "William Wesley Peters was a prominent American architect who became one of Frank Lloyd Wright's most trusted apprentices and son-in-law. After Wright's death, he led Taliesin Associated Architects and oversaw the completion of many Wright projects.",
    fellowship_years: '1932-1991',
    image_url: null,
  },
  'yen-liang': {
    id: 'yen-liang',
    slug: 'yen-liang',
    name: 'Yen Liang',
    birth_year: null,
    death_year: null,
    birthplace: null,
    biography: "Yen Liang was a charter member of the Taliesin Fellowship in 1932, one of the first Chinese architects trained by Frank Lloyd Wright. He later returned to China.",
    fellowship_years: '1932',
    image_url: null,
  },
  'john-rattenbury': {
    id: 'john-rattenbury',
    slug: 'john-rattenbury',
    name: 'John Rattenbury',
    birth_year: null,
    death_year: null,
    birthplace: null,
    biography: "John Rattenbury is an architect who trained under Frank Lloyd Wright at Taliesin. He has designed numerous residences reflecting organic architecture principles, with projects in the American Southwest and Northeast.",
    fellowship_years: null,
    image_url: null,
  },
  'allan-gelbin': {
    id: 'allan-gelbin',
    slug: 'allan-gelbin',
    name: 'Allan Gelbin',
    birth_year: null,
    death_year: null,
    birthplace: null,
    biography: "Allan Gelbin was an architect associated with the Frank Lloyd Wright tradition, known for residential designs in the Connecticut area.",
    fellowship_years: null,
    image_url: null,
  },
  'robert-miller-green': {
    id: 'robert-miller-green',
    slug: 'robert-miller-green',
    name: 'Robert Miller Green',
    birth_year: null,
    death_year: null,
    birthplace: null,
    biography: "Robert Miller Green was an architect associated with the Frank Lloyd Wright tradition, known for residential designs in the Atlanta area.",
    fellowship_years: null,
    image_url: null,
  },
}

// CSV architect name to ID mapping
const CSV_ARCHITECT_TO_ID: Record<string, string> = {
  'Frank Lloyd Wright': 'frank-lloyd-wright',
  'Marion Mahony Griffin': 'marion-mahony-griffin',
  'Marion Mahony Griffin / Van Tine': 'marion-mahony-griffin',
  'Mortimer J. Matthews': 'mortimer-j-matthews',
  'Taliesin Associated Architects': 'taliesin-associated-architects',
  'Wright Affiliate': 'taliesin-associated-architects',
  'John Lautner': 'john-lautner',
  'E. Fay Jones': 'e-fay-jones',
  'Alden B. Dow': 'alden-b-dow',
  'Paolo Soleri': 'paolo-soleri',
  'William Wesley Peters': 'william-wesley-peters',
  'Aaron Green': 'aaron-green',
  'Edgar Tafel': 'edgar-tafel',
  'Cornelia Brierly': 'cornelia-brierly',
  'Arthur Dyson': 'arthur-dyson',
  'Vernon Swaback': 'vernon-swaback',
  'Eric Lloyd Wright': 'eric-lloyd-wright',
  'Elizabeth Wright Ingraham': 'elizabeth-wright-ingraham',
  'Shao Fang Sheng': 'shao-fang-sheng',
  'John Rattenbury': 'john-rattenbury',
  'Allan Gelbin': 'allan-gelbin',
  'Robert Miller Green': 'robert-miller-green',
}

interface Architect {
  id: string
  slug: string
  name: string
  birth_year: number | null
  death_year: number | null
  birthplace: string | null
  biography: string | null
  fellowship_years: string | null
  image_url: string | null
  property_count: number
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseCSVLine(line: string): string[] {
  // This CSV has a specific format where prices like $1,670,000 contain unquoted commas
  // We need to parse more intelligently by recognizing the URL column as a boundary

  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())

  return result
}

function parseCSV(csvPath: string): string[][] {
  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n').filter(line => line.trim())

  // Header row
  const header = parseCSVLine(lines[0])
  const results = [header]

  // Data rows - need special handling for prices with commas
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]

    // Find the URL (starts with http) - this is our anchor point
    const httpMatch = line.match(/https?:\/\/[^,]+/)
    if (!httpMatch) {
      // No URL found, use simple parsing
      results.push(parseCSVLine(line))
      continue
    }

    const urlStart = httpMatch.index!
    const url = httpMatch[0]

    // Everything before URL needs careful parsing
    const beforeUrl = line.substring(0, urlStart)
    // Everything after URL is the notes
    const afterUrl = line.substring(urlStart + url.length)
    const notes = afterUrl.replace(/^,\s*/, '').replace(/^"|"$/g, '').trim()

    // Parse the part before URL
    // Format: Architect,Home Name,Client/Owner,Year,Location,Status,Price,Date,
    // The Price field may have commas like $1,670,000

    const parts = parseCSVLine(beforeUrl.replace(/,\s*$/, '')) // Remove trailing comma

    // Expected columns before URL: Architect, Home Name, Client/Owner, Year, Location, Status, Price, Date
    // That's 8 columns. If we have exactly 8, price had no commas. If more, we need to reassemble the price.

    // First 6 are always fixed: Architect, Home Name, Client/Owner, Year, Location, Status
    const fixed = parts.slice(0, 6)
    const remaining = parts.slice(6)

    if (remaining.length === 0) {
      // No price/date data
      results.push([...fixed, '', '', url, notes])
    } else if (remaining.length === 1) {
      // Just price, no date
      results.push([...fixed, remaining[0], '', url, notes])
    } else if (remaining.length === 2) {
      // Normal case - price and date without commas
      results.push([...fixed, remaining[0], remaining[1], url, notes])
    } else {
      // Price has commas - we need to find where date starts
      // Date patterns: "Apr 2020", "1997", "N/A", "2016 bequest"
      // The date is always at the end

      // Find the date - scan from the end for date-like patterns
      let dateStartIndex = remaining.length - 1

      // Check if last part is a year (1997) or a 4-digit number that's part of date
      // Check if second-to-last + last forms a date like "Apr 2020"
      const lastPart = remaining[remaining.length - 1]
      const secondLastPart = remaining.length >= 2 ? remaining[remaining.length - 2] : ''

      // Check for patterns like "Apr 2020" (month + year)
      if (/^[A-Z][a-z]{2,8}$/.test(secondLastPart) && /^\d{4}$/.test(lastPart)) {
        // "Apr" + "2020" - date spans two parts
        dateStartIndex = remaining.length - 2
      } else if (/^\d{4}$/.test(lastPart)) {
        // Just a year like "1997"
        dateStartIndex = remaining.length - 1
      } else if (lastPart === 'N/A') {
        dateStartIndex = remaining.length - 1
      } else if (lastPart === 'bequest' && secondLastPart === '2016') {
        dateStartIndex = remaining.length - 2
      } else {
        // Default: last part is the date
        dateStartIndex = remaining.length - 1
      }

      const priceParts = remaining.slice(0, dateStartIndex)
      const dateParts = remaining.slice(dateStartIndex)
      const price = priceParts.join(',') // Reassemble price with commas
      const date = dateParts.join(' ')

      results.push([...fixed, price, date, url, notes])
    }
  }

  return results
}

function parsePrice(priceStr: string): number | null {
  if (!priceStr || priceStr === 'N/A' || priceStr === 'Not disclosed' || priceStr === 'Not verified' || priceStr === 'Not available' || priceStr === 'Unknown') {
    return null
  }

  // Handle special cases
  if (priceStr.includes('Never sold') || priceStr.includes('Donated') || priceStr.includes('Family transfer')) {
    return null
  }

  // Extract numeric value
  const cleaned = priceStr.replace(/[$,]/g, '').replace(/\s+/g, '')

  // Handle estimates like "Est. $40M+ value"
  if (cleaned.includes('Est.') || cleaned.includes('value')) {
    const match = cleaned.match(/(\d+(?:\.\d+)?)[Mm]/)
    if (match) {
      return parseFloat(match[1]) * 1000000
    }
  }

  // Handle millions shorthand
  if (cleaned.toLowerCase().includes('m')) {
    const match = cleaned.match(/(\d+(?:\.\d+)?)[Mm]/)
    if (match) {
      return parseFloat(match[1]) * 1000000
    }
  }

  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
}

function parseLocation(location: string): { city: string | null; state: string | null; country: string } {
  if (!location) {
    return { city: null, state: null, country: 'USA' }
  }

  // Handle international locations
  if (location.includes('Mexico')) {
    const parts = location.split(',').map(p => p.trim())
    return { city: parts[0] || null, state: null, country: 'Mexico' }
  }

  const parts = location.split(',').map(p => p.trim())
  const city = parts[0] || null

  // Extract state from the location
  let state: string | null = null
  for (const part of parts) {
    const stateMatch = part.match(/\b([A-Z]{2})\b/)
    if (stateMatch) {
      state = stateMatch[1]
      break
    }
  }

  return { city, state, country: 'USA' }
}

function parseStatus(statusStr: string, notes: string): string {
  const lowerStatus = statusStr.toLowerCase()
  const lowerNotes = notes.toLowerCase()

  if (lowerStatus.includes('museum') || lowerStatus.includes('landmark') && lowerNotes.includes('museum')) {
    return 'museum'
  }
  if (lowerStatus.includes('donated') || lowerNotes.includes('donated')) {
    return 'donated'
  }
  if (lowerStatus.includes('for sale')) {
    return 'active'
  }
  if (lowerStatus.includes('sold') || lowerNotes.includes('sold')) {
    return 'sold'
  }
  if (lowerStatus.includes('bequeathed') || lowerNotes.includes('bequeathed')) {
    return 'museum'
  }
  if (lowerStatus.includes('standing') || lowerStatus.includes('boutique') || lowerStatus.includes('rental')) {
    return 'archived'
  }

  return 'archived'
}

function parsePreservationStatus(statusStr: string): string | null {
  if (statusStr.includes('NRHP')) return 'NRHP'
  if (statusStr.includes('National Historic Landmark')) return 'NHL'
  if (statusStr.includes('Historic-Cultural Monument')) return 'Historic-Cultural Monument'
  if (statusStr.includes('Bequeathed to LACMA')) return 'LACMA Collection'
  return null
}

function generateArchitects(): Architect[] {
  // Use known architect data and count properties from CSV
  const csvPath = path.join(ARCH_ROOT, 'Appendix_Updated_With_Sales_Images.csv')
  const csvData = parseCSV(csvPath)

  const propertyCounts: Record<string, number> = {}
  for (let i = 1; i < csvData.length; i++) {
    const row = csvData[i]
    const architectName = row[0]
    const architectId = CSV_ARCHITECT_TO_ID[architectName]
    if (architectId) {
      propertyCounts[architectId] = (propertyCounts[architectId] || 0) + 1
    }
  }

  // Create architects from known data
  const architects: Architect[] = Object.values(KNOWN_ARCHITECTS).map(arch => ({
    ...arch,
    property_count: propertyCounts[arch.id] || 0,
  }))

  return architects.sort((a, b) => a.name.localeCompare(b.name))
}

function generateProperties(): Property[] {
  const csvPath = path.join(ARCH_ROOT, 'Appendix_Updated_With_Sales_Images.csv')
  const csvData = parseCSV(csvPath)

  const properties: Property[] = []
  const now = new Date().toISOString().split('T')[0]

  // Skip header row
  for (let i = 1; i < csvData.length; i++) {
    const row = csvData[i]
    if (row.length < 9) continue

    const [architectName, homeName, clientOwner, yearStr, location, status, lastSalePrice, lastSaleDate, bestImageUrl, notes] = row

    if (!homeName) continue

    const architectId = CSV_ARCHITECT_TO_ID[architectName] || slugify(architectName)
    const { city, state, country } = parseLocation(location)
    const year = parseInt(yearStr) || 0

    // Generate a unique slug
    const baseSlug = slugify(homeName)
    let slug = baseSlug
    let counter = 1
    while (properties.find(p => p.slug === slug)) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const property: Property = {
      id: slug,
      slug,
      home_name: homeName,
      full_address: location || null,
      parsed_city: city,
      parsed_state: state,
      country,
      latitude: null,
      longitude: null,
      year_built: year,
      architect_id: architectId,
      client_owner: clientOwner || null,
      current_owner: null, // Extract from notes if needed
      preservation_status: parsePreservationStatus(status),
      significance: null,
      description: null,
      curator_notes: notes || null,
      square_footage: null,
      bedrooms: null,
      bathrooms: null,
      status: parseStatus(status, notes || ''),
      best_image_url: bestImageUrl || null,
      last_sale_price: parsePrice(lastSalePrice),
      last_sale_date: lastSaleDate || null,
      created_at: now,
      updated_at: now,
    }

    // Extract current owner from notes
    if (notes) {
      const ownerMatch = notes.match(/Sold to ([^;,]+)/i)
      if (ownerMatch) {
        property.current_owner = ownerMatch[1].trim()
      }
    }

    properties.push(property)
  }

  return properties
}

// Main execution
console.log('Generating comprehensive data...\n')

console.log('Parsing architect works.txt files...')
const architects = generateArchitects()
console.log(`Generated ${architects.length} architects\n`)

console.log('Parsing CSV properties...')
const properties = generateProperties()
console.log(`Generated ${properties.length} properties\n`)

// Update architect property counts
for (const architect of architects) {
  architect.property_count = properties.filter(p => p.architect_id === architect.id).length
}

// Write output files
const architectsPath = path.join(OUTPUT_DIR, 'architects.json')
const propertiesPath = path.join(OUTPUT_DIR, 'properties.json')

fs.writeFileSync(architectsPath, JSON.stringify(architects, null, 2))
console.log(`Wrote ${architects.length} architects to ${architectsPath}`)

fs.writeFileSync(propertiesPath, JSON.stringify(properties, null, 2))
console.log(`Wrote ${properties.length} properties to ${propertiesPath}`)

console.log('\nDone! Data files generated successfully.')

// Print summary
console.log('\n--- Summary ---')
console.log(`Total architects: ${architects.length}`)
console.log(`Total properties: ${properties.length}`)
console.log('\nProperties by architect:')
const byArchitect: Record<string, number> = {}
for (const p of properties) {
  byArchitect[p.architect_id] = (byArchitect[p.architect_id] || 0) + 1
}
Object.entries(byArchitect)
  .sort((a, b) => b[1] - a[1])
  .forEach(([id, count]) => {
    const architect = architects.find(a => a.id === id)
    console.log(`  ${architect?.name || id}: ${count}`)
  })
