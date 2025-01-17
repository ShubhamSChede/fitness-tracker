import Image from "next/image";
import ActivityChart from "../components/ActivityChart";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Overview */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Daily Goals</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-500">7,234</div>
              <p className="text-gray-600">steps today</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Active Minutes</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-500">45</div>
              <p className="text-gray-600">minutes</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Calories</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-orange-500">1,248</div>
              <p className="text-gray-600">kcal burned</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ActivityChart />
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start Workout
          </button>
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            View History
          </button>
        </div>
      </main>
    </div>
  );
}
