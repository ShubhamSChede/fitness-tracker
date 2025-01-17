'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ActivityChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Activity',
      },
    },
  };

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Steps',
        data: [6500, 5900, 8000, 8100, 7200, 9000, 7234],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Calories',
        data: [1200, 1100, 1400, 1350, 1200, 1500, 1248],
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <Bar options={options} data={data} />
    </div>
  );
}
