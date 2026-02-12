import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://hwnifhbazxqqjxxyrqoi.supabase.co'
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmlmaGJhenhxcWp4eHlycW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MDQ3MDEsImV4cCI6MjA4NjQ4MDcwMX0.PHsopj60B8nYwiZW3_DuqoqSoc5jUkXyWx1vmLNZkOU'

export const supabase = createClient(supabaseUrl, supabaseKey)