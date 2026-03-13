import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <NavLink to="/">Holidaze</NavLink>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "hover:text-gray-300 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "hover:text-gray-300 transition"
              }
            >
              About us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "hover:text-gray-300 transition"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "hover:text-gray-300 transition"
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-medium"
                  : "hover:text-gray-300 transition"
              }
            >
              Login
            </NavLink>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
              }
            >
              About us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/register"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
