import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Humidity() { // Renamed from TimeSeries to Humidity
  // State to hold the current random value for humidity
  const [currentValue, setCurrentValue] = useState(0);
  // State for the unit of the displayed value (always humidity)
  const [unit] = useState('%');
  // State for the icon (always humidity icon)
  const [icon] = useState('💧');
  // State for the timestamp
  const [timestamp, setTimestamp] = useState('');

  // Effect to update the random humidity value
  useEffect(() => {
    const updateValue = () => {
      const newValue = random_number(40, 90); // Random humidity between 40 and 90%
      setCurrentValue(newValue);
      // Update the timestamp to the current time
      setTimestamp(new Date().toLocaleTimeString());
    };

    // Initial update when component mounts
    updateValue();

    // Set up interval for continuous updates
    const intervalId = setInterval(updateValue, 3000); // Update every 3 seconds

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array as displayType is no longer a factor

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50 min-h-screen font-inter">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-200">
        {/* Metric Display */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-6xl sm:text-7xl mb-2 animate-pulse">{icon}</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            {currentValue} {unit}
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mt-2 capitalize">
            Current Humidity
          </p>
          {/* Display the timestamp here */}
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {timestamp}
          </p>
        </div>

        {/* Buttons to switch display type are removed */}
      </div>
    </div>
  );
}
