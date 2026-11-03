import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lbtbxkwffixnvbsibcip.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_JT7TZAE_0fxQcBHD8X-XpA_CHHmR9FT'

export const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'flora_haste'
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5583982301526'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
