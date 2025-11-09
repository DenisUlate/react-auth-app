import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useReturnTo } from "../../hooks/useProtectedRoute";
import Button from "../ui/Button";
import Input from "../ui/Input";

const LoginForm = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { navigateToReturnTo } = useReturnTo();

	// Form state
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// UI state
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Validate form
	const validateForm = () => {
		const newErrors = {};

		// Email validation
		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form
		if (!validateForm()) return;

		setIsLoading(true);
		setErrors({});

		try {
			// Attempt login
			const result = await login(formData.email, formData.password);

			if (result.success) {
				// Use return-to functionality instead of direct navigation
				navigateToReturnTo();
			} else {
				// Handle login error
				setErrors({
					general: result.error || "Login failed. Please try again.",
				});
			}
		} catch (error) {
			// Handle unexpected errors
			setErrors({
				general: "An unexpected error occurred. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* General Error Message */}
			{errors.general && (
				<div className="bg-red-50 border border-red-200 rounded-md p-3">
					<p className="text-sm text-red-600" role="alert">
						{errors.general}
					</p>
				</div>
			)}

			{/* Email Field */}
			<Input
				label="Email Address"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				placeholder="Enter your email"
				error={errors.email}
				required
				disabled={isLoading}
			/>

			{/* Password Field */}
			<Input
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				placeholder="Enter your password"
				error={errors.password}
				required
				disabled={isLoading}
			/>

			{/* Submit Button */}
			<Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
				{isLoading ? "Signing in..." : "Sign In"}
			</Button>
		</form>
	);
};

export default LoginForm;
