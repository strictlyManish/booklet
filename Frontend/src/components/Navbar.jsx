import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger & close icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const baseClass =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200";
  const inactiveClass = "text-gray-300 hover:text-white hover:bg-gray-700";
  const activeClass = "bg-indigo-600 text-white shadow-md";

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h2 className="text-xl font-bold text-white tracking-wide">
          Booklet<span className="text-indigo-400">.ai</span>
        </h2>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-2">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Register
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden flex flex-col space-y-2 px-4 pb-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
            onClick={() => setIsOpen(false)}
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
