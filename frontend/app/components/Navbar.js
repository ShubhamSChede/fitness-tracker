'use client';
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDarkMode } from '../context/DarkModeContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      } shadow-sm p-4`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a
              href="/Main"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="/food"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              Food
            </a>
          </li>
          <li>
            <a
              href="/BMI"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              BMI Calculator
            </a>
          </li>
          <li>
            <a
              href="/workout"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              Workout
            </a>
          </li>
          <li>
            <a
              href="/sleep"
              className={`${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              Sleep
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={darkMode ? "text-gray-200" : "text-gray-800"} />
            ) : (
              <Menu className={darkMode ? "text-gray-200" : "text-gray-800"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <a
                href="/Main"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
                } font-medium block`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
                } font-medium block`}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/food"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
                } font-medium block`}
              >
                Food
              </a>
            </li>
            <li>
              <a
                href="/BMI"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
                } font-medium block`}
              >
                BMI Calculator
              </a>
            </li>
            <li>
              <a
                href="/workout"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
                } font-medium block`}
              >
                Workout
              </a>
            </li>
            <li>
              <a
                href="/sleep"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
                } font-medium block`}
              >
                Sleep
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}