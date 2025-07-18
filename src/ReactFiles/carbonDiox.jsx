import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function CarbonDioxide() { // Renamed from CarbonMonox to CarbonDioxide
  // State to hold the current random value for carbon dioxide
  const [currentValue, setCurrentValue] = useState(0);
  // State for the unit of the displayed value (parts per million)
  const [unit] = useState('ppm');
  // State for the icon (representing CO2 levels)
  const [icon, setIcon] = useState('🍃'); // A leaf/air icon for normal
  // State for the timestamp
  const [timestamp, setTimestamp] = useState('');
  // State for the status message (e.g., "Good", "Elevated", "Poor Ventilation", "Very High")
  const [statusMessage, setStatusMessage] = useState('Good');
  // State for the text color based on status
  const [textColor, setTextColor] = useState('text-green-600');

  // Effect to update the random carbon dioxide value
  useEffect(() => {
    const updateValue = () => {
      // Simulate CO2 levels (typical indoor ranges):
      // 300-900 ppm: Good (similar to outdoor, well-ventilated)
      // 901-1500 ppm: Elevated (can cause drowsiness, stale air)
      // 1501-2500 ppm: High (noticeable discomfort, headaches)
      // >2500 ppm: Very High / Poor Ventilation (significant discomfort, potential health effects)
      const newValue = random_number(300, 3500); // Random CO2 value

      setCurrentValue(newValue);
      setTimestamp(new Date().toLocaleTimeString());

      // Update status message and text color based on CO2 level
      if (newValue <= 900) {
        setStatusMessage('Good');
        setTextColor('text-green-600');
        setIcon('✅'); // Checkmark for good
      } else if (newValue >= 901 && newValue <= 1500) {
        setStatusMessage('Elevated');
        setTextColor('text-yellow-600');
        setIcon('⚠️'); // Warning sign for elevated
      } else if (newValue >= 1501 && newValue <= 2500) {
        setStatusMessage('High');
        setTextColor('text-orange-600');
        setIcon('😷'); // Mask for high/uncomfortable
      } else { // newValue > 2500
        setStatusMessage('Very High');
        setTextColor('text-red-600');
        setIcon('🚨'); // Siren for very high/poor ventilation
      }
    };

    // Initial update when component mounts
    updateValue();

    // Set up interval for continuous updates
    const intervalId = setInterval(updateValue, 3000); // Update every 3 seconds

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50 min-h-screen font-inter">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-200">
        {/* Metric Display */}
        <div className="flex flex-col items-center mb-6">
          <span className={`text-6xl sm:text-7xl mb-2 animate-pulse ${textColor}`}>{icon}</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            {currentValue} {unit}
          </h1>
          <p className={`text-gray-600 text-lg sm:text-xl mt-2 font-semibold ${textColor}`}>
            Carbon Dioxide Level: <span className="capitalize">{statusMessage}</span>
          </p>
          {/* Display the timestamp here */}
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
