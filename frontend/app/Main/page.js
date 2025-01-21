'use client';
import { useState, useEffect } from "react";
import { Line, Bar, ResponsiveContainer, LineChart, CartesianGrid, YAxis, XAxis, Legend,Tooltip } from 'recharts';
import Navbar from "../components/Navbar";
import { useDarkMode } from "../context/DarkModeContext";
import Badge from "../components/Badge";
import Footer from "../components/Footer";
import ExerciseAnalytics from "../components/ExerciseAnalytics";

export default function Home() {
  const { darkMode } = useDarkMode();
  const [workoutData, setWorkoutData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`https://irix.onrender.com/api/workout/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
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
  const getLatestWorkout = () => {
    if (!workoutData.length) return null;
    return workoutData.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
  };

  const getTotalCalories = (data) => {
    if (!data?.exercises) return 0;
    return data.exercises.reduce((total, exercise) => total + (exercise.calories || 0), 0);
  };

  const getTotalDuration = (data) => {
    if (!data?.exercises) return 0;
    return data.exercises.reduce((total, exercise) => total + (exercise.duration || 0), 0);
  };

  const prepareChartData = () => {
    return workoutData
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(workout => ({
        date: new Date(workout.date).toLocaleDateString(),
        steps: workout.steps,
        calories: getTotalCalories(workout),
        duration: getTotalDuration(workout)
      }));
  };

  const latestWorkout = getLatestWorkout();
  const chartData = prepareChartData();

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-50 to-blue-100"}`}>
      <Navbar/>
      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="text-red-500 text-center p-4">Error: {error}</div>
        ) : isLoading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm`}>
                <h2 className="font-semibold mb-4">Daily Steps</h2>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-blue-500">
                    {latestWorkout?.steps || 0}
                  </div>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    steps today
                  </p>
                </div>
                {latestWorkout && getBadgeType(latestWorkout.steps) && (
                  <div className="mt-4">
                    <Badge type={getBadgeType(latestWorkout.steps)} count={latestWorkout.steps} />
                  </div>
                )}
              </div>

              <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm`}>
                <h2 className="font-semibold mb-4">Active Minutes</h2>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-green-500">
                    {getTotalDuration(latestWorkout)}
                  </div>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    minutes
                  </p>
                </div>
              </div>

              <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm`}>
                <h2 className="font-semibold mb-4">Calories</h2>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-orange-500">
                    {getTotalCalories(latestWorkout)}
                  </div>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    kcal burned
                  </p>
                </div>
              </div>
            </div>

            <div className={`mt-8 ${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm`}>
              <h2 className="font-semibold mb-6">Activity Overview</h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : 'white' }} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="steps" 
                      stroke="#3b82f6" 
                      name="Steps"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#f97316" 
                      name="Calories"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="duration" 
                      stroke="#22c55e" 
                      name="Duration (min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>
      <ExerciseAnalytics workoutData={workoutData} />
      <Footer />
    </div>
  );
}