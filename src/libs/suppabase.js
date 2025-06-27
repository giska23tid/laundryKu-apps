import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sswbjkcdujfhzffizwhk.supabase.co/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzd2Jqa2NkdWpmaHpmZml6d2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5OTk5MjIsImV4cCI6MjA2NjU3NTkyMn0.hlI5yNfLQH_aL-1fKAWSjnU9GOoUzDkaL5Ag2-QkcrA' 

export const supabase = createClient(supabaseUrl, supabaseKey)