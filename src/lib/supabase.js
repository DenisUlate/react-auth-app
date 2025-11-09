import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Supabase URL and Anon Key must be provided in environment variables.");
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
