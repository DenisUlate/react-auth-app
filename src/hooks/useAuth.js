import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Custom hook to use the Auth Context
export const useAuth = () => {
	const context = useContext(AuthContext);

	// Validate that hook is used within AuthProvider
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const { user, loading, signUp, signIn, signOut } = context;

	// Helper functions
	const isAuthenticated = !!user;
	const isLoading = loading;
	const userId = user?.id || null;
	const userEmail = user?.email || null;

	// Enhanced sign in with error handling
	const login = async (email, password) => {
		try {
			const { data, error } = await signIn(email, password);
			if (error) throw error;
			return { success: true, data };
		} catch (error) {
			return { success: false, error: error.message };
		}
	};

	// Enhanced sign up with error handling
	const register = async (email, password) => {
		try {
			const { data, error } = await signUp(email, password);
			if (error) throw error;
			return { success: true, data };
		} catch (error) {
			return { success: false, error: error.message };
		}
	};

	// Enhanced sign out with error handling
	const logout = async () => {
		try {
			const { error } = await signOut();
			if (error) throw error;
			return { success: true };
		} catch (error) {
			return { success: false, error: error.message };
		}
	};

	return {
		// State
		user,
		loading,
		isAuthenticated,
		isLoading,

		// User info helpers
		userId,
		userEmail,

		// Auth functions (original)
		signUp,
		signIn,
		signOut,

		// Enhaced auth functions
		login,
		register,
		logout,
	};
};
