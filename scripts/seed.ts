import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Import JSON data
import architects from '../src/data/architects.json'
import properties from '../src/data/properties.json'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  console.log('Starting database seed...\n')

  // Seed architects first (properties reference them)
  console.log('Seeding architects...')
  const { error: archError } = await supabase
    .from('architects')
    .upsert(architects, { onConflict: 'id' })

  if (archError) {
    console.error('Error seeding architects:', archError)
    return
  }
  console.log(`  Seeded ${architects.length} architects`)

  // Seed properties
  console.log('Seeding properties...')
  const { error: propError } = await supabase
    .from('properties')
    .upsert(properties, { onConflict: 'id' })

  if (propError) {
    console.error('Error seeding properties:', propError)
    return
  }
  console.log(`  Seeded ${properties.length} properties`)

  console.log('\nDatabase seeding complete!')
}

seed().catch(console.error)
