// WeekSelector.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDarkMode } from './../context/DarkModeContext';

const WeekSelector = ({ currentDate, onWeekChange }) => {
    const { darkMode } = useDarkMode();
  const formatDateRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    // Use a consistent date format
    const formatDate = (date) => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    onWeekChange(newDate);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-sm 
    ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}">
      <button 
        onClick={() => changeWeek(-1)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <span className="font-semibold">{formatDateRange(currentDate)}</span>
      <button 
        onClick={() => changeWeek(1)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default WeekSelector;