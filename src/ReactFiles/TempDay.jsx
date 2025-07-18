import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function TempDay() {
  // State to hold the current temperature
  const [temperature, setTemperature] = useState(random_number(15, 30));
  const [icon, setIcon] = useState('☀️'); // State for a dynamic icon

  // useEffect to update the temperature every few seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a new random temperature
      const newTemp = random_number(15, 30);
      setTemperature(newTemp);

      // Update icon based on temperature (simple logic for demonstration)
      if (newTemp < 20) {
        setIcon('☁️');
      } else if (newTemp >= 20 && newTemp < 25) {
        setIcon('🌤️');
      } else {
        setIcon('☀️');
      }
    }, 3000); // Update every 3 seconds

    // Cleanup function: clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          {/* Dynamic icon based on temperature */}
          <span className="text-6xl mb-2 animate-pulse">{icon}</span>
          <h1 className="text-5xl font-bold text-gray-800">
            {temperature} Cº
          </h1>
        </div>

        <div className="text-gray-600 text-lg">
          <p className="font-medium">Current Ambient Temperature</p>
          <p className="text-sm text-gray-500 mt-1">
            (Updating every 3 seconds)
          </p>
        </div>
      </div>
    </div>
  );
}
