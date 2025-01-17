'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ActivityChart() {
  const [workoutData, setWorkoutData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User not authenticated');
        }
        
        const response = await fetch(`https://irix.onrender.com/api/workout/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch workout data');
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

  if (isLoading) return <div className="bg-white p-6 rounded-xl shadow-sm">Loading...</div>;
  if (error) return <div className="bg-white p-6 rounded-xl shadow-sm text-red-500">{error}</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Activity',
      },
    },
  };

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Steps',
        data: workoutData.map(day => day.steps) || [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Calories',
        data: workoutData.map(day => day.calories) || [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <Bar options={options} data={data} />
    </div>
  );
}
