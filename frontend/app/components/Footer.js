'use client';
import { useDarkMode } from '../context/DarkModeContext';

export default function Footer() {
  const { darkMode } = useDarkMode();

  return (
    <footer
      className={`flex items-center justify-center px-6 py-4 text-sm ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <span>© 2025 FitTrack. All rights reserved.</span>
    </footer>
  );
}
