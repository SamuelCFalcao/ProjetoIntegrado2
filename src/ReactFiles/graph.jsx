import { Bar, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components for a Line chart
// This is crucial for Chart.js v3+ to ensure elements like lines, points, and scales work.
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Graph({ data }) {
  // Calculate the average temperature from your data
  const averageTemperature = data.reduce((sum, item) => sum + item.temperature, 0) / data.length;

  return (
    <>
      <div className='temp'>
        <div className='titleTemp'>
          <h1>Média</h1>
          {/* Note: In a real application, you might want to display the actual current temperature
              from your data rather than a random number here for better consistency. */}
          <h1>{random_number(15, 30)} Cº</h1>
        </div>
        <Line
          data={{
            labels: data.map(item => item.month),
            datasets: [
              {
                label: 'Temperature (°C)',
                data: data.map(item => item.temperature),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                pointStyle: 'circle',
              },
              {
                // This is our new dataset for the red horizontal line
                label: 'Average Temperature', // This label will appear in the legend
                data: data.map(() => averageTemperature), // All data points will be the average, creating a flat line
                borderColor: 'rgb(255, 0, 0)', // Red color for the line
                borderWidth: 1, // Make the line a bit thicker for visibility
                pointRadius: 0, // No circles on this reference line
                fill: false, // Don't fill the area under this line
              },
            ],
          }}
          options={{
            // Add options to ensure the legend is displayed, showing both datasets
            plugins: {
              legend: {
                display: true,
              },
            },
            // You can add other options here, like custom scales, tooltips, etc.
          }}
        />

        <div className='legend'>
          <p>Temperatura durante do ambiente</p>
        </div>
      </div>
    </>
  );
}