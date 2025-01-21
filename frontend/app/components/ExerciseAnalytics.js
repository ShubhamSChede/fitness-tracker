// ExerciseAnalytics.js
'use client';
import React, { useState, useEffect } from 'react';
import WeekSelector from './WeekSelector';
import ExerciseSummary from './ExerciseSummary';
import WeeklyStats from './WeeklyStats';

const ExerciseAnalytics = ({ workoutData }) => {
  // Use useEffect to set the initial date on the client side only
  const [currentDate, setCurrentDate] = useState(null);
  
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    if (!currentDate) return;

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const filteredData = workoutData.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
    });

    setWeekData(filteredData);
  }, [currentDate, workoutData]);

  if (!currentDate) {
    return null; // or a loading state
  }

  return (
    <div className="space-y-6">
      <WeekSelector 
        currentDate={currentDate}
        onWeekChange={setCurrentDate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExerciseSummary weekData={weekData} />
        <WeeklyStats weekData={weekData} />
      </div>
    </div>
  );
};

export default ExerciseAnalytics;