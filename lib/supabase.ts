import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type RsvpRow = {
  id: number
  name: string
  count: number
  phone: string | null
  attend: 'yes' | 'no' | 'maybe'
  created_at: string
}

export async function insertRsvp(data: Omit<RsvpRow, 'id' | 'created_at'>) {
  const { error } = await supabase.from('rsvp').insert(data)
  if (error) throw error
}

export async function fetchRsvp(): Promise<RsvpRow[]> {
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}
