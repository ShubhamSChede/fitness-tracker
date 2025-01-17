'use client'
import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const Page = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [bodyComposition, setBodyComposition] = useState(null)

  const calculateComposition = (e) => {
    e.preventDefault()
    if (weight && height) {
      const heightInMeters = height / 100
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2)
      setBmi(bmiValue)

      // Estimate body composition (generalized)
      const bodyFatPercentage = bmiValue < 18.5
        ? 12 // Assumption for underweight
        : bmiValue < 25
        ? 18 // Normal weight
        : bmiValue < 30
        ? 25 // Overweight
        : 32 // Obese

      const fatMass = (weight * bodyFatPercentage) / 100
      const waterMass = (weight * 60) / 100 // Assume 60% water content
      const muscleMass = weight - (fatMass + waterMass) // Remaining as muscle mass

      setBodyComposition({
        fatMass: fatMass.toFixed(2),
        waterMass: waterMass.toFixed(2),
        muscleMass: muscleMass.toFixed(2),
      })
    }
  }

  const chartData = bodyComposition
    ? {
        labels: ['Fat', 'Water', 'Muscle'],
        datasets: [
          {
            data: [
              bodyComposition.fatMass,
              bodyComposition.waterMass,
              bodyComposition.muscleMass,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)', // Fat
              'rgba(54, 162, 235, 0.6)', // Water
              'rgba(75, 192, 192, 0.6)', // Muscle
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Body Composition Calculator</h1>

        <form onSubmit={calculateComposition} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter weight in kg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter height in cm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition"
          >
            Calculate Composition
          </button>
        </form>

        {bmi && bodyComposition && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Body Composition</h2>
            <p className="text-lg text-gray-600 mb-4">BMI: {bmi}</p>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <Pie
                  data={chartData}
                  options={{
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>• Fat Mass: {bodyComposition.fatMass} kg</p>
                <p>• Water Mass: {bodyComposition.waterMass} kg</p>
                <p>• Muscle Mass: {bodyComposition.muscleMass} kg</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page