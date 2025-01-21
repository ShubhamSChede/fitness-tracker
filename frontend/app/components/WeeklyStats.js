// WeeklyStats.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useDarkMode } from '../context/DarkModeContext';

const WeeklyStats = ({ weekData }) => {
     const { darkMode } = useDarkMode();
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const dailyData = weekData.map(day => ({
    date: formatDate(day.date),
    calories: day.exercises.reduce((sum, ex) => sum + (ex.calories || 0), 0),
    duration: day.exercises.reduce((sum, ex) => sum + (ex.duration || 0), 0),
    steps: day.steps
  }));

  return (
    <div className=" p-6 rounded-lg shadow-sm
    ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}
    ">
      <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="calories" fill="#FF8042" name="Calories" />
            <Bar yAxisId="left" dataKey="duration" fill="#00C49F" name="Duration (min)" />
            <Bar yAxisId="right" dataKey="steps" fill="#0088FE" name="Steps" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyStats;