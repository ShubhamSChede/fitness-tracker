'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
    <main className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center text-center gap-6">
        <svg 
          className="w-32 h-32 md:w-40 md:h-40"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="90" fill="#2563eb"/> {/* Changed to blue-600 */}
          <g transform="translate(50, 50)">
            <rect x="0" y="10" width="20" height="40" rx="5" fill="white" opacity="0.9"/>
            <rect x="20" y="25" width="60" height="10" rx="2" fill="white" opacity="0.9"/>
            <rect x="80" y="10" width="20" height="40" rx="5" fill="white" opacity="0.9"/>
          </g>
          <path 
            d="M40 140 L70 140 L85 110 L100 160 L115 120 L130 140 L160 140" 
            stroke="white" 
            strokeWidth="6" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
        <h1 className="text-6xl md:text-8xl font-bold text-blue-600">
          FitTrack
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
          Your personal fitness companion. Track workouts, set goals, and achieve your fitness dreams.
        </p>
        <button 
          onClick={handleGetStarted}
          className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </main>
  </div>
  );
}
