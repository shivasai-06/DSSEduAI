import { createClient } from '@supabase/supabase-js';

// Strip any accidental quotes or whitespace
let supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/['"]/g, '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').replace(/['"]/g, '').trim();

// Ensure the URL has https:// if the user only copied the domain part
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

// Clean up the URL by removing any accidental paths like /rest/v1 or /auth/v1
try {
  if (supabaseUrl) {
    const parsedUrl = new URL(supabaseUrl);
    supabaseUrl = parsedUrl.origin;
  }
} catch (e) {
  // If URL parsing fails, we'll let Supabase throw its own validation error
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

