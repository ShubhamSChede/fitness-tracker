
'use client'
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useDarkMode } from '../context/DarkModeContext';

const ExerciseSummary = ({ weekData }) => {
     const { darkMode } = useDarkMode();
  const exerciseSummary = useMemo(() => {
    const summary = {};
    weekData.forEach(day => {
      day.exercises.forEach(exercise => {
        if (exercise.type) {
          summary[exercise.type] = (summary[exercise.type] || 0) + 1;
        }
      });
    });
    
    return Object.entries(summary).map(([name, value]) => ({
      name,
      value
    }));
  }, [weekData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className=" p-6 rounded-lg shadow-s
    ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}
    ">
      <h3 className="text-lg font-semibold mb-4">Exercise Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={exerciseSummary}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({name, value}) => `${name}: ${value}`}
            >
              {exerciseSummary.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExerciseSummary;
