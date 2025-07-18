import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function DirtyAirSensor() { // Renamed from dirtyAirSensor for clarity
  // State to hold the current random value for air quality (e.g., AQI or PM2.5)
  // Using a simplified scale for demonstration
  const [currentValue, setCurrentValue] = useState(0);
  // State for the unit of the displayed value (e.g., AQI or µg/m³)
  const [unit] = useState('AQI'); // Using Air Quality Index (AQI) as a common unit
  // State for the icon (representing air quality)
  const [icon, setIcon] = useState('✨'); // Clean air icon for good quality
  // State for the timestamp
  const [timestamp, setTimestamp] = useState('');
  // State for the status message (e.g., "Good", "Moderate", "Unhealthy", "Hazardous")
  const [statusMessage, setStatusMessage] = useState('Good');
  // State for the text color based on status
  const [textColor, setTextColor] = useState('text-green-600');

  // Effect to update the random air quality value
  useEffect(() => {
    const updateValue = () => {
      // Simulate Air Quality Index (AQI) levels:
      // 0-50: Good (Green)
      // 51-100: Moderate (Yellow)
      // 101-150: Unhealthy for Sensitive Groups (Orange)
      // 151-200: Unhealthy (Red)
      // 201-300: Very Unhealthy (Purple)
      // 301-500: Hazardous (Maroon)
      const newValue = random_number(0, 350); // Random AQI value

      setCurrentValue(newValue);
      setTimestamp(new Date().toLocaleTimeString());

      // Update status message and text color based on AQI level
      if (newValue <= 50) {
        setStatusMessage('Good');
        setTextColor('text-green-600');
        setIcon('✅'); // Checkmark for good
      } else if (newValue >= 51 && newValue <= 100) {
        setStatusMessage('Moderate');
        setTextColor('text-yellow-600');
        setIcon('☁️'); // Cloud for moderate
      } else if (newValue >= 101 && newValue <= 150) {
        setStatusMessage('Unhealthy for Sensitive Groups');
        setTextColor('text-orange-600');
        setIcon('😷'); // Mask for unhealthy sensitive
      } else if (newValue >= 151 && newValue <= 200) {
        setStatusMessage('Unhealthy');
        setTextColor('text-red-600');
        setIcon('🚨'); // Siren for unhealthy
      } else if (newValue >= 201 && newValue <= 300) {
        setStatusMessage('Very Unhealthy');
        setTextColor('text-purple-600');
        setIcon('☠️'); // Skull for very unhealthy
      } else { // newValue > 300
        setStatusMessage('Hazardous');
        setTextColor('text-gray-800'); // Darker color for hazardous
        setIcon('🔥'); // Fire for hazardous
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
            Air Quality: <span className="capitalize">{statusMessage}</span>
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
