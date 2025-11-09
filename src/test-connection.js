import { supabase } from "./lib/supabase.js";

// Test connection to Supabase
console.log("Supabase client:", supabase);
console.log("Supabase URL:", supabase.supabaseUrl);

// Test auth methods availability
console.log("Auth methods available:", {
	signUp: typeof supabase.auth.signUp,
	signIn: typeof supabase.auth.signInWithPassword,
	signOut: typeof supabase.auth.signOut,
});
