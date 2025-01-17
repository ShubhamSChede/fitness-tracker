'use client'
import React, { useState } from 'react'

const FoodCalculator = () => {
  const [foods, setFoods] = useState([])
  const [foodItem, setFoodItem] = useState('')
  const [calories, setCalories] = useState('')
  const [portion, setPortion] = useState('')

  const handleAddFood = (e) => {
    e.preventDefault()
    if (foodItem && calories && portion) {
      setFoods([...foods, {
        name: foodItem,
        calories: parseInt(calories),
        portion: parseInt(portion),
        totalCalories: (parseInt(calories) * parseInt(portion)) / 100
      }])
      setFoodItem('')
      setCalories('')
      setPortion('')
    }
  }

  const totalCalories = foods.reduce((acc, food) => acc + food.totalCalories, 0)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Food Calorie Calculator</h1>
      
      <form onSubmit={handleAddFood} className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Food item"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Calories per 100g"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Portion (g)"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Food
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Added Foods</h2>
        {foods.map((food, index) => (
          <div key={index} className="border-b py-2 flex justify-between">
            <span>{food.name} ({food.portion}g)</span>
            <span>{food.totalCalories.toFixed(1)} kcal</span>
          </div>
        ))}
        <div className="mt-4 font-bold">
          Total Calories: {totalCalories.toFixed(1)} kcal
        </div>
      </div>
    </div>
  )
}

export default FoodCalculator