'use client';
import React, { useState } from 'react';
import { Plus, Trash2, UtensilsCrossed } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import { useDarkMode } from '../context/DarkModeContext';
import Footer from '../components/Footer'


ChartJS.register(ArcElement, Tooltip, Legend);

const FoodCalculator = () => {
  const [foods, setFoods] = useState([]);
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [portion, setPortion] = useState('');
  const [protein, setProtein] = useState('');
  const [error, setError] = useState('');
  const { darkMode } = useDarkMode();

  const handleAddFood = (e) => {
    e.preventDefault();
    setError('');

    if (!foodItem.trim() || !calories || !portion || !protein) {
      setError('Please fill in all fields');
      return;
    }

    if (calories <= 0 || portion <= 0 || protein < 0) {
      setError('Values must be positive numbers');
      return;
    }

    setFoods([...foods, {
      name: foodItem.trim(),
      calories: parseInt(calories),
      portion: parseInt(portion),
      protein: parseInt(protein),
      totalCalories: (parseInt(calories) * parseInt(portion)) / 100,
      totalProtein: (parseInt(protein) * parseInt(portion)) / 100
    }]);
    
    setFoodItem('');
    setCalories('');
    setPortion('');
    setProtein('');
  };

  const handleRemoveFood = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const totalCalories = foods.reduce((acc, food) => acc + food.totalCalories, 0);
  const totalProtein = foods.reduce((acc, food) => acc + food.totalProtein, 0);

  const chartData = {
    labels: foods.map(food => food.name),
    datasets: [{
      data: foods.map(food => food.totalProtein),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Protein Distribution (g)'
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
    <Navbar/>
    <div className="max-w-2xl mx-auto p-6 mt-10 rounded-lg shadow">

      <h1 className="text-2xl font-bold mb-6 text-center">Food Calorie Calculator</h1>
      
      <form onSubmit={handleAddFood} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Food item (e.g., Banana, Apple, Rice)"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
          className="w-full p-3 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Calories per 100g"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Protein per 100g"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="p-3 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Portion (g)"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            className="p-3 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded">
            {error}
          </div>
        )}
        
        <button 
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Food
        </button>
      </form>

      {foods.length > 0 && (
        <div className="mb-8">
          <div className="w-64 mx-auto">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="text-center mt-4">
            <p className="font-semibold">Total Protein: {totalProtein.toFixed(1)}g</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold ">Added Foods</h2>
        
        {foods.length === 0 ? (
          <div className="text-center py-8 ">
            <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No foods added yet. Start by adding some foods above!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {foods.map((food, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4  rounded hover:bg-gray-100 transition-colors"
              >
                <div>
                  <span className="font-medium">{food.name}</span>
                  <span className="text-sm ml-2">({food.portion}g)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{food.totalCalories.toFixed(1)} kcal</span>
                  <button 
                    onClick={() => handleRemoveFood(index)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4  rounded flex justify-between items-center">
              <span className="font-semibold ">Total Calories</span>
              <span className="text-xl font-bold text-blue-600">
                {totalCalories.toFixed(1)} kcal
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
  </div>

  );
};

export default FoodCalculator;