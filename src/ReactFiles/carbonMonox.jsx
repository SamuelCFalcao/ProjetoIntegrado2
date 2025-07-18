import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function CarbonMonox() {
  // State to hold the current random value for carbon monoxide
  const [currentValue, setCurrentValue] = useState(0);
  // State for the unit of the displayed value (parts per million)
  const [unit] = useState('ppm');
  // State for the icon (representing carbon monoxide or a warning)
  const [icon, setIcon] = useState('💨'); // A simple gas/air icon
  // State for the timestamp
  const [timestamp, setTimestamp] = useState('');
  // State for the status message (e.g., "Normal", "Elevated", "Danger")
  const [statusMessage, setStatusMessage] = useState('Normal');
  // State for the text color based on status
  const [textColor, setTextColor] = useState('text-green-600');

  // Effect to update the random carbon monoxide value
  useEffect(() => {
    const updateValue = () => {
      // Simulate CO levels:
      // 0-9 ppm: Normal/Good
      // 10-29 ppm: Elevated (potential concern)
      // 30-50 ppm: High (warning)
      // >50 ppm: Dangerous (critical)
      const newValue = random_number(0, 70); // Random CO value

      setCurrentValue(newValue);
      setTimestamp(new Date().toLocaleTimeString());

      // Update status message and text color based on CO level
      if (newValue <= 9) {
        setStatusMessage('Normal');
        setTextColor('text-green-600');
        setIcon('✅'); // Checkmark for normal
      } else if (newValue >= 10 && newValue <= 29) {
        setStatusMessage('Elevated');
        setTextColor('text-yellow-600');
        setIcon('⚠️'); // Warning sign for elevated
      } else if (newValue >= 30 && newValue <= 50) {
        setStatusMessage('High');
        setTextColor('text-orange-600');
        setIcon('🚨'); // Siren for high
      } else {
        setStatusMessage('Dangerous');
        setTextColor('text-red-600');
        setIcon('☠️'); // Skull for dangerous
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
            Carbon Monoxide Level: <span className="capitalize">{statusMessage}</span>
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
