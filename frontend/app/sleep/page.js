'use client'
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SleepPage = () => {
  const [sleepData, setSleepData] = useState([]);
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSleepData([...sleepData, { date, hours: parseFloat(hours) }]);
    setDate('');
    setHours('');
  };

  const chartData = {
    labels: sleepData.map(data => data.date),
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepData.map(data => data.hours),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sleep Tracking Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sleep Tracker</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block mb-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Hours of Sleep:</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            step="0.1"
            min="0"
            max="24"
            className="border p-2 rounded"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Sleep Data
        </button>
      </form>

      {sleepData.length > 0 && (
        <div className="w-full h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default SleepPage;