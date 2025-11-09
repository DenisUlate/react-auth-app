import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { LogOut, User, Mail, Calendar } from "lucide-react";

const Dashboard = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated, isLoading, logout } = useAuth();

	// Redirect if not authenticated
	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate("/login", { replace: true });
		}
	}, [isAuthenticated, isLoading, navigate]);

	// Handle logout
	const handleLogout = async () => {
		try {
			const result = await logout();
			if (result.success) {
				navigate("/login", { replace: true });
			}
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

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

	// Don't render if not authenticated (will redirect)
	if (!isAuthenticated || !user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo/Title */}
						<div className="flex items-center">
							<div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
								<User className="h-5 w-5 text-white" />
							</div>
							<h1 className="ml-3 text-xl font-semibold text-gray-900">Dashboard</h1>
						</div>

						{/* Logout Button */}
						<Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-2 text-slate-100">
							<LogOut className="h-4 w-4" />
							<span>Logout</span>
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				{/* Welcome Section */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
					<p className="text-gray-600">You have successfully logged into your account.</p>
				</div>

				{/* User Info Card */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>

					<div className="space-y-4">
						{/* Email */}
						<div className="flex items-center space-x-3">
							<Mail className="h-5 w-5 text-gray-400" />
							<div>
								<p className="text-sm font-medium text-gray-900">Email</p>
								<p className="text-sm text-gray-600">{user.email}</p>
							</div>
						</div>

						{/* User ID */}
						<div className="flex items-center space-x-3">
							<User className="h-5 w-5 text-gray-400" />
							<div>
								<p className="text-sm font-medium text-gray-900">User ID</p>
								<p className="text-sm text-gray-600 font-mono">{user.id}</p>
							</div>
						</div>

						{/* Created At */}
						<div className="flex items-center space-x-3">
							<Calendar className="h-5 w-5 text-gray-400" />
							<div>
								<p className="text-sm font-medium text-gray-900">Member Since</p>
								<p className="text-sm text-gray-600">
									{new Date(user.created_at).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-white rounded-lg shadow-sm p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<Button variant="secondary" fullWidth>
							Edit Profile
						</Button>
						<Button variant="secondary" fullWidth>
							Settings
						</Button>
						<Button variant="secondary" fullWidth>
							Help & Support
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
