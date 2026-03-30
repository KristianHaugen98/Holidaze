import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
          <p className="text-gray-400">Join Holidaze and find your next stay</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Username field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* E-mail field */}
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

          {/* Password field */}
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

          {/* Venue Manager Checkbox */}
          <div className="flex items-center space-x-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <input
              type="checkbox"
              id="manager"
              className="w-5 h-5 accent-blue-500 rounded"
            />
            <label
              htmlFor="manager"
              className="text-sm text-gray-300 cursor-pointer"
            >
              I want to rent out my own venues (Manager)
            </label>
          </div>

          {/* Submit button */}
          <button
            type="button"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
