import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Input component with forwardRef for form libraries compatibility
const Input = forwardRef(
	(
		{
			label,
			type = "text",
			placeholder,
			error,
			helperText,
			disabled = false,
			required = false,
			className = "",
			id,
			...props
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);

		// Generate unique ID if not provided
		const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

		// Determine actual input type (handle password visibility)
		const inputType = type === "password" && showPassword ? "text" : type;

		// Base input styles
		const baseInputStyles = `
    w-full px-3 py-2 border rounded-md
    bg-white text-gray-900
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-colors duration-200
    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
  `
			.trim()
			.replace(/\s+/g, " ");

		// Error styles
		const errorStyles = error ? "border-red-500 focus:ring-red-500" : "border-gray-300";

		// Combine all input styles
		const inputStyles = `
    ${baseInputStyles}
    ${errorStyles}
    ${type === "password" ? "pr-10" : ""}
    ${className}
  `
			.trim()
			.replace(/\s+/g, " ");

		// Label styles
		const labelStyles = `
    block text-sm font-medium text-gray-700 mb-1
    ${required ? 'after:content-["*"] after:text-red-500 after:ml-1' : ""}
  `
			.trim()
			.replace(/\s+/g, " ");

		return (
			<div className="space-y-1">
				{/* Label */}
				{label && (
					<label htmlFor={inputId} className={labelStyles}>
						{label}
					</label>
				)}

				{/* Input Container */}
				<div className="relative">
					<input
						ref={ref}
						id={inputId}
						type={inputType}
						placeholder={placeholder}
						disabled={disabled}
						className={inputStyles}
						{...props}
					/>

					{/* Password Toggle Button */}
					{type === "password" && (
						<button
							type="button"
							className="absolute inset-y-0 right-0 pr-3 flex items-center"
							onClick={() => setShowPassword(!showPassword)}
							tabIndex={-1}>
							{showPassword ? (
								<EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
							) : (
								<Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
							)}
						</button>
					)}
				</div>

				{/* Error Message */}
				{error && (
					<p className="text-sm text-red-600" role="alert">
						{error}
					</p>
				)}

				{/* Helper Text */}
				{helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
			</div>
		);
	}
);

// Set display name for debugging
Input.displayName = "Input";

export default Input;
