import Image from "next/image";
import ActivityChart from "../components/ActivityChart";
import Badge from "../components/Badge";

export default function Home() {
  const dailySteps = 7234;  // This could come from your data source

  const getBadgeType = (steps) => {
    if (steps >= 15000) return 'advanced';
    if (steps >= 10000) return 'intermediate';
    if (steps >= 5000) return 'beginner';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
  <h1 className="text-2xl font-bold text-blue-600">FitTrack</h1>
  <ul className="flex space-x-6">
    <li>
      <a href="/BMI" className="text-gray-600 hover:text-blue-600 font-medium">
        BMI Calculator
      </a>
    </li>
    
  </ul>
</nav>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Overview */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Daily Goals</h2>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-500">{dailySteps}</div>
              <p className="text-gray-600">steps today</p>
            </div>
            {getBadgeType(dailySteps) && (
              <div className="mt-4">
                <Badge type={getBadgeType(dailySteps)} count={dailySteps} />
              </div>
            )}
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
