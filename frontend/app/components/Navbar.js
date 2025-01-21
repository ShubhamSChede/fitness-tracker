'use client';
import React from "react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav
      className={`${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      } shadow-sm p-4 flex justify-between items-center`}
    >
      <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
      <ul className="flex space-x-6">
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
      <button
        onClick={toggleDarkMode}
        className={`ml-4 px-4 py-2 rounded-lg ${
          darkMode
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        } transition`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}
