import { createClient } from '@/lib/supabase/server'
import type { Architect } from '@/types'

export async function getArchitects(): Promise<Architect[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('architects')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

export async function getArchitectBySlug(slug: string): Promise<Architect | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('architects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

export async function getArchitectById(id: string): Promise<Architect | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('architects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}
