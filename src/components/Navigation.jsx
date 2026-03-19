import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="text-xl font-bold">
            <NavLink to="/">Holidaze</NavLink>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-gray-300"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-gray-300"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-gray-300"
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-gray-300"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "hover:text-gray-300"
              }
            >
              Profile
            </NavLink>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
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

      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900">
          <div className="px-4 py-3 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `block py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
              onClick={() => setOpen(false)}
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
              onClick={() => setOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
              }
              onClick={() => setOpen(false)}
            >
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
