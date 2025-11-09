import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../components/auth/AuthLayout";
import SignUpForm from "../components/auth/SignUpForm";

const SignUp = () => {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useAuth();

	// Redirect if already authenticated
	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			navigate("/dashboard", { replace: true });
		}
	}, [isAuthenticated, isLoading, navigate]);

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

	// Don't render if authenticated (will redirect)
	if (isAuthenticated) {
		return null;
	}

	return (
		<AuthLayout
			title="Create Account"
			subtitle="Join us today and get started"
			linkText="Already have an account?"
			linkTo="/login"
			linkLabel="Sign in here">
			<SignUpForm />
		</AuthLayout>
	);
};

export default SignUp;
