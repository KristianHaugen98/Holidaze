import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });

  // New states for status and feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Reset error message when user starts typing again
    setErrorMessage("");
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // 1. Validating email locally before sending to API
    if (!formData.email.endsWith("@stud.noroff.no")) {
      setErrorMessage("You must use a valid @stud.noroff.no email address.");
      setIsLoading(false);
      return;
    }

    const API_REGISTER_URL =
      import.meta.env.VITE_REGISTER_URL + "/auth/register";

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        // Retrieves the error message from the API if it exists
        const errorMsg =
          result.errors?.[0]?.message ||
          "Something went wrong. Please try again.";
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      setErrorMessage("Could not connect to the server. Check your internet.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // The JSX for the registration form
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
          <p className="text-gray-400">Join Holidaze and find your next stay</p>
        </div>

        {/* Displays success message if registration was successful */}
        {isSuccess ? (
          <div className="bg-green-900/30 border border-green-500 text-green-400 p-4 rounded-xl text-center mb-6">
            <p className="font-bold">Success!</p>
            <p className="text-sm text-green-200/70">
              Your account has been created. You can now log in.
            </p>
            <Link to="/login" className="block mt-4 text-white underline">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Error message box */}
            {errorMessage && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 p-3 rounded-xl text-sm">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                E-mail (Stud.noroff.no)
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="user@stud.noroff.no"
                className={`w-full p-4 bg-gray-900 border ${errorMessage.includes("email") ? "border-red-500" : "border-gray-700"} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength="8"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <input
                name="venueManager"
                checked={formData.venueManager}
                onChange={handleChange}
                type="checkbox"
                id="manager"
                className="w-5 h-5 accent-blue-500 rounded"
              />
              <label
                htmlFor="manager"
                className="text-sm text-gray-300 cursor-pointer"
              >
                I want to rent out my own venues
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 ${isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex justify-center items-center`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">◌</span> Creating
                  account...
                </>
              ) : (
                "Create an Account"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
