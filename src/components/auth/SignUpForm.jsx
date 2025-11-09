import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";

const SignUpForm = () => {
	const navigate = useNavigate();
	const { register } = useAuth();

	// Form state
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	// UI state
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

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

	// Validate password strength
	const validatePasswordStrength = (password) => {
		const issues = [];

		if (password.length < 8) {
			issues.push("at least 8 characters");
		}
		if (!/[A-Z]/.test(password)) {
			issues.push("one uppercase letter");
		}
		if (!/[a-z]/.test(password)) {
			issues.push("one lowercase letter");
		}
		if (!/\d/.test(password)) {
			issues.push("one number");
		}

		return issues;
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
		} else {
			const passwordIssues = validatePasswordStrength(formData.password);
			if (passwordIssues.length > 0) {
				newErrors.password = `Password must include: ${passwordIssues.join(", ")}`;
			}
		}

		// Confirm password validation
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
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
		setSuccessMessage("");

		try {
			// Attempt registration
			const result = await register(formData.email, formData.password);

			if (result.success) {
				// Show success message
				setSuccessMessage("Account created successfully! Please check your email for verification.");

				// Clear form
				setFormData({
					email: "",
					password: "",
					confirmPassword: "",
				});

				// Redirect to login after delay
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			} else {
				// Handle registration error
				let errorMessage = result.error || "Registration failed. Please try again.";

				// Customize error messages
				if (errorMessage.includes("already registered")) {
					errorMessage = "This email is already registered. Try signing in instead.";
				}

				setErrors({
					general: errorMessage,
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
			{/* Success Message */}
			{successMessage && (
				<div className="bg-green-50 border border-green-200 rounded-md p-3">
					<p className="text-sm text-green-600" role="alert">
						{successMessage}
					</p>
				</div>
			)}

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
				placeholder="Create a strong password"
				error={errors.password}
				helperText="Must include: 8+ characters, uppercase, lowercase, and number"
				required
				disabled={isLoading}
			/>

			{/* Confirm Password Field */}
			<Input
				label="Confirm Password"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				placeholder="Confirm your password"
				error={errors.confirmPassword}
				required
				disabled={isLoading}
			/>

			{/* Submit Button */}
			<Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
				{isLoading ? "Creating Account..." : "Create Account"}
			</Button>
		</form>
	);
};

export default SignUpForm;
