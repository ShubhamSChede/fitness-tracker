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
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#60a5fa',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#60a5fa',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Sleep Tracking Chart',
        color: '#e5e7eb',
        font: {
          size: 20,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e5e7eb'
        },
        title: {
          display: true,
          text: 'Hours',
          color: '#e5e7eb'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e5e7eb'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Sleep Tracker</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Add Sleep Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Hours of Sleep:</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  required
                  step="0.1"
                  min="0"
                  max="24"
                  className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Add Sleep Data
              </button>
            </form>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-400">Recent Records</h2>
            </div>
            <div className="space-y-2">
              {sleepData.slice(-5).reverse().map((data, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-md flex justify-between">
                  <span>{data.date}</span>
                  <span className="font-medium">{data.hours} hours</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {sleepData.length > 0 && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="w-full h-[400px]">
              <Line data={chartData} options={options} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepPage;