import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Protectd Route Component
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	// Show loading while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Redirect if not authenticated
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	// Render protected content
	return children;
};

// Public route Component ( redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	// Show loading while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Redirect if authenticated
	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	// Render public content
	return children;
};

// Home Route Component (smart redirect based on auth status)
const HomeRoute = () => {
	const { isAuthenticated, isLoading } = useAuth();

	// Show loading while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Redirect based on authentication status
	return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

// App Routes Component (must be inside AuthProvider)
const AppRoutes = () => {
	return (
		<Routes>
			{/* Home Route - Smart redirect */}
			<Route path="/" element={<HomeRoute />} />

			{/* Public Routes - Only accessible when NOT authenticated */}
			<Route
				path="/login"
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>
			<Route
				path="/signup"
				element={
					<PublicRoute>
						<SignUp />
					</PublicRoute>
				}
			/>

			{/* Protected Routes - Only accessible when authenticated */}
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>

			{/* 404 Route - Always accessible */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

// Main App Component
const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
