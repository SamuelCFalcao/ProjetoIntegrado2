import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function TimeSeries() {
  // State to determine which metric to display ('temperature' or 'humidity')
  const [displayType, setDisplayType] = useState('temperature'); // Default to temperature
  // State to hold the current random value for the displayed metric
  const [currentValue, setCurrentValue] = useState(0);
  // State for the unit of the displayed value
  const [unit, setUnit] = useState('');
  // State for the icon
  const [icon, setIcon] = useState('🌡️');
  // New state for the timestamp
  const [timestamp, setTimestamp] = useState('');

  // Effect to update the random value based on displayType
  useEffect(() => {
    const updateValue = () => {
      let newValue;
      let newUnit;
      let newIcon;

      if (displayType === 'temperature') {
        newValue = random_number(15, 30); // Random temperature between 15 and 30 C
        newUnit = 'Cº';
        newIcon = '🌡️';
      } else { // displayType === 'humidity'
        newValue = random_number(40, 90); // Random humidity between 40 and 90%
        newUnit = '%';
        newIcon = '💧';
      }
      setCurrentValue(newValue);
      setUnit(newUnit);
      setIcon(newIcon);
      // Update the timestamp to the current time
      setTimestamp(new Date().toLocaleTimeString());
    };

    // Initial update when component mounts or displayType changes
    updateValue();

    // Set up interval for continuous updates
    const intervalId = setInterval(updateValue, 3000); // Update every 3 seconds

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [displayType]); // Re-run effect when displayType changes

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
            Current {displayType}
          </p>
          {/* Display the timestamp here */}
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {timestamp}
          </p>
        </div>

        {/* Buttons to switch display type */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
                        ${displayType === 'temperature' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setDisplayType('temperature')}
          >
            Temperature
          </button>
          <button
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
                        ${displayType === 'humidity' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setDisplayType('humidity')}
          >
            Humidity
          </button>
        </div>
      </div>
    </div>
  );
}
