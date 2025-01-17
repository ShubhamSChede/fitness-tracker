'use client';
import React, { useState } from 'react';
import { Plus, Trash2, UtensilsCrossed } from 'lucide-react';

const FoodCalculator = () => {
  const [foods, setFoods] = useState([]);
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [portion, setPortion] = useState('');
  const [error, setError] = useState('');

  const handleAddFood = (e) => {
    e.preventDefault();
    setError('');

    if (!foodItem.trim() || !calories || !portion) {
      setError('Please fill in all fields');
      return;
    }

    if (calories <= 0 || portion <= 0) {
      setError('Calories and portion must be positive numbers');
      return;
    }

    setFoods([...foods, {
      name: foodItem.trim(),
      calories: parseInt(calories),
      portion: parseInt(portion),
      totalCalories: (parseInt(calories) * parseInt(portion)) / 100
    }]);
    
    setFoodItem('');
    setCalories('');
    setPortion('');
  };

  const handleRemoveFood = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const totalCalories = foods.reduce((acc, food) => acc + food.totalCalories, 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Food Calorie Calculator</h1>
      
      <form onSubmit={handleAddFood} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Food item (e.g., Banana, Apple, Rice)"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Calories per 100g"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Portion (g)"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Added Foods</h2>
        
        {foods.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No foods added yet. Start by adding some foods above!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {foods.map((food, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div>
                  <span className="font-medium">{food.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({food.portion}g)</span>
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

            <div className="mt-6 p-4 bg-blue-50 rounded flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total Calories</span>
              <span className="text-xl font-bold text-blue-600">
                {totalCalories.toFixed(1)} kcal
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCalculator;