'use client';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { format, subDays } from 'date-fns';
import Navbar from '../components/Navbar';
import { useDarkMode } from '../context/DarkModeContext';
import Footer from '../components/Footer'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SleepTracker() {
  const [sleepData, setSleepData] = useState([]);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      setError('Please login to track your sleep');
      return;
    }
    setUserId(storedUserId);
    fetchSleepData(storedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchSleepData(userId);
    }
  }, [userId]);

  const fetchSleepData = async (currentUserId) => {
    if (!currentUserId) return;
    
    try {
      setLoading(true);
      setError('');
      const endDate = new Date();
      const startDate = subDays(endDate, 7);
      const response = await fetch(
        `https://irix.onrender.com/api/sleep?startDate=${format(startDate, 'yyyy-MM-dd')}&endDate=${format(endDate, 'yyyy-MM-dd')}`,
        {
          headers: { 'user-id': currentUserId }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch sleep data');
      }

      const data = await response.json();
      setSleepData(data);
    } catch (err) {
      setError(err.message);
      setSleepData([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError('Please login to track your sleep');
      return;
    }
    
    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum < 0 || hoursNum > 24) {
      setError('Please enter valid hours between 0 and 24');
      return;
    }

    try {
      setError('');
      const response = await fetch(`https://irix.onrender.com/api/sleep`, {
        method: 'POST',
        headers: {
          'user-id': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, hoursOfSleep: hoursNum })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add sleep record');
      }

      await fetchSleepData(userId);
      setHours('');
      // Optional: Show success message
      // setSuccessMessage('Sleep record added successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const chartData = {
    labels: sleepData
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(record => format(new Date(record.date), 'MMM dd')),
    datasets: [{
      label: 'Hours of Sleep',
      data: sleepData
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(record => record.hoursOfSleep),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: { 
        display: true, 
        text: 'Sleep Pattern',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        title: { 
          display: true, 
          text: 'Hours of Sleep',
          font: {
            size: 14
          }
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14
          }
        }
      }
    }
  };

  const calculateAverageSleep = () => {
    if (sleepData.length === 0) return 0;
    const total = sleepData.reduce((acc, curr) => acc + curr.hoursOfSleep, 0);
    return (total / sleepData.length).toFixed(1);
  };


  return (
        <div
          className={`min-h-screen ${
            darkMode
              ? "bg-gray-900 text-gray-100"
              : "bg-gradient-to-br from-blue-50 to-blue-100"
          }`}
        >
          <Navbar/>
      <div className="max-w-4xl mx-auto mt-10 space-y-8">
        <div className=" p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 ">Sleep Tracker</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-blue-500 border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours of sleep"
              step="0.5"
              min="0"
              max="24"
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button 
              type="submit"
              className="bg-blue-500  px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Record
            </button>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="h-[400px]">
              <Line options={chartOptions} data={chartData} />
            </div>
          )}
        </div>

        <div className=" p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 ">Weekly Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className=" p-4 rounded-lg">
              <p className=" mb-1">Average Sleep</p>
              <p className="text-3xl font-bold text-blue-600">
                {calculateAverageSleep()} <span className="text-lg">hours</span>
              </p>
            </div>
            <div className="p-4 rounded-lg">
              <p className=" mb-1">Total Records</p>
              <p className="text-3xl font-bold text-blue-600">
                {sleepData.length}
              </p>
            </div>
          </div>
          
          {sleepData.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 ">Recent Records</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="">
                      <th className="px-4 py-2 text-left ">Date</th>
                      <th className="px-4 py-2 text-left ">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sleepData
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 5)
                      .map((record, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 ">
                            {format(new Date(record.date), 'MMM dd, yyyy')}
                          </td>
                          <td className="px-4 py-2 ">
                            {record.hoursOfSleep} hours
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}