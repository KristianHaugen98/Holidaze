import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // States to hold form data, loading status, and any error messages
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Hook to be able to navigate the user to another route (e.g. the profile page)

  const navigate = useNavigate();

  // Handles changes to the input fields and updates the formData state
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Removes the error message when the user starts typing again
    setErrorMessage("");
    setFormData({ ...formData, [name]: value });
  };

  // Handles the actual login when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Gets URL from environment variables
    const API_LOGIN_URL = import.meta.env.VITE_REGISTER_URL + "/auth/login";

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // Interprets the response from the server as JSON

      // If everything is OK: Save security token and user info in the browser
      if (response.ok) {
        localStorage.setItem("token", result.data.accessToken);
        localStorage.setItem("user", JSON.stringify(result.data));

        // Send the user to the profile page after successful login
        navigate("/profile");
      } else {
        const errorMsg =
          result.errors?.[0]?.message || "Invalid email or password";
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      // Handles network errors
      setErrorMessage("Network error. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Log in to manage your bookings</p>
        </div>
        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Displays error message only if errorMessage has content */}
          {errorMessage && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 p-3 rounded-xl text-sm text-center">
              {errorMessage}
            </div>
          )}
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="user@stud.noroff.no"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          {/* Login button with dynamic text and deactivation on load */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 ${isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {/* Link to registration for new users */}
        <p className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
