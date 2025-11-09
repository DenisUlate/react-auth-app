import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { Home, LogIn, ArrowLeft } from "lucide-react";

const NotFound = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	// Go back to previous page
	const goBack = () => {
		navigate(-1);
	};

	// Go to appropriate home page
	const goHome = () => {
		if (isAuthenticated) {
			navigate("/dashboard");
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full text-center">
				{/* 404 Illustration */}
				<div className="mb-8">
					<div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
						<svg className="h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709m0-11.582A7.962 7.962 0 0112 4a7.962 7.962 0 015 1.709"
							/>
						</svg>
					</div>
				</div>

				{/* Error Message */}
				<div className="mb-8">
					<h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
					<h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
					<p className="text-gray-600">Sorry, the page you are looking for doesn't exist or has been moved.</p>
				</div>

				{/* Action Buttons */}
				<div className="space-y-4">
					{/* Go Back Button */}
					<Button onClick={goBack} variant="primary" fullWidth className="flex items-center justify-center space-x-2">
						<ArrowLeft className="h-4 w-4" />
						<span>Go Back</span>
					</Button>

					{/* Home Button - Dynamic based on auth status */}
					<Button onClick={goHome} variant="secondary" fullWidth className="flex items-center justify-center space-x-2">
						{isAuthenticated ? (
							<>
								<Home className="h-4 w-4" />
								<span>Go to Dashboard</span>
							</>
						) : (
							<>
								<LogIn className="h-4 w-4" />
								<span>Go to Login</span>
							</>
						)}
					</Button>

					{/* Additional Navigation - Only show if not authenticated */}
					{!isAuthenticated && (
						<div className="pt-4 border-t border-gray-200">
							<p className="text-sm text-gray-500 mb-3">Or explore our app:</p>
							<div className="space-y-2">
								<Button onClick={() => navigate("/login")} variant="ghost" fullWidth>
									Sign In
								</Button>
								<Button onClick={() => navigate("/signup")} variant="ghost" fullWidth>
									Create Account
								</Button>
							</div>
						</div>
					)}
				</div>

				{/* Footer Info */}
				<div className="mt-8 pt-6 border-t border-gray-200">
					<p className="text-sm text-gray-500">
						If you think this is an error, please{" "}
						<button className="text-blue-600 hover:text-blue-500 underline" onClick={() => window.location.reload()}>
							refresh the page
						</button>{" "}
						or contact support.
					</p>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
