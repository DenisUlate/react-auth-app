import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ROUTES, STORAGE_KEYS, ERROR_MESSAGES } from "../utils/constants";

// Hook for protected routes with adavenced features
export const useProtectedRoute = (options = {}) => {
	const { redirectTo = ROUTES.LOGIN, requireAuth = true, showError = false } = options;

	const { isAuthenticated, isLoading, user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Don't do anything while loading
		if (isLoading) return;

		if (requireAuth && !isAuthenticated) {
			// Save current location for return after login
			sessionStorage.setItem(STORAGE_KEYS.REDIRECT_PATH, location.pathname);

			// Show error if required
			if (showError) {
				console.warn(ERROR_MESSAGES.AUTH_REQUIRED);
			}

			// Redirect to login if not authenticated
			navigate(redirectTo, { replace: true });
		} else if (!requireAuth && isAuthenticated) {
			// For public routes, redirect authenticated users
			navigate(ROUTES.DASHBOARD, { replace: true });
		}
	}, [isAuthenticated, isLoading, requireAuth, redirectTo, navigate, location.pathname, showError]);

	return { isAuthenticated, isLoading, user, canAccess: requireAuth ? isAuthenticated : !isAuthenticated };
};

// Hook for handling return-to functionality after login
export const useReturnTo = () => {
	const navigate = useNavigate();

	const getReturnTo = () => {
		return sessionStorage.getItem(STORAGE_KEYS.RETURN_TO) || ROUTES.DASHBOARD;
	};

	const clearReturnTo = () => {
		sessionStorage.removeItem(STORAGE_KEYS.RETURN_TO);
	};

	const navigateToReturnTo = () => {
		const returnTo = getReturnTo();
		clearReturnTo();
		navigate(returnTo, { replace: true });
	};

	return {
		getReturnTo,
		clearReturnTo,
		navigateToReturnTo,
	};
};
