import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  // we need to "remember" the state of the form, so we need to use useState for each field
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to handle form submission and send data to the API
  const handleRegister = async (e) => {
    e.preventDefault();
    const API_REGISTER_URL =
      import.meta.env.VITE_REGISTER_URL + "/auth/register";

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(API_REGISTER_URL, formData);

      const result = await response.json();

      if (response.ok) {
        alert("Success!");
      } else {
        alert("Error: " + result.errors[0].message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // The JSX for the registration form
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
          <p className="text-gray-400">Join Holidaze and find your next stay</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username field */}
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
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* E-mail field */}
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

          {/* Venue Manager Checkbox */}
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

          {/* Submit button */}
          <button
            type="submit"
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
