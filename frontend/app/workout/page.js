'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useDarkMode } from '../context/DarkModeContext';
import Footer from '../components/Footer'


const exerciseOptions = {
  chest: ['Push-ups', 'Bench Press', 'Chest Flyes', 'Dips', 'Incline Press'],
  back: ['Pull-ups', 'Deadlifts', 'Rows', 'Lat Pulldowns', 'Back Extensions'],
  legs: ['Squats', 'Lunges', 'Running', 'Leg Press', 'Calf Raises', 'Skipping'],
  arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Diamond Push-ups'],
  shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises', 'Shrugs'],
  abs: ['Crunches', 'Planks', 'Leg Raises', 'Russian Twists', 'Sit-ups'],
  cardio: ['Running', 'Cycling', 'Swimming', 'Jump Rope', 'Burpees']
};

const initialExerciseState = {
  type: '',
  exercise_name: '',
  duration: '',
  calories: '',
  note: ''
};

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useDarkMode();
  const [userId, setUserId] = useState(null);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [basicInfo, setBasicInfo] = useState({
    date: '',
    steps: ''
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleBasicInfoChange = (e) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    if (field === 'type') {
      // Reset exercise_name when type changes
      updatedExercises[index] = {
        ...updatedExercises[index],
        [field]: value,
        exercise_name: ''
      };
    } else {
      // For all other fields, including exercise_name
      updatedExercises[index] = {
        ...updatedExercises[index],
        [field]: value
      };
    }
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { ...initialExerciseState }]);
    setShowExerciseForm(true);
  };

  const removeExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    if (updatedExercises.length === 0) {
      setShowExerciseForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!userId) {
      alert('User not logged in');
      setLoading(false);
      return;
    }

    if (exercises.length === 0) {
      alert('Please add at least one exercise');
      setLoading(false);
      return;
    }
    
    try {
      const workoutData = {
        userId,
        date: new Date(basicInfo.date).toISOString(),
        steps: parseInt(basicInfo.steps),
        exercises: exercises.map(exercise => ({
          type: exercise.type,
          duration: parseInt(exercise.duration),
          exercise_name: exercise.exercise_name,
          calories: parseInt(exercise.calories),
          note: exercise.note
        }))
      };

      const response = await axios.post(
        `https://irix.onrender.com/api/workout/${userId}`,
        workoutData
      );
      
      console.log('Workout logged:', response.data);
      // Reset form
      setBasicInfo({ date: '', steps: '' });
      setExercises([]);
      setShowExerciseForm(false);
      alert('Workout logged successfully!');
    } catch (error) {
      console.error('Error logging workout:', error);
      alert('Failed to log workout');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Log Workout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={basicInfo.date}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Steps</label>
              <input
                type="number"
                name="steps"
                value={basicInfo.steps}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded text-gray-900"
                required
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Exercises</h2>
              <button
                type="button"
                onClick={addExercise}
                className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                <Plus size={20} /> Add Exercise
              </button>
            </div>

            {exercises.map((exercise, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800 p-4 rounded-lg mb-4 relative">
                <button
                  type="button"
                  onClick={() => removeExercise(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Exercise Type</label>
                    <select
                      value={exercise.type}
                      onChange={(e) => handleExerciseChange(index, 'type', e.target.value)}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    >
                      <option value="">Select Type</option>
                      {Object.keys(exerciseOptions).map(type => (
                        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-1">Exercise Name</label>
                    <select
                      value={exercise.exercise_name}
                      onChange={(e) => handleExerciseChange(index, 'exercise_name', e.target.value)}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                      disabled={!exercise.type}
                    >
                      <option value="">Select Exercise</option>
                      {exercise.type && exerciseOptions[exercise.type].map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      value={exercise.duration}
                      onChange={(e) => handleExerciseChange(index, 'duration', e.target.value)}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Calories</label>
                    <input
                      type="number"
                      value={exercise.calories}
                      onChange={(e) => handleExerciseChange(index, 'calories', e.target.value)}
                      className="w-full p-2 border rounded text-gray-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Notes</label>
                  <textarea
                    value={exercise.note}
                    onChange={(e) => handleExerciseChange(index, 'note', e.target.value)}
                    className="w-full p-2 border rounded text-gray-900"
                    rows="2"
                  />
                </div>
              </div>
            ))}
          </div>

          {exercises.length > 0 && (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Logging...' : 'Log Workout'}
            </button>
          )}
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Page;