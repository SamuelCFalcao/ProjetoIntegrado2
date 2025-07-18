import React, { useState, useEffect } from 'react';

// Helper function to generate a random number within a range
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function LightSensor() { // Renamed from lightSensor for clarity
  // State to hold the current random value for light intensity
  // LDR values are typically resistance, which can be converted to Lux or a 0-100% scale
  // We'll use a simplified 0-100 scale for "brightness"
  const [currentValue, setCurrentValue] = useState(0);
  // State for the unit of the displayed value
  const [unit] = useState('%'); // Percentage of brightness
  // State for the icon (representing light levels)
  const [icon, setIcon] = useState('💡'); // Light bulb icon for general light
  // State for the timestamp
  const [timestamp, setTimestamp] = useState('');
  // State for the status message (e.g., "Dark", "Dim", "Normal", "Bright")
  const [statusMessage, setStatusMessage] = useState('Dark');
  // State for the text color based on status
  const [textColor, setTextColor] = useState('text-gray-600');

  // Effect to update the random light intensity value
  useEffect(() => {
    const updateValue = () => {
      // Simulate light intensity levels (0-100% brightness):
      // 0-20%: Dark
      // 21-50%: Dim
      // 51-80%: Normal
      // 81-100%: Bright
      const newValue = random_number(0, 100); // Random brightness value

      setCurrentValue(newValue);
      setTimestamp(new Date().toLocaleTimeString());

      // Update status message and text color based on light level
      if (newValue <= 20) {
        setStatusMessage('Dark');
        setTextColor('text-gray-600');
        setIcon('🌑'); // New moon for dark
      } else if (newValue >= 21 && newValue <= 50) {
        setStatusMessage('Dim');
        setTextColor('text-yellow-700');
        setIcon('🕯️'); // Candle for dim
      } else if (newValue >= 51 && newValue <= 80) {
        setStatusMessage('Normal');
        setTextColor('text-green-600');
        setIcon('💡'); // Light bulb for normal
      } else { // newValue > 80
        setStatusMessage('Bright');
        setTextColor('text-blue-600');
        setIcon('☀️'); // Sun for bright
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
            Light Level: <span className="capitalize">{statusMessage}</span>
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
