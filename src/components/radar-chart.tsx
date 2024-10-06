import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  label: string;
  data: { labels: string[]; values: number[] };
}

const RadarChart: React.FC<RadarChartProps> = ({ label, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: label,
        data: data.values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
