import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle, linkText, linkTo, linkLabel }) => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* header Section */}
				<div className="text-center">
					{/* Logo/Brand */}
					<div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-600">
						<svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>

					{/* Title */}
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>

					{/* Subtitle */}
					{subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
				</div>

				{/* Main Content Card */}
				<div className="bg-white py-8 px-6 shadow-lg rounded-lg">{children}</div>

				{/* Footer Link */}
				{linkText && linkTo && linkLabel && (
					<div className="text-center">
						<p className="text-sm text-gray-600">
							{linkText}{" "}
							<Link to={linkTo} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
								{linkLabel}
							</Link>
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AuthLayout;
