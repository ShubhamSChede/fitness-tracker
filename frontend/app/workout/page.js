'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar';

const Page = () => {
  const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    steps: '',
    exerciseType: '',
    duration: '',
    exerciseName: '',
    calories: '',
    note: ''
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!userId) {
      alert('User not logged in');
      setLoading(false);
      return;
    }
    
    try {
      const workoutData = {
        userId: userId,
        date: new Date(formData.date).toISOString(),
        steps: parseInt(formData.steps),
        exercises: [{
          type: formData.exerciseType,
          duration: parseInt(formData.duration),
          exercise_name: formData.exerciseName,
          calories: parseInt(formData.calories),
          note: formData.note
        }]
      };

      const response = await axios.post(
        `https://irix.onrender.com/api/workout/${userId}`,
        workoutData
      );
      
      console.log('Workout logged:', response.data);
      // Reset form
      setFormData({
        date: '',
        steps: '',
        exerciseType: '',
        duration: '',
        exerciseName: '',
        calories: '',
        note: ''
      });
    } catch (error) {
      console.error('Error logging workout:', error);
      alert('Failed to log workout');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Log Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Steps</label>
            <input
              type="number"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Exercise Type</label>
            <input
              type="text"
              name="exerciseType"
              value={formData.exerciseType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Exercise Name</label>
            <input
              type="text"
              name="exerciseName"
              value={formData.exerciseName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Calories</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Notes</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Logging...' : 'Log Workout'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Page;