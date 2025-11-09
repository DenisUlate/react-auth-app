// Routes constants
export const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	SIGNUP: "/signup",
	DASHBOARD: "/dashboard",
};

// Auth constants
export const AUTH_STATES = {
	LOADING: "loading",
	AUTHENTICATED: "authenticated",
	UNAUTHENTICATED: "unauthenticated",
};

// Storage keys
export const STORAGE_KEYS = {
	RETURN_TO: "auth_return_to",
};

// Default redirects
export const DEFAULT_REDIRECTS = {
	AFTER_LOGIN: ROUTES.DASHBOARD,
	AFTER_LOGOUT: ROUTES.LOGIN,
	UNAUTHENTICATED: ROUTES.LOGIN,
};

// Error messages
export const ERROR_MESSAGES = {
	AUTH_REQUIRED: "You must be logged in to access this page.",
	ALREADY_AUTHENTICATED: "You are already logged in.",
	SESSION_EXPIRED: "Your session has expired. Please log in again.",
	NETWORK_ERROR: "Network error. Please check your connection.",
};
