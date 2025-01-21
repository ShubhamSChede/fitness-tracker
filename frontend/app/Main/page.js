'use client';
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ActivityChart from "../components/ActivityChart";
import Badge from "../components/Badge";
import Footer from "../components/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [workoutData, setWorkoutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const userId = "678a165d5ea4e10812a9e603"; // Static userId for demonstration
      try {
        const data = {
          userId: "678a165d5ea4e10812a9e603",
          date: "2024-01-17T00:00:00.000Z",
          steps: 132,
          exercises: [
            {
              type: "chest",
              duration: 30,
              exercise_name: "Push-ups",
              calories: 100,
              note: "3 sets of 15 reps",
              _id: "678a171a5ea4e10812a9e60a",
            },
            {
              type: "abs",
              duration: 20,
              exercise_name: "Crunches",
              calories: 50,
              note: "4 sets of 20 reps",
              _id: "678a171a5ea4e10812a9e60b",
            },
          ],
        };
        setWorkoutData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  const getBadgeType = (steps) => {
    if (steps >= 15000) return "advanced";
    if (steps >= 10000) return "intermediate";
    if (steps >= 5000) return "beginner";
    return null;
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const getTotalCalories = (data) => {
    if (!data?.exercises) return 0;
    return data.exercises.reduce((total, exercise) => total + exercise.calories, 0);
  };

  const getTotalDuration = (data) => {
    if (!data?.exercises) return 0;
    return data.exercises.reduce((total, exercise) => total + exercise.duration, 0);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-blue-100"
      }`}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-sm`}
          >
            <h2 className="font-semibold mb-4">Daily Goals</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-500">
                {isLoading ? "Loading..." : workoutData?.steps || 0}
              </div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                steps today
              </p>
            </div>
            {!isLoading && getBadgeType(workoutData?.steps || 0) && (
              <div className="mt-4">
                <Badge type={getBadgeType(workoutData?.steps || 0)} count={workoutData?.steps || 0} />
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
              <div className="text-3xl font-bold text-green-500">
                {isLoading ? "Loading..." : getTotalDuration(workoutData)}
              </div>
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
              <div className="text-3xl font-bold text-orange-500">
                {isLoading ? "Loading..." : getTotalCalories(workoutData)}
              </div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                kcal burned
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ActivityChart />
        </div>
      </main>
      <Footer/>
    </div>
  );
}