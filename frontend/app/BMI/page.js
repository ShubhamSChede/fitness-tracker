'use client'
import React, { useState } from 'react'

const Page = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [category, setCategory] = useState('')

  const calculateBMI = (e) => {
    e.preventDefault()
    if (weight && height) {
      const heightInMeters = height / 100
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2)
      setBmi(bmiValue)

      // Set BMI category
      if (bmiValue < 18.5) setCategory('Underweight')
      else if (bmiValue >= 18.5 && bmiValue < 25) setCategory('Normal weight')
      else if (bmiValue >= 25 && bmiValue < 30) setCategory('Overweight')
      else setCategory('Obese')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">BMI Calculator</h1>
        
        <form onSubmit={calculateBMI} className="space-y-4">
          <div>
            <label className="block mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter weight in kg"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter height in cm"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Calculate BMI
          </button>
        </form>

        {bmi && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Your BMI: {bmi}</h2>
            <p className="mt-2">Category: {category}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page