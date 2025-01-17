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
  const [category, setCategory] = useState('')
  const [water, setWater] = useState('')
  const [fat, setFat] = useState('')
  const [muscle, setMuscle] = useState('')

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

  const chartData = {
    labels: ['Water %', 'Fat %', 'Muscle %'],
    datasets: [{
      data: [water || 0, fat || 0, muscle || 0],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)', // Water: Blue
        'rgba(255, 99, 132, 0.6)', // Fat: Red
        'rgba(75, 192, 192, 0.6)', // Muscle: Green
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    }]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">BMI & Body Composition</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={calculateBMI} className="space-y-6">
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

              <div>
                <label className="block mb-2 text-gray-700 font-medium">Water %</label>
                <input
                  type="number"
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter water percentage"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-gray-700 font-medium">Fat %</label>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter fat percentage"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">Muscle %</label>
                <input
                  type="number"
                  value={muscle}
                  onChange={(e) => setMuscle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter muscle percentage"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition"
              >
                Calculate BMI
              </button>
            </form>

            {bmi && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800">Your BMI: {bmi}</h2>
                <p className="mt-2 text-lg text-gray-600">Category: 
                  <span className={`font-semibold ${
                    category === 'Underweight' ? 'text-blue-500' :
                    category === 'Normal weight' ? 'text-green-500' :
                    category === 'Overweight' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {' '}{category}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Body Composition</h3>
            <div className="w-full max-w-md">
              <Pie data={chartData} options={{
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>• Water: {water || 0}%</p>
              <p>• Fat: {fat || 0}%</p>
              <p>• Muscle: {muscle || 0}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page