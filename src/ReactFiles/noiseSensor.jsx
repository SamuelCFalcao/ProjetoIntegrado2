import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function NoiseSensor() {
  // State to hold the current random value for noise level
  const [currentValue, setCurrentValue] = useState(0);
  // State for the unit of the displayed value (decibels)
  const [unit, setUnit] = useState('dB');
  // State for the icon (representing noise levels)
  const [icon, setIcon] = useState('🔊'); // Speaker icon for normal
  // State for the timestamp
  const [timestamp, setTimestamp] = useState('');
  // State for the status message (e.g., "Quiet", "Moderate", "Loud", "Very Loud")
  const [statusMessage, setStatusMessage] = useState('Quiet');
  // State for the text color based on status
  const [textColor, setTextColor] = useState('text-green-600');

  // Effect to update the random noise value
  useEffect(() => {
    const updateValue = () => {
      // Simulate Noise levels (typical ranges):
      // 30-50 dB: Quiet (e.g., library, quiet office)
      // 51-70 dB: Moderate (e.g., normal conversation, busy office)
      // 71-90 dB: Loud (e.g., vacuum cleaner, busy street)
      // >90 dB: Very Loud / Dangerous (e.g., power tools, rock concert - can cause hearing damage)
      const newValue = random_number(30, 100); // Random noise value

      setCurrentValue(newValue);
      setTimestamp(new Date().toLocaleTimeString());

      // Update status message and text color based on noise level
      if (newValue <= 50) {
        setStatusMessage('Quiet');
        setTextColor('text-green-600');
        setIcon('✅'); // Checkmark for quiet
      } else if (newValue >= 51 && newValue <= 70) {
        setStatusMessage('Moderate');
        setTextColor('text-yellow-600');
        setIcon('👂'); // Ear for moderate
      } else if (newValue >= 71 && newValue <= 90) {
        setStatusMessage('Loud');
        setTextColor('text-orange-600');
        setIcon('🗣️'); // Speaking head for loud
      } else { // newValue > 90
        setStatusMessage('Very Loud');
        setTextColor('text-red-600');
        setIcon('🚨'); // Siren for very loud/dangerous
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
            Noise Level: <span className="capitalize">{statusMessage}</span>
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
