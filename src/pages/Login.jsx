import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Log in to manage your bookings</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* E-post field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              E-mail (Stud.noroff.no)
            </label>
            <input
              type="email"
              placeholder="user@stud.noroff.no"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Submit button */}
          <button
            type="button"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Log In
          </button>
        </form>

        {/* Footer Link and sending user to registration page if they don't have an account */}
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
