import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import './style/App.css';
import './style/temp.css';

import Graph from './graph.jsx';
//import BottomMenu from "./BottomMenu.jsx";

// Function to generate a single random number
function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GraphTimer() {
  // State to hold the graph data
  const [graphData, setGraphData] = useState([
    { month: 'Seg', temperature: random_number(15, 30) },
    { month: 'Ter', temperature: random_number(15, 30) },
    { month: 'Quar', temperature: random_number(15, 30) },
    { month: 'Qui', temperature: random_number(15, 30) },
    { month: 'Sex', temperature: random_number(15, 30) },
    { month: 'Sab', temperature: random_number(15, 30) },
    { month: 'Dom', temperature: random_number(15, 30) },
  ]);

  // useEffect to manage the real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Create a new array with updated temperatures
      const updatedData = graphData.map(item => ({
        ...item, // Keep the existing month
        temperature: random_number(15, 30) // Generate a new random temperature
      }));

      setGraphData(updatedData); // Update the state, which will re-render the Graph component
    }, 5000); // Update every 1000 milliseconds (1 second)

    // Cleanup function: This runs when the component unmounts
    return () => clearInterval(interval);
  }, [graphData]); // Dependency array: Re-run effect if graphData changes (though in this case,
                   // it's mostly for initial setup and cleanup as data changes inside the interval)
                   // A more common pattern for intervals is to use an empty dependency array []
                   // if the interval doesn't rely on state that changes during its lifetime.
                   // Here, `graphData` is used to create `updatedData`, but since `random_number`
                   // is self-contained, `[]` would also work and be slightly more efficient
                   // by only setting up the interval once. Let's make it `[]` for efficiency.

  return (
    <>
      <div className='App'>
        <div className='Temperature'>
          {/* Pass the state variable to the Graph component */}
          <Graph data={graphData} />
        </div>

        
      </div>
    </>
  );
}

export default GraphTimer;