'use client';
import { useState } from "react";
import Image from "next/image";
import ActivityChart from "../components/ActivityChart";
import Badge from "../components/Badge";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const dailySteps = 7234; // This could come from your data source

  const getBadgeType = (steps) => {
    if (steps >= 15000) return "advanced";
    if (steps >= 10000) return "intermediate";
    if (steps >= 5000) return "beginner";
    return null;
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-blue-100"
      }`}
    >
      <nav
        className={`${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        } shadow-sm p-4 flex justify-between items-center`}
      >
        <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
        <ul className="flex space-x-6">
          <li>
            <a
              href="/BMI"
              className={`${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              BMI Calculator
            </a>
            <a
              href="/workout"
              className={`${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              workout
            </a>
            <a
              href="/sleep"
              className={`${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"
              } font-medium`}
            >
              sleep
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Overview */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-sm`}
          >
            <h2 className="font-semibold mb-4">Daily Goals</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-500">{dailySteps}</div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                steps today
              </p>
            </div>
            {getBadgeType(dailySteps) && (
              <div className="mt-4">
                <Badge type={getBadgeType(dailySteps)} count={dailySteps} />
              </div>
            )}
          </div>

          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-sm`}
          >
            <h2 className="font-semibold mb-4">Active Minutes</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-500">45</div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                minutes
              </p>
            </div>
          </div>

          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-sm`}
          >
            <h2 className="font-semibold mb-4">Calories</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-orange-500">1,248</div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                kcal burned
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ActivityChart />
        </div>

        <div className="mt-8 flex gap-4">
          <button
            className={`px-6 py-2 rounded-lg ${
              darkMode
                ? "bg-blue-700 text-gray-100 hover:bg-blue-800"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } transition-colors`}
          >
            Start Workout
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            View History
          </button>
        </div>
      </main>
    </div>
  );
}