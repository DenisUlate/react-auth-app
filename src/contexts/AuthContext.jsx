import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// The Auth Context
const AuthContext = createContext({});

// Export AuthContext for use in other hooks
export { AuthContext };

// Auth Provider component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Check if user is logged in on app start
	useEffect(() => {
		// Get initial session
		const getInitialSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user ?? null);
			setLoading(false);
		};

		getInitialSession();

		// Listen for auth state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	// Sign up function
	const signUp = async (email, password) => {
		const { data, error } = await supabase.auth.signUp({ email, password });
		return { data, error };
	};

	// Sign in function
	const signIn = async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		return { data, error };
	};

	// Sign out function
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		return { error };
	};

	// Context value
	const value = {
		user,
		loading,
		signUp,
		signIn,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
