'use client'
import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import Navbar from '../components/Navbar'
import { useDarkMode } from '../context/DarkModeContext'
import Footer from '../components/Footer'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)


const Page = () => {
  const { darkMode } = useDarkMode();
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [bodyComposition, setBodyComposition] = useState(null)
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    // Load profile data if available
    const userId = localStorage.getItem('userId')
    if (userId) {
      fetch(`https://irix.onrender.com/api/profile/${userId}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setProfileData(data)
            setWeight(data.weight)
            setHeight(data.height)
            // Automatically calculate BMI with profile data
            const heightInMeters = data.height / 100
            const bmiValue = (data.weight / (heightInMeters * heightInMeters)).toFixed(2)
            setBmi(bmiValue)
            calculateBodyComposition(data.weight, bmiValue)
          }
        })
        .catch(console.error)
    }

    // Load previous BMI
    const storedBMI = localStorage.getItem('lastBMI')
    if (storedBMI) {
      setBmi(storedBMI)
    }
  }, [])



  const saveBMIToStorage = (bmiValue) => {
    localStorage.setItem('lastBMI', bmiValue)
  }

  const calculateBodyComposition = (weightValue, bmiValue) => {
    const bodyFatPercentage = bmiValue < 18.5
      ? 12
      : bmiValue < 25
      ? 18
      : bmiValue < 30
      ? 25
      : 32

    const fatMass = (weightValue * bodyFatPercentage) / 100
    const waterMass = (weightValue * 60) / 100
    const muscleMass = weightValue - (fatMass + waterMass)

    setBodyComposition({
      fatMass: fatMass.toFixed(2),
      waterMass: waterMass.toFixed(2),
      muscleMass: muscleMass.toFixed(2),
    })
  }

  const calculateComposition = (e) => {
    e.preventDefault()
    if (weight && height) {
      const heightInMeters = height / 100
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2)
      setBmi(bmiValue)
      saveBMIToStorage(bmiValue)
      calculateBodyComposition(weight, bmiValue)
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
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
        <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center p-6">

      <div className=" backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Body Composition Calculator
        </h1>
        
        {profileData && (
          <div className="mb-6 p-4 rounded-xl">
            <p className="text-blue-700">Using data from your profile</p>
          </div>
        )}

        <form onSubmit={calculateComposition} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
                placeholder="Enter weight in kg"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
                placeholder="Enter height in cm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-300 font-semibold shadow-lg"
          >
            Calculate Composition
          </button>
        </form>

        {bmi && bodyComposition && (
          <div className="mt-12 animate-fadeIn">
            <h2 className="text-3xl font-bold  mb-6 text-center">Your Body Composition</h2>
            <div className="rounded-xl p-6 shadow-lg border border-gray-100">
              <p className="text-xl  mb-6 text-center font-medium">
                BMI: <span className="text-purple-600 font-bold">{bmi}</span>
              </p>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <Pie
                    data={{
                      ...chartData,
                      datasets: [{
                        ...chartData.datasets[0],
                        backgroundColor: [
                          'rgba(244, 63, 94, 0.8)', // Fat - rose
                          'rgba(59, 130, 246, 0.8)', // Water - blue
                          'rgba(168, 85, 247, 0.8)', // Muscle - purple
                        ],
                        borderColor: [
                          'rgba(244, 63, 94, 1)',
                          'rgba(59, 130, 246, 1)',
                          'rgba(168, 85, 247, 1)',
                        ],
                        borderWidth: 2,
                      }],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            font: {
                              size: 14,
                              weight: 'bold',
                            },
                            padding: 20,
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4 text-base ">
                  <p className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    Fat Mass: <span className="font-bold">{bodyComposition.fatMass} kg</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Water Mass: <span className="font-bold">{bodyComposition.waterMass} kg</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    Muscle Mass: <span className="font-bold">{bodyComposition.muscleMass} kg</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>

  )
}

export default Page